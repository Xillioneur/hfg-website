import React from 'react';
import { Link } from 'react-router-dom';
import { Game } from '../data/games';
import { Play, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const { theme } = useTheme();

  return (
    <Link to={`/games/${game.id}`} className={`group block relative overflow-hidden rounded-2xl transition-all duration-500 border-glow ${theme === 'light' ? 'bg-white' : 'bg-void-primary'}`}>
      <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-900 relative">
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className={`absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${theme === 'light' ? 'bg-blue-600/10' : 'bg-void-accent/5'}`}></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-95 group-hover:scale-100">
            <span className={`w-12 h-12 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-md ${theme === 'light' ? 'bg-white/90 text-blue-600' : 'bg-void-accent/90 text-white'}`}>
                <Play size={20} fill="currentColor" className="ml-1" />
            </span>
        </div>
      </div>
      <div className="p-6 space-y-3">
        <div className="flex justify-between items-center">
            <h3 className={`text-xl font-black tracking-tight transition-colors ${theme === 'light' ? 'text-slate-900 group-hover:text-blue-600' : 'text-white group-hover:text-void-accent'}`}>{game.title}</h3>
            <span className={`text-[9px] font-black uppercase tracking-[0.15em] px-2 py-1 rounded-md border transition-colors ${theme === 'light' ? 'bg-slate-50 text-slate-500 border-slate-100' : 'bg-slate-800 text-slate-400 border-white/5'}`}>{game.language}</span>
        </div>
        <p className={`text-sm line-clamp-2 leading-relaxed font-medium transition-colors ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
          {game.description}
        </p>
        <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest transition-opacity opacity-0 group-hover:opacity-100 ${theme === 'light' ? 'text-blue-600' : 'text-void-accent'}`}>
            Initialize Binary <ChevronRight size={12} />
        </div>
      </div>
    </Link>
  );
};

export default GameCard;