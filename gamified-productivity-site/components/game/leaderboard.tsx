"use client"

import { useGameState } from "@/lib/game-store"
import { Crown, TrendingUp, Minus, TrendingDown } from "lucide-react"

interface LeaderboardEntry {
  rank: number
  name: string
  level: number
  xp: number
  streak: number
  trend: "up" | "same" | "down"
  isPlayer: boolean
}

export function Leaderboard() {
  const state = useGameState()

  const entries: LeaderboardEntry[] = [
    { rank: 1, name: "ShadowCoder_99", level: 12, xp: 2340, streak: 15, trend: "same", isPlayer: false },
    { rank: 2, name: "ProdMaster_X", level: 10, xp: 1980, streak: 22, trend: "up", isPlayer: false },
    { rank: 3, name: "FocusNinja", level: 9, xp: 1650, streak: 8, trend: "down", isPlayer: false },
    { rank: 4, name: "CodeWizard42", level: 8, xp: 1420, streak: 11, trend: "up", isPlayer: false },
    { rank: 5, name: "Toi", level: state.level, xp: state.xp, streak: state.streak, trend: "up", isPlayer: true },
    { rank: 6, name: "DeepWorker", level: 6, xp: 890, streak: 4, trend: "down", isPlayer: false },
    { rank: 7, name: "ZenMaster_27", level: 5, xp: 720, streak: 6, trend: "same", isPlayer: false },
    { rank: 8, name: "TaskSlayer", level: 4, xp: 580, streak: 3, trend: "up", isPlayer: false },
  ].sort((a, b) => b.xp - a.xp).map((e, i) => ({ ...e, rank: i + 1 }))

  const trendIcons = {
    up: <TrendingUp className="h-3.5 w-3.5 text-primary" />,
    same: <Minus className="h-3.5 w-3.5 text-muted-foreground" />,
    down: <TrendingDown className="h-3.5 w-3.5 text-destructive" />,
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-foreground">Classement</h2>
        <p className="text-sm text-muted-foreground">Cette semaine</p>
      </div>

      <div className="space-y-2">
        {entries.map((entry) => (
          <div
            key={entry.rank}
            className={`flex items-center gap-4 rounded-xl border p-3 transition-all ${
              entry.isPlayer
                ? "border-primary/50 bg-primary/5 shadow-lg shadow-primary/5"
                : "border-border bg-card hover:border-border/80"
            }`}
          >
            {/* Rank */}
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-sm font-bold ${
              entry.rank === 1 ? "bg-[hsl(var(--gold))/0.2] text-[hsl(var(--gold))]" :
              entry.rank === 2 ? "bg-secondary text-muted-foreground" :
              entry.rank === 3 ? "bg-destructive/10 text-destructive" :
              "bg-secondary text-muted-foreground"
            }`}>
              {entry.rank <= 3 ? (
                entry.rank === 1 ? <Crown className="h-4 w-4" /> : `#${entry.rank}`
              ) : `#${entry.rank}`}
            </div>

            {/* Avatar + Name */}
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold ${
                entry.isPlayer ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
              }`}>
                Lv{entry.level}
              </div>
              <div className="min-w-0">
                <p className={`truncate text-sm font-semibold ${entry.isPlayer ? "text-primary" : "text-foreground"}`}>
                  {entry.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  Streak: {entry.streak}j
                </p>
              </div>
            </div>

            {/* XP + Trend */}
            <div className="flex items-center gap-2 text-right">
              <span className="font-mono text-sm font-bold text-foreground">{entry.xp.toLocaleString()} XP</span>
              {trendIcons[entry.trend]}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
