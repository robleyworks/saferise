/* ═══════════════════════════════════════════════════════════════════════
   SafeRise — js/saferise-fw-cards.js · SR-464 D3 [MR-37]
   The "where it loads in the product" cards on the six framework pages
   (member-heartmath, -porges, -jung, -kross, -mate, -watts).

   Those cards were hand-authored from the mockup and never resolved against
   the protocol data: cards about "every protocol" borrowed Anxiety Reset's
   cover, Track 02/03 protocols pointed at Track 01 cover files, one protocol
   showed another's cover, and every link went to a bare protocol.html —
   which falls back to Anxiety Reset. One cause, on every framework page.

   Now each card is resolved from content/tracks.js by its exact title:
   - a card whose <h3> is a protocol's title gets that protocol's own cover
     (the same path rule as SafeRiseCover.coverPath) and, if it is a link,
     links to that protocol;
   - any other card that carries a borrowed protocol cover loses it and
     shows the card's tonal art instead.
   No copy is changed. Needs content/tracks.js loaded first. */
(function () {
  'use strict';
  if (typeof TRACKS === 'undefined') return;
  var byTitle = {};
  [1, 2, 3].forEach(function (t) {
    ((TRACKS[t] && TRACKS[t].protocols) || []).forEach(function (p) {
      byTitle[String(p[2]).trim()] = { track: t, no: p[0] };
    });
  });
  function cover(t, no) {
    return t === 1 ? 'assets/covers/' + no + '.jpg' : 'assets/covers/t' + t + '-' + no + '.jpg';
  }
  Array.prototype.forEach.call(document.querySelectorAll('.sr-fw-card'), function (card) {
    var h = card.querySelector('h3');
    var hit = h && byTitle[h.textContent.replace(/\s+/g, ' ').trim()];
    var art = card.querySelector('.sr-fw-cardart');
    var img = art && art.querySelector('img');
    if (hit) {
      if (art && !img) { img = document.createElement('img'); img.alt = ''; art.insertBefore(img, art.firstChild); }
      if (img) img.setAttribute('src', cover(hit.track, hit.no));
      if (card.tagName === 'A') card.setAttribute('href', 'protocol.html?track=' + hit.track + '&protocol=' + hit.no);
    } else if (img && /(^|\/)assets\/covers\//.test(img.getAttribute('src') || '')) {
      img.parentNode.removeChild(img);
    }
  });
})();
