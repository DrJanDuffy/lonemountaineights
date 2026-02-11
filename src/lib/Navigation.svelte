<script>
import { page } from '$app/stores';
import { onMount } from 'svelte';
import { NAP } from '$lib/schema.js';

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
	<!-- Single Combined Navigation Bar -->
	<div class="nav-container">
		<!-- Brand Section -->
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
		
		<!-- Main Navigation Menu -->
		<nav class="nav-menu" class:mobile-open={mobileMenuOpen} aria-label="Main navigation">
			<!-- Desktop Navigation -->
			<ul class="nav-list nav-list-desktop" role="menubar">
				<!-- Search Dropdown -->
				<li class="nav-item nav-item-dropdown" role="none">
					<button 
						class="nav-link nav-dropdown-toggle" 
						class:active={activeDropdown === 'search'}
						on:click={() => toggleDropdown('search')}
						on:keydown={(e) => handleDropdownArrowKeys(e, 'search')}
						aria-expanded={activeDropdown === 'search'}
						aria-haspopup="true"
						role="menuitem"
					>
						SEARCH
						<span class="dropdown-arrow">▼</span>
					</button>
					{#if activeDropdown === 'search'}
						<div class="nav-dropdown" role="menu">
							<a href="/homes" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>Search All Homes</a>
							<a href="/homes?type=3-bedroom" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>3 Bedroom Homes</a>
							<a href="/price-ranges/600k-800k" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>Homes $600K-$800K</a>
							<a href="/valuation" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>Home Value Calculator</a>
						</div>
					{/if}
				</li>

				<!-- Buyers Dropdown -->
				<li class="nav-item nav-item-dropdown" role="none">
					<button 
						class="nav-link nav-dropdown-toggle" 
						class:active={activeDropdown === 'buyers'}
						on:click={() => toggleDropdown('buyers')}
						on:keydown={(e) => handleDropdownArrowKeys(e, 'buyers')}
						aria-expanded={activeDropdown === 'buyers'}
						aria-haspopup="true"
						role="menuitem"
					>
						BUYERS
						<span class="dropdown-arrow">▼</span>
					</button>
					{#if activeDropdown === 'buyers'}
						<div class="nav-dropdown" role="menu">
							<a href="/homes" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>Browse All Listings</a>
							<a href="/neighborhoods" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>Neighborhoods</a>
							<a href="/sales" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>Recent Sales</a>
							<a href="/market-report" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>Market Data</a>
						</div>
					{/if}
				</li>

				<!-- Sellers Dropdown -->
				<li class="nav-item nav-item-dropdown" role="none">
					<button 
						class="nav-link nav-dropdown-toggle" 
						class:active={activeDropdown === 'sellers'}
						on:click={() => toggleDropdown('sellers')}
						on:keydown={(e) => handleDropdownArrowKeys(e, 'sellers')}
						aria-expanded={activeDropdown === 'sellers'}
						aria-haspopup="true"
						role="menuitem"
					>
						SELLERS
						<span class="dropdown-arrow">▼</span>
					</button>
					{#if activeDropdown === 'sellers'}
						<div class="nav-dropdown" role="menu">
							<a href="/valuation" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>Home Valuation</a>
							<a href="/market-report" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>Market Analysis</a>
							<a href="/amenities" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>Local Amenities</a>
							<a href="/contact" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>Selling Process</a>
						</div>
					{/if}
				</li>

				<!-- Direct Links -->
				<li class="nav-item" role="none">
					<a href="/neighborhoods" class="nav-link" role="menuitem" on:click={handleNavLinkClick}>COMMUNITIES</a>
				</li>
				<li class="nav-item" role="none">
					<a href="/luxury" class="nav-link" role="menuitem" on:click={handleNavLinkClick}>LUXURY</a>
				</li>
				<li class="nav-item" role="none">
					<a href="/about" class="nav-link" role="menuitem" on:click={handleNavLinkClick}>AGENTS</a>
				</li>
				<li class="nav-item" role="none">
					<a href="/contact" class="nav-link" role="menuitem" on:click={handleNavLinkClick}>OFFICES</a>
				</li>

				<!-- About Us Dropdown -->
				<li class="nav-item nav-item-dropdown" role="none">
					<button 
						class="nav-link nav-dropdown-toggle" 
						class:active={activeDropdown === 'about'}
						on:click={() => toggleDropdown('about')}
						on:keydown={(e) => handleDropdownArrowKeys(e, 'about')}
						aria-expanded={activeDropdown === 'about'}
						aria-haspopup="true"
						role="menuitem"
					>
						ABOUT US
						<span class="dropdown-arrow">▼</span>
					</button>
					{#if activeDropdown === 'about'}
						<div class="nav-dropdown" role="menu">
							<a href="/about" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>About Dr. Jan</a>
							<a href="/careers" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>Careers</a>
							<a href="/blog" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>Blog</a>
							<a href="/contact" class="nav-dropdown-link" role="menuitem" on:click={handleNavLinkClick}>Contact</a>
						</div>
					{/if}
				</li>

				<!-- Direct Links -->
				<li class="nav-item" role="none">
					<a href="/careers" class="nav-link" role="menuitem" on:click={handleNavLinkClick}>CAREERS</a>
				</li>
				<li class="nav-item" role="none">
					<a href="/blog" class="nav-link" role="menuitem" on:click={handleNavLinkClick}>BLOG</a>
				</li>
			</ul>

			<!-- Contact Button -->
			<div class="nav-contact">
				<a href={NAP.telHref} class="contact-btn">
					📞 CALL {NAP.telDisplay}
				</a>
			</div>

			<!-- Mobile Menu Button -->
			<button 
				class="mobile-menu-btn" 
				on:click={toggleMobileMenu}
				on:keydown={handleNavKeydown}
				aria-expanded={mobileMenuOpen}
				aria-label="Toggle mobile menu"
			>
				<span class="hamburger-line"></span>
				<span class="hamburger-line"></span>
				<span class="hamburger-line"></span>
			</button>
		</nav>
	</div>

	<!-- Mobile Navigation Menu -->
	{#if mobileMenuOpen}
		<div class="mobile-menu" role="menu">
			<div class="mobile-menu-content">
				<!-- Mobile Navigation Links -->
				<div class="mobile-nav-section">
					<h3>Search & Browse</h3>
					<a href="/homes" class="mobile-nav-link" on:click={handleNavLinkClick}>Search All Homes</a>
					<a href="/neighborhoods" class="mobile-nav-link" on:click={handleNavLinkClick}>Neighborhoods</a>
					<a href="/sales" class="mobile-nav-link" on:click={handleNavLinkClick}>Recent Sales</a>
					<a href="/luxury" class="mobile-nav-link" on:click={handleNavLinkClick}>Luxury Homes</a>
				</div>

				<div class="mobile-nav-section">
					<h3>Services</h3>
					<a href="/valuation" class="mobile-nav-link" on:click={handleNavLinkClick}>Home Valuation</a>
					<a href="/market-report" class="mobile-nav-link" on:click={handleNavLinkClick}>Market Data</a>
					<a href="/amenities" class="mobile-nav-link" on:click={handleNavLinkClick}>Local Amenities</a>
					<a href="/schools" class="mobile-nav-link" on:click={handleNavLinkClick}>Schools</a>
				</div>

				<div class="mobile-nav-section">
					<h3>About</h3>
					<a href="/about" class="mobile-nav-link" on:click={handleNavLinkClick}>About Dr. Jan</a>
					<a href="/careers" class="mobile-nav-link" on:click={handleNavLinkClick}>Careers</a>
					<a href="/blog" class="mobile-nav-link" on:click={handleNavLinkClick}>Blog</a>
					<a href="/contact" class="mobile-nav-link" on:click={handleNavLinkClick}>Contact</a>
				</div>

				<!-- Mobile Contact -->
				<div class="mobile-contact">
					<a href={NAP.telHref} class="mobile-contact-btn" on:click={handleNavLinkClick}>
						📞 Call {NAP.telDisplay}
					</a>
				</div>
			</div>
		</div>
	{/if}
</header>

<style>
	/* Navigation Container */
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

	.nav-container {
		max-width: 1600px;
		margin: 0 auto;
		padding: 0 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 70px;
		overflow: visible;
		background: white;
		border-bottom: 1px solid #e2e8f0;
		position: relative;
		z-index: 999;
	}

	/* Brand Section */
	.nav-brand {
		flex-shrink: 0;
	}

	.brand-link {
		text-decoration: none;
		color: inherit;
		display: flex;
		align-items: center;
		gap: 0.75rem;
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
		font-size: 1.1rem;
		font-weight: 700;
		color: #1a365d;
		letter-spacing: 0.5px;
		text-transform: uppercase;
	}

	.brand-tagline {
		font-size: 0.7rem;
		color: #666;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.3px;
	}

	/* Main Navigation */
	.nav-menu {
		display: flex;
		align-items: center;
		gap: 2rem;
		flex: 1;
		justify-content: center;
	}

	.nav-list-desktop {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.nav-item {
		position: relative;
	}

	.nav-link {
		text-decoration: none;
		color: #1a365d;
		font-weight: 600;
		font-size: 0.85rem;
		padding: 0.5rem 0.75rem;
		transition: all 0.2s ease;
		position: relative;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		white-space: nowrap;
		background: none;
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.nav-link:hover {
		color: var(--accent-color);
		background: rgba(58, 141, 222, 0.1);
		border-radius: 4px;
	}

	.nav-dropdown-toggle {
		background: none;
		border: none;
		cursor: pointer;
	}

	.dropdown-arrow {
		font-size: 0.6rem;
		transition: transform 0.2s ease;
	}

	.nav-dropdown-toggle.active .dropdown-arrow {
		transform: rotate(180deg);
	}

	/* Dropdown Menus */
	.nav-dropdown {
		position: absolute;
		top: calc(100% + 8px);
		left: 0;
		background: white;
		border-radius: 8px;
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
		padding: 0.75rem 0;
		min-width: 200px;
		opacity: 0;
		visibility: hidden;
		transform: translateY(-10px);
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		z-index: 1001;
		border: 1px solid #e2e8f0;
		white-space: nowrap;
		backdrop-filter: blur(10px);
		will-change: transform, opacity;
	}

	.nav-dropdown.active {
		opacity: 1;
		visibility: visible;
		transform: translateY(0);
	}

	.nav-dropdown-link {
		display: block;
		padding: 0.75rem 1.25rem;
		color: #4a5568;
		text-decoration: none;
		font-size: 0.9rem;
		font-weight: 500;
		transition: all 0.2s ease;
		text-transform: none;
		letter-spacing: normal;
	}

	.nav-dropdown-link:hover {
		background: #f7fafc;
		color: var(--accent-color);
	}

	/* Contact Button */
	.nav-contact {
		flex-shrink: 0;
	}

	.contact-btn {
		background: var(--accent-color);
		color: white;
		padding: 0.75rem 1.5rem;
		border-radius: 6px;
		text-decoration: none;
		font-weight: 600;
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		transition: all 0.3s ease;
		white-space: nowrap;
	}

	.contact-btn:hover {
		background: var(--accent-light);
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(58, 141, 222, 0.3);
	}

	/* Mobile Menu Button */
	.mobile-menu-btn {
		display: none;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 30px;
		height: 30px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
	}

	.hamburger-line {
		width: 20px;
		height: 2px;
		background: #1a365d;
		margin: 2px 0;
		transition: all 0.3s ease;
	}

	.mobile-menu-btn[aria-expanded="true"] .hamburger-line:nth-child(1) {
		transform: rotate(45deg) translate(5px, 5px);
	}

	.mobile-menu-btn[aria-expanded="true"] .hamburger-line:nth-child(2) {
		opacity: 0;
	}

	.mobile-menu-btn[aria-expanded="true"] .hamburger-line:nth-child(3) {
		transform: rotate(-45deg) translate(7px, -6px);
	}

	/* Mobile Menu */
	.mobile-menu {
		display: none;
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background: white;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		border-top: 1px solid #e2e8f0;
		z-index: 1000;
	}

	.mobile-menu-content {
		padding: 2rem 1rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	.mobile-nav-section {
		margin-bottom: 2rem;
	}

	.mobile-nav-section h3 {
		font-size: 1rem;
		font-weight: 600;
		color: #1a365d;
		margin-bottom: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.mobile-nav-link {
		display: block;
		padding: 0.75rem 0;
		color: #4a5568;
		text-decoration: none;
		font-size: 0.95rem;
		font-weight: 500;
		border-bottom: 1px solid #f1f5f9;
		transition: color 0.2s ease;
	}

	.mobile-nav-link:hover {
		color: var(--accent-color);
	}

	.mobile-nav-link:last-child {
		border-bottom: none;
	}

	.mobile-contact {
		margin-top: 2rem;
		padding-top: 2rem;
		border-top: 2px solid #e2e8f0;
	}

	.mobile-contact-btn {
		display: block;
		background: var(--accent-color);
		color: white;
		padding: 1rem;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 600;
		text-align: center;
		font-size: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		transition: all 0.3s ease;
	}

	.mobile-contact-btn:hover {
		background: var(--accent-light);
		transform: translateY(-1px);
	}

	/* Responsive Design */
	@media (max-width: 1024px) {
		.nav-container {
			padding: 0 0.75rem;
			height: 65px;
		}

		.nav-list-desktop {
			gap: 1rem;
		}

		.nav-link {
			font-size: 0.8rem;
			padding: 0.4rem 0.6rem;
		}

		.contact-btn {
			padding: 0.6rem 1.2rem;
			font-size: 0.8rem;
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
			border-top: 1px solid #e2e8f0;
			z-index: 1000;
			display: none;
		}

		.nav-menu.mobile-open {
			display: block;
		}

		.nav-list-desktop {
			display: none;
		}

		.mobile-menu-btn {
			display: flex;
		}

		.mobile-menu {
			display: block;
		}

		.brand-name {
			font-size: 1rem;
		}

		.brand-tagline {
			font-size: 0.65rem;
		}

		.contact-btn {
			display: none;
		}
	}

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
	}
</style>