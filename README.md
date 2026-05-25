# zweipunktfünf

Produktionsreifes Next.js-14-Scaffold für eine Webagentur aus Karlsruhe mit Fokus auf Webdesign, Chatbots und Crypto.

## Stack

- Next.js 14 mit App Router
- JavaScript (`.js` / `.jsx`), kein TypeScript
- Tailwind CSS
- Framer Motion
- ESLint mit `next/core-web-vitals`
- Prettier
- Vercel-ready Zero-Config Deployment

## Setup

```bash
npm install
npm run dev
```

Weitere Kommandos:

```bash
npm run lint
npm run build
npm run format:check
```

## Projektstruktur

```text
app/
  globals.css
  layout.js
  page.js
components/
  layout/
    Footer.jsx
    Navbar.jsx
  sections/
    Hero.jsx
    Services.jsx
    Ticker.jsx
  ui/
    Button.jsx
lib/
  constants.js
public/
  fonts/
```

## Hinweise

- Google Fonts werden über `next/font/google` geladen.
- Die Ticker-Animation basiert nur auf CSS.
- Bewegungen respektieren `prefers-reduced-motion`.
- Vercel benötigt keine zusätzliche Konfiguration für dieses Projekt.This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Produktion mit Podman

Die App wird für Self-Hosting als Next.js-Standalone-Build erzeugt. Dadurch läuft sie im Container direkt mit `node server.js`, ohne `next start`.

Image bauen:

```bash
podman build -t zweipunktfuenf:latest -f Containerfile .
```

Container starten:

```bash
podman run -d \
  --name zweipunktfuenf \
  --replace \
  --publish 3000:3000 \
  --restart=always \
  -e NODE_ENV=production \
  zweipunktfuenf:latest
```

Nützliche Kommandos auf dem Server:

```bash
podman logs -f zweipunktfuenf
podman stop zweipunktfuenf
podman start zweipunktfuenf
podman ps
```

Für eine Domain davor typischerweise Nginx oder Caddy als Reverse Proxy auf Port 80/443 einsetzen und intern auf `127.0.0.1:3000` weiterleiten. Wenn du Laufzeitvariablen brauchst, ergänze sie mit weiteren `-e NAME=WERT` Parametern beim `podman run`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
