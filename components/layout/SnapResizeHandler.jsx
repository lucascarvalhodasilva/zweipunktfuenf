'use client'

import { useEffect } from 'react'

/**
 * Re-snaps to the closest snap section after a resize.
 *
 * Two resize sources are handled:
 *  - window.resize          — general viewport resize (desktop drag, orientation)
 *  - visualViewport.resize  — Safari URL bar show/hide (window.resize does NOT
 *                             fire for this on iOS Safari)
 *
 * For visualViewport changes snap is disabled immediately so the snap engine
 * cannot mis-snap while the URL bar is animating. After the animation settles
 * (debounced 100 ms) we re-snap to whichever section is closest and restore.
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
      if (raf1) cancelAnimationFrame(raf1)
      if (raf2) cancelAnimationFrame(raf2)
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          html.style.scrollSnapType = ''
        })
      })
    }

    // General resize (desktop window drag, orientation change)
    function onResize() {
      clearTimeout(timer)
      timer = setTimeout(snapToCurrentSection, 150)
    }

    // Safari URL bar show/hide — disable snap immediately so the engine
    // cannot re-snap while the bar is animating, then settle and re-snap.
    function onVisualViewportResize() {
      document.documentElement.style.scrollSnapType = 'none'
      clearTimeout(timer)
      timer = setTimeout(snapToCurrentSection, 100)
    }

    window.addEventListener('resize', onResize)
    window.visualViewport?.addEventListener('resize', onVisualViewportResize)

    return () => {
      window.removeEventListener('resize', onResize)
      window.visualViewport?.removeEventListener('resize', onVisualViewportResize)
      clearTimeout(timer)
      if (raf1) cancelAnimationFrame(raf1)
      if (raf2) cancelAnimationFrame(raf2)
    }
  }, [])

  return null
}
