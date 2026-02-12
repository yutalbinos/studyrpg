"use client"

import { useState } from "react"
import { useGameState, useGameActions, getPlayerPower } from "@/lib/game-store"
import { DUNGEONS, ALL_MOBS, BIOMES, MOB_TYPE_LABELS } from "@/lib/game-data"
import { Swords, Lock, CheckCircle2, Shield, Star, Coins, Skull, Crown, ChevronRight, X, Layers } from "lucide-react"

export function DungeonSystem() {
  const state = useGameState()
  const actions = useGameActions()
  const power = getPlayerPower(state)
  const [selectedDungeon, setSelectedDungeon] = useState<string | null>(null)
  const [confirmComplete, setConfirmComplete] = useState<string | null>(null)

  const dungeon = selectedDungeon ? DUNGEONS.find(d => d.id === selectedDungeon) : null
  const dungeonBoss = dungeon ? ALL_MOBS.find(m => m.id === dungeon.bossId) : null
  const dungeonBiome = dungeon ? BIOMES.find(b => b.id === dungeon.biome) : null

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Donjons</h2>
          <p className="text-sm text-muted-foreground">Conquiers les 20 donjons pour atteindre le Throne du Neant</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-[hsl(var(--info))/0.1] px-3 py-1.5">
            <Shield className="h-4 w-4 text-[hsl(var(--info))]" />
            <span className="font-mono text-sm font-bold text-[hsl(var(--info))]">{power} PWR</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-primary/10 px-3 py-1.5">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <span className="font-mono text-sm font-bold text-primary">{state.completedDungeons.length}/{DUNGEONS.length}</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-all duration-700"
          style={{ width: `${(state.completedDungeons.length / DUNGEONS.length) * 100}%` }}
        />
      </div>

      {!dungeon ? (
        /* Dungeon List */
        <div className="space-y-2">
          {DUNGEONS.map((d, i) => {
            const completed = state.completedDungeons.includes(d.id)
            const canEnter = power >= d.requiredPower && state.level >= d.levelReq
            const biome = BIOMES.find(b => b.id === d.biome)
            const boss = ALL_MOBS.find(m => m.id === d.bossId)
            const prevCompleted = i === 0 || state.completedDungeons.includes(DUNGEONS[i - 1].id)

            return (
              <button
                key={d.id}
                onClick={() => setSelectedDungeon(d.id)}
                disabled={!prevCompleted && !completed}
                className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all ${
                  completed
                    ? "border-primary/30 bg-primary/5"
                    : canEnter && prevCompleted
                      ? "border-border hover:border-primary/30 hover:bg-secondary/50"
                      : "border-border/40 bg-secondary/20 opacity-50"
                }`}
              >
                {/* Number */}
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-mono text-sm font-bold ${
                  completed ? "bg-primary/20 text-primary" : canEnter ? "bg-secondary text-foreground" : "bg-secondary/50 text-muted-foreground"
                }`}>
                  {completed ? <CheckCircle2 className="h-5 w-5" /> : i + 1}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">{d.name}</span>
                    <span className="text-[10px] text-muted-foreground">{biome?.name}</span>
                  </div>
                  <div className="mt-0.5 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Layers className="h-3 w-3" /> {d.floors} etages
                    </span>
                    <span className="flex items-center gap-1">
                      <Shield className="h-3 w-3" /> PWR {d.requiredPower}
                    </span>
                    <span className="flex items-center gap-1">
                      <Skull className="h-3 w-3" /> Nv. {d.levelReq}
                    </span>
                    {boss && (
                      <span className="flex items-center gap-1">
                        <Crown className="h-3 w-3 text-[hsl(var(--gold))]" /> {boss.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Rewards preview */}
                <div className="hidden shrink-0 items-center gap-3 sm:flex">
                  <span className="font-mono text-xs font-bold text-primary">+{d.xpReward} XP</span>
                  <span className="font-mono text-xs font-bold text-[hsl(var(--gold))]">+{d.goldReward} or</span>
                </div>

                {completed ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                ) : !prevCompleted ? (
                  <Lock className="h-4 w-4 shrink-0 text-muted-foreground" />
                ) : !canEnter ? (
                  <Lock className="h-4 w-4 shrink-0 text-destructive" />
                ) : (
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                )}
              </button>
            )
          })}
        </div>
      ) : (
        /* Dungeon Detail */
        <div className="space-y-4">
          <button onClick={() => { setSelectedDungeon(null); setConfirmComplete(null) }} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ChevronRight className="h-3.5 w-3.5 rotate-180" /> Retour aux donjons
          </button>

          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-foreground">{dungeon.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{dungeon.description}</p>
                {dungeonBiome && <p className="mt-0.5 text-xs text-muted-foreground font-serif">{dungeonBiome.name}</p>}
              </div>
              {state.completedDungeons.includes(dungeon.id) && (
                <div className="rounded-xl bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">Complete</div>
              )}
            </div>

            {/* Stats grid */}
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl bg-secondary p-3 text-center">
                <Layers className="mx-auto mb-1 h-5 w-5 text-muted-foreground" />
                <p className="font-mono text-lg font-bold text-foreground">{dungeon.floors}</p>
                <p className="text-[10px] text-muted-foreground">Etages</p>
              </div>
              <div className="rounded-xl bg-secondary p-3 text-center">
                <Shield className="mx-auto mb-1 h-5 w-5 text-[hsl(var(--info))]" />
                <p className={`font-mono text-lg font-bold ${power >= dungeon.requiredPower ? "text-primary" : "text-destructive"}`}>{dungeon.requiredPower}</p>
                <p className="text-[10px] text-muted-foreground">PWR requis ({power})</p>
              </div>
              <div className="rounded-xl bg-secondary p-3 text-center">
                <Star className="mx-auto mb-1 h-5 w-5 text-primary" />
                <p className="font-mono text-lg font-bold text-primary">{dungeon.xpReward}</p>
                <p className="text-[10px] text-muted-foreground">XP</p>
              </div>
              <div className="rounded-xl bg-secondary p-3 text-center">
                <Coins className="mx-auto mb-1 h-5 w-5 text-[hsl(var(--gold))]" />
                <p className="font-mono text-lg font-bold text-[hsl(var(--gold))]">{dungeon.goldReward}</p>
                <p className="text-[10px] text-muted-foreground">Or</p>
              </div>
            </div>

            {/* Boss */}
            {dungeonBoss && (
              <div className="mb-6 rounded-xl border border-[hsl(var(--gold))/0.3] bg-[hsl(var(--gold))/0.05] p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Crown className="h-5 w-5 text-[hsl(var(--gold))]" />
                  <h4 className="font-bold text-[hsl(var(--gold))]">Boss: {dungeonBoss.name}</h4>
                </div>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  <div className="rounded-lg bg-destructive/10 p-2 text-center">
                    <span className="font-mono text-sm font-bold text-destructive">{dungeonBoss.hp}</span>
                    <p className="text-[9px] text-muted-foreground">HP</p>
                  </div>
                  <div className="rounded-lg bg-[hsl(var(--chart-5))/0.1] p-2 text-center">
                    <span className="font-mono text-sm font-bold text-[hsl(var(--chart-5))]">{dungeonBoss.atk}</span>
                    <p className="text-[9px] text-muted-foreground">ATK</p>
                  </div>
                  <div className="rounded-lg bg-[hsl(var(--info))/0.1] p-2 text-center">
                    <span className="font-mono text-sm font-bold text-[hsl(var(--info))]">{dungeonBoss.def}</span>
                    <p className="text-[9px] text-muted-foreground">DEF</p>
                  </div>
                  <div className="rounded-lg bg-[hsl(var(--chart-4))/0.1] p-2 text-center">
                    <span className="font-mono text-sm font-bold text-[hsl(var(--chart-4))]">Nv.{dungeonBoss.level}</span>
                    <p className="text-[9px] text-muted-foreground">Niveau</p>
                  </div>
                </div>
                <div className="rounded-lg bg-card/50 border border-border p-3">
                  <p className="text-xs font-bold text-muted-foreground mb-1">Quete pour vaincre :</p>
                  <p className="text-sm text-foreground">{dungeonBoss.questDescription}</p>
                </div>
              </div>
            )}

            {/* Action */}
            {state.completedDungeons.includes(dungeon.id) ? (
              <div className="flex items-center justify-center gap-2 rounded-xl bg-primary/10 py-3.5 text-sm font-bold text-primary">
                <CheckCircle2 className="h-5 w-5" />
                Donjon complete
              </div>
            ) : power < dungeon.requiredPower || state.level < dungeon.levelReq ? (
              <div className="rounded-xl bg-destructive/10 py-3.5 text-center">
                <div className="flex items-center justify-center gap-2 text-sm font-bold text-destructive">
                  <Lock className="h-4 w-4" />
                  Puissance insuffisante
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {power < dungeon.requiredPower && `PWR: ${power}/${dungeon.requiredPower}`}
                  {power < dungeon.requiredPower && state.level < dungeon.levelReq && " | "}
                  {state.level < dungeon.levelReq && `Niv: ${state.level}/${dungeon.levelReq}`}
                </p>
              </div>
            ) : confirmComplete === dungeon.id ? (
              <div className="space-y-2">
                <p className="text-center text-sm text-muted-foreground">
                  As-tu bien complete la quete du boss ?
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setConfirmComplete(null)}
                    className="flex-1 rounded-xl bg-secondary py-3 text-sm font-bold text-muted-foreground hover:bg-secondary/80"
                  >
                    Non, pas encore
                  </button>
                  <button
                    onClick={() => {
                      actions.completeDungeon(dungeon.id, dungeon.xpReward, dungeon.goldReward)
                      if (dungeonBoss && !state.defeatedMobs.includes(dungeonBoss.id)) {
                        actions.defeatMob(dungeonBoss.id, dungeonBoss.xpReward, dungeonBoss.goldReward)
                      }
                      setConfirmComplete(null)
                    }}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary/15 py-3 text-sm font-bold text-primary hover:bg-primary/25"
                  >
                    <Swords className="h-4 w-4" />
                    Confirmer
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setConfirmComplete(dungeon.id)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-destructive/15 py-3.5 text-sm font-bold text-destructive transition-all hover:bg-destructive/25 hover:scale-[1.01] active:scale-[0.99]"
              >
                <Swords className="h-4 w-4" />
                Entrer dans le donjon
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
