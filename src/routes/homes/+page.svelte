<script>
import { onMount } from 'svelte';

// Mock data - in production this would come from MLS API
let allHomes = [
  {
    id: 1,
    address: '1234 Mountain View Dr',
    price: 875000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2450,
    lotSize: '0.25 acres',
    daysOnMarket: 8,
    image:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    insight:
      'Corner lot with mountain views - premium location in the neighborhood',
    homeStyle: 'Two Story',
    yearBuilt: 2018,
    garage: 2,
    pool: true,
    view: 'Mountain',
  },
  {
    id: 2,
    address: '5678 Desert Ridge Ln',
    price: 725000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1890,
    lotSize: '0.18 acres',
    daysOnMarket: 15,
    image:
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    insight: 'Recently updated kitchen - great value for the area',
    homeStyle: 'Single Story',
    yearBuilt: 2015,
    garage: 2,
    pool: false,
    view: 'Golf Course',
  },
  {
    id: 3,
    address: '9012 Lone Mountain Blvd',
    price: 950000,
    bedrooms: 5,
    bathrooms: 4,
    sqft: 3200,
    lotSize: '0.35 acres',
    daysOnMarket: 3,
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    insight: 'Luxury finishes throughout - one of the best streets in the area',
    homeStyle: 'Two Story',
    yearBuilt: 2020,
    garage: 3,
    pool: true,
    view: 'Mountain',
  },
  {
    id: 4,
    address: '3456 Canyon Heights Way',
    price: 680000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1750,
    lotSize: '0.15 acres',
    daysOnMarket: 22,
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    insight: 'Great starter home with potential for updates',
    homeStyle: 'Single Story',
    yearBuilt: 2012,
    garage: 2,
    pool: false,
    view: 'Neighborhood',
  },
  {
    id: 5,
    address: '7890 Desert View Ln',
    price: 825000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2200,
    lotSize: '0.22 acres',
    daysOnMarket: 12,
    image:
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    insight: 'Solar panels included - significant energy savings',
    homeStyle: 'Two Story',
    yearBuilt: 2017,
    garage: 2,
    pool: true,
    view: 'Desert',
  },
  {
    id: 6,
    address: '2345 Mountain Ridge Dr',
    price: 750000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1950,
    lotSize: '0.20 acres',
    daysOnMarket: 18,
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    insight: 'Cul-de-sac location - quiet street with minimal traffic',
    homeStyle: 'Single Story',
    yearBuilt: 2016,
    garage: 2,
    pool: false,
    view: 'Mountain',
  },
];

let filteredHomes = allHomes;
let filters = {
  minPrice: '',
  maxPrice: '',
  bedrooms: '',
  bathrooms: '',
  minSqft: '',
  maxSqft: '',
  homeStyle: '',
  pool: '',
  view: '',
  garage: '',
};

let sortBy = 'price';
let viewMode = 'grid'; // 'grid' or 'list'
let showFilters = false;

function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

function applyFilters() {
  filteredHomes = allHomes.filter((home) => {
    if (filters.minPrice && home.price < parseInt(filters.minPrice))
      return false;
    if (filters.maxPrice && home.price > parseInt(filters.maxPrice))
      return false;
    if (filters.bedrooms && home.bedrooms !== parseInt(filters.bedrooms))
      return false;
    if (filters.bathrooms && home.bathrooms !== parseInt(filters.bathrooms))
      return false;
    if (filters.minSqft && home.sqft < parseInt(filters.minSqft)) return false;
    if (filters.maxSqft && home.sqft > parseInt(filters.maxSqft)) return false;
    if (filters.homeStyle && home.homeStyle !== filters.homeStyle) return false;
    if (filters.pool && home.pool !== (filters.pool === 'yes')) return false;
    if (filters.view && home.view !== filters.view) return false;
    if (filters.garage && home.garage !== parseInt(filters.garage))
      return false;
    return true;
  });

  // Apply sorting
  filteredHomes.sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'sqft':
        return a.sqft - b.sqft;
      case 'sqft-desc':
        return b.sqft - a.sqft;
      case 'days':
        return a.daysOnMarket - b.daysOnMarket;
      case 'days-desc':
        return b.daysOnMarket - a.daysOnMarket;
      default:
        return 0;
    }
  });
}

function clearFilters() {
  filters = {
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    minSqft: '',
    maxSqft: '',
    homeStyle: '',
    pool: '',
    view: '',
    garage: '',
  };
  applyFilters();
}

$: applyFilters();
</script>

<svelte:head>
	<title>Available Homes in Lone Mountain Heights | Dr. Jan Duffy Real Estate</title>
	<meta name="description" content="Browse available homes for sale in Lone Mountain Heights, Las Vegas. Dr. Jan Duffy provides expert insights on every listing in the neighborhood." />
</svelte:head>

<main class="homes-page">
	<div class="page-header">
		<div class="container">
			<h1>Available Homes in Lone Mountain Heights</h1>
			<p>Hand-picked by Dr. Jan Duffy - your neighborhood real estate expert</p>
			<div class="results-summary">
				<span class="results-count">{filteredHomes.length} homes found</span>
				<div class="view-controls">
					<button class="view-btn" class:active={viewMode === 'grid'} on:click={() => viewMode = 'grid'}>
						Grid View
					</button>
					<button class="view-btn" class:active={viewMode === 'list'} on:click={() => viewMode = 'list'}>
						List View
					</button>
				</div>
			</div>
		</div>
	</div>
	
	<div class="page-content">
		<div class="container">
			<div class="content-layout">
				<!-- Filters Sidebar -->
				<aside class="filters-sidebar" class:mobile-open={showFilters}>
					<div class="filters-header">
						<h3>Filter Homes</h3>
						<button class="clear-filters" on:click={clearFilters}>Clear All</button>
					</div>
					
					<div class="filter-group">
						<label for="min-price">Price Range</label>
						<div class="price-inputs">
							<input id="min-price" type="number" placeholder="Min Price" bind:value={filters.minPrice} />
							<span>to</span>
							<input id="max-price" type="number" placeholder="Max Price" bind:value={filters.maxPrice} />
						</div>
					</div>
					
					<div class="filter-group">
						<label for="bedrooms-filter">Bedrooms</label>
						<select id="bedrooms-filter" bind:value={filters.bedrooms}>
							<option value="">Any</option>
							<option value="2">2+</option>
							<option value="3">3+</option>
							<option value="4">4+</option>
							<option value="5">5+</option>
						</select>
					</div>
					
					<div class="filter-group">
						<label for="bathrooms-filter">Bathrooms</label>
						<select id="bathrooms-filter" bind:value={filters.bathrooms}>
							<option value="">Any</option>
							<option value="2">2+</option>
							<option value="3">3+</option>
							<option value="4">4+</option>
						</select>
					</div>
					
					<div class="filter-group">
						<label for="min-sqft">Square Footage</label>
						<div class="sqft-inputs">
							<input id="min-sqft" type="number" placeholder="Min Sq Ft" bind:value={filters.minSqft} />
							<span>to</span>
							<input id="max-sqft" type="number" placeholder="Max Sq Ft" bind:value={filters.maxSqft} />
						</div>
					</div>
					
					<div class="filter-group">
						<label for="home-style-filter">Home Style</label>
						<select id="home-style-filter" bind:value={filters.homeStyle}>
							<option value="">Any</option>
							<option value="Single Story">Single Story</option>
							<option value="Two Story">Two Story</option>
							<option value="Townhome">Townhome</option>
						</select>
					</div>
					
					<div class="filter-group">
						<label for="pool-filter">Pool</label>
						<select id="pool-filter" bind:value={filters.pool}>
							<option value="">Any</option>
							<option value="yes">Yes</option>
							<option value="no">No</option>
						</select>
					</div>
					
					<div class="filter-group">
						<label for="view-filter">View</label>
						<select id="view-filter" bind:value={filters.view}>
							<option value="">Any</option>
							<option value="Mountain">Mountain</option>
							<option value="Golf Course">Golf Course</option>
							<option value="Desert">Desert</option>
							<option value="Neighborhood">Neighborhood</option>
						</select>
					</div>
					
					<div class="filter-group">
						<label for="garage-filter">Garage</label>
						<select id="garage-filter" bind:value={filters.garage}>
							<option value="">Any</option>
							<option value="1">1+</option>
							<option value="2">2+</option>
							<option value="3">3+</option>
						</select>
					</div>
				</aside>
				
				<!-- Main Content -->
				<div class="main-content">
					<div class="content-header">
						<div class="sort-controls">
							<label>Sort by:</label>
							<select bind:value={sortBy}>
								<option value="price">Price: Low to High</option>
								<option value="price-desc">Price: High to Low</option>
								<option value="sqft">Square Footage: Low to High</option>
								<option value="sqft-desc">Square Footage: High to Low</option>
								<option value="days">Days on Market: Low to High</option>
								<option value="days-desc">Days on Market: High to Low</option>
							</select>
						</div>
						
						<button class="mobile-filters-toggle" on:click={() => showFilters = !showFilters}>
							Filters
						</button>
					</div>
					
					<div class="homes-container" class:list-view={viewMode === 'list'}>
						{#each filteredHomes as home}
							<div class="home-card">
								<div class="home-image">
									<img src={home.image} alt={home.address} />
									<div class="home-badges">
										<span class="days-badge">{home.daysOnMarket} days</span>
										{#if home.pool}
											<span class="feature-badge">Pool</span>
										{/if}
									</div>
									<div class="home-price">{formatPrice(home.price)}</div>
								</div>
								
								<div class="home-details">
									<h3 class="home-address">{home.address}</h3>
									<div class="home-specs">
										<span class="spec">{home.bedrooms} bed</span>
										<span class="spec">{home.bathrooms} bath</span>
										<span class="spec">{home.sqft.toLocaleString()} sqft</span>
										<span class="spec">{home.lotSize}</span>
									</div>
									
									<div class="home-features">
										<span class="feature">{home.homeStyle}</span>
										<span class="feature">{home.yearBuilt}</span>
										<span class="feature">{home.garage} car garage</span>
										<span class="feature">{home.view} view</span>
									</div>
									
									<div class="dr-jan-insight">
										<div class="insight-header">
											<span class="insight-icon">💡</span>
											<span class="insight-title">Dr. Jan's Insight</span>
										</div>
										<p class="insight-text">{home.insight}</p>
									</div>
									
									<div class="home-actions">
										<button class="btn-details">View Details</button>
										<button class="btn-schedule">Schedule Tour</button>
									</div>
								</div>
							</div>
						{/each}
					</div>
					
					{#if filteredHomes.length === 0}
						<div class="no-results">
							<h3>No homes match your criteria</h3>
							<p>Try adjusting your filters or contact Dr. Jan for off-market opportunities</p>
							<button class="btn btn-primary" on:click={clearFilters}>Clear Filters</button>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	.homes-page {
		min-height: 100vh;
		background: var(--warm-cream);
	}
	
	.page-header {
		background: linear-gradient(135deg, var(--accent-color), var(--accent-light));
		color: white;
		padding: 3rem 2rem;
		text-align: center;
	}
	
	.container {
		max-width: 1200px;
		margin: 0 auto;
	}
	
	.page-header h1 {
		font-size: 2.5rem;
		font-weight: 700;
		margin: 0 0 1rem 0;
	}
	
	.page-header p {
		font-size: 1.2rem;
		margin: 0 0 2rem 0;
		opacity: 0.9;
	}
	
	.results-summary {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: rgba(255, 255, 255, 0.1);
		padding: 1rem 2rem;
		border-radius: 8px;
		backdrop-filter: blur(10px);
	}
	
	.results-count {
		font-size: 1.1rem;
		font-weight: 600;
	}
	
	.view-controls {
		display: flex;
		gap: 0.5rem;
	}
	
	.view-btn {
		padding: 0.5rem 1rem;
		background: transparent;
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.3s ease;
		font-size: 0.9rem;
	}
	
	.view-btn.active {
		background: white;
		color: var(--accent-color);
		border-color: white;
	}
	
	.page-content {
		padding: 2rem 0;
	}
	
	.content-layout {
		display: grid;
		grid-template-columns: 300px 1fr;
		gap: 2rem;
	}
	
	.filters-sidebar {
		background: white;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		height: fit-content;
		position: sticky;
		top: 2rem;
	}
	
	.filters-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
	}
	
	.filters-header h3 {
		font-size: 1.3rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0;
	}
	
	.clear-filters {
		background: none;
		border: none;
		color: var(--accent-color);
		cursor: pointer;
		font-weight: 600;
		text-decoration: underline;
	}
	
	.filter-group {
		margin-bottom: 1.5rem;
	}
	
	.filter-group label {
		display: block;
		font-weight: 600;
		color: var(--heading-color);
		margin-bottom: 0.5rem;
		font-size: 0.9rem;
	}
	
	.filter-group input,
	.filter-group select {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid var(--tertiary-color);
		border-radius: 6px;
		font-size: 0.9rem;
		background: white;
	}
	
	.price-inputs,
	.sqft-inputs {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		gap: 0.5rem;
		align-items: center;
	}
	
	.price-inputs span,
	.sqft-inputs span {
		font-size: 0.9rem;
		color: var(--text-light);
		text-align: center;
	}
	
	.main-content {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		overflow: hidden;
	}
	
	.content-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.5rem 2rem;
		border-bottom: 1px solid var(--tertiary-color);
	}
	
	.sort-controls {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	
	.sort-controls label {
		font-weight: 600;
		color: var(--heading-color);
	}
	
	.sort-controls select {
		padding: 0.5rem 1rem;
		border: 1px solid var(--tertiary-color);
		border-radius: 6px;
		background: white;
	}
	
	.mobile-filters-toggle {
		display: none;
		background: var(--accent-color);
		color: white;
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 6px;
		cursor: pointer;
		font-weight: 600;
	}
	
	.homes-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 2rem;
		padding: 2rem;
	}
	
	.homes-container.list-view {
		grid-template-columns: 1fr;
	}
	
	.home-card {
		background: white;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}
	
	.home-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
	}
	
	.home-image {
		position: relative;
		height: 250px;
		overflow: hidden;
	}
	
	.home-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}
	
	.home-card:hover .home-image img {
		transform: scale(1.05);
	}
	
	.home-badges {
		position: absolute;
		top: 1rem;
		right: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	
	.days-badge {
		background: var(--success-green);
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 20px;
		font-size: 0.8rem;
		font-weight: 600;
	}
	
	.feature-badge {
		background: var(--accent-color);
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 20px;
		font-size: 0.8rem;
		font-weight: 600;
	}
	
	.home-price {
		position: absolute;
		bottom: 1rem;
		left: 1rem;
		background: rgba(0, 0, 0, 0.8);
		color: white;
		padding: 0.75rem 1rem;
		border-radius: 8px;
		font-size: 1.2rem;
		font-weight: 700;
	}
	
	.home-details {
		padding: 1.5rem;
	}
	
	.home-address {
		font-size: 1.3rem;
		font-weight: 600;
		color: var(--heading-color);
		margin: 0 0 1rem 0;
	}
	
	.home-specs {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-bottom: 1rem;
	}
	
	.spec {
		background: var(--tertiary-color);
		color: var(--text-color);
		padding: 0.5rem 1rem;
		border-radius: 20px;
		font-size: 0.9rem;
		font-weight: 500;
	}
	
	.home-features {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}
	
	.feature {
		background: var(--warm-cream);
		color: var(--text-color);
		padding: 0.25rem 0.75rem;
		border-radius: 12px;
		font-size: 0.8rem;
		font-weight: 500;
	}
	
	.dr-jan-insight {
		background: var(--warm-cream);
		border-left: 4px solid var(--accent-color);
		padding: 1rem;
		margin: 1rem 0;
		border-radius: 0 8px 8px 0;
	}
	
	.insight-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
	}
	
	.insight-icon {
		font-size: 1.2rem;
	}
	
	.insight-title {
		font-weight: 600;
		color: var(--accent-color);
		font-size: 0.9rem;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}
	
	.insight-text {
		margin: 0;
		color: var(--text-color);
		font-size: 0.95rem;
		line-height: 1.5;
	}
	
	.home-actions {
		display: flex;
		gap: 0.75rem;
		margin-top: 1rem;
	}
	
	.btn-details, .btn-schedule {
		flex: 1;
		padding: 0.75rem 1rem;
		border: none;
		border-radius: 6px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		font-size: 0.9rem;
	}
	
	.btn-details {
		background: var(--accent-color);
		color: white;
	}
	
	.btn-details:hover {
		background: var(--accent-light);
	}
	
	.btn-schedule {
		background: transparent;
		color: var(--accent-color);
		border: 2px solid var(--accent-color);
	}
	
	.btn-schedule:hover {
		background: var(--accent-color);
		color: white;
	}
	
	.no-results {
		text-align: center;
		padding: 4rem 2rem;
		color: var(--text-light);
	}
	
	.no-results h3 {
		font-size: 1.5rem;
		margin: 0 0 1rem 0;
		color: var(--heading-color);
	}
	
	.btn {
		padding: 1rem 2rem;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 600;
		font-size: 1rem;
		transition: all 0.3s ease;
		display: inline-block;
		border: none;
		cursor: pointer;
	}
	
	.btn-primary {
		background: var(--accent-color);
		color: white;
		border: 2px solid var(--accent-color);
	}
	
	.btn-primary:hover {
		background: var(--accent-light);
		border-color: var(--accent-light);
		transform: translateY(-2px);
	}
	
	@media (max-width: 768px) {
		.content-layout {
			grid-template-columns: 1fr;
		}
		
		.filters-sidebar {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 1000;
			transform: translateX(-100%);
			transition: transform 0.3s ease;
			overflow-y: auto;
		}
		
		.filters-sidebar.mobile-open {
			transform: translateX(0);
		}
		
		.mobile-filters-toggle {
			display: block;
		}
		
		.page-header h1 {
			font-size: 2rem;
		}
		
		.results-summary {
			flex-direction: column;
			gap: 1rem;
		}
		
		.homes-container {
			grid-template-columns: 1fr;
			padding: 1rem;
		}
		
		.home-specs {
			gap: 0.5rem;
		}
		
		.spec {
			font-size: 0.8rem;
			padding: 0.4rem 0.8rem;
		}
	}
</style>