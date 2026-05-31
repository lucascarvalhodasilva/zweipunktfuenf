'use client'

import { useEffect, useRef } from 'react'

/**
 * Wraps a snap section with direction-aware reveal animations.
 *
 * Two IntersectionObservers:
 *   - threshold 0   → reset when section fully exits viewport
 *   - threshold 0.85 → trigger when section is essentially snapped (≥ 85 % visible)
 *
 * Scroll direction is tracked via a passive scroll listener and stamped onto
 * data-direction before `is-visible` is added, so CSS can vary the animation
 * based on whether the user scrolled down (eyebrow wipes left→right) or
 * up (eyebrow wipes right→left, content drops in from above).
 */
export default function SnapReveal({ children, className = '' }) {
  const ref = useRef(null)
  const prevScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0)
  const directionRef = useRef('down')

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      el.classList.add('is-visible')
      return
    }

    function onScroll() {
      const y = window.scrollY
      directionRef.current = y >= prevScrollY.current ? 'down' : 'up'
      prevScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Reset when section fully exits the viewport so animation replays on re-entry.
    const exitObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          el.classList.remove('is-visible')
          delete el.dataset.direction
        }
      },
      { threshold: 0 },
    )

    // Trigger once the section is ≥ 85 % visible — scroll-snap has settled.
    const snapObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.direction = directionRef.current
          el.classList.add('is-visible')
        }
      },
      { threshold: 0.85 },
    )

    exitObserver.observe(el)
    snapObserver.observe(el)

    return () => {
      exitObserver.disconnect()
      snapObserver.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`snap-section snap-start h-[100svh] overflow-hidden ${className}`.trim()}
    >
      {children}
    </div>
  )
}
