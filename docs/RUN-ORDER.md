# Run order — resuming after SR-367

**Where things stand.** SR-365 (`8549d0a`) and SR-366 landed. SR-367 produced the
`index.html` map and committed nothing, as instructed.

**Six passes are written and unrun.** Order matters — two of them are gates and
one must not run until a decision is made.

---

| # | Pass | Why here |
|---|---|---|
| **1** | `PASS-decisions-applied.md` | Retention, free entry, URL structure, the placeholder testimonial, and the Attention Advisory finding. **Skip if already run** — check `git log --grep` first |
| **2** | `PASS-track-page-quality.md` | ⚠ **GATE.** The protocol page renders a blank white panel for a signed-in member |
| **3** | `PASS-hero-v3.md` | Small. Welcome and resume banners |
| **4** | `PASS-method-page.md` | The new method page, plus the member coming-soon parity swap |
| **5** | `PASS-split-execute.md` | ⚠ **The big one.** Resolves the About duplication first |
| **6** | `PASS-auth-loop.md` | Confirmation redirect and password reset |

⚠ **Nothing is pushed until 5 is verified.** Andre pushes, not Claude Code.

---

## Why this order

**2 before everything.** A member clicking a protocol gets a blank white panel on
a dark site. That is the platform's core function failing, and it outranks every
improvement below it.

**3 before 4.** Ten minutes, and it is visible on the surface Andre looks at most.

**4 before 5.** The method page is new content into an existing shell. Doing it
after the split means doing it into eleven files instead of one.

**5 near the end, alone.** It touches every page. It needs its own commit and its
own rollback point, and it must not be entangled with anything else.

**6 last.** It depends on the Supabase project, which is live, and on Brevo SMTP,
which is not yet in the auth settings. It may report a blocked step, and that is
the correct outcome rather than a failure.

## Standing rules for all six

- **Single pass each. Do not stop.** The decision rules at the top of each brief
  replace any stop-and-report.
- **Your own fix-register entries outrank these briefs** wherever they disagree.
  Report the disagreement.
- **Allocate a separate SR ID per pass** from `git log --grep`.
- **Commit locally after each. Push nothing.**
- **Nav and footer stay byte-for-byte unchanged** except where a brief names the
  change explicitly.
- **Every new class is `sr-xx-` prefixed.** See `docs/CLAUDE-RULES-ADDENDUM.md`.
