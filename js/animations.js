// ==========================================================================
//  ANIMATIONS.JS — Scroll reveal (AOS-like) + section utilities
// ==========================================================================
(function () {
  'use strict';

  /* ---- Scroll reveal ---- */
  function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el    = entry.target;
          const delay = parseInt(el.getAttribute('data-aos-delay') || '0', 10);
          setTimeout(() => el.classList.add('aos-animate'), delay);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => observer.observe(el));
  }


  /* ---- RSVP form (Redirects to WhatsApp +91 7034188572) ---- */
  function initRSVP() {
    const form   = document.getElementById('rsvp-form');
    const status = document.getElementById('rsvp-status');
    if (!form) return;

    const WHATSAPP_NUMBER = '917034188572';

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn  = document.getElementById('rsvp-submit');
      const name = document.getElementById('rsvp-name').value.trim();
      const guests = document.getElementById('rsvp-guests').value;
      const message = document.getElementById('rsvp-message').value.trim();

      if (!name) {
        status.textContent = 'Please enter your name.';
        status.className   = 'rsvp-status error';
        return;
      }

      btn.disabled       = true;
      btn.innerHTML      = '<i class="fa-brands fa-whatsapp fa-bounce"></i><span>Opening WhatsApp…</span>';
      status.textContent = 'Redirecting to WhatsApp...';
      status.className   = 'rsvp-status success';

      // Build formatted WhatsApp message
      let text = `*Wedding RSVP Confirmation* 💐\n\n`;
      text += `━━━━━━━━━━━━━━━━━━━━━\n`;
      text += `*Name:* ${name}\n`;
      text += `*Number of Guests:* ${guests}\n`;
      if (message) {
        text += `*Message / Wishes:* ${message}\n`;
      }
      text += `━━━━━━━━━━━━━━━━━━━━━\n`;
      text += `Hearty congratulations to Shanto & Mariya! 💍✨`;

      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

      setTimeout(() => {
        window.open(waUrl, '_blank') || (window.location.href = waUrl);

        btn.disabled  = false;
        btn.innerHTML = '<i class="fa-brands fa-whatsapp"></i><span>Send RSVP via WhatsApp</span>';
        status.textContent = '✓ Opened WhatsApp! Click send to deliver your RSVP.';
        form.reset();
      }, 500);
    });
  }

  /* ---- Init all ---- */
  function init() {
    initAOS();
    initRSVP();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
