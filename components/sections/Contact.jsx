import ContactForm from '@/components/sections/ContactForm'
import { contact } from '@/lib/content'

export default function Contact() {
  return (
    <section id="contact" className="bg-midnight border-t border-border-dark px-8 py-24">
      <div className="mx-auto max-w-[1280px]">
        {/* label */}
        <div className="mb-8 flex items-center gap-4">
          <span className="font-mono text-xs text-signal">{contact.label}</span>
          <div className="h-px flex-grow bg-border-dark" />
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-[clamp(1.75rem,4vw,2.5rem)] font-light leading-tight tracking-tight text-on-surface">
              {contact.heading}
            </h2>
            <p className="text-sm leading-relaxed text-on-surface-variant">
              {contact.description}
            </p>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  )
}
