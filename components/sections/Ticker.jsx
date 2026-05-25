import { tickerItems } from '@/lib/constants'

const repeatedItems = [...tickerItems, ...tickerItems]

export default function Ticker() {
  return (
    <section
      id="ticker"
      aria-label="Schlagworte"
      className="overflow-hidden border-b border-[var(--color-border)] bg-black"
    >
      <div className="ticker-track flex w-max items-center gap-4 py-4">
        {repeatedItems.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-4 whitespace-nowrap font-mono text-sm uppercase tracking-[0.28em] text-[var(--color-text)]/80"
          >
            <span className="text-[var(--color-accent)]">•</span>
            {item}
          </span>
        ))}
      </div>
    </section>
  )
}
