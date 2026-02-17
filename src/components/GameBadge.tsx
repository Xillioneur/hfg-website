import React from 'react';
import { GameCategory } from '../data/games';
import { useTheme } from '../context/ThemeContext';

const GameBadge: React.FC<{ category: GameCategory }> = ({ category }) => {
  const { theme } = useTheme();
  
  const getStyles = () => {
    switch (category) {
      case 'Tutorial':
        return theme === 'light' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-blue-900/30 text-blue-300 border-blue-500/30';
      case 'Studio':
        return theme === 'light' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-amber-900/30 text-amber-300 border-amber-500/30';
      case 'Tech Demo':
        return theme === 'light' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-purple-900/30 text-purple-300 border-purple-500/30';
      case 'Classic':
        return theme === 'light' ? 'bg-stone-100 text-stone-700 border-stone-200' : 'bg-stone-800 text-stone-300 border-stone-600';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border ${getStyles()}`}>
      {category}
    </span>
  );
};

export default GameBadge;
