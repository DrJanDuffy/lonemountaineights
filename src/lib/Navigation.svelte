<script lang="ts">
import { page } from '$app/stores';

	let mobileMenuOpen = false;
	let activeDropdown: string | null = null;

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeMobileMenu();
			activeDropdown = null;
		}
	}

	function handleNavKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			toggleMobileMenu();
		}
	}

	function handleNavLinkClick() {
		closeMobileMenu();
	}

	function toggleDropdown(dropdownName: string) {
		activeDropdown = activeDropdown === dropdownName ? null : dropdownName;
	}

	function closeDropdown() {
		activeDropdown = null;
	}
</script>

<header class="navigation">
	<div class="nav-container">
		<div class="nav-brand">
			<a href="/" class="brand-link">
				<div class="brand-logo">
					<span class="logo-icon">🏔️</span>
					<div class="brand-text">
						<span class="brand-name">Dr. Jan Duffy</span>
						<span class="brand-tagline">Lone Mountain Heights Expert</span>
					</div>
				</div>
			</a>
		</div>
		
		<nav class="nav-menu" class:mobile-open={mobileMenuOpen} aria-label="Main navigation">
			<!-- Desktop Navigation - Clean with Dropdowns -->
			<ul class="nav-list nav-list-desktop" role="menubar">
				<li class="nav-item" role="none">
					<a href="/" class="nav-link" class:active={$page.url.pathname === '/'} role="menuitem" aria-current={$page.url.pathname === '/' ? 'page' : undefined}>Home</a>
				</li>
				
				<li class="nav-item nav-item-dropdown" role="none">
					<button 
						class="nav-link nav-dropdown-toggle" 
						class:active={activeDropdown === 'homes'}
						aria-expanded={activeDropdown === 'homes'}
						aria-haspopup="true"
						on:click={() => toggleDropdown('homes')}
						on:blur={() => setTimeout(closeDropdown, 150)}
					>
						Find Homes <span class="dropdown-arrow">▼</span>
					</button>
					<ul class="nav-dropdown" class:active={activeDropdown === 'homes'} role="menu">
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
							<a href="/neighborhoods" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>Micro-Neighborhoods</a>
						</li>
					</ul>
				</li>
				
				<li class="nav-item nav-item-dropdown" role="none">
					<button 
						class="nav-link nav-dropdown-toggle" 
						class:active={activeDropdown === 'learn'}
						aria-expanded={activeDropdown === 'learn'}
						aria-haspopup="true"
						on:click={() => toggleDropdown('learn')}
						on:blur={() => setTimeout(closeDropdown, 150)}
					>
						Learn <span class="dropdown-arrow">▼</span>
					</button>
					<ul class="nav-dropdown" class:active={activeDropdown === 'learn'} role="menu">
						<li role="none">
							<a href="/neighborhood" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>Neighborhood Guide</a>
						</li>
						<li role="none">
							<a href="/market-intelligence" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>Market Data</a>
						</li>
						<li role="none">
							<a href="/market-report" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>Market Report</a>
						</li>
						<li role="none">
							<a href="/tools" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>Real Estate Tools</a>
						</li>
						<li role="none">
							<a href="/valuation" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>Home Valuation</a>
						</li>
						<li role="none">
							<a href="/guide" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>Complete Guide</a>
						</li>
					</ul>
				</li>
				
				<li class="nav-item nav-item-dropdown" role="none">
					<button 
						class="nav-link nav-dropdown-toggle" 
						class:active={activeDropdown === 'community'}
						aria-expanded={activeDropdown === 'community'}
						aria-haspopup="true"
						on:click={() => toggleDropdown('community')}
						on:blur={() => setTimeout(closeDropdown, 150)}
					>
						Community <span class="dropdown-arrow">▼</span>
					</button>
					<ul class="nav-dropdown" class:active={activeDropdown === 'community'} role="menu">
						<li role="none">
							<a href="/amenities" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>Amenities</a>
						</li>
						<li role="none">
							<a href="/schools" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>Schools</a>
						</li>
						<li role="none">
							<a href="/blog" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>Blog & News</a>
						</li>
						<li role="none">
							<a href="/faq/hoa-fees" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>HOA Information</a>
						</li>
					</ul>
				</li>
				
				<li class="nav-item" role="none">
					<a href="/about" class="nav-link" class:active={$page.url.pathname.startsWith('/about')} role="menuitem" aria-current={$page.url.pathname.startsWith('/about') ? 'page' : undefined}>About</a>
				</li>
				
				<li class="nav-item" role="none">
					<a href="/contact" class="nav-link nav-link-primary" class:active={$page.url.pathname.startsWith('/contact')} role="menuitem" aria-current={$page.url.pathname.startsWith('/contact') ? 'page' : undefined}>Contact</a>
				</li>
			</ul>
			
			<!-- Mobile Navigation - Grouped -->
			<div class="nav-groups nav-groups-mobile">
				<div class="nav-group">
					<h4 class="nav-group-title">Main</h4>
					<ul class="nav-list" role="menubar">
						<li class="nav-item" role="none">
							<a href="/" class="nav-link" class:active={$page.url.pathname === '/'} role="menuitem" aria-current={$page.url.pathname === '/' ? 'page' : undefined} on:click={handleNavLinkClick}>Home</a>
						</li>
						<li class="nav-item" role="none">
							<a href="https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0yOTMx" class="nav-link" target="_blank" rel="noopener noreferrer" role="menuitem" aria-label="Search Homes in Lone Mountain Heights (opens in new tab)" on:click={handleNavLinkClick}>Search All Homes</a>
						</li>
					</ul>
				</div>
				
				<div class="nav-group">
					<h4 class="nav-group-title">Find Homes</h4>
					<ul class="nav-list" role="menubar">
						<li class="nav-item" role="none">
							<a href="/homes" class="nav-link" class:active={$page.url.pathname.startsWith('/homes')} role="menuitem" aria-current={$page.url.pathname.startsWith('/homes') ? 'page' : undefined} on:click={handleNavLinkClick}>Browse Listings</a>
						</li>
						<li class="nav-item" role="none">
							<a href="/sales" class="nav-link" class:active={$page.url.pathname.startsWith('/sales')} role="menuitem" aria-current={$page.url.pathname.startsWith('/sales') ? 'page' : undefined} on:click={handleNavLinkClick}>Recent Sales</a>
						</li>
						<li class="nav-item" role="none">
							<a href="/neighborhoods" class="nav-link" class:active={$page.url.pathname.startsWith('/neighborhoods')} role="menuitem" aria-current={$page.url.pathname.startsWith('/neighborhoods') ? 'page' : undefined} on:click={handleNavLinkClick}>Micro-Neighborhoods</a>
						</li>
					</ul>
				</div>
				
				<div class="nav-group">
					<h4 class="nav-group-title">Learn</h4>
					<ul class="nav-list" role="menubar">
						<li class="nav-item" role="none">
							<a href="/neighborhood" class="nav-link" class:active={$page.url.pathname.startsWith('/neighborhood')} role="menuitem" aria-current={$page.url.pathname.startsWith('/neighborhood') ? 'page' : undefined} on:click={handleNavLinkClick}>Neighborhood Guide</a>
						</li>
						<li class="nav-item" role="none">
							<a href="/market-intelligence" class="nav-link" class:active={$page.url.pathname.startsWith('/market-intelligence')} role="menuitem" aria-current={$page.url.pathname.startsWith('/market-intelligence') ? 'page' : undefined} on:click={handleNavLinkClick}>Market Data</a>
						</li>
						<li class="nav-item" role="none">
							<a href="/tools" class="nav-link" class:active={$page.url.pathname.startsWith('/tools')} role="menuitem" aria-current={$page.url.pathname.startsWith('/tools') ? 'page' : undefined} on:click={handleNavLinkClick}>Real Estate Tools</a>
						</li>
						<li class="nav-item" role="none">
							<a href="/valuation" class="nav-link" class:active={$page.url.pathname.startsWith('/valuation')} role="menuitem" aria-current={$page.url.pathname.startsWith('/valuation') ? 'page' : undefined} on:click={handleNavLinkClick}>Home Valuation</a>
						</li>
					</ul>
				</div>
				
				<div class="nav-group">
					<h4 class="nav-group-title">Community</h4>
					<ul class="nav-list" role="menubar">
						<li class="nav-item" role="none">
							<a href="/amenities" class="nav-link" class:active={$page.url.pathname.startsWith('/amenities')} role="menuitem" aria-current={$page.url.pathname.startsWith('/amenities') ? 'page' : undefined} on:click={handleNavLinkClick}>Amenities</a>
						</li>
						<li class="nav-item" role="none">
							<a href="/schools" class="nav-link" class:active={$page.url.pathname.startsWith('/schools')} role="menuitem" aria-current={$page.url.pathname.startsWith('/schools') ? 'page' : undefined} on:click={handleNavLinkClick}>Schools</a>
						</li>
						<li class="nav-item" role="none">
							<a href="/blog" class="nav-link" class:active={$page.url.pathname.startsWith('/blog')} role="menuitem" aria-current={$page.url.pathname.startsWith('/blog') ? 'page' : undefined} on:click={handleNavLinkClick}>Blog & News</a>
						</li>
					</ul>
				</div>
				
				<div class="nav-group">
					<h4 class="nav-group-title">About</h4>
					<ul class="nav-list" role="menubar">
						<li class="nav-item" role="none">
							<a href="/about" class="nav-link" class:active={$page.url.pathname.startsWith('/about')} role="menuitem" aria-current={$page.url.pathname.startsWith('/about') ? 'page' : undefined} on:click={handleNavLinkClick}>About Dr. Jan</a>
						</li>
						<li class="nav-item" role="none">
							<a href="/contact" class="nav-link" class:active={$page.url.pathname.startsWith('/contact')} role="menuitem" aria-current={$page.url.pathname.startsWith('/contact') ? 'page' : undefined} on:click={handleNavLinkClick}>Contact</a>
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
	}
	
	.nav-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 70px;
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
		gap: 1rem;
	}
	
	.logo-icon {
		font-size: 2rem;
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
		color: var(--heading-color);
		white-space: nowrap;
	}
	
	.brand-tagline {
		font-size: 0.75rem;
		color: var(--text-light);
		font-weight: 500;
		white-space: nowrap;
	}
	
	.nav-menu {
		display: flex;
		align-items: center;
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
	
	/* Desktop Navigation */
	.nav-list-desktop {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
		gap: 1.5rem;
		align-items: center;
	}
	
	.nav-link-primary {
		background: var(--accent-color);
		color: white !important;
		padding: 0.5rem 1rem;
		border-radius: 6px;
		font-weight: 600;
		transition: all 0.3s ease;
	}
	
	.nav-link-primary:hover {
		background: var(--accent-light);
		transform: translateY(-1px);
	}

	/* Dropdown Styles */
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
		transition: all 0.3s ease;
	}

	.nav-dropdown-toggle:hover {
		color: var(--accent-color);
	}

	.nav-dropdown-toggle.active {
		color: var(--accent-color);
	}

	.dropdown-arrow {
		font-size: 0.7rem;
		transition: transform 0.3s ease;
	}

	.nav-dropdown-toggle.active .dropdown-arrow {
		transform: rotate(180deg);
	}

	.nav-dropdown {
		position: absolute;
		top: 100%;
		left: 0;
		background: white;
		border: 1px solid #E2E8F0;
		border-radius: 8px;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
		min-width: 200px;
		opacity: 0;
		visibility: hidden;
		transform: translateY(-10px);
		transition: all 0.3s ease;
		z-index: 1000;
		list-style: none;
		margin: 0;
		padding: 0.5rem 0;
	}

	.nav-dropdown.active {
		opacity: 1;
		visibility: visible;
		transform: translateY(0);
	}

	.nav-dropdown li {
		margin: 0;
	}

	.nav-dropdown-link {
		display: block;
		padding: 0.75rem 1rem;
		color: #4A5568;
		text-decoration: none;
		transition: all 0.2s ease;
		font-size: 0.9rem;
	}

	.nav-dropdown-link:hover {
		background: #F7F9FC;
		color: var(--accent-color);
		text-decoration: none;
	}

	.nav-dropdown-link:focus {
		background: #F7F9FC;
		color: var(--accent-color);
		outline: none;
	}
	
	/* Mobile Navigation Groups */
	.nav-groups-mobile {
		display: none;
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
		color: var(--text-color);
		font-weight: 500;
		font-size: 1rem;
		padding: 0.5rem 0;
		transition: color 0.3s ease;
		position: relative;
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
			gap: 1rem;
		}
		
		.nav-group {
			width: 100%;
		}
		
		.nav-group-title {
			font-size: 0.9rem;
			margin-bottom: 0.5rem;
		}
		
		.nav-list {
			flex-direction: row;
			flex-wrap: wrap;
			gap: 1rem;
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
		
		.logo-icon {
			font-size: 1.5rem;
		}
		
		.brand-name {
			font-size: 1rem;
		}
		
		.brand-tagline {
			font-size: 0.65rem;
		}
	}
</style>
