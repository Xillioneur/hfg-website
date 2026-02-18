import React, { useState, useMemo, useEffect, useTransition, useDeferredValue } from 'react';
import { games, GameCategory } from '../data/games';
import GameCard from '../components/GameCard';
import { Search, Filter, Box } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import SEO from '../components/SEO';
import GameCardSkeleton from '../components/GameCardSkeleton';

const Games: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GameCategory | 'All'>('All');
  const [isReady, setIsReady] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { theme } = useTheme();

  const deferredSearch = useDeferredValue(searchTerm);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const categories: (GameCategory | 'All')[] = ['All', 'Tutorial', 'Studio', 'Tech Demo', 'Classic'];

  const handleCategoryChange = (cat: GameCategory | 'All') => {
    startTransition(() => {
      setSelectedCategory(cat);
    });
  };

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(deferredSearch.toLowerCase()) ||
                           game.description.toLowerCase().includes(deferredSearch.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [deferredSearch, selectedCategory]);

  return (
    <>
      <SEO 
        title="Game Archives | HolyForge Games"
        description="Browse the complete catalog of high-performance C++ games and tutorials from HolyForge Games."
      />
      <div className="container mx-auto px-8 py-20 max-w-7xl">
        
        {/* Authoritative Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="space-y-4">
            <div className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] ${theme === 'light' ? 'text-blue-600' : 'text-amber-500'}`}>
                <Box size={16} /> Data Repository
            </div>
            <h1 className={`text-5xl md:text-7xl font-black tracking-tighter leading-none ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
              The Archives
            </h1>
            <p className="text-lg text-slate-500 font-medium max-w-lg leading-relaxed">
              Exploring the boundaries of native execution. {filteredGames.length} modules currently deployed to the edge.
            </p>
          </div>
          
          <div className="flex flex-col gap-6 w-full md:w-auto">
            <div className="relative w-full md:w-96 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-current transition-colors">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                className={`block w-full pl-12 pr-4 py-4 text-sm border-2 rounded-2xl leading-5 transition-all focus:outline-none focus:ring-4 ${
                  theme === 'light' 
                    ? 'bg-white border-slate-100 text-slate-900 placeholder-slate-400 focus:ring-blue-500/10 focus:border-blue-500' 
                    : 'bg-zinc-900 border-white/5 text-zinc-300 placeholder-zinc-500 focus:ring-amber-500/10 focus:border-amber-500'
                }`}
                placeholder="Query binary name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all border-2 ${
                    selectedCategory === cat
                      ? theme === 'light' ? 'bg-slate-900 text-white border-slate-900' : 'bg-amber-500 text-black border-amber-500'
                      : theme === 'light' ? 'bg-white text-slate-400 border-slate-100 hover:border-slate-300' : 'bg-transparent text-slate-500 border-white/5 hover:border-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={`min-h-[400px] transition-opacity duration-200 ${isPending ? 'opacity-50' : 'opacity-100'}`}>
          {!isReady ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {Array(6).fill(0).map((_, i) => <GameCardSkeleton key={i} />)}
            </div>
          ) : filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredGames.map((game) => (
                <div key={game.id}>
                  <GameCard game={game} />
                </div>
              ))}
            </div>
          ) : (
            <div className={`text-center py-32 rounded-[40px] border-2 border-dashed transition-colors ${theme === 'light' ? 'bg-stone-50 border-stone-200' : 'bg-zinc-900/50 border-white/5'}`}>
              <Filter className="mx-auto mb-6 text-slate-300 dark:text-zinc-700" size={64} />
              <h3 className="text-xl font-black uppercase tracking-widest text-slate-500">Binary Not Found</h3>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                className={`mt-8 text-[11px] font-black uppercase tracking-[0.3em] underline underline-offset-8 ${theme === 'light' ? 'text-blue-600' : 'text-amber-500'}`}
              >
                Reset System Query
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Games;
