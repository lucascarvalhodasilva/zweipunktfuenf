'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { submitContactForm } from '@/app/actions/contact'

const fieldBase =
  'w-full rounded-lg border bg-transparent px-4 py-3 font-mono text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-colors'
const fieldDefault = 'border-[var(--color-border)]'
const fieldError = 'border-red-500'

function Field({ label, id, error, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]"
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default function Contact() {
  const [state, setState] = useState({
    success: false,
    message: '',
    errors: {},
  })
  const [isPending, setIsPending] = useState(false)
  const formRef = useRef(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setIsPending(true)
    const formData = new FormData(e.currentTarget)
    try {
      const result = await submitContactForm(null, formData)
      setState(result)
      if (result.success) {
        formRef.current?.reset()
      }
    } catch {
      setState({
        success: false,
        message: 'Etwas ist schiefgelaufen. Bitte versuche es später erneut.',
        errors: {},
      })
    } finally {
      setIsPending(false)
    }
  }

  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <section
      id="kontakt"
      className="relative z-10 border-t border-[var(--color-border)] bg-[var(--color-bg)] px-6 py-24 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-accent)]">
            04 — Kontakt
          </p>
          <h2 className="mb-4 font-display text-3xl font-bold leading-tight md:text-4xl">
            Projekt starten
          </h2>
          <p className="mb-10 font-mono text-sm leading-relaxed text-[var(--color-muted)]">
            Erzähl uns von deiner Idee — wir melden uns innerhalb von 24
            Stunden.
          </p>

          {state.success ? (
            <div
              role="status"
              className="rounded-lg border border-[var(--color-accent)] bg-[var(--color-accent)]/10 px-6 py-8 text-center"
            >
              <p className="mb-1 font-display text-lg font-semibold text-[var(--color-accent)]">
                ✓ Anfrage erhalten
              </p>
              <p className="font-mono text-sm text-[var(--color-text)]">
                {state.message}
              </p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} noValidate>
              {/* honeypot – hidden from real users */}
              <div aria-hidden="true" className="absolute -left-[9999px]">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="space-y-5">
                <Field label="Name" id="name" error={state.errors?.name}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    minLength={2}
                    placeholder="Max Mustermann"
                    className={`${fieldBase} ${state.errors?.name ? fieldError : fieldDefault}`}
                  />
                </Field>

                <Field label="E-Mail" id="email" error={state.errors?.email}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="max@beispiel.de"
                    className={`${fieldBase} ${state.errors?.email ? fieldError : fieldDefault}`}
                  />
                </Field>

                <Field
                  label="Nachricht"
                  id="message"
                  error={state.errors?.message}
                >
                  <textarea
                    id="message"
                    name="message"
                    required
                    minLength={10}
                    rows={5}
                    placeholder="Beschreibe kurz dein Projekt oder deine Frage …"
                    className={`${fieldBase} resize-y ${state.errors?.message ? fieldError : fieldDefault}`}
                  />
                </Field>

                {state.message && !state.success && (
                  <p className="text-sm text-red-400" role="alert">
                    {state.message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[var(--color-accent)] bg-[var(--color-accent)] px-6 py-3 font-mono text-xs uppercase tracking-[0.24em] text-black transition-colors duration-300 hover:bg-transparent hover:text-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  {isPending ? 'Wird gesendet …' : 'Nachricht senden'}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
