<script>
import { onMount } from 'svelte';
import { NAP } from '$lib/schema.js';
import OptimizedImage from '$lib/components/OptimizedImage.svelte';

// Trust signals data
let testimonials = [];
let certifications = [];
let successMetrics = {};
let communityInvolvement = [];

// Load data on mount
onMount(() => {
  loadTrustData();
});

function loadTrustData() {
  // Recent client testimonials
  testimonials = [
    {
      id: 1,
      name: 'Sarah & Michael Chen',
      location: 'Lone Mountain Ranch',
      rating: 5,
      text: 'Dr. Jan Duffy made our dream home purchase seamless. Her knowledge of Lone Mountain Heights is unmatched, and she negotiated an amazing deal for us.',
      date: '2024-11-15',
      transaction: 'Home Purchase - $875,000',
      image:
        '/images/agents/dr-jan-duffy.jpg',
    },
    {
      id: 2,
      name: 'Robert Martinez',
      location: 'Desert Vista Estates',
      rating: 5,
      text: "Sold our home in 3 days above asking price! Dr. Jan's marketing strategy and staging advice were incredible. Highly recommend her services.",
      date: '2024-10-28',
      transaction: 'Home Sale - $650,000',
      image:
        '/images/photos/placeholder.jpg',
    },
    {
      id: 3,
      name: 'Jennifer & David Thompson',
      location: 'Mountain View Heights',
      rating: 5,
      text: 'From first-time buyers to now selling our second home, Dr. Jan has been our trusted advisor. Her expertise in the 89129 area is phenomenal.',
      date: '2024-09-12',
      transaction: 'Home Sale - $1,200,000',
      image:
        '/images/photos/home-featured-1.jpg',
    },
    {
      id: 4,
      name: 'Lisa Wang',
      location: 'Sunset Ridge',
      rating: 5,
      text: 'Dr. Jan helped us find the perfect investment property in Lone Mountain Heights. Her market analysis and rental projections were spot-on.',
      date: '2024-08-30',
      transaction: 'Investment Property - $520,000',
      image:
        '/images/photos/home-featured-2.jpg',
    },
  ];

  // Professional certifications and awards
  certifications = [
    {
      name: 'Berkshire Hathaway HomeServices Nevada Properties',
      title: 'Team Leader & Top Producer',
      year: '2024',
      description:
        'Leading the top-performing team in the Lone Mountain Heights area',
      icon: '🏆',
    },
    {
      name: 'Luxury Home Specialist',
      title: 'Certified Luxury Home Marketing Specialist',
      year: '2023',
      description:
        'Specialized training in luxury home marketing and client service',
      icon: '💎',
    },
    {
      name: 'Market Analysis Expert',
      title: 'Certified Market Analysis Professional',
      year: '2023',
      description:
        'Advanced certification in real estate market analysis and pricing',
      icon: '📊',
    },
    {
      name: 'Nevada Real Estate License',
      title: 'Licensed Real Estate Agent',
      year: '2018',
      description:
        'Fully licensed and insured real estate professional in Nevada',
      icon: '📋',
    },
    {
      name: '500+ Transactions',
      title: 'Elite Transaction Volume',
      year: '2024',
      description: 'Successfully closed over 500 real estate transactions',
      icon: '🎯',
    },
    {
      name: '5-Star Reviews',
      title: 'Consistently High Client Satisfaction',
      year: '2024',
      description:
        'Maintaining 5-star average rating across all review platforms',
      icon: '⭐',
    },
  ];

  // Success metrics
  successMetrics = {
    transactions: 500,
    avgDaysOnMarket: 23,
    avgSalePrice: 785000,
    clientSatisfaction: 5.0,
    repeatClients: 85,
    referralRate: 92,
  };

  // Community involvement
  communityInvolvement = [
    {
      organization: 'Lone Mountain Heights HOA',
      role: 'Board Member',
      years: '2020-2024',
      description:
        'Serving the community through HOA leadership and neighborhood improvement initiatives',
    },
    {
      organization: 'Las Vegas Chamber of Commerce',
      role: 'Real Estate Committee Chair',
      years: '2022-2024',
      description:
        'Leading real estate industry initiatives and community development projects',
    },
    {
      organization: 'William G. Geer Elementary',
      role: 'School Volunteer & Sponsor',
      years: '2019-2024',
      description:
        'Supporting local schools through volunteer work and educational sponsorships',
    },
    {
      organization: 'Lone Mountain Golf Club',
      role: 'Member & Event Sponsor',
      years: '2018-2024',
      description:
        'Active community member supporting local golf and recreational activities',
    },
  ];
}

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format percentage
function formatPercentage(value) {
  return `${value}%`;
}
</script>

<div class="trust-signals">
	<div class="trust-header">
		<h3>Why Choose Dr. Jan Duffy?</h3>
		<p>Trusted by hundreds of families in Lone Mountain Heights</p>
	</div>
	
	<!-- Recent Testimonials -->
	<div class="testimonials-section">
		<h4>Recent Client Success Stories</h4>
		<div class="testimonials-grid">
			{#each testimonials as testimonial}
				<div class="testimonial-card">
					<div class="testimonial-header">
						<div class="client-info">
						<div class="client-avatar">
							<OptimizedImage src={testimonial.image || '/images/photos/placeholder.jpg'} alt={testimonial.name || 'Client'} width={80} height={80} sizes="80px" widths={[80, 160]} />
						</div>
							<div class="client-details">
								<div class="client-name">{testimonial.name}</div>
								<div class="client-location">{testimonial.location}</div>
								<div class="transaction-details">{testimonial.transaction}</div>
							</div>
						</div>
						<div class="testimonial-rating">
							{#each Array(testimonial.rating) as _}
								<span class="star">⭐</span>
							{/each}
						</div>
					</div>
					<div class="testimonial-content">
						<p>"{testimonial.text}"</p>
					</div>
					<div class="testimonial-footer">
						<span class="testimonial-date">{new Date(testimonial.date).toLocaleDateString()}</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
	
	<!-- Success Metrics -->
	<div class="metrics-section">
		<h4>Proven Track Record</h4>
		<div class="metrics-grid">
			<div class="metric-card">
				<div class="metric-icon">🏠</div>
				<div class="metric-value">{successMetrics.transactions}+</div>
				<div class="metric-label">Successful Transactions</div>
			</div>
			<div class="metric-card">
				<div class="metric-icon">📅</div>
				<div class="metric-value">{successMetrics.avgDaysOnMarket}</div>
				<div class="metric-label">Avg Days on Market</div>
			</div>
			<div class="metric-card">
				<div class="metric-icon">💰</div>
				<div class="metric-value">{formatCurrency(successMetrics.avgSalePrice)}</div>
				<div class="metric-label">Average Sale Price</div>
			</div>
			<div class="metric-card">
				<div class="metric-icon">⭐</div>
				<div class="metric-value">{successMetrics.clientSatisfaction}</div>
				<div class="metric-label">Client Satisfaction</div>
			</div>
			<div class="metric-card">
				<div class="metric-icon">🔄</div>
				<div class="metric-value">{formatPercentage(successMetrics.repeatClients)}</div>
				<div class="metric-label">Repeat Clients</div>
			</div>
			<div class="metric-card">
				<div class="metric-icon">👥</div>
				<div class="metric-value">{formatPercentage(successMetrics.referralRate)}</div>
				<div class="metric-label">Referral Rate</div>
			</div>
		</div>
	</div>
	
	<!-- Certifications & Awards -->
	<div class="certifications-section">
		<h4>Professional Certifications & Awards</h4>
		<div class="certifications-grid">
			{#each certifications as cert}
				<div class="certification-card">
					<div class="cert-icon">{cert.icon}</div>
					<div class="cert-content">
						<div class="cert-name">{cert.name}</div>
						<div class="cert-title">{cert.title}</div>
						<div class="cert-year">{cert.year}</div>
						<div class="cert-description">{cert.description}</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
	
	<!-- Community Involvement -->
	<div class="community-section">
		<h4>Community Involvement & Local Expertise</h4>
		<div class="community-grid">
			{#each communityInvolvement as involvement}
				<div class="community-card">
					<div class="community-header">
						<div class="community-organization">{involvement.organization}</div>
						<div class="community-role">{involvement.role}</div>
					</div>
					<div class="community-years">{involvement.years}</div>
					<div class="community-description">{involvement.description}</div>
				</div>
			{/each}
		</div>
	</div>
	
	<!-- Trust CTA -->
	<div class="trust-cta">
		<h4>Ready to Work with a Trusted Expert?</h4>
		<p>Join hundreds of satisfied clients who chose Dr. Jan Duffy for their Lone Mountain Heights real estate needs</p>
		<div class="cta-buttons">
			<a href={NAP.telHref} class="btn btn-primary">Call {NAP.telDisplay}</a>
			<a href="/contact" class="btn btn-secondary">Schedule Consultation</a>
		</div>
	</div>
</div>

<style>
	.trust-signals {
		background: white;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		margin-bottom: 2rem;
	}
	
	.trust-header {
		text-align: center;
		margin-bottom: 3rem;
	}
	
	.trust-header h3 {
		font-size: 1.8rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 0.5rem 0;
	}
	
	.trust-header p {
		color: var(--text-color);
		margin: 0;
		font-size: 1.1rem;
	}
	
	.testimonials-section,
	.metrics-section,
	.certifications-section,
	.community-section {
		margin-bottom: 3rem;
	}
	
	.testimonials-section h4,
	.metrics-section h4,
	.certifications-section h4,
	.community-section h4 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 2rem 0;
		text-align: center;
	}
	
	.testimonials-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
	}
	
	.testimonial-card {
		background: var(--warm-cream);
		padding: 1.5rem;
		border-radius: 12px;
		border-left: 4px solid var(--accent-color);
	}
	
	.testimonial-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1rem;
	}
	
	.client-info {
		display: flex;
		gap: 1rem;
		align-items: center;
	}
	
	.client-avatar {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		overflow: hidden;
		flex-shrink: 0;
	}
	
	.client-avatar :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	
	.client-details {
		flex: 1;
	}
	
	.client-name {
		font-weight: 700;
		color: var(--heading-color);
		margin-bottom: 0.25rem;
	}
	
	.client-location {
		font-size: 0.9rem;
		color: var(--text-light);
		margin-bottom: 0.25rem;
	}
	
	.transaction-details {
		font-size: 0.8rem;
		color: var(--accent-color);
		font-weight: 600;
	}
	
	.testimonial-rating {
		display: flex;
		gap: 0.25rem;
	}
	
	.star {
		font-size: 1.2rem;
	}
	
	.testimonial-content {
		margin-bottom: 1rem;
	}
	
	.testimonial-content p {
		font-style: italic;
		color: var(--text-color);
		line-height: 1.6;
		margin: 0;
	}
	
	.testimonial-footer {
		text-align: right;
	}
	
	.testimonial-date {
		font-size: 0.8rem;
		color: var(--text-light);
	}
	
	.metrics-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 1.5rem;
	}
	
	.metric-card {
		background: var(--warm-cream);
		padding: 2rem 1.5rem;
		border-radius: 12px;
		text-align: center;
		transition: transform 0.3s ease;
	}
	
	.metric-card:hover {
		transform: translateY(-4px);
	}
	
	.metric-icon {
		font-size: 2rem;
		margin-bottom: 1rem;
	}
	
	.metric-value {
		font-size: 2rem;
		font-weight: 700;
		color: var(--accent-color);
		margin-bottom: 0.5rem;
	}
	
	.metric-label {
		font-size: 0.9rem;
		color: var(--text-color);
		font-weight: 600;
	}
	
	.certifications-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
	}
	
	.certification-card {
		background: white;
		border: 2px solid #e5e7eb;
		padding: 1.5rem;
		border-radius: 12px;
		display: flex;
		gap: 1rem;
		align-items: flex-start;
		transition: all 0.3s ease;
	}
	
	.certification-card:hover {
		border-color: var(--accent-color);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
	}
	
	.cert-icon {
		font-size: 2rem;
		flex-shrink: 0;
	}
	
	.cert-content {
		flex: 1;
	}
	
	.cert-name {
		font-weight: 700;
		color: var(--heading-color);
		margin-bottom: 0.25rem;
	}
	
	.cert-title {
		font-size: 0.9rem;
		color: var(--accent-color);
		font-weight: 600;
		margin-bottom: 0.25rem;
	}
	
	.cert-year {
		font-size: 0.8rem;
		color: var(--text-light);
		margin-bottom: 0.5rem;
	}
	
	.cert-description {
		font-size: 0.9rem;
		color: var(--text-color);
		line-height: 1.4;
	}
	
	.community-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
	}
	
	.community-card {
		background: var(--warm-cream);
		padding: 1.5rem;
		border-radius: 12px;
		border-left: 4px solid var(--success-green);
	}
	
	.community-header {
		margin-bottom: 0.5rem;
	}
	
	.community-organization {
		font-weight: 700;
		color: var(--heading-color);
		margin-bottom: 0.25rem;
	}
	
	.community-role {
		font-size: 0.9rem;
		color: var(--accent-color);
		font-weight: 600;
	}
	
	.community-years {
		font-size: 0.8rem;
		color: var(--text-light);
		margin-bottom: 0.75rem;
		font-weight: 600;
	}
	
	.community-description {
		font-size: 0.9rem;
		color: var(--text-color);
		line-height: 1.5;
	}
	
	.trust-cta {
		background: var(--tertiary-color);
		padding: 2rem;
		border-radius: 12px;
		text-align: center;
	}
	
	.trust-cta h4 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 0.5rem 0;
	}
	
	.trust-cta p {
		color: var(--text-light);
		margin: 0 0 1.5rem 0;
		font-size: 1.1rem;
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
		min-width: 150px;
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
		.testimonials-grid,
		.metrics-grid,
		.certifications-grid,
		.community-grid {
			grid-template-columns: 1fr;
		}
		
		.testimonial-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}
		
		.client-info {
			flex-direction: column;
			align-items: flex-start;
			text-align: left;
		}
		
		.certification-card {
			flex-direction: column;
			text-align: center;
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
