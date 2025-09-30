import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlayerMonster, BattleState, Monster } from '@/types/game';
import { Sword, Heart, Zap } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface BattleArenaProps {
  playerMonster: PlayerMonster;
  enemyMonster: Monster;
  onBattleEnd: (winner: 'player' | 'enemy') => void;
}

const BattleArena = ({ playerMonster, enemyMonster, onBattleEnd }: BattleArenaProps) => {
  const [battleState, setBattleState] = useState<BattleState>({
    playerMonster: { ...playerMonster, currentHp: playerMonster.currentHp },
    enemyMonster,
    playerTurn: true,
    battleLog: [`A wild ${enemyMonster.name} appeared!`],
    winner: undefined,
    enemyCurrentHp: enemyMonster.baseStats.hp,
  });
  const { toast } = useToast();

  const performAttack = (attacker: 'player' | 'enemy', damage: number) => {
    setBattleState(prev => {
      let newPlayerHp = prev.playerMonster?.currentHp || 0;
      let newEnemyHp = prev.enemyCurrentHp || 0;
      let newLog = [...prev.battleLog, `${attacker.toUpperCase()} attacks for ${damage} damage!`];

      if (attacker === 'player') {
        newEnemyHp = Math.max(0, newEnemyHp - damage);
      } else {
        newPlayerHp = Math.max(0, newPlayerHp - damage);
      }

      if (newEnemyHp <= 0) {
        newLog.push(`Wild ${prev.enemyMonster?.name} fainted!`);
        return { 
          ...prev, 
          battleLog: newLog, 
          winner: 'player', 
          playerTurn: false,
          enemyCurrentHp: newEnemyHp,
        };
      }
      if (newPlayerHp <= 0) {
        newLog.push(`${prev.playerMonster?.nickname || prev.playerMonster?.name} fainted!`);
        return { 
          ...prev, 
          battleLog: newLog, 
          winner: 'enemy', 
          playerTurn: false,
          playerMonster: { ...prev.playerMonster, currentHp: newPlayerHp },
        };
      }

      const updatedPlayer = { ...prev.playerMonster, currentHp: newPlayerHp };
      return { 
        ...prev, 
        battleLog: newLog, 
        playerTurn: !prev.playerTurn,
        playerMonster: updatedPlayer,
        enemyCurrentHp: newEnemyHp,
      };
    });
  };

  const playerAttack = () => {
    if (!battleState.playerTurn || battleState.winner) return;
    const damage = Math.max(1, playerMonster.attack - (enemyMonster.baseStats.defense / 2));
    performAttack('player', damage);
  };

  const enemyAttack = () => {
    if (battleState.playerTurn || battleState.winner) return;
    const damage = Math.max(1, enemyMonster.baseStats.attack - (playerMonster.defense / 2));
    performAttack('enemy', damage);
  };

  useEffect(() => {
    if (battleState.winner) {
      setTimeout(() => onBattleEnd(battleState.winner!), 1500);
      toast({ title: battleState.winner === 'player' ? 'Victory!' : 'Defeat!' });
    } else if (!battleState.playerTurn) {
      const timeout = setTimeout(enemyAttack, 1000);
      return () => clearTimeout(timeout);
    }
  }, [battleState.playerTurn, battleState.winner]);

  if (battleState.winner) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">{battleState.winner === 'player' ? 'You Win!' : 'You Lose!'}</h2>
          <div className="space-y-2 text-sm">
            {battleState.battleLog.slice(-3).map((log, i) => (
              <p key={i}>{log}</p>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="flex justify-between mb-4">
          <div className="text-center">
            <img src={playerMonster.image || '/placeholder.svg'} alt={playerMonster.name} className="w-32 h-32 mx-auto mb-2" />
            <h3 className="font-bold">{playerMonster.nickname || playerMonster.name} (Lv.{playerMonster.level})</h3>
            <div className="flex items-center justify-center space-x-2 mt-1">
              <Heart className="text-red-500" size={16} />
              <span>{battleState.playerMonster?.currentHp}/{playerMonster.maxHp}</span>
            </div>
          </div>
          <div className="text-center">
            <img src={enemyMonster.image} alt={enemyMonster.name} className="w-32 h-32 mx-auto mb-2" />
            <h3 className="font-bold">Wild {enemyMonster.name}</h3>
            <div className="flex items-center justify-center space-x-2 mt-1">
              <Heart className="text-red-500" size={16} />
              <span>{battleState.enemyCurrentHp}/{enemyMonster.baseStats.hp}</span>
            </div>
          </div>
        </div>
        <div className="mb-4 h-20 bg-gray-100 p-2 rounded overflow-y-auto">
          {battleState.battleLog.slice(-5).map((log, i) => (
            <p key={i} className="text-sm">{log}</p>
          ))}
        </div>
        {battleState.playerTurn && !battleState.winner && (
          <div className="flex space-x-2 justify-center">
            <Button onClick={playerAttack} variant="default">
              <Sword className="mr-2 h-4 w-4" /> Attack
            </Button>
            <Button variant="outline" disabled>Item</Button>
            <Button variant="outline" disabled>Switch</Button>
          </div>
        )}
        {!battleState.playerTurn && !battleState.winner && (
          <div className="text-center">Enemy is attacking...</div>
        )}
      </CardContent>
    </Card>
  );
};

export default BattleArena;