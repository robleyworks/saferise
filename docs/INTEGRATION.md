# SafeRise Design System — Integration

Two files, loaded once, applied to every page.

```
css/saferise-system.css
js/saferise-system.js
```

In `index.html`, **last** in `<head>` (after every existing stylesheet) and **last** before `</body>`:

```html
<link rel="stylesheet" href="/css/saferise-system.css">
...
<script src="/js/saferise-system.js" defer></script>
```

Order matters. The system overrides presentation by winning the cascade, not by using `!important` on everything, so it has to load after the platform's own styles.

If you are still building a single-file HTML, paste the CSS inside a `<style>` block and the JS inside a `<script>` block in the same positions. The JS is safe to inline — it deliberately contains no literal closing script tag.

---

## Part A — global, no markup changes

Applies itself to existing platform classes the moment the file loads. Covers every page and every `.prog-overlay` at once:

| Area | What changes |
|---|---|
| Ambient field | One slow gold bloom on the breath cadence behind everything |
| Nav | Glass blur, pill nav links, gradient CTA |
| Type | Hero to 92px with gradient fill, section titles to 50px, 62ch body measure |
| Section seams | Hard gold borders become fading gradient rules |
| Surfaces | `.proto-item`, `.sci-card`, `.expert-card`, `.step-card`, `.tier`, `.res-item`, `.jprog-*`, `.pull-quote` get radius, hairline borders, hover lift |
| Media | `.video-placeholder`, `.media-block`, `.audio-placeholder` get 20px radius, inner ring, pulsing play button |
| Buttons | `.j-cta-btn`, `.jprog-btn`, `.safety-save-btn`, `.res-action` and friends get pill radius and a sheen sweep |
| Focus | Visible gold focus ring on every interactive element |

**Nothing to do.** Verify by checking that `.proto-item` computes `border-radius: 14px`.

---

## Part B — components, opt-in

All namespaced `sr-` so they cannot collide with existing platform classes. Add the markup where you want each one.

### Full-bleed banner

Breaks out of a max-width container without moving the markup. Put it as the first child inside the portal container.

```html
<div class="sr-banner">
  <video class="sr-banner-media" poster="/img/personal-poster.jpg" muted playsinline></video>
  <div class="sr-banner-scrim"></div>
  <div class="sr-banner-copy">
    <h1>Personal<em>Transformation</em></h1>
    <p class="sr-lead">A library of protocols for real change.</p>
    <p>You already know what you're feeling…</p>
  </div>
  <button class="sr-play" aria-label="Play introduction">
    <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
  </button>
</div>
```

The scrim is not decoration — it is what keeps overlaid text legible when the video frame is bright. Do not remove it.

### Protocol covers

The same card markup works in a grid **or** a carousel. Only the wrapper changes.

```html
<article role="button" tabindex="0" class="sr-cover sr-c01"
         aria-label="Open the Anxiety Reset Protocol"
         onclick="openProtocol('p1')">
  <span class="sr-tile">
    <span class="sr-art"></span>
    <span class="sr-num">01</span>
    <span class="sr-kicker">Regulate</span>
    <span class="sr-rule"></span>
  </span>
  <h3>Anxiety Reset</h3>
  <p class="sr-trig">Uncertainty, spiralling thoughts, future fear, decision paralysis</p>
</article>
```

- Use `<article role="button">`, **not** `<button>`. Chromium will not let a button host an aspect-ratio child; the tile renders and the parent stays at zero height.
- `sr-c01` … `sr-c10` set the colour identity. Same numbering as the protocols.
- For real photography, set `background-image` on `.sr-art` — the gradient then acts as a tint.
- Add `data-locked="true"` to dim a card behind the paywall.

**Grid wrapper** — 5 across, responsive down to 2:

```html
<div class="sr-covers"> …cards… </div>
```

**Carousel wrapper** — needs the group, track and controls:

```html
<div data-sr-carousel-group>
  <div class="sr-car-head">
    <p class="sr-kick">Browse All Protocols</p>
    <div class="sr-car-nav">
      <span class="sr-counter"><b data-sr-counter>1</b> / 10</span>
      <button class="sr-arrow" data-sr-prev aria-label="Previous">
        <svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button>
      <button class="sr-arrow" data-sr-next aria-label="Next">
        <svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></button>
    </div>
  </div>
  <div class="sr-carousel" data-sr-carousel>
    <div class="sr-ptrack" data-sr-track tabindex="0"> …cards… </div>
  </div>
</div>
```

Self-initialising. Several carousels can coexist on a page — each is scoped to its own `[data-sr-carousel-group]`.

### Section head, feature grid, testimonial, services, CTA band

```html
<section class="sr-section">
  <div class="sr-head">
    <h2>What's Included</h2>
    <p>The full resource library — everything you need to…</p>
  </div>

  <div class="sr-features">
    <div class="sr-feat">
      <span class="sr-ico"><svg viewBox="0 0 24 24">…</svg></span>
      <div>
        <h3>Guided Experience</h3>
        <p><span class="sr-tagline">Step-by-step audio.</span><br>The full session, voiced and paced.</p>
      </div>
    </div>
    …
  </div>

  <p class="sr-note">Attention Advisory and Invitation to Repair appear where…</p>
</section>

<section class="sr-testi">
  <blockquote>…</blockquote>
  <p class="sr-who">First Name, Location<span>Personal Transformation · 3 months</span></p>
</section>

<section class="sr-human">
  <div class="sr-head">…</div>
  <div class="sr-svc-pair">
    <article class="sr-svc sr-svc-group">
      <span class="sr-svc-ico"><svg>…</svg></span>
      <p class="sr-svc-kick">Join a Monthly Workshop</p>
      <h3>Work a protocol live, with others.</h3>
      <p class="sr-svc-body">…</p>
      <ul class="sr-svc-meta"><li>Small group</li><li>Monthly</li><li>Live, facilitated</li></ul>
      <button class="sr-svc-cta">Discover More ◆</button>
    </article>
    <article class="sr-svc sr-svc-solo">
      <span class="sr-svc-tag">Limited availability</span>
      …
    </article>
  </div>
</section>

<div class="sr-ctabar" data-sr-cta>
  <p class="sr-say">Your SafeRise is ready <b>when you are.</b></p>
  <div class="sr-acts">
    <a class="sr-free" href="/foundation">Preview the Foundation Protocol</a>
    <button class="sr-start">Start — €9/mo ◆</button>
  </div>
</div>
```

`data-sr-cta` is the auth hook. Once auth resolves, call:

```js
SafeRiseUI.setPlan('personal');   // hides every CTA band
SafeRiseUI.setPlan('none');       // shows them
```

### FAQ

Native `<details>` — no JavaScript, keyboard and screen-reader accessible, cannot break when the file is split.

```html
<div class="sr-faq-cols">
  <div>
    <details class="sr-q">
      <summary><span class="sr-sign"></span>Is this therapy?</summary>
      <p class="sr-a">No. SafeRise is a structured self-guided practice…</p>
      <p class="sr-a">Many people use it alongside therapy…</p>
    </details>
    …
  </div>
  <div> …second column… </div>
</div>
```

### Footer + scope notice

**Belongs on every page, including the portals and the Reader.** Build it once as a partial.

```html
<footer class="sr-foot">
  <div class="sr-foot-in">
    <div class="sr-scope">
      <h3><svg viewBox="0 0 24 24">…shield…</svg>Scope &amp; Safety</h3>
      <p><b>SafeRise is a self-guided practice and coaching resource. It is not therapy,
      medical treatment, or crisis care,</b> and it does not diagnose any condition. …</p>
      <p><b>If you are in immediate danger, contact your local emergency number.</b>
      … <a href="https://findahelpline.com" target="_blank" rel="noopener">findahelpline.com</a> …</p>
    </div>
    <div class="sr-foot-grid"> …four columns… </div>
    <div class="sr-foot-bottom">
      <p>© 2026 SafeRise Protocol · an independent practice created by Andre Robley</p>
      <span class="sr-spacer"></span>
      <a href="/terms">Terms</a><a href="/privacy">Privacy</a><a href="/contact">Contact</a>
    </div>
  </div>
</footer>
```

### Chapter rail

Long marketing pages only. Add `data-sr-rail` to the main content wrapper:

```html
<div id="main-content" data-sr-rail> … </div>
```

It builds the chapter chips from the section eyebrows already on the page. Portals and the Reader should **not** carry this attribute.

---

## Rules for this codebase

1. **Prefix every new class `sr-`.** A collision already cost real time: the carousel silently collapsed to 36px because `.track` was already the video scrubber at `height:3px`.
2. **Never use `<button>` as a card that contains an aspect-ratio child.** Use `<article role="button" tabindex="0">`.
3. **No literal closing script tag inside a JS file** that might be inlined — not even in a comment.
4. **Reduced motion is handled centrally.** Don't add per-component media queries for it.
5. **Verify before merge:** `node --check` on each JS file, `JSON.parse` on extracted `RESOURCE_CONTENT`, then a Playwright pass that opens two protocols and one Reader resource and asserts zero console errors.

---

## Rollout order

1. Load both files, ship, confirm Part A landed everywhere — check `.proto-item` radius and that protocol accordions still open.
2. Footer partial on every page. This carries the Scope & Safety notice, so it is the highest priority.
3. Personal Transformation portal: banner, covers, features, services, CTA band, FAQ.
4. Relationship Healing and Professional portals — same markup, swap the copy and the `sr-cNN` colours.
5. Chapter rail on the main journey page only.
