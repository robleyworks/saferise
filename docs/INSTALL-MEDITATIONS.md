# Installing the remaining meditations

Takes the site from **24 of 31** registered to **all 31**, then turns off the placeholder fallback.

Masters live in `~/Desktop/SafeRise Guided Meditation Production/` as `MASTER_<CODE>_<Name>.mp3`.
The repo wants `assets/audio/meditation/<code>-<slug>.mp3`, registered in `content/meditation.js`.
`protocol.html` looks up `MEDITATION[galaxyId]`, so a registered key wires its own protocol page.

## What is left

| Code | Slug | Title | Master file |
|---|---|---|---|
| t1-03 | overwhelm-threshold | Overwhelm Threshold | `MASTER_T1-03f_Overwhelm-Threshold-Female.mp3` |
| t1-05 | shame-dissolution | Shame Dissolution | `MASTER_T1-05_Shame-Dissolution.mp3` |
| t1-06 | grief-integration | Grief Integration | `MASTER_T1-06_Grief-Integration.mp3` |
| t2-01 | safe-conversation | Safe Conversation | `MASTER_T2-01_Safe-Conversation.mp3` |
| t3-02 | conflict-navigation | Conflict Navigation | `MASTER_T3-02_Conflict-Navigation.mp3` |
| t3-03 | imposter-dissolution | Imposter Dissolution | `MASTER_T3-03_Imposter-Dissolution.mp3` |
| t3-06 | belonging-gap | Belonging Gap | `MASTER_T3-06_Belonging-Gap.mp3` |

**Overwhelm ships female only.** `MEDITATION` holds one `src` per key. SR-431
(PASS-J.md A1-3) · this used to say the male take waits on "the member-toggled male/female
architecture from the 9 September handover" — that architecture was descoped on 18 Sep
(LG-198) and reaffirmed 22 Sep: **launch ships one voice; the toggle is a post-beta roadmap
item.** The outcome is unchanged — `MASTER_T1-03m_Overwhelm-Threshold-Male.mp3` stays on the
Desktop, installing it now would add 19 MB to the repo permanently for a file nothing can
reach — but the reason is "one voice ships," not "waiting for the toggle."

## Rules this follows

- **`tracks.js` is the source of truth for copy.** `eyebrow` and `sub` are read out of the protocol
  records there, never authored in `meditation.js`.
- **Never claim a path that is not on disk.** Every `src` is verified before commit.
- **Only missing keys are inserted**, so this is safe against a `meditation.js` someone else edited.

## 1 · Copy and register

```bash
cd ~/Documents/GitHub/saferise

SRC="$HOME/Desktop/SafeRise Guided Meditation Production"
DST="assets/audio/meditation"

# code|slug|Title|master filename
ROWS='
t1-03|overwhelm-threshold|Overwhelm Threshold|MASTER_T1-03f_Overwhelm-Threshold-Female.mp3
t1-05|shame-dissolution|Shame Dissolution|MASTER_T1-05_Shame-Dissolution.mp3
t1-06|grief-integration|Grief Integration|MASTER_T1-06_Grief-Integration.mp3
t2-01|safe-conversation|Safe Conversation|MASTER_T2-01_Safe-Conversation.mp3
t3-02|conflict-navigation|Conflict Navigation|MASTER_T3-02_Conflict-Navigation.mp3
t3-03|imposter-dissolution|Imposter Dissolution|MASTER_T3-03_Imposter-Dissolution.mp3
t3-06|belonging-gap|Belonging Gap|MASTER_T3-06_Belonging-Gap.mp3
'

echo "$ROWS" | grep -v '^$' | while IFS='|' read -r code slug title file; do
  if [ -f "$SRC/$file" ]; then
    cp "$SRC/$file" "$DST/$code-$slug.mp3" && echo "copied  $code-$slug.mp3"
  else
    echo "MISSING $file"
  fi
done

ROWS="$ROWS" python3 - <<'PY'
import os, re

rows = [l.split('|') for l in os.environ['ROWS'].strip().splitlines() if l.strip()]
src  = open('content/tracks.js', encoding='utf-8').read()

# Strip /* ... */ comments before matching. Several protocol records carry comment blocks
# inside them, and t3-06 has an extra sixth element the other twenty-nine do not, so the slug
# is not at a fixed position — the (?:...)*? before it absorbs any extra fields. A naive
# line-by-line regex silently drops t3-06.
flat = re.sub(r'/\*.*?\*/', ' ', src, flags=re.S)
Q    = r"(?:[^'\\]|\\.)*"
pat  = (r"\[\s*'(\d\d)'\s*,\s*'([^']*)'\s*,\s*'(%s)'\s*,\s*'(%s)'\s*,\s*'(%s)'\s*,\s*\[[^\]]*\]"
        r"(?:\s*,\s*'%s')*?\s*,\s*'([a-z0-9-]+)'\s*,\s*'([A-Za-z]+)'\s*\]") % (Q, Q, Q, Q)
by_slug = {m[5]: {'verb': m[1], 'sub': m[3]} for m in re.findall(pat, flat, re.S)}
if len(by_slug) < 30:
    raise SystemExit('parsed only %d protocol records from tracks.js, expected 30' % len(by_slug))

med = open('content/meditation.js', encoding='utf-8').read()
esc = lambda s: s.replace('\\', '\\\\').replace("'", "\\'")
added, skipped = [], []

for code, slug, title, _ in rows:
    if re.search(r"^\s*'%s':" % re.escape(code), med, re.M):
        skipped.append(code); continue
    if slug not in by_slug:
        raise SystemExit('no protocol record in tracks.js for slug: ' + slug)
    r = by_slug[slug]
    block = ("  '%s': {\n"
             "    key:     '%s',\n"
             "    eyebrow: '%s',\n"
             "    title:   '%s',\n"
             "    sub:     '%s',\n"
             "    src:     MEDITATION_BASE + '%s-%s.mp3'\n"
             "  }") % (code, code, esc(r['verb']), esc(title), esc(r['sub']), code, slug)
    i = med.rindex('\n};')          # append inside the MEDITATION object
    med = med[:i] + ',\n' + block + med[i:]
    added.append(code)

open('content/meditation.js', 'w', encoding='utf-8').write(med)
print('added:', ' '.join(added) or '(none)', '| already present:', ' '.join(skipped) or '(none)')
PY
```

## 2 · Verify, then turn off the placeholder

`src` is a claim the asset exists. Check every one before committing, and only flip the flag once
all 31 are registered.

```bash
node -e "
var m=require('./content/meditation.js'), fs=require('fs'), bad=0;
var keys=Object.keys(m.MEDITATION);
keys.forEach(function(k){
  var p=m.MEDITATION[k].src;
  if(!fs.existsSync(p)){ console.log('MISSING',p); bad++; }
  else if(fs.statSync(p).size < 1000000){ console.log('SUSPECT small',p); bad++; }
});
if(bad) { console.log('FAIL'); process.exit(1); }
console.log('ok - '+keys.length+' registered, all assets present');
if(keys.length === 31) console.log('all 31 present: safe to set PLACEHOLDER_AUDIO = false');
else console.log('only '+keys.length+' of 31: leave PLACEHOLDER_AUDIO = true');
"

# Only if the check above says all 31 are present:
sed -i '' 's/^var PLACEHOLDER_AUDIO = true;/var PLACEHOLDER_AUDIO = false;/' protocol.html
grep -n 'PLACEHOLDER_AUDIO =' protocol.html
```

**Why this matters.** While `PLACEHOLDER_AUDIO` is `true`, a protocol with no registered master
plays The Clearing instead — silently, with no console error and no broken-player state. A member
opening Belonging Gap would get a different session and nothing would say so. It has to stay `true`
until all 31 are registered, and go `false` the moment they are.

## 3 · Commit

SR-431 (PASS-J.md A1-1, A1-2) · `git push origin main` removed from this section — the
standing rule on this project is commit locally, never push from a pass; Andre pushes from
Terminal when he chooses to. The sample message below also no longer says `SR-393` — that
ID belongs to the t1-01/t3-05 install from August, and two commits already carry it; use
whichever SR ID the pass actually running this document has allocated.

```bash
cd ~/Documents/GitHub/saferise
git add assets/audio/meditation content/meditation.js protocol.html
git status --short
git commit -m "SR-xxx · Register the remaining seven meditations, retire the audio placeholder

Completes the library at 31 of 31. eyebrow and sub are copied from the
protocol records in tracks.js; tracks.js stays the source of truth for
copy. All 31 src paths verified present on disk before commit.

PLACEHOLDER_AUDIO goes false: every protocol now has its own master, so
the Clearing fallback is no longer needed and would mask a missing file.

t1-03 ships the female take only - MEDITATION holds one src per key, and
the male take waits on the member-toggled voice architecture."
```

**Run this from a normal Terminal, not through the Claude device bridge.** Git crashes with a bus
error on this repo over that filesystem — the index does not survive being memory-mapped. If it has
to be done from the bridge, build the commit with plumbing instead:

```bash
rm -f .git/index.lock
git update-index --assume-unchanged .claude/launch.json .well-known/security.txt AGENTS.md CLAUDE.md
git add assets/audio/meditation content/meditation.js protocol.html
rm -f .git/index.lock
TREE=$(git write-tree)
C=$(git commit-tree "$TREE" -p "$(git rev-parse HEAD)" -m "SR-xxx · Register the remaining seven meditations")
git update-ref HEAD "$C"
git update-index --no-assume-unchanged .claude/launch.json .well-known/security.txt AGENTS.md CLAUDE.md
```

Deleting in a connected folder needs permission granted first, or `git add` fails silently — it
exits 0 and stages nothing, because it cannot manage its own lock files. Push still needs a normal
Terminal either way: the bridge shell has its own home directory and cannot see the GitHub
credentials.

## 4 · After this

**True-peak ceiling is −1.0 dBTP — SR-431, 23 September 2026 (PASS-J.md E1).** The spec
said ≤ −1.8; `t1-07`, the library's own reference master, measures −1.1 and already
shipped. A spec its own reference fails is not a spec. −1.0 dBTP is the hard ceiling;
−1.8 dBTP remains the preferred landing zone for new masters. This is also what makes
`t3-06` Belonging Gap (peak −0.4 dBFS, measured 23 Sep) a hold rather than a preference —
it clears neither number, not just the tighter one.

**Four masters are expected to be replaced.** `t1-09` Insecurity and `t2-02` Rupture are built from
takes being re-rendered; `t3-07` Career Transition and `t3-10` Creative Flow are the seam-forced
pacing pending a decision, and both also carry a bed dip at 4:15. Git keeps every version forever,
so each replacement leaves its predecessor in history — the repo is already past 500 MB.

**`t1-03` Overwhelm has no bed for its first eight minutes.** Interim, until song 8 has a partner
bed. It will be rebuilt.

Full review state, including what to listen for in each session and at which timestamp:
`docs/MEDITATION-REVIEW-AND-SIGNOFF.md`.
