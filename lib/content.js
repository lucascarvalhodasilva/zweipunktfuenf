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
  label: '01 · WEB IN 14 TAGEN',
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

export const leistungenNav = [
  { slug: 'web-14-tagen',    label: 'Web in 14 Tagen',  tagline: 'Live in 2 Wochen — Festpreis, kein Risiko.' },
  { slug: 'web-individuell', label: 'Web Individuell',   tagline: 'Maßgefertigtes Design, unbegrenzte Möglichkeiten.' },
  { slug: 'web-features',    label: 'Web Features',      tagline: 'Einzelne Bausteine für Ihre bestehende Seite.' },
  { slug: 'web-optimierung', label: 'Web Optimierung',   tagline: 'Mehr Speed, besseres Ranking, höhere Konversionen.' },
  { slug: 'ki-chatbot',      label: 'KI Chat Bot',       tagline: 'Automatisierte Kundenkommunikation rund um die Uhr.' },
]

export const servicePages = {
  'web-14-tagen': {
    meta: {
      title: 'Web in 14 Tagen | zweipunktfünf',
      description: 'Professionelle Webseite in 14 Tagen — handgemacht, Festpreis ab 999 €, sofort online.',
    },
    eyebrow: 'WEB IN 14 TAGEN',
    heading: 'Ihre Seite. In 2 Wochen. Fertig.',
    sub: 'Kein monatelanges Warten, keine überraschenden Rechnungen. Wir liefern pünktlich — oder Sie zahlen nicht.',
    badge: 'ab 999 €',
    features: [
      { title: 'Festpreis', body: 'Sie wissen vor dem Start genau, was Sie zahlen. Keine versteckten Kosten.' },
      { title: '14 Tage Lieferzeit', body: 'Von der Planung bis zum Launch — in zwei Wochen. Garantiert.' },
      { title: 'Handgemachter Code', body: 'Kein Baukasten, kein WordPress. Jede Zeile wird von Hand geschrieben.' },
      { title: 'Responsive Design', body: 'Perfekte Darstellung auf Smartphone, Tablet und Desktop.' },
      { title: 'Lighthouse ≥ 90', body: 'Schnelle Ladezeiten und SEO-Grundlagen von Anfang an.' },
      { title: 'DSGVO-konform', body: 'Datenschutz, Impressum und sichere Verbindung inklusive.' },
    ],
    process: [
      { step: '01', title: 'Erstgespräch', body: 'In 30 Minuten klären wir Ziel, Umfang und Preis.' },
      { step: '02', title: 'Design', body: 'Wir gestalten Ihr individuelles Layout zur Freigabe.' },
      { step: '03', title: 'Entwicklung', body: 'Umsetzung mit Next.js & Tailwind — schnell und sauber.' },
      { step: '04', title: 'Launch', body: 'Ihre Seite geht live — SSL, Analytics und alles Drumherum inklusive.' },
    ],
  },
  'web-individuell': {
    meta: {
      title: 'Web Individuell | zweipunktfünf',
      description: 'Maßgefertigte Webseiten mit eigenem Design-System — für Unternehmen mit hohen Ansprüchen.',
    },
    eyebrow: 'WEB INDIVIDUELL',
    heading: 'Ihr Auftritt. Vollständig maßgefertigt.',
    sub: 'Für Projekte, die mehr brauchen: eigenes Design-System, mehrere Unterseiten, komplexe Interaktionen.',
    badge: 'ab 1.999 €',
    features: [
      { title: 'Eigenes Design-System', body: 'Farben, Schriften und Komponenten werden exklusiv für Sie entwickelt.' },
      { title: 'Bis zu 10 Unterseiten', body: 'Vollständige Website-Struktur mit individuell gestalteten Seiten.' },
      { title: 'Animationen & Micro-Interactions', body: 'Lebendige Details, die Ihre Marke erlebbar machen.' },
      { title: 'SEO-Optimierung', body: 'Strukturierte Daten, Metadaten, Sitemap und mehr für besseres Ranking.' },
      { title: 'Analytics & Tracking', body: 'DSGVO-konformes Analytics-Setup mit Plausible oder Google Analytics.' },
      { title: '2 Korrekturrunden', body: 'Zwei vollständige Feedback-Schleifen im Design und nach der Entwicklung.' },
    ],
    process: [
      { step: '01', title: 'Discovery', body: 'Ausführliche Analyse Ihrer Marke, Zielgruppe und Mitbewerber.' },
      { step: '02', title: 'Design-System', body: 'Entwicklung von Tokens, Komponenten und Screens in Figma.' },
      { step: '03', title: 'Entwicklung', body: 'Implementierung aller Seiten und Features in Next.js.' },
      { step: '04', title: 'Launch & Übergabe', body: 'Veröffentlichung, Einweisung und vollständige Dokumentation.' },
    ],
  },
  'web-features': {
    meta: {
      title: 'Web Features | zweipunktfünf',
      description: 'Einzelne Web-Features für Ihre bestehende Seite — Formulare, Animationen, Integrationen und mehr.',
    },
    eyebrow: 'WEB FEATURES',
    heading: 'Ein Feature. Sauber implementiert.',
    sub: 'Sie haben bereits eine Seite, aber es fehlt ein bestimmtes Element? Wir bauen es — isoliert, sauber und wartbar.',
    badge: 'ab 299 €',
    features: [
      { title: 'Kontakt- & Lead-Formulare', body: 'Validierung, Spam-Schutz und E-Mail-Benachrichtigungen inklusive.' },
      { title: 'Scroll-Animationen', body: 'Reveal-Effekte, Parallax und Counter-Animationen.' },
      { title: 'CMS-Integration', body: 'Anbindung von Sanity, Contentful oder ähnlichen Systemen.' },
      { title: 'Newsletter-Integration', body: 'Verbindung mit Mailchimp, Brevo oder ähnlichen Diensten.' },
      { title: 'Karten & Standorte', body: 'Google Maps oder OpenStreetMap — datenschutzkonform eingebunden.' },
      { title: 'Social Feeds', body: 'Instagram oder LinkedIn Feed eingebettet in Ihre Seite.' },
    ],
    process: [
      { step: '01', title: 'Anforderung', body: 'Sie schildern das gewünschte Feature — wir kalkulieren es.' },
      { step: '02', title: 'Umsetzung', body: 'Entwicklung und Test in einer Staging-Umgebung.' },
      { step: '03', title: 'Integration', body: 'Einbau in Ihre bestehende Seite ohne Unterbrechung des Betriebs.' },
      { step: '04', title: 'Abnahme', body: 'Gemeinsame Kontrolle und Freigabe vor dem Go-live.' },
    ],
  },
  'web-optimierung': {
    meta: {
      title: 'Web Optimierung | zweipunktfünf',
      description: 'Performance-Audit, Core Web Vitals und SEO-Optimierung für bestehende Webseiten.',
    },
    eyebrow: 'WEB OPTIMIERUNG',
    heading: 'Schneller. Sichtbarer. Konvertierungsstärker.',
    sub: 'Ihre bestehende Seite läuft nicht so wie sie sollte? Wir analysieren, priorisieren und beheben — messbar.',
    badge: 'ab 499 €',
    features: [
      { title: 'Lighthouse Audit', body: 'Vollständige Analyse von Performance, Accessibility, Best Practices und SEO.' },
      { title: 'Core Web Vitals', body: 'LCP, INP und CLS in den grünen Bereich — für Google und Ihre Nutzer.' },
      { title: 'Bildoptimierung', body: 'WebP-Konvertierung, Lazy Loading und responsive Bilder.' },
      { title: 'Code-Splitting', body: 'Bundle-Analyse und gezielte Reduzierung der JS-Paketgrößen.' },
      { title: 'SEO On-Page', body: 'Title-Tags, Meta-Descriptions, Headings, interne Verlinkung.' },
      { title: 'Monitoring Setup', body: 'Alarmierung bei Performance-Verschlechterungen mit UptimeRobot oder Checkly.' },
    ],
    process: [
      { step: '01', title: 'Audit', body: 'Vollständiger Bericht mit priorisierten Verbesserungspunkten.' },
      { step: '02', title: 'Quick Wins', body: 'Sofort umsetzbare Maßnahmen für spürbare Verbesserungen.' },
      { step: '03', title: 'Deep Fixes', body: 'Strukturelle Änderungen für nachhaltige Performance-Gewinne.' },
      { step: '04', title: 'Messung', body: 'Vorher-Nachher-Vergleich mit konkreten Zahlen.' },
    ],
  },
  'ki-chatbot': {
    meta: {
      title: 'KI Chat Bot | zweipunktfünf',
      description: 'Intelligenter KI-Chatbot für Ihre Website — automatisierte Kundenkommunikation rund um die Uhr.',
    },
    eyebrow: 'KI CHAT BOT',
    heading: 'Ihr bester Mitarbeiter schläft nie.',
    sub: 'Ein trainierter KI-Assistent beantwortet Fragen, qualifiziert Leads und bucht Termine — 24/7, ohne Wartezeit.',
    badge: 'ab 799 €',
    features: [
      { title: 'Trainiert auf Ihre Inhalte', body: 'Der Bot kennt Ihre Produkte, Preise und FAQs — keine Halluzinationen.' },
      { title: 'Lead-Qualifizierung', body: 'Automatisches Erfassen von Name, E-Mail und Projektziel.' },
      { title: 'Termin-Buchung', body: 'Direkte Integration mit Calendly, Cal.com oder ähnlichen Diensten.' },
      { title: 'Mehrsprachig', body: 'Antwortet in der Sprache des Nutzers — kein Setup nötig.' },
      { title: 'DSGVO-konform', body: 'Kein Tracking, keine Datenweitergabe, konforme Datenspeicherung in der EU.' },
      { title: 'Dashboard & Analysen', body: 'Einsicht in alle Gespräche, häufige Fragen und Conversion-Rate.' },
    ],
    process: [
      { step: '01', title: 'Wissens-Basis', body: 'Sie liefern Ihre Inhalte — wir trainieren den Bot darauf.' },
      { step: '02', title: 'Persönlichkeit', body: 'Ton, Name und Erscheinungsbild werden auf Ihre Marke abgestimmt.' },
      { step: '03', title: 'Integration', body: 'Einbindung in Ihre Website als Widget oder vollständige Seite.' },
      { step: '04', title: 'Übergabe', body: 'Einweisung ins Dashboard und Monitoring-Setup.' },
    ],
  },
}

export const footer = {
  copyright: '© 2026 zweipunktfünf · Karlsruhe, DE',
  links: [
    { label: 'Datenschutz', href: '/datenschutz' },
    { label: 'Impressum', href: '/impressum' },
  ],
}

export const about = {
  label: '04 · ÜBER UNS',
  heading: 'Drei Macher. Ein Versprechen.',
  sub: 'zweipunktfünf ist eine kleine Digitalagentur mit hohem Anspruch — gegründet mit dem Ziel, Webprojekte einfach, schnell und gut zu machen.',
  description: 'Wir glauben, dass gutes Webdesign keine Kompromisse kennt. Jedes Projekt bekommt unsere volle Aufmerksamkeit — von der ersten Idee bis zum Launch.',
  meta: {
    title: 'Über uns | zweipunktfünf',
    description: 'Lerne das Team hinter zweipunktfünf kennen — die Köpfe hinter schnellen Webseiten und KI-Chatbots aus Karlsruhe.',
  },
  team: [
    {
      initials: 'CF',
      name: 'Co-Gründer',
      role: 'Co-Founder & Tech Lead',
      description: 'Full-Stack-Entwicklung, technische Architektur & Gesamtverantwortung für jedes Projekt.',
      accent: 'mist',
      mobileOrder: 2,
    },
    {
      initials: 'GF',
      name: 'Gründer',
      role: 'Founder & Operations',
      description: 'Projektleitung, Kundenkommunikation & reibungslose Abläufe vom Briefing bis zur Übergabe.',
      accent: 'signal',
      image: '/gründer.jpeg',
      mobileOrder: 1,
    },
    {
      initials: 'WD',
      name: 'Co-Gründerin',
      role: 'Co-Founder & Lead Designer',
      description: 'UI/UX Design, Typografie & die visuelle Markenidentität, die unsere Seiten unverwechselbar macht.',
      accent: 'tertiary',
      mobileOrder: 3,
    },
  ],
}

