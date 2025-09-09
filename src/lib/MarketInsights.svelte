<script>
// Mock market data - in production this would come from real estate APIs
const marketData = {
  averagePrice: 847000,
  medianPrice: 825000,
  pricePerSqft: 345,
  daysOnMarket: 12,
  inventory: 47,
  monthsSupply: 1.8,
  priceChange: 5.2,
  yearOverYear: 8.7,
};

const recentSales = [
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
</script>

<section class="market-insights">
	<div class="container">
		<div class="section-header">
			<h2>Lone Mountain Heights Market Insights</h2>
			<p>Real-time data and expert analysis from Dr. Jan Duffy</p>
		</div>
		
		<div class="market-stats">
			<div class="stat-card primary">
				<div class="stat-icon">🏠</div>
				<div class="stat-content">
					<span class="stat-value">{formatPrice(marketData.averagePrice)}</span>
					<span class="stat-label">Average Sale Price</span>
					<span class="stat-change positive">+{marketData.priceChange}% vs last month</span>
				</div>
			</div>
			
			<div class="stat-card">
				<div class="stat-icon">📊</div>
				<div class="stat-content">
					<span class="stat-value">{marketData.daysOnMarket}</span>
					<span class="stat-label">Days on Market</span>
					<span class="stat-change positive">-3 days vs last month</span>
				</div>
			</div>
			
			<div class="stat-card">
				<div class="stat-icon">📈</div>
				<div class="stat-content">
					<span class="stat-value">${marketData.pricePerSqft}</span>
					<span class="stat-label">Price per Sq Ft</span>
					<span class="stat-change positive">+{marketData.yearOverYear}% YoY</span>
				</div>
			</div>
			
			<div class="stat-card">
				<div class="stat-icon">🏘️</div>
				<div class="stat-content">
					<span class="stat-value">{marketData.inventory}</span>
					<span class="stat-label">Active Listings</span>
					<span class="stat-change neutral">{marketData.monthsSupply} months supply</span>
				</div>
			</div>
		</div>
		
		<div class="insights-content">
			<div class="recent-sales">
				<h3>Recent Sales in Lone Mountain Heights</h3>
				<div class="sales-table">
					<div class="table-header">
						<span>Address</span>
						<span>Sale Price</span>
						<span>Sq Ft</span>
						<span>Days on Market</span>
						<span>Sold Date</span>
					</div>
					{#each recentSales as sale}
						<div class="table-row">
							<span class="address">{sale.address}</span>
							<span class="price">{formatPrice(sale.price)}</span>
							<span class="sqft">{sale.sqft.toLocaleString()}</span>
							<span class="days {sale.daysOnMarket <= 10 ? 'fast' : sale.daysOnMarket <= 20 ? 'normal' : 'slow'}">
								{sale.daysOnMarket} days
							</span>
							<span class="date">{formatDate(sale.soldDate)}</span>
						</div>
					{/each}
				</div>
			</div>
			
			<div class="expert-analysis">
				<h3>Dr. Jan's Market Analysis</h3>
				<div class="analysis-content">
					<div class="analysis-point">
						<div class="point-icon">🔥</div>
						<div class="point-content">
							<h4>Hot Market Conditions</h4>
							<p>Lone Mountain Heights is experiencing strong buyer demand with homes selling 3 days faster than last month. The low inventory (1.8 months supply) is creating competitive conditions.</p>
						</div>
					</div>
					
					<div class="analysis-point">
						<div class="point-icon">💰</div>
						<div class="point-content">
							<h4>Price Appreciation</h4>
							<p>Average prices are up 5.2% month-over-month and 8.7% year-over-year. Corner lots and mountain views are commanding premium prices.</p>
						</div>
					</div>
					
					<div class="analysis-point">
						<div class="point-icon">🎯</div>
						<div class="point-content">
							<h4>Best Pricing Strategy</h4>
							<p>Homes priced competitively (within 2% of market value) are selling fastest. Overpricing leads to extended market time and eventual price reductions.</p>
						</div>
					</div>
					
					<div class="analysis-point">
						<div class="point-icon">📅</div>
						<div class="point-content">
							<h4>Timing Insights</h4>
							<p>Spring is typically the strongest selling season, but current market conditions suggest year-round activity. Off-market opportunities are increasing.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="cta-section">
			<h3>Get Your Personalized Market Report</h3>
			<p>Dr. Jan provides detailed market analysis for your specific street and home type</p>
			<div class="cta-buttons">
				<a href="/market-report" class="btn btn-primary">Download Market Report</a>
				<a href="tel:702-222-1964" class="btn btn-secondary">Call for Analysis</a>
			</div>
		</div>
	</div>
</section>

<style>
	.market-insights {
		background: var(--tertiary-color);
		padding: 4rem 2rem;
	}
	
	.container {
		max-width: 1200px;
		margin: 0 auto;
	}
	
	.section-header {
		text-align: center;
		margin-bottom: 3rem;
	}
	
	.section-header h2 {
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 1rem 0;
	}
	
	.section-header p {
		font-size: 1.2rem;
		color: var(--text-light);
		margin: 0;
	}
	
	.market-stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
		margin-bottom: 3rem;
	}
	
	.stat-card {
		background: white;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		display: flex;
		align-items: center;
		gap: 1rem;
		transition: transform 0.3s ease;
	}
	
	.stat-card:hover {
		transform: translateY(-2px);
	}
	
	.stat-card.primary {
		background: linear-gradient(135deg, var(--accent-color), var(--accent-light));
		color: white;
	}
	
	.stat-icon {
		font-size: 2.5rem;
		opacity: 0.8;
	}
	
	.stat-content {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	
	.stat-value {
		font-size: 1.8rem;
		font-weight: 700;
		color: inherit;
	}
	
	.stat-label {
		font-size: 0.9rem;
		opacity: 0.8;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}
	
	.stat-change {
		font-size: 0.8rem;
		font-weight: 600;
	}
	
	.stat-change.positive {
		color: var(--success-green);
	}
	
	.stat-change.neutral {
		color: var(--text-light);
	}
	
	.insights-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
		margin-bottom: 3rem;
	}
	
	.recent-sales h3, .expert-analysis h3 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 1.5rem 0;
	}
	
	.sales-table {
		background: white;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
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
	}
	
	.days.fast {
		background: var(--success-green);
		color: white;
	}
	
	.days.normal {
		background: var(--warning-orange);
		color: white;
	}
	
	.days.slow {
		background: var(--error-red);
		color: white;
	}
	
	.date {
		color: var(--text-light);
		font-size: 0.9rem;
	}
	
	.expert-analysis {
		background: white;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	}
	
	.analysis-content {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	
	.analysis-point {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
	}
	
	.point-icon {
		font-size: 1.5rem;
		flex-shrink: 0;
		margin-top: 0.25rem;
	}
	
	.point-content h4 {
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--heading-color);
		margin: 0 0 0.5rem 0;
	}
	
	.point-content p {
		margin: 0;
		color: var(--text-color);
		line-height: 1.6;
		font-size: 0.95rem;
	}
	
	.cta-section {
		text-align: center;
		background: white;
		padding: 3rem 2rem;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	}
	
	.cta-section h3 {
		font-size: 2rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 1rem 0;
	}
	
	.cta-section p {
		font-size: 1.1rem;
		color: var(--text-light);
		margin: 0 0 2rem 0;
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
		min-width: 200px;
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
		.market-insights {
			padding: 2rem 1rem;
		}
		
		.section-header h2 {
			font-size: 2rem;
		}
		
		.market-stats {
			grid-template-columns: 1fr;
		}
		
		.insights-content {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
		
		.table-header, .table-row {
			grid-template-columns: 1fr;
			gap: 0.5rem;
			text-align: left;
		}
		
		.table-header span, .table-row span {
			padding: 0.25rem 0;
		}
		
		.cta-buttons {
			flex-direction: column;
			align-items: center;
		}
		
		.btn {
			min-width: 250px;
		}
	}
</style>
