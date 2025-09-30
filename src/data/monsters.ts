export interface Monster {
  id: number;
  name: string;
  type: string; // e.g., Fire, Water
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  baseStats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
  description: string;
  image: string;
  evolution: {
    to?: number; // Evolves to this monster ID
    levelRequired: number;
  };
  encounterRate: number; // 0-1, lower for rarer
}

export const monsters: Monster[] = [
  {
    id: 1,
    name: "Flamepup",
    type: "Fire",
    rarity: "common",
    baseStats: { hp: 50, attack: 40, defense: 30, speed: 45 },
    description: "A playful fire-type pup that sparks with curiosity. Found in volcanic meadows, it loves chasing embers and has a warm, loyal personality.",
    image: "https://picsum.photos/300/300?random=1&blur=1",
    evolution: { to: 2, levelRequired: 16 },
    encounterRate: 0.4
  },
  {
    id: 2,
    name: "Inferno Hound",
    type: "Fire",
    rarity: "rare",
    baseStats: { hp: 80, attack: 70, defense: 50, speed: 60 },
    description: "Evolved from Flamepup, this fierce hound commands blazing trails. Its fur glows like molten lava, making it a formidable guardian of ancient ruins.",
    image: "https://picsum.photos/300/300?random=2&blur=1",
    evolution: { levelRequired: 0 }, // No further evolution
    encounterRate: 0.2
  },
  {
    id: 3,
    name: "Aqua Sprite",
    type: "Water",
    rarity: "common",
    baseStats: { hp: 55, attack: 35, defense: 40, speed: 50 },
    description: "A mischievous water spirit that dances on riverbanks. It creates bubbles for fun and helps travelers by purifying streams with its gentle waves.",
    image: "https://picsum.photos/300/300?random=3&blur=1",
    evolution: { to: 4, levelRequired: 18 },
    encounterRate: 0.35
  },
  {
    id: 4,
    name: "Tidal Serpent",
    type: "Water",
    rarity: "epic",
    baseStats: { hp: 90, attack: 65, defense: 70, speed: 55 },
    description: "Evolved from Aqua Sprite, this serpentine beast summons tidal waves. Legends say it guards hidden ocean treasures and has scales that shimmer like pearls.",
    image: "https://picsum.photos/300/300?random=4&blur=1",
    evolution: { levelRequired: 0 },
    encounterRate: 0.15
  },
  {
    id: 5,
    name: "Leafkin",
    type: "Grass",
    rarity: "common",
    baseStats: { hp: 60, attack: 45, defense: 35, speed: 40 },
    description: "A forest dweller with vine-like arms, nurturing plants with its touch. It's shy but brave when protecting its woodland home from intruders.",
    image: "https://picsum.photos/300/300?random=5&blur=1",
    evolution: { to: 6, levelRequired: 14 },
    encounterRate: 0.45
  },
  {
    id: 6,
    name: "Vine Guardian",
    type: "Grass",
    rarity: "rare",
    baseStats: { hp: 75, attack: 60, defense: 55, speed: 50 },
    description: "Evolved Leafkin that entwines foes with unbreakable vines. It blooms rare flowers during full moons, symbolizing growth and resilience in nature.",
    image: "https://picsum.photos/300/300?random=6&blur=1",
    evolution: { levelRequired: 0 },
    encounterRate: 0.25
  },
  {
    id: 7,
    name: "Thunder Wisp",
    type: "Electric",
    rarity: "epic",
    baseStats: { hp: 65, attack: 75, defense: 40, speed: 80 },
    description: "A speedy spark of electricity that zips through storm clouds. It charges gadgets accidentally and dreams of harnessing lightning for good.",
    image: "https://picsum.photos/300/300?random=7&blur=1",
    evolution: { to: 8, levelRequired: 20 },
    encounterRate: 0.1
  },
  {
    id: 8,
    name: "Storm Drake",
    type: "Electric",
    rarity: "legendary",
    baseStats: { hp: 100, attack: 95, defense: 60, speed: 90 },
    description: "The ultimate evolution of Thunder Wisp, a draconic force of tempests. Ancient myths depict it as the caller of thunder, with wings that crackle endlessly.",
    image: "https://picsum.photos/300/300?random=8&blur=1",
    evolution: { levelRequired: 0 },
    encounterRate: 0.05
  },
  {
    id: 9,
    name: "Rock Golem",
    type: "Rock",
    rarity: "rare",
    baseStats: { hp: 85, attack: 50, defense: 80, speed: 25 },
    description: "A sturdy mountain dweller carved from granite. It moves slowly but crushes obstacles, often mistaken for statues until it stirs to life.",
    image: "https://picsum.photos/300/300?random=9&blur=1",
    evolution: { levelRequired: 0 },
    encounterRate: 0.18
  },
  {
    id: 10,
    name: "Shadow Phantom",
    type: "Dark",
    rarity: "epic",
    baseStats: { hp: 70, attack: 85, defense: 45, speed: 65 },
    description: "A elusive specter that lurks in moonlit shadows. It whispers secrets of the night and vanishes like smoke, striking fear in the hearts of the unwary.",
    image: "https://picsum.photos/300/300?random=10&blur=1",
    evolution: { levelRequired: 0 },
    encounterRate: 0.12
  }
];

export const areas = [
  { id: 1, name: "Forest Glade", commonMonsters: [5], rareMonsters: [6, 9] },
  { id: 2, name: "Volcanic Plains", commonMonsters: [1], rareMonsters: [2, 7] },
  { id: 3, name: "Ocean Depths", commonMonsters: [3], rareMonsters: [4, 10] },
  { id: 4, name: "Storm Peaks", commonMonsters: [7], rareMonsters: [8] }
];