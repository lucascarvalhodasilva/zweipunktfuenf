'use client'

import { useEffect, useRef } from 'react'

const CELL          = 44
const SCAN_DURATION = 8000   // ms
const LINE_ALPHA    = 0.12
const SIGMA_WAKE    = 110    // how far the gravitational wake extends above the scan (px)
const SIGMA_AHEAD   = 50     // how far the pull reaches below the scan (px)
const AMP_H         = 26     // max vertical displacement of horizontal lines (px)
const AMP_V         = 20     // max vertical bend amplitude of vertical line segments (px)

// Derivative-of-Gaussian gravity: pulls every grid point toward scanY.
// Zero displacement at the scan itself; peak pull at dist = ±sigma; decays to 0 far away.
// Asymmetric sigma gives a longer wake above than pull-ahead below.
function gravOff(dist, amp) {
  const sigma = dist <= 0 ? SIGMA_WAKE : SIGMA_AHEAD
  const t = dist / sigma
  return -amp * t * Math.exp(-0.5 * t * t)
}

export default function GridWarp() {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      if (prefersReduced) drawStatic()
    }

    function drawStatic() {
      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)
      ctx.lineWidth = 1
      ctx.strokeStyle = `rgba(91,141,238,${LINE_ALPHA})`
      for (let y = 0; y <= height + CELL; y += CELL) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke()
      }
      for (let x = 0; x <= width + CELL; x += CELL) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke()
      }
    }

    function drawFrame(ts) {
      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)

      // Scan centre travels from -0.5h → 1.5h over SCAN_DURATION
      const progress = (ts % SCAN_DURATION) / SCAN_DURATION
      const scanY = (progress * 2 - 0.5) * height

      ctx.lineWidth = 1

      // ── Horizontal lines — shift uniformly in Y toward scanY ──────────────
      for (let row = 0; row * CELL <= height + CELL; row++) {
        const baseY = row * CELL
        const dist  = baseY - scanY
        const yOff  = gravOff(dist, AMP_H)

        // Brighten lines in the gravitational field
        const sigma      = dist <= 0 ? SIGMA_WAKE : SIGMA_AHEAD
        const brightness = Math.exp(-0.5 * (dist / sigma) ** 2)
        const alpha      = LINE_ALPHA + brightness * 0.28

        ctx.beginPath()
        ctx.moveTo(0, baseY + yOff)
        ctx.lineTo(width, baseY + yOff)
        ctx.strokeStyle = `rgba(91,141,238,${alpha.toFixed(3)})`
        ctx.stroke()
      }

      // ── Vertical lines — each segment pulled in Y toward scanY ────────────
      // Creates the classic spacetime S-curve bending around the mass
      for (let col = 0; col * CELL <= width + CELL; col++) {
        const baseX = col * CELL
        ctx.beginPath()

        const steps = Math.max(100, Math.ceil(height / 2))
        const sh    = height / steps

        for (let i = 0; i <= steps; i++) {
          const y    = i * sh
          const dist = y - scanY
          const yOff = gravOff(dist, AMP_V)
          i === 0
            ? ctx.moveTo(baseX, y + yOff)
            : ctx.lineTo(baseX, y + yOff)
        }

        ctx.strokeStyle = `rgba(91,141,238,${LINE_ALPHA})`
        ctx.stroke()
      }

      // ── Scan glow ─────────────────────────────────────────────────────────
      const grd = ctx.createLinearGradient(0, scanY - 90, 0, scanY + 90)
      grd.addColorStop(0,    'rgba(91,141,238,0)')
      grd.addColorStop(0.38, 'rgba(91,141,238,0.03)')
      grd.addColorStop(0.5,  'rgba(91,141,238,0.13)')
      grd.addColorStop(0.62, 'rgba(91,141,238,0.03)')
      grd.addColorStop(1,    'rgba(91,141,238,0)')
      ctx.fillStyle = grd
      ctx.fillRect(0, scanY - 90, width, 180)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    if (prefersReduced) {
      return () => ro.disconnect()
    }

    let startTs = null
    function frame(ts) {
      if (!startTs) startTs = ts
      drawFrame(ts - startTs)
      rafRef.current = requestAnimationFrame(frame)
    }
    rafRef.current = requestAnimationFrame(frame)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 h-full w-full z-[-1]"
      aria-hidden="true"
    />
  )
}
