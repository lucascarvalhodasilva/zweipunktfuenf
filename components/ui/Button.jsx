import Link from 'next/link'

const variants = {
  primary:
    'border border-[var(--color-accent)] bg-[var(--color-accent)] text-black hover:bg-transparent hover:text-[var(--color-accent)]',
  ghost:
    'border border-[var(--color-border)] bg-transparent text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]',
}

export default function Button({
  children,
  href,
  variant = 'primary',
  className = '',
  onClick,
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 font-mono text-xs uppercase tracking-[0.24em] transition-colors duration-300 ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  )
}
