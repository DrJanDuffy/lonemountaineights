#!/usr/bin/env node
/**
 * deploy-nextjs-routes.js — Deploy Worker routes to all detected Next.js sites
 * Uses scan results from detect-nextjs-sites.js
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const CF_API = 'https://api.cloudflare.com/client/v4';
const WORKER_NAME = 'realscout-global-injector';

// New token with Workers Routes: Edit permission
const CF_API_TOKEN = process.env.CF_WORKER_TOKEN || process.argv[2];

if (!CF_API_TOKEN) {
  console.error('Usage: CF_WORKER_TOKEN=xxx node scripts/deploy-nextjs-routes.js');
  console.error('   or: node scripts/deploy-nextjs-routes.js <token>');
  process.exit(1);
}

const headers = {
  'Authorization': `Bearer ${CF_API_TOKEN}`,
  'Content-Type': 'application/json',
};

// Load scan results
const scanPath = join(__dirname, 'site-scan-results.json');
const scan = JSON.parse(readFileSync(scanPath, 'utf-8'));
const nextjsSites = scan.nextjsSites;

console.log(`\nDeploying Worker routes to ${nextjsSites.length} Next.js sites...\n`);

let added = 0, skipped = 0, failed = 0;

for (const site of nextjsSites) {
  const { domain, zoneId } = site;
  const pattern = `*${domain}/*`;

  try {
    // Check existing routes first
    const listRes = await fetch(`${CF_API}/zones/${zoneId}/workers/routes`, { headers });
    const listJson = await listRes.json();
    
    if (listJson.success) {
      const existing = (listJson.result || []).find(
        r => r.script === WORKER_NAME && r.pattern === pattern
      );
      if (existing) {
        console.log(`  SKIP  ${domain} — route already exists`);
        skipped++;
        continue;
      }
    }

    // Create route
    const res = await fetch(`${CF_API}/zones/${zoneId}/workers/routes`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ pattern, script: WORKER_NAME }),
    });
    const json = await res.json();

    if (json.success) {
      console.log(`  ADD   ${domain} — ${pattern} -> ${WORKER_NAME}`);
      added++;
    } else {
      const errCode = json.errors?.[0]?.code;
      if (errCode === 10020) {
        console.log(`  SKIP  ${domain} — route already exists (API)`);
        skipped++;
      } else {
        console.log(`  FAIL  ${domain} — ${json.errors?.[0]?.message || 'unknown error'}`);
        failed++;
      }
    }
  } catch (err) {
    console.log(`  FAIL  ${domain} — ${err.message}`);
    failed++;
  }

  // Rate limit safety
  await new Promise(r => setTimeout(r, 150));
}

console.log(`\n${'─'.repeat(55)}`);
console.log(`Done: ${added} added, ${skipped} already existed, ${failed} failed`);
console.log(`Total Next.js sites processed: ${nextjsSites.length}\n`);
