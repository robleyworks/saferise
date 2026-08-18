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
import socketserver
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8642


class Server(socketserver.TCPServer):
    allow_reuse_address = True
    daemon_threads = True


def main():
    try:
        with open(os.path.join(ROOT, "dashboard.html"), "rb") as fh:
            fh.read(1)
    except OSError as exc:
        print("cannot read %s: %s" % (ROOT, exc), flush=True)
        return 1
    handler = functools.partial(
        http.server.SimpleHTTPRequestHandler, directory=ROOT)
    with Server(("127.0.0.1", PORT), handler) as httpd:
        print("serving %s at http://127.0.0.1:%d" % (ROOT, PORT), flush=True)
        httpd.serve_forever()
    return 0


if __name__ == "__main__":
    sys.exit(main())
