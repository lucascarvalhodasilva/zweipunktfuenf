import Button from '@/components/ui/Button'
import HeroShell from '@/components/sections/HeroShell.client'
import MagneticButton from '@/components/sections/MagneticButton.client'
import { hero } from '@/lib/content'

export default function Hero() {
  return (
    <HeroShell
      tagline={
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-accent)] sm:text-xs sm:tracking-[0.35em] md:text-sm">
          {hero.tagline}
        </p>
      }
      headlineLines={[
        <span key="line-1" className="block">
          {hero.headline[0]}
        </span>,
        <span key="line-2" className="block text-outline">
          {hero.headline[1]}
        </span>,
        <span key="line-3" className="block">
          {hero.headline[2]}
        </span>,
      ]}
      copy={
        <p className="max-w-2xl font-mono text-sm leading-6 text-[var(--color-text)]/72 sm:leading-7 md:text-base">
          <span className="block">{hero.copy[0]}</span>
          <span className="block">{hero.copy[1]}</span>
        </p>
      }
      cta={
        <div className="flex w-full max-w-xl flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:gap-4">
          <MagneticButton href="#services" buttonClassName="w-full sm:w-auto">
            {hero.cta.primary}
          </MagneticButton>
          <Button href="#kontakt" variant="ghost" className="w-full sm:w-auto">
            {hero.cta.secondary}
          </Button>
        </div>
      }
    />
  )
}
