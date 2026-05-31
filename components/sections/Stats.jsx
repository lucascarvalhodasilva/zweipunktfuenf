'use client'

import { Fragment, useRef, useState, useEffect } from 'react'
import Eyebrow from '@/components/layout/Eyebrow'
import { stats } from '@/lib/content'

function StarRating() {
  return (
    <div className="flex gap-[3px]" aria-label="5 von 5 Sternen">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="h-[13px] w-[13px] bg-signal"
          style={{
            clipPath:
              'polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)',
          }}
        />
      ))}
    </div>
  )
}

function QuoteText({ fragments }) {
  return (
    <>
      {fragments.map((frag, i) =>
        typeof frag === 'string' ? (
          <span key={i}>{frag}</span>
        ) : (
          <strong key={i} className="font-medium text-[#c8d5e2]">
            {frag.bold}
          </strong>
        ),
      )}
    </>
  )
}

function WebsiteChip({ url, preview }) {
  return (
    <div className="group relative hidden sm:block">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Website besuchen"
        className="flex items-center gap-1 rounded border border-[#1e3050] bg-[#0a1826] px-2 py-1 text-[10px] font-medium text-[#3a6fb0] transition-colors duration-150 hover:border-[#3a6fb0] hover:text-signal"
      >
        Website
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
        </svg>
      </a>
      {/* Preview popover */}
      {preview && (
        <div className="pointer-events-none absolute bottom-full right-0 mb-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100" aria-hidden="true">
          {/* browser chrome shell */}
          <div className="w-[320px] overflow-hidden rounded-lg border border-[#2d4870] shadow-2xl shadow-black/60">
            <div className="flex items-center gap-1.5 border-b border-[#1e3050] bg-[#060f1c] px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
              <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
              <span className="h-2 w-2 rounded-full bg-[#28c840]" />
              <span className="ml-2 flex-1 truncate rounded bg-[#0d1f3c] px-2 py-0.5 text-[9px] text-[#4a5d72]">
                {url.replace('https://', '')}
              </span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="" width={1920} height={1080} className="block w-full" style={{ aspectRatio: '16/9', objectFit: 'cover', objectPosition: 'top' }} />
          </div>
          {/* arrow */}
          <div className="absolute -bottom-1.5 right-4 h-3 w-3 rotate-45 border-b border-r border-[#2d4870] bg-[#060f1c]" />
        </div>
      )}
    </div>
  )
}


function LighthouseGauge({ score, label }) {
  const circumference = 2 * Math.PI * 56
  const dash = (score / 100) * circumference
  const color = score >= 90 ? '#5B8DEE' : score >= 50 ? '#e67e22' : '#e74c3c'
  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 120 120" width="68" height="68" aria-hidden="true">
        <circle cx="60" cy="60" r="56" fill="none" stroke="#1e3050" strokeWidth="8" />
        <circle
          cx="60" cy="60" r="56" fill="none"
          stroke={color} strokeWidth="8"
          strokeDasharray={`${dash} ${circumference}`}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />
        <text x="60" y="60" textAnchor="middle" dominantBaseline="central" fill={color} fontSize="24" fontWeight="700">
          {score}
        </text>
      </svg>
      <span className="text-[10px] uppercase tracking-[0.08em] text-[#4a5d72]">{label}</span>
    </div>
  )
}

export default function Stats() {
  const reviewsRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [expandedRow, setExpandedRow] = useState(null)

  function isMobile() {
    return typeof window !== 'undefined' && window.innerWidth <= 680
  }

  function updateDots() {
    if (!isMobile() || !reviewsRef.current) return
    const cards = reviewsRef.current.querySelectorAll('[data-review]')
    if (!cards.length) return
    const cardWidth = cards[0].offsetWidth + 12
    setActiveIndex(Math.round(reviewsRef.current.scrollLeft / cardWidth))
  }

  function scrollToCard(index) {
    if (!isMobile() || !reviewsRef.current) return
    const cards = reviewsRef.current.querySelectorAll('[data-review]')
    if (!cards.length) return
    const cardWidth = cards[0].offsetWidth + 12
    reviewsRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' })
  }

  useEffect(() => {
    const el = reviewsRef.current
    if (!el) return
    el.addEventListener('scroll', updateDots, { passive: true })
    window.addEventListener('resize', updateDots)
    return () => {
      el.removeEventListener('scroll', updateDots)
      window.removeEventListener('resize', updateDots)
    }
  }, [])

  useEffect(() => {
    if (!modalOpen) return
    const onKey = (e) => { if (e.key === 'Escape') setModalOpen(false) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [modalOpen])

  return (
    <section className="h-full flex flex-col px-8 max-sm:px-4" aria-labelledby="stats-title">
      <div className="mx-auto w-full max-w-[1280px] flex flex-col flex-1 pt-20 pb-10">

        <Eyebrow>{stats.eyebrow}</Eyebrow>

        <div className="section-body flex flex-col flex-1 justify-between">

        {/* Header */}
        <div>
          <div className="flex items-start justify-between gap-4">
            <h2
              id="stats-title"
              className="text-[clamp(26px,4vw,38px)] font-bold leading-[1.15] text-on-surface"
            >
              {stats.heading}
            </h2>
            <button
              onClick={() => setModalOpen(true)}
              className="mt-1 flex w-[152px] flex-shrink-0 items-center justify-center gap-1.5 rounded-lg border border-[#2d4870] px-4 py-2.5 text-[13px] font-medium text-signal transition-colors duration-150 hover:border-signal hover:bg-deep"
            >
              Alle Projekte
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
            </button>
          </div>
          <p className="mt-2 max-w-[520px] text-[15px] text-[#7a8a9e]">
            {stats.sub}
          </p>
        </div>

        {/* Logo strip — marquee */}
        <div
          className="max-w-lg mx-auto px-[22px] py-2"
          aria-label="Referenzkunden"
        >
          <p className="mb-3 text-center text-[11px] uppercase tracking-[0.08em] text-[#4a5d72]">
            {stats.clientsLabel}
          </p>
          <div
            className="marquee-wrap overflow-hidden"
            style={{
              maskImage:
                'linear-gradient(to right, transparent, black 60px, black calc(100% - 60px), transparent)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent, black 60px, black calc(100% - 60px), transparent)',
            }}
          >
            <div className="marquee-track flex w-max gap-2" aria-hidden="true">
              {[...stats.clients, ...stats.clients].map((name, i) => (
                <span
                  key={i}
                  className="whitespace-nowrap rounded-md border border-[#1e3050] bg-deep px-3 py-[5px] text-xs font-medium text-[#6e8fb5]"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
          <ul className="sr-only">
            {stats.clients.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>

        {/* Reviews — desktop grid / mobile horizontal scroll */}
        <div
          ref={reviewsRef}
          className="mx-auto grid max-w-[720px] grid-cols-2 gap-4 max-sm:-mx-8 max-sm:flex max-sm:snap-x max-sm:snap-mandatory max-sm:overflow-x-auto max-sm:scroll-smooth max-sm:gap-3 max-sm:px-8 max-sm:[scrollbar-width:none] max-sm:[&::-webkit-scrollbar]:hidden"
          role="list"
          aria-label="Kundenstimmen"
          onScroll={updateDots}
        >
          {stats.reviews.map((review) => (
            <article
              key={review.author.name}
              data-review=""
              role="listitem"
              className="flex flex-col rounded-xl border border-[#1e3050] bg-deep p-5 transition-colors duration-200 hover:border-[#2d4870] max-sm:max-w-[320px] max-sm:flex-[0_0_82vw] max-sm:snap-start"
            >
              {/* Stars + link */}
              <div className="mb-4 flex items-center justify-between">
                <StarRating />
                <WebsiteChip url={review.author.url} preview={review.author.preview} />
              </div>

              {/* Quote */}
              <p className="mb-5 flex-1 text-sm leading-[1.7] text-[#9fb0c4]">
                <QuoteText fragments={review.quote} />
              </p>

              {/* Meta row — no box, hairline dividers only */}
              <div className="mb-4 grid grid-cols-3 divide-x divide-[#1e3050] border-t border-[#1e3050] pt-4 text-center">
                <div className="pr-3">
                  <p className="mb-1 text-[10px] uppercase tracking-[0.08em] text-[#4a5d72]">Branche</p>
                  <p className="text-xs font-medium text-[#c8d5e2]">{review.meta.branche}</p>
                </div>
                <div className="px-3">
                  <p className="mb-1 text-[10px] uppercase tracking-[0.08em] text-[#4a5d72]">Lieferzeit</p>
                  <p className="text-xs font-medium text-signal">{review.meta.lieferzeit}</p>
                </div>
                <div className="pl-3">
                  <p className="mb-1 text-[10px] uppercase tracking-[0.08em] text-[#4a5d72]">Lighthouse</p>
                  <p className="text-xs font-medium text-signal">
                    {review.meta.lighthouse}<span className="text-[#4a5d72]">/100</span>
                  </p>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center gap-2.5 border-t border-[#162438] pt-3.5">
                <div
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#1e3050] bg-[#0a1826] text-[11px] font-medium text-signal"
                  aria-hidden="true"
                >
                  {review.author.initials}
                </div>
                <div>
                  <p className="text-[13px] font-medium leading-[1.2] text-[#c8d5e2]">{review.author.name}</p>
                  <p className="mt-0.5 text-[11px] text-[#4a5d72]">{review.author.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Scroll dots — mobile only */}
        <div className="hidden items-center justify-center gap-1.5 max-sm:flex" aria-hidden="true">
          {stats.reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              aria-label={`Karte ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                activeIndex === i ? 'w-[18px] bg-signal' : 'w-1.5 bg-[#1e3050]'
              }`}
            />
          ))}
        </div>

        </div>{/* end section-body */}

      </div>

      {/* Modal — Projektübersicht */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-midnight/80 backdrop-blur-md"
            onClick={() => setModalOpen(false)}
            aria-hidden="true"
          />

          {/* Panel */}
          <div className="relative z-10 flex w-full max-w-3xl flex-col rounded-2xl border border-[#1e3050] bg-[#0a1828] p-6 sm:p-8" style={{ height: 'min(90vh, 720px)' }}>

            {/* Panel header */}
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h3 id="modal-title" className="text-lg font-bold text-on-surface">Projektübersicht</h3>
                <p className="mt-0.5 text-sm text-[#7a8a9e]">Alle abgeschlossenen Projekte</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                aria-label="Schließen"
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-[#1e3050] text-[#7a8a9e] transition-colors hover:border-[#2d4870] hover:text-on-surface"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>

            {/* Summary */}
            <div className="mb-6 grid grid-cols-3 divide-x divide-[#1e3050] rounded-xl border border-[#1e3050] bg-deep py-5 text-center">
              {stats.items.map((item) => (
                <div key={item.label} className="px-4">
                  <p className="text-[clamp(20px,3vw,28px)] font-bold leading-none text-on-surface">
                    {item.value}<em className="not-italic text-signal">{item.suffix}</em>
                  </p>
                  <p className="mt-1.5 text-xs text-[#7a8a9e]">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Table */}
            <div className="min-h-0 flex-1 overflow-y-auto rounded-xl border border-[#1e3050]">
              <table className="w-full text-left text-sm">
                <thead className="sticky top-0">
                  <tr className="border-b border-[#1e3050] bg-[#060f1c]">
                    <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-[0.08em] text-[#4a5d72]">Projekt</th>
                    <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-[0.08em] text-[#4a5d72]">Branche</th>
                    <th className="px-4 py-3 text-right text-[11px] font-medium uppercase tracking-[0.08em] text-[#4a5d72]">Lieferzeit</th>
                    <th className="px-4 py-3 text-right text-[11px] font-medium uppercase tracking-[0.08em] text-[#4a5d72]">Lighthouse</th>
                    <th className="w-10 px-3 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {stats.projects.map((project, i) => (
                    <Fragment key={project.name}>
                      <tr
                        className={`transition-colors hover:bg-deep ${expandedRow === i ? '' : i < stats.projects.length - 1 ? 'border-b border-[#1e3050]' : ''}`}
                      >
                        <td className="px-4 py-3.5 font-medium text-[#c8d5e2]">
                          {project.url ? (
                            <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-signal transition-colors duration-150">
                              {project.name}
                              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                            </a>
                          ) : project.name}
                        </td>
                        <td className="px-4 py-3.5 text-[#7a8a9e]">{project.branche}</td>
                        <td className="px-4 py-3.5 text-right font-medium text-signal">{project.lieferzeit} Tage</td>
                        <td className="px-4 py-3.5 text-right font-medium text-signal">{project.lighthouse}<span className="text-[#4a5d72]">/100</span></td>
                        <td className="py-3.5 pr-3 text-right">
                          {project.categories && (
                            <button
                              onClick={() => setExpandedRow(expandedRow === i ? null : i)}
                              aria-label={expandedRow === i ? 'Details schließen' : 'Details anzeigen'}
                              aria-expanded={expandedRow === i}
                              className="flex items-center justify-center rounded-md p-1 text-[#4a5d72] transition-colors hover:text-signal"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                aria-hidden="true"
                                className={`transition-transform duration-200 ${expandedRow === i ? 'rotate-180' : ''}`}
                              >
                                <path d="m6 9 6 6 6-6" />
                              </svg>
                            </button>
                          )}
                        </td>
                      </tr>
                      {expandedRow === i && project.categories && (
                        <tr className={i < stats.projects.length - 1 ? 'border-b border-[#1e3050]' : ''}>
                          <td colSpan={5} className="bg-[#060f1c] px-6 py-6">
                            <div className="flex flex-wrap items-start justify-center gap-8">
                              <LighthouseGauge score={project.categories.performance} label="Performance" />
                              <LighthouseGauge score={project.categories.accessibility} label="Zugänglichkeit" />
                              <LighthouseGauge score={project.categories.bestPractices} label="Best Practices" />
                              <LighthouseGauge score={project.categories.seo} label="SEO" />
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}

    </section>
  )
}

