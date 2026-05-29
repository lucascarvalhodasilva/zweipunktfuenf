/**
 * Generates the static OG image (public/og-image.png) from an SVG template.
 * Run once with: npm run generate-og
 */
import sharp from 'sharp'
import { writeFileSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outPath = join(__dirname, '../public/og-image.png')

// Embed DM Sans WOFF2 fonts so librsvg can render correct weights
const fontsDir = join(__dirname, '../node_modules/@fontsource/dm-sans/files')
const font700 = readFileSync(join(fontsDir, 'dm-sans-latin-700-normal.woff2')).toString('base64')
const font800 = readFileSync(join(fontsDir, 'dm-sans-latin-800-normal.woff2')).toString('base64')

const W = 1200
const H = 630
const GRID = 44

// Build grid lines (vertical + horizontal)
let grid = ''
for (let x = GRID; x < W; x += GRID) {
  grid += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="rgba(91,141,238,0.12)" stroke-width="1"/>`
}
for (let y = GRID; y < H; y += GRID) {
  grid += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="rgba(91,141,238,0.12)" stroke-width="1"/>`
}

// Layout constants (mirroring the flex layout: padding 72/80, space-between)
const PAD_X = 80
const PAD_TOP = 72
const PAD_BOT = 72

const LOGO_Y = PAD_TOP + 20   // baseline for 18px logo text
const HL1_Y  = 305             // baseline for headline line 1 (96px)
const HL2_Y  = 410             // baseline for headline line 2 (96px × 1.1 gap)
const SUB_Y  = H - PAD_BOT    // baseline for bottom subline

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">

  <style>
    @font-face {
      font-family: 'DM Sans';
      font-weight: 700;
      src: url('data:font/woff2;base64,${font700}') format('woff2');
    }
    @font-face {
      font-family: 'DM Sans';
      font-weight: 800;
      src: url('data:font/woff2;base64,${font800}') format('woff2');
    }
  </style>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="#07111F"/>

  <!-- Grid -->
  ${grid}

  <!-- Logo: zweipunktfünf (matches Navbar split-color) -->
  <text x="${PAD_X}" y="${LOGO_Y}"
        font-family="monospace" font-size="22" font-weight="700"
        letter-spacing="2.2">
    <tspan fill="#e1e2ea">zweipunkt</tspan><tspan fill="#5B8DEE">fünf</tspan>
  </text>

  <!-- Headline line 1 -->
  <text x="${PAD_X}" y="${HL1_Y}"
        font-family="DM Sans, sans-serif" font-size="96" font-weight="700"
        fill="#e1e2ea" stroke="#e1e2ea" stroke-width="2" paint-order="stroke fill"
        letter-spacing="-2.88">Schnelle Webseiten</text>

  <!-- Headline line 2 -->
  <text x="${PAD_X}" y="${HL2_Y}"
        font-family="DM Sans, sans-serif" font-size="96" font-weight="800"
        fill="#5B8DEE" stroke="#5B8DEE" stroke-width="3" paint-order="stroke fill"
        letter-spacing="-2.88">f&#xFC;r kleine Budgets.</text>

  <!-- Bottom subline -->
  <text x="${PAD_X}" y="${SUB_Y}"
        font-family="monospace" font-size="20"
        fill="#c3c6d4" letter-spacing="0.8">Bringen Sie Ihre Wunschseite in 14 Tagen online &#x2014; ab 999&#x20AC;.</text>

  <!-- Bottom location (right-aligned) -->
  <text x="${W - PAD_X}" y="${SUB_Y}"
        font-family="monospace" font-size="16"
        fill="rgba(91,141,238,0.5)" letter-spacing="1.6"
        text-anchor="end">Karlsruhe</text>

</svg>`

const png = await sharp(Buffer.from(svg)).png().toBuffer()
writeFileSync(outPath, png)
console.log(`✓ OG image written → public/og-image.png (${(png.length / 1024).toFixed(1)} KB)`)
