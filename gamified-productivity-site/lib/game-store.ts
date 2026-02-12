import { useSyncExternalStore, useCallback } from "react"
import type { CharacterClass, GameItem, ItemType } from "./game-data"

// ============================================================================
// TYPES
// ============================================================================
export interface EquippedItems {
  weapon: GameItem | null
  armor: GameItem | null
  shield: GameItem | null
  helmet: GameItem | null
  boots: GameItem | null
  ring: GameItem | null
  amulet: GameItem | null
}

export interface Quest {
  id: string
  title: string
  description: string
  xpReward: number
  goldReward: number
  completed: boolean
  category: "focus" | "health" | "learning" | "social"
  difficulty: "easy" | "medium" | "hard" | "legendary"
  icon: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: number
  rarity: "common" | "rare" | "epic" | "legendary"
}

export interface GameState {
  // Character
  playerName: string
  playerClass: CharacterClass | null
  tutorialComplete: boolean
  tutorialStep: number

  // Stats
  xp: number
  level: number
  gold: number
  streak: number
  longestStreak: number
  totalTasksCompleted: number
  todayTasksCompleted: number
  totalPomodoroCompleted: number

  // Inventory & Equipment
  inventory: GameItem[]
  equipped: EquippedItems

  // Quests & Achievements
  quests: Quest[]
  achievements: Achievement[]

  // Pomodoro
  pomodoroTime: number
  pomodoroRunning: boolean
  pomodoroSessions: number

  // Combat / Mobs
  defeatedMobs: string[]
  completedDungeons: string[]

  // UI
  lastActiveDate: string
  selectedTab: string
  showLevelUp: boolean
  showConfetti: boolean
  unlockedRewards: string[]
}

const XP_PER_LEVEL = 150

function getDefaultQuests(): Quest[] {
  return [
    { id: "q1", title: "Pomodoro x3", description: "Fais 3 sessions Pomodoro aujourd'hui", xpReward: 80, goldReward: 15, completed: false, category: "focus", difficulty: "medium", icon: "timer" },
    { id: "q2", title: "Premiere Tache", description: "Complete ta premiere tache de la journee", xpReward: 30, goldReward: 5, completed: false, category: "focus", difficulty: "easy", icon: "check" },
    { id: "q3", title: "Marathonien", description: "Travaille 2h sans interruption", xpReward: 120, goldReward: 25, completed: false, category: "focus", difficulty: "hard", icon: "flame" },
    { id: "q4", title: "Levee Matinale", description: "Commence a travailler avant 9h", xpReward: 50, goldReward: 10, completed: false, category: "health", difficulty: "medium", icon: "sunrise" },
    { id: "q5", title: "Pause Active", description: "Fais 10 min de stretching entre 2 sessions", xpReward: 40, goldReward: 8, completed: false, category: "health", difficulty: "easy", icon: "heart" },
    { id: "q6", title: "Apprends un Truc", description: "Lis un article ou regarde un tuto", xpReward: 60, goldReward: 12, completed: false, category: "learning", difficulty: "medium", icon: "book" },
    { id: "q7", title: "Partage tes Connaissances", description: "Aide un collegue ou poste sur un forum", xpReward: 70, goldReward: 15, completed: false, category: "social", difficulty: "medium", icon: "users" },
    { id: "q8", title: "Boss Final", description: "Complete TOUTES les quetes du jour", xpReward: 200, goldReward: 50, completed: false, category: "focus", difficulty: "legendary", icon: "crown" },
  ]
}

function getDefaultAchievements(): Achievement[] {
  return [
    { id: "a1", title: "Premier Pas", description: "Complete ta premiere quete", icon: "footprints", unlocked: false, rarity: "common" },
    { id: "a2", title: "En Feu", description: "Atteins un streak de 3 jours", icon: "flame", unlocked: false, rarity: "common" },
    { id: "a3", title: "Infatigable", description: "Atteins un streak de 7 jours", icon: "zap", unlocked: false, rarity: "rare" },
    { id: "a4", title: "Pomodoro Master", description: "Complete 10 sessions Pomodoro", icon: "timer", unlocked: false, rarity: "rare" },
    { id: "a5", title: "Level 5", description: "Atteins le niveau 5", icon: "trophy", unlocked: false, rarity: "rare" },
    { id: "a6", title: "Legendaire", description: "Complete une quete legendaire", icon: "crown", unlocked: false, rarity: "epic" },
    { id: "a7", title: "Collectionneur", description: "Debloquer 5 recompenses", icon: "gem", unlocked: false, rarity: "epic" },
    { id: "a8", title: "Le GOAT", description: "Atteins le niveau 10", icon: "star", unlocked: false, rarity: "legendary" },
    { id: "a9", title: "Fortune", description: "Accumule 500 pieces d'or", icon: "coins", unlocked: false, rarity: "epic" },
    { id: "a10", title: "Marathonien Ultime", description: "Streak de 30 jours", icon: "mountain", unlocked: false, rarity: "legendary" },
  ]
}

const INITIAL_STATE: GameState = {
  playerName: "",
  playerClass: null,
  tutorialComplete: false,
  tutorialStep: 0,
  xp: 0,
  level: 1,
  gold: 50,
  streak: 1,
  longestStreak: 1,
  totalTasksCompleted: 0,
  todayTasksCompleted: 0,
  totalPomodoroCompleted: 0,
  inventory: [],
  equipped: { weapon: null, armor: null, shield: null, helmet: null, boots: null, ring: null, amulet: null },
  quests: getDefaultQuests(),
  achievements: getDefaultAchievements(),
  pomodoroTime: 25 * 60,
  pomodoroRunning: false,
  pomodoroSessions: 0,
  defeatedMobs: [],
  completedDungeons: [],
  lastActiveDate: "",
  selectedTab: "dashboard",
  showLevelUp: false,
  showConfetti: false,
  unlockedRewards: [],
}

// ============================================================================
// SAVE / LOAD
// ============================================================================
const SAVE_KEY = "questwork_save"

function saveGame(s: GameState) {
  if (typeof window === "undefined") return
  try {
    const data = JSON.stringify(s)
    localStorage.setItem(SAVE_KEY, data)
  } catch {}
}

function loadGame(): GameState | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    // Merge with defaults for forward compat
    return { ...INITIAL_STATE, ...parsed }
  } catch { return null }
}

// ============================================================================
// STORE
// ============================================================================
let state: GameState = { ...INITIAL_STATE }
const listeners = new Set<() => void>()
let loaded = false

function emitChange() {
  saveGame(state)
  for (const listener of listeners) {
    listener()
  }
}

function checkAchievements(s: GameState): GameState {
  const updated = { ...s, achievements: s.achievements.map(a => ({ ...a })) }
  const checks: [string, boolean][] = [
    ["a1", s.totalTasksCompleted >= 1],
    ["a2", s.streak >= 3],
    ["a3", s.streak >= 7],
    ["a4", s.pomodoroSessions >= 10],
    ["a5", s.level >= 5],
    ["a6", s.quests.some(q => q.completed && q.difficulty === "legendary")],
    ["a7", s.unlockedRewards.length >= 5],
    ["a8", s.level >= 10],
    ["a9", s.gold >= 500],
    ["a10", s.streak >= 30],
  ]
  for (const [id, condition] of checks) {
    if (condition) {
      const a = updated.achievements.find(a => a.id === id)
      if (a && !a.unlocked) { a.unlocked = true; a.unlockedAt = Date.now() }
    }
  }
  return updated
}

export function getPlayerPower(s: GameState): number {
  const eq = s.equipped
  let atk = 0, def = 0, hp = 0, magic = 0
  for (const item of Object.values(eq)) {
    if (item) { atk += item.atk; def += item.def; hp += item.hp; magic += item.magic }
  }
  return atk + def + hp + magic + s.level * 5
}

export const gameStore = {
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  getSnapshot(): GameState {
    if (typeof window !== "undefined" && !loaded) {
      loaded = true
      const saved = loadGame()
      if (saved) state = saved
    }
    return state
  },
  getServerSnapshot(): GameState {
    return state
  },

  // Tutorial
  setPlayerName(name: string) {
    state = { ...state, playerName: name }
    emitChange()
  },
  setPlayerClass(cls: CharacterClass) {
    state = { ...state, playerClass: cls }
    emitChange()
  },
  advanceTutorial() {
    state = { ...state, tutorialStep: state.tutorialStep + 1 }
    emitChange()
  },
  completeTutorial() {
    state = { ...state, tutorialComplete: true, tutorialStep: 999 }
    emitChange()
  },

  // Equipment
  buyItem(item: GameItem) {
    if (state.gold < item.cost) return
    if (state.level < item.levelReq) return
    state = {
      ...state,
      gold: state.gold - item.cost,
      inventory: [...state.inventory, item],
    }
    emitChange()
  },
  equipItem(item: GameItem) {
    const slot = item.type as keyof EquippedItems
    const currentEquipped = state.equipped[slot]
    const newInventory = state.inventory.filter(i => i.id !== item.id)
    if (currentEquipped) newInventory.push(currentEquipped)
    state = {
      ...state,
      inventory: newInventory,
      equipped: { ...state.equipped, [slot]: item },
    }
    emitChange()
  },
  unequipItem(slot: keyof EquippedItems) {
    const item = state.equipped[slot]
    if (!item) return
    state = {
      ...state,
      inventory: [...state.inventory, item],
      equipped: { ...state.equipped, [slot]: null },
    }
    emitChange()
  },

  // Combat
  defeatMob(mobId: string, xp: number, gold: number) {
    if (state.defeatedMobs.includes(mobId)) return
    const newXp = state.xp + xp
    const newLevel = Math.floor(newXp / XP_PER_LEVEL) + 1
    const leveledUp = newLevel > state.level
    state = {
      ...state,
      xp: newXp,
      gold: state.gold + gold,
      level: newLevel,
      defeatedMobs: [...state.defeatedMobs, mobId],
      totalTasksCompleted: state.totalTasksCompleted + 1,
      showLevelUp: leveledUp,
      showConfetti: true,
    }
    state = checkAchievements(state)
    emitChange()
    setTimeout(() => { state = { ...state, showConfetti: false, showLevelUp: false }; emitChange() }, 2000)
  },
  completeDungeon(dungeonId: string, xp: number, gold: number) {
    if (state.completedDungeons.includes(dungeonId)) return
    const newXp = state.xp + xp
    const newLevel = Math.floor(newXp / XP_PER_LEVEL) + 1
    const leveledUp = newLevel > state.level
    state = {
      ...state,
      xp: newXp,
      gold: state.gold + gold,
      level: newLevel,
      completedDungeons: [...state.completedDungeons, dungeonId],
      showLevelUp: leveledUp,
      showConfetti: true,
    }
    state = checkAchievements(state)
    emitChange()
    setTimeout(() => { state = { ...state, showConfetti: false, showLevelUp: false }; emitChange() }, 2000)
  },

  // Original methods
  completeQuest(questId: string) {
    const quest = state.quests.find(q => q.id === questId)
    if (!quest || quest.completed) return
    const newXp = state.xp + quest.xpReward
    const newGold = state.gold + quest.goldReward
    const newLevel = Math.floor(newXp / XP_PER_LEVEL) + 1
    const leveledUp = newLevel > state.level
    state = {
      ...state, xp: newXp, gold: newGold, level: newLevel,
      totalTasksCompleted: state.totalTasksCompleted + 1,
      todayTasksCompleted: state.todayTasksCompleted + 1,
      quests: state.quests.map(q => q.id === questId ? { ...q, completed: true } : q),
      showLevelUp: leveledUp, showConfetti: true,
    }
    const nonBossQuests = state.quests.filter(q => q.id !== "q8")
    if (nonBossQuests.every(q => q.completed)) {
      const bossQuest = state.quests.find(q => q.id === "q8")
      if (bossQuest && !bossQuest.completed) {
        state = { ...state, xp: state.xp + bossQuest.xpReward, gold: state.gold + bossQuest.goldReward, quests: state.quests.map(q => q.id === "q8" ? { ...q, completed: true } : q) }
      }
    }
    state = checkAchievements(state)
    emitChange()
    setTimeout(() => { state = { ...state, showConfetti: false, showLevelUp: false }; emitChange() }, 2000)
  },
  completePomodoroSession() {
    const newSessions = state.pomodoroSessions + 1
    const newXp = state.xp + 25
    const newLevel = Math.floor(newXp / XP_PER_LEVEL) + 1
    state = {
      ...state, pomodoroSessions: newSessions, totalPomodoroCompleted: (state.totalPomodoroCompleted || 0) + 1,
      xp: newXp, gold: state.gold + 5, level: newLevel, pomodoroTime: 25 * 60, pomodoroRunning: false,
    }
    if (newSessions >= 3) {
      const pomQuest = state.quests.find(q => q.id === "q1")
      if (pomQuest && !pomQuest.completed) { gameStore.completeQuest("q1"); return }
    }
    state = checkAchievements(state)
    emitChange()
  },
  setPomodoroRunning(running: boolean) { state = { ...state, pomodoroRunning: running }; emitChange() },
  setPomodoroTime(time: number) { state = { ...state, pomodoroTime: time }; emitChange() },
  setSelectedTab(tab: string) { state = { ...state, selectedTab: tab }; emitChange() },
  buyReward(rewardId: string, cost: number) {
    if (state.gold < cost || state.unlockedRewards.includes(rewardId)) return
    state = { ...state, gold: state.gold - cost, unlockedRewards: [...state.unlockedRewards, rewardId] }
    state = checkAchievements(state)
    emitChange()
  },
  incrementStreak() {
    const newStreak = state.streak + 1
    state = { ...state, streak: newStreak, longestStreak: Math.max(state.longestStreak, newStreak) }
    state = checkAchievements(state)
    emitChange()
  },
  resetSave() {
    state = { ...INITIAL_STATE }
    if (typeof window !== "undefined") localStorage.removeItem(SAVE_KEY)
    emitChange()
  },
}

export function useGameState(): GameState {
  return useSyncExternalStore(gameStore.subscribe, gameStore.getSnapshot, gameStore.getServerSnapshot)
}

export function useGameActions() {
  return {
    completeQuest: useCallback((id: string) => gameStore.completeQuest(id), []),
    completePomodoroSession: useCallback(() => gameStore.completePomodoroSession(), []),
    setPomodoroRunning: useCallback((r: boolean) => gameStore.setPomodoroRunning(r), []),
    setPomodoroTime: useCallback((t: number) => gameStore.setPomodoroTime(t), []),
    setSelectedTab: useCallback((t: string) => gameStore.setSelectedTab(t), []),
    buyReward: useCallback((id: string, cost: number) => gameStore.buyReward(id, cost), []),
    incrementStreak: useCallback(() => gameStore.incrementStreak(), []),
    buyItem: useCallback((item: GameItem) => gameStore.buyItem(item), []),
    equipItem: useCallback((item: GameItem) => gameStore.equipItem(item), []),
    unequipItem: useCallback((slot: keyof EquippedItems) => gameStore.unequipItem(slot), []),
    defeatMob: useCallback((id: string, xp: number, gold: number) => gameStore.defeatMob(id, xp, gold), []),
    completeDungeon: useCallback((id: string, xp: number, gold: number) => gameStore.completeDungeon(id, xp, gold), []),
    setPlayerName: useCallback((n: string) => gameStore.setPlayerName(n), []),
    setPlayerClass: useCallback((c: CharacterClass) => gameStore.setPlayerClass(c), []),
    advanceTutorial: useCallback(() => gameStore.advanceTutorial(), []),
    completeTutorial: useCallback(() => gameStore.completeTutorial(), []),
    resetSave: useCallback(() => gameStore.resetSave(), []),
  }
}

export function getXpForLevel(level: number) { return level * XP_PER_LEVEL }
export function getXpProgress(xp: number, level: number) {
  const currentLevelXp = (level - 1) * XP_PER_LEVEL
  const nextLevelXp = level * XP_PER_LEVEL
  return ((xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100
}
