import Link from 'next/link'

import { footer } from '@/lib/content'

export default function Footer() {
  return (
    <footer className="hidden md:block w-full border-t border-border-dark bg-midnight">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-6 px-8 py-10">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-on-surface">
            zweipunkt<span className="text-signal">fünf</span>
          </span>
        </div>
        <div className="flex gap-8 font-mono text-xs text-on-surface-variant">
          {footer.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-signal"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <p className="font-mono text-xs text-on-surface-variant">
          {footer.copyright}
        </p>
      </div>
    </footer>
  )
}
