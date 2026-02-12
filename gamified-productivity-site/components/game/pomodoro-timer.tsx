"use client"

import { useGameState, useGameActions } from "@/lib/game-store"
import { Play, Pause, RotateCcw, Coffee, Zap } from "lucide-react"
import { useEffect, useRef } from "react"

export function PomodoroTimer() {
  const { pomodoroTime, pomodoroRunning, pomodoroSessions } = useGameState()
  const { setPomodoroRunning, setPomodoroTime, completePomodoroSession } = useGameActions()
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const minutes = Math.floor(pomodoroTime / 60)
  const seconds = pomodoroTime % 60
  const totalTime = 25 * 60
  const progress = ((totalTime - pomodoroTime) / totalTime) * 100
  const circumference = 2 * Math.PI * 90

  useEffect(() => {
    if (pomodoroRunning && pomodoroTime > 0) {
      intervalRef.current = setInterval(() => {
        setPomodoroTime(pomodoroTime - 1)
      }, 1000)
    } else if (pomodoroTime === 0 && pomodoroRunning) {
      completePomodoroSession()
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [pomodoroRunning, pomodoroTime, setPomodoroTime, completePomodoroSession])

  const handleReset = () => {
    setPomodoroRunning(false)
    setPomodoroTime(25 * 60)
  }

  const toggleTimer = () => {
    setPomodoroRunning(!pomodoroRunning)
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-foreground">Pomodoro</h3>
          <p className="text-xs text-muted-foreground">
            {pomodoroSessions} sessions completees
          </p>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(pomodoroSessions % 4, 3) }).map((_, i) => (
            <div key={i} className="h-2 w-2 rounded-full bg-primary" />
          ))}
          {Array.from({ length: Math.max(3 - (pomodoroSessions % 4), 0) }).map((_, i) => (
            <div key={i} className="h-2 w-2 rounded-full bg-secondary" />
          ))}
          <Coffee className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
        </div>
      </div>

      {/* Circular Timer */}
      <div className="relative mx-auto mb-6 flex h-52 w-52 items-center justify-center">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="hsl(var(--secondary))"
            strokeWidth="6"
          />
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (progress / 100) * circumference}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        <div className="z-10 text-center">
          <p className={`font-mono text-4xl font-bold tabular-nums ${pomodoroRunning ? "text-primary" : "text-foreground"}`}>
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {pomodoroRunning ? "En cours..." : "Pret a bosser ?"}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={handleReset}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-muted-foreground transition-all hover:bg-secondary/80 hover:text-foreground"
          aria-label="Reinitialiser le timer"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
        <button
          onClick={toggleTimer}
          className={`flex h-14 w-14 items-center justify-center rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 ${
            pomodoroRunning
              ? "bg-[hsl(var(--gold))] text-[hsl(var(--gold))]/90 shadow-lg shadow-[hsl(var(--gold))/0.3]"
              : "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
          }`}
          aria-label={pomodoroRunning ? "Pause" : "Demarrer"}
        >
          {pomodoroRunning ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
        </button>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Zap className="h-4 w-4" />
          <span className="ml-0.5 font-mono text-xs font-bold">+25</span>
        </div>
      </div>

      {/* Session bonuses */}
      <div className="mt-4 rounded-lg bg-secondary/50 p-3">
        <p className="text-center text-xs text-muted-foreground">
          Chaque session donne <span className="font-bold text-primary">+25 XP</span> et{" "}
          <span className="font-bold text-[hsl(var(--gold))]">+5 or</span>
        </p>
      </div>
    </div>
  )
}
