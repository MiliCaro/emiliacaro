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
})();
