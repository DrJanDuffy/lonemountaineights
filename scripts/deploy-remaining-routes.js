#!/usr/bin/env node
/**
 * deploy-remaining-routes.js — Add Worker routes to live non-Next.js sites
 * (SvelteKit sites + live Vercel/WordPress/other sites)
 * The Worker only injects RealScout via HTMLRewriter — it never overwrites content.
 */

const CF_API = 'https://api.cloudflare.com/client/v4';
const WORKER_NAME = 'realscout-global-injector';
const CF_API_TOKEN = process.argv[2];

if (!CF_API_TOKEN) {
  console.error('Usage: node scripts/deploy-remaining-routes.js <worker-token>');
  process.exit(1);
}

const headers = {
  'Authorization': `Bearer ${CF_API_TOKEN}`,
  'Content-Type': 'application/json',
};

// Live non-Next.js sites that should get the Worker
// (23 live sites + 6 SvelteKit sites = 29 domains)
const domains = [
  // SvelteKit sites
  { domain: 'californiaprogressivedesignbuild.com', zoneId: '678d1c3cabfba29db953d56eb7c93d27' },
  { domain: 'drjanetduffy.com', zoneId: '51b561ac395d29883dd9b4b7ab4686cf' },
  { domain: 'lonemountainheights.com', zoneId: '01c357faae8aff6277403b46559b0eb7' },
  { domain: 'manzanohomes.com', zoneId: 'aedc539af3013d3520c8f99ae12da217' },
  { domain: 'newbridgehomesforsale.com', zoneId: '39c3893522adce190e0280918619de27' },
  { domain: 'pewtervalleyestates.com', zoneId: '50005fa6218513024bf4e0ee2d7872b7' },
  // Live non-Next.js sites (Vercel with RE content, WordPress, etc.)
  { domain: 'arcadiahomeslasvegas.com', zoneId: 'ecef340a0b610324068ec69e2b142a09' },
  { domain: 'centennialhillshomesforsale.com', zoneId: 'ee98107e4df3984ca1593206046598da' },
  { domain: 'consenzaestates.com', zoneId: '8be68f086fa72513f0610b657a62dfbb' },
  { domain: 'heritagestonebridge.com', zoneId: 'eaa18c0975eec028b76cb37256d856f5' },
  { domain: 'lasvegasmultigenhomes.com', zoneId: '119389af2800febcd75c0e070554d5fc' },
  { domain: 'logcabinranchhomes.com', zoneId: '7c5384ad07b2211adcd0dccd7a95ff9f' },
  { domain: 'mountainedgehomes.com', zoneId: 'e3b91b3c5c9373f4851804e547bf1187' },
  { domain: 'nevadarealestatemarket.com', zoneId: 'cefca0ab24188b28939a8f2d20b180d5' },
  { domain: 'openhouseupdate.com', zoneId: '1dde512c7ccef6c88a81304eb9b1fdb3' },
  { domain: 'openhouseupdates.com', zoneId: 'f4e06f0a604e75996b0d5e757047b909' },
  { domain: 'opportunityzonespecialist.com', zoneId: 'edc130c924b51fa63558f8532ec542f9' },
  { domain: 'reverencesummerlinhomes.com', zoneId: '0087f96c1b89f752eac656377a03f97f' },
  { domain: 'searchforaffordablehomes.com', zoneId: '19d2958c4a447e8e7afe90e826443197' },
  { domain: 'searchforhomesinsummerlin.com', zoneId: '113f715b8bcbc67fb93dc5f159c9c0c4' },
  { domain: 'skyesummithomes.com', zoneId: 'e0fba27a9180e906a809e5e6d22da048' },
  { domain: 'speedycashhomeoffers.com', zoneId: 'cf762c5edd695e725aee41a888f9a844' },
  { domain: 'sunstonelasvegashomes.com', zoneId: '69131cbaeedfe49d292996daa26c5500' },
  { domain: 'theridgessummerlinhomes.com', zoneId: 'ca978ba25f32e5c5879485e831176835' },
  { domain: 'trilogysunstonehomes.com', zoneId: 'd5e4466820f122f4cc64de1cb5d43ce6' },
  { domain: 'vegashomespotlight.com', zoneId: '5757a4b911ba6c87ae63be953d60d42d' },
  { domain: 'vegasvalleyhomesforsale.com', zoneId: '873b63311758094a1283b934d979bce2' },
  { domain: 'waterfallhomesnorthlasvegas.com', zoneId: '5214998273933d78c4fb206c38018d8b' },
  { domain: 'westsummerlinhomes.com', zoneId: '7187f39ab6f878c7ef39eb4821b4ceaa' },
];

console.log(`\nDeploying Worker routes to ${domains.length} live non-Next.js sites...\n`);

let added = 0, skipped = 0, failed = 0;

for (const { domain, zoneId } of domains) {
  const pattern = `*${domain}/*`;

  try {
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
        console.log(`  FAIL  ${domain} — ${json.errors?.[0]?.message || 'unknown'}`);
        failed++;
      }
    }
  } catch (err) {
    console.log(`  FAIL  ${domain} — ${err.message}`);
    failed++;
  }

  await new Promise(r => setTimeout(r, 150));
}

console.log(`\n${'─'.repeat(55)}`);
console.log(`Done: ${added} added, ${skipped} existed, ${failed} failed`);
