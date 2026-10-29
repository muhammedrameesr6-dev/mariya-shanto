// ==========================================================================
//  GALLERY.JS — View All toggle & Fullscreen Lightbox Modal
// ==========================================================================
(function () {
  'use strict';

  function initGallery() {
    const grid       = document.getElementById('galleryGrid');
    const viewAllBtn = document.getElementById('galleryViewAllBtn');
    const lightbox   = document.getElementById('galleryLightbox');
    const imgEl      = document.getElementById('lightboxImg');
    const countEl    = document.getElementById('lightboxCounter');
    const closeBtn   = document.getElementById('lightboxClose');
    const prevBtn    = document.getElementById('lightboxPrev');
    const nextBtn    = document.getElementById('lightboxNext');

    if (!grid) return;

    // List of all photo cards
    const allCards = Array.from(grid.querySelectorAll('.gallery-card'));
    const totalCount = allCards.length;
    let currentIndex = 0;

    // 1. Toggle View All / Show Less
    if (viewAllBtn) {
      viewAllBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const isExpanded = viewAllBtn.classList.contains('is-expanded');
        const hiddenCards = grid.querySelectorAll('.gallery-card.is-hidden, .gallery-card.is-revealed');

        if (isExpanded) {
          // Collapse back to 4
          hiddenCards.forEach(function (card) {
            card.classList.add('is-hidden');
            card.classList.remove('is-revealed');
          });
          viewAllBtn.classList.remove('is-expanded');
          const btnText = viewAllBtn.querySelector('.btn-text');
          if (btnText) btnText.textContent = `View All Photos (${totalCount})`;
          const btnIcon = viewAllBtn.querySelector('i');
          if (btnIcon) btnIcon.className = 'fa-solid fa-images';

          // Smooth scroll back to gallery
          const galleryEl = document.getElementById('gallery');
          if (galleryEl) {
            galleryEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } else {
          // Expand all
          hiddenCards.forEach(function (card, i) {
            card.classList.remove('is-hidden');
            card.classList.add('is-revealed');
            card.style.animationDelay = (i * 0.05) + 's';
          });
          viewAllBtn.classList.add('is-expanded');
          const btnText = viewAllBtn.querySelector('.btn-text');
          if (btnText) btnText.textContent = 'Show Less';
          const btnIcon = viewAllBtn.querySelector('i');
          if (btnIcon) btnIcon.className = 'fa-solid fa-chevron-up';
        }
      });
    }

    // 2. Lightbox logic
    function showPhoto(index) {
      if (index < 0) index = totalCount - 1;
      if (index >= totalCount) index = 0;
      currentIndex = index;

      const card = allCards[currentIndex];
      if (!card) return;
      const img = card.querySelector('img');
      const src = img ? img.getAttribute('src') : '';

      if (imgEl) {
        imgEl.src = src;
      }
      if (countEl) {
        countEl.textContent = (currentIndex + 1) + ' / ' + totalCount;
      }
    }

    function openLightbox(index) {
      showPhoto(index);
      if (lightbox) {
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
      }
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      if (lightbox) {
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
      }
      document.body.style.overflow = '';
    }

    // Event delegation on grid: clicking ANY card opens the lightbox
    grid.addEventListener('click', function (e) {
      const card = e.target.closest('.gallery-card');
      if (!card) return;
      const idx = allCards.indexOf(card);
      if (idx !== -1) {
        openLightbox(idx);
      }
    });

    // Close & navigation controls
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    if (prevBtn) {
      prevBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        showPhoto(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        showPhoto(currentIndex + 1);
      });
    }

    if (lightbox) {
      lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox || e.target.classList.contains('lightbox-wrap')) {
          closeLightbox();
        }
      });
    }

    document.addEventListener('keydown', function (e) {
      if (!lightbox || !lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPhoto(currentIndex - 1);
      if (e.key === 'ArrowRight') showPhoto(currentIndex + 1);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery);
  } else {
    initGallery();
  }
})();
