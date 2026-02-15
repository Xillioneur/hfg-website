import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Twitter } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path: string) => {
    const activeBase = location.pathname === path;
    return activeBase 
      ? (theme === 'light' ? 'text-blue-600' : 'text-amber-500 font-black') 
      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors';
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-500 ${theme === 'light' ? 'bg-heaven-bg text-heaven-text' : 'bg-void-bg text-gray-300'}`}>
      
      {/* Dynamic Background */}
      <div className="nebula-bg" />

      <header className="sticky top-0 z-50 h-20 border-b backdrop-blur-xl border-slate-200/50 dark:border-white/5 bg-white/70 dark:bg-black/40">
        <div className="container mx-auto px-8 h-full flex justify-between items-center max-w-7xl">
          
          {/* Logo Brand */}
          <Link to="/" className="flex items-center space-x-4 group outline-none">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white font-black text-xl transition-all group-hover:scale-105 group-hover:rotate-3 shadow-lg ${theme === 'light' ? 'bg-blue-600 shadow-blue-500/20' : 'bg-amber-500 shadow-amber-500/20'}`}>
              H
            </div>
            <div className="flex flex-col leading-none">
              <span className={`font-black tracking-tighter text-xl ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                HOLYFORGE
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-[0.3em] ${theme === 'light' ? 'text-blue-600' : 'text-amber-500'}`}>
                Digital Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.2em]">
            {['Home', 'Games', 'About'].map((item) => {
              const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
              return (
                <Link key={path} to={path} className={`relative py-2 ${isActive(path)}`}>
                   {item}
                </Link>
              )
            })}
            
            <div className="w-px h-6 bg-slate-200 dark:bg-white/10 mx-2"></div>

            <div className="flex items-center gap-4">
                <a href="https://x.com/liwawil" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-current transition-colors">
                    <Twitter size={18} />
                </a>
                <button 
                  onClick={toggleTheme}
                  className={`p-2 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 ${theme === 'light' ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'}`}
                >
                  {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                </button>
            </div>
          </nav>

          <div className="flex items-center space-x-4 md:hidden">
            <button onClick={toggleTheme} className="text-slate-500 p-2 bg-slate-100 dark:bg-white/5 rounded-lg">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button className="text-slate-500" onClick={toggleMenu}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden fixed inset-x-0 top-20 z-40 border-b p-8 space-y-6 shadow-2xl backdrop-blur-2xl ${theme === 'light' ? 'bg-white/95 border-slate-200' : 'bg-zinc-900/95 border-white/10'}`}
          >
            {['Home', 'Games', 'About'].map((item) => (
                <Link 
                    key={item}
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                    className="block text-lg font-black uppercase tracking-widest" 
                    onClick={toggleMenu}
                >
                    {item}
                </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      <main className="flex-grow relative z-0">
        {children}
      </main>

      <footer className={`py-16 border-t transition-colors duration-500 ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-black border-white/5'}`}>
        <div className="container mx-auto px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            <div className="space-y-4">
               <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm ${theme === 'light' ? 'bg-slate-900' : 'bg-amber-500'}`}>H</div>
                    <span className="font-black text-xl tracking-tight dark:text-white">HOLYFORGE</span>
               </div>
               <p className="text-sm text-slate-500 max-w-xs font-medium">Elevating the craft of web gaming through native C++ execution and divine dedication.</p>
            </div>

            <div className="grid grid-cols-2 gap-16">
                <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Navigation</h4>
                    <div className="flex flex-col gap-2 text-sm font-bold text-slate-500 uppercase tracking-widest">
                        <Link to="/" className="hover:text-current">Terminal</Link>
                        <Link to="/games" className="hover:text-current">Archives</Link>
                        <Link to="/about" className="hover:text-current">Mission</Link>
                    </div>
                </div>
                <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Social</h4>
                    <div className="flex flex-col gap-2 text-sm font-bold text-slate-500 uppercase tracking-widest">
                        <a href="https://x.com/liwawil" target="_blank" rel="noreferrer" className="hover:text-current underline decoration-amber-500/30 underline-offset-4">X.com</a>
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-current underline decoration-blue-500/30 underline-offset-4">GitHub</a>
                    </div>
                </div>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-slate-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            <p>© {new Date().getFullYear()} HOLYFORGE GAMES. SOLI DEO GLORIA.</p>
            <div className="flex gap-6">
                <span>By Willie Johnson</span>
                <span className={theme === 'light' ? 'text-blue-600' : 'text-amber-500'}>Version 0.9 (STABLE)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
