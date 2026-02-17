import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  lowPerformanceMode: boolean;
  toggleTheme: () => void;
  togglePerformanceMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('hfg-theme');
    return (saved as Theme) || 'dark';
  });

  const [lowPerformanceMode, setLowPerformanceMode] = useState<boolean>(() => {
    return localStorage.getItem('hfg-low-perf') === 'true';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('hfg-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('hfg-low-perf', lowPerformanceMode.toString());
  }, [lowPerformanceMode]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const togglePerformanceMode = () => {
    setLowPerformanceMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ theme, lowPerformanceMode, toggleTheme, togglePerformanceMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};