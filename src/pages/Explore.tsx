import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import useGameState from '@/hooks/useGameState';
import { areas } from '@/data/monsters';
import MonsterCard from '@/components/MonsterCard';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { MapPin, Search } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Explore = () => {
  const { gameState, setCurrentArea, getRandomEncounter, catchMonster } = useGameState();
  const [encounter, setEncounter] = useState<any>(null);
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleExplore = () => {
    setSearching(true);
    setTimeout(() => {
      const enemy = getRandomEncounter();
      if (enemy) {
        setEncounter(enemy);
      } else {
        toast({ title: "No monsters here!", description: "Try another area." });
      }
      setSearching(false);
    }, 1500);
  };

  const handleCatch = () => {
    if (catchMonster(encounter.id)) {
      toast({ title: "Caught!", description: `${encounter.name} joined your team!` });
      setEncounter(null);
    } else {
      toast({ title: "Oh no!", description: `${encounter.name} broke free!` });
      setEncounter(null);
    }
  };

  const handleBattle = () => {
    navigate({
      to: '/battles',
      search: (prev) => ({ ...prev, enemyId: encounter.id }),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-8">
      <Breadcrumb currentPage="Explore Map" />
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Explore the World
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {areas.map(area => (
            <Button
              key={area.id}
              variant={gameState.currentArea === area.id ? 'default' : 'outline'}
              className="h-auto p-6 rounded-lg"
              onClick={() => setCurrentArea(area.id)}
            >
              <MapPin className="w-8 h-8 mb-2" />
              <h3 className="font-semibold">{area.name}</h3>
              <p className="text-sm text-gray-600">Common: {area.commonMonsters.length} types</p>
            </Button>
          ))}
        </div>
        <div className="text-center mb-8">
          <Button onClick={handleExplore} disabled={searching} className="px-8 py-3 text-lg">
            {searching ? <Search className="animate-spin mr-2" /> : <Search className="mr-2" />}
            {searching ? 'Searching...' : 'Search for Monsters'}
          </Button>
        </div>
        {encounter && (
          <div className="max-w-md mx-auto">
            <MonsterCard
              monster={encounter}
              onCatch={handleCatch}
              rarity={encounter.rarity}
            />
            <div className="flex space-x-4 mt-4 justify-center">
              <Button onClick={handleCatch}>Catch</Button>
              <Button onClick={handleBattle} variant="destructive">Battle</Button>
              <Button onClick={() => setEncounter(null)} variant="outline">Flee</Button>
            </div>
          </div>
        )}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Your Team</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {gameState.playerTeam.slice(0, 6).map(monster => (
              <Link key={monster.id} to={`/monsters/${monster.id}`}>
                <MonsterCard
                  monster={monster}
                  isPlayerOwned
                  rarity="common" // Derive from data
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;