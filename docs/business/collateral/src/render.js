const { chromium } = require('playwright');
const f = process.argv[2], out = process.argv[3], png = process.argv[4];
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto('file:///SRC/' + f, { waitUntil: 'networkidle' });
  await p.pdf({ path: out, format: 'A4', printBackground: true });
  await p.setViewportSize({ width: 794, height: 1123 });
  await p.screenshot({ path: png, fullPage: true });
  await b.close();
})();
