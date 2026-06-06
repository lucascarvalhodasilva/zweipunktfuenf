'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

import { hero } from '@/lib/content'

const stagger = {
  animate: { transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } },
}

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  const container = document.getElementById('snap-container')
  if (!container) return
  const snapEl = el.closest('.snap-start') ?? el
  const top = snapEl.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop
  container.style.scrollSnapType = 'none'
  container.scrollTo({ top, behavior: 'smooth' })
  container.addEventListener('scrollend', () => { container.style.scrollSnapType = '' }, { once: true })
}

export default function Hero() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y       = useTransform(scrollYProgress, [0, 0.5], [0, -48])
  const scale   = useTransform(scrollYProgress, [0, 0.5], [1, 0.96])
  const filter  = useTransform(scrollYProgress, [0, 0.5], ['blur(0px)', 'blur(6px)'])

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex h-full flex-col items-center justify-center overflow-hidden px-6 py-16 text-center sm:py-0 sm:px-8"
    >
      {/* top/bottom gradient fade */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-midnight/80 via-transparent to-midnight/60" />

      <motion.div style={{ opacity, y, scale, filter }} className="relative z-10 w-full mt-12 sm:mt-0">
        <motion.div
          className="mx-auto max-w-4xl space-y-5 sm:space-y-6"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
        {/* headline */}
        <motion.h1
          variants={fadeUp}
          className="text-[clamp(3.75rem,12vw,6rem)] font-bold leading-[1.05] tracking-tight text-on-surface"
        >
          {(() => {
            const [before, after] = hero.headline.split('für kleine Budgets.')
            return (
              <>
                <span>{before.trimEnd()}</span>
                <br />
                <span className="font-extrabold text-signal">für kleine Budgets.</span>
                {after}
              </>
            )
          })()}
        </motion.h1>

        {/* subline */}
        <motion.p
          variants={fadeUp}
          className="mx-auto max-w-xl text-lg font-light text-on-surface-variant"
        >
          {hero.subline.split(/(14 Tagen|999€)/).map((part, i) =>
            part === '14 Tagen' || part === '999€' ? (
              <span key={i} className="font-semibold text-on-surface">{part}</span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row sm:gap-4 sm:pt-4"
        >
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}
            className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-signal px-8 font-body text-base font-semibold text-white transition-opacity hover:opacity-90 active:scale-95 sm:w-auto sm:h-12"
          >
            {hero.cta.primary}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="#prozess"
            onClick={(e) => { e.preventDefault(); scrollToSection('prozess') }}
            className="inline-flex h-14 w-full items-center justify-center rounded-xl border border-border-dark px-8 font-body text-base font-medium text-on-surface transition-colors hover:bg-deep sm:w-auto sm:h-12"
          >
            {hero.cta.secondary}
          </a>
        </motion.div>
        </motion.div>
      </motion.div>

     

      {/* scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.svg
          width="20" height="20" viewBox="0 0 20 20" fill="none"
          animate={{ y: [0, 5, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M4 7l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-on-surface" />
        </motion.svg>
      </motion.div>
    </section>
  )
}

