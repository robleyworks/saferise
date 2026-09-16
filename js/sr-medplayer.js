/* SafeRise — meditation player controller
   Requires: sr-clearing-visual.js, sr-clearing-player.css

   SRMedPlayer.open({
     key:   't0-00',
     title: 'The Clearing',
     eyebrow:'Settle in',
     sub:   'Quiet the noise and arrive in a state where the work can land.',
     src:   'assets/audio/meditation/t0-00-the-clearing.mp3',
     warm:  [[240,200,120],[206,146,142],[226,186,96]],   // optional, per track
     cool:  [[96,196,208],[124,178,196],[162,146,220],[110,162,190]]
   });

   No autoplay. No progress bar. No duration shown. */

(function (root) {
  'use strict';

  var MOUNT = null;

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function build(cfg) {
    var wrap = el('div', 'sr-medplayer');
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-label', cfg.title || 'Guided meditation');

    var stage = el('div', 'sr-medplayer__stage');
    stage.appendChild(el('canvas', 'sr-glow'));
    stage.appendChild(el('canvas', 'sr-field'));
    stage.appendChild(el('div', 'sr-medplayer__vig'));
    stage.appendChild(el('div', 'sr-medplayer__grain'));

    var close = el('button', 'sr-medplayer__close', '&#10005;');
    close.setAttribute('aria-label', 'Close');
    stage.appendChild(close);

    var play = el('button', 'sr-medplayer__play');
    play.setAttribute('aria-label', 'Play');
    stage.appendChild(play);

    var lock = el('div', 'sr-medplayer__lockup', '<i></i><span>SafeRise</span>');
    lock.setAttribute('aria-hidden', 'true');
    stage.appendChild(lock);

    var audio = document.createElement('audio');
    audio.preload = 'metadata';
    audio.src = cfg.src;

    var copy = el('div', 'sr-medplayer__copy');
    if (cfg.eyebrow) copy.appendChild(el('div', 'sr-medplayer__eyebrow', cfg.eyebrow));
    copy.appendChild(el('h2', 'sr-medplayer__title', cfg.title || ''));
    if (cfg.sub) copy.appendChild(el('p', 'sr-medplayer__sub', cfg.sub));

    wrap.appendChild(stage);
    wrap.appendChild(audio);
    wrap.appendChild(copy);

    /* ---- transport ---- */
    function setPlaying(on) {
      play.setAttribute('data-playing', on ? 'true' : 'false');
      play.setAttribute('aria-label', on ? 'Pause' : 'Play');
    }
    play.addEventListener('click', function () {
      if (audio.paused) { audio.play().catch(function () {}); }
      else { audio.pause(); }
    });
    audio.addEventListener('play',  function () { setPlaying(true); });
    audio.addEventListener('pause', function () { setPlaying(false); });
    audio.addEventListener('ended', function () { setPlaying(false); });

    /* control fades during playback, returns on movement */
    var idle;
    function wake() {
      if (audio.paused) return;
      play.setAttribute('data-wake', 'true');
      clearTimeout(idle);
      idle = setTimeout(function () { play.removeAttribute('data-wake'); }, 2600);
    }
    ['mousemove', 'touchstart', 'keydown'].forEach(function (e) {
      wrap.addEventListener(e, wake, { passive: true });
    });

    /* ---- teardown ---- */
    function destroy() {
      try { audio.pause(); } catch (e) {}
      audio.removeAttribute('src');
      audio.load();
      clearTimeout(idle);
      if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
      document.removeEventListener('keydown', onKey);
      MOUNT = null;
      if (typeof cfg.onClose === 'function') cfg.onClose();
    }
    function onKey(e) {
      if (e.key === 'Escape') destroy();
      if (e.key === ' ' || e.code === 'Space') { e.preventDefault(); play.click(); }
    }
    close.addEventListener('click', destroy);
    document.addEventListener('keydown', onKey);

    return { wrap: wrap, stage: stage, audio: audio, destroy: destroy };
  }

  function open(cfg, container) {
    if (MOUNT) MOUNT.destroy();
    var m = build(cfg);
    (container || document.body).appendChild(m.wrap);

    /* start the visual once the element has real dimensions */
    requestAnimationFrame(function () {
      if (root.SRClearing && root.SRClearing.mount) {
        root.SRClearing.mount(m.stage, m.audio, { warm: cfg.warm, cool: cfg.cool });
      }
    });

    MOUNT = m;
    return m;
  }

  root.SRMedPlayer = { open: open, close: function () { if (MOUNT) MOUNT.destroy(); } };
})(window);
