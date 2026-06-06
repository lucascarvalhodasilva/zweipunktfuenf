'use client'

import * as NavMenuPrimitive from '@radix-ui/react-navigation-menu'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { leistungenServices } from '@/lib/constants'
import { leistungenNav } from '@/lib/content'

// Build a lookup so we can show taglines from leistungenNav
const taglineBySlug = Object.fromEntries(leistungenNav.map((s) => [s.slug, s.tagline]))

export default function LeistungenNavMenu() {
  const pathname = usePathname()
  const isActive = pathname.startsWith('/leistungen')

  return (
    <NavMenuPrimitive.Root
      className="relative z-50 flex items-center"
      delayDuration={100}
    >
      <NavMenuPrimitive.List className="flex list-none items-center">
        <NavMenuPrimitive.Item>

          {/* ── Trigger ──────────────────────────────── */}
          <NavMenuPrimitive.Trigger
            className={`group flex select-none items-center gap-1.5 outline-none font-mono text-xs uppercase tracking-widest transition-colors hover:text-signal focus-visible:text-signal ${
              isActive ? 'text-signal' : 'text-on-surface-variant'
            }`}
          >
            Leistungen
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="transition-transform duration-200 group-data-[state=open]:rotate-180"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </NavMenuPrimitive.Trigger>

          {/* ── Panel content ────────────────────────── */}
          <NavMenuPrimitive.Content
            data-nav-content
            className="absolute left-0 top-0 w-auto"
          >
            <div className="w-[420px] p-2">

              {/* Header */}
              <div className="mb-1.5 flex items-center justify-between px-3 pb-1.5 border-b border-border-dark">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-on-surface/30">Unsere Leistungen</span>
                <NavMenuPrimitive.Link asChild>
                  <Link
                    href="/leistungen"
                    className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.15em] text-signal/60 transition-colors hover:text-signal"
                  >
                    Alle ansehen
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </Link>
                </NavMenuPrimitive.Link>
              </div>

              {/* Service links */}
              <div className="flex flex-col">
                {leistungenServices.map((svc, i) => {
                  const href = `/leistungen/${svc.slug}`
                  const active = pathname === href
                  return (
                    <div key={svc.slug}>
                      {i > 0 && <div className="mx-3 h-px bg-border-dark" />}
                      <NavMenuPrimitive.Link asChild>
                        <Link
                          href={href}
                          className={`group/item flex select-none flex-col gap-0.5 rounded-lg px-3 py-2.5 outline-none transition-colors focus-visible:bg-deep/60 ${
                            active
                              ? 'bg-deep/50 text-signal'
                              : 'hover:bg-deep/40'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`h-1 w-1 flex-shrink-0 rounded-full transition-colors ${
                                active ? 'bg-signal' : 'bg-on-surface/20 group-hover/item:bg-signal/50'
                              }`}
                            />
                            <span
                              className={`font-mono text-xs font-bold uppercase tracking-widest transition-colors ${
                                active
                                  ? 'text-signal'
                                  : 'text-on-surface group-hover/item:text-signal'
                              }`}
                            >
                              {svc.label}
                            </span>
                          </div>
                          <p className="ml-3 text-xs leading-snug text-on-surface/45">
                            {taglineBySlug[svc.slug]}
                          </p>
                        </Link>
                      </NavMenuPrimitive.Link>
                    </div>
                  )
                })}
              </div>

            </div>
          </NavMenuPrimitive.Content>

        </NavMenuPrimitive.Item>
      </NavMenuPrimitive.List>

      {/* ── Viewport — renders the active content ───── */}
      <div className="absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2">
        <NavMenuPrimitive.Viewport
          data-nav-viewport
          className="origin-[top_center] overflow-hidden rounded-xl border border-border-dark bg-deep shadow-2xl"
          style={{ width: 'var(--radix-navigation-menu-viewport-width)', height: 'var(--radix-navigation-menu-viewport-height)' }}
        />
      </div>
    </NavMenuPrimitive.Root>
  )
}
