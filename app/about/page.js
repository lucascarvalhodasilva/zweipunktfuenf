import Image from 'next/image'
import Link from 'next/link'

import Navbar from '@/components/layout/Navbar'
import Eyebrow from '@/components/layout/Eyebrow'
import { about, footer } from '@/lib/content'

export const metadata = {
  title: about.meta.title,
  description: about.meta.description,
}

const ACCENT = {
  signal:   { bg: 'bg-signal/10',   border: 'border-signal/20',   text: 'text-signal',   dot: 'bg-signal'   },
  mist:     { bg: 'bg-mist/10',     border: 'border-mist/20',     text: 'text-mist',     dot: 'bg-mist'     },
  tertiary: { bg: 'bg-tertiary/10', border: 'border-tertiary/20', text: 'text-tertiary', dot: 'bg-tertiary' },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-midnight flex flex-col">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-[1280px] px-8 pt-28 pb-24">

        {/* Hero */}
        <div className="mb-20">
          <Eyebrow>{about.label}</Eyebrow>
          <div className="max-w-2xl">
            <h1 className="text-[clamp(32px,5vw,52px)] font-bold leading-[1.1] text-on-surface">
              {about.heading}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-on-surface/60">{about.sub}</p>
            <p className="mt-3 text-base leading-relaxed text-on-surface/40">{about.description}</p>
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <p className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-on-surface-variant">
            Das Team
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {about.team.map((member) => {
              const c = ACCENT[member.accent]
              return (
                <div
                  key={member.initials}
                  className="group flex flex-col items-center gap-6 p-8 text-center"
                >
                  <div className={`h-28 w-28 flex-shrink-0 rounded-full border-2 ${c.border} overflow-hidden flex items-center justify-center ${member.image ? '' : c.bg}`}>
                    {member.image ? (
                      <Image src={member.image} alt={member.name} width={112} height={112} className="h-full w-full object-cover object-[50%_30%]" />
                    ) : (
                      <span className={`font-mono text-3xl font-bold ${c.text}`}>{member.initials}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-body text-xl font-semibold text-on-surface">{member.name}</p>
                    <p className={`mt-1 font-mono text-[11px] uppercase tracking-widest ${c.text}`}>{member.role}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-on-surface/60">{member.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-border-dark bg-deep/20 px-8 py-16 text-center">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-signal/60">Bereit?</p>
          <p className="mb-8 text-2xl font-bold text-on-surface">Ihr Projekt wartet.</p>
          <Link
            href="/#contact"
            className="inline-flex h-11 items-center rounded-lg bg-signal px-8 font-mono text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-90"
          >
            Projekt starten
          </Link>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-border-dark bg-midnight">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-6 px-8 py-10">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-on-surface">
            zweipunkt<span className="text-signal">fünf</span>
          </span>
          <div className="flex gap-8 font-mono text-xs text-on-surface-variant">
            {footer.links.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-signal">
                {link.label}
              </Link>
            ))}
          </div>
          <p className="font-mono text-xs text-on-surface-variant">{footer.copyright}</p>
        </div>
      </footer>
    </div>
  )
}
