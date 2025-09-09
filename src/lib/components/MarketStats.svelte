<script>
	// Market statistics data (in a real app, this would come from an API)
	let marketData = {
		averagePrice: '$850,000',
		priceChange: '+2.3%',
		daysOnMarket: 28,
		inventoryLevel: 'Low',
		activeListings: 45,
		interestRate: '6.5%',
		lastUpdated: new Date().toLocaleDateString()
	};
	
	// Recent sales data
	let recentSales = [
		{
			address: '1234 Mountain View Dr',
			price: '$875,000',
			bedrooms: 4,
			bathrooms: 3,
			sqft: '2,850',
			daysOnMarket: 15,
			subdivision: 'Lone Mountain Ranch',
			date: '2024-12-18'
		},
		{
			address: '5678 Desert Vista Way',
			price: '$725,000',
			bedrooms: 3,
			bathrooms: 2,
			sqft: '2,200',
			daysOnMarket: 22,
			subdivision: 'Desert Vista Estates',
			date: '2024-12-17'
		},
		{
			address: '9012 Canyon Gate Blvd',
			price: '$1,150,000',
			bedrooms: 5,
			bathrooms: 4,
			sqft: '3,500',
			daysOnMarket: 31,
			subdivision: 'Canyon Gate Country Club',
			date: '2024-12-16'
		},
		{
			address: '3456 Mountain Crest Ln',
			price: '$650,000',
			bedrooms: 3,
			bathrooms: 2,
			sqft: '1,950',
			daysOnMarket: 18,
			subdivision: 'Mountain Crest',
			date: '2024-12-15'
		}
	];
	
	// Market trends
	let marketTrends = [
		{ label: 'Price Trend', value: '+2.3%', direction: 'up', color: 'var(--success-green)' },
		{ label: 'Inventory', value: '-15%', direction: 'down', color: '#ff6b6b' },
		{ label: 'Days on Market', value: '-5 days', direction: 'down', color: 'var(--success-green)' },
		{ label: 'New Listings', value: '+8%', direction: 'up', color: 'var(--success-green)' }
	];
	
	// Auto-update function (in a real app, this would be a WebSocket or API call)
	function updateMarketData() {
		// Simulate real-time updates
		marketData.lastUpdated = new Date().toLocaleDateString();
	}
	
	// Update every 5 minutes
	setInterval(updateMarketData, 300000);
</script>

<div class="market-stats-component">
	<!-- Market Overview -->
	<div class="market-overview">
		<h3>Current Market Overview</h3>
		<div class="stats-grid">
			<div class="stat-card">
				<div class="stat-value">{marketData.averagePrice}</div>
				<div class="stat-label">Average Sale Price</div>
				<div class="stat-change positive">{marketData.priceChange}</div>
			</div>
			<div class="stat-card">
				<div class="stat-value">{marketData.daysOnMarket}</div>
				<div class="stat-label">Days on Market</div>
				<div class="stat-change negative">-5 days</div>
			</div>
			<div class="stat-card">
				<div class="stat-value">{marketData.inventoryLevel}</div>
				<div class="stat-label">Inventory Level</div>
				<div class="stat-change neutral">Stable</div>
			</div>
			<div class="stat-card">
				<div class="stat-value">{marketData.activeListings}</div>
				<div class="stat-label">Active Listings</div>
				<div class="stat-change neutral">Current</div>
			</div>
		</div>
		<div class="last-updated">Last updated: {marketData.lastUpdated}</div>
	</div>
	
	<!-- Market Trends -->
	<div class="market-trends">
		<h3>Market Trends</h3>
		<div class="trends-grid">
			{#each marketTrends as trend}
				<div class="trend-item">
					<span class="trend-label">{trend.label}</span>
					<span class="trend-value" style="color: {trend.color}">
						{trend.direction === 'up' ? '↗' : '↘'} {trend.value}
					</span>
				</div>
			{/each}
		</div>
	</div>
	
	<!-- Recent Sales -->
	<div class="recent-sales">
		<h3>Recent Sales</h3>
		<div class="sales-carousel">
			{#each recentSales as sale}
				<div class="sale-item">
					<div class="sale-address">{sale.address}</div>
					<div class="sale-details">
						<span class="sale-price">{sale.price}</span>
						<span class="sale-specs">{sale.bedrooms} bed / {sale.bathrooms} bath / {sale.sqft} sq ft</span>
					</div>
					<div class="sale-meta">
						<span class="sale-subdivision">{sale.subdivision}</span>
						<span class="sale-days">{sale.daysOnMarket} days on market</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.market-stats-component {
		background: white;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		margin-bottom: 2rem;
	}
	
	.market-overview h3,
	.market-trends h3,
	.recent-sales h3 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 1.5rem 0;
	}
	
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1.5rem;
		margin-bottom: 1rem;
	}
	
	.stat-card {
		background: var(--warm-cream);
		padding: 1.5rem;
		border-radius: 12px;
		text-align: center;
		transition: transform 0.3s ease;
	}
	
	.stat-card:hover {
		transform: translateY(-2px);
	}
	
	.stat-value {
		font-size: 2rem;
		font-weight: 700;
		color: var(--accent-color);
		margin-bottom: 0.5rem;
	}
	
	.stat-label {
		font-size: 0.9rem;
		color: var(--text-color);
		margin-bottom: 0.5rem;
	}
	
	.stat-change {
		font-size: 0.8rem;
		font-weight: 600;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
	}
	
	.stat-change.positive {
		background: var(--success-green);
		color: white;
	}
	
	.stat-change.negative {
		background: #ff6b6b;
		color: white;
	}
	
	.stat-change.neutral {
		background: var(--tertiary-color);
		color: var(--text-color);
	}
	
	.last-updated {
		font-size: 0.8rem;
		color: var(--text-light);
		text-align: center;
		margin-top: 1rem;
	}
	
	.trends-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		margin-bottom: 2rem;
	}
	
	.trend-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background: var(--warm-cream);
		border-radius: 8px;
	}
	
	.trend-label {
		color: var(--text-color);
		font-weight: 500;
	}
	
	.trend-value {
		font-weight: 700;
		font-size: 1.1rem;
	}
	
	.sales-carousel {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1rem;
	}
	
	.sale-item {
		background: var(--warm-cream);
		padding: 1.5rem;
		border-radius: 8px;
		border-left: 4px solid var(--accent-color);
		transition: transform 0.3s ease;
	}
	
	.sale-item:hover {
		transform: translateY(-2px);
	}
	
	.sale-address {
		font-weight: 700;
		color: var(--heading-color);
		margin-bottom: 0.5rem;
		font-size: 1.1rem;
	}
	
	.sale-details {
		display: flex;
		gap: 1rem;
		margin-bottom: 0.5rem;
		font-size: 0.9rem;
	}
	
	.sale-price {
		font-weight: 700;
		color: var(--accent-color);
	}
	
	.sale-meta {
		display: flex;
		justify-content: space-between;
		font-size: 0.8rem;
		color: var(--text-light);
	}
	
	.sale-subdivision {
		font-weight: 600;
	}
	
	@media (max-width: 768px) {
		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}
		
		.trends-grid {
			grid-template-columns: 1fr;
		}
		
		.sales-carousel {
			grid-template-columns: 1fr;
		}
		
		.sale-details {
			flex-direction: column;
			gap: 0.25rem;
		}
		
		.sale-meta {
			flex-direction: column;
			gap: 0.25rem;
		}
	}
</style>
