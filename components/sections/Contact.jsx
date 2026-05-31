import Footer from '@/components/layout/Footer'
import ContactForm from '@/components/sections/ContactForm'
import Eyebrow from '@/components/layout/Eyebrow'
import { contact } from '@/lib/content'

export default function Contact() {
  return (
    <section id="contact" className="relative h-full overflow-hidden border-t border-border-dark px-8 py-24">
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
      <div className="absolute bottom-0 left-0 right-0">
        <Footer />
      </div>
    </section>
  )
}
