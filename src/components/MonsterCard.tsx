import { Monster, PlayerMonster } from '@/types/game';
import { Heart, Zap, Shield, Rabbit, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface MonsterCardProps {
  monster: Monster | PlayerMonster;
  onCatch?: () => void;
  onTrain?: () => void;
  isPlayerOwned?: boolean;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
}

const MonsterCard = ({ monster, onCatch, onTrain, isPlayerOwned = false, rarity = 'common' }: MonsterCardProps) => {
  const stats = 'baseStats' in monster ? monster.baseStats : {
    hp: monster.maxHp,
    attack: monster.attack,
    defense: monster.defense,
    speed: monster.speed,
  };
  const displayName = (monster as any).nickname || (monster as any).name;
  const displayImage = (monster as any).image;

  const rarityColor = {
    common: 'bg-green-100 text-green-800',
    rare: 'bg-blue-100 text-blue-800',
    epic: 'bg-purple-100 text-purple-800',
    legendary: 'bg-yellow-100 text-yellow-800',
  } as const;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-start space-x-4">
        <img
          src={displayImage}
          alt={displayName}
          className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-900">{displayName}</h3>
            <Badge className={cn(rarityColor[rarity])}>
              <Star size={12} className="mr-1" />
              {rarity.toUpperCase()}
            </Badge>
          </div>
          <p className="text-gray-600 mb-4 text-sm">
            {'description' in monster ? (monster as Monster).description : 'Your loyal companion.'}
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm mb-4">
            <div className="flex items-center">
              <Heart size={16} className="mr-2 text-red-500" />
              HP: {stats.hp}
            </div>
            <div className="flex items-center">
              <Zap size={16} className="mr-2 text-yellow-500" />
              ATK: {stats.attack}
            </div>
            <div className="flex items-center">
              <Shield size={16} className="mr-2 text-blue-500" />
              DEF: {stats.defense}
            </div>
            <div className="flex items-center">
              <Rabbit size={16} className="mr-2 text-green-500" />
              SPD: {stats.speed}
            </div>
          </div>
          {isPlayerOwned && onTrain && (
            <div className="space-x-2">
              <Button size="sm" onClick={onTrain} variant="outline">
                Train
              </Button>
            </div>
          )}
          {!isPlayerOwned && onCatch && (
            <Button onClick={onCatch} className="w-full">
              Catch!
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonsterCard;