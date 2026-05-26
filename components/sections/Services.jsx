import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { services } from '@/lib/content'

function ServiceCard({ service }) {
  return (
    <article
      className={`flex min-h-[320px] flex-col justify-between rounded-[28px] border bg-[var(--color-surface)] p-6 ${
        service.isCrypto
          ? 'border-[var(--color-border)] shadow-[inset_0_0_0_1px_rgba(247,147,26,0.2)]'
          : service.isAddon
            ? 'border-[var(--color-border)]/40 opacity-75'
            : 'border-[var(--color-border)]'
      }`}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
            {service.number}
          </span>
          <div className="flex items-center gap-3">
            {service.isAddon && (
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--color-muted)] border border-[var(--color-border)]/60 rounded-full px-2 py-0.5">
                Add-on
              </span>
            )}
            <span
              className={`text-3xl ${service.isCrypto ? 'text-[var(--color-crypto)]' : service.isAddon ? 'text-[var(--color-muted)]' : 'text-[var(--color-accent)]'}`}
              aria-hidden="true"
            >
              {service.icon}
            </span>
          </div>
        </div>
        <div className="space-y-3">
          <h3
            className={`text-2xl font-bold uppercase tracking-[-0.03em] ${
              service.isCrypto
                ? 'text-[var(--color-crypto)]'
                : service.isAddon
                  ? 'text-[var(--color-muted)]'
                  : 'text-[var(--color-text)]'
            }`}
          >
            {service.title}
          </h3>
          <p className="font-mono text-sm leading-7 text-[var(--color-text)]/72">
            {service.description}
          </p>
        </div>
      </div>
      <p
        className={`font-mono text-xs uppercase tracking-[0.24em] ${
          service.isCrypto
            ? 'text-[var(--color-crypto)]'
            : service.isAddon
              ? 'text-[var(--color-muted)]'
              : 'text-[var(--color-accent)]'
        }`}
      >
        {service.tagline}
      </p>
    </article>
  )
}

export default function Services() {
  return (
    <section
      id="services"
      className="relative z-10 overflow-hidden rounded-t-[32px] border-b border-[var(--color-border)] bg-[var(--color-bg)] shadow-[0_-8px_32px_rgba(0,0,0,0.4)] snap-start scroll-mt-14"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-24 bg-gradient-to-b from-[rgba(200,255,0,0.08)] via-[rgba(26,26,26,0.24)] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px bg-[rgba(200,255,0,0.2)]"
      />
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="mb-10 max-w-2xl space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-[var(--color-accent)]">
            {services.label}
          </p>
          <h2 className="text-3xl font-bold uppercase tracking-[-0.03em] md:text-5xl">
            {services.heading}
          </h2>
        </div>
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {services.items
              .filter((s) => !s.isAddon && !s.isCrypto)
              .map((service, index) => (
                <RevealOnScroll key={service.title} delay={index * 0.08}>
                  <ServiceCard service={service} />
                </RevealOnScroll>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {services.items
              .filter((s) => s.isAddon || s.isCrypto)
              .map((service, index) => (
                <RevealOnScroll key={service.title} delay={index * 0.08}>
                  <ServiceCard service={service} />
                </RevealOnScroll>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
