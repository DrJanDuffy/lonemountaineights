<script>
	import { generateBreadcrumbSchema } from '$lib/schema.js';
	
	const breadcrumbSchema = generateBreadcrumbSchema([
		{ name: 'Home', url: 'https://lonemountainheights.com' },
		{ name: 'About', url: 'https://lonemountainheights.com/about' }
	]);
	
	const berkshireAdvantages = [
		{
			title: 'Data-Driven Valuations',
			description: 'Advanced valuation technology provides data-backed home price estimates, trends, and comparable sales in any neighborhood.',
			icon: '📊'
		},
		{
			title: 'Luxury Market Focus',
			description: 'Access to global luxury reports and resources for affluent buyers and sellers, positioning listings with maximum visibility and prestige.',
			icon: '🏆'
		},
		{
			title: 'Forever Agent Commitment',
			description: 'Every agent is trained to support clients\' long-term real estate needs, emphasizing lifelong service, not just sales.',
			icon: '🤝'
		},
		{
			title: 'Advanced Marketing Tools',
			description: 'Leverages digital marketing platforms like Zillow Showcase, delivering up to 75% more page views for listings and accelerating the sales process.',
			icon: '📈'
		},
		{
			title: 'Global Network Access',
			description: '1,600+ offices across 13 countries and 4 continents, representing over 50,000 real estate professionals with $154.7 billion in sales volume.',
			icon: '🌍'
		},
		{
			title: 'Community Impact',
			description: 'Involved in charitable initiatives such as supporting young cancer patients, reinforcing a commitment to service within their regions.',
			icon: '❤️'
		}
	];
	
	const networkStats = {
		offices: '1,600+',
		countries: '13',
		professionals: '50,000+',
		salesVolume: '$154.7B'
	};
</script>

<svelte:head>
	<title>About Dr. Jan Duffy | Team Head | Berkshire Hathaway HomeServices</title>
	<meta name="description" content="Learn about Dr. Jan Duffy, Head of Berkshire Hathaway HomeServices Team for Lone Mountain Heights. 500+ Lone Mountain transactions, team leadership, and global network access." />
	
	<!-- Breadcrumb Schema -->
	<script type="application/ld+json">
		{JSON.stringify(breadcrumbSchema)}
	</script>
</svelte:head>

<main class="about-page">
	<div class="page-header">
		<div class="container">
			<div class="brand-badge">
				<span class="berkshire-logo">Berkshire Hathaway</span>
				<span class="homeservices">HomeServices</span>
			</div>
			<div class="team-leadership">
				<span class="team-head">Team Head</span>
				<span class="lone-mountain-team">Lone Mountain Heights</span>
			</div>
			<h1>About Dr. Jan Duffy</h1>
			<p>Head of Berkshire Hathaway HomeServices Team for Lone Mountain Heights</p>
		</div>
	</div>
	
	<div class="page-content">
		<div class="container">
			<!-- Agent Profile -->
			<section class="agent-profile">
				<div class="profile-content">
					<div class="profile-text">
						<h2>Meet Your Team Head & Forever Agent</h2>
						<p>Dr. Jan Duffy leads the Berkshire Hathaway HomeServices Team for Lone Mountain Heights, overseeing 500+ successful transactions in the Lone Mountain area. As your dedicated Forever Agent, Dr. Jan is committed to supporting your long-term real estate needs throughout your lifetime, bringing unparalleled local expertise combined with the power of a global network and team resources.</p>
						
						<div class="credentials">
							<h3>Credentials & Expertise</h3>
							<ul>
								<li>Head of Berkshire Hathaway HomeServices Team</li>
								<li>500+ Lone Mountain Area Transactions</li>
								<li>Lone Mountain Heights Neighborhood Expert</li>
								<li>Team Leadership & Management</li>
								<li>Data-Driven Market Analysis Specialist</li>
								<li>Luxury Real Estate Specialist</li>
								<li>Advanced Valuation Technology Certified</li>
								<li>Global Network Access & Resources</li>
							</ul>
						</div>
					</div>
					
					<div class="profile-image">
						<img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Dr. Jan Duffy - Real Estate Expert" />
						<div class="contact-card">
							<h4>Contact Dr. Jan</h4>
							<p><a href="tel:702-222-1964">📞 702-222-1964</a></p>
							<p><a href="mailto:jan@lonemountainheights.com">✉️ jan@lonemountainheights.com</a></p>
							<p>Available 7 Days a Week</p>
						</div>
					</div>
				</div>
			</section>
			
			<!-- Berkshire Hathaway Advantages -->
			<section class="advantages-section">
				<h2>Why Choose Berkshire Hathaway HomeServices?</h2>
				<p>Dr. Jan Duffy leverages the power of the world's most trusted real estate network to provide you with unmatched advantages in today's competitive market.</p>
				
				<div class="advantages-grid">
					{#each berkshireAdvantages as advantage}
						<div class="advantage-card">
							<div class="advantage-icon">{advantage.icon}</div>
							<h3>{advantage.title}</h3>
							<p>{advantage.description}</p>
						</div>
					{/each}
				</div>
			</section>
			
			<!-- Network Statistics -->
			<section class="network-stats">
				<h2>Global Network Power</h2>
				<div class="stats-grid">
					<div class="stat-item">
						<div class="stat-number">{networkStats.offices}</div>
						<div class="stat-label">Offices Worldwide</div>
					</div>
					<div class="stat-item">
						<div class="stat-number">{networkStats.countries}</div>
						<div class="stat-label">Countries</div>
					</div>
					<div class="stat-item">
						<div class="stat-number">{networkStats.professionals}</div>
						<div class="stat-label">Real Estate Professionals</div>
					</div>
					<div class="stat-item">
						<div class="stat-number">{networkStats.salesVolume}</div>
						<div class="stat-label">Annual Sales Volume</div>
					</div>
				</div>
			</section>
			
			<!-- Local Expertise -->
			<section class="local-expertise">
				<h2>Lone Mountain Heights Local Expertise</h2>
				<div class="expertise-content">
					<div class="expertise-text">
						<h3>Why Dr. Jan Knows Lone Mountain Heights Best</h3>
						<ul>
							<li><strong>Personal Tracking:</strong> Monitors every sale in Lone Mountain Heights personally</li>
							<li><strong>Street Knowledge:</strong> Knows the best streets for resale value and lifestyle</li>
							<li><strong>Market Cycles:</strong> Understands local market timing and pricing strategies</li>
							<li><strong>Community Connection:</strong> Lives and works in Las Vegas - not a distant corporate agent</li>
							<li><strong>Subdivision Expertise:</strong> Deep knowledge of every micro-neighborhood and subdivision</li>
							<li><strong>Insider Information:</strong> Access to off-market opportunities and coming soon listings</li>
						</ul>
					</div>
					<div class="expertise-image">
						<img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Lone Mountain Heights neighborhood" />
					</div>
				</div>
			</section>
			
			<!-- CTA Section -->
			<section class="cta-section">
				<h2>Ready to Work with Your Forever Agent?</h2>
				<p>Experience the difference that comes with working with a Berkshire Hathaway HomeServices Forever Agent who combines local expertise with global network power.</p>
				<div class="cta-buttons">
					<a href="tel:702-222-1964" class="btn btn-primary">Call 702-222-1964</a>
					<a href="/homes" class="btn btn-secondary">View Available Homes</a>
					<a href="/valuation" class="btn btn-secondary">Get Home Valuation</a>
				</div>
			</section>
		</div>
</div>
</main>

<style>
	.about-page {
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
	
	.brand-badge {
		display: inline-block;
		background: var(--accent-color);
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 6px;
		margin-bottom: 1rem;
		font-size: 0.9rem;
		font-weight: 600;
	}
	
	.berkshire-logo {
		display: block;
		font-weight: 700;
		font-size: 1rem;
	}
	
	.homeservices {
		display: block;
		font-size: 0.8rem;
		opacity: 0.9;
	}
	
	.team-leadership {
		display: inline-block;
		background: var(--primary-color);
		color: white;
		padding: 0.4rem 0.8rem;
		border-radius: 4px;
		margin-bottom: 1rem;
		font-size: 0.8rem;
		font-weight: 600;
	}
	
	.team-head {
		display: block;
		font-weight: 700;
		font-size: 0.9rem;
	}
	
	.lone-mountain-team {
		display: block;
		font-size: 0.7rem;
		opacity: 0.9;
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
	
	.agent-profile,
	.advantages-section,
	.local-expertise,
	.network-stats,
	.cta-section {
		background: white;
		margin-bottom: 2rem;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	}
	
	.agent-profile h2,
	.advantages-section h2,
	.local-expertise h2,
	.network-stats h2,
	.cta-section h2 {
		font-size: 2rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 1rem 0;
	}
	
	.profile-content {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 2rem;
		align-items: start;
	}
	
	.profile-text p {
		font-size: 1.1rem;
		line-height: 1.6;
		color: var(--text-color);
		margin-bottom: 1.5rem;
	}
	
	.credentials h3 {
		font-size: 1.3rem;
		font-weight: 600;
		color: var(--heading-color);
		margin: 0 0 1rem 0;
	}
	
	.credentials ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	
	.credentials li {
		padding: 0.5rem 0;
		color: var(--text-color);
		position: relative;
		padding-left: 1.5rem;
	}
	
	.credentials li::before {
		content: '✓';
		position: absolute;
		left: 0;
		color: var(--success-green);
		font-weight: 700;
	}
	
	.profile-image {
		position: relative;
	}
	
	.profile-image img {
		width: 100%;
		height: 300px;
		object-fit: cover;
		border-radius: 12px;
		margin-bottom: 1rem;
	}
	
	.contact-card {
		background: var(--accent-color);
		color: white;
		padding: 1.5rem;
		border-radius: 12px;
		text-align: center;
	}
	
	.contact-card h4 {
		margin: 0 0 1rem 0;
		font-size: 1.2rem;
	}
	
	.contact-card p {
		margin: 0.5rem 0;
		font-size: 0.9rem;
	}
	
	.contact-card a {
		color: white;
		text-decoration: none;
		font-weight: 600;
	}
	
	.contact-card a:hover {
		text-decoration: underline;
	}
	
	.advantages-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
		margin-top: 2rem;
	}
	
	.advantage-card {
		background: var(--warm-cream);
		padding: 1.5rem;
		border-radius: 12px;
		text-align: center;
		transition: transform 0.3s ease;
	}
	
	.advantage-card:hover {
		transform: translateY(-4px);
	}
	
	.advantage-icon {
		font-size: 3rem;
		margin-bottom: 1rem;
	}
	
	.advantage-card h3 {
		font-size: 1.2rem;
		font-weight: 600;
		color: var(--heading-color);
		margin: 0 0 1rem 0;
	}
	
	.advantage-card p {
		color: var(--text-color);
		line-height: 1.5;
		margin: 0;
	}
	
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 2rem;
		margin-top: 2rem;
	}
	
	.stat-item {
		text-align: center;
		padding: 1.5rem;
		background: var(--warm-cream);
		border-radius: 12px;
	}
	
	.stat-number {
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--accent-color);
		margin-bottom: 0.5rem;
	}
	
	.stat-label {
		font-size: 1rem;
		color: var(--text-color);
		font-weight: 500;
	}
	
	.expertise-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		align-items: center;
		margin-top: 2rem;
	}
	
	.expertise-text h3 {
		font-size: 1.3rem;
		font-weight: 600;
		color: var(--heading-color);
		margin: 0 0 1rem 0;
	}
	
	.expertise-text ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	
	.expertise-text li {
		padding: 0.75rem 0;
		color: var(--text-color);
		line-height: 1.5;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}
	
	.expertise-text li:last-child {
		border-bottom: none;
	}
	
	.expertise-image img {
		width: 100%;
		height: 300px;
		object-fit: cover;
		border-radius: 12px;
	}
	
	.cta-section {
		text-align: center;
		background: var(--tertiary-color);
	}
	
	.cta-section h2 {
		color: var(--heading-color);
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
		
		.profile-content,
		.expertise-content {
			grid-template-columns: 1fr;
		}
		
		.advantages-grid {
			grid-template-columns: 1fr;
		}
		
		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
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