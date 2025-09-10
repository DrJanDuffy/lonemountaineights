<script>
import { onMount } from 'svelte';
import { generateBreadcrumbSchema } from '$lib/schema.js';

// Load RealScout script dynamically
onMount(() => {
	if (!document.querySelector('script[src*="realscout-web-components"]')) {
		const script = document.createElement('script');
		script.src = 'https://em.realscout.com/widgets/realscout-web-components.umd.js';
		script.type = 'module';
		document.head.appendChild(script);
	}
});

let formData = {
  name: '',
  email: '',
  phone: '',
  message: '',
  interest: 'buying',
  subdivision: '',
  priceRange: '',
  timeline: '',
};

let isSubmitting = false;
let submitMessage = '';

// Subdivision options for dropdown
const subdivisions = [
  'Lone Mountain Ranch',
  'Desert Vista Estates',
  'Mountain Crest',
  'Tule Springs Village',
  'Desert Foothills',
  'Canyon Gate Country Club',
  "Mountain's Edge North",
  'Providence Communities',
  'Not Sure Yet',
];

// Price range options
const priceRanges = [
  'Under $600,000',
  '$600,000 - $750,000',
  '$750,000 - $900,000',
  '$900,000 - $1,100,000',
  '$1,100,000 - $1,500,000',
  'Over $1,500,000',
  'Not Sure Yet',
];

// Timeline options
const timelines = [
  'Immediately',
  'Within 1 month',
  'Within 3 months',
  'Within 6 months',
  'Just exploring',
  'Not sure',
];

async function handleSubmit() {
  isSubmitting = true;
  submitMessage = '';

  // Simulate form submission
  await new Promise((resolve) => setTimeout(resolve, 1000));

  submitMessage = 'Thank you! Dr. Jan will contact you within 24 hours.';
  isSubmitting = false;

  // Reset form
  formData = {
    name: '',
    email: '',
    phone: '',
    message: '',
    interest: 'buying',
    subdivision: '',
    priceRange: '',
    timeline: '',
  };
}

// Generate breadcrumb schema
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://lonemountainheights.com' },
  { name: 'Contact', url: 'https://lonemountainheights.com/contact' },
]);
</script>

<svelte:head>
	<title>Contact Dr. Jan Duffy | Lone Mountain Heights Expert | Las Vegas 89129</title>
	<meta name="description" content="Contact Dr. Jan Duffy for expert real estate services in Lone Mountain Heights, Las Vegas 89129. Call 702-222-1964 or use our contact form for immediate assistance." />
	
	<!-- ContactPage Schema -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "ContactPage",
			"name": "Contact Dr. Jan Duffy - Lone Mountain Heights Real Estate Expert",
			"description": "Contact Dr. Jan Duffy for expert real estate services in Lone Mountain Heights, Las Vegas 89129. Call 702-222-1964 or use our contact form.",
			"url": "https://www.lonemountainheights.com/contact",
			"mainEntity": {
				"@type": "RealEstateAgent",
				"name": "Dr. Jan Duffy",
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
				"areaServed": {
					"@type": "City",
					"name": "Las Vegas"
				},
				"openingHours": "Mo-Su 00:00-23:59"
			}
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
				},
				{
					"@type": "ListItem",
					"position": 2,
					"name": "Contact",
					"item": "https://www.lonemountainheights.com/contact"
				}
			]
		}
	</script>
</svelte:head>

<main class="contact-page">
	<div class="page-header">
		<div class="container">
			<h1>Contact Dr. Jan Duffy | Lone Mountain Heights Expert</h1>
			<p>Ready to buy or sell in Lone Mountain Heights, Las Vegas 89129? Let's talk!</p>
		</div>
	</div>
	
	<div class="page-content">
		<div class="container">
			<div class="contact-grid">
				<!-- Contact Information -->
				<div class="contact-info">
					<h2>Get in Touch</h2>
					<p>Dr. Jan Duffy is here to help you with all your Lone Mountain Heights real estate needs.</p>
					
					<div class="contact-methods">
						<div class="contact-method">
							<div class="method-icon">📞</div>
							<div class="method-content">
								<h3>Call or Text</h3>
								<p><a href="tel:702-222-1964">702-222-1964</a></p>
								<span class="method-note">Available 7 days a week</span>
							</div>
						</div>
						
						<div class="contact-method">
							<div class="method-icon">✉️</div>
							<div class="method-content">
								<h3>Email</h3>
								<p><a href="mailto:jan@lonemountainheights.com">jan@lonemountainheights.com</a></p>
								<span class="method-note">Response within 2 hours</span>
							</div>
						</div>
						
						<div class="contact-method">
							<div class="method-icon">🏔️</div>
							<div class="method-content">
								<h3>Service Area</h3>
								<p>Lone Mountain Heights, Las Vegas</p>
								<span class="method-note">All micro-neighborhoods</span>
							</div>
						</div>
					</div>
					
					<div class="expertise-highlights">
						<h3>Why Choose Dr. Jan?</h3>
						<ul>
							<li>500+ Las Vegas transactions</li>
							<li>Deep Lone Mountain Heights expertise</li>
							<li>Knows every street and subdivision</li>
							<li>Personalized market analysis</li>
							<li>Proven track record of success</li>
						</ul>
					</div>
				</div>
				
				<!-- Contact Form -->
				<div class="contact-form-section">
					<h2>Send a Message</h2>
					<p>Tell us about your real estate goals and we'll get back to you quickly.</p>
					
					{#if submitMessage}
						<div class="success-message">
							{submitMessage}
						</div>
					{/if}
					
					<form on:submit|preventDefault={handleSubmit} class="contact-form">
						<div class="form-row">
							<div class="form-group">
								<label for="name">Full Name *</label>
								<input 
									id="name"
									type="text" 
									bind:value={formData.name} 
									required 
									placeholder="Your full name"
								/>
							</div>
							
							<div class="form-group">
								<label for="email">Email Address *</label>
								<input 
									id="email"
									type="email" 
									bind:value={formData.email} 
									required 
									placeholder="your.email@example.com"
								/>
							</div>
						</div>
						
						<div class="form-row">
							<div class="form-group">
								<label for="phone">Phone Number</label>
								<input 
									id="phone"
									type="tel" 
									bind:value={formData.phone} 
									placeholder="(702) 555-1234"
								/>
							</div>
							
							<div class="form-group">
								<label for="interest">I'm interested in *</label>
								<select id="interest" bind:value={formData.interest} required>
									<option value="buying">Buying a Home</option>
									<option value="selling">Selling a Home</option>
									<option value="both">Buying & Selling</option>
									<option value="valuation">Home Valuation</option>
									<option value="market">Market Information</option>
									<option value="other">Other</option>
								</select>
							</div>
						</div>
						
						<div class="form-row">
							<div class="form-group">
								<label for="subdivision">Preferred Subdivision</label>
								<select id="subdivision" bind:value={formData.subdivision}>
									<option value="">Select a subdivision</option>
									{#each subdivisions as subdivision}
										<option value={subdivision}>{subdivision}</option>
									{/each}
								</select>
							</div>
							
							<div class="form-group">
								<label for="priceRange">Price Range</label>
								<select id="priceRange" bind:value={formData.priceRange}>
									<option value="">Select price range</option>
									{#each priceRanges as range}
										<option value={range}>{range}</option>
									{/each}
								</select>
							</div>
						</div>
						
						<div class="form-group">
							<label for="timeline">Timeline</label>
							<select id="timeline" bind:value={formData.timeline}>
								<option value="">When are you looking to move?</option>
								{#each timelines as timeline}
									<option value={timeline}>{timeline}</option>
								{/each}
							</select>
						</div>
						
						<div class="form-group">
							<label for="message">Message</label>
							<textarea 
								id="message"
								bind:value={formData.message} 
								placeholder="Tell us about your real estate goals, questions, or specific needs..."
								rows="4"
							></textarea>
						</div>
						
						<button type="submit" class="submit-btn" disabled={isSubmitting}>
							{isSubmitting ? 'Sending...' : 'Send Message'}
						</button>
					</form>
				</div>
			</div>
			
			<!-- Quick Contact CTA -->
			<div class="quick-contact-cta">
				<h2>Need Immediate Assistance?</h2>
				<p>For urgent real estate questions or to schedule a showing, call Dr. Jan directly.</p>
				<div class="cta-buttons">
					<a href="https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0yOTMx" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Search All Homes in Lone Mountain Heights</a>
					<a href="tel:702-222-1964" class="btn btn-secondary">Call 702-222-1964</a>
					<a href="/homes" class="btn btn-secondary">Browse Listings</a>
					<a href="/valuation" class="btn btn-secondary">Get Home Valuation</a>
				</div>
			</div>
			
			<!-- Office Listings Section -->
			<div class="office-listings-section">
				<div class="container">
					<h2>Office & Commercial Properties</h2>
					<p class="section-subtitle">Explore our exclusive office listings and commercial real estate opportunities</p>
					<div class="office-listings-widget">
						<realscout-office-listings 
							agent-encoded-id="QWdlbnQtMjI1MDUw" 
							sort-order="STATUS_AND_SIGNIFICANT_CHANGE" 
							listing-status="For Sale" 
							property-types="SFR,MF,TC">
						</realscout-office-listings>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	.contact-page {
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
	
	.contact-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
		margin-bottom: 3rem;
	}
	
	.contact-info,
	.contact-form-section {
		background: white;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	}
	
	.contact-info h2,
	.contact-form-section h2 {
		font-size: 1.8rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 1rem 0;
	}
	
	.contact-info p,
	.contact-form-section p {
		color: var(--text-light);
		margin: 0 0 2rem 0;
		line-height: 1.6;
	}
	
	.contact-methods {
		margin-bottom: 2rem;
	}
	
	.contact-method {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		margin-bottom: 1.5rem;
		padding: 1rem;
		background: var(--warm-cream);
		border-radius: 8px;
	}
	
	.method-icon {
		font-size: 1.5rem;
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--accent-color);
		color: white;
		border-radius: 50%;
		flex-shrink: 0;
	}
	
	.method-content h3 {
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 0.5rem 0;
	}
	
	.method-content p {
		margin: 0 0 0.25rem 0;
		font-size: 1rem;
	}
	
	.method-content a {
		color: var(--accent-color);
		text-decoration: none;
		font-weight: 600;
	}
	
	.method-content a:hover {
		text-decoration: underline;
	}
	
	.method-note {
		font-size: 0.9rem;
		color: var(--text-light);
		font-style: italic;
	}
	
	.expertise-highlights {
		background: var(--tertiary-color);
		padding: 1.5rem;
		border-radius: 8px;
	}
	
	.expertise-highlights h3 {
		font-size: 1.2rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 1rem 0;
	}
	
	.expertise-highlights ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	
	.expertise-highlights li {
		padding: 0.5rem 0;
		color: var(--text-color);
		position: relative;
		padding-left: 1.5rem;
	}
	
	.expertise-highlights li::before {
		content: '✓';
		position: absolute;
		left: 0;
		color: var(--success-green);
		font-weight: 700;
	}
	
	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	
	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}
	
	.form-group {
		display: flex;
		flex-direction: column;
	}
	
	.form-group label {
		font-weight: 600;
		color: var(--heading-color);
		margin-bottom: 0.5rem;
		font-size: 0.9rem;
	}
	
	.form-group input,
	.form-group select,
	.form-group textarea {
		padding: 0.75rem;
		border: 2px solid var(--tertiary-color);
		border-radius: 8px;
		font-size: 1rem;
		font-family: inherit;
		transition: border-color 0.3s ease;
	}
	
	.form-group input:focus,
	.form-group select:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: var(--accent-color);
	}
	
	.form-group textarea {
		resize: vertical;
		min-height: 100px;
	}
	
	.submit-btn {
		background: var(--accent-color);
		color: white;
		border: none;
		padding: 1rem 2rem;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		align-self: flex-start;
	}
	
	.submit-btn:hover:not(:disabled) {
		background: var(--accent-light);
		transform: translateY(-2px);
	}
	
	.submit-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
	
	.success-message {
		background: var(--success-green);
		color: white;
		padding: 1rem;
		border-radius: 8px;
		margin-bottom: 1rem;
		text-align: center;
		font-weight: 600;
	}
	
	.quick-contact-cta {
		background: white;
		padding: 3rem 2rem;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		text-align: center;
	}
	
	.quick-contact-cta h2 {
		font-size: 2rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 1rem 0;
	}
	
	.quick-contact-cta p {
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
		.page-header h1 {
			font-size: 2rem;
		}
		
		.contact-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
		
		.form-row {
			grid-template-columns: 1fr;
		}
		
		.cta-buttons {
			flex-direction: column;
			align-items: center;
		}
		
		.btn {
			min-width: 200px;
		}
		
		.contact-info,
		.contact-form-section {
			padding: 1.5rem;
		}
	}

	/* Office Listings Section */
	.office-listings-section {
		background: white;
		padding: 4rem 0;
		margin: 2rem 0;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	}

	.office-listings-section h2 {
		text-align: center;
		font-size: 2.5rem;
		font-weight: 700;
		color: #1A202C;
		margin: 0 0 1rem 0;
	}

	.section-subtitle {
		text-align: center;
		font-size: 1.2rem;
		color: #4A5568;
		margin: 0 0 3rem 0;
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
	}

	.office-listings-widget {
		width: 100%;
	}

	/* RealScout Office Listings Widget Styles */
	:global(realscout-office-listings) {
		--rs-listing-divider-color: rgb(101, 141, 172);
		width: 100%;
	}

	@media (max-width: 768px) {
		.office-listings-section {
			padding: 2rem 0;
		}
		
		.office-listings-section h2 {
			font-size: 2rem;
		}
		
		.section-subtitle {
			font-size: 1.1rem;
		}
	}
</style>
