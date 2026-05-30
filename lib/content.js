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
  label: '01 · UNSER PROZESS',
  heading: 'Wir wissen was zu tun ist.',
  steps: [
    {
      number: '01',
      title: 'Tag 1–3: Planung',
      tags: ['Erstgespräch', 'Ihre Wünsche', 'Seitenstruktur'],
      description:
        'In einem kurzen Gespräch wird geklärt, was Ihre neue Seite leisten soll, wen Sie damit erreichen wollen — und wie Ihre Vorstellungen aussehen.',
    },
    {
      number: '02',
      title: 'Tag 4–7: Design',
      tags: ['Gestaltung', '2 Korrekturrunden'],
      description:
        'Das komplette Erscheinungsbild Ihrer Webseite wird entworfen: Farben, Schriften und alle Seitenbereiche. Alles ist vorab sichtbar, Änderungen können eingebracht werden — bevor es ins Eingemachte geht.',
    },
    {
      number: '03',
      title: 'Tag 8–12: Entwicklung',
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
  eyebrow: 'Referenzen',
  heading: 'Ergebnisse, die für sich sprechen.',
  sub: 'Über 50 Projekte ausgeliefert — pünktlich, im Budget, messbar besser.',
  items: [
    { value: '50', suffix: '+', label: 'Projekte ausgeliefert' },
    { value: '14', suffix: 'd', label: 'Ø Lieferzeit' },
    { value: '98', suffix: '/100', label: 'Lighthouse Score' },
  ],
  clientsLabel: 'Vertraut von',
  clients: [
    'Kanzlei Hoffmann',
    'Maier Haustechnik',
    'Studio Maren Koch',
    'DataBridge GmbH',
    'Praxis Dr. Bauer',
    'NordWind Events',
  ],
  reviews: [
    {
      quote: [
        '„Wir hatten jahrelang eine veraltete Seite. In zwei Wochen war alles neu — modern, schnell, endlich für mobile Geräte optimiert. ',
        { bold: 'Die Anfragen haben sich verdoppelt.' },
        '"',
      ],
      author: { initials: 'TH', name: 'Thomas Hoffmann', role: 'Geschäftsführer · Kanzlei Hoffmann, Karlsruhe' },
      tag: '14 Tage',
      meta: { branche: 'Kanzlei', lieferzeit: '14 Tage', lighthouse: '99' },
    },
    {
      quote: [
        '„Der Festpreis hat mich überzeugt. Kein endloses Hin-und-Her, kein verstecktes Nachrechnen. ',
        { bold: 'Ergebnis war sogar besser als erwartet' },
        ' — und Google liebt die Seite."',
      ],
      author: { initials: 'MK', name: 'Maren Koch', role: 'Inhaberin · Studio Maren Koch, Mannheim' },
      tag: 'ab 999 €',
      meta: { branche: 'Design-Studio', lieferzeit: '12 Tage', lighthouse: '98' },
    },
    {
      quote: [
        '„Ich war skeptisch ob 14 Tage realistisch sind. Es hat 13 Tage gedauert. ',
        { bold: 'Die Seite läuft fehlerfrei' },
        ', und der Lighthouse Score von 97 spricht für sich."',
      ],
      author: { initials: 'SB', name: 'Sandra Bauer', role: 'Praxisinhaberin · Praxis Dr. Bauer, Stuttgart' },
      tag: '13 Tage',
      meta: { branche: 'Medizin', lieferzeit: '13 Tage', lighthouse: '97' },
    },
  ],
  projects: [
    { name: 'Kanzlei Hoffmann',    branche: 'Kanzlei',       lieferzeit: 14, lighthouse: 99, preis: '1.499 €' },
    { name: 'Maier Haustechnik',   branche: 'Handwerk',      lieferzeit: 12, lighthouse: 96, preis: '999 €'   },
    { name: 'Studio Maren Koch',   branche: 'Design-Studio', lieferzeit: 12, lighthouse: 98, preis: '1.299 €' },
    { name: 'DataBridge GmbH',     branche: 'Software',      lieferzeit: 14, lighthouse: 97, preis: '1.799 €' },
    { name: 'Praxis Dr. Bauer',    branche: 'Medizin',       lieferzeit: 13, lighthouse: 97, preis: '1.499 €' },
    { name: 'NordWind Events',     branche: 'Events',        lieferzeit: 10, lighthouse: 95, preis: '999 €'   },
    { name: 'BauGruppe Müller',    branche: 'Bau',           lieferzeit: 14, lighthouse: 98, preis: '1.299 €' },
    { name: 'Yogastudio Lena',     branche: 'Wellness',      lieferzeit:  9, lighthouse: 99, preis: '999 €'   },
    { name: 'Schreibtisch GmbH',   branche: 'Coworking',     lieferzeit: 11, lighthouse: 96, preis: '1.099 €' },
    { name: 'Café Sonnenschein',   branche: 'Gastronomie',   lieferzeit: 11, lighthouse: 97, preis: '999 €'   },
  ],
  bottomText: 'Bereit für Ihre neue Seite?',
  cta: 'Projekt starten →',
}

export const contact = {
  label: '03 · KONTAKT',
  heading: 'Projekt besprechen',
  description:
    'Erzählen Sie uns von Ihrem Vorhaben. Wir melden uns innerhalb von 24 Stunden.',
}

export const footer = {
  copyright: '© 2026 zweipunktfünf · Karlsruhe, DE',
  links: [
    { label: 'Datenschutz', href: '/datenschutz' },
    { label: 'Impressum', href: '/impressum' },
  ],
}

