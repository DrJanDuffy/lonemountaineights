#!/usr/bin/env node
/**
 * detect-nextjs-sites.js — Scan all Cloudflare zones and identify Next.js sites
 * 
 * Checks for:
 *   - __NEXT_DATA__ in HTML (SSR marker)
 *   - /_next/ asset references (static assets)
 *   - x-powered-by: Next.js header
 *   - x-vercel-id header (Vercel deployment)
 *   - SvelteKit markers (data-sveltekit, __sveltekit)
 * 
 * Usage:
 *   node scripts/detect-nextjs-sites.js
 *   node scripts/detect-nextjs-sites.js --output results.json
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');

// Load .env
function loadEnv() {
  try {
    const lines = readFileSync(join(PROJECT_ROOT, '.env'), 'utf-8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      if (!process.env[key]) process.env[key] = val;
    }
  } catch { /* ok */ }
}
loadEnv();

const CF_API = 'https://api.cloudflare.com/client/v4';
const CF_API_TOKEN = process.env.CF_API_TOKEN;

async function listAllZones() {
  const zones = [];
  let page = 1;
  while (true) {
    const res = await fetch(`${CF_API}/zones?status=active&per_page=50&page=${page}`, {
      headers: { 'Authorization': `Bearer ${CF_API_TOKEN}` },
    });
    const json = await res.json();
    if (!json.success) throw new Error(JSON.stringify(json.errors));
    zones.push(...json.result);
    if (page >= (json.result_info?.total_pages || 1)) break;
    page++;
  }
  return zones;
}

async function probesite(domain, timeout = 8000) {
  const result = {
    domain,
    isNextJs: false,
    isSvelteKit: false,
    isLive: false,
    framework: 'unknown',
    markers: [],
    error: null,
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(`https://${domain}/`, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SiteScanner/1.0)' },
      redirect: 'follow',
    });

    clearTimeout(timer);
    result.isLive = true;

    // Check headers
    const poweredBy = res.headers.get('x-powered-by') || '';
    const vercelId = res.headers.get('x-vercel-id');
    const vercelCache = res.headers.get('x-vercel-cache');
    const server = res.headers.get('server') || '';

    if (poweredBy.toLowerCase().includes('next.js')) {
      result.markers.push('header:x-powered-by:Next.js');
    }
    if (vercelId) result.markers.push(`header:x-vercel-id:${vercelId}`);
    if (vercelCache) result.markers.push(`header:x-vercel-cache:${vercelCache}`);
    if (server.toLowerCase().includes('vercel')) result.markers.push('header:server:vercel');

    // Check body
    const body = await res.text();

    if (body.includes('__NEXT_DATA__')) result.markers.push('body:__NEXT_DATA__');
    if (body.includes('/_next/')) result.markers.push('body:/_next/');
    if (body.includes('next/dist')) result.markers.push('body:next/dist');

    if (body.includes('data-sveltekit') || body.includes('__sveltekit')) {
      result.markers.push('body:sveltekit');
    }
    if (body.includes('.svelte-kit') || body.includes('_app/immutable')) {
      result.markers.push('body:sveltekit-assets');
    }

    // Detect Elder.js
    if (body.includes('elderjs') || body.includes('elder.js')) {
      result.markers.push('body:elderjs');
    }

    // Detect WordPress
    if (body.includes('wp-content') || body.includes('wp-includes')) {
      result.markers.push('body:wordpress');
    }

    // Detect parked/empty
    if (body.includes('This site can') || body.includes('domain is parked') || body.length < 500) {
      result.markers.push('body:parked-or-empty');
    }

    // Determine framework
    const hasNextMarkers = result.markers.some(m =>
      m.includes('__NEXT_DATA__') || m.includes('/_next/') || m.includes('x-powered-by:Next.js')
    );
    const hasSvelteMarkers = result.markers.some(m =>
      m.includes('sveltekit')
    );

    if (hasNextMarkers) {
      result.isNextJs = true;
      result.framework = 'nextjs';
    } else if (hasSvelteMarkers) {
      result.isSvelteKit = true;
      result.framework = 'sveltekit';
    } else if (result.markers.some(m => m.includes('elderjs'))) {
      result.framework = 'elderjs';
    } else if (result.markers.some(m => m.includes('wordpress'))) {
      result.framework = 'wordpress';
    } else if (result.markers.some(m => m.includes('parked-or-empty'))) {
      result.framework = 'parked';
    } else if (result.markers.some(m => m.includes('vercel'))) {
      result.framework = 'vercel-other';
    }

  } catch (err) {
    clearTimeout(timer);
    result.error = err.name === 'AbortError' ? 'timeout' : err.message;
  }

  return result;
}

async function main() {
  console.log('Fetching zones from Cloudflare...');
  const zones = await listAllZones();
  console.log(`Found ${zones.length} zones. Scanning for Next.js...\n`);

  // Process in batches of 10 to avoid overwhelming
  const results = [];
  const batchSize = 10;

  for (let i = 0; i < zones.length; i += batchSize) {
    const batch = zones.slice(i, i + batchSize);
    const progress = `[${i + 1}-${Math.min(i + batchSize, zones.length)}/${zones.length}]`;
    process.stdout.write(`${progress} Scanning ${batch.map(z => z.name).join(', ')}...`);

    const batchResults = await Promise.all(
      batch.map(z => probesite(z.name))
    );

    for (const r of batchResults) {
      r.zoneId = zones.find(z => z.name === r.domain)?.id;
      results.push(r);

      if (r.isNextJs) process.stdout.write(` [NEXT.JS: ${r.domain}]`);
    }
    console.log(' done');
  }

  // Categorize results
  const nextjsSites = results.filter(r => r.isNextJs);
  const sveltekitSites = results.filter(r => r.isSvelteKit);
  const liveSites = results.filter(r => r.isLive);
  const deadSites = results.filter(r => !r.isLive);
  const parked = results.filter(r => r.framework === 'parked');

  console.log('\n' + '═'.repeat(60));
  console.log('SCAN RESULTS');
  console.log('═'.repeat(60));

  console.log(`\nTotal zones: ${results.length}`);
  console.log(`Live sites:  ${liveSites.length}`);
  console.log(`Dead/unreachable: ${deadSites.length}`);
  console.log(`Parked/empty: ${parked.length}`);

  console.log(`\n--- Next.js Sites (${nextjsSites.length}) ---`);
  for (const s of nextjsSites) {
    console.log(`  ${s.domain} (zone: ${s.zoneId})`);
    console.log(`    Markers: ${s.markers.join(', ')}`);
  }

  console.log(`\n--- SvelteKit Sites (${sveltekitSites.length}) ---`);
  for (const s of sveltekitSites) {
    console.log(`  ${s.domain}`);
  }

  console.log(`\n--- Other Frameworks ---`);
  const otherFrameworks = {};
  for (const r of results) {
    if (!r.isNextJs && !r.isSvelteKit) {
      if (!otherFrameworks[r.framework]) otherFrameworks[r.framework] = [];
      otherFrameworks[r.framework].push(r.domain);
    }
  }
  for (const [fw, domains] of Object.entries(otherFrameworks)) {
    console.log(`  ${fw}: ${domains.length} domains`);
    if (domains.length <= 10) {
      for (const d of domains) console.log(`    ${d}`);
    }
  }

  // Save results
  const outputPath = join(PROJECT_ROOT, 'scripts', 'site-scan-results.json');
  writeFileSync(outputPath, JSON.stringify({
    scannedAt: new Date().toISOString(),
    totalZones: results.length,
    summary: {
      nextjs: nextjsSites.length,
      sveltekit: sveltekitSites.length,
      live: liveSites.length,
      dead: deadSites.length,
      parked: parked.length,
    },
    nextjsSites: nextjsSites.map(s => ({ domain: s.domain, zoneId: s.zoneId, markers: s.markers })),
    sveltekitSites: sveltekitSites.map(s => ({ domain: s.domain, zoneId: s.zoneId })),
    allResults: results,
  }, null, 2));

  console.log(`\nFull results saved to: ${outputPath}`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
