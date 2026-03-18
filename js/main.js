document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileBtn.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close mobile menu when any nav link is tapped
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // Sticky Navigation on Scroll
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  // Set Active Link Based on Current Page
  const currentLocation = location.pathname.split('/').pop() || 'index.html';
  const navItems = document.querySelectorAll('.nav-links li a:not(.btn)');

  // ── Global Session Nav Sync ────────────────────────
  const sessionData = localStorage.getItem('clubnote_session');
  if (sessionData) {
    try {
      const s = JSON.parse(sessionData);
      if (s && s.token && Date.now() < s.expiry) {
        // User is logged in — update ALL membership/login links site-wide
        document.querySelectorAll('a').forEach(item => {
          const href = item.getAttribute('href');
          if (href === 'membership.html' || href === 'login.html') {
            item.setAttribute('href', 'dashboard.html');
            if (item.classList.contains('btn')) {
              item.innerHTML = (href === 'login.html' ? '<i class="fa-solid fa-gauge"></i> Dashboard' : 'Go to Dashboard <i class="fa-solid fa-arrow-right" style="margin-left: 8px;"></i>');
              item.style.borderColor = 'var(--accent-color)';
            } else if (item.closest('.nav-links')) {
              item.innerHTML = '<i class="fa-solid fa-gauge" style="margin-right:5px;"></i> Dashboard';
            }
          }
        });
        // Also update the mobile-login-item (hamburger menu) which uses a btn class
        const mobileLoginItem = document.querySelector('.mobile-login-item a');
        if (mobileLoginItem) {
          mobileLoginItem.setAttribute('href', 'dashboard.html');
          mobileLoginItem.innerHTML = '<i class="fa-solid fa-gauge" style="margin-right:6px;"></i> My Dashboard';
          mobileLoginItem.style.borderColor = 'var(--accent-color)';
        }
        // Hide the desktop nav-login-btn and show nothing (dashboard nav handles this)
        const navLoginBtn = document.querySelector('.nav-login-btn');
        if (navLoginBtn) {
          navLoginBtn.setAttribute('href', 'dashboard.html');
          navLoginBtn.innerHTML = '<i class="fa-solid fa-gauge" style="margin-right:6px;"></i> Dashboard';
          navLoginBtn.style.borderColor = 'var(--accent-color)';
        }
      }
    } catch(e) {}
  }

  navItems.forEach(item => {
    const itemPath = item.getAttribute('href');
    if (itemPath === currentLocation) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
          // Close mobile menu if open
          if (navLinks && navLinks.classList.contains('active')) {
            mobileBtn.click();
          }
        }
      }
    });
  });

  // Scroll Reveal Animations
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('active');
      observer.unobserve(entry.target); // only reveal once
    });
  }, revealOptions);

  reveals.forEach(reveal => {
    revealOnScroll.observe(reveal);
  });

  // Form Validation (Basic)
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      // If the form has an action attribute (like Formspree), let it submit normally
      if (form.getAttribute('action')) {
        return;
      }
      
      e.preventDefault();
      form.reset();
      // Show toast instead of alert
      const toast = document.createElement('div');
      toast.style.cssText = 'position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:#1a1a1a;color:#fff;padding:0.85rem 1.5rem;border-radius:10px;font-family:Inter,sans-serif;font-size:0.9rem;z-index:9999;box-shadow:0 8px 30px rgba(0,0,0,0.3);display:flex;align-items:center;gap:0.5rem;';
      toast.innerHTML = '<i class="fa-solid fa-circle-check" style="color:#25d366;"></i> Message sent! We will get back to you soon.';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3500);
    });
  });

  // Interactive Garage Directory Logic
  const filterBtns = document.querySelectorAll('.directory-filters .filter-btn');
  const garageItems = document.querySelectorAll('#garage-directory .mechanic-item');

  if (filterBtns.length > 0 && garageItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        // Filter logic
        garageItems.forEach(item => {
          item.classList.remove('active');

          if (filterValue === 'all' || item.getAttribute('data-region') === filterValue) {
            item.style.display = 'flex';
            void item.offsetWidth;
            setTimeout(() => item.classList.add('active'), 10);
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Testimonial Slider Logic
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.slider-dots .dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentSlide = 0;
  let slideInterval;

  if (slides.length > 0) {
    const initSlider = () => {
      slides.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));

      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
    };

    const nextSlide = () => {
      currentSlide = (currentSlide + 1) % slides.length;
      initSlider();
    };

    const prevSlide = () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      initSlider();
    };

    const startSlide = () => {
      slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    };

    const resetInterval = () => {
      clearInterval(slideInterval);
      startSlide();
    };

    if (nextBtn && prevBtn) {
      nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
      prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        initSlider();
        resetInterval();
      });
    });

    // Start auto-play
    startSlide();
  }

  // Theme Engine (Dark Mode)
  const themeToggle = document.querySelectorAll('#darkModeToggle');
  const currentTheme = localStorage.getItem('theme');

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update all toggle icons (moon vs sun)
    themeToggle.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.classList.remove('fa-moon');
          icon.classList.add('fa-sun');
        } else {
          icon.classList.remove('fa-sun');
          icon.classList.add('fa-moon');
        }
      }
    });
  };

  // Initial Theme Load
  if (currentTheme) {
    setTheme(currentTheme);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
  }

  // Toggle Listener
  themeToggle.forEach(btn => {
    btn.addEventListener('click', () => {
      let theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      setTheme(theme);
    });
  });

  // Scroll to Top Logic
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
      scrollToTopBtn.classList.toggle('visible', window.scrollY > 300);
    }, { passive: true });

    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Magnetic Buttons Interaction (Premium Effect)
  const magneticElements = document.querySelectorAll('.btn, .toolbox-card, .back-home, #darkModeToggle, .mobile-menu-btn, .filter-btn, .social-links a');
  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const pos = el.getBoundingClientRect();
      const x = e.clientX - pos.left - pos.width / 2;
      const y = e.clientY - pos.top - pos.height / 2;
      el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
    });
  });

  // PWA Service Worker Registration
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').then(reg => {
      }).catch(() => {});
    });
  }

  // Parallax Hero Effect (Specific to Index Page)
  const heroBg = document.getElementById('heroBg');
  if (heroBg) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          heroBg.style.transform = `translateY(${window.pageYOffset * 0.35}px)`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }
});

