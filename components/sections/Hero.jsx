import Button from '@/components/ui/Button'
import HeroShell from '@/components/sections/HeroShell.client'
import MagneticButton from '@/components/sections/MagneticButton.client'

export default function Hero() {
  return (
    <HeroShell
      tagline={
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-accent)] sm:text-xs sm:tracking-[0.35em] md:text-sm">
          Ihre Webseite verdient ein Upgrade
        </p>
      }
      headlineLines={[
        <span key="line-1" className="block">
          Wir bauen
        </span>,
        <span key="line-2" className="block text-outline">
          Webseiten
        </span>,
        <span key="line-3" className="block">
          die funktionieren.
        </span>,
      ]}
      copy={
        <p className="max-w-2xl font-mono text-sm leading-6 text-[var(--color-text)]/72 sm:leading-7 md:text-base">
          <span className="block">Design. Chatbots. Crypto-Payment.</span>
          <span className="block">Keine Buzzwords — nur Ergebnisse.</span>
        </p>
      }
      cta={
        <div className="flex w-full max-w-xl flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:gap-4">
          <MagneticButton href="#services" buttonClassName="w-full sm:w-auto">
            Leistungen ansehen
          </MagneticButton>
          <Button href="#kontakt" variant="ghost" className="w-full sm:w-auto">
            Unverbindlich anfragen
          </Button>
        </div>
      }
    />
  )
}
