/* ═══════════════════════════════════════════════════════════════════════
   SafeRise — shared public-page footer · SR-336

   Same pattern as SafeRiseTrack.render(), SafeRiseCover.art() and
   SafeRiseRail.render(): one module owns the markup and the data; the
   host page keeps an empty mount and calls render(). Previously the
   grouped four-column footer (Tracks / SafeRise / Help / Legal) existed
   as hand-authored, byte-identical markup independently pasted into
   method.html and live-sessions.html, styled by a byte-identical inline
   <style> block in each — the same duplication-then-drift shape
   js/saferise-rail.js already fixed for the nav rail, one step behind it.

   USAGE — the host page:
     1. An empty mount point: <div id="srFooter"></div> — a bare <footer>
        wrapping the whole page is NOT required; render() creates its own.
     2. <link rel="stylesheet" href="css/saferise-footer.css">
     3. <script src="js/saferise-footer.js"></script>
     4. <script>SafeRiseFooter.render();</script> — no arguments; unlike
        the rail, nothing here varies by which page is asking. Every link
        below is identical on all nine pages, including a page linking to
        itself (method.html's own footer links to method.html) — that
        matches the hand-authored reference exactly, not an oversight.

   The Scope & safety paragraph text is the same one every public footer
   already carried before this file existed (verified across all six
   self-contained pages, character for character, before extracting it).

   NOT covered here: index.html. It keeps its own SR-332 .foot footer
   AND the separate, older sr-footer-template partial (a <template> +
   clone-script that also feeds every .prog-overlay panel) — both stay
   exactly as they are. See docs/fix-register.md's SR-336 entry for the
   resulting stacked-footer situation on that one page, reported rather
   than resolved. Do not add index.html to the pages calling this module
   without reading that note first. */
(function (global) {
  'use strict';

  var COLUMNS = [
    {
      head: 'Tracks',
      links: [
        ['personal-transformation.html', 'Personal Transformation'],
        ['relationship-healing.html', 'Relationship Healing'],
        ['professional-performance.html', 'Professional Performance'],
        ['coming-soon.html', 'Coming soon']
      ]
    },
    {
      head: 'SafeRise',
      links: [
        ['method.html', 'Method'],
        ['plans.html', 'Plans'],
        ['live-sessions.html', 'Live sessions'],
        ['about.html', 'About']
      ]
    },
    {
      head: 'Help',
      links: [
        ['mailto:contact@thesaferiseprotocol.com', 'Contact'],
        ['method.html#faq', 'FAQ'],
        ['plans.html', 'Billing'],
        ['mailto:contact@thesaferiseprotocol.com', 'Support']
      ]
    },
    {
      head: 'Legal',
      links: [
        ['#', 'Terms'],
        ['#', 'Privacy']
      ]
    }
  ];

  var SCOPE_HTML = '<strong>Scope &amp; safety.</strong> SafeRise Protocol is ' +
    'self-guided education and training in nervous-system regulation. It is not ' +
    'therapy, medical treatment, or a substitute for professional care, and it has not ' +
    'been through a clinical trial. If you are in crisis, contact your local emergency ' +
    'service.';

  function colHTML(col) {
    var html = '<div class="sr-pf-col"><p class="sr-pf-colhead">' + col.head + '</p>';
    col.links.forEach(function (link) {
      html += '<a href="' + link[0] + '">' + link[1] + '</a>';
    });
    return html + '</div>';
  }

  function render(opts) {
    opts = opts || {};
    var mount = typeof opts.mount === 'string' ? document.getElementById(opts.mount)
      : (opts.mount || document.getElementById('srFooter'));
    if (!mount) return;

    var html = '<footer class="sr-pf-foot"><div class="sr-pf-wrap">' +
      '<p class="sr-pf-scope">' + SCOPE_HTML + '</p>' +
      '<div class="sr-pf-cols">' + COLUMNS.map(colHTML).join('') + '</div>' +
      '</div></footer>';

    mount.innerHTML = html;
  }

  global.SafeRiseFooter = { render: render };
})(window);
