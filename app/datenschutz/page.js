export const metadata = {
  title: 'Datenschutz | zweipunktfünf',
  description: 'Datenschutzerklärung von zweipunktfünf.',
}

export default function Datenschutz() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-20 md:px-8">
      <h1 className="mb-10 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--color-text)]">
        Datenschutz
      </h1>

      <div className="space-y-8 font-mono text-sm leading-7 text-[var(--color-text)]/78">
        <section className="space-y-3">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Cookies
          </h2>
          <p>
            Diese Website verwendet ausschließlich technisch notwendige Cookies,
            die für den Betrieb der Seite erforderlich sind. Es werden keine
            Analyse-, Tracking- oder Marketing-Cookies eingesetzt.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Datenerhebung
          </h2>
          <p>
            Wir erheben und speichern keine personenbezogenen Daten durch
            Tracking-Dienste oder Analyse-Tools. Es werden keine Daten an Dritte
            weitergegeben.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Hosting
          </h2>
          <p>
            Diese Website wird bei Vercel Inc. gehostet. Beim Besuch der Seite
            werden automatisch technische Informationen (z.&nbsp;B. IP-Adresse,
            Browsertyp, Zugriffszeit) in Server-Logfiles gespeichert. Diese
            Daten sind für den technischen Betrieb erforderlich und werden nicht
            mit anderen Datenquellen zusammengeführt.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Kontakt
          </h2>
          <p>
            Bei Fragen zum Datenschutz erreichst du uns über die auf der Website
            angegebenen Kontaktdaten.
          </p>
        </section>

        <div className="pt-4">
          <a
            href="/"
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)] transition-colors duration-300 hover:text-[var(--color-accent)]"
          >
            ← Zurück zur Startseite
          </a>
        </div>
      </div>
    </div>
  )
}
