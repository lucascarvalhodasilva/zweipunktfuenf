import Navbar from '@/components/layout/Navbar'
import Breadcrumb from '@/components/leistungen/Breadcrumb'
import LeistungenNav from '@/components/leistungen/LeistungenNav'
import { footer } from '@/lib/content'
import Link from 'next/link'

export default function LeistungenLayout({ children }) {
  return (
    <div className="min-h-screen bg-midnight text-on-surface">
      <Navbar />

      {/* Mobile breadcrumb — sticky below the fixed navbar */}
      <Breadcrumb />

      {/* Main content area — offset for fixed navbar height (3.5rem = h-14) */}
      <div className="pt-14">
        <div className="mx-auto flex max-w-[1280px]">
          <LeistungenNav />
          <main className="min-w-0 flex-1">
            {children}
          </main>
        </div>
      </div>

      <footer className="border-t border-border-dark">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 px-8 py-6">
          <Link
            href="/"
            className="font-mono text-xs text-on-surface-variant transition-colors hover:text-signal"
          >
            ← Zurück zur Startseite
          </Link>
          <div className="flex items-center gap-6">
            {footer.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-xs text-on-surface-variant transition-colors hover:text-signal"
              >
                {link.label}
              </Link>
            ))}
            <span className="font-mono text-xs text-on-surface/30">{footer.copyright}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
