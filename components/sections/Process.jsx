'use client'

import { useEffect, useRef, useState } from 'react'

import { process as processContent } from '@/lib/content'

const STEP_DURATION = 5000

// Static browser-mockup content per step
const StepVisuals = [
  // Step 0 — Konzeption
  <div key="0" className="space-y-3">
    <div className="h-7 w-1/2 rounded bg-slate/60 px-2 flex items-center">
      <span className="font-mono text-[9px] text-on-surface/50">Projekt-Briefing</span>
    </div>
    <div className="h-3.5 w-full rounded bg-slate/30 flex items-center px-2">
      <span className="font-mono text-[8px] text-on-surface/40">Hauptziel: Conversion steigern</span>
    </div>
    <div className="h-3.5 w-3/4 rounded bg-slate/30 flex items-center px-2">
      <span className="font-mono text-[8px] text-on-surface/40">Zielgruppe: Tech-Unternehmen</span>
    </div>
    <div className="mt-4 grid grid-cols-2 gap-3">
      <div className="h-16 rounded border border-border-dark bg-deep flex items-center justify-center">
        <span className="font-mono text-[8px] text-on-surface-variant">Sitemap</span>
      </div>
      <div className="h-16 rounded border border-border-dark bg-deep flex items-center justify-center">
        <span className="font-mono text-[8px] text-on-surface-variant">Leistungen</span>
      </div>
    </div>
  </div>,
  // Step 1 — Design
  <div key="1" className="space-y-4">
    <div className="flex gap-3">
      <div className="h-10 w-10 rounded-full bg-signal" />
      <div className="h-10 w-10 rounded-full border border-signal bg-deep" />
      <div className="h-10 w-10 rounded-full border border-border-dark bg-midnight" />
    </div>
    <div className="grid grid-cols-3 gap-2">
      {['Farben', 'Typo', 'Tokens'].map((label) => (
        <div key={label} className="flex h-20 flex-col items-center justify-center gap-1 rounded border border-border-dark bg-deep">
          <div className="h-4 w-4 rounded bg-signal/40" />
          <span className="font-mono text-[8px] text-on-surface-variant">{label}</span>
        </div>
      ))}
    </div>
  </div>,
  // Step 2 — Implementierung
  <div key="2" className="flex flex-col justify-center h-full">
    <div className="rounded border border-border-dark bg-midnight/80 p-3 font-mono text-xs text-signal/70">
      <span className="text-on-surface-variant">export default function </span>
      <span className="text-signal">Startseite</span>() {'{'}<br />
      &nbsp;&nbsp;<span className="text-on-surface-variant">return</span> (<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-signal">main</span>&gt;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-signal">main</span>&gt;<br />
      &nbsp;&nbsp;)<br />
      {'}'}
    </div>
  </div>,
  // Step 3 — Launch
  <div key="3" className="flex h-full flex-col gap-3">
    <div className="flex h-10 items-center justify-between rounded border border-signal/30 bg-deep px-3">
      <span className="font-mono text-[10px]">zweipunktfuenf.de</span>
      <span className="flex items-center gap-1.5 font-mono text-[10px] text-green-400">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
        LIVE
      </span>
    </div>
    <div className="grid flex-grow grid-cols-2 gap-3">
      {[['Uptime', '100%'], ['Performance', '99/100']].map(([lbl, val]) => (
        <div key={lbl} className="flex flex-col justify-center rounded border border-border-dark bg-deep p-3">
          <p className="font-mono text-[9px] text-on-surface-variant">{lbl}</p>
          <p className="font-mono text-lg font-bold text-on-surface">{val}</p>
        </div>
      ))}
    </div>
  </div>,
]

export default function Process() {
  const [activeStep, setActiveStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const startTimeRef = useRef(Date.now())
  const rafRef = useRef(null)
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  function goToStep(index) {
    setActiveStep(index)
    setProgress(0)
    startTimeRef.current = Date.now()
  }

  useEffect(() => {
    if (prefersReducedMotion) return

    function tick() {
      const elapsed = Date.now() - startTimeRef.current
      const pct = Math.min((elapsed / STEP_DURATION) * 100, 100)
      setProgress(pct)
      if (pct >= 100) {
        goToStep((prev) => (prev + 1) % processContent.steps.length)
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep, prefersReducedMotion])

  return (
    <section id="prozess" className="py-24 px-8">
      <div className="mx-auto max-w-[1280px]">
        {/* label */}
        <div className="mb-8 flex items-center gap-4">
          <span className="font-mono text-xs text-signal">{processContent.label}</span>
          <div className="h-px flex-grow bg-border-dark" />
        </div>

        {/* heading */}
        <h2 className="mb-12 text-[clamp(1.75rem,4vw,2.5rem)] font-light leading-tight tracking-tight text-on-surface">
          {processContent.heading}
        </h2>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* Steps accordion */}
          <div className="space-y-1">
            {processContent.steps.map((step, i) => {
              const isActive = i === activeStep
              return (
                <button
                  key={step.number}
                  onClick={() => goToStep(i)}
                  className={`w-full border-l-2 p-6 text-left transition-colors duration-300 ${
                    isActive ? 'border-signal' : 'border-border-dark'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className={`font-mono text-sm transition-colors ${isActive ? 'text-signal' : 'text-signal/40'}`}>
                      {step.number}
                    </span>
                    <div className="flex-grow">
                      <h3 className="text-left font-body text-base font-medium text-on-surface">
                        {step.title}
                      </h3>

                      {/* expanded content */}
                      <div
                        className={`overflow-hidden transition-all duration-500 ${
                          isActive ? 'max-h-64 mt-3' : 'max-h-0'
                        }`}
                      >
                        {/* tags */}
                        <div className="mb-3 flex flex-wrap gap-2">
                          {step.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded border border-border-dark px-2 py-0.5 font-mono text-[10px] uppercase text-on-surface-variant"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <p className="text-sm text-on-surface-variant">{step.description}</p>

                        {/* progress bar */}
                        <div className="mt-4 h-0.5 w-full overflow-hidden rounded-full bg-border-dark">
                          <div
                            className="h-full bg-signal"
                            style={{ width: `${prefersReducedMotion ? 100 : progress}%`, transition: prefersReducedMotion ? 'none' : 'width 0.1s linear' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Browser mockup preview */}
          <div className="glass-card sticky top-20 aspect-[4/3] overflow-hidden rounded-xl border border-border-dark">
            {/* browser chrome */}
            <div className="flex h-7 items-center gap-1.5 border-b border-border-dark bg-deep px-3">
              <div className="h-2 w-2 rounded-full bg-error-color/40" />
              <div className="h-2 w-2 rounded-full bg-tertiary/40" />
              <div className="h-2 w-2 rounded-full bg-signal/40" />
            </div>
            {/* content */}
            <div className="relative flex-grow p-5">
              {processContent.steps.map((_, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 p-5 transition-opacity duration-500 ${
                    i === activeStep ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  {StepVisuals[i]}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
