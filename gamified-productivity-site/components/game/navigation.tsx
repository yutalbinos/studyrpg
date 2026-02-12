"use client"

import { useGameState, useGameActions } from "@/lib/game-store"
import { LayoutDashboard, Scroll, Timer, Trophy, ShoppingBag, Users, GitBranch, Map, Swords, Package, Settings } from "lucide-react"

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "map", label: "Carte", icon: Map },
  { id: "quests", label: "Quetes", icon: Scroll },
  { id: "dungeons", label: "Donjons", icon: Swords },
  { id: "equipment", label: "Equipement", icon: Package },
  { id: "pomodoro", label: "Pomodoro", icon: Timer },
  { id: "achievements", label: "Succes", icon: Trophy },
  { id: "skills", label: "Skills", icon: GitBranch },
  { id: "shop", label: "Boutique", icon: ShoppingBag },
  { id: "leaderboard", label: "Classement", icon: Users },
  { id: "settings", label: "Parametres", icon: Settings },
]

const mobileTabIds = ["dashboard", "map", "quests", "dungeons", "equipment", "pomodoro"]

export function GameNavigation() {
  const { selectedTab } = useGameState()
  const { setSelectedTab } = useGameActions()

  return (
    <>
      {/* Desktop Side Nav */}
      <nav className="hidden w-56 shrink-0 border-r border-border bg-card/50 p-3 lg:block overflow-auto" aria-label="Navigation principale">
        <div className="space-y-0.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-all ${
                selectedTab === tab.id
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <tab.icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/90 backdrop-blur-xl lg:hidden" aria-label="Navigation mobile">
        <div className="mx-auto flex max-w-lg items-center justify-around px-1 py-1.5">
          {mobileTabIds.map((tabId) => {
            const tab = tabs.find(t => t.id === tabId)!
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex flex-col items-center gap-0.5 rounded-xl px-2 py-1 transition-all ${
                  selectedTab === tab.id
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <tab.icon className="h-4.5 w-4.5" />
                <span className="text-[9px] font-medium">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}
