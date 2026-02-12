#!/usr/bin/env node
/**
 * cf-upload.js  —  Ad-hoc Cloudflare Images uploader
 *
 * Upload individual files or entire directories with custom paths.
 * Designed for on-the-fly uploads: MLS photos, neighborhood images,
 * headshots, branding assets, etc.
 *
 * Usage
 * ─────
 *   # Upload a single file with custom prefix and name
 *   node scripts/cf-upload.js --file photo.jpg --prefix neighborhoods/summerlin --name the-ridges-aerial-view
 *
 *   # Upload all images in a directory
 *   node scripts/cf-upload.js --dir ./mls-photos --prefix listings/2500456
 *
 *   # Upload with explicit site prefix (default: lonemountaineights)
 *   node scripts/cf-upload.js --file logo.png --prefix branding --site heritage-stonebridge
 *
 *   # Dry run — see what would be uploaded
 *   node scripts/cf-upload.js --file photo.jpg --prefix test --dry-run
 *
 *   # List all images under a prefix
 *   node scripts/cf-upload.js --list --prefix listings/2500456
 *
 *   # Delete an image by its Cloudflare ID
 *   node scripts/cf-upload.js --delete lonemountaineights/listings/2500456/photo-1.jpg
 *
 * Output
 * ──────
 *   Prints the full delivery URL for each uploaded image so you can
 *   paste it directly into components, schema, or content.
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname, basename, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// ── resolve project root ────────────────────────────────────────────────────
const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');

// ── constants ───────────────────────────────────────────────────────────────
const CF_API_BASE = 'https://api.cloudflare.com/client/v4';
const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif']);

// ── load env ────────────────────────────────────────────────────────────────
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
  } catch { /* .env optional */ }
}
loadEnv();

const CF_ACCOUNT_ID = process.env.CF_ACCOUNT_ID;
const CF_API_TOKEN = process.env.CF_API_TOKEN;
const CF_ACCOUNT_HASH = process.env.VITE_CF_ACCOUNT_HASH;

// ── CLI argument parsing ────────────────────────────────────────────────────
function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    file: null,
    dir: null,
    prefix: null,
    name: null,
    site: 'lonemountaineights',
    dryRun: false,
    list: false,
    delete: null,
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--file':     opts.file = args[++i]; break;
      case '--dir':      opts.dir = args[++i]; break;
      case '--prefix':   opts.prefix = args[++i]; break;
      case '--name':     opts.name = args[++i]; break;
      case '--site':     opts.site = args[++i]; break;
      case '--dry-run':  opts.dryRun = true; break;
      case '--list':     opts.list = true; break;
      case '--delete':   opts.delete = args[++i]; break;
    }
  }

  return opts;
}

// ── helpers ─────────────────────────────────────────────────────────────────

/** Sanitise a filename for URL-safe Cloudflare custom ID */
function sanitise(filename) {
  const ext = extname(filename).toLowerCase();
  let name = basename(filename, extname(filename));
  name = name
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '');
  return name + ext;
}

/** Build the full custom ID: site/prefix/name.ext */
function buildId(site, prefix, filename) {
  const parts = [site];
  if (prefix) parts.push(prefix.replace(/^\/|\/$/g, ''));
  parts.push(sanitise(filename));
  return parts.join('/');
}

/** Build delivery URL */
function deliveryUrl(customId, variant = 'public') {
  return `https://imagedelivery.net/${CF_ACCOUNT_HASH}/${customId}/${variant}`;
}

/** Upload a single file */
async function uploadFile(filePath, customId, metadata) {
  const url = `${CF_API_BASE}/accounts/${CF_ACCOUNT_ID}/images/v1`;
  const fileData = readFileSync(filePath);
  const fileName = basename(filePath);

  const form = new FormData();
  form.append('file', new Blob([fileData]), fileName);
  form.append('id', customId);
  form.append('metadata', JSON.stringify(metadata));

  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${CF_API_TOKEN}` },
    body: form,
  });

  if (res.status === 409) {
    return { id: customId, alreadyExists: true };
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upload failed (${res.status}): ${text}`);
  }

  const json = await res.json();
  if (!json.success) throw new Error(`API error: ${JSON.stringify(json.errors)}`);
  return { ...json.result, alreadyExists: false };
}

/** List images by prefix using V2 API */
async function listByPrefix(site, prefix) {
  const images = [];
  let continuationToken = null;
  const idPrefix = prefix ? `${site}/${prefix}` : site;

  do {
    let url = `${CF_API_BASE}/accounts/${CF_ACCOUNT_ID}/images/v2?per_page=1000`;
    if (continuationToken) url += `&continuation_token=${encodeURIComponent(continuationToken)}`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${CF_API_TOKEN}` },
    });

    if (!res.ok) throw new Error(`List failed (${res.status}): ${await res.text()}`);
    const json = await res.json();
    if (!json.success) throw new Error(`List error: ${JSON.stringify(json.errors)}`);

    for (const img of json.result.images || []) {
      if (img.id && img.id.startsWith(idPrefix)) {
        images.push(img);
      }
    }

    continuationToken = json.result.continuation_token || null;
  } while (continuationToken);

  return images;
}

/** Delete an image by ID */
async function deleteImage(imageId) {
  const url = `${CF_API_BASE}/accounts/${CF_ACCOUNT_ID}/images/v1/${encodeURIComponent(imageId)}`;
  const res = await fetch(url, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${CF_API_TOKEN}` },
  });
  if (!res.ok) throw new Error(`Delete failed (${res.status}): ${await res.text()}`);
  return true;
}

/** Collect image files from a directory */
function collectDir(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isFile() && IMAGE_EXTS.has(extname(entry).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

// ── commands ────────────────────────────────────────────────────────────────

async function main() {
  const opts = parseArgs();

  if (!CF_ACCOUNT_ID || !CF_API_TOKEN || !CF_ACCOUNT_HASH) {
    if (!opts.dryRun) {
      console.error('ERROR: CF_ACCOUNT_ID, CF_API_TOKEN, and VITE_CF_ACCOUNT_HASH must be set in .env');
      process.exit(1);
    }
  }

  // ── --list ──────────────────────────────────────────────────────────
  if (opts.list) {
    const prefix = opts.prefix || '';
    console.log(`\nListing images: ${opts.site}/${prefix || '(all)'}\n`);
    const images = await listByPrefix(opts.site, prefix);
    for (const img of images) {
      console.log(`  ${img.id}`);
      console.log(`    ${deliveryUrl(img.id, 'card')}`);
    }
    console.log(`\nTotal: ${images.length} images\n`);
    return;
  }

  // ── --delete ────────────────────────────────────────────────────────
  if (opts.delete) {
    console.log(`\nDeleting: ${opts.delete}`);
    if (opts.dryRun) {
      console.log('  DRY RUN — not deleted.\n');
      return;
    }
    await deleteImage(opts.delete);
    console.log('  Deleted.\n');
    return;
  }

  // ── --file or --dir ─────────────────────────────────────────────────
  if (!opts.file && !opts.dir) {
    console.error(`
Usage:
  node scripts/cf-upload.js --file <path> --prefix <folder> [--name <custom-name>]
  node scripts/cf-upload.js --dir <path>  --prefix <folder>
  node scripts/cf-upload.js --list [--prefix <folder>]
  node scripts/cf-upload.js --delete <cloudflare-id>

Options:
  --file <path>      Single file to upload
  --dir <path>       Directory of images to upload
  --prefix <folder>  Cloudflare folder path (e.g. neighborhoods/summerlin)
  --name <name>      Custom filename (without extension, single file only)
  --site <site>      Site prefix (default: lonemountaineights)
  --dry-run          Preview without uploading
`);
    process.exit(1);
  }

  // Build file list
  let files = [];

  if (opts.file) {
    const filePath = resolve(opts.file);
    if (!existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      process.exit(1);
    }
    // Use custom name if provided, otherwise use original filename
    const ext = extname(filePath).toLowerCase();
    const displayName = opts.name ? `${opts.name}${ext}` : basename(filePath);
    files.push({ path: filePath, name: displayName });
  }

  if (opts.dir) {
    const dirPath = resolve(opts.dir);
    if (!existsSync(dirPath)) {
      console.error(`Directory not found: ${dirPath}`);
      process.exit(1);
    }
    const found = collectDir(dirPath);
    if (found.length === 0) {
      console.error(`No images found in: ${dirPath}`);
      process.exit(1);
    }
    for (const f of found) {
      files.push({ path: f, name: basename(f) });
    }
  }

  console.log(`\nCloudflare Images Upload`);
  console.log('─'.repeat(50));
  console.log(`  Site:   ${opts.site}`);
  console.log(`  Prefix: ${opts.prefix || '(root)'}`);
  console.log(`  Files:  ${files.length}\n`);

  let uploaded = 0;
  let skipped = 0;

  for (const file of files) {
    const customId = buildId(opts.site, opts.prefix, file.name);
    const metadata = {
      site: opts.site,
      originalFile: basename(file.path),
      prefix: opts.prefix || '',
      uploadedAt: new Date().toISOString(),
    };

    if (opts.dryRun) {
      console.log(`  DRY  ${basename(file.path)}`);
      console.log(`    → ${customId}`);
      console.log(`    → ${deliveryUrl(customId, 'card')}`);
      continue;
    }

    process.stdout.write(`  UP   ${basename(file.path)} → ${customId} ... `);
    try {
      const result = await uploadFile(file.path, customId, metadata);
      if (result.alreadyExists) {
        console.log('EXISTS');
        skipped++;
      } else {
        console.log('OK');
        uploaded++;
      }

      // Print delivery URLs
      console.log(`         hero:   ${deliveryUrl(customId, 'hero')}`);
      console.log(`         card:   ${deliveryUrl(customId, 'card')}`);
      console.log(`         thumb:  ${deliveryUrl(customId, 'thumb')}`);
      console.log(`         og:     ${deliveryUrl(customId, 'og')}`);
    } catch (err) {
      console.log(`FAIL → ${err.message}`);
    }
  }

  if (!opts.dryRun) {
    console.log(`\n${'─'.repeat(50)}`);
    console.log(`Done: ${uploaded} uploaded, ${skipped} already existed.\n`);
  }
}

main().catch((err) => {
  console.error('\nFatal error:', err);
  process.exit(1);
});
