"use client"

import { useGameState, getXpProgress, getPlayerPower } from "@/lib/game-store"
import { CLASSES } from "@/lib/game-data"
import { Flame, Coins, Zap, Shield, Swords } from "lucide-react"

export function GameHeader() {
  const state = useGameState()
  const { level, xp, gold, streak, playerName, playerClass } = state
  const xpProgress = getXpProgress(xp, level)
  const power = getPlayerPower(state)
  const classInfo = CLASSES.find(c => c.id === playerClass)

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5">
        {/* Logo + Player */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20 text-primary">
            <Zap className="h-5 w-5" />
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold leading-none tracking-tight text-foreground">
                {playerName || "QuestWork"}
              </h1>
              {classInfo && (
                <span className="rounded px-1.5 py-0.5 text-[9px] font-bold" style={{ backgroundColor: classInfo.color + "20", color: classInfo.color }}>
                  {classInfo.name}
                </span>
              )}
            </div>
            <p className="text-[10px] text-muted-foreground font-mono">Productivite RPG</p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Level + XP */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 font-mono text-xs font-bold text-primary">
              {level}
            </div>
            <div className="hidden w-24 sm:block">
              <div className="mb-0.5 flex items-center justify-between">
                <span className="text-[10px] font-medium text-muted-foreground">Nv {level}</span>
                <span className="font-mono text-[10px] text-primary">{Math.round(xpProgress)}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-primary transition-all duration-700 ease-out" style={{ width: `${xpProgress}%` }} />
              </div>
            </div>
          </div>

          {/* Power */}
          <div className="hidden items-center gap-1.5 rounded-lg bg-[hsl(var(--info))/0.1] px-2 py-1 sm:flex">
            <Shield className="h-3.5 w-3.5 text-[hsl(var(--info))]" />
            <span className="font-mono text-xs font-bold text-[hsl(var(--info))]">{power}</span>
          </div>

          {/* Gold */}
          <div className="flex items-center gap-1.5 rounded-lg bg-[hsl(var(--gold))/0.1] px-2 py-1">
            <Coins className="h-3.5 w-3.5 text-[hsl(var(--gold))]" />
            <span className="font-mono text-xs font-bold text-[hsl(var(--gold))]">{gold}</span>
          </div>

          {/* Streak */}
          <div className="flex items-center gap-1.5 rounded-lg bg-destructive/10 px-2 py-1">
            <Flame className="h-3.5 w-3.5 text-destructive" />
            <span className="font-mono text-xs font-bold text-destructive">{streak}j</span>
          </div>

          {/* Mobs killed mobile */}
          <div className="flex items-center gap-1.5 rounded-lg bg-[hsl(var(--chart-4))/0.1] px-2 py-1 sm:hidden">
            <Swords className="h-3.5 w-3.5 text-[hsl(var(--chart-4))]" />
            <span className="font-mono text-xs font-bold text-[hsl(var(--chart-4))]">{state.defeatedMobs.length}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
