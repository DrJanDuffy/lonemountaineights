<script>
// Market trend data
const marketTrends = {
  priceAppreciation: {
    title: 'Price Appreciation Trend',
    current: 5.2,
    previous: 3.8,
    change: '+1.4%',
    direction: 'up',
    description:
      'Year-over-year home price appreciation in Lone Mountain Heights',
  },
  inventoryLevels: {
    title: 'Inventory Levels',
    current: 45,
    previous: 52,
    change: '-13.5%',
    direction: 'down',
    description: 'Active listings compared to last quarter',
  },
  daysOnMarket: {
    title: 'Days on Market',
    current: 28,
    previous: 35,
    change: '-20%',
    direction: 'down',
    description: 'Average time from listing to sale',
  },
  salesVolume: {
    title: 'Sales Volume',
    current: 127,
    previous: 98,
    change: '+29.6%',
    direction: 'up',
    description: 'Total sales in the last 12 months',
  },
};

// Price range distribution
const priceDistribution = [
  { range: 'Under $600k', count: 8, percentage: 18, color: '#3b82f6' },
  { range: '$600k - $800k', count: 15, percentage: 33, color: '#10b981' },
  { range: '$800k - $1M', count: 12, percentage: 27, color: '#f59e0b' },
  { range: '$1M - $1.5M', count: 7, percentage: 16, color: '#ef4444' },
  { range: 'Over $1.5M', count: 3, percentage: 6, color: '#8b5cf6' },
];

// Market forecast
const marketForecast = [
  { month: 'Jan 2025', price: 850, inventory: 45, sales: 12 },
  { month: 'Feb 2025', price: 865, inventory: 42, sales: 15 },
  { month: 'Mar 2025', price: 880, inventory: 48, sales: 18 },
  { month: 'Apr 2025', price: 895, inventory: 52, sales: 22 },
  { month: 'May 2025', price: 910, inventory: 55, sales: 25 },
  { month: 'Jun 2025', price: 925, inventory: 58, sales: 28 },
];

// Neighborhood performance
const neighborhoodPerformance = [
  { name: 'Lone Mountain Ranch', avgPrice: 950, appreciation: 6.2, sales: 18 },
  { name: 'Desert Vista Estates', avgPrice: 725, appreciation: 4.8, sales: 22 },
  {
    name: 'Canyon Gate Country Club',
    avgPrice: 1200,
    appreciation: 7.1,
    sales: 12,
  },
  { name: 'Mountain Crest', avgPrice: 680, appreciation: 3.9, sales: 15 },
];
</script>

<div class="market-infographics">
	<div class="infographics-header">
		<h3>Lone Mountain Heights Market Analysis</h3>
		<p>Comprehensive market trends and data insights for informed decision making</p>
	</div>
	
	<!-- Key Metrics Grid -->
	<div class="metrics-grid">
		{#each Object.entries(marketTrends) as [key, trend]}
			<div class="metric-card">
				<div class="metric-header">
					<h4>{trend.title}</h4>
					<div class="metric-change {trend.direction}">
						{trend.change}
					</div>
				</div>
				<div class="metric-value">
					{key === 'priceAppreciation' ? trend.current + '%' : 
					 key === 'inventoryLevels' ? trend.current + ' homes' :
					 key === 'daysOnMarket' ? trend.current + ' days' :
					 trend.current + ' sales'}
				</div>
				<p class="metric-description">{trend.description}</p>
			</div>
		{/each}
	</div>
	
	<!-- Price Distribution Chart -->
	<div class="chart-section">
		<h4>Price Range Distribution</h4>
		<div class="price-distribution">
			{#each priceDistribution as item}
				<div class="distribution-bar">
					<div class="bar-header">
						<span class="bar-label">{item.range}</span>
						<span class="bar-count">{item.count} homes ({item.percentage}%)</span>
					</div>
					<div class="bar-container">
						<div 
							class="bar-fill" 
							style="width: {item.percentage}%; background-color: {item.color};"
						></div>
					</div>
				</div>
			{/each}
		</div>
	</div>
	
	<!-- Market Forecast Chart -->
	<div class="chart-section">
		<h4>6-Month Market Forecast</h4>
		<div class="forecast-chart">
			<div class="chart-labels">
				<div class="y-axis-label">Price (K)</div>
				<div class="y-axis-label">Inventory</div>
				<div class="y-axis-label">Sales</div>
			</div>
			<div class="chart-bars">
				{#each marketForecast as data, index}
					<div class="forecast-month">
						<div class="month-label">{data.month}</div>
						<div class="month-bars">
							<div 
								class="forecast-bar price-bar" 
								style="height: {(data.price - 800) / 2}px;"
								title="Price: ${data.price}k"
							></div>
							<div 
								class="forecast-bar inventory-bar" 
								style="height: {data.inventory * 0.8}px;"
								title="Inventory: {data.inventory}"
							></div>
							<div 
								class="forecast-bar sales-bar" 
								style="height: {data.sales * 1.2}px;"
								title="Sales: {data.sales}"
							></div>
						</div>
					</div>
				{/each}
			</div>
		</div>
		<div class="chart-legend">
			<div class="legend-item">
				<div class="legend-color price-legend"></div>
				<span>Average Price</span>
			</div>
			<div class="legend-item">
				<div class="legend-color inventory-legend"></div>
				<span>Inventory</span>
			</div>
			<div class="legend-item">
				<div class="legend-color sales-legend"></div>
				<span>Sales Volume</span>
			</div>
		</div>
	</div>
	
	<!-- Neighborhood Performance Table -->
	<div class="chart-section">
		<h4>Neighborhood Performance Comparison</h4>
		<div class="neighborhood-table">
			<div class="table-header">
				<div class="table-cell">Neighborhood</div>
				<div class="table-cell">Avg Price</div>
				<div class="table-cell">Appreciation</div>
				<div class="table-cell">Sales (12mo)</div>
			</div>
			{#each neighborhoodPerformance as neighborhood}
				<div class="table-row">
					<div class="table-cell neighborhood-name">{neighborhood.name}</div>
					<div class="table-cell">${neighborhood.avgPrice}k</div>
					<div class="table-cell appreciation {neighborhood.appreciation > 5 ? 'high' : 'medium'}">
						{neighborhood.appreciation}%
					</div>
					<div class="table-cell">{neighborhood.sales}</div>
				</div>
			{/each}
		</div>
	</div>
	
	<!-- Market Insights -->
	<div class="insights-section">
		<h4>Key Market Insights</h4>
		<div class="insights-grid">
			<div class="insight-card positive">
				<div class="insight-icon">📈</div>
				<div class="insight-content">
					<h5>Strong Price Growth</h5>
					<p>Lone Mountain Heights continues to outperform the broader Las Vegas market with 5.2% year-over-year appreciation.</p>
				</div>
			</div>
			<div class="insight-card neutral">
				<div class="insight-icon">🏠</div>
				<div class="insight-content">
					<h5>Limited Inventory</h5>
					<p>With only 45 active listings, the market favors sellers with competitive pricing and quick sales.</p>
				</div>
			</div>
			<div class="insight-card positive">
				<div class="insight-icon">⚡</div>
				<div class="insight-content">
					<h5>Fast Sales</h5>
					<p>Homes are selling 20% faster than last year, averaging just 28 days on market.</p>
				</div>
			</div>
			<div class="insight-card positive">
				<div class="insight-icon">🎯</div>
				<div class="insight-content">
					<h5>High Demand</h5>
					<p>Sales volume increased 29.6% year-over-year, indicating strong buyer interest in the area.</p>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.market-infographics {
		background: white;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		margin-bottom: 2rem;
	}
	
	.infographics-header {
		text-align: center;
		margin-bottom: 2rem;
	}
	
	.infographics-header h3 {
		font-size: 1.8rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 0.5rem 0;
	}
	
	.infographics-header p {
		color: var(--text-color);
		margin: 0;
	}
	
	.metrics-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
		margin-bottom: 2rem;
	}
	
	.metric-card {
		background: var(--warm-cream);
		padding: 1.5rem;
		border-radius: 12px;
		text-align: center;
		transition: transform 0.3s ease;
	}
	
	.metric-card:hover {
		transform: translateY(-2px);
	}
	
	.metric-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}
	
	.metric-header h4 {
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--heading-color);
		margin: 0;
	}
	
	.metric-change {
		font-size: 0.9rem;
		font-weight: 700;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
	}
	
	.metric-change.up {
		background: var(--success-green);
		color: white;
	}
	
	.metric-change.down {
		background: #ff6b6b;
		color: white;
	}
	
	.metric-value {
		font-size: 2rem;
		font-weight: 700;
		color: var(--accent-color);
		margin-bottom: 0.5rem;
	}
	
	.metric-description {
		font-size: 0.9rem;
		color: var(--text-color);
		margin: 0;
	}
	
	.chart-section {
		margin-bottom: 2rem;
		padding: 1.5rem;
		background: var(--warm-cream);
		border-radius: 12px;
	}
	
	.chart-section h4 {
		font-size: 1.3rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 1.5rem 0;
		text-align: center;
	}
	
	.price-distribution {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	
	.distribution-bar {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	
	.bar-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.9rem;
	}
	
	.bar-label {
		font-weight: 600;
		color: var(--heading-color);
	}
	
	.bar-count {
		color: var(--text-color);
	}
	
	.bar-container {
		height: 20px;
		background: #e5e7eb;
		border-radius: 10px;
		overflow: hidden;
	}
	
	.bar-fill {
		height: 100%;
		transition: width 0.3s ease;
	}
	
	.forecast-chart {
		display: flex;
		gap: 1rem;
		align-items: end;
		margin-bottom: 1rem;
	}
	
	.chart-labels {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		font-size: 0.8rem;
		color: var(--text-light);
		width: 60px;
	}
	
	.chart-bars {
		display: flex;
		gap: 0.5rem;
		flex: 1;
		align-items: end;
		height: 200px;
	}
	
	.forecast-month {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}
	
	.month-label {
		font-size: 0.8rem;
		color: var(--text-color);
		writing-mode: vertical-rl;
		text-orientation: mixed;
	}
	
	.month-bars {
		display: flex;
		gap: 2px;
		align-items: end;
		height: 100%;
	}
	
	.forecast-bar {
		width: 20px;
		border-radius: 2px 2px 0 0;
		transition: height 0.3s ease;
	}
	
	.price-bar {
		background: var(--accent-color);
	}
	
	.inventory-bar {
		background: var(--primary-color);
	}
	
	.sales-bar {
		background: var(--success-green);
	}
	
	.chart-legend {
		display: flex;
		justify-content: center;
		gap: 2rem;
		margin-top: 1rem;
	}
	
	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.9rem;
		color: var(--text-color);
	}
	
	.legend-color {
		width: 16px;
		height: 16px;
		border-radius: 2px;
	}
	
	.price-legend {
		background: var(--accent-color);
	}
	
	.inventory-legend {
		background: var(--primary-color);
	}
	
	.sales-legend {
		background: var(--success-green);
	}
	
	.neighborhood-table {
		background: white;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}
	
	.table-header {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr 1fr;
		background: var(--accent-color);
		color: white;
		font-weight: 600;
	}
	
	.table-row {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr 1fr;
		border-bottom: 1px solid #e5e7eb;
	}
	
	.table-row:last-child {
		border-bottom: none;
	}
	
	.table-row:nth-child(even) {
		background: #f8fafc;
	}
	
	.table-cell {
		padding: 1rem;
		display: flex;
		align-items: center;
	}
	
	.neighborhood-name {
		font-weight: 600;
		color: var(--heading-color);
	}
	
	.appreciation.high {
		color: var(--success-green);
		font-weight: 700;
	}
	
	.appreciation.medium {
		color: var(--tertiary-color);
		font-weight: 600;
	}
	
	.insights-section {
		margin-top: 2rem;
	}
	
	.insights-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
	}
	
	.insight-card {
		background: white;
		padding: 1.5rem;
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		display: flex;
		gap: 1rem;
		align-items: flex-start;
	}
	
	.insight-card.positive {
		border-left: 4px solid var(--success-green);
	}
	
	.insight-card.neutral {
		border-left: 4px solid var(--tertiary-color);
	}
	
	.insight-icon {
		font-size: 2rem;
		flex-shrink: 0;
	}
	
	.insight-content h5 {
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 0.5rem 0;
	}
	
	.insight-content p {
		font-size: 0.9rem;
		color: var(--text-color);
		margin: 0;
		line-height: 1.4;
	}
	
	@media (max-width: 768px) {
		.metrics-grid {
			grid-template-columns: 1fr;
		}
		
		.forecast-chart {
			flex-direction: column;
			height: auto;
		}
		
		.chart-bars {
			height: 150px;
		}
		
		.month-label {
			writing-mode: horizontal-tb;
			text-orientation: initial;
		}
		
		.table-header,
		.table-row {
			grid-template-columns: 1fr;
			gap: 0.5rem;
		}
		
		.table-cell {
			padding: 0.5rem;
			border-bottom: 1px solid #e5e7eb;
		}
		
		.insights-grid {
			grid-template-columns: 1fr;
		}
		
		.insight-card {
			flex-direction: column;
			text-align: center;
		}
	}
</style>
