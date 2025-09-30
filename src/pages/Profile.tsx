import Breadcrumb from '@/components/Breadcrumb';
import useGameState from '@/hooks/useGameState';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';

const Profile = () => {
  const { gameState } = useGameState();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-8">
      <Breadcrumb currentPage="Profile" />
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Trainer Profile
        </h1>
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Monsters Caught: {gameState.caughtMonsters.length}</p>
          <p className="text-xl text-gray-600 mb-8">Team Size: {gameState.playerTeam.length}/6</p>
          <Button onClick={() => navigate({ to: '/monsters' })} className="px-8 py-3 text-lg">
            View Team
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;