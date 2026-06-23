/*
  ═══════════════════════════════════════════
  NEURAL ELEGANCE — CUSTOM CURSOR
  Dot + Ring cursor with magnetic hover effect
  ═══════════════════════════════════════════
*/

(function () {
  // Only enable on non-touch devices
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');

  if (!dot || !ring) return;

  let mouseX = 0;
  let mouseY = 0;
  let dotX = 0;
  let dotY = 0;
  let ringX = 0;
  let ringY = 0;

  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth follow animation
  function animateCursor() {
    // Dot follows closely
    dotX += (mouseX - dotX) * 0.2;
    dotY += (mouseY - dotY) * 0.2;
    dot.style.left = dotX + 'px';
    dot.style.top = dotY + 'px';

    // Ring follows with more lag
    ringX += (mouseX - ringX) * 0.08;
    ringY += (mouseY - ringY) * 0.08;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effects on interactive elements
  const interactiveElements = document.querySelectorAll(
    'a, button, .btn, .skill-item, .project-card, .glass-card, input, textarea, .certificate-card'
  );

  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('hover');
      ring.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('hover');
      ring.classList.remove('hover');
    });
  });

  // Click effect
  document.addEventListener('mousedown', () => {
    ring.classList.add('click');
  });
  document.addEventListener('mouseup', () => {
    ring.classList.remove('click');
  });

  // Hide when cursor leaves window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });

  // Magnetic effect on buttons
  const magneticElements = document.querySelectorAll('.btn, .socials-sidebar a, .contact-socials a, .scroll-top');

  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  // Re-observe dynamically added elements (MutationObserver)
  const observer = new MutationObserver(() => {
    const newInteractives = document.querySelectorAll(
      'a:not([data-cursor-bound]), button:not([data-cursor-bound]), .btn:not([data-cursor-bound]), .skill-item:not([data-cursor-bound]), .project-card:not([data-cursor-bound]), .glass-card:not([data-cursor-bound])'
    );

    newInteractives.forEach(el => {
      if (!el.hasAttribute('data-cursor-bound')) {
        el.setAttribute('data-cursor-bound', 'true');
        el.addEventListener('mouseenter', () => {
          dot.classList.add('hover');
          ring.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
          dot.classList.remove('hover');
          ring.classList.remove('hover');
        });
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
