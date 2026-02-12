"use client"

import { useState, useEffect } from "react"
import { useGameActions } from "@/lib/game-store"
import { Swords, Clock, Sparkles, CheckCircle2 } from "lucide-react"

const challenges = [
  { title: "Sprint de 90 min", description: "Travaille 90 min d'affilee sans distraction", xp: 150, gold: 30 },
  { title: "Inbox Zero", description: "Traite TOUS tes emails en attente", xp: 100, gold: 20 },
  { title: "No Phone Zone", description: "Pas de telephone pendant 2h de travail", xp: 120, gold: 25 },
  { title: "Early Bird", description: "Commence avant 8h et finis ta premiere tache", xp: 80, gold: 15 },
  { title: "3 Taches Dures", description: "Fais les 3 taches les plus difficiles en premier", xp: 130, gold: 28 },
  { title: "Mode Avion", description: "Coupe internet pendant 1h et bosse offline", xp: 110, gold: 22 },
  { title: "Revue Complete", description: "Fais le point sur tous tes projets en cours", xp: 90, gold: 18 },
]

export function DailyChallenge() {
  const [challenge, setChallenge] = useState<typeof challenges[number] | null>(null)
  const [timeLeft, setTimeLeft] = useState("--h --m")
  const [completed, setCompleted] = useState(false)
  const { completeQuest } = useGameActions()

  useEffect(() => {
    // Deterministic daily challenge based on date
    const dayIndex = new Date().getDate() % challenges.length
    setChallenge(challenges[dayIndex])

    const updateTimer = () => {
      const now = new Date()
      const midnight = new Date(now)
      midnight.setHours(24, 0, 0, 0)
      const diff = midnight.getTime() - now.getTime()
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      setTimeLeft(`${hours}h ${mins}m`)
    }

    updateTimer()
    const interval = setInterval(updateTimer, 60000)
    return () => clearInterval(interval)
  }, [])

  const handleComplete = () => {
    if (completed) return
    setCompleted(true)
  }

  const displayChallenge = challenge ?? { title: "Chargement...", description: "", xp: 0, gold: 0 }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[hsl(var(--gold))/0.3] bg-[hsl(var(--gold))/0.05] p-6">
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[hsl(var(--gold))/0.05]" />
      <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-[hsl(var(--gold))/0.03]" />

      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Swords className="h-5 w-5 text-[hsl(var(--gold))]" />
            <h3 className="font-bold text-foreground">Defi du Jour</h3>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg bg-secondary/80 px-2.5 py-1">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-mono text-xs text-muted-foreground">{timeLeft}</span>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-lg font-bold text-[hsl(var(--gold))]">{displayChallenge.title}</h4>
          <p className="mt-1 text-sm text-muted-foreground">{displayChallenge.description}</p>
        </div>

        <div className="mb-4 flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-mono text-sm font-bold text-primary">+{displayChallenge.xp} XP</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-sm font-bold text-[hsl(var(--gold))]">+{displayChallenge.gold} or</span>
          </div>
        </div>

        <button
          onClick={handleComplete}
          disabled={completed || !challenge}
          className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all ${
            completed
              ? "bg-primary/20 text-primary"
              : "bg-[hsl(var(--gold))/0.2] text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))/0.3] hover:scale-[1.02] active:scale-[0.98]"
          }`}
        >
          {completed ? (
            <>
              <CheckCircle2 className="h-4 w-4" />
              Defi Complete !
            </>
          ) : (
            <>
              <Swords className="h-4 w-4" />
              Valider le Defi
            </>
          )}
        </button>
      </div>
    </div>
  )
}
