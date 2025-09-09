<script>
import Hero from '$lib/Hero.svelte';
import FeaturedHomes from '$lib/FeaturedHomes.svelte';
import MarketInsights from '$lib/MarketInsights.svelte';
import Testimonials from '$lib/Testimonials.svelte';
</script>

<svelte:head>
	<title>Lone Mountain Heights Homes for Sale | Dr. Jan Duffy Expert | Las Vegas 89129</title>
	<meta name="description" content="Find your dream home in Lone Mountain Heights, Las Vegas 89129. Dr. Jan Duffy, 500+ transactions expert, offers exclusive listings, market insights, and personalized service." />
	
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
	<FeaturedHomes />
	<MarketInsights />
	<Testimonials />
</main>

<style>
	main {
		width: 100%;
		min-height: 100vh;
	}
</style>
