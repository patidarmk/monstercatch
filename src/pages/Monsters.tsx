import { Link } from '@tanstack/react-router';
import useGameState from '@/hooks/useGameState';
import MonsterCard from '@/components/MonsterCard';
import Breadcrumb from '@/components/Breadcrumb';
import { monsters } from '@/data/monsters';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';

const Monsters = () => {
  const { gameState } = useGameState();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-8">
      <Breadcrumb currentPage="My Monsters" parentPath="/" />
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Monster Collection
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gameState.caughtMonsters.map(monster => {
            const baseMonster = monsters.find(m => m.id === monster.monsterId);
            return (
              <Link key={monster.id} to="/monsters/$id" params={{ id: monster.id }}>
                <MonsterCard
                  monster={monster}
                  isPlayerOwned
                  rarity={baseMonster?.rarity || 'common'}
                />
              </Link>
            );
          })}
        </div>
        {gameState.caughtMonsters.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-xl text-gray-500">No monsters caught yet. Explore to find some!</p>
            <Link to="/">
              <Button className="mt-4">Start Exploring</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Monsters;