<script>
import { NAP } from '$lib/schema.js';
// Mock data - in production this would come from MLS API
const featuredHomes = [
  {
    id: 1,
    address: '1234 Mountain View Dr',
    price: 875000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2450,
    lotSize: '0.25 acres',
    daysOnMarket: 8,
    image: '/images/photos/home-featured-1.jpg',
    insight:
      'Corner lot with mountain views - premium location in the neighborhood',
  },
  {
    id: 2,
    address: '5678 Desert Ridge Ln',
    price: 725000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1890,
    lotSize: '0.18 acres',
    daysOnMarket: 15,
    image: '/images/photos/home-featured-2.jpg',
    insight: 'Recently updated kitchen - great value for the area',
  },
  {
    id: 3,
    address: '9012 Lone Mountain Blvd',
    price: 950000,
    bedrooms: 5,
    bathrooms: 4,
    sqft: 3200,
    lotSize: '0.35 acres',
    daysOnMarket: 3,
    image: '/images/photos/home-featured-3.jpg',
    insight: 'Luxury finishes throughout - one of the best streets in the area',
  },
];

function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
</script>

<section class="featured-homes">
	<div class="container">
		<div class="section-header">
			<h2>Featured Lone Mountain Heights Homes</h2>
			<p>Hand-picked by Dr. Jan Duffy - your neighborhood expert</p>
			<a href="/homes" class="view-all-link">View All Homes →</a>
		</div>
		
		<div class="homes-grid">
			{#each featuredHomes as home}
				<div class="home-card">
					<div class="home-image">
						<img src={home.image} alt={home.address} />
						<div class="home-badge">
							<span class="badge-days">{home.daysOnMarket} days</span>
						</div>
						<div class="home-price">{formatPrice(home.price)}</div>
					</div>
					
					<div class="home-details">
						<h3 class="home-address">{home.address}</h3>
						<div class="home-specs">
							<span class="spec">{home.bedrooms} bed</span>
							<span class="spec">{home.bathrooms} bath</span>
							<span class="spec">{home.sqft.toLocaleString()} sqft</span>
							<span class="spec">{home.lotSize}</span>
						</div>
						
						<div class="dr-jan-insight">
							<div class="insight-header">
								<span class="insight-icon">💡</span>
								<span class="insight-title">Dr. Jan's Insight</span>
							</div>
							<p class="insight-text">{home.insight}</p>
						</div>
						
						<div class="home-actions">
							<button class="btn-details">View Details</button>
							<button class="btn-schedule">Schedule Tour</button>
						</div>
					</div>
				</div>
			{/each}
		</div>
		
		<div class="cta-section">
			<h3>Don't See What You're Looking For?</h3>
			<p>Dr. Jan knows about off-market opportunities and upcoming listings</p>
			<div class="cta-buttons">
				<a href={NAP.telHref} class="btn btn-primary">Call {NAP.telDisplay}</a>
				<a href="/contact" class="btn btn-secondary">Get Notified of New Listings</a>
			</div>
		</div>
	</div>
</section>

<style>
	.featured-homes {
		padding: 4rem 2rem;
		background: white;
	}
	
	.container {
		max-width: 1200px;
		margin: 0 auto;
	}
	
	.section-header {
		text-align: center;
		margin-bottom: 3rem;
	}
	
	.section-header h2 {
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 1rem 0;
	}
	
	.section-header p {
		font-size: 1.2rem;
		color: var(--text-light);
		margin: 0 0 1.5rem 0;
	}
	
	.view-all-link {
		color: var(--accent-color);
		text-decoration: none;
		font-weight: 600;
		font-size: 1.1rem;
		transition: color 0.3s ease;
	}
	
	.view-all-link:hover {
		color: var(--accent-light);
	}
	
	.homes-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 2rem;
		margin-bottom: 3rem;
	}
	
	.home-card {
		background: white;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}
	
	.home-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
	}
	
	.home-image {
		position: relative;
		height: 250px;
		overflow: hidden;
	}
	
	.home-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}
	
	.home-card:hover .home-image img {
		transform: scale(1.05);
	}
	
	.home-badge {
		position: absolute;
		top: 1rem;
		right: 1rem;
	}
	
	.badge-days {
		background: var(--success-green);
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 20px;
		font-size: 0.9rem;
		font-weight: 600;
	}
	
	.home-price {
		position: absolute;
		bottom: 1rem;
		left: 1rem;
		background: rgba(0, 0, 0, 0.8);
		color: white;
		padding: 0.75rem 1rem;
		border-radius: 8px;
		font-size: 1.2rem;
		font-weight: 700;
	}
	
	.home-details {
		padding: 1.5rem;
	}
	
	.home-address {
		font-size: 1.3rem;
		font-weight: 600;
		color: var(--heading-color);
		margin: 0 0 1rem 0;
	}
	
	.home-specs {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-bottom: 1rem;
	}
	
	.spec {
		background: var(--tertiary-color);
		color: var(--text-color);
		padding: 0.5rem 1rem;
		border-radius: 20px;
		font-size: 0.9rem;
		font-weight: 500;
	}
	
	.dr-jan-insight {
		background: var(--warm-cream);
		border-left: 4px solid var(--accent-color);
		padding: 1rem;
		margin: 1rem 0;
		border-radius: 0 8px 8px 0;
	}
	
	.insight-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
	}
	
	.insight-icon {
		font-size: 1.2rem;
	}
	
	.insight-title {
		font-weight: 600;
		color: var(--accent-color);
		font-size: 0.9rem;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}
	
	.insight-text {
		margin: 0;
		color: var(--text-color);
		font-size: 0.95rem;
		line-height: 1.5;
	}
	
	.home-actions {
		display: flex;
		gap: 0.75rem;
		margin-top: 1rem;
	}
	
	.btn-details, .btn-schedule {
		flex: 1;
		padding: 0.75rem 1rem;
		border: none;
		border-radius: 6px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		font-size: 0.9rem;
	}
	
	.btn-details {
		background: var(--accent-color);
		color: white;
	}
	
	.btn-details:hover {
		background: var(--accent-light);
	}
	
	.btn-schedule {
		background: transparent;
		color: var(--accent-color);
		border: 2px solid var(--accent-color);
	}
	
	.btn-schedule:hover {
		background: var(--accent-color);
		color: white;
	}
	
	.cta-section {
		text-align: center;
		background: var(--tertiary-color);
		padding: 3rem 2rem;
		border-radius: 12px;
	}
	
	.cta-section h3 {
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
		min-width: 200px;
		text-align: center;
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
		.featured-homes {
			padding: 2rem 1rem;
		}
		
		.section-header h2 {
			font-size: 2rem;
		}
		
		.homes-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
		
		.home-specs {
			gap: 0.5rem;
		}
		
		.spec {
			font-size: 0.8rem;
			padding: 0.4rem 0.8rem;
		}
		
		.cta-buttons {
			flex-direction: column;
			align-items: center;
		}
		
		.btn {
			min-width: 250px;
		}
	}
</style>
