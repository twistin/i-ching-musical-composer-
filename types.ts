
export interface MusicalElements {
  scalesMelody: string;
  texture: string;
  polyrhythm: string;
}

export interface SuperColliderIdeas {
  concept: string;
  synthExample: string;
  patternExample: string;
}

export interface Trigram {
  id: string;
  name: string;
  chineseName: string;
  symbol: string;
  lines: [boolean, boolean, boolean]; // true for solid (Yang), false for broken (Yin). Bottom to top.
  musicalElements: MusicalElements;
  superColliderIdeas: SuperColliderIdeas;
}

export enum LineType {
  Solid, // Yang
  Broken // Yin
}

export interface TossedLine {
  type: LineType;
  isChanging?: boolean; // For future expansion, not used in current core logic for trigram selection
  value: number; // Sum of coin tosses (6, 7, 8, or 9)
}
    