<script>
import { page } from '$app/stores';
	import { onMount } from 'svelte';

let mobileMenuOpen = false;
	let activeDropdown = null;
	let navContainer;

	// Optimized functions with better performance
function toggleMobileMenu() {
  mobileMenuOpen = !mobileMenuOpen;
		// Close dropdowns when mobile menu opens
		if (mobileMenuOpen) {
			activeDropdown = null;
		}
}

function closeMobileMenu() {
  mobileMenuOpen = false;
}

	function handleKeydown(event) {
		if (event.key === 'Escape') {
			closeMobileMenu();
			activeDropdown = null;
		}
	}

	function handleNavKeydown(event) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			toggleMobileMenu();
		}
	}

	function handleNavLinkClick() {
		closeMobileMenu();
		activeDropdown = null; // Close dropdowns when navigating
	}

	function toggleDropdown(dropdownName) {
		// Close other dropdowns when opening a new one
		activeDropdown = activeDropdown === dropdownName ? null : dropdownName;
	}

	function closeDropdown() {
		activeDropdown = null;
	}

	// Optimized click outside handler
	function handleClickOutside(event) {
		if (navContainer && !navContainer.contains(event.target)) {
			closeDropdown();
		}
	}

	// Handle keyboard navigation for dropdowns
	function handleDropdownKeydown(event) {
		if (event.key === 'Escape') {
			closeDropdown();
		}
	}

	// Handle dropdown arrow key navigation
	function handleDropdownArrowKeys(event, dropdownName) {
		if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
			event.preventDefault();
			if (activeDropdown !== dropdownName) {
				activeDropdown = dropdownName;
			}
		}
	}

	// Close mobile menu on route change
	$: if ($page) {
		closeMobileMenu();
	}

	onMount(() => {
		// Add global click listener for better performance
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<header class="navigation" bind:this={navContainer} on:keydown={handleDropdownKeydown}>
	<!-- Top Utility Bar -->
	<div class="utility-bar">
		<div class="utility-container">
			<div class="utility-left">
        <div class="social-links">
          <a href="https://facebook.com" class="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">f</a>
          <a href="https://twitter.com" class="social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">X</a>
          <a href="https://youtube.com" class="social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer">▶</a>
          <a href="https://linkedin.com" class="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">in</a>
        </div>
				<div class="phone-utility">
					<span class="phone-icon">📞</span>
					<span class="phone-text">(702) 222-1964</span>
				</div>
			</div>
			<div class="utility-right">
				<div class="language-selector">
					<select class="language-dropdown">
						<option value="en">SELECT LANGUAGE</option>
						<option value="es">Español</option>
					</select>
				</div>
				<a href="/contact" class="sign-in-link">SIGN IN / CONTACT</a>
				<button class="app-download-btn">APP</button>
			</div>
		</div>
	</div>

	<!-- Main Navigation -->
	<div class="nav-container">
		<div class="nav-brand">
			<a href="/" class="brand-link">
				<div class="brand-logo">
					<div class="brand-text">
						<span class="brand-name">DR. JAN DUFFY</span>
						<span class="brand-tagline">LONE MOUNTAIN HEIGHTS EXPERT</span>
					</div>
				</div>
			</a>
		</div>
		
		<nav class="nav-menu" class:mobile-open={mobileMenuOpen} aria-label="Main navigation">
			<!-- Desktop Navigation - Berkshire Hathaway Style -->
			<ul class="nav-list nav-list-desktop" role="menubar">
				<!-- Search Dropdown -->
				<li class="nav-item nav-item-dropdown" role="none">
					<button 
						class="nav-link nav-dropdown-toggle" 
						class:active={activeDropdown === 'search'}
						aria-expanded={activeDropdown === 'search'}
						aria-haspopup="true"
						on:click={() => toggleDropdown('search')}
						on:keydown={(e) => handleDropdownArrowKeys(e, 'search')}
						on:blur={() => setTimeout(closeDropdown, 150)}
					>
						SEARCH <span class="dropdown-arrow">▼</span>
					</button>
					<ul class="nav-dropdown" class:active={activeDropdown === 'search'} role="menu">
						<li role="none">
							<a href="https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0yOTMx" class="nav-dropdown-link" target="_blank" rel="noopener noreferrer" role="menuitem" on:click={handleNavLinkClick}>Search All Homes</a>
						</li>
						<li role="none">
							<a href="/homes" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>Browse Listings</a>
						</li>
						<li role="none">
							<a href="/sales" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>Recent Sales</a>
						</li>
						<li role="none">
							<a href="/property-types/3-bedroom-homes" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>3 Bedroom Homes</a>
						</li>
						<li role="none">
							<a href="/price-ranges/600k-800k" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>Homes $600K-$800K</a>
						</li>
					</ul>
				</li>

				<!-- Buyers Dropdown -->
				<li class="nav-item nav-item-dropdown" role="none">
					<button 
						class="nav-link nav-dropdown-toggle" 
						class:active={activeDropdown === 'buyers'}
						aria-expanded={activeDropdown === 'buyers'}
						aria-haspopup="true"
						on:click={() => toggleDropdown('buyers')}
						on:keydown={(e) => handleDropdownArrowKeys(e, 'buyers')}
						on:blur={() => setTimeout(closeDropdown, 150)}
					>
						BUYERS <span class="dropdown-arrow">▼</span>
					</button>
					<ul class="nav-dropdown" class:active={activeDropdown === 'buyers'} role="menu">
						<li role="none">
							<a href="/tools" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>Home Value Calculator</a>
						</li>
						<li role="none">
							<a href="/tools" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>Mortgage Calculator</a>
						</li>
						<li role="none">
							<a href="/market-intelligence" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>Market Data</a>
						</li>
						<li role="none">
							<a href="/contact" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>Free Consultation</a>
						</li>
					</ul>
				</li>

				<!-- Sellers Dropdown -->
				<li class="nav-item nav-item-dropdown" role="none">
					<button 
						class="nav-link nav-dropdown-toggle" 
						class:active={activeDropdown === 'sellers'}
						aria-expanded={activeDropdown === 'sellers'}
						aria-haspopup="true"
						on:click={() => toggleDropdown('sellers')}
						on:keydown={(e) => handleDropdownArrowKeys(e, 'sellers')}
						on:blur={() => setTimeout(closeDropdown, 150)}
					>
						SELLERS <span class="dropdown-arrow">▼</span>
					</button>
					<ul class="nav-dropdown" class:active={activeDropdown === 'sellers'} role="menu">
						<li role="none">
							<a href="/tools" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>What's My Home Worth?</a>
						</li>
						<li role="none">
							<a href="/contact" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>Free Home Valuation</a>
						</li>
						<li role="none">
							<a href="/contact" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>Selling Process</a>
						</li>
						<li role="none">
							<a href="/contact" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>Market Analysis</a>
						</li>
					</ul>
				</li>

				<!-- Communities -->
				<li class="nav-item" role="none">
					<a href="/neighborhood" class="nav-link" role="menuitem" on:click={handleNavLinkClick}>
						COMMUNITIES
					</a>
				</li>

				<!-- Luxury -->
				<li class="nav-item" role="none">
					<a href="/luxury" class="nav-link" role="menuitem" on:click={handleNavLinkClick}>
						LUXURY
					</a>
				</li>

				<!-- Agents -->
				<li class="nav-item" role="none">
					<a href="/about" class="nav-link" role="menuitem" on:click={handleNavLinkClick}>
						AGENTS
					</a>
				</li>

				<!-- Offices -->
				<li class="nav-item" role="none">
					<a href="/contact" class="nav-link" role="menuitem" on:click={handleNavLinkClick}>
						OFFICES
					</a>
				</li>

				<!-- About Us Dropdown -->
				<li class="nav-item nav-item-dropdown" role="none">
					<button 
						class="nav-link nav-dropdown-toggle" 
						class:active={activeDropdown === 'about'}
						aria-expanded={activeDropdown === 'about'}
						aria-haspopup="true"
						on:click={() => toggleDropdown('about')}
						on:keydown={(e) => handleDropdownArrowKeys(e, 'about')}
						on:blur={() => setTimeout(closeDropdown, 150)}
					>
						ABOUT US <span class="dropdown-arrow">▼</span>
					</button>
					<ul class="nav-dropdown" class:active={activeDropdown === 'about'} role="menu">
						<li role="none">
							<a href="/about" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>About Dr. Jan Duffy</a>
						</li>
						<li role="none">
							<a href="/amenities" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>Local Amenities</a>
						</li>
						<li role="none">
							<a href="/schools" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>Schools</a>
						</li>
						<li role="none">
							<a href="/faq/hoa-fees" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>HOA Information</a>
						</li>
					</ul>
				</li>

				<!-- Careers -->
				<li class="nav-item" role="none">
					<a href="/careers" class="nav-link" role="menuitem" on:click={handleNavLinkClick}>
						CAREERS
					</a>
				</li>

				<!-- Blog -->
				<li class="nav-item" role="none">
					<a href="/blog" class="nav-link" role="menuitem" on:click={handleNavLinkClick}>
						BLOG
					</a>
				</li>
			</ul>
			
			<!-- Mobile Navigation - Mobile Optimized -->
			<div class="nav-groups nav-groups-mobile">
				<div class="nav-group">
					<h4 class="nav-group-title">Quick Actions</h4>
					<ul class="nav-list" role="menubar">
						<li class="nav-item" role="none">
							<a href="/" class="nav-link" class:active={$page.url.pathname === '/'} role="menuitem" aria-current={$page.url.pathname === '/' ? 'page' : undefined} on:click={handleNavLinkClick}>🏠 Home</a>
						</li>
						<li class="nav-item" role="none">
							<a href="https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0yOTMx" class="nav-link nav-link-primary" target="_blank" rel="noopener noreferrer" role="menuitem" aria-label="Search Homes in Lone Mountain Heights (opens in new tab)" on:click={handleNavLinkClick}>🔍 Search All Homes</a>
						</li>
						<li class="nav-item" role="none">
							<a href="tel:702-222-1964" class="nav-link nav-link-phone" role="menuitem" aria-label="Call Dr. Jan Duffy at 702-222-1964" on:click={handleNavLinkClick}>
								<span class="phone-icon">📞</span>
								<span class="phone-number">Call 702-222-1964</span>
							</a>
						</li>
					</ul>
				</div>
				
				<div class="nav-group">
					<h4 class="nav-group-title">Neighborhoods</h4>
					<ul class="nav-list" role="menubar">
						<li class="nav-item" role="none">
							<a href="/neighborhood" class="nav-link" class:active={$page.url.pathname.startsWith('/neighborhood')} role="menuitem" aria-current={$page.url.pathname.startsWith('/neighborhood') ? 'page' : undefined} on:click={handleNavLinkClick}>Lone Mountain Heights</a>
						</li>
						<li class="nav-item" role="none">
							<a href="/locations/lone-mountain-ranch" class="nav-link" class:active={$page.url.pathname.startsWith('/locations/lone-mountain-ranch')} role="menuitem" aria-current={$page.url.pathname.startsWith('/locations/lone-mountain-ranch') ? 'page' : undefined} on:click={handleNavLinkClick}>Lone Mountain Ranch</a>
						</li>
						<li class="nav-item" role="none">
							<a href="/locations/desert-vista-estates" class="nav-link" class:active={$page.url.pathname.startsWith('/locations/desert-vista-estates')} role="menuitem" aria-current={$page.url.pathname.startsWith('/locations/desert-vista-estates') ? 'page' : undefined} on:click={handleNavLinkClick}>Desert Vista Estates</a>
						</li>
						<li class="nav-item" role="none">
							<a href="/neighborhoods" class="nav-link" class:active={$page.url.pathname.startsWith('/neighborhoods')} role="menuitem" aria-current={$page.url.pathname.startsWith('/neighborhoods') ? 'page' : undefined} on:click={handleNavLinkClick}>All Micro-Neighborhoods</a>
						</li>
					</ul>
				</div>
				
				<div class="nav-group">
					<h4 class="nav-group-title">Properties</h4>
					<ul class="nav-list" role="menubar">
						<li class="nav-item" role="none">
							<a href="/homes" class="nav-link" class:active={$page.url.pathname.startsWith('/homes')} role="menuitem" aria-current={$page.url.pathname.startsWith('/homes') ? 'page' : undefined} on:click={handleNavLinkClick}>Browse All Listings</a>
						</li>
						<li class="nav-item" role="none">
							<a href="/sales" class="nav-link" class:active={$page.url.pathname.startsWith('/sales')} role="menuitem" aria-current={$page.url.pathname.startsWith('/sales') ? 'page' : undefined} on:click={handleNavLinkClick}>Recent Sales</a>
				</li>
						<li class="nav-item" role="none">
							<a href="/property-types/3-bedroom-homes" class="nav-link" class:active={$page.url.pathname.startsWith('/property-types')} role="menuitem" aria-current={$page.url.pathname.startsWith('/property-types') ? 'page' : undefined} on:click={handleNavLinkClick}>3 Bedroom Homes</a>
				</li>
						<li class="nav-item" role="none">
							<a href="/price-ranges/600k-800k" class="nav-link" class:active={$page.url.pathname.startsWith('/price-ranges')} role="menuitem" aria-current={$page.url.pathname.startsWith('/price-ranges') ? 'page' : undefined} on:click={handleNavLinkClick}>Homes $600K-$800K</a>
				</li>
					</ul>
				</div>
				
				<div class="nav-group">
					<h4 class="nav-group-title">Resources</h4>
					<ul class="nav-list" role="menubar">
						<li class="nav-item" role="none">
							<a href="/tools" class="nav-link" class:active={$page.url.pathname.startsWith('/tools')} role="menuitem" aria-current={$page.url.pathname.startsWith('/tools') ? 'page' : undefined} on:click={handleNavLinkClick}>Home Value Calculator</a>
				</li>
						<li class="nav-item" role="none">
							<a href="/market-intelligence" class="nav-link" class:active={$page.url.pathname.startsWith('/market-intelligence')} role="menuitem" aria-current={$page.url.pathname.startsWith('/market-intelligence') ? 'page' : undefined} on:click={handleNavLinkClick}>Market Data</a>
				</li>
						<li class="nav-item" role="none">
							<a href="/amenities" class="nav-link" class:active={$page.url.pathname.startsWith('/amenities')} role="menuitem" aria-current={$page.url.pathname.startsWith('/amenities') ? 'page' : undefined} on:click={handleNavLinkClick}>Amenities</a>
				</li>
						<li class="nav-item" role="none">
							<a href="/schools" class="nav-link" class:active={$page.url.pathname.startsWith('/schools')} role="menuitem" aria-current={$page.url.pathname.startsWith('/schools') ? 'page' : undefined} on:click={handleNavLinkClick}>Schools</a>
				</li>
						<li class="nav-item" role="none">
							<a href="/faq/hoa-fees" class="nav-link" class:active={$page.url.pathname.startsWith('/faq/hoa-fees')} role="menuitem" aria-current={$page.url.pathname.startsWith('/faq/hoa-fees') ? 'page' : undefined} on:click={handleNavLinkClick}>HOA Information</a>
		</li>
					</ul>
				</div>
				
				<div class="nav-group">
					<h4 class="nav-group-title">About</h4>
					<ul class="nav-list" role="menubar">
						<li class="nav-item" role="none">
							<a href="/about" class="nav-link" class:active={$page.url.pathname.startsWith('/about')} role="menuitem" aria-current={$page.url.pathname.startsWith('/about') ? 'page' : undefined} on:click={handleNavLinkClick}>About Dr. Jan</a>
		</li>
			</ul>
				</div>
			</div>
		</nav>
		
		<div class="nav-contact">
			<a href="tel:702-222-1964" class="contact-phone">
				<span class="phone-icon">📞</span>
				<span class="phone-text">702-222-1964</span>
			</a>
		</div>
		
		<button 
			class="mobile-menu-toggle" 
			aria-label="Toggle mobile menu"
			aria-expanded={mobileMenuOpen}
			aria-controls="nav-menu"
			on:click={toggleMobileMenu}
			on:keydown={handleNavKeydown}
		>
			<span class="hamburger" class:active={mobileMenuOpen}>
				<span class="hamburger-line"></span>
				<span class="hamburger-line"></span>
				<span class="hamburger-line"></span>
			</span>
		</button>
	</div>
</header>

<style>
	.navigation {
		background: white;
		box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
		position: sticky;
		top: 0;
		z-index: 1000;
		overflow: visible;
		backdrop-filter: blur(10px);
		will-change: transform;
	}

	/* Utility Bar Styling */
	.utility-bar {
		background: #1a365d;
		color: white;
		padding: 0.5rem 0;
		font-size: 0.8rem;
		position: relative;
		z-index: 1000;
	}

	.utility-container {
		max-width: 1600px;
		margin: 0 auto;
		padding: 0 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.utility-left {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	.social-links {
		display: flex;
		gap: 1rem;
	}

	.social-link {
		color: white;
		text-decoration: none;
		font-weight: bold;
		font-size: 0.9rem;
		transition: color 0.2s ease;
	}

	.social-link:hover {
		color: #3A8DDE;
	}

	.phone-utility {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-weight: 600;
	}

	.utility-right {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.language-dropdown {
		background: transparent;
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.3);
		padding: 0.25rem 0.5rem;
		border-radius: 3px;
		font-size: 0.8rem;
	}

	.sign-in-link {
		color: white;
		text-decoration: none;
		font-weight: 600;
		transition: color 0.2s ease;
	}

	.sign-in-link:hover {
		color: #3A8DDE;
	}

	.app-download-btn {
		background: #dc2626;
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 3px;
		font-weight: bold;
		font-size: 0.8rem;
		cursor: pointer;
		transition: background 0.2s ease;
	}

	.app-download-btn:hover {
		background: #b91c1c;
	}
	
	.nav-container {
		max-width: 1600px;
		margin: 0 auto;
		padding: 0 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 60px;
		overflow: visible;
		background: white;
		border-bottom: 1px solid #e2e8f0;
		position: relative;
		z-index: 999;
	}
	
	.nav-brand {
		flex-shrink: 0;
	}
	
	.brand-link {
		text-decoration: none;
		color: inherit;
		display: flex;
		align-items: center;
	}
	
	.brand-logo {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}
	
	
	.brand-text {
		display: flex;
		flex-direction: column;
		line-height: 1.1;
		justify-content: center;
	}
	
	.brand-name {
		font-size: 1.2rem;
		font-weight: 700;
		color: #1a365d;
		white-space: nowrap;
		letter-spacing: 0.5px;
	}
	
	.brand-tagline {
		font-size: 0.8rem;
		color: #4a5568;
		font-weight: 600;
		white-space: nowrap;
		letter-spacing: 0.3px;
	}
	
	.nav-menu {
		display: flex;
		align-items: center;
		overflow: visible;
	}
	
	.mobile-menu-toggle {
		display: none;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.5rem;
		border-radius: 4px;
		transition: background-color 0.2s ease;
	}
	
	.mobile-menu-toggle:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
	
	.mobile-menu-toggle:focus {
		outline: 2px solid var(--accent-color);
		outline-offset: 2px;
	}
	
	.hamburger {
		display: flex;
		flex-direction: column;
		width: 24px;
		height: 18px;
		justify-content: space-between;
	}
	
	.hamburger-line {
		width: 100%;
		height: 2px;
		background-color: var(--heading-color);
		transition: all 0.3s ease;
		border-radius: 1px;
	}
	
	.hamburger.active .hamburger-line:nth-child(1) {
		transform: rotate(45deg) translate(5px, 5px);
	}
	
	.hamburger.active .hamburger-line:nth-child(2) {
		opacity: 0;
	}
	
	.hamburger.active .hamburger-line:nth-child(3) {
		transform: rotate(-45deg) translate(7px, -6px);
	}
	
	/* Desktop Navigation - Berkshire Hathaway Style */
	.nav-list-desktop {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
		gap: 2rem;
		align-items: center;
		flex: 1;
		justify-content: center;
		flex-wrap: nowrap;
	}
	
	.nav-link-primary {
		background: var(--accent-color);
		color: white !important;
		padding: 0.4rem 0.8rem;
		border-radius: 5px;
		font-weight: 600;
		transition: all 0.3s ease;
		font-size: 0.85rem;
	}
	
	.nav-link-primary:hover {
		background: var(--accent-light);
		transform: translateY(-1px);
	}

	.nav-link-phone {
		background: #16B286;
		color: white !important;
		padding: 0.4rem 0.8rem;
		border-radius: 5px;
		font-weight: 600;
		transition: all 0.3s ease;
		font-size: 0.85rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.nav-link-phone:hover {
		background: #14A078;
		transform: translateY(-1px);
		color: white !important;
	}

	.phone-icon {
		font-size: 0.9rem;
	}

	.phone-number {
		font-weight: 700;
		letter-spacing: 0.5px;
	}

	/* Optimized Dropdown Styles */
	.nav-item-dropdown {
		position: relative;
	}

	.nav-dropdown-toggle {
		background: none;
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		border-radius: 4px;
		padding: 0.4rem 0.6rem;
	}

	.nav-dropdown-toggle:hover {
		color: var(--accent-color);
		background: rgba(58, 141, 222, 0.05);
	}

	.nav-dropdown-toggle:focus {
		outline: 2px solid var(--accent-color);
		outline-offset: 2px;
	}

	.nav-dropdown-toggle.active {
		color: var(--accent-color);
		background: rgba(58, 141, 222, 0.1);
	}

	.dropdown-arrow {
		font-size: 0.6rem;
		margin-left: 0.4rem;
		transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		pointer-events: none;
		color: white;
	}

	.nav-dropdown-toggle.active .dropdown-arrow {
		transform: rotate(180deg);
	}

	.nav-dropdown {
		position: absolute;
		top: calc(100% + 4px);
		left: 50%;
		transform: translateX(-50%) translateY(-5px);
		background: white;
		border: 1px solid #E2E8F0;
		border-radius: 8px;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05);
		min-width: 180px;
		opacity: 0;
		visibility: hidden;
		transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		z-index: 1002;
		list-style: none;
		margin: 0;
		padding: 0.5rem 0;
		white-space: nowrap;
		backdrop-filter: blur(10px);
		will-change: transform, opacity;
	}
	

	.nav-dropdown.active {
		opacity: 1;
		visibility: visible;
		transform: translateX(-50%) translateY(0);
	}

	.nav-dropdown li {
		margin: 0;
	}

	.nav-dropdown-link {
		display: block;
		padding: 0.75rem 1rem;
		color: #4A5568;
		text-decoration: none;
		transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
		font-size: 0.9rem;
		white-space: nowrap;
		border-radius: 4px;
		margin: 0 0.25rem;
		position: relative;
	}

	.nav-dropdown-link:hover {
		background: #F7F9FC;
		color: var(--accent-color);
		text-decoration: none;
		transform: translateX(2px);
	}

	.nav-dropdown-link:focus {
		background: #F7F9FC;
		color: var(--accent-color);
		outline: 2px solid var(--accent-color);
		outline-offset: -2px;
	}
	
	
	/* Mobile Navigation Groups */
	.nav-groups-mobile {
		display: none;
		padding: 1rem;
		background: white;
		border-top: 1px solid #E2E8F0;
	}
	
	.nav-groups {
		display: flex;
		gap: 2rem;
		align-items: flex-start;
	}
	
	.nav-group {
		flex: 1;
		min-width: 0;
	}
	
	.nav-group-title {
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--text-light);
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin: 0 0 0.75rem 0;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--tertiary-color);
	}
	
	.nav-list {
		display: flex;
		flex-direction: column;
		list-style: none;
		margin: 0;
		padding: 0;
		gap: 0.5rem;
	}
	
	.nav-item {
		position: relative;
	}
	
	.nav-link {
		text-decoration: none;
		color: white;
		font-weight: 600;
		font-size: 0.9rem;
		padding: 0.75rem 0;
		transition: all 0.2s ease;
		position: relative;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		white-space: nowrap;
		background: none;
		border: none;
		cursor: pointer;
	}
	
	.nav-link:hover {
		color: var(--accent-color);
	}
	
	.nav-link.active {
		color: var(--accent-color);
		font-weight: 600;
	}
	
	.nav-link.active::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 0;
		right: 0;
		height: 2px;
		background: var(--accent-color);
	}
	
	.nav-contact {
		flex-shrink: 0;
	}
	
	.contact-phone {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: var(--accent-color);
		color: white;
		padding: 0.75rem 1.5rem;
		border-radius: 25px;
		text-decoration: none;
		font-weight: 600;
		transition: all 0.3s ease;
		box-shadow: 0 2px 10px rgba(30, 58, 138, 0.2);
	}
	
	.contact-phone:hover {
		background: var(--accent-light);
		transform: translateY(-2px);
		box-shadow: 0 4px 15px rgba(30, 58, 138, 0.3);
	}
	
	.phone-icon {
		font-size: 1.1rem;
	}
	
	.phone-text {
		font-size: 1rem;
	}
	
	.mobile-menu-toggle {
		display: none;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.5rem;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 44px;
		height: 44px;
		border-radius: 4px;
		transition: background-color 0.2s ease;
	}
	
	.mobile-menu-toggle:hover {
		background-color: rgba(0, 0, 0, 0.05);
	}
	
	.mobile-menu-toggle:focus {
		outline: 2px solid var(--accent-color);
		outline-offset: 2px;
	}
	
	.hamburger {
		width: 25px;
		height: 3px;
		background: var(--heading-color);
		transition: all 0.3s ease;
		position: relative;
	}
	
	.hamburger::before,
	.hamburger::after {
		content: '';
		position: absolute;
		width: 25px;
		height: 3px;
		background: var(--heading-color);
		transition: all 0.3s ease;
	}
	
	.hamburger::before {
		top: -8px;
	}
	
	.hamburger::after {
		top: 8px;
	}
	
	.hamburger.active {
		background: transparent;
	}
	
	.hamburger.active::before {
		top: 0;
		transform: rotate(45deg);
	}
	
	.hamburger.active::after {
		top: 0;
		transform: rotate(-45deg);
	}
	
	@media (max-width: 1024px) {
		.nav-list-desktop {
			gap: 1rem;
		}
		
		.nav-list-desktop .nav-item:nth-child(n+7) {
			display: none;
		}
	}
	
	@media (max-width: 900px) {
		.nav-list-desktop {
			display: none;
		}
		
		.nav-groups-mobile {
			display: flex;
			flex-direction: column;
			gap: 1.5rem;
			padding: 1.5rem;
			transform: translateY(-10px);
			opacity: 0;
			transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		}
		
		.nav-menu.mobile-open .nav-groups-mobile {
			transform: translateY(0);
			opacity: 1;
		}
		
		.nav-group {
			width: 100%;
		}
		
		.nav-group-title {
			font-size: 1rem;
			margin-bottom: 0.75rem;
			font-weight: 600;
			color: var(--heading-color);
		}
		
		.nav-list {
			flex-direction: column;
			gap: 0.5rem;
		}
		
		.nav-link {
			padding: 0.75rem 1rem;
			font-size: 1rem;
			min-height: 44px;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			transition: all 0.2s ease;
			border-radius: 6px;
		}
		
		.nav-link:hover {
			background: rgba(58, 141, 222, 0.05);
			transform: translateX(4px);
		}
		
		.nav-link-phone {
			justify-content: center;
			font-size: 1.1rem;
			background: #16B286;
			color: white !important;
			margin: 0.5rem 0;
		}
		
		.nav-link-primary {
			justify-content: center;
			font-size: 1.1rem;
			background: var(--accent-color);
			color: white !important;
			margin: 0.5rem 0;
		}
	}
	
	/* iPhone specific optimizations */
	@media (max-width: 480px) {
		.nav-container {
			padding: 0 0.75rem;
			height: 55px;
		}
		
		.brand-logo {
			gap: 0.5rem;
		}
		
		.brand-name {
			font-size: 0.9rem;
		}
		
		.brand-tagline {
			font-size: 0.6rem;
		}
		
		.nav-groups-mobile {
			padding: 1rem;
			gap: 1.25rem;
		}
		
		.nav-link {
			padding: 0.875rem 1rem;
			font-size: 1.05rem;
			min-height: 48px;
		}
		
		.nav-link-phone {
			font-size: 1.15rem;
		}
		
		.nav-link-primary {
			font-size: 1.15rem;
		}
	}
	
	@media (max-width: 768px) {
		.nav-container {
			padding: 0 1rem;
			height: 60px;
		}
		
		.nav-menu {
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			background: white;
			box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
			transform: translateY(-100%);
			opacity: 0;
			visibility: hidden;
			transition: all 0.3s ease;
			display: block;
		}
		
		.nav-menu.mobile-open {
			transform: translateY(0);
			opacity: 1;
			visibility: visible;
		}
		
		.nav-contact {
			display: none;
		}
		
		.mobile-menu-toggle {
			display: block;
		}
		
		.brand-name {
			font-size: 1.1rem;
		}
		
		.brand-tagline {
			font-size: 0.7rem;
		}
		
		.nav-groups-mobile {
			flex-direction: column;
			padding: 2rem;
			gap: 1.5rem;
		}
		
		.nav-group {
			width: 100%;
		}
		
		.nav-list {
			flex-direction: column;
			gap: 0;
		}
		
		.nav-item {
			border-bottom: 1px solid var(--tertiary-color);
		}
		
		.nav-link {
			padding: 1rem 0;
			font-size: 1.1rem;
			min-height: 44px;
			display: flex;
			align-items: center;
		}
		
		.nav-item:last-child {
			border-bottom: none;
		}
		
		.nav-link {
			display: block;
			padding: 1rem 0;
			font-size: 1.1rem;
		}
		
		.nav-contact {
			display: none;
		}
		
		.mobile-menu-toggle {
			display: flex;
		}
		
		.brand-name {
			font-size: 1.1rem;
		}
		
		.brand-tagline {
			font-size: 0.7rem;
		}
	}
	
	@media (max-width: 480px) {
		.nav-container {
			height: 60px;
		}
		
		.brand-logo {
			gap: 0.5rem;
		}
		
		
		.brand-name {
			font-size: 1rem;
		}
		
		.brand-tagline {
			font-size: 0.65rem;
		}
	}
</style>
