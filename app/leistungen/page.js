import Link from 'next/link'

import { leistungen } from '@/lib/content'

export const metadata = {
  title: leistungen.meta.title,
  description: leistungen.meta.description,
}

export default function LeistungenPage() {
  return (
    <div className="min-h-screen bg-midnight text-on-surface">

      {/* ── Header ─────────────────────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border-dark bg-midnight/80 backdrop-blur-md">
        <nav className="mx-auto flex h-14 max-w-[1280px] items-center justify-between px-8">
          <Link href="/" className="font-mono text-sm font-bold tracking-wider text-on-surface">
            <span>zweipunkt</span>
            <span className="text-signal">fünf</span>
          </Link>
          <Link
            href="/#contact"
            className="hidden h-9 items-center rounded-lg border border-border-signal px-5 font-mono text-xs uppercase tracking-widest text-on-surface transition-colors hover:bg-deep md:inline-flex"
          >
            Projekt starten
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-[1280px] px-8 pb-24 pt-32">

        {/* ── Hero ───────────────────────────────────────── */}
        <div className="mb-20 max-w-2xl">
          <span className="mb-4 inline-block font-mono text-xs text-signal">{leistungen.eyebrow}</span>
          <h1 className="text-[clamp(32px,5vw,56px)] font-bold leading-[1.1] text-on-surface">
            {leistungen.heading}
          </h1>
          <p className="mt-4 text-base text-on-surface/60">{leistungen.sub}</p>
        </div>

        {/* ── Packages ───────────────────────────────────── */}
        <section aria-labelledby="packages-heading" className="mb-24">
          <h2 id="packages-heading" className="sr-only">Pakete & Preise</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {leistungen.packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`flex flex-col rounded-xl border p-6 transition-colors ${
                  pkg.highlight
                    ? 'border-signal/40 bg-deep/60 ring-1 ring-signal/20'
                    : 'border-border-dark bg-deep/20'
                }`}
              >
                {pkg.highlight && (
                  <div className="mb-4">
                    <span className="rounded border border-signal/30 bg-signal/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-signal">
                      Empfohlen
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="mb-1 font-mono text-lg font-bold text-on-surface">{pkg.name}</h3>
                  <p className="mb-3 text-sm text-on-surface/50">{pkg.tagline}</p>
                  <p className="font-mono text-2xl font-bold text-signal">{pkg.price}</p>
                </div>

                <ul className="mb-8 flex flex-1 flex-col gap-2">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-on-surface/70">
                      <span className="mt-0.5 flex-shrink-0 font-mono text-[10px] text-signal">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/#contact"
                  className={`flex h-10 items-center justify-center rounded-lg font-mono text-xs uppercase tracking-widest transition-colors ${
                    pkg.highlight
                      ? 'bg-signal text-white hover:bg-signal/90'
                      : 'border border-border-dark text-on-surface/70 hover:border-signal/40 hover:text-signal'
                  }`}
                >
                  {pkg.id === 'pro' ? 'Anfragen' : 'Jetzt anfragen'}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ── Always Included ────────────────────────────── */}
        <section aria-labelledby="includes-heading" className="mb-24">
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-4">
              <span className="font-mono text-xs text-signal">INBEGRIFFEN</span>
              <div className="h-px flex-grow bg-border-dark" />
            </div>
            <h2 id="includes-heading" className="text-[clamp(24px,3.5vw,36px)] font-bold text-on-surface">
              {leistungen.includes.heading}
            </h2>
            <p className="mt-3 max-w-xl text-sm text-on-surface/60">{leistungen.includes.sub}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {leistungen.includes.items.map((item) => (
              <div key={item.title} className="glass-card rounded-xl p-5">
                <span className="mb-3 block text-2xl" aria-hidden="true">{item.icon}</span>
                <h3 className="mb-1.5 font-mono text-sm font-bold text-on-surface">{item.title}</h3>
                <p className="text-sm leading-relaxed text-on-surface/60">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────── */}
        <section aria-labelledby="faq-heading" className="mb-24">
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-4">
              <span className="font-mono text-xs text-signal">FAQ</span>
              <div className="h-px flex-grow bg-border-dark" />
            </div>
            <h2 id="faq-heading" className="text-[clamp(24px,3.5vw,36px)] font-bold text-on-surface">
              Häufige Fragen.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {leistungen.faq.map((item) => (
              <div key={item.q} className="glass-card rounded-xl p-6">
                <h3 className="mb-2 font-mono text-sm font-bold text-on-surface">{item.q}</h3>
                <p className="text-sm leading-relaxed text-on-surface/60">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────── */}
        <section className="rounded-2xl border border-signal/20 bg-deep/40 px-8 py-16 text-center">
          <h2 className="mb-3 text-[clamp(24px,3.5vw,36px)] font-bold text-on-surface">
            {leistungen.cta.heading}
          </h2>
          <p className="mb-8 text-sm text-on-surface/60">{leistungen.cta.sub}</p>
          <Link
            href="/#contact"
            className="inline-flex h-12 items-center gap-2 rounded-lg bg-signal px-8 font-mono text-sm uppercase tracking-widest text-white transition-colors hover:bg-signal/90"
          >
            {leistungen.cta.button}
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 7h10v10" /><path d="M7 17 17 7" />
            </svg>
          </Link>
        </section>

      </main>

      {/* ── Footer ─────────────────────────────────────── */}
      <footer className="border-t border-border-dark">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-8 py-6">
          <Link href="/" className="font-mono text-xs text-on-surface-variant transition-colors hover:text-signal">
            ← Zurück zur Startseite
          </Link>
          <span className="font-mono text-xs text-on-surface/30">© 2026 zweipunktfünf</span>
        </div>
      </footer>

    </div>
  )
}
