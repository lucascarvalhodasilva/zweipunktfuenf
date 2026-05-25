'use client'

import dynamic from 'next/dynamic'
import { useRef, useState } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'

const HeroCanvas = dynamic(
  () => import('@/components/sections/HeroCanvas.client'),
  { ssr: false },
)

const HeroControls = dynamic(
  () => import('@/components/sections/HeroControls.client'),
  { ssr: false },
)

export default function HeroShell({ tagline, headlineLines, copy, cta }) {
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const gameApiRef = useRef({
    startGame: () => {},
    pauseGame: () => {},
  })
  const [gameStatus, setGameStatus] = useState('idle')
  const [score, setScore] = useState(0)
  const [highScores, setHighScores] = useState([0, 0, 0])
  const isGameForeground = gameStatus !== 'idle'
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const heroGlowOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.18])
  const heroGlowShift = useTransform(scrollYProgress, [0, 0.7], [0, 48])
  const heroBlendOpacity = useTransform(scrollYProgress, [0, 0.6], [0.2, 1])
  const contentTargetY = useTransform(scrollYProgress, [0.1, 0.8], [0, 12])
  const contentY = useSpring(contentTargetY, {
    stiffness: 90,
    damping: 20,
    mass: 0.8,
  })
  const contentTargetOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.85],
    [1, 0.92],
  )
  const contentOpacity = useSpring(contentTargetOpacity, {
    stiffness: 120,
    damping: 24,
    mass: 0.7,
  })
  const effectiveContentOpacity = useTransform(
    contentOpacity,
    (value) => value * (gameStatus === 'running' ? 0.62 : 1),
  )

  // [2] STAGGER REVEAL
  const containerVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0, delayChildren: 0 },
        },
      }
    : {
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.08, delayChildren: 0 },
        },
      }

  const itemVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0 },
        },
      }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] },
        },
      }

  return (
    <section ref={sectionRef} className="relative z-0 h-screen">
      <div className="surface-grid surface-grid-canvas fixed inset-x-0 top-0 z-0 isolate h-screen w-full overflow-hidden">
        <motion.canvas
          ref={canvasRef}
          className={`pointer-events-none absolute inset-0 ${
            isGameForeground ? 'z-[3]' : 'z-[1]'
          }`}
        />
        <HeroCanvas
          sectionRef={sectionRef}
          canvasRef={canvasRef}
          gameApiRef={gameApiRef}
          setGameStatus={setGameStatus}
          setScore={setScore}
          setHighScores={setHighScores}
          prefersReducedMotion={prefersReducedMotion}
          highScores={highScores}
        />
        <HeroControls
          gameStatus={gameStatus}
          score={score}
          highScores={highScores}
          onStartGame={() => gameApiRef.current.startGame()}
          onPauseGame={() => gameApiRef.current.pauseGame()}
          scrollYProgress={scrollYProgress}
        />
        <motion.div
          className="absolute left-[8%] top-20 h-40 w-40 rounded-full border border-[rgba(200,255,0,0.35)] bg-[rgba(200,255,0,0.08)] blur-3xl"
          style={
            prefersReducedMotion
              ? undefined
              : { opacity: heroGlowOpacity, y: heroGlowShift }
          }
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-b from-transparent via-[rgba(10,10,10,0.45)] to-[rgba(26,26,26,0.98)]"
          style={
            prefersReducedMotion ? undefined : { opacity: heroBlendOpacity }
          }
        />
        <motion.div
          className="relative z-[2] mx-auto flex h-full max-w-7xl flex-col justify-center gap-10 px-5 py-20 md:px-8 md:py-28"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={
            prefersReducedMotion
              ? undefined
              : { y: contentY, opacity: effectiveContentOpacity }
          }
        >
          <div className="max-w-5xl space-y-6 sm:space-y-6">
            <motion.div variants={itemVariants}>{tagline}</motion.div>
            <h1 className="text-[2.75rem] font-black leading-[0.92] tracking-[-0.04em] min-[375px]:text-[3.25rem] min-[480px]:text-6xl md:text-7xl lg:text-[6.5rem]">
              {headlineLines.map((line, index) => (
                <motion.div key={index} variants={itemVariants}>
                  {line}
                </motion.div>
              ))}
            </h1>
            <motion.div variants={itemVariants}>{copy}</motion.div>
          </div>
          <motion.div variants={itemVariants}>{cta}</motion.div>
        </motion.div>
      </div>
    </section>
  )
}
