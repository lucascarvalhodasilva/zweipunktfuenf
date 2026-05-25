import RevealOnScroll from '@/components/ui/RevealOnScroll'
import ContactForm from '@/components/sections/ContactForm'

export default function Contact() {
  return (
    <section
      id="kontakt"
      className="relative z-10 border-t border-[var(--color-border)] bg-[var(--color-bg)] px-6 py-24 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-2xl">
        <RevealOnScroll>
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

          <ContactForm />
        </RevealOnScroll>
      </div>
    </section>
  )
}
