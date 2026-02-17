import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Game } from '../data/games';
import { Play, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

import GameBadge from './GameBadge';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = memo(({ game }) => {
  const { theme } = useTheme();

  return (
    <Link 
      to={`/games/${game.id}`} 
      className={`group block relative solid-card will-change-transform`}
    >
      <div className="aspect-[16/10] w-full overflow-hidden rounded-t-2xl bg-slate-100 dark:bg-slate-900 relative">
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          loading="lazy"
          decoding="async"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://placehold.co/600x400/020617/f59e0b?text=Artifact+Missing';
          }}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 z-20">
            <GameBadge category={game.category} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-95 group-hover:scale-100 bg-black/10 backdrop-blur-[2px]">
            <span className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${theme === 'light' ? 'bg-white text-heaven-accent' : 'bg-void-accent text-black'}`}>
                <Play size={16} fill="currentColor" className="ml-0.5" />
            </span>
        </div>
      </div>
      <div className="p-5 space-y-2">
        <div className="flex justify-between items-start">
            <h3 className={`text-base font-black tracking-tight transition-colors ${theme === 'light' ? 'text-slate-900 group-hover:text-heaven-accent' : 'text-white group-hover:text-void-accent'}`}>{game.title}</h3>
            <span className={`text-[8px] font-bold uppercase tracking-widest text-slate-400`}>{game.language}</span>
        </div>
        <p className={`text-xs line-clamp-2 leading-relaxed font-medium transition-colors ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
          {game.description}
        </p>
        <div className={`flex items-center gap-1 text-[9px] font-black uppercase tracking-widest transition-all ${theme === 'light' ? 'text-heaven-accent opacity-0 group-hover:opacity-100' : 'text-void-accent opacity-0 group-hover:opacity-100'}`}>
            Enter Binary <ChevronRight size={10} />
        </div>
      </div>
    </Link>
  );
});

export default GameCard;
