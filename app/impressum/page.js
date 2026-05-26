import Link from 'next/link'

export const metadata = {
  title: 'Impressum | zweipunktfünf',
  description:
    'Impressum von zweipunktfünf mit den gesetzlich erforderlichen Anbieterangaben.',
}

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-midnight px-8 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 flex items-center gap-4">
          <span className="font-mono text-xs text-signal">Impressum</span>
          <div className="h-px flex-grow bg-border-dark" />
        </div>

        <h1 className="mb-10 text-3xl font-light tracking-tight text-on-surface">
          Impressum
        </h1>

        <div className="space-y-6">
          {[
            {
              title: 'Angaben gemäß § 5 TMG',
              body: 'zweipunktfünf\nMusterstraße 1\n76133 Karlsruhe\nDeutschland',
            },
            {
              title: 'Kontakt',
              body: 'E-Mail: hallo@zweipunktfuenf.de\nTelefon: +49 000 000000',
            },
            {
              title: 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV',
              body: 'zweipunktfünf\nMusterstraße 1\n76133 Karlsruhe',
            },
          ].map(({ title, body }) => (
            <section key={title} className="glass-card rounded-xl p-6 space-y-3">
              <h2 className="font-mono text-xs uppercase tracking-widest text-signal">{title}</h2>
              <p className="whitespace-pre-line text-sm leading-relaxed text-on-surface-variant">{body}</p>
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
