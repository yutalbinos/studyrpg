"use client"

import { useGameState } from "@/lib/game-store"
import { useMemo } from "react"

// Pre-compute deterministic confetti positions based on index
function getConfettiStyle(i: number) {
  // Use a simple deterministic pseudo-random based on index
  const seed1 = ((i * 7 + 13) % 100)
  const seed2 = ((i * 11 + 3) % 30)
  const seed3 = ((i * 5 + 7) % 50) / 100
  const seed4 = ((i * 3 + 17) % 100) / 100
  return {
    left: `${seed1}%`,
    top: `${seed2}%`,
    backgroundColor: ["hsl(var(--primary))", "hsl(var(--gold))", "hsl(var(--info))", "hsl(var(--destructive))"][i % 4],
    animationDelay: `${seed3}s`,
    animationDuration: `${1 + seed4}s`,
  }
}

const confettiStyles = Array.from({ length: 30 }, (_, i) => getConfettiStyle(i))

export function LevelUpOverlay() {
  const { showLevelUp, level, showConfetti } = useGameState()

  if (!showConfetti && !showLevelUp) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]">
      {/* Confetti particles */}
      {showConfetti && (
        <div className="absolute inset-0 overflow-hidden">
          {confettiStyles.map((style, i) => (
            <div
              key={i}
              className="animate-confetti absolute h-2 w-2 rounded-full"
              style={style}
            />
          ))}
        </div>
      )}

      {/* Level up banner */}
      {showLevelUp && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-level-up rounded-2xl border border-primary/50 bg-background/95 px-8 py-6 text-center shadow-2xl shadow-primary/20 backdrop-blur-xl">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">
              Level Up
            </p>
            <p className="mt-2 font-mono text-6xl font-black text-foreground">{level}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {level < 3 ? "Apprenti" : level < 5 ? "Guerrier" : level < 8 ? "Champion" : level < 10 ? "Heros" : "Legende"}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
