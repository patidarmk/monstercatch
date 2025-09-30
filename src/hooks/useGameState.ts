import { useState, useEffect } from 'react';
import { PlayerMonster, GameState } from '@/types/game';
import { monsters, areas } from '@/data/monsters';

const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    playerTeam: [],
    caughtMonsters: [],
    currentArea: 1,
  });

  useEffect(() => {
    const saved = localStorage.getItem('monsterGameState');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure images and names for display
      parsed.playerTeam = parsed.playerTeam.map(m => ({
        ...m,
        name: monsters.find(mon => mon.id === m.monsterId)?.name,
        image: monsters.find(mon => mon.id === m.monsterId)?.image,
      }));
      parsed.caughtMonsters = parsed.caughtMonsters.map(m => ({
        ...m,
        name: monsters.find(mon => mon.id === m.monsterId)?.name,
        image: monsters.find(mon => mon.id === m.monsterId)?.image,
      }));
      setGameState(parsed);
    } else {
      // Starter monster
      const starterMonster = monsters[0];
      const starter: PlayerMonster = {
        id: Date.now(),
        monsterId: starterMonster.id,
        nickname: 'Starter Flamepup',
        level: 1,
        currentHp: starterMonster.baseStats.hp,
        maxHp: starterMonster.baseStats.hp,
        attack: starterMonster.baseStats.attack,
        defense: starterMonster.baseStats.defense,
        speed: starterMonster.baseStats.speed,
        experience: 0,
        isEvolved: false,
        name: starterMonster.name,
        image: starterMonster.image,
      };
      setGameState({ playerTeam: [starter], caughtMonsters: [starter], currentArea: 1 });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('monsterGameState', JSON.stringify(gameState));
  }, [gameState]);

  const catchMonster = (monsterId: number, nickname?: string): boolean => {
    // Rarity-based catch rate (lower for rarer)
    const baseMonster = monsters.find(m => m.id === monsterId);
    if (!baseMonster) return false;
    const catchRate = baseMonster.rarity === 'legendary' ? 0.1 : baseMonster.rarity === 'epic' ? 0.3 : baseMonster.rarity === 'rare' ? 0.5 : 0.7;
    if (Math.random() > catchRate) return false;

    const newMonster: PlayerMonster = {
      id: Date.now() + Math.random(),
      monsterId,
      nickname: nickname || baseMonster.name,
      level: 1,
      currentHp: baseMonster.baseStats.hp,
      maxHp: baseMonster.baseStats.hp,
      attack: baseMonster.baseStats.attack,
      defense: baseMonster.baseStats.defense,
      speed: baseMonster.baseStats.speed,
      experience: 0,
      isEvolved: false,
      name: baseMonster.name,
      image: baseMonster.image,
    };

    setGameState(prev => ({
      ...prev,
      caughtMonsters: [...prev.caughtMonsters, newMonster],
      playerTeam: prev.playerTeam.length < 6 ? [...prev.playerTeam, newMonster] : prev.playerTeam,
    }));
    return true;
  };

  const trainMonster = (monsterId: number) => {
    setGameState(prev => {
      const updatedCaught = prev.caughtMonsters.map(m =>
        m.id === monsterId
          ? {
              ...m,
              experience: m.experience + 10,
              level: Math.floor((m.experience + 10) / 100) + 1,
              maxHp: m.maxHp + 5,
              attack: m.attack + 3,
              defense: m.defense + 2,
              speed: m.speed + 2,
              currentHp: m.maxHp + 5, // Full heal on level up
            }
          : m
      );
      const updatedTeam = prev.playerTeam.map(m =>
        m.id === monsterId
          ? {
              ...m,
              experience: m.experience + 10,
              level: Math.floor((m.experience + 10) / 100) + 1,
              maxHp: m.maxHp + 5,
              attack: m.attack + 3,
              defense: m.defense + 2,
              speed: m.speed + 2,
              currentHp: m.maxHp + 5,
            }
          : m
      );

      // Check evolution after update
      const updatedMonster = updatedCaught.find(m => m.id === monsterId);
      if (updatedMonster) {
        const base = monsters.find(m => m.id === updatedMonster.monsterId);
        if (base?.evolution.to && updatedMonster.level >= base.evolution.levelRequired && !updatedMonster.isEvolved) {
          const evolvedId = base.evolution.to;
          const evolvedBase = monsters.find(m => m.id === evolvedId);
          if (evolvedBase) {
            return {
              ...prev,
              caughtMonsters: updatedCaught.map(m =>
                m.id === monsterId 
                  ? { 
                      ...m, 
                      isEvolved: true, 
                      monsterId: evolvedId,
                      name: evolvedBase.name,
                      image: evolvedBase.image,
                      maxHp: m.maxHp + 10, // Bonus on evolution
                      attack: m.attack + 5,
                      defense: m.defense + 5,
                      speed: m.speed + 5,
                    } 
                  : m
              ),
              playerTeam: updatedTeam.map(m =>
                m.id === monsterId 
                  ? { 
                      ...m, 
                      isEvolved: true, 
                      monsterId: evolvedId,
                      name: evolvedBase.name,
                      image: evolvedBase.image,
                      maxHp: m.maxHp + 10,
                      attack: m.attack + 5,
                      defense: m.defense + 5,
                      speed: m.speed + 5,
                    } 
                  : m
              ),
            };
          }
        }
      }

      return {
        ...prev,
        caughtMonsters: updatedCaught,
        playerTeam: updatedTeam,
      };
    });
  };

  const setCurrentArea = (areaId: number) => {
    setGameState(prev => ({ ...prev, currentArea: areaId }));
  };

  const getRandomEncounter = () => {
    const currentArea = areas.find(a => a.id === gameState.currentArea);
    if (!currentArea) return null;
    const allPossible = [
      ...currentArea.commonMonsters,
      ...currentArea.rareMonsters.flatMap(id => {
        // Rarer monsters have lower spawn chance
        return Math.random() < 0.3 ? [id] : [];
      })
    ];
    if (allPossible.length === 0) return null;
    const randomId = allPossible[Math.floor(Math.random() * allPossible.length)];
    return monsters.find(m => m.id === randomId);
  };

  return {
    gameState,
    catchMonster,
    trainMonster,
    setCurrentArea,
    getRandomEncounter,
  };
};

export default useGameState;