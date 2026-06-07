'use client'

import { useState, useRef } from 'react'
import { submitContactForm } from '@/app/actions/contact'

const fieldBase =
  'w-full rounded-xl border-2 bg-transparent px-4 py-3 font-mono text-sm text-on-surface placeholder:text-on-surface/40 focus:outline-none focus:border-signal transition-all shadow-[inset_0_2px_12px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.04)]'
const fieldDefault = 'border-white/15 hover:border-white/25'
const fieldError = 'border-red-500'

function Field({ label, id, error, children, className = '' }) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-on-surface-variant"
      >
        {label}
      </label>
      <div className="relative">
        {children}
        <div className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(7,17,31,0.7)_100%)]" />
      </div>
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
  const snapTimeoutRef = useRef(null)

  function getSnapContainer() {
    return document.getElementById('snap-container')
  }

  function handleFormFocus() {
    clearTimeout(snapTimeoutRef.current)
    const c = getSnapContainer()
    if (c) c.style.scrollSnapType = 'none'
  }

  function handleFormBlur() {
    snapTimeoutRef.current = setTimeout(() => {
      const c = getSnapContainer()
      if (c) c.style.scrollSnapType = ''
    }, 150)
  }

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
    <form ref={formRef} onSubmit={handleSubmit} noValidate onFocus={handleFormFocus} onBlur={handleFormBlur} className="h-full flex flex-col">
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

      <div className="flex flex-col flex-1 justify-between md:grid md:grid-cols-2 md:content-start md:gap-3 [@media(min-height:900px)]:md:gap-5">
        <Field label="Name" id="name" error={state.errors?.name} className="md:col-span-2">
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

          <Field label="Telefon" id="phone" error={state.errors?.phone}>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="+49 123 456789"
              className={`${fieldBase} ${state.errors?.phone ? fieldError : fieldDefault}`}
            />
          </Field>

          <Field label="Webseite (optional)" id="website_url" error={state.errors?.website_url} className="md:col-span-2">
            <input
              type="url"
              id="website_url"
              name="website_url"
              placeholder="https://beispiel.de"
              className={`${fieldBase} ${state.errors?.website_url ? fieldError : fieldDefault}`}
            />
          </Field>

        <Field
          label="Nachricht"
          id="message"
          error={state.errors?.message}
          className="md:col-span-2"
        >
          <textarea
            id="message"
            name="message"
            required
            minLength={10}
            rows={3}
            placeholder="Beschreibe kurz dein Projekt oder deine Frage …"
            className={`${fieldBase} resize-none md:resize-y ${state.errors?.message ? fieldError : fieldDefault}`}
          />
        </Field>

        {state.message && !state.success && (
          <p className="text-sm text-red-400 md:col-span-2" role="alert">
            {state.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-signal px-8 font-body text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 md:col-span-2 sm:w-auto"
        >
          {isPending ? 'Wird gesendet …' : 'Nachricht senden'}
        </button>
      </div>
    </form>
  )
}
