/* ══════════════════════════════════════════════════════════════════
   SafeRise — content/track-images.js
   SR-448 (PASS-AF.md) · THE ONE PLACE A TRACK'S IMAGE IS DECLARED.

   Read by every surface that shows a track image: /plans
   (js/saferise-plans.js), /organisations (content/f8-tracks.js), /coming-soon
   and the member coming-soon page (their band panes), and the home page's
   three live-track panels (index.html). None of them carries a path of its
   own any more — each asks trackImage(slug, shape).

   THREE SHAPES, EACH ONE FIXED SIZE
     band      1200 x 640   coming-soon panes, /plans in-development cards
     panel     2400 x 1000  home-page and /plans live-track panels
     portrait  1086 x 1448  the Foundation 8 cards and detail rail
   Each value is the .webp path; a `<shape>Jpg` key carries the .jpg
   sibling where one exists. Where a shape exists only as .jpg, the shape
   key holds the .jpg and there is no <shape>Jpg key.

   A NEW IMAGE IS ADDED HERE AND NOWHERE ELSE. Populated from what was on
   disk after PASS-AE (SR-447): a track with no file for a shape has no key
   for it — no invented paths, no two shapes pointing at one file.
   tools/check-track-images.py verifies every path resolves and is the
   right size, and that no surface declares a path of its own.

   Slugs follow the track pages' own filenames (personal-transformation,
   relationship-healing, professional-performance — also dashboard.html's
   slide keys), extended to the road-map tracks the same way, "&" -> "and".
   ══════════════════════════════════════════════════════════════════ */

var TRACK_IMAGES = {
  'personal-transformation': {
    name: 'Personal Transformation',
    panel: 'assets/home/panel-t1-v2.webp', panelJpg: 'assets/home/panel-t1-v2.jpg',
    portrait: 'assets/f8/f01-v2.webp', portraitJpg: 'assets/f8/f01-v2.jpg'
  },
  'relationship-healing': {
    name: 'Relationship Healing',
    band: 'assets/coming/band-relationship-healing.jpg',
    panel: 'assets/home/panel-t2-v2.webp', panelJpg: 'assets/home/panel-t2-v2.jpg',
    portrait: 'assets/f8/f02.webp'
  },
  'professional-performance': {
    name: 'Professional Performance',
    band: 'assets/coming/band-professional-performance.jpg',
    panel: 'assets/home/panel-t3-v2.webp', panelJpg: 'assets/home/panel-t3-v2.jpg',
    portrait: 'assets/f8/f03.webp'
  },
  'executive-presence': {
    name: 'Executive Presence',
    band: 'assets/coming/band-08.webp', bandJpg: 'assets/coming/band-08.jpg'
  },
  'sleep-and-recovery': {
    name: 'Sleep & Recovery',
    band: 'assets/coming/band-13.webp', bandJpg: 'assets/coming/band-13.jpg'
  },
  'embodied-nutrition': {
    name: 'Embodied Nutrition',
    band: 'assets/coming/band-12.webp', bandJpg: 'assets/coming/band-12.jpg'
  },
  'strength-and-return': {
    name: 'Strength & Return',
    band: 'assets/coming/band-17.webp', bandJpg: 'assets/coming/band-17.jpg'
  },
  'elevation-series': {
    name: 'Elevation Series',
    band: 'assets/coming/band-11.webp', bandJpg: 'assets/coming/band-11.jpg'
  },
  'sex-and-intimacy': {
    name: 'Sex & Intimacy',
    band: 'assets/coming/band-10.webp', bandJpg: 'assets/coming/band-10.jpg'
  },
  'entrepreneurs-journey': {
    name: 'Entrepreneur’s Journey',
    band: 'assets/coming/band-15.webp', bandJpg: 'assets/coming/band-15.jpg'
  },
  'money-shift': {
    name: 'Money Shift',
    band: 'assets/coming/band-16.webp', bandJpg: 'assets/coming/band-16.jpg'
  },
  'addiction-recovery': {
    name: 'Addiction Recovery',
    band: 'assets/coming/band-14.webp', bandJpg: 'assets/coming/band-14.jpg'
  }
};

/* trackImage(slug, shape) · the requested shape, or the nearest one THIS
   track has, in a fixed order; null when it has none. It never looks at
   another track's record — SR-429's no-substitute rule: a missing image is
   a gap to fill, never a reason to borrow someone else's photograph.
   Every fallback and every miss is logged, so a gap shows in the console. */
var TRACK_IMAGE_FALLBACK = {
  portrait: ['portrait', 'panel', 'band'],
  panel:    ['panel', 'band', 'portrait'],
  band:     ['band', 'panel', 'portrait']
};
function trackImage(slug, shape) {
  var rec = TRACK_IMAGES[slug], order = TRACK_IMAGE_FALLBACK[shape];
  if (!rec || !order) {
    if (typeof console !== 'undefined') console.warn('trackImage: no ' + (rec ? 'shape "' + shape + '"' : 'track "' + slug + '"') + ' in content/track-images.js');
    return null;
  }
  for (var i = 0; i < order.length; i++) {
    if (rec[order[i]]) {
      if (i > 0 && typeof console !== 'undefined') console.info('trackImage: ' + slug + ' has no ' + shape + '; using its own ' + order[i]);
      return rec[order[i]];
    }
  }
  if (typeof console !== 'undefined') console.warn('trackImage: ' + slug + ' has no image in any shape');
  return null;
}

/* applyTrackImages(root) · for pages whose track images are markup rather
   than script-built strings (coming-soon.html, member-coming-soon.html,
   index.html): each <img data-track-img="slug" data-shape="band|panel|
   portrait"> gets its src from the registry. Call it inline right after the
   markup it fills, so the browser starts fetching as soon as the parser
   reaches it. An <img> whose lookup returns null is left without a src and
   hidden, never pointed at a substitute. */
function applyTrackImages(root) {
  var imgs = (root || document).querySelectorAll('img[data-track-img]');
  for (var i = 0; i < imgs.length; i++) {
    var el = imgs[i], src = trackImage(el.getAttribute('data-track-img'), el.getAttribute('data-shape') || 'band');
    if (src) el.src = src; else el.style.visibility = 'hidden';
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TRACK_IMAGES: TRACK_IMAGES, trackImage: trackImage, applyTrackImages: applyTrackImages };
}
