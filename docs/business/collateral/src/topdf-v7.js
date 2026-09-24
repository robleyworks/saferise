const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto('file:///home/claude/outreach/onepager.v7.html', { waitUntil: 'networkidle' });
  await p.pdf({ path: '/mnt/user-data/outputs/SafeRise-Protocol-One-Page.pdf',
                format: 'A4', printBackground: true });
  await p.setViewportSize({ width: 794, height: 1123 });
  await p.screenshot({ path: '/home/claude/outreach/onepager.v7.png', fullPage: true });
  await b.close();
})();
