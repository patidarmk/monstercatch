import { Link, useLocation } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    { path: '/', label: 'Explore' },
    { path: '/monsters', label: 'Monsters' },
    { path: '/battles', label: 'Battles' },
    { path: '/training', label: 'Training' },
    { path: '/profile', label: 'Profile' },
  ];

  const isActive = (path: string) => {
    return pathname === path || (path === '/monsters' && pathname?.startsWith('/monsters/'));
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-200/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
              Monster Quest
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={cn(
                  "text-gray-700 hover:text-red-600 transition-colors font-medium",
                  isActive(path) && "text-red-600"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-gray-700"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {mobileOpen && (
          <nav className="md:hidden mt-4 space-y-2">
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={cn(
                  "block py-2 text-gray-700 hover:text-red-600",
                  isActive(path) && "text-red-600"
                )}
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;