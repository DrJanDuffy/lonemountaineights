<script>
import { onMount } from 'svelte';

const heroImage =
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';

let searchValue = '';
let activeTab = 'search';

function handleSearch() {
	if (searchValue.trim()) {
		window.open(`https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0yOTMx`, '_blank');
	}
}

function handleKeydown(event) {
	if (event.key === 'Enter') {
		handleSearch();
	}
}

// Load RealScout widgets
onMount(() => {
  // Load RealScout script if not already loaded
  if (!document.querySelector('script[src*="realscout-web-components"]')) {
    const script = document.createElement('script');
    script.src = 'https://em.realscout.com/widgets/realscout-web-components.umd.js';
    script.type = 'module';
    document.head.appendChild(script);
  }
});
</script>

<section class="hero">
	<div class="hero-background">
		<img src={heroImage} alt="Las Vegas cityscape at night" />
		<div class="hero-overlay"></div>
	</div>
	
	<div class="hero-content">
		<!-- Hero Header -->
		<div class="hero-header">
			<h1 class="hero-title">Find Your Dream Home in Lone Mountain Heights</h1>
			<p class="hero-subtitle">Las Vegas's premier community with mountain views, luxury amenities, and exceptional value</p>
		</div>

		<!-- Search Interface -->
		<div class="search-interface">
			<div class="search-container">
				<div class="search-tabs">
					<button 
						class="search-tab" 
						class:active={activeTab === 'search'}
						on:click={() => activeTab = 'search'}
					>
						<span class="tab-icon">🏠</span>
						<span class="tab-text">Search Homes</span>
					</button>
					<button 
						class="search-tab" 
						class:active={activeTab === 'valuation'}
						on:click={() => activeTab = 'valuation'}
					>
						<span class="tab-icon">💰</span>
						<span class="tab-text">Home Value</span>
					</button>
				</div>
				
				<div class="search-form">
					{#if activeTab === 'search'}
						<div class="widget-container">
							<div class="widget-header">
								<h3>Search Properties</h3>
								<p>Find your perfect home in Lone Mountain Heights</p>
							</div>
							<div class="realscout-search-widget">
								<realscout-simple-search agent-encoded-id="QWdlbnQtMjI1MDUw"></realscout-simple-search>
							</div>
						</div>
					{:else}
						<div class="widget-container">
							<div class="widget-header">
								<h3>Get Your Home's Value</h3>
								<p>Free instant valuation for your property</p>
							</div>
							<div class="realscout-valuation-widget">
								<realscout-home-value agent-encoded-id="QWdlbnQtMjI1MDUw"></realscout-home-value>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>

		<!-- Trust Indicators -->
		<div class="trust-indicators">
			<div class="trust-item">
				<span class="trust-number">500+</span>
				<span class="trust-label">Homes Sold</span>
			</div>
			<div class="trust-item">
				<span class="trust-number">98%</span>
				<span class="trust-label">Client Satisfaction</span>
			</div>
			<div class="trust-item">
				<span class="trust-number">23</span>
				<span class="trust-label">Avg Days on Market</span>
			</div>
			<div class="trust-item">
				<span class="trust-number">$847K</span>
				<span class="trust-label">Avg Sale Price</span>
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		min-height: 90vh;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem 0;
	}

	.hero-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
	}

	.hero-background img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.hero-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(45deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 100%);
		z-index: 2;
	}

	.hero-content {
		position: relative;
		z-index: 3;
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3rem;
	}

	/* Hero Header */
	.hero-header {
		text-align: center;
		margin-bottom: 1rem;
	}

	.hero-title {
		font-size: 3.5rem;
		font-weight: 700;
		margin: 0 0 1rem 0;
		line-height: 1.1;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
		background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.hero-subtitle {
		font-size: 1.3rem;
		font-weight: 400;
		margin: 0;
		opacity: 0.95;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
		max-width: 600px;
		margin: 0 auto;
		line-height: 1.4;
	}

	/* Search Interface Styling */
	.search-interface {
		width: 100%;
		max-width: 800px;
	}

	.search-container {
		background: rgba(255, 255, 255, 0.98);
		border-radius: 16px;
		box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
		backdrop-filter: blur(20px);
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.search-tabs {
		display: flex;
		background: #f8f9fa;
		padding: 0.5rem;
		gap: 0.5rem;
	}

	.search-tab {
		flex: 1;
		padding: 1rem 1.5rem;
		border: none;
		background: transparent;
		color: #6c757d;
		font-weight: 600;
		font-size: 0.9rem;
		cursor: pointer;
		transition: all 0.3s ease;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		position: relative;
		overflow: hidden;
	}

	.search-tab::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
		transition: left 0.5s;
	}

	.search-tab:hover::before {
		left: 100%;
	}

	.search-tab.active {
		background: var(--accent-color);
		color: white;
		box-shadow: 0 4px 12px rgba(58, 141, 222, 0.3);
		transform: translateY(-1px);
	}

	.search-tab:hover:not(.active) {
		background: #e9ecef;
		color: #495057;
		transform: translateY(-1px);
	}

	.tab-icon {
		font-size: 1.2rem;
	}

	.tab-text {
		font-weight: 600;
	}

	.search-form {
		padding: 2rem;
	}

	/* Widget Container */
	.widget-container {
		width: 100%;
	}

	.widget-header {
		text-align: center;
		margin-bottom: 1.5rem;
	}

	.widget-header h3 {
		font-size: 1.5rem;
		font-weight: 700;
		color: #1a365d;
		margin: 0 0 0.5rem 0;
	}

	.widget-header p {
		font-size: 1rem;
		color: #6c757d;
		margin: 0;
		line-height: 1.4;
	}

	/* Trust Indicators */
	.trust-indicators {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 2rem;
		width: 100%;
		max-width: 800px;
		margin-top: 2rem;
	}

	.trust-item {
		text-align: center;
		padding: 1.5rem 1rem;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		transition: all 0.3s ease;
	}

	.trust-item:hover {
		transform: translateY(-2px);
		background: rgba(255, 255, 255, 0.15);
	}

	.trust-number {
		display: block;
		font-size: 2rem;
		font-weight: 700;
		color: white;
		margin-bottom: 0.5rem;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	}

	.trust-label {
		display: block;
		font-size: 0.9rem;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.9);
		text-transform: uppercase;
		letter-spacing: 0.5px;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
	}

	/* RealScout Widget Styles */
	.realscout-search-widget {
		width: 100%;
	}

	.realscout-valuation-widget {
		width: 100%;
	}

	/* RealScout Simple Search Styles */
	:global(realscout-simple-search) {
		--rs-ss-font-primary-color: #6a6d72;
		--rs-ss-searchbar-border-color: hsl(0, 0%, 80%);
		--rs-ss-box-shadow: 0 10px 15px -3px #0000001a;
		--rs-ss-widget-width: 100% !important;
	}

	/* RealScout Home Value Styles */
	:global(realscout-home-value) {
		--rs-hvw-background-color: #ffffff;
		--rs-hvw-title-color: #000000;
		--rs-hvw-subtitle-color: rgba(28, 30, 38, 0.5);
		--rs-hvw-primary-button-text-color: #ffffff;
		--rs-hvw-primary-button-color: rgb(35, 93, 137);
		--rs-hvw-secondary-button-text-color: rgb(35, 93, 137);
		--rs-hvw-secondary-button-color: #ffffff;
		--rs-hvw-widget-width: 100%;
	}

	.search-input-container {
		display: flex;
		align-items: center;
		background: white;
		border: 2px solid #e9ecef;
		border-radius: 6px;
		padding: 0.5rem;
		transition: border-color 0.2s ease;
	}

	.search-input-container:focus-within {
		border-color: #8b1538;
	}

	.search-icon {
		font-size: 1.2rem;
		margin: 0 0.75rem;
		color: #6c757d;
	}

	.search-input {
		flex: 1;
		border: none;
		outline: none;
		font-size: 1rem;
		padding: 0.75rem 0;
		background: transparent;
	}

	.search-input::placeholder {
		color: #adb5bd;
	}

	.search-button {
		background: #8b1538;
		color: white;
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 4px;
		cursor: pointer;
		font-weight: 600;
		transition: background 0.2s ease;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.search-button:hover {
		background: #6d0f2a;
	}

	.hero-tagline {
		text-align: center;
	}

	.hero-tagline h1 {
		font-size: 3.5rem;
		font-weight: 700;
		color: white;
		margin: 0;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
		letter-spacing: 2px;
		line-height: 1.1;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.hero {
			height: 60vh;
		}

		.hero-content {
			padding: 0 1rem;
			gap: 2rem;
		}

		.search-interface {
			max-width: 100%;
		}

		.search-tabs {
			flex-direction: column;
		}

		.search-tab {
			padding: 0.75rem 1rem;
			font-size: 0.8rem;
		}

		.search-form {
			padding: 1.5rem;
		}

		.search-input-container {
			flex-direction: column;
			gap: 1rem;
		}

		.search-input {
			text-align: center;
		}

		.search-button {
			width: 100%;
			justify-content: center;
		}

		.hero-tagline h1 {
			font-size: 2.5rem;
			letter-spacing: 1px;
		}
	}

	@media (max-width: 480px) {
		.hero-title {
			font-size: 2rem;
		}

		.hero-subtitle {
			font-size: 1rem;
		}

		.search-tab {
			font-size: 0.75rem;
			padding: 0.5rem 0.75rem;
		}

		.trust-indicators {
			grid-template-columns: 1fr;
			gap: 0.75rem;
		}

		.trust-item {
			padding: 0.75rem;
		}

		.trust-number {
			font-size: 1.5rem;
		}

		.trust-label {
			font-size: 0.8rem;
		}
	}
</style>