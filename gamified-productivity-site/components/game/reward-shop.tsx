"use client"

import { useGameState, useGameActions } from "@/lib/game-store"
import { Coins, Lock, CheckCircle2, ShoppingBag, Sparkles } from "lucide-react"

interface Reward {
  id: string
  name: string
  description: string
  cost: number
  emoji: string
  category: "theme" | "boost" | "fun" | "power"
}

const rewards: Reward[] = [
  { id: "r1", name: "Pause Cafe", description: "Tu merites une pause de 15 min", cost: 20, emoji: "☕", category: "fun" },
  { id: "r2", name: "Musique Lo-fi", description: "Debloquer la playlist lo-fi exclusive", cost: 30, emoji: "🎵", category: "fun" },
  { id: "r3", name: "Double XP (1h)", description: "Prochaine heure: XP double", cost: 50, emoji: "⚡", category: "boost" },
  { id: "r4", name: "Snack Break", description: "Va chercher un snack sans culpabiliser", cost: 25, emoji: "🍕", category: "fun" },
  { id: "r5", name: "Skip une Quete", description: "Skip une quete sans perdre le streak", cost: 60, emoji: "🎯", category: "power" },
  { id: "r6", name: "Theme Neon", description: "Active le mode neon en bonus", cost: 100, emoji: "🌈", category: "theme" },
  { id: "r7", name: "Mega Boost", description: "Triple XP pendant 30 min", cost: 80, emoji: "🚀", category: "boost" },
  { id: "r8", name: "Journee Relax", description: "Complete tes quetes automatiquement demain", cost: 150, emoji: "🏖️", category: "power" },
  { id: "r9", name: "Badge Dore", description: "Un badge dore a cote de ton nom", cost: 200, emoji: "🏅", category: "theme" },
  { id: "r10", name: "Mode Boss", description: "Active le mode hardcore pour plus d'XP", cost: 120, emoji: "👑", category: "power" },
  { id: "r11", name: "Petite Sieste", description: "20 min de sieste bien meritee", cost: 40, emoji: "😴", category: "fun" },
  { id: "r12", name: "Titre Legendaire", description: "Debloquer le titre 'Legende de la Prod'", cost: 300, emoji: "⭐", category: "theme" },
]

const categoryColors: Record<string, string> = {
  theme: "text-primary bg-primary/10 border-primary/20",
  boost: "text-[hsl(var(--gold))] bg-[hsl(var(--gold))/0.1] border-[hsl(var(--gold))/0.2]",
  fun: "text-[hsl(var(--info))] bg-[hsl(var(--info))/0.1] border-[hsl(var(--info))/0.2]",
  power: "text-destructive bg-destructive/10 border-destructive/20",
}

export function RewardShop() {
  const { gold, unlockedRewards } = useGameState()
  const { buyReward } = useGameActions()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Boutique</h2>
          <p className="text-sm text-muted-foreground">Depense tes pieces d&apos;or</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-[hsl(var(--gold))/0.1] px-4 py-2">
          <Coins className="h-5 w-5 text-[hsl(var(--gold))]" />
          <span className="font-mono text-lg font-bold text-[hsl(var(--gold))]">{gold}</span>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {rewards.map((reward) => {
          const isOwned = unlockedRewards.includes(reward.id)
          const canAfford = gold >= reward.cost

          return (
            <div
              key={reward.id}
              className={`group relative overflow-hidden rounded-xl border p-4 transition-all ${
                isOwned
                  ? "border-primary/30 bg-primary/5"
                  : canAfford
                    ? "border-border bg-card hover:border-[hsl(var(--gold))/0.5] hover:shadow-lg hover:shadow-[hsl(var(--gold))/0.05]"
                    : "border-border bg-card opacity-60"
              }`}
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-2xl">
                  {reward.emoji}
                </div>
                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase ${categoryColors[reward.category]}`}>
                  {reward.category}
                </span>
              </div>

              <h4 className="font-semibold text-foreground">{reward.name}</h4>
              <p className="mt-1 text-xs text-muted-foreground">{reward.description}</p>

              <div className="mt-3">
                {isOwned ? (
                  <div className="flex items-center gap-1.5 text-sm font-medium text-primary">
                    <CheckCircle2 className="h-4 w-4" />
                    Obtenu
                  </div>
                ) : (
                  <button
                    onClick={() => buyReward(reward.id, reward.cost)}
                    disabled={!canAfford}
                    className={`flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm font-bold transition-all ${
                      canAfford
                        ? "bg-[hsl(var(--gold))/0.2] text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))/0.3]"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {canAfford ? (
                      <>
                        <Coins className="h-4 w-4" />
                        {reward.cost} or
                      </>
                    ) : (
                      <>
                        <Lock className="h-3.5 w-3.5" />
                        {reward.cost} or
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
