document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeaderScroll();
  initReviewCarousel();
});

function initMobileNav() {
  const toggle = document.querySelector('[data-mobile-nav-toggle]');
  const nav = document.querySelector('[data-mobile-nav]');
  const closeBtn = document.querySelector('[data-mobile-nav-close]');
  const overlay = document.querySelector('[data-mobile-nav-overlay]');

  if (!toggle || !nav) return;

  const openNav = () => {
    nav.classList.add('mobile-nav--open');
    nav.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    overlay?.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeNav = () => {
    nav.classList.remove('mobile-nav--open');
    nav.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    overlay?.setAttribute('hidden', '');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', openNav);
  closeBtn?.addEventListener('click', closeNav);
  overlay?.addEventListener('click', closeNav);

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('mobile-nav--open')) {
      closeNav();
    }
  });
}

function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('site-header--scrolled', 'border-b', 'border-[#222222]');
    } else {
      header.classList.remove('site-header--scrolled', 'border-b', 'border-[#222222]');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initReviewCarousel() {
  const track = document.querySelector('[data-review-track]');
  const prevBtn = document.querySelector('[data-review-prev]');
  const nextBtn = document.querySelector('[data-review-next]');

  if (!track || !prevBtn || !nextBtn) return;

  const scrollAmount = () => track.querySelector('.review-card')?.offsetWidth + 24 || 320;

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
  });
}

function initReviewCarousel() {
  const track = document.querySelector('[data-review-track]');
  const prevBtn = document.querySelector('[data-review-prev]');
  const nextBtn = document.querySelector('[data-review-next]');
  const counter = document.querySelector('[data-review-counter]');

  if (!track || !prevBtn || !nextBtn) return;

  const reviews = track.querySelectorAll('article');
  let current = 0;

  function updateReview() {
    track.style.transform = `translateX(-${current * 100}%)`;
    if (counter) counter.textContent = `${current + 1} / ${reviews.length}`;
  }

  prevBtn.addEventListener('click', () => {
    current = current === 0 ? reviews.length - 1 : current - 1;
    updateReview();
  });

  nextBtn.addEventListener('click', () => {
    current = current === reviews.length - 1 ? 0 : current + 1;
    updateReview();
  });
}

// Gallery Pagination Logic
document.addEventListener('DOMContentLoaded', () => {
  const pages = document.querySelectorAll('[data-gallery-page]');
  const prevBtn = document.getElementById('gallery-prev');
  const nextBtn = document.getElementById('gallery-next');
  const counter = document.getElementById('gallery-counter');
  
  // If these elements don't exist on the current page (like index.html), exit safely
  if (!pages.length || !prevBtn || !nextBtn || !counter) return;

  let currentPage = 0;
  const totalPages = pages.length;

  function updateGallery() {
    // Hide all pages, show only the active page
    pages.forEach((page, index) => {
      if (index === currentPage) {
        page.classList.remove('hidden');
      } else {
        page.classList.add('hidden');
      }
    });

    // Update indicator text
    counter.textContent = `Page ${currentPage + 1} / ${totalPages}`;

    // Handle disabled button appearances/states
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === totalPages - 1;
  }

  prevBtn.addEventListener('click', () => {
    if (currentPage > 0) {
      currentPage--;
      updateGallery();
      // Smoothly scroll back to the top of the gallery grid container
      document.getElementById('gallery-container').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
      });
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages - 1) {
      currentPage++;
      updateGallery();
      // Smoothly scroll back to the top of the gallery grid container
      document.getElementById('gallery-container').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
      });
    }
  });

  // Run immediately on page load to set correct initial states
  updateGallery();
});