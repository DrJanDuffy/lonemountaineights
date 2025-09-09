<script>
	const testimonials = [
		{
			id: 1,
			name: "Sarah & Mike Chen",
			address: "Lone Mountain Heights",
			text: "Dr. Jan knew exactly which street would give us the best resale value. She found us a corner lot with mountain views that we never would have considered. Sold it 2 years later for $50K more than we paid!",
			rating: 5,
			transaction: "Buyer & Seller"
		},
		{
			id: 2,
			name: "Jennifer Martinez",
			address: "Mountain View Dr",
			text: "Sold our home in 8 days for $15K over asking! Dr. Jan's pricing strategy was spot-on and her staging advice made all the difference. She knows this neighborhood like the back of her hand.",
			rating: 5,
			transaction: "Seller"
		},
		{
			id: 3,
			name: "David Thompson",
			address: "Desert Ridge Ln",
			text: "She knew about the solar installation before it hit MLS. Dr. Jan's connections and local knowledge saved us thousands. We got the house we wanted before other buyers even knew it was available.",
			rating: 5,
			transaction: "Buyer"
		},
		{
			id: 4,
			name: "Lisa & Robert Kim",
			address: "Canyon Heights Blvd",
			text: "Dr. Jan's market analysis showed us exactly when to list. We waited 3 months based on her advice and sold for $25K more than the spring market would have brought. Her timing is impeccable.",
			rating: 5,
			transaction: "Seller"
		},
		{
			id: 5,
			name: "Michael Rodriguez",
			address: "Lone Mountain Way",
			text: "As first-time buyers, we were overwhelmed. Dr. Jan explained every step and helped us understand the local market. She found us a great home in our budget and negotiated a fantastic deal.",
			rating: 5,
			transaction: "Buyer"
		},
		{
			id: 6,
			name: "Amanda Foster",
			address: "Mountain Ridge Dr",
			text: "Dr. Jan's neighborhood expertise is unmatched. She knew about upcoming developments, school boundary changes, and market trends that affected our decision. We couldn't have made a better choice.",
			rating: 5,
			transaction: "Buyer"
		}
	];
	
	function getStars(rating) {
		return '★'.repeat(rating);
	}
</script>

<section class="testimonials">
	<div class="container">
		<div class="section-header">
			<h2>Lone Mountain Heights Neighbors Say</h2>
			<p>Real testimonials from real clients who chose Dr. Jan Duffy</p>
		</div>
		
		<div class="testimonials-grid">
			{#each testimonials as testimonial}
				<div class="testimonial-card">
					<div class="testimonial-content">
						<div class="quote-icon">"</div>
						<p class="testimonial-text">{testimonial.text}</p>
					</div>
					
					<div class="testimonial-footer">
						<div class="client-info">
							<div class="client-name">{testimonial.name}</div>
							<div class="client-address">{testimonial.address}</div>
							<div class="transaction-type">{testimonial.transaction}</div>
						</div>
						
						<div class="rating">
							<span class="stars">{getStars(testimonial.rating)}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
		
		<div class="stats-section">
			<div class="stats-grid">
				<div class="stat-item">
					<span class="stat-number">500+</span>
					<span class="stat-label">Las Vegas Transactions</span>
				</div>
				<div class="stat-item">
					<span class="stat-number">98%</span>
					<span class="stat-label">Client Satisfaction</span>
				</div>
				<div class="stat-item">
					<span class="stat-number">12</span>
					<span class="stat-label">Avg Days on Market</span>
				</div>
				<div class="stat-item">
					<span class="stat-number">$2.1M</span>
					<span class="stat-label">Total Sales Volume</span>
				</div>
			</div>
		</div>
		
		<div class="cta-section">
			<h3>Ready to Work with Las Vegas's Premier Neighborhood Expert?</h3>
			<p>Join hundreds of satisfied clients who chose Dr. Jan Duffy for their real estate needs</p>
			<div class="cta-buttons">
				<a href="tel:702-222-1964" class="btn btn-primary">Call 702-222-1964</a>
				<a href="/contact" class="btn btn-secondary">Schedule Consultation</a>
			</div>
		</div>
	</div>
</section>

<style>
	.testimonials {
		background: white;
		padding: 4rem 2rem;
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
		margin: 0;
	}
	
	.testimonials-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 2rem;
		margin-bottom: 3rem;
	}
	
	.testimonial-card {
		background: var(--warm-cream);
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		position: relative;
		overflow: hidden;
	}
	
	.testimonial-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
	}
	
	.testimonial-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: linear-gradient(90deg, var(--accent-color), var(--accent-light));
	}
	
	.testimonial-content {
		margin-bottom: 1.5rem;
	}
	
	.quote-icon {
		font-size: 3rem;
		color: var(--accent-color);
		opacity: 0.3;
		line-height: 1;
		margin-bottom: 0.5rem;
	}
	
	.testimonial-text {
		font-size: 1.1rem;
		line-height: 1.6;
		color: var(--text-color);
		margin: 0;
		font-style: italic;
	}
	
	.testimonial-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.client-info {
		flex: 1;
	}
	
	.client-name {
		font-weight: 700;
		color: var(--heading-color);
		font-size: 1.1rem;
		margin-bottom: 0.25rem;
	}
	
	.client-address {
		color: var(--text-light);
		font-size: 0.9rem;
		margin-bottom: 0.25rem;
	}
	
	.transaction-type {
		background: var(--accent-color);
		color: white;
		padding: 0.25rem 0.75rem;
		border-radius: 12px;
		font-size: 0.8rem;
		font-weight: 600;
		display: inline-block;
	}
	
	.rating {
		text-align: right;
	}
	
	.stars {
		color: var(--warning-orange);
		font-size: 1.2rem;
	}
	
	.stats-section {
		background: var(--tertiary-color);
		padding: 3rem 2rem;
		border-radius: 12px;
		margin-bottom: 3rem;
	}
	
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 2rem;
	}
	
	.stat-item {
		text-align: center;
	}
	
	.stat-number {
		display: block;
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--accent-color);
		margin-bottom: 0.5rem;
	}
	
	.stat-label {
		font-size: 0.9rem;
		color: var(--text-light);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}
	
	.cta-section {
		text-align: center;
		background: linear-gradient(135deg, var(--accent-color), var(--accent-light));
		color: white;
		padding: 3rem 2rem;
		border-radius: 12px;
	}
	
	.cta-section h3 {
		font-size: 2rem;
		font-weight: 700;
		margin: 0 0 1rem 0;
	}
	
	.cta-section p {
		font-size: 1.1rem;
		margin: 0 0 2rem 0;
		opacity: 0.9;
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
		background: white;
		color: var(--accent-color);
		border: 2px solid white;
	}
	
	.btn-primary:hover {
		background: transparent;
		color: white;
		border-color: white;
		transform: translateY(-2px);
	}
	
	.btn-secondary {
		background: transparent;
		color: white;
		border: 2px solid white;
	}
	
	.btn-secondary:hover {
		background: white;
		color: var(--accent-color);
		transform: translateY(-2px);
	}
	
	@media (max-width: 768px) {
		.testimonials {
			padding: 2rem 1rem;
		}
		
		.section-header h2 {
			font-size: 2rem;
		}
		
		.testimonials-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
		
		.testimonial-card {
			padding: 1.5rem;
		}
		
		.testimonial-footer {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}
		
		.rating {
			text-align: left;
		}
		
		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 1rem;
		}
		
		.stat-number {
			font-size: 2rem;
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
