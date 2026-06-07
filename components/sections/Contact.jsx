import Footer from '@/components/layout/Footer'
import ContactForm from '@/components/sections/ContactForm'
import Eyebrow from '@/components/layout/Eyebrow'
import { contact } from '@/lib/content'

export default function Contact() {
  return (
    <section id="contact" className="relative h-full flex flex-col border-t border-border-dark px-8">
      <div className="mx-auto w-full max-w-[1280px] flex flex-col flex-1 min-h-0 pt-16 md:pt-18 [@media(min-height:820px)]:pt-16 [@media(min-height:820px)]:md:pt-24 md:pb-40">
        <Eyebrow>{contact.label}</Eyebrow>

        <div className="section-body flex flex-col flex-1 min-h-0 overflow-y-auto">
        <div className="grid grid-cols-1 flex-1 min-h-0 lg:gap-16 lg:grid-cols-2">
          <div className="hidden lg:block">
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
