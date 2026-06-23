/*
  ═══════════════════════════════════════════
  NEURAL ELEGANCE — MAIN SCRIPT
  Pure Vanilla JS — No jQuery
  ═══════════════════════════════════════════
*/

// ── Preloader ──
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('loaded');
    }, 800);
  }
});

// ── Dynamic Year ──
const yearEl = document.getElementById('currentYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Mobile Nav Toggle ──
const menuBtn = document.getElementById('menu');
const navMenu = document.getElementById('navMenu');

if (menuBtn && navMenu) {
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('fa-bars');
    menuBtn.classList.toggle('fa-xmark');
    navMenu.classList.toggle('nav-toggle');
  });
}

// ── Navbar Scroll Behavior ──
const navbar = document.getElementById('navbar');
const scrollTop = document.getElementById('scrollTop');
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = scrollY / docHeight;

  // Navbar compact on scroll
  if (navbar) {
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // Scroll to top button
  if (scrollTop) {
    if (scrollY > 300) {
      scrollTop.classList.add('active');
    } else {
      scrollTop.classList.remove('active');
    }
  }

  // Scroll progress bar
  if (scrollProgress) {
    scrollProgress.style.transform = `scaleX(${scrollPercent})`;
  }

  // Close mobile nav on scroll
  if (navMenu && navMenu.classList.contains('nav-toggle')) {
    navMenu.classList.remove('nav-toggle');
    if (menuBtn) {
      menuBtn.classList.add('fa-bars');
      menuBtn.classList.remove('fa-xmark');
    }
  }
});

// ── Scroll Spy with IntersectionObserver ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('header nav ul li a');

const observerOptions = {
  root: null,
  rootMargin: '-20% 0px -80% 0px',
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

// ── Smooth Scroll ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '#!') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const navHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ── Tab Change Title ──
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === 'visible') {
    document.title = "Rasheeque Ahammed Rahim | AI & Data Scientist";
    const favicon = document.getElementById('favicon');
    if (favicon) favicon.href = "assets/images/misc/favicon1.png";
  } else {
    document.title = "Come back! 👋";
    const favicon = document.getElementById('favicon');
    if (favicon) favicon.href = "assets/images/misc/favhand.png";
  }
});

// ── Typed.js Effect ──
if (document.querySelector('.typing-text')) {
  new Typed('.typing-text', {
    strings: [
      'Data Scientist',
      'AI Engineer',
      'ML Developer',
      'Computer Vision Engineer',
      'Business Analyst'
    ],
    loop: true,
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 1500,
  });
}

// ── Skills Rendering ──
function showSkills(skills) {
  const container = document.getElementById('skillsContainer');
  if (!container) return;

  let html = '';
  for (let category in skills) {
    html += `
      <div class="skill-category">
        <h3 class="category-title">${category}</h3>
        <div class="skills-grid">`;

    skills[category].forEach(skill => {
      html += `
          <div class="skill-item">
            <img src="${skill.icon}" alt="${skill.name}" loading="lazy" decoding="async" />
            <span>${skill.name}</span>
          </div>`;
    });

    html += `
        </div>
      </div>`;
  }

  container.innerHTML = html;
}

// ── Projects Rendering ──
function showProjects(projects) {
  const container = document.getElementById('projectsGrid');
  if (!container) return;

  let html = '';

  const categoryLabels = {
    'machine_learning': 'Machine Learning',
    'full_stack': 'Full Stack',
    'image_processing': 'Computer Vision',
    'data_science': 'Data Science',
    'web': 'Web Development'
  };

  projects.forEach(project => {
    const categoryLabel = categoryLabels[project.category] || project.category;

    html += `
      <div class="project-card" data-category="${project.category}">
        <div class="project-image">
          <img src="./assets/images/projects/${project.image}" alt="${project.name}" loading="lazy" decoding="async" />
          <div class="project-overlay">
            <a href="${project.links.view}" class="btn btn-small btn-primary" target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn btn-small btn-outline" target="_blank"><i class="fas fa-code"></i> Code</a>
          </div>
        </div>
        <div class="project-info">
          <span class="project-category">${categoryLabel}</span>
          <h3>${project.name}</h3>
          <p>${project.desc}</p>
        </div>
      </div>`;
  });

  container.innerHTML = html;
}

// ── Certificates Rendering ──
function showCertificates(certificates) {
  const container = document.getElementById('certificatesCarousel');
  if (!container) return;

  certificates.sort((a, b) => a.id - b.id);

  const mid = Math.ceil(certificates.length / 2);
  const row1Data = certificates.slice(0, mid);
  const row2Data = certificates.slice(mid);

  const createRow = (items, reverse = false) => {
    const repeated = [...items, ...items, ...items, ...items];

    let rowContent = repeated.map(cert => {
      let imageSrc = cert.image === 'placeholder.png'
        ? 'https://via.placeholder.com/300x200?text=Certificate'
        : `./assets/images/certificates/${cert.image}`;

      return `
        <div class="certificate-card">
          <img draggable="false"
            src="${imageSrc}"
            alt="${cert.name}"
            loading="lazy"
            decoding="async"
            onerror="this.onerror=null;this.src='https://via.placeholder.com/300x200?text=Certificate';" />
          <div class="overlay">
            <span class="cert-name">${cert.name}</span>
            <a href="${cert.links.view}" class="btn btn-small btn-primary" target="_blank">
              <i class="fas fa-eye"></i> View
            </a>
          </div>
        </div>`;
    }).join('');

    return `<div class="carousel-row ${reverse ? 'reverse' : ''}">${rowContent}</div>`;
  };

  container.innerHTML = createRow(row1Data, false) + createRow(row2Data, true);
}

// ── EmailJS Contact Form ──
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const statusEl = document.getElementById('formStatus');
    const submitBtn = this.querySelector('.form-submit');
    const originalText = submitBtn.innerHTML;

    // Loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    emailjs.init('user_TTDmetQLYgWCLzHTDgqxm');
    emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
      .then(function () {
        contactForm.reset();
        if (statusEl) {
          statusEl.className = 'form-status success';
          statusEl.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
        }
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        setTimeout(() => {
          if (statusEl) statusEl.className = 'form-status';
        }, 5000);
      }, function () {
        if (statusEl) {
          statusEl.className = 'form-status error';
          statusEl.textContent = '✗ Failed to send. Please try again or email me directly.';
        }
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      });
  });
}

// ── Counter Animation (for About stats) ──
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 1500;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + '+';
      }
    };

    updateCounter();
  });
}

// Trigger counters when about section comes into view
const aboutSection = document.getElementById('about');
if (aboutSection) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counterObserver.observe(aboutSection);
}

// ── Load Data ──
if (typeof skillsData !== 'undefined') showSkills(skillsData);
if (typeof projectsData !== 'undefined') showProjects(projectsData);
if (typeof certificatesData !== 'undefined') showCertificates(certificatesData);