document.addEventListener('DOMContentLoaded', () => {

  /* ===== NAVIGATION TOGGLE ===== */
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* ===== HERO SHAKE EFFECT ===== */
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.classList.add('shake');
  }

  /* ===== FLASH OVERLAY ===== */
  const flash = document.querySelector('.flash-overlay');
  if (flash) {
    flash.addEventListener('animationend', () => flash.remove());
  }

  /* ===== SPEED LINES CLEANUP ===== */
  document.querySelectorAll('.speed-line').forEach(line => {
    line.addEventListener('animationend', () => {
      line.style.opacity = '0';
    });
  });

  /* ===== PARTICLES CLEANUP ===== */
  document.querySelectorAll('.particle').forEach(p => {
    p.addEventListener('animationend', () => p.remove());
  });

  /* ===== SCROLL REVEAL ===== */
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }

  /* ===== GALLERY LIGHTBOX ===== */
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length > 0) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-backdrop"></div>
      <div class="lightbox-content">
        <button class="lightbox-close">&times;</button>
        <img class="lightbox-img" src="" alt="">
      </div>
    `;
    document.body.appendChild(lightbox);

    const lbBackdrop = lightbox.querySelector('.lightbox-backdrop');
    const lbImg = lightbox.querySelector('.lightbox-img');
    const lbClose = lightbox.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          lbImg.src = img.src;
          lbImg.alt = img.alt;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    lbClose.addEventListener('click', closeLightbox);
    lbBackdrop.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  /* ===== PAGE ENTER ANIMATION ===== */
  const pageSection = document.querySelector('.page-section');
  if (pageSection) {
    pageSection.classList.add('page-enter');
  }

  /* ===== PARALLAX ON HERO (subtle) ===== */
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const titleContainer = hero.querySelector('.title-container');
      if (titleContainer && scrollY < window.innerHeight) {
        titleContainer.style.transform = `translateY(${scrollY * 0.15}px)`;
        titleContainer.style.opacity = 1 - (scrollY / (window.innerHeight * 0.8));
      }
    });
  }

});
