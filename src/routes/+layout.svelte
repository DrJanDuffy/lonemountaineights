<script>
import Navigation from '$lib/Navigation.svelte';
import { webVitals } from '$lib/vitals';
import { browser } from '$app/env';
import { page } from '$app/stores';
import { generateLocalBusinessSchema, generateFAQSchema, realEstateFAQs } from '$lib/schema.js';
import { initPerformanceOptimizations } from '$lib/performance.js';
import { initAccessibility } from '$lib/accessibility.js';
import '../app.css';
import '../lib/ranchStyles.css';

let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;

// Generate schema markup for the main site
const localBusinessSchema = generateLocalBusinessSchema();
const faqSchema = generateFAQSchema(realEstateFAQs);

// Initialize performance optimizations and accessibility
if (browser) {
  initPerformanceOptimizations();
  initAccessibility();
}

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
	<!-- Critical CSS for Core Web Vitals -->
	<style>
		/* Critical CSS inline for fastest rendering */
		* { box-sizing: border-box; }
		body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
		.hero { background: linear-gradient(135deg, #F7F9FC 0%, #F4F1EB 100%); padding: 4rem 2rem; min-height: 80vh; }
		.hero-content { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; max-width: 1200px; margin: 0 auto; }
		.hero-text h1 { font-size: 3.5rem; font-weight: 700; color: #1A202C; margin: 0 0 1rem 0; line-height: 1.1; }
		.btn { padding: 1rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 600; transition: all 0.3s ease; display: inline-block; }
		.btn-primary { background: #3A8DDE; color: white; border: 2px solid #3A8DDE; }
		.btn-primary:hover { background: #5BA0E8; transform: translateY(-2px); }
		@media (max-width: 768px) { .hero-content { grid-template-columns: 1fr; } .hero-text h1 { font-size: 2.5rem; } }
	</style>
	
	<!-- Performance and SEO Meta Tags -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
	<meta name="theme-color" content="#3A8DDE">
	<meta name="color-scheme" content="light dark">
	<meta name="format-detection" content="telephone=no">
	<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
	<meta name="googlebot" content="index, follow">
	
	<!-- Preconnect to external domains -->
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link rel="preconnect" href="https://images.unsplash.com" crossorigin>
	<link rel="preconnect" href="https://drjanduffy.realscout.com" crossorigin>
	
	<!-- Preload critical resources -->
	<link rel="preload" href="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2" as="font" type="font/woff2" crossorigin>
	<link rel="preload" href="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1973&q=80" as="image">
	
	<!-- DNS Prefetch for performance -->
	<link rel="dns-prefetch" href="//fonts.googleapis.com">
	<link rel="dns-prefetch" href="//www.google-analytics.com">
	
	<!-- Web App Manifest -->
	<link rel="manifest" href="/manifest.json">
	
	<!-- Apple Touch Icons -->
	<link rel="apple-touch-icon" sizes="180x180" href="/icon-192x192.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
	<link rel="shortcut icon" href="/favicon.ico">
	
	<!-- Schema Markup -->
	<script type="application/ld+json">
		{JSON.stringify(localBusinessSchema)}
	</script>
	<script type="application/ld+json">
		{JSON.stringify(faqSchema)}
	</script>
	
	<!-- Widget Tracker Code -->
	<script>
		(function(w,i,d,g,e,t){w["WidgetTrackerObject"]=g;(w[g]=w[g]||function()
		{(w[g].q=w[g].q||[]).push(arguments);}),(w[g].ds=1*new Date());(e="script"),
		(t=d.createElement(e)),(e=d.getElementsByTagName(e)[0]);t.async=1;t.src=i;
		e.parentNode.insertBefore(t,e);})
		(window,"https://widgetbe.com/agent",document,"widgetTracker");
		window.widgetTracker("create", "WT-XQHVYQWW");
		window.widgetTracker("send", "pageview");
	</script>
</svelte:head>

<Navigation />

<main id="main-content">
	<slot />
</main>

<footer>
	<div class="footer-content">
		<div class="footer-section">
			<h4>Dr. Jan Duffy</h4>
			<p>Berkshire Hathaway HomeServices</p>
			<p>Head of Lone Mountain Heights Team</p>
			<p>Your Complete Real Estate Partner</p>
			<p>Local Expert • Global Network</p>
		</div>
		
		<div class="footer-section">
			<h4>Contact</h4>
			<p><a href="tel:702-222-1964">📞 702-222-1964</a></p>
			<p><a href="mailto:jan@lonemountainheights.com">✉️ jan@lonemountainheights.com</a></p>
		</div>
		
		<div class="footer-section">
			<h4>Quick Links</h4>
			<p><a href="https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0yOTMx" target="_blank" rel="noopener noreferrer">🔍 Search All Homes in Lone Mountain Heights</a></p>
			<p><a href="/homes">Browse Listings</a></p>
			<p><a href="/sales">Recent Sales</a></p>
			<p><a href="/valuation">Home Valuation</a></p>
			<p><a href="/market-report">Market Report</a></p>
		</div>
		
		<div class="footer-section">
			<h4>Local Expertise</h4>
			<p><a href="/neighborhoods">Micro-Neighborhoods</a></p>
			<p><a href="/guide">Living in Lone Mountain Heights</a></p>
			<p><a href="/schools">School Information</a></p>
			<p><a href="/amenities">Local Amenities</a></p>
		</div>
		
		<div class="footer-section">
			<h4>Our Services</h4>
			<p>Free Market Analysis</p>
			<p>Personalized Home Search</p>
			<p>Expert Negotiation</p>
			<p>24/7 Support</p>
		</div>
	</div>
	
	<div class="footer-bottom">
		<p>&copy; 2024 Lone Mountain Heights | Homes by Dr. Jan Duffy S.0197614. All rights reserved.</p>
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
		display: block;
		width: 100%;
		box-sizing: border-box;
	}

	.footer-content {
		max-width: 1200px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
		margin-bottom: 0;
	}

	.footer-section {
		display: block;
		margin-bottom: 1rem;
	}

	.footer-section h4 {
		font-size: 1.2rem;
		font-weight: 700;
		margin: 0 0 1rem 0;
		color: var(--warm-cream);
		display: block;
	}

	.footer-section p {
		margin: 0.5rem 0;
		color: rgba(255, 255, 255, 0.8);
		display: block;
		line-height: 1.4;
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
		padding: 1rem 0;
		text-align: center;
		color: rgba(255, 255, 255, 0.8);
		font-size: 0.9rem;
		background: var(--heading-color);
		margin-top: 1rem;
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
