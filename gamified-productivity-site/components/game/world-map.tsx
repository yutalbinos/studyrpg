"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { useGameState, useGameActions, getPlayerPower } from "@/lib/game-store"
import { BIOMES, ALL_MOBS, DUNGEONS, MOB_TYPE_LABELS, type Mob, type Biome } from "@/lib/game-data"
import { X, Skull, Swords, Crown, Shield, Star, Lock, CheckCircle2, ChevronRight, MapPin, ZoomIn, ZoomOut, Locate } from "lucide-react"

export function WorldMap() {
  const state = useGameState()
  const actions = useGameActions()
  const power = getPlayerPower(state)

  const [selectedBiome, setSelectedBiome] = useState<Biome | null>(null)
  const [selectedMob, setSelectedMob] = useState<Mob | null>(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const mapRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) return
    setIsDragging(true)
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }, [pan])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y })
  }, [isDragging, dragStart])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    setZoom(prev => Math.max(0.3, Math.min(3, prev - e.deltaY * 0.001)))
  }, [])

  const resetView = useCallback(() => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }, [])

  const biomeMobs = selectedBiome
    ? ALL_MOBS.filter(m => m.biome === selectedBiome.id)
    : []

  const biomeDungeons = selectedBiome
    ? DUNGEONS.filter(d => d.biome === selectedBiome.id)
    : []

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Carte du Monde</h2>
          <p className="text-sm text-muted-foreground">Explore les biomes, combats les monstres, conquiers le monde</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-[hsl(var(--info))/0.1] px-3 py-1.5">
          <Shield className="h-4 w-4 text-[hsl(var(--info))]" />
          <span className="font-mono text-sm font-bold text-[hsl(var(--info))]">{power} PWR</span>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card" style={{ height: "65vh", minHeight: "420px" }}>
        {/* Zoom Controls */}
        <div className="absolute right-3 top-3 z-20 flex flex-col gap-1.5">
          <button onClick={() => setZoom(z => Math.min(3, z + 0.3))} className="flex h-8 w-8 items-center justify-center rounded-lg bg-card/90 border border-border text-foreground backdrop-blur-sm hover:bg-secondary" aria-label="Zoom in">
            <ZoomIn className="h-4 w-4" />
          </button>
          <button onClick={() => setZoom(z => Math.max(0.3, z - 0.3))} className="flex h-8 w-8 items-center justify-center rounded-lg bg-card/90 border border-border text-foreground backdrop-blur-sm hover:bg-secondary" aria-label="Zoom out">
            <ZoomOut className="h-4 w-4" />
          </button>
          <button onClick={resetView} className="flex h-8 w-8 items-center justify-center rounded-lg bg-card/90 border border-border text-foreground backdrop-blur-sm hover:bg-secondary" aria-label="Reset view">
            <Locate className="h-4 w-4" />
          </button>
        </div>

        {/* Zoom indicator */}
        <div className="absolute left-3 top-3 z-20 rounded-lg bg-card/90 border border-border px-2 py-1 backdrop-blur-sm">
          <span className="font-mono text-xs text-muted-foreground">{Math.round(zoom * 100)}%</span>
        </div>

        {/* Draggable Map */}
        <div
          ref={mapRef}
          className="h-full w-full cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          role="application"
          aria-label="Carte interactive du monde"
        >
          <div
            className="relative h-full w-full"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: "center center",
              transition: isDragging ? "none" : "transform 0.2s ease-out",
            }}
          >
            {/* Map Background - Grid lines for old map feel */}
            <svg className="absolute inset-0 h-full w-full opacity-5" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Compass rose hint */}
            <div className="absolute right-[8%] top-[5%] text-muted-foreground/10">
              <div className="flex flex-col items-center font-serif text-xs">
                <span>N</span>
                <div className="flex items-center gap-3">
                  <span>O</span>
                  <span className="text-lg">+</span>
                  <span>E</span>
                </div>
                <span>S</span>
              </div>
            </div>

            {/* Connection Lines between adjacent biomes */}
            <svg className="absolute inset-0 h-full w-full pointer-events-none" preserveAspectRatio="none">
              {BIOMES.map((biome, i) => {
                const nextBiomes = BIOMES.filter((b, j) => {
                  if (j <= i) return false
                  const dx = Math.abs(b.x - biome.x)
                  const dy = Math.abs(b.y - biome.y)
                  return dx < 22 && dy < 22
                })
                return nextBiomes.map(next => (
                  <line
                    key={`${biome.id}-${next.id}`}
                    x1={`${biome.x + biome.width / 2}%`}
                    y1={`${biome.y + biome.height / 2}%`}
                    x2={`${next.x + next.width / 2}%`}
                    y2={`${next.y + next.height / 2}%`}
                    stroke="hsl(var(--border))"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    opacity="0.4"
                  />
                ))
              })}
            </svg>

            {/* Biome regions */}
            {BIOMES.map((biome) => {
              const biomeMobsList = ALL_MOBS.filter(m => m.biome === biome.id)
              const defeatedCount = biomeMobsList.filter(m => state.defeatedMobs.includes(m.id)).length
              const totalCount = biomeMobsList.length
              const progress = totalCount > 0 ? (defeatedCount / totalCount) * 100 : 0
              const isStartIsland = biome.id === "ile-depart"
              const isAccessible = state.level >= biome.levelRange[0]
              const isComplete = progress === 100 && totalCount > 0

              return (
                <button
                  key={biome.id}
                  onClick={() => setSelectedBiome(biome)}
                  className={`absolute flex flex-col items-center justify-center rounded-xl border transition-all hover:scale-105 ${
                    selectedBiome?.id === biome.id
                      ? "ring-2 ring-primary z-10"
                      : ""
                  } ${
                    isComplete
                      ? "border-primary/40 bg-primary/10"
                      : isAccessible
                        ? "border-border/60 bg-card/80 hover:border-primary/30"
                        : "border-border/30 bg-card/40 opacity-60"
                  }`}
                  style={{
                    left: `${biome.x}%`,
                    top: `${biome.y}%`,
                    width: `${biome.width}%`,
                    height: `${biome.height}%`,
                  }}
                  aria-label={`${biome.name} - Niveau ${biome.levelRange[0]}-${biome.levelRange[1]}`}
                >
                  {isStartIsland && (
                    <MapPin className="h-3 w-3 text-primary mb-0.5" />
                  )}
                  {isComplete && (
                    <CheckCircle2 className="h-3 w-3 text-primary mb-0.5" />
                  )}
                  {!isAccessible && (
                    <Lock className="h-3 w-3 text-muted-foreground mb-0.5" />
                  )}
                  <span className="text-[9px] font-semibold text-foreground leading-tight text-center px-1 font-serif" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>
                    {biome.name}
                  </span>
                  <span className="font-mono text-[7px] text-muted-foreground">
                    Nv.{biome.levelRange[0]}-{biome.levelRange[1]}
                  </span>
                  {totalCount > 0 && (
                    <div className="mt-0.5 h-0.5 w-3/4 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Biome Detail Panel */}
      {selectedBiome && !selectedMob && (
        <BiomePanel
          biome={selectedBiome}
          mobs={biomeMobs}
          dungeons={biomeDungeons}
          state={state}
          power={power}
          onSelectMob={setSelectedMob}
          onClose={() => setSelectedBiome(null)}
          onGoToDungeon={(dungeonId) => {
            actions.setSelectedTab("dungeons")
          }}
        />
      )}

      {/* Mob Detail Panel */}
      {selectedMob && (
        <MobPanel
          mob={selectedMob}
          state={state}
          onDefeat={() => {
            actions.defeatMob(selectedMob.id, selectedMob.xpReward, selectedMob.goldReward)
            setSelectedMob(null)
          }}
          onClose={() => setSelectedMob(null)}
        />
      )}
    </div>
  )
}

function BiomePanel({ biome, mobs, dungeons, state, power, onSelectMob, onClose, onGoToDungeon }: {
  biome: Biome
  mobs: Mob[]
  dungeons: typeof DUNGEONS
  state: ReturnType<typeof useGameState>
  power: number
  onSelectMob: (m: Mob) => void
  onClose: () => void
  onGoToDungeon: (id: string) => void
}) {
  const [filter, setFilter] = useState<"all" | "mob" | "elite" | "miniboss" | "boss" | "worldboss">("all")

  const filteredMobs = mobs
    .filter(m => filter === "all" || m.type === filter)
    .sort((a, b) => a.level - b.level)

  const defeatedCount = mobs.filter(m => state.defeatedMobs.includes(m.id)).length

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-foreground font-serif">{biome.name}</h3>
          <p className="text-sm text-muted-foreground">{biome.description}</p>
          <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
            <span>Niveau {biome.levelRange[0]}-{biome.levelRange[1]}</span>
            <span>{defeatedCount}/{mobs.length} vaincus</span>
          </div>
        </div>
        <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-secondary text-muted-foreground" aria-label="Fermer">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Progress */}
      <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${mobs.length > 0 ? (defeatedCount / mobs.length) * 100 : 0}%` }} />
      </div>

      {/* Dungeons in this biome */}
      {dungeons.length > 0 && (
        <div className="mb-4">
          <h4 className="mb-2 text-sm font-bold text-foreground">Donjons</h4>
          <div className="space-y-2">
            {dungeons.map(d => {
              const completed = state.completedDungeons.includes(d.id)
              const canEnter = power >= d.requiredPower && state.level >= d.levelReq
              return (
                <div key={d.id} className={`flex items-center justify-between rounded-xl border p-3 ${completed ? "border-primary/30 bg-primary/5" : canEnter ? "border-border bg-secondary/50" : "border-border/50 bg-secondary/20 opacity-60"}`}>
                  <div className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${completed ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"}`}>
                      <Swords className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{d.name}</p>
                      <p className="text-[11px] text-muted-foreground">{d.floors} etages - PWR {d.requiredPower} requis</p>
                    </div>
                  </div>
                  {completed ? (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  ) : !canEnter ? (
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Mob Filter */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {(["all", "mob", "elite", "miniboss", "boss", "worldboss"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all ${filter === f ? "bg-primary/15 text-primary" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
          >
            {f === "all" ? "Tous" : MOB_TYPE_LABELS[f].label} {f !== "all" && `(${mobs.filter(m => m.type === f).length})`}
          </button>
        ))}
      </div>

      {/* Mob List */}
      <div className="max-h-80 space-y-1.5 overflow-auto pr-1">
        {filteredMobs.map(mob => {
          const defeated = state.defeatedMobs.includes(mob.id)
          const typeInfo = MOB_TYPE_LABELS[mob.type]
          return (
            <button
              key={mob.id}
              onClick={() => onSelectMob(mob)}
              className={`flex w-full items-center gap-3 rounded-xl border p-2.5 text-left transition-all ${
                defeated
                  ? "border-primary/20 bg-primary/5"
                  : "border-border hover:border-primary/20 hover:bg-secondary/50"
              }`}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: typeInfo.color + "20" }}>
                {mob.type === "worldboss" ? <Crown className="h-4 w-4" style={{ color: typeInfo.color }} /> :
                 mob.type === "boss" ? <Skull className="h-4 w-4" style={{ color: typeInfo.color }} /> :
                 mob.type === "miniboss" ? <Star className="h-4 w-4" style={{ color: typeInfo.color }} /> :
                 <Swords className="h-3.5 w-3.5" style={{ color: typeInfo.color }} />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-bold text-foreground">{mob.name}</span>
                  <span className="shrink-0 rounded px-1 py-0.5 text-[9px] font-bold" style={{ backgroundColor: typeInfo.color + "20", color: typeInfo.color }}>
                    {typeInfo.label}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">Nv.{mob.level} - {mob.xpReward} XP - {mob.goldReward} or</span>
              </div>
              {defeated ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
              ) : (
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function MobPanel({ mob, state, onDefeat, onClose }: {
  mob: Mob
  state: ReturnType<typeof useGameState>
  onDefeat: () => void
  onClose: () => void
}) {
  const defeated = state.defeatedMobs.includes(mob.id)
  const typeInfo = MOB_TYPE_LABELS[mob.type]

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: typeInfo.color + "20" }}>
            {mob.type === "worldboss" ? <Crown className="h-6 w-6" style={{ color: typeInfo.color }} /> :
             mob.type === "boss" ? <Skull className="h-6 w-6" style={{ color: typeInfo.color }} /> :
             <Swords className="h-6 w-6" style={{ color: typeInfo.color }} />}
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">{mob.name}</h3>
            <div className="flex items-center gap-2">
              <span className="rounded px-1.5 py-0.5 text-[10px] font-bold" style={{ backgroundColor: typeInfo.color + "20", color: typeInfo.color }}>
                {typeInfo.label}
              </span>
              <span className="font-mono text-xs text-muted-foreground">Nv. {mob.level}</span>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-secondary text-muted-foreground" aria-label="Fermer">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Stats */}
      <div className="mb-4 grid grid-cols-4 gap-2">
        <div className="rounded-xl bg-destructive/10 p-2.5 text-center">
          <p className="font-mono text-lg font-bold text-destructive">{mob.hp}</p>
          <p className="text-[10px] text-muted-foreground">HP</p>
        </div>
        <div className="rounded-xl bg-[hsl(var(--chart-5))/0.1] p-2.5 text-center">
          <p className="font-mono text-lg font-bold text-[hsl(var(--chart-5))]">{mob.atk}</p>
          <p className="text-[10px] text-muted-foreground">ATK</p>
        </div>
        <div className="rounded-xl bg-[hsl(var(--info))/0.1] p-2.5 text-center">
          <p className="font-mono text-lg font-bold text-[hsl(var(--info))]">{mob.def}</p>
          <p className="text-[10px] text-muted-foreground">DEF</p>
        </div>
        <div className="rounded-xl bg-primary/10 p-2.5 text-center">
          <p className="font-mono text-lg font-bold text-primary">{mob.xpReward}</p>
          <p className="text-[10px] text-muted-foreground">XP</p>
        </div>
      </div>

      {/* Quest to defeat */}
      <div className="mb-4 rounded-xl border border-[hsl(var(--gold))/0.3] bg-[hsl(var(--gold))/0.05] p-4">
        <h4 className="mb-1 text-sm font-bold text-[hsl(var(--gold))]">Quete pour vaincre</h4>
        <p className="text-sm text-foreground">{mob.questDescription}</p>
      </div>

      {/* Rewards */}
      <div className="mb-4 flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <Star className="h-4 w-4 text-primary" />
          <span className="font-mono text-sm font-bold text-primary">+{mob.xpReward} XP</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-sm font-bold text-[hsl(var(--gold))]">+{mob.goldReward} or</span>
        </div>
      </div>

      {/* Action */}
      {defeated ? (
        <div className="flex items-center justify-center gap-2 rounded-xl bg-primary/10 py-3 text-sm font-bold text-primary">
          <CheckCircle2 className="h-4 w-4" />
          Vaincu
        </div>
      ) : (
        <button
          onClick={onDefeat}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-destructive/15 py-3 text-sm font-bold text-destructive transition-all hover:bg-destructive/25 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Swords className="h-4 w-4" />
          Valider la quete - Vaincre {mob.name}
        </button>
      )}
    </div>
  )
}
