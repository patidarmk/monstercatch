import { useSearch, useNavigate } from '@tanstack/react-router';
import useGameState from '@/hooks/useGameState';
import BattleArena from '@/components/BattleArena';
import { monsters } from '@/data/monsters';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Battles = () => {
  const search = useSearch({ from: '/battles' });
  const navigate = useNavigate();
  const { gameState } = useGameState();
  const { toast } = useToast();

  const enemyId = search.enemyId;
  const playerMonster = gameState.playerTeam[0];
  const enemyMonster = enemyId ? monsters.find(m => m.id === enemyId) : null;

  const handleBattleEnd = (winner: 'player' | 'enemy') => {
    toast({ title: winner === 'player' ? 'Victory!' : 'Defeat!' });
    navigate({ to: '/' });
  };

  if (!enemyId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 py-8">
        <Breadcrumb currentPage="Battles" />
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Battle Arena
          </h1>
          <div className="text-center">
            <p className="text-xl text-gray-600 mb-4">Ready for combat? Explore to find wild monsters!</p>
            <Button onClick={() => navigate({ to: '/' })} className="px-8 py-3 text-lg">
              Find Opponent
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!playerMonster || !enemyMonster) {
    return <div className="text-center py-8">No battle ready. <Button onClick={() => navigate({ to: '/' })}>Back</Button></div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 py-8">
      <Breadcrumb currentPage={`Battle: ${enemyMonster.name}`} parentPath="/battles" />
      <div className="container mx-auto px-4">
        <BattleArena 
          playerMonster={playerMonster} 
          enemyMonster={enemyMonster} 
          onBattleEnd={handleBattleEnd} 
        />
      </div>
    </div>
  );
};

export default Battles;