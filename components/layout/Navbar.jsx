"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { navLinks } from '@/lib/constants'
import Button from '@/components/ui/Button'

export default function Navbar() {
  const [isAtTop, setIsAtTop] = useState(true)

  useEffect(() => {
    const updateScrollState = () => {
      setIsAtTop(window.scrollY <= 8)
    }

    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateScrollState)
    }
  }, [])

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        isAtTop
          ? 'border-b border-transparent bg-transparent backdrop-blur-0'
          : 'border-b border-[var(--color-border)] bg-[rgba(10,10,10,0.8)] backdrop-blur'
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 py-4 md:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="font-mono text-lg font-bold tracking-[0.2em] text-[var(--color-accent)] uppercase"
          >
            <span>zweipunkt</span>
            <span className="text-white">fünf</span>
          </Link>
          <div className="hidden flex-1 items-center justify-center gap-6 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)]"
              >
                {link.label}
              </a>
            ))}
          </div>
          <Button href="#kontakt" variant="primary">
            Projekt starten
          </Button>
        </div>
        <div className="mt-4 flex items-center justify-center gap-4 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
