<script>
import Hero from '$lib/Hero.svelte';
import FeaturedHomes from '$lib/FeaturedHomes.svelte';
import MarketInsights from '$lib/MarketInsights.svelte';
import Testimonials from '$lib/Testimonials.svelte';
</script>

<svelte:head>
	<title>Lone Mountain Heights Real Estate - Dr. Jan Duffy | Head of Lone Mountain Heights Team</title>
	<meta name="description" content="Dr. Jan Duffy, Head of the Berkshire Hathaway HomeServices Lone Mountain Heights Team. 500+ Lone Mountain transactions, team leadership, and global network access." />
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
