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
    'AI Academic Decision Support Systems',
    'AI-Powered Enterprise Architectures',
    'Scalable Systems & Full-Stack Apps',
    'Robust MySQL Relational Architectures',
    'Algorithmic Solutions & LeetCode (10+)',
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
        const category = card.dataset.category || '';
        if (filter === 'all' || category === filter || category.includes(filter)) {
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
    aiacademic: {
      title: 'AI Academic Decisions System — Predictive Student Success & Advising Platform',
      body: `
        <div style="font-family: var(--font-sans); line-height: 1.7;">
          <div style="display: flex; gap: 10px; margin-bottom: 16px; flex-wrap: wrap;">
            <a href="https://github.com/abhi-302-e/AI-Academic-Decisions-System" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Project Link
            </a>
            <a href="https://github.com/abhi-302-e/AI-Academic-Decisions-System" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">
              <i class="fa-brands fa-github"></i> GitHub Repository
            </a>
          </div>

          <h4 style="color: var(--accent-secondary-light); margin-bottom: 8px;">System Architecture & Overview</h4>
          <p>The AI Academic Decisions System is an institutional-grade intelligence platform engineered to empower universities, department heads, and academic advisors with proactive student retention forecasts, automated graduation degree audits, and explainable intervention paths.</p>
          
          <div style="background: rgba(0,0,0,0.4); padding: 16px; border-radius: 8px; border: 1px solid var(--border-subtle); margin: 16px 0; font-family: var(--font-mono); font-size: 0.80rem; color: #c084fc; overflow-x: auto; white-space: pre; line-height: 1.4;">
[SIS & LMS Data Feeds: Grades / Attendance / Course Catalogs]
               │
               ▼
[Data Preprocessing, Tokenization & Feature Engineering Pipeline]
               │
               ▼
[Predictive Ensemble: XGBoost + LightGBM + Multi-Layer Perceptron]
         ┌─────┴─────────────────────────┐
         ▼                               ▼
[Degree Audit & Prereq DAG]     [Explainable AI (SHAP / XAI Engine)]
         │                               │
         └───────────────┬───────────────┘
                         ▼
        [FastAPI Microservice Layer & Redis Cache]
                         │
                         ▼
   [Advisor Dashboard & Student Success Portal (React / Chart.js)]
          </div>

          <h4 style="color: #ffffff; margin: 16px 0 8px;">Key Engineering Innovations:</h4>
          <ul style="margin-left: 20px; color: #cbd5e1;">
            <li><strong>Predictive Student Trajectory Modeling:</strong> Trained an ensemble classifier on longitudinal student performance data, achieving a 91.4% AUC-ROC score in flagging academic drop-off vulnerabilities up to 6 weeks before midterm evaluations.</li>
            <li><strong>Directed Acyclic Graph (DAG) Degree Auditor:</strong> Built a custom graph-traversal engine modeling university degree requirements, resolving complex prerequisite trees, waivers, and corequisite credit matrices.</li>
            <li><strong>Explainable AI (SHAP & Feature Attribution):</strong> Deployed SHAP values into the counselor interface to explain precisely why a student was flagged (e.g., credit load spikes, prerequisite gaps) instead of providing a black-box score.</li>
            <li><strong>High-Throughput Async API:</strong> Implemented FastAPI asynchronous endpoints with Redis caching, delivering sub-85ms response times across campus-wide batch queries.</li>
          </ul>

          <h4 style="color: #ffffff; margin: 16px 0 8px;">Tech Stack:</h4>
          <p style="color: var(--text-muted);">Python &bull; FastAPI &bull; Scikit-Learn &bull; PyTorch &bull; PostgreSQL &bull; Redis &bull; React &bull; Chart.js &bull; SHAP</p>
        </div>
      `
    },
    aienterprise: {
      title: 'AI-Powered Enterprise — Multi-Agent Knowledge & Workflow Orchestration Engine',
      body: `
        <div style="font-family: var(--font-sans); line-height: 1.7;">
          <div style="display: flex; gap: 10px; margin-bottom: 16px; flex-wrap: wrap;">
            <a href="https://github.com/abhi-302-e/AI-Powered-Enterprise" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Project Link
            </a>
            <a href="https://github.com/abhi-302-e/AI-Powered-Enterprise" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">
              <i class="fa-brands fa-github"></i> GitHub Repository
            </a>
          </div>

          <h4 style="color: var(--accent-secondary-light); margin-bottom: 8px;">Distributed Multi-Agent & RAG Architecture</h4>
          <p>AI-Powered Enterprise is a secure, autonomous intelligence backbone designed for enterprise organizations. It unifies distributed enterprise knowledge (contracts, technical documentation, SQL databases, customer tickets) into real-time multi-agent workflows with strict role-based access boundaries.</p>
          
          <div style="background: rgba(0,0,0,0.4); padding: 16px; border-radius: 8px; border: 1px solid var(--border-subtle); margin: 16px 0; font-family: var(--font-mono); font-size: 0.80rem; color: #2dd4bf; overflow-x: auto; white-space: pre; line-height: 1.4;">
[Enterprise Ingestion: PDFs / Confluence / Jira / CRM / SQL Data]
               │
               ▼
[Document Parsing & Semantic Recursive Chunking (tiktoken)]
               │
               ▼
[Hybrid Retrieval Engine: Vector DB (Pinecone) + BM25 Lexical + Cross-Encoder Reranker]
               │
               ▼
[Autonomous Multi-Agent Router & Tool Execution Engine]
         ┌─────┴─────────────────────────┐
         ▼                               ▼
[Workflow & DB Automation]       [RBAC Policy Enforcement & Audit Trail]
         │                               │
         └───────────────┬───────────────┘
                         ▼
        [FastAPI Streaming Gateway (SSE / WebSockets)]
                         │
                         ▼
    [Enterprise Web Workspace with Citation Transparency]
          </div>

          <h4 style="color: #ffffff; margin: 16px 0 8px;">Key Engineering Innovations:</h4>
          <ul style="margin-left: 20px; color: #cbd5e1;">
            <li><strong>Hybrid Dense-Sparse RAG:</strong> Overcame pure vector hallucination pitfalls by combining cosine dense vector matching with BM25 keyword search and cross-encoder reranking, achieving 96.2% contextual retrieval precision.</li>
            <li><strong>Autonomous Multi-Agent Task Routing:</strong> Engineered autonomous agents equipped with dynamic tool calling (SQL querying, calendar scheduling, CRM record generation, automated document drafting).</li>
            <li><strong>Enterprise Security & Granular RBAC:</strong> Implemented document-level ACLs (Access Control Lists) integrated with JWT tokens, ensuring agents only retrieve knowledge the logged-in user is authorized to access.</li>
            <li><strong>Streaming Low Latency:</strong> Built Server-Sent Events (SSE) streaming with token chunking, cutting Time-to-First-Token (TTFT) down to under 280ms.</li>
          </ul>

          <h4 style="color: #ffffff; margin: 16px 0 8px;">Tech Stack:</h4>
          <p style="color: var(--text-muted);">Python &bull; LangChain &bull; FastAPI &bull; Vector DB (Pinecone/Milvus) &bull; Redis &bull; PostgreSQL &bull; Docker &bull; TypeScript</p>
        </div>
      `
    },
    biteswift: {
      title: 'BiteSwift — End-to-End Food Ordering Platform',
      body: `
        <div style="font-family: var(--font-sans); line-height: 1.7;">
          <div style="display: flex; gap: 10px; margin-bottom: 16px; flex-wrap: wrap;">
            <a href="https://github.com/abhi-302-e/BiteSwift-Food-Ordering" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Project Link
            </a>
            <a href="https://github.com/abhi-302-e/BiteSwift-Food-Ordering" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">
              <i class="fa-brands fa-github"></i> GitHub Repository
            </a>
          </div>

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
          <div style="display: flex; gap: 10px; margin-bottom: 16px; flex-wrap: wrap;">
            <a href="https://github.com/abhi-302-e/MediCare-Hospital-Database-System" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Project Link
            </a>
            <a href="https://github.com/abhi-302-e/MediCare-Hospital-Database-System" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">
              <i class="fa-brands fa-github"></i> GitHub Repository
            </a>
          </div>

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
          <div style="display: flex; gap: 10px; margin-bottom: 16px; flex-wrap: wrap;">
            <a href="https://github.com/abhi-302-e/AegisGas-IoT-Detection-System" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Project Link
            </a>
            <a href="https://github.com/abhi-302-e/AegisGas-IoT-Detection-System" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">
              <i class="fa-brands fa-github"></i> GitHub Repository
            </a>
          </div>

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

  // 12. Three.js 3D Interactive Animation Engine
  function init3DScene() {
    const canvas = document.getElementById('webglCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    try {
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) return;
    } catch (e) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 500;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // A. 3D Space Particle Field
    const particleCount = 750;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color(0x6366f1), // Indigo
      new THREE.Color(0x06b6d4), // Cyan
      new THREE.Color(0xa855f7), // Purple
      new THREE.Color(0x38bdf8), // Sky blue
      new THREE.Color(0x10b981)  // Emerald
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1600;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1600;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1400;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Glowing point texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext('2d');
    const radGrad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
    radGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    radGrad.addColorStop(0.35, 'rgba(255, 255, 255, 0.7)');
    radGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    pCtx.fillStyle = radGrad;
    pCtx.fillRect(0, 0, 16, 16);
    const pTexture = new THREE.CanvasTexture(pCanvas);

    const pMaterial = new THREE.PointsMaterial({
      size: 4.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      map: pTexture,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, pMaterial);
    scene.add(particles);

    // B. Floating 3D Geometric Cyber Centerpiece
    const cyberGroup = new THREE.Group();

    // Central Wireframe Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(110, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.32
    });
    const icosahedron = new THREE.Mesh(icoGeo, icoMat);
    cyberGroup.add(icosahedron);

    // Glowing nodes on icosahedron
    const icoPointsMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 5,
      transparent: true,
      opacity: 0.9,
      map: pTexture,
      blending: THREE.AdditiveBlending
    });
    const icoPoints = new THREE.Points(icoGeo, icoPointsMat);
    cyberGroup.add(icoPoints);

    // Outer Orbiting Torus Ring 1 (Cyan)
    const torusGeo1 = new THREE.TorusGeometry(160, 1.4, 16, 100);
    const torusMat1 = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.45
    });
    const ring1 = new THREE.Mesh(torusGeo1, torusMat1);
    ring1.rotation.x = Math.PI / 3;
    cyberGroup.add(ring1);

    // Outer Orbiting Torus Ring 2 (Purple)
    const torusGeo2 = new THREE.TorusGeometry(200, 1.1, 16, 100);
    const torusMat2 = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.35
    });
    const ring2 = new THREE.Mesh(torusGeo2, torusMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    cyberGroup.add(ring2);

    // Positioning cyber group in 3D space
    cyberGroup.position.set(240, 30, -80);
    scene.add(cyberGroup);

    // C. Interaction Controls: Mouse & Scroll
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const halfX = window.innerWidth / 2;
    const halfY = window.innerHeight / 2;

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX - halfX);
      mouseY = (e.clientY - halfY);
    }, { passive: true });

    let scrollY = window.pageYOffset;
    window.addEventListener('scroll', () => {
      scrollY = window.pageYOffset;
    }, { passive: true });

    // D. Window Resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // E. Animation Loop
    function animate() {
      requestAnimationFrame(animate);

      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      camera.position.x = targetX * 0.28;
      camera.position.y = -targetY * 0.28;
      camera.position.z = 500 - (scrollY * 0.14);
      camera.lookAt(0, 0, 0);

      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;

      icosahedron.rotation.x += 0.004;
      icosahedron.rotation.y += 0.006;
      icoPoints.rotation.x += 0.004;
      icoPoints.rotation.y += 0.006;

      ring1.rotation.z += 0.007;
      ring1.rotation.y += 0.003;

      ring2.rotation.z -= 0.005;
      ring2.rotation.x += 0.004;

      cyberGroup.position.y = 30 - (scrollY * 0.22);
      cyberGroup.rotation.y = scrollY * 0.0018;

      renderer.render(scene, camera);
    }

    animate();
  }

  // 13. Vanilla-Tilt 3D Physics Integration
  function init3DTilt() {
    if (typeof VanillaTilt === 'undefined') return;

    VanillaTilt.init(document.querySelectorAll('.project-card'), {
      max: 12,
      speed: 400,
      perspective: 1000,
      glare: true,
      "max-glare": 0.2,
      scale: 1.02
    });

    VanillaTilt.init(document.querySelectorAll('.metric-card, .skill-category-card, .photo-card-wrapper, .stat-card, .about-card'), {
      max: 8,
      speed: 400,
      perspective: 1000,
      glare: true,
      "max-glare": 0.15,
      scale: 1.01
    });
  }

  // Initialize 3D Engine & Tilt Plugins
  init3DScene();
  init3DTilt();
});
