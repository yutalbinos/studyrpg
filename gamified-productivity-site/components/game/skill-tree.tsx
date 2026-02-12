"use client"

import { useGameState } from "@/lib/game-store"
import { Lock, Zap, Brain, Heart, Eye, Shield, Flame } from "lucide-react"

interface Skill {
  id: string
  name: string
  description: string
  icon: React.ElementType
  levelRequired: number
  branch: "focus" | "energy" | "wisdom"
}

const skills: Skill[] = [
  // Focus branch
  { id: "s1", name: "Concentration", description: "+10% XP en session Pomodoro", icon: Eye, levelRequired: 1, branch: "focus" },
  { id: "s2", name: "Flow State", description: "Sessions Pomodoro de 30min", icon: Zap, levelRequired: 3, branch: "focus" },
  { id: "s3", name: "Deep Work", description: "+25% XP pour les quetes difficiles", icon: Brain, levelRequired: 5, branch: "focus" },
  { id: "s4", name: "Zone Ultime", description: "Double XP pendant le streak", icon: Flame, levelRequired: 8, branch: "focus" },
  // Energy branch
  { id: "s5", name: "Vitalite", description: "+5 or par quete", icon: Heart, levelRequired: 2, branch: "energy" },
  { id: "s6", name: "Endurance", description: "Streak x2 plus resistant", icon: Shield, levelRequired: 4, branch: "energy" },
  { id: "s7", name: "Second Souffle", description: "Bonus de fin de journee", icon: Zap, levelRequired: 6, branch: "energy" },
  { id: "s8", name: "Immortel", description: "Le streak ne reset jamais", icon: Flame, levelRequired: 10, branch: "energy" },
  // Wisdom branch
  { id: "s9", name: "Apprentissage", description: "+15% XP quetes Savoir", icon: Brain, levelRequired: 2, branch: "wisdom" },
  { id: "s10", name: "Mentor", description: "+20% XP quetes Sociales", icon: Heart, levelRequired: 4, branch: "wisdom" },
  { id: "s11", name: "Expert", description: "Quetes bonus debloquees", icon: Eye, levelRequired: 7, branch: "wisdom" },
  { id: "s12", name: "Omniscient", description: "Toutes les quetes donnent +50% XP", icon: Flame, levelRequired: 10, branch: "wisdom" },
]

const branchConfig = {
  focus: { label: "Focus", color: "text-[hsl(var(--info))]", bg: "bg-[hsl(var(--info))/0.1]", border: "border-[hsl(var(--info))/0.3]" },
  energy: { label: "Energie", color: "text-primary", bg: "bg-primary/10", border: "border-primary/30" },
  wisdom: { label: "Sagesse", color: "text-[hsl(var(--gold))]", bg: "bg-[hsl(var(--gold))/0.1]", border: "border-[hsl(var(--gold))/0.3]" },
}

export function SkillTree() {
  const { level } = useGameState()

  const branches = (["focus", "energy", "wisdom"] as const).map(branch => ({
    ...branchConfig[branch],
    skills: skills.filter(s => s.branch === branch),
    branch,
  }))

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-foreground">Arbre de Competences</h2>
        <p className="text-sm text-muted-foreground">
          Debloques avec ton niveau ({level})
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {branches.map((branch) => (
          <div key={branch.branch} className="space-y-3">
            <h3 className={`text-sm font-bold uppercase tracking-wider ${branch.color}`}>
              {branch.label}
            </h3>
            <div className="space-y-2">
              {branch.skills.map((skill, index) => {
                const unlocked = level >= skill.levelRequired
                const Icon = skill.icon
                return (
                  <div key={skill.id} className="relative">
                    {index > 0 && (
                      <div className={`absolute -top-2 left-6 h-2 w-0.5 ${unlocked ? branch.bg : "bg-secondary"}`} />
                    )}
                    <div
                      className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${
                        unlocked
                          ? `${branch.border} ${branch.bg}`
                          : "border-border bg-card opacity-50"
                      }`}
                    >
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                        unlocked ? branch.bg : "bg-secondary"
                      }`}>
                        {unlocked ? (
                          <Icon className={`h-5 w-5 ${branch.color}`} />
                        ) : (
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className={`text-sm font-semibold ${unlocked ? "text-foreground" : "text-muted-foreground"}`}>
                            {skill.name}
                          </h4>
                          <span className="font-mono text-[10px] text-muted-foreground">
                            Nv.{skill.levelRequired}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{skill.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
