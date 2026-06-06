import Link from 'next/link'

export default function ServicePageContent({ svc }) {
  return (
    <article className="px-6 py-12 md:px-10 md:py-16">

      {/* ── Hero ─────────────────────────────────────── */}
      <header className="mb-12">
        <div className="mb-3 flex items-center gap-3">
          <span className="font-mono text-xs text-signal">{svc.eyebrow}</span>
          <span className="rounded border border-signal/30 bg-signal/10 px-2 py-0.5 font-mono text-[10px] text-signal">
            {svc.badge}
          </span>
        </div>
        <h1 className="text-[clamp(28px,4vw,48px)] font-bold leading-[1.1] text-on-surface">
          {svc.heading}
        </h1>
        <p className="mt-4 max-w-xl text-base text-on-surface/60">{svc.sub}</p>
      </header>

      {/* ── Features ─────────────────────────────────── */}
      <section aria-labelledby="features-heading" className="mb-14">
        <h2 id="features-heading" className="mb-6 font-mono text-xs uppercase tracking-widest text-signal">
          Was Sie bekommen
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {svc.features.map((f) => (
            <div key={f.title} className="glass-card rounded-xl p-5">
              <div className="mb-1.5 flex items-center gap-2">
                <span className="font-mono text-[10px] text-signal">✓</span>
                <h3 className="font-mono text-sm font-bold text-on-surface">{f.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-on-surface/60">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Process ──────────────────────────────────── */}
      <section aria-labelledby="process-heading" className="mb-14">
        <h2 id="process-heading" className="mb-6 font-mono text-xs uppercase tracking-widest text-signal">
          Wie es abläuft
        </h2>
        <div className="flex flex-col gap-0">
          {svc.process.map((p, i) => (
            <div key={p.step} className="relative flex gap-5 pb-6 last:pb-0">
              {/* vertical line */}
              {i < svc.process.length - 1 && (
                <div className="absolute left-[17px] top-8 bottom-0 w-px bg-border-dark" aria-hidden="true" />
              )}
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-signal/30 bg-deep/60">
                <span className="font-mono text-[10px] font-bold text-signal">{p.step}</span>
              </div>
              <div className="pt-1.5">
                <h3 className="mb-1 font-mono text-sm font-bold text-on-surface">{p.title}</h3>
                <p className="text-sm text-on-surface/60">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="rounded-2xl border border-signal/20 bg-deep/40 px-6 py-10 text-center md:px-10">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-signal">Bereit?</p>
        <h2 className="mb-2 text-xl font-bold text-on-surface">Jetzt unverbindlich anfragen</h2>
        <p className="mb-6 text-sm text-on-surface/60">Wir melden uns innerhalb von 3 Werktagen zurück.</p>
        <Link
          href="/#contact"
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-signal px-7 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:bg-signal/90"
        >
          Projekt starten
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 7h10v10" /><path d="M7 17 17 7" />
          </svg>
        </Link>
      </section>

    </article>
  )
}
