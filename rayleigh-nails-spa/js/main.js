document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeaderScroll();
  initReviewCarousel();
  initHomepageLightbox();
  initGalleryPageInteractions();
  initPedicureCarousel();
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

// Pagination handler helper factory function
function initGalleryPagination(config) {
  const container = document.getElementById(config.containerId);
  if (!container) return;

  const prevBtn = document.getElementById(config.prevBtnId);
  const nextBtn = document.getElementById(config.nextBtnId);
  const currentTxt = document.getElementById(config.currentId);
  const totalTxt = document.getElementById(config.totalId);
  const pages = container.querySelectorAll(config.pageSelector);
  
  let currentIndex = 0;
  const totalPages = pages.length;

  if (totalTxt) totalTxt.textContent = totalPages;

  function updateView(direction) {
    pages.forEach((page, idx) => {
      if (idx === currentIndex) {
        page.classList.remove('hidden');
        if (direction === 'next') page.classList.add('animate-slide-right');
        if (direction === 'prev') page.classList.add('animate-slide-left');
      } else {
        page.classList.add('hidden');
        page.classList.remove('animate-slide-right', 'animate-slide-left');
      }
    });

    if (currentTxt) currentTxt.textContent = currentIndex + 1;
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === totalPages - 1;
  }

  prevBtn?.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateView('prev');
    }
  });

  nextBtn?.addEventListener('click', () => {
    if (currentIndex < totalPages - 1) {
      currentIndex++;
      updateView('next');
    }
  });

  updateView();
}

// Fire engines on DOM content load
document.addEventListener('DOMContentLoaded', () => {
  // Top Gallery Layout
  initGalleryPagination({
    containerId: 'gallery-content-viewport',
    prevBtnId: 'gallery-prev',
    nextBtnId: 'gallery-next',
    currentId: 'gallery-current',
    totalId: 'gallery-total',
    pageSelector: '[data-gallery-page]'
  });

  // Bottom Ideas Layout
  initGalleryPagination({
    containerId: 'ideas-content-viewport',
    prevBtnId: 'ideas-prev',
    nextBtnId: 'ideas-next',
    currentId: 'ideas-current',
    totalId: 'ideas-total',
    pageSelector: '[data-ideas-page]'
  });
});

// index.html - homepage lightbox functionality
/* LIGHTBOX FUNCTIONALITY */
function initHomepageLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  if (!lightbox || !lightboxImg || !lightboxClose) return;

  document.querySelectorAll('.gallery-image').forEach((img) => {
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      const src = img.getAttribute('data-full') || img.getAttribute('src');
      if (src) {
        lightboxImg.setAttribute('src', src);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxImg.setAttribute('src', '');
  };

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });
}

// gallery.html - gallery swipe, keyboard navigation, and lightbox support
/* LIGHTBOX FUNCTIONALITY */
/* SWIPE NAVIGATION (MOBILE) */
function initGalleryPageInteractions() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  if (lightbox && lightboxImg && lightboxClose) {
    document.querySelectorAll('.gallery-image').forEach((img) => {
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        const src = img.getAttribute('data-full') || img.getAttribute('src');
        if (src) {
          lightboxImg.setAttribute('src', src);
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      lightboxImg.setAttribute('src', '');
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    });
  }

  const galleryViewport = document.getElementById('gallery-content-viewport');
  const ideasViewport = document.getElementById('ideas-content-viewport');

  if (!galleryViewport && !ideasViewport) return;

  let touchStartX = 0;
  let touchEndX = 0;

  const setupSwipe = (viewport, prevBtn, nextBtn) => {
    if (!viewport) return;

    viewport.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    viewport.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          if (nextBtn && !nextBtn.disabled) nextBtn.click();
        } else if (prevBtn && !prevBtn.disabled) {
          prevBtn.click();
        }
      }
    }, { passive: true });
  };

  const galleryPrev = document.getElementById('gallery-prev');
  const galleryNext = document.getElementById('gallery-next');
  setupSwipe(galleryViewport, galleryPrev, galleryNext);

  const ideasPrev = document.getElementById('ideas-prev');
  const ideasNext = document.getElementById('ideas-next');
  setupSwipe(ideasViewport, ideasPrev, ideasNext);

  document.addEventListener('keydown', (e) => {
    const galleryContainer = document.getElementById('gallery-container');
    const galleryRect = galleryContainer?.getBoundingClientRect();
    if (galleryRect && galleryRect.top < window.innerHeight && galleryRect.bottom > 0) {
      if (e.key === 'ArrowLeft' && !galleryPrev?.disabled) {
        galleryPrev?.click();
        e.preventDefault();
      } else if (e.key === 'ArrowRight' && !galleryNext?.disabled) {
        galleryNext?.click();
        e.preventDefault();
      }
    }

    const ideasContainer = document.getElementById('ideas-container');
    const ideasRect = ideasContainer?.getBoundingClientRect();
    if (ideasRect && ideasRect.top < window.innerHeight && ideasRect.bottom > 0) {
      if (e.key === 'ArrowLeft' && !ideasPrev?.disabled) {
        ideasPrev?.click();
        e.preventDefault();
      } else if (e.key === 'ArrowRight' && !ideasNext?.disabled) {
        ideasNext?.click();
        e.preventDefault();
      }
    }
  });
}

// services/pedicure.html - pedicure carousel functionality
function initPedicureCarousel() {
  const items = document.querySelectorAll('[data-carousel-item]');
  if (!items.length) return;

  let currentIndex = 0;
  const totalItems = items.length;
  let carouselInterval;
  let isTransitioning = false;

  function showItem(index) {
    if (isTransitioning) return;
    isTransitioning = true;

    items.forEach((item, i) => {
      if (i === index) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    const currentItem = items[index];
    const video = currentItem.querySelector('video');
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }

    setTimeout(() => {
      isTransitioning = false;
    }, 800);
  }

  function nextItem() {
    if (carouselInterval) {
      clearInterval(carouselInterval);
      carouselInterval = null;
    }

    currentIndex = (currentIndex + 1) % totalItems;
    showItem(currentIndex);
    startCarousel();
  }

  function startCarousel() {
    if (carouselInterval) {
      clearInterval(carouselInterval);
      carouselInterval = null;
    }

    carouselInterval = setInterval(nextItem, 5000);
  }

  items.forEach((item, index) => {
    const video = item.querySelector('video');
    if (video) {
      video.addEventListener('ended', () => {
        if (index === currentIndex) {
          if (carouselInterval) {
            clearInterval(carouselInterval);
            carouselInterval = null;
          }
          nextItem();
        }
      });
    }
  });

  showItem(0);
  startCarousel();
}

