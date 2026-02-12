"use client"

import { useGameState, useGameActions, getPlayerPower } from "@/lib/game-store"
import { GameHeader } from "./header"
import { GameNavigation } from "./navigation"
import { StatsPanel } from "./stats-panel"
import { QuestBoard } from "./quest-board"
import { PomodoroTimer } from "./pomodoro-timer"
import { AchievementsPanel } from "./achievements"
import { RewardShop } from "./reward-shop"
import { Leaderboard } from "./leaderboard"
import { SkillTree } from "./skill-tree"
import { DailyChallenge } from "./daily-challenge"
import { LevelUpOverlay } from "./level-up-overlay"
import { Tutorial } from "./tutorial"
import { EquipmentShop } from "./equipment-shop"
import { WorldMap } from "./world-map"
import { DungeonSystem } from "./dungeon-system"
import { CLASSES } from "@/lib/game-data"
import { Save, Trash2, Shield, Swords, Heart, Sparkles, Star, RotateCcw } from "lucide-react"
import { useState } from "react"

export function GameApp() {
  const state = useGameState()
  const { selectedTab, tutorialComplete } = state

  // Show tutorial if not completed
  if (!tutorialComplete) {
    return <Tutorial />
  }

  return (
    <div className="flex h-screen flex-col">
      <GameHeader />
      <div className="flex flex-1 overflow-hidden">
        <GameNavigation />
        <main className="flex-1 overflow-auto pb-20 lg:pb-0">
          <div className="mx-auto max-w-6xl p-4 lg:p-6">
            {selectedTab === "dashboard" && <DashboardView />}
            {selectedTab === "map" && <WorldMap />}
            {selectedTab === "quests" && <QuestBoard />}
            {selectedTab === "dungeons" && <DungeonSystem />}
            {selectedTab === "equipment" && <EquipmentShop />}
            {selectedTab === "pomodoro" && <PomodoroView />}
            {selectedTab === "achievements" && <AchievementsPanel />}
            {selectedTab === "skills" && <SkillTree />}
            {selectedTab === "shop" && <RewardShop />}
            {selectedTab === "leaderboard" && <Leaderboard />}
            {selectedTab === "settings" && <SettingsView />}
          </div>
        </main>
      </div>
      <LevelUpOverlay />
    </div>
  )
}

function DashboardView() {
  const state = useGameState()
  const power = getPlayerPower(state)
  const classInfo = CLASSES.find(c => c.id === state.playerClass)

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10" />
        <div className="absolute -bottom-6 -left-6 h-28 w-28 rounded-full bg-primary/5" />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-bold text-foreground">
              Salut, {state.playerName || "Aventurier"} !
            </h2>
            {classInfo && (
              <span
                className="rounded-full px-2.5 py-0.5 text-xs font-bold"
                style={{ backgroundColor: classInfo.color + "20", color: classInfo.color }}
              >
                {classInfo.name}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Pret a conqurir la journee ? Tes quetes t&apos;attendent.
          </p>

          {/* Quick stats row */}
          <div className="mt-3 flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 rounded-lg bg-[hsl(var(--info))/0.1] px-2.5 py-1">
              <Shield className="h-3.5 w-3.5 text-[hsl(var(--info))]" />
              <span className="font-mono text-xs font-bold text-[hsl(var(--info))]">{power} PWR</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-destructive/10 px-2.5 py-1">
              <Swords className="h-3.5 w-3.5 text-destructive" />
              <span className="font-mono text-xs font-bold text-destructive">{state.defeatedMobs.length} mobs</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-[hsl(var(--chart-4))/0.1] px-2.5 py-1">
              <Star className="h-3.5 w-3.5 text-[hsl(var(--chart-4))]" />
              <span className="font-mono text-xs font-bold text-[hsl(var(--chart-4))]">{state.completedDungeons.length}/20 donjons</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column - Stats + Weekly */}
        <div className="lg:col-span-2">
          <StatsPanel />
        </div>

        {/* Right column - Timer + Challenge */}
        <div className="space-y-6">
          <PomodoroTimer />
          <DailyChallenge />
        </div>
      </div>

      {/* Quick Quests Preview */}
      <div>
        <QuestBoard />
      </div>
    </div>
  )
}

function PomodoroView() {
  return (
    <div className="mx-auto max-w-md space-y-6">
      <PomodoroTimer />
      
      {/* Pomodoro Tips */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="mb-4 text-lg font-bold text-foreground">Guide Pomodoro</h3>
        <div className="space-y-3">
          {[
            { step: "1", title: "Focus", desc: "Travaille 25 min sans interruption", color: "text-primary bg-primary/10" },
            { step: "2", title: "Pause", desc: "Prends 5 min de pause", color: "text-[hsl(var(--info))] bg-[hsl(var(--info))/0.1]" },
            { step: "3", title: "Repete", desc: "Apres 4 sessions, pause de 15 min", color: "text-[hsl(var(--gold))] bg-[hsl(var(--gold))/0.1]" },
            { step: "4", title: "Level Up", desc: "Chaque session = +25 XP + 5 or", color: "text-destructive bg-destructive/10" },
          ].map((item) => (
            <div key={item.step} className="flex items-center gap-3">
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-sm font-bold ${item.color}`}>
                {item.step}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SettingsView() {
  const state = useGameState()
  const actions = useGameActions()
  const [showConfirmReset, setShowConfirmReset] = useState(false)
  const classInfo = CLASSES.find(c => c.id === state.playerClass)
  const power = getPlayerPower(state)

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Parametres</h2>
        <p className="text-sm text-muted-foreground">Gere ta sauvegarde et ton profil</p>
      </div>

      {/* Profile Card */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="mb-4 text-sm font-bold text-foreground">Profil</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Nom</span>
            <span className="text-sm font-bold text-foreground">{state.playerName}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Classe</span>
            <span className="text-sm font-bold" style={{ color: classInfo?.color }}>{classInfo?.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Niveau</span>
            <span className="text-sm font-bold text-primary">{state.level}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Puissance</span>
            <span className="text-sm font-bold text-[hsl(var(--info))]">{power} PWR</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">XP Total</span>
            <span className="text-sm font-bold text-foreground">{state.xp}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Or</span>
            <span className="text-sm font-bold text-[hsl(var(--gold))]">{state.gold}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Mobs vaincus</span>
            <span className="text-sm font-bold text-destructive">{state.defeatedMobs.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Donjons completes</span>
            <span className="text-sm font-bold text-[hsl(var(--chart-4))]">{state.completedDungeons.length}/20</span>
          </div>
        </div>
      </div>

      {/* Save Info */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-2 mb-3">
          <Save className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Sauvegarde</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          Ta progression est sauvegardee automatiquement dans ton navigateur (localStorage). Chaque action est sauvegardee instantanement.
        </p>
        <div className="rounded-xl bg-primary/5 border border-primary/20 p-3">
          <p className="text-xs text-primary font-medium">Sauvegarde active - tout est enregistre automatiquement</p>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
        <h3 className="mb-2 text-sm font-bold text-destructive">Zone Dangereuse</h3>
        <p className="mb-4 text-xs text-muted-foreground">
          Cette action est irreversible. Toute ta progression sera perdue.
        </p>
        {!showConfirmReset ? (
          <button
            onClick={() => setShowConfirmReset(true)}
            className="flex items-center gap-2 rounded-xl bg-destructive/10 px-4 py-2.5 text-sm font-bold text-destructive hover:bg-destructive/20"
          >
            <Trash2 className="h-4 w-4" />
            Reinitialiser la sauvegarde
          </button>
        ) : (
          <div className="space-y-2">
            <p className="text-sm font-bold text-destructive">Es-tu sur ? TOUT sera perdu.</p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="flex-1 rounded-xl bg-secondary py-2.5 text-sm font-bold text-muted-foreground hover:bg-secondary/80"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  actions.resetSave()
                  setShowConfirmReset(false)
                }}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-destructive/20 py-2.5 text-sm font-bold text-destructive hover:bg-destructive/30"
              >
                <RotateCcw className="h-4 w-4" />
                Confirmer le reset
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
