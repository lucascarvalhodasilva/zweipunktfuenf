import { footerPills } from '@/lib/constants'

export default function Footer() {
  return (
    <footer id="kontakt" className="border-t border-[var(--color-border)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 text-sm md:flex-row md:items-center md:justify-between md:px-8">
        <p className="font-mono uppercase tracking-[0.18em] text-[var(--color-muted)]">
          © 2026 zweipunktfünf, Karlsruhe
        </p>
        <div className="flex flex-wrap gap-2">
          {footerPills.map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-text)]"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}
