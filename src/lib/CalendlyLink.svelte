<script>
import { createEventDispatcher } from 'svelte';
import { CALENDLY_URL } from '$lib/schema.js';

const dispatch = createEventDispatcher();

/** @type {string} */
export let text = 'Schedule time with me';

/** @type {string} */
export let classNames = '';

/**
 * @param {MouseEvent} e
 */
function handleClick(e) {
  e.preventDefault();
  const Calendly = typeof window !== 'undefined' ? /** @type {any} */ (window).Calendly : undefined;
  if (Calendly) {
    Calendly.initPopupWidget({ url: CALENDLY_URL });
  } else {
    window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
  }
  dispatch('click');
}
</script>

<a
  href={CALENDLY_URL}
  class="calendly-link {classNames}"
  on:click={handleClick}
>
  {text}
</a>

<style>
  .calendly-link {
    text-decoration: none;
    transition: opacity 0.2s ease, color 0.2s ease;
  }
  .calendly-link:hover {
    opacity: 0.9;
  }
</style>
