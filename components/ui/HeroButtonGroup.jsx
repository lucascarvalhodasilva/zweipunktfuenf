'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'

import Snake from '@/components/ui/Snake'

export default function HeroButtonGroup({
  gameStatus,
  score,
  highScores,
  onStartGame,
  onPauseGame,
  scrollYProgress,
}) {
  const prefersReducedMotion = useReducedMotion()
  const [activeModal, setActiveModal] = useState(null)
  const triggerRefs = useRef({})

  // Scroll-driven staggered fade for buttons (chat fades first, then snake, then cookie — top to bottom)
  const chatScrollOpacity = useTransform(
    scrollYProgress,
    prefersReducedMotion ? [0.5, 0.7] : [0.15, 0.35],
    [1, 0],
  )
  const chatScrollY = useTransform(
    scrollYProgress,
    prefersReducedMotion ? [0.5, 0.7] : [0.15, 0.35],
    [0, -12],
  )
  const snakeScrollOpacity = useTransform(
    scrollYProgress,
    prefersReducedMotion ? [0.5, 0.7] : [0.25, 0.45],
    [1, 0],
  )
  const snakeScrollY = useTransform(
    scrollYProgress,
    prefersReducedMotion ? [0.5, 0.7] : [0.25, 0.45],
    [0, -12],
  )
  const cookieScrollOpacity = useTransform(
    scrollYProgress,
    prefersReducedMotion ? [0.5, 0.7] : [0.35, 0.55],
    [1, 0],
  )
  const cookieScrollY = useTransform(
    scrollYProgress,
    prefersReducedMotion ? [0.5, 0.7] : [0.35, 0.55],
    [0, -12],
  )

  // Container-level dissolve at the end of the scroll range
  const containerTargetOpacity = useTransform(
    scrollYProgress,
    prefersReducedMotion ? [0.5, 0.75] : [0.4, 0.6],
    [1, 0],
  )
  const containerScrollOpacity = useSpring(containerTargetOpacity, {
    stiffness: 120,
    damping: 24,
    mass: 0.6,
  })
  const containerPointerEvents = useTransform(containerScrollOpacity, (value) =>
    value < 0.05 ? 'none' : 'auto',
  )

  // Mobile container fade
  const mobileTargetOpacity = useTransform(
    scrollYProgress,
    prefersReducedMotion ? [0.5, 0.75] : [0.3, 0.55],
    [1, 0],
  )
  const mobileScrollOpacity = useSpring(mobileTargetOpacity, {
    stiffness: 120,
    damping: 24,
    mass: 0.6,
  })
  const mobilePointerEvents = useTransform(mobileScrollOpacity, (value) =>
    value < 0.05 ? 'none' : 'auto',
  )

  const closeModal = useCallback(() => {
    const previousModal = activeModal

    setActiveModal(null)

    if (previousModal && triggerRefs.current[previousModal]) {
      window.requestAnimationFrame(() => {
        triggerRefs.current[previousModal]?.focus()
      })
    }
  }, [activeModal])

  useEffect(() => {
    if (!activeModal) {
      return () => {}
    }

    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') {
        return
      }

      event.preventDefault()
      closeModal()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeModal, closeModal])

  const toggleModal = (modalKey) => {
    setActiveModal((currentModal) =>
      currentModal === modalKey ? null : modalKey,
    )
  }

  const buttonBaseClassName =
    'group flex min-h-11 w-full items-center gap-3 rounded-xl border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-300'

  const secondaryButtonClassName = `${buttonBaseClassName} border-[var(--color-border)] bg-transparent text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]`

  const primaryButtonClassName = `${buttonBaseClassName} border-[var(--color-accent)] bg-[var(--color-accent)] text-black hover:bg-transparent hover:text-[var(--color-accent)]`

  const panelTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.2, ease: 'easeOut' }

  const layoutTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.25, ease: 'easeOut' }

  const menuVisibilityTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.2, ease: 'easeOut' }

  const renderIcon = (type) => {
    const commonProps = {
      width: 16,
      height: 16,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 1.5,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      className: 'shrink-0',
      'aria-hidden': true,
    }

    if (type === 'chat') {
      return (
        <svg {...commonProps}>
          <path d="M4 6.5a2.5 2.5 0 0 1 2.5-2.5h11A2.5 2.5 0 0 1 20 6.5v7A2.5 2.5 0 0 1 17.5 16H10l-4 4v-4H6.5A2.5 2.5 0 0 1 4 13.5z" />
        </svg>
      )
    }

    if (type === 'snake') {
      return (
        <svg {...commonProps}>
          <path d="M7 8h7a3 3 0 1 1 0 6h-4a2 2 0 1 0 0 4h7" />
          <path d="M18 8h.01" />
        </svg>
      )
    }

    return (
      <svg {...commonProps}>
        <path d="M7 10.5a2.5 2.5 0 1 1 5 0c0 1.2-.7 1.9-1.6 2.6-.9.6-1.4 1.1-1.4 2.4" />
        <path d="M10 19h.01" />
        <path d="M21 12a9 9 0 1 1-3.2-6.9" />
      </svg>
    )
  }

  const renderButton = (key, label, className) => (
    <button
      ref={(element) => {
        triggerRefs.current[key] = element
      }}
      type="button"
      onClick={() => toggleModal(key)}
      className={className}
    >
      {renderIcon(key)}
      <span className="flex-1 text-left">{label}</span>
    </button>
  )

  const renderPanel = () => {
    if (activeModal === 'snake') {
      return (
        <Snake
          gameStatus={gameStatus}
          score={score}
          highScores={highScores}
          onStart={onStartGame}
          onPause={onPauseGame}
        />
      )
    }

    if (activeModal === 'chat') {
      return (
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-accent)]">
              Chat
            </p>
            <p className="font-mono text-sm leading-7 text-[var(--color-text)]/78">
              Hallo — der Chat kommt bald. Bis dahin: schreib uns einfach.
            </p>
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              disabled
              placeholder="Chat kommt bald"
              className="min-h-11 flex-1 rounded-xl border border-[var(--color-border)] bg-transparent px-4 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-text)]/40 outline-none"
            />
            <button
              type="button"
              disabled
              className="min-h-11 rounded-xl border border-[var(--color-border)] px-5 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-text)]/40"
            >
              Senden
            </button>
          </div>
        </div>
      )
    }

    if (activeModal === 'cookie') {
      return (
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-accent)]">
              Cookie Hinweis
            </p>
            <p className="font-mono text-sm leading-7 text-[var(--color-text)]/78">
              Diese Website verwendet ausschließlich technisch notwendige
              Cookies. Analyse- oder Marketing-Cookies werden nicht eingesetzt.
            </p>
            <p className="font-mono text-[11px] leading-6 text-[var(--color-text)]/70">
              Details findest du in unserer{' '}
              <Link
                href="/datenschutz"
                className="text-[var(--color-accent)] underline-offset-2 hover:underline"
              >
                Datenschutzerklärung
              </Link>
              .
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-[var(--color-border)] px-4 py-3">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-text)]">
                  Notwendig
                </p>
              </div>
              <button
                type="button"
                disabled
                aria-pressed="true"
                className="relative h-7 w-12 rounded-full border border-[rgba(200,255,0,0.45)] bg-[rgba(200,255,0,0.2)] opacity-70"
              >
                <span className="absolute left-[26px] top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[var(--color-accent)]" />
              </button>
            </div>
          </div>
          <a
            href="/datenschutz"
            className="flex min-h-11 w-full items-center justify-center rounded-xl border border-[var(--color-border)] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-text)] transition-colors duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            Datenschutz
          </a>
        </div>
      )
    }

    return null
  }

  const mobileIconButtonClassName =
    'flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300'

  const mobileSecondaryIconClassName = `${mobileIconButtonClassName} border-[var(--color-border)] bg-[rgba(10,10,10,0.82)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]`

  const mobilePrimaryIconClassName = `${mobileIconButtonClassName} border-[var(--color-accent)] bg-[var(--color-accent)] text-black hover:bg-transparent hover:text-[var(--color-accent)]`

  const renderMobileIconButton = (key, className) => (
    <button
      ref={(element) => {
        triggerRefs.current[`mobile-${key}`] = element
      }}
      type="button"
      onClick={() => toggleModal(key)}
      className={className}
      aria-label={key === 'chat' ? 'Chat' : 'Cookie'}
    >
      {renderIcon(key)}
    </button>
  )

  return (
    <>
      {/* Desktop */}
      <div className="absolute right-24 top-1/2 z-[4] hidden -translate-y-1/2 lg:block">
        <motion.div style={{ opacity: containerScrollOpacity, pointerEvents: containerPointerEvents }}>
          <motion.div
            layout
            animate={gameStatus === 'running' ? 'hidden' : 'visible'}
            variants={{
              visible: { opacity: 1, x: 0, pointerEvents: 'auto' },
              hidden: { opacity: 0, x: 18, pointerEvents: 'none' },
            }}
            transition={{ ...menuVisibilityTransition, layout: layoutTransition }}
            className="w-72 overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.14)] bg-[rgba(10,10,10,0.62)] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur"
          >
          <AnimatePresence mode="wait" initial={false}>
            {activeModal === null ? (
              <motion.div
                key="button-view"
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.2, ease: 'easeOut' }
                }
                className="space-y-0"
              >
                <motion.div className="mb-3" style={{ opacity: chatScrollOpacity, y: chatScrollY }}>
                  {renderButton('chat', 'Chat', primaryButtonClassName)}
                </motion.div>
                <hr className="my-0 h-[0.5px] border-none border-t border-[var(--color-border)]/30" />
                <div className="mt-3 space-y-2.5">
                  <motion.div style={{ opacity: snakeScrollOpacity, y: snakeScrollY }}>
                    {renderButton('snake', 'Snake', secondaryButtonClassName)}
                  </motion.div>
                  <motion.div style={{ opacity: cookieScrollOpacity, y: cookieScrollY }}>
                    {renderButton('cookie', 'Cookie', secondaryButtonClassName)}
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={activeModal}
                initial={
                  prefersReducedMotion
                    ? false
                    : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }
                }
                animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
                exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                transition={panelTransition}
                className="relative"
              >
                <button
                  type="button"
                  onClick={closeModal}
                  className="absolute right-1 top-0.5 font-mono text-sm text-[var(--color-muted)] transition-colors duration-300 hover:text-[var(--color-accent)]"
                  aria-label="Schließen"
                >
                  ✕
                </button>
                <div>{renderPanel()}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        </motion.div>
      </div>

      {/* Mobile */}
      <motion.div
        className="fixed bottom-6 right-5 z-[4] lg:hidden"
        style={{ opacity: mobileScrollOpacity, pointerEvents: mobilePointerEvents }}
      >
        <AnimatePresence>
          {/* Snake is excluded from mobile — it requires keyboard input */}
          {activeModal !== null && activeModal !== 'snake' && (
            <>
              <motion.div
                key="mobile-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
                className="fixed inset-0 z-[4] bg-black/60"
                onClick={closeModal}
                aria-hidden="true"
              />
              <motion.div
                key="mobile-panel"
                initial={
                  prefersReducedMotion
                    ? false
                    : { opacity: 0, y: 40 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 40 }
                }
                transition={panelTransition}
                className="fixed inset-x-4 bottom-4 z-[5] max-h-[80vh] overflow-y-auto rounded-2xl border border-[rgba(255,255,255,0.14)] bg-[rgba(10,10,10,0.92)] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur"
              >
                <button
                  type="button"
                  onClick={closeModal}
                  className="absolute right-4 top-3 flex h-9 w-9 items-center justify-center rounded-full font-mono text-base text-[var(--color-muted)] transition-colors duration-300 hover:text-[var(--color-accent)]"
                  aria-label="Schließen"
                >
                  ✕
                </button>
                <div>{renderPanel()}</div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
        <div className="flex flex-col gap-3">
          {renderMobileIconButton('chat', mobilePrimaryIconClassName)}
          {renderMobileIconButton('cookie', mobileSecondaryIconClassName)}
        </div>
      </motion.div>
    </>
  )
}
