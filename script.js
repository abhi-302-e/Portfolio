/**
 * EDULAKANTI ABHISHEK - ADVANCED PORTFOLIO INTERACTION ENGINE
 * Features: Interactive Particle Canvas, Developer CLI Terminal, ATS Resume Modal,
 * Dynamic Typing Effect, Project Filtering, and Toast Feedback System.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Footer Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile Navigation Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('mobile-open')) {
          icon.className = 'fa-solid fa-xmark';
        } else {
          icon.className = 'fa-solid fa-bars-staggered';
        }
      }
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        const icon = menuToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars-staggered';
      });
    });
  }

  // 3. Scroll Spy for Active Nav Item
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a.nav-link');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navItems.forEach(item => {
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', highlightNavOnScroll);

  // 4. Hero Subtitle Typing Effect
  const roles = [
    'Scalable Systems & Full-Stack Apps',
    'Robust MySQL Relational Architectures',
    'Algorithmic Solutions & LeetCode (150+)',
    'IoT Sensor Telemetry & Embedded C'
  ];
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typedEl = document.getElementById('typedRole');

  function typeRole() {
    if (!typedEl) return;
    const current = roles[roleIdx];

    if (isDeleting) {
      typedEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typedEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === current.length) {
      typeSpeed = 2200; // Pause at full text
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 400; // Pause before typing next
    }

    setTimeout(typeRole, typeSpeed);
  }
  setTimeout(typeRole, 600);

  // 5. Ambient Particle Canvas Animation
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(45, Math.floor(width / 35));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1,
        color: i % 2 === 0 ? 'rgba(99, 102, 241, 0.45)' : 'rgba(6, 182, 212, 0.45)'
      });
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      requestAnimationFrame(renderParticles);
    }
    renderParticles();
  }

  // 6. Project Filtering System
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'modal-pop 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 8. Project Architecture Case Study Modals
  const projectData = {
    biteswift: {
      title: 'BiteSwift — End-to-End Food Ordering Platform',
      body: `
        <div style="font-family: var(--font-sans); line-height: 1.7;">
          <h4 style="color: var(--accent-secondary-light); margin-bottom: 8px;">System Architecture & Overview</h4>
          <p>BiteSwift is designed as a decoupled client-server architecture with an asynchronous Node.js and Express backend handling catalog filtering, customer session verification, and simulated real-time order progression.</p>
          
          <div style="background: rgba(0,0,0,0.4); padding: 16px; border-radius: 8px; border: 1px solid var(--border-subtle); margin: 16px 0; font-family: var(--font-mono); font-size: 0.82rem; color: #38bdf8;">
            [Browser / Client] 
                 &uarr;&darr; REST / JSON
            [Express Gateway & Auth Middleware]
                 &uarr;&darr; Controller Dispatch
            [Menu & Cart State Engine] &harr; [Order Lifecycle Tracker]
          </div>

          <h4 style="color: #ffffff; margin: 16px 0 8px;">Key Engineering Highlights:</h4>
          <ul style="margin-left: 20px; color: #cbd5e1;">
            <li><strong>State Management:</strong> Implemented persistent local cart storage with quantity synchronizers and item modifiers.</li>
            <li><strong>RESTful API Design:</strong> Structured clean endpoints for <code>/api/restaurants</code>, <code>/api/cart</code>, and <code>/api/orders/checkout</code>.</li>
            <li><strong>Responsive UI:</strong> Mobile-first checkout experience with micro-animations and zero dependency UI widgets.</li>
          </ul>

          <h4 style="color: #ffffff; margin: 16px 0 8px;">Tech Stack:</h4>
          <p style="color: var(--text-muted);">Node.js &bull; Express &bull; Modern JavaScript (ES6+) &bull; HTML5 &bull; CSS3 Custom Properties</p>
        </div>
      `
    },
    medicare: {
      title: 'MediCare — Hospital Management & Clinical Database System',
      body: `
        <div style="font-family: var(--font-sans); line-height: 1.7;">
          <h4 style="color: var(--accent-secondary-light); margin-bottom: 8px;">Relational Database Design (3NF)</h4>
          <p>MediCare addresses healthcare data redundancy, inconsistent doctor scheduling, and disparate invoice generation through a rigorously normalized relational model.</p>
          
          <div style="background: rgba(0,0,0,0.4); padding: 16px; border-radius: 8px; border: 1px solid var(--border-subtle); margin: 16px 0; font-family: var(--font-mono); font-size: 0.82rem; color: #34d399;">
            [Patients Table] (1) &mdash;&mdash;&lt; (N) [Appointments] &gt;&mdash;&mdash; (1) [Doctors Table]
                                               |
                                        (1) &mdash;&mdash;&lt; (N) [Medical Bills / Invoices]
          </div>

          <h4 style="color: #ffffff; margin: 16px 0 8px;">Key Engineering Highlights:</h4>
          <ul style="margin-left: 20px; color: #cbd5e1;">
            <li><strong>Database Normalization:</strong> Decomposed schemas up to 3rd Normal Form (3NF), mitigating insertion, deletion, and update anomalies.</li>
            <li><strong>Complex SQL Queries:</strong> Engineered multi-table <code>INNER JOIN</code> and <code>LEFT JOIN</code> queries for aggregated patient billing and physician appointment summaries.</li>
            <li><strong>Integrity Guarantees:</strong> Enforced primary keys, foreign key cascading constraints, and indexation on frequently queried patient IDs and appointment dates.</li>
          </ul>

          <h4 style="color: #ffffff; margin: 16px 0 8px;">Tech Stack:</h4>
          <p style="color: var(--text-muted);">MySQL &bull; Relational Schema Architecture &bull; SQL Optimization &bull; Database Views</p>
        </div>
      `
    },
    aegisgas: {
      title: 'AegisGas — Smart IoT Fire & Hazardous Gas Detection System',
      body: `
        <div style="font-family: var(--font-sans); line-height: 1.7;">
          <h4 style="color: var(--accent-secondary-light); margin-bottom: 8px;">Hardware-Software Telemetry Architecture</h4>
          <p>AegisGas protects industrial labs and residential spaces by sampling ambient air pollutants (LPG, methane, smoke) and infrared flame signatures with sub-second interrupt processing.</p>
          
          <div style="background: rgba(0,0,0,0.4); padding: 16px; border-radius: 8px; border: 1px solid var(--border-subtle); margin: 16px 0; font-family: var(--font-mono); font-size: 0.82rem; color: #f59e0b;">
            [MQ-2 Gas Sensor & Flame Sensor] 
                 &darr; Analog/Digital Threshold Pin
            [Embedded Microcontroller Unit]
                 &darr; Interrupt Service Routine
            [High-Decibel Siren] + [Visual LED Alarm] + [Telemetry Dispatch]
          </div>

          <h4 style="color: #ffffff; margin: 16px 0 8px;">Key Engineering Highlights:</h4>
          <ul style="margin-left: 20px; color: #cbd5e1;">
            <li><strong>Fast Hazard Detection:</strong> Sub-second response threshold triggering when ppm levels exceed safety limits.</li>
            <li><strong>Fail-Safe Logic:</strong> Independent power redundancy and audible sirens that trigger even without network connectivity.</li>
            <li><strong>Hardware-Software Calibration:</strong> Adjusted sensor analog sensitivity to filter out false positives while maintaining zero-delay trigger accuracy.</li>
          </ul>

          <h4 style="color: #ffffff; margin: 16px 0 8px;">Tech Stack:</h4>
          <p style="color: var(--text-muted);">Microcontroller Logic &bull; MQ-2 Gas Sensor &bull; Flame Sensor &bull; Embedded C &bull; Safety Telemetry</p>
        </div>
      `
    }
  };

  const projectModal = document.getElementById('projectModal');
  const projectModalTitle = document.getElementById('projectModalTitle');
  const projectModalContent = document.getElementById('projectModalContent');
  const closeProjectModalBtn = document.getElementById('closeProjectModalBtn');

  document.querySelectorAll('.project-details-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pKey = btn.dataset.project;
      if (projectData[pKey]) {
        projectModalTitle.textContent = projectData[pKey].title;
        projectModalContent.innerHTML = projectData[pKey].body;
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeProjectModalBtn) {
    closeProjectModalBtn.addEventListener('click', () => {
      projectModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  // 9. ATS Resume Modal Handlers
  const resumeModal = document.getElementById('resumeModal');
  const openResumeBtn = document.getElementById('openResumeBtn');
  const viewResumeHeroBtn = document.getElementById('viewResumeHeroBtn');
  const openResumeBottomBtn = document.getElementById('openResumeBottomBtn');
  const closeResumeBtn = document.getElementById('closeResumeBtn');
  const printResumeBtn = document.getElementById('printResumeBtn');

  function openResumeModal() {
    if (resumeModal) {
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResumeModal() {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  if (openResumeBtn) openResumeBtn.addEventListener('click', openResumeModal);
  if (viewResumeHeroBtn) viewResumeHeroBtn.addEventListener('click', openResumeModal);
  if (openResumeBottomBtn) openResumeBottomBtn.addEventListener('click', openResumeModal);
  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeResumeModal);

  // Print / Save as PDF
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Close modals on overlay backdrop click
  window.addEventListener('click', (e) => {
    if (e.target === resumeModal) closeResumeModal();
    if (e.target === projectModal) {
      projectModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // Close modals on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeResumeModal();
      if (projectModal) {
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    }
  });

  // 10. Copy-to-Clipboard with Toast Feedback
  function showToast(message, icon = 'fa-circle-check') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid ${icon}" style="color: #10b981;"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.dataset.copy;
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        }).catch(() => {
          showToast('Failed to copy to clipboard', 'fa-triangle-exclamation');
        });
      }
    });
  });

  // 11. Contact Form Handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('submitFormBtn');
      const senderName = document.getElementById('senderName').value;
      const senderEmail = document.getElementById('senderEmail').value;
      const originalText = submitBtn.innerHTML;

      // Show loading indicator
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending message...`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
        showToast(`Thank you, ${senderName}! Your message has been routed to Abhishek's inbox.`);
      }, 1000);
    });
  }
});
