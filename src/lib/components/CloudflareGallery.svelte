<script>
  /**
   * CloudflareGallery — dynamic image gallery that auto-populates from
   * Cloudflare Images. Upload a photo in the Cloudflare dashboard
   * (with the right prefix) and it appears here automatically.
   *
   * Usage:
   *   <CloudflareGallery prefix="photos" />
   *   <CloudflareGallery prefix="neighborhoods/summerlin" columns={4} />
   *   <CloudflareGallery prefix="listings/2500456" variant="card" />
   */

  /** Cloudflare Images folder prefix — e.g. "photos", "listings/2500456" */
  export let prefix = '';

  /** Default variant for grid thumbnails */
  export let variant = 'card';

  /** Variant for the lightbox / full-size view */
  export let fullVariant = 'desktop';

  /** Number of grid columns on desktop */
  export let columns = 3;

  /** Max images to load */
  export let limit = 100;

  /** Optional heading above the gallery */
  export let heading = '';

  /** Optional subheading / description */
  export let subheading = '';

  /** CSS class for the outer wrapper */
  export let className = '';

  // -- Internal state --
  let images = [];
  let loading = true;
  let error = null;
  let lightboxImage = null;
  let lightboxIndex = -1;

  // Fetch images on mount or when prefix changes
  $: fetchImages(prefix, variant, limit);

  async function fetchImages(pfx, vnt, lmt) {
    loading = true;
    error = null;
    images = [];

    try {
      const params = new URLSearchParams();
      if (pfx) params.set('prefix', pfx);
      if (vnt) params.set('variant', vnt);
      if (lmt) params.set('limit', String(lmt));

      const res = await fetch(`/api/cloudflare-images?${params}`);
      if (!res.ok) throw new Error(`Failed to load images (${res.status})`);

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      images = data.images || [];
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  function openLightbox(index) {
    lightboxIndex = index;
    lightboxImage = images[index];
  }

  function closeLightbox() {
    lightboxImage = null;
    lightboxIndex = -1;
  }

  function nextImage() {
    if (lightboxIndex < images.length - 1) {
      openLightbox(lightboxIndex + 1);
    }
  }

  function prevImage() {
    if (lightboxIndex > 0) {
      openLightbox(lightboxIndex - 1);
    }
  }

  function handleKeydown(e) {
    if (!lightboxImage) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  }

  function getDisplayName(img) {
    // Build a readable name from the image ID
    const id = img.id || '';
    const segments = id.split('/');
    const filename = segments[segments.length - 1] || '';
    return filename
      .replace(/\.[^.]+$/, '') // remove extension
      .replace(/[-_]/g, ' ')  // hyphens/underscores to spaces
      .replace(/\b\w/g, c => c.toUpperCase()); // title case
  }

  function getUploadDate(img) {
    if (!img.uploaded) return '';
    const d = new Date(img.uploaded);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<section class="cf-gallery {className}" class:has-heading={heading}>
  {#if heading}
    <div class="gallery-header">
      <h2>{heading}</h2>
      {#if subheading}
        <p class="gallery-subheading">{subheading}</p>
      {/if}
    </div>
  {/if}

  {#if loading}
    <div class="gallery-loading">
      <div class="spinner"></div>
      <p>Loading gallery...</p>
    </div>
  {:else if error}
    <div class="gallery-error">
      <p>Unable to load images: {error}</p>
      <button on:click={() => fetchImages(prefix, variant, limit)}>Try Again</button>
    </div>
  {:else if images.length === 0}
    <div class="gallery-empty">
      <p>No images found{prefix ? ` in "${prefix}"` : ''}.</p>
    </div>
  {:else}
    <div class="gallery-grid" style="--columns: {columns}">
      {#each images as img, i}
        <button
          class="gallery-item"
          on:click={() => openLightbox(i)}
          aria-label="View {getDisplayName(img)}"
        >
          <img
            src={img.url}
            alt={img.meta?.alt || getDisplayName(img)}
            loading="lazy"
            decoding="async"
          />
          <div class="gallery-item-overlay">
            <span class="gallery-item-name">{getDisplayName(img)}</span>
          </div>
        </button>
      {/each}
    </div>

    <p class="gallery-count">{images.length} image{images.length !== 1 ? 's' : ''}</p>
  {/if}
</section>

<!-- Lightbox overlay -->
{#if lightboxImage}
  <div
    class="lightbox-overlay"
    on:click={closeLightbox}
    on:keydown={handleKeydown}
    role="dialog"
    aria-label="Image viewer"
  >
    <div class="lightbox-content" on:click|stopPropagation on:keydown|stopPropagation>
      <button class="lightbox-close" on:click={closeLightbox} aria-label="Close">&times;</button>

      {#if lightboxIndex > 0}
        <button class="lightbox-prev" on:click={prevImage} aria-label="Previous image">&#8249;</button>
      {/if}

      {#if lightboxIndex < images.length - 1}
        <button class="lightbox-next" on:click={nextImage} aria-label="Next image">&#8250;</button>
      {/if}

      <img
        src={lightboxImage.variants[fullVariant] || lightboxImage.variants.desktop}
        alt={lightboxImage.meta?.alt || getDisplayName(lightboxImage)}
        class="lightbox-image"
      />

      <div class="lightbox-info">
        <span class="lightbox-name">{getDisplayName(lightboxImage)}</span>
        <span class="lightbox-counter">{lightboxIndex + 1} / {images.length}</span>
        {#if lightboxImage.uploaded}
          <span class="lightbox-date">{getUploadDate(lightboxImage)}</span>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  /* ── Gallery container ── */
  .cf-gallery {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .gallery-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .gallery-header h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1a1a2e;
    margin: 0 0 0.5rem;
  }

  .gallery-subheading {
    font-size: 1.1rem;
    color: #6c757d;
    margin: 0;
    max-width: 600px;
    margin: 0 auto;
  }

  /* ── Grid ── */
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(var(--columns, 3), 1fr);
    gap: 1rem;
  }

  .gallery-item {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    border: none;
    padding: 0;
    cursor: pointer;
    background: #f0f0f0;
    aspect-ratio: 4/3;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .gallery-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }

  .gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.3s ease;
  }

  .gallery-item:hover img {
    transform: scale(1.05);
  }

  .gallery-item-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
    padding: 2rem 1rem 0.75rem;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .gallery-item:hover .gallery-item-overlay {
    opacity: 1;
  }

  .gallery-item-name {
    color: #fff;
    font-size: 0.85rem;
    font-weight: 500;
  }

  .gallery-count {
    text-align: center;
    color: #6c757d;
    font-size: 0.9rem;
    margin-top: 1.5rem;
  }

  /* ── Loading / Error / Empty ── */
  .gallery-loading,
  .gallery-error,
  .gallery-empty {
    text-align: center;
    padding: 3rem 1rem;
    color: #6c757d;
  }

  .spinner {
    width: 40px;
    height: 40px;
    margin: 0 auto 1rem;
    border: 3px solid #e0e0e0;
    border-top-color: #0069ff;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .gallery-error button {
    margin-top: 1rem;
    padding: 0.5rem 1.5rem;
    background: #0069ff;
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
  }

  .gallery-error button:hover {
    background: #0057d4;
  }

  /* ── Lightbox ── */
  .lightbox-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.92);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.2s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .lightbox-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .lightbox-image {
    max-width: 90vw;
    max-height: 80vh;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  }

  .lightbox-close {
    position: absolute;
    top: -40px;
    right: -10px;
    background: none;
    border: none;
    color: #fff;
    font-size: 2.5rem;
    cursor: pointer;
    line-height: 1;
    padding: 0 0.5rem;
    opacity: 0.8;
    transition: opacity 0.2s;
  }

  .lightbox-close:hover {
    opacity: 1;
  }

  .lightbox-prev,
  .lightbox-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.15);
    border: none;
    color: #fff;
    font-size: 3rem;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    line-height: 1;
    transition: background 0.2s;
    z-index: 1;
  }

  .lightbox-prev:hover,
  .lightbox-next:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  .lightbox-prev {
    left: -60px;
  }

  .lightbox-next {
    right: -60px;
  }

  .lightbox-info {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-top: 1rem;
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
  }

  .lightbox-name {
    font-weight: 600;
    color: #fff;
  }

  .lightbox-counter {
    font-variant-numeric: tabular-nums;
  }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .gallery-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .lightbox-prev { left: 10px; }
    .lightbox-next { right: 10px; }
  }

  @media (max-width: 640px) {
    .gallery-grid {
      grid-template-columns: 1fr;
      gap: 0.75rem;
    }

    .gallery-header h2 {
      font-size: 1.75rem;
    }

    .lightbox-prev,
    .lightbox-next {
      font-size: 2rem;
      padding: 0.25rem 0.75rem;
    }

    .lightbox-info {
      flex-direction: column;
      gap: 0.25rem;
    }
  }
</style>
