import { Monster } from '@/data/monsters';

export interface PlayerMonster {
  id: number;
  monsterId: number;
  nickname?: string;
  level: number;
  currentHp: number;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  experience: number;
  isEvolved: boolean;
  image?: string; // For display
  name?: string; // For display
}

export interface BattleState {
  playerMonster?: PlayerMonster;
  enemyMonster?: Monster;
  playerTurn: boolean;
  battleLog: string[];
  winner?: 'player' | 'enemy';
  enemyCurrentHp?: number;
}

export interface GameState {
  playerTeam: PlayerMonster[];
  caughtMonsters: PlayerMonster[];
  currentArea: number;
}