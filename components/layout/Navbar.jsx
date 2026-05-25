"use client"

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

import { navLinks } from '@/lib/constants'
import Button from '@/components/ui/Button'

export default function Navbar() {
  const [isAtTop, setIsAtTop] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const toggleRef = useRef(null)
  const headerRef = useRef(null)
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
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          isAtTop && !menuOpen
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
            <div className="hidden md:block">
              <Button href="#kontakt" variant="primary">
                Projekt starten
              </Button>
            </div>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
              className="relative flex h-10 w-10 items-center justify-center md:hidden"
            >
              <span
                className={`absolute h-0.5 w-5 bg-[var(--color-text)] transition-transform duration-300 ${
                  menuOpen ? 'translate-y-0 rotate-45' : '-translate-y-1.5'
                }`}
              />
              <span
                className={`absolute h-0.5 w-5 bg-[var(--color-text)] transition-opacity duration-300 ${
                  menuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute h-0.5 w-5 bg-[var(--color-text)] transition-transform duration-300 ${
                  menuOpen ? 'translate-y-0 -rotate-45' : 'translate-y-1.5'
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay — sibling to nav, outside its stacking context */}
      <div
        className={`fixed inset-0 z-40 transition-[opacity,visibility] duration-300 md:hidden ${
          menuOpen
            ? 'visible opacity-100'
            : 'invisible opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
      >
        <div className="absolute inset-0 bg-[rgba(10,10,10,0.97)] backdrop-blur-md" />
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          className="relative flex h-full flex-col items-center justify-center gap-8 px-5"
          onClick={(event) => event.stopPropagation()}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="font-mono text-sm uppercase tracking-[0.25em] text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)]"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4">
            <Button href="#kontakt" variant="primary" onClick={closeMenu}>
              Projekt starten
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
