#!/usr/bin/env node
/**
 * deploy-worker-routes.js — Bulk Worker route deployment
 *
 * Adds (or verifies) the `realscout-global-injector` Worker route
 * across all active Cloudflare zones in your account.
 *
 * Usage
 * ─────
 *   node scripts/deploy-worker-routes.js                         # deploy to ALL zones
 *   node scripts/deploy-worker-routes.js --dry-run               # preview without changes
 *   node scripts/deploy-worker-routes.js --domain example.com    # single domain test
 *   node scripts/deploy-worker-routes.js --list                  # list current routes
 *   node scripts/deploy-worker-routes.js --remove                # remove routes from all zones
 *   node scripts/deploy-worker-routes.js --remove --domain x.com # remove from one zone
 *
 * Prerequisites
 * ─────────────
 *   1. CF_API_TOKEN in .env (needs Zone:Read + Worker Routes:Edit permissions)
 *   2. The Worker must already be deployed: cd workers/realscout-global-injector && npx wrangler deploy
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// ── resolve project root ────────────────────────────────────────────────────
const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');

// ── constants ───────────────────────────────────────────────────────────────
const CF_API = 'https://api.cloudflare.com/client/v4';
const WORKER_NAME = 'realscout-global-injector';

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

const CF_API_TOKEN = process.env.CF_API_TOKEN;

// ── CLI flags ───────────────────────────────────────────────────────────────
function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { dryRun: false, domain: null, list: false, remove: false };
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--dry-run':  opts.dryRun = true; break;
      case '--domain':   opts.domain = args[++i]; break;
      case '--list':     opts.list = true; break;
      case '--remove':   opts.remove = true; break;
    }
  }
  return opts;
}

// ── Cloudflare API helpers ──────────────────────────────────────────────────

const headers = {
  'Authorization': `Bearer ${CF_API_TOKEN}`,
  'Content-Type': 'application/json',
};

/** Fetch all active zones (paginated) */
async function listAllZones() {
  const zones = [];
  let page = 1;

  while (true) {
    const res = await fetch(
      `${CF_API}/zones?status=active&per_page=50&page=${page}`,
      { headers },
    );
    if (!res.ok) {
      throw new Error(`List zones failed (${res.status}): ${await res.text()}`);
    }
    const json = await res.json();
    if (!json.success) throw new Error(`API error: ${JSON.stringify(json.errors)}`);

    zones.push(...json.result);

    // Check if there are more pages
    const totalPages = json.result_info?.total_pages || 1;
    if (page >= totalPages) break;
    page++;
  }

  return zones;
}

/** List Worker routes for a zone */
async function listRoutes(zoneId) {
  const res = await fetch(`${CF_API}/zones/${zoneId}/workers/routes`, { headers });
  if (!res.ok) throw new Error(`List routes failed (${res.status})`);
  const json = await res.json();
  if (!json.success) throw new Error(`API error: ${JSON.stringify(json.errors)}`);
  return json.result || [];
}

/** Create a Worker route for a zone */
async function createRoute(zoneId, pattern) {
  const res = await fetch(`${CF_API}/zones/${zoneId}/workers/routes`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ pattern, script: WORKER_NAME }),
  });

  if (!res.ok) {
    const text = await res.text();
    // 10020 = route pattern already exists
    if (text.includes('10020') || text.includes('already exists')) {
      return { alreadyExists: true };
    }
    throw new Error(`Create route failed (${res.status}): ${text}`);
  }

  const json = await res.json();
  if (!json.success) throw new Error(`API error: ${JSON.stringify(json.errors)}`);
  return { ...json.result, alreadyExists: false };
}

/** Delete a Worker route */
async function deleteRoute(zoneId, routeId) {
  const res = await fetch(`${CF_API}/zones/${zoneId}/workers/routes/${routeId}`, {
    method: 'DELETE',
    headers,
  });
  if (!res.ok) throw new Error(`Delete route failed (${res.status}): ${await res.text()}`);
  return true;
}

// ── Commands ────────────────────────────────────────────────────────────────

async function cmdList(zones) {
  console.log(`\nListing Worker routes for ${zones.length} zone(s):\n`);

  for (const zone of zones) {
    const routes = await listRoutes(zone.id);
    const workerRoutes = routes.filter(r => r.script === WORKER_NAME);

    if (workerRoutes.length > 0) {
      console.log(`  ${zone.name} (${zone.id})`);
      for (const r of workerRoutes) {
        console.log(`    ${r.pattern}  →  ${r.script}  [${r.id}]`);
      }
    }
  }
  console.log();
}

async function cmdDeploy(zones, dryRun) {
  console.log(`\n${dryRun ? 'DRY RUN: ' : ''}Deploying Worker routes to ${zones.length} zone(s):\n`);

  let added = 0;
  let skipped = 0;
  let failed = 0;

  for (const zone of zones) {
    const pattern = `*${zone.name}/*`;

    // Check existing routes
    let existingRoutes;
    try {
      existingRoutes = await listRoutes(zone.id);
    } catch (err) {
      console.log(`  FAIL  ${zone.name}  →  cannot list routes: ${err.message}`);
      failed++;
      continue;
    }

    // Check if route already exists for this worker
    const hasRoute = existingRoutes.some(
      r => r.script === WORKER_NAME && r.pattern === pattern,
    );

    if (hasRoute) {
      console.log(`  SKIP  ${zone.name}  →  route already exists`);
      skipped++;
      continue;
    }

    if (dryRun) {
      console.log(`  WOULD ADD  ${pattern}  →  ${WORKER_NAME}  (zone: ${zone.name})`);
      added++;
      continue;
    }

    // Create the route
    try {
      const result = await createRoute(zone.id, pattern);
      if (result.alreadyExists) {
        console.log(`  SKIP  ${zone.name}  →  route already exists (API)`);
        skipped++;
      } else {
        console.log(`  ADD   ${pattern}  →  ${WORKER_NAME}  (zone: ${zone.name})`);
        added++;
      }
    } catch (err) {
      console.log(`  FAIL  ${zone.name}  →  ${err.message}`);
      failed++;
    }

    // Small delay to avoid rate limits
    await new Promise(r => setTimeout(r, 100));
  }

  console.log(`\n${'─'.repeat(50)}`);
  console.log(`Done: ${added} added, ${skipped} skipped, ${failed} failed.\n`);
}

async function cmdRemove(zones, dryRun) {
  console.log(`\n${dryRun ? 'DRY RUN: ' : ''}Removing Worker routes from ${zones.length} zone(s):\n`);

  let removed = 0;
  let skipped = 0;

  for (const zone of zones) {
    let routes;
    try {
      routes = await listRoutes(zone.id);
    } catch {
      continue;
    }

    const workerRoutes = routes.filter(r => r.script === WORKER_NAME);

    if (workerRoutes.length === 0) {
      skipped++;
      continue;
    }

    for (const route of workerRoutes) {
      if (dryRun) {
        console.log(`  WOULD REMOVE  ${route.pattern}  from  ${zone.name}`);
        removed++;
      } else {
        try {
          await deleteRoute(zone.id, route.id);
          console.log(`  REMOVED  ${route.pattern}  from  ${zone.name}`);
          removed++;
        } catch (err) {
          console.log(`  FAIL  ${zone.name}  →  ${err.message}`);
        }
      }
    }

    await new Promise(r => setTimeout(r, 100));
  }

  console.log(`\n${'─'.repeat(50)}`);
  console.log(`Done: ${removed} removed, ${skipped} zones had no routes.\n`);
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const opts = parseArgs();

  console.log();
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║   Worker Route Deployment Tool                   ║');
  console.log(`║   Worker: ${WORKER_NAME}       ║`);
  console.log('╚══════════════════════════════════════════════════╝');

  if (!CF_API_TOKEN) {
    console.error('\nERROR: CF_API_TOKEN must be set in .env\n');
    process.exit(1);
  }

  // Fetch zones
  console.log('\nFetching zones...');
  let zones = await listAllZones();
  console.log(`Found ${zones.length} active zones.`);

  // Filter to single domain if specified
  if (opts.domain) {
    zones = zones.filter(z => z.name === opts.domain);
    if (zones.length === 0) {
      console.error(`\nERROR: Domain "${opts.domain}" not found in your Cloudflare account.\n`);
      console.error('Available zones:');
      const allZones = await listAllZones();
      for (const z of allZones.slice(0, 20)) {
        console.error(`  ${z.name}`);
      }
      if (allZones.length > 20) console.error(`  ... and ${allZones.length - 20} more`);
      process.exit(1);
    }
    console.log(`Filtered to: ${zones[0].name}`);
  }

  // Route to command
  if (opts.list) {
    await cmdList(zones);
  } else if (opts.remove) {
    await cmdRemove(zones, opts.dryRun);
  } else {
    await cmdDeploy(zones, opts.dryRun);
  }
}

main().catch((err) => {
  console.error('\nFatal error:', err);
  process.exit(1);
});
