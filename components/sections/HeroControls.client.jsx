'use client'

import dynamic from 'next/dynamic'

const HeroButtonGroup = dynamic(
  () => import('@/components/ui/HeroButtonGroup'),
  { ssr: false },
)

export default function HeroControls({
  gameStatus,
  score,
  highScores,
  onStartGame,
  onPauseGame,
  scrollYProgress,
}) {
  return (
    <div>
      <HeroButtonGroup
        gameStatus={gameStatus}
        score={score}
        highScores={highScores}
        onStartGame={onStartGame}
        onPauseGame={onPauseGame}
        scrollYProgress={scrollYProgress}
      />
    </div>
  )
}
