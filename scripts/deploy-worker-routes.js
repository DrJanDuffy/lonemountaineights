#!/usr/bin/env node

/**
 * deploy-worker-routes.js
 *
 * Deploys the `realscout-global-injector` Worker route to every active
 * Cloudflare zone in the account (or a single domain with --domain).
 *
 * Usage:
 *   node scripts/deploy-worker-routes.js                     # deploy to all zones
 *   node scripts/deploy-worker-routes.js --dry-run            # preview only
 *   node scripts/deploy-worker-routes.js --domain example.com # single domain
 *   node scripts/deploy-worker-routes.js --domain example.com --dry-run
 *
 * Requires:
 *   CF_API_TOKEN  – Cloudflare API token with Zone:Read and Worker Routes:Edit
 *   CF_ACCOUNT_ID – (optional) used only for logging context
 *
 * Reads from .env in the project root (same file the other scripts use).
 */

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const WORKER_NAME = 'realscout-global-injector';
const CF_API_BASE = 'https://api.cloudflare.com/client/v4';

// ---------------------------------------------------------------------------
// Load .env (minimal – no external dependency)
// ---------------------------------------------------------------------------

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  try {
    const envPath = resolve(__dirname, '..', '.env');
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
    // .env is optional if vars are already in the environment
  }
}

loadEnv();

const CF_API_TOKEN = process.env.CF_API_TOKEN;
if (!CF_API_TOKEN) {
  console.error('ERROR: CF_API_TOKEN is not set. Add it to .env or export it.');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const domainIdx = args.indexOf('--domain');
const SINGLE_DOMAIN = domainIdx !== -1 ? args[domainIdx + 1] : null;

if (domainIdx !== -1 && !SINGLE_DOMAIN) {
  console.error('ERROR: --domain requires a value (e.g. --domain example.com)');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Cloudflare API helpers
// ---------------------------------------------------------------------------

const headers = {
  Authorization: `Bearer ${CF_API_TOKEN}`,
  'Content-Type': 'application/json',
};

async function cfGet(path) {
  const res = await fetch(`${CF_API_BASE}${path}`, { headers });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`CF API GET ${path} failed (${res.status}): ${body}`);
  }
  return res.json();
}

async function cfPost(path, body) {
  const res = await fetch(`${CF_API_BASE}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`CF API POST ${path} failed (${res.status}): ${text}`);
  }
  return res.json();
}

// ---------------------------------------------------------------------------
// Fetch all active zones (paginated)
// ---------------------------------------------------------------------------

async function getAllActiveZones() {
  const zones = [];
  let page = 1;
  const perPage = 50;

  while (true) {
    const data = await cfGet(
      `/zones?per_page=${perPage}&page=${page}&status=active`,
    );
    zones.push(...data.result);
    if (data.result.length < perPage) break;
    page++;
  }

  return zones;
}

// ---------------------------------------------------------------------------
// Get existing Worker routes for a zone
// ---------------------------------------------------------------------------

async function getWorkerRoutes(zoneId) {
  const data = await cfGet(`/zones/${zoneId}/workers/routes`);
  return data.result || [];
}

// ---------------------------------------------------------------------------
// Create a Worker route for a zone
// ---------------------------------------------------------------------------

async function createWorkerRoute(zoneId, pattern) {
  return cfPost(`/zones/${zoneId}/workers/routes`, {
    pattern,
    script: WORKER_NAME,
  });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('='.repeat(60));
  console.log(`  RealScout Worker Route Deployer`);
  console.log(`  Worker: ${WORKER_NAME}`);
  if (DRY_RUN) console.log('  MODE: DRY RUN (no changes will be made)');
  if (SINGLE_DOMAIN) console.log(`  TARGET: ${SINGLE_DOMAIN} only`);
  console.log('='.repeat(60));
  console.log();

  // 1. Fetch zones
  console.log('Fetching active zones...');
  let zones = await getAllActiveZones();
  console.log(`  Found ${zones.length} active zone(s)\n`);

  // Filter to single domain if requested
  if (SINGLE_DOMAIN) {
    zones = zones.filter((z) => z.name === SINGLE_DOMAIN);
    if (zones.length === 0) {
      console.error(`ERROR: Zone "${SINGLE_DOMAIN}" not found or not active.`);
      process.exit(1);
    }
  }

  // 2. Process each zone
  const summary = { added: 0, skipped: 0, failed: 0 };

  for (const zone of zones) {
    const domain = zone.name;
    const pattern = `*${domain}/*`;

    try {
      // Check existing routes
      const existingRoutes = await getWorkerRoutes(zone.id);
      const alreadyExists = existingRoutes.some(
        (r) => r.pattern === pattern && r.script === WORKER_NAME,
      );

      if (alreadyExists) {
        console.log(`  SKIP  ${domain} (route already exists)`);
        summary.skipped++;
        continue;
      }

      if (DRY_RUN) {
        console.log(`  WOULD ADD  ${domain}  →  ${pattern}`);
        summary.added++;
        continue;
      }

      // Create route
      await createWorkerRoute(zone.id, pattern);
      console.log(`  ADDED  ${domain}  →  ${pattern}`);
      summary.added++;
    } catch (err) {
      console.error(`  FAIL  ${domain}: ${err.message}`);
      summary.failed++;
    }
  }

  // 3. Summary
  console.log();
  console.log('-'.repeat(60));
  console.log(`  Summary${DRY_RUN ? ' (DRY RUN)' : ''}:`);
  console.log(`    Added:   ${summary.added}`);
  console.log(`    Skipped: ${summary.skipped}`);
  console.log(`    Failed:  ${summary.failed}`);
  console.log('-'.repeat(60));
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
