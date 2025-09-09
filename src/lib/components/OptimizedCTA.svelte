<script>
	import { onMount } from 'svelte';
	
	// CTA state
	let urgencyMessage = '';
	let inventoryCount = 0;
	let lastUpdated = '';
	let showUrgency = false;
	
	// CTA variants
	export let variant = 'primary'; // 'primary', 'secondary', 'urgent', 'floating'
	export let size = 'large'; // 'small', 'medium', 'large'
	export let showPhone = true;
	export let showEmail = true;
	export let showText = true;
	export let showForm = false;
	
	// Urgency data
	let urgencyData = {
		activeListings: 0,
		avgDaysOnMarket: 0,
		priceReductions: 0,
		newListings: 0
	};
	
	onMount(() => {
		loadUrgencyData();
		updateUrgencyMessage();
		
		// Update every 30 minutes
		const interval = setInterval(() => {
			loadUrgencyData();
			updateUrgencyMessage();
		}, 1800000);
		
		return () => clearInterval(interval);
	});
	
	function loadUrgencyData() {
		// Simulate real-time data
		urgencyData = {
			activeListings: Math.floor(Math.random() * (150 - 100 + 1)) + 100,
			avgDaysOnMarket: Math.floor(Math.random() * (30 - 15 + 1)) + 15,
			priceReductions: Math.floor(Math.random() * (20 - 5 + 1)) + 5,
			newListings: Math.floor(Math.random() * (15 - 3 + 1)) + 3
		};
		
		inventoryCount = urgencyData.activeListings;
		lastUpdated = new Date().toLocaleTimeString();
		showUrgency = urgencyData.activeListings < 120;
	}
	
	function updateUrgencyMessage() {
		const messages = [
			`Only ${inventoryCount} homes available in Lone Mountain Heights`,
			`Average ${urgencyData.avgDaysOnMarket} days on market - homes selling fast!`,
			`${urgencyData.newListings} new listings this week - limited time to view`,
			`${urgencyData.priceReductions} price reductions - great deals available`
		];
		
		urgencyMessage = messages[Math.floor(Math.random() * messages.length)];
	}
	
	// Click tracking
	function trackCTAClick(action, method) {
		// In a real app, this would send analytics data
		console.log(`CTA clicked: ${action} via ${method}`);
		
		// Track in localStorage for personalization
		const ctaClicks = JSON.parse(localStorage.getItem('ctaClicks') || '[]');
		ctaClicks.push({
			action,
			method,
			timestamp: new Date().toISOString(),
			page: window.location.pathname
		});
		localStorage.setItem('ctaClicks', JSON.stringify(ctaClicks.slice(-50))); // Keep last 50 clicks
	}
	
	// Get CTA classes
	$: ctaClasses = `cta cta-${variant} cta-${size} ${showUrgency ? 'cta-urgent' : ''}`;
	
	// Get button classes
	$: buttonClasses = `btn btn-${variant} btn-${size}`;
</script>

<div class={ctaClasses}>
	{#if showUrgency && variant !== 'floating'}
		<div class="urgency-banner">
			<div class="urgency-icon">⚡</div>
			<div class="urgency-message">{urgencyMessage}</div>
			<div class="urgency-timer">Updated: {lastUpdated}</div>
		</div>
	{/if}
	
	<div class="cta-content">
		<div class="cta-text">
			<h3>Ready to Find Your Dream Home?</h3>
			<p>Get expert guidance from Dr. Jan Duffy, the #1 real estate agent in Lone Mountain Heights</p>
			
			{#if showUrgency}
				<div class="urgency-stats">
					<div class="stat">
						<span class="stat-number">{inventoryCount}</span>
						<span class="stat-label">Active Listings</span>
					</div>
					<div class="stat">
						<span class="stat-number">{urgencyData.avgDaysOnMarket}</span>
						<span class="stat-label">Avg Days on Market</span>
					</div>
					<div class="stat">
						<span class="stat-number">{urgencyData.newListings}</span>
						<span class="stat-label">New This Week</span>
					</div>
				</div>
			{/if}
		</div>
		
		<div class="cta-actions">
			{#if showPhone}
				<a 
					href="tel:702-222-1964" 
					class="{buttonClasses} cta-phone"
					on:click={() => trackCTAClick('call', 'phone')}
				>
					<span class="btn-icon">📞</span>
					<span class="btn-text">Call 702-222-1964</span>
				</a>
			{/if}
			
			{#if showText}
				<a 
					href="sms:702-222-1964" 
					class="{buttonClasses} cta-text"
					on:click={() => trackCTAClick('text', 'sms')}
				>
					<span class="btn-icon">💬</span>
					<span class="btn-text">Text 702-222-1964</span>
				</a>
			{/if}
			
			{#if showEmail}
				<a 
					href="mailto:jan@lonemountainheights.com" 
					class="{buttonClasses} cta-email"
					on:click={() => trackCTAClick('email', 'mailto')}
				>
					<span class="btn-icon">✉️</span>
					<span class="btn-text">Email Dr. Jan</span>
				</a>
			{/if}
			
			<a 
				href="https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0yOTMx" 
				class="{buttonClasses} cta-search"
				target="_blank" 
				rel="noopener noreferrer"
				on:click={() => trackCTAClick('search_homes', 'lone_mountain')}
			>
				<span class="btn-icon">🔍</span>
				<span class="btn-text">Search All Homes</span>
			</a>
			
			<a 
				href="/contact" 
				class="{buttonClasses} cta-contact"
				on:click={() => trackCTAClick('contact_form', 'link')}
			>
				<span class="btn-icon">📝</span>
				<span class="btn-text">Get Free Analysis</span>
			</a>
		</div>
		
		{#if showForm}
			<div class="cta-form">
				<form on:submit|preventDefault={() => trackCTAClick('form_submit', 'form')}>
					<div class="form-group">
						<input 
							type="text" 
							placeholder="Your Name" 
							required
							class="form-input"
						/>
					</div>
					<div class="form-group">
						<input 
							type="email" 
							placeholder="Your Email" 
							required
							class="form-input"
						/>
					</div>
					<div class="form-group">
						<input 
							type="tel" 
							placeholder="Your Phone" 
							class="form-input"
						/>
					</div>
					<button type="submit" class="btn btn-primary btn-full">
						Get My Free Market Analysis
					</button>
				</form>
			</div>
		{/if}
		
		<div class="cta-trust">
			<div class="trust-badges">
				<span class="trust-badge">🏆 #1 Agent</span>
				<span class="trust-badge">⭐ 5-Star Reviews</span>
				<span class="trust-badge">🏠 500+ Sales</span>
			</div>
			<div class="trust-text">
				Trusted by hundreds of families in Lone Mountain Heights
			</div>
		</div>
	</div>
</div>

<style>
	.cta {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		overflow: hidden;
		transition: all 0.3s ease;
	}
	
	.cta:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
	}
	
	.cta-urgent {
		border: 2px solid var(--accent-color);
		animation: pulse 2s infinite;
	}
	
	@keyframes pulse {
		0% { box-shadow: 0 4px 20px rgba(59, 130, 246, 0.1); }
		50% { box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3); }
		100% { box-shadow: 0 4px 20px rgba(59, 130, 246, 0.1); }
	}
	
	.urgency-banner {
		background: linear-gradient(135deg, var(--accent-color), var(--accent-light));
		color: white;
		padding: 1rem;
		display: flex;
		align-items: center;
		gap: 1rem;
		animation: slideDown 0.5s ease;
	}
	
	@keyframes slideDown {
		from { transform: translateY(-100%); }
		to { transform: translateY(0); }
	}
	
	.urgency-icon {
		font-size: 1.5rem;
		animation: bounce 1s infinite;
	}
	
	@keyframes bounce {
		0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
		40% { transform: translateY(-10px); }
		60% { transform: translateY(-5px); }
	}
	
	.urgency-message {
		flex: 1;
		font-weight: 700;
		font-size: 1.1rem;
	}
	
	.urgency-timer {
		font-size: 0.9rem;
		opacity: 0.9;
	}
	
	.cta-content {
		padding: 2rem;
	}
	
	.cta-text {
		text-align: center;
		margin-bottom: 2rem;
	}
	
	.cta-text h3 {
		font-size: 1.8rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 0.5rem 0;
	}
	
	.cta-text p {
		color: var(--text-color);
		margin: 0 0 1.5rem 0;
		font-size: 1.1rem;
	}
	
	.urgency-stats {
		display: flex;
		justify-content: center;
		gap: 2rem;
		margin-top: 1.5rem;
	}
	
	.stat {
		text-align: center;
	}
	
	.stat-number {
		display: block;
		font-size: 2rem;
		font-weight: 700;
		color: var(--accent-color);
	}
	
	.stat-label {
		font-size: 0.9rem;
		color: var(--text-light);
		font-weight: 600;
	}
	
	.cta-actions {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		margin-bottom: 2rem;
	}
	
	.btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 1rem 1.5rem;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 600;
		font-size: 1rem;
		transition: all 0.3s ease;
		border: 2px solid transparent;
		cursor: pointer;
	}
	
	.btn-primary {
		background: var(--accent-color);
		color: white;
		border-color: var(--accent-color);
	}
	
	.btn-primary:hover {
		background: var(--accent-light);
		border-color: var(--accent-light);
		transform: translateY(-2px);
	}
	
	.btn-secondary {
		background: transparent;
		color: var(--accent-color);
		border-color: var(--accent-color);
	}
	
	.btn-secondary:hover {
		background: var(--accent-color);
		color: white;
		transform: translateY(-2px);
	}
	
	.btn-full {
		grid-column: 1 / -1;
	}
	
	.btn-icon {
		font-size: 1.2rem;
	}
	
	.btn-text {
		font-weight: 700;
	}
	
	.cta-form {
		background: var(--warm-cream);
		padding: 1.5rem;
		border-radius: 8px;
		margin-bottom: 2rem;
	}
	
	.form-group {
		margin-bottom: 1rem;
	}
	
	.form-input {
		width: 100%;
		padding: 0.75rem;
		border: 2px solid #e5e7eb;
		border-radius: 8px;
		font-size: 1rem;
		transition: border-color 0.3s ease;
	}
	
	.form-input:focus {
		outline: none;
		border-color: var(--accent-color);
	}
	
	.cta-trust {
		text-align: center;
		padding-top: 1.5rem;
		border-top: 1px solid #e5e7eb;
	}
	
	.trust-badges {
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 0.5rem;
		flex-wrap: wrap;
	}
	
	.trust-badge {
		background: var(--warm-cream);
		color: var(--heading-color);
		padding: 0.5rem 1rem;
		border-radius: 20px;
		font-size: 0.9rem;
		font-weight: 600;
	}
	
	.trust-text {
		font-size: 0.9rem;
		color: var(--text-light);
		font-style: italic;
	}
	
	/* Variant Styles */
	.cta-primary {
		background: linear-gradient(135deg, var(--accent-color), var(--accent-light));
		color: white;
	}
	
	.cta-primary .cta-text h3,
	.cta-primary .cta-text p {
		color: white;
	}
	
	.cta-secondary {
		background: var(--warm-cream);
		border: 2px solid var(--accent-color);
	}
	
	.cta-floating {
		position: fixed;
		bottom: 2rem;
		right: 2rem;
		z-index: 1000;
		max-width: 300px;
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
	}
	
	/* Size Styles */
	.cta-small {
		padding: 1rem;
	}
	
	.cta-small .cta-text h3 {
		font-size: 1.3rem;
	}
	
	.cta-small .cta-actions {
		grid-template-columns: 1fr;
	}
	
	.cta-medium {
		padding: 1.5rem;
	}
	
	.cta-large {
		padding: 2rem;
	}
	
	@media (max-width: 768px) {
		.cta-actions {
			grid-template-columns: 1fr;
		}
		
		.urgency-stats {
			flex-direction: column;
			gap: 1rem;
		}
		
		.trust-badges {
			flex-direction: column;
			align-items: center;
		}
		
		.cta-floating {
			position: static;
			margin: 1rem;
		}
		
		.btn {
			padding: 1rem;
		}
	}
</style>
