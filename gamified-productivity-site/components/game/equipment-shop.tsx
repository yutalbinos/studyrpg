"use client"

import { useState } from "react"
import { useGameState, useGameActions, getPlayerPower } from "@/lib/game-store"
import { ALL_ITEMS, RARITIES, ITEM_TYPE_LABELS, type ItemRarity, type ItemType, type GameItem } from "@/lib/game-data"
import { Coins, Lock, Sword, Shield, Shirt, Crown, Footprints, CircleDot, Gem, ChevronDown, Package, Zap } from "lucide-react"

const TYPE_ICONS: Record<ItemType, typeof Sword> = {
  weapon: Sword,
  armor: Shirt,
  shield: Shield,
  helmet: Crown,
  boots: Footprints,
  ring: CircleDot,
  amulet: Gem,
}

const RARITY_ORDER: ItemRarity[] = ["trash", "common", "uncommon", "rare", "epic", "legendary", "mythic", "divine", "cosmic", "transcendent"]

export function EquipmentShop() {
  const state = useGameState()
  const actions = useGameActions()
  const [filterType, setFilterType] = useState<ItemType | "all">("all")
  const [filterRarity, setFilterRarity] = useState<ItemRarity | "all">("all")
  const [showInventory, setShowInventory] = useState(false)
  const power = getPlayerPower(state)

  const ownedIds = new Set([
    ...state.inventory.map(i => i.id),
    ...Object.values(state.equipped).filter(Boolean).map(i => i!.id),
  ])

  const filteredItems = ALL_ITEMS.filter(item => {
    if (filterType !== "all" && item.type !== filterType) return false
    if (filterRarity !== "all" && item.rarity !== filterRarity) return false
    return true
  }).sort((a, b) => RARITY_ORDER.indexOf(a.rarity) - RARITY_ORDER.indexOf(b.rarity) || a.cost - b.cost)

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground">Forge & Boutique</h2>
          <p className="text-sm text-muted-foreground">Equipe-toi pour les combats</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-[hsl(var(--info))/0.1] px-3 py-1.5">
            <Zap className="h-4 w-4 text-[hsl(var(--info))]" />
            <span className="font-mono text-sm font-bold text-[hsl(var(--info))]">{power} PWR</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-[hsl(var(--gold))/0.1] px-3 py-1.5">
            <Coins className="h-4 w-4 text-[hsl(var(--gold))]" />
            <span className="font-mono text-sm font-bold text-[hsl(var(--gold))]">{state.gold}</span>
          </div>
        </div>
      </div>

      {/* Toggle Inventory / Shop */}
      <div className="flex rounded-xl bg-secondary p-1">
        <button
          onClick={() => setShowInventory(false)}
          className={`flex-1 rounded-lg py-2 text-sm font-bold transition-all ${!showInventory ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
        >
          Boutique ({filteredItems.length})
        </button>
        <button
          onClick={() => setShowInventory(true)}
          className={`flex-1 rounded-lg py-2 text-sm font-bold transition-all ${showInventory ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
        >
          Inventaire ({state.inventory.length})
        </button>
      </div>

      {!showInventory ? (
        <>
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as ItemType | "all")}
              className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-foreground"
            >
              <option value="all">Tous les types</option>
              {(Object.keys(ITEM_TYPE_LABELS) as ItemType[]).map(t => (
                <option key={t} value={t}>{ITEM_TYPE_LABELS[t]}</option>
              ))}
            </select>
            <select
              value={filterRarity}
              onChange={(e) => setFilterRarity(e.target.value as ItemRarity | "all")}
              className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-foreground"
            >
              <option value="all">Toutes les raretes</option>
              {RARITY_ORDER.map(r => (
                <option key={r} value={r}>{RARITIES[r].name}</option>
              ))}
            </select>
          </div>

          {/* Items Grid */}
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map(item => (
              <ShopItemCard key={item.id} item={item} owned={ownedIds.has(item.id)} gold={state.gold} level={state.level} onBuy={() => actions.buyItem(item)} />
            ))}
          </div>
        </>
      ) : (
        <InventoryView />
      )}
    </div>
  )
}

function ShopItemCard({ item, owned, gold, level, onBuy }: { item: GameItem; owned: boolean; gold: number; level: number; onBuy: () => void }) {
  const rarity = RARITIES[item.rarity]
  const canAfford = gold >= item.cost
  const levelOk = level >= item.levelReq
  const Icon = TYPE_ICONS[item.type]

  return (
    <div
      className="relative overflow-hidden rounded-xl border p-3 transition-all"
      style={{
        borderColor: rarity.borderColor,
        backgroundColor: rarity.bgColor,
        boxShadow: rarity.glowColor !== "transparent" ? `0 0 12px ${rarity.glowColor}` : undefined,
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: rarity.color + "20", color: rarity.color }}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-sm font-bold" style={{ color: rarity.color }}>{item.name}</span>
          </div>
          <span className="text-[10px] font-bold uppercase" style={{ color: rarity.color }}>{rarity.name}</span>
          <p className="mt-0.5 text-[11px] text-muted-foreground">{item.description}</p>
          <div className="mt-1.5 flex flex-wrap gap-1 font-mono text-[10px]">
            {item.atk > 0 && <span className="rounded bg-destructive/15 px-1 py-0.5 text-destructive">ATK {item.atk}</span>}
            {item.def > 0 && <span className="rounded bg-[hsl(var(--info))/0.15] px-1 py-0.5 text-[hsl(var(--info))]">DEF {item.def}</span>}
            {item.hp > 0 && <span className="rounded bg-primary/15 px-1 py-0.5 text-primary">HP {item.hp}</span>}
            {item.magic > 0 && <span className="rounded bg-[hsl(var(--chart-4))/0.15] px-1 py-0.5 text-[hsl(var(--chart-4))]">MAG {item.magic}</span>}
          </div>
        </div>
      </div>
      <div className="mt-2">
        {owned ? (
          <div className="text-center text-xs font-bold text-primary">Possede</div>
        ) : (
          <button
            onClick={onBuy}
            disabled={!canAfford || !levelOk}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-bold transition-all disabled:opacity-40"
            style={{ backgroundColor: rarity.color + "20", color: rarity.color }}
          >
            {!levelOk ? (
              <><Lock className="h-3 w-3" /> Niv. {item.levelReq}</>
            ) : !canAfford ? (
              <><Coins className="h-3 w-3" /> {item.cost} or</>
            ) : (
              <><Coins className="h-3 w-3" /> Acheter {item.cost}</>
            )}
          </button>
        )}
      </div>
    </div>
  )
}

function InventoryView() {
  const state = useGameState()
  const actions = useGameActions()
  const equippedSlots = Object.entries(state.equipped) as [keyof typeof state.equipped, GameItem | null][]

  return (
    <div className="space-y-4">
      {/* Equipped */}
      <div>
        <h3 className="mb-2 text-sm font-bold text-foreground">Equipe</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {equippedSlots.map(([slot, item]) => {
            const Icon = TYPE_ICONS[slot as ItemType]
            return (
              <div key={slot} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase text-muted-foreground">{ITEM_TYPE_LABELS[slot as ItemType]}</p>
                  {item ? (
                    <p className="truncate text-sm font-bold" style={{ color: RARITIES[item.rarity].color }}>{item.name}</p>
                  ) : (
                    <p className="text-xs text-muted-foreground">Vide</p>
                  )}
                </div>
                {item && (
                  <button
                    onClick={() => actions.unequipItem(slot)}
                    className="rounded-lg bg-secondary px-2 py-1 text-[10px] font-bold text-muted-foreground hover:text-foreground"
                  >
                    Retirer
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Bag */}
      <div>
        <h3 className="mb-2 text-sm font-bold text-foreground">Sac ({state.inventory.length} objets)</h3>
        {state.inventory.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-8 text-center">
            <Package className="h-8 w-8 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">Ton sac est vide. Va faire du shopping !</p>
          </div>
        ) : (
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {state.inventory.map((item, idx) => {
              const rarity = RARITIES[item.rarity]
              const Icon = TYPE_ICONS[item.type]
              return (
                <div
                  key={`${item.id}-${idx}`}
                  className="flex items-center gap-3 rounded-xl border p-3 transition-all"
                  style={{ borderColor: rarity.borderColor, backgroundColor: rarity.bgColor }}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: rarity.color + "20", color: rarity.color }}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold" style={{ color: rarity.color }}>{item.name}</p>
                    <div className="flex gap-1 font-mono text-[9px]">
                      {item.atk > 0 && <span className="text-destructive">A:{item.atk}</span>}
                      {item.def > 0 && <span className="text-[hsl(var(--info))]">D:{item.def}</span>}
                      {item.hp > 0 && <span className="text-primary">H:{item.hp}</span>}
                      {item.magic > 0 && <span className="text-[hsl(var(--chart-4))]">M:{item.magic}</span>}
                    </div>
                  </div>
                  <button
                    onClick={() => actions.equipItem(item)}
                    className="rounded-lg px-2 py-1 text-[10px] font-bold transition-all"
                    style={{ backgroundColor: rarity.color + "20", color: rarity.color }}
                  >
                    Equiper
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
