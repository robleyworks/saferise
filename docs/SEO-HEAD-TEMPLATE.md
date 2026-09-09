# Per-page head block — the pattern

One of these per page. Every value unique. Nothing here works until
`index.html` is split.

```html
<!-- REQUIRED, every page -->
<html lang="en">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{PAGE TITLE} — SafeRise Protocol</title>
<meta name="description" content="{140–158 characters, written for this page}">
<link rel="canonical" href="https://thesaferiseprotocol.com/{path}">

<!-- SHARING -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="SafeRise Protocol">
<meta property="og:title" content="{PAGE TITLE}">
<meta property="og:description" content="{same as description}">
<meta property="og:url" content="https://thesaferiseprotocol.com/{path}">
<meta property="og:image" content="https://thesaferiseprotocol.com/assets/og/{page}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
```

⚠ **`og:image` must be 1200 × 630.** Your existing 1200 × 640 band images are
eight pixels off and will be cropped. Generate an `/assets/og/` set at the exact
size.

---

## Titles and descriptions to use

| Path | Title | Description |
|---|---|---|
| `/` | SafeRise Protocol — guided nervous system regulation | Guided protocols for the states that are hardest to get through — anxiety, anger, overwhelm, shame, shutdown. Self-guided, ready when you need them. |
| `/method` | The Method — six frameworks, and what each cannot do | Attention is a power source, and it is finite. The four steps, the six frameworks behind them, the research, and the stated limit on every one. |
| `/about` | About SafeRise — the science, the method, the founder | Why this exists, who built it, and the six research frameworks it stands on. |
| `/personal-transformation` | Personal Transformation — ten protocols for your own nervous system | Anxiety, anger, overwhelm, grief, shame, shutdown. Ten guided protocols for the states that arrive with nobody else in the room. |
| `/relationship-healing` | Relationship Healing — ten protocols for what keeps happening between you | Conflict, trust, distance, repair. Work the half of the pattern you can actually reach. |
| `/professional-performance` | Professional Performance — ten protocols for when the stakes rise | Pressure, visibility, judgement, belonging, burnout. The version of you that arrives when something is at stake. |
| `/plans` | Plans and pricing — SafeRise Protocol | Three tracks, cumulative access. Personal from €19/month, cancel anytime, keep everything you have written. |
| `/live-sessions` | Live sessions, workshops and 1:1 — SafeRise Protocol | Facilitated workshops, private sessions with the founder, and in-person half-day work for organisations. |
| `/coming-soon` | What is coming next — eight tracks in development | Elevation, Executive Presence, Sex & Intimacy, Training & The Body, and more. |

**Protocol pages:** `{Protocol Name} — SafeRise Protocol` and the protocol's own
one-line description from `content/tracks.js`. Both already exist in the data —
no new copy needed.

---

## Structured data

One JSON-LD block per page type. All values already exist in the content.

**Sitewide, in the footer partial:**

```html
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Organization",
 "name":"SafeRise Protocol",
 "url":"https://thesaferiseprotocol.com",
 "logo":"https://thesaferiseprotocol.com/assets/brand/logo.png",
 "parentOrganization":{"@type":"Organization","name":"Kenor International B.V."},
 "contactPoint":{"@type":"ContactPoint","email":"contact@thesaferiseprotocol.com","contactType":"customer support"}}
</script>
```

**Protocol pages — one per protocol, built from `tracks.js`:**

```html
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Article",
 "headline":"{protocol title}",
 "description":"{protocol description}",
 "about":{"@type":"Thing","name":"{state} — nervous system regulation"},
 "isPartOf":{"@type":"CreativeWorkSeries","name":"{track name}"},
 "publisher":{"@type":"Organization","name":"SafeRise Protocol"},
 "inLanguage":"en"}
</script>
```

**Track pages — the FAQ sections are already written and are the highest-value
structured data on the site:**

```html
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
 {"@type":"Question","name":"{question}",
  "acceptedAnswer":{"@type":"Answer","text":"{answer, plain text}"}}
]}
</script>
```

⚠ **Generate the FAQ blocks from the existing markup rather than retyping.** Each
track page carries 12–14 questions; retyping introduces drift between the visible
answer and the structured one, which Google treats as a violation.

**Do not add `Review`, `AggregateRating`, `Product` or `MedicalWebPage`.** The
first two need real reviews you do not have. `MedicalWebPage` invites exactly the
regulatory reading the platform is built to avoid.
