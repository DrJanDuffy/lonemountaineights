<script>
import Navigation from '$lib/Navigation.svelte';
import { webVitals } from '$lib/vitals';
import { browser } from '$app/env';
import { page } from '$app/stores';
import { generateLocalBusinessSchema, generateFAQSchema, realEstateFAQs } from '$lib/schema.js';
import '../app.css';

let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;

// Generate schema markup for the main site
const localBusinessSchema = generateLocalBusinessSchema();
const faqSchema = generateFAQSchema(realEstateFAQs);

$: if (browser && analyticsId) {
  webVitals({
    path: $page.url.pathname,
    params: $page.params,
    analyticsId,
  });
}
</script>

<!-- Schema Markup for SEO -->
<svelte:head>
	<script type="application/ld+json">
		{JSON.stringify(localBusinessSchema)}
	</script>
	<script type="application/ld+json">
		{JSON.stringify(faqSchema)}
	</script>
</svelte:head>

<Navigation />

<main>
	<slot />
</main>

<footer>
	<div class="footer-content">
		<div class="footer-section">
			<h4>Dr. Jan Duffy</h4>
			<p>Berkshire Hathaway HomeServices</p>
			<p>Forever Agent • Lone Mountain Heights Expert</p>
			<p>500+ Las Vegas Transactions</p>
			<p>Global Network • 1,600+ Offices</p>
		</div>
		
		<div class="footer-section">
			<h4>Contact</h4>
			<p><a href="tel:702-222-1964">📞 702-222-1964</a></p>
			<p><a href="mailto:jan@lonemountainheights.com">✉️ jan@lonemountainheights.com</a></p>
		</div>
		
		<div class="footer-section">
			<h4>Quick Links</h4>
			<p><a href="/homes">Available Homes</a></p>
			<p><a href="/sales">Recent Sales</a></p>
			<p><a href="/valuation">Home Valuation</a></p>
			<p><a href="/market-report">Market Report</a></p>
		</div>
		
		<div class="footer-section">
			<h4>Neighborhood</h4>
			<p><a href="/neighborhoods">Micro-Neighborhoods</a></p>
			<p><a href="/guide">Living in Lone Mountain Heights</a></p>
			<p><a href="/schools">School Information</a></p>
			<p><a href="/amenities">Local Amenities</a></p>
		</div>
		
		<div class="footer-section">
			<h4>Berkshire Hathaway HomeServices</h4>
			<p>Data-Driven Valuations</p>
			<p>Luxury Market Focus</p>
			<p>Advanced Marketing Tools</p>
			<p>Global Network Access</p>
		</div>
	</div>
	
	<div class="footer-bottom">
		<p>&copy; 2024 Dr. Jan Duffy - Lone Mountain Heights Real Estate Expert. All rights reserved.</p>
	</div>
</footer>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		min-height: 100vh;
	}

	footer {
		background: var(--heading-color);
		color: white;
		padding: 3rem 2rem 1rem;
	}

	.footer-content {
		max-width: 1200px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
		margin-bottom: 2rem;
	}

	.footer-section h4 {
		font-size: 1.2rem;
		font-weight: 700;
		margin: 0 0 1rem 0;
		color: var(--warm-cream);
	}

	.footer-section p {
		margin: 0.5rem 0;
		color: rgba(255, 255, 255, 0.8);
	}

	.footer-section a {
		color: var(--warm-cream);
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.footer-section a:hover {
		color: white;
	}

	.footer-bottom {
		border-top: 1px solid rgba(255, 255, 255, 0.2);
		padding-top: 1rem;
		text-align: center;
		color: rgba(255, 255, 255, 0.6);
		font-size: 0.9rem;
	}

	@media (max-width: 768px) {
		footer {
			padding: 2rem 1rem 1rem;
		}
		
		.footer-content {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
	}
</style>
