/* ═════════════════════════════════════════════════════════════════════════
   SafeRise — content/video.js
   SR-518 · The two marketing films: the homepage film (Film 04) and the
   organisations film. Follows content/beds.js's own pattern — plain script,
   no ES module syntax, since this file (like every other content/*.js file)
   loads via a bare <script src> with no build step and no type="module".

   THE PATH LIVES HERE, NEVER IN MARKUP — same rule as meditation.js and
   beds.js. js/saferise-film.js reads FILMS[key] and builds the player; no
   page names a video or poster file.

   VIDEO_BASE is the single swap point. The MP4s are served from Cloudflare R2,
   not from the repo: at 22 MB and 39 MB a play, Netlify's bandwidth allowance
   would be spent on one page, and R2 egress is free. <MEDIA_BASE> is a literal
   placeholder until R2 exists. Andre fills it with the bucket's r2.dev URL once
   public access is on, and it becomes https://media.thesaferiseprotocol.com
   when the custom domain lands. One line, one edit, both times. Until then
   the posters render and the play control fails quietly.

   THE POSTERS STAY IN THE REPO, deliberately, at assets/video/. They are the
   first paint, and keeping them local means the frame still shows if R2 is
   slow or unreachable. Do not move them onto R2.

   The posters are composed key art with their own headline and standfirst
   baked in. Nothing is overlaid on them except the centred play control.

   `captions` points at WebVTT files that DO NOT EXIST YET (outstanding, SR-518
   register entry). A missing track degrades silently; the film still plays.

   `seconds` is the cut's real length, for reference only. The duration shown
   to a viewer is the native player's own, read from the file.
   ═════════════════════════════════════════════════════════════════════════ */

/* Fill once R2 public access is on — see the header. No trailing path beyond
   /video/; the filenames below are appended to it. */
var VIDEO_BASE = '<MEDIA_BASE>/video/';

/* Poster and caption paths are root-relative, for the reason SR-468 made
   MEDITATION_BASE root-relative: on a nested route a relative path resolves
   under that route and nothing loads. */
var FILMS = {
  home: {
    src1080: VIDEO_BASE + 'saferise-film04-1080p.mp4',
    src720:  VIDEO_BASE + 'saferise-film04-720p.mp4',
    poster:  '/assets/video/saferise-film04-poster.jpg',
    captions:'/assets/video/saferise-film04.vtt',
    title:   'SafeRise — the film',
    seconds: 58
  },
  organisations: {
    src1080: VIDEO_BASE + 'saferise-organisations-1080p.mp4',
    src720:  VIDEO_BASE + 'saferise-organisations-720p.mp4',
    poster:  '/assets/video/saferise-organisations-poster.jpg',
    captions:'/assets/video/saferise-organisations.vtt',
    title:   'SafeRise for organisations',
    seconds: 102
  }
};
