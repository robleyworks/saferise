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
  var GRAPHICS = {"trigger": {"1": "<div class=\"sr-tp-graphic sr-tp-graphic--loop sr-tp-graphic--feature sr-tp-graphic-scroll\">\n        <p class=\"sr-tp-glabel\">A trigger travels on two timelines</p>\n        <svg viewBox=\"0 0 760 430\" role=\"img\" aria-label=\"The body initiates a protective response before conscious thought interprets a trigger\">\n          <defs><linearGradient id=\"fastLane11\" x1=\"0\" x2=\"1\"><stop stop-color=\"#C97A5A\"/><stop offset=\"1\" stop-color=\"#D4A843\"/></linearGradient><linearGradient id=\"slowLane11\" x1=\"0\" x2=\"1\"><stop stop-color=\"#5A6B84\"/><stop offset=\"1\" stop-color=\"#4E9AA6\"/></linearGradient></defs>\n          <g opacity=\".55\" stroke=\"#22222E\"><path d=\"M72 110H700M72 218H700M72 326H700\"/><path d=\"M72 75V351M274 75V351M476 75V351M700 75V351\"/></g><circle cx=\"86\" cy=\"218\" r=\"20\" fill=\"#15151F\" stroke=\"#D4A843\"/><path d=\"M78 218h16M86 210v16\" stroke=\"#D4A843\" stroke-width=\"2\"/>\n          <path d=\"M108 218C174 218 182 118 264 118S352 118 418 118\" fill=\"none\" stroke=\"url(#fastLane11)\" stroke-width=\"5\" stroke-linecap=\"round\"/><path d=\"M108 218C181 218 202 316 292 316S424 316 520 316\" fill=\"none\" stroke=\"url(#slowLane11)\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-dasharray=\"4 7\"/><path class=\"sr-tp-fastlight\" d=\"M108 218C174 218 182 118 264 118S352 118 418 118 M466 118C606 118 598 218 676 218\" fill=\"none\" stroke=\"var(--tp-accent)\" stroke-width=\"5\" stroke-linecap=\"round\"/><path class=\"sr-tp-slowlight\" d=\"M108 218C181 218 202 316 292 316S424 316 520 316 M568 316C630 316 630 255 676 232\" fill=\"none\" stroke=\"var(--tp-accent)\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n          <g transform=\"translate(438 118)\"><circle r=\"42\" fill=\"#C97A5A\" opacity=\".10\"/><circle r=\"27\" fill=\"#15151F\" stroke=\"#C97A5A\"/><path d=\"M-11-4Q0-18 11-4M-13 6Q0 17 13 6M0-17V17\" fill=\"none\" stroke=\"#E6B49F\" stroke-width=\"2\"/></g><g transform=\"translate(540 316)\"><circle r=\"42\" fill=\"#4E9AA6\" opacity=\".10\"/><circle r=\"27\" fill=\"#15151F\" stroke=\"#4E9AA6\"/><path d=\"M-12 5Q-4-17 8-8Q19 1 7 17Q-2 22-12 5Z\" fill=\"none\" stroke=\"#8FC1C9\" stroke-width=\"2\"/><circle cx=\"3\" cy=\"0\" r=\"3\" fill=\"#8FC1C9\"/></g>\n          <path d=\"M466 118C606 118 598 218 676 218M568 316C630 316 630 255 676 232\" fill=\"none\" stroke=\"#D4A843\" stroke-opacity=\".35\"/><g transform=\"translate(690 225)\"><circle r=\"38\" fill=\"#D4A843\" opacity=\".12\"/><circle r=\"25\" fill=\"#15151F\" stroke=\"#D4A843\"/><path d=\"M-9 1l7 7 13-17\" fill=\"none\" stroke=\"#ECC96A\" stroke-width=\"2.5\"/></g>\n          <g font-family=\"DM Sans\"><text x=\"68\" y=\"178\" fill=\"#D4A843\" font-size=\"10\" letter-spacing=\"2.5\">TRIGGER</text><text x=\"244\" y=\"88\" fill=\"#C97A5A\" font-size=\"10\" letter-spacing=\"2.5\">FAST ROUTE</text><text x=\"244\" y=\"105\" fill=\"#9C9AA4\" font-size=\"12\">protective response begins</text><text x=\"267\" y=\"365\" fill=\"#4E9AA6\" font-size=\"10\" letter-spacing=\"2.5\">SLOWER ROUTE</text><text x=\"267\" y=\"383\" fill=\"#9C9AA4\" font-size=\"12\">meaning and context arrive</text><text x=\"631\" y=\"178\" fill=\"#D4A843\" font-size=\"10\" letter-spacing=\"2.5\">CHOICE</text></g>\n        </svg>\n        <div class=\"sr-tp-graphic-caption\"><span>Regulate the fast route first.</span><strong>Then reflection becomes available.</strong></div>\n      </div>", "2": "<div class=\"sr-tp-graphic sr-tp-graphic--loop sr-tp-graphic--feature sr-tp-graphic-scroll\"><p class=\"sr-tp-glabel\">Your half</p><svg viewBox=\"0 0 520 220\" role=\"img\" aria-label=\"A line between two forms, solid and responsive on one side, dashed and unresponsive on the other; a pulse travels the solid half and stops at the midpoint, never crossing\"><g opacity=\".4\" stroke=\"#22222E\"><path d=\"M40 110H480\"/></g><line x1=\"120\" y1=\"110\" x2=\"260\" y2=\"110\" stroke=\"var(--tp-accent)\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"260\" y1=\"110\" x2=\"400\" y2=\"110\" stroke=\"#4A4A57\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-dasharray=\"3 7\"/><path class=\"sr-tp-halflight\" d=\"M120 110H260\" fill=\"none\" stroke=\"var(--tp-accent)\" stroke-width=\"7\" stroke-linecap=\"round\"/><circle cx=\"260\" cy=\"110\" r=\"4\" fill=\"#15151F\" stroke=\"var(--tp-accent)\" stroke-width=\"2\"/><g transform=\"translate(90 110)\"><circle r=\"30\" fill=\"#15151F\" stroke=\"var(--tp-accent)\"/><circle r=\"12\" fill=\"var(--tp-accent)\" opacity=\".18\"/></g><g transform=\"translate(430 110)\"><circle r=\"30\" fill=\"#15151F\" stroke=\"#4A4A57\"/><circle r=\"12\" fill=\"#4A4A57\" opacity=\".22\"/></g><g font-family=\"DM Sans\"><text x=\"90\" y=\"165\" fill=\"var(--tp-accent)\" font-size=\"10\" letter-spacing=\"2\" text-anchor=\"middle\">YOU</text><text x=\"430\" y=\"165\" fill=\"#6A6874\" font-size=\"10\" letter-spacing=\"2\" text-anchor=\"middle\">THEM</text><text x=\"190\" y=\"88\" fill=\"var(--tp-accent)\" font-size=\"10\" letter-spacing=\"2\" text-anchor=\"middle\">YOUR HALF</text><text x=\"330\" y=\"88\" fill=\"#6A6874\" font-size=\"9.5\" letter-spacing=\"1.6\" text-anchor=\"middle\">NOT YOURS TO CARRY</text></g></svg><div class=\"sr-tp-graphic-caption\"><span>You can only do your half.</span><strong>The rest was never yours to carry.</strong></div></div>", "3": "<div class=\"sr-tp-graphic sr-tp-graphic--loop sr-tp-graphic--feature sr-tp-graphic-scroll\"><p class=\"sr-tp-glabel\">Before the room</p><svg viewBox=\"0 0 520 220\" role=\"img\" aria-label=\"A form approaches a threshold; on the far side two states are drawn, braced and steady, and only which one lights changes\"><g opacity=\".4\" stroke=\"#22222E\"><path d=\"M40 110H480\"/><path d=\"M260 30V190\"/></g><path class=\"sr-tp-roomlight\" d=\"M100 110H260\" fill=\"none\" stroke=\"var(--tp-accent)\" stroke-width=\"7\" stroke-linecap=\"round\"/><g transform=\"translate(100 110)\"><circle r=\"26\" fill=\"#15151F\" stroke=\"var(--tp-accent)\"/><circle r=\"10\" fill=\"var(--tp-accent)\" opacity=\".2\"/></g><rect x=\"252\" y=\"34\" width=\"16\" height=\"152\" rx=\"5\" fill=\"none\" stroke=\"#4A4A57\" stroke-width=\"2\"/><g class=\"sr-tp-braced\" transform=\"translate(390 65)\"><circle r=\"20\" fill=\"#15151F\" stroke=\"#4A4A57\"/><path d=\"M-8-6 6-6M-8 2 6 2M-8 8 6 8\" stroke=\"#8A8894\" stroke-width=\"2\" stroke-linecap=\"round\"/></g><g class=\"sr-tp-steady\" transform=\"translate(390 155)\"><circle r=\"20\" fill=\"#15151F\" stroke=\"var(--tp-accent)\"/><path d=\"M-8 0Q0 8 8 0\" stroke=\"var(--tp-accent)\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/></g><g font-family=\"DM Sans\"><text x=\"100\" y=\"152\" fill=\"var(--tp-accent)\" font-size=\"10\" letter-spacing=\"2\" text-anchor=\"middle\">YOU</text><text x=\"260\" y=\"205\" fill=\"#6A6874\" font-size=\"10\" letter-spacing=\"2\" text-anchor=\"middle\">THE ROOM</text><text x=\"390\" y=\"42\" fill=\"#8A8894\" font-size=\"9\" letter-spacing=\"1.5\" text-anchor=\"middle\">BRACED</text><text x=\"390\" y=\"188\" fill=\"var(--tp-accent)\" font-size=\"9\" letter-spacing=\"1.5\" text-anchor=\"middle\">STEADY</text></g></svg><div class=\"sr-tp-graphic-caption\"><span>The room does not change.</span><strong>You do.</strong></div></div>"}, "breath": "<div class=\"sr-tp-graphic sr-tp-graphic--loop\"><p class=\"sr-tp-glabel\">The coherence rhythm</p><p class=\"sr-tp-gsub\">Around six breaths a minute is where heart-rate variability peaks for most people. It is the most measurable lever you have on your own state — the body reads the rhythm as evidence of safety before the mind has agreed to anything. The session paces it for you.</p><svg viewBox=\"0 0 520 300\" role=\"img\" aria-label=\"Breathing rhythm showing a four-count inhale and six-count exhale\"><defs><linearGradient id=\"breathLine11\" x1=\"0\" x2=\"1\"><stop stop-color=\"#4E9AA6\"/><stop offset=\".55\" stop-color=\"#ECC96A\"/><stop offset=\"1\" stop-color=\"#D4A843\"/></linearGradient><linearGradient id=\"breathArea11\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#4E9AA6\" stop-opacity=\".18\"/><stop offset=\"1\" stop-color=\"#4E9AA6\" stop-opacity=\"0\"/></linearGradient></defs><g opacity=\".55\" stroke=\"#22222E\"><path d=\"M28 138H493M28 186H493M28 234H493\"/></g><path d=\"M28 234 C82 234 96 131 157 131 S229 244 297 244 S371 131 433 131 S475 197 493 210 L493 254L28 254Z\" fill=\"url(#breathArea11)\"/><path d=\"M28 234 C82 234 96 131 157 131 S229 244 297 244 S371 131 433 131 S475 197 493 210\" fill=\"none\" stroke=\"url(#breathLine11)\" stroke-width=\"3.5\" stroke-linecap=\"round\" class=\"sr-tp-breathcurve\"/><g fill=\"#15151F\" stroke=\"#D4A843\"><circle cx=\"157\" cy=\"131\" r=\"5\"/><circle cx=\"433\" cy=\"131\" r=\"5\"/></g><g fill=\"#6A6874\" font-family=\"DM Sans\" font-size=\"10\" letter-spacing=\"1.4\"><text x=\"104\" y=\"282\">INHALE</text><text x=\"215\" y=\"282\">LONGER EXHALE</text><text x=\"385\" y=\"282\">INHALE</text></g></svg><div class=\"sr-tp-graphic-caption\"><span>About six breaths per minute.</span><strong>No force. No perfect count.</strong></div></div>", "spiral": "<div class=\"sr-tp-graphic sr-tp-graphic--loop\"><p class=\"sr-tp-glabel\">The sequence becomes familiar</p><svg viewBox=\"0 0 520 300\" role=\"img\" aria-label=\"The four SafeRise steps forming an inward spiral toward a regulated state\"><defs><linearGradient id=\"spiral11\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop stop-color=\"#C97A5A\"/><stop offset=\".35\" stop-color=\"#D4A843\"/><stop offset=\".68\" stop-color=\"#7FA88C\"/><stop offset=\"1\" stop-color=\"#4E9AA6\"/></linearGradient><radialGradient id=\"core11\"><stop stop-color=\"#D4A843\" stop-opacity=\".35\"/><stop offset=\"1\" stop-color=\"#D4A843\" stop-opacity=\"0\"/></radialGradient></defs><circle cx=\"260\" cy=\"151\" r=\"116\" fill=\"none\" stroke=\"#1f1f2b\"/><circle cx=\"260\" cy=\"151\" r=\"81\" fill=\"none\" stroke=\"#1f1f2b\"/><circle cx=\"260\" cy=\"151\" r=\"48\" fill=\"url(#core11)\"/><path d=\"M260 35C356 35 403 111 376 188C350 261 244 280 177 223C116 171 147 80 219 72C284 65 329 120 307 172C289 214 227 211 212 169C200 136 224 111 254 111\" fill=\"none\" stroke=\"url(#spiral11)\" stroke-width=\"4\" stroke-linecap=\"round\"/><path class=\"sr-tp-fourlight\" d=\"M260 35C356 35 403 111 376 188C350 261 244 280 177 223C116 171 147 80 219 72C284 65 329 120 307 172C289 214 227 211 212 169C200 136 224 111 254 111\" fill=\"none\" stroke=\"var(--tp-accent)\" stroke-width=\"6\" stroke-linecap=\"round\"/><g font-family=\"DM Sans\"><g transform=\"translate(260 35)\"><circle r=\"18\" fill=\"#15151F\" stroke=\"#C97A5A\"/><text text-anchor=\"middle\" y=\"4\" fill=\"#F5EDD8\" font-size=\"11\">01</text></g><text x=\"236\" y=\"22\" fill=\"#C97A5A\" font-size=\"10\" letter-spacing=\"2\" text-anchor=\"end\">NAME</text><g transform=\"translate(376 188)\"><circle r=\"18\" fill=\"#15151F\" stroke=\"#D4A843\"/><text text-anchor=\"middle\" y=\"4\" fill=\"#F5EDD8\" font-size=\"11\">02</text></g><text x=\"404\" y=\"248\" fill=\"#D4A843\" font-size=\"10\" letter-spacing=\"2\">HEART</text><g transform=\"translate(177 223)\"><circle r=\"18\" fill=\"#15151F\" stroke=\"#7FA88C\"/><text text-anchor=\"middle\" y=\"4\" fill=\"#F5EDD8\" font-size=\"11\">03</text></g><text x=\"69\" y=\"252\" fill=\"#7FA88C\" font-size=\"10\" letter-spacing=\"2\">RELEASE</text><g transform=\"translate(307 172)\"><circle r=\"18\" fill=\"#15151F\" stroke=\"#4E9AA6\"/><text text-anchor=\"middle\" y=\"4\" fill=\"#F5EDD8\" font-size=\"11\">04</text></g><text x=\"307\" y=\"212\" fill=\"#4E9AA6\" font-size=\"10\" letter-spacing=\"2\" text-anchor=\"middle\">EXPAND</text></g><circle cx=\"254\" cy=\"111\" r=\"7\" fill=\"#D4A843\"/><text x=\"254\" y=\"151\" text-anchor=\"middle\" fill=\"#F5EDD8\" font-family=\"Cormorant Garamond\" font-style=\"italic\" font-size=\"16\">choice</text></svg><div class=\"sr-tp-graphic-caption\"><span>Each repetition shortens the route.</span><strong>The body learns what comes next.</strong></div></div>", "progress": {"1": "<div class=\"sr-tp-graphic sr-tp-graphic--once sr-tp-graphic--feature sr-tp-graphic-scroll\">\n      <p class=\"sr-tp-glabel\">The floor moves—not just the peaks</p>\n      <svg viewBox=\"0 0 1000 500\" role=\"img\" aria-label=\"Before and after scores improve across eight sessions as the baseline rises and the route back becomes shorter\">\n        <defs><linearGradient id=\"progressArea11\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#4E9AA6\" stop-opacity=\".26\"/><stop offset=\"1\" stop-color=\"#4E9AA6\" stop-opacity=\"0\"/></linearGradient><linearGradient id=\"sessionBars11\" x1=\"0\" y1=\"1\" x2=\"0\" y2=\"0\"><stop stop-color=\"#4E9AA6\"/><stop offset=\"1\" stop-color=\"#ECC96A\"/></linearGradient></defs>\n        <g transform=\"translate(36 58)\"><g stroke=\"#252531\"><path d=\"M0 40H566M0 120H566M0 200H566M0 280H566M0 360H566\"/></g><g fill=\"#666471\" font-family=\"DM Sans\" font-size=\"10\"><text x=\"0\" y=\"22\" letter-spacing=\"2\">MORE ACCESS TO CHOICE</text><text x=\"0\" y=\"385\" letter-spacing=\"2\">SESSION 01</text><text x=\"488\" y=\"385\" letter-spacing=\"2\">SESSION 08</text></g><path d=\"M18 306C90 301 128 277 198 272S314 230 384 226S495 175 550 163V360H18Z\" fill=\"url(#progressArea11)\"/><path d=\"M18 306C90 301 128 277 198 272S314 230 384 226S495 175 550 163\" fill=\"none\" stroke=\"#4E9AA6\" stroke-width=\"3\" stroke-linecap=\"round\" class=\"sr-tp-loaddraw\"/><g stroke-linecap=\"round\"><path d=\"M28 314V243M98 294V213M168 283V192M238 259V164M308 246V142M378 223V116M448 194V92M518 172V67\" stroke=\"#30303E\" stroke-width=\"13\"/><path d=\"M28 314V243M98 294V213M168 283V192M238 259V164M308 246V142M378 223V116M448 194V92M518 172V67\" stroke=\"url(#sessionBars11)\" stroke-width=\"5\"/></g><g fill=\"#15151F\" stroke=\"#ECC96A\"><circle cx=\"28\" cy=\"243\" r=\"5\"/><circle cx=\"98\" cy=\"213\" r=\"5\"/><circle cx=\"168\" cy=\"192\" r=\"5\"/><circle cx=\"238\" cy=\"164\" r=\"5\"/><circle cx=\"308\" cy=\"142\" r=\"5\"/><circle cx=\"378\" cy=\"116\" r=\"5\"/><circle cx=\"448\" cy=\"92\" r=\"5\"/><circle cx=\"518\" cy=\"67\" r=\"5\"/></g><g fill=\"#15151F\" stroke=\"#4E9AA6\"><circle cx=\"28\" cy=\"314\" r=\"5\"/><circle cx=\"98\" cy=\"294\" r=\"5\"/><circle cx=\"168\" cy=\"283\" r=\"5\"/><circle cx=\"238\" cy=\"259\" r=\"5\"/><circle cx=\"308\" cy=\"246\" r=\"5\"/><circle cx=\"378\" cy=\"223\" r=\"5\"/><circle cx=\"448\" cy=\"194\" r=\"5\"/><circle cx=\"518\" cy=\"172\" r=\"5\"/></g><g transform=\"translate(350 327)\" font-family=\"DM Sans\" font-size=\"10\"><circle r=\"4\" fill=\"#4E9AA6\"/><text x=\"12\" y=\"4\" fill=\"#7D7B87\">before</text><circle cx=\"72\" r=\"4\" fill=\"#ECC96A\"/><text x=\"84\" y=\"4\" fill=\"#7D7B87\">after</text></g></g>\n        <g font-family=\"DM Sans\"><g transform=\"translate(650 50)\"><rect width=\"310\" height=\"112\" rx=\"12\" fill=\"#15151F\" stroke=\"#292936\"/><text x=\"22\" y=\"30\" fill=\"#D4A843\" font-size=\"9\" letter-spacing=\"2.3\">01 · SCORE</text><text x=\"22\" y=\"60\" fill=\"#F5EDD8\" font-family=\"Cinzel\" font-size=\"15\">Before &amp; after</text><text x=\"22\" y=\"85\" fill=\"#85838E\" font-size=\"11\">two numbers · ten seconds</text></g><g transform=\"translate(650 190)\"><rect width=\"310\" height=\"112\" rx=\"12\" fill=\"#15151F\" stroke=\"#292936\"/><text x=\"22\" y=\"30\" fill=\"#D4A843\" font-size=\"9\" letter-spacing=\"2.3\">02 · TIER</text><text x=\"22\" y=\"60\" fill=\"#F5EDD8\" font-family=\"Cinzel\" font-size=\"15\">The pattern becomes readable</text><text x=\"22\" y=\"85\" fill=\"#85838E\" font-size=\"11\">early signs → clearer evidence</text></g><g transform=\"translate(650 330)\"><rect width=\"310\" height=\"112\" rx=\"12\" fill=\"#15151F\" stroke=\"#292936\"/><text x=\"22\" y=\"30\" fill=\"#4E9AA6\" font-size=\"9\" letter-spacing=\"2.3\">03 · LEARNING</text><text x=\"22\" y=\"60\" fill=\"#F5EDD8\" font-family=\"Cinzel\" font-size=\"15\">The route shortens</text><text x=\"22\" y=\"85\" fill=\"#85838E\" font-size=\"11\">less time to find your footing</text></g></g>\n      </svg>\n      <div class=\"sr-tp-graphic-caption\"><span>One session settles a state.</span><strong>Repetition changes where you return.</strong></div>\n    </div>", "2": "<div class=\"sr-tp-graphic sr-tp-graphic--once sr-tp-graphic--feature sr-tp-graphic-scroll\"><p class=\"sr-tp-glabel\">The loop slows</p><svg viewBox=\"0 0 520 220\" role=\"img\" aria-label=\"Two forms orbit each other at a widening distance before settling to a steady, unchanging distance\"><g class=\"sr-tp-orbitwide\"><ellipse cx=\"260\" cy=\"110\" rx=\"190\" ry=\"70\" fill=\"none\" stroke=\"#4A4A57\" stroke-width=\"2\" stroke-dasharray=\"3 7\"/><circle cx=\"70\" cy=\"110\" r=\"16\" fill=\"#15151F\" stroke=\"#8A8894\"/><circle cx=\"450\" cy=\"110\" r=\"16\" fill=\"#15151F\" stroke=\"#8A8894\"/></g><g class=\"sr-tp-orbitnarrow\"><ellipse cx=\"260\" cy=\"110\" rx=\"110\" ry=\"40\" fill=\"none\" stroke=\"var(--tp-accent)\" stroke-width=\"2.5\"/><circle cx=\"150\" cy=\"110\" r=\"14\" fill=\"#15151F\" stroke=\"#8A8894\"/><circle cx=\"370\" cy=\"110\" r=\"14\" fill=\"#15151F\" stroke=\"#8A8894\"/></g><g font-family=\"DM Sans\"><text x=\"260\" y=\"205\" fill=\"#6A6874\" font-size=\"10\" letter-spacing=\"1.6\" text-anchor=\"middle\">A CONSTANT DISTANCE, NOT A COLLAPSE</text></g></svg><div class=\"sr-tp-graphic-caption\"><span>The chase widens, then it doesn’t.</span><strong>Repetition tightens toward steady, not toward zero.</strong></div></div>", "3": "<div class=\"sr-tp-graphic sr-tp-graphic--once sr-tp-graphic--feature sr-tp-graphic-scroll\"><p class=\"sr-tp-glabel\">The load carries</p><svg viewBox=\"0 0 560 220\" role=\"img\" aria-label=\"Two lines drawn across eight marks; without intervention the line descends, with intervention it holds level\"><g opacity=\".5\" stroke=\"#22222E\"><path d=\"M40 60H520M40 110H520M40 160H520\"/></g><g stroke=\"#4A4A57\"><path d=\"M40 190V196M108 190V196M176 190V196M244 190V196M312 190V196M380 190V196M448 190V196M516 190V196\"/></g><path class=\"sr-tp-loaddraw\" d=\"M40 70C160 90 300 130 516 185\" fill=\"none\" stroke=\"#8A8894\" stroke-width=\"3\" stroke-linecap=\"round\"/><path class=\"sr-tp-loaddraw\" d=\"M40 70C160 74 300 76 516 78\" fill=\"none\" stroke=\"var(--tp-accent)\" stroke-width=\"3\" stroke-linecap=\"round\"/><g font-family=\"DM Sans\" font-size=\"10\" letter-spacing=\"1.5\"><text x=\"40\" y=\"42\" fill=\"#6A6874\">WEIGHT ACCUMULATES</text><text x=\"40\" y=\"212\" fill=\"#6A6874\">SESSION 01</text><text x=\"480\" y=\"212\" fill=\"#6A6874\" text-anchor=\"end\">SESSION 08</text></g><g transform=\"translate(300 195)\" font-family=\"DM Sans\" font-size=\"10\"><circle r=\"4\" fill=\"#8A8894\"/><text x=\"12\" y=\"4\" fill=\"#7D7B87\">without</text><circle cx=\"80\" r=\"4\" fill=\"var(--tp-accent)\"/><text x=\"92\" y=\"4\" fill=\"#7D7B87\">with</text></g></svg><div class=\"sr-tp-graphic-caption\"><span>Without intervention, the floor drops.</span><strong>With it, the floor holds.</strong></div></div>"}};

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
  /* PASS-card-titles.md · derived at render time only — content/tracks.js
     keeps the full "The X Protocol" title for the protocol page, breadcrumbs,
     <title>/meta and the journal. Only the carousel card label is shortened. */
  function cardTitle(s) { return String(s).replace(/^The\s+/, '').replace(/\s+Protocol$/, ''); }

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
  /* SR-379 (PASS-reader-and-protocol-pages.md Part A) · exported so protocol.html
     can resolve its own per-protocol cover art from this one place, instead of
     hardcoding a path or copying another element's computed background-image.
     Merges onto SafeRiseCover rather than replacing it — saferise-card.js
     defines that global too, and loads first wherever both are present. */
  window.SafeRiseCover = window.SafeRiseCover || {};
  window.SafeRiseCover.coverPath = coverPath;

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
     original panel rather than an empty one. */
  /* SR-261 · THE URL IS ABSOLUTISED HERE, AND ONLY HERE — see the note this
     replaces, still true: a relative url() inside a custom property resolves
     against the stylesheet that consumes it, not the document that declared it. */
  function heroVars(t) {
    var h = t.art && t.art.hero;
    if (!h || !h.src) return '';
    var abs = h.src;
    try { abs = new URL(h.src, document.baseURI).href; } catch (e) {}
    return ' style="--sr-hero-img:url(' + esc(abs) + ')' +
           (h.scrim ? ';--sr-hero-scrim:' + h.scrim : '') + '"';
  }

  /* PASS-track-landing-pages.md · rebuilt to the approved mockup's hero:
     image underlay running beneath the nav (CSS handles the negative
     margin/overlap), eyebrow, h1, the existing heroRule as the italic lead
     line, existing heroBody paragraphs, primary/secondary actions and a new
     support micro-line from LANDING_COPY.

     heroRule/heroBody are UNCHANGED — heroRule is reused verbatim in this
     page's own <meta name="description"> (see the HTML shell), so the
     mockup's near-identical redraft of the same line was not substituted in;
     using the existing, SEO-anchored copy over a fresh near-duplicate is the
     lower-risk call. Reported in the pass summary. */
  function rHero(t) {
    var h = t.art && t.art.hero;
    var L = LANDING_COPY[t.id];
    var free = t.price === PRICING.t1;
    /* PASS-track-reorder.md §2 · a missing hero image degrades to the
       hatch placeholder under the same scrim (background-image simply
       unset, .sr-tp-hero2--ph paints the hatch in its place) rather than
       a blank panel. Confirmed not to trigger for any of the three
       tracks — all three hero images exist (SR-383) — kept as the real
       degrade path regardless, same stance slot()/val() take elsewhere. */
    return '<div class="sr-tp-hero2' + (!h || !h.src ? ' sr-tp-hero2--ph' : '') + '"' + heroVars(t) + '>' +
      '<div class="sr-tp-heroin2"><div class="sr-tp-eyebrow">' + t.kicker + '</div>' +
      '<h1>' + t.heroTitle + '</h1>' +
      '<p class="sr-tp-lead2">' + val(t.heroRule, 'heroRule') + '</p>' +
      t.heroBody.map(function (p) { return '<p class="sr-tp-herobody2">' + p + '</p>'; }).join('') +
      '<div class="sr-tp-actions2">' +
        '<a class="sr-tp-pill2" href="#start">' + (free ? 'Start free' : 'Start') + '</a>' +
        '<a class="sr-tp-sec2" href="#protocols">Browse the 10 protocols</a>' +
      '</div>' +
      '<p class="sr-tp-support2">' + L.support + '</p>' +
    '</div></div>';
  }

  /* ── 01 · protocol rail ───────────────────────────────────────────
     PASS-track-landing-pages.md §3/§4. Card at rest: cover, door label,
     number, state tag, title. Description and one identification quote
     reveal on hover/focus-within. Height is fixed so the rail never
     reflows when a card opens.

     Titles: cardTitle(p[2]) — derived, never edited into content/tracks.js
     (SR-382's own rule, reused here rather than a second implementation).
     Description: p[3], the protocol's existing advisory-style field
     (CLAUDE.md's own "PROTOCOL CARD DESCRIPTIONS" rule — already the "new
     field added alongside the original" that rule asks for, added by an
     earlier pass; not overwritten with the mockup's own alternate draft).
     Quote: p[5][0], the first of the three stored identification quotes —
     one is shown here, chosen uniformly rather than hand-matching which of
     the three each mockup card happened to feature.
     Door label: p[1] (the stored verb), even on the few cards where a
     mockup's own door text drifted from it — the data model stays
     authoritative.
     State tag: the LAST array element, not a fixed index — most rows are
     7 elements (state at [7]), but t3-06 (Belonging Gap) carries a
     documented one-row schema exception (an 8th element, a body-sentence,
     inserted before the slug — see its own comment in content/tracks.js),
     which pushed a fixed p[7] read onto its slug string instead of its
     state on that one row. p[p.length-1] is correct regardless. New
     per-protocol classification this pass adds
     (Agitated / Unsteady / Numb), sourced from the three mockups.

     Rail markup carries data-sr-carousel / data-sr-track so
     js/saferise-system.js's revived carousel binds to it — see that file
     and the pass report for what changed there and why. */
  function rProtocols(t) {
    var L = LANDING_COPY[t.id];
    var cards = t.protocols.map(function (p) {
      var protocolId = 't' + t.id + '-p' + p[0];
      var free = (window.SafeRiseAccess && SafeRiseAccess.isFree(protocolId))
        ? '<span class="sr-tp-free2">Free</span>' : '';
      var title = cardTitle(p[2]);
      return '<article class="sr-tp-card2" tabindex="0" role="button"' +
        ' data-sr-open="protocol.html?track=' + esc(String(t.id)) +
        '&amp;protocol=' + esc(String(p[0])) + '">' +
        '<div class="sr-tp-cardcov2">' +
          '<img class="sr-tp-cardimg2" src="' + esc(coverPath(t.id, p[0])) + '" alt="" loading="lazy" decoding="async" onerror="this.closest(\'.sr-tp-cardcov2\').classList.add(\'sr-tp-ph2\')">' +
          '<span class="sr-tp-carddoor2">' + esc(p[1]) + '</span>' +
          '<span class="sr-tp-cardnum2">' + esc(p[0]) + '</span>' +
          '<span class="sr-tp-cardstate2">' + esc(p[p.length - 1] || '') + '</span>' + free +
        '</div>' +
        '<h3>' + esc(title) + '</h3>' +
        '<p>' + esc(val(p[3], 'promise:' + p[2])) + '</p>' +
        (has(p[5]) ? '<blockquote>“' + esc(p[5][0]) + '”</blockquote>' : '') +
      '</article>';
    }).join('');

    return '<div class="sr-tp-band sr-tp-band--flush" id="protocols"><div class="sr-tp-wide">' +
      sechead(L.protocolsEyebrow, L.protocolsH2, L.protocolsIntro) +
      '<div class="sr-tp-rail2" data-sr-carousel aria-label="Protocols">' +
        '<div class="sr-tp-railtrack2" data-sr-track>' + cards + '</div>' +
      '</div>' +
      '<div class="sr-tp-railfoot2"><a class="sr-tp-pill2" href="#start">' + esc(L.railCta) + '</a>' +
        '<span class="sr-tp-support2">' + esc(L.railSupport) + '</span></div>' +
    '</div></div>';
  }

  /* ── 02 · method ──────────────────────────────────────────────────
     Was rFourSteps() (shared, no track cues at all). The brief's own §9
     says the fourth step's description differs by track — LANDING_COPY's
     riseLine overrides SHARED.fourSteps' last step body per track;
     steps 1-3 stay shared, matching every mockup (their text is identical
     across all three). The visual is the existing shared
     assets/shared/four-steps.webp (SHARED.art.fourSteps) — one image,
     deliberately, not three; see the pass report on the "39 image slots"
     finding. */
  function rMethod(t) {
    var L = LANDING_COPY[t.id];
    var steps = SHARED.fourSteps.map(function (s, i) {
      var last = i === SHARED.fourSteps.length - 1;
      return { name: s.name, cite: s.cite, body: last ? L.riseLine : s.body };
    });
    return '<div class="sr-tp-band" id="method"><div class="sr-tp-wide">' +
      '<figure class="sr-tp-methodvis2">' +
        slot(SHARED.art && SHARED.art.fourSteps, 'shared — four moments, no track cues', '16/5') +
        '<figcaption><small>The state beneath the story</small><span>' + esc(L.visualCaption) + '</span></figcaption>' +
      '</figure>' +
      '<div class="sr-tp-methodgrid2">' +
        '<div class="sr-tp-methodcopy2">' +
          '<p class="sr-tp-eyebrow">How SafeRise works</p>' +
          '<h2>Work with the state.<br>Then choose.</h2>' +
          '<p>' + esc(L.methodBody) + '</p>' +
        '</div>' +
        '<div class="sr-tp-steps2">' + steps.map(function (s, i) {
          return '<div class="sr-tp-step2"><b>0' + (i + 1) + '</b><strong>' + s.name + '</strong>' +
            '<p>' + esc(s.body) + '</p></div>';
        }).join('') + '</div>' +
      '</div>' +
    '</div></div>';
  }

  /* ── 03 · outcomes ────────────────────────────────────────────────
     Replaces rCost()/rRange()/rInsight()/rChange() — those sections and
     their diagrams are not in the approved mockup at all. The two images
     (t.art.cost/t.art.change) and their scrims/briefs are the SAME already-
     wired assets those retired functions used; nothing new to provision.
     outcomesLede is drafted copy per the brief's §9, not Andre's final
     wording — flagged in the pass report. */
  function rOutcomes(t) {
    var L = LANDING_COPY[t.id];
    return '<div class="sr-tp-band sr-tp-band--alt"><div class="sr-tp-wide">' +
      '<p class="sr-tp-eyebrow">What changes</p>' +
      '<h2>The hard moment passes.<br><span class="gold">Its effects can too.</span></h2>' +
      '<p class="sr-tp-outlede2">' + esc(L.outcomesLede) + '</p>' +
      '<div class="sr-tp-outimgs2">' +
        '<figure>' + slot(t.art && t.art.cost, brief(t, 'cost'), '16/7') +
          '<figcaption><small>' + esc(L.costCaption[0]) + '</small>' + esc(L.costCaption[1]) + '</figcaption></figure>' +
        '<figure>' + slot(t.art && t.art.change, brief(t, 'change'), '16/7') +
          '<figcaption><small>' + esc(L.changeCaption[0]) + '</small>' + esc(L.changeCaption[1]) + '</figcaption></figure>' +
      '</div>' +
      '<div class="sr-tp-shifts2">' + L.shifts.map(function (s) {
        return '<article class="sr-tp-shift2"><small>' + esc(s[0]) + '</small><h3>' + esc(s[1]) + '</h3><p>' + esc(s[2]) + '</p></article>';
      }).join('') + '</div>' +
      '<p class="sr-tp-outclose2">You have not lost yourself. You need a reliable way back.</p>' +
    '</div></div>';
  }

  /* ── 04 · included ────────────────────────────────────────────────
     Not one of the brief's own 8 numbered sections, but present,
     identically structured, in all three approved mockups — kept rather
     than dropped; see the pass report. The richer, per-resource-type
     enumeration this replaces (trackResources()/ICONS, the old
     rResources()) stays defined and unused, not deleted. */
  function rIncluded(t) {
    var L = LANDING_COPY[t.id];
    return '<div class="sr-tp-band"><div class="sr-tp-wide">' +
      sechead('Included with your free account',
              'Use it.<br>Understand it.<br>Make it stick.',
              L.includedIntro) +
      '<div class="sr-tp-incgrid2">' +
        '<article class="sr-tp-incitem2"><span>01 · Use it now</span><h3>Guided sessions</h3>' +
          '<p>Ten full guided protocols, follow-along video, quick-use versions and printable cue cards.</p></article>' +
        '<article class="sr-tp-incitem2"><span>02 · Understand the pattern</span><h3>Clear explanations</h3>' +
          '<p>Plain-language guidance, cited research and support on when to proceed or pause.</p></article>' +
        '<article class="sr-tp-incitem2"><span>03 · Make it stick</span><h3>Integration tools</h3>' +
          '<p>Somatic release, reflection prompts, support scripts and a private journal that stays on your device.</p></article>' +
      '</div>' +
    '</div></div>';
  }

  /* ── 05 · states band ─────────────────────────────────────────────
     The brief's own numbered order puts this AFTER outcomes/included,
     not between protocols and method as the mockups themselves show it
     — the brief is explicit ("Section order, identical across all
     three") and its own list is followed here; reported as an adaptation
     from the mockups' own layout. Full-bleed image is t.art.band, already
     wired (assets/journey/t{n}-band.webp), reused from the retired
     rJourney(). */
  function rStates(t) {
    var L = LANDING_COPY[t.id];
    return '<figure class="sr-tp-statesband2">' +
      slot(t.art && t.art.band, brief(t, 'band'), '1400/380') +
      '<figcaption><p class="sr-tp-eyebrow">' + esc(L.storyEyebrow) + '</p>' +
        '<h3>' + L.storyH3 + '</h3><p>' + esc(L.storyBody) + '</p></figcaption>' +
    '</figure>';
  }

  /* ── 06 · proof ───────────────────────────────────────────────────
     Keeps the existing GRAPHICS.progress[CURRENT_TRACK] diagram (three
     real, already-authored, per-track SVGs — "The Floor Rises" / "The
     Loop Slows" / "The Load Carries") rather than the mockup's own
     decorative line-and-dots placeholder chart. h2/intro/list are new,
     per track, from LANDING_COPY. */
  function rProof(t) {
    var L = LANDING_COPY[t.id];
    return '<div class="sr-tp-band" id="proof"><div class="sr-tp-wide sr-tp-proofgrid2">' +
      GRAPHICS.progress[CURRENT_TRACK] +
      '<div><p class="sr-tp-eyebrow">Progress you can see</p><h2>' + L.proofH2 + '</h2>' +
        '<p class="sr-tp-lede">' + esc(L.proofIntro) + '</p>' +
        '<ul class="sr-tp-prooflist2">' + L.proofSteps.map(function (s, i) {
          return '<li><b>0' + (i + 1) + '</b>' + esc(s) + '</li>';
        }).join('') + '</ul>' +
      '</div>' +
    '</div></div>';
  }

  /* ── 07 · price ───────────────────────────────────────────────────
     Reads t.price directly (amount/per/annual/words), so a paid track can
     never render "free" language — the mockups themselves did (both T2 and
     T3 shipped literal "Free <small>a month · or €190 a year</small>" in
     the price box, contradicting their own brief's §5); fixed by being
     data-driven rather than by hand-editing that string, and reported. */
  function rPrice(t) {
    var L = LANDING_COPY[t.id];
    var free = t.price === PRICING.t1;
    var ctaLabel = free ? 'Create a free account' : 'Start membership';
    var amountLine = free
      ? t.price.amount + ' <small>' + t.price.per.replace(/^,\s*/, '') + '</small>'
      : t.price.amount + ' <small>' + t.price.per.replace('/ ', 'a ') + (t.price.annual ? ' · or ' + t.price.annual.replace(' / ', ' a ') : '') + '</small>';
    return '<div class="sr-tp-band" id="start"><div class="sr-tp-wide">' +
      '<div class="sr-tp-pricebox2"><div>' +
        '<p class="sr-tp-eyebrow">' + esc(L.priceEyebrow) + '</p>' +
        '<h2>' + L.priceH2 + '</h2>' +
        '<p class="sr-tp-lede">Guided audio and video, quick-use cues, the complete supporting library, a private journal that stays on your device. Nothing expires and there is no trial countdown.</p>' +
      '</div><div class="sr-tp-priceside2">' +
        '<p class="sr-tp-amount2">' + amountLine + '</p>' +
        '<a class="sr-tp-pill2" href="#start">' + ctaLabel + '</a>' +
        '<p class="sr-tp-terms2">' + val(t.priceNote, 'priceNote') + '</p>' +
      '</div></div>' +
      '<div class="sr-tp-upgrade2"><p><b>' + esc(L.upgradeTitle) + '</b>' + esc(L.upgradeBody) + '</p>' +
        '<a href="pricing.html">See full membership →</a></div>' +
    '</div></div>';
  }

  /* ── 08 · FAQ + scope & safety ────────────────────────────────────
     Content and structure kept from the existing implementation (18
     questions — 12 shared + 6 per track — with the same FAQPage JSON-LD;
     richer than the mockup's own 6-question demo list, and already SEO-
     wired), restyled only to the new two-column look. */
  function faqJsonLd(items) {
    var data = {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: items.map(function (q) {
        return { '@type': 'Question', name: q[0],
          acceptedAnswer: { '@type': 'Answer', text: q[1].join(' ') } };
      })
    };
    return '<script type="application/ld+json">' + JSON.stringify(data).replace(/<\//g, '<\\/') + '</script>';
  }
  function rFaq(t) {
    var items = SHARED.faq.concat(t.faq || []);
    var n = 0;
    function item(q) {
      n++;
      return '<details><summary id="faqq-' + n + '" aria-controls="faqa-' + n + '">' + esc(q[0]) + '</summary>' +
        '<div id="faqa-' + n + '">' + q[1].map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div></details>';
    }
    return '<div class="sr-tp-band sr-tp-faqband2" id="faq"><div class="sr-tp-wide sr-tp-faqgrid2">' +
      '<div><p class="sr-tp-eyebrow">Before you start</p><h2>Questions worth<br>answering plainly.</h2>' +
        '<p class="sr-tp-safety2"><b>Scope &amp; safety.</b> ' + SHARED.scope + ' If you are in immediate danger, contact your local emergency number. ' +
        '<a href="https://findahelpline.com" rel="noopener">findahelpline.com</a></p></div>' +
      '<div class="sr-tp-questions2">' + items.map(item).join('') + '</div>' +
    '</div></div>' + faqJsonLd(items);
  }

  /* SR-368 (PASS-track-page-quality.md §6) · dismissible sticky CTA.
     sessionStorage, not localStorage, per the brief and matching
     js/saferise-nav.js's own sr-theme key (line 121) — it should come back
     next visit, not vanish forever. Keyed per track: dismissing the bar on
     Personal Transformation says nothing about whether the member has seen
     Relationship Healing's own price yet. */
  function initStickyDismiss(id) {
    var sc = document.getElementById('stickyCta');
    var sx = document.getElementById('stickyClose');
    if (!sc || !sx) return;
    var key = 'sr-sticky-dismissed-t' + id;
    var dismissed = false;
    try { dismissed = sessionStorage.getItem(key) === '1'; } catch (e) {}
    sc.classList.toggle('sr-tp-dismissed', dismissed);
    sx.onclick = function () {
      sc.classList.add('sr-tp-dismissed');
      try { sessionStorage.setItem(key, '1'); } catch (e) {}
    };
  }

  /* PASS-track-landing-pages.md · initFaq() removed — rFaq() now emits
     native <details>/<summary>, which needs no open/close script at all. */

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
     function still builds its own glue rather than calling
     js/saferise-system.js's initStagger() directly: that function's own
     selector list (.sr-covers, .proto-grid, etc.) doesn't match anything
     on this page, so calling it would just be an inert no-op standing in
     for real code.

     PASS-track-landing-pages.md · js/saferise-system.js IS now loaded on
     this page — for its carousel (see initCarousel() there, revived per
     that pass), not for initStagger()/initRail(). Both of those are
     confirmed harmless here: initStagger()'s selectors don't match this
     page's markup, and initRail() only builds when [data-sr-rail] exists,
     which this page never sets.

     SR-343 · this reveal fade is no longer the diagrams' only motion —
     initDiagramMotion() below now runs their own internal animation
     (breath draws and retreats, four-step's light rests at each mark, the
     two-timeline and floor families per their own briefs). That decision
     is reversed, not this comment's original reasoning: nothing here
     still targets an <img> or a hero photograph, which stays the boundary
     between diagram motion and image motion. */
  /* PASS-track-landing-pages.md · updated for the rebuilt sections — the
     rail track, the outcomes shift-pairs, the included-grid and the method
     steps replace the retired cost/range/six-areas grids they listed before. */
  var CARD_GROUPS = ['.sr-tp-railtrack2', '.sr-tp-shifts2', '.sr-tp-incgrid2', '.sr-tp-steps2'];
  function initReveal() {
    var page = document.getElementById('page');
    if (!page) return;
    var sections = [].slice.call(page.children).filter(function (el) {
      return el.classList.contains('sr-tp-hero') || el.classList.contains('sr-tp-band') ||
             el.classList.contains('sr-tp-hero2') || el.classList.contains('sr-tp-statesband2');
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

  /* ── SR-343 · diagram motion — pause off-screen, draw once on arrival ──
     A second, separate IntersectionObserver from initReveal()'s above:
     that one is a one-shot per-section fade and unobserves immediately,
     the wrong shape for a loop that must resume every time its card comes
     back into view. Same threshold/rootMargin convention as initReveal()
     for consistency, not reused directly.
     .sr-tp-graphic--loop (breath, four-step, the two-timeline family)
     keeps running while its card is on screen and gets .sr-tp-graphic--off
     (animation-play-state:paused, css/saferise-system.css) the moment it
     scrolls away — continuous toggling, never unobserved.
     .sr-tp-graphic--once (the floor family) gets .sr-tp-graphic--play
     added on its first intersection only, then this observer stops
     watching it — a statement, not a rhythm, plays once and holds. */
  function initDiagramMotion() {
    var loops = document.querySelectorAll('.sr-tp-graphic--loop');
    var onces = document.querySelectorAll('.sr-tp-graphic--once');
    if (!loops.length && !onces.length) return;

    if (!('IntersectionObserver' in window)) {
      /* No observer: leave loops running (they were already visible by
         default) and trigger every once-only diagram immediately, the
         same "missing capability degrades to the plain state" stance
         initReveal() takes. */
      onces.forEach(function (g) { g.classList.add('sr-tp-graphic--play'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.target.classList.contains('sr-tp-graphic--loop')) {
          e.target.classList.toggle('sr-tp-graphic--off', !e.isIntersecting);
          return;
        }
        if (e.isIntersecting) {
          e.target.classList.add('sr-tp-graphic--play');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    loops.forEach(function (g) { io.observe(g); });
    onces.forEach(function (g) { io.observe(g); });
  }

  /* ── assemble ────────────────────────────────────────────────────── */
  var CURRENT_TRACK = null;
  function renderTrack(id) {
    MISSING = [];
    CURRENT_TRACK = id;
    var t = TRACKS[id];
    if (!t || !t.visible) return;
    /* SR-343 · the renderer emits the class, css/saferise-system.css owns what
       it does — --tp-accent for the two shared diagrams. */
    document.body.classList.add('sr-tp-t' + id);
    /* PASS-track-reorder.md §1 · reordered from SR-383's own sequence
       (hero, protocols, method, outcomes, included, states band, proof,
       price, FAQ) — the four sections between the rail and the chart now
       run reversed: states band, included, outcomes, method. Hero, the
       rail, and everything from proof onward hold their place. */
    document.getElementById('page').innerHTML =
      rHero(t) + rProtocols(t) + rStates(t) + rIncluded(t) + rOutcomes(t) +
      rMethod(t) + rProof(t) + rPrice(t) + rFaq(t);

    var free = t.price === PRICING.t1;
    var sp = document.getElementById('stickyprice');
    if (sp) sp.textContent = free ? 'Start free' : 'Start';
    var sl = document.getElementById('stickyline');
    if (sl) sl.textContent = LANDING_COPY[id].stickyText;
    document.title = 'SafeRise — ' + t.name;
    initStickyDismiss(id);

    /* PASS-track-landing-pages.md §4 · the rail's carousel is
       js/saferise-system.js's own initCarousel(), revived (see that file)
       rather than this file's old #carViewport-based implementation, which
       is retired along with the markup it depended on. That file's boot()
       runs on its own DOMContentLoaded/MutationObserver, so no call is
       needed here — the rail already carries data-sr-carousel. */
    initReveal();
    initDiagramMotion();
    window.SR_TRACK_MISSING = MISSING;
  }

  window.SafeRiseTrack = {
    render: renderTrack
  };
})(window, document);
