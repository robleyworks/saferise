/* ═══════════════════════════════════════════════════════════════════════
   SafeRise — the protocol cover · SR-162

   ONE source for the cover art block, used by two surfaces that are
   otherwise different cards:

     dashboard.html            .sr-dash-card  — name, Begin/Continue/Locked, ribbon
     the three track pages     .sr-tp-pcard   — title, promise, signature, quotes

   What they share is the picture and what sits over it, and that is all
   this file owns. Everything below the art stays with each surface.

   Why it exists at all: the two had drifted into opposite halves of one
   correct component. The dashboard had the right image treatment —
   aspect-ratio 3/4, object-fit cover, full bleed — but drew its number and
   label from a `.sr-dash-fallback` tile that DELETED ITSELF on image load,
   because the number was burned into the cover art. The track page kept its
   number and label permanently, drawn from the record, but had no rule for
   the image at all, so a 900x1200 cover landed 119px above its own 152px
   container and the card clipped it to a landscape band.

   Covers are being reshot BARE — no number, label or title burned in — so
   the deleting placeholder is no longer a placeholder, it is the only thing
   that would carry the number, and it must never delete itself again.
   The overlay here is permanent on both surfaces, drawn from the record:
   the number from p[0], the label from p[1].

   Loaded by dashboard.html and by the track pages, before the script that
   calls it. Adds one global, SafeRiseCover.
   ═══════════════════════════════════════════════════════════════════════ */
(function (window) {
  'use strict';

  /* Attributes as well as text: `src` reaches an attribute value, so the
     quote has to be escaped too. The track template's own esc() covers
     text nodes only. */
  function esc(s) {
    return String(s)
      .replace(/&(?![a-z#0-9]+;)/gi, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* o.src    path to the cover, may be absent or 404 — the tinted ground
               below shows through and the overlay still reads
     o.no     the number, from the record's p[0]
     o.label  the one-word verb, from the record's p[1]
     o.extra  surface-specific markup layered inside the frame, e.g. the
               dashboard's resume ribbon. Trusted: built by the caller. */
  function art(o) {
    o = o || {};
    var src   = o.src   == null ? '' : String(o.src);
    var no    = o.no    == null ? '' : String(o.no);
    var label = o.label == null ? '' : String(o.label);

    /* onerror removes the element rather than hiding it: a display:none img
       still occupies the accessibility tree, and there is nothing to
       announce. The scrim and overlay are siblings, so they survive it. */
    return '<div class="sr-pcover">' +
      (src ? '<img class="sr-pcover-img" src="' + esc(src) + '" alt="" ' +
             'loading="lazy" onerror="this.remove()">' : '') +
      '<span class="sr-pcover-scrim" aria-hidden="true"></span>' +
      (label ? '<span class="sr-pcover-label">' + esc(label) + '</span>' : '') +
      (no ? '<span class="sr-pcover-no">' + esc(no) + '</span>' : '') +
      (o.extra || '') +
    '</div>';
  }

  window.SafeRiseCover = { art: art };
})(window);
