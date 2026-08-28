/* ═══════════════════════════════════════════════════════════════════════
   SafeRise — track page template
   One renderer, three routes. Reads content/tracks.js and authors nothing.

   Section order is fixed and matches the approved mockup:
     hero · protocols + journey · cost · range · why-insight · four steps ·
     six areas · resources · progress · price · FAQ · scope

   The scope block is legally load-bearing and is never conditional.

   Classes are namespaced `sr-tp-`, not plain `sr-`: five of the template's
   names (.note .on .scope .sechead .pbody) already exist under `sr-` in
   this codebase, and CLAUDE.md records what the last such collision cost.
   `.gold` keeps its literal name — it is embedded in the copy in
   content/tracks.js and renaming it would orphan sixteen spans.
   ═══════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';

  /* ── inline SVG, lifted verbatim from the approved mockup ──────────
     Vector, not raster: these are diagrams, and they are the only
     images on the page that are not waiting on the art lane. */
  var GRAPHICS = {"trigger": "<div class=\"sr-tp-graphic sr-tp-graphic--feature sr-tp-graphic-scroll\">\n        <p class=\"sr-tp-glabel\">A trigger travels on two timelines</p>\n        <svg viewBox=\"0 0 760 430\" role=\"img\" aria-label=\"The body initiates a protective response before conscious thought interprets a trigger\">\n          <defs><linearGradient id=\"fastLane11\" x1=\"0\" x2=\"1\"><stop stop-color=\"#C97A5A\"/><stop offset=\"1\" stop-color=\"#D4A843\"/></linearGradient><linearGradient id=\"slowLane11\" x1=\"0\" x2=\"1\"><stop stop-color=\"#5A6B84\"/><stop offset=\"1\" stop-color=\"#4E9AA6\"/></linearGradient></defs>\n          <g opacity=\".55\" stroke=\"#22222E\"><path d=\"M72 110H700M72 218H700M72 326H700\"/><path d=\"M72 75V351M274 75V351M476 75V351M700 75V351\"/></g><circle cx=\"86\" cy=\"218\" r=\"20\" fill=\"#15151F\" stroke=\"#D4A843\"/><path d=\"M78 218h16M86 210v16\" stroke=\"#D4A843\" stroke-width=\"2\"/>\n          <path d=\"M108 218C174 218 182 118 264 118S352 118 418 118\" fill=\"none\" stroke=\"url(#fastLane11)\" stroke-width=\"5\" stroke-linecap=\"round\"/><path d=\"M108 218C181 218 202 316 292 316S424 316 520 316\" fill=\"none\" stroke=\"url(#slowLane11)\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-dasharray=\"4 7\"/>\n          <g transform=\"translate(438 118)\"><circle r=\"42\" fill=\"#C97A5A\" opacity=\".10\"/><circle r=\"27\" fill=\"#15151F\" stroke=\"#C97A5A\"/><path d=\"M-11-4Q0-18 11-4M-13 6Q0 17 13 6M0-17V17\" fill=\"none\" stroke=\"#E6B49F\" stroke-width=\"2\"/></g><g transform=\"translate(540 316)\"><circle r=\"42\" fill=\"#4E9AA6\" opacity=\".10\"/><circle r=\"27\" fill=\"#15151F\" stroke=\"#4E9AA6\"/><path d=\"M-12 5Q-4-17 8-8Q19 1 7 17Q-2 22-12 5Z\" fill=\"none\" stroke=\"#8FC1C9\" stroke-width=\"2\"/><circle cx=\"3\" cy=\"0\" r=\"3\" fill=\"#8FC1C9\"/></g>\n          <path d=\"M466 118C606 118 598 218 676 218M568 316C630 316 630 255 676 232\" fill=\"none\" stroke=\"#D4A843\" stroke-opacity=\".35\"/><g transform=\"translate(690 225)\"><circle r=\"38\" fill=\"#D4A843\" opacity=\".12\"/><circle r=\"25\" fill=\"#15151F\" stroke=\"#D4A843\"/><path d=\"M-9 1l7 7 13-17\" fill=\"none\" stroke=\"#ECC96A\" stroke-width=\"2.5\"/></g>\n          <g font-family=\"DM Sans\"><text x=\"68\" y=\"178\" fill=\"#D4A843\" font-size=\"10\" letter-spacing=\"2.5\">TRIGGER</text><text x=\"244\" y=\"88\" fill=\"#C97A5A\" font-size=\"10\" letter-spacing=\"2.5\">FAST ROUTE</text><text x=\"244\" y=\"105\" fill=\"#9C9AA4\" font-size=\"12\">protective response begins</text><text x=\"267\" y=\"365\" fill=\"#4E9AA6\" font-size=\"10\" letter-spacing=\"2.5\">SLOWER ROUTE</text><text x=\"267\" y=\"383\" fill=\"#9C9AA4\" font-size=\"12\">meaning and context arrive</text><text x=\"631\" y=\"178\" fill=\"#D4A843\" font-size=\"10\" letter-spacing=\"2.5\">CHOICE</text></g>\n        </svg>\n        <div class=\"sr-tp-graphic-caption\"><span>Regulate the fast route first.</span><strong>Then reflection becomes available.</strong></div>\n      </div>", "breath": "<div class=\"sr-tp-graphic\"><p class=\"sr-tp-glabel\">The coherence rhythm</p><p class=\"sr-tp-gsub\">Around six breaths a minute is where heart-rate variability peaks for most people. It is the most measurable lever you have on your own state — the body reads the rhythm as evidence of safety before the mind has agreed to anything. The session paces it for you.</p><svg viewBox=\"0 0 520 300\" role=\"img\" aria-label=\"Breathing rhythm showing a four-count inhale and six-count exhale\"><defs><linearGradient id=\"breathLine11\" x1=\"0\" x2=\"1\"><stop stop-color=\"#4E9AA6\"/><stop offset=\".55\" stop-color=\"#ECC96A\"/><stop offset=\"1\" stop-color=\"#D4A843\"/></linearGradient><linearGradient id=\"breathArea11\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#4E9AA6\" stop-opacity=\".18\"/><stop offset=\"1\" stop-color=\"#4E9AA6\" stop-opacity=\"0\"/></linearGradient></defs><g opacity=\".55\" stroke=\"#22222E\"><path d=\"M28 138H493M28 186H493M28 234H493\"/></g><path d=\"M28 234 C82 234 96 131 157 131 S229 244 297 244 S371 131 433 131 S475 197 493 210 L493 254L28 254Z\" fill=\"url(#breathArea11)\"/><path d=\"M28 234 C82 234 96 131 157 131 S229 244 297 244 S371 131 433 131 S475 197 493 210\" fill=\"none\" stroke=\"url(#breathLine11)\" stroke-width=\"3.5\" stroke-linecap=\"round\"/><g fill=\"#15151F\" stroke=\"#D4A843\"><circle cx=\"157\" cy=\"131\" r=\"5\"/><circle cx=\"433\" cy=\"131\" r=\"5\"/></g><g fill=\"#6A6874\" font-family=\"DM Sans\" font-size=\"10\" letter-spacing=\"1.4\"><text x=\"104\" y=\"282\">INHALE</text><text x=\"215\" y=\"282\">LONGER EXHALE</text><text x=\"385\" y=\"282\">INHALE</text></g></svg><div class=\"sr-tp-graphic-caption\"><span>About six breaths per minute.</span><strong>No force. No perfect count.</strong></div></div>", "spiral": "<div class=\"sr-tp-graphic\"><p class=\"sr-tp-glabel\">The sequence becomes familiar</p><svg viewBox=\"0 0 520 300\" role=\"img\" aria-label=\"The four SafeRise steps forming an inward spiral toward a regulated state\"><defs><linearGradient id=\"spiral11\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop stop-color=\"#C97A5A\"/><stop offset=\".35\" stop-color=\"#D4A843\"/><stop offset=\".68\" stop-color=\"#7FA88C\"/><stop offset=\"1\" stop-color=\"#4E9AA6\"/></linearGradient><radialGradient id=\"core11\"><stop stop-color=\"#D4A843\" stop-opacity=\".35\"/><stop offset=\"1\" stop-color=\"#D4A843\" stop-opacity=\"0\"/></radialGradient></defs><circle cx=\"260\" cy=\"151\" r=\"116\" fill=\"none\" stroke=\"#1f1f2b\"/><circle cx=\"260\" cy=\"151\" r=\"81\" fill=\"none\" stroke=\"#1f1f2b\"/><circle cx=\"260\" cy=\"151\" r=\"48\" fill=\"url(#core11)\"/><path d=\"M260 35C356 35 403 111 376 188C350 261 244 280 177 223C116 171 147 80 219 72C284 65 329 120 307 172C289 214 227 211 212 169C200 136 224 111 254 111\" fill=\"none\" stroke=\"url(#spiral11)\" stroke-width=\"4\" stroke-linecap=\"round\"/><g font-family=\"DM Sans\"><g transform=\"translate(260 35)\"><circle r=\"18\" fill=\"#15151F\" stroke=\"#C97A5A\"/><text text-anchor=\"middle\" y=\"4\" fill=\"#F5EDD8\" font-size=\"11\">01</text></g><text x=\"236\" y=\"22\" fill=\"#C97A5A\" font-size=\"10\" letter-spacing=\"2\" text-anchor=\"end\">NAME</text><g transform=\"translate(376 188)\"><circle r=\"18\" fill=\"#15151F\" stroke=\"#D4A843\"/><text text-anchor=\"middle\" y=\"4\" fill=\"#F5EDD8\" font-size=\"11\">02</text></g><text x=\"404\" y=\"248\" fill=\"#D4A843\" font-size=\"10\" letter-spacing=\"2\">HEART</text><g transform=\"translate(177 223)\"><circle r=\"18\" fill=\"#15151F\" stroke=\"#7FA88C\"/><text text-anchor=\"middle\" y=\"4\" fill=\"#F5EDD8\" font-size=\"11\">03</text></g><text x=\"69\" y=\"252\" fill=\"#7FA88C\" font-size=\"10\" letter-spacing=\"2\">RELEASE</text><g transform=\"translate(307 172)\"><circle r=\"18\" fill=\"#15151F\" stroke=\"#4E9AA6\"/><text text-anchor=\"middle\" y=\"4\" fill=\"#F5EDD8\" font-size=\"11\">04</text></g><text x=\"307\" y=\"212\" fill=\"#4E9AA6\" font-size=\"10\" letter-spacing=\"2\" text-anchor=\"middle\">EXPAND</text></g><circle cx=\"254\" cy=\"111\" r=\"7\" fill=\"#D4A843\"/><text x=\"254\" y=\"151\" text-anchor=\"middle\" fill=\"#F5EDD8\" font-family=\"Cormorant Garamond\" font-style=\"italic\" font-size=\"16\">choice</text></svg><div class=\"sr-tp-graphic-caption\"><span>Each repetition shortens the route.</span><strong>The body learns what comes next.</strong></div></div>", "progress": "<div class=\"sr-tp-graphic sr-tp-graphic--feature sr-tp-graphic-scroll\">\n      <p class=\"sr-tp-glabel\">The floor moves—not just the peaks</p>\n      <svg viewBox=\"0 0 1000 500\" role=\"img\" aria-label=\"Before and after scores improve across eight sessions as the baseline rises and the route back becomes shorter\">\n        <defs><linearGradient id=\"progressArea11\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#4E9AA6\" stop-opacity=\".26\"/><stop offset=\"1\" stop-color=\"#4E9AA6\" stop-opacity=\"0\"/></linearGradient><linearGradient id=\"sessionBars11\" x1=\"0\" y1=\"1\" x2=\"0\" y2=\"0\"><stop stop-color=\"#4E9AA6\"/><stop offset=\"1\" stop-color=\"#ECC96A\"/></linearGradient></defs>\n        <g transform=\"translate(36 58)\"><g stroke=\"#252531\"><path d=\"M0 40H566M0 120H566M0 200H566M0 280H566M0 360H566\"/></g><g fill=\"#666471\" font-family=\"DM Sans\" font-size=\"10\"><text x=\"0\" y=\"22\" letter-spacing=\"2\">MORE ACCESS TO CHOICE</text><text x=\"0\" y=\"385\" letter-spacing=\"2\">SESSION 01</text><text x=\"488\" y=\"385\" letter-spacing=\"2\">SESSION 08</text></g><path d=\"M18 306C90 301 128 277 198 272S314 230 384 226S495 175 550 163V360H18Z\" fill=\"url(#progressArea11)\"/><path d=\"M18 306C90 301 128 277 198 272S314 230 384 226S495 175 550 163\" fill=\"none\" stroke=\"#4E9AA6\" stroke-width=\"3\" stroke-linecap=\"round\"/><g stroke-linecap=\"round\"><path d=\"M28 314V243M98 294V213M168 283V192M238 259V164M308 246V142M378 223V116M448 194V92M518 172V67\" stroke=\"#30303E\" stroke-width=\"13\"/><path d=\"M28 314V243M98 294V213M168 283V192M238 259V164M308 246V142M378 223V116M448 194V92M518 172V67\" stroke=\"url(#sessionBars11)\" stroke-width=\"5\"/></g><g fill=\"#15151F\" stroke=\"#ECC96A\"><circle cx=\"28\" cy=\"243\" r=\"5\"/><circle cx=\"98\" cy=\"213\" r=\"5\"/><circle cx=\"168\" cy=\"192\" r=\"5\"/><circle cx=\"238\" cy=\"164\" r=\"5\"/><circle cx=\"308\" cy=\"142\" r=\"5\"/><circle cx=\"378\" cy=\"116\" r=\"5\"/><circle cx=\"448\" cy=\"92\" r=\"5\"/><circle cx=\"518\" cy=\"67\" r=\"5\"/></g><g fill=\"#15151F\" stroke=\"#4E9AA6\"><circle cx=\"28\" cy=\"314\" r=\"5\"/><circle cx=\"98\" cy=\"294\" r=\"5\"/><circle cx=\"168\" cy=\"283\" r=\"5\"/><circle cx=\"238\" cy=\"259\" r=\"5\"/><circle cx=\"308\" cy=\"246\" r=\"5\"/><circle cx=\"378\" cy=\"223\" r=\"5\"/><circle cx=\"448\" cy=\"194\" r=\"5\"/><circle cx=\"518\" cy=\"172\" r=\"5\"/></g><g transform=\"translate(350 327)\" font-family=\"DM Sans\" font-size=\"10\"><circle r=\"4\" fill=\"#4E9AA6\"/><text x=\"12\" y=\"4\" fill=\"#7D7B87\">before</text><circle cx=\"72\" r=\"4\" fill=\"#ECC96A\"/><text x=\"84\" y=\"4\" fill=\"#7D7B87\">after</text></g></g>\n        <g font-family=\"DM Sans\"><g transform=\"translate(650 50)\"><rect width=\"310\" height=\"112\" rx=\"12\" fill=\"#15151F\" stroke=\"#292936\"/><text x=\"22\" y=\"30\" fill=\"#D4A843\" font-size=\"9\" letter-spacing=\"2.3\">01 · SCORE</text><text x=\"22\" y=\"60\" fill=\"#F5EDD8\" font-family=\"Cinzel\" font-size=\"15\">Before &amp; after</text><text x=\"22\" y=\"85\" fill=\"#85838E\" font-size=\"11\">two numbers · ten seconds</text></g><g transform=\"translate(650 190)\"><rect width=\"310\" height=\"112\" rx=\"12\" fill=\"#15151F\" stroke=\"#292936\"/><text x=\"22\" y=\"30\" fill=\"#D4A843\" font-size=\"9\" letter-spacing=\"2.3\">02 · TIER</text><text x=\"22\" y=\"60\" fill=\"#F5EDD8\" font-family=\"Cinzel\" font-size=\"15\">The pattern becomes readable</text><text x=\"22\" y=\"85\" fill=\"#85838E\" font-size=\"11\">early signs → clearer evidence</text></g><g transform=\"translate(650 330)\"><rect width=\"310\" height=\"112\" rx=\"12\" fill=\"#15151F\" stroke=\"#292936\"/><text x=\"22\" y=\"30\" fill=\"#4E9AA6\" font-size=\"9\" letter-spacing=\"2.3\">03 · LEARNING</text><text x=\"22\" y=\"60\" fill=\"#F5EDD8\" font-family=\"Cinzel\" font-size=\"15\">The route shortens</text><text x=\"22\" y=\"85\" fill=\"#85838E\" font-size=\"11\">less time to find your footing</text></g></g>\n      </svg>\n      <div class=\"sr-tp-graphic-caption\"><span>One session settles a state.</span><strong>Repetition changes where you return.</strong></div>\n    </div>"};

  var ICONS = {
  play:  '<circle cx="12" cy="12" r="9"/><path d="M10 8.5l6 3.5-6 3.5z"/>',
  gear:  '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.2 5.2l2.1 2.1M16.7 16.7l2.1 2.1M18.8 5.2l-2.1 2.1M7.3 16.7l-2.1 2.1"/>',
  book2: '<path d="M4 5.5h7v13H4zM13 5.5h7v13h-7z"/>',
  bulb:  '<path d="M9.5 18.5h5M10.5 21h3M12 3a6 6 0 00-3.8 10.6V16h7.6v-2.4A6 6 0 0012 3z"/>',
  heart: '<path d="M12 20.5c4.8-3.9 7.6-7.2 7.6-10.6A4.8 4.8 0 0012 6.3a4.8 4.8 0 00-7.6 3.6c0 3.4 2.8 6.7 7.6 10.6z"/>',
  case:  '<path d="M4 7.5h16v12H4zM4 7.5l2-3h12l2 3M9.5 12h5"/>',
  warn:  '<path d="M12 4l8.5 15.5h-17zM12 10v4.2M12 17h.01"/>',
  comp:  '<circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.5l-2.2 5.3-5.3 2.2 2.2-5.3z"/>',
  shield:'<path d="M12 3.2l8 2.9v5.6c0 4.8-3.4 7.7-8 9-4.6-1.3-8-4.2-8-9V6.1zM9.2 11.8l2.1 2.1 3.6-3.7"/>',
  mail:  '<path d="M3.5 8h17v11.5h-17zM3.5 8l8.5 5.8L20.5 8M8 8V4.8h8V8"/>',
  pin:   '<path d="M12 21s6.5-6.1 6.5-10.5a6.5 6.5 0 10-13 0C5.5 14.9 12 21 12 21z"/><circle cx="12" cy="10.4" r="2.4"/>',
  face:  '<circle cx="12" cy="8.6" r="3.6"/><path d="M5 20a7 7 0 0114 0"/>',
  chart: '<path d="M4.5 19V9.5M10 19V5M15.5 19v-7M21 19H3"/>',
  pen:   '<path d="M4.5 19.5l4-1L19 8l-3-3L5.5 15.5z"/>'
};

  /* Fields the data did not supply. Surfaced on window for the audit
     harness rather than the console, so a live page stays quiet. */
  var MISSING = [];
  function val(v, field) {
    if (v && String(v).trim()) return v;
    MISSING.push(field);
    return '';
  }
  function has(v) { return !!(v && (v.length === undefined || v.length > 0)); }
  function esc(s) { return String(s).replace(/&(?![a-z#0-9]+;)/gi, '&amp;'); }

  /* ── art · every slot degrades to a labelled brief ─────────────────
     Sixteen illustrations are briefed in track.art and none are produced.
     The page must render correctly with zero art present, so the
     placeholder is the normal state, not an error state. */
  /* SR-213 · art entries became objects {src, ratio, brief}. Kept tolerant of
     a bare string so a slot not yet migrated still returns its brief. */
  function brief(t, key) {
    var a = t.art && t.art[key];
    if (!a) return 'brief needed';
    return (typeof a === 'string') ? a : (a.brief || 'brief needed');
  }
  /* SR-213 · the image slot. It RECEIVES a record entry; it does not build one.
     Before this, every call site concatenated the path, the pixel dimensions and
     the brief into a label string — so the asset path lived in this file rather
     than in the record, which is the pattern the project forbids and the reason
     nothing was ever wired.

     Degrade path, and it is the normal state rather than an error state: with no
     `src` the labelled placeholder renders exactly as it always did, carrying the
     brief so the image lane can still read what the slot wants. Track 03 has no
     files and exercises this immediately.

     `onerror` removes the img and leaves the placeholder beneath it, so a path
     that is present in the record but missing on disk degrades to the same
     labelled state rather than to a broken-image glyph.

     alt is empty by intent. These illustrate copy that already says the thing,
     which makes them decorative; writing descriptive alt would be authoring
     member-facing copy, and the `brief` is art direction, not a description of
     what a sighted user sees. */
  function slot(a, fallbackLabel, fallbackRatio) {
    var ratio = (a && a.ratio) || fallbackRatio || '16/6';
    var label = (a && a.brief) || fallbackLabel || '';
    var inner = '<span>' + esc(label) + '</span>';
    if (a && a.src) {
      inner = '<img class="sr-tp-slotimg" src="' + esc(a.src) + '" alt="" ' +
              'loading="lazy" decoding="async" onerror="this.remove()">' + inner;
    }
    return '<div class="sr-tp-ph" style="aspect-ratio:' + ratio + '">' + inner + '</div>';
  }

  /* Covers are path references. No inline base64 anywhere on this page. */
  function coverPath(trackId, no) {
    return trackId === 1 ? 'assets/covers/' + no + '.jpg'
                         : 'assets/covers/t' + trackId + '-' + no + '.jpg';
  }

  function sechead(eyebrow, h2, lede) {
    return '<div class="sr-tp-sechead"><p class="sr-tp-eyebrow">' + eyebrow +
           '</p><h2>' + h2 + '</h2>' +
           (lede ? '<p class="sr-tp-lede">' + lede + '</p>' : '') + '</div>';
  }

  /* ── 00 · hero ───────────────────────────────────────────────────── */
  /* SR-213 · the hero carries its photograph and its scrim as custom properties
     read from the record, never as a hardcoded background. With no `src` the
     element sets neither and the CSS falls through to the abstract shape it has
     always drawn — the fallback is never removed, so a missing file renders the
     original panel rather than an empty one. Track 03 does this today. */
  /* SR-261 · THE URL IS ABSOLUTISED HERE, AND ONLY HERE.
     A relative url() inside a custom property is resolved against the
     STYLESHEET that consumes it, not the document that declared it. This value
     is declared in an inline style attribute and consumed by
     css/saferise-system.css, so `url(assets/t1/hero.jpg)` was fetched as
     /css/assets/t1/hero.jpg — a 404 on every track page, five per load, with
     the hero photograph silently replaced by the fallback gradient beneath it.
     Nothing looked broken, which is why it survived: the fallback is a
     deliberate design, so a missing photograph renders as a designed panel.

     Resolved against location.href rather than given a leading slash, because a
     leading slash assumes the site is served from the domain root and this one
     need not be. THE RECORD STAYS RELATIVE — `hero.src` is untouched, and the
     <img> and slot() consumers that already resolve correctly are unaffected. */
  function heroVars(t) {
    var h = t.art && t.art.hero;
    if (!h || !h.src) return '';
    var abs = h.src;
    try { abs = new URL(h.src, document.baseURI).href; } catch (e) {}
    return ' style="--sr-hero-img:url(' + esc(abs) + ')' +
           (h.scrim ? ';--sr-hero-scrim:' + h.scrim : '') + '"';
  }

  function rHero(t) {
    var h = t.art && t.art.hero;
    return '<div class="sr-tp-hero' + (h && h.src ? ' sr-tp-hero--photo' : '') + '"' +
      heroVars(t) + '>' +
      (h && h.src ? '<img class="sr-tp-herostack" src="' + esc(h.src) +
                    '" alt="" loading="lazy" decoding="async" onerror="this.remove()">' : '') +
      '<div class="sr-tp-heroin">' +
      '<p class="sr-tp-eyebrow" style="margin-bottom:22px">' + t.kicker + '</p>' +
      '<h1>' + t.heroTitle + '</h1>' +
      '<div class="sr-tp-herorule"><p>' + val(t.heroRule, 'heroRule') + '</p></div>' +
      t.heroBody.map(function (p) { return '<p class="sr-tp-body">' + p + '</p>'; }).join('') +
    '</div></div>';
  }

  /* ── 01 · protocol carousel ──────────────────────────────────────── */
  function rProtocols(t) {
    var cards = t.protocols.map(function (p) {
      /* SR-162 · the cover comes from js/saferise-card.js, the one source
         dashboard.html shares. The number and label are the same record
         fields they always were — p[0] and p[1] — but the component keeps
         them over the loaded image rather than under it. */
      /* SR-182 · the card opens the protocol again. SR-178 stripped the
         affordance because `protocol.html` ignored ?track= and ?protocol= and
         every one of the thirty cards could only land on Anxiety Reset — 29
         silently wrong destinations. The page now resolves both against the
         record and shows a not-found state rather than a wrong protocol, so
         there is something to open and role="button" is honest. SR-178's own
         condition was "the cursor returns when there is something to open".

         The href is built from the record, never typed: t.id and p[0] are the
         same two values the cover path already derives from. */
      return '<article class="sr-tp-pcard" tabindex="0" role="button"' +
        ' data-sr-open="protocol.html?track=' + esc(String(t.id)) +
        '&amp;protocol=' + esc(String(p[0])) + '">' +
        SafeRiseCover.art({ src: coverPath(t.id, p[0]), no: p[0], label: p[1] }) +
        /* SR-174 · title and promise stay; signature and chips move into
           .sr-tp-preveal, which is out of flow and revealed on hover or focus.
           tabindex makes the card reachable so a keyboard user can open the
           reveal, and now also operate it. */
        '<div class="sr-tp-pmeta"><h3>' + esc(p[2]) + '</h3>' +
        '<p class="sr-tp-pdesc">' + esc(val(p[3], 'promise:' + p[2])) + '</p>' +
        '<div class="sr-tp-preveal">' +
          '<p class="sr-tp-pbody">' + esc(val(p[4], 'signature:' + p[2])) + '</p>' +
          '<p class="sr-tp-struggle">' + (has(p[5])
              ? p[5].map(function (s) { return '<span>“' + esc(s) + '”</span>'; }).join('')
              : '') + '</p>' +
        '</div>' +
        '</div></article>';
    }).join('');

    return '<div class="sr-tp-band sr-tp-band--flush" id="protocols">' +
      '<div class="sr-tp-sechead sr-tp-sechead--center" style="padding:0 24px">' +
        '<p class="sr-tp-eyebrow">Where to begin</p>' +
        '<h2 class="sr-tp-h2--oneline">Start with the state that traps you most.</h2>' +
        '<p class="sr-tp-lede">Each protocol is a complete guided system — tools for before, during and after, with the research shown at every step.</p>' +
      '</div>' +
      /* SR-290 · aria-live="off" wraps only the carhead+viewport, not
         rJourney below it — a live-region attribute on the whole #protocols
         band would apply to unrelated content sharing that ancestor. off,
         not omitted: it states the auto-advancing region is deliberately
         silent to assistive tech rather than leaving that to each screen
         reader's default inference. */
      '<div class="sr-tp-carousel" id="carousel" aria-live="off">' +
      '<div class="sr-tp-carhead"><span class="sr-tp-carkick">Browse all protocols</span>' +
        /* SR-163 · dots, not "1 / 10". The rail is built by initCarousel once
           it knows how many cards fit, because the number of pages depends on
           the viewport and cannot be written into the markup. */
        '<div class="sr-tp-carnav"><div class="sr-tp-cardots" id="carDots"></div>' +
        '<button class="sr-tp-carbtn" id="carPrev" aria-label="Previous protocol"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3L5 8l5 5"/></svg></button>' +
        '<button class="sr-tp-carbtn" id="carNext" aria-label="Next protocol"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3l5 5-5 5"/></svg></button></div>' +
      '</div>' +
      '<div class="sr-tp-carviewport" id="carViewport"><div class="sr-tp-cartrack">' + cards + '</div></div>' +
      '</div>' +
      rJourney(t) +
    '</div>';
  }

  /* ── 01b · journey ───────────────────────────────────────────────── */
  function rJourney(t) {
    var j = t.journey || {};
    return '<div class="sr-tp-journey">' +
      '<div class="sr-tp-jtop">' +
        '<p class="sr-tp-jkick">The journey within each protocol</p>' +
        '<h3 class="sr-tp-jtitle">' + val(j.title, 'journey.title') + '</h3>' +
        '<p class="sr-tp-jsub">' + val(j.sub, 'journey.sub') + '</p>' +
      '</div>' +
      slot(t.art && t.art.band, brief(t, 'band'), '1400/380') +
      '<div class="sr-tp-jrule"></div>' +
      '<div class="sr-tp-jcols">' +
        '<div class="sr-tp-jcol"><p class="sr-tp-jtag" style="color:var(--gold)">01 · Start here</p>' +
          '<p class="sr-tp-jname">Experience</p><p class="sr-tp-jvalue" style="color:var(--gold-lt)">Change your state, now.</p>' +
          '<p class="sr-tp-jbody">' + val(j.experience, 'journey.experience') + '</p>' +
          '<p class="sr-tp-jbody">Use the Cue Card when a full session isn’t realistic.</p></div>' +
        '<div class="sr-tp-jcol"><p class="sr-tp-jtag" style="color:var(--text2)">02 · Every time</p>' +
          '<p class="sr-tp-jname">Log &amp; Journal</p><p class="sr-tp-jvalue">Turn change into a record.</p>' +
          '<p class="sr-tp-jbody">' + val(j.log, 'journey.log') + '</p>' +
          '<p class="sr-tp-jbody">Over time, the record shows patterns changing and the route back becoming shorter.</p></div>' +
        '<div class="sr-tp-jcol"><p class="sr-tp-jtag" style="color:var(--teal)">03 · Optional depth</p>' +
          '<p class="sr-tp-jname">Go Deeper</p><p class="sr-tp-jvalue" style="color:var(--teal)">Understand. Integrate. Choose.</p>' +
          '<p class="sr-tp-jbody">' + esc(resourceCount(val(j.deeper, 'journey.deeper'))) + '</p>' +
          '<p class="sr-tp-jnote">' + val(j.deeperNote, 'journey.deeperNote') + '</p></div>' +
      '</div>' +
      '<div class="sr-tp-jopt"><div><p class="sr-tp-jopttag">Optional support</p>' +
        '<p class="sr-tp-jopttitle">When self-guided isn’t enough.</p></div>' +
        '<p class="sr-tp-joptbody">Two ways to have another person in the room.</p>' +
        '<div class="sr-tp-joptbtns"><a href="#start" class="sr-tp-jpill">Workshop</a>' +
        '<a href="#start" class="sr-tp-jpill">Premium 1:1</a></div>' +
      '</div>' +
    '</div>';
  }

  /* SR-054 · the library count is derived, never typed. Copy that names
     the size of the library gets its numeral from SHARED.resources. */
  var NUMWORD = ['zero','one','two','three','four','five','six','seven','eight',
                 'nine','ten','eleven','twelve','thirteen','fourteen','fifteen',
                 'sixteen','seventeen','eighteen','nineteen','twenty'];
  function countWord(n) { return NUMWORD[n] || String(n); }
  /* SR-078 · also matches the spaced form. "twelve-resource library" was
     rewritten here already; "each with twelve resources" was not, and went
     stale on its own. Both shapes are covered now. */
  /* SR-253 · the numeral is the CURRENT TRACK's library size, not a global one.
     There is no single number across the three: Track 03 has eleven types,
     Tracks 01 and 02 have ten. */
  function libSize() {
    return (typeof trackResourceCount === 'function' && CURRENT_TRACK)
      ? trackResourceCount(CURRENT_TRACK) : SHARED.resources.length;
  }
  function resourceCount(s) {
    var WORDS = 'zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty';
    return String(s)
      .replace(new RegExp('\\b(?:' + WORDS + ')(-resource\\b)', 'gi'),
        function (_, tail) { return countWord(libSize()) + tail; })
      .replace(new RegExp('\\b(?:' + WORDS + ')(\\s+resources\\b)', 'gi'),
        function (_, tail) { return countWord(libSize()) + tail; });
  }

  /* ── 02 · cost ───────────────────────────────────────────────────── */
  function rCost(t) {
    var c = t.cost;
    return '<div class="sr-tp-band sr-tp-band--alt"><div class="sr-tp-wide">' +
      sechead(c.eyebrow, c.h2, c.lede) +
      '<div class="sr-tp-costimg">' +
        slot(t.art && t.art.cost, brief(t, 'cost'), '16/7') +
        '<div class="sr-tp-costcaps">' + c.caps.map(function (x) {
          return '<div class="sr-tp-costcap"><p class="sr-tp-cctime">' + x[0] +
                 '</p><p class="sr-tp-ccname">' + x[1] + '</p></div>';
        }).join('') + '</div></div>' +
      '<p class="sr-tp-costnote">' + c.note + '</p>' +
      '<div class="sr-tp-costgrid">' + c.items.map(function (i) {
        return '<div class="sr-tp-citem" style="--edge:' + i[2] + '"><p class="sr-tp-cikey">' +
               i[0] + '</p><p class="sr-tp-cival">' + i[1] + '</p></div>';
      }).join('') + '</div>' +
      '<p class="sr-tp-costclose">' + c.close + '</p>' +
    '</div></div>';
  }

  /* ── 03 · the range ──────────────────────────────────────────────── */
  function rRange(t) {
    var r = t.range;
    return '<div class="sr-tp-band"><div class="sr-tp-wide">' +
      sechead(r.eyebrow, r.h2, r.lede) +
      '<div class="sr-tp-rangefig"><div class="sr-tp-rangeimg">' +
        slot(t.art && t.art.range, brief(t, 'range'), '16/6') +
        '<div class="sr-tp-rangecaps">' +
          '<div class="sr-tp-rcap"><p class="sr-tp-rcname" style="color:var(--mob)">Mobilisation</p><p class="sr-tp-rcsub">Sympathetic</p></div>' +
          '<div class="sr-tp-rcap"><p class="sr-tp-rcname" style="color:var(--safe)">Safety</p><p class="sr-tp-rcsub">Ventral vagal · your regulated range</p></div>' +
          '<div class="sr-tp-rcap"><p class="sr-tp-rcname" style="color:var(--shut)">Shutdown</p><p class="sr-tp-rcsub">Dorsal vagal</p></div>' +
        '</div></div>' +
        '<div class="sr-tp-rangecols">' + r.cols.map(function (c) {
          return '<div class="sr-tp-rcol" style="--edge:' + c[2] + '"><p class="sr-tp-rquote">' +
                 c[0] + '</p><p class="sr-tp-rbody">' + c[1] + '</p></div>';
        }).join('') + '</div>' +
      '</div>' +
      '<div class="sr-tp-rangeclose"><p class="sr-tp-rcloseq">' + r.closeQ +
        '</p><p class="sr-tp-rclosek">' + r.closeK + '</p></div>' +
    '</div></div>';
  }

  /* ── 04 · why insight isn't enough (shared) ──────────────────────── */
  function rInsight() {
    var s = SHARED.insight;
    return '<div class="sr-tp-band sr-tp-band--alt"><div class="sr-tp-wide">' +
      sechead(s.eyebrow, s.h2, s.lede) +
      '<div class="sr-tp-insight-layout"><div class="sr-tp-insight-points">' +
        s.points.map(function (p) {
          return '<div class="sr-tp-insight-point"><p class="sr-tp-mini-kicker">' + p[0] +
                 '</p><strong>' + p[1] + '</strong><p>' + p[2] + '</p></div>';
        }).join('') +
      '</div>' + GRAPHICS.trigger + '</div>' +
      '<div class="sr-tp-pull"><p>' + s.pull + '</p></div>' +
    '</div></div>';
  }

  /* ── 05 · the four steps (shared) ────────────────────────────────── */
  function rFourSteps() {
    return '<div class="sr-tp-band sr-tp-band--alt"><div class="sr-tp-wide">' +
      sechead('What reaches it instead',
              'The Protocol Foundation.<br><span class="gold">A guided system.</span>',
              'A repeatable route from recognition to regulation — four actions your own system learns to run.') +
      '<div class="sr-tp-pfimg">' +
        slot(SHARED.art && SHARED.art.fourSteps, 'shared — four moments, no track cues', '16/5') +
      '</div>' +
      '<div class="sr-tp-pfcols">' + SHARED.fourSteps.map(function (s, i) {
        return '<div class="sr-tp-pfcol"><p class="sr-tp-pfstep" style="color:' +
          (i === SHARED.fourSteps.length - 1 ? 'var(--teal)' : 'var(--gold)') + '">Step 0' + (i + 1) + '</p>' +
          '<p class="sr-tp-pfname">' + s.name + '</p><p class="sr-tp-pfbody">' + s.body +
          '</p><p class="sr-tp-pfcite">' + s.cite + '</p></div>';
      }).join('') + '</div>' +
      '<div class="sr-tp-graphpair">' + GRAPHICS.breath + GRAPHICS.spiral + '</div>' +
      '<p class="sr-tp-pfclose">The same four steps. The same voice. A route your body can recognise.</p>' +
    '</div></div>';
  }

  /* ── 06 · six areas of change ────────────────────────────────────── */
  function rChange(t) {
    var c = t.change;
    return '<div class="sr-tp-band"><div class="sr-tp-wide">' +
      sechead(c.eyebrow, c.h2, c.lede) +
      '<div class="sr-tp-sixwrap">' +
        slot(t.art && t.art.change, brief(t, 'change'), '16/7') +
        '<div class="sr-tp-sixinner"><p class="sr-tp-sixkick">Six areas of change</p><div class="sr-tp-sixgrid">' +
        c.items.map(function (i) {
          return '<div class="sr-tp-sixitem"><span class="sr-tp-sixi" style="border-color:' + i[2] +
            ';color:' + i[2] + '">' + i[0] + '</span>' +
            '<p class="sr-tp-sixname" style="color:' + i[2] + '">' + esc(i[1]) + '</p>' +
            '<p class="sr-tp-sixfrom">' + esc(i[3]) + '</p><p class="sr-tp-sixbody">' + esc(i[4]) + '</p></div>';
        }).join('') + '</div><p class="sr-tp-sixkick" style="margin:26px 0 0">More access to choice</p></div>' +
      '</div>' +
      '<p class="sr-tp-sixclose">' + c.close + '</p>' +
      '<p style="text-align:center;margin-top:26px"><a href="#start" class="sr-tp-ghost">Get Started — ' +
        t.price.amount + t.price.per.replace('/ ', '/') + '</a></p>' +
    '</div></div>';
  }

  /* ── 07 · the resource library (shared) ──────────────────────────── */
  function rResources(t) {
    return '<div class="sr-tp-band sr-tp-band--alt"><div class="sr-tp-wide">' +
      sechead('What you get to work with',
              'Everything that<br><span class="gold">comes with it.</span>',
              'The full resource library — everything you need to understand, release, and move beyond specific patterns. This is what the subscription opens.') +
      /* SR-253 · the SET comes from the inventory, per track — Track 03 has
         eleven types and Tracks 01/02 have ten, so a flat list was wrong for
         one of the three. The row still supplies the look. A row with no
         description renders without the paragraph rather than with an empty
         one: `raising` is awaiting its marketing string from the content lane
         and a placeholder would be worse than an omission. */
      '<div class="sr-tp-inc">' + trackResources(t.id).map(function (r) {
        return '<div class="sr-tp-incitem"><div class="sr-tp-icon"><svg viewBox="0 0 24 24" aria-hidden="true">' +
          (ICONS[r[0]] || '') + '</svg></div>' +
          '<div><h3>' + esc(r[1]) + '</h3><p class="sr-tp-inctag">' + esc(r[2]) + '</p>' +
          (r[3] ? '<p>' + esc(r[3]) + '</p>' : '') + '</div></div>';
      }).join('') + '</div>' +
      '<p class="sr-tp-note sr-tp-footnote">' + resourceCount(SHARED.resourceNote) + '</p>' +
    '</div></div>';
  }

  /* ── 08 · progress (shared) ──────────────────────────────────────── */
  function rProgress() {
    var p = SHARED.progress;
    return '<div class="sr-tp-band"><div class="sr-tp-wide">' +
      sechead(p.eyebrow, p.h2, p.lede) + GRAPHICS.progress +
      '<div class="sr-tp-notices" style="margin-top:24px">' + p.notices.map(function (n) {
        return '<div class="sr-tp-notice"><h3>' + n[0] + '</h3><p>' + n[1] + '</p></div>';
      }).join('') + '</div>' +
    '</div></div>';
  }

  /* ── 09 · price ──────────────────────────────────────────────────── */
  function rPrice(t) {
    return '<div class="sr-tp-band" id="start"><div class="sr-tp-inner"><div class="sr-tp-pricewrap">' +
      '<p class="sr-tp-eyebrow">What it costs to start</p>' +
      '<h2>The full track.<br><span class="gold">' + t.price.words + '</span></h2>' +
      '<p class="sr-tp-lede" style="margin:16px auto 26px">Every protocol, every resource, your session history and progress tracking. Cancel anytime, keep what you’ve written.</p>' +
      '<div class="sr-tp-pricebox"><p class="sr-tp-pricenum">' + t.price.amount +
        '<span class="sr-tp-priceper"> ' + t.price.per + '</span></p>' +
      '<div class="sr-tp-pricelist">' +
        t.priceList.map(function (l) { return '<p>' + resourceCount(l) + '</p>'; }).join('') + '</div>' +
      '<a href="#start" class="sr-tp-pill">Get Started — ' + t.price.amount +
        t.price.per.replace('/ ', '/') + '</a>' +
      '<p class="sr-tp-note" style="margin-top:14px">' + val(t.priceNote, 'priceNote') + '</p>' +
      '</div></div></div></div>';
  }

  /* ── 10 · FAQ · 12 shared + 6 track-specific = 18 ────────────────── */
  function rFaq(t) {
    var items = SHARED.faq.concat(t.faq || []);
    var half = Math.ceil(items.length / 2);
    var n = 0;
    function col(list) {
      return '<div class="sr-tp-faqcol">' + list.map(function (q) {
        n++;
        return '<div class="sr-tp-faqitem"><button class="sr-tp-faqq" aria-expanded="false" aria-controls="faqa-' + n +
          '" id="faqq-' + n + '"><span class="sr-tp-plus" aria-hidden="true">+</span>' + esc(q[0]) + '</button>' +
          '<div class="sr-tp-faqa" id="faqa-' + n + '" role="region" aria-labelledby="faqq-' + n + '">' +
          q[1].map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div></div>';
      }).join('') + '</div>';
    }
    return '<div class="sr-tp-band"><div class="sr-tp-wide">' +
      sechead('What’s left to ask', 'Before you start.', 'The things worth knowing, answered plainly.') +
      '<div class="sr-tp-faqcols">' + col(items.slice(0, half)) + col(items.slice(half)) + '</div>' +
    '</div></div>';
  }

  /* ── 11 · scope & safety · legally load-bearing, never omitted ───── */
  function rScope() {
    return '<div class="sr-tp-scope">' +
      '<p class="sr-tp-sk">◇ Scope &amp; Safety</p>' +
      '<p>' + SHARED.scope + '</p>' +
      '<p style="color:var(--text);margin-top:10px">If you are in immediate danger, contact your local emergency number. ' +
      '<a href="https://findahelpline.com" rel="noopener">findahelpline.com</a></p>' +
    '</div>';
  }

  /* ── nav · hidden tracks never appear ────────────────────────────── */
  var ROUTES = {
    1: 'personal-transformation.html',
    2: 'relationship-healing.html',
    3: 'professional-performance.html'
  };
  function renderNav(id) {
    var links = [['The Journey', 'method.html'], ['About', 'method.html']];
    Object.keys(TRACKS).forEach(function (k) {
      var t = TRACKS[k];
      if (t.visible && ROUTES[k]) links.push([t.name, ROUTES[k], +k]);
    });
    links.push(['Dashboard', 'dashboard.html']);
    var el = document.getElementById('navlinks');
    if (el) el.innerHTML = links.map(function (l) {
      return '<a href="' + l[1] + '"' + (l[2] === id ? ' class="sr-tp-on" aria-current="page"' : '') +
             '>' + l[0] + '</a>';
    }).join('');

    /* SR-289 · at <=480px .sr-tp-navlinks becomes a horizontal scroll strip
       (css/saferise-system.css, the max-width:480px block) rather than
       wrapping — by design, so the row stays one line. Its scrollWidth
       regularly exceeds its clientWidth (measured 597 vs 346 at 390px on
       this page: 251px, matching the reported clip exactly), and nothing
       moved the strip's initial scroll position to account for that, so a
       visitor lands with scrollLeft at 0 while their own current-page pill
       — five links in, after "The Journey", "About" and the first track —
       sits past the visible edge, clipped mid-word ("Relationship" reading
       as "RELATION"). The other links were never unreachable, only the
       active one was unreadable at rest, which is the one link a visitor
       does not choose to go find.
       Not a redesign: the scroll strip is left as the existing narrow-
       viewport pattern (css/saferise-system.css already hides its
       scrollbar there), the string is not truncated, no item is hidden,
       and the type scale (11px/.13em/uppercase) is untouched. This only
       moves where the strip starts, using the same scrollLeft mechanism
       already used elsewhere in this codebase (js/saferise-system.js's
       carousel), so the active pill is never partially offscreen. */
    if (el) {
      var onLink = el.querySelector('.sr-tp-on');
      if (onLink) {
        var target = onLink.offsetLeft + onLink.offsetWidth - el.clientWidth;
        el.scrollLeft = Math.max(0, target);
      }
    }
  }

  /* ── carousel · SR-163 ────────────────────────────────────────────
     The binding was never the problem — #carViewport, #carPrev and #carNext
     are all emitted above, go() ran and set the transform every time. Two
     things were wrong underneath it.

     One: the viewport was ALSO a native scroll container
     (overflow-x:auto + scroll-snap-type:x mandatory) while this code moved
     the track with a transform. Two mechanisms, one strip. scrollLeft sat at
     56 at rest with nobody having touched it — snap had already moved it.
     The viewport is now a plain clip and the transform is the only mover.

     Two: step() added 18px of gap to the card width. The gap is 14px. Every
     step overshot by 4px, 40px of drift across ten cards.

     The counter is gone with them. "1 / 10" reported the active index while
     five cards were on screen — a position asserted, not measured. The dot
     rail below is built from what actually fits. */
  function initCarousel() {
    var vp = document.getElementById('carViewport');
    if (!vp) return;
    var track = vp.querySelector('.sr-tp-cartrack');
    var cards = track.querySelectorAll('.sr-tp-pcard');
    if (!cards.length) return;

    /* SR-182 · the card is operable again. Delegated on the track rather than
       bound per card, so it survives a re-render. Keyboard parity is required,
       not optional: role="button" without Enter and Space is a control that
       announces itself and then does nothing. Space is preventDefault'ed or the
       page scrolls under the member. */
    function openCard(el) {
      var href = el && el.getAttribute('data-sr-open');
      if (href) window.location.href = href;
    }
    track.addEventListener('click', function (e) {
      var card = e.target.closest && e.target.closest('.sr-tp-pcard');
      if (card) openCard(card);
    });
    track.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
      var card = e.target.closest && e.target.closest('.sr-tp-pcard');
      if (!card) return;
      e.preventDefault();
      openCard(card);
    });
    var dots = document.getElementById('carDots');
    var prev = document.getElementById('carPrev');
    var next = document.getElementById('carNext');
    var i = 0;

    /* Read the gap rather than hardcoding it, so this cannot drift out of
       step with the stylesheet the way the old + 18 did. */
    function gap() {
      var g = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap);
      return isNaN(g) ? 14 : g;
    }
    function step() { return cards[0].getBoundingClientRect().width + gap(); }
    function per()  { return Math.max(1, Math.floor((vp.clientWidth + gap()) / step())); }
    function maxIndex() { return Math.max(0, cards.length - per()); }
    function pages() { return Math.ceil(maxIndex() / per()) + 1; }
    /* The last page is clamped, not a full stride: with ten cards and four
       visible it starts at card 7, not card 9. The label has to say where the
       page actually lands, or it is the counter's problem again in words. */
    function pageStart(d) { return Math.min(d * per(), maxIndex()); }

    function paintDots() {
      if (!dots) return;
      var n = pages(), active = 0, best = Infinity, want = [];
      for (var a = 0; a < n; a++) {
        var gapTo = Math.abs(pageStart(a) - i);
        if (gapTo < best) { best = gapTo; active = a; }
      }
      for (var d = 0; d < n; d++) {
        var from = pageStart(d) + 1, to = Math.min(pageStart(d) + per(), cards.length);
        want.push('<button type="button" class="sr-tp-cardot' +
          (d === active ? ' sr-tp-on' : '') + '" data-page="' + d +
          '" aria-label="Protocols ' + from + ' to ' + to + '"' +
          (d === active ? ' aria-current="true"' : '') + '></button>');
      }
      var markup = want.join('');
      if (dots.innerHTML !== markup) dots.innerHTML = markup;
    }

    function go(n) {
      i = Math.min(Math.max(0, n), maxIndex());
      /* through place() so a press that lands mid-drag or mid-wheel gets the
         eased transition back rather than inheriting transition:none */
      place(-i * step(), true);
      if (prev) prev.disabled = i === 0;
      if (next) next.disabled = i === maxIndex();
      paintDots();
    }

    if (prev) prev.onclick = function () { go(i - per()); };
    if (next) next.onclick = function () { go(i + per()); };
    if (dots) dots.onclick = function (e) {
      var b = e.target.closest('.sr-tp-cardot');
      if (b) go(pageStart(+b.getAttribute('data-page')));
    };
    track.style.transition = 'transform .45s cubic-bezier(.4,0,.2,1)';

    /* ── SR-174b · cursor control, on the same transform ─────────────────
       SR-163 removed overflow-x:auto and scroll-snap-type because native
       scroll and the JS transform were two mechanisms driving one strip.
       They are NOT coming back. Pointer drag and wheel move the same
       transform this file already owns, so there is still exactly one mover
       and the dot rail keeps reporting the truth.

       There is no auto-drift here to remove: this file has no
       requestAnimationFrame, no setInterval and no animation, and the strip
       was measured stationary for 65 seconds with no input. The drift lives
       on the dashboard, which is a different surface and stays as it is. */
    var freeX = 0, dragging = false, startX = 0, startFree = 0, moved = 0;

    function clampFree(x) {
      return Math.min(0, Math.max(-maxIndex() * step(), x));
    }
    function place(x, animate) {
      track.style.transition = animate ? 'transform .45s cubic-bezier(.4,0,.2,1)' : 'none';
      track.style.transform = 'translateX(' + x + 'px)';
    }
    /* After a free gesture the index has to agree with where the strip
       actually is, or the next arrow press jumps. Snap the index to the
       nearest card and let go() take the transform back over. */
    function settle() {
      var idx = Math.round(-freeX / step());
      i = Math.min(Math.max(0, idx), maxIndex());
      freeX = -i * step();
      place(freeX, true);
      if (prev) prev.disabled = i === 0;
      if (next) next.disabled = i === maxIndex();
      paintDots();
    }

    vp.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      dragging = true; moved = 0;
      startX = e.clientX; startFree = freeX = -i * step();
      vp.setPointerCapture(e.pointerId);
      vp.style.cursor = 'grabbing';
    });
    vp.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var dx = e.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));
      freeX = clampFree(startFree + dx);
      place(freeX, false);
    });
    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      vp.style.cursor = '';
      try { vp.releasePointerCapture(e.pointerId); } catch (err) {}
      settle();
    }
    vp.addEventListener('pointerup', endDrag);
    vp.addEventListener('pointercancel', endDrag);
    /* A drag that crossed the card is not a click on whatever sat under it. */
    vp.addEventListener('click', function (e) {
      if (moved > 6) { e.preventDefault(); e.stopPropagation(); }
    }, true);

    /* Wheel and trackpad. Horizontal intent only — a vertical wheel over the
       strip must still scroll the page, or the carousel becomes a trap. */
    var wheelTimer = null, wheeling = false;
    vp.addEventListener('wheel', function (e) {
      var dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : 0;
      if (!dx) return;
      e.preventDefault();
      /* `wheeling` is what makes a flick accumulate. Without it every event in
         the burst recomputes from the index, which has not moved yet, so a
         hundred events travel exactly as far as one. */
      if (!wheeling && !dragging) { wheeling = true; freeX = -i * step(); }
      freeX = clampFree(freeX - dx);
      place(freeX, false);
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(function () { wheeling = false; settle(); }, 110);
    }, { passive: false });

    window.addEventListener('resize', function () { go(i); });
    go(0);

    /* ── SR-290 · auto-advance ────────────────────────────────────────
       No prior implementation for this component: SR-163's own comment
       above records that this carousel has never had a timer or an
       animation loop. js/saferise-system.js's marketing carousel does
       autoplay, but as continuous sub-pixel drift with a cloned-track
       loop — a different mechanism for a different markup contract, not
       one this carousel-in-place step model can reuse — and it disables
       itself under reduced motion, which the brief for this component
       explicitly forbids. 7000ms chosen fresh, no prior value to match.

       One card at a time, not one page (go(i +/- per()), the arrows'
       stride) — advance() always steps `i` by exactly 1, wrapping to 0
       once maxIndex() is passed so it loops rather than stalling at the
       end. go()/place() never call .focus(), so a tick can never steal
       keyboard focus, satisfied by construction rather than by a guard.

       Reduced motion changes nothing here: it still ticks on the same
       interval. SR-303 (Phase E) removed the blanket
       `*,*::before,*::after{transition-duration:.01ms!important}` rule
       that used to live in css/saferise-system.css, so the sliding
       transition (this file's inline `transition:transform .45s…`) now
       plays at full speed under reduced motion too — the same as every
       other animation on the site post-Phase E.

       Paused vs resumed only — no permanent stop. Arrow clicks, drag and
       wheel already pause this the moment the pointer is over the strip
       (hover) or a button has focus; nothing here needs to also watch
       for manual navigation. */
    var AUTO_MS = 7000;
    var carousel = document.getElementById('carousel');
    var autoTimer = null, hoverPaused = false, focusPaused = false;

    function advance() {
      var ni = i + 1;
      if (ni > maxIndex()) ni = 0;
      go(ni);
    }
    function autoOn() { return !hoverPaused && !focusPaused && !document.hidden && maxIndex() > 0; }
    function syncAuto() {
      if (autoOn()) {
        if (!autoTimer) autoTimer = setInterval(advance, AUTO_MS);
      } else if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    }
    if (carousel) {
      carousel.addEventListener('mouseenter', function () { hoverPaused = true; syncAuto(); });
      carousel.addEventListener('mouseleave', function () { hoverPaused = false; syncAuto(); });
      carousel.addEventListener('focusin', function () { focusPaused = true; syncAuto(); });
      carousel.addEventListener('focusout', function (e) {
        if (carousel.contains(e.relatedTarget)) return;
        focusPaused = false; syncAuto();
      });
    }
    document.addEventListener('visibilitychange', syncAuto);
    syncAuto();
  }

  function initFaq() {
    document.querySelectorAll('.sr-tp-faqq').forEach(function (b) {
      b.onclick = function () {
        var open = b.getAttribute('aria-expanded') === 'true';
        b.setAttribute('aria-expanded', open ? 'false' : 'true');
        b.parentElement.classList.toggle('sr-tp-on', !open);
      };
    });
  }

  /* ── SR-277 · section reveal, one system for all three tracks ───────
     Typography timing (eyebrow/heading/body/next-block: 0/100/200/300ms)
     lives in css/saferise-system.css as plain CSS transitions keyed off
     .sr-tp-in — this function's only job is adding that class once a
     section scrolls into view, and it does that with the same
     IntersectionObserver shape js/saferise-system.js already uses for
     .sr-stagger (threshold .12, rootMargin -8% at the bottom), so a track
     page and a marketing page reveal on the same rhythm without sharing
     a script.

     Card groups get the platform's EXISTING .sr-stagger/.sr-in pair
     (css/saferise-system.css line ~178) rather than a new mechanism —
     the same peer-index stagger index.html's grids already use. This
     file cannot load js/saferise-system.js to reuse its initStagger()
     directly (that module also owns the marketing-page auto-carousel and
     scroll rail, neither of which belongs on a track page), so the small
     amount of glue is repeated here rather than pulling in the whole file.

     Diagrams get no separate treatment. GRAPHICS.trigger sits inside
     rInsight's post-sechead block and GRAPHICS.progress opens rProgress
     directly, so both already ride the section's own "next block" beat;
     nothing here targets an <img> or a hero photograph, which is the
     boundary the brief draws between diagram motion and image motion. */
  var CARD_GROUPS = ['.sr-tp-cartrack', '.sr-tp-costgrid', '.sr-tp-rangecols',
                      '.sr-tp-sixgrid', '.sr-tp-inc'];
  function initReveal() {
    var page = document.getElementById('page');
    if (!page) return;
    var sections = [].slice.call(page.children).filter(function (el) {
      return el.classList.contains('sr-tp-hero') || el.classList.contains('sr-tp-band');
    });
    if (!sections.length) return;

    if (!('IntersectionObserver' in window)) {
      /* No observer: show everything rather than leave it permanently at
         opacity:0, the same fallback stance slot() and val() take elsewhere
         in this file — a missing capability degrades to the plain state. */
      sections.forEach(function (s) {
        s.classList.add('sr-tp-in');
        CARD_GROUPS.forEach(function (sel) {
          var g = s.querySelector(sel);
          if (g) g.classList.add('sr-in');
        });
      });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('sr-tp-in');
        CARD_GROUPS.forEach(function (sel) {
          var g = e.target.querySelector(sel);
          if (g) g.classList.add('sr-in');
        });
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    sections.forEach(function (s) {
      s.classList.add('sr-tp-revealsec');
      CARD_GROUPS.forEach(function (sel) {
        var g = s.querySelector(sel);
        if (g) {
          g.classList.add('sr-stagger');
          [].forEach.call(g.children, function (c, i) { c.style.setProperty('--i', i); });
        }
      });
      io.observe(s);
    });
  }

  /* ── assemble ────────────────────────────────────────────────────── */
  var CURRENT_TRACK = null;
  function renderTrack(id) {
    MISSING = [];
    CURRENT_TRACK = id;
    var t = TRACKS[id];
    if (!t || !t.visible) return;
    document.getElementById('page').innerHTML =
      rHero(t) + rProtocols(t) + rCost(t) + rRange(t) + rInsight() +
      rFourSteps() + rChange(t) + rResources(t) + rProgress() + rPrice(t) +
      rFaq(t) + rScope();

    var sp = document.getElementById('stickyprice');
    if (sp) sp.textContent = 'Get Started — ' + t.price.amount + t.price.per.replace('/ ', '/');
    var sl = document.getElementById('stickyline');
    if (sl) sl.textContent = t.stickyLine || '';
    document.title = 'SafeRise — ' + t.name;

    initCarousel();
    initFaq();
    initReveal();
    window.SR_TRACK_MISSING = MISSING;
  }

  window.SafeRiseTrack = {
    render: function (id) { renderTrack(id); renderNav(id); },
    routes: ROUTES
  };
})(window, document);
