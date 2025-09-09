<script>
import { onMount } from 'svelte';

let heroImage =
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80';
</script>

<section class="hero">
	<div class="hero-content">
		<div class="hero-text">
			<div class="brand-badge">
				<span class="berkshire-logo">Berkshire Hathaway</span>
				<span class="homeservices">HomeServices</span>
			</div>
			<h1>Lone Mountain Heights Homes for Sale</h1>
			<h2>Gated Community in Las Vegas 89129</h2>
			<p class="hero-subtitle">
				Quiet, gated community developed 2001-2005 with 3-5 bedroom homes (2,500-4,400 sq ft) featuring mature landscaping and spectacular mountain views. Dr. Jan Duffy, your Forever Agent, knows every sale, every street, every opportunity in Lone Mountain Heights.
			</p>
			
			<div class="cta-buttons">
				<a href="/homes" class="btn btn-primary">See Available Homes</a>
				<a href="/valuation" class="btn btn-secondary">Get My Home's Value</a>
			</div>
			
			<div class="contact-info">
				<a href="tel:702-222-1964" class="phone-link">
					📞 Call/Text 702-222-1964
				</a>
			</div>
		</div>
		
		<div class="hero-image">
			<img src={heroImage} alt="Lone Mountain Heights neighborhood with mountain views" />
			<div class="image-overlay">
				<div class="expertise-badge">
					<span class="badge-text">500+ Las Vegas Transactions</span>
					<span class="badge-subtext">Forever Agent • Global Network</span>
				</div>
			</div>
		</div>
	</div>
	
	<div class="hero-stats">
		<div class="stat">
			<span class="stat-number">$847K</span>
			<span class="stat-label">Avg Sale Price</span>
		</div>
		<div class="stat">
			<span class="stat-number">12</span>
			<span class="stat-label">Days on Market</span>
		</div>
		<div class="stat">
			<span class="stat-number">98%</span>
			<span class="stat-label">List to Sale Ratio</span>
		</div>
		<div class="stat">
			<span class="stat-number">47</span>
			<span class="stat-label">Active Listings</span>
		</div>
	</div>
</section>

<style>
	.hero {
		background: linear-gradient(135deg, var(--warm-cream) 0%, var(--desert-sand) 100%);
		padding: 4rem 2rem;
		min-height: 80vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: relative;
		overflow: hidden;
	}
	
	.hero::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="mountain" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M0,20 L10,0 L20,20 Z" fill="rgba(139,69,19,0.05)"/></pattern></defs><rect width="100" height="100" fill="url(%23mountain)"/></svg>');
		opacity: 0.3;
	}
	
	.hero-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: center;
		max-width: 1200px;
		margin: 0 auto;
		position: relative;
		z-index: 1;
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
	
	.hero-text h1 {
		font-size: 3.5rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 1rem 0;
		line-height: 1.1;
	}
	
	.hero-text h2 {
		font-size: 2rem;
		font-weight: 600;
		color: var(--accent-color);
		margin: 0 0 1.5rem 0;
	}
	
	.hero-subtitle {
		font-size: 1.25rem;
		color: var(--text-color);
		margin: 0 0 2rem 0;
		line-height: 1.6;
		max-width: 500px;
	}
	
	.cta-buttons {
		display: flex;
		gap: 1rem;
		margin-bottom: 2rem;
		flex-wrap: wrap;
	}
	
	.btn {
		padding: 1rem 2rem;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 600;
		font-size: 1.1rem;
		transition: all 0.3s ease;
		display: inline-block;
		text-align: center;
		min-width: 200px;
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
		box-shadow: 0 8px 25px rgba(30, 58, 138, 0.3);
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
		box-shadow: 0 8px 25px rgba(30, 58, 138, 0.2);
	}
	
	.contact-info {
		margin-top: 1rem;
	}
	
	.phone-link {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--primary-color);
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		transition: color 0.3s ease;
	}
	
	.phone-link:hover {
		color: var(--accent-color);
	}
	
	.hero-image {
		position: relative;
		border-radius: 16px;
		overflow: hidden;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
	}
	
	.hero-image img {
		width: 100%;
		height: 400px;
		object-fit: cover;
		display: block;
	}
	
	.image-overlay {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
		padding: 2rem;
	}
	
	.expertise-badge {
		background: var(--accent-color);
		color: white;
		padding: 1rem 1.5rem;
		border-radius: 8px;
		text-align: center;
		max-width: 200px;
	}
	
	.badge-text {
		display: block;
		font-weight: 700;
		font-size: 1.1rem;
		margin-bottom: 0.25rem;
	}
	
	.badge-subtext {
		display: block;
		font-size: 0.9rem;
		opacity: 0.9;
	}
	
	.hero-stats {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 2rem;
		max-width: 1200px;
		margin: 3rem auto 0;
		position: relative;
		z-index: 1;
	}
	
	.stat {
		text-align: center;
		background: white;
		padding: 1.5rem;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease;
	}
	
	.stat:hover {
		transform: translateY(-4px);
	}
	
	.stat-number {
		display: block;
		font-size: 2rem;
		font-weight: 700;
		color: var(--accent-color);
		margin-bottom: 0.5rem;
	}
	
	.stat-label {
		font-size: 0.9rem;
		color: var(--text-light);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}
	
	@media (max-width: 768px) {
		.hero {
			padding: 2rem 1rem;
			min-height: 70vh;
		}
		
		.hero-content {
			grid-template-columns: 1fr;
			gap: 2rem;
			text-align: center;
		}
		
		.hero-text h1 {
			font-size: 2.5rem;
		}
		
		.hero-text h2 {
			font-size: 1.5rem;
		}
		
		.hero-subtitle {
			font-size: 1.1rem;
		}
		
		.cta-buttons {
			justify-content: center;
		}
		
		.btn {
			min-width: 180px;
		}
		
		.hero-stats {
			grid-template-columns: repeat(2, 1fr);
			gap: 1rem;
			margin-top: 2rem;
		}
		
		.stat {
			padding: 1rem;
		}
		
		.stat-number {
			font-size: 1.5rem;
		}
	}
</style>
