#!/usr/bin/env python3
"""
tools/check-hand-to-heart.py

PASS-hand-to-heart.md · standardise the "hand to heart" gesture: cues and bold
labels use "heart", prose mentions use "chest", and "sternum" survives only in
genuine mechanism copy that explains why the placement works, not merely where
it is. The audit behind this pass (content/t1/t2/t3-resources.js, index.html,
anxiety-reset.html, docs/) found no passage that qualifies as mechanism copy,
so ALLOWLIST below is empty — every occurrence of "sternum" currently fails.

If a future resource genuinely needs to keep "sternum" for a mechanism
explanation, add its resource id and a one-line justification to ALLOWLIST
rather than deleting this check.

Checks content/t1-resources.js, content/t2-resources.js and
content/t3-resources.js only — the live resource store resolved by
js/saferise-resources.js's resolveSet(). index.html carries its own,
mostly-dead RESOURCE_CONTENT/SOMATIC_DATA copy (see SR-399's fix-register
entry) and is out of scope for this check.

Exit code: 0 if no disallowed "sternum" occurrence is found; 1 otherwise.

Standard library only, no dependencies. Run by hand — not wired into any
automated path yet (see the fix-register entry for this pass for why).
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

CONTENT_FILES = [
    os.path.join(ROOT, "content", "t1-resources.js"),
    os.path.join(ROOT, "content", "t2-resources.js"),
    os.path.join(ROOT, "content", "t3-resources.js"),
]

# Resource ids explicitly cleared to keep "sternum" because the passage is
# genuine mechanism copy — explains *why* the placement works, not just
# where. Empty until a real one is found and justified here.
ALLOWLIST = {
    # "t1p_-guide": "one-line reason the anatomical term is the point here",
}

STERNUM_RE = re.compile(r"sternum", re.IGNORECASE)
KEY_RE = re.compile(r'"(t[123]p\d+-[a-z]+)":\s*\{')


def owning_key(text, pos, keys):
    """Return the resource id whose block contains `pos`, using each key's
    own start offset as a boundary rather than a fixed character window."""
    owner = None
    for start, key in keys:
        if start <= pos:
            owner = key
        else:
            break
    return owner


def check_file(path):
    findings = []
    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        text = f.read()
    keys = [(m.start(), m.group(1)) for m in KEY_RE.finditer(text)]
    for m in STERNUM_RE.finditer(text):
        key = owning_key(text, m.start(), keys)
        if key in ALLOWLIST:
            continue
        line_no = text.count("\n", 0, m.start()) + 1
        s = max(0, m.start() - 50)
        e = min(len(text), m.end() + 50)
        snippet = text[s:e].replace("\n", " ")
        findings.append((os.path.relpath(path, ROOT), line_no, key, snippet))
    return findings


def main():
    all_findings = []
    for path in CONTENT_FILES:
        if not os.path.exists(path):
            print("FATAL: %s does not exist." % path)
            sys.exit(2)
        all_findings.extend(check_file(path))

    print("Allowlisted resource ids: %s" % (sorted(ALLOWLIST) or "(none)"))
    print()
    print("=== disallowed \"sternum\" occurrences (%d) ===" % len(all_findings))
    for relpath, line_no, key, snippet in all_findings:
        print("  %s:%d [%s]" % (relpath, line_no, key or "?"))
        print("      | %s" % snippet)
    print()

    if all_findings:
        print("RESULT: FAIL — \"sternum\" found outside the allowlist.")
        sys.exit(1)
    else:
        print("RESULT: PASS — no disallowed \"sternum\" occurrence.")
        sys.exit(0)


if __name__ == "__main__":
    main()
