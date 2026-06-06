import Link from 'next/link'

import { leistungen, leistungenNav } from '@/lib/content'

export const metadata = {
  title: leistungen.meta.title,
  description: leistungen.meta.description,
}

export default function LeistungenPage() {
  return (
    <div>

      {/* ── Mobile: full-page service tree ─────────────────────────────── */}
      <div className="md:hidden px-5 py-10">
        <div className="mb-8">
          <span className="mb-3 inline-block font-mono text-xs text-signal">{leistungen.eyebrow}</span>
          <h1 className="text-[clamp(28px,7vw,40px)] font-bold leading-[1.1] text-on-surface">
            {leistungen.heading}
          </h1>
          <p className="mt-3 text-sm text-on-surface/60">{leistungen.sub}</p>
        </div>

        <nav aria-label="Leistungen auswählen" className="flex flex-col gap-3">
          {leistungenNav.map((svc) => (
            <Link
              key={svc.slug}
              href={`/leistungen/${svc.slug}`}
              className="group flex items-center justify-between rounded-xl border border-border-dark bg-deep/20 px-5 py-4 transition-colors hover:border-signal/40 hover:bg-deep/40"
            >
              <div>
                <p className="font-mono text-sm font-bold text-on-surface group-hover:text-signal transition-colors">
                  {svc.label}
                </p>
                <p className="mt-0.5 text-xs text-on-surface/50">{svc.tagline}</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-shrink-0 text-on-surface/30 group-hover:text-signal transition-colors"
                aria-hidden="true"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          ))}
        </nav>
      </div>

      {/* ── Desktop: overview content ───────────────────────────────────── */}
      <div className="hidden md:block px-10 py-16">

        {/* Hero */}
        <div className="mb-14 max-w-2xl">
          <span className="mb-3 inline-block font-mono text-xs text-signal">{leistungen.eyebrow}</span>
          <h1 className="text-[clamp(32px,4vw,52px)] font-bold leading-[1.1] text-on-surface">
            {leistungen.heading}
          </h1>
          <p className="mt-4 text-base text-on-surface/60">{leistungen.sub}</p>
        </div>

        {/* Service cards grid */}
        <section aria-labelledby="services-heading" className="mb-16">
          <h2 id="services-heading" className="mb-6 font-mono text-xs uppercase tracking-widest text-signal">
            Unsere Leistungen
          </h2>
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {leistungenNav.map((svc) => (
              <Link
                key={svc.slug}
                href={`/leistungen/${svc.slug}`}
                className="group flex flex-col rounded-xl border border-border-dark bg-deep/20 p-5 transition-colors hover:border-signal/40 hover:bg-deep/40"
              >
                <p className="mb-1 font-mono text-sm font-bold text-on-surface group-hover:text-signal transition-colors">
                  {svc.label}
                </p>
                <p className="flex-1 text-sm text-on-surface/50">{svc.tagline}</p>
                <div className="mt-4 flex items-center gap-1 font-mono text-[11px] text-signal/60 group-hover:text-signal transition-colors">
                  Mehr erfahren
                  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Packages */}
        <section aria-labelledby="packages-heading" className="mb-16">
          <h2 id="packages-heading" className="mb-6 font-mono text-xs uppercase tracking-widest text-signal">
            Pakete & Preise
          </h2>
          <div className="grid gap-5 lg:grid-cols-3">
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
                <div className="mb-5">
                  <h3 className="mb-1 font-mono text-base font-bold text-on-surface">{pkg.name}</h3>
                  <p className="mb-2 text-sm text-on-surface/50">{pkg.tagline}</p>
                  <p className="font-mono text-2xl font-bold text-signal">{pkg.price}</p>
                </div>
                <ul className="mb-6 flex flex-1 flex-col gap-1.5">
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

        {/* Always Included */}
        <section aria-labelledby="includes-heading" className="mb-16">
          <h2 id="includes-heading" className="mb-2 text-[clamp(22px,3vw,32px)] font-bold text-on-surface">
            {leistungen.includes.heading}
          </h2>
          <p className="mb-6 max-w-xl text-sm text-on-surface/60">{leistungen.includes.sub}</p>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {leistungen.includes.items.map((item) => (
              <div key={item.title} className="glass-card rounded-xl p-5">
                <span className="mb-3 block text-2xl" aria-hidden="true">{item.icon}</span>
                <h3 className="mb-1.5 font-mono text-sm font-bold text-on-surface">{item.title}</h3>
                <p className="text-sm leading-relaxed text-on-surface/60">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-heading" className="mb-16">
          <h2 id="faq-heading" className="mb-6 text-[clamp(22px,3vw,32px)] font-bold text-on-surface">
            Häufige Fragen.
          </h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {leistungen.faq.map((item) => (
              <div key={item.q} className="glass-card rounded-xl p-6">
                <h3 className="mb-2 font-mono text-sm font-bold text-on-surface">{item.q}</h3>
                <p className="text-sm leading-relaxed text-on-surface/60">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-signal/20 bg-deep/40 px-8 py-14 text-center">
          <h2 className="mb-3 text-[clamp(22px,3vw,34px)] font-bold text-on-surface">
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

      </div>
    </div>
  )
}
