#!/usr/bin/env python3
"""Regenerate sitemap.xml — Python equivalent of scripts/gen-sitemap.js.

SR-432 (PASS-H.md Part D). scripts/gen-sitemap.js needs node, which this
environment does not have (same constraint tools/check-sitemap.py was
written for). This is not a permanent replacement for that script — it
exists to produce this one regeneration where node is unavailable, and
follows the same rules: derive lastmod from each file's real mtime
(never today's date as a blanket stamp), same priority tiers, and list
destinations only, not files that 301 or that a live route no longer
serves.

Three corrections against gen-sitemap.js's own EXCLUDE regex, applied
here and reported rather than silently carried over:

  1. gen-sitemap.js's EXCLUDE only exact-matches "for-organisations",
     not "pricing" — but /pricing also 301s (to /plans, _redirects
     SR-386). Excluded here too, for the same reason.
  2. protocol.html itself (the bare /protocol URL) was in the OLD
     sitemap.xml. It is a template shell, not a destination: with no
     ?slug= or ?track=&protocol=, PAGE_PROTOCOL.resolved is false and
     no canonical is ever set. The 30 /protocols/{slug} entries below
     are the real destinations; the shell is removed.
  3. resource.html was ALSO in the old sitemap.xml despite carrying
     noindex — a direct contradiction of this pass's own §Verify
     ("every URL in the sitemap ... is not noindex"). Removed.

Two pages exist on disk, are not noindexed, and are not excluded by any
rule below, but are deliberately left out: galaxy-journey.html and
galaxy-journey-v3.html. Grepped every .html/.js/.css file in the repo
for "galaxy-journey" and found zero references anywhere, and no
_redirects entry — nothing on the live site links to either. Adding an
unlinked page to a sitemap asks Google to index content nobody visiting
the site can ever navigate to, which is a different problem than the
one this pass exists to fix. Reported, not added.

/organisations added per explicit instruction (missing since PASS F;
tools/check-sitemap.py first found the gap).
"""
import os

ORIGIN = 'https://thesaferiseprotocol.com'

# Real pages this pass confirms indexable, in the same shape gen-sitemap.js
# would produce for physical top-level files.
PAGES = [
    'about', 'accessibility', 'anxiety-reset', 'coming-soon', 'getting-help',
    'index', 'live-sessions', 'method', 'organisations',
    'personal-transformation', 'plans', 'privacy', 'professional-performance',
    'refunds', 'relationship-healing', 'terms',
]

HIGH_PRIORITY = {'personal-transformation', 'relationship-healing',
                  'professional-performance', 'method'}

# The 30 protocol slugs, extracted from content/tracks.js using the
# corrected row[length-2] index (PAGE_PROTOCOL bug fixed earlier in this
# same pass) — this list is provably identical to what the live
# TRACKS[1..3].protocols objects resolve, checked in-browser before
# writing this file, not assumed from the regex alone.
PROTOCOL_SLUGS = [
    'anxiety-reset', 'anger-alchemy', 'overwhelm-threshold', 'abandonment-wound',
    'shame-dissolution', 'grief-integration', 'shutdown-recovery', 'jealousy-release',
    'insecurity-anchor', 'powerlessness-despair', 'safe-conversation', 'rupture-repair',
    'trust-betrayal', 'resentment-release', 'intimacy-barrier', 'double-standard',
    'projection-clarity', 'appreciation-support', 'pursue-withdraw', 'conscious-separation',
    'high-stakes-presence', 'conflict-navigation', 'imposter-dissolution',
    'perfectionism-release', 'performance-anxiety', 'belonging-gap', 'career-transition',
    'decision-fatigue', 'burnout-overload', 'creative-flow',
]


def mtime(path):
    return __import__('datetime').datetime.utcfromtimestamp(
        os.path.getmtime(path)).strftime('%Y-%m-%d')


def main():
    entries = []
    for p in PAGES:
        loc = ORIGIN + '/' if p == 'index' else f'{ORIGIN}/{p}'
        lm = mtime(f'{p}.html')
        pri = '1.0' if p == 'index' else ('0.9' if p in HIGH_PRIORITY else '0.6')
        entries.append((loc, lm, pri))

    protocol_lm = mtime('protocol.html')
    for slug in PROTOCOL_SLUGS:
        entries.append((f'{ORIGIN}/protocols/{slug}', protocol_lm, '0.8'))

    urls = '\n'.join(
        f'  <url>\n    <loc>{loc}</loc>\n    <lastmod>{lm}</lastmod>\n    <priority>{pri}</priority>\n  </url>'
        for loc, lm, pri in entries
    )
    out = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f'{urls}\n'
        '</urlset>\n'
    )
    with open('sitemap.xml', 'w', encoding='utf-8') as f:
        f.write(out)
    print(f'sitemap.xml written — {len(entries)} URLs')


if __name__ == '__main__':
    main()
