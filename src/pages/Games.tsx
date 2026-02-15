import React, { useState, useMemo } from 'react';
import { games, GameCategory } from '../data/games';
import GameCard from '../components/GameCard';
import { Search, Filter } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';

const Games: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GameCategory | 'All'>('All');
  const { theme } = useTheme();

  const categories: (GameCategory | 'All')[] = ['All', 'Tutorial', 'Studio', 'Tech Demo', 'Classic'];

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           game.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <>
      <SEO 
        title="Game Archives | HolyForge Games"
        description="Browse the complete catalog of high-performance C++ games and tutorials from HolyForge Games."
      />
      <div className="container mx-auto px-6 py-12 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div className="space-y-1">
          <h1 className={`text-3xl font-black tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
            {theme === 'light' ? 'The Library' : 'The Archives'}
          </h1>
          <p className="text-sm text-gray-500 font-medium tracking-tight">
            {filteredGames.length} modules available for execution.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-grow min-w-[240px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className={`block w-full pl-9 pr-3 py-2 text-sm border rounded-full leading-5 transition-all focus:outline-none focus:ring-2 sm:text-sm ${
                theme === 'light' 
                  ? 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-blue-500/20 focus:border-blue-500' 
                  : 'bg-zinc-900 border-zinc-800 text-zinc-300 placeholder-zinc-500 focus:ring-void-accent/20 focus:border-void-accent'
              }`}
              placeholder="Search catalog..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
                  selectedCategory === cat
                    ? theme === 'light' ? 'bg-slate-900 text-white border-slate-900' : 'bg-void-accent text-white border-void-accent'
                    : theme === 'light' ? 'bg-white text-slate-500 border-slate-200 hover:border-slate-400' : 'bg-transparent text-slate-500 border-zinc-800 hover:border-zinc-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="min-h-[400px]">
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence mode='popLayout'>
              {filteredGames.map((game) => (
                <motion.div
                  layout
                  key={game.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <GameCard game={game} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center py-24 rounded-3xl border transition-colors ${theme === 'light' ? 'bg-slate-50 border-slate-100' : 'bg-zinc-900/50 border-zinc-800'}`}
          >
            <Filter className="mx-auto mb-4 text-slate-300 dark:text-zinc-700" size={48} />
            <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">No matching modules found</p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
              className={`mt-6 text-[10px] font-black uppercase tracking-widest underline ${theme === 'light' ? 'text-blue-600' : 'text-void-accent'}`}
            >
              Reset All Filters
            </button>
          </motion.div>
        )}
      </div>
          </div>
        </>
      );
    };
export default Games;