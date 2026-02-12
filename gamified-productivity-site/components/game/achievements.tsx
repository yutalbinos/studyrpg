"use client"

import { useGameState, type Achievement } from "@/lib/game-store"
import { Lock, Footprints, Flame, Zap, Timer, Trophy, Crown, Gem, Star, Coins, Mountain } from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  footprints: Footprints,
  flame: Flame,
  zap: Zap,
  timer: Timer,
  trophy: Trophy,
  crown: Crown,
  gem: Gem,
  star: Star,
  coins: Coins,
  mountain: Mountain,
}

const rarityConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
  common: { label: "Commun", color: "text-muted-foreground", bg: "bg-secondary", border: "border-border" },
  rare: { label: "Rare", color: "text-[hsl(var(--info))]", bg: "bg-[hsl(var(--info))/0.1]", border: "border-[hsl(var(--info))/0.3]" },
  epic: { label: "Epique", color: "text-primary", bg: "bg-primary/10", border: "border-primary/30" },
  legendary: { label: "Legendaire", color: "text-[hsl(var(--gold))]", bg: "bg-[hsl(var(--gold))/0.1]", border: "border-[hsl(var(--gold))/0.3]" },
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const Icon = iconMap[achievement.icon] || Star
  const rarity = rarityConfig[achievement.rarity]

  return (
    <div
      className={`relative overflow-hidden rounded-xl border p-4 transition-all ${
        achievement.unlocked
          ? `${rarity.border} ${rarity.bg}`
          : "border-border bg-card opacity-60"
      }`}
    >
      {achievement.rarity === "legendary" && achievement.unlocked && (
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_40%,hsl(var(--gold)/0.08)_50%,transparent_60%)] animate-shimmer" />
      )}
      <div className="relative flex items-center gap-3">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
            achievement.unlocked ? rarity.bg : "bg-secondary"
          }`}
        >
          {achievement.unlocked ? (
            <Icon className={`h-6 w-6 ${rarity.color}`} />
          ) : (
            <Lock className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className={`text-sm font-semibold ${achievement.unlocked ? "text-foreground" : "text-muted-foreground"}`}>
              {achievement.title}
            </h4>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${rarity.color} ${rarity.bg}`}>
              {rarity.label}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">{achievement.description}</p>
        </div>
      </div>
    </div>
  )
}

export function AchievementsPanel() {
  const { achievements } = useGameState()
  const unlockedCount = achievements.filter(a => a.unlocked).length

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Succes</h2>
          <p className="text-sm text-muted-foreground">
            {unlockedCount}/{achievements.length} debloques
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-[hsl(var(--gold))]" />
          <span className="font-mono text-lg font-bold text-[hsl(var(--gold))]">{unlockedCount}</span>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {achievements.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </div>
  )
}
