'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { leistungenServices } from '@/lib/constants'

export default function LeistungenNav() {
  const pathname = usePathname()
  const isRoot = pathname === '/leistungen'

  return (
    <nav
      aria-label="Leistungen navigation"
      className="hidden md:flex w-52 flex-shrink-0 flex-col gap-0.5 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto border-r border-border-dark py-8 pr-4"
    >
      {/* Root link */}
      <Link
        href="/leistungen"
        className={`flex items-center gap-2 rounded-lg px-3 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
          isRoot
            ? 'text-signal'
            : 'text-on-surface-variant hover:text-signal'
        }`}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
        Alle Leistungen
      </Link>

      {/* Divider */}
      <div className="my-2 h-px bg-border-dark" />

      {/* Service links */}
      {leistungenServices.map((svc) => {
        const href = `/leistungen/${svc.slug}`
        const isActive = pathname === href
        return (
          <Link
            key={svc.slug}
            href={href}
            className={`group flex items-center gap-2 rounded-lg border-l-2 py-2.5 pl-3 pr-2 text-sm transition-colors ${
              isActive
                ? 'border-signal bg-deep/40 text-signal'
                : 'border-transparent text-on-surface-variant hover:border-signal/40 hover:bg-deep/20 hover:text-on-surface'
            }`}
          >
            <span className={`h-1 w-1 flex-shrink-0 rounded-full transition-colors ${isActive ? 'bg-signal' : 'bg-on-surface/25 group-hover:bg-signal/50'}`} />
            {svc.label}
          </Link>
        )
      })}
    </nav>
  )
}
