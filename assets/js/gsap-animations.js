/*
  ═══════════════════════════════════════════
  NEURAL ELEGANCE — GSAP SCROLL ANIMATIONS
  Butter-smooth reveal effects using GSAP + ScrollTrigger
  ═══════════════════════════════════════════
*/

(function () {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  const defaultEase = 'power3.out';

  // Wait for all content (including images) to load
  window.addEventListener('load', function() {
    initAnimations();
    // Force refresh after a short delay to account for any reflows
    setTimeout(() => ScrollTrigger.refresh(), 500);
  });

  function initAnimations() {
    // ── Hero Entrance ──
    const heroTl = gsap.timeline({ delay: 0.2 });

    heroTl
      .fromTo('.hero-badge', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: defaultEase })
      .fromTo('.hero h1', { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: defaultEase }, '-=0.2')
      .fromTo('.hero .role', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: defaultEase }, '-=0.3')
      .fromTo('.hero p', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: defaultEase }, '-=0.2')
      .fromTo('.hero-buttons .btn', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.5, ease: defaultEase }, '-=0.2')
      .fromTo('.hero-shape', { autoAlpha: 0, scale: 0.85 }, { autoAlpha: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)' }, '-=0.6')
      .fromTo('.socials-sidebar a', { autoAlpha: 0, x: -15 }, { autoAlpha: 1, x: 0, stagger: 0.08, duration: 0.3, ease: defaultEase }, '-=0.4')
      .fromTo('.email-sidebar a', { autoAlpha: 0, x: 15 }, { autoAlpha: 1, x: 0, duration: 0.3, ease: defaultEase }, '-=0.3');

    // Helper for scroll reveals
    const revealElements = (selector, animProps, stagger = 0) => {
      const elements = gsap.utils.toArray(selector);
      if (!elements.length) return;
      
      elements.forEach(el => {
        gsap.fromTo(el, 
          { autoAlpha: 0, ...animProps },
          {
            scrollTrigger: {
              trigger: el,
              start: 'top 90%', // Trigger earlier to ensure visibility
              toggleActions: 'play none none none'
            },
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            stagger: stagger,
            duration: 0.7,
            ease: defaultEase,
            clearProps: "transform" // Clean up after to prevent layout issues
          }
        );
      });
    };

    // Apply reveals
    revealElements('.about-image', { x: -40 });
    revealElements('.about-text', { x: 40 });
    revealElements('.service-card', { y: 40 });
    revealElements('.timeline-item', { x: -25 });
    revealElements('.stat-item', { y: 20 });
    revealElements('.project-card', { y: 50 });
    revealElements('.carousel-container', { y: 30 });
    revealElements('.contact-info', { x: -30 });
    revealElements('.contact-form', { x: 30 });
    revealElements('.footer-grid', { y: 25 });

    // Handle section headers specifically for children stagger
    gsap.utils.toArray('.section-header').forEach(header => {
      const children = header.children;
      if (children.length > 0) {
        gsap.fromTo(children, 
          { autoAlpha: 0, y: 30 },
          {
            scrollTrigger: { trigger: header, start: 'top 90%' },
            autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.6, ease: defaultEase
          }
        );
      }
    });

    // Handle skill items specifically for stagger within category
    gsap.utils.toArray('.skill-category').forEach(category => {
      const items = category.querySelectorAll('.skill-item');
      if (items.length > 0) {
        gsap.fromTo(items, 
          { autoAlpha: 0, y: 25, scale: 0.92 },
          {
            scrollTrigger: { trigger: category, start: 'top 90%' },
            autoAlpha: 1, y: 0, scale: 1, stagger: 0.04, duration: 0.5, ease: 'back.out(1.2)'
          }
        );
      }
    });
    
    // Auto-refresh ScrollTrigger when DOM resizes (e.g., dynamic content)
    if (window.ResizeObserver) {
      new ResizeObserver(() => ScrollTrigger.refresh()).observe(document.body);
    }
  }
})();
