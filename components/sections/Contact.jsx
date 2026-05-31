import ContactForm from '@/components/sections/ContactForm'
import Eyebrow from '@/components/layout/Eyebrow'
import { contact } from '@/lib/content'

export default function Contact() {
  return (
    <section id="contact" className="border-t border-border-dark px-8 py-24">
      <div className="mx-auto max-w-[1280px]">
        <Eyebrow>{contact.label}</Eyebrow>

        <div className="section-body">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-[clamp(26px,4vw,38px)] font-bold leading-[1.15] text-on-surface">
              {contact.heading}
            </h2>
            <p className="text-sm leading-relaxed text-on-surface-variant">
              {contact.description}
            </p>
          </div>

          <ContactForm />
        </div>
        </div>{/* end section-body */}
      </div>
    </section>
  )
}
