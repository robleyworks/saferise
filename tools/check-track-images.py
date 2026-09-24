#!/usr/bin/env python3
"""
tools/check-track-images.py

SR-448 (PASS-AF.md §4) · a checker, in the same form as tools/check-sitemap.py.
content/track-images.js is the one place a track's image is declared. This
reads that registry (and its fallback order) out of the file itself rather
than restating either here, then walks every surface that shows a track
image and fails when:

  - a registry path does not exist on disk, or is not its shape's size
    (band 1200x640, panel 2400x1000, portrait 1086x1448 — read from the
    registry's own header comment)
  - a surface asks for a slug the registry does not have, or a slug/shape
    that resolves to nothing
  - a surface still types a track image path of its own instead of asking
    the registry (the one documented exception is allow-listed below)

It never writes anything. Exit code: 0 if everything holds; 1 otherwise.

Standard library only, no dependencies — image sizes are read from the
WebP/JPEG headers directly.
"""
import os
import re
import struct
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REGISTRY = os.path.join(ROOT, "content", "track-images.js")

# Surface -> how it asks. Markup surfaces use data-track-img/data-shape;
# the two script surfaces use their own one-line helpers, whose shape is
# read out of the helper's definition rather than assumed.
SURFACES = {
    "/ (index.html)": ("markup", "index.html"),
    "/plans (js/saferise-plans.js)": ("helper", "js/saferise-plans.js", "planImage"),
    "/organisations (content/f8-tracks.js)": ("helper", "content/f8-tracks.js", "f8Cover"),
    "/coming-soon (coming-soon.html)": ("markup", "coming-soon.html"),
    "member coming-soon (member-coming-soon.html)": ("markup", "member-coming-soon.html"),
}
# Pages that must load the registry before they use it.
LOADERS = {
    "index.html": "index.html",
    "plans.html": "plans.html",
    "organisations.html": "organisations.html",
    "coming-soon.html": "coming-soon.html",
    "member-coming-soon.html": "member-coming-soon.html",
}
# SR-448 · deliberately outside the registry: the 1400x380 journey bands in
# js/saferise-plans.js's TRACK_BAND, a fourth shape the registry does not
# define (reported for a ruling). Exactly these paths, nothing else.
ALLOW_HARDCODED = {
    "js/saferise-plans.js": {
        "assets/journey/t1-band.webp",
        "assets/journey/t2-band.webp",
        "assets/journey/t3-band.webp",
    }
}
TRACK_PATH_RE = re.compile(
    r"assets/(?:coming/band-[a-z0-9-]+|home/panel-t[0-9](?:-v2)?|f8/f[0-9]+(?:-v2)?|journey/t[0-9]-band(?:@2x)?|org/track-t[0-9])\.(?:webp|jpg)"
)


def read(path):
    with open(os.path.join(ROOT, path), "r", encoding="utf-8") as f:
        return f.read()


def strip_comments(src):
    src = re.sub(r"/\*.*?\*/", "", src, flags=re.S)
    src = re.sub(r"<!--.*?-->", "", src, flags=re.S)
    return src


def image_size(path):
    """(width, height) from a WebP or JPEG header, or None."""
    with open(path, "rb") as f:
        data = f.read(65536)
    if data[:4] == b"RIFF" and data[8:12] == b"WEBP":
        chunk = data[12:16]
        if chunk == b"VP8X":
            w = int.from_bytes(data[24:27], "little") + 1
            h = int.from_bytes(data[27:30], "little") + 1
            return w, h
        if chunk == b"VP8 ":
            w, h = struct.unpack("<HH", data[26:30])
            return w & 0x3FFF, h & 0x3FFF
        if chunk == b"VP8L":
            b = data[21:25]
            w = 1 + (((b[1] & 0x3F) << 8) | b[0])
            h = 1 + (((b[3] & 0x0F) << 10) | (b[2] << 2) | ((b[1] & 0xC0) >> 6))
            return w, h
        return None
    if data[:2] == b"\xff\xd8":
        with open(path, "rb") as f:
            f.read(2)
            while True:
                marker = f.read(2)
                if len(marker) < 2 or marker[0] != 0xFF:
                    return None
                if marker[1] in (0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7, 0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF):
                    f.read(3)
                    h, w = struct.unpack(">HH", f.read(4))
                    return w, h
                seglen = struct.unpack(">H", f.read(2))[0]
                f.read(seglen - 2)
    return None


def parse_registry():
    src = read("content/track-images.js")
    sizes = {s: (int(w), int(h)) for s, w, h in re.findall(r"^\s+(band|panel|portrait)\s+(\d+)\s*x\s*(\d+)", src, flags=re.M)}
    if set(sizes) != {"band", "panel", "portrait"}:
        print("FATAL: could not read the three shape sizes from the registry header — refusing to guess them.")
        sys.exit(2)
    body = re.search(r"var\s+TRACK_IMAGES\s*=\s*\{(.*?)\n\};", src, flags=re.S)
    if not body:
        print("FATAL: could not find TRACK_IMAGES in content/track-images.js.")
        sys.exit(2)
    records = {}
    for slug, rec in re.findall(r"'([a-z0-9-]+)':\s*\{(.*?)\n\s*\}", body.group(1), flags=re.S):
        records[slug] = dict(re.findall(r"(\w+):\s*'([^']*)'", rec))
    fb = re.search(r"var\s+TRACK_IMAGE_FALLBACK\s*=\s*\{(.*?)\};", src, flags=re.S)
    if not fb:
        print("FATAL: could not find TRACK_IMAGE_FALLBACK in content/track-images.js.")
        sys.exit(2)
    fallback = {k: re.findall(r"'(\w+)'", v) for k, v in re.findall(r"(\w+):\s*\[([^\]]*)\]", fb.group(1))}
    return records, fallback, sizes


def resolve(records, fallback, slug, shape):
    rec = records.get(slug)
    if not rec or shape not in fallback:
        return None, None
    for s in fallback[shape]:
        if rec.get(s):
            return rec[s], s
    return None, None


def main():
    problems = []
    records, fallback, sizes = parse_registry()

    print("Registry: content/track-images.js — %d tracks" % len(records))
    print("Fallback order read from the file: " + "; ".join("%s -> %s" % (k, " > ".join(v)) for k, v in fallback.items()))
    print()
    print("=== registry paths ===")
    for slug, rec in records.items():
        for key, path in rec.items():
            if key == "name":
                continue
            shape = key[:-3] if key.endswith("Jpg") else key
            full = os.path.join(ROOT, path)
            if not os.path.isfile(full):
                problems.append("missing on disk: %s (%s.%s)" % (path, slug, key))
                print("  MISSING  %-26s %-12s %s" % (slug, key, path))
                continue
            got = image_size(full)
            ok = got == sizes.get(shape)
            if not ok:
                problems.append("wrong size: %s is %s, %s wants %s" % (path, got, shape, sizes.get(shape)))
            print("  %-7s  %-26s %-12s %s %s" % ("ok" if ok else "SIZE", slug, key, path, "%dx%d" % got if got else "?"))
        seen = [p for k, p in rec.items() if k != "name" and not k.endswith("Jpg")]
        if len(seen) != len(set(seen)):
            problems.append("two shapes point at one file in %s" % slug)

    print()
    print("=== registry loaded by each page ===")
    for name, page in LOADERS.items():
        ok = 'src="content/track-images.js"' in read(page)
        if not ok:
            problems.append("%s does not load content/track-images.js" % page)
        print("  %-4s %s" % ("ok" if ok else "NO", page))

    table = {slug: {} for slug in records}
    print()
    print("=== surfaces ===")
    for label, spec in SURFACES.items():
        kind, path = spec[0], spec[1]
        src = read(path)
        live = strip_comments(src)
        asks = []
        if kind == "markup":
            for m in re.finditer(r"<img\b[^>]*>", live):
                tag = m.group(0)
                slug = re.search(r'data-track-img="([^"]+)"', tag)
                if slug:
                    shape = re.search(r'data-shape="([^"]+)"', tag)
                    asks.append((slug.group(1), shape.group(1) if shape else "band"))
            if asks and "applyTrackImages(" not in live:
                problems.append("%s has data-track-img images but never calls applyTrackImages()" % path)
        else:
            helper = spec[2]
            d = re.search(r"function\s+%s\s*\(\s*\w+\s*\)\s*\{[^}]*trackImage\(\s*\w+\s*,\s*'(\w+)'" % helper, live)
            if not d:
                problems.append("%s: cannot find %s() asking trackImage for a shape" % (path, helper))
                continue
            shape = d.group(1)
            for slug in re.findall(r"%s\(\s*['\"]([a-z0-9-]+)['\"]\s*\)" % helper, live):
                asks.append((slug, shape))
        for slug, shape in asks:
            got, used = resolve(records, fallback, slug, shape)
            if slug not in records:
                problems.append("%s asks for unknown track %r" % (path, slug))
                continue
            if not got:
                problems.append("%s: %s has no image for %s in any shape" % (path, slug, shape))
                continue
            table[slug][label] = (got, shape, used)
        for hard in TRACK_PATH_RE.findall(live):
            if hard in ALLOW_HARDCODED.get(path, set()):
                continue
            problems.append("%s types a track image path of its own: %s" % (path, hard))
        print("  %s: %d image(s) asked of the registry" % (label, len(asks)))

    print()
    print("=== what each surface renders, per track ===")
    for slug, row in table.items():
        cells = []
        for label in SURFACES:
            if label in row:
                got, shape, used = row[label]
                note = "" if used == shape else " (%s->%s)" % (shape, used)
                cells.append("%s: %s%s" % (label.split(" ")[0], os.path.basename(got), note))
        print("  %-26s %s" % (slug, " | ".join(cells) if cells else "(not shown anywhere)"))
        by_shape = {}
        for label, (got, shape, used) in row.items():
            by_shape.setdefault(shape, set()).add(got)
        for shape, files in by_shape.items():
            if len(files) > 1:
                problems.append("%s: surfaces asking for %s get different files %s" % (slug, shape, sorted(files)))

    print()
    if problems:
        print("=== problems (%d) ===" % len(problems))
        for p in problems:
            print("  " + p)
        print()
        print("RESULT: track images do NOT all resolve through the registry.")
        sys.exit(1)
    print("RESULT: every track image on every surface resolves through content/track-images.js, and every registry path is on disk at its shape's size.")
    sys.exit(0)


if __name__ == "__main__":
    main()
