import Image from 'next/image'
import Link from 'next/link'

import Eyebrow from '@/components/layout/Eyebrow'
import { about, footer } from '@/lib/content'

const ACCENT = {
  signal:   { bg: 'bg-signal/10',   border: 'border-signal/20',   text: 'text-signal'   },
  mist:     { bg: 'bg-mist/10',     border: 'border-mist/20',     text: 'text-mist'     },
  tertiary: { bg: 'bg-tertiary/10', border: 'border-tertiary/20', text: 'text-tertiary' },
}

export default function About() {
  return (
    <section id="ueber-uns" className="relative h-full flex flex-col px-8 bg-midnight">
      <div className="mx-auto w-full max-w-[1280px] flex flex-col flex-1 min-h-0 pt-16">

        <Eyebrow>{about.label}</Eyebrow>

        {/* Horizontal team carousel */}
        <div className="flex-1 min-h-0 -mx-8">
          <div className="no-scrollbar flex h-full snap-x snap-mandatory gap-4 overflow-x-auto px-8 pb-4 pt-1 content-start">
            {about.team.map((member) => {
              const c = ACCENT[member.accent]
              return (
                <div
                  key={member.initials}
                  className="snap-center flex-shrink-0 w-[72vw] max-w-[280px] flex flex-col items-center gap-5 p-6 text-center"
                >
                  <div className={`h-24 w-24 flex-shrink-0 rounded-full border-2 ${c.border} overflow-hidden flex items-center justify-center ${member.image ? '' : c.bg}`}>
                    {member.image ? (
                      <Image src={member.image} alt={member.name} width={96} height={96} className="h-full w-full object-cover object-[50%_30%]" />
                    ) : (
                      <span className={`font-mono text-2xl font-bold ${c.text}`}>{member.initials}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-body text-base font-semibold text-on-surface">{member.name}</p>
                    <p className={`mt-0.5 font-mono text-[11px] uppercase tracking-widest ${c.text}`}>{member.role}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-on-surface/60">{member.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Description below carousel */}
        <div className="flex-shrink-0 py-6">
          <p className="text-sm font-semibold text-on-surface">{about.heading}</p>
          <p className="mt-1 text-sm text-on-surface/50">{about.sub}</p>
        </div>

      </div>

      {/* Integrated footer */}
      <div className="flex-shrink-0 border-t border-border-dark py-6">
        <div className="mx-auto max-w-[1280px] flex flex-col items-center gap-3">
          <div className="flex gap-6">
            {footer.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-[11px] text-on-surface-variant transition-colors hover:text-signal"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="font-mono text-[11px] text-on-surface/30">{footer.copyright}</p>
        </div>
      </div>
    </section>
  )
}
