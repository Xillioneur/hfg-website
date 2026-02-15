import React from 'react';
import { GameCategory } from '../data/games';
import { useTheme } from '../context/ThemeContext';

const GameBadge: React.FC<{ category: GameCategory }> = ({ category }) => {
  const { theme } = useTheme();
  
  const getStyles = () => {
    switch (category) {
      case 'Tutorial':
        return theme === 'light' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-blue-900/20 text-blue-400 border-blue-800/30';
      case 'Studio':
        return theme === 'light' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-indigo-900/20 text-indigo-400 border-indigo-800/30';
      case 'Tech Demo':
        return theme === 'light' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-emerald-900/20 text-emerald-400 border-emerald-800/30';
      case 'Classic':
        return theme === 'light' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-amber-900/20 text-amber-400 border-amber-800/30';
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
