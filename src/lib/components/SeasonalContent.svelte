<script>
	// Get current season
	const currentDate = new Date();
	const month = currentDate.getMonth() + 1; // 1-12
	
	let currentSeason = 'winter';
	let seasonalContent = {};
	
	// Determine current season
	if (month >= 3 && month <= 5) {
		currentSeason = 'spring';
	} else if (month >= 6 && month <= 8) {
		currentSeason = 'summer';
	} else if (month >= 9 && month <= 11) {
		currentSeason = 'fall';
	} else {
		currentSeason = 'winter';
	}
	
	// Seasonal content data
	const seasonalData = {
		spring: {
			title: 'Spring Selling Season Tips',
			subtitle: 'Maximize your home\'s appeal during the busiest time of year',
			icon: '🌸',
			color: 'var(--success-green)',
			tips: [
				'Enhance curb appeal with fresh landscaping and colorful flowers',
				'Deep clean windows to let in maximum natural light',
				'Declutter and organize closets and storage spaces',
				'Consider fresh paint in neutral, spring-friendly colors',
				'Stage outdoor living spaces to showcase summer potential',
				'Schedule professional photography during peak lighting hours'
			],
			marketInsights: [
				'Spring typically sees 20% more buyer activity',
				'Average days on market decreases by 15%',
				'Competition increases - pricing strategy is crucial',
				'Open houses are most effective during spring months'
			],
			cta: 'Get your spring selling strategy started today!'
		},
		summer: {
			title: 'Summer Home Maintenance Guide',
			subtitle: 'Keep your Lone Mountain Heights home in perfect condition',
			icon: '☀️',
			color: 'var(--accent-color)',
			tips: [
				'Service your air conditioning system before peak summer heat',
				'Check and clean pool equipment and water chemistry',
				'Inspect and clean gutters and downspouts',
				'Test and maintain irrigation systems for desert landscaping',
				'Clean and maintain outdoor furniture and grills',
				'Check weatherstripping and seal windows and doors'
			],
			marketInsights: [
				'Summer brings steady buyer activity despite heat',
				'Pool homes show increased demand during summer months',
				'Energy-efficient features become more important to buyers',
				'Indoor staging focuses on cool, comfortable spaces'
			],
			cta: 'Schedule your summer home maintenance consultation!'
		},
		fall: {
			title: 'Fall Market Preparation',
			subtitle: 'Get ready for the second-busiest selling season',
			icon: '🍂',
			color: 'var(--tertiary-color)',
			tips: [
				'Clean up fallen leaves and maintain landscaping',
				'Prepare for cooler weather with cozy staging elements',
				'Highlight energy-efficient features and insulation',
				'Showcase indoor living spaces as outdoor activities decrease',
				'Consider warm, inviting color schemes in staging',
				'Prepare for holiday season with neutral decorations'
			],
			marketInsights: [
				'Fall sees renewed buyer activity after summer slowdown',
				'Families often prefer to move before school year starts',
				'Luxury market shows increased activity in fall',
				'Competition decreases compared to spring market'
			],
			cta: 'Prepare your home for the fall market now!'
		},
		winter: {
			title: 'Winter Home Staging Strategies',
			subtitle: 'Make your home shine during the holiday season',
			icon: '❄️',
			color: 'var(--primary-color)',
			tips: [
				'Create warm, inviting atmosphere with soft lighting',
				'Use neutral holiday decorations that appeal to all buyers',
				'Highlight energy-efficient heating and insulation',
				'Showcase indoor entertainment and living spaces',
				'Keep walkways clear of ice and snow (if applicable)',
				'Use cozy staging elements like throws and pillows'
			],
			marketInsights: [
				'Winter typically has fewer active buyers but serious ones',
				'Less competition means better negotiating power',
				'Holiday season can slow down but doesn\'t stop sales',
				'Buyers in winter are often more motivated and ready to act'
			],
			cta: 'Get expert winter staging advice from Dr. Jan Duffy!'
		}
	};
	
	// Get current seasonal content
	$: seasonalContent = seasonalData[currentSeason];
</script>

<div class="seasonal-content-component">
	<div class="seasonal-header" style="--season-color: {seasonalContent.color}">
		<div class="seasonal-icon">{seasonalContent.icon}</div>
		<div class="seasonal-title">
			<h3>{seasonalContent.title}</h3>
			<p>{seasonalContent.subtitle}</p>
		</div>
	</div>
	
	<div class="seasonal-content">
		<div class="tips-section">
			<h4>Expert Tips for {currentSeason.charAt(0).toUpperCase() + currentSeason.slice(1)}</h4>
			<ul class="tips-list">
				{#each seasonalContent.tips as tip}
					<li>{tip}</li>
				{/each}
			</ul>
		</div>
		
		<div class="market-insights">
			<h4>Market Insights</h4>
			<ul class="insights-list">
				{#each seasonalContent.marketInsights as insight}
					<li>{insight}</li>
				{/each}
			</ul>
		</div>
		
		<div class="seasonal-cta">
			<p>{seasonalContent.cta}</p>
			<div class="cta-buttons">
				<a href="tel:702-222-1964" class="btn btn-primary">Call 702-222-1964</a>
				<a href="/contact" class="btn btn-secondary">Get Free Consultation</a>
			</div>
		</div>
	</div>
</div>

<style>
	.seasonal-content-component {
		background: white;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		margin-bottom: 2rem;
		border-top: 4px solid var(--season-color);
	}
	
	.seasonal-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 2rem;
		padding-bottom: 1rem;
		border-bottom: 2px solid var(--season-color);
	}
	
	.seasonal-icon {
		font-size: 3rem;
		width: 60px;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--season-color);
		color: white;
		border-radius: 50%;
		flex-shrink: 0;
	}
	
	.seasonal-title h3 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 0.5rem 0;
	}
	
	.seasonal-title p {
		font-size: 1rem;
		color: var(--text-color);
		margin: 0;
	}
	
	.seasonal-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
	}
	
	.tips-section,
	.market-insights {
		background: var(--warm-cream);
		padding: 1.5rem;
		border-radius: 8px;
	}
	
	.tips-section h4,
	.market-insights h4 {
		font-size: 1.2rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 1rem 0;
	}
	
	.tips-list,
	.insights-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	
	.tips-list li,
	.insights-list li {
		padding: 0.75rem 0;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		position: relative;
		padding-left: 1.5rem;
	}
	
	.tips-list li::before {
		content: '💡';
		position: absolute;
		left: 0;
	}
	
	.insights-list li::before {
		content: '📊';
		position: absolute;
		left: 0;
	}
	
	.tips-list li:last-child,
	.insights-list li:last-child {
		border-bottom: none;
	}
	
	.seasonal-cta {
		grid-column: 1 / -1;
		background: var(--tertiary-color);
		padding: 2rem;
		border-radius: 8px;
		text-align: center;
		margin-top: 1rem;
	}
	
	.seasonal-cta p {
		font-size: 1.1rem;
		color: var(--text-light);
		margin: 0 0 1.5rem 0;
		font-weight: 600;
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
		.seasonal-header {
			flex-direction: column;
			text-align: center;
		}
		
		.seasonal-content {
			grid-template-columns: 1fr;
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
