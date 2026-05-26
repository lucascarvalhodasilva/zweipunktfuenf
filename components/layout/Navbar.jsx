'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

import { navLinks } from '@/lib/constants'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const toggleRef = useRef(null)

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 8)
    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    toggleRef.current?.focus()
  }, [])

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeMenu()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen, closeMenu])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Focus trap inside mobile menu
  useEffect(() => {
    if (!menuOpen || !menuRef.current) return

    const menu = menuRef.current
    const focusableSelector =
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

    const handleTab = (e) => {
      if (e.key !== 'Tab') return

      const focusable = menu.querySelectorAll(focusableSelector)
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    menu.addEventListener('keydown', handleTab)

    // Focus the first focusable element when menu opens
    const firstFocusable = menu.querySelector(focusableSelector)
    firstFocusable?.focus()

    return () => menu.removeEventListener('keydown', handleTab)
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 ${
          isScrolled || menuOpen
            ? 'border-b border-border-dark bg-midnight/80 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav className="mx-auto flex h-14 max-w-[1280px] items-center justify-between px-8">
          <Link href="/" className="font-mono text-sm font-bold tracking-wider text-on-surface">
            <span>zweipunkt</span>
            <span className="text-signal">fünf</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-xs uppercase tracking-widest text-on-surface-variant transition-colors hover:text-signal"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden h-9 items-center rounded-lg border border-border-signal px-5 font-mono text-xs uppercase tracking-widest text-on-surface transition-colors hover:bg-deep md:inline-flex"
          >
            Projekt starten
          </a>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
            className="relative flex h-10 w-10 items-center justify-center md:hidden"
          >
            <span className={`absolute h-0.5 w-5 bg-on-surface transition-transform duration-300 ${menuOpen ? 'translate-y-0 rotate-45' : '-translate-y-1.5'}`} />
            <span className={`absolute h-0.5 w-5 bg-on-surface transition-opacity duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute h-0.5 w-5 bg-on-surface transition-transform duration-300 ${menuOpen ? 'translate-y-0 -rotate-45' : 'translate-y-1.5'}`} />
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 transition-[opacity,visibility] duration-300 md:hidden ${
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
      >
        <div className="absolute inset-0 bg-midnight/[0.97] backdrop-blur-md" />
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          className="relative flex h-full flex-col items-center justify-center gap-10 px-8"
          onClick={(e) => e.stopPropagation()}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="font-mono text-sm uppercase tracking-widest text-on-surface transition-colors hover:text-signal"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={closeMenu}
            className="mt-4 inline-flex h-10 items-center rounded-lg bg-signal px-8 font-mono text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-90"
          >
            Projekt starten
          </a>
        </div>
      </div>
    </>
  )
}
