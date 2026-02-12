"use client"

import { useGameState, getXpProgress, getXpForLevel } from "@/lib/game-store"
import { TrendingUp, Target, Flame, Timer, Trophy, Star } from "lucide-react"
import { useState, useEffect } from "react"

export function StatsPanel() {
  const state = useGameState()
  const [currentDay, setCurrentDay] = useState(-1)

  useEffect(() => {
    setCurrentDay(new Date().getDay())
  }, [])
  const xpProgress = getXpProgress(state.xp, state.level)
  const xpNeeded = getXpForLevel(state.level) - state.xp

  const stats = [
    {
      label: "XP Aujourd'hui",
      value: `+${state.todayTasksCompleted * 50}`,
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Quetes Completees",
      value: `${state.quests.filter(q => q.completed).length}/${state.quests.length}`,
      icon: Target,
      color: "text-[hsl(var(--info))]",
      bgColor: "bg-[hsl(var(--info))/0.1]",
    },
    {
      label: "Streak",
      value: `${state.streak} jours`,
      icon: Flame,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      label: "Sessions Pomodoro",
      value: state.pomodoroSessions.toString(),
      icon: Timer,
      color: "text-[hsl(var(--gold))]",
      bgColor: "bg-[hsl(var(--gold))/0.1]",
    },
    {
      label: "Total Taches",
      value: state.totalTasksCompleted.toString(),
      icon: Trophy,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Succes Debloques",
      value: `${state.achievements.filter(a => a.unlocked).length}/${state.achievements.length}`,
      icon: Star,
      color: "text-[hsl(var(--gold))]",
      bgColor: "bg-[hsl(var(--gold))/0.1]",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Character Card */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-4">
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 text-3xl font-bold text-primary animate-pulse-glow">
              {state.level < 5 ? "🧙" : state.level < 10 ? "⚔️" : "👑"}
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary font-mono text-xs font-bold text-primary-foreground">
              {state.level}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground">
              {state.level < 3 ? "Apprenti" : state.level < 5 ? "Guerrier" : state.level < 8 ? "Champion" : state.level < 10 ? "Heros" : "Legende"}
            </h3>
            <p className="text-sm text-muted-foreground">Niveau {state.level}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progression</span>
            <span className="font-mono text-primary">{state.xp} / {getXpForLevel(state.level)} XP</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-all duration-1000 ease-out"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Encore {xpNeeded} XP avant le niveau {state.level + 1}
          </p>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30"
          >
            <div className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
            <p className={`font-mono text-xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Streak Calendar */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="mb-4 text-sm font-semibold text-foreground">Activite de la Semaine</h3>
        <div className="flex items-center justify-between gap-2">
          {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day, i) => {
            const isActive = i < state.streak % 7 || state.streak >= 7
            const isToday = currentDay > 0 ? i === currentDay - 1 : i === 6
            return (
              <div key={day} className="flex flex-col items-center gap-2">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition-all ${
                    isActive
                      ? "bg-primary/20 text-primary"
                      : "bg-secondary text-muted-foreground"
                  } ${isToday ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}`}
                >
                  {isActive ? "✓" : ""}
                </div>
                <span className={`text-xs ${isToday ? "font-bold text-primary" : "text-muted-foreground"}`}>
                  {day}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
