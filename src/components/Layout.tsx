import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Twitter } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { theme, toggleTheme, lowPerformanceMode, togglePerformanceMode } = useTheme();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path: string) => {
    const activeBase = location.pathname === path;
    if (theme === 'light') {
      return activeBase ? 'text-heaven-accent' : 'text-slate-400 hover:text-heaven-accent';
    }
    return activeBase ? 'text-void-accent font-black' : 'text-slate-500 hover:text-white';
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-500 ${theme === 'light' ? 'bg-heaven-bg text-heaven-text' : 'bg-void-bg text-gray-300'}`}>
      
      {/* Background Layer */}
      <div className="nebula-bg" />

      <header className={`sticky top-0 z-50 h-14 glass-nav ${theme === 'light' ? 'shadow-sm' : 'border-b border-white/5'}`}>
        <div className="container mx-auto px-6 h-full flex justify-between items-center max-w-6xl">
          
          {/* Logo Brand */}
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-base transition-all group-hover:scale-105 shadow-sm ${theme === 'light' ? 'bg-heaven-accent' : 'bg-void-accent'}`}>
              H
            </div>
            <div className="flex flex-col leading-tight">
              <span className={`font-black tracking-tight text-sm ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                HOLYFORGE
              </span>
              <span className={`text-[8px] font-bold uppercase tracking-widest ${theme === 'light' ? 'text-heaven-accent' : 'text-void-accent'}`}>
                Digital Studio
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest">
            {['Home', 'Games', 'About'].map((item) => {
              const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
              return (
                <Link key={path} to={path} className={`transition-colors ${isActive(path)}`}>
                   {item}
                </Link>
              )
            })}
            
            <div className="flex items-center gap-4 border-l border-slate-200 dark:border-white/5 pl-6">
                <a href="https://x.com/liwawil" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-current transition-colors">
                    <Twitter size={14} />
                </a>
                <button 
                  onClick={toggleTheme}
                  className={`p-1.5 rounded-lg transition-all ${theme === 'light' ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                >
                  {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
                </button>
            </div>
          </nav>

          <div className="flex items-center space-x-3 md:hidden">
            <button onClick={toggleTheme} className="text-slate-500">
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button className="text-slate-500" onClick={toggleMenu}>
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`md:hidden fixed inset-x-0 top-14 z-40 p-6 space-y-4 shadow-xl backdrop-blur-xl ${theme === 'light' ? 'bg-white/95 border-b' : 'bg-void-surface/95 border-b border-white/5'}`}
          >
            {['Home', 'Games', 'About'].map((item) => (
                <Link 
                    key={item}
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                    className="block text-sm font-black uppercase tracking-widest" 
                    onClick={toggleMenu}
                >
                    {item}
                </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        {children}
      </main>

      <footer className={`py-10 border-t transition-colors duration-500 ${theme === 'light' ? 'bg-white border-slate-100' : 'bg-black/20 border-white/5'}`}>
        <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
          <p>© {new Date().getFullYear()} HOLYFORGE GAMES. SOLI DEO GLORIA.</p>
          <div className="flex gap-6 items-center">
              <button 
                onClick={togglePerformanceMode}
                className={`px-3 py-1 rounded-md border transition-colors ${lowPerformanceMode ? (theme === 'light' ? 'bg-slate-900 text-white border-slate-900' : 'bg-void-accent text-black border-void-accent') : 'border-slate-200 dark:border-white/10 hover:text-current'}`}
              >
                {lowPerformanceMode ? 'Lite: ON' : 'Lite: OFF'}
              </button>
              <span className={theme === 'light' ? 'text-slate-900' : 'text-white'}>By Willie Johnson</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;