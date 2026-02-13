/**
 * realscout-global-injector — Cloudflare Worker
 *
 * Optimises RealScout widget loading across all routed domains:
 *
 *   1. Edge Proxy (/cdn/realscout-widgets.js)
 *      Fetches, caches, and serves the RealScout web-components bundle from
 *      the same origin. Eliminates third-party DNS + TLS overhead for visitors.
 *
 *   2. HTMLRewriter (all HTML responses)
 *      - Strips any existing render-blocking <script src="...realscout...">
 *        from <head> (repos that haven't been cleaned up yet).
 *      - Injects an Intersection Observer lazy-loader before </body> that
 *        only fetches the script when a RealScout widget scrolls into view.
 *      - Injects minimal CSS placeholder to prevent layout shift.
 *
 * Deploy:  npx wrangler deploy
 * Routes are managed per-zone via scripts/deploy-worker-routes.js
 */

// ─── Constants ──────────────────────────────────────────────────────────────

const REALSCOUT_ORIGIN = 'https://em.realscout.com/widgets/realscout-web-components.umd.js';
const PROXY_PATH = '/cdn/realscout-widgets.js';
const PROXY_CACHE_SECONDS = 3600; // 1 hour edge cache

// All known RealScout custom element tag names (for the Intersection Observer)
const RS_ELEMENTS = [
  'realscout-office-listings',
  'realscout-simple-search',
  'realscout-home-value',
  'realscout-search',
  'realscout-property-details',
  'realscout-market-activity',
].join(', ');

// ─── Lazy-loader script (injected before </body>) ──────────────────────────

const LAZY_LOADER_SCRIPT = `
<script data-realscout-lazy>
(function() {
  var loaded = false;
  function loadRS() {
    if (loaded) return;
    loaded = true;
    var s = document.createElement('script');
    s.src = '${PROXY_PATH}';
    s.type = 'module';
    document.head.appendChild(s);
  }

  // Observe all RealScout custom elements — load only when one nears viewport
  var observer = new IntersectionObserver(function(entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        loadRS();
        observer.disconnect();
        return;
      }
    }
  }, { rootMargin: '300px' });

  var els = document.querySelectorAll('${RS_ELEMENTS}, [class*="realscout"]');
  if (els.length > 0) {
    for (var j = 0; j < els.length; j++) { observer.observe(els[j]); }
  }

  // Fallback: if no widget is on the page but a popup/overlay needs RealScout,
  // load after 5 seconds of idle time
  if ('requestIdleCallback' in window) {
    requestIdleCallback(function() { setTimeout(loadRS, 4000); });
  } else {
    setTimeout(loadRS, 5000);
  }
})();
</script>`;

// Minimal CSS to reserve space for widgets before JS loads (prevents CLS)
const PLACEHOLDER_CSS = `
<style data-realscout-placeholder>
  realscout-office-listings:not(:defined),
  realscout-simple-search:not(:defined),
  realscout-home-value:not(:defined) {
    display: block;
    min-height: 200px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: rs-shimmer 1.5s ease-in-out infinite;
    border-radius: 8px;
  }
  @keyframes rs-shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
</style>`;

// ─── HTMLRewriter handlers ──────────────────────────────────────────────────

/**
 * Removes any existing <script> tag that loads from realscout domains.
 * This catches repos that still have the blocking script in app.html / layout.
 */
class RemoveBlockingScript {
  element(el) {
    const src = el.getAttribute('src') || '';
    if (src.includes('realscout') && src.includes('.js')) {
      el.remove();
    }
  }
}

/**
 * Injects preconnect hint and placeholder CSS into <head>.
 * The preconnect is for the origin (em.realscout.com) in case the edge
 * proxy cache misses and we need to fetch upstream.
 */
class InjectIntoHead {
  element(el) {
    el.append(
      `<link rel="preconnect" href="https://em.realscout.com" crossorigin>` +
      `<link rel="preconnect" href="https://www.realscout.com" crossorigin>` +
      PLACEHOLDER_CSS,
      { html: true },
    );
  }
}

/**
 * Injects the Intersection Observer lazy-loader before </body>.
 */
class InjectLazyLoader {
  element(el) {
    el.append(LAZY_LOADER_SCRIPT, { html: true });
  }
}

// ─── Edge proxy handler ─────────────────────────────────────────────────────

async function handleProxyRequest(request) {
  // Check Cloudflare cache first
  const cache = caches.default;
  const cacheKey = new Request(request.url, request);
  let cached = await cache.match(cacheKey);
  if (cached) return cached;

  // Fetch from RealScout origin
  const upstream = await fetch(REALSCOUT_ORIGIN, {
    headers: {
      'User-Agent': 'CloudflareWorker/1.0',
      'Accept': 'application/javascript',
    },
  });

  if (!upstream.ok) {
    return new Response('/* RealScout upstream error */', {
      status: 502,
      headers: { 'Content-Type': 'application/javascript' },
    });
  }

  // Build response with cache headers
  const body = await upstream.arrayBuffer();
  const response = new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': `public, max-age=${PROXY_CACHE_SECONDS}, s-maxage=${PROXY_CACHE_SECONDS}`,
      'Access-Control-Allow-Origin': '*',
      'X-Content-Type-Options': 'nosniff',
      'X-Proxy-Source': 'realscout-global-injector',
    },
  });

  // Store in Cloudflare edge cache
  // waitUntil not available here — cache.put is fire-and-forget safe
  cache.put(cacheKey, response.clone());

  return response;
}

// ─── Main fetch handler ─────────────────────────────────────────────────────

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // ── Route A: Edge proxy for RealScout script ──
    if (url.pathname === PROXY_PATH) {
      return handleProxyRequest(request);
    }

    // ── Route B: Pass through non-GET or non-HTML requests ──
    if (request.method !== 'GET') {
      return fetch(request);
    }

    // Fetch from origin
    const response = await fetch(request);

    // Only transform HTML responses
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) {
      return response;
    }

    // Apply HTMLRewriter transforms
    return new HTMLRewriter()
      .on('script[src*="realscout"]', new RemoveBlockingScript())
      .on('head', new InjectIntoHead())
      .on('body', new InjectLazyLoader())
      .transform(response);
  },
};
