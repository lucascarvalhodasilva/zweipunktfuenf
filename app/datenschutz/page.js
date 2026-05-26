import Link from 'next/link'

export const metadata = {
  title: 'Datenschutz | zweipunktfünf',
  description: 'Datenschutzerklärung von zweipunktfünf.',
}

export default function Datenschutz() {
  return (
    <main className="min-h-screen bg-midnight px-8 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 flex items-center gap-4">
          <span className="font-mono text-xs text-signal">Datenschutz</span>
          <div className="h-px flex-grow bg-border-dark" />
        </div>

        <h1 className="mb-10 text-3xl font-light tracking-tight text-on-surface">
          Datenschutzerklärung
        </h1>

        <div className="space-y-6">
          {[
            {
              title: 'Cookies',
              body: 'Diese Website verwendet ausschließlich technisch notwendige Cookies, die für den Betrieb der Seite erforderlich sind. Es werden keine Analyse-, Tracking- oder Marketing-Cookies eingesetzt.',
            },
            {
              title: 'Datenerhebung',
              body: 'Wir erheben und speichern keine personenbezogenen Daten durch Tracking-Dienste oder Analyse-Tools. Es werden keine Daten an Dritte weitergegeben.',
            },
            {
              title: 'Hosting',
              body: 'Diese Website wird bei Vercel Inc. gehostet. Beim Besuch der Seite werden automatisch technische Informationen (z.\u00a0B. IP-Adresse, Browsertyp, Zugriffszeit) in Server-Logfiles gespeichert. Diese Daten sind für den technischen Betrieb erforderlich und werden nicht mit anderen Datenquellen zusammengeführt.',
            },
            {
              title: 'Kontakt',
              body: 'Bei Fragen zum Datenschutz erreichst du uns über die auf der Website angegebenen Kontaktdaten.',
            },
          ].map(({ title, body }) => (
            <section key={title} className="glass-card rounded-xl p-6 space-y-3">
              <h2 className="font-mono text-xs uppercase tracking-widest text-signal">{title}</h2>
              <p className="text-sm leading-relaxed text-on-surface-variant">{body}</p>
            </section>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-widest text-on-surface-variant transition-colors hover:text-signal"
          >
            ← Zurück zur Startseite
          </Link>
        </div>
      </div>
    </main>
  )
}
