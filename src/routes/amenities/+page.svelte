<script>
	import { generateBreadcrumbSchema } from '$lib/schema.js';
	
	// Local amenities and attractions data
	const amenities = {
		parks: [
			{
				name: 'Lone Mountain Park',
				type: 'Public Park',
				distance: '0.5 miles',
				address: '4445 N Jensen St, Las Vegas, NV 89129',
				phone: '(702) 229-6300',
				description: 'Large public park with paved walkways, picnic areas, playgrounds, basketball courts, and restrooms. Hosts community events including the "Trail of Terror" Halloween race.',
				features: ['Paved Walkways', 'Picnic Areas', 'Playgrounds', 'Basketball Courts', 'Restrooms', 'Community Events'],
				hours: '6:00 AM - 10:00 PM',
				rating: 4.5,
				image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
			},
			{
				name: 'Barkin\' Basin Dog Park',
				type: 'Dog Park',
				distance: '0.8 miles',
				address: '4445 N Jensen St, Las Vegas, NV 89129',
				phone: '(702) 229-6300',
				description: 'Popular dog park located inside Lone Mountain Regional Park with separate gated areas for large and small dogs.',
				features: ['Separate Large/Small Dog Areas', 'Gated Entrances', 'Water Stations', 'Shade Areas', 'Waste Stations'],
				hours: '6:00 AM - 10:00 PM',
				rating: 4.3,
				image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
			}
		],
		recreation: [
			{
				name: 'Lone Mountain Trailhead',
				type: 'Hiking Trails',
				distance: '0.3 miles',
				address: 'Lone Mountain Rd, Las Vegas, NV 89129',
				phone: '(702) 229-6300',
				description: 'Access to 2.4-mile loop trail and other paths offering impressive views of the valley. Features rocky, steep sections for a good workout.',
				features: ['2.4-Mile Loop Trail', 'Valley Views', 'Rocky Terrain', 'Steep Sections', 'Workout Challenge'],
				hours: 'Dawn to Dusk',
				rating: 4.6,
				image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
			},
			{
				name: 'Mountain Crest Community Center',
				type: 'Community Center',
				distance: '1.2 miles',
				address: '4701 N Durango Dr, Las Vegas, NV 89129',
				phone: '(702) 229-6300',
				description: 'Community center offering disc golf, card games, playground, and various recreational activities.',
				features: ['Disc Golf', 'Card Games', 'Playground', 'Meeting Rooms', 'Recreational Activities'],
				hours: '8:00 AM - 9:00 PM',
				rating: 4.2,
				image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
			},
			{
				name: 'Durango Hills Golf Course',
				type: 'Golf Course',
				distance: '2.5 miles',
				address: '3521 N Durango Dr, Las Vegas, NV 89129',
				phone: '(702) 656-7600',
				description: '18-hole public golf course offering challenging play with beautiful mountain views.',
				features: ['18-Hole Course', 'Public Access', 'Mountain Views', 'Pro Shop', 'Restaurant'],
				hours: '6:00 AM - 7:00 PM',
				rating: 4.4,
				image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
			}
		],
		shopping: [
			{
				name: 'Centennial Hills Shopping Center',
				type: 'Shopping Center',
				distance: '3.0 miles',
				address: '6600 N Durango Dr, Las Vegas, NV 89149',
				phone: '(702) 656-7600',
				description: 'Major shopping center with national chains, local stores, restaurants, and entertainment options.',
				features: ['National Retailers', 'Local Stores', 'Restaurants', 'Entertainment', 'Parking'],
				hours: '10:00 AM - 9:00 PM',
				rating: 4.3,
				image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
			},
			{
				name: 'Summerlin Shopping District',
				type: 'Shopping District',
				distance: '4.5 miles',
				address: '1980 Festival Plaza Dr, Las Vegas, NV 89135',
				phone: '(702) 656-7600',
				description: 'Upscale shopping district with high-end retailers, fine dining, and entertainment venues.',
				features: ['Upscale Retailers', 'Fine Dining', 'Entertainment', 'Outdoor Spaces', 'Events'],
				hours: '10:00 AM - 10:00 PM',
				rating: 4.5,
				image: 'https://images.unsplash.com/photo-1555529902-5a0b4e0b2f8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
			}
		],
		dining: [
			{
				name: 'Local Restaurants',
				type: 'Dining Options',
				distance: '1-3 miles',
				address: 'Various locations',
				phone: 'Various',
				description: 'Mix of national chains and local establishments offering diverse cuisines and dining experiences.',
				features: ['National Chains', 'Local Establishments', 'Diverse Cuisines', 'Family Friendly', 'Casual Dining'],
				hours: 'Varies by location',
				rating: 4.2,
				image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
			}
		]
	};
	
	// Community characteristics
	const communityFeatures = {
		title: 'Lone Mountain Heights Community Features',
		description: 'Lone Mountain Heights offers a quiet, residential environment with custom homes and oversized lots that provide a peaceful setting on the edge of the city.',
		features: [
			'Quiet residential environment',
			'Custom homes and single-family houses',
			'Oversized lots for privacy',
			'Peaceful setting on city edge',
			'Low traffic and noise levels',
			'Established neighborhood feel',
			'Close-knit community',
			'Natural mountain views'
		]
	};
	
	// Generate breadcrumb schema
	const breadcrumbSchema = generateBreadcrumbSchema([
		{ name: 'Home', url: 'https://lonemountainheights.com' },
		{ name: 'Amenities', url: 'https://lonemountainheights.com/amenities' }
	]);
	
	function getStars(rating) {
		return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
	}
</script>

<svelte:head>
	<title>Lone Mountain Heights Amenities | Local Attractions & Recreation | Dr. Jan Duffy</title>
	<meta name="description" content="Discover the local amenities and attractions near Lone Mountain Heights, Las Vegas. Parks, hiking trails, golf courses, shopping, and dining options from Dr. Jan Duffy." />
	
	<!-- Breadcrumb Schema -->
	<script type="application/ld+json">
		{JSON.stringify(breadcrumbSchema)}
	</script>
</svelte:head>

<main class="amenities-page">
	<div class="page-header">
		<div class="container">
			<h1>Lone Mountain Heights Amenities</h1>
			<p>Discover the local attractions and recreational opportunities in our community</p>
		</div>
	</div>
	
	<div class="page-content">
		<div class="container">
			<!-- Community Features -->
			<section class="community-features">
				<h2>Community Characteristics</h2>
				<p>{communityFeatures.description}</p>
				<div class="features-grid">
					{#each communityFeatures.features as feature}
						<div class="feature-item">
							<span class="feature-icon">✓</span>
							<span class="feature-text">{feature}</span>
						</div>
					{/each}
				</div>
			</section>
			
			<!-- Parks & Recreation -->
			<section class="amenities-section">
				<h2>Parks & Recreation</h2>
				<div class="amenities-grid">
					{#each amenities.parks as amenity}
						<div class="amenity-card">
							<div class="amenity-image">
								<img src={amenity.image} alt={amenity.name} />
								<div class="amenity-type">{amenity.type}</div>
							</div>
							<div class="amenity-content">
								<h3>{amenity.name}</h3>
								<div class="amenity-rating">
									<span class="stars">{getStars(amenity.rating)}</span>
									<span class="rating-number">{amenity.rating}/5</span>
								</div>
								<div class="amenity-details">
									<div class="detail-row">
										<span class="detail-label">Distance:</span>
										<span class="detail-value">{amenity.distance}</span>
									</div>
									<div class="detail-row">
										<span class="detail-label">Hours:</span>
										<span class="detail-value">{amenity.hours}</span>
									</div>
									<div class="detail-row">
										<span class="detail-label">Phone:</span>
										<span class="detail-value"><a href="tel:{amenity.phone}">{amenity.phone}</a></span>
									</div>
								</div>
								<p class="amenity-description">{amenity.description}</p>
								<div class="amenity-features">
									<h4>Features:</h4>
									<ul>
										{#each amenity.features as feature}
											<li>{feature}</li>
										{/each}
									</ul>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</section>
			
			<!-- Recreation & Activities -->
			<section class="amenities-section">
				<h2>Recreation & Activities</h2>
				<div class="amenities-grid">
					{#each amenities.recreation as amenity}
						<div class="amenity-card">
							<div class="amenity-image">
								<img src={amenity.image} alt={amenity.name} />
								<div class="amenity-type">{amenity.type}</div>
							</div>
							<div class="amenity-content">
								<h3>{amenity.name}</h3>
								<div class="amenity-rating">
									<span class="stars">{getStars(amenity.rating)}</span>
									<span class="rating-number">{amenity.rating}/5</span>
								</div>
								<div class="amenity-details">
									<div class="detail-row">
										<span class="detail-label">Distance:</span>
										<span class="detail-value">{amenity.distance}</span>
									</div>
									<div class="detail-row">
										<span class="detail-label">Hours:</span>
										<span class="detail-value">{amenity.hours}</span>
									</div>
									<div class="detail-row">
										<span class="detail-label">Phone:</span>
										<span class="detail-value"><a href="tel:{amenity.phone}">{amenity.phone}</a></span>
									</div>
								</div>
								<p class="amenity-description">{amenity.description}</p>
								<div class="amenity-features">
									<h4>Features:</h4>
									<ul>
										{#each amenity.features as feature}
											<li>{feature}</li>
										{/each}
									</ul>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</section>
			
			<!-- Shopping & Dining -->
			<section class="amenities-section">
				<h2>Shopping & Dining</h2>
				<div class="amenities-grid">
					{#each amenities.shopping as amenity}
						<div class="amenity-card">
							<div class="amenity-image">
								<img src={amenity.image} alt={amenity.name} />
								<div class="amenity-type">{amenity.type}</div>
							</div>
							<div class="amenity-content">
								<h3>{amenity.name}</h3>
								<div class="amenity-rating">
									<span class="stars">{getStars(amenity.rating)}</span>
									<span class="rating-number">{amenity.rating}/5</span>
								</div>
								<div class="amenity-details">
									<div class="detail-row">
										<span class="detail-label">Distance:</span>
										<span class="detail-value">{amenity.distance}</span>
									</div>
									<div class="detail-row">
										<span class="detail-label">Hours:</span>
										<span class="detail-value">{amenity.hours}</span>
									</div>
									<div class="detail-row">
										<span class="detail-label">Phone:</span>
										<span class="detail-value"><a href="tel:{amenity.phone}">{amenity.phone}</a></span>
									</div>
								</div>
								<p class="amenity-description">{amenity.description}</p>
								<div class="amenity-features">
									<h4>Features:</h4>
									<ul>
										{#each amenity.features as feature}
											<li>{feature}</li>
										{/each}
									</ul>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</section>
			
			<!-- Dining Options -->
			<section class="amenities-section">
				<h2>Dining Options</h2>
				<div class="amenities-grid">
					{#each amenities.dining as amenity}
						<div class="amenity-card">
							<div class="amenity-image">
								<img src={amenity.image} alt={amenity.name} />
								<div class="amenity-type">{amenity.type}</div>
							</div>
							<div class="amenity-content">
								<h3>{amenity.name}</h3>
								<div class="amenity-rating">
									<span class="stars">{getStars(amenity.rating)}</span>
									<span class="rating-number">{amenity.rating}/5</span>
								</div>
								<div class="amenity-details">
									<div class="detail-row">
										<span class="detail-label">Distance:</span>
										<span class="detail-value">{amenity.distance}</span>
									</div>
									<div class="detail-row">
										<span class="detail-label">Hours:</span>
										<span class="detail-value">{amenity.hours}</span>
									</div>
								</div>
								<p class="amenity-description">{amenity.description}</p>
								<div class="amenity-features">
									<h4>Features:</h4>
									<ul>
										{#each amenity.features as feature}
											<li>{feature}</li>
										{/each}
									</ul>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</section>
			
			<!-- CTA Section -->
			<section class="cta-section">
				<h2>Ready to Explore Lone Mountain Heights?</h2>
				<p>Dr. Jan Duffy can help you find the perfect home near your favorite amenities.</p>
				<div class="cta-buttons">
					<a href="tel:702-222-1964" class="btn btn-primary">Call 702-222-1964</a>
					<a href="/homes" class="btn btn-secondary">View Available Homes</a>
					<a href="/contact" class="btn btn-secondary">Contact Dr. Jan</a>
				</div>
			</section>
		</div>
	</div>
</main>

<style>
	.amenities-page {
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
	
	.community-features,
	.amenities-section {
		background: white;
		margin-bottom: 2rem;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	}
	
	.community-features h2,
	.amenities-section h2 {
		font-size: 2rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 1rem 0;
	}
	
	.community-features p {
		color: var(--text-color);
		margin: 0 0 2rem 0;
		line-height: 1.6;
		font-size: 1.1rem;
	}
	
	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1rem;
	}
	
	.feature-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		background: var(--warm-cream);
		border-radius: 8px;
	}
	
	.feature-icon {
		font-size: 1.2rem;
		color: var(--success-green);
		flex-shrink: 0;
	}
	
	.feature-text {
		color: var(--text-color);
		font-weight: 500;
	}
	
	.amenities-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 1.5rem;
	}
	
	.amenity-card {
		background: var(--warm-cream);
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease;
	}
	
	.amenity-card:hover {
		transform: translateY(-4px);
	}
	
	.amenity-image {
		position: relative;
		height: 200px;
		overflow: hidden;
	}
	
	.amenity-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	
	.amenity-type {
		position: absolute;
		top: 1rem;
		right: 1rem;
		background: var(--accent-color);
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 20px;
		font-size: 0.8rem;
		font-weight: 600;
	}
	
	.amenity-content {
		padding: 1.5rem;
	}
	
	.amenity-content h3 {
		font-size: 1.3rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 0.5rem 0;
	}
	
	.amenity-rating {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}
	
	.stars {
		color: var(--warning-orange);
		font-size: 1.1rem;
	}
	
	.rating-number {
		font-size: 0.9rem;
		font-weight: 700;
		color: var(--accent-color);
	}
	
	.amenity-details {
		margin-bottom: 1rem;
	}
	
	.detail-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 0;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}
	
	.detail-row:last-child {
		border-bottom: none;
	}
	
	.detail-label {
		font-weight: 600;
		color: var(--heading-color);
		font-size: 0.9rem;
	}
	
	.detail-value {
		color: var(--text-color);
		font-size: 0.9rem;
		text-align: right;
	}
	
	.detail-value a {
		color: var(--accent-color);
		text-decoration: none;
		font-weight: 600;
	}
	
	.detail-value a:hover {
		text-decoration: underline;
	}
	
	.amenity-description {
		color: var(--text-color);
		line-height: 1.5;
		margin: 0 0 1rem 0;
	}
	
	.amenity-features h4 {
		font-size: 1rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 0.5rem 0;
	}
	
	.amenity-features ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	
	.amenity-features li {
		padding: 0.25rem 0;
		color: var(--text-color);
		position: relative;
		padding-left: 1.5rem;
		font-size: 0.9rem;
	}
	
	.amenity-features li::before {
		content: '✓';
		position: absolute;
		left: 0;
		color: var(--success-green);
		font-weight: 700;
	}
	
	.cta-section {
		text-align: center;
		background: var(--tertiary-color);
		padding: 3rem 2rem;
		border-radius: 12px;
	}
	
	.cta-section h2 {
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
		text-align: center;
		min-width: 150px;
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
		.page-header h1 {
			font-size: 2rem;
		}
		
		.amenities-grid {
			grid-template-columns: 1fr;
		}
		
		.features-grid {
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
