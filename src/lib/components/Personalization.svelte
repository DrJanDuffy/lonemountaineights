<script>
	import { onMount } from 'svelte';
	
	// Personalization state
	let userProfile = {
		name: '',
		email: '',
		phone: '',
		preferences: {
			budget: '',
			bedrooms: '',
			bathrooms: '',
			neighborhoods: [],
			amenities: [],
			propertyType: '',
			timeline: ''
		},
		favorites: [],
		searchHistory: [],
		lastVisit: null,
		visitCount: 0,
		interests: []
	};
	
	let isLoggedIn = false;
	let showWelcomeBack = false;
	let personalizedContent = {};
	let recommendedHomes = [];
	let savedSearches = [];
	
	// Load user data on mount
	onMount(() => {
		loadUserData();
		loadPersonalizedContent();
		loadRecommendations();
		loadSavedSearches();
	});
	
	// Initialize arrays to prevent undefined errors during SSR
	userProfile.favorites = userProfile.favorites || [];
	userProfile.searchHistory = userProfile.searchHistory || [];
	userProfile.interests = userProfile.interests || [];
	recommendedHomes = recommendedHomes || [];
	savedSearches = savedSearches || [];
	
	function loadUserData() {
		if (typeof window !== 'undefined') {
			const savedProfile = localStorage.getItem('userProfile');
			if (savedProfile) {
				userProfile = { ...userProfile, ...JSON.parse(savedProfile) };
				isLoggedIn = true;
				showWelcomeBack = true;
			}
			
			// Load favorites
			const savedFavorites = localStorage.getItem('favoriteHomes');
			if (savedFavorites) {
				userProfile.favorites = JSON.parse(savedFavorites);
			}
			
			// Load search history
			const savedHistory = localStorage.getItem('searchHistory');
			if (savedHistory) {
				userProfile.searchHistory = JSON.parse(savedHistory);
			}
			
			// Update visit count
			userProfile.visitCount = (userProfile.visitCount || 0) + 1;
			userProfile.lastVisit = new Date().toISOString();
			saveUserData();
		}
	}
	
	function loadPersonalizedContent() {
		// Generate personalized content based on user profile
		personalizedContent = {
			greeting: generateGreeting(),
			marketInsights: generateMarketInsights(),
			neighborhoodSpotlight: generateNeighborhoodSpotlight(),
			homeownerTips: generateHomeownerTips(),
			marketAlerts: generateMarketAlerts()
		};
	}
	
	function loadRecommendations() {
		// Generate home recommendations based on preferences
		recommendedHomes = generateHomeRecommendations();
	}
	
	function loadSavedSearches() {
		// Load saved searches from localStorage
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('savedSearches');
			if (saved) {
				savedSearches = JSON.parse(saved);
			}
		}
	}
	
	function generateGreeting() {
		const hour = new Date().getHours();
		const timeOfDay = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
		
		if (userProfile.name) {
			return `Good ${timeOfDay}, ${userProfile.name}!`;
		} else {
			return `Good ${timeOfDay}!`;
		}
	}
	
	function generateMarketInsights() {
		const insights = [
			{
				title: 'Lone Mountain Heights Market Update',
				content: 'Home prices have increased 5.2% this quarter, with average days on market dropping to 23 days.',
				relevance: 'high'
			},
			{
				title: 'New Listings Alert',
				content: '3 new homes matching your criteria were listed this week in your preferred neighborhoods.',
				relevance: 'high'
			},
			{
				title: 'Interest Rate Impact',
				content: 'Current rates are creating opportunities for buyers, with more negotiating power available.',
				relevance: 'medium'
			}
		];
		
		return insights.filter(insight => insight.relevance === 'high' || Math.random() > 0.5);
	}
	
	function generateNeighborhoodSpotlight() {
		const neighborhoods = [
			{
				name: 'Lone Mountain Ranch',
				description: 'Luxury gated community with golf course access',
				avgPrice: '$850,000',
				features: ['Golf Course', 'Gated Security', 'Mountain Views'],
				image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
			},
			{
				name: 'Desert Vista Estates',
				description: 'Family-friendly community with top-rated schools',
				avgPrice: '$650,000',
				features: ['Top Schools', 'Community Pool', 'Parks'],
				image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
			}
		];
		
		return neighborhoods[Math.floor(Math.random() * neighborhoods.length)];
	}
	
	function generateHomeownerTips() {
		const tips = [
			{
				title: 'Spring Home Maintenance Checklist',
				content: 'Prepare your home for the selling season with these essential maintenance tasks.',
				category: 'maintenance'
			},
			{
				title: 'Staging Tips for Quick Sale',
				content: 'Learn how to stage your home to sell faster and for more money.',
				category: 'staging'
			},
			{
				title: 'Market Timing Strategies',
				content: 'Discover the best times to list your home in Lone Mountain Heights.',
				category: 'marketing'
			}
		];
		
		return tips[Math.floor(Math.random() * tips.length)];
	}
	
	function generateMarketAlerts() {
		const alerts = [
			{
				type: 'price_reduction',
				message: '2 homes in your saved searches have reduced their prices',
				action: 'View Reduced Prices',
				url: '/homes?filter=price_reduced'
			},
			{
				type: 'new_listing',
				message: 'New listing matches your 3-bedroom, 2-bathroom criteria',
				action: 'View New Listing',
				url: '/homes?filter=new'
			},
			{
				type: 'market_opportunity',
				message: 'Interest rates dropped 0.25% - great time to buy!',
				action: 'Get Pre-Approved',
				url: '/contact'
			}
		];
		
		return alerts.filter(() => Math.random() > 0.3); // Show 70% of alerts
	}
	
	function generateHomeRecommendations() {
		// Mock home recommendations based on user preferences
		return [
			{
				id: 1,
				address: '1234 Mountain View Dr',
				price: 785000,
				bedrooms: 4,
				bathrooms: 3,
				sqft: 2500,
				neighborhood: 'Lone Mountain Ranch',
				image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
				matchScore: 95,
				features: ['Mountain Views', 'Updated Kitchen', 'Pool']
			},
			{
				id: 2,
				address: '5678 Desert Vista Way',
				price: 650000,
				bedrooms: 3,
				bathrooms: 2,
				sqft: 2200,
				neighborhood: 'Desert Vista Estates',
				image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
				matchScore: 88,
				features: ['Great Schools', 'Community Pool', 'Garage']
			}
		];
	}
	
	function saveUserData() {
		if (typeof window !== 'undefined') {
			localStorage.setItem('userProfile', JSON.stringify(userProfile));
		}
	}
	
	function updatePreferences(newPreferences) {
		userProfile.preferences = { ...userProfile.preferences, ...newPreferences };
		saveUserData();
		loadPersonalizedContent();
		loadRecommendations();
	}
	
	function addToFavorites(home) {
		if (!userProfile.favorites.find(fav => fav.id === home.id)) {
			userProfile.favorites = [...userProfile.favorites, home];
			if (typeof window !== 'undefined') {
				localStorage.setItem('favoriteHomes', JSON.stringify(userProfile.favorites));
			}
		}
	}
	
	function removeFromFavorites(homeId) {
		userProfile.favorites = userProfile.favorites.filter(fav => fav.id !== homeId);
		if (typeof window !== 'undefined') {
			localStorage.setItem('favoriteHomes', JSON.stringify(userProfile.favorites));
		}
	}
	
	function saveSearch(searchCriteria) {
		const search = {
			id: Date.now(),
			criteria: searchCriteria,
			date: new Date().toISOString(),
			results: 0 // Would be populated with actual search results
		};
		
		savedSearches = [search, ...savedSearches.slice(0, 9)]; // Keep last 10 searches
		if (typeof window !== 'undefined') {
			localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
		}
	}
	
	function trackInterest(category, item) {
		const interest = {
			category,
			item,
			timestamp: new Date().toISOString()
		};
		
		userProfile.interests = [interest, ...userProfile.interests.slice(0, 49)]; // Keep last 50 interests
		saveUserData();
	}
	
	function dismissAlert(alertIndex) {
		personalizedContent.marketAlerts.splice(alertIndex, 1);
	}
</script>

<div class="personalization">
	{#if showWelcomeBack}
		<div class="welcome-back">
			<div class="welcome-content">
				<h3>{personalizedContent.greeting}</h3>
				<p>Welcome back! Here's what's new in Lone Mountain Heights since your last visit.</p>
				<button class="dismiss-btn" on:click={() => showWelcomeBack = false}>×</button>
			</div>
		</div>
	{/if}
	
	<!-- Market Alerts -->
	{#if personalizedContent.marketAlerts && (personalizedContent.marketAlerts || []).length > 0}
		<div class="market-alerts">
			<h4>Market Alerts for You</h4>
			{#each (personalizedContent.marketAlerts || []) as alert, index}
				<div class="alert-card">
					<div class="alert-content">
						<div class="alert-icon">
							{#if alert.type === 'price_reduction'}💰
							{:else if alert.type === 'new_listing'}🏠
							{:else if alert.type === 'market_opportunity'}📈
							{:else}🔔{/if}
						</div>
						<div class="alert-message">{alert.message}</div>
					</div>
					<div class="alert-actions">
						<a href={alert.url} class="alert-btn">{alert.action}</a>
						<button class="dismiss-btn" on:click={() => dismissAlert(index)}>×</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
	
	<!-- Personalized Recommendations -->
	<div class="recommendations">
		<h4>Recommended for You</h4>
		<div class="recommendations-grid">
			{#each (recommendedHomes || []) as home}
				<div class="recommendation-card">
					<div class="home-image">
						<img src={home.image} alt={home.address} loading="lazy" />
						<div class="match-score">{home.matchScore}% Match</div>
						<button 
							class="favorite-btn"
							on:click={() => addToFavorites(home)}
						>
							❤️
						</button>
					</div>
					<div class="home-details">
						<div class="home-address">{home.address}</div>
						<div class="home-price">${home.price.toLocaleString()}</div>
						<div class="home-specs">
							{home.bedrooms} bed • {home.bathrooms} bath • {home.sqft.toLocaleString()} sqft
						</div>
						<div class="home-neighborhood">{home.neighborhood}</div>
						<div class="home-features">
							{#each (home.features || []) as feature}
								<span class="feature-tag">{feature}</span>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
	
	<!-- Market Insights -->
	<div class="market-insights">
		<h4>Your Market Insights</h4>
		<div class="insights-grid">
			{#each (personalizedContent.marketInsights || []) as insight}
				<div class="insight-card">
					<h5>{insight.title}</h5>
					<p>{insight.content}</p>
				</div>
			{/each}
		</div>
	</div>
	
	<!-- Neighborhood Spotlight -->
	<div class="neighborhood-spotlight">
		<h4>Neighborhood Spotlight</h4>
		<div class="spotlight-card">
			<div class="spotlight-image">
				<img src={personalizedContent.neighborhoodSpotlight.image} alt={personalizedContent.neighborhoodSpotlight.name} loading="lazy" />
			</div>
			<div class="spotlight-content">
				<h5>{personalizedContent.neighborhoodSpotlight.name}</h5>
				<p>{personalizedContent.neighborhoodSpotlight.description}</p>
				<div class="spotlight-price">Avg Price: {personalizedContent.neighborhoodSpotlight.avgPrice}</div>
				<div class="spotlight-features">
					{#each (personalizedContent.neighborhoodSpotlight?.features || []) as feature}
						<span class="feature-tag">{feature}</span>
					{/each}
				</div>
			</div>
		</div>
	</div>
	
	<!-- Homeowner Tips -->
	<div class="homeowner-tips">
		<h4>Homeowner Tips</h4>
		<div class="tip-card">
			<h5>{personalizedContent.homeownerTips.title}</h5>
			<p>{personalizedContent.homeownerTips.content}</p>
			<a href="/guide" class="tip-link">Read More →</a>
		</div>
	</div>
	
	<!-- Saved Searches -->
	{#if (savedSearches || []).length > 0}
		<div class="saved-searches">
			<h4>Your Saved Searches</h4>
			<div class="searches-list">
				{#each (savedSearches || []) as search}
					<div class="search-item">
						<div class="search-criteria">
							{Object.entries(search.criteria).map(([key, value]) => `${key}: ${value}`).join(', ')}
						</div>
						<div class="search-date">{new Date(search.date).toLocaleDateString()}</div>
						<button class="search-btn">View Results</button>
					</div>
				{/each}
			</div>
		</div>
	{/if}
	
	<!-- Favorites -->
	{#if (userProfile.favorites || []).length > 0}
		<div class="favorites">
			<h4>Your Favorites ({(userProfile.favorites || []).length})</h4>
			<div class="favorites-grid">
				{#each (userProfile.favorites || []) as home}
					<div class="favorite-card">
						<div class="favorite-image">
							<img src={home.image} alt={home.address} loading="lazy" />
							<button 
								class="remove-favorite"
								on:click={() => removeFromFavorites(home.id)}
							>
								×
							</button>
						</div>
						<div class="favorite-details">
							<div class="favorite-address">{home.address}</div>
							<div class="favorite-price">${home.price.toLocaleString()}</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.personalization {
		background: white;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		margin-bottom: 2rem;
	}
	
	.welcome-back {
		background: linear-gradient(135deg, var(--accent-color), var(--accent-light));
		color: white;
		padding: 1.5rem;
		border-radius: 12px;
		margin-bottom: 2rem;
		position: relative;
	}
	
	.welcome-content h3 {
		font-size: 1.5rem;
		font-weight: 700;
		margin: 0 0 0.5rem 0;
	}
	
	.welcome-content p {
		margin: 0;
		opacity: 0.9;
	}
	
	.dismiss-btn {
		position: absolute;
		top: 1rem;
		right: 1rem;
		background: none;
		border: none;
		color: white;
		font-size: 1.5rem;
		cursor: pointer;
		opacity: 0.7;
		transition: opacity 0.3s ease;
	}
	
	.dismiss-btn:hover {
		opacity: 1;
	}
	
	.market-alerts,
	.recommendations,
	.market-insights,
	.neighborhood-spotlight,
	.homeowner-tips,
	.saved-searches,
	.favorites {
		margin-bottom: 2rem;
	}
	
	.market-alerts h4,
	.recommendations h4,
	.market-insights h4,
	.neighborhood-spotlight h4,
	.homeowner-tips h4,
	.saved-searches h4,
	.favorites h4 {
		font-size: 1.3rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 1.5rem 0;
	}
	
	.alert-card {
		background: var(--warm-cream);
		padding: 1rem;
		border-radius: 8px;
		margin-bottom: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-left: 4px solid var(--accent-color);
	}
	
	.alert-content {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex: 1;
	}
	
	.alert-icon {
		font-size: 1.5rem;
	}
	
	.alert-message {
		font-weight: 600;
		color: var(--heading-color);
	}
	
	.alert-actions {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	
	.alert-btn {
		background: var(--accent-color);
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 6px;
		text-decoration: none;
		font-weight: 600;
		font-size: 0.9rem;
		transition: all 0.3s ease;
	}
	
	.alert-btn:hover {
		background: var(--accent-light);
		transform: translateY(-1px);
	}
	
	.recommendations-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
	}
	
	.recommendation-card {
		background: white;
		border: 2px solid #e5e7eb;
		border-radius: 12px;
		overflow: hidden;
		transition: all 0.3s ease;
	}
	
	.recommendation-card:hover {
		border-color: var(--accent-color);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
	}
	
	.home-image {
		position: relative;
		width: 100%;
		height: 200px;
		overflow: hidden;
	}
	
	.home-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	
	.match-score {
		position: absolute;
		top: 1rem;
		left: 1rem;
		background: var(--success-green);
		color: white;
		padding: 0.25rem 0.75rem;
		border-radius: 20px;
		font-size: 0.8rem;
		font-weight: 700;
	}
	
	.favorite-btn {
		position: absolute;
		top: 1rem;
		right: 1rem;
		background: white;
		border: none;
		border-radius: 50%;
		width: 40px;
		height: 40px;
		cursor: pointer;
		font-size: 1.2rem;
		transition: all 0.3s ease;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}
	
	.favorite-btn:hover {
		transform: scale(1.1);
	}
	
	.home-details {
		padding: 1.5rem;
	}
	
	.home-address {
		font-weight: 700;
		color: var(--heading-color);
		margin-bottom: 0.5rem;
	}
	
	.home-price {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--accent-color);
		margin-bottom: 0.5rem;
	}
	
	.home-specs {
		color: var(--text-color);
		margin-bottom: 0.5rem;
		font-size: 0.9rem;
	}
	
	.home-neighborhood {
		color: var(--text-light);
		font-size: 0.9rem;
		margin-bottom: 1rem;
	}
	
	.home-features {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	
	.feature-tag {
		background: var(--warm-cream);
		color: var(--heading-color);
		padding: 0.25rem 0.75rem;
		border-radius: 20px;
		font-size: 0.8rem;
		font-weight: 600;
	}
	
	.insights-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
	}
	
	.insight-card {
		background: var(--warm-cream);
		padding: 1.5rem;
		border-radius: 8px;
		border-left: 4px solid var(--accent-color);
	}
	
	.insight-card h5 {
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 0.5rem 0;
	}
	
	.insight-card p {
		color: var(--text-color);
		margin: 0;
		line-height: 1.5;
	}
	
	.spotlight-card {
		background: white;
		border: 2px solid #e5e7eb;
		border-radius: 12px;
		overflow: hidden;
		display: flex;
	}
	
	.spotlight-image {
		width: 200px;
		height: 150px;
		overflow: hidden;
		flex-shrink: 0;
	}
	
	.spotlight-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	
	.spotlight-content {
		padding: 1.5rem;
		flex: 1;
	}
	
	.spotlight-content h5 {
		font-size: 1.3rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 0.5rem 0;
	}
	
	.spotlight-content p {
		color: var(--text-color);
		margin: 0 0 1rem 0;
		line-height: 1.5;
	}
	
	.spotlight-price {
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--accent-color);
		margin-bottom: 1rem;
	}
	
	.spotlight-features {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	
	.tip-card {
		background: var(--warm-cream);
		padding: 1.5rem;
		border-radius: 8px;
		border-left: 4px solid var(--success-green);
	}
	
	.tip-card h5 {
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 0.5rem 0;
	}
	
	.tip-card p {
		color: var(--text-color);
		margin: 0 0 1rem 0;
		line-height: 1.5;
	}
	
	.tip-link {
		color: var(--accent-color);
		text-decoration: none;
		font-weight: 600;
		transition: color 0.3s ease;
	}
	
	.tip-link:hover {
		color: var(--accent-light);
	}
	
	.searches-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	
	.search-item {
		background: var(--warm-cream);
		padding: 1rem;
		border-radius: 8px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.search-criteria {
		font-weight: 600;
		color: var(--heading-color);
		flex: 1;
	}
	
	.search-date {
		color: var(--text-light);
		font-size: 0.9rem;
		margin: 0 1rem;
	}
	
	.search-btn {
		background: var(--accent-color);
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 6px;
		cursor: pointer;
		font-weight: 600;
		transition: all 0.3s ease;
	}
	
	.search-btn:hover {
		background: var(--accent-light);
		transform: translateY(-1px);
	}
	
	.favorites-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
	}
	
	.favorite-card {
		background: white;
		border: 2px solid #e5e7eb;
		border-radius: 8px;
		overflow: hidden;
		transition: all 0.3s ease;
	}
	
	.favorite-card:hover {
		border-color: var(--accent-color);
		transform: translateY(-2px);
	}
	
	.favorite-image {
		position: relative;
		width: 100%;
		height: 120px;
		overflow: hidden;
	}
	
	.favorite-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	
	.remove-favorite {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		background: rgba(0, 0, 0, 0.7);
		color: white;
		border: none;
		border-radius: 50%;
		width: 30px;
		height: 30px;
		cursor: pointer;
		font-size: 1.2rem;
		transition: all 0.3s ease;
	}
	
	.remove-favorite:hover {
		background: rgba(255, 0, 0, 0.8);
		transform: scale(1.1);
	}
	
	.favorite-details {
		padding: 1rem;
	}
	
	.favorite-address {
		font-weight: 600;
		color: var(--heading-color);
		margin-bottom: 0.25rem;
		font-size: 0.9rem;
	}
	
	.favorite-price {
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--accent-color);
	}
	
	@media (max-width: 768px) {
		.recommendations-grid,
		.insights-grid,
		.favorites-grid {
			grid-template-columns: 1fr;
		}
		
		.spotlight-card {
			flex-direction: column;
		}
		
		.spotlight-image {
			width: 100%;
			height: 200px;
		}
		
		.search-item {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}
		
		.search-date {
			margin: 0;
		}
	}
</style>
