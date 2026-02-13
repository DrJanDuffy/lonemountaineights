#!/usr/bin/env node
/**
 * check-live-sites.js — Deep probe of non-Next.js domains
 * Determines which domains actually need a new site vs. already have content.
 *
 * Categories:
 *   LIVE      — Has real content (WordPress, custom site, etc.) — DO NOT overwrite
 *   VERCEL    — On Vercel already with some content — DO NOT overwrite
 *   REDIRECT  — Redirects to another site — skip
 *   PARKED    — Parked/placeholder page — candidate for template
 *   ERROR     — Shows error page (404, 500, etc.) — candidate for template
 *   DEAD      — DNS failure / unreachable — needs DNS setup first
 *   EMPTY     — Resolves but minimal/no content — candidate for template
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Load scan results
const scan = JSON.parse(readFileSync(join(__dirname, 'site-scan-results.json'), 'utf-8'));

// Get non-Next.js, non-SvelteKit domains
const nextjsDomains = new Set(scan.nextjsSites.map(s => s.domain));
const sveltekitDomains = new Set(scan.sveltekitSites.map(s => s.domain));
const toCheck = scan.allResults.filter(r => !nextjsDomains.has(r.domain) && !sveltekitDomains.has(r.domain));

console.log(`Checking ${toCheck.length} non-Next.js/non-SvelteKit domains...\n`);

async function deepProbe(domain, timeout = 10000) {
  const result = {
    domain,
    zoneId: toCheck.find(t => t.domain === domain)?.zoneId,
    status: 'UNKNOWN',
    httpStatus: null,
    contentLength: 0,
    redirectTo: null,
    hasRealContent: false,
    details: [],
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    // First try with redirect: 'manual' to detect redirects
    const manualRes = await fetch(`https://${domain}/`, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SiteChecker/1.0)' },
      redirect: 'manual',
    });

    result.httpStatus = manualRes.status;

    // Check for redirect
    if ([301, 302, 303, 307, 308].includes(manualRes.status)) {
      const location = manualRes.headers.get('location') || '';
      result.redirectTo = location;
      // If redirecting to same domain (http->https, www->non-www), follow it
      if (location.includes(domain)) {
        result.details.push(`Self-redirect: ${location}`);
      } else {
        result.status = 'REDIRECT';
        result.details.push(`Redirects to: ${location}`);
        clearTimeout(timer);
        return result;
      }
    }

    // Now follow redirects and get actual content
    const controller2 = new AbortController();
    const timer2 = setTimeout(() => controller2.abort(), timeout);

    const res = await fetch(`https://${domain}/`, {
      signal: controller2.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SiteChecker/1.0)' },
      redirect: 'follow',
    });

    clearTimeout(timer2);

    const body = await res.text();
    result.contentLength = body.length;
    result.httpStatus = res.status;

    // Check headers
    const server = (res.headers.get('server') || '').toLowerCase();
    const poweredBy = (res.headers.get('x-powered-by') || '').toLowerCase();
    const vercelId = res.headers.get('x-vercel-id');

    if (vercelId) result.details.push('On Vercel');
    if (server.includes('cloudflare')) result.details.push('On Cloudflare');
    if (server.includes('apache') || server.includes('nginx')) result.details.push(`Server: ${server}`);
    if (poweredBy) result.details.push(`Powered by: ${poweredBy}`);

    // Analyze body content
    const bodyLower = body.toLowerCase();

    // WordPress detection
    if (bodyLower.includes('wp-content') || bodyLower.includes('wp-includes') || bodyLower.includes('wordpress')) {
      result.hasRealContent = true;
      result.status = 'LIVE';
      result.details.push('WordPress site');
      clearTimeout(timer);
      return result;
    }

    // Wix detection
    if (bodyLower.includes('wix.com') || bodyLower.includes('wixsite')) {
      result.hasRealContent = true;
      result.status = 'LIVE';
      result.details.push('Wix site');
      clearTimeout(timer);
      return result;
    }

    // Squarespace detection
    if (bodyLower.includes('squarespace') || bodyLower.includes('sqsp')) {
      result.hasRealContent = true;
      result.status = 'LIVE';
      result.details.push('Squarespace site');
      clearTimeout(timer);
      return result;
    }

    // Vercel with real content
    if (vercelId && body.length > 2000) {
      // Check if it's a real app or just default/error page
      if (bodyLower.includes('real estate') || bodyLower.includes('homes for sale') ||
          bodyLower.includes('realtor') || bodyLower.includes('property') ||
          bodyLower.includes('listing') || bodyLower.includes('neighborhood') ||
          bodyLower.includes('dr. jan') || bodyLower.includes('dr jan') ||
          bodyLower.includes('duffy') || bodyLower.includes('berkshire')) {
        result.hasRealContent = true;
        result.status = 'LIVE';
        result.details.push('Vercel site with real estate content');
      } else if (bodyLower.includes('stickman') || bodyLower.includes('animation') ||
                 bodyLower.includes('minecraft') || bodyLower.includes('game')) {
        result.hasRealContent = true;
        result.status = 'LIVE';
        result.details.push('Vercel site with non-RE content');
      } else {
        result.status = 'VERCEL';
        result.details.push(`Vercel site (${body.length} chars)`);
      }
      clearTimeout(timer);
      return result;
    }

    // Parked page detection
    if (bodyLower.includes('domain is parked') || bodyLower.includes('this site can') ||
        bodyLower.includes('coming soon') || bodyLower.includes('under construction') ||
        bodyLower.includes('parked free') || bodyLower.includes('buy this domain') ||
        bodyLower.includes('godaddy') || bodyLower.includes('namecheap parking') ||
        bodyLower.includes('sedoparking') || bodyLower.includes('hugedomains')) {
      result.status = 'PARKED';
      result.details.push('Parked/placeholder page');
      clearTimeout(timer);
      return result;
    }

    // Error page detection
    if (res.status >= 400) {
      result.status = 'ERROR';
      result.details.push(`HTTP ${res.status} error`);
      clearTimeout(timer);
      return result;
    }

    // Cloudflare default page / error
    if (bodyLower.includes('error 1000') || bodyLower.includes('error 522') ||
        bodyLower.includes('error 521') || bodyLower.includes('error 524') ||
        bodyLower.includes('dns resolution error') || bodyLower.includes('host error')) {
      result.status = 'ERROR';
      result.details.push('Cloudflare error page');
      clearTimeout(timer);
      return result;
    }

    // Very small pages are likely placeholder/empty
    if (body.length < 500) {
      result.status = 'EMPTY';
      result.details.push(`Minimal content (${body.length} chars)`);
      clearTimeout(timer);
      return result;
    }

    // Has substantial content with real-estate-related terms
    const reTerms = ['home', 'real estate', 'property', 'listing', 'sale', 'buy', 'sell',
                     'realtor', 'agent', 'mls', 'bedroom', 'bathroom', 'price'];
    const matchCount = reTerms.filter(t => bodyLower.includes(t)).length;

    if (matchCount >= 3 && body.length > 3000) {
      result.hasRealContent = true;
      result.status = 'LIVE';
      result.details.push(`Real content (${matchCount} RE terms, ${body.length} chars)`);
    } else if (body.length > 5000) {
      result.hasRealContent = true;
      result.status = 'LIVE';
      result.details.push(`Substantial content (${body.length} chars)`);
    } else {
      result.status = 'EMPTY';
      result.details.push(`Low content (${matchCount} RE terms, ${body.length} chars)`);
    }

  } catch (err) {
    clearTimeout(timer);
    if (err.name === 'AbortError') {
      result.status = 'DEAD';
      result.details.push('Timeout (10s)');
    } else if (err.cause?.code === 'ENOTFOUND' || err.message.includes('ENOTFOUND')) {
      result.status = 'DEAD';
      result.details.push('DNS failure (no A record)');
    } else if (err.cause?.code === 'ECONNREFUSED') {
      result.status = 'DEAD';
      result.details.push('Connection refused');
    } else {
      result.status = 'DEAD';
      result.details.push(`Error: ${err.message}`);
    }
  }

  clearTimeout(timer);
  return result;
}

async function main() {
  const results = [];
  const batchSize = 8;

  for (let i = 0; i < toCheck.length; i += batchSize) {
    const batch = toCheck.slice(i, i + batchSize);
    process.stdout.write(`[${i + 1}-${Math.min(i + batchSize, toCheck.length)}/${toCheck.length}] `);

    const batchResults = await Promise.all(batch.map(t => deepProbe(t.domain)));
    results.push(...batchResults);

    const statuses = batchResults.map(r => `${r.domain.split('.')[0]}=${r.status}`).join(', ');
    console.log(statuses);
  }

  // Group by status
  const groups = {};
  for (const r of results) {
    if (!groups[r.status]) groups[r.status] = [];
    groups[r.status].push(r);
  }

  console.log('\n' + '═'.repeat(65));
  console.log('SITE STATUS REPORT');
  console.log('═'.repeat(65));

  const statusOrder = ['LIVE', 'VERCEL', 'REDIRECT', 'PARKED', 'ERROR', 'EMPTY', 'DEAD', 'UNKNOWN'];
  for (const status of statusOrder) {
    const items = groups[status] || [];
    if (items.length === 0) continue;

    const emoji = {
      LIVE: 'LIVE (DO NOT OVERWRITE)',
      VERCEL: 'VERCEL (CHECK MANUALLY)',
      REDIRECT: 'REDIRECT (SKIP)',
      PARKED: 'PARKED (CANDIDATE)',
      ERROR: 'ERROR PAGE (CANDIDATE)',
      EMPTY: 'EMPTY/MINIMAL (CANDIDATE)',
      DEAD: 'DEAD/UNREACHABLE (NEEDS DNS)',
      UNKNOWN: 'UNKNOWN',
    }[status];

    console.log(`\n--- ${emoji} (${items.length}) ---`);
    for (const r of items) {
      console.log(`  ${r.domain}`);
      console.log(`    ${r.details.join(' | ')}`);
    }
  }

  // Summary
  const candidates = results.filter(r => ['PARKED', 'ERROR', 'EMPTY'].includes(r.status));
  const live = results.filter(r => ['LIVE', 'VERCEL', 'REDIRECT'].includes(r.status));
  const dead = results.filter(r => r.status === 'DEAD');

  console.log('\n' + '─'.repeat(65));
  console.log(`SUMMARY:`);
  console.log(`  Live (do not touch):     ${live.length}`);
  console.log(`  Template candidates:     ${candidates.length}`);
  console.log(`  Dead (needs DNS first):  ${dead.length}`);
  console.log(`  Total checked:           ${results.length}`);

  // Save detailed results
  const outputPath = join(__dirname, 'live-site-check.json');
  writeFileSync(outputPath, JSON.stringify({
    checkedAt: new Date().toISOString(),
    summary: {
      live: live.length,
      candidates: candidates.length,
      dead: dead.length,
      total: results.length,
    },
    candidatesForTemplate: candidates.map(r => ({ domain: r.domain, zoneId: r.zoneId, status: r.status, details: r.details })),
    liveSites: live.map(r => ({ domain: r.domain, zoneId: r.zoneId, status: r.status, details: r.details })),
    deadSites: dead.map(r => ({ domain: r.domain, zoneId: r.zoneId, details: r.details })),
    allResults: results,
  }, null, 2));

  console.log(`\nFull results: ${outputPath}`);
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
