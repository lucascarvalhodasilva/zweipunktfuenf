'use client'

export default function Snake({ gameStatus, score, highScores, onStart, onPause }) {
  const statusLabel =
    gameStatus === 'idle'
      ? 'bereit'
      : gameStatus === 'running'
        ? 'aktiv'
        : gameStatus === 'paused'
          ? 'pausiert'
          : 'verloren'

  return (
    <div className="space-y-5">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-accent)]">
          Spielmenue
        </p>
      </div>
      <div className="space-y-3">
        <button
          type="button"
          onClick={onStart}
          className="flex min-h-11 w-full items-center justify-center rounded-full border border-[var(--color-accent)] bg-[var(--color-accent)] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-black transition-colors duration-300 hover:bg-transparent hover:text-[var(--color-accent)]"
        >
          {gameStatus === 'running' || gameStatus === 'paused' ? 'Neustart' : 'Start'}
        </button>
        <button
          type="button"
          onClick={onPause}
          disabled={gameStatus === 'idle' || gameStatus === 'game-over'}
          className="flex min-h-11 w-full items-center justify-center rounded-full border border-[var(--color-border)] bg-transparent px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-text)] transition-colors duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {gameStatus === 'paused' ? 'Weiter' : 'Pause'}
        </button>
      </div>
      <div className="space-y-2 border-t border-[var(--color-border)] pt-4">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-text)]/72">
          <span>Status</span>
          <span className="text-[var(--color-accent)]">{statusLabel}</span>
        </div>
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-text)]/72">
          <span>Punkte</span>
          <span className="text-[var(--color-text)]">{score}</span>
        </div>
      </div>
      <div className="space-y-2 border-t border-[var(--color-border)] pt-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-muted)]">
          Bestenliste
        </p>
        {highScores.map((entry, index) => (
          <div
            key={`${entry}-${index}`}
            className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-text)]/78"
          >
            <span>#{index + 1}</span>
            <span>{entry}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
