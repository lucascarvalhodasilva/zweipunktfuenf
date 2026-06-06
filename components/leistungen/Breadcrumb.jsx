'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { leistungenServices } from '@/lib/constants'

export default function Breadcrumb() {
  const pathname = usePathname()
  if (pathname === '/leistungen') return null

  const slug = pathname.split('/').pop()
  const current = leistungenServices.find((s) => s.slug === slug)
  if (!current) return null

  return (
    <div className="sticky top-14 z-40 flex h-10 items-center gap-2 border-b border-border-dark bg-midnight/90 px-5 backdrop-blur-sm md:hidden">
      <Link
        href="/leistungen"
        className="flex items-center gap-1.5 font-mono text-[11px] text-on-surface-variant transition-colors hover:text-signal"
        aria-label="Zurück zu Alle Leistungen"
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M19 12H5M5 12l7-7M5 12l7 7" />
        </svg>
        Leistungen
      </Link>
      <span className="font-mono text-[11px] text-on-surface/30">/</span>
      <span className="font-mono text-[11px] text-signal">{current.label}</span>
    </div>
  )
}
