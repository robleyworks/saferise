/* ============================================================
   SAFERISE DESIGN SYSTEM · behaviour · v1
   ------------------------------------------------------------
   Load at the end of <body>, after saferise-system.css:
       script src="/js/saferise-system.js" defer   (closing tag omitted here
       on purpose: a literal one would end the tag if this file is inlined)

   Everything here is self-initialising and idempotent — it can
   run again after a page swap without duplicating anything.
   No global names are exported except window.SafeRiseUI.
   ============================================================ */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─────────────────────────────────────────────────────────
     1 · CAROUSEL
     Markup contract:
       <div data-sr-carousel>
         <div class="sr-ptrack" data-sr-track> …<article class="sr-cover">… </div>
       </div>
       counter  → [data-sr-counter]  (inner element to receive the number)
       arrows   → [data-sr-prev] / [data-sr-next]
     Scoped to the nearest [data-sr-carousel-group] so several
     carousels can coexist on one page.
     ───────────────────────────────────────────────────────── */
  function initCarousel(root) {
    if (root.dataset.srInit === '1') return;
    root.dataset.srInit = '1';

    var scope = root.closest('[data-sr-carousel-group]') || document;
    var track = root.querySelector('[data-sr-track]');
    var cards = track ? [].slice.call(track.querySelectorAll('.sr-cover')) : [];
    if (!track || cards.length < 2) return;

    var counter = scope.querySelector('[data-sr-counter]');
    var prev = scope.querySelector('[data-sr-prev]');
    var next = scope.querySelector('[data-sr-next]');

    /* Navigation runs off an explicit index. Deriving it from scrollLeft
       alone breaks at the end of the track, where the final cards all
       clamp to the same maximum scroll position and the counter sticks. */
    var pos = 0, lock = 0, timer;

    function nearest() {
      var best = 0, d = Infinity;
      cards.forEach(function (c, i) {
        var v = Math.abs(c.offsetLeft - track.scrollLeft);
        if (v < d) { d = v; best = i; }
      });
      if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 2) best = cards.length - 1;
      return best;
    }
    function paint() { if (counter) counter.textContent = pos + 1; }
    function go(n) {
      pos = (n + cards.length) % cards.length;
      lock = Date.now() + 700;
      track.scrollTo({ left: cards[pos].offsetLeft, behavior: reduce ? 'auto' : 'smooth' });
      paint();
    }

    if (next) next.addEventListener('click', function () { go(pos + 1); });
    if (prev) prev.addEventListener('click', function () { go(pos - 1); });

    track.addEventListener('scroll', function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        if (Date.now() < lock) return;   /* programmatic scroll, not the user */
        pos = nearest(); paint();
      }, 110);
    }, { passive: true });

    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(pos + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(pos - 1); }
    });

    paint();
  }

  /* ─────────────────────────────────────────────────────────
     2 · STAGGERED ENTRY for grids of peer cards
     ───────────────────────────────────────────────────────── */
  function initStagger() {
    var sel = '.sr-covers,.sr-features,.sr-svc-pair,' +
              '.proto-grid,.sci-grid,.experts-grid,.experts2-grid,.steps-grid,.tiers,.res-row';
    var grids = [].slice.call(document.querySelectorAll(sel))
                  .filter(function (g) { return g.dataset.srInit !== '1'; });
    if (!grids.length || !('IntersectionObserver' in window)) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('sr-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    grids.forEach(function (g) {
      g.dataset.srInit = '1';
      g.classList.add('sr-stagger');
      [].forEach.call(g.children, function (c, i) { c.style.setProperty('--i', i); });
      io.observe(g);
    });
  }

  /* ─────────────────────────────────────────────────────────
     3 · SCROLL THREAD + CHAPTER RAIL
     Only builds on pages carrying [data-sr-rail] — the long
     marketing pages. Portals and the Reader skip it.
     ───────────────────────────────────────────────────────── */
  function initRail() {
    if (!document.querySelector('[data-sr-rail]')) return;
    if (document.getElementById('sr-thread')) return;

    var thread = document.createElement('div');
    thread.id = 'sr-thread';
    document.body.appendChild(thread);

    var rail = document.createElement('div');
    rail.id = 'sr-rail';
    rail.innerHTML = '<div class="sr-rail-in"></div>';
    document.body.appendChild(rail);
    var railIn = rail.querySelector('.sr-rail-in');

    function place() {
      var bar = document.querySelector('.theme-bar');
      rail.style.top = ((bar ? bar.offsetHeight : 60) + 10) + 'px';
    }
    place();
    window.addEventListener('resize', place);

    /* The platform writes its section eyebrows inline rather than with a
       shared class, so match on what they look like: short, uppercase,
       wide-tracked, gold. Classed eyebrows win when present. */
    function eyebrow(sec) {
      var classed = sec.querySelector('.section-tag, .eyebrow');
      if (classed && !classed.children.length) {
        var ct = classed.textContent.trim();
        if (ct.length >= 3 && ct.length <= 34) return ct;
      }
      var nodes = sec.querySelectorAll('p,span,div,h3,h4');
      for (var i = 0; i < nodes.length && i < 90; i++) {
        var n = nodes[i], t = (n.textContent || '').trim();
        if (t.length < 3 || t.length > 34 || n.children.length) continue;
        var cs = getComputedStyle(n);
        if (cs.textTransform !== 'uppercase') continue;
        if (parseFloat(cs.letterSpacing) < 4) continue;
        var m = cs.color.match(/\d+/g);
        if (!m || +m[0] < 170 || +m[1] < 120 || +m[2] > 150) continue;
        return t;
      }
      return null;
    }

    var main = document.querySelector('[data-sr-rail]') || document.body;
    var blocks = [];
    [].forEach.call(main.children, function (el) {
      if (el.tagName === 'SECTION') { blocks.push(el); return; }
      if (el.offsetHeight > 420) blocks.push(el);
      [].forEach.call(el.querySelectorAll(':scope > section'), function (s) { blocks.push(s); });
    });
    [].forEach.call(main.querySelectorAll('section'), function (s) {
      if (blocks.indexOf(s) === -1) blocks.push(s);
    });
    blocks.sort(function (a, b) {
      return a.getBoundingClientRect().top - b.getBoundingClientRect().top;
    });

    var chapters = [], seen = {};
    blocks.forEach(function (sec, i) {
      if (sec.closest('.prog-overlay, .prog-page, .reader-modal')) return;
      var raw = eyebrow(sec);
      if (!raw) return;
      var label = raw.replace(/^\d+\s*[—–-]\s*/, '').trim();
      if (!label || seen[label.toLowerCase()]) return;
      seen[label.toLowerCase()] = 1;
      if (!sec.id) sec.id = 'sr-chapter-' + i;

      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = label;
      b.addEventListener('click', function () {
        sec.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      });
      railIn.appendChild(b);
      chapters.push({ sec: sec, btn: b });
    });
    if (!chapters.length) { rail.remove(); }

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        thread.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';

        if (chapters.length) {
          rail.classList.toggle('sr-on', window.scrollY > window.innerHeight * 0.55);
          var mark = window.scrollY + window.innerHeight * 0.32, cur = null;
          chapters.forEach(function (c) {
            if (c.sec.getBoundingClientRect().top + window.scrollY <= mark) cur = c;
          });
          chapters.forEach(function (c) { c.btn.classList.toggle('sr-on', c === cur); });
          if (cur) {
            var r = cur.btn.getBoundingClientRect(), rr = railIn.getBoundingClientRect();
            if (r.left < rr.left || r.right > rr.right) {
              railIn.scrollTo({ left: cur.btn.offsetLeft - 60, behavior: reduce ? 'auto' : 'smooth' });
            }
          }
        }
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─────────────────────────────────────────────────────────
     4 · CTA VISIBILITY
     Any [data-sr-cta] is hidden once the visitor has a plan.
     Call SafeRiseUI.setPlan('personal') after auth resolves.
     ───────────────────────────────────────────────────────── */
  function setPlan(plan) {
    var signedIn = !!plan && plan !== 'none';
    [].forEach.call(document.querySelectorAll('[data-sr-cta]'), function (el) {
      el.hidden = signedIn;
      el.setAttribute('data-state', signedIn ? 'signed-in' : 'signed-out');
    });
  }

  /* ─────────────────────────────────────────────────────────
     BOOT
     ───────────────────────────────────────────────────────── */
  function boot() {
    [].forEach.call(document.querySelectorAll('[data-sr-carousel]'), initCarousel);
    initStagger();
    initRail();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.SafeRiseUI = { refresh: boot, setPlan: setPlan, initCarousel: initCarousel };
})();
