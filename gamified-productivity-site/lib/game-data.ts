// ============================================================================
// CLASSES
// ============================================================================
export type CharacterClass = "mage" | "sorcier" | "guerrier" | "soigneur" | "polyvalent" | "slipman"

export interface ClassInfo {
  id: CharacterClass
  name: string
  subtitle: string
  description: string
  difficulty: "Facile" | "Normal" | "Difficile" | "Hardcore"
  color: string
  bonusAtk: number
  bonusDef: number
  bonusHp: number
  bonusMagic: number
  passive: string
}

export const CLASSES: ClassInfo[] = [
  { id: "guerrier", name: "Guerrier", subtitle: "Force brute", description: "Le guerrier excelle au corps a corps. Ses stats d'attaque et de defense sont les plus elevees.", difficulty: "Normal", color: "hsl(0, 72%, 51%)", bonusAtk: 15, bonusDef: 10, bonusHp: 20, bonusMagic: 0, passive: "+15% degats physiques" },
  { id: "mage", name: "Mage", subtitle: "Maitrise arcanique", description: "Le mage canalise une puissance magique devastatrice mais reste fragile.", difficulty: "Normal", color: "hsl(199, 89%, 48%)", bonusAtk: 5, bonusDef: 3, bonusHp: 5, bonusMagic: 25, passive: "+25% degats magiques" },
  { id: "sorcier", name: "Sorcier", subtitle: "Magie noire", description: "Le sorcier utilise des sorts interdits. Il gagne plus d'XP mais prend plus de degats.", difficulty: "Difficile", color: "hsl(280, 65%, 60%)", bonusAtk: 8, bonusDef: 0, bonusHp: 0, bonusMagic: 20, passive: "+30% XP, -20% defense" },
  { id: "soigneur", name: "Soigneur", subtitle: "Lumiere sacree", description: "Le soigneur se regenere plus vite et peut survivre la ou les autres tombent.", difficulty: "Facile", color: "hsl(142, 71%, 45%)", bonusAtk: 3, bonusDef: 8, bonusHp: 15, bonusMagic: 12, passive: "Regeneration passive +10% HP" },
  { id: "polyvalent", name: "Polyvalent", subtitle: "Equilibre parfait", description: "Le polyvalent est bon partout sans exceller nulle part. Ideal pour les debutants.", difficulty: "Facile", color: "hsl(47, 95%, 55%)", bonusAtk: 8, bonusDef: 8, bonusHp: 8, bonusMagic: 8, passive: "Stats equilibrees +8 partout" },
  { id: "slipman", name: "Slip Man", subtitle: "Mode Hardcore", description: "Le Slip Man n'a RIEN. Pas d'armure, pas de bonus. Juste du skill pur. Pour les vrais.", difficulty: "Hardcore", color: "hsl(340, 75%, 55%)", bonusAtk: 0, bonusDef: 0, bonusHp: -10, bonusMagic: 0, passive: "-10% HP, +50% or obtenu" },
]

// ============================================================================
// ITEM RARITIES
// ============================================================================
export type ItemRarity = "trash" | "common" | "uncommon" | "rare" | "epic" | "legendary" | "mythic" | "divine" | "cosmic" | "transcendent"

export interface RarityInfo {
  name: string
  color: string
  bgColor: string
  borderColor: string
  glowColor: string
  multiplier: number
}

export const RARITIES: Record<ItemRarity, RarityInfo> = {
  trash: { name: "Dechet", color: "#6b7280", bgColor: "rgba(107,114,128,0.1)", borderColor: "rgba(107,114,128,0.3)", glowColor: "transparent", multiplier: 0.5 },
  common: { name: "Commun", color: "#9ca3af", bgColor: "rgba(156,163,175,0.1)", borderColor: "rgba(156,163,175,0.3)", glowColor: "transparent", multiplier: 1 },
  uncommon: { name: "Peu Commun", color: "#22c55e", bgColor: "rgba(34,197,94,0.1)", borderColor: "rgba(34,197,94,0.3)", glowColor: "rgba(34,197,94,0.15)", multiplier: 1.5 },
  rare: { name: "Rare", color: "#3b82f6", bgColor: "rgba(59,130,246,0.1)", borderColor: "rgba(59,130,246,0.3)", glowColor: "rgba(59,130,246,0.15)", multiplier: 2 },
  epic: { name: "Epique", color: "#a855f7", bgColor: "rgba(168,85,247,0.1)", borderColor: "rgba(168,85,247,0.3)", glowColor: "rgba(168,85,247,0.2)", multiplier: 3 },
  legendary: { name: "Legendaire", color: "#f59e0b", bgColor: "rgba(245,158,11,0.1)", borderColor: "rgba(245,158,11,0.4)", glowColor: "rgba(245,158,11,0.25)", multiplier: 5 },
  mythic: { name: "Mythique", color: "#ef4444", bgColor: "rgba(239,68,68,0.1)", borderColor: "rgba(239,68,68,0.4)", glowColor: "rgba(239,68,68,0.25)", multiplier: 8 },
  divine: { name: "Divin", color: "#fbbf24", bgColor: "rgba(251,191,36,0.1)", borderColor: "rgba(251,191,36,0.5)", glowColor: "rgba(251,191,36,0.3)", multiplier: 12 },
  cosmic: { name: "Cosmique", color: "#e879f9", bgColor: "rgba(232,121,249,0.1)", borderColor: "rgba(232,121,249,0.5)", glowColor: "rgba(232,121,249,0.3)", multiplier: 18 },
  transcendent: { name: "Transcendant", color: "#fff", bgColor: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.6)", glowColor: "rgba(255,255,255,0.35)", multiplier: 25 },
}

// ============================================================================
// ITEMS (Weapons, Armors, Shields, Accessories)
// ============================================================================
export type ItemType = "weapon" | "armor" | "shield" | "helmet" | "boots" | "ring" | "amulet"

export interface GameItem {
  id: string
  name: string
  type: ItemType
  rarity: ItemRarity
  atk: number
  def: number
  hp: number
  magic: number
  cost: number
  levelReq: number
  description: string
}

function makeItem(id: string, name: string, type: ItemType, rarity: ItemRarity, atk: number, def: number, hp: number, magic: number, cost: number, levelReq: number, desc: string): GameItem {
  return { id, name, type, rarity, atk, def, hp, magic, cost, levelReq, description: desc }
}

export const ALL_ITEMS: GameItem[] = [
  // ---- WEAPONS ----
  // Trash
  makeItem("w001", "Baton Moisi", "weapon", "trash", 2, 0, 0, 0, 5, 1, "Un baton que tu as trouve par terre."),
  makeItem("w002", "Caillou Pointu", "weapon", "trash", 3, 0, 0, 0, 8, 1, "C'est... un caillou."),
  // Common
  makeItem("w003", "Epee Rouilee", "weapon", "common", 8, 0, 0, 0, 25, 1, "Une epee basique mais fonctionnelle."),
  makeItem("w004", "Dague de Novice", "weapon", "common", 6, 0, 0, 2, 20, 1, "Petite et rapide."),
  makeItem("w005", "Baton d'Apprenti", "weapon", "common", 3, 0, 0, 8, 22, 1, "Canalise un peu de magie."),
  makeItem("w006", "Masse en Fer", "weapon", "common", 10, 1, 0, 0, 30, 2, "Lourde mais efficace."),
  // Uncommon
  makeItem("w007", "Epee de Fer", "weapon", "uncommon", 15, 0, 0, 0, 60, 3, "Une epee forgee avec soin."),
  makeItem("w008", "Arc de Chasseur", "weapon", "uncommon", 12, 0, 0, 3, 55, 3, "Precis et fiable."),
  makeItem("w009", "Sceptre de Feu", "weapon", "uncommon", 5, 0, 0, 18, 65, 4, "Brule au toucher."),
  makeItem("w010", "Hache d'Armes", "weapon", "uncommon", 18, 0, 5, 0, 70, 4, "Tranchante et puissante."),
  makeItem("w011", "Rapiere Elfique", "weapon", "uncommon", 13, 2, 0, 5, 75, 5, "Lame fine et elegante."),
  // Rare
  makeItem("w012", "Lame d'Acier Noir", "weapon", "rare", 25, 0, 0, 5, 150, 6, "Forgee dans les tenebres."),
  makeItem("w013", "Grimoire Ancien", "weapon", "rare", 5, 0, 0, 30, 160, 7, "Pages remplies de sorts."),
  makeItem("w014", "Marteau de Guerre", "weapon", "rare", 30, 3, 10, 0, 180, 7, "Ecrase tout sur son passage."),
  makeItem("w015", "Arc du Vent", "weapon", "rare", 22, 0, 0, 10, 170, 8, "Les fleches volent comme le vent."),
  makeItem("w016", "Katana Sanglant", "weapon", "rare", 28, 0, 0, 0, 175, 8, "Chaque coup est mortel."),
  // Epic
  makeItem("w017", "Claymore du Titan", "weapon", "epic", 42, 5, 15, 0, 400, 10, "Une lame gigantesque."),
  makeItem("w018", "Orbe des Tempetes", "weapon", "epic", 10, 0, 0, 50, 420, 11, "Le tonnerre est en toi."),
  makeItem("w019", "Faux Spectrale", "weapon", "epic", 38, 0, 0, 15, 380, 10, "Les ames tremblent."),
  makeItem("w020", "Arbalete du Destin", "weapon", "epic", 35, 0, 5, 12, 390, 12, "Chaque tir est guide."),
  // Legendary
  makeItem("w021", "Excalibur", "weapon", "legendary", 60, 10, 20, 10, 1200, 15, "L'epee legendaire du roi."),
  makeItem("w022", "Baton du Neant", "weapon", "legendary", 15, 5, 0, 80, 1300, 16, "Le vide absolu."),
  makeItem("w023", "Mjolnir", "weapon", "legendary", 55, 15, 25, 5, 1400, 17, "Seuls les dignes le portent."),
  // Mythic
  makeItem("w024", "Lame des Dimensions", "weapon", "mythic", 80, 10, 15, 30, 3500, 22, "Coupe a travers la realite."),
  makeItem("w025", "Necronomicon", "weapon", "mythic", 20, 0, 0, 120, 3800, 24, "Le livre interdit."),
  // Divine
  makeItem("w026", "Epee de l'Aube", "weapon", "divine", 110, 20, 30, 40, 8000, 30, "La premiere lumiere."),
  makeItem("w027", "Trident de Poseidon", "weapon", "divine", 100, 15, 20, 60, 8500, 32, "La fureur des oceans."),
  // Cosmic
  makeItem("w028", "Fendeur d'Etoiles", "weapon", "cosmic", 150, 30, 50, 70, 20000, 40, "Brise les constellations."),
  // Transcendent
  makeItem("w029", "Lame du Createur", "weapon", "transcendent", 250, 50, 100, 100, 50000, 50, "L'arme absolue. Forgee par un dieu."),

  // ---- ARMORS ----
  makeItem("a001", "Tunique Troee", "armor", "trash", 0, 2, 5, 0, 5, 1, "Mieux que rien."),
  makeItem("a002", "Armure de Cuir", "armor", "common", 0, 8, 10, 0, 30, 1, "Protection basique."),
  makeItem("a003", "Robe de Mage", "armor", "common", 0, 4, 5, 8, 28, 1, "Legere et magique."),
  makeItem("a004", "Cotte de Mailles", "armor", "uncommon", 0, 15, 15, 0, 80, 3, "Solide et eprouvee."),
  makeItem("a005", "Armure d'Ecailles", "armor", "uncommon", 0, 18, 20, 0, 90, 4, "Ecailles de dragon juvenile."),
  makeItem("a006", "Robe Enchantee", "armor", "uncommon", 0, 8, 10, 15, 85, 4, "Impregnee de magie."),
  makeItem("a007", "Plastron d'Acier", "armor", "rare", 0, 25, 30, 0, 200, 6, "Forge par un maitre."),
  makeItem("a008", "Toge de l'Archimage", "armor", "rare", 0, 12, 15, 28, 210, 7, "Portee par les grands mages."),
  makeItem("a009", "Armure du Chevalier Noir", "armor", "epic", 5, 40, 45, 0, 500, 10, "Terrifiante et impenetrable."),
  makeItem("a010", "Robe du Vide", "armor", "epic", 0, 20, 25, 45, 480, 11, "Le neant te protege."),
  makeItem("a011", "Armure de Dragon", "armor", "legendary", 10, 60, 70, 15, 1500, 15, "Ecailles de dragon ancien."),
  makeItem("a012", "Robe Celestielle", "armor", "legendary", 0, 35, 40, 65, 1600, 16, "Tissee par les anges."),
  makeItem("a013", "Exosquelette Ancien", "armor", "mythic", 15, 85, 100, 30, 4000, 23, "Technologie perdue."),
  makeItem("a014", "Manteau Divin", "armor", "divine", 20, 110, 130, 50, 9000, 31, "La protection ultime."),
  makeItem("a015", "Armure Cosmique", "armor", "cosmic", 30, 160, 180, 80, 22000, 41, "Forgee dans les etoiles."),
  makeItem("a016", "Aegide Transcendante", "armor", "transcendent", 50, 250, 300, 120, 55000, 50, "Invulnerabilite absolue."),

  // ---- SHIELDS ----
  makeItem("s001", "Couvercle de Poubelle", "shield", "trash", 0, 3, 2, 0, 4, 1, "Recyclage creatif."),
  makeItem("s002", "Bouclier en Bois", "shield", "common", 0, 10, 5, 0, 25, 1, "Simple mais fonctionnel."),
  makeItem("s003", "Bouclier en Fer", "shield", "uncommon", 0, 18, 10, 0, 70, 3, "Resistant aux coups."),
  makeItem("s004", "Ecu des Templiers", "shield", "rare", 0, 30, 20, 5, 190, 6, "Beni par la foi."),
  makeItem("s005", "Bouclier de Glace", "shield", "rare", 0, 25, 15, 15, 200, 7, "Gele les attaquants."),
  makeItem("s006", "Rempart du Titan", "shield", "epic", 0, 50, 35, 0, 550, 10, "Immovable."),
  makeItem("s007", "Aegis de Lumiere", "shield", "legendary", 5, 70, 50, 20, 1700, 15, "Repousse le mal."),
  makeItem("s008", "Mur des Dieux", "shield", "mythic", 10, 100, 80, 30, 4500, 22, "Indestructible."),
  makeItem("s009", "Bouclier Stellaire", "shield", "divine", 15, 130, 100, 50, 10000, 32, "Absorbe les etoiles."),
  makeItem("s010", "Rempart Cosmique", "shield", "cosmic", 25, 180, 150, 70, 25000, 42, "Protege les galaxies."),
  makeItem("s011", "Barricade Transcendante", "shield", "transcendent", 40, 280, 250, 100, 60000, 50, "Defense absolue."),

  // ---- HELMETS ----
  makeItem("h001", "Casque Bossele", "helmet", "trash", 0, 2, 3, 0, 4, 1, "Un casque a moitie detruit."),
  makeItem("h002", "Chapeau de Paille", "helmet", "common", 0, 3, 2, 3, 15, 1, "Pour les fermiers."),
  makeItem("h003", "Casque de Fer", "helmet", "common", 0, 7, 5, 0, 22, 2, "Protege ta tete."),
  makeItem("h004", "Capuche du Rodeur", "helmet", "uncommon", 2, 8, 5, 5, 55, 3, "Discretion assuree."),
  makeItem("h005", "Heaume d'Acier", "helmet", "rare", 0, 20, 15, 0, 150, 6, "Lourd mais solide."),
  makeItem("h006", "Diademe Magique", "helmet", "rare", 0, 10, 10, 20, 160, 7, "Amplifie la magie."),
  makeItem("h007", "Couronne de Guerre", "helmet", "epic", 5, 30, 25, 10, 450, 10, "Portee par les generaux."),
  makeItem("h008", "Masque du Roi Sombre", "helmet", "legendary", 10, 45, 40, 20, 1400, 15, "La terreur incarnee."),
  makeItem("h009", "Halo Celeste", "helmet", "mythic", 15, 65, 55, 40, 4200, 23, "Lumiere divine."),
  makeItem("h010", "Couronne des Dieux", "helmet", "divine", 25, 90, 80, 60, 9500, 31, "Pouvoir absolu."),
  makeItem("h011", "Tiare Cosmique", "helmet", "cosmic", 35, 130, 110, 90, 23000, 41, "Sagesse infinie."),

  // ---- BOOTS ----
  makeItem("b001", "Sandales Usees", "boots", "trash", 0, 1, 2, 0, 3, 1, "Tu marches pieds nus presque."),
  makeItem("b002", "Bottes en Cuir", "boots", "common", 0, 5, 5, 0, 18, 1, "Confortables."),
  makeItem("b003", "Bottes de Vitesse", "boots", "uncommon", 3, 8, 5, 3, 60, 3, "Tu cours plus vite."),
  makeItem("b004", "Greaves d'Acier", "boots", "rare", 0, 18, 12, 0, 140, 6, "Protection des jambes."),
  makeItem("b005", "Bottes Volantes", "boots", "epic", 5, 25, 20, 10, 430, 10, "Tu flottes un peu."),
  makeItem("b006", "Souliers du Roi", "boots", "legendary", 8, 40, 30, 15, 1300, 15, "Marche royale."),
  makeItem("b007", "Bottes Dimensionnelles", "boots", "mythic", 15, 60, 50, 30, 4000, 22, "Un pas = 100m."),
  makeItem("b008", "Sandales Divines", "boots", "divine", 20, 85, 70, 45, 9000, 31, "Marche sur les nuages."),
  makeItem("b009", "Bottes Cosmiques", "boots", "cosmic", 30, 120, 100, 65, 22000, 41, "Marche entre les etoiles."),

  // ---- RINGS ----
  makeItem("r001", "Anneau Tordu", "ring", "trash", 1, 0, 0, 1, 3, 1, "Bijou de pacotille."),
  makeItem("r002", "Anneau de Cuivre", "ring", "common", 2, 2, 2, 2, 15, 1, "Petit bonus a tout."),
  makeItem("r003", "Anneau d'Argent", "ring", "uncommon", 5, 5, 5, 5, 50, 3, "Un anneau elegant."),
  makeItem("r004", "Anneau de Force", "ring", "rare", 15, 0, 5, 0, 130, 6, "Puissance brute."),
  makeItem("r005", "Anneau de Sagesse", "ring", "rare", 0, 5, 5, 15, 130, 7, "Sagesse profonde."),
  makeItem("r006", "Anneau du Vampire", "ring", "epic", 20, 0, 0, 15, 400, 10, "Vole la vie."),
  makeItem("r007", "Anneau du Roi", "ring", "legendary", 25, 15, 15, 25, 1200, 15, "Pouvoir royal."),
  makeItem("r008", "Anneau du Neant", "ring", "mythic", 40, 25, 25, 40, 3800, 22, "Le vide en bague."),
  makeItem("r009", "Anneau Divin", "ring", "divine", 55, 35, 40, 55, 8500, 30, "Beni par les dieux."),
  makeItem("r010", "Anneau Cosmique", "ring", "cosmic", 80, 50, 60, 80, 21000, 40, "Forge dans un trou noir."),

  // ---- AMULETS ----
  makeItem("am001", "Pendentif Fissure", "amulet", "trash", 0, 0, 3, 1, 4, 1, "Presque casse."),
  makeItem("am002", "Amulette de Chance", "amulet", "common", 2, 2, 5, 2, 18, 1, "Un peu de chance."),
  makeItem("am003", "Talisman du Guerrier", "amulet", "uncommon", 8, 5, 8, 0, 55, 3, "Force et protection."),
  makeItem("am004", "Amulette de Mana", "amulet", "uncommon", 0, 3, 5, 12, 60, 4, "Plus de magie."),
  makeItem("am005", "Pendentif de Feu", "amulet", "rare", 15, 5, 10, 10, 145, 7, "Brulant."),
  makeItem("am006", "Amulette de l'Ombre", "amulet", "epic", 20, 10, 15, 20, 420, 10, "L'ombre te protege."),
  makeItem("am007", "Collier du Dragon", "amulet", "legendary", 30, 20, 25, 30, 1350, 15, "Souffle du dragon."),
  makeItem("am008", "Amulette Stellaire", "amulet", "mythic", 45, 30, 40, 45, 4000, 22, "Puissance astrale."),
  makeItem("am009", "Pendentif Divin", "amulet", "divine", 65, 45, 55, 65, 9000, 31, "Grace divine."),
  makeItem("am010", "Amulette Cosmique", "amulet", "cosmic", 90, 65, 80, 90, 22000, 41, "L'univers en pendentif."),
]

// ============================================================================
// BIOMES & WORLD MAP
// ============================================================================
export interface Biome {
  id: string
  name: string
  description: string
  x: number // % position on map
  y: number
  width: number
  height: number
  levelRange: [number, number]
  color: string
  mobs: string[] // mob IDs in this biome
}

export const BIOMES: Biome[] = [
  { id: "ile-depart", name: "Ile de l'Eveil", description: "Ton ile de depart. Paisible et securisee.", x: 45, y: 50, width: 12, height: 10, levelRange: [1, 3], color: "#4a5568", mobs: [] },
  { id: "foret-murmures", name: "Foret des Murmures", description: "Les arbres chuchotent des secrets anciens.", x: 30, y: 45, width: 14, height: 12, levelRange: [2, 6], color: "#2d3748", mobs: [] },
  { id: "plaines-oubli", name: "Plaines de l'Oubli", description: "Des champs immenses ou le vent hurle.", x: 55, y: 38, width: 16, height: 10, levelRange: [4, 8], color: "#4a5568", mobs: [] },
  { id: "marais-pourpre", name: "Marais Pourpre", description: "Des eaux toxiques et des creatures rampantes.", x: 20, y: 55, width: 12, height: 14, levelRange: [6, 10], color: "#553c9a", mobs: [] },
  { id: "montagnes-givre", name: "Montagnes du Givre", description: "Sommets geles ou survivent les plus forts.", x: 65, y: 25, width: 15, height: 13, levelRange: [8, 14], color: "#a0aec0", mobs: [] },
  { id: "desert-cendres", name: "Desert de Cendres", description: "Un desert volcanique brulant et mortel.", x: 15, y: 30, width: 14, height: 12, levelRange: [10, 16], color: "#744210", mobs: [] },
  { id: "jungle-ecarlate", name: "Jungle Ecarlate", description: "Vegetation rouge sang, predateurs invisibles.", x: 38, y: 20, width: 13, height: 11, levelRange: [12, 18], color: "#742a2a", mobs: [] },
  { id: "ocean-abyssal", name: "Ocean Abyssal", description: "Iles flottantes au-dessus d'un ocean sans fond.", x: 75, y: 45, width: 14, height: 13, levelRange: [14, 20], color: "#2a4365", mobs: [] },
  { id: "terre-cristal", name: "Terre de Cristal", description: "Tout est fait de cristaux luminescents.", x: 8, y: 42, width: 10, height: 11, levelRange: [16, 22], color: "#5a67d8", mobs: [] },
  { id: "toundra-eternelle", name: "Toundra Eternelle", description: "Le froid absolu. Rien ne survit longtemps.", x: 50, y: 12, width: 15, height: 10, levelRange: [18, 25], color: "#e2e8f0", mobs: [] },
  { id: "necropole", name: "Necropole Maudite", description: "Cite des morts-vivants et des ames errantes.", x: 82, y: 30, width: 12, height: 12, levelRange: [20, 28], color: "#1a202c", mobs: [] },
  { id: "volcan-primordial", name: "Volcan Primordial", description: "Le coeur de feu du monde.", x: 25, y: 15, width: 11, height: 10, levelRange: [22, 30], color: "#c53030", mobs: [] },
  { id: "ciel-brise", name: "Iles du Ciel Brise", description: "Des iles flottant dans les nuages.", x: 60, y: 58, width: 13, height: 12, levelRange: [25, 33], color: "#b2f5ea", mobs: [] },
  { id: "abime-ombre", name: "Abime de l'Ombre", description: "Tenebres pures. Meme la lumiere meurt.", x: 35, y: 65, width: 12, height: 11, levelRange: [28, 36], color: "#171923", mobs: [] },
  { id: "nexus-arcanique", name: "Nexus Arcanique", description: "Confluence de toute la magie du monde.", x: 85, y: 55, width: 10, height: 10, levelRange: [30, 38], color: "#6b46c1", mobs: [] },
  { id: "terre-corrompue", name: "Terre Corrompue", description: "La corruption consume tout.", x: 10, y: 65, width: 13, height: 12, levelRange: [33, 40], color: "#22543d", mobs: [] },
  { id: "pic-celeste", name: "Pic Celeste", description: "Le sommet du monde, plus pres des dieux.", x: 50, y: 75, width: 11, height: 10, levelRange: [36, 43], color: "#fefcbf", mobs: [] },
  { id: "vortex-chaos", name: "Vortex du Chaos", description: "La realite se dechire en morceaux.", x: 72, y: 68, width: 12, height: 11, levelRange: [40, 47], color: "#feb2b2", mobs: [] },
  { id: "sanctuaire-oublie", name: "Sanctuaire Oublie", description: "Temples anciens d'une civilisation perdue.", x: 25, y: 78, width: 12, height: 10, levelRange: [43, 48], color: "#fbd38d", mobs: [] },
  { id: "throne-final", name: "Throne du Neant", description: "La destination finale. Le boss ultime t'attend.", x: 50, y: 88, width: 10, height: 8, levelRange: [48, 50], color: "#e53e3e", mobs: [] },
]

// ============================================================================
// MOBS & BOSSES (300+)
// ============================================================================
export type MobType = "mob" | "elite" | "miniboss" | "boss" | "worldboss"

export interface Mob {
  id: string
  name: string
  type: MobType
  level: number
  hp: number
  atk: number
  def: number
  xpReward: number
  goldReward: number
  biome: string
  questDescription: string // the task to defeat it
}

function mob(id: string, name: string, type: MobType, level: number, hp: number, atk: number, def: number, xp: number, gold: number, biome: string, quest: string): Mob {
  return { id, name, type, level, hp, atk, def, xpReward: xp, goldReward: gold, biome, questDescription: quest }
}

// Generate 300+ mobs across all biomes
export const ALL_MOBS: Mob[] = [
  // === ILE DE L'EVEIL (Lv 1-3) ===
  mob("m001", "Slime Vert", "mob", 1, 20, 3, 1, 10, 2, "ile-depart", "Complete 1 session Pomodoro de 25 minutes"),
  mob("m002", "Rat des Champs", "mob", 1, 15, 4, 0, 8, 1, "ile-depart", "Complete ta premiere tache du jour"),
  mob("m003", "Abeille Geante", "mob", 1, 25, 5, 1, 12, 3, "ile-depart", "Travaille 15 minutes sans toucher ton telephone"),
  mob("m004", "Scarabee Dore", "mob", 2, 30, 6, 2, 15, 5, "ile-depart", "Ecris une liste de 3 taches a faire aujourd'hui"),
  mob("m005", "Loup Solitaire", "elite", 2, 50, 8, 3, 25, 8, "ile-depart", "Travaille 30 minutes sans interruption"),
  mob("m006", "Slime Royal", "miniboss", 3, 80, 10, 5, 40, 15, "ile-depart", "Complete 2 sessions Pomodoro d'affilee"),
  mob("m007", "Gardien de l'Ile", "boss", 3, 150, 15, 8, 80, 30, "ile-depart", "Complete 3 taches et 2 sessions Pomodoro en une journee"),

  // === FORET DES MURMURES (Lv 2-6) ===
  mob("m008", "Gobelin Eclaireur", "mob", 2, 25, 5, 2, 12, 3, "foret-murmures", "Lis un article professionnel pendant 10 minutes"),
  mob("m009", "Araignee des Bois", "mob", 3, 35, 7, 3, 15, 4, "foret-murmures", "Organise tes fichiers ou ton bureau pendant 10 minutes"),
  mob("m010", "Loup Sylvestre", "mob", 3, 40, 8, 3, 18, 5, "foret-murmures", "Reponds a 5 emails en attente"),
  mob("m011", "Treant Mineur", "mob", 4, 55, 10, 6, 22, 6, "foret-murmures", "Travaille 30 minutes sur un projet creatif"),
  mob("m012", "Esprit de la Foret", "mob", 4, 50, 12, 4, 20, 7, "foret-murmures", "Fais 5 minutes de meditation ou respiration"),
  mob("m013", "Gobelin Chef", "elite", 4, 70, 14, 6, 35, 10, "foret-murmures", "Complete 2 taches consecutives sans pause"),
  mob("m014", "Fae Corrompu", "elite", 5, 85, 16, 7, 40, 12, "foret-murmures", "Travaille 45 minutes sans distraction"),
  mob("m015", "Loup Alpha", "miniboss", 5, 120, 18, 9, 60, 20, "foret-murmures", "Termine ta tache la plus difficile de la journee"),
  mob("m016", "Ancien Treant", "boss", 6, 220, 22, 12, 120, 40, "foret-murmures", "Complete 4 taches et fais 1 heure de travail profond"),

  // === PLAINES DE L'OUBLI (Lv 4-8) ===
  mob("m017", "Bandit des Plaines", "mob", 4, 45, 10, 4, 18, 5, "plaines-oubli", "Planifie ta journee de demain ce soir"),
  mob("m018", "Griffon Juvenile", "mob", 5, 60, 12, 5, 22, 6, "plaines-oubli", "Travaille 30 min sur ta tache la plus repoussee"),
  mob("m019", "Centaure Errant", "mob", 5, 65, 14, 6, 25, 7, "plaines-oubli", "Lis 10 pages d'un livre educatif"),
  mob("m020", "Elementaire de Terre", "mob", 6, 75, 15, 8, 28, 8, "plaines-oubli", "Fais du sport ou une activite physique 15 min"),
  mob("m021", "Minotaure Scout", "elite", 6, 100, 18, 9, 45, 14, "plaines-oubli", "Complete 3 sessions Pomodoro"),
  mob("m022", "Chimere des Steppes", "elite", 7, 130, 22, 10, 55, 18, "plaines-oubli", "Travaille 1 heure sans toucher ton telephone"),
  mob("m023", "Colosse de Pierre", "miniboss", 7, 180, 25, 14, 75, 25, "plaines-oubli", "Complete 5 taches en une seule journee"),
  mob("m024", "Roi Minotaure", "boss", 8, 320, 30, 18, 160, 55, "plaines-oubli", "4 sessions Pomodoro + 4 taches completees"),

  // === MARAIS POURPRE (Lv 6-10) ===
  mob("m025", "Grenouille Toxique", "mob", 6, 70, 14, 5, 25, 7, "marais-pourpre", "Nettoie et organise ton espace de travail"),
  mob("m026", "Serpent Venimeux", "mob", 6, 65, 16, 4, 23, 6, "marais-pourpre", "Revise ou corrige un de tes anciens travaux"),
  mob("m027", "Zombie des Marais", "mob", 7, 80, 18, 7, 30, 8, "marais-pourpre", "Travaille 30 minutes sur un sujet que tu repousses"),
  mob("m028", "Hydre Juvenile", "mob", 7, 90, 20, 8, 32, 9, "marais-pourpre", "Prends des notes structurees sur un sujet d'etude"),
  mob("m029", "Sorciere du Marecage", "elite", 8, 130, 24, 10, 50, 16, "marais-pourpre", "Apprends un nouveau raccourci clavier et utilise-le 10 fois"),
  mob("m030", "Golem de Boue", "elite", 8, 150, 22, 14, 55, 18, "marais-pourpre", "1 heure de travail profond sans interruption"),
  mob("m031", "Hydre Ancienne", "miniboss", 9, 220, 28, 15, 85, 30, "marais-pourpre", "Complete 6 taches en un jour"),
  mob("m032", "Reine des Marais", "boss", 10, 400, 35, 20, 200, 70, "marais-pourpre", "5 sessions Pomodoro et 5 taches en une journee"),

  // === MONTAGNES DU GIVRE (Lv 8-14) ===
  mob("m033", "Yeti Juvenile", "mob", 8, 95, 20, 10, 32, 9, "montagnes-givre", "Fais 20 pompes ou squats"),
  mob("m034", "Aigle de Glace", "mob", 9, 85, 22, 8, 30, 8, "montagnes-givre", "Ecris un resume de 100 mots de ce que tu as appris"),
  mob("m035", "Golem de Glace", "mob", 9, 110, 20, 14, 35, 10, "montagnes-givre", "Travaille 45 minutes sans aucune musique ni bruit"),
  mob("m036", "Berserker Givre", "mob", 10, 120, 25, 12, 40, 12, "montagnes-givre", "Prepare un planning pour la semaine prochaine"),
  mob("m037", "Wyverne des Neiges", "elite", 10, 170, 28, 15, 65, 22, "montagnes-givre", "Complete 4 sessions Pomodoro d'affilee"),
  mob("m038", "Geant du Givre", "elite", 11, 200, 32, 18, 75, 25, "montagnes-givre", "Travaille 2 heures sur un seul projet"),
  mob("m039", "Fenrir", "miniboss", 12, 300, 38, 22, 110, 38, "montagnes-givre", "7 taches completees en une journee"),
  mob("m040", "Roi de la Montagne", "boss", 14, 550, 45, 28, 280, 95, "montagnes-givre", "6 sessions Pomodoro + toutes les quetes du jour"),

  // === DESERT DE CENDRES (Lv 10-16) ===
  mob("m041", "Scorpion de Lave", "mob", 10, 110, 24, 10, 38, 11, "desert-cendres", "Bois 2 litres d'eau pendant ta session de travail"),
  mob("m042", "Djinn de Feu", "mob", 11, 130, 26, 11, 42, 13, "desert-cendres", "Fais un brainstorm de 15 minutes sur un projet"),
  mob("m043", "Salamandre", "mob", 11, 120, 28, 9, 40, 12, "desert-cendres", "Enseigne quelque chose a quelqu'un"),
  mob("m044", "Momie Brulante", "mob", 12, 140, 30, 14, 45, 14, "desert-cendres", "Travaille 1 heure debout ou en marchant"),
  mob("m045", "Phoenix Corrompu", "elite", 13, 220, 35, 16, 80, 28, "desert-cendres", "Complete 5 sessions Pomodoro en une journee"),
  mob("m046", "Titan de Lave", "elite", 14, 280, 40, 20, 95, 32, "desert-cendres", "Travaille 3 heures avec seulement 1 pause"),
  mob("m047", "Ifrit", "miniboss", 15, 400, 48, 25, 140, 48, "desert-cendres", "8 taches en une journee"),
  mob("m048", "Seigneur des Cendres", "boss", 16, 700, 55, 32, 350, 120, "desert-cendres", "7 Pomodoros + 8 taches en une journee"),

  // === JUNGLE ECARLATE (Lv 12-18) ===
  mob("m049", "Panthère Rouge", "mob", 12, 130, 30, 11, 42, 13, "jungle-ecarlate", "Ecris 500 mots sur n'importe quel sujet"),
  mob("m050", "Plante Carnivore", "mob", 13, 150, 28, 15, 45, 14, "jungle-ecarlate", "Fais 15 minutes de stretching ou yoga"),
  mob("m051", "Gorille de Sang", "mob", 13, 160, 32, 14, 48, 15, "jungle-ecarlate", "Resous un probleme complexe etape par etape"),
  mob("m052", "Naga Venimeux", "mob", 14, 170, 35, 15, 52, 17, "jungle-ecarlate", "Fais une revue de tes objectifs de la semaine"),
  mob("m053", "Chasseur Invisible", "elite", 15, 250, 40, 18, 90, 30, "jungle-ecarlate", "Travaille 90 minutes sans interruption"),
  mob("m054", "Roi Serpent", "elite", 16, 300, 45, 22, 110, 38, "jungle-ecarlate", "6 sessions Pomodoro avec seulement 5 min de pause entre"),
  mob("m055", "T-Rex Ecarlate", "miniboss", 17, 450, 52, 28, 170, 55, "jungle-ecarlate", "Complete 10 taches en une journee"),
  mob("m056", "Reine Naga", "boss", 18, 850, 60, 35, 420, 145, "jungle-ecarlate", "8 Pomodoros + 10 taches"),

  // === OCEAN ABYSSAL (Lv 14-20) ===
  mob("m057", "Meduse Geante", "mob", 14, 160, 32, 12, 48, 15, "ocean-abyssal", "Apprends 10 nouveaux mots de vocabulaire"),
  mob("m058", "Pieuvre des Abysses", "mob", 15, 180, 35, 15, 52, 17, "ocean-abyssal", "Travaille 45 min sur un skill que tu veux ameliorer"),
  mob("m059", "Requin Spectral", "mob", 15, 170, 38, 13, 50, 16, "ocean-abyssal", "Fais 30 minutes d'exercice physique"),
  mob("m060", "Serpent de Mer", "mob", 16, 200, 40, 18, 58, 19, "ocean-abyssal", "Ecris un journal de ta journee en 200 mots"),
  mob("m061", "Leviathan Junior", "elite", 17, 320, 48, 22, 120, 40, "ocean-abyssal", "2 heures de travail profond consecutif"),
  mob("m062", "Sirene Maudite", "elite", 18, 350, 45, 25, 130, 45, "ocean-abyssal", "7 sessions Pomodoro en une journee"),
  mob("m063", "Calamar Colossal", "miniboss", 19, 520, 55, 30, 200, 68, "ocean-abyssal", "12 taches en une journee"),
  mob("m064", "Kraken", "boss", 20, 1000, 65, 38, 500, 170, "ocean-abyssal", "9 Pomodoros + 12 taches en une journee"),

  // === TERRE DE CRISTAL (Lv 16-22) ===
  mob("m065", "Golem de Cristal", "mob", 16, 190, 35, 20, 55, 18, "terre-cristal", "Redige un plan detaille pour un projet"),
  mob("m066", "Elemental de Prisme", "mob", 17, 210, 38, 18, 58, 19, "terre-cristal", "Apprends un nouveau concept et explique-le simplement"),
  mob("m067", "Dragon de Verre", "mob", 17, 220, 42, 16, 62, 20, "terre-cristal", "Fais une presentation de 5 min sur un sujet"),
  mob("m068", "Cristallien", "mob", 18, 240, 40, 22, 65, 22, "terre-cristal", "Travaille sur un probleme pendant 1h sans regarder la solution"),
  mob("m069", "Prisme Vivant", "elite", 19, 350, 48, 25, 130, 45, "terre-cristal", "Complete 8 sessions Pomodoro"),
  mob("m070", "Gardien de Cristal", "elite", 20, 400, 52, 28, 150, 50, "terre-cristal", "3 heures de travail profond"),
  mob("m071", "Titan de Diamant", "miniboss", 21, 580, 60, 35, 230, 78, "terre-cristal", "14 taches en une journee"),
  mob("m072", "Roi de Cristal", "boss", 22, 1200, 70, 42, 600, 200, "terre-cristal", "10 Pomodoros + 14 taches"),

  // === TOUNDRA ETERNELLE (Lv 18-25) ===
  mob("m073", "Mammouth Spectral", "mob", 18, 230, 40, 20, 62, 20, "toundra-eternelle", "Mange sainement toute la journee"),
  mob("m074", "Wendigo", "mob", 19, 250, 45, 18, 68, 22, "toundra-eternelle", "Travaille 1h sur un projet personnel"),
  mob("m075", "Loup de Givre Ancien", "mob", 20, 270, 48, 22, 72, 24, "toundra-eternelle", "Fais 30 pushups repartis dans la journee"),
  mob("m076", "Liche de Glace", "mob", 20, 260, 50, 20, 70, 23, "toundra-eternelle", "Ecris 1000 mots productifs"),
  mob("m077", "Behemoth Arctique", "elite", 22, 420, 58, 30, 170, 55, "toundra-eternelle", "4 heures de travail productif"),
  mob("m078", "Valkyrie Dechu", "elite", 23, 460, 62, 32, 190, 62, "toundra-eternelle", "9 sessions Pomodoro"),
  mob("m079", "Jormungandr", "miniboss", 24, 650, 68, 38, 280, 95, "toundra-eternelle", "16 taches en une journee"),
  mob("m080", "Niflheim le Glacial", "boss", 25, 1500, 80, 48, 750, 250, "toundra-eternelle", "12 Pomodoros + 16 taches"),

  // === NECROPOLE MAUDITE (Lv 20-28) ===
  mob("m081", "Squelette Guerrier", "mob", 20, 250, 45, 18, 68, 22, "necropole", "Travaille 1h sur ton plus gros defaut professionnel"),
  mob("m082", "Zombie Blindé", "mob", 21, 280, 42, 25, 72, 24, "necropole", "Resous 5 problemes de logique ou maths"),
  mob("m083", "Fantome Vengeur", "mob", 22, 260, 52, 15, 78, 26, "necropole", "Fais une retrospective ecrite de ta semaine"),
  mob("m084", "Vampire Noble", "mob", 22, 300, 55, 22, 82, 27, "necropole", "Travaille 2h consecutives sur un seul sujet"),
  mob("m085", "Chevalier Mort", "elite", 24, 450, 62, 32, 190, 62, "necropole", "Complete toutes les quetes du jour"),
  mob("m086", "Liche Imperiale", "elite", 25, 500, 68, 35, 210, 70, "necropole", "5 heures de travail profond en une journee"),
  mob("m087", "Dracoliche", "miniboss", 26, 750, 75, 42, 320, 108, "necropole", "18 taches en une journee"),
  mob("m088", "Roi des Morts", "boss", 28, 1800, 90, 55, 900, 300, "necropole", "14 Pomodoros + 18 taches"),

  // === VOLCAN PRIMORDIAL (Lv 22-30) ===
  mob("m089", "Magma Golem", "mob", 22, 290, 50, 22, 78, 26, "volcan-primordial", "Travaille debout pendant 1 heure"),
  mob("m090", "Demon de Lave", "mob", 23, 310, 55, 20, 82, 28, "volcan-primordial", "Apprends quelque chose de nouveau en 30 min"),
  mob("m091", "Hydre de Feu", "mob", 24, 340, 58, 25, 88, 30, "volcan-primordial", "Fais 50 squats repartis dans la journee"),
  mob("m092", "Phoenix Noir", "mob", 25, 360, 62, 28, 95, 32, "volcan-primordial", "Ecris un plan d'action pour la semaine"),
  mob("m093", "Balrog", "elite", 27, 550, 72, 38, 240, 80, "volcan-primordial", "6 heures de travail productif"),
  mob("m094", "Titan de Magma", "elite", 28, 600, 78, 42, 260, 88, "volcan-primordial", "10 sessions Pomodoro"),
  mob("m095", "Vulcain", "miniboss", 29, 850, 85, 48, 380, 128, "volcan-primordial", "20 taches en une journee"),
  mob("m096", "Embraseur Primordial", "boss", 30, 2200, 100, 60, 1100, 370, "volcan-primordial", "15 Pomodoros + 20 taches"),

  // === ILES DU CIEL BRISE (Lv 25-33) ===
  mob("m097", "Harpie Celeste", "mob", 25, 350, 58, 25, 90, 30, "ciel-brise", "Termine un projet en cours a 100%"),
  mob("m098", "Pegase Corrompu", "mob", 26, 370, 62, 28, 95, 32, "ciel-brise", "Fais 1 heure de travail creatif"),
  mob("m099", "Elemental d'Air", "mob", 27, 400, 65, 28, 100, 34, "ciel-brise", "Medite 20 minutes"),
  mob("m100", "Griffon Dore", "mob", 28, 420, 68, 32, 108, 36, "ciel-brise", "Travaille 3h sur un projet complexe"),
  mob("m101", "Ange Dechu", "elite", 30, 600, 78, 40, 280, 95, "ciel-brise", "7 heures de travail productif"),
  mob("m102", "Seraph Noir", "elite", 31, 650, 82, 44, 300, 100, "ciel-brise", "11 sessions Pomodoro"),
  mob("m103", "Thunderbird", "miniboss", 32, 950, 90, 50, 420, 142, "ciel-brise", "22 taches en une journee"),
  mob("m104", "Zeus le Foudroyant", "boss", 33, 2600, 110, 65, 1300, 430, "ciel-brise", "16 Pomodoros + 22 taches"),

  // === ABIME DE L'OMBRE (Lv 28-36) ===
  mob("m105", "Ombre Rampante", "mob", 28, 400, 65, 28, 102, 34, "abime-ombre", "Travaille 2h sans aucune distraction electronique"),
  mob("m106", "Cauchemar Vivant", "mob", 29, 430, 68, 30, 108, 36, "abime-ombre", "Resous un probleme que tu repousses depuis 1 semaine"),
  mob("m107", "Demon de l'Ombre", "mob", 30, 460, 72, 32, 115, 38, "abime-ombre", "Fais un bilan ecrit de tes progres du mois"),
  mob("m108", "Banshee Obscure", "mob", 31, 480, 75, 30, 120, 40, "abime-ombre", "Apprends et pratique une competence technique 2h"),
  mob("m109", "Void Walker", "elite", 33, 700, 85, 45, 320, 108, "abime-ombre", "8 heures de travail productif"),
  mob("m110", "Spectre Ancien", "elite", 34, 750, 90, 48, 350, 118, "abime-ombre", "12 sessions Pomodoro"),
  mob("m111", "Abomination", "miniboss", 35, 1100, 98, 55, 480, 162, "abime-ombre", "25 taches en une journee"),
  mob("m112", "Seigneur des Tenebres", "boss", 36, 3000, 120, 72, 1500, 500, "abime-ombre", "18 Pomodoros + 25 taches"),

  // === NEXUS ARCANIQUE (Lv 30-38) ===
  mob("m113", "Construct Arcanique", "mob", 30, 450, 70, 32, 112, 38, "nexus-arcanique", "Resous 10 exercices de logique"),
  mob("m114", "Mage Fou", "mob", 31, 470, 75, 28, 118, 40, "nexus-arcanique", "Ecris un article de 500 mots sur un sujet technique"),
  mob("m115", "Elemental de Mana", "mob", 32, 500, 78, 35, 125, 42, "nexus-arcanique", "3h de travail profond sans pause"),
  mob("m116", "Golem Arcanique", "mob", 33, 530, 80, 40, 132, 44, "nexus-arcanique", "Enseigne un concept complexe a quelqu'un"),
  mob("m117", "Archimage Corrompu", "elite", 35, 780, 92, 48, 370, 125, "nexus-arcanique", "9 heures productives"),
  mob("m118", "Dragon de Mana", "elite", 36, 840, 98, 52, 400, 135, "nexus-arcanique", "13 sessions Pomodoro"),
  mob("m119", "Nexus Gardien", "miniboss", 37, 1250, 105, 60, 540, 182, "nexus-arcanique", "28 taches en une journee"),
  mob("m120", "Archon Arcanique", "boss", 38, 3500, 130, 78, 1750, 580, "nexus-arcanique", "20 Pomodoros + 28 taches"),

  // === TERRE CORROMPUE (Lv 33-40) ===
  mob("m121", "Zombie Mute", "mob", 33, 520, 78, 35, 128, 42, "terre-corrompue", "Travaille 4h sur un seul projet"),
  mob("m122", "Bete Corrompue", "mob", 34, 550, 82, 38, 135, 45, "terre-corrompue", "Fais 100 pompes reparties dans la journee"),
  mob("m123", "Ent Pourri", "mob", 35, 580, 85, 42, 142, 48, "terre-corrompue", "Lis 50 pages d'un livre educatif"),
  mob("m124", "Aberration", "mob", 36, 620, 90, 45, 150, 50, "terre-corrompue", "Ecris 2000 mots productifs"),
  mob("m125", "Corrupteur", "elite", 38, 880, 102, 55, 420, 140, "terre-corrompue", "10 heures productives"),
  mob("m126", "Hydre Corrompue", "elite", 39, 950, 108, 58, 450, 150, "terre-corrompue", "14 sessions Pomodoro"),
  mob("m127", "Behemoth Putride", "miniboss", 39, 1400, 115, 65, 600, 200, "terre-corrompue", "30 taches en une journee"),
  mob("m128", "Noyau de Corruption", "boss", 40, 4000, 140, 85, 2000, 670, "terre-corrompue", "22 Pomodoros + 30 taches"),

  // === PIC CELESTE (Lv 36-43) ===
  mob("m129", "Gardien du Pic", "mob", 36, 600, 88, 42, 148, 50, "pic-celeste", "Complete un projet de A a Z"),
  mob("m130", "Aigle Celeste", "mob", 37, 630, 92, 40, 155, 52, "pic-celeste", "5h de travail profond consecutif"),
  mob("m131", "Titan de Nuage", "mob", 38, 680, 95, 48, 162, 54, "pic-celeste", "Fais une revue complete de tous tes objectifs"),
  mob("m132", "Archange Teste", "mob", 39, 720, 100, 50, 170, 58, "pic-celeste", "Apprends un nouveau framework ou outil"),
  mob("m133", "Seraphim", "elite", 41, 1000, 112, 60, 480, 160, "pic-celeste", "11 heures productives"),
  mob("m134", "Dragon Celeste", "elite", 42, 1080, 118, 65, 520, 175, "pic-celeste", "15 sessions Pomodoro"),
  mob("m135", "Demi-Dieu", "miniboss", 42, 1550, 125, 72, 680, 228, "pic-celeste", "32 taches en une journee"),
  mob("m136", "Gardien Celeste", "boss", 43, 4500, 150, 92, 2250, 750, "pic-celeste", "24 Pomodoros + 32 taches"),

  // === VORTEX DU CHAOS (Lv 40-47) ===
  mob("m137", "Fragment du Chaos", "mob", 40, 700, 100, 48, 168, 56, "vortex-chaos", "Travaille 6h sur un projet complexe"),
  mob("m138", "Devoreur de Realite", "mob", 41, 750, 105, 52, 178, 60, "vortex-chaos", "Resous le probleme le plus complexe de ta liste"),
  mob("m139", "Entite du Chaos", "mob", 42, 800, 110, 55, 188, 62, "vortex-chaos", "Ecris 3000 mots productifs en une journee"),
  mob("m140", "Demon Dimensionnel", "mob", 43, 850, 115, 58, 198, 66, "vortex-chaos", "10h de travail en une journee"),
  mob("m141", "Chaos Elemental", "elite", 45, 1200, 128, 68, 560, 188, "vortex-chaos", "12 heures productives"),
  mob("m142", "Destructeur Cosmique", "elite", 46, 1300, 135, 72, 600, 200, "vortex-chaos", "16 sessions Pomodoro"),
  mob("m143", "Avatar du Chaos", "miniboss", 46, 1800, 142, 80, 780, 260, "vortex-chaos", "35 taches en une journee"),
  mob("m144", "Entropie Incarnee", "boss", 47, 5200, 165, 100, 2600, 870, "vortex-chaos", "26 Pomodoros + 35 taches"),

  // === SANCTUAIRE OUBLIE (Lv 43-48) ===
  mob("m145", "Gardien Ancien", "mob", 43, 820, 112, 55, 192, 64, "sanctuaire-oublie", "Maitrises un nouveau concept en profondeur"),
  mob("m146", "Sphinx Enigmatique", "mob", 44, 860, 118, 58, 202, 68, "sanctuaire-oublie", "Enseigne pendant 2h"),
  mob("m147", "Golem Eternel", "mob", 45, 900, 122, 62, 212, 72, "sanctuaire-oublie", "Complete un MOOC ou formation"),
  mob("m148", "Oracle Brise", "mob", 46, 950, 128, 65, 225, 75, "sanctuaire-oublie", "Cree un portfolio ou document professionnel"),
  mob("m149", "Titan du Temps", "elite", 47, 1400, 140, 75, 650, 218, "sanctuaire-oublie", "13 heures productives"),
  mob("m150", "Chronos", "elite", 47, 1500, 148, 78, 700, 235, "sanctuaire-oublie", "17 sessions Pomodoro"),
  mob("m151", "Erebus", "miniboss", 48, 2000, 155, 88, 880, 295, "sanctuaire-oublie", "38 taches en une journee"),
  mob("m152", "Le Prophete", "boss", 48, 5800, 175, 108, 2900, 970, "sanctuaire-oublie", "28 Pomodoros + 38 taches"),

  // === THRONE DU NEANT (Lv 48-50) ===
  mob("m153", "Sentinelle du Neant", "mob", 48, 1000, 135, 70, 240, 80, "throne-final", "8h de travail profond en une journee"),
  mob("m154", "Horseman du Neant", "mob", 48, 1050, 140, 72, 250, 84, "throne-final", "Atteins un objectif majeur"),
  mob("m155", "Dragon du Neant", "elite", 49, 1600, 158, 85, 780, 260, "throne-final", "14 heures productives en une journee"),
  mob("m156", "Ange du Neant", "elite", 49, 1700, 165, 88, 820, 275, "throne-final", "18 sessions Pomodoro"),
  mob("m157", "Titan du Neant", "miniboss", 50, 2500, 175, 98, 1000, 335, "throne-final", "40 taches en une journee"),
  mob("m158", "NEANT ABSOLU", "worldboss", 50, 10000, 250, 150, 5000, 2000, "throne-final", "30 Pomodoros + 40 taches + streak de 30 jours"),

  // === EXTRA MOBS spread across biomes for 300+ total ===
  // Foret bonus
  mob("m159", "Lutin Farceur", "mob", 3, 30, 6, 2, 14, 4, "foret-murmures", "Range ton bureau pendant 5 minutes"),
  mob("m160", "Ours des Bois", "mob", 4, 50, 11, 5, 20, 6, "foret-murmures", "Fais 10 minutes d'exercice"),
  mob("m161", "Dryade Sombre", "elite", 5, 80, 15, 7, 38, 12, "foret-murmures", "Ecris un paragraphe sur tes objectifs"),
  // Plaines bonus
  mob("m162", "Aigle des Plaines", "mob", 5, 55, 12, 4, 20, 6, "plaines-oubli", "Lis un article de 10 minutes"),
  mob("m163", "Taureau Furieux", "mob", 6, 70, 15, 7, 26, 8, "plaines-oubli", "Travaille 20 min sur une tache ennuyeuse"),
  mob("m164", "Golem de Sable", "elite", 7, 120, 20, 10, 50, 16, "plaines-oubli", "50 minutes de travail sans pause"),
  // Marais bonus
  mob("m165", "Crapaud Venimeux", "mob", 7, 75, 16, 6, 28, 8, "marais-pourpre", "Bois 1 litre d'eau"),
  mob("m166", "Spectre des Marais", "mob", 8, 90, 20, 8, 32, 10, "marais-pourpre", "Revise tes notes de la veille"),
  mob("m167", "Dragon de Vase", "elite", 9, 160, 26, 12, 65, 22, "marais-pourpre", "45 minutes de travail profond"),
  // Montagnes bonus
  mob("m168", "Troll des Montagnes", "mob", 9, 100, 22, 10, 35, 10, "montagnes-givre", "Fais 25 pompes"),
  mob("m169", "Esprit du Blizzard", "mob", 10, 115, 24, 12, 38, 12, "montagnes-givre", "Planifie 3 taches pour demain"),
  mob("m170", "Golem de Neige", "elite", 11, 180, 30, 16, 70, 24, "montagnes-givre", "1h30 de travail sans interruption"),
  mob("m171", "Dragon de Givre", "elite", 12, 240, 35, 20, 95, 32, "montagnes-givre", "Complete 3 taches difficiles"),
  // Desert bonus
  mob("m172", "Serpent des Sables", "mob", 11, 125, 26, 10, 40, 13, "desert-cendres", "Travaille dans le silence pendant 30 min"),
  mob("m173", "Golem de Sable Noir", "mob", 12, 140, 30, 12, 44, 14, "desert-cendres", "Fais un resume de ce que tu as appris"),
  mob("m174", "Sphinx de Feu", "elite", 14, 240, 38, 18, 88, 30, "desert-cendres", "2h de travail productif"),
  mob("m175", "Dragon du Desert", "elite", 15, 300, 42, 22, 110, 36, "desert-cendres", "Complete 4 taches complexes"),
  // Jungle bonus
  mob("m176", "Pirate Jungle", "mob", 13, 145, 30, 12, 45, 15, "jungle-ecarlate", "Classe tes taches par priorite"),
  mob("m177", "Anaconda Geant", "mob", 14, 165, 34, 14, 50, 17, "jungle-ecarlate", "Fais 40 squats"),
  mob("m178", "Jaguar Sanglant", "elite", 16, 280, 42, 20, 105, 35, "jungle-ecarlate", "2h30 de travail profond"),
  mob("m179", "Ent Ecarlate", "elite", 17, 320, 48, 24, 125, 42, "jungle-ecarlate", "6 sessions Pomodoro"),
  // Ocean bonus
  mob("m180", "Crabe Geant", "mob", 15, 175, 34, 16, 50, 16, "ocean-abyssal", "Organise ta boite mail"),
  mob("m181", "Anguille Electrique", "mob", 16, 195, 38, 14, 55, 18, "ocean-abyssal", "Apprends 5 raccourcis clavier"),
  mob("m182", "Megalodon", "elite", 18, 340, 48, 24, 125, 42, "ocean-abyssal", "3h de travail consecutif"),
  mob("m183", "Hydre Marine", "elite", 19, 380, 52, 28, 145, 48, "ocean-abyssal", "8 sessions Pomodoro"),
  // Cristal bonus
  mob("m184", "Cristal Vivant", "mob", 17, 205, 38, 18, 58, 20, "terre-cristal", "Cree une mind map de tes idees"),
  mob("m185", "Basilic de Cristal", "mob", 18, 230, 42, 20, 64, 22, "terre-cristal", "1h de revision intensive"),
  mob("m186", "Phoenix de Cristal", "elite", 20, 400, 52, 28, 150, 50, "terre-cristal", "4h de travail profond"),
  mob("m187", "Dragon Prismatique", "elite", 21, 450, 58, 32, 175, 58, "terre-cristal", "10 sessions Pomodoro"),
  // Toundra bonus
  mob("m188", "Ours Polaire Alpha", "mob", 19, 260, 45, 20, 68, 22, "toundra-eternelle", "Fais 60 pompes dans la journee"),
  mob("m189", "Esprit du Froid", "mob", 20, 280, 48, 22, 72, 24, "toundra-eternelle", "2h de travail sur un skill"),
  mob("m190", "Dragon Arctique", "elite", 22, 430, 58, 30, 175, 58, "toundra-eternelle", "5h productives"),
  mob("m191", "Berserker du Givre Eternel", "elite", 24, 520, 65, 35, 210, 70, "toundra-eternelle", "11 Pomodoros"),
  // Necropole bonus
  mob("m192", "Goule Affamee", "mob", 21, 270, 45, 18, 70, 24, "necropole", "Jeune intermittent ou repas sain"),
  mob("m193", "Wraith", "mob", 22, 300, 50, 20, 78, 26, "necropole", "Travaille dans l'obscurite 30min"),
  mob("m194", "Revenant", "elite", 25, 480, 65, 32, 200, 68, "necropole", "6h de travail profond"),
  mob("m195", "Dragon Mort-Vivant", "elite", 26, 550, 72, 38, 240, 80, "necropole", "12 sessions Pomodoro"),
  // Volcan bonus
  mob("m196", "Esprit de Lave", "mob", 23, 320, 55, 22, 82, 28, "volcan-primordial", "Cuisine un repas sain toi-meme"),
  mob("m197", "Cerberus", "mob", 24, 350, 58, 25, 88, 30, "volcan-primordial", "2h de formation en ligne"),
  mob("m198", "Titan de Feu", "elite", 27, 560, 72, 38, 250, 84, "volcan-primordial", "7h productives"),
  mob("m199", "Dragon de Magma", "elite", 28, 620, 78, 42, 280, 94, "volcan-primordial", "11 sessions Pomodoro"),
  // Ciel brise bonus
  mob("m200", "Esprit du Vent", "mob", 26, 380, 62, 28, 95, 32, "ciel-brise", "2h de brainstorm creatif"),
  mob("m201", "Wyverne Celeste", "mob", 27, 400, 65, 30, 100, 34, "ciel-brise", "Termine 3 sous-projets"),
  mob("m202", "Phoenix Celeste", "elite", 30, 620, 78, 42, 290, 98, "ciel-brise", "8h de travail productif"),
  mob("m203", "Archange de Foudre", "elite", 32, 720, 88, 48, 340, 115, "ciel-brise", "13 sessions Pomodoro"),
  // Abime bonus
  mob("m204", "Larve d'Ombre", "mob", 29, 420, 68, 30, 108, 36, "abime-ombre", "Resous 3 problemes complexes"),
  mob("m205", "Démon Mineur", "mob", 30, 460, 72, 32, 115, 38, "abime-ombre", "Ecris 1500 mots productifs"),
  mob("m206", "Ange Dechu Sombre", "elite", 33, 720, 88, 45, 330, 112, "abime-ombre", "9h productives"),
  mob("m207", "Archidemon", "elite", 35, 820, 95, 52, 400, 135, "abime-ombre", "14 Pomodoros"),
  // Nexus bonus
  mob("m208", "Sprite Arcanique", "mob", 31, 480, 75, 32, 118, 40, "nexus-arcanique", "Code ou travaille 3h d'affilee"),
  mob("m209", "Golem de Rune", "mob", 32, 510, 78, 35, 125, 42, "nexus-arcanique", "Revise un examen pendant 2h"),
  mob("m210", "Dragon Arcanique", "elite", 35, 800, 92, 48, 380, 128, "nexus-arcanique", "10h productives"),
  mob("m211", "Titan de Mana", "elite", 37, 900, 100, 55, 440, 148, "nexus-arcanique", "15 Pomodoros"),
  // Terre corrompue bonus
  mob("m212", "Fungus Geant", "mob", 34, 560, 82, 38, 135, 45, "terre-corrompue", "Nettoie/organise pendant 1h"),
  mob("m213", "Dragon Corrompu", "mob", 35, 600, 88, 42, 145, 48, "terre-corrompue", "5h de travail sur un projet"),
  mob("m214", "Titan Putride", "elite", 38, 900, 105, 55, 440, 148, "terre-corrompue", "11h productives"),
  mob("m215", "Maelstrom de Corruption", "elite", 39, 980, 110, 58, 470, 158, "terre-corrompue", "16 sessions Pomodoro"),
  // Pic celeste bonus
  mob("m216", "Esprit Solaire", "mob", 37, 640, 92, 42, 155, 52, "pic-celeste", "Fais du sport 1h"),
  mob("m217", "Dragon Solaire", "mob", 38, 680, 95, 45, 162, 54, "pic-celeste", "Complete un cours en ligne"),
  mob("m218", "Titan Celeste", "elite", 41, 1020, 115, 62, 500, 168, "pic-celeste", "12h productives"),
  mob("m219", "Archange Solaire", "elite", 42, 1100, 120, 65, 540, 182, "pic-celeste", "17 sessions Pomodoro"),
  // Vortex bonus
  mob("m220", "Fragment Instable", "mob", 41, 760, 105, 52, 178, 60, "vortex-chaos", "Travaille 4h sur un defi technique"),
  mob("m221", "Anomalie", "mob", 42, 800, 110, 55, 188, 62, "vortex-chaos", "Fais une presentation de 15 min"),
  mob("m222", "Dragon du Chaos", "elite", 45, 1250, 130, 68, 580, 195, "vortex-chaos", "13h productives"),
  mob("m223", "Titan du Chaos", "elite", 46, 1350, 138, 72, 620, 208, "vortex-chaos", "18 Pomodoros"),
  // Sanctuaire bonus
  mob("m224", "Statue Vivante", "mob", 44, 870, 118, 58, 205, 68, "sanctuaire-oublie", "Lis un livre pendant 3h"),
  mob("m225", "Momie Eternelle", "mob", 45, 910, 122, 62, 215, 72, "sanctuaire-oublie", "Ecris 2500 mots"),
  mob("m226", "Titan Ancien", "elite", 47, 1500, 148, 78, 700, 235, "sanctuaire-oublie", "14h productives"),
  mob("m227", "Pharaon Immortel", "elite", 48, 1600, 155, 82, 750, 250, "sanctuaire-oublie", "19 Pomodoros"),
  // Throne bonus
  mob("m228", "Chevalier du Neant", "mob", 49, 1100, 142, 75, 260, 88, "throne-final", "Accomplis quelque chose dont tu es fier"),
  mob("m229", "Dragon du Neant Supreme", "elite", 50, 1800, 168, 90, 850, 285, "throne-final", "15h productives"),

  // === WAVE 2: Even more mobs to reach 300+ ===
  mob("m230", "Rat Enrage", "mob", 1, 18, 4, 0, 8, 2, "ile-depart", "Ouvre ton ordinateur et travaille 5 min"),
  mob("m231", "Grenouille Bleue", "mob", 2, 22, 5, 1, 10, 3, "ile-depart", "Bois un verre d'eau et commence"),
  mob("m232", "Corbeau Sinistre", "mob", 3, 32, 7, 2, 14, 4, "foret-murmures", "Mets ton telephone en mode avion 15 min"),
  mob("m233", "Champignon Toxique", "mob", 3, 28, 6, 3, 13, 4, "foret-murmures", "Fais une liste de priorites"),
  mob("m234", "Lezard Geant", "mob", 4, 42, 9, 3, 17, 5, "foret-murmures", "Travaille 20 minutes concentre"),
  mob("m235", "Faucon Sauvage", "mob", 5, 58, 12, 4, 21, 7, "plaines-oubli", "Reponds a 3 messages importants"),
  mob("m236", "Sanglier des Steppes", "mob", 5, 55, 13, 5, 22, 7, "plaines-oubli", "Fais un recap de ta matinee"),
  mob("m237", "Spectre des Herbes", "mob", 6, 68, 15, 5, 25, 8, "plaines-oubli", "25 min de travail sans interruption"),
  mob("m238", "Crabe de Vase", "mob", 7, 78, 17, 7, 28, 9, "marais-pourpre", "Nettoie ta boite de reception"),
  mob("m239", "Tortue Venimeuse", "mob", 7, 82, 15, 9, 30, 10, "marais-pourpre", "Fais 10 min de rangement"),
  mob("m240", "Mouche Geante", "mob", 8, 88, 19, 7, 31, 10, "marais-pourpre", "Travaille debout 15 min"),
  mob("m241", "Raptor de Glace", "mob", 9, 102, 21, 10, 34, 11, "montagnes-givre", "Fais 15 pompes"),
  mob("m242", "Chamois des Cimes", "mob", 10, 112, 23, 11, 37, 12, "montagnes-givre", "Ecoute un podcast educatif 30 min"),
  mob("m243", "Harfang Spectral", "mob", 11, 128, 26, 11, 41, 13, "desert-cendres", "Travaille sans boisson sucree aujourd'hui"),
  mob("m244", "Scorpion Noir", "mob", 11, 130, 27, 10, 42, 13, "desert-cendres", "Ecris 3 choses que tu as accomplies"),
  mob("m245", "Vautour de Cendres", "mob", 12, 138, 29, 12, 44, 14, "desert-cendres", "Fais un exercice de respiration 5 min"),
  mob("m246", "Araignee Pourpre", "mob", 13, 148, 31, 12, 46, 15, "jungle-ecarlate", "Classe tes projets par deadline"),
  mob("m247", "Singe Ecarlate", "mob", 14, 162, 33, 14, 50, 16, "jungle-ecarlate", "Termine la tache la plus urgente"),
  mob("m248", "Caiman Rouge", "mob", 15, 178, 36, 14, 52, 17, "ocean-abyssal", "Travaille 40 min d'affilee"),
  mob("m249", "Hippocampe Geant", "mob", 16, 192, 38, 16, 56, 18, "ocean-abyssal", "Fais 20 minutes de marche"),
  mob("m250", "Etoile de Mer Geante", "mob", 17, 208, 40, 16, 60, 20, "terre-cristal", "Apprends 1 nouveau mot dans une autre langue"),
  mob("m251", "Scorpion de Cristal", "mob", 18, 225, 42, 18, 63, 21, "terre-cristal", "Fais un schema ou diagramme"),
  mob("m252", "Pinguin Geant", "mob", 19, 245, 44, 20, 66, 22, "toundra-eternelle", "Prends une douche froide"),
  mob("m253", "Morse Berserker", "mob", 20, 265, 47, 21, 70, 23, "toundra-eternelle", "Planifie un objectif pour la semaine"),
  mob("m254", "Revenant Squelette", "mob", 21, 275, 44, 20, 71, 24, "necropole", "Fais un exercice de gratitude"),
  mob("m255", "Spectre Affame", "mob", 22, 295, 50, 20, 76, 25, "necropole", "Travaille 1h en musique classique"),
  mob("m256", "Esprit de Lave Mineur", "mob", 23, 315, 53, 22, 80, 27, "volcan-primordial", "Mange un fruit et travaille"),
  mob("m257", "Salamandre Geante", "mob", 24, 335, 56, 24, 85, 28, "volcan-primordial", "Fais 30 jumping jacks"),
  mob("m258", "Nuage Orageux", "mob", 25, 355, 60, 26, 92, 30, "ciel-brise", "Ecris tes 3 objectifs principaux"),
  mob("m259", "Oiseau de Tonnerre", "mob", 26, 375, 62, 28, 96, 32, "ciel-brise", "Travaille 50 min sans break"),
  mob("m260", "Ombre Mineure", "mob", 28, 395, 64, 28, 100, 34, "abime-ombre", "Fais 20 min de yoga"),
  mob("m261", "Tentacule d'Ombre", "mob", 29, 415, 67, 30, 105, 35, "abime-ombre", "Ecris une to-do list pour la semaine"),
  mob("m262", "Elemental de Rune", "mob", 30, 440, 70, 30, 110, 38, "nexus-arcanique", "Revise un chapitre"),
  mob("m263", "Sprite de Mana", "mob", 31, 460, 72, 32, 115, 38, "nexus-arcanique", "Travaille 1h sur un sujet difficile"),
  mob("m264", "Plante Corrompue", "mob", 33, 510, 78, 35, 125, 42, "terre-corrompue", "Fais le menage 30 min"),
  mob("m265", "Insecte Geant Corrompu", "mob", 34, 540, 80, 36, 132, 44, "terre-corrompue", "Complete 3 micro-taches en 15 min"),
  mob("m266", "Moine Celeste", "mob", 36, 610, 88, 40, 148, 50, "pic-celeste", "Medite 15 min"),
  mob("m267", "Esprit Lunaire", "mob", 37, 635, 90, 42, 152, 52, "pic-celeste", "Planifie le mois prochain"),
  mob("m268", "Gelatine du Chaos", "mob", 40, 710, 100, 48, 170, 58, "vortex-chaos", "Resous un puzzle de logique"),
  mob("m269", "Oeil du Chaos", "mob", 41, 740, 102, 50, 175, 58, "vortex-chaos", "Travaille 5h consecutives"),
  mob("m270", "Sentinelle Oubliee", "mob", 43, 830, 114, 56, 195, 65, "sanctuaire-oublie", "Ecris un article de blog"),
  mob("m271", "Momie Maudite", "mob", 44, 855, 116, 58, 200, 68, "sanctuaire-oublie", "4h de revision intensive"),
  mob("m272", "Ombre du Neant", "mob", 48, 1020, 138, 72, 245, 82, "throne-final", "Accomplis ta tache la plus dure"),
  mob("m273", "Soldat du Neant", "mob", 49, 1080, 140, 74, 255, 85, "throne-final", "9h de travail profond"),

  // Mini extra mobs for variety (to 300+)
  mob("m274", "Papillon Toxique", "mob", 2, 20, 4, 1, 10, 2, "ile-depart", "Fais une tache rapide de 5 min"),
  mob("m275", "Escargot de Fer", "mob", 3, 35, 5, 5, 12, 3, "foret-murmures", "Classe 3 fichiers sur ton bureau"),
  mob("m276", "Belette Sauvage", "mob", 4, 40, 8, 3, 16, 5, "plaines-oubli", "Reponds a 2 messages"),
  mob("m277", "Mouche Zombie", "mob", 6, 60, 13, 4, 22, 7, "marais-pourpre", "Ecris 100 mots"),
  mob("m278", "Renard Arctique", "mob", 8, 90, 18, 8, 30, 10, "montagnes-givre", "Lis 5 pages"),
  mob("m279", "Lezard de Feu", "mob", 10, 108, 22, 10, 36, 12, "desert-cendres", "Travaille 15 min debout"),
  mob("m280", "Fourmi Geante Rouge", "mob", 12, 135, 28, 11, 43, 14, "jungle-ecarlate", "Organise tes notes"),
  mob("m281", "Poisson Lanterne", "mob", 14, 155, 32, 13, 48, 16, "ocean-abyssal", "Fais 3 etirements"),
  mob("m282", "Scarabee de Cristal", "mob", 16, 188, 36, 16, 54, 18, "terre-cristal", "Travaille 30 min en silence total"),
  mob("m283", "Phoque Geant", "mob", 18, 225, 40, 18, 60, 20, "toundra-eternelle", "Bois de l'eau et etire-toi"),
  mob("m284", "Rat Mort-Vivant", "mob", 20, 255, 44, 18, 68, 22, "necropole", "Fais une to-do list"),
  mob("m285", "Lezard de Magma", "mob", 22, 288, 48, 22, 76, 26, "volcan-primordial", "Travaille 35 min non-stop"),
  mob("m286", "Colibri Geant", "mob", 24, 330, 54, 24, 84, 28, "ciel-brise", "Fais une pause de 5 min puis reprends"),
  mob("m287", "Araignee d'Ombre", "mob", 28, 390, 64, 28, 98, 32, "abime-ombre", "Resous un exercice"),
  mob("m288", "Lutin Arcanique", "mob", 30, 435, 68, 30, 108, 36, "nexus-arcanique", "Apprends un fact interessant"),
  mob("m289", "Fleur Carnivore", "mob", 33, 505, 76, 34, 122, 42, "terre-corrompue", "Fais 15 min de cardio"),
  mob("m290", "Aigle Celeste Mineur", "mob", 36, 605, 86, 40, 145, 48, "pic-celeste", "Ecris un email professionnel"),
  mob("m291", "Blob du Chaos", "mob", 40, 700, 98, 46, 165, 55, "vortex-chaos", "Travaille 2h en mode focus"),
  mob("m292", "Golem Oublie", "mob", 43, 815, 112, 54, 190, 64, "sanctuaire-oublie", "Complete un tutoriel"),
  mob("m293", "Esprit du Neant", "mob", 48, 1000, 135, 70, 238, 80, "throne-final", "Travaille jusqu'a avoir fini ta tache"),

  // World bosses spread across the world
  mob("m294", "Yggdrasil Eveille", "worldboss", 15, 3000, 80, 50, 1500, 500, "foret-murmures", "15 sessions Pomodoro + 15 taches + streak de 7 jours"),
  mob("m295", "Titan Atlas", "worldboss", 20, 4000, 100, 65, 2000, 700, "plaines-oubli", "18 sessions Pomodoro + 20 taches + streak de 10 jours"),
  mob("m296", "Tiamat", "worldboss", 25, 5000, 120, 75, 2500, 850, "montagnes-givre", "20 sessions + 25 taches + streak de 14 jours"),
  mob("m297", "Apophis", "worldboss", 30, 6000, 140, 85, 3000, 1000, "desert-cendres", "22 sessions + 28 taches + streak de 18 jours"),
  mob("m298", "Cthulhu", "worldboss", 35, 7000, 160, 95, 3500, 1200, "ocean-abyssal", "25 sessions + 30 taches + streak de 21 jours"),
  mob("m299", "Kronos", "worldboss", 40, 8000, 180, 105, 4000, 1400, "nexus-arcanique", "27 sessions + 33 taches + streak de 24 jours"),
  mob("m300", "Ragnarok", "worldboss", 45, 9000, 200, 120, 4500, 1600, "vortex-chaos", "28 sessions + 38 taches + streak de 27 jours"),
  mob("m301", "L'Innommable", "worldboss", 50, 15000, 300, 180, 8000, 3000, "throne-final", "Streak de 60 jours + 50 taches + 35 sessions Pomodoro"),
]

// ============================================================================
// DUNGEONS
// ============================================================================
export interface Dungeon {
  id: string
  name: string
  description: string
  biome: string
  requiredPower: number
  floors: number
  bossId: string
  xpReward: number
  goldReward: number
  itemReward?: string // item id
  levelReq: number
}

export const DUNGEONS: Dungeon[] = [
  { id: "d01", name: "Grotte de l'Eveil", description: "Un premier donjon pour t'entrainer.", biome: "ile-depart", requiredPower: 20, floors: 3, bossId: "m007", xpReward: 200, goldReward: 80, levelReq: 2 },
  { id: "d02", name: "Labyrinthe Sylvestre", description: "Les racines vivantes t'engloutiront.", biome: "foret-murmures", requiredPower: 60, floors: 5, bossId: "m016", xpReward: 400, goldReward: 150, levelReq: 4 },
  { id: "d03", name: "Tour du Minotaure", description: "Le Roi Minotaure t'attend au sommet.", biome: "plaines-oubli", requiredPower: 120, floors: 6, bossId: "m024", xpReward: 600, goldReward: 220, levelReq: 6 },
  { id: "d04", name: "Temple Immerge", description: "Un temple englouti par les eaux toxiques.", biome: "marais-pourpre", requiredPower: 200, floors: 7, bossId: "m032", xpReward: 850, goldReward: 300, levelReq: 8 },
  { id: "d05", name: "Pic du Desespoir", description: "Seuls les braves atteignent le sommet.", biome: "montagnes-givre", requiredPower: 320, floors: 8, bossId: "m040", xpReward: 1200, goldReward: 420, levelReq: 12 },
  { id: "d06", name: "Forge de l'Enfer", description: "Chaleur insoutenable, monstres de lave.", biome: "desert-cendres", requiredPower: 480, floors: 9, bossId: "m048", xpReward: 1600, goldReward: 560, levelReq: 14 },
  { id: "d07", name: "Canopee Sanglante", description: "La jungle se referme sur toi.", biome: "jungle-ecarlate", requiredPower: 650, floors: 10, bossId: "m056", xpReward: 2100, goldReward: 720, levelReq: 16 },
  { id: "d08", name: "Abysse du Kraken", description: "Les profondeurs cachent un monstre.", biome: "ocean-abyssal", requiredPower: 850, floors: 11, bossId: "m064", xpReward: 2700, goldReward: 950, levelReq: 18 },
  { id: "d09", name: "Mine de Cristal", description: "Les cristaux corrompent les esprits.", biome: "terre-cristal", requiredPower: 1100, floors: 12, bossId: "m072", xpReward: 3400, goldReward: 1200, levelReq: 20 },
  { id: "d10", name: "Sanctuaire Gele", description: "Le froid absolu teste ta volonte.", biome: "toundra-eternelle", requiredPower: 1400, floors: 13, bossId: "m080", xpReward: 4200, goldReward: 1500, levelReq: 23 },
  { id: "d11", name: "Catacombe du Roi", description: "Les morts ne dorment plus.", biome: "necropole", requiredPower: 1800, floors: 14, bossId: "m088", xpReward: 5200, goldReward: 1800, levelReq: 26 },
  { id: "d12", name: "Coeur du Volcan", description: "Au centre de la terre.", biome: "volcan-primordial", requiredPower: 2300, floors: 15, bossId: "m096", xpReward: 6400, goldReward: 2200, levelReq: 28 },
  { id: "d13", name: "Citadelle Celeste", description: "Un bastion flottant au-dessus du monde.", biome: "ciel-brise", requiredPower: 2900, floors: 16, bossId: "m104", xpReward: 7800, goldReward: 2700, levelReq: 31 },
  { id: "d14", name: "Gouffre Sans Fond", description: "Tombe dans l'infini.", biome: "abime-ombre", requiredPower: 3600, floors: 17, bossId: "m112", xpReward: 9500, goldReward: 3300, levelReq: 34 },
  { id: "d15", name: "Tour du Nexus", description: "La magie est ton ennemie.", biome: "nexus-arcanique", requiredPower: 4500, floors: 18, bossId: "m120", xpReward: 11500, goldReward: 4000, levelReq: 36 },
  { id: "d16", name: "Fosse de Corruption", description: "Tout ce qui entre ressort change.", biome: "terre-corrompue", requiredPower: 5500, floors: 19, bossId: "m128", xpReward: 14000, goldReward: 4800, levelReq: 38 },
  { id: "d17", name: "Ascension Celeste", description: "Monte vers les dieux.", biome: "pic-celeste", requiredPower: 6800, floors: 20, bossId: "m136", xpReward: 17000, goldReward: 5800, levelReq: 41 },
  { id: "d18", name: "Spirale du Chaos", description: "La realite se tord.", biome: "vortex-chaos", requiredPower: 8500, floors: 22, bossId: "m144", xpReward: 21000, goldReward: 7200, levelReq: 45 },
  { id: "d19", name: "Crypte Oubliee", description: "Secrets millenaires et pieges mortels.", biome: "sanctuaire-oublie", requiredPower: 10500, floors: 24, bossId: "m152", xpReward: 26000, goldReward: 9000, levelReq: 47 },
  { id: "d20", name: "Throne du Neant", description: "Le donjon final. Aucun retour possible.", biome: "throne-final", requiredPower: 15000, floors: 30, bossId: "m158", xpReward: 50000, goldReward: 20000, levelReq: 50 },
]

// ============================================================================
// ITEM TYPE ICONS (text-based, no images)
// ============================================================================
export const ITEM_TYPE_LABELS: Record<ItemType, string> = {
  weapon: "Arme",
  armor: "Armure",
  shield: "Bouclier",
  helmet: "Casque",
  boots: "Bottes",
  ring: "Anneau",
  amulet: "Amulette",
}

export const MOB_TYPE_LABELS: Record<MobType, { label: string; color: string }> = {
  mob: { label: "Mob", color: "#9ca3af" },
  elite: { label: "Elite", color: "#3b82f6" },
  miniboss: { label: "Mini-Boss", color: "#a855f7" },
  boss: { label: "Boss", color: "#f59e0b" },
  worldboss: { label: "World Boss", color: "#ef4444" },
}
