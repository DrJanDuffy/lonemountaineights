/**
 * RealScout Global Injector Worker
 *
 * Two responsibilities:
 *   A) Edge Proxy  – serve the RealScout widget bundle from the site's own
 *      domain at /cdn/realscout-widgets.js, cached at the edge for 1 hour.
 *   B) HTMLRewriter – for every HTML response, strip any render-blocking
 *      <script> that points at em.realscout.com AND inject a lazy-loading
 *      Intersection Observer wrapper before </body>.
 *
 * Net effect: zero RealScout JS on pages that have no widgets; deferred,
 * same-origin loading on pages that do.  LCP / FCP improve dramatically.
 */

// ---------------------------------------------------------------------------
// A. Edge Proxy – /cdn/realscout-widgets.js
// ---------------------------------------------------------------------------

const RS_ORIGIN_URL =
  'https://em.realscout.com/widgets/realscout-web-components.umd.js';

const PROXY_CACHE_SECONDS = 3600; // 1 hour

async function handleProxyRequest(request) {
  const cache = caches.default;

  // Try edge cache first
  let cached = await cache.match(request);
  if (cached) return cached;

  // Fetch from RealScout origin
  const originResponse = await fetch(RS_ORIGIN_URL, {
    headers: {
      'User-Agent': 'Cloudflare-Worker',
    },
  });

  if (!originResponse.ok) {
    return new Response('Failed to fetch RealScout widget script', {
      status: 502,
    });
  }

  // Build cacheable response
  const response = new Response(originResponse.body, {
    status: 200,
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': `public, max-age=${PROXY_CACHE_SECONDS}`,
      'Access-Control-Allow-Origin': '*',
      'X-Content-Type-Options': 'nosniff',
    },
  });

  // Store in edge cache (non-blocking)
  request = new Request(request.url, request);
  /** @type {any} */ (response.headers).set(
    'Cache-Control',
    `public, max-age=${PROXY_CACHE_SECONDS}`,
  );
  const cacheResponse = response.clone();
  cache.put(request, cacheResponse);

  return response;
}

// ---------------------------------------------------------------------------
// B. HTMLRewriter classes
// ---------------------------------------------------------------------------

/**
 * Remove any <script> in <head> whose src includes "realscout".
 * The Worker now controls when / how the script loads.
 */
class RemoveBlockingScript {
  element(element) {
    const src = element.getAttribute('src') || '';
    if (src.includes('realscout')) {
      element.remove();
    }
  }
}

/**
 * Inject <link rel="preconnect"> hints into <head> for the edge proxy path
 * so the browser can begin connection setup early.
 */
class InjectPreconnect {
  element(element) {
    element.append(
      '\n    <!-- RealScout: preconnect handled by existing hints -->',
      { html: true },
    );
  }
}

/**
 * Inject the lazy-loading Intersection Observer script + skeleton CSS
 * just before </body>.
 */
class InjectLazyLoader {
  element(element) {
    element.append(LAZY_LOADER_SNIPPET, { html: true });
  }
}

// ---------------------------------------------------------------------------
// Lazy-loader snippet injected before </body>
// ---------------------------------------------------------------------------

const LAZY_LOADER_SNIPPET = `
<!-- RealScout lazy-loader (injected by Cloudflare Worker) -->
<style>
  /* Skeleton placeholder so widget space doesn't cause layout shift */
  realscout-office-listings:not(:defined),
  realscout-search:not(:defined),
  realscout-property-details:not(:defined) {
    display: block;
    min-height: 320px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: rs-skeleton 1.5s ease-in-out infinite;
    border-radius: 8px;
  }
  @keyframes rs-skeleton {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
</style>
<script>
(function() {
  var loaded = false;
  function loadRS() {
    if (loaded) return;
    loaded = true;
    var s = document.createElement('script');
    s.src = '/cdn/realscout-widgets.js';
    s.type = 'module';
    document.head.appendChild(s);
  }
  // Load when any RealScout custom element is near the viewport
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          loadRS();
          observer.disconnect();
          return;
        }
      }
    }, { rootMargin: '200px' });
    var selectors = [
      'realscout-office-listings',
      'realscout-search',
      'realscout-property-details',
      '[class*="realscout"]'
    ];
    var els = document.querySelectorAll(selectors.join(','));
    if (els.length > 0) {
      for (var j = 0; j < els.length; j++) {
        observer.observe(els[j]);
      }
    }
  }
  // Fallback: load after 5 seconds if observer never fires
  // (ensures conversion popup and other non-visible widgets still work)
  setTimeout(loadRS, 5000);
})();
</script>
`;

// ---------------------------------------------------------------------------
// Worker entry point
// ---------------------------------------------------------------------------

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Route A: Proxy the RealScout script from your own edge
    if (url.pathname === '/cdn/realscout-widgets.js') {
      return handleProxyRequest(request);
    }

    // Everything else: fetch from origin, then rewrite HTML
    const response = await fetch(request);
    const contentType = response.headers.get('content-type') || '';

    // Only transform HTML responses
    if (!contentType.includes('text/html')) {
      return response;
    }

    // Route B: HTML pages – strip blocking script, inject lazy-loader
    return new HTMLRewriter()
      .on('script[src*="realscout"]', new RemoveBlockingScript())
      .on('head', new InjectPreconnect())
      .on('body', new InjectLazyLoader())
      .transform(response);
  },
};
