# Site readiness assessment — before traffic

**9 September 2026 · assessed against the live site**

---

## 0 · The finding that governs everything else

**`index.html` serves the entire site.** Fetching the homepage returns the
homepage, all three track pages with all thirty protocols, the plans page,
services, Premium 1:1, workshops, retreats, the foundation protocol and the about
page — in one document. That is the 968 KB in LG-92, and it is not a
code-tidiness problem.

**Every consequence below follows from it:**

| Area | What the single document causes |
|---|---|
| SEO | One `<title>`, one meta description, one canonical, for a site with ~40 pages of content. Nothing can rank for anything specific |
| Indexing | 151,773 words present as a single page. Google truncates long documents and will not treat sections as pages |
| Performance | Every visitor downloads every page. Mobile first-load is the whole site |
| Analytics | No page-level data is possible. You cannot measure which protocol people open |
| Sharing | A link to a protocol is a link to the whole site. Open Graph previews are identical everywhere |

⚠ **Nothing else in this document matters as much.** Splitting the document is
the precondition for SEO, analytics and performance work having any effect.

Two supporting facts from the same fetch: the site currently carries
`meta-robots: noindex, nofollow`, and protocol links use query strings —
`/protocol?track=1&protocol=01` rather than a path.

---

## 1 · SEO

**Current state: invisible, and structurally unable to be visible.**

Present meta tags, in full: `color-scheme`, `robots`, `viewport`. That is all.

### What is missing

**Per-page fundamentals.** Title, meta description, canonical URL, `lang`
attribute — one set per page, unique. Thirty protocol pages with the same title
compete with each other and rank for nothing.

**Open Graph and Twitter cards.** Every share of every page currently previews
identically. For a product whose distribution plan is people sharing a specific
protocol, this is a direct revenue cost.

**`sitemap.xml` and `robots.txt`.** Neither can be meaningful until the document
is split.

**Structured data.** `Article` on protocol pages, `FAQPage` on the extensive FAQ
sections, `Organization` sitewide, `Course` or `HowTo` on the method page.
JSON-LD, one block per page. This is what produces rich results, and the FAQ
content is already written.

**Clean URLs.** `/protocols/anxiety-reset` rather than
`?track=1&protocol=01`. Query strings are crawlable but they rank badly, read
badly and share badly.

**Heading hierarchy.** A single document means many `<h1>`s. One per page.

### The content advantage nobody is using

**318 resources and 151,773 words is an enormous SEO asset**, and none of it is
reachable. Track 01 going free makes ten complete protocols publicly indexable —
that is the distribution mechanism the GTM deck says does not exist. It exists;
it is behind a `noindex` and a single document.

### Sequence

1. Split the document. Nothing before this counts.
2. Per-page title, description, canonical, OG.
3. Clean URLs with redirects from the query-string forms.
4. `sitemap.xml`, `robots.txt`, remove `noindex` **at launch, not before**.
5. Structured data.
6. Google Search Console and Bing Webmaster Tools, verified.

**Tooling:** Search Console (free, non-negotiable) · Screaming Frog free tier,
500 URLs, for crawl audits · Ahrefs Webmaster Tools, free for a verified site.
**Do not buy an SEO subscription** until the site is indexed and there is data to
act on.

---

## 2 · Design and content drift

Found live, without looking hard.

### Pricing contradicts itself across surfaces

| Item | On the site | In the GTM deck |
|---|---|---|
| Premium 1:1 single | **€129** | **€79** |
| Premium 1:1 pack | **€299** for three | **€199** for three |
| Workshops | €29 / €39 per couple | €29 / €39 per couple ✓ |
| Retreat | €1,800 up to 50 · €3,500 over 50 | €1,800 · €3,500 banded |

**The 1:1 numbers are 60% apart.** One of them is wrong on a page a buyer can
read today.

### Copy that contradicts the product

**Track 02** is live and sold at €29/mo, and its own FAQ says *"Relationship
Healing is the track built for two people practising together, and it's in
development."*

**Track 03** carries both *"Content is in production now — join the waitlist for
early access"* and a **Start — €39/mo** button, on the same page.

### Naming drift

**Attention Advisory** and **Proximity Guide** both appear as the same resource —
LG-116, still unresolved, and visible to a member.

**"Somatic Release Activities"** is used as a singular noun: *"The Somatic Release
Activities is the compressed, in-the-moment version."* Plural label, singular
verb, three times.

### ⚠ The claim that will fail scrutiny

On the About page, under HeartMath:

> *"The heart generates an electromagnetic field far stronger than the brain's,
> and it responds to emotional states in real time."*

The field measurement is real. **The problem is that it does no work in your
argument.** The mechanism you actually rely on is heart-rate variability and
vagal tone — paced breathing at roughly six breaths a minute. The electromagnetic
field explains none of that, and it is the single most-cited example when
HeartMath is criticised.

It is the weakest sentence on a page whose entire job is credibility, and
removing it costs the argument nothing. Replace with the HRV mechanism, which is
what the method page already says correctly.

### Class namespace drift

Four namespaces now coexist — `sr-cs-`, `sr-mi-`, `sr-hb-`, `sr-mt-` — and the
audits this week found `.close` already taken, `.sr-mi-card` shared across two
pages, and 51 of 53 generic classes in the method mockup.

**Recommendation: write the rule down.** Every new component gets `sr-` plus a
two-letter surface code. Anything generic is a defect. One line in `CLAUDE.md`
prevents the next three collisions.

---

## 3 · Web security

Netlify serves HTTPS and HSTS by default. Everything below is absent and all of
it is a `_headers` file at the repo root.

```
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' https://*.supabase.co; connect-src 'self' https://*.supabase.co; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), camera=(), microphone=(), payment=(), interest-cohort=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

⚠ **CSP will break things on first deploy.** Ship it in `Content-Security-Policy-
Report-Only` first, watch the console for a week, then enforce. Deploying it
enforced without testing takes the site down silently.

**Already correct, and worth knowing:** the Supabase publishable key in the repo
is safe by design. RLS is enabled on both member tables and the security advisor
returns zero lints. No `service_role` key is committed. That is the part most
projects get wrong.

**Still to do:** rate-limiting on the password-reset endpoint when it is built,
and Supabase Auth's built-in leaked-password protection, which is one toggle.

---

## 4 · Data, telemetry and analytics

### The standing decision and the tension in it

**"No analytics at launch"** was decided to avoid a consent banner. That is a
sound instinct built on an outdated premise: **cookieless, IP-anonymised
analytics does not require consent** under the ePrivacy Directive, because
nothing is stored on the user's device.

So you can have analytics and no banner. You could not have both with Google
Analytics, which is why the original decision was right at the time.

### What is compatible with the privacy promise

**Yes — page-level, aggregate, cookieless.** Pageviews, referrers, entry and exit
pages, device class, country. No individual can be identified and nothing is
written to the device.

**Never.** Session replay, heatmaps, scroll tracking on protocol pages,
individual user journeys, any tool that records what a member did inside a
session. Your entire corporate argument is *"records are device-only, never
opened to leadership."* A session-replay tool contradicts that in a way an
enterprise buyer's security review will find.

⚠ **`public.usage_events` already exists server-side.** Its column comments
restrict `ref` to identifiers like `t1-04` and explicitly exclude journal text.
Keep that restriction absolute. The moment it holds free text, Article 9 applies
and the privacy page becomes untrue.

### Recommendation

**Plausible Analytics.** EU-hosted, cookieless, no consent banner required, ~€9/mo
at your volume, script is 1 KB. Fathom is equivalent and Canadian; Plausible's EU
hosting is the better fit given Frankfurt.

**Do not use Google Analytics.** Beyond the consent banner, several EU DPAs have
ruled GA4 transfers unlawful. On a product selling privacy as a feature it is a
positioning error before it is a legal one.

---

## 5 · Sales and marketing tooling

| Need | Recommendation | Cost | Why |
|---|---|---|---|
| Transactional + broadcast email | **Brevo** — already live | Free to 300/day | Authenticated, DKIM and DMARC green |
| CRM for the corporate pipeline | **Attio** or **HubSpot free** | €0–29/user | 470 warm contacts and four licences to close needs a pipeline, not a spreadsheet |
| Scheduling | **Cal.com** | Free–€12 | Self-hostable, EU option. Decided against Calendly previously |
| Payments | **Paddle** — merchant of record | 5% + 50¢ | Handles EU VAT entirely. The reason this beats Stripe for a Sint Maarten entity |
| Error monitoring | **Sentry**, EU region | Free tier | Configure `beforeSend` to strip journal text before it leaves the browser |
| Uptime | **Better Stack** free tier | Free | Netlify does not alert you when a page 500s |
| Link tracking for affiliates | **Rebrandly** or Netlify redirects | Free–€29 | Regional affiliates need attributable links or the channel is unmeasurable |

⚠ **Sentry needs deliberate configuration.** Default settings capture form field
contents and URLs. On a page where someone is writing about shame, that is the
most sensitive data you hold. Either scrub aggressively or do not deploy it on
member surfaces.

---

## 6 · Performance and accessibility

**Performance is entirely downstream of the single document.** Every visitor
currently downloads all thirty protocol pages and every service page. Splitting
it is the fix; nothing else moves the number meaningfully.

After the split: images are already `.webp` and correctly done · add
`loading="lazy"` below the fold · `font-display: swap` on Google Fonts, or
self-host and remove a third-party request from the critical path · consider
`fetchpriority="high"` on the hero image only.

**Accessibility — a real gap and a commercial one.** The skip-to-content link is
present and correct, which suggests someone thought about it. Beyond that it is
unaudited, and **an HR buyer's procurement process will ask for a VPAT or an
accessibility statement.** For a product sold to employers on the basis of care,
failing a contrast check is a bad look in a way it would not be elsewhere.

Run **axe DevTools** free extension across five representative pages. Check
keyboard traversal of the protocol router and the audio player. Confirm contrast
on the gold `#C9A03C` against the dark ground — it is the value most likely to
fail at small sizes.

---

## 7 · What a business development assessment should also cover, and does not yet

**Terms of the affiliate programme.** It is live on the site with an application
form and no published rate, cookie window, payout threshold or exclusion list.
Someone applying today cannot evaluate it.

**A named data processor register.** Article 30 exists in draft. It now needs the
real list: Supabase, Netlify, Brevo, Porkbun, Wistia, plus analytics when chosen.

**An accessibility statement.** Required for public-sector buyers in the EU and
asked for by most large private ones.

**A security contact.** `/.well-known/security.txt` with an address. Costs five
minutes and is the difference between a researcher emailing you and disclosing
publicly.

**Backup and recovery.** Supabase free tier retains limited backups. Before real
member data exists, decide the retention and test a restore once.

---

## 8 · Sequence

**Before any traffic**

1. Split `index.html`. Everything else depends on it
2. Per-page titles, descriptions, canonicals, OG tags
3. `_headers` with CSP in report-only
4. Fix the 1:1 pricing contradiction — €129 or €79, one of them
5. Fix the two copy contradictions on Tracks 02 and 03
6. Remove the electromagnetic-field claim from the About page

**At launch**

7. Remove `noindex` · publish `sitemap.xml` and `robots.txt`
8. Search Console and Bing verified
9. Plausible installed
10. Clean URLs with redirects
11. `security.txt` and an accessibility statement

**First month**

12. Structured data — Article, FAQPage, Organization
13. axe audit and fixes
14. CSP moved from report-only to enforced
15. CRM populated with the 470 warm contacts
16. Affiliate terms published

---

## 9 · The one-line version

**The site is not underperforming in search. It is not in search at all — and it
could not rank if the `noindex` were removed tomorrow, because forty pages of
content are one document with one title.**

The GTM deck says distribution does not exist and no mechanism produces a signup.
The mechanism is 151,773 words of genuine content that no search engine can
currently see as anything other than a single page.

**Splitting the document is the distribution strategy.** Everything else on this
list is downstream of it.
