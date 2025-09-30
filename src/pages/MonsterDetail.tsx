import { useParams, Link } from '@tanstack/react-router';
import useGameState from '@/hooks/useGameState';
import { monsters } from '@/data/monsters';
import MonsterCard from '@/components/MonsterCard';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Layers, Zap, Award } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const MonsterDetail = () => {
  const { id } = useParams({ from: '/monsters/$id' });
  const { gameState, trainMonster } = useGameState();
  const monsterId = parseInt(id);
  const monster = gameState.caughtMonsters.find(m => m.id === monsterId);
  const baseMonster = monsters.find(m => m.id === monster?.monsterId);
  const { toast } = useToast();

  if (!monster || !baseMonster) return <div>Monster not found</div>;

  const handleTrain = () => {
    trainMonster(monster.id);
    toast({ title: "Training Complete!", description: `${monster.name} grew stronger!` });
  };

  const evolutionInfo = baseMonster.evolution.to ? (
    <div className="bg-yellow-50 p-4 rounded-lg mb-4">
      <h4 className="font-semibold flex items-center"><Award className="mr-2" /> Evolution</h4>
      <p>Can evolve to {monsters.find(m => m.id === baseMonster.evolution.to)?.name} at level {baseMonster.evolution.levelRequired}</p>
      {monster.level >= baseMonster.evolution.levelRequired && !monster.isEvolved && (
        <Button className="mt-2" onClick={handleTrain}>Evolve Now!</Button>
      )}
    </div>
  ) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 py-8">
      <Breadcrumb currentPage={monster.name} parentPath="/monsters" />
      <div className="container mx-auto px-4">
        <MonsterCard monster={monster} isPlayerOwned />
        {evolutionInfo}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-bold mb-2 flex items-center"><Layers className="mr-2" /> Stats</h3>
            <ul className="space-y-1 text-sm">
              <li>Level: {monster.level}</li>
              <li>XP: {monster.experience}/100</li>
              <li>Type: {baseMonster.type}</li>
              <li>Rarity: {baseMonster.rarity}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2 flex items-center"><Zap className="mr-2" /> Moves</h3>
            <ul className="space-y-1 text-sm">
              <li>Tackle (Normal)</li>
              <li>Ember (Fire, if applicable)</li>
            </ul>
          </div>
        </div>
        <Button onClick={handleTrain} className="w-full mb-4">
          Train (+10 XP)
        </Button>
        <Link to="/battles">
          <Button variant="outline" className="w-full">Enter Battle</Button>
        </Link>
      </div>
    </div>
  );
};

export default MonsterDetail;