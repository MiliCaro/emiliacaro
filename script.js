/* =========================================================
   Emilia Caro — interactions
   ========================================================= */

(function () {
  'use strict';

  /* ---- Language toggle (EN default, persists in this session) ---- */
  var current = 'en';
  var toggle = document.getElementById('langToggle');

  function applyLang(lang) {
    current = lang;
    document.documentElement.lang = lang;

    // swap every element that carries data-en / data-es
    document.querySelectorAll('[data-en]').forEach(function (el) {
      var val = el.getAttribute('data-' + lang);
      if (val !== null) el.innerHTML = val;
    });

    // update the EN / ES indicator
    toggle.querySelectorAll('span[data-lang]').forEach(function (s) {
      s.classList.toggle('on', s.getAttribute('data-lang') === lang);
    });
  }

  toggle.addEventListener('click', function () {
    applyLang(current === 'en' ? 'es' : 'en');
  });

  /* ---- Optional: prefer Spanish only if browser is clearly es-* ----
     Brief §9 wants English as default for international visits, so we
     keep EN as the baseline and do NOT auto-switch. Uncomment to enable
     a soft preference for local (Argentine) visitors instead. */
  // if ((navigator.language || '').toLowerCase().indexOf('es') === 0) applyLang('es');

  /* ---- Mobile menu ---- */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('mobileMenu');
  burger.addEventListener('click', function () {
    menu.classList.toggle('open');
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { menu.classList.remove('open'); });
  });

  /* ---- Nav border on scroll ---- */
  var nav = document.querySelector('.nav');
  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 12);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Footer year ---- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---- Reveal on scroll ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Contact form (Formspree, async submit) ---- */
  var form = document.getElementById('contactForm');
  if (form) {
    var btn = form.querySelector('.form-submit');
    var status = document.getElementById('formStatus');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.className = 'form-status';
      status.textContent = '';
      btn.disabled = true;
      btn.textContent = btn.getAttribute('data-sending-' + current) || 'Sending…';

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (r) {
        if (r.ok) {
          form.reset();
          status.className = 'form-status ok';
          status.textContent = status.getAttribute('data-ok-' + current);
        } else {
          throw new Error('bad response');
        }
      }).catch(function () {
        status.className = 'form-status err';
        status.textContent = status.getAttribute('data-err-' + current);
      }).finally(function () {
        btn.disabled = false;
        btn.textContent = btn.getAttribute('data-' + current) || 'Send message';
      });
    });
  }
})();
