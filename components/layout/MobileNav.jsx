'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { RiLayoutGridLine } from 'react-icons/ri'

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function MobileNav() {
  const pathname = usePathname()

  function scrollToAbout(e) {
    e.preventDefault()
    if (pathname !== '/') {
      window.location.href = '/#ueber-uns'
      return
    }
    const el = document.getElementById('ueber-uns')
    if (!el) return
    const container = document.getElementById('snap-container')
    const snapEl = el.closest('.snap-start') ?? el
    if (container) {
      const top = snapEl.getBoundingClientRect().top + container.scrollTop
      container.style.scrollSnapType = 'none'
      container.scrollTo({ top, behavior: 'instant' })
      requestAnimationFrame(() => requestAnimationFrame(() => { container.style.scrollSnapType = '' }))
    }
  }
  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed bottom-0 z-50 w-full border-t border-border-dark bg-deep md:hidden"
    >
      <div className="flex h-16 items-center justify-around px-4">
        <a
          href="#top"
          onClick={(e) => { e.preventDefault(); scrollToSection('top') }}
          className="flex flex-col items-center gap-1 text-on-surface-variant transition-colors hover:text-signal active:scale-90"
        >
          <RiLayoutGridLine size={22} />
          <span className="font-mono text-[10px] uppercase tracking-widest">Start</span>
        </a>
        <Link
          href="/leistungen"
          className="flex flex-col items-center gap-1 text-on-surface-variant transition-colors hover:text-signal active:scale-90"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" />
            <circle cx="6" cy="6" r="1" fill="currentColor" />
            <circle cx="6" cy="12" r="1" fill="currentColor" />
            <circle cx="6" cy="18" r="1" fill="currentColor" />
          </svg>
          <span className="font-mono text-[10px] uppercase tracking-widest">Leistungen</span>
        </Link>
        <a
          href="#prozess"
          onClick={(e) => { e.preventDefault(); scrollToSection('prozess') }}
          className="flex flex-col items-center gap-1 text-on-surface-variant transition-colors hover:text-signal active:scale-90"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
            <rect x="9" y="3" width="6" height="4" rx="1" />
            <path d="M9 12h6M9 16h4" />
          </svg>
          <span className="font-mono text-[10px] uppercase tracking-widest">14 Tagen</span>
        </a>
        <a
          href="#ueber-uns"
          onClick={scrollToAbout}
          className="flex flex-col items-center gap-1 text-on-surface-variant transition-colors hover:text-signal active:scale-90"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="9" cy="7" r="3" />
            <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            <path d="M21 21v-2a4 4 0 0 0-3-3.85" />
          </svg>
          <span className="font-mono text-[10px] uppercase tracking-widest">Team</span>
        </a>

      </div>
    </nav>
  )
}
