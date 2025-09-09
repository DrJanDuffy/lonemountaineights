<script>
// Calculator state
let homeValue = {
  address: '',
  bedrooms: 3,
  bathrooms: 2,
  sqft: 2000,
  yearBuilt: 2010,
  lotSize: 0.25,
  condition: 'good',
  upgrades: [],
};

let calculatedValue = null;
let isCalculating = false;
let showResults = false;

// Lone Mountain Heights specific data
const neighborhoodData = {
  basePricePerSqft: 425,
  bedroomMultiplier: 5000,
  bathroomMultiplier: 3000,
  lotSizeMultiplier: 10000,
  yearBuiltAdjustment: {
    '2020+': 1.1,
    '2015-2019': 1.05,
    '2010-2014': 1.0,
    '2005-2009': 0.95,
    '2000-2004': 0.9,
    'pre-2000': 0.85,
  },
  conditionMultiplier: {
    excellent: 1.1,
    good: 1.0,
    fair: 0.9,
    'needs-work': 0.8,
  },
  upgradeValues: {
    'kitchen-remodel': 15000,
    'bathroom-remodel': 10000,
    'new-roof': 8000,
    'new-hvac': 6000,
    'hardwood-floors': 5000,
    pool: 25000,
    landscaping: 3000,
    'smart-home': 2000,
  },
};

// Available upgrades
const availableUpgrades = [
  { id: 'kitchen-remodel', label: 'Kitchen Remodel', value: 15000 },
  { id: 'bathroom-remodel', label: 'Bathroom Remodel', value: 10000 },
  { id: 'new-roof', label: 'New Roof', value: 8000 },
  { id: 'new-hvac', label: 'New HVAC System', value: 6000 },
  { id: 'hardwood-floors', label: 'Hardwood Floors', value: 5000 },
  { id: 'pool', label: 'Swimming Pool', value: 25000 },
  { id: 'landscaping', label: 'Professional Landscaping', value: 3000 },
  { id: 'smart-home', label: 'Smart Home Features', value: 2000 },
];

// Calculate home value
function calculateValue() {
  isCalculating = true;

  // Simulate calculation delay
  setTimeout(() => {
    let baseValue = homeValue.sqft * neighborhoodData.basePricePerSqft;

    // Add bedroom value
    baseValue += homeValue.bedrooms * neighborhoodData.bedroomMultiplier;

    // Add bathroom value
    baseValue += homeValue.bathrooms * neighborhoodData.bathroomMultiplier;

    // Add lot size value
    baseValue += homeValue.lotSize * neighborhoodData.lotSizeMultiplier;

    // Apply year built adjustment
    const yearBuiltKey = getYearBuiltKey(homeValue.yearBuilt);
    baseValue *= neighborhoodData.yearBuiltAdjustment[yearBuiltKey];

    // Apply condition multiplier
    baseValue *= neighborhoodData.conditionMultiplier[homeValue.condition];

    // Add upgrade values
    let upgradeValue = 0;
    homeValue.upgrades.forEach((upgradeId) => {
      upgradeValue += neighborhoodData.upgradeValues[upgradeId] || 0;
    });
    baseValue += upgradeValue;

    // Add market appreciation (5.2% for Lone Mountain Heights)
    baseValue *= 1.052;

    calculatedValue = {
      estimatedValue: Math.round(baseValue),
      range: {
        low: Math.round(baseValue * 0.95),
        high: Math.round(baseValue * 1.05),
      },
      upgradeValue: upgradeValue,
      marketAppreciation: 5.2,
    };

    isCalculating = false;
    showResults = true;
  }, 2000);
}

function getYearBuiltKey(year) {
  if (year >= 2020) return '2020+';
  if (year >= 2015) return '2015-2019';
  if (year >= 2010) return '2010-2014';
  if (year >= 2005) return '2005-2009';
  if (year >= 2000) return '2000-2004';
  return 'pre-2000';
}

function toggleUpgrade(upgradeId) {
  if (homeValue.upgrades.includes(upgradeId)) {
    homeValue.upgrades = homeValue.upgrades.filter((id) => id !== upgradeId);
  } else {
    homeValue.upgrades = [...homeValue.upgrades, upgradeId];
  }
}

function resetCalculator() {
  homeValue = {
    address: '',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2000,
    yearBuilt: 2010,
    lotSize: 0.25,
    condition: 'good',
    upgrades: [],
  };
  calculatedValue = null;
  showResults = false;
}
</script>

<div class="home-value-calculator">
	<div class="calculator-header">
		<h3>Lone Mountain Heights Home Value Calculator</h3>
		<p>Get an instant, accurate estimate of your home's value using local market data</p>
	</div>
	
	{#if !showResults}
		<div class="calculator-form">
			<div class="form-section">
				<h4>Property Details</h4>
				<div class="form-grid">
					<div class="form-group">
						<label for="address">Property Address</label>
						<input 
							id="address"
							type="text" 
							bind:value={homeValue.address}
							placeholder="1234 Mountain View Dr, Las Vegas, NV 89129"
						/>
					</div>
					
					<div class="form-group">
						<label for="bedrooms">Bedrooms</label>
						<select id="bedrooms" bind:value={homeValue.bedrooms}>
							<option value={2}>2</option>
							<option value={3}>3</option>
							<option value={4}>4</option>
							<option value={5}>5</option>
							<option value={6}>6+</option>
						</select>
					</div>
					
					<div class="form-group">
						<label for="bathrooms">Bathrooms</label>
						<select id="bathrooms" bind:value={homeValue.bathrooms}>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
							<option value={4}>4</option>
							<option value={5}>5+</option>
						</select>
					</div>
					
					<div class="form-group">
						<label for="sqft">Square Footage</label>
						<input 
							id="sqft"
							type="number" 
							bind:value={homeValue.sqft}
							placeholder="2000"
						/>
					</div>
					
					<div class="form-group">
						<label for="yearBuilt">Year Built</label>
						<input 
							id="yearBuilt"
							type="number" 
							bind:value={homeValue.yearBuilt}
							placeholder="2010"
							min="1950"
							max="2024"
						/>
					</div>
					
					<div class="form-group">
						<label for="lotSize">Lot Size (acres)</label>
						<input 
							id="lotSize"
							type="number" 
							bind:value={homeValue.lotSize}
							placeholder="0.25"
							step="0.01"
						/>
					</div>
				</div>
			</div>
			
			<div class="form-section">
				<h4>Property Condition</h4>
				<div class="condition-options">
					{#each ['excellent', 'good', 'fair', 'needs-work'] as condition}
						<label class="condition-option">
							<input 
								type="radio" 
								bind:group={homeValue.condition} 
								value={condition}
							/>
							<span class="condition-label">
								{condition === 'excellent' ? 'Excellent' : 
								 condition === 'good' ? 'Good' : 
								 condition === 'fair' ? 'Fair' : 'Needs Work'}
							</span>
						</label>
					{/each}
				</div>
			</div>
			
			<div class="form-section">
				<h4>Recent Upgrades (Select all that apply)</h4>
				<div class="upgrades-grid">
					{#each availableUpgrades as upgrade}
						<label class="upgrade-option">
							<input 
								type="checkbox" 
								checked={homeValue.upgrades.includes(upgrade.id)}
								on:change={() => toggleUpgrade(upgrade.id)}
							/>
							<span class="upgrade-label">
								{upgrade.label}
								<span class="upgrade-value">+${upgrade.value.toLocaleString()}</span>
							</span>
						</label>
					{/each}
				</div>
			</div>
			
			<div class="form-actions">
				<button 
					class="btn btn-primary calculate-btn" 
					on:click={calculateValue}
					disabled={isCalculating}
				>
					{#if isCalculating}
						Calculating...
					{:else}
						Calculate My Home Value
					{/if}
				</button>
			</div>
		</div>
	{:else}
		<div class="calculator-results">
			<div class="results-header">
				<h4>Your Home Value Estimate</h4>
				<button class="reset-btn" on:click={resetCalculator}>Calculate Another</button>
			</div>
			
			<div class="value-display">
				<div class="main-value">
					${calculatedValue.estimatedValue.toLocaleString()}
				</div>
				<div class="value-range">
					Range: ${calculatedValue.range.low.toLocaleString()} - ${calculatedValue.range.high.toLocaleString()}
				</div>
			</div>
			
			<div class="value-breakdown">
				<div class="breakdown-item">
					<span class="breakdown-label">Base Value:</span>
					<span class="breakdown-value">${(calculatedValue.estimatedValue * 0.8).toLocaleString()}</span>
				</div>
				<div class="breakdown-item">
					<span class="breakdown-label">Upgrades:</span>
					<span class="breakdown-value">+${calculatedValue.upgradeValue.toLocaleString()}</span>
				</div>
				<div class="breakdown-item">
					<span class="breakdown-label">Market Appreciation:</span>
					<span class="breakdown-value">+{calculatedValue.marketAppreciation}%</span>
				</div>
			</div>
			
			<div class="results-cta">
				<h5>Ready to Sell Your Home?</h5>
				<p>Get a professional market analysis and expert guidance from Dr. Jan Duffy</p>
				<div class="cta-buttons">
					<a href="tel:702-222-1964" class="btn btn-primary">Call 702-222-1964</a>
					<a href="/contact" class="btn btn-secondary">Get Free Analysis</a>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.home-value-calculator {
		background: white;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		margin-bottom: 2rem;
	}
	
	.calculator-header {
		text-align: center;
		margin-bottom: 2rem;
	}
	
	.calculator-header h3 {
		font-size: 1.8rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 0.5rem 0;
	}
	
	.calculator-header p {
		color: var(--text-color);
		margin: 0;
	}
	
	.form-section {
		margin-bottom: 2rem;
		padding: 1.5rem;
		background: var(--warm-cream);
		border-radius: 8px;
	}
	
	.form-section h4 {
		font-size: 1.3rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 1rem 0;
	}
	
	.form-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
	}
	
	.form-group {
		display: flex;
		flex-direction: column;
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
		border: 2px solid #e5e7eb;
		border-radius: 8px;
		font-size: 1rem;
		transition: border-color 0.3s ease;
	}
	
	.form-group input:focus,
	.form-group select:focus {
		outline: none;
		border-color: var(--accent-color);
	}
	
	.condition-options {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 1rem;
	}
	
	.condition-option {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
		padding: 1rem;
		background: white;
		border-radius: 8px;
		border: 2px solid #e5e7eb;
		transition: all 0.3s ease;
	}
	
	.condition-option:hover {
		border-color: var(--accent-color);
	}
	
	.condition-option input[type="radio"] {
		margin: 0;
	}
	
	.condition-option input[type="radio"]:checked + .condition-label {
		color: var(--accent-color);
		font-weight: 700;
	}
	
	.condition-option:has(input[type="radio"]:checked) {
		border-color: var(--accent-color);
		background: rgba(59, 130, 246, 0.1);
	}
	
	.upgrades-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
	}
	
	.upgrade-option {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		cursor: pointer;
		padding: 1rem;
		background: white;
		border-radius: 8px;
		border: 2px solid #e5e7eb;
		transition: all 0.3s ease;
	}
	
	.upgrade-option:hover {
		border-color: var(--accent-color);
	}
	
	.upgrade-option input[type="checkbox"] {
		margin: 0;
	}
	
	.upgrade-label {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		flex: 1;
	}
	
	.upgrade-value {
		font-size: 0.8rem;
		color: var(--success-green);
		font-weight: 600;
	}
	
	.upgrade-option:has(input[type="checkbox"]:checked) {
		border-color: var(--accent-color);
		background: rgba(59, 130, 246, 0.1);
	}
	
	.form-actions {
		text-align: center;
		margin-top: 2rem;
	}
	
	.calculate-btn {
		padding: 1rem 2rem;
		background: var(--accent-color);
		color: white;
		border: none;
		border-radius: 8px;
		font-size: 1.1rem;
		font-weight: 700;
		cursor: pointer;
		transition: all 0.3s ease;
		min-width: 200px;
	}
	
	.calculate-btn:hover:not(:disabled) {
		background: var(--accent-light);
		transform: translateY(-2px);
	}
	
	.calculate-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
	
	.calculator-results {
		text-align: center;
	}
	
	.results-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
	}
	
	.results-header h4 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0;
	}
	
	.reset-btn {
		background: none;
		border: 2px solid var(--accent-color);
		color: var(--accent-color);
		padding: 0.5rem 1rem;
		border-radius: 6px;
		cursor: pointer;
		font-weight: 600;
		transition: all 0.3s ease;
	}
	
	.reset-btn:hover {
		background: var(--accent-color);
		color: white;
	}
	
	.value-display {
		margin-bottom: 2rem;
	}
	
	.main-value {
		font-size: 3rem;
		font-weight: 700;
		color: var(--accent-color);
		margin-bottom: 0.5rem;
	}
	
	.value-range {
		font-size: 1.1rem;
		color: var(--text-color);
	}
	
	.value-breakdown {
		background: var(--warm-cream);
		padding: 1.5rem;
		border-radius: 8px;
		margin-bottom: 2rem;
		max-width: 400px;
		margin-left: auto;
		margin-right: auto;
	}
	
	.breakdown-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 0;
		border-bottom: 1px solid #e5e7eb;
	}
	
	.breakdown-item:last-child {
		border-bottom: none;
	}
	
	.breakdown-label {
		color: var(--text-color);
	}
	
	.breakdown-value {
		font-weight: 700;
		color: var(--heading-color);
	}
	
	.results-cta {
		background: var(--tertiary-color);
		padding: 2rem;
		border-radius: 12px;
	}
	
	.results-cta h5 {
		font-size: 1.3rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 0.5rem 0;
	}
	
	.results-cta p {
		color: var(--text-light);
		margin: 0 0 1.5rem 0;
	}
	
	.cta-buttons {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}
	
	.btn {
		padding: 1rem 2rem;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 600;
		font-size: 1rem;
		transition: all 0.3s ease;
		display: inline-block;
		min-width: 150px;
		text-align: center;
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
	
	@media (max-width: 768px) {
		.form-grid {
			grid-template-columns: 1fr;
		}
		
		.condition-options {
			grid-template-columns: 1fr;
		}
		
		.upgrades-grid {
			grid-template-columns: 1fr;
		}
		
		.results-header {
			flex-direction: column;
			gap: 1rem;
		}
		
		.main-value {
			font-size: 2.5rem;
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
