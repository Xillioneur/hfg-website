import { useState, useEffect } from 'react';

interface UserProgress {
  recentlyPlayed: string[];
  favorites: string[];
}

export const useProgress = () => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('hfg-progress');
    return saved ? JSON.parse(saved) : { recentlyPlayed: [], favorites: [] };
  });

  useEffect(() => {
    localStorage.setItem('hfg-progress', JSON.stringify(progress));
  }, [progress]);

  const recordPlay = (gameId: string) => {
    setProgress(prev => ({
      ...prev,
      recentlyPlayed: [gameId, ...prev.recentlyPlayed.filter(id => id !== gameId)].slice(0, 4)
    }));
  };

  const toggleFavorite = (gameId: string) => {
    setProgress(prev => ({
      ...prev,
      favorites: prev.favorites.includes(gameId)
        ? prev.favorites.filter(id => id !== gameId)
        : [...prev.favorites, gameId]
    }));
  };

  return { progress, recordPlay, toggleFavorite };
};
