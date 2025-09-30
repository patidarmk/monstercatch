import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';

const Training = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <Breadcrumb currentPage="Training" parentPath="/" />
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Monster Training
        </h1>
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Train your monsters to level up and evolve them!</p>
          <p className="text-gray-500 mb-8">View your monsters and train individually.</p>
          <Button onClick={() => navigate({ to: '/monsters' })} className="px-8 py-3 text-lg">
            Go to Monsters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Training;