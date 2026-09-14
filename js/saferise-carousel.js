/* saferise-carousel.js — one implementation for every carousel on the site.
 *
 * Replaces the four separate implementations. Drop in, include once, done.
 *
 *   <script src="/js/saferise-carousel.js" defer></script>
 *
 * Works on any element with [data-sr-carousel], or falls back to the
 * selectors listed in SELECTORS below.
 *
 * Guards against the zero-width failure: if the track or viewport measures
 * 0 at init, it retries on image load, on resize, and via ResizeObserver
 * rather than silently advancing an invisible element.
 */
(function () {
  'use strict';

  var SELECTORS = [
    '[data-sr-carousel]',
    '.sr-carousel',
    '.protocol-carousel',
    '.track-carousel',
    '.lt-carousel'
  ].join(',');

  var INTERVAL = 7000;      // 6-8s per the brief
  var RESUME_DELAY = 7000;  // full interval after manual navigation

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  function init(root) {
    if (root.__srCarousel) return;          // never double-bind
    root.__srCarousel = true;

    var track = root.querySelector('[data-sr-track], .sr-track, .carousel-track')
             || root.firstElementChild;
    if (!track) return;

    var items = track.children;
    if (items.length < 2) return;

    var idx = 0, timer = null, paused = false, visible = false, manualUntil = 0;

    function measure() {
      var vw = root.clientWidth;
      var iw = items[0] ? items[0].getBoundingClientRect().width : 0;
      return { vw: vw, iw: iw, ok: vw > 1 && iw > 1 };
    }

    /* --- the zero-width guard -------------------------------------------
     * SR-381 found a carousel whose transform advanced correctly while its
     * bounding rect reported width 0 — so nothing visible ever moved.
     * Never run against an unmeasurable element. Wait for it instead.      */
    function ready(cb) {
      var m = measure();
      if (m.ok) return cb();

      var tries = 0;
      var poll = setInterval(function () {
        if (measure().ok || ++tries > 40) {   // give up after ~10s
          clearInterval(poll);
          if (measure().ok) cb();
          else console.warn('[sr-carousel] never measured non-zero:', root);
        }
      }, 250);

      // images are the usual reason width resolves late
      Array.prototype.forEach.call(root.querySelectorAll('img'), function (img) {
        if (!img.complete) img.addEventListener('load', function () {
          if (measure().ok) { clearInterval(poll); cb(); }
        }, { once: true });
      });
    }

    function perView() {
      var m = measure();
      return Math.max(1, Math.round(m.vw / m.iw));
    }

    function maxIndex() {
      return Math.max(0, items.length - perView());
    }

    function go(n, manual) {
      idx = n > maxIndex() ? 0 : (n < 0 ? maxIndex() : n);
      var m = measure();
      if (!m.ok) return;
      var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || 0) || 0;
      track.style.transition = reduced.matches ? 'none' : 'transform .6s cubic-bezier(.4,0,.2,1)';
      track.style.transform = 'translateX(' + (-idx * (m.iw + gap)) + 'px)';
      if (manual) manualUntil = Date.now() + RESUME_DELAY;
      root.dispatchEvent(new CustomEvent('sr:carousel:change', { detail: { index: idx } }));
    }

    function tick() {
      if (paused || !visible || reduced.matches) return;
      if (Date.now() < manualUntil) return;
      go(idx + 1);
    }

    function start() {
      stop();
      if (reduced.matches) return;           // off entirely, not slowed
      timer = setInterval(tick, INTERVAL);
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }

    /* --- pause conditions ------------------------------------------------ */
    root.addEventListener('mouseenter', function () { paused = true; });
    root.addEventListener('mouseleave', function () { paused = false; });
    root.addEventListener('focusin',   function () { paused = true; });
    root.addEventListener('focusout',  function (e) {
      if (!root.contains(e.relatedTarget)) paused = false;
    });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        visible = es[0].isIntersecting;
      }, { threshold: 0.15 }).observe(root);
    } else {
      visible = true;
    }

    /* --- manual controls ------------------------------------------------- */
    var prev = root.querySelector('[data-sr-prev], .carousel-prev, .lt-prev');
    var next = root.querySelector('[data-sr-next], .carousel-next, .lt-next');
    if (prev) prev.addEventListener('click', function () { go(idx - 1, true); });
    if (next) next.addEventListener('click', function () { go(idx + 1, true); });

    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { go(idx + 1, true); e.preventDefault(); }
      if (e.key === 'ArrowLeft')  { go(idx - 1, true); e.preventDefault(); }
    });

    /* --- resize ---------------------------------------------------------- */
    var rt;
    function onResize() {
      clearTimeout(rt);
      rt = setTimeout(function () {
        track.style.transition = 'none';
        go(Math.min(idx, maxIndex()));
      }, 150);
    }
    window.addEventListener('resize', onResize);
    if ('ResizeObserver' in window) new ResizeObserver(onResize).observe(root);

    reduced.addEventListener('change', function () {
      if (reduced.matches) stop(); else start();
    });

    ready(function () { go(0); start(); });
  }

  function boot() {
    Array.prototype.forEach.call(document.querySelectorAll(SELECTORS), init);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  // late-rendered carousels (the dashboard builds some after fetch)
  new MutationObserver(boot).observe(document.documentElement, {
    childList: true, subtree: true
  });

  window.SafeRiseCarousel = { init: init, boot: boot };
})();
