# Claude Code — homepage copy pass + pre-live audit fixes

**Rules for this run.** Do not push. Do not merge. Do not switch or create branches. Do not commit — Andre commits via GitHub Desktop. Stop and report at any ⚠. If a stage fails a check, leave the file as found and report; do not "fix it up" and continue.

**Payload.** Andre places `pass/` at the repo root:

| file | used by |
|---|---|
| `home-edits.json` | Stage A |
| `home-v97-reference.html` | Stage A (expected result) |
| `about.html` | Stage B |
| `journey/` | Stage C |
| `nav-old-block.txt` / `nav-dropdown-fix.js` | Stage E |
| `nav-touch-targets.css` | Stage F |

Stages A–C are the copy pass. Stages D–G close the audit findings.

⚠ **`pass/` must not be committed.** It sits at the repo root so the relative paths in this script resolve, but it contains a 1.5 MB reference copy of the homepage, the About rebuild and four image files. Netlify publishes everything in the repo, so committed it would go live at `/pass/…` on thesaferiseprotocol.com. Before anything else:

```bash
grep -qxF 'pass/' .gitignore || echo 'pass/' >> .gitignore
git status --porcelain | grep -c '^?? pass/' # expect 0
```

Delete the folder once the pass is verified.

---

## Stage 0 — Preflight (read only)

```bash
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"
echo "repo:   $(pwd)"
echo "branch: $(git rev-parse --abbrev-ref HEAD)"
git status --porcelain
ls -la pass pass/journey

# Locate the homepage by content signature, not filename (SR-084: a second
# content store is open and the filename cannot be trusted).
grep -rln "When dysregulation changes how you see the moment" --include=*.html .
grep -rln "Where do I tend to feel unregulated" --include=*.html .
```

⚠ **Stop and report both lists.** One file in both → that is the target. More than one → SR-084 is live; do not proceed. Zero → the repo is not at the state these edits were written against.

```bash
git log --oneline --format=%s | grep -o 'SR-[0-9]\+' | sort -t- -k2 -n | tail -1
```

The audit references SR-347, so expect the high-water mark near there. Next free numbers are this pass's IDs.

---

## Stage A — Homepage copy and type

```bash
export SR_TARGET="<path from Stage 0>"
```

```python
# apply-home.py
import json, os, re, shutil, sys, datetime

target = os.environ.get("SR_TARGET")
if not target or not os.path.exists(target):
    sys.exit("SR_TARGET not set to an existing file — rerun Stage 0")

src = open(target, encoding="utf-8").read(); before = src
edits = json.load(open("pass/home-edits.json", encoding="utf-8"))

applied, skipped, failed = [], [], []
for e in edits:
    old, new = e["old"], e["new"]
    if src.count(new) == 1 and src.count(old) == 0:
        skipped.append(e["id"]); continue
    n = src.count(old)
    if n != 1:
        failed.append((e["id"], f"old string found {n} times")); continue
    src = src.replace(old, new); applied.append(e["id"])

CSS = """
/* --- SR: hero h1 to four lines, post-film h2 to two --- */
.heroin.filmcopy h1{max-width:30ch;font-size:clamp(32px,3.7vw,52px);line-height:1.1}
.postfilm-copy h2{max-width:24ch}
@media(max-width:820px){.heroin.filmcopy h1{max-width:30ch;font-size:clamp(32px,3.7vw,52px);line-height:1.1}}
"""
if "SR: hero h1 to four lines" in src:
    skipped.append("type-set")
else:
    i = src.rfind("</style>")
    if i == -1: failed.append(("type-set", "no </style> found"))
    else: src = src[:i] + CSS + src[i:]; applied.append("type-set")

print("applied:", applied); print("skipped:", skipped); print("FAILED:", failed)
if failed: sys.exit("⚠ stopping — nothing written")

def tags(s, t): return (len(re.findall(rf"<{t}[ >]", s)), len(re.findall(rf"</{t}>", s)))
gates = [(f"tag balance {t}", tags(before, t) == tags(src, t))
         for t in ["section","div","p","h1","h2","h3","main","a","span","style"]]
gates += [("sessionStorage present", "sessionStorage" in src),
          ("theme key is sr-theme", "sr-theme" in src),
          ("no localStorage", "localStorage" not in src),
          ("no prohibited word 'practice'", not re.search(r"\bpractice", src, re.I)),
          ("no 'progress recognized over time'", "progress recognized over time" not in src),
          ("base64 count unchanged",
           len(re.findall(r"data:image/", before)) == len(re.findall(r"data:image/", src)))]
for n, ok in gates: print(("  ok   " if ok else "  FAIL "), n)
if not all(ok for _, ok in gates): sys.exit("⚠ gate failed — nothing written")

stamp = datetime.datetime.now().strftime("%Y%m%d-%H%M%S")
shutil.copy2(target, f"{target}.bak-{stamp}")
open(target, "w", encoding="utf-8").write(src)
print(f"\nwritten {target}  ({len(before)} -> {len(src)} bytes)")
```

Dry-run against the pre-edit file here: 10 edits applied, 0 failed, all gates passed, output byte-identical to `pass/home-v97-reference.html`. Re-running applies nothing.

```bash
diff <(sed 's/data:image[^"]*/DATA/g' "$SR_TARGET") \
     <(sed 's/data:image[^"]*/DATA/g' pass/home-v97-reference.html) && echo "MATCHES REFERENCE"
```

⚠ Expect **18 changed content lines + 5 added CSS lines**. More than that, stop and report.

---

## Stage B — About page

Whole-file drop. The theme mechanism has been silently reverted four times by exactly this kind of drop, so it is gated, not trusted.

```bash
LIVE=$(grep -rl 'class="tript' --include=about.html . | head -1); echo "${LIVE:-NOT FOUND}"
```

```python
# check-about.py <live-path>
import re, sys
live, new = sys.argv[1], "pass/about.html"
a = open(live, encoding="utf-8").read(); b = open(new, encoding="utf-8").read()
checks = [("delivered uses sessionStorage", "sessionStorage" in b),
          ("delivered uses sr-theme",       "sr-theme" in b),
          ("delivered has no localStorage", "localStorage" not in b),
          ("delivered has no sr.theme",     "sr.theme" not in b),
          ("no prohibited word 'practice'", not re.search(r"\bpractice", b, re.I)),
          ("theme mechanism not regressed", ("sessionStorage" in a) == ("sessionStorage" in b))]
for n, ok in checks: print(("  ok   " if ok else "  FAIL "), n)
if not all(ok for _, ok in checks): sys.exit("⚠ would regress theme or vocabulary — not landing")
print("\nbytes", len(a), "->", len(b), "| script blocks", a.count("<script"), "->", b.count("<script"))
```

⚠ Report the numbers, wait for Andre, then `cp` with a `.bak-` timestamp first.

---

## Stage C — T1 journey band

**Images go to `assets/journey/`.** That is the path the renderer builds (`assets/journey/t' + t.id + '-band.jpg`), not `assets/covers/`.

```bash
mkdir -p assets/journey
cp pass/journey/t1-band.jpg pass/journey/t1-band@2x.jpg \
   pass/journey/t1-band.webp pass/journey/t1-band@2x.webp assets/journey/
ls -la assets/journey
```

Then the renderer edit. Two exact-match replacements: the placeholder call inside `rJourney()`, and the `bandArt` flag on track 1 only.

```bash
grep -rln "assets/journey/t' + t.id + '-band.jpg" --include=*.js --include=*.html .
grep -rln "id: 1, visible: true, status: 'live'," --include=*.js --include=*.html .
```

```python
# apply-journey.py
import shutil, datetime, subprocess, sys

pairs = [("pass/journey/journey-old-line.txt", "pass/journey/journey-new-block.txt", "band markup"),
         ("pass/journey/track1-old-line.txt",  "pass/journey/track1-new-line.txt",  "bandArt flag")]

def find(needle):
    return subprocess.run(["grep","-rl",needle,"--include=*.js","--include=*.html","."],
                          capture_output=True, text=True).stdout.split()

stamp = datetime.datetime.now().strftime("%Y%m%d-%H%M%S")
for oldf, newf, label in pairs:
    old = open(oldf, encoding="utf-8").read().rstrip("\n")
    new = open(newf, encoding="utf-8").read().rstrip("\n")
    files = find(old.strip().split("\n")[0][:60])
    exact, divergent = [], []
    for f in files:
        s = open(f, encoding="utf-8").read()
        if new in s: print(f"  {label}: already applied in {f}"); continue
        (exact if s.count(old) == 1 else divergent).append(f)
    print(f"{label}: patch {exact} | ⚠ divergent {divergent}")
    for f in exact:
        s = open(f, encoding="utf-8").read()
        shutil.copy2(f, f"{f}.bak-{stamp}")
        open(f, "w", encoding="utf-8").write(s.replace(old, new))
        print("   patched", f)
    for f in divergent:
        print(f"\n----- {f} differs, paste into chat -----")
        s = open(f, encoding="utf-8").read(); i = s.find(old[:40])
        print(s[max(0,i-400):i+600])
```

⚠ Patch only exact matches. If either string is missing or duplicated, stop — do not hand-edit the renderer.

**Verified here** against the real template, served over HTTP:

| track | band art | placeholder | file chosen |
|---|---|---|---|
| 1 | yes | none | `t1-band.webp` |
| 2 | no | **kept** | — |
| 3 | no | **kept** | — |

At a 2× device pixel ratio the `srcset` correctly upgrades to `t1-band@2x.webp`; at 390px it stays on the 1400w file. The band renders at 1130 CSS px inside `.band--flush`.

I also added `onerror="this.style.opacity=0"` to the `<img>`, matching the guard already used on the door and panel images — so if the asset ever goes missing the band collapses quietly rather than showing a broken-image box, which is the same failure mode as the plans.html 404 in Stage D.

⚠ Provenance is still open on this asset. It was generated, not photographed, and Firefly is the indemnified route in the toolset. It is below the fold on one track, so the exposure is small, but the flag stays until Andre resolves it.

## Stage D — 🔴 BLOCKER: `assets/pages/plans-hero.jpg` 404

Diagnose before fixing. Two causes produce a local-works / Netlify-404, both checkable, and both more likely than a genuinely missing file.

```bash
echo "=== 1. tracked by git? (untracked = present locally, absent on Netlify) ==="
git ls-files assets/pages/ | sed -n '1,40p'
git check-ignore -v assets/pages/plans-hero.jpg || echo "  not gitignored"

echo "=== 2. case mismatch? (macOS is case-insensitive, Netlify's Linux is not) ==="
ls -la assets/pages/ 2>/dev/null || echo "  directory missing"
find assets -iname 'plans*hero*' 2>/dev/null

echo "=== 3. deleted? ==="
git log --oneline --diff-filter=D -- 'assets/pages/plans-hero*' | head

echo "=== 4. what path do other pages use? ==="
grep -rho 'assets/[a-zA-Z0-9/._-]*hero[a-zA-Z0-9/._-]*' --include=*.html . | sort | uniq -c | sort -rn

echo "=== 5. exact reference ==="
grep -n 'plans-hero' plans.html
```

⚠ **Report which branch applies before writing anything.**

- **Untracked** — exists on disk, never committed. `git add -f assets/pages/plans-hero.jpg`, then find out why `.gitignore` swallowed it. Nothing else changes.
- **Case mismatch** — file is `Plans-Hero.JPG`, reference is lowercase. Two-step rename so git records it on a case-insensitive filesystem:
  ```bash
  git mv assets/pages/<ACTUAL> assets/pages/tmp-plans-hero
  git mv assets/pages/tmp-plans-hero assets/pages/plans-hero.jpg
  ```
- **Deleted** — `git checkout <commit>^ -- assets/pages/plans-hero.jpg`.
- **Genuinely absent** — ⚠ stop. Do not substitute another image. The asset needs sourcing and toning (mean luminance 40–50 against `#08080C`). As an interim so the page doesn't ship a broken-image box, add `onerror="this.style.opacity=0"` to that one `<img>`, matching the guard already used on the door and panel images — and only with Andre's say-so.

Re-verify over HTTP, not the filesystem — that is what reproduces Netlify:

```bash
python3 -m http.server 8080 >/dev/null 2>&1 & sleep 1
curl -o /dev/null -s -w "plans-hero: %{http_code}\n" http://localhost:8080/assets/pages/plans-hero.jpg
```

---

## Stage E — HIGH: dropdown `aria-expanded` wrong on click

Reproduced here by driving a real hover-then-click:

| step | class `open` | `aria-expanded` | menu visible |
|---|---|---|---|
| hover | true | true | yes |
| then click | **false** | **false** | **yes** ← state lies to assistive tech |

Cause: `mouseenter` opens the menu, then the click handler calls `classList.toggle('open')`, which sees the already-open state and closes it. `aria-expanded` faithfully follows the wrong class, and where a CSS `:hover` rule exists the menu stays visibly open on top of it.

`pass/nav-dropdown-fix.js` replaces the block in `pass/nav-old-block.txt`. It routes every state change through one setter so class and aria cannot disagree, ignores the click that immediately follows a hover-open, and adds `focusin`/`focusout` so keyboard users get what mouse users already had.

Verified after the fix: hover → true/true/visible, click → **true/true/visible**, Escape → false/false/hidden with focus back on the trigger. Keyboard focus alone opens it.

```bash
grep -rln "classList.toggle('open')" --include=*.html --include=*.js .
```

Expect `js/saferise-nav.js`, `method.html`'s un-migrated copy, and the homepage.

```python
# apply-nav.py
import shutil, datetime, subprocess
old = open("pass/nav-old-block.txt", encoding="utf-8").read().rstrip("\n")
new = open("pass/nav-dropdown-fix.js", encoding="utf-8").read().rstrip("\n")
files = subprocess.run(["grep","-rl","classList.toggle('open')","--include=*.html","--include=*.js","."],
                       capture_output=True, text=True).stdout.split()
exact, divergent = [], []
for f in files:
    s = open(f, encoding="utf-8").read()
    if new in s: print("  already fixed:", f); continue
    (exact if s.count(old) == 1 else divergent).append(f)
print("exact match, will patch:", exact)
print("⚠ DIVERGENT, will NOT patch:", divergent)
stamp = datetime.datetime.now().strftime("%Y%m%d-%H%M%S")
for f in exact:
    s = open(f, encoding="utf-8").read()
    shutil.copy2(f, f"{f}.bak-{stamp}")
    open(f, "w", encoding="utf-8").write(s.replace(old, new))
    print("  patched", f)
for f in divergent:
    print(f"\n----- {f}: its version differs, paste this into chat -----")
    s = open(f, encoding="utf-8").read(); i = s.find("classList.toggle('open')")
    print(s[max(0, i-700):i+500])
```

⚠ Patch only exact matches. Paste divergent blocks into chat rather than guessing — `method.html` is un-migrated and may have drifted.

**Second half of this finding:** `method.html` carrying its own nav JS is the actual defect. Once behaviour is fixed everywhere, report what it would take to delete that copy and load `js/saferise-nav.js` instead. Don't do that migration in this pass.

---

## Stage F — MEDIUM: nav touch targets under 44px

`pass/nav-touch-targets.css`. Type sizes unchanged; only the hit box grows. Measured against the real nav: **7/7 items under 44px before, 0/7 after**, at 1440 / 1280 / 1024 / 820 / 600 / 390. Nav height 76 → 79 desktop, 97 → **81** mobile. No horizontal overflow at any width.

```bash
ls js/ css/ 2>/dev/null
grep -rln '\.navlinks a{' --include=*.css --include=*.html .
```

Append to the shared stylesheet if one exists. If nav CSS is still inlined per page, append to each page's last `<style>` block using the Stage A insert-before-`</style>` approach, and ⚠ report that duplication as its own SR item.

---

## Stage G — Terms and Privacy

Genuinely dead — no target page exists — as distinct from the ~150 other `href="#"` controls, which are most likely delegated listeners. Do not touch those.

```bash
grep -rn 'href="#"' --include=*.html . | grep -i -E 'terms|privacy'
ls -la terms.html privacy.html 2>/dev/null || echo "confirmed: no target pages"
```

Report only. Writing Terms and Privacy is a launch gate, not a code fix.

---

## Stage H — Verification

```bash
python3 -m http.server 8080 >/dev/null 2>&1 & sleep 1
```

Console paste on the homepage at 1440:

```js
(() => {
  const g = s => { const e = document.querySelector(s); if (!e) return "MISSING " + s;
    const c = getComputedStyle(e), b = e.getBoundingClientRect();
    return { lines: Math.round(b.height / parseFloat(c.lineHeight)),
             fontPx: Math.round(parseFloat(c.fontSize)),
             text: e.innerText.slice(0, 60) }; };
  const nav = [...document.querySelectorAll('.nav .brand,.nav .ntop,.navlinks > a,.navcta')];
  return {
    h1: g("h1"), bandH2: g(".postfilm-copy h2"),
    routerQ: g(".router-question"), routerE: g(".router-eyebrow"),
    navUnder44: nav.filter(e => e.getBoundingClientRect().height < 44).length,
    navTotal: nav.length,
    theme: sessionStorage.getItem("sr-theme"),
    localStorageKeys: Object.keys(localStorage),
    overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    ctaAboveFold: document.querySelector(".filmfooter").getBoundingClientRect().bottom <= innerHeight
  };
})()
```

| check | expected |
|---|---|
| `h1.lines` / `h1.fontPx` | **4** / **52** |
| `bandH2.lines` | **2** |
| `routerQ.text` | Where do you want to start? |
| `navUnder44` | **0** of 7 |
| `localStorageKeys` | **[]** |
| `overflowX` | **false** |
| `ctaAboveFold` | **true** |

Repeat at 1280, 1024, 820 — `h1.lines` should be 4 at all four. At 390 it is 6 and `bandH2` is 3; expected, not a defect.

Two behavioural checks the console object can't cover:

1. **Dropdown.** Hover Protocols, then click. `aria-expanded` must read `true` and the menu must still be visible. Escape must close it and return focus to the trigger. Repeat keyboard-only.
2. **Theme.** Toggle, reload, confirm the choice survives and `localStorage` is still empty. That is the check that has failed four times.

Re-run your audit script and diff against `docs/pre-live-audit.md`. Expected: 🔴 closed, HIGH closed on every page it was found, MEDIUM closed sitewide, no new findings.

---

## Report back

Stage 0 file lists · highest SR ID · applied/skipped/failed from A · About gate numbers · which Stage D branch applied · exact vs divergent files from E · where the F rules landed · Stage H console object at 1440 and 390 · re-run audit diff.

Do not commit. Suggested messages, IDs from Stage 0:

```
fix: SR-XXX homepage copy — hero, post-film band, router head
fix: SR-XXX homepage type — hero h1 to four lines, band h2 to two
fix: SR-XXX land About page rebuild
chore: SR-XXX add T1 journey band assets
fix: SR-XXX plans.html hero 404
fix: SR-XXX nav dropdown aria-expanded state accuracy
fix: SR-XXX nav touch targets to 44px minimum
docs: SR-XXX pre-live audit
```
