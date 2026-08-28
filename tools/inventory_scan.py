#!/usr/bin/env python3
"""Read-only inventory scan of two file trees. Writes two CSVs to ~/Desktop/.

Does not move, rename, copy, or delete anything in either tree.
"""
import csv
import hashlib
import os
import subprocess
import sys
from pathlib import Path

HOME = Path.home()
DESKTOP = HOME / "Desktop"

TREES = [
    ("INVENTORY", DESKTOP / "SafeRise to Inventory"),
    ("REPO", HOME / "Documents/GitHub/saferise"),
]

SKIP_DIRS = {".git", "node_modules", ".netlify"}
SKIP_FILENAMES = {".DS_Store"}

MANIFEST_CSV = DESKTOP / "saferise-file-manifest.csv"
DUPLICATES_CSV = DESKTOP / "saferise-duplicates.csv"

CHUNK = 1024 * 1024  # 1MB

IMAGE_MAGIC_EXTS = {
    "png": "png", "jpeg": "jpg", "gif": "gif", "webp": "webp",
    "bmp": "bmp", "tiff": "tiff", "ico": "ico",
}


def sha256_of(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        while True:
            chunk = f.read(CHUNK)
            if not chunk:
                break
            h.update(chunk)
    return h.hexdigest()


def detect_format_pillow(path):
    from PIL import Image
    try:
        with Image.open(path) as im:
            fmt = (im.format or "").lower()
            w, h = im.size
            return fmt, w, h
    except Exception:
        return None, None, None


# Binary magic signatures, checked against the file's leading bytes.
# Order matters: more specific signatures first (e.g. a zip signature is
# checked, then narrowed to a specific OOXML kind by peeking inside it).
BINARY_SIGNATURES = [
    (b"\x89PNG\r\n\x1a\n", "png"),
    (b"\xff\xd8\xff", "jpg"),
    (b"GIF87a", "gif"),
    (b"GIF89a", "gif"),
    (b"BM", "bmp"),
    (b"II*\x00", "tiff"),
    (b"MM\x00*", "tiff"),
    (b"%PDF", "pdf"),
    (b"wOFF", "woff"),
    (b"wOF2", "woff2"),
    (b"OTTO", "otf"),
    (b"\x00\x01\x00\x00\x00", "ttf"),
    (b"\xd0\xcf\x11\xe0\xa1\xb1\x1a\xe1", "ole"),  # legacy .doc/.xls/.ppt
    (b"ID3", "mp3"),
    (b"\xff\xfb", "mp3"),
    (b"\xff\xf3", "mp3"),
    (b"\xff\xf2", "mp3"),
    (b"fLaC", "flac"),
    (b"OggS", "ogg"),
]

# RIFF-container formats: bytes 0-3 == RIFF, format tag at bytes 8-11.
RIFF_TAGS = {b"WEBP": "webp", b"WAVE": "wav", b"AVI ": "avi"}

# ftyp-box container formats (MP4/MOV/M4A family): bytes 4-7 == 'ftyp',
# the brand at bytes 8-11 distinguishes the specific kind.
FTYP_BRANDS = {
    b"M4A ": "m4a", b"M4A\x20": "m4a", b"mp42": "mp4", b"isom": "mp4",
    b"qt  ": "mov", b"M4V ": "m4v",
}

ZIP_EXTS = {"docx", "xlsx", "pptx", "pages", "numbers", "key", "zip", "epub"}

# Extensions whose legitimate content is plain UTF-8/ASCII text.
TEXT_EXTS = {
    "md", "txt", "csv", "json", "yaml", "yml", "html", "htm", "xml", "css",
    "js", "mjs", "py", "sh", "log", "gitignore", "gitattributes", "svg",
    "cfg", "ini", "toml", "csv", "map",
}


def sniff_zip_kind(path):
    """A zip signature was found — try to name the specific OOXML/iWork kind
    by peeking at its central directory names, without loading it fully."""
    try:
        import zipfile
        with zipfile.ZipFile(path) as z:
            names = z.namelist()
            if "word/document.xml" in names:
                return "docx"
            if any(n.startswith("xl/") for n in names):
                return "xlsx"
            if any(n.startswith("ppt/") for n in names):
                return "pptx"
            if any(n.startswith("index.xml") or n == "index.xml" for n in names):
                return "pages"
            if "[Content_Types].xml" in names:
                return "zip"  # OOXML family but unidentified kind
            return "zip"
    except Exception:
        return "zip"


def looks_like_text(head_bytes):
    """Cheap binary-vs-text heuristic: no NUL bytes, decodes as UTF-8."""
    if b"\x00" in head_bytes:
        return False
    try:
        head_bytes.decode("utf-8")
        return True
    except UnicodeDecodeError:
        return False


def detect_format_file_cmd(path):
    """Last-resort fallback: `file`'s human-readable (non-MIME) description,
    for the rare binary format none of the checks above recognise."""
    try:
        out = subprocess.run(
            ["file", "--brief", str(path)],
            capture_output=True, text=True, timeout=10
        ).stdout.strip()
        return out if out else None
    except Exception:
        return None


def get_real_format(path, ext):
    """Return (real_format, width, height). Magic bytes first, always —
    the extension is only ever used afterwards, to decide match/mismatch."""
    try:
        with open(path, "rb") as f:
            head = f.read(4096)
    except OSError:
        return "unreadable", None, None

    if len(head) == 0:
        return "empty", None, None

    # Images: Pillow gives both format and dimensions in one pass.
    fmt, w, h = detect_format_pillow(path)
    if fmt:
        norm = IMAGE_MAGIC_EXTS.get(fmt, fmt)
        return norm, w, h

    for sig, name in BINARY_SIGNATURES:
        if head.startswith(sig):
            return name, None, None

    if head[:4] == b"RIFF" and len(head) >= 12:
        tag = bytes(head[8:12])
        if tag in RIFF_TAGS:
            return RIFF_TAGS[tag], None, None
        return "riff", None, None

    if len(head) >= 12 and head[4:8] == b"ftyp":
        brand = bytes(head[8:12])
        return FTYP_BRANDS.get(brand, "mp4-family"), None, None

    if head[:4] in (b"PK\x03\x04", b"PK\x05\x06", b"PK\x07\x08"):
        return sniff_zip_kind(path), None, None

    if looks_like_text(head):
        stripped = head.lstrip()
        low = stripped[:200].lower()
        if low.startswith(b"<!doctype html") or low.startswith(b"<html"):
            return "html", None, None
        if low.startswith(b"<?xml"):
            if b"<svg" in head[:400].lower():
                return "svg", None, None
            return "xml", None, None
        if low.startswith(b"<svg"):
            return "svg", None, None
        return "text", None, None

    # Unrecognised binary — ask `file` for a human label rather than "unknown".
    label = detect_format_file_cmd(path)
    return (label or "unknown"), None, None


def norm_ext(filename):
    ext = Path(filename).suffix.lower().lstrip(".")
    return ext


def iter_files(root):
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for fn in filenames:
            if fn in SKIP_FILENAMES or fn.startswith("._"):
                continue
            yield Path(dirpath) / fn


def fmt_matches_ext(ext, real_format):
    if not ext:
        # No extension at all (Makefile, LICENSE, .gitignore-as-stem) —
        # nothing to compare against; still fine as long as it's real text
        # or a recognised binary, just report it as such rather than "false".
        return real_format not in ("unknown", "unreadable")

    ext_l = ext.lower()
    rf = (real_format or "").lower()
    if ext_l == rf:
        return True

    # Zip-based document/archive containers: any of these extensions is a
    # legitimate name for a zip file, and sniff_zip_kind() only narrows the
    # label further when it recognises the internals — a generic "zip"
    # result is still a correctly-named container, not a mismatch.
    if ext_l in ZIP_EXTS and rf in ({"zip"} | ZIP_EXTS):
        return True

    # Plain-text source/data extensions: the meaningful check is "is this
    # actually text", not which text sub-flavour a content sniff guessed
    # (a .md with an inline <html> snippet, a .css file, a .py script — all
    # correctly detected as "text"/"html"/"xml"/"svg" by the sniffer above,
    # none of it a real extension-vs-format defect).
    if ext_l in TEXT_EXTS and rf in ({"text", "html", "xml", "svg"} | TEXT_EXTS):
        return True

    aliases = {
        "jpg": {"jpeg", "jpg"},
        "jpeg": {"jpeg", "jpg"},
        "tif": {"tiff", "tif"},
        "tiff": {"tiff", "tif"},
        "htm": {"html", "htm"},
        "html": {"html", "htm"},
        "m4a": {"m4a", "mp4-family"},
        "mp4": {"mp4", "mp4-family"},
        "mov": {"mov", "mp4-family"},
        "doc": {"ole"},
        "xls": {"ole"},
        "ppt": {"ole"},
    }
    if ext_l in aliases and rf in aliases[ext_l]:
        return True
    return False


def main():
    manifest_rows = []
    sha_index = {}  # sha256 -> list of (tree, relpath, bytes)
    totals = {}  # tree -> [count, bytes]

    for label, root in TREES:
        if not root.exists():
            print(f"WARNING: tree '{label}' not found at {root}", file=sys.stderr)
            continue
        totals.setdefault(label, [0, 0])
        for path in iter_files(root):
            try:
                st = path.stat()
            except OSError as e:
                print(f"WARNING: could not stat {path}: {e}", file=sys.stderr)
                continue

            size = st.st_size
            mtime_iso = __import__("datetime").datetime.fromtimestamp(
                st.st_mtime, tz=__import__("datetime").timezone.utc
            ).isoformat()

            try:
                digest = sha256_of(path)
            except OSError as e:
                print(f"WARNING: could not read {path}: {e}", file=sys.stderr)
                continue

            ext = norm_ext(path.name)
            real_format, width, height = get_real_format(path, ext)

            ratio = ""
            if width and height:
                ratio = f"{width / height:.6f}"

            matches = fmt_matches_ext(ext, real_format)

            relpath = str(path.relative_to(root))

            row = {
                "tree": label,
                "relpath": relpath,
                "filename": path.name,
                "ext": ext,
                "bytes": size,
                "modified_iso": mtime_iso,
                "sha256": digest,
                "real_format": real_format,
                "width": width if width else "",
                "height": height if height else "",
                "ratio": ratio,
                "ext_matches_format": "true" if matches else "false",
            }
            manifest_rows.append(row)

            totals[label][0] += 1
            totals[label][1] += size

            sha_index.setdefault(digest, []).append((label, relpath, size))

    # write manifest CSV
    fieldnames = ["tree", "relpath", "filename", "ext", "bytes", "modified_iso",
                  "sha256", "real_format", "width", "height", "ratio",
                  "ext_matches_format"]
    with open(MANIFEST_CSV, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        for row in manifest_rows:
            w.writerow(row)

    # write duplicates CSV
    dup_groups = {h: occ for h, occ in sha_index.items() if len(occ) > 1}
    with open(DUPLICATES_CSV, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["sha256", "tree", "relpath", "bytes"])
        for h, occ in dup_groups.items():
            for (label, relpath, size) in occ:
                w.writerow([h, label, relpath, size])

    # ---- summary ----
    print("=== Totals per tree ===")
    for label, (count, total_bytes) in totals.items():
        print(f"  {label}: {count} files, {total_bytes:,} bytes ({total_bytes/1024/1024:.1f} MB)")

    mismatches = [r for r in manifest_rows if r["ext_matches_format"] == "false"]
    print(f"\n=== ext/format mismatches: {len(mismatches)} ===")
    for r in mismatches[:50]:
        print(f"  [{r['tree']}] {r['relpath']}  ext={r['ext']!r} real_format={r['real_format']!r}")
    if len(mismatches) > 50:
        print(f"  ... and {len(mismatches) - 50} more (see CSV)")

    recoverable = 0
    for h, occ in dup_groups.items():
        # bytes recoverable = size * (count - 1), using the first occurrence's size
        size = occ[0][2]
        recoverable += size * (len(occ) - 1)
    print(f"\n=== duplicate hash groups: {len(dup_groups)} ===")
    print(f"  bytes recoverable if de-duplicated: {recoverable:,} bytes ({recoverable/1024/1024:.1f} MB)")

    print("\n=== 20 largest files ===")
    largest = sorted(manifest_rows, key=lambda r: r["bytes"], reverse=True)[:20]
    for r in largest:
        print(f"  {r['bytes']:>12,}  [{r['tree']}] {r['relpath']}")

    print(f"\nWrote: {MANIFEST_CSV}")
    print(f"Wrote: {DUPLICATES_CSV}")


if __name__ == "__main__":
    main()
