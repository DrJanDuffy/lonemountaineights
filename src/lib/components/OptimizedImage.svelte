<script>
export let src;
export let alt;
export const width = 800;
export const height = 600;
export const quality = 85;
export const loading = 'lazy';
export const className = '';
export const placeholder = true;

// Generate optimized image URL with WebP format and compression
$: optimizedSrc = `https://images.unsplash.com/photo-${src}?ixlib=rb-4.0.3&auto=format&fit=crop&w=${width}&h=${height}&q=${quality}&fm=webp`;

// Generate placeholder for lazy loading
$: placeholderSrc = `data:image/svg+xml;base64,${btoa(`
		<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
			<rect width="100%" height="100%" fill="#f3f4f6"/>
			<text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="Arial, sans-serif" font-size="14">
				Loading...
			</text>
		</svg>
	`)}`;

let imageLoaded = false;
let imageError = false;

function handleLoad() {
  imageLoaded = true;
}

function handleError() {
  imageError = true;
}
</script>

<div class="optimized-image-container {className}">
	{#if placeholder && !imageLoaded && !imageError}
		<img 
			src={placeholderSrc} 
			alt=""
			width={width}
			height={height}
			class="placeholder-image"
		/>
	{/if}
	
	<img 
		src={optimizedSrc}
		alt={alt}
		width={width}
		height={height}
		loading={loading}
		class="optimized-image {imageLoaded ? 'loaded' : 'loading'}"
		on:load={handleLoad}
		on:error={handleError}
	/>
	
	{#if imageError}
		<div class="image-error">
			<span>Image failed to load</span>
		</div>
	{/if}
</div>

<style>
	.optimized-image-container {
		position: relative;
		display: inline-block;
		overflow: hidden;
		border-radius: 8px;
	}
	
	.placeholder-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: opacity 0.3s ease;
	}
	
	.optimized-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: opacity 0.3s ease;
		opacity: 0;
	}
	
	.optimized-image.loaded {
		opacity: 1;
	}
	
	.optimized-image.loading {
		opacity: 0;
	}
	
	.image-error {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #f3f4f6;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #6b7280;
		font-size: 0.875rem;
	}
</style>
