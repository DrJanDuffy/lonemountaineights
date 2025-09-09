<script>
  export let src;
  export let alt = '';
  export let width = null;
  export let height = null;
  export let loading = 'lazy';
  export let class: string = '';
  
  // Add fallback for missing images
  $: imageSrc = src || '/svelte-welcome.png';
</script>

<img
  {src: imageSrc}
  {alt}
  {width}
  {height}
  {loading}
  class={class}
  on:error={() => {
    // Fallback to default image on error
    if (src !== '/svelte-welcome.png') {
      src = '/svelte-welcome.png';
    }
  }}
/>