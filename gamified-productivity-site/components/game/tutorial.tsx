"use client"

import { useState, useEffect } from "react"
import { useGameState, useGameActions } from "@/lib/game-store"
import { CLASSES, type CharacterClass } from "@/lib/game-data"
import { ChevronRight, Sword, Shield, Heart, Sparkles, Eye } from "lucide-react"

const STORY_STEPS = [
  {
    text: "...",
    delay: 800,
  },
  {
    text: "Tu m'entends ?",
    delay: 600,
  },
  {
    text: "Bien. Tu es enfin eveille.",
    delay: 500,
  },
  {
    text: "Je suis... peu importe qui je suis. Certains m'appellent le Guide. D'autres, l'Ombre. D'autres encore ne prononcent jamais mon nom.",
    delay: 400,
  },
  {
    text: "Ce que tu dois savoir, c'est que tu te trouves a l'entree d'un monde que peu de gens connaissent. Un monde ou chaque effort, chaque minute de travail, chaque tache accomplie... te rend plus fort.",
    delay: 400,
  },
  {
    text: "Ici, la productivite est une arme. La concentration est un bouclier. Et ta volonte... c'est ta magie.",
    delay: 400,
  },
  {
    text: "Mais d'abord... comment dois-je t'appeler ?",
    delay: 400,
    action: "name",
  },
  {
    text: "PLAYER_NAME... Un nom qui resonnera dans les legendes. Ou pas. Tout depend de toi.",
    delay: 400,
  },
  {
    text: "Maintenant, dis-moi... Quelle est ta nature profonde ? Choisis ta classe avec soin. Ce choix definira ton chemin.",
    delay: 400,
    action: "class",
  },
  {
    text: "CLASS_CHOICE. Interessant. Je n'aurais pas fait ce choix moi-meme... mais je ne suis pas toi.",
    delay: 400,
  },
  {
    text: "Ecoute bien. Dans ce monde, tu gagneras de l'XP en travaillant. Chaque tache terminee, chaque session Pomodoro, chaque defi releve te rapprochera du sommet.",
    delay: 400,
  },
  {
    text: "Tu trouveras des armes, des armures, des objets de pouvoir. Tu affronteras des monstres -- pas avec tes poings, mais avec ta discipline.",
    delay: 400,
  },
  {
    text: "Des donjons se dresseront devant toi. Seuls les plus prepares y survivront. Assure-toi d'etre bien equipe avant d'y entrer.",
    delay: 400,
  },
  {
    text: "Et tout au bout du chemin... le Throne du Neant t'attend. Mais ne te presse pas. Le voyage compte autant que la destination.",
    delay: 400,
  },
  {
    text: "Une derniere chose. Je serai toujours la. Dans l'ombre. A observer. Ne me decois pas.",
    delay: 400,
  },
  {
    text: "Maintenant... va. Ton aventure commence.",
    delay: 400,
    action: "finish",
  },
]

export function Tutorial() {
  const gameState = useGameState()
  const actions = useGameActions()
  const [currentStep, setCurrentStep] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [showAction, setShowAction] = useState(false)
  const [nameInput, setNameInput] = useState("")
  const [selectedClass, setSelectedClass] = useState<CharacterClass | null>(null)
  const [chosenName, setChosenName] = useState("")
  const [chosenClassName, setChosenClassName] = useState("")

  const step = STORY_STEPS[currentStep]
  const rawText = step?.text
    .replace("PLAYER_NAME", chosenName || "Aventurier")
    .replace("CLASS_CHOICE", chosenClassName || "Un choix") || ""

  // Typewriter effect
  useEffect(() => {
    setDisplayedText("")
    setIsTyping(true)
    setShowAction(false)
    let i = 0
    const interval = setInterval(() => {
      if (i < rawText.length) {
        setDisplayedText(rawText.slice(0, i + 1))
        i++
      } else {
        setIsTyping(false)
        setShowAction(true)
        clearInterval(interval)
      }
    }, 30)
    return () => clearInterval(interval)
  }, [currentStep, rawText])

  const handleNext = () => {
    if (isTyping) {
      // Skip animation
      setDisplayedText(rawText)
      setIsTyping(false)
      setShowAction(true)
      return
    }
    if (step?.action === "finish") {
      actions.completeTutorial()
      return
    }
    if (step?.action === "name" && !nameInput.trim()) return
    if (step?.action === "class" && !selectedClass) return

    if (step?.action === "name") {
      actions.setPlayerName(nameInput.trim())
      setChosenName(nameInput.trim())
    }
    if (step?.action === "class") {
      actions.setPlayerClass(selectedClass!)
      const cls = CLASSES.find(c => c.id === selectedClass)
      setChosenClassName(cls?.name || "")
    }

    setCurrentStep(prev => prev + 1)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl">
        {/* Entity Avatar */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/5">
              <Eye className="h-10 w-10 text-primary/70" />
            </div>
            <div className="absolute -inset-2 animate-pulse rounded-full border border-primary/10" />
            <div className="absolute -inset-4 animate-pulse rounded-full border border-primary/5" style={{ animationDelay: "0.5s" }} />
          </div>
        </div>

        {/* Dialogue */}
        <div className="mb-6 rounded-2xl border border-border bg-card p-6">
          <p className="font-mono text-sm leading-relaxed text-muted-foreground">
            {"??? :"}
          </p>
          <p className="mt-2 min-h-[60px] text-lg leading-relaxed text-foreground">
            {displayedText}
            {isTyping && <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-primary" />}
          </p>
        </div>

        {/* Action areas */}
        {showAction && step?.action === "name" && (
          <div className="mb-6 rounded-2xl border border-border bg-card p-6">
            <label className="mb-2 block text-sm font-medium text-muted-foreground">
              Ton nom d&apos;aventurier
            </label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNext()}
              placeholder="Entre ton nom..."
              maxLength={20}
              autoFocus
              className="w-full rounded-xl border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        )}

        {showAction && step?.action === "class" && (
          <div className="mb-6 space-y-3">
            {CLASSES.map((cls) => (
              <button
                key={cls.id}
                onClick={() => setSelectedClass(cls.id)}
                className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-all ${
                  selectedClass === cls.id
                    ? "border-primary/50 bg-primary/10"
                    : "border-border bg-card hover:border-primary/20 hover:bg-card/80"
                }`}
              >
                <div
                  className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: cls.color + "20", color: cls.color }}
                >
                  {cls.id === "guerrier" && <Sword className="h-5 w-5" />}
                  {cls.id === "mage" && <Sparkles className="h-5 w-5" />}
                  {cls.id === "sorcier" && <Eye className="h-5 w-5" />}
                  {cls.id === "soigneur" && <Heart className="h-5 w-5" />}
                  {cls.id === "polyvalent" && <Shield className="h-5 w-5" />}
                  {cls.id === "slipman" && <span className="text-lg font-bold">!</span>}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground">{cls.name}</span>
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                      style={{ backgroundColor: cls.color + "20", color: cls.color }}
                    >
                      {cls.difficulty}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{cls.subtitle}</p>
                  <p className="mt-1 text-xs text-muted-foreground/70">{cls.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-[10px] font-mono">
                    {cls.bonusAtk > 0 && <span className="rounded bg-destructive/10 px-1.5 py-0.5 text-destructive">ATK +{cls.bonusAtk}</span>}
                    {cls.bonusDef > 0 && <span className="rounded bg-[hsl(var(--info))/0.1] px-1.5 py-0.5 text-[hsl(var(--info))]">DEF +{cls.bonusDef}</span>}
                    {cls.bonusHp !== 0 && <span className={`rounded px-1.5 py-0.5 ${cls.bonusHp > 0 ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>HP {cls.bonusHp > 0 ? "+" : ""}{cls.bonusHp}</span>}
                    {cls.bonusMagic > 0 && <span className="rounded bg-[hsl(var(--chart-4))/0.1] px-1.5 py-0.5 text-[hsl(var(--chart-4))]">MAG +{cls.bonusMagic}</span>}
                  </div>
                  <p className="mt-1 text-[10px] italic text-muted-foreground">{cls.passive}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Continue button */}
        <button
          onClick={handleNext}
          disabled={isTyping ? false : (step?.action === "name" && !nameInput.trim()) || (step?.action === "class" && !selectedClass)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary/10 py-3 text-sm font-bold text-primary transition-all hover:bg-primary/20 disabled:opacity-40 disabled:hover:bg-primary/10"
        >
          {isTyping ? "Passer" : step?.action === "finish" ? "Commencer l'aventure" : "Continuer"}
          <ChevronRight className="h-4 w-4" />
        </button>

        {/* Progress dots */}
        <div className="mt-6 flex justify-center gap-1">
          {STORY_STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all ${
                i === currentStep ? "w-6 bg-primary" : i < currentStep ? "w-2 bg-primary/40" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
