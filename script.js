/* =========================================================
   Emilia Caro — interactions
   Compartido por index.html, writing/*.html y tools/*.html
   Todo es null-safe: cada página usa sólo lo que tiene.
   ========================================================= */

(function () {
  'use strict';

  /* ---- Language toggle (EN default, persists in this session) ---- */
  var current = 'en';
  var toggle = document.getElementById('langToggle');

  function applyLang(lang) {
    current = lang;
    window.siteLang = lang;
    document.documentElement.lang = lang;

    // swap every element that carries data-en / data-es
    document.querySelectorAll('[data-en]').forEach(function (el) {
      var val = el.getAttribute('data-' + lang);
      if (val !== null) el.innerHTML = val;
    });

    // update the EN / ES indicator
    if (toggle) {
      toggle.querySelectorAll('span[data-lang]').forEach(function (s) {
        s.classList.toggle('on', s.getAttribute('data-lang') === lang);
      });
    }

    // let page-specific scripts (quiz, calculadora) re-render
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
  }

  window.siteLang = current;
  window.applyLang = applyLang;

  if (toggle) {
    toggle.addEventListener('click', function () {
      applyLang(current === 'en' ? 'es' : 'en');
    });
  }

  /* ---- Optional: prefer Spanish only if browser is clearly es-* ----
     Brief §9 wants English as default for international visits, so we
     keep EN as the baseline and do NOT auto-switch. Uncomment to enable
     a soft preference for local (Argentine) visitors instead. */
  // if ((navigator.language || '').toLowerCase().indexOf('es') === 0) applyLang('es');

  /* ---- Mobile menu ---- */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('mobileMenu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      menu.classList.toggle('open');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { menu.classList.remove('open'); });
    });
  }

  /* ---- Nav border on scroll ---- */
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > 12);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- Footer year ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Reveal on scroll (todas las variantes) ---- */
  var reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
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

  /* ---- Stats band: count-up ---- */
  var figures = document.querySelectorAll('.figure[data-count]');
  if (figures.length) {
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var runCount = function (el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var prefix = el.getAttribute('data-prefix') || '';

      // La cifra ya está escrita en el HTML, así que se ve sin JS y la lee Google.
      // Acá reusamos ese nodo de texto para animarlo; si no existiera, lo creamos.
      var node = el.firstChild;
      if (!node || node.nodeType !== 3) {
        node = document.createTextNode('');
        el.insertBefore(node, el.firstChild);
      }

      if (reduced || isNaN(target)) {
        node.nodeValue = prefix + (isNaN(target) ? '' : target);
        return;
      }

      var start = null;
      var dur = 1100;
      var step = function (ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        // ease-out cubic
        var eased = 1 - Math.pow(1 - p, 3);
        node.nodeValue = prefix + Math.round(target * eased);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if ('IntersectionObserver' in window) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { runCount(e.target); cio.unobserve(e.target); }
        });
      }, { threshold: 0.25 });
      figures.forEach(function (el) { cio.observe(el); });
    } else {
      figures.forEach(runCount);
    }
  }

  /* ---- Nav: marcar la sección activa ---- */
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (navLinks.length && 'IntersectionObserver' in window) {
    var linkFor = {};
    navLinks.forEach(function (a) { linkFor[a.getAttribute('href').slice(1)] = a; });

    var sections = [];
    Object.keys(linkFor).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) sections.push(s);
    });

    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var a = linkFor[e.target.id];
        if (!a) return;
        if (e.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove('active'); });
          a.classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { sio.observe(s); });
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
