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

      <footer className={`py-12 border-t transition-colors duration-500 ${theme === 'light' ? 'bg-white border-slate-100' : 'bg-black/20 border-white/5'}`}>
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className={`w-7 h-7 rounded flex items-center justify-center text-white font-black text-xs ${theme === 'light' ? 'bg-slate-900' : 'bg-void-accent text-black'}`}>H</div>
                <span className="font-black tracking-tight text-lg">HOLYFORGE</span>
              </div>
              <p className="text-[11px] leading-relaxed font-medium uppercase tracking-wide text-slate-500">
                Crafted for Glory. <br/>Engineered for Eternity.
              </p>
            </div>

            {/* Newsletter Column */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Join the Forge</h4>
              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  const input = e.currentTarget.elements.namedItem('email') as HTMLInputElement;
                  const res = await fetch('/api/newsletter', {
                    method: 'POST',
                    body: JSON.stringify({ email: input.value }),
                    headers: { 'Content-Type': 'application/json' }
                  });
                  if (res.ok) {
                    alert("Welcome to the Forge.");
                    input.value = '';
                  }
                }}
                className="flex flex-col gap-2"
              >
                <input 
                  name="email"
                  type="email" 
                  placeholder="Your Email" 
                  className={`px-3 py-2.5 rounded-xl text-[10px] border transition-all outline-none ${theme === 'light' ? 'bg-slate-50 border-slate-200 focus:border-heaven-accent' : 'bg-white/5 border-white/5 focus:border-void-accent'}`}
                  required 
                />
                <button type="submit" className={`py-2.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all ${theme === 'light' ? 'bg-slate-900 text-white hover:bg-heaven-accent' : 'bg-void-accent text-black hover:bg-white'}`}>
                  Initialize Sync
                </button>
              </form>
            </div>

            {/* Connect Column */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Connect</h4>
              <div className="flex flex-col gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                <a href="https://x.com/liwawil" target="_blank" rel="noreferrer" className="hover:text-current transition-colors">X.com</a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-current transition-colors">GitHub</a>
                <Link to="/about" className="hover:text-current transition-colors">Mission Control</Link>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
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
        </div>
      </footer>
    </div>
  );
};

export default Layout;
