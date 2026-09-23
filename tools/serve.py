#!/usr/bin/env python3
"""Static file server for local preview of the SafeRise pages.

Why this exists rather than `python3 -m http.server`:
that module evaluates `os.getcwd()` as an argparse default at import time,
which raises PermissionError under the sandbox the preview runner uses, so it
dies before it can parse arguments. Deriving the root from __file__ and
passing it to the handler explicitly avoids calling getcwd() at all.

Usage: python3 tools/serve.py [port]
"""
import functools
import http.server
import os
import re
import socketserver
import sys
from http import HTTPStatus

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8642


class Server(socketserver.TCPServer):
    allow_reuse_address = True
    daemon_threads = True


class _RangedReader:
    """Wraps an open file so copyfileobj() only yields [start, start+length)."""

    def __init__(self, f, start, length):
        self.f = f
        self.remaining = length
        f.seek(start)

    def read(self, size=-1):
        if self.remaining <= 0:
            return b""
        if size is None or size < 0 or size > self.remaining:
            size = self.remaining
        data = self.f.read(size)
        self.remaining -= len(data)
        return data

    def close(self):
        self.f.close()


_RANGE_RE = re.compile(r"^bytes=(\d*)-(\d*)$")


class RangeRequestHandler(http.server.SimpleHTTPRequestHandler):
    """SR-431 (PASS-J.md Part B) · SimpleHTTPRequestHandler answers every
    request 200 with the whole body, so audio.seekable is always empty and
    seek/resume/partial-load can't be verified locally. Dev-server only —
    nothing in js/, css/ or any page changes because of this.
    """

    def _parse_range(self, header, file_size):
        if "," in header:
            return None  # multi-range not supported -> caller falls back to 200
        m = _RANGE_RE.match(header.strip())
        if not m:
            return None
        start_s, end_s = m.groups()
        if start_s == "" and end_s == "":
            return None
        if start_s == "":
            length = int(end_s)
            if length <= 0:
                return "unsatisfiable"
            start = max(file_size - length, 0)
            end = file_size - 1
        else:
            start = int(start_s)
            if start >= file_size:
                return "unsatisfiable"
            end = int(end_s) if end_s != "" else file_size - 1
            end = min(end, file_size - 1)
        if end < start:
            return "unsatisfiable"
        return (start, end)

    def send_head(self):
        path = self.translate_path(self.path)
        if not os.path.isfile(path):
            return super().send_head()  # directories, 404s: unchanged behaviour

        try:
            fs = os.stat(path)
        except OSError:
            self.send_error(HTTPStatus.NOT_FOUND, "File not found")
            return None
        file_size = fs.st_size
        ctype = self.guess_type(path)

        range_header = self.headers.get("Range")
        if range_header:
            rng = self._parse_range(range_header, file_size)
            if rng == "unsatisfiable":
                self.send_response(HTTPStatus.REQUESTED_RANGE_NOT_SATISFIABLE)
                self.send_header("Content-Range", "bytes */%d" % file_size)
                self.send_header("Content-Length", "0")
                self.end_headers()
                return None
            if rng is not None:
                start, end = rng
                try:
                    f = open(path, "rb")
                except OSError:
                    self.send_error(HTTPStatus.NOT_FOUND, "File not found")
                    return None
                length = end - start + 1
                self.send_response(HTTPStatus.PARTIAL_CONTENT)
                self.send_header("Content-type", ctype)
                self.send_header(
                    "Content-Range", "bytes %d-%d/%d" % (start, end, file_size))
                self.send_header("Content-Length", str(length))
                self.send_header("Accept-Ranges", "bytes")
                self.send_header(
                    "Last-Modified", self.date_time_string(fs.st_mtime))
                self.end_headers()
                return _RangedReader(f, start, length)
            # malformed or multi-range: fall through to a full 200 response

        try:
            f = open(path, "rb")
        except OSError:
            self.send_error(HTTPStatus.NOT_FOUND, "File not found")
            return None
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-type", ctype)
        self.send_header("Content-Length", str(file_size))
        self.send_header("Accept-Ranges", "bytes")
        self.send_header("Last-Modified", self.date_time_string(fs.st_mtime))
        self.end_headers()
        return f


def main():
    try:
        with open(os.path.join(ROOT, "dashboard.html"), "rb") as fh:
            fh.read(1)
    except OSError as exc:
        print("cannot read %s: %s" % (ROOT, exc), flush=True)
        return 1
    handler = functools.partial(
        RangeRequestHandler, directory=ROOT)
    with Server(("127.0.0.1", PORT), handler) as httpd:
        print("serving %s at http://127.0.0.1:%d" % (ROOT, PORT), flush=True)
        httpd.serve_forever()
    return 0


if __name__ == "__main__":
    sys.exit(main())
