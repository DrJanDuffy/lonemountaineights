/**
 * Server endpoint: GET /api/cloudflare-images
 *
 * Fetches images from Cloudflare Images V2 API, filtered by prefix.
 * Keeps CF_API_TOKEN server-side (never exposed to browser).
 *
 * Query params:
 *   ?prefix=photos           → lonemountaineights/photos/*
 *   ?prefix=agents           → lonemountaineights/agents/*
 *   ?prefix=listings/2500456 → lonemountaineights/listings/2500456/*
 *   (no prefix)              → all lonemountaineights/* images
 *
 * Returns JSON: { images: [{ id, url, variants, filename, uploaded, meta }] }
 */

const CF_API_BASE = 'https://api.cloudflare.com/client/v4';
const SITE_PREFIX = 'lonemountaineights';

// Cache duration: 5 minutes (avoid hammering API on every page load)
const CACHE_MAX_AGE = 300;

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ url }) {
  const CF_ACCOUNT_ID = process.env.CF_ACCOUNT_ID || import.meta.env.CF_ACCOUNT_ID;
  const CF_API_TOKEN = process.env.CF_API_TOKEN || import.meta.env.CF_API_TOKEN;
  const CF_ACCOUNT_HASH = process.env.VITE_CF_ACCOUNT_HASH || import.meta.env.VITE_CF_ACCOUNT_HASH;

  if (!CF_ACCOUNT_ID || !CF_API_TOKEN) {
    return new Response(
      JSON.stringify({ error: 'Cloudflare credentials not configured' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // Parse query params
  const prefix = url.searchParams.get('prefix') || '';
  const variant = url.searchParams.get('variant') || 'card';
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '100', 10), 1000);
  const idPrefix = prefix ? `${SITE_PREFIX}/${prefix}` : SITE_PREFIX;

  try {
    // Fetch from Cloudflare V2 List API with pagination
    const images = [];
    let continuationToken = null;

    do {
      let apiUrl = `${CF_API_BASE}/accounts/${CF_ACCOUNT_ID}/images/v2?per_page=${Math.min(limit, 1000)}`;
      if (continuationToken) {
        apiUrl += `&continuation_token=${encodeURIComponent(continuationToken)}`;
      }

      const res = await fetch(apiUrl, {
        headers: { Authorization: `Bearer ${CF_API_TOKEN}` },
      });

      if (!res.ok) {
        throw new Error(`Cloudflare API error: ${res.status}`);
      }

      const json = await res.json();
      if (!json.success) {
        throw new Error(`Cloudflare API error: ${JSON.stringify(json.errors)}`);
      }

      // Filter images by prefix
      for (const img of json.result?.images || []) {
        if (img.id && img.id.startsWith(idPrefix + '/')) {
          images.push({
            id: img.id,
            filename: img.filename,
            uploaded: img.uploaded,
            meta: img.meta || {},
            // Build delivery URLs for common variants
            variants: {
              heroxl: `https://imagedelivery.net/${CF_ACCOUNT_HASH}/${img.id}/heroxl`,
              hero: `https://imagedelivery.net/${CF_ACCOUNT_HASH}/${img.id}/hero`,
              desktop: `https://imagedelivery.net/${CF_ACCOUNT_HASH}/${img.id}/desktop`,
              og: `https://imagedelivery.net/${CF_ACCOUNT_HASH}/${img.id}/og`,
              tablet: `https://imagedelivery.net/${CF_ACCOUNT_HASH}/${img.id}/tablet`,
              card: `https://imagedelivery.net/${CF_ACCOUNT_HASH}/${img.id}/card`,
              thumb: `https://imagedelivery.net/${CF_ACCOUNT_HASH}/${img.id}/thumb`,
              avatar: `https://imagedelivery.net/${CF_ACCOUNT_HASH}/${img.id}/avatar`,
            },
            // Default display URL
            url: `https://imagedelivery.net/${CF_ACCOUNT_HASH}/${img.id}/${variant}`,
          });
        }

        if (images.length >= limit) break;
      }

      continuationToken = json.result.continuation_token || null;
    } while (continuationToken && images.length < limit);

    // Sort by upload date (newest first)
    images.sort((a, b) => new Date(b.uploaded) - new Date(a.uploaded));

    return new Response(
      JSON.stringify({
        images,
        total: images.length,
        prefix: idPrefix,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': `public, max-age=${CACHE_MAX_AGE}, s-maxage=${CACHE_MAX_AGE}`,
        },
      },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
