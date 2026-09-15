/* SafeRise · carousel drift diagnostic
   Paste into the console on the affected page. Read-only except for one
   2px scroll probe per rail, which it restores. Prints a verdict.        */
(async function () {
  const log = (...a) => console.log('%c[drift]', 'color:#d8aa43', ...a);
  const out = [];

  // ── 0 · global kill switches ──────────────────────────────────────────
  const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  log('prefers-reduced-motion:', rm);
  if (rm) out.push('REDUCED MOTION IS ON — this alone stops every rail at once.');

  // does a blanket reduced-motion rule exist in the stylesheets?
  let blanket = 0;
  for (const sheet of document.styleSheets) {
    let rules; try { rules = sheet.cssRules; } catch { continue; }
    for (const r of rules || []) {
      if (r.conditionText && /reduced-motion/.test(r.conditionText)) {
        for (const inner of r.cssRules || []) {
          if (/^\s*\*/.test(inner.selectorText || '')) blanket++;
        }
      }
    }
  }
  log('blanket `*` rules inside reduced-motion queries:', blanket);
  if (blanket) out.push(`${blanket} blanket \`*\` reduced-motion rule(s) — kills animation globally, not just on rails.`);

  // ── 1 · find every candidate rail ─────────────────────────────────────
  const sel = '#srCarViewport,#srCarRow,[class*="carousel"],[class*="-rail"],[class*="track-rail"],[id*="Car"]';
  const nodes = [...new Set([...document.querySelectorAll(sel)])];
  log('candidate elements:', nodes.length, nodes);

  // keep only things that could actually scroll or be transformed
  const rails = nodes.filter(n => {
    const cs = getComputedStyle(n);
    return n.scrollWidth > n.clientWidth + 2 || cs.transform !== 'none' || /auto|scroll|hidden/.test(cs.overflowX);
  });
  log('plausible rails:', rails.length);

  // ── 2 · per-rail inspection ───────────────────────────────────────────
  for (const el of rails) {
    const cs = getComputedStyle(el);
    const name = el.id ? '#' + el.id : '.' + (el.className.toString().split(' ')[0] || el.tagName);
    const rec = {
      el: name,
      overflowX: cs.overflowX,
      scrollable: el.scrollWidth > el.clientWidth + 2,
      scrollW: el.scrollWidth,
      clientW: el.clientWidth,
      transform: cs.transform === 'none' ? 'none' : cs.transform,
      animName: cs.animationName,
      animState: cs.animationPlayState,
      transition: cs.transitionProperty,
      snap: cs.scrollSnapType,
      behavior: cs.scrollBehavior
    };

    // write probe — does scrollLeft actually take?
    if (rec.scrollable) {
      const before = el.scrollLeft;
      el.scrollLeft = before + 2;
      rec.scrollWriteTakes = el.scrollLeft !== before;
      el.scrollLeft = before;
    } else {
      rec.scrollWriteTakes = null;
    }

    // is anything moving it right now?
    const s0 = el.scrollLeft, t0 = cs.transform;
    await new Promise(r => setTimeout(r, 900));
    const cs2 = getComputedStyle(el);
    rec.movedScroll = el.scrollLeft !== s0;
    rec.movedTransform = cs2.transform !== t0;

    console.table([rec]);

    if (rec.transform !== 'none' && rec.scrollable)
      out.push(`${name}: BOTH a transform and native overflow — the transform moves content the scroll container does not track.`);
    if (rec.scrollWriteTakes === false)
      out.push(`${name}: scrollLeft writes do not take — wrong element (this is the #srCarRow vs #srCarViewport bug, in a second place).`);
    if (rec.scrollable && !rec.movedScroll && !rec.movedTransform)
      out.push(`${name}: scrollable, but nothing moved it in 900ms — the drift loop is not running or was stopped.`);
    if (cs.scrollBehavior === 'smooth')
      out.push(`${name}: scroll-behavior:smooth — per-frame scrollLeft writes fight the smooth interpolator and can cancel each other out.`);
  }

  // ── 3 · is a rAF loop even alive? ─────────────────────────────────────
  let frames = 0;
  const stamp = performance.now();
  const tick = () => { frames++; if (performance.now() - stamp < 800) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
  await new Promise(r => setTimeout(r, 900));
  log('rAF frames in 800ms:', frames, frames < 20 ? '(tab throttled — rerun with the tab focused)' : '');

  // ── 4 · hunt the stop flag ────────────────────────────────────────────
  const flags = Object.keys(window).filter(k => /stop|paus|drift|auto|interact|touched/i.test(k));
  log('suspicious globals:', flags.length ? flags : 'none exposed (flag is closure-scoped — grep the source instead)');

  // ── verdict ───────────────────────────────────────────────────────────
  console.log('%c── VERDICT ──', 'color:#d8aa43;font-weight:700');
  out.length ? out.forEach(l => console.log('•', l))
             : console.log('No structural fault found. Most likely the permanent-stop flag fired on a stray wheel/touch event before you looked. Reload without touching the page and rerun.');
})();
