#!/usr/bin/env python3
"""
tools/check-sitemap.py

PASS-org-pricing-tracks.md §6 · a checker, not a second generator. Reads the
same exclusion rule scripts/gen-sitemap.js uses (parsed out of that file, not
restated from memory) and the same page-listing/priority logic, computes what
the sitemap SHOULD contain, and compares it against the committed sitemap.xml.

This script never writes sitemap.xml. Generation stays with the node script,
which Andre runs locally where node exists. This exists so an environment
without node (this one) can still tell whether the committed file is correct.

Exit code: 0 if the committed sitemap matches exactly; 1 if anything expected
is missing or anything present is unexpected.

Standard library only, no dependencies.
"""
import os
import re
import sys
import xml.etree.ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GEN_SCRIPT = os.path.join(ROOT, "scripts", "gen-sitemap.js")
SITEMAP = os.path.join(ROOT, "sitemap.xml")
ORIGIN = "https://thesaferiseprotocol.com"


def read_exclude_regex_from_generator(gen_script_path):
    """Extract the EXCLUDE regex literal from gen-sitemap.js verbatim,
    rather than restating the exclusion rule from memory here."""
    with open(gen_script_path, "r", encoding="utf-8") as f:
        src = f.read()
    m = re.search(r"const\s+EXCLUDE\s*=\s*/(.+?)/;", src)
    if not m:
        print("FATAL: could not find EXCLUDE regex in %s — refusing to guess it." % gen_script_path)
        sys.exit(2)
    js_pattern = m.group(1)
    # JS and Python regex syntax agree closely enough for this pattern
    # (anchors, alternation, character escapes) that no translation is
    # needed beyond compiling it directly.
    return re.compile(js_pattern)


def read_priority_regex_from_generator(gen_script_path):
    """Extract the 0.9-priority filename regex the same way, for
    informational purposes only (priority isn't part of this checker's
    missing/unexpected comparison, but staying honest about what the
    generator does)."""
    with open(gen_script_path, "r", encoding="utf-8") as f:
        src = f.read()
    m = re.search(r"\? '0\.9' : /\^\((.+?)\)\$/", src)
    return m.group(1) if m else None


def expected_pages(exclude_re):
    """Mirror fs.readdirSync('.').filter(...).map(...).filter(...) —
    non-recursive, repo-root .html files only, extension stripped,
    exclusion regex applied."""
    names = []
    for entry in sorted(os.listdir(ROOT)):
        if not entry.endswith(".html"):
            continue
        if not os.path.isfile(os.path.join(ROOT, entry)):
            continue
        stem = entry[: -len(".html")]
        if exclude_re.search(stem):
            continue
        names.append(stem)
    return names


def expected_locs(pages):
    locs = set()
    for p in pages:
        loc = ORIGIN + "/" if p == "index" else "%s/%s" % (ORIGIN, p)
        locs.add(loc)
    return locs


def committed_locs(sitemap_path):
    if not os.path.exists(sitemap_path):
        print("FATAL: %s does not exist." % sitemap_path)
        sys.exit(2)
    tree = ET.parse(sitemap_path)
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    root = tree.getroot()
    locs = []
    for url_el in root.findall("sm:url", ns):
        loc_el = url_el.find("sm:loc", ns)
        if loc_el is not None and loc_el.text:
            locs.append(loc_el.text.strip())
    return locs


def main():
    exclude_re = read_exclude_regex_from_generator(GEN_SCRIPT)
    priority_names = read_priority_regex_from_generator(GEN_SCRIPT)

    pages = expected_pages(exclude_re)
    expected = expected_locs(pages)

    committed_list = committed_locs(SITEMAP)
    committed = set(committed_list)

    dupes = [loc for loc in committed_list if committed_list.count(loc) > 1]
    missing = sorted(expected - committed)
    unexpected = sorted(committed - expected)
    matching = sorted(expected & committed)

    print("EXCLUDE regex read from gen-sitemap.js: /%s/" % exclude_re.pattern)
    if priority_names:
        print("0.9-priority filenames read from gen-sitemap.js: %s" % priority_names)
    print()
    print("Expected pages (repo-root .html, exclusion applied): %d" % len(pages))
    print("Committed sitemap.xml <url> entries: %d" % len(committed_list))
    if dupes:
        print("DUPLICATE <loc> entries in sitemap.xml: %s" % sorted(set(dupes)))
    print()

    print("=== expected but missing from sitemap.xml (%d) ===" % len(missing))
    for loc in missing:
        print("  %s" % loc)
    print()

    print("=== present in sitemap.xml but not expected (%d) ===" % len(unexpected))
    for loc in unexpected:
        print("  %s" % loc)
    print()

    print("=== matching (%d) ===" % len(matching))
    for loc in matching:
        print("  %s" % loc)
    print()

    if missing or unexpected:
        print("RESULT: sitemap.xml does NOT match the generator's own rules. Not regenerated — reported only.")
        sys.exit(1)
    else:
        print("RESULT: sitemap.xml matches exactly.")
        sys.exit(0)


if __name__ == "__main__":
    main()
