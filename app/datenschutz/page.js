import Link from 'next/link'

export const metadata = {
  title: 'Datenschutz | zweipunktfünf',
  description:
    'Datenschutzerklärung von zweipunktfünf mit Informationen zur Verarbeitung personenbezogener Daten.',
}

export default function DatenschutzPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-20 text-[var(--color-text)] md:px-8">
      <h1 className="font-mono text-2xl uppercase tracking-[0.2em] text-[var(--color-accent)]">
        Datenschutz
      </h1>
      <div className="mt-8 space-y-6 font-mono text-sm leading-7 text-[var(--color-text)]/85">
        <section>
          <h2 className="mb-2 text-xs uppercase tracking-[0.2em] text-[var(--color-text)]">
            1. Verantwortliche Stelle
          </h2>
          <p>
            Verantwortlich für die Datenverarbeitung auf dieser Website ist zweipunktfünf,
            Musterstraße 1, 76133 Karlsruhe, Deutschland.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xs uppercase tracking-[0.2em] text-[var(--color-text)]">
            2. Erhebung und Verarbeitung
          </h2>
          <p>
            Beim Besuch dieser Website können technisch notwendige Daten verarbeitet werden,
            um den Betrieb und die Sicherheit der Seite zu gewährleisten.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xs uppercase tracking-[0.2em] text-[var(--color-text)]">
            3. Cookies
          </h2>
          <p>
            Zusätzlich zu technisch notwendigen Cookies werden Analyse- und Marketing-Cookies
            nur nach deiner Einwilligung gespeichert.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xs uppercase tracking-[0.2em] text-[var(--color-text)]">
            4. Deine Rechte
          </h2>
          <p>
            Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
            Verarbeitung sowie Widerspruch gegen die Verarbeitung deiner personenbezogenen
            Daten nach den gesetzlichen Vorgaben.
          </p>
        </section>
      </div>
      <Link
        href="/"
        className="mt-10 inline-flex font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] transition-colors hover:text-[var(--color-text)]"
      >
        Zurück zur Startseite
      </Link>
    </main>
  )
}
