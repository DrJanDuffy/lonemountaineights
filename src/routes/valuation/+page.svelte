<script>
import { onMount } from 'svelte';

let formData = {
  address: '',
  bedrooms: '',
  bathrooms: '',
  sqft: '',
  homeStyle: '',
  yearBuilt: '',
  lotSize: '',
  pool: false,
  garage: '',
  view: '',
  upgrades: [],
};

let valuationResult = null;
let isCalculating = false;
let showResults = false;

const homeStyles = ['Single Story', 'Two Story', 'Townhome', 'Condo'];
const views = ['Mountain', 'Golf Course', 'Desert', 'Neighborhood', 'City'];
const upgradeOptions = [
  'Updated Kitchen',
  'Updated Bathrooms',
  'New Roof',
  'Solar Panels',
  'Pool/Spa',
  'Landscaping',
  'Hardwood Floors',
  'Granite Countertops',
  'Stainless Appliances',
  'Smart Home Features',
];

// Mock comparable sales data
const comparableSales = [
  {
    address: '4567 Mountain Ridge Dr',
    price: 875000,
    sqft: 2450,
    daysOnMarket: 5,
    soldDate: '2024-01-15',
  },
  {
    address: '7890 Desert View Ln',
    price: 725000,
    sqft: 1890,
    daysOnMarket: 12,
    soldDate: '2024-01-12',
  },
  {
    address: '2345 Lone Mountain Way',
    price: 950000,
    sqft: 3200,
    daysOnMarket: 8,
    soldDate: '2024-01-10',
  },
  {
    address: '6789 Canyon Heights Blvd',
    price: 680000,
    sqft: 1750,
    daysOnMarket: 18,
    soldDate: '2024-01-08',
  },
];

function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

async function calculateValuation() {
  if (
    !formData.address ||
    !formData.bedrooms ||
    !formData.bathrooms ||
    !formData.sqft
  ) {
    alert('Please fill in all required fields');
    return;
  }

  isCalculating = true;
  showResults = false;

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Mock valuation calculation
  const basePrice = parseInt(formData.sqft) * 345; // $345 per sqft base
  let adjustments = 0;

  // Bedroom adjustment
  if (parseInt(formData.bedrooms) >= 4) adjustments += 15000;
  if (parseInt(formData.bedrooms) >= 5) adjustments += 25000;

  // Bathroom adjustment
  if (parseInt(formData.bathrooms) >= 3) adjustments += 10000;
  if (parseInt(formData.bathrooms) >= 4) adjustments += 20000;

  // Home style adjustment
  if (formData.homeStyle === 'Two Story') adjustments += 20000;
  if (formData.homeStyle === 'Townhome') adjustments -= 30000;

  // Pool adjustment
  if (formData.pool) adjustments += 25000;

  // Garage adjustment
  if (parseInt(formData.garage) >= 2) adjustments += 10000;
  if (parseInt(formData.garage) >= 3) adjustments += 20000;

  // View adjustment
  if (formData.view === 'Mountain') adjustments += 30000;
  if (formData.view === 'Golf Course') adjustments += 20000;

  // Upgrades adjustment
  adjustments += formData.upgrades.length * 5000;

  // Year built adjustment
  const currentYear = new Date().getFullYear();
  const age = currentYear - parseInt(formData.yearBuilt);
  if (age < 5) adjustments += 15000;
  else if (age < 10) adjustments += 5000;
  else if (age > 20) adjustments -= 10000;

  const estimatedValue = basePrice + adjustments;
  const lowEstimate = estimatedValue * 0.95;
  const highEstimate = estimatedValue * 1.05;

  valuationResult = {
    estimatedValue,
    lowEstimate,
    highEstimate,
    pricePerSqft: Math.round(estimatedValue / parseInt(formData.sqft)),
    confidence: 'High',
    marketTrend: '+5.2%',
    daysOnMarket: 12,
    recommendations: generateRecommendations(estimatedValue, formData),
  };

  isCalculating = false;
  showResults = true;
}

function generateRecommendations(value, data) {
  const recommendations = [];

  if (parseInt(data.sqft) < 2000) {
    recommendations.push(
      'Consider adding square footage - larger homes sell for more per sqft in this area',
    );
  }

  if (!data.pool && value > 800000) {
    recommendations.push(
      'Pool installation could increase value by $25,000+ in this price range',
    );
  }

  if (parseInt(data.yearBuilt) > 2010) {
    recommendations.push('Recent construction - excellent timing for sale');
  }

  if (data.view === 'Mountain') {
    recommendations.push(
      'Mountain views are highly sought after - premium pricing expected',
    );
  }

  return recommendations;
}

function resetForm() {
  formData = {
    address: '',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    homeStyle: '',
    yearBuilt: '',
    lotSize: '',
    pool: false,
    garage: '',
    view: '',
    upgrades: [],
  };
  valuationResult = null;
  showResults = false;
}
</script>

<svelte:head>
	<title>Home Valuation Tool | Lone Mountain Heights Real Estate | Dr. Jan Duffy</title>
	<meta name="description" content="Get an instant home valuation for your Lone Mountain Heights property. Dr. Jan Duffy provides expert market analysis and pricing strategy." />
</svelte:head>

<main class="valuation-page">
	<div class="page-header">
		<div class="container">
			<h1>What's Your Lone Mountain Heights Home Worth?</h1>
			<p>Get an instant valuation with Dr. Jan Duffy's expert market analysis</p>
		</div>
	</div>
	
	<div class="page-content">
		<div class="container">
			<div class="content-layout">
				<!-- Valuation Form -->
				<div class="valuation-form-section">
					<div class="form-container">
						<h2>Property Details</h2>
						<p class="form-subtitle">Fill in your home's details for an accurate valuation</p>
						
						<form on:submit|preventDefault={calculateValuation}>
							<div class="form-grid">
								<div class="form-group full-width">
									<label for="address">Street Address *</label>
									<input 
										type="text" 
										id="address" 
										bind:value={formData.address} 
										placeholder="1234 Mountain View Dr"
										required 
									/>
								</div>
								
								<div class="form-group">
									<label for="bedrooms">Bedrooms *</label>
									<select id="bedrooms" bind:value={formData.bedrooms} required>
										<option value="">Select</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
										<option value="6">6+</option>
									</select>
								</div>
								
								<div class="form-group">
									<label for="bathrooms">Bathrooms *</label>
									<select id="bathrooms" bind:value={formData.bathrooms} required>
										<option value="">Select</option>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5+</option>
									</select>
								</div>
								
								<div class="form-group">
									<label for="sqft">Square Footage *</label>
									<input 
										type="number" 
										id="sqft" 
										bind:value={formData.sqft} 
										placeholder="2000"
										required 
									/>
								</div>
								
								<div class="form-group">
									<label for="homeStyle">Home Style</label>
									<select id="homeStyle" bind:value={formData.homeStyle}>
										<option value="">Select</option>
										{#each homeStyles as style}
											<option value={style}>{style}</option>
										{/each}
									</select>
								</div>
								
								<div class="form-group">
									<label for="yearBuilt">Year Built</label>
									<input 
										type="number" 
										id="yearBuilt" 
										bind:value={formData.yearBuilt} 
										placeholder="2015"
										min="1950"
										max="2024"
									/>
								</div>
								
								<div class="form-group">
									<label for="lotSize">Lot Size (acres)</label>
									<input 
										type="text" 
										id="lotSize" 
										bind:value={formData.lotSize} 
										placeholder="0.25"
									/>
								</div>
								
								<div class="form-group">
									<label for="garage">Garage Spaces</label>
									<select id="garage" bind:value={formData.garage}>
										<option value="">Select</option>
										<option value="0">0</option>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4+</option>
									</select>
								</div>
								
								<div class="form-group">
									<label for="view">View</label>
									<select id="view" bind:value={formData.view}>
										<option value="">Select</option>
										{#each views as view}
											<option value={view}>{view}</option>
										{/each}
									</select>
								</div>
								
								<div class="form-group full-width">
									<label for="pool-checkbox">
										<input 
											id="pool-checkbox"
											type="checkbox" 
											bind:checked={formData.pool}
										/>
										Has Pool/Spa
									</label>
								</div>
								
								<div class="form-group full-width">
									<label for="upgrades-section">Upgrades & Features</label>
									<div id="upgrades-section" class="upgrades-grid">
										{#each upgradeOptions as upgrade}
											<label class="upgrade-option">
												<input 
													type="checkbox" 
													value={upgrade}
													bind:group={formData.upgrades}
												/>
												{upgrade}
											</label>
										{/each}
									</div>
								</div>
							</div>
							
							<div class="form-actions">
								<button type="submit" class="btn btn-primary" disabled={isCalculating}>
									{#if isCalculating}
										Calculating...
									{:else}
										Get Instant Valuation
									{/if}
								</button>
								<button type="button" class="btn btn-secondary" on:click={resetForm}>
									Reset Form
								</button>
							</div>
						</form>
					</div>
				</div>
				
				<!-- Results Section -->
				{#if showResults && valuationResult}
					<div class="results-section">
						<div class="results-container">
							<h2>Your Home Valuation</h2>
							
							<div class="valuation-summary">
								<div class="main-valuation">
									<span class="valuation-label">Estimated Value</span>
									<span class="valuation-amount">{formatPrice(valuationResult.estimatedValue)}</span>
									<span class="valuation-range">
										{formatPrice(valuationResult.lowEstimate)} - {formatPrice(valuationResult.highEstimate)}
									</span>
								</div>
								
								<div class="valuation-details">
									<div class="detail-item">
										<span class="detail-label">Price per Sq Ft</span>
										<span class="detail-value">${valuationResult.pricePerSqft}</span>
									</div>
									<div class="detail-item">
										<span class="detail-label">Confidence Level</span>
										<span class="detail-value">{valuationResult.confidence}</span>
									</div>
									<div class="detail-item">
										<span class="detail-label">Market Trend</span>
										<span class="detail-value positive">{valuationResult.marketTrend}</span>
									</div>
									<div class="detail-item">
										<span class="detail-label">Avg Days on Market</span>
										<span class="detail-value">{valuationResult.daysOnMarket} days</span>
									</div>
								</div>
							</div>
							
							<div class="recommendations">
								<h3>Dr. Jan's Recommendations</h3>
								<ul>
									{#each valuationResult.recommendations as recommendation}
										<li>{recommendation}</li>
									{/each}
								</ul>
							</div>
							
							<div class="comparable-sales">
								<h3>Recent Comparable Sales</h3>
								<div class="sales-table">
									<div class="table-header">
										<span>Address</span>
										<span>Sale Price</span>
										<span>Sq Ft</span>
										<span>Days on Market</span>
										<span>Sold Date</span>
									</div>
									{#each comparableSales as sale}
										<div class="table-row">
											<span class="address">{sale.address}</span>
											<span class="price">{formatPrice(sale.price)}</span>
											<span class="sqft">{sale.sqft.toLocaleString()}</span>
											<span class="days">{sale.daysOnMarket} days</span>
											<span class="date">{formatDate(sale.soldDate)}</span>
										</div>
									{/each}
								</div>
							</div>
							
							<div class="cta-section">
								<h3>Ready to Sell Your Home?</h3>
								<p>Get a detailed market analysis and pricing strategy from Dr. Jan Duffy</p>
								<div class="cta-buttons">
									<a href="tel:702-222-1964" class="btn btn-primary">Call 702-222-1964</a>
									<a href="/contact" class="btn btn-secondary">Schedule Consultation</a>
								</div>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</main>

<style>
	.valuation-page {
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
		margin: 0;
		opacity: 0.9;
	}
	
	.page-content {
		padding: 2rem 0;
	}
	
	.content-layout {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
	}
	
	.valuation-form-section {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		overflow: hidden;
	}
	
	.form-container {
		padding: 2rem;
	}
	
	.form-container h2 {
		font-size: 1.8rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 0.5rem 0;
	}
	
	.form-subtitle {
		color: var(--text-light);
		margin: 0 0 2rem 0;
	}
	
	.form-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
		margin-bottom: 2rem;
	}
	
	.form-group {
		display: flex;
		flex-direction: column;
	}
	
	.form-group.full-width {
		grid-column: 1 / -1;
	}
	
	.form-group label {
		font-weight: 600;
		color: var(--heading-color);
		margin-bottom: 0.5rem;
		font-size: 0.9rem;
	}
	
	.form-group input,
	.form-group select {
		padding: 0.75rem;
		border: 1px solid var(--tertiary-color);
		border-radius: 6px;
		font-size: 0.9rem;
		background: white;
		transition: border-color 0.3s ease;
	}
	
	.form-group input:focus,
	.form-group select:focus {
		outline: none;
		border-color: var(--accent-color);
		box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
	}
	
	.upgrades-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 0.75rem;
		margin-top: 0.5rem;
	}
	
	.upgrade-option {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.9rem;
		cursor: pointer;
		padding: 0.5rem;
		border-radius: 6px;
		transition: background-color 0.3s ease;
	}
	
	.upgrade-option:hover {
		background: var(--warm-cream);
	}
	
	.upgrade-option input[type="checkbox"] {
		margin: 0;
	}
	
	.form-actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
	}
	
	.btn {
		padding: 1rem 2rem;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 600;
		font-size: 1rem;
		transition: all 0.3s ease;
		display: inline-block;
		text-align: center;
		border: none;
		cursor: pointer;
		min-width: 150px;
	}
	
	.btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
	
	.btn-primary {
		background: var(--accent-color);
		color: white;
		border: 2px solid var(--accent-color);
	}
	
	.btn-primary:hover:not(:disabled) {
		background: var(--accent-light);
		border-color: var(--accent-light);
		transform: translateY(-2px);
	}
	
	.btn-secondary {
		background: transparent;
		color: var(--accent-color);
		border: 2px solid var(--accent-color);
	}
	
	.btn-secondary:hover {
		background: var(--accent-color);
		color: white;
		transform: translateY(-2px);
	}
	
	.results-section {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		overflow: hidden;
	}
	
	.results-container {
		padding: 2rem;
	}
	
	.results-container h2 {
		font-size: 1.8rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 2rem 0;
		text-align: center;
	}
	
	.valuation-summary {
		background: linear-gradient(135deg, var(--accent-color), var(--accent-light));
		color: white;
		padding: 2rem;
		border-radius: 12px;
		margin-bottom: 2rem;
		text-align: center;
	}
	
	.main-valuation {
		margin-bottom: 2rem;
	}
	
	.valuation-label {
		display: block;
		font-size: 1.1rem;
		margin-bottom: 0.5rem;
		opacity: 0.9;
	}
	
	.valuation-amount {
		display: block;
		font-size: 3rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
	}
	
	.valuation-range {
		display: block;
		font-size: 1.1rem;
		opacity: 0.9;
	}
	
	.valuation-details {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}
	
	.detail-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 6px;
	}
	
	.detail-label {
		font-size: 0.9rem;
		opacity: 0.9;
	}
	
	.detail-value {
		font-weight: 600;
		font-size: 1.1rem;
	}
	
	.detail-value.positive {
		color: var(--success-green);
	}
	
	.recommendations {
		background: var(--warm-cream);
		padding: 1.5rem;
		border-radius: 8px;
		margin-bottom: 2rem;
	}
	
	.recommendations h3 {
		font-size: 1.2rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 1rem 0;
	}
	
	.recommendations ul {
		margin: 0;
		padding-left: 1.5rem;
	}
	
	.recommendations li {
		margin-bottom: 0.5rem;
		color: var(--text-color);
		line-height: 1.5;
	}
	
	.comparable-sales h3 {
		font-size: 1.2rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 1rem 0;
	}
	
	.sales-table {
		background: white;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}
	
	.table-header {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
		gap: 1rem;
		padding: 1rem 1.5rem;
		background: var(--accent-color);
		color: white;
		font-weight: 600;
		font-size: 0.9rem;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}
	
	.table-row {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
		gap: 1rem;
		padding: 1rem 1.5rem;
		border-bottom: 1px solid var(--tertiary-color);
		align-items: center;
		transition: background-color 0.3s ease;
	}
	
	.table-row:hover {
		background: var(--warm-cream);
	}
	
	.table-row:last-child {
		border-bottom: none;
	}
	
	.address {
		font-weight: 600;
		color: var(--heading-color);
	}
	
	.price {
		font-weight: 700;
		color: var(--accent-color);
	}
	
	.sqft {
		color: var(--text-color);
	}
	
	.days {
		font-weight: 600;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		text-align: center;
		font-size: 0.8rem;
		background: var(--success-green);
		color: white;
	}
	
	.date {
		color: var(--text-light);
		font-size: 0.9rem;
	}
	
	.cta-section {
		text-align: center;
		background: var(--tertiary-color);
		padding: 2rem;
		border-radius: 8px;
	}
	
	.cta-section h3 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 1rem 0;
	}
	
	.cta-section p {
		color: var(--text-light);
		margin: 0 0 1.5rem 0;
	}
	
	.cta-buttons {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}
	
	@media (max-width: 768px) {
		.content-layout {
			grid-template-columns: 1fr;
		}
		
		.page-header h1 {
			font-size: 2rem;
		}
		
		.form-grid {
			grid-template-columns: 1fr;
		}
		
		.upgrades-grid {
			grid-template-columns: 1fr;
		}
		
		.form-actions {
			flex-direction: column;
		}
		
		.valuation-amount {
			font-size: 2.5rem;
		}
		
		.valuation-details {
			grid-template-columns: 1fr;
		}
		
		.table-header,
		.table-row {
			grid-template-columns: 1fr;
			gap: 0.5rem;
			text-align: left;
		}
		
		.table-header span,
		.table-row span {
			padding: 0.25rem 0;
		}
		
		.cta-buttons {
			flex-direction: column;
			align-items: center;
		}
		
		.btn {
			min-width: 200px;
		}
	}
</style>
