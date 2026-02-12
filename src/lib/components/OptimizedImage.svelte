<script>
  /**
   * OptimizedImage — serves images from Cloudflare Images CDN in production,
   * with responsive srcset and automatic WebP/AVIF via format=auto.
   * Falls back to local /static/images/ paths in development or when
   * the image hasn't been uploaded to Cloudflare yet.
   *
   * Supports two delivery modes:
   *   1. Flexible variants (default) — srcset with on-the-fly transforms
   *   2. Named variants — pre-defined sizes for max cache hits (set `variant` prop)
   */
  import {
    CF_ENABLED,
    IMAGE_MAP,
    getCloudflareUrl,
    getVariantUrl,
    getSrcset,
    BREAKPOINTS,
    DEFAULT_QUALITY,
  } from '$lib/cloudflare-images.js';

  /** Local image path, e.g. "/images/hero/hero-las-vegas.png" */
  export let src;

  /** Alt text (required for a11y) */
  export let alt = '';

  /** Intrinsic / display width in px */
  export let width = null;

  /** Intrinsic / display height in px */
  export let height = null;

  /** "lazy" (default) or "eager" for above-fold images */
  export let loading = 'lazy';

  /** Optional CSS class(es) */
  export let className = '';

  /** Image quality 1-100 (default 85) */
  export let quality = DEFAULT_QUALITY;

  /**
   * Optional named variant. When set, uses a pre-defined Cloudflare variant
   * instead of flexible transforms. Maximises CDN cache hits.
   * Values: "hero" | "card" | "thumb" | "og" | "avatar" | null
   * @type {string|null}
   */
  export let variant = null;

  /**
   * The `sizes` attribute tells the browser how wide the image will render
   * at each viewport size so it picks the right srcset entry.
   *
   * Common patterns:
   *   "100vw"                                          — full-width hero
   *   "(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"  — grid cards
   *   "80px"                                           — avatar / thumbnail
   */
  export let sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';

  /**
   * Custom srcset breakpoint widths. Uses BREAKPOINTS from config by default.
   * Override for special cases like avatars: [80, 160]
   * @type {number[]}
   */
  export let widths = BREAKPOINTS;

  // ── derived values ──────────────────────────────────────────────────

  const PLACEHOLDER = '/images/photos/placeholder.jpg';

  /** Whether this image has a Cloudflare mapping */
  $: hasCfImage = CF_ENABLED && src && IMAGE_MAP[src];

  /** Whether we're using a named variant (no srcset needed) */
  $: useNamedVariant = variant && hasCfImage;

  /** The src attribute for the <img> tag */
  $: resolvedSrc = hasCfImage
    ? (useNamedVariant
        ? getVariantUrl(src, variant)
        : getCloudflareUrl(src, { width: width || 1024, quality }))
    : src || PLACEHOLDER;

  /** Responsive srcset — empty when using named variant, CF off, or image not mapped */
  $: resolvedSrcset = (hasCfImage && !useNamedVariant)
    ? getSrcset(src, { widths, quality })
    : '';

  /** Track error state for fallback */
  let hasError = false;

  function handleError() {
    if (!hasError) {
      hasError = true;
      // Fall back to local path on CDN error
      resolvedSrc = src || PLACEHOLDER;
      resolvedSrcset = '';
    } else if (resolvedSrc !== PLACEHOLDER) {
      // If local also fails, show placeholder
      resolvedSrc = PLACEHOLDER;
    }
  }
</script>

<img
  src={resolvedSrc}
  srcset={resolvedSrcset || null}
  sizes={resolvedSrcset ? sizes : null}
  {alt}
  width={width || null}
  height={height || null}
  {loading}
  class={className}
  decoding={loading === 'eager' ? 'sync' : 'async'}
  on:error={handleError}
/>
