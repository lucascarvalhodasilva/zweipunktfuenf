export const hero = {
  badge: 'Handwerk, das performt.',
  headline: 'Schnelle Webseiten für kleine Budgets.',
  subline: 'Wir bringen Ihre Wunschseite in 14 Tagen online — ab 999€.',
  cta: {
    primary: 'Projekt starten',
    secondary: 'So Funktioniert´s',
  },
}

export const process = {
  label: '01 · PROZESS',
  heading: 'Ein Versprechen, das wir halten.',
  sub: 'In 14 Tagen von der Planung bis zur Veröffentlichung — alles aus einer Hand.',
  steps: [
    {
      number: '01',
      title: 'Tag 1–3: Planung',
      tags: ['Erstgespräch', 'Ihre Wünsche', 'Seitenstruktur'],
      description:
        'Sie erklären uns in einem kurzen Gespräch, was Ihre neue Seite leisten soll und wen Sie erreichen möchten. Wir beraten Sie zu Möglichkeiten, erstellen eine passende Seitenstruktur und definieren einen klaren Rahmen für das Projekt.',
    },
    {
      number: '02',
      title: 'Tag 4–10: Design',
      tags: ['Gestaltung', '2 Korrekturrunden'],
      description:
        'Nachdem wir Sie kennengelernt haben, gestalten wir das komplette Erscheinungsbild Ihrer Webseite: Farben, Schriften und alle Seitenbereiche. Sie erhalten einen interaktiven Prototypen, den Sie testen und kommentieren können.',
    },
    {
      number: '03',
      title: 'Tag 11–12: Entwicklung',
      tags: ['Individuelle Programmierung', 'Geprüfte Qualität'],
      description:
        'Ihre Seite wird von Hand programmiert — ohne fertige Baukastensysteme. Das Ergebnis lädt schnell und funktioniert auf allen Geräten - darin sind wir Profis.',
    },
    {
      number: '04',
      title: 'Tag 13–14: Veröffentlichung',
      tags: ['Online schalten', 'Live in 2 Wochen'],
      description:
        'Alles wird eingerichtet, Sicherheit und Ladezeiten werden geprüft — damit Ihre Seite vom ersten Tag an zuverlässig läuft und Sie sich auf Ihr Geschäft konzentrieren können.',
    },
  ],
}

export const stats = {
  eyebrow: '02 · REFERENZEN',
  heading: 'Ergebnisse, die für sich sprechen.',
  sub: 'Über 50 Projekte ausgeliefert — pünktlich, im Budget, messbar besser.',
  items: [
    { value: '50', suffix: '+', label: 'Projekte ausgeliefert' },
    { value: '14', suffix: 'd', label: 'Ø Lieferzeit' },
    { value: '98', suffix: '/100', label: 'Lighthouse Score' },
  ],
  clientsLabel: 'Vertraut von',
  clients: [
    'Florian Uebel',
    'Michael Garbas',
  ],
  reviews: [
    {
      quote: [
        '„Ich hatte lange eine veraltete Seite, die keiner gefunden hat. ',
        { bold: 'Innerhalb von zwei Wochen war alles online' },
        ' — modern, schnell und genau das, was mein Business braucht."',
      ],
      author: { initials: 'FU', name: 'Florian Uebel', role: 'Barchef · Obsidian Lounge, Magdeburg', url: 'https://florianuebel.de', preview: '/previews/florianuebel.jpg' },
      tag: '14 Tage',
      meta: { branche: 'Bar & Events', lieferzeit: '14 Tage', lighthouse: '99' },
    },
    {
      quote: [
        '„Klare Kommunikation, fester Preis, pünktliche Lieferung. ',
        { bold: 'Genau so muss das laufen.' },
        ' Die Seite performt hervorragend und neue Anfragen kommen täglich rein."',
      ],
      author: { initials: 'MG', name: 'Michael Garbas', role: 'Personal Trainer · Coach Mike, Berlin', url: 'https://michaelgarbas.de', preview: '/previews/michaelgarbas.jpg' },
      tag: '14 Tage',
      meta: { branche: 'Personal Training', lieferzeit: '14 Tage', lighthouse: '98' },
    },
  ],
  projects: [
    { name: 'Florian Uebel',  branche: 'Bar & Events',      lieferzeit: 14, lighthouse: 99, url: 'https://florianuebel.de',  categories: { performance: 99, accessibility: 100, bestPractices: 100, seo: 100 } },
    { name: 'Michael Garbas', branche: 'Personal Training', lieferzeit: 14, lighthouse: 98, url: 'https://michaelgarbas.de' },
  ],
  bottomText: 'Bereit für Ihre neue Seite?',
  cta: 'Projekt starten →',
}

export const contact = {
  label: '03 · KONTAKT',
  heading: 'Erzählen Sie uns wer Sie sind.',
  description:
    'Wir melden uns innerhalb von 3 Werktagen zurück.',
}

export const leistungen = {
  meta: {
    title: 'Leistungen | zweipunktfünf',
    description:
      'Professionelle Webseiten in 14 Tagen — handgemacht mit Next.js & Tailwind. Transparente Festpreise ab 999 €.',
  },
  eyebrow: 'LEISTUNGEN',
  heading: 'Alles aus einer Hand.',
  sub: 'Von der ersten Idee bis zum Live-Gang — handgemacht, schnell und zu einem festen Preis.',
  packages: [
    {
      id: 'starter',
      name: 'Starter',
      price: 'ab 999 €',
      tagline: 'Ihre erste professionelle Webpräsenz.',
      highlight: false,
      features: [
        'Einseitige Landing Page',
        'Responsive auf allen Geräten',
        'Kontaktformular',
        'Lighthouse Score ≥ 90',
        'SSL & HTTPS',
        'DSGVO-konform',
        '14 Tage Lieferzeit',
        '1 Korrekturrunde',
      ],
    },
    {
      id: 'business',
      name: 'Business',
      price: 'ab 1.999 €',
      tagline: 'Mehr Seiten, mehr Wirkung.',
      highlight: true,
      features: [
        'Bis zu 5 Unterseiten',
        'Individuelles Design-System',
        'Animationen & Micro-Interactions',
        'SEO-Grundoptimierung',
        'Google Search Console Setup',
        'Plausible Analytics',
        'Lighthouse Score ≥ 95',
        '14 Tage Lieferzeit',
        '2 Korrekturrunden',
        'DSGVO & Impressum',
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 'Auf Anfrage',
      tagline: 'Für komplexe Anforderungen.',
      highlight: false,
      features: [
        'Unbegrenzte Seiten',
        'CMS-Integration (z. B. Sanity)',
        'KI-Chatbot & Automatisierungen',
        'Mehrsprachigkeit',
        'Individuelles Tracking-Setup',
        'Performance-Audit & Monitoring',
        'Lighthouse Score ≥ 98',
        'Dedizierter Ansprechpartner',
        'Laufende Wartung auf Wunsch',
      ],
    },
  ],
  includes: {
    heading: 'Immer dabei.',
    sub: 'Egal für welches Paket Sie sich entscheiden — diese Grundlagen sind bei jedem Projekt inbegriffen.',
    items: [
      { icon: '⚡', title: 'Next.js & Tailwind', body: 'Modernster Tech-Stack für maximale Performance und wartbaren Code.' },
      { icon: '📱', title: 'Mobile First', body: 'Pixelgenaue Darstellung auf jedem Gerät — vom Smartphone bis zum 4K-Monitor.' },
      { icon: '🔒', title: 'Sicherheit', body: 'HTTPS, sichere Header und DSGVO-konforme Umsetzung von Anfang an.' },
      { icon: '🚀', title: 'Blitzschnell', body: 'Statisch generiert oder serverseitig gerendert — optimale Ladezeiten garantiert.' },
      { icon: '🎨', title: 'Individuelles Design', body: 'Kein Baukastensystem. Jede Seite ist ein Unikat, das zu Ihrer Marke passt.' },
      { icon: '📊', title: 'Messbare Ergebnisse', body: 'Core Web Vitals im grünen Bereich und Analytics-Setup für datenbasierte Entscheidungen.' },
    ],
  },
  faq: [
    {
      q: 'Wie läuft ein Projekt ab?',
      a: 'Nach einem kurzen Erstgespräch erhalten Sie ein Angebot. Nach Auftragserteilung starten wir sofort: Planung, Design, Entwicklung und Launch — in 14 Tagen.',
    },
    {
      q: 'Was passiert nach dem Launch?',
      a: 'Sie erhalten alle Zugangsdaten und eine kurze Einweisung. Auf Wunsch bieten wir laufende Wartung und Updates als Bestandteil des Pro-Pakets oder als separaten Vertrag an.',
    },
    {
      q: 'Kann ich eigene Inhalte einpflegen?',
      a: 'Ja — beim Pro-Paket integrieren wir ein CMS Ihrer Wahl. Für kleinere Anpassungen stehen wir gerne als Ansprechpartner zur Verfügung.',
    },
    {
      q: 'Gibt es versteckte Kosten?',
      a: 'Nein. Sie erhalten vorab ein schriftliches Angebot zum Festpreis. Hostingkosten (z. B. Vercel) und Domaingebühren werden transparent ausgewiesen.',
    },
  ],
  cta: {
    heading: 'Bereit für Ihre neue Webseite?',
    sub: 'Schildern Sie uns kurz Ihr Projekt — wir melden uns innerhalb von 3 Werktagen mit einem Angebot.',
    button: 'Projekt starten',
  },
}

export const footer = {
  copyright: '© 2026 zweipunktfünf · Karlsruhe, DE',
  links: [
    { label: 'Datenschutz', href: '/datenschutz' },
    { label: 'Impressum', href: '/impressum' },
  ],
}

