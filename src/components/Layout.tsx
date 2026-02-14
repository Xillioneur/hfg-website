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
      return activeBase ? 'text-heaven-accent font-bold' : 'text-slate-500 hover:text-heaven-accent';
    }
    return activeBase ? 'text-void-accent font-bold' : 'text-slate-400 hover:text-void-accent';
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${theme === 'light' ? 'bg-heaven-bg text-heaven-text' : 'bg-void-bg text-void-text'}`}>
      
      <header className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors duration-300 ${theme === 'light' ? 'bg-white/80 border-heaven-border' : 'bg-void-bg/80 border-void-border'}`}>
        <div className="container mx-auto px-4 h-14 flex justify-between items-center">
          
          <Link to="/" className="flex items-center space-x-2 group">
            <div className={`w-8 h-8 rounded flex items-center justify-center text-white font-bold transition-all shadow-sm ${theme === 'light' ? 'bg-heaven-accent' : 'bg-void-accent'}`}>
              H
            </div>
            <span className={`font-bold tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
              HolyForge <span className={theme === 'light' ? 'text-heaven-accent' : 'text-void-accent'}>Games</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/games" className={isActive('/games')}>Games</Link>
            <Link to="/about" className={isActive('/about')}>About</Link>
            
            <button 
              onClick={toggleTheme}
              className={`p-1.5 rounded-md transition-colors ${theme === 'light' ? 'hover:bg-slate-100 text-slate-500' : 'hover:bg-slate-800 text-slate-400'}`}
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          </nav>

          <div className="flex items-center gap-4 md:hidden">
            <button onClick={toggleTheme} className="text-slate-500">
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button className="text-slate-500" onClick={toggleMenu}>
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
            className={`md:hidden fixed inset-x-0 top-14 z-40 border-b p-4 space-y-3 shadow-lg ${theme === 'light' ? 'bg-white border-heaven-border' : 'bg-void-primary border-void-border'}`}
          >
            <Link to="/" className="block py-2 text-sm font-medium" onClick={toggleMenu}>Home</Link>
            <Link to="/games" className="block py-2 text-sm font-medium" onClick={toggleMenu}>Games</Link>
            <Link to="/about" className="block py-2 text-sm font-medium" onClick={toggleMenu}>About</Link>
          </motion.nav>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        {children}
      </main>

      <footer className={`py-6 border-t transition-colors ${theme === 'light' ? 'bg-slate-50 border-heaven-border text-slate-500' : 'bg-void-primary border-void-border text-slate-400'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center text-[11px] font-medium tracking-wide">
          <p>© {new Date().getFullYear()} HOLYFORGE GAMES. SOLI DEO GLORIA.</p>
          <div className="flex gap-4">
            <Link to="/games" className="hover:underline">GAMES</Link>
            <Link to="/about" className="hover:underline">ABOUT</Link>
            <span className="opacity-30">|</span>
            <span className="uppercase">{theme} MODE</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;