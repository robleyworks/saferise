/* ═══════════════════════════════════════════════════════════════════════
   SafeRise — js/saferise-sovereign-settings.js · SR-469 E1 (SOV-4)
   The AI reading switch in account settings — the same per-member
   preference the Sovereign session screens read and write
   (localStorage 'sr.sv.reading.<member id>', 'off' or anything else = on).
   ON by default (R14). Off means the session makes no reading request;
   earlier records are untouched.

   Renders only when Sovereign is enabled (window.SR_FLAGS.sovereign === true,
   or the local-development override js/saferise-sovereign.js honours) AND the
   member holds the Sovereign tier. SR-483, founder Ruling 1: a member without
   the tier has no voiced session and nothing of theirs is ever sent, so the
   switch would misdescribe their own privacy. The caller mounts after
   SafeRiseAccess.ready, so the tier is known by then. */
(function (global) {
  'use strict';

  function tierHasReading() {
    return !!(global.SafeRiseAccess && typeof global.SafeRiseAccess.can === 'function' && global.SafeRiseAccess.can('reading'));
  }
  function enabled() {
    if (!tierHasReading()) return false;
    if (global.SR_FLAGS && global.SR_FLAGS.sovereign === true) return true;
    var dev = /^(localhost|127\.0\.0\.1|\[::1\])$|\.(localhost|test)$|^deploy-preview-\d+--[a-z0-9-]+\.netlify\.app$/.test(location.hostname);
    try { return dev && global.localStorage.getItem('sr.sv.enabled') === 'true'; } catch (e) { return false; }
  }
  function key(user) { return 'sr.sv.reading.' + (user && user.id ? user.id : 'anon'); }
  function isOn(user) { try { return global.localStorage.getItem(key(user)) !== '"off"'; } catch (e) { return true; } }
  function set(user, on) { try { global.localStorage.setItem(key(user), JSON.stringify(on ? 'on' : 'off')); } catch (e) {} }

  function mount(el, user) {
    if (!el || !enabled()) return;
    function paint() {
      var on = isOn(user);
      el.innerHTML =
        '<p class="sr-tp-body"><strong style="color:var(--text)">AI feedback after Sovereign sessions:</strong> ' + (on ? 'on' : 'off') + '</p>' +
        '<p class="sr-tp-body" style="margin-top:6px">' + (on
          ? 'After a Sovereign session, the written record leaves this device to be read by Anthropic, our model provider, and comes back to you in your own words. It is never used to train anything. Your voice is never sent anywhere.'
          : 'No AI feedback is made. Your sessions, transcripts and ratings are still saved on this device, and your earlier feedback stays where it is.') + '</p>' +
        '<p style="margin-top:12px"><button type="button" class="sr-tp-pill" aria-pressed="' + on + '">' + (on ? 'Switch AI feedback off' : 'Switch AI feedback on') + '</button></p>';
      el.querySelector('button').addEventListener('click', function () { set(user, !isOn(user)); paint(); });
    }
    paint();
  }

  global.SafeRiseSovereignSettings = { mount: mount, isOn: isOn, set: set };
})(window);
