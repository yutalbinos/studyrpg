"use client"

import { useGameState, useGameActions, type Quest } from "@/lib/game-store"
import { CheckCircle2, Circle, Timer, Heart, BookOpen, Users, Crown, Flame, Sunrise, Check, Zap } from "lucide-react"
import { useState } from "react"

const categoryIcons: Record<string, React.ElementType> = {
  focus: Zap,
  health: Heart,
  learning: BookOpen,
  social: Users,
}

const categoryColors: Record<string, string> = {
  focus: "text-[hsl(var(--info))] bg-[hsl(var(--info))/0.1]",
  health: "text-primary bg-primary/10",
  learning: "text-[hsl(var(--gold))] bg-[hsl(var(--gold))/0.1]",
  social: "text-destructive bg-destructive/10",
}

const difficultyConfig: Record<string, { label: string; color: string; stars: number }> = {
  easy: { label: "Facile", color: "text-primary", stars: 1 },
  medium: { label: "Normal", color: "text-[hsl(var(--info))]", stars: 2 },
  hard: { label: "Difficile", color: "text-[hsl(var(--gold))]", stars: 3 },
  legendary: { label: "Legendaire", color: "text-destructive", stars: 4 },
}

function QuestCard({ quest }: { quest: Quest }) {
  const { completeQuest } = useGameActions()
  const [justCompleted, setJustCompleted] = useState(false)
  const CategoryIcon = categoryIcons[quest.category] || Zap
  const diff = difficultyConfig[quest.difficulty]

  const handleComplete = () => {
    if (quest.completed) return
    setJustCompleted(true)
    completeQuest(quest.id)
    setTimeout(() => setJustCompleted(false), 1500)
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border transition-all duration-300 ${
        quest.completed
          ? "border-primary/30 bg-primary/5"
          : "border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
      } ${justCompleted ? "animate-level-up" : ""}`}
    >
      {quest.difficulty === "legendary" && !quest.completed && (
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_40%,hsl(var(--gold)/0.05)_50%,transparent_60%)] animate-shimmer" />
      )}
      
      <div className="relative p-4">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${categoryColors[quest.category]}`}>
              <CategoryIcon className="h-5 w-5" />
            </div>
            <div>
              <h4 className={`font-semibold leading-tight ${quest.completed ? "text-muted-foreground line-through" : "text-foreground"}`}>
                {quest.title}
              </h4>
              <p className="mt-0.5 text-xs text-muted-foreground">{quest.description}</p>
            </div>
          </div>
          <button
            onClick={handleComplete}
            disabled={quest.completed}
            className="shrink-0 transition-transform hover:scale-110 active:scale-95 disabled:cursor-default"
            aria-label={quest.completed ? "Quete completee" : "Completer la quete"}
          >
            {quest.completed ? (
              <CheckCircle2 className="h-7 w-7 text-primary" />
            ) : (
              <Circle className="h-7 w-7 text-muted-foreground group-hover:text-primary" />
            )}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-primary">+{quest.xpReward} XP</span>
            <span className="font-mono text-sm font-bold text-[hsl(var(--gold))]">+{quest.goldReward} or</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`text-xs font-medium ${diff.color}`}>{diff.label}</span>
            <div className="flex gap-0.5">
              {Array.from({ length: diff.stars }).map((_, i) => (
                <span key={i} className={`text-xs ${diff.color}`}>{"★"}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function QuestBoard() {
  const { quests } = useGameState()
  const [filter, setFilter] = useState<string>("all")

  const filteredQuests = filter === "all" ? quests : quests.filter(q => q.category === filter)
  const completedCount = quests.filter(q => q.completed).length

  const filters = [
    { id: "all", label: "Toutes", icon: Crown },
    { id: "focus", label: "Focus", icon: Zap },
    { id: "health", label: "Sante", icon: Heart },
    { id: "learning", label: "Savoir", icon: BookOpen },
    { id: "social", label: "Social", icon: Users },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Quetes du Jour</h2>
          <p className="text-sm text-muted-foreground">
            {completedCount}/{quests.length} completees
          </p>
        </div>
        <div className="flex h-2 w-24 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${(completedCount / quests.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              filter === f.id
                ? "bg-primary/20 text-primary"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
            }`}
          >
            <f.icon className="h-3.5 w-3.5" />
            {f.label}
          </button>
        ))}
      </div>

      {/* Quest List */}
      <div className="space-y-3">
        {filteredQuests.map((quest) => (
          <QuestCard key={quest.id} quest={quest} />
        ))}
      </div>
    </div>
  )
}
