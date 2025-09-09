// Accessibility utilities for WCAG 2.1 AA compliance

/**
 * Initialize accessibility features
 */
export function initAccessibility() {
  // Skip to main content link
  createSkipLink();
  
  // Focus management
  initFocusManagement();
  
  // Keyboard navigation
  initKeyboardNavigation();
  
  // Screen reader announcements
  initScreenReaderSupport();
  
  // High contrast mode detection
  initHighContrastMode();
  
  // Reduced motion support
  initReducedMotion();
}

/**
 * Create skip to main content link
 */
function createSkipLink() {
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'skip-link';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: #000;
    color: #fff;
    padding: 8px;
    text-decoration: none;
    z-index: 1000;
    border-radius: 4px;
    transition: top 0.3s;
  `;
  
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '6px';
  });
  
  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);
}

/**
 * Initialize focus management
 */
function initFocusManagement() {
  // Trap focus in modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.querySelector('.modal[aria-hidden="false"]');
      if (modal) {
        closeModal(modal);
      }
    }
  });
  
  // Focus visible elements
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });
  
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
  });
}

/**
 * Initialize keyboard navigation
 */
function initKeyboardNavigation() {
  // Arrow key navigation for custom components
  document.addEventListener('keydown', (e) => {
    const { key, target } = e;
    
    // Handle arrow key navigation in custom dropdowns
    if (target.classList.contains('dropdown-trigger')) {
      handleDropdownNavigation(e);
    }
    
    // Handle arrow key navigation in custom tabs
    if (target.classList.contains('tab-trigger')) {
      handleTabNavigation(e);
    }
  });
}

/**
 * Handle dropdown navigation with arrow keys
 */
function handleDropdownNavigation(e) {
  const { key, target } = e;
  const dropdown = target.closest('.dropdown');
  const items = dropdown.querySelectorAll('.dropdown-item');
  const currentIndex = Array.from(items).indexOf(target);
  
  switch (key) {
    case 'ArrowDown':
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % items.length;
      items[nextIndex].focus();
      break;
    case 'ArrowUp':
      e.preventDefault();
      const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
      items[prevIndex].focus();
      break;
    case 'Enter':
    case ' ':
      e.preventDefault();
      target.click();
      break;
    case 'Escape':
      target.focus();
      break;
  }
}

/**
 * Handle tab navigation with arrow keys
 */
function handleTabNavigation(e) {
  const { key, target } = e;
  const tabList = target.closest('.tab-list');
  const tabs = tabList.querySelectorAll('.tab-trigger');
  const currentIndex = Array.from(tabs).indexOf(target);
  
  switch (key) {
    case 'ArrowRight':
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % tabs.length;
      tabs[nextIndex].focus();
      break;
    case 'ArrowLeft':
      e.preventDefault();
      const prevIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
      tabs[prevIndex].focus();
      break;
    case 'Home':
      e.preventDefault();
      tabs[0].focus();
      break;
    case 'End':
      e.preventDefault();
      tabs[tabs.length - 1].focus();
      break;
  }
}

/**
 * Initialize screen reader support
 */
function initScreenReaderSupport() {
  // Live region for announcements
  const liveRegion = document.createElement('div');
  liveRegion.setAttribute('aria-live', 'polite');
  liveRegion.setAttribute('aria-atomic', 'true');
  liveRegion.className = 'sr-only';
  liveRegion.id = 'live-region';
  document.body.appendChild(liveRegion);
  
  // Announce page changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.target.id === 'main-content') {
        announceToScreenReader('Page content updated');
      }
    });
  });
  
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    observer.observe(mainContent, { childList: true, subtree: true });
  }
}

/**
 * Announce message to screen readers
 */
export function announceToScreenReader(message) {
  const liveRegion = document.getElementById('live-region');
  if (liveRegion) {
    liveRegion.textContent = message;
    // Clear after announcement
    setTimeout(() => {
      liveRegion.textContent = '';
    }, 1000);
  }
}

/**
 * Initialize high contrast mode detection
 */
function initHighContrastMode() {
  if (window.matchMedia) {
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    
    const handleHighContrastChange = (e) => {
      if (e.matches) {
        document.body.classList.add('high-contrast');
      } else {
        document.body.classList.remove('high-contrast');
      }
    };
    
    highContrastQuery.addListener(handleHighContrastChange);
    handleHighContrastChange(highContrastQuery);
  }
}

/**
 * Initialize reduced motion support
 */
function initReducedMotion() {
  if (window.matchMedia) {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleReducedMotionChange = (e) => {
      if (e.matches) {
        document.body.classList.add('reduced-motion');
        // Disable animations
        const style = document.createElement('style');
        style.textContent = `
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        `;
        document.head.appendChild(style);
      } else {
        document.body.classList.remove('reduced-motion');
      }
    };
    
    reducedMotionQuery.addListener(handleReducedMotionChange);
    handleReducedMotionChange(reducedMotionQuery);
  }
}

/**
 * Close modal and return focus
 */
function closeModal(modal) {
  modal.setAttribute('aria-hidden', 'true');
  const trigger = document.querySelector(`[aria-controls="${modal.id}"]`);
  if (trigger) {
    trigger.focus();
  }
}

/**
 * Validate form accessibility
 */
export function validateFormAccessibility(form) {
  const errors = [];
  
  // Check for required labels
  const inputs = form.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    const id = input.id;
    const label = form.querySelector(`label[for="${id}"]`);
    
    if (!label && !input.getAttribute('aria-label') && !input.getAttribute('aria-labelledby')) {
      errors.push(`Input with id "${id}" is missing a label`);
    }
  });
  
  // Check for error associations
  const errorMessages = form.querySelectorAll('.error-message');
  errorMessages.forEach(error => {
    const inputId = error.getAttribute('aria-describedby');
    const input = form.querySelector(`#${inputId}`);
    
    if (!input) {
      errors.push(`Error message is not properly associated with an input`);
    }
  });
  
  return errors;
}

/**
 * Make element focusable
 */
export function makeFocusable(element) {
  if (!element.hasAttribute('tabindex')) {
    element.setAttribute('tabindex', '0');
  }
}

/**
 * Make element not focusable
 */
export function makeNotFocusable(element) {
  element.setAttribute('tabindex', '-1');
}

/**
 * Set focus with announcement
 */
export function setFocusWithAnnouncement(element, announcement) {
  element.focus();
  if (announcement) {
    announceToScreenReader(announcement);
  }
}

/**
 * Create accessible button
 */
export function createAccessibleButton(text, options = {}) {
  const button = document.createElement('button');
  button.textContent = text;
  button.type = options.type || 'button';
  
  if (options.ariaLabel) {
    button.setAttribute('aria-label', options.ariaLabel);
  }
  
  if (options.ariaDescribedBy) {
    button.setAttribute('aria-describedby', options.ariaDescribedBy);
  }
  
  if (options.ariaExpanded !== undefined) {
    button.setAttribute('aria-expanded', options.ariaExpanded);
  }
  
  if (options.ariaControls) {
    button.setAttribute('aria-controls', options.ariaControls);
  }
  
  if (options.className) {
    button.className = options.className;
  }
  
  return button;
}

/**
 * Create accessible link
 */
export function createAccessibleLink(text, href, options = {}) {
  const link = document.createElement('a');
  link.textContent = text;
  link.href = href;
  
  if (options.ariaLabel) {
    link.setAttribute('aria-label', options.ariaLabel);
  }
  
  if (options.target === '_blank') {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    link.setAttribute('aria-label', `${text} (opens in new tab)`);
  }
  
  if (options.className) {
    link.className = options.className;
  }
  
  return link;
}

/**
 * Initialize accessibility when DOM is ready
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAccessibility);
} else {
  initAccessibility();
}
