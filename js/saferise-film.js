/* ═══════════════════════════════════════════════════════════════════════
   SafeRise — js/saferise-film.js · SR-518
   The marketing-film player. One component, used by the homepage film modal
   (index.html #filmModal) and the organisations film (organisations.html
   #sr-org-film). Vanilla, no library, no build step. Surface code sr-fm-.

   Reads FILMS[key] from content/video.js — no page names a video or poster
   path. Markup is one empty element: <div class="sr-fm" data-sr-film="home">.

   NOTHING IS FETCHED UNTIL PLAY IS PRESSED. That is the point of serving the
   films from R2: a player that preloads spends the bandwidth anyway. The
   <video> is built with preload="none" and NO source; the source is chosen
   and attached in the press handler, so zero video bytes move before then.

   SOURCE SELECTION is done here, at the press, not by the browser: 720p below
   820px, 1080p otherwise. Two <source> elements of the same type are not
   chosen by size — the browser takes the first one it can play — and the
   <source media> attribute is only recently supported again, so leaving it to
   the browser would hand every phone the 1080p file.

   No autoplay, ever. Native controls are added on first play, not before:
   until then the frame is the poster and one play control. This is a public
   marketing film, so the native scrubber and duration are correct here — the
   no-timer rule governs practice surfaces, not this.

   Captions: a <track kind="captions"> is attached with the source. The VTT
   files do not exist yet (outstanding — SR-518 register entry); a missing
   track fails silently and the film still plays.

   If VIDEO_BASE is still the <MEDIA_BASE> placeholder, or the file fails to
   load, the player returns to its poster state. The page does not break.
   ═══════════════════════════════════════════════════════════════════════ */
(function (global) {
  'use strict';

  var NARROW = '(max-width: 819px)';
  var PLAY_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5.5v13l11-6.5z"/></svg>';

  function mount(el, key) {
    if (!el || el.__srFilm) return el && el.__srFilm;
    var film = global.FILMS && global.FILMS[key || el.getAttribute('data-sr-film')];
    if (!film) return null;

    el.classList.add('sr-fm');
    el.setAttribute('role', 'region');
    el.setAttribute('aria-label', film.title);

    var video = document.createElement('video');
    video.className = 'sr-fm-video';
    video.preload = 'none';
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.poster = film.poster;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'sr-fm-play';
    btn.setAttribute('aria-label', 'Play: ' + film.title);
    btn.innerHTML = PLAY_ICON;

    el.appendChild(video);
    el.appendChild(btn);

    var loaded = false;

    function reset() {
      try { video.pause(); } catch (e) {}
      video.removeAttribute('controls');
      video.removeAttribute('src');
      while (video.firstChild) video.removeChild(video.firstChild);
      try { video.load(); } catch (e) {}   // drops the failed source; the poster shows again
      loaded = false;
      el.classList.remove('sr-fm--on');
    }

    function load() {
      var src = global.matchMedia && global.matchMedia(NARROW).matches ? film.src720 : film.src1080;
      if (!src || src.indexOf('<MEDIA_BASE>') >= 0) return false;   // base not filled: no request at all
      video.src = src;
      var track = document.createElement('track');
      track.kind = 'captions';
      track.srclang = 'en';
      track.label = 'English';
      track.src = film.captions;
      track.default = true;
      video.appendChild(track);
      loaded = true;
      return true;
    }

    function play() {
      if (!loaded && !load()) return;
      video.setAttribute('controls', '');
      el.classList.add('sr-fm--on');
      var p = video.play();
      if (p && p.catch) p.catch(function () {});
      try { video.focus({ preventScroll: true }); } catch (e) {}
    }

    function pause() { try { video.pause(); } catch (e) {} }

    video.addEventListener('error', reset);
    btn.addEventListener('click', play);

    el.__srFilm = { play: play, pause: pause, video: video };
    return el.__srFilm;
  }

  function mountAll(root) {
    [].forEach.call((root || document).querySelectorAll('[data-sr-film]'), function (el) { mount(el); });
  }

  global.SafeRiseFilm = { mount: mount, mountAll: mountAll };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { mountAll(); });
  else mountAll();
})(window);
