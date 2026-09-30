/* ═══════════════════════════════════════════════════════════════════════
   SafeRise — js/saferise-upsell.js · SR-484 Part B · sr-su-
   The Sovereign upsell band on dashboard.html, and the dialog behind it.

   WHO SEES IT. A member who does not hold the Sovereign tier: free,
   standard and premium. The answer comes from SafeRiseAccess.resolve(), the
   one tier check (js/saferise-access.js). This file does not add a second
   one, and it never reads SR_FLAGS. A sovereign-tier member gets nothing:
   the band and the dialog are built here, after the tier is known, so for
   them neither exists in the markup, rather than being hidden.

   The dashboard's version of the offer the protocol page makes (SR-470).
   The two coexist.

   Copy is founder-supplied. Three lines differ from the mockup, on purpose,
   and are listed in the SR-484 register entry: two for N2 vocabulary, and one
   that claimed a recording is stored. No recording is kept: the audio is
   discarded as it is transcribed. */
(function (global, document) {
  'use strict';

  var ICON = {
    voice: '<path d="M4 10v4M8 7v10M12 4v16M16 8v8M20 11v2"/>',
    flow: '<path d="M5 6h8a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h10"/><path d="M16 15l3 3-3 3"/>',
    feedback: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
    tracking: '<path d="M4 7h10M4 12h16M4 17h7"/><circle cx="17" cy="7" r="2"/><circle cx="14" cy="17" r="2"/>',
    private: '<path d="M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6z"/><path d="M9.5 12l2 2 3.5-4"/>',
    integration: '<path d="M4 18c4 0 5-12 9-12 2.5 0 3.5 3 3.5 6"/><path d="M14 10l2.5 2.5L19 10"/><path d="M4 21h16"/>'
  };
  var POINTS = [
    ['voice', 'Your voice', 'Speak freely. This is your process, not a script.'],
    ['flow', 'Structured flow', 'Built on Recognise, Regulate, Release and Rise.'],
    ['feedback', 'AI feedback', 'Your written record is read back to you in your own words — what you returned to, and what shifted. Only after you finish.'],
    ['tracking', 'Personal tracking', 'Tagged by state and protocol, so you can see your progress over time.'],
    ['private', 'Private by design', 'Your voice is never sent anywhere. It becomes text on your own device and the audio is discarded as it goes.'],
    ['integration', 'Real integration', 'Turn moments of strain into lasting change you can actually see.']
  ];
  var PLANS_HREF = '/plans#sr-pl-tier-sovereign';

  function svg(name) {
    return '<svg class="sr-su-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + ICON[name] + '</svg>';
  }

  function bandHTML() {
    return '<picture class="sr-su-art">' +
        '<source srcset="/assets/dashboard/sv-upsell-band.webp" type="image/webp">' +
        '<img src="/assets/dashboard/sv-upsell-band.jpg" alt="" width="2400" height="800" loading="lazy" decoding="async">' +
      '</picture>' +
      '<div class="sr-su-copy">' +
        '<p class="sr-su-eyebrow">SafeRise</p>' +
        '<p class="sr-su-kick">Same method. Your voice. Your process.</p>' +
        '<h2 class="sr-su-h" id="srSuH">Sovereign</h2>' +
        '<p class="sr-su-sub">The space to do the work, in your own words.</p>' +
        '<p class="sr-su-body">Sovereign gives you the sound, the structure and the space to apply the SafeRise method yourself — speaking, feeling, processing and integrating in real time.</p>' +
        '<p class="sr-su-close"><span class="sr-su-gold">Guided</span> teaches you the method.<br><span class="sr-su-gold">Sovereign</span> lets you live it.</p>' +
        '<p class="sr-su-acts"><button type="button" class="sr-su-btn" id="srSuOpen" aria-haspopup="dialog" aria-controls="srSuDialog">See what Sovereign adds</button></p>' +
      '</div>' +
      '<p class="sr-su-pull">The same you, with more room to breathe.</p>';
  }

  function dialogHTML() {
    return '<div class="sr-su-dlgin">' +
        '<div class="sr-su-dlghead">' +
          '<h2 class="sr-su-dlgh" id="srSuDlgH">What Sovereign adds</h2>' +
          '<button type="button" class="sr-su-x" data-su="close" aria-label="Close">' +
            '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
        '</div>' +
        '<ul class="sr-su-points">' + POINTS.map(function (p) {
          return '<li class="sr-su-point">' + svg(p[0]) +
            '<span class="sr-su-plabel">' + p[1] + '</span><span class="sr-su-pline">' + p[2] + '</span></li>';
        }).join('') + '</ul>' +
        '<div class="sr-su-dlgfoot">' +
          '<a class="sr-su-btn" href="' + PLANS_HREF + '">Upgrade to Sovereign</a>' +
          '<button type="button" class="sr-su-plain" data-su="close">Not now</button>' +
        '</div>' +
      '</div>';
  }

  function focusables(root) {
    return Array.prototype.filter.call(
      root.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
      function (el) { return el.offsetParent !== null || el === document.activeElement; });
  }

  function build(after) {
    var band = document.createElement('section');
    band.className = 'sr-su-band';
    band.setAttribute('aria-labelledby', 'srSuH');
    band.innerHTML = bandHTML();

    var dlg = document.createElement('dialog');
    dlg.className = 'sr-su-dialog';
    dlg.id = 'srSuDialog';
    dlg.setAttribute('aria-labelledby', 'srSuDlgH');
    dlg.innerHTML = dialogHTML();

    after.insertAdjacentElement('afterend', band);
    band.insertAdjacentElement('afterend', dlg);

    var trigger = band.querySelector('#srSuOpen');
    trigger.addEventListener('click', function () {
      if (dlg.open) return;
      dlg.showModal();
      var first = dlg.querySelector('.sr-su-x');
      if (first) first.focus();
    });
    dlg.addEventListener('click', function (e) {
      if (e.target.closest('[data-su="close"]')) dlg.close();
      else if (e.target === dlg) dlg.close();          // the backdrop
    });
    /* showModal() already makes the page inert. The wrap below keeps Tab
       cycling inside the dialog rather than leaving for the browser's own
       controls. Escape is the dialog's own cancel, which closes it. */
    dlg.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var f = focusables(dlg);
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    dlg.addEventListener('close', function () { trigger.focus(); });
  }

  function mount() {
    var access = global.SafeRiseAccess;
    if (!access || typeof access.resolve !== 'function') return;
    var ready = access.ready && typeof access.ready.then === 'function' ? access.ready : Promise.resolve();
    ready.catch(function () {}).then(function () {
      if (access.resolve().tier === 'sovereign') return;   // nothing built, nothing to hide
      if (document.querySelector('.sr-su-band')) return;
      var after = document.getElementById('srJourney');
      if (after) build(after);
    });
  }

  global.SafeRiseUpsell = { mount: mount };
})(window, document);
