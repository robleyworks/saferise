from playwright.sync_api import sync_playwright
import pathlib, sys

JS = r"""
(sel) => {
  const el = document.querySelector(sel);
  if (!el) return null;
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const words = [];
  let n;
  while ((n = walker.nextNode())) {
    const t = n.textContent;
    const re = /\S+/g; let m;
    while ((m = re.exec(t))) {
      const r = document.createRange();
      r.setStart(n, m.index); r.setEnd(n, m.index + m[0].length);
      const rect = r.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) continue;
      words.push({w: m[0], top: Math.round(rect.top)});
    }
  }
  if (!words.length) return null;
  const lines = [];
  let cur = null;
  for (const wd of words) {
    if (!cur || Math.abs(wd.top - cur.top) > 4) { cur = {top: wd.top, words: []}; lines.push(cur); }
    cur.words.push(wd.w);
  }
  return lines.map(l => l.words);
}
"""

SELS = ["h1", ".filmdesc",
        ".postfilm-copy h2", ".postfilm-copy p:nth-of-type(1)", ".postfilm-pull p", ".postfilm-copy p:nth-of-type(2)",
        ".router-question", ".routernote", ".sr-router-body", ".sr-router-lead",
        ".door.t1 .dbody", ".door.t2 .dbody", ".door.t3 .dbody", ".scope"]

url = "file://" + str(pathlib.Path(sys.argv[1]).resolve())
for width, dsf in ((1440,1),(390,1)):
    print(f"\n=== {width}px ===")
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={"width":width,"height":900}, device_scale_factor=dsf)
        pg.goto(url); pg.wait_for_timeout(900)
        for s in SELS:
            lines = pg.evaluate(JS, s)
            if not lines: print(f"  {s:36} (absent)"); continue
            bad = [i for i,l in enumerate(lines) if len(l)==1]
            flag = f"  <-- SHORT LINE(S) {bad}" if bad else ""
            print(f"  {s:36} {len(lines)} lines{flag}")
            for l in lines: print(f"      | {' '.join(l)}")
        b.close()
