<script>
	import Hero from '$lib/Hero.svelte';
	import TrustSignals from '$lib/components/TrustSignals.svelte';
	import OptimizedCTA from '$lib/components/OptimizedCTA.svelte';
</script>

<svelte:head>
	<title>Lone Mountain Heights Homes for Sale | Dr. Jan Duffy Expert | Las Vegas 89129</title>
	<meta name="description" content="Find your dream home in Lone Mountain Heights, Las Vegas 89129. Dr. Jan Duffy, your complete real estate partner, offers exclusive listings, market insights, and personalized service." />
	
	<!-- LocalBusiness Schema -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "RealEstateAgent",
			"name": "Dr. Jan Duffy - Lone Mountain Heights Real Estate Expert",
			"description": "Expert real estate agent specializing in Lone Mountain Heights, Las Vegas 89129. 500+ transactions, Berkshire Hathaway HomeServices team leader.",
			"url": "https://www.lonemountainheights.com",
			"telephone": "702-222-1964",
			"email": "jan@lonemountainheights.com",
			"address": {
				"@type": "PostalAddress",
				"streetAddress": "Lone Mountain Heights",
				"addressLocality": "Las Vegas",
				"addressRegion": "NV",
				"postalCode": "89129",
				"addressCountry": "US"
			},
			"geo": {
				"@type": "GeoCoordinates",
				"latitude": "36.1699",
				"longitude": "-115.2798"
			},
			"areaServed": {
				"@type": "City",
				"name": "Las Vegas",
				"containedInPlace": {
					"@type": "State",
					"name": "Nevada"
				}
			},
			"serviceType": "Real Estate Services",
			"hasOfferCatalog": {
				"@type": "OfferCatalog",
				"name": "Real Estate Services",
				"itemListElement": [
					{
						"@type": "Offer",
						"itemOffered": {
							"@type": "Service",
							"name": "Home Buying Services",
							"description": "Expert assistance with purchasing homes in Lone Mountain Heights"
						}
					},
					{
						"@type": "Offer",
						"itemOffered": {
							"@type": "Service",
							"name": "Home Selling Services",
							"description": "Professional home selling and marketing services"
						}
					},
					{
						"@type": "Offer",
						"itemOffered": {
							"@type": "Service",
							"name": "Home Valuation",
							"description": "Accurate home valuation and market analysis"
						}
					}
				]
			},
			"memberOf": {
				"@type": "Organization",
				"name": "Berkshire Hathaway HomeServices",
				"url": "https://www.berkshirehathawayhomeservices.com"
			},
			"knowsAbout": [
				"Lone Mountain Heights Real Estate",
				"Las Vegas 89129 Properties",
				"Luxury Home Sales",
				"Market Analysis",
				"Home Valuation",
				"Real Estate Investment"
			],
			"aggregateRating": {
				"@type": "AggregateRating",
				"ratingValue": "5.0",
				"reviewCount": "47",
				"bestRating": "5",
				"worstRating": "1"
			},
			"openingHours": "Mo-Su 00:00-23:59",
			"priceRange": "$$$"
		}
	</script>

	<!-- Place Schema for Lone Mountain Heights -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Place",
			"name": "Lone Mountain Heights",
			"description": "Premier residential community in Las Vegas, Nevada featuring luxury homes, excellent schools, and mountain views.",
			"address": {
				"@type": "PostalAddress",
				"addressLocality": "Las Vegas",
				"addressRegion": "NV",
				"postalCode": "89129",
				"addressCountry": "US"
			},
			"geo": {
				"@type": "GeoCoordinates",
				"latitude": "36.1699",
				"longitude": "-115.2798"
			},
			"containedInPlace": {
				"@type": "City",
				"name": "Las Vegas"
			},
			"hasMap": "https://maps.google.com/?q=Lone+Mountain+Heights,+Las+Vegas,+NV+89129",
			"amenityFeature": [
				{
					"@type": "LocationFeatureSpecification",
					"name": "Golf Course",
					"value": "Canyon Gate Country Club"
				},
				{
					"@type": "LocationFeatureSpecification",
					"name": "Schools",
					"value": "William G. Geer Elementary, Sig Rogich Middle, Liberty High School"
				},
				{
					"@type": "LocationFeatureSpecification",
					"name": "Shopping",
					"value": "Summerlin Shopping Centers"
				}
			]
		}
	</script>

	<!-- Review Schema -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Review",
			"itemReviewed": {
				"@type": "RealEstateAgent",
				"name": "Dr. Jan Duffy"
			},
			"reviewRating": {
				"@type": "Rating",
				"ratingValue": "5",
				"bestRating": "5"
			},
			"author": {
				"@type": "Person",
				"name": "Sarah M."
			},
			"reviewBody": "Dr. Jan Duffy made our home buying experience in Lone Mountain Heights absolutely seamless. Her knowledge of the area and attention to detail helped us find the perfect home. Highly recommend!",
			"datePublished": "2024-11-15"
		}
	</script>

	<!-- FAQ Schema -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "FAQPage",
			"mainEntity": [
				{
					"@type": "Question",
					"name": "What makes Lone Mountain Heights a great place to live?",
					"acceptedAnswer": {
						"@type": "Answer",
						"text": "Lone Mountain Heights offers luxury homes, excellent schools, mountain views, golf course access, and proximity to Summerlin amenities. It's one of Las Vegas's most desirable residential communities."
					}
				},
				{
					"@type": "Question",
					"name": "How much do homes cost in Lone Mountain Heights?",
					"acceptedAnswer": {
						"@type": "Answer",
						"text": "Home prices in Lone Mountain Heights typically range from $600,000 to over $2 million, depending on size, location, and amenities. Contact Dr. Jan Duffy for current market analysis."
					}
				},
				{
					"@type": "Question",
					"name": "What schools serve Lone Mountain Heights?",
					"acceptedAnswer": {
						"@type": "Answer",
						"text": "Lone Mountain Heights is served by William G. Geer Elementary, Sig Rogich Middle School, and Liberty High School - all highly-rated schools in the Clark County School District."
					}
				},
				{
					"@type": "Question",
					"name": "Why should I work with Dr. Jan Duffy?",
					"acceptedAnswer": {
						"@type": "Answer",
						"text": "Dr. Jan Duffy has completed 500+ transactions in Lone Mountain Heights, is the head of the Berkshire Hathaway HomeServices team, and provides personalized service with deep local market knowledge."
					}
				}
			]
		}
	</script>

	<!-- Breadcrumb Schema -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			"itemListElement": [
				{
					"@type": "ListItem",
					"position": 1,
					"name": "Home",
					"item": "https://www.lonemountainheights.com"
				}
			]
		}
	</script>
</svelte:head>

<main>
	<Hero />
	<div class="main-content-container">
		<TrustSignals />
		
		<!-- Quick Access Section -->
		<section class="quick-access">
			<div class="container">
				<h2>Everything You Need to Know</h2>
				<div class="quick-links">
					<a href="/tools" class="quick-link">
						<div class="quick-link-icon">🧮</div>
						<h3>Real Estate Tools</h3>
						<p>Home value calculator, mortgage calculator, and home finder quiz</p>
					</a>
					<a href="/market-intelligence" class="quick-link">
						<div class="quick-link-icon">📊</div>
						<h3>Market Intelligence</h3>
						<p>Current statistics, trends, and seasonal market insights</p>
					</a>
					<a href="/neighborhood" class="quick-link">
						<div class="quick-link-icon">🗺️</div>
						<h3>Neighborhood Guide</h3>
						<p>Interactive map, amenities, schools, and lifestyle features</p>
					</a>
				</div>
			</div>
		</section>

		<OptimizedCTA variant="primary" size="large" showPhone={true} showEmail={true} showText={true} showForm={true} />
	</div>
</main>

<style>
	main {
		width: 100%;
		min-height: 100vh;
	}
	
	.main-content-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
		width: 100%;
		box-sizing: border-box;
	}

	.quick-access {
		background: #F7F9FC;
		padding: 4rem 0;
		margin: 2rem 0;
		border-radius: 12px;
	}

	.container {
		max-width: 1000px;
		margin: 0 auto;
	}

	.quick-access h2 {
		text-align: center;
		font-size: 2.5rem;
		font-weight: 700;
		color: #1A202C;
		margin: 0 0 3rem 0;
	}

	.quick-links {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.quick-link {
		background: white;
		padding: 2rem;
		border-radius: 12px;
		text-decoration: none;
		color: inherit;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
		transition: all 0.3s ease;
		text-align: center;
	}

	.quick-link:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
		text-decoration: none;
	}

	.quick-link-icon {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	.quick-link h3 {
		font-size: 1.5rem;
		font-weight: 600;
		color: #1A202C;
		margin: 0 0 1rem 0;
	}

	.quick-link p {
		color: #4A5568;
		margin: 0;
		line-height: 1.6;
	}
	
	@media (max-width: 768px) {
		.main-content-container {
			padding: 0 1rem;
		}

		.quick-access {
			padding: 2rem 0;
			margin: 1rem 0;
		}

		.quick-access h2 {
			font-size: 2rem;
			margin-bottom: 2rem;
		}

		.quick-links {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.quick-link {
			padding: 1.5rem;
		}
	}
</style>
