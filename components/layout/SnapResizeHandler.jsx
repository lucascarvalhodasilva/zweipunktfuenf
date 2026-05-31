'use client'

import { useEffect } from 'react'

/**
 * Re-snaps to the closest snap section after a window resize.
 *
 * Resize changes 100svh, shifting all snap boundaries. Without this, the
 * scroll position can end up between snap points and the engine snaps to the
 * wrong section.
 */
export default function SnapResizeHandler() {
  useEffect(() => {
    let timer = null
    let raf1 = null
    let raf2 = null

    function snapToCurrentSection() {
      const sections = document.querySelectorAll('.snap-section')
      if (!sections.length) return

      let closest = null
      let closestDist = Infinity

      sections.forEach((section) => {
        const dist = Math.abs(section.getBoundingClientRect().top)
        if (dist < closestDist) {
          closestDist = dist
          closest = section
        }
      })

      if (!closest) return

      const html = document.documentElement
      const top = closest.getBoundingClientRect().top + window.scrollY
      html.style.scrollSnapType = 'none'
      window.scrollTo({ top, behavior: 'instant' })
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          html.style.scrollSnapType = ''
        })
      })
    }

    function onResize() {
      clearTimeout(timer)
      timer = setTimeout(snapToCurrentSection, 150)
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      clearTimeout(timer)
      if (raf1) cancelAnimationFrame(raf1)
      if (raf2) cancelAnimationFrame(raf2)
    }
  }, [])

  return null
}
