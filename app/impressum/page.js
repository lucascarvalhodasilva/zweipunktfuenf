import Link from 'next/link'

export const metadata = {
  title: 'Impressum | zweipunktfünf',
  description:
    'Impressum von zweipunktfünf mit den gesetzlich erforderlichen Anbieterangaben.',
}

export default function ImpressumPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-20 text-[var(--color-text)] md:px-8">
      <h1 className="font-mono text-2xl uppercase tracking-[0.2em] text-[var(--color-accent)]">
        Impressum
      </h1>
      <div className="mt-8 space-y-6 font-mono text-sm leading-7 text-[var(--color-text)]/85">
        <section>
          <h2 className="mb-2 text-xs uppercase tracking-[0.2em] text-[var(--color-text)]">
            Angaben gemäß § 5 TMG
          </h2>
          <p>
            zweipunktfünf
            <br />
            Musterstraße 1
            <br />
            76133 Karlsruhe
            <br />
            Deutschland
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xs uppercase tracking-[0.2em] text-[var(--color-text)]">
            Kontakt
          </h2>
          <p>
            E-Mail: hallo@zweipunktfuenf.de
            <br />
            Telefon: +49 000 000000
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xs uppercase tracking-[0.2em] text-[var(--color-text)]">
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
          </h2>
          <p>
            zweipunktfünf
            <br />
            Musterstraße 1
            <br />
            76133 Karlsruhe
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
