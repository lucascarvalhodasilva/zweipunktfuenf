import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '../public/previews');

const sites = [
  { name: 'florianuebel',   url: 'https://florianuebel.de' },
  { name: 'michaelgarbas',  url: 'https://michaelgarbas.de' },
];

const browser = await chromium.launch();

for (const { name, url } of sites) {
  const ctx = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 });
  const path = join(outDir, `${name}.jpg`);
  await page.screenshot({ path, type: 'jpeg', quality: 90, fullPage: false });
  console.log(`✓ ${name}.jpg`);
  await ctx.close();
}

await browser.close();
