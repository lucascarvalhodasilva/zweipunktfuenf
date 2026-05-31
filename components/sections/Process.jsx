'use client'

import { useState } from 'react'

import Eyebrow from '@/components/layout/Eyebrow'
import { process as processContent } from '@/lib/content'

const STEP_DURATION = 5000

// Static browser-mockup content per step
const StepVisuals = [

  // ─── Step 0 — Discovery & Konzeption ──────────────────────────────
  <div key="0" className="flex flex-1 min-h-0 flex-col gap-0">

    <div className="flex items-center justify-between border-b border-border-dark px-4 py-2">
      <div className="flex items-center gap-2">
        <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
        <span className="font-mono text-[8px] text-on-surface/70">Discovery Call · läuft</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-mono text-[7px] text-on-surface-variant">00:23:41</span>
        <div className="rounded border border-signal/30 bg-signal/10 px-1.5 py-0.5">
          <span className="font-mono text-[7px] text-signal">● Aufnahme</span>
        </div>
      </div>
    </div>

    <div className="flex flex-1 overflow-hidden">

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="border-b border-border-dark px-3 py-1.5">
          <p className="font-mono text-[7px] uppercase tracking-[0.12em] text-on-surface-variant">Projekt-Anforderungen</p>
        </div>
        <div className="flex flex-col gap-1.5 overflow-auto p-3">
          {[
            { k: 'Ziel',       v: 'B2B-Leads via organischen Suchtraffic', ok: true  },
            { k: 'Zielgruppe', v: 'IT-Entscheider · 35–55 · DACH',         ok: true  },
            { k: 'Stack',      v: 'Next.js · Tailwind · Vercel',            ok: true  },
            { k: 'Timeline',   v: '14 Werktage · Festpreis ab 999 €',       ok: true  },
            { k: 'KPIs',       v: 'CTA-Rate > 4 % · Bounce < 55 %',        ok: false },
          ].map(({ k, v, ok }) => (
            <div key={k} className={`rounded border px-2.5 py-1.5 ${ok ? 'border-signal/20 bg-signal/5' : 'border-border-dark bg-midnight/40'}`}>
              <div className="mb-0.5 flex items-center justify-between">
                <span className="font-mono text-[6.5px] uppercase tracking-[0.1em] text-on-surface-variant">{k}</span>
                <span className={`font-mono text-[7px] ${ok ? 'text-signal' : 'text-on-surface/25'}`}>{ok ? '✓' : '…'}</span>
              </div>
              <p className={`font-mono text-[8.5px] ${ok ? 'text-on-surface/80' : 'text-on-surface/25'}`}>{ok ? v : '—'}</p>
            </div>
          ))}
          <div className="rounded border border-signal/40 px-2.5 py-2 ring-1 ring-signal/15">
            <p className="font-mono text-[6.5px] uppercase tracking-[0.1em] text-signal/60 mb-1">Besonderheiten</p>
            <div className="flex items-center gap-1">
              <span className="font-mono text-[8.5px] text-on-surface/50">Barrierefreiheit WCAG 2.1 AA</span>
              <span className="animate-pulse font-mono text-[8.5px] text-signal">▌</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-28 flex-shrink-0 flex-col border-l border-border-dark">
        <div className="border-b border-border-dark px-3 py-1.5">
          <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-on-surface-variant">Sitemap</p>
        </div>
        <div className="flex flex-col gap-0.5 p-3">
          {[
            { label: '/',           depth: 0, active: true  },
            { label: '/leistungen', depth: 1, active: true  },
            { label: '/prozess',    depth: 1, active: true  },
            { label: '/arbeiten',   depth: 1, active: true  },
            { label: '/kontakt',    depth: 1, active: true  },
            { label: '/blog',       depth: 1, active: false },
          ].map(({ label, depth, active }) => (
            <div key={label} className="flex items-center gap-1.5" style={{ paddingLeft: depth * 8 }}>
              <div className={`h-1 w-1 flex-shrink-0 rounded-full ${active ? 'bg-signal/60' : 'bg-on-surface/15'}`} />
              <span className={`font-mono text-[7px] ${active ? 'text-on-surface/60' : 'text-on-surface/25'}`}>{label}</span>
              {!active && <span className="font-mono text-[5.5px] text-on-surface/20">v2</span>}
            </div>
          ))}
        </div>
        <div className="mt-auto border-t border-border-dark p-3">
          <div className="mb-1 flex items-center justify-between">
            <span className="font-mono text-[7px] text-on-surface-variant">Vollständig</span>
            <span className="font-mono text-[7px] text-signal">83 %</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-border-dark">
            <div className="h-full w-[83%] rounded-full bg-signal/60" />
          </div>
        </div>
      </div>

    </div>

    <div className="flex items-center justify-between border-t border-border-dark px-4 py-1.5">
      <span className="font-mono text-[7px] text-on-surface-variant">5 / 6 Punkte bestätigt · auto-gespeichert</span>
      <div className="flex gap-0.5">
        {[1,2,3,4,5,6].map((s) => (
          <div key={s} className={`h-1 w-4 rounded-full ${s <= 5 ? 'bg-signal' : 'bg-border-dark'}`} />
        ))}
      </div>
    </div>

  </div>,

  // ─── Step 1 — Design System ───────────────────────────────────────
  <div key="1" className="flex flex-1 min-h-0 flex-col gap-0">

    <div className="flex items-stretch border-b border-border-dark">
      {['Tokens', 'Komponenten', 'Screens'].map((tab, i) => (
        <div key={tab} className={`flex items-center gap-1.5 border-r border-border-dark px-3 py-1.5 font-mono text-[8px] ${i === 0 ? '-mb-px border-b-2 border-b-signal bg-midnight text-on-surface/80' : 'text-on-surface-variant'}`}>
          {tab}
        </div>
      ))}
      <div className="ml-auto flex items-center px-3">
        <span className="font-mono text-[7px] text-signal">v2.4 · Freigabe ✓</span>
      </div>
    </div>

    <div className="flex flex-1 flex-col gap-3 overflow-auto p-3">

      <div>
        <p className="font-mono text-[7px] uppercase tracking-[0.12em] text-on-surface-variant mb-1.5">Farb-Tokens</p>
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { name: 'midnight', hex: '#07111F', cls: 'bg-[#07111F] border border-white/10' },
            { name: 'signal',   hex: '#5B8DEE', cls: 'bg-[#5B8DEE]' },
            { name: 'deep',     hex: '#0D1F3C', cls: 'bg-[#0D1F3C] border border-white/10' },
            { name: 'surface',  hex: '#E1E2EA', cls: 'bg-[#E1E2EA]' },
          ].map(({ name, hex, cls }) => (
            <div key={name} className="flex flex-col gap-1">
              <div className={`h-7 rounded-lg ${cls}`} />
              <p className="font-mono text-[6px] text-on-surface/60">{name}</p>
              <p className="font-mono text-[6px] text-on-surface/30">{hex}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="font-mono text-[7px] uppercase tracking-[0.12em] text-on-surface-variant mb-1.5">Schriftschnitte · DM Sans</p>
        <div className="divide-y divide-border-dark rounded border border-border-dark bg-midnight/40">
          {[
            { name: 'Display', size: '6rem',    w: '700' },
            { name: 'H2',      size: '2.5rem',  w: '300' },
            { name: 'Body',    size: '1rem',    w: '400' },
            { name: 'Mono',    size: '0.75rem', w: '400' },
          ].map(({ name, size, w }) => (
            <div key={name} className="flex items-center gap-3 px-2.5 py-1">
              <span className="w-10 font-mono text-[6.5px] text-signal/60">{name}</span>
              <span className="w-10 font-mono text-[6.5px] text-on-surface/30">{size}</span>
              <span className="w-6 font-mono text-[6.5px] text-on-surface/20">{w}</span>
              <div className="flex-1 h-px bg-border-dark" />
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="font-mono text-[7px] uppercase tracking-[0.12em] text-on-surface-variant mb-1.5">Komponenten</p>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="w-14 font-mono text-[6px] text-on-surface/25">Button</span>
            <div className="rounded-lg bg-signal px-2.5 py-1"><span className="font-mono text-[7px] text-white">Primary</span></div>
            <div className="rounded-lg border border-border-dark px-2.5 py-1"><span className="font-mono text-[7px] text-on-surface/50">Ghost</span></div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-14 font-mono text-[6px] text-on-surface/25">Card</span>
            <div className="flex-1 rounded border border-border-dark bg-deep/40 px-2 py-1.5">
              <div className="mb-1 h-1 w-10 rounded bg-on-surface/15" />
              <div className="h-1 w-7 rounded bg-on-surface/10" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-14 font-mono text-[6px] text-on-surface/25">Badge</span>
            <div className="rounded border border-border-dark px-2 py-0.5"><span className="font-mono text-[7px] uppercase text-on-surface/50">Mono</span></div>
            <div className="rounded border border-signal/30 bg-signal/10 px-2 py-0.5"><span className="font-mono text-[7px] text-signal">Signal</span></div>
          </div>
        </div>
      </div>

    </div>

    <div className="flex items-center justify-between border-t border-border-dark px-3 py-1">
      <span className="font-mono text-[7px] text-on-surface-variant">24 Tokens · 18 Komponenten · 6 Screens</span>
      <span className="font-mono text-[7px] text-signal/60">Figma → Entwickler-Übergabe</span>
    </div>

  </div>,

  // ─── Step 2 — Implementierung & CI/CD ────────────────────────────
  <div key="2" className="flex flex-1 min-h-0 flex-col gap-0">

    <div className="flex items-stretch border-b border-border-dark bg-midnight/60">
      {['Pipeline', 'Commits', 'Preview'].map((tab, i) => (
        <div key={tab} className={`flex items-center gap-1.5 border-r border-border-dark px-3 py-1.5 font-mono text-[8px] ${i === 0 ? '-mb-px border-b-2 border-b-signal bg-midnight text-on-surface/80' : 'text-on-surface-variant'}`}>
          <div className={`h-1.5 w-1.5 rounded-full ${i === 0 ? 'bg-signal' : 'bg-on-surface/20'}`} />
          {tab}
        </div>
      ))}
      <div className="ml-auto flex items-center px-3">
        <span className="font-mono text-[7px] text-green-400">✓ Alle Checks bestanden</span>
      </div>
    </div>

    <div className="flex flex-1 overflow-hidden">
      <div className="flex flex-1 flex-col gap-2 overflow-auto p-3">

        <p className="font-mono text-[7px] uppercase tracking-[0.12em] text-on-surface-variant">CI/CD · main → Produktion</p>

        <div className="flex flex-col divide-y divide-border-dark/50">
          {[
            { step: 'ESLint · TypeScript-Prüfung', time: '8s',  ok: true,          },
            { step: 'Vitest · 24 Unit-Tests',    time: '14s', ok: true,          },
            { step: 'next build',                time: '23s', ok: true,          },
            { step: 'Lighthouse CI ≥ 90',        time: '31s', ok: true, badge: '98' },
            { step: 'Deployment → Vercel Edge',  time: '9s',  ok: true,          },
            { step: 'E2E-Tests',                 time: '5s',  ok: true,          },
          ].map(({ step, time, ok, badge }) => (
            <div key={step} className="flex items-center gap-2 py-1.5">
              <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-green-400/15">
                <span className="font-mono text-[7px] text-green-400">✓</span>
              </div>
              <span className="flex-1 font-mono text-[8px] text-on-surface/70">{step}</span>
              {badge && <span className="font-mono text-[7px] text-signal">⚡{badge}</span>}
              <span className="font-mono text-[7px] text-on-surface/25">{time}</span>
            </div>
          ))}
        </div>

        <div className="rounded border border-border-dark bg-midnight/40 px-3 py-2">
          <p className="font-mono text-[7px] text-on-surface-variant mb-1.5">Bundle-Größen · next build</p>
          {[
            { route: 'First Load JS', size: '87 kB', w: 44 },
            { route: '/ (page)',      size: '12 kB', w: 12 },
            { route: '/kontakt',      size: '8 kB',  w:  8 },
          ].map(({ route, size, w }) => (
            <div key={route} className="mb-1 flex items-center gap-2">
              <span className="w-20 flex-shrink-0 font-mono text-[6.5px] text-on-surface/40">{route}</span>
              <div className="flex-1 h-1 overflow-hidden rounded-full bg-border-dark">
                <div style={{ width: `${w}%` }} className="h-full rounded-full bg-signal/50" />
              </div>
              <span className="w-9 text-right font-mono text-[6.5px] text-on-surface/40">{size}</span>
            </div>
          ))}
        </div>

      </div>
    </div>

    <div className="flex items-center gap-3 border-t border-border-dark bg-midnight/60 px-3 py-1">
      <span className="font-mono text-[7px] text-green-400">● live · vor 12 Sek.</span>
      <span className="font-mono text-[7px] text-on-surface/40">3f8a2c · feat: hero scroll animation</span>
      <span className="ml-auto font-mono text-[7px] text-on-surface-variant">FRA1 · Edge Network</span>
    </div>

  </div>,

  // ─── Step 3 — Launch & Monitoring ────────────────────────────────
  <div key="3" className="flex flex-1 min-h-0 flex-col gap-0">

    <div className="flex items-center justify-between border-b border-border-dark px-4 py-2">
      <span className="flex items-center gap-1.5 font-mono text-[8px] text-green-400">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
        zweipunktfuenf.de · LIVE
      </span>
      <span className="font-mono text-[7px] text-on-surface-variant">Deployment 09:42 · main ✓</span>
    </div>

    <div className="flex flex-1 overflow-hidden">

      <div className="flex flex-1 flex-col border-r border-border-dark">
        <div className="border-b border-border-dark px-3 py-1.5">
          <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-on-surface-variant">Launch-Checkliste</p>
        </div>
        <div className="flex flex-col gap-1 overflow-auto p-3">
          {[
            'SSL-Zertifikat & HTTPS',
            'robots.txt & sitemap.xml',
            'OG / Social Meta Tags',
            'Google Search Console',
            'Plausible Analytics',
            '404-Fehlerseite',
            '301-Weiterleitungen',
            'DSGVO & Impressum',
            'Core Web Vitals ≥ 90',
            'Mobile Optimierung',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <div className="flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded bg-green-400/15">
                <span className="font-mono text-[6px] text-green-400">✓</span>
              </div>
              <span className="font-mono text-[7.5px] text-on-surface/70">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-32 flex-shrink-0 flex-col">
        <div className="border-b border-border-dark px-3 py-1.5">
          <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-on-surface-variant">Core Web Vitals</p>
        </div>
        <div className="flex flex-col gap-1.5 p-3">
          {[
            { m: 'LCP',  v: '0.8s',  l: 'Größtes sichtbares Element' },
            { m: 'INP',  v: '42ms',  l: 'Reaktionszeit auf Eingaben'  },
            { m: 'CLS',  v: '0.02',  l: 'Layoutverschiebungen gesamt' },
            { m: 'TTFB', v: '38ms',  l: 'Zeit bis erstes Byte'        },
            { m: 'FCP',  v: '0.6s',  l: 'Erstes sichtbares Element'   },
          ].map(({ m, v, l }) => (
            <div key={m} className="rounded border border-border-dark bg-midnight/40 px-2.5 py-1.5">
              <div className="mb-0.5 flex items-center justify-between">
                <span className="font-mono text-[7px] font-semibold text-on-surface/70">{m}</span>
                <span className="font-mono text-[8px] font-bold text-green-400">{v}</span>
              </div>
              <span className="font-mono text-[5.5px] leading-none text-on-surface/25">{l}</span>
            </div>
          ))}
        </div>
      </div>

    </div>

    <div className="flex items-center justify-between border-t border-border-dark px-3 py-1">
      <span className="font-mono text-[7px] text-on-surface-variant">10 / 10 Checks bestanden</span>
      <span className="font-mono text-[7px] text-green-400">Lighthouse 98 · Google-optimiert</span>
    </div>

  </div>,

]
export default function Process() {
  const [activeStep, setActiveStep] = useState(0)
  const [paused, setPaused] = useState(false)
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  function goToStep(index) {
    setActiveStep(index)
    setPaused(false)
  }

  function togglePause() {
    setPaused(p => !p)
  }

  return (
    <section id="prozess" className="h-full overflow-hidden px-8">
      <div className="mx-auto max-w-[1280px] pt-24">
        <Eyebrow action={
          <a
            href="/leistungen"
            className="sm:hidden flex flex-shrink-0 items-center gap-1.5 rounded-lg border border-[#2d4870] px-3 py-1.5 text-[12px] font-medium text-signal transition-colors duration-150 hover:border-signal hover:bg-deep"
          >
            Alle Leistungen
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
          </a>
        }>{processContent.label}</Eyebrow>

        <div className="section-body">
        {/* heading */}
        <div className="mb-12 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-[clamp(26px,4vw,38px)] font-bold leading-[1.15] text-on-surface">
              {processContent.heading}
            </h2>
            <p className="mt-3 text-sm text-on-surface/60">{processContent.sub}</p>
          </div>
          <a
            href="/leistungen"
            className="max-sm:hidden mt-1 flex w-[152px] flex-shrink-0 items-center justify-center gap-1.5 rounded-lg border border-[#2d4870] px-4 py-2.5 text-[13px] font-medium text-signal transition-colors duration-150 hover:border-signal hover:bg-deep"
          >
            Alle Leistungen
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
          </a>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2" onClick={() => togglePause()}>
          {/* Steps accordion */}
          <div className="space-y-1 min-h-[600px]">
            {processContent.steps.map((step, i) => {
              const isActive = i === activeStep
              return (
                <button
                  key={step.number}
                  onClick={(e) => { e.stopPropagation(); goToStep(i) }}
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
                      {isActive && (
                      <div
                        className="mt-3"
                        style={{ animation: 'accordion-in 0.3s ease forwards' }}
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

                        {/* play/pause control */}
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={(e) => { e.stopPropagation(); togglePause() }}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); togglePause() } }}
                          className="mt-3 flex cursor-pointer items-center gap-1.5 font-mono text-[10px] text-signal/50 transition-colors hover:text-signal"
                          aria-label={paused ? 'Fortsetzen' : 'Pausieren'}
                        >
                          {paused ? (
                            <svg viewBox="0 0 10 12" fill="currentColor" className="h-2.5 w-2.5">
                              <path d="M0 0 L10 6 L0 12 Z" />
                            </svg>
                          ) : (
                            <svg viewBox="0 0 10 12" fill="currentColor" className="h-2.5 w-2.5">
                              <rect x="0" y="0" width="3.5" height="12" />
                              <rect x="6.5" y="0" width="3.5" height="12" />
                            </svg>
                          )}
                          <span>{paused ? 'Fortsetzen' : 'Pausieren'}</span>
                        </div>

                        {/* progress bar */}
                        <div className="mt-2 h-0.5 w-full overflow-hidden rounded-full bg-border-dark">
                          <div
                            key={activeStep}
                            className="h-full bg-signal"
                            style={prefersReducedMotion
                              ? { width: '100%' }
                              : isActive
                                ? {
                                    animation: `bar-fill ${STEP_DURATION}ms linear forwards`,
                                    animationPlayState: paused ? 'paused' : 'running',
                                  }
                                : { width: '0%' }
                            }
                            onAnimationEnd={() => {
                              if (isActive) setActiveStep(prev => (prev + 1) % processContent.steps.length)
                            }}
                          />
                        </div>
                      </div>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Browser mockup preview */}
<div className="hidden lg:block">
  <div className="glass-card aspect-[4/3] overflow-hidden rounded-xl border border-border-dark flex flex-col">

  {/* browser chrome */}
  <div className="flex h-7 flex-shrink-0 items-center gap-1.5 border-b border-border-dark bg-deep px-3">
    <div className="h-2 w-2 rounded-full bg-error-color/40" />
    <div className="h-2 w-2 rounded-full bg-tertiary/40" />
    <div className="h-2 w-2 rounded-full bg-signal/40" />
  </div>

  {/* content */}
  <div className="relative min-h-0 flex-1">
    {processContent.steps.map((_, i) => (
      <div
        key={i}
        className={`absolute inset-0 flex flex-col transition-opacity duration-500 ${
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
        </div>{/* end section-body */}
      </div>
    </section>
  )
}
