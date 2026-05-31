export default function Eyebrow({ children, action }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <span className="eyebrow-label font-mono text-xs text-signal">{children}</span>
      <div className="eyebrow-line h-px flex-grow bg-border-dark" />
      {action && action}
    </div>
  )
}
