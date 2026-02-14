import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path: string) => {
    const activeBase = location.pathname === path;
    if (theme === 'light') {
      return activeBase ? 'text-heaven-accent font-black' : 'text-slate-500 hover:text-heaven-accent';
    }
    return activeBase ? 'text-void-accent font-black' : 'text-slate-400 hover:text-void-accent';
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-500 ${theme === 'light' ? 'bg-heaven-bg text-heaven-text' : 'bg-void-bg text-gray-300'}`}>
      
      {/* Zero-CPU Static Background */}
      <div className="nebula-bg" />

      <header className="sticky top-0 z-50 h-16 glass-nav shadow-sm">
        <div className="container mx-auto px-6 h-full flex justify-between items-center">
          
          <Link to="/" className="flex items-center space-x-3 group">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-white font-black text-lg transition-transform group-hover:scale-105 ${theme === 'light' ? 'bg-heaven-accent shadow-blue-500/20' : 'bg-void-accent shadow-red-500/20'}`}>
              H
            </div>
            <div className="flex flex-col leading-none">
              <span className={`font-black tracking-tighter text-base ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                HOLYFORGE
              </span>
              <span className={`text-[9px] font-black uppercase tracking-widest ${theme === 'light' ? 'text-blue-600' : 'text-void-accent'}`}>
                Interactive
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em]">
            {['Home', 'Games', 'About'].map((item) => {
              const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
              return (
                <Link key={path} to={path} className={`transition-colors ${isActive(path)}`}>
                   {item}
                </Link>
              )
            })}
            
            <div className="w-px h-4 bg-gray-200 dark:bg-white/10 mx-2"></div>

            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 active:scale-95 ${theme === 'light' ? 'text-slate-600 hover:bg-slate-100' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          </nav>

          <div className="flex items-center space-x-4 md:hidden">
            <button onClick={toggleTheme} className={theme === 'light' ? 'text-slate-600' : 'text-slate-400'}>
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button className={theme === 'light' ? 'text-slate-900' : 'text-white'} onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
            className={`md:hidden fixed inset-x-0 top-16 z-40 border-b p-6 space-y-4 shadow-xl backdrop-blur-2xl ${theme === 'light' ? 'bg-white/95 border-slate-200' : 'bg-void-primary/95 border-void-border'}`}
          >
            <Link to="/" className="block text-sm font-black uppercase tracking-widest" onClick={toggleMenu}>Home</Link>
            <Link to="/games" className="block text-sm font-black uppercase tracking-widest" onClick={toggleMenu}>Games</Link>
            <Link to="/about" className="block text-sm font-black uppercase tracking-widest" onClick={toggleMenu}>About</Link>
          </motion.nav>
        )}
      </AnimatePresence>

      <main className="flex-grow relative z-0">
        {children}
      </main>

      <footer className={`py-10 border-t transition-colors duration-500 ${theme === 'light' ? 'bg-slate-50/50 border-slate-200' : 'bg-void-bg border-void-border'}`}>
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
          <p>© {new Date().getFullYear()} HOLYFORGE GAMES. SOLI DEO GLORIA.</p>
          <div className="flex gap-6">
            <Link to="/games" className="hover:text-current transition-colors">GAMES</Link>
            <Link to="/about" className="hover:text-current transition-colors">ABOUT</Link>
            <span className="opacity-20">|</span>
            <span className={theme === 'light' ? 'text-blue-600' : 'text-void-accent'}>{theme} EDITION</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;