<script>
import Hero from '$lib/Hero.svelte';
import FeaturedHomes from '$lib/FeaturedHomes.svelte';
import MarketInsights from '$lib/MarketInsights.svelte';
import Testimonials from '$lib/Testimonials.svelte';
</script>

<svelte:head>
	<title>Lone Mountain Heights Real Estate - Dr. Jan Duffy | Las Vegas Neighborhood Expert</title>
	<meta name="description" content="Dr. Jan Duffy knows every sale, every street, every opportunity in Lone Mountain Heights, Las Vegas. Your trusted neighborhood real estate expert." />
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
