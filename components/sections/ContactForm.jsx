'use client'

import { useState, useRef } from 'react'
import { submitContactForm } from '@/app/actions/contact'

const fieldBase =
  'w-full rounded-lg border bg-transparent px-4 py-3 font-mono text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-signal transition-colors'
const fieldDefault = 'border-border-dark'
const fieldError = 'border-red-500'

function Field({ label, id, error, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-on-surface-variant"
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

export default function ContactForm() {
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

  if (state.success) {
    return (
      <div
        role="status"
        className="rounded-xl border border-signal/30 bg-signal/10 px-6 py-8 text-center"
      >
        <p className="mb-1 font-body text-lg font-semibold text-signal">✓ Anfrage erhalten</p>
        <p className="font-mono text-sm text-on-surface">{state.message}</p>
      </div>
    )
  }

  return (
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
          className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-signal px-8 font-body text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {isPending ? 'Wird gesendet …' : 'Nachricht senden'}
        </button>
      </div>
    </form>
  )
}
