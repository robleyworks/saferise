/* SafeRise — Sentry, configured to scrub before anything leaves the browser.
 *
 * Load ONLY on public marketing pages until a member-safe config is signed off.
 * Every exclusion below is deliberate. Read js/CLAUDE.md before changing one.
 */
(function () {
  'use strict';

  // ── 1 · never initialise on a member surface ───────────────────────────
  var MEMBER = /\/(dashboard|account|protocol|resource|member-|journal|record)/i;
  if (MEMBER.test(location.pathname)) return;

  // ── 2 · never initialise locally ───────────────────────────────────────
  var h = location.hostname;
  if (h === 'localhost' || h === '127.0.0.1' || h === '' ||
      h.endsWith('.local') || h.endsWith('.netlify.app')) return;

  if (typeof Sentry === 'undefined') return;

  Sentry.init({
    dsn: 'PASTE_EU_REGION_DSN_HERE',          // must be the EU-region ingest host
    environment: 'production',
    release: window.SR_BUILD || 'unknown',

    // no performance tracing — it records navigation paths per user
    tracesSampleRate: 0,
    // no replay, at any rate, on any surface
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0,

    // do not send PII Sentry would otherwise attach automatically
    sendDefaultPii: false,
    attachStacktrace: true,
    maxBreadcrumbs: 20,

    // drop browser-extension and third-party noise
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'ResizeObserver loop completed with undelivered notifications',
      'Non-Error promise rejection captured',
      /^chrome-extension:/, /^moz-extension:/, /^safari-extension:/
    ],
    denyUrls: [/extensions\//i, /^chrome:\/\//i, /^moz-extension:/i],

    // ── 3 · scrub every outbound event ───────────────────────────────────
    beforeSend: function (event) {
      try {
        // strip query strings and hash fragments everywhere they appear —
        // auth tokens arrive in the fragment, and answers arrive in queries
        var clean = function (u) {
          return typeof u === 'string' ? u.split('?')[0].split('#')[0] : u;
        };
        if (event.request) {
          event.request.url = clean(event.request.url);
          delete event.request.query_string;
          delete event.request.data;      // form bodies — never send
          delete event.request.cookies;
          if (event.request.headers) {
            delete event.request.headers.Cookie;
            delete event.request.headers.Authorization;
            delete event.request.headers.Referer;
          }
        }
        // no user identity of any kind
        delete event.user;
        delete event.server_name;

        // breadcrumbs carry typed input and clicked text — drop both
        if (event.breadcrumbs) {
          event.breadcrumbs = event.breadcrumbs.filter(function (b) {
            return b.category !== 'ui.input' && b.category !== 'console';
          }).map(function (b) {
            if (b.data && b.data.url) b.data.url = clean(b.data.url);
            if (b.category === 'ui.click') b.message = '[element]';
            delete b.data && b.data.arguments;
            return b;
          });
        }
        // last resort: if any frame mentions a member path, drop the event
        var s = JSON.stringify(event);
        if (MEMBER.test(s)) return null;
      } catch (e) {
        return null;   // if scrubbing fails, send nothing
      }
      return event;
    },

    beforeBreadcrumb: function (b) {
      if (b.category === 'ui.input') return null;     // typed characters
      if (b.category === 'console') return null;      // logged variables
      return b;
    }
  });
})();
