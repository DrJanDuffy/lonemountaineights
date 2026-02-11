// Performance optimization utilities for Core Web Vitals

// Lazy loading implementation
export function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy-load');
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    // Observe all lazy-loaded images
    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img);
    });
  }
}

// Critical CSS loading
export function loadCriticalCSS() {
  const criticalCSS = document.getElementById('critical-css');
  if (!criticalCSS) {
    // Load critical CSS inline for fastest rendering
    const style = document.createElement('style');
    style.id = 'critical-css';
    style.textContent = `
      /* Critical CSS is loaded inline for performance */
      * { box-sizing: border-box; }
      body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
      .hero { background: linear-gradient(135deg, #F7F9FC 0%, #F4F1EB 100%); padding: 4rem 2rem; min-height: 80vh; }
      .hero-content { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; max-width: 1200px; margin: 0 auto; }
      .hero-text h1 { font-size: 3.5rem; font-weight: 700; color: #1A202C; margin: 0 0 1rem 0; line-height: 1.1; }
      .btn { padding: 1rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 600; transition: all 0.3s ease; display: inline-block; }
      .btn-primary { background: #3A8DDE; color: white; border: 2px solid #3A8DDE; }
      .btn-primary:hover { background: #5BA0E8; transform: translateY(-2px); }
      @media (max-width: 768px) { .hero-content { grid-template-columns: 1fr; } .hero-text h1 { font-size: 2.5rem; } }
    `;
    document.head.appendChild(style);
  }
}

// Preload critical resources
export function preloadCriticalResources() {
  // Preload critical fonts
  const fontPreloads = [
    'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2',
    'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiJ-Ek-_EeA.woff2',
  ];

  fontPreloads.forEach((fontUrl) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = fontUrl;
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });

  // Preload critical images
  const criticalImages = [
    '/images/hero/hero-las-vegas.png',
  ];

  criticalImages.forEach((imageUrl) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = imageUrl;
    link.as = 'image';
    document.head.appendChild(link);
  });
}

// Optimize images for Core Web Vitals
export function optimizeImages() {
  // Add loading="lazy" to non-critical images
  document.querySelectorAll('img:not([loading])').forEach((img, index) => {
    if (index > 0) {
      // Skip first image (likely LCP)
      img.loading = 'lazy';
    }
  });

  // Add proper alt text for accessibility
  document.querySelectorAll('img:not([alt])').forEach((img) => {
    img.alt = 'Lone Mountain Heights real estate image';
  });

  // Add width and height attributes to prevent layout shift
  document.querySelectorAll('img:not([width]):not([height])').forEach((img) => {
    img.addEventListener('load', () => {
      img.width = img.naturalWidth;
      img.height = img.naturalHeight;
    });
  });
}

// Minimize Cumulative Layout Shift (CLS)
export function preventLayoutShift() {
  // Reserve space for dynamic content
  const dynamicElements = document.querySelectorAll('[data-dynamic]');
  dynamicElements.forEach((el) => {
    el.style.minHeight = `${el.offsetHeight}px`;
  });

  // Add aspect ratio containers for images
  document.querySelectorAll('img').forEach((img) => {
    if (!img.parentElement.classList.contains('aspect-container')) {
      const container = document.createElement('div');
      container.className = 'aspect-container';
      container.style.aspectRatio = '16/9';
      container.style.overflow = 'hidden';
      img.parentNode.insertBefore(container, img);
      container.appendChild(img);
    }
  });
}

// Optimize JavaScript execution
export function optimizeJavaScript() {
  // Defer non-critical JavaScript
  const scripts = document.querySelectorAll('script[data-defer]');
  scripts.forEach((script) => {
    script.defer = true;
  });

  // Use requestIdleCallback for non-critical tasks
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      // Load non-critical features
      loadNonCriticalFeatures();
    });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(loadNonCriticalFeatures, 100);
  }
}

function loadNonCriticalFeatures() {
  // Load analytics, social media widgets, etc.
  console.log('Loading non-critical features...');
}

// Web Vitals monitoring
export function initWebVitals() {
  if ('web-vitals' in window) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log);
      getFID(console.log);
      getFCP(console.log);
      getLCP(console.log);
      getTTFB(console.log);
    });
  }
}

// Service Worker for caching
export function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}

// Initialize all performance optimizations
export function initPerformanceOptimizations() {
  // Load critical CSS immediately
  loadCriticalCSS();

  // Preload critical resources
  preloadCriticalResources();

  // Optimize images
  optimizeImages();

  // Prevent layout shift
  preventLayoutShift();

  // Initialize lazy loading
  initLazyLoading();

  // Optimize JavaScript execution
  optimizeJavaScript();

  // Initialize Web Vitals monitoring
  initWebVitals();

  // Initialize Service Worker
  initServiceWorker();
}

// Mobile-specific optimizations
export function optimizeForMobile() {
  // Add touch-friendly classes
  document.body.classList.add('touch-device');

  // Optimize viewport
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.content =
      'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
  }

  // Add mobile-specific CSS
  const mobileCSS = document.createElement('style');
  mobileCSS.textContent = `
    .touch-device .btn {
      min-height: 44px;
      min-width: 44px;
    }
    
    .touch-device .nav-link {
      padding: 12px 16px;
    }
    
    @media (max-width: 768px) {
      .hero-content {
        grid-template-columns: 1fr;
        gap: 2rem;
        text-align: center;
      }
      
      .cta-buttons {
        flex-direction: column;
        align-items: center;
      }
      
      .btn {
        width: 100%;
        max-width: 300px;
      }
    }
  `;
  document.head.appendChild(mobileCSS);
}

// Initialize all optimizations when DOM is ready
// Note: This should be called from onMount() in components
// Removed module-level execution to prevent SSR errors
