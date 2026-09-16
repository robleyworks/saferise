/* ==========================================================================
   sr-voice.js
   One voice preference, shared by every SafeRise player.

   The dashboard meditation player and the protocol guidance players must not
   each keep their own setting — a member picks once.

   Stores to localStorage under 'saferise-voice'. Device-only, never reported.
   Falls back silently when storage is unavailable (private browsing).
   ========================================================================== */
(function (global) {
  'use strict';

  var KEY      = 'saferise-voice';
  var VOICES   = ['female', 'male'];
  var DEFAULT  = 'female';
  var LABELS   = { female: 'Her voice', male: 'His voice' };
  var listeners = [];
  var current   = null;

  /* ---- preference ------------------------------------------------------ */
  function read() {
    try {
      var v = global.localStorage.getItem(KEY);
      return VOICES.indexOf(v) > -1 ? v : DEFAULT;
    } catch (e) { return DEFAULT; }
  }
  function write(v) {
    try { global.localStorage.setItem(KEY, v); } catch (e) { /* no-op */ }
  }

  function get() {
    if (current === null) current = read();
    return current;
  }

  /* Set the voice and notify every mounted player.
     Returns false when the value is unknown or unchanged. */
  function set(v) {
    if (VOICES.indexOf(v) < 0 || v === get()) return false;
    current = v;
    write(v);
    listeners.forEach(function (fn) {
      try { fn(v); } catch (e) { console.warn('[sr-voice] listener failed', e); }
    });
    return true;
  }

  function onChange(fn) {
    listeners.push(fn);
    return function off() {
      var i = listeners.indexOf(fn);
      if (i > -1) listeners.splice(i, 1);
    };
  }

  /* Another tab changed it — keep players in step. */
  global.addEventListener('storage', function (e) {
    if (e.key !== KEY || !e.newValue) return;
    if (VOICES.indexOf(e.newValue) < 0 || e.newValue === current) return;
    current = e.newValue;
    listeners.forEach(function (fn) { try { fn(current); } catch (err) {} });
  });

  /* ---- source resolution ----------------------------------------------- */
  /* Accepts either shape:
       { voices: { female:'…', male:'…' } }
       { src: '…' }                          ← legacy, single voice
     Returns null when nothing is resolvable. */
  function resolve(entry, voice) {
    if (!entry) return null;
    var v = voice || get();
    if (entry.voices) {
      return entry.voices[v] || entry.voices[DEFAULT] ||
             entry.voices[VOICES[0]] || entry.voices[VOICES[1]] || null;
    }
    return entry.src || null;
  }

  /* True when this entry actually offers a choice. Players should not render
     a toggle for single-voice content. */
  function hasChoice(entry) {
    return !!(entry && entry.voices && entry.voices.female && entry.voices.male);
  }

  /* ---- toggle ----------------------------------------------------------- */
  /* Builds a radiogroup and keeps it in sync with the shared preference.
     Returns { el, destroy }. Styling lives in CSS, not here. */
  function toggle(opts) {
    opts = opts || {};
    var wrap = document.createElement('div');
    wrap.className = opts.className || 'sr-voice';
    wrap.setAttribute('role', 'radiogroup');
    wrap.setAttribute('aria-label', opts.label || 'Voice');

    var buttons = VOICES.map(function (v) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'sr-voice__opt';
      b.dataset.voice = v;
      b.setAttribute('role', 'radio');
      b.textContent = LABELS[v];
      wrap.appendChild(b);
      return b;
    });

    function paint(v) {
      buttons.forEach(function (b) {
        var on = b.dataset.voice === v;
        b.classList.toggle('is-on', on);
        b.setAttribute('aria-checked', on ? 'true' : 'false');
        b.tabIndex = on ? 0 : -1;
      });
    }

    function choose(v) {
      if (set(v)) { /* listeners handle the swap */ }
      paint(get());
    }

    buttons.forEach(function (b, i) {
      b.addEventListener('click', function () { choose(b.dataset.voice); });
      b.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown' ||
            e.key === 'ArrowLeft'  || e.key === 'ArrowUp') {
          e.preventDefault();
          var next = buttons[(i + 1) % buttons.length];
          next.focus(); choose(next.dataset.voice);
        }
      });
    });

    var off = onChange(paint);
    paint(get());

    return {
      el: wrap,
      destroy: function () { off(); if (wrap.parentNode) wrap.parentNode.removeChild(wrap); }
    };
  }

  /* ---- swapping a live element ------------------------------------------ */
  /* Swaps the source of a playing <audio> or <video> without restarting it.
     Preserves position and play state. Never starts paused media.
     onFail is called with the attempted url when the new source cannot load;
     the element is left exactly as it was. */
  function swapSource(media, url, onFail) {
    if (!media || !url || media.currentSrc === new URL(url, location.href).href) return;

    var at      = media.currentTime || 0;
    var playing = !media.paused && !media.ended;
    var probe   = document.createElement(media.tagName.toLowerCase());
    probe.preload = 'auto';
    probe.src = url;

    function cleanup() {
      probe.removeEventListener('canplay', ok);
      probe.removeEventListener('error', bad);
      probe.removeAttribute('src');
      try { probe.load(); } catch (e) {}
    }
    function ok() {
      cleanup();
      media.src = url;
      media.load();
      var seek = function () {
        media.removeEventListener('loadedmetadata', seek);
        try { media.currentTime = at; } catch (e) {}
        if (playing) {
          var p = media.play();
          if (p && p.catch) p.catch(function () { /* blocked; stay paused */ });
        }
      };
      media.addEventListener('loadedmetadata', seek);
    }
    function bad() {
      cleanup();
      console.warn('[sr-voice] source unavailable, staying on current voice:', url);
      if (typeof onFail === 'function') onFail(url);
    }

    probe.addEventListener('canplay', ok, { once: true });
    probe.addEventListener('error', bad, { once: true });
    try { probe.load(); } catch (e) { bad(); }
  }

  /* ---- video + separate voice track ------------------------------------- */
  /* Protocol guidance keeps one silent video and two voice tracks.
     Binds an <audio> to a <video> so they start, stop, seek and rate-change
     together. Returns a detach function. */
  function bindTrack(video, audio) {
    if (!video || !audio) return function () {};
    video.muted = true;

    var DRIFT = 0.25;
    function sync() {
      if (Math.abs(audio.currentTime - video.currentTime) > DRIFT) {
        audio.currentTime = video.currentTime;
      }
    }
    var onPlay  = function () { sync(); audio.play().catch(function () {}); };
    var onPause = function () { audio.pause(); };
    var onSeek  = function () { audio.currentTime = video.currentTime; };
    var onRate  = function () { audio.playbackRate = video.playbackRate; };
    var onTime  = function () { sync(); };
    var onEnd   = function () { audio.pause(); };

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('seeked', onSeek);
    video.addEventListener('ratechange', onRate);
    video.addEventListener('timeupdate', onTime);
    video.addEventListener('ended', onEnd);

    return function detach() {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('seeked', onSeek);
      video.removeEventListener('ratechange', onRate);
      video.removeEventListener('timeupdate', onTime);
      video.removeEventListener('ended', onEnd);
    };
  }

  global.SRVoice = {
    get: get,
    set: set,
    onChange: onChange,
    resolve: resolve,
    hasChoice: hasChoice,
    toggle: toggle,
    swapSource: swapSource,
    bindTrack: bindTrack,
    VOICES: VOICES.slice(),
    LABELS: LABELS
  };
})(window);
