import React from 'react';
import { games } from '../data/games';
import GameCard from '../components/GameCard';
import { Search } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const Games: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const { theme } = useTheme();

  const filteredGames = games.filter(game => 
    game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div className="space-y-1">
          <h1 className={`text-3xl font-black tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
            {theme === 'light' ? 'The Library' : 'The Archives'}
          </h1>
          <p className="text-sm text-gray-500">
            {filteredGames.length} titles available for instant execution.
          </p>
        </div>
        
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className={`block w-full pl-9 pr-3 py-2 text-sm border rounded-full leading-5 transition-all focus:outline-none focus:ring-2 sm:text-sm ${
              theme === 'light' 
                ? 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-heaven-accent/20 focus:border-heaven-accent' 
                : 'bg-zinc-900 border-zinc-800 text-zinc-300 placeholder-zinc-500 focus:ring-void-accent/20 focus:border-void-accent'
            }`}
            placeholder="Search catalog..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGames.map((game, idx) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
            >
              <GameCard game={game} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className={`text-center py-20 rounded-2xl border transition-colors ${theme === 'light' ? 'bg-slate-50 border-slate-100' : 'bg-zinc-900/50 border-zinc-800'}`}>
          <p className="text-sm text-gray-500">No results found for "{searchTerm}".</p>
          <button 
            onClick={() => setSearchTerm('')}
            className={`mt-4 text-xs font-bold uppercase tracking-widest underline ${theme === 'light' ? 'text-heaven-accent' : 'text-void-accent'}`}
          >
            Reset Search
          </button>
        </div>
      )}
    </div>
  );
};

export default Games;
