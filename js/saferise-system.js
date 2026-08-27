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

     Also drifts on its own — slow, continuous, right-to-left — until
     the visitor takes over. See "AUTOPLAY" below.
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
      track.scrollTo({ left: cards[pos].offsetLeft, behavior: 'smooth' });
      paint();
    }

    if (next) next.addEventListener('click', function () { stopAuto(); go(pos + 1); });
    if (prev) prev.addEventListener('click', function () { stopAuto(); go(pos - 1); });

    track.addEventListener('scroll', function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        if (Date.now() < lock) return;   /* programmatic scroll, not the user */
        pos = nearest(); paint();
      }, 110);
    }, { passive: true });

    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { stopAuto(); e.preventDefault(); go(pos + 1); }
      if (e.key === 'ArrowLeft') { stopAuto(); e.preventDefault(); go(pos - 1); }
    });

    paint();

    /* ─── AUTOPLAY ───────────────────────────────────────────
       Continuous drift, not a step-by-step timer: every tick moves
       scrollLeft by (real-set-width / LAP_SECONDS) * elapsed-seconds,
       so it reads as motion, not a slideshow. Driven by a fixed-rate
       interval rather than requestAnimationFrame — the drift is slow
       enough (25-40s/lap) that the difference is invisible, and a
       timer keeps running under conditions where rAF is throttled
       to a stop (backgrounded/occluded tabs).

       Seamless loop: the ten cards are cloned once, appended after
       the real set, so the track holds two identical sets back to
       back. Once scrollLeft passes the width of the real set, the
       clones are what's filling the viewport — pixel-identical to
       the real cards — so subtracting that same width back out in
       the same tick is invisible; nothing ever looks like it moved.
       Clones stay out of the accessibility tree and tab order —
       aria-hidden="true", tabindex="-1", no id/role — since only the
       real ten should ever be reachable that way, and .proto-expand
       is stripped from each clone (the real cards double as accordion
       hosts, and a second live copy of that markup would duplicate
       ids like the waveform's). But visually a clone is still a
       pixel-identical stand-in for the card it was cloned from, so it
       keeps pointer-events and the .sr-cover classes that drive
       :hover, and its click is forwarded to the matching real card
       (see the click listener below) — a click past the seam opens
       the same protocol as clicking the original would have.

       The real-set width is measured fresh every tick, not cached —
       cheap insurance (two offsetLeft reads) against anything that
       reflows the track between ticks, e.g. a window resize, rather
       than a specific scenario this needs to defend against: opening
       a protocol permanently stops autoplay via the click listener
       below before the personal portal's view-swap script relocates
       that card out of the track, so tick() has already stopped
       running by the time the track's contents change.

       scroll-snap-type: x mandatory (set in CSS) fights a slow
       continuous scrollLeft nudge — the browser tries to settle on
       the nearest card after every tick, producing a stutter. Rather
       than weaken snap for every carousel this component ever hosts,
       it's toggled off only while autoplay is actually driving the
       track, and restored the moment a person takes over (hover,
       focus, touch, or a permanent stop) — so manual scrolling and
       the arrow buttons keep their intended snap.

       PAUSED vs STOPPED are two independent booleans, not one flag
       standing in for both meanings:
         paused  — temporary: hover, focus-within, or a touch. Clears
                   itself ~2s after the interaction ends.
         stopped — permanent: an arrow click or opening a protocol.
                   Once true, nothing flips it back — including a
                   resume timer that was already pending when the
                   permanent stop happened, which re-checks `stopped`
                   the moment it fires rather than trusting the state
                   it was scheduled under.

       SR-303 · Phase E removed this autoplay's old reduced-motion opt-out
       (`if (reduce) return;`) — it now drifts for every visitor, matching
       every other animation on the site. */

    var LAP_SECONDS = 32;      // full traversal of the real 10, within the 25-40s ask
    var TICK_MS = 50;          // interval rate; speed is time-based, not tick-count-based
    var RESUME_DELAY = 2000;   // "a couple of seconds" after interaction ends

    var clones = cards.map(function (card, i) {
      var c = card.cloneNode(true);
      c.removeAttribute('id');
      c.removeAttribute('onclick');
      c.removeAttribute('role');
      c.removeAttribute('tabindex');
      c.setAttribute('aria-hidden', 'true');
      c.tabIndex = -1;
      c.classList.remove('open');
      var expand = c.querySelector('.proto-expand');
      if (expand) expand.parentNode.removeChild(expand);
      [].forEach.call(c.querySelectorAll('[id]'), function (el) { el.removeAttribute('id'); });
      // A clone is still a pixel-identical, hoverable stand-in for cards[i] —
      // only its accordion content was stripped (duplicate ids). Forwarding
      // the click to the real card reuses that card's own inline onclick
      // (toggleProto) and its stopAuto listener below, so a clone opens the
      // same protocol exactly as if the visitor had scrolled back to card i
      // and clicked it directly. aria-hidden/tabindex=-1 above keep it out
      // of the accessibility tree and tab order regardless.
      c.addEventListener('click', function () { cards[i].click(); });
      return c;
    });
    clones.forEach(function (c) { track.appendChild(c); });

    function realWidth() { return clones[0].offsetLeft - cards[0].offsetLeft; }

    /* .sr-ptrack sets scroll-behavior:smooth in the base CSS, for the
       arrow buttons' scrollTo. Per spec that also intercepts a plain
       scrollLeft assignment, not just scrollTo() — so while autoplay
       owns the track, scroll-behavior is forced to auto here too,
       alongside snap, and both are restored together the moment a
       person takes over. Without this, every tick's increment (and
       worse, the wrap correction) animates instead of jumping:
       overlapping animations retargeted every 50ms fight each other
       and stall, and the "invisible" wrap becomes a visible scroll
       backward across the whole track. */
    function disableSnap() { track.style.scrollSnapType = 'none'; track.style.scrollBehavior = 'auto'; }
    function restoreSnap() { track.style.scrollSnapType = ''; track.style.scrollBehavior = ''; }

    var paused = false;    // temporary: hover / focus-within / touch
    var stopped = false;   // permanent: arrow click / protocol opened
    var resumeTimer = null, intervalId = null, lastTick = null;

    function tick() {
      var now = Date.now();
      if (lastTick == null) lastTick = now;
      var dt = Math.min((now - lastTick) / 1000, 0.25); // clamp so a stalled tab can't leap
      lastTick = now;

      if (stopped || paused) return;

      var width = realWidth();
      if (width <= 0) return; // portal not visible / not laid out yet

      // scroll-behavior is forced to auto for the duration of autoplay
      // (see disableSnap above), so a direct assignment here is a plain
      // synchronous jump — both for the increment and the wrap.
      track.scrollLeft += (width / LAP_SECONDS) * dt;
      if (track.scrollLeft >= width) track.scrollLeft -= width;
      pos = nearest();
      paint();
    }

    // pause()/resume() fully stop and restart the interval rather than
    // just gating tick() behind `paused` on one long-lived timer. A
    // single setInterval that keeps firing (no-op) for the entire
    // paused stretch, then is expected to resume useful work later,
    // is exactly the shape browsers throttle hardest and least
    // predictably once a tab backgrounds even briefly — clearing it on
    // pause and registering a fresh one on resume means there's no
    // stale timer for that throttling to have latched onto, and a
    // resume that visibly does nothing (this shipped once already)
    // can't happen silently again.
    function startInterval() {
      if (intervalId) return;
      lastTick = null;
      intervalId = setInterval(tick, TICK_MS);
    }
    function stopInterval() {
      if (intervalId) { clearInterval(intervalId); intervalId = null; }
    }

    function pause() {
      if (stopped || paused) return;
      paused = true;
      restoreSnap();
      clearTimeout(resumeTimer);
      stopInterval();
    }
    function scheduleResume() {
      if (stopped) return;
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(function () {
        if (stopped) return; // a permanent stop can land while this was pending
        paused = false;
        disableSnap();
        startInterval(); // fresh timer registration, not a resumed stale one
      }, RESUME_DELAY);
    }
    function stopAuto() {
      if (stopped) return;
      stopped = true;
      paused = false;
      clearTimeout(resumeTimer);
      resumeTimer = null;
      restoreSnap();
      stopInterval();
    }

    track.addEventListener('mouseenter', pause);
    track.addEventListener('mouseleave', scheduleResume);
    track.addEventListener('focusin', pause);
    track.addEventListener('focusout', scheduleResume);
    track.addEventListener('touchstart', pause, { passive: true });
    track.addEventListener('touchend', scheduleResume, { passive: true });
    track.addEventListener('touchcancel', scheduleResume, { passive: true });
    cards.forEach(function (c) { c.addEventListener('click', stopAuto); });

    disableSnap();
    startInterval();
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
        sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
              railIn.scrollTo({ left: cur.btn.offsetLeft - 60, behavior: 'smooth' });
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
