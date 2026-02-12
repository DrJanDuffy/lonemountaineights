#!/usr/bin/env node
/**
 * upload-to-cloudflare.js  —  Cloudflare Images uploader (2026 best-practice)
 *
 * Uploads images from static/images/ to Cloudflare Images using:
 *   • V1 Upload API  (POST /images/v1)  — server-side, single-step
 *   • V2 List API    (GET  /images/v2)   — metadata-filtered sync
 *   • Batch tokens   (POST /images/v1/batch_token) — 200 req/s, no global rate limit
 *   • Custom IDs     (folder-organized, sanitised filenames)
 *   • Metadata       ({ site, originalPath, category }) for V2 filtering
 *
 * Prerequisites
 * ─────────────
 * 1.  Enable Cloudflare Images on your account.
 * 2.  Create an API token with "Cloudflare Images:Edit" permission.
 * 3.  Copy .env.example → .env and fill in CF_ACCOUNT_ID + CF_API_TOKEN.
 * 4.  Enable Flexible Variants in Dashboard → Images → Variants.
 *
 * Usage
 * ─────
 *   node scripts/upload-to-cloudflare.js                # sync (default): upload new only
 *   node scripts/upload-to-cloudflare.js --dry-run      # list files without uploading
 *   node scripts/upload-to-cloudflare.js --list         # list images already in Cloudflare
 *   node scripts/upload-to-cloudflare.js --force        # delete + re-upload all
 *   node scripts/upload-to-cloudflare.js --setup-variants  # create named variants
 */

import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, extname, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// ── resolve project root ────────────────────────────────────────────────────
const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');
const STATIC_DIR = join(PROJECT_ROOT, 'static', 'images');
const CLOUDFLARE_IMAGES_JS = join(PROJECT_ROOT, 'src', 'lib', 'cloudflare-images.js');

// ── constants ───────────────────────────────────────────────────────────────
const SITE_PREFIX = 'lonemountaineights';
const CF_API_BASE = 'https://api.cloudflare.com/client/v4';
const BATCH_HOST = 'https://batch.imagedelivery.net';
const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif']);
const SKIP_DIRS = new Set(['icons']); // keep favicons local

// Named variants to create with --setup-variants
const NAMED_VARIANTS = [
  { id: 'heroxl',  options: { fit: 'cover',      width: 2560, height: 1440, metadata: 'none' }, neverRequireSignedURLs: true },
  { id: 'hero',    options: { fit: 'cover',      width: 1920, metadata: 'none' } },
  { id: 'desktop', options: { fit: 'scale-down', width: 1920, height: 1080, metadata: 'none' }, neverRequireSignedURLs: true },
  { id: 'og',      options: { fit: 'cover',      width: 1200, metadata: 'none' } },
  { id: 'tablet',  options: { fit: 'scale-down', width: 1024, height: 768,  metadata: 'none' }, neverRequireSignedURLs: true },
  { id: 'card',    options: { fit: 'cover',      width: 640,  metadata: 'none' } },
  { id: 'thumb',   options: { fit: 'cover',      width: 320,  metadata: 'none' } },
  { id: 'avatar',  options: { fit: 'cover',      width: 160,  metadata: 'none' } },
];

// ── load env from .env (simple parser, no dependency) ───────────────────────
function loadEnv() {
  try {
    const envPath = join(PROJECT_ROOT, '.env');
    const lines = readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    // .env is optional — vars can come from shell
  }
}
loadEnv();

const CF_ACCOUNT_ID = process.env.CF_ACCOUNT_ID;
const CF_API_TOKEN = process.env.CF_API_TOKEN;

// ── CLI flags ───────────────────────────────────────────────────────────────
const DRY_RUN = process.argv.includes('--dry-run');
const LIST_ONLY = process.argv.includes('--list');
const FORCE = process.argv.includes('--force');
const SETUP_VARIANTS = process.argv.includes('--setup-variants');

// ── helpers ─────────────────────────────────────────────────────────────────

/**
 * Sanitise a filename for use as a Cloudflare custom ID path segment.
 * - Lowercase
 * - Replace spaces and underscores with hyphens
 * - Remove redundant suffixes like "_new 2", "_new 03"
 * - Collapse multiple hyphens
 * - Keep the extension
 */
function sanitiseFilename(filename) {
  const ext = extname(filename).toLowerCase();
  let name = basename(filename, extname(filename));

  // Remove common redundant suffixes before sanitising
  name = name.replace(/[_ ]*new[_ ]*\d*/gi, '');

  // Lowercase, replace spaces/underscores with hyphens
  name = name
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/-{2,}/g, '-')    // collapse multiple hyphens
    .replace(/^-|-$/g, '');    // trim leading/trailing hyphens

  return name + ext;
}

/**
 * Derive a category from the subfolder name (hero, agents, photos, og).
 */
function deriveCategory(localPath) {
  // localPath like /images/hero/file.png → hero
  const parts = localPath.split('/').filter(Boolean);
  if (parts.length >= 2) return parts[1]; // images/<category>/...
  return 'general';
}

/**
 * Build the Cloudflare custom ID from a local path.
 * Example: /images/hero/hero-las-vegas.png → lonemountaineights/hero/hero-las-vegas.png
 */
function buildCustomId(localPath) {
  // localPath: /images/hero/hero-las-vegas.png
  const parts = localPath.split('/').filter(Boolean); // ['images', 'hero', 'hero-las-vegas.png']
  const category = parts.length >= 2 ? parts[1] : 'general';
  const originalFilename = parts[parts.length - 1];
  const sanitised = sanitiseFilename(originalFilename);
  return `${SITE_PREFIX}/${category}/${sanitised}`;
}

/** Recursively collect image files from static/images/ */
function collectImages(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      if (!SKIP_DIRS.has(entry)) collectImages(full, files);
    } else if (IMAGE_EXTS.has(extname(entry).toLowerCase())) {
      const localPath = '/' + relative(join(PROJECT_ROOT, 'static'), full).replace(/\\/g, '/');
      const customId = buildCustomId(localPath);
      const category = deriveCategory(localPath);
      files.push({ localPath, absolutePath: full, customId, category });
    }
  }
  return files;
}

// ── Cloudflare API helpers ──────────────────────────────────────────────────

/** Get a batch token for high-throughput API calls */
async function getBatchToken() {
  const url = `${CF_API_BASE}/accounts/${CF_ACCOUNT_ID}/images/v1/batch_token`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${CF_API_TOKEN}` },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to get batch token (${res.status}): ${text}`);
  }

  const json = await res.json();
  if (!json.success) {
    throw new Error(`Batch token error: ${JSON.stringify(json.errors)}`);
  }

  return json.result.token;
}

/**
 * List all images for this site using V2 List API with metadata filtering.
 * Paginates via continuation_token.
 * @param {string} authToken — API token or batch token
 * @param {string} [host] — API host (CF_API_BASE or BATCH_HOST)
 */
async function listSiteImages(authToken, host = CF_API_BASE) {
  const images = [];
  let continuationToken = null;

  do {
    let url = `${host}/accounts/${CF_ACCOUNT_ID}/images/v2?per_page=1000`;
    if (continuationToken) {
      url += `&continuation_token=${encodeURIComponent(continuationToken)}`;
    }

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`List images failed (${res.status}): ${text}`);
    }

    const json = await res.json();
    if (!json.success) {
      throw new Error(`List images error: ${JSON.stringify(json.errors)}`);
    }

    // Filter to our site's images by checking metadata or custom ID prefix
    for (const img of json.result.images || []) {
      const isSiteImage =
        (img.meta && img.meta.site === SITE_PREFIX) ||
        (img.id && img.id.startsWith(`${SITE_PREFIX}/`));
      if (isSiteImage) {
        images.push(img);
      }
    }

    continuationToken = json.result.continuation_token || null;
  } while (continuationToken);

  return images;
}

/**
 * Upload a single image to Cloudflare Images V1 API.
 * Uses custom ID for folder organization.
 */
async function uploadImage(filePath, customId, metadata, authToken, host = CF_API_BASE) {
  const url = `${host}/accounts/${CF_ACCOUNT_ID}/images/v1`;
  const fileData = readFileSync(filePath);
  const fileName = filePath.split(/[\\/]/).pop();

  const form = new FormData();
  form.append('file', new Blob([fileData]), fileName);
  form.append('id', customId);
  form.append('metadata', JSON.stringify(metadata));

  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${authToken}` },
    body: form,
  });

  // 409 = image already exists with this custom ID
  if (res.status === 409) {
    return { id: customId, alreadyExists: true };
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upload failed (${res.status}): ${text}`);
  }

  const json = await res.json();
  if (!json.success) {
    throw new Error(`API error: ${JSON.stringify(json.errors)}`);
  }

  return { ...json.result, alreadyExists: false };
}

/** Delete a single image by ID */
async function deleteImage(imageId, authToken, host = CF_API_BASE) {
  const url = `${host}/accounts/${CF_ACCOUNT_ID}/images/v1/${encodeURIComponent(imageId)}`;
  const res = await fetch(url, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${authToken}` },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Delete failed (${res.status}): ${text}`);
  }

  return true;
}

/** Create a named variant via V1 Variants API */
async function createVariant(variantDef) {
  const url = `${CF_API_BASE}/accounts/${CF_ACCOUNT_ID}/images/v1/variants`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${CF_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(variantDef),
  });

  if (!res.ok) {
    const text = await res.text();
    // 409 or similar means variant already exists
    if (res.status === 409 || text.includes('already exists')) {
      return { id: variantDef.id, alreadyExists: true };
    }
    throw new Error(`Create variant failed (${res.status}): ${text}`);
  }

  const json = await res.json();
  return { ...json.result, alreadyExists: false };
}

/**
 * Auto-write the IMAGE_MAP into src/lib/cloudflare-images.js.
 * Replaces the entire IMAGE_MAP object in-place.
 */
function writeImageMap(mapping) {
  let content = readFileSync(CLOUDFLARE_IMAGES_JS, 'utf-8');

  // Build the new IMAGE_MAP object string
  const entries = Object.entries(mapping)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([localPath, customId]) => `  '${localPath}': '${customId}',`)
    .join('\n');

  const newMapBlock = `export const IMAGE_MAP = {\n${entries}\n};`;

  // Replace the existing IMAGE_MAP block using regex
  const mapRegex = /export const IMAGE_MAP\s*=\s*\{[\s\S]*?\};/;
  if (mapRegex.test(content)) {
    content = content.replace(mapRegex, newMapBlock);
  } else {
    throw new Error('Could not find IMAGE_MAP in cloudflare-images.js');
  }

  writeFileSync(CLOUDFLARE_IMAGES_JS, content);
  console.log(`\nIMAGE_MAP written to: ${CLOUDFLARE_IMAGES_JS}`);
}

// ── commands ────────────────────────────────────────────────────────────────

/** --setup-variants: Create named variants */
async function cmdSetupVariants() {
  console.log('Setting up named variants...');
  console.log('─'.repeat(50));

  for (const v of NAMED_VARIANTS) {
    process.stdout.write(`  Creating variant "${v.id}" (${v.options.width}w, ${v.options.fit}) ... `);
    try {
      const result = await createVariant(v);
      if (result.alreadyExists) {
        console.log('EXISTS (skipped)');
      } else {
        console.log('OK');
      }
    } catch (err) {
      console.log(`FAIL → ${err.message}`);
    }
  }
  console.log('\nDone. Variants are available for all images in this account.');
}

/** --list: List images for this site */
async function cmdList() {
  console.log(`Listing Cloudflare Images for site: ${SITE_PREFIX}`);
  console.log('─'.repeat(50));

  let authToken = CF_API_TOKEN;
  try {
    authToken = await getBatchToken();
    console.log('Using batch token for listing.\n');
  } catch {
    console.log('Batch token unavailable, using API token.\n');
  }

  const images = await listSiteImages(authToken);
  console.log(`Found ${images.length} images:\n`);

  for (const img of images) {
    const path = img.meta?.originalPath || img.id;
    console.log(`  ${img.id}`);
    if (img.meta?.originalPath) console.log(`    ← ${img.meta.originalPath}`);
  }

  console.log(`\n${'─'.repeat(50)}`);
  console.log(`Total: ${images.length} images for site "${SITE_PREFIX}"`);
}

/** Default sync: upload new images, skip existing */
async function cmdSync() {
  console.log('Cloudflare Images Sync');
  console.log('─'.repeat(50));

  // Collect local images
  const localImages = collectImages(STATIC_DIR);
  console.log(`Found ${localImages.length} local images.\n`);

  if (localImages.length === 0) {
    console.log('No images found in static/images/. Nothing to do.');
    return;
  }

  // Show local → Cloudflare mapping
  console.log('Local → Cloudflare ID mapping:\n');
  for (const img of localImages) {
    console.log(`  ${img.localPath}`);
    console.log(`    → ${img.customId}`);
  }
  console.log();

  if (DRY_RUN) {
    console.log('DRY RUN — no uploads performed.');
    // Still write the map with expected IDs
    const mapping = {};
    for (const img of localImages) {
      mapping[img.localPath] = img.customId;
    }
    console.log('\nExpected IMAGE_MAP entries:');
    for (const [path, id] of Object.entries(mapping)) {
      console.log(`  '${path}': '${id}',`);
    }
    return;
  }

  // Get batch token
  let authToken = CF_API_TOKEN;
  let host = CF_API_BASE;
  try {
    authToken = await getBatchToken();
    host = BATCH_HOST;
    console.log('Using batch token (200 req/s, no global rate limit).\n');
  } catch (err) {
    console.log(`Batch token unavailable (${err.message}), using standard API.\n`);
  }

  // List existing images for this site
  console.log('Checking existing images in Cloudflare...');
  let existingMap = new Map(); // customId → image data
  try {
    const existing = await listSiteImages(authToken, host);
    for (const img of existing) {
      existingMap.set(img.id, img);
    }
    console.log(`  Found ${existingMap.size} existing images for this site.\n`);
  } catch (err) {
    console.log(`  Could not list existing (${err.message}). Will handle via 409.\n`);
  }

  // Upload loop
  const mapping = {};
  let uploaded = 0;
  let skipped = 0;
  let failed = 0;
  let deleted = 0;

  for (const img of localImages) {
    const metadata = {
      site: SITE_PREFIX,
      originalPath: img.localPath,
      category: img.category,
      sanitizedId: img.customId,
    };

    // Check if already exists
    if (!FORCE && existingMap.has(img.customId)) {
      mapping[img.localPath] = img.customId;
      console.log(`  SKIP  ${img.localPath}  (already in Cloudflare)`);
      skipped++;
      continue;
    }

    // Force mode: delete first if exists
    if (FORCE && existingMap.has(img.customId)) {
      process.stdout.write(`  DEL   ${img.customId} ... `);
      try {
        await deleteImage(img.customId, authToken, host);
        console.log('OK');
        deleted++;
      } catch (err) {
        console.log(`FAIL → ${err.message}`);
      }
    }

    // Upload
    process.stdout.write(`  UP    ${img.localPath} → ${img.customId} ... `);
    try {
      const result = await uploadImage(img.absolutePath, img.customId, metadata, authToken, host);
      if (result.alreadyExists) {
        console.log('EXISTS (409, using existing)');
        skipped++;
      } else {
        console.log('OK');
        uploaded++;
      }
      mapping[img.localPath] = img.customId;
    } catch (err) {
      console.log(`FAIL → ${err.message}`);
      failed++;
    }
  }

  // Summary
  console.log(`\n${'─'.repeat(50)}`);
  console.log(`Done: ${uploaded} uploaded, ${skipped} skipped, ${deleted} deleted, ${failed} failed.\n`);

  // Write mapping
  if (Object.keys(mapping).length > 0) {
    // Write JSON file for reference
    const outPath = join(__dirname, 'image-map-output.json');
    writeFileSync(outPath, JSON.stringify(mapping, null, 2));
    console.log(`JSON mapping → ${outPath}`);

    // Auto-write IMAGE_MAP into cloudflare-images.js
    writeImageMap(mapping);
  }
}

// ── main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log();
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║   Cloudflare Images Uploader (V1+V2, 2026)      ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log();

  // Validate credentials
  if (!DRY_RUN && (!CF_ACCOUNT_ID || !CF_API_TOKEN)) {
    console.error(
      'ERROR: CF_ACCOUNT_ID and CF_API_TOKEN must be set.\n' +
      'Copy .env.example → .env and fill in the values.\n' +
      'Or run with --dry-run to see which files would be uploaded.',
    );
    process.exit(1);
  }

  // Route to the correct command
  if (SETUP_VARIANTS) {
    await cmdSetupVariants();
  } else if (LIST_ONLY) {
    await cmdList();
  } else {
    await cmdSync();
  }
}

main().catch((err) => {
  console.error('\nFatal error:', err);
  process.exit(1);
});
