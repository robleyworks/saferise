#!/usr/bin/env python3
"""
extract_media.py — pull embedded base64 media out of an HTML file into
separate files, and rewrite the HTML to reference them.

USAGE
-----
    cd ~/Documents/GitHub/saferise
    python3 extract_media.py index.html

Creates:
    assets/            folder with each extracted file
    index.slim.html    the rewritten HTML

Your original index.html is never modified.

OPTIONAL — shrink the images afterwards (needs Pillow):
    pip3 install Pillow
    python3 extract_media.py index.html --optimize

--optimize resizes anything wider than 1600px and converts to WebP,
which typically cuts another 80-90% off.
"""

import base64
import os
import re
import sys

DATA_URI = re.compile(
    r'data:([a-zA-Z0-9.+-]+/[a-zA-Z0-9.+-]+)?;base64,([A-Za-z0-9+/=\s]{200,})'
)

EXT = {
    "image/png": ".png", "image/jpeg": ".jpg", "image/jpg": ".jpg",
    "image/gif": ".gif", "image/webp": ".webp", "image/svg+xml": ".svg",
    "image/avif": ".avif", "image/bmp": ".bmp",
    "audio/mpeg": ".mp3", "audio/mp3": ".mp3", "audio/wav": ".wav",
    "audio/ogg": ".ogg", "audio/mp4": ".m4a", "audio/aac": ".aac",
    "video/mp4": ".mp4", "video/webm": ".webm", "video/quicktime": ".mov",
    "font/woff2": ".woff2", "font/woff": ".woff", "font/ttf": ".ttf",
    "application/pdf": ".pdf",
}

MAX_WIDTH = 1600


def human(n):
    for u in ("B", "KB", "MB", "GB"):
        if n < 1024:
            return f"{n:.1f} {u}"
        n /= 1024
    return f"{n:.1f} TB"


def context_hint(text, pos, window=300):
    """Look backwards for an id, class, or alt attribute to name the file after."""
    start = max(0, pos - window)
    chunk = text[start:pos]
    for pattern in (r'alt=["\']([^"\']{3,60})["\']',
                    r'id=["\']([^"\']{3,60})["\']',
                    r'class=["\']([^"\']{3,60})["\']'):
        found = re.findall(pattern, chunk)
        if found:
            slug = re.sub(r'[^a-zA-Z0-9]+', '-', found[-1]).strip('-').lower()
            if slug:
                return slug[:40]
    return None


def optimize(path):
    try:
        from PIL import Image
    except ImportError:
        return None
    ext = os.path.splitext(path)[1].lower()
    if ext not in (".png", ".jpg", ".jpeg", ".bmp"):
        return None
    try:
        img = Image.open(path)
        if img.width > MAX_WIDTH:
            ratio = MAX_WIDTH / img.width
            img = img.resize((MAX_WIDTH, int(img.height * ratio)), Image.LANCZOS)
        if img.mode not in ("RGB", "RGBA"):
            img = img.convert("RGBA")
        out = os.path.splitext(path)[0] + ".webp"
        img.save(out, "WEBP", quality=82, method=6)
        if os.path.getsize(out) < os.path.getsize(path):
            os.remove(path)
            return out
        os.remove(out)
        return None
    except Exception:
        return None


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    path = sys.argv[1]
    do_opt = "--optimize" in sys.argv

    if not os.path.exists(path):
        print(f"File not found: {path}")
        sys.exit(1)

    folder = os.path.dirname(os.path.abspath(path))
    assets = os.path.join(folder, "assets")
    os.makedirs(assets, exist_ok=True)

    before = os.path.getsize(path)
    print(f"\nReading {path}  ({human(before)})\n")

    with open(path, "r", encoding="utf-8", errors="replace") as f:
        text = f.read()

    seen = {}
    counter = [0]
    log = []

    def replace(m):
        mime = m.group(1) or "application/octet-stream"
        payload = re.sub(r"\s+", "", m.group(2))

        if payload in seen:
            return seen[payload]

        try:
            raw = base64.b64decode(payload, validate=False)
        except Exception:
            return m.group(0)

        counter[0] += 1
        hint = context_hint(text, m.start())
        stem = hint if hint else f"media-{counter[0]:02d}"
        ext = EXT.get(mime.lower(), ".bin")

        name = f"{stem}{ext}"
        n = 2
        while os.path.exists(os.path.join(assets, name)):
            name = f"{stem}-{n}{ext}"
            n += 1

        full = os.path.join(assets, name)
        with open(full, "wb") as out:
            out.write(raw)

        size = len(raw)

        if do_opt:
            newpath = optimize(full)
            if newpath:
                name = os.path.basename(newpath)
                size = os.path.getsize(newpath)

        rel = f"assets/{name}"
        seen[payload] = rel
        log.append((rel, mime, size))
        return rel

    rewritten = DATA_URI.sub(replace, text)

    base, ext = os.path.splitext(path)
    outfile = f"{base}.slim{ext}"
    with open(outfile, "w", encoding="utf-8") as f:
        f.write(rewritten)

    after = os.path.getsize(outfile)
    asset_total = sum(s for _, _, s in log)

    print("EXTRACTED")
    print("-" * 60)
    for rel, mime, size in sorted(log, key=lambda r: -r[2]):
        print(f"  {rel:<40} {mime:<16} {human(size):>9}")
    print("-" * 60)
    print(f"  {len(log)} files, {human(asset_total)} total\n")

    print(f"HTML: {human(before)}  ->  {human(after)}")
    print(f"Wrote {outfile}")
    print(f"Assets in {assets}\n")

    if not do_opt:
        print("Next: pip3 install Pillow, then re-run with --optimize")
        print("to resize and convert to WebP. Usually another 80-90% off.\n")

    print("Before replacing index.html: open index.slim.html in a browser")
    print("and confirm every illustration still shows.\n")


if __name__ == "__main__":
    main()
