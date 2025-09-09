<script>
  export let breadcrumbs = [];
</script>

<nav aria-label="Breadcrumb" class="breadcrumbs">
  <ol class="breadcrumb-list">
    {#each breadcrumbs as breadcrumb, index}
      <li class="breadcrumb-item">
        {#if index === breadcrumbs.length - 1}
          <span class="breadcrumb-current" aria-current="page">
            {breadcrumb.name}
          </span>
        {:else}
          <a href={breadcrumb.path} class="breadcrumb-link">
            {breadcrumb.name}
          </a>
        {/if}
      </li>
      {#if index < breadcrumbs.length - 1}
        <li class="breadcrumb-separator" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </li>
      {/if}
    {/each}
  </ol>
</nav>

<style>
  .breadcrumbs {
    margin-bottom: 1rem;
  }
  
  .breadcrumb-list {
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .breadcrumb-item {
    display: flex;
    align-items: center;
  }
  
  .breadcrumb-link {
    color: var(--accent-color, #3A8DDE);
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    transition: color 0.2s ease;
  }
  
  .breadcrumb-link:hover {
    color: var(--accent-light, #5BA0E8);
    text-decoration: underline;
  }
  
  .breadcrumb-current {
    color: var(--text-light, #718096);
    font-size: 0.875rem;
    font-weight: 500;
  }
  
  .breadcrumb-separator {
    color: var(--text-light, #718096);
    display: flex;
    align-items: center;
  }
  
  .breadcrumb-separator svg {
    width: 12px;
    height: 12px;
  }
  
  @media (max-width: 768px) {
    .breadcrumb-list {
      font-size: 0.8rem;
    }
    
    .breadcrumb-link,
    .breadcrumb-current {
      font-size: 0.8rem;
    }
  }
</style>
