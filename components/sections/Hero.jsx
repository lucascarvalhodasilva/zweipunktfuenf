'use client'

import { motion } from 'framer-motion'

import { hero } from '@/lib/content'
import GridWarp from './GridWarp.client'

const stagger = {
  animate: { transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } },
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center overflow-hidden px-8 text-center"
    >
      {/* canvas-driven grid + warp */}
      <GridWarp />

      {/* top/bottom gradient fade */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-midnight via-transparent to-midnight" />

      <motion.div
        className="relative z-10 mx-auto max-w-4xl space-y-6"
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        {/* badge */}
        <motion.div variants={fadeUp}>
          <span className="inline-block rounded-full border border-border-dark bg-deep px-4 py-1">
            <p className="font-mono text-xs text-signal">{hero.badge}</p>
          </span>
        </motion.div>

        {/* headline */}
        <motion.h1
          variants={fadeUp}
          className="text-[clamp(2.5rem,7vw,4rem)] font-light leading-tight tracking-tight text-on-surface"
        >
          {hero.headline.split('Präzision').map((part, i, arr) =>
            i < arr.length - 1 ? (
              <span key={i}>
                {part}
                <span className="font-semibold text-signal">Präzision</span>
              </span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </motion.h1>

        {/* subline */}
        <motion.p
          variants={fadeUp}
          className="mx-auto max-w-xl text-lg font-light text-on-surface-variant"
        >
          {hero.subline.split('14\u00a0Tagen').map((part, i, arr) =>
            i < arr.length - 1 ? (
              <span key={i}>
                {part}
                <span className="font-semibold text-on-surface">14&nbsp;Tagen</span>
              </span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row"
        >
          <a
            href="#contact"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-signal px-8 font-body text-sm font-medium text-white transition-opacity hover:opacity-90 active:scale-95"
          >
            {hero.cta.primary}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="#prozess"
            className="inline-flex h-10 items-center rounded-lg border border-border-dark px-8 font-body text-sm font-medium text-on-surface transition-colors hover:bg-deep"
          >
            {hero.cta.secondary}
          </a>
        </motion.div>
      </motion.div>

      {/* abstract floating panel */}
      <div className="pointer-events-none absolute bottom-[-8%] left-1/2 w-full max-w-5xl -translate-x-1/2 rounded-t-xl border border-b-0 border-border-dark bg-deep/40 opacity-20 backdrop-blur-sm" style={{ aspectRatio: '16/6' }} />
    </section>
  )
}

