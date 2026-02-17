import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { games } from '../data/games';
import GameCard from '../components/GameCard';
import { ArrowRight, Code, Zap, Globe, Cpu, Terminal } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { useProgress } from '../hooks/useProgress';
import SEO from '../components/SEO';
import GameCardSkeleton from '../components/GameCardSkeleton';

const Home: React.FC = () => {
  const { theme, lowPerformanceMode } = useTheme();
  const { progress } = useProgress();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const proverbs = [
    "Clean code is a form of stewardship.",
    "Optimization is the pursuit of technical holiness.",
    "Let every cycle be purposeful and every byte be pure.",
    "The forge is hot, but the spirit is disciplined.",
    "Created in His image, we create with His excellence."
  ];
  const dailyProverb = useMemo(() => proverbs[Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % proverbs.length], []);

  const recentlyPlayedGames = games.filter(g => progress.recentlyPlayed.includes(g.id));

  const motionProps = lowPerformanceMode ? { initial: { opacity: 1 }, animate: { opacity: 1 } } : { initial: { opacity: 0 }, animate: { opacity: 1 } };

  return (
    <>
      <SEO 
        title="HolyForge Games | Elite C++ & WebAssembly Native Gaming Hub"
        description="Experience elite C++ and C games running natively in your browser with zero latency. Powered by WebAssembly and the HolyForge Engine. Crafted for Glory and Performance."
      />
      <div className="pb-24">
        {/* Compact Hero Section */}
        <section className="relative min-h-[50vh] pt-8 pb-12 flex items-center justify-center overflow-hidden">
          <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
            <motion.div 
              {...motionProps}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="flex justify-center">
                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${theme === 'light' ? 'bg-blue-50 text-blue-600' : 'bg-white/5 text-void-accent'}`}>
                  V1.0 Stable Build
                </span>
              </div>
              
              <h1 className={`text-5xl md:text-7xl font-black tracking-tight leading-[0.95] ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                Built for <span className="text-gold">Speed.</span><br/>
                Forged in Code.
              </h1>
              
              <p className={`text-base md:text-lg max-w-lg mx-auto leading-relaxed font-medium transition-colors ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                High-performance C++ games running natively in your browser. <br className="hidden md:block"/>
                Zero latency. Zero install. Pure craftsmanship.
              </p>

              <div className="flex items-center justify-center gap-4 pt-4">
                <Link to="/games" className={`px-8 py-3 text-xs font-black uppercase tracking-widest rounded-full shadow-lg transition-all hover:-translate-y-0.5 ${theme === 'light' ? 'bg-slate-900 text-white shadow-blue-900/10' : 'bg-void-accent text-black shadow-void-accent/10'}`}>
                  Execute Library
                </Link>
                <Link to="/about" className={`px-8 py-3 text-xs font-black uppercase tracking-widest rounded-full transition-all ${theme === 'light' ? 'bg-white text-slate-600 hover:bg-slate-50' : 'bg-transparent text-slate-400 hover:text-white'}`}>
                  Mission
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Recently Played */}
        {recentlyPlayedGames.length > 0 && (
          <section className="container mx-auto px-6 pt-12 max-w-6xl">
            <div className="flex items-center gap-2 mb-8 opacity-40">
              <div className={`w-1 h-4 rounded-full ${theme === 'light' ? 'bg-slate-900' : 'bg-void-accent'}`} />
              <h2 className={`text-[10px] font-black uppercase tracking-[0.2em] ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Recent Activity</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentlyPlayedGames.map(game => (
                <div key={game.id} className="scale-95 origin-left">
                  <GameCard game={game} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Featured Games */}
        <section className="container mx-auto px-6 py-12 max-w-6xl">
          <div className="flex justify-between items-end mb-8">
            <div className="space-y-1">
              <h2 className={`text-xl font-black uppercase tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Latest Releases</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Optimized for production</p>
            </div>
            <Link to="/games" className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1 transition-colors ${theme === 'light' ? 'text-heaven-accent' : 'text-void-accent'}`}>
              Full Archives <ArrowRight size={12} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {!isReady ? Array(3).fill(0).map((_, i) => <GameCardSkeleton key={i} />) : 
              games.slice(0, 3).map((game, idx) => (
                <motion.div key={game.id} {...(lowPerformanceMode ? {} : { initial: { opacity: 0, scale: 0.98 }, whileInView: { opacity: 1, scale: 1 }, transition: { delay: idx * 0.05 } })}>
                  <GameCard game={game} />
                </motion.div>
              ))}
          </div>
        </section>

        {/* Proverb - Clean */}
        <section className="container mx-auto px-6 py-12 max-w-4xl text-center">
            <p className={`text-xs font-bold uppercase tracking-[0.3em] italic opacity-30 ${theme === 'light' ? 'text-slate-900' : 'text-amber-500'}`}>
                "{dailyProverb}"
            </p>
        </section>

        {/* Patch Notes - Solid */}
        <section className="container mx-auto px-6 py-12 max-w-6xl">
          <div className={`rounded-[32px] p-10 flex flex-col md:flex-row gap-12 items-center transition-colors ${theme === 'light' ? 'bg-white shadow-xl shadow-slate-200/40' : 'bg-void-surface shadow-2xl shadow-black/50'}`}>
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 text-heaven-accent dark:text-void-accent">
                <Terminal size={16} />
                <span className="text-[9px] font-black uppercase tracking-[0.2em]">Build Stream // v1.3.5</span>
              </div>
              <h3 className={`text-2xl font-black tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Optimized WASM throughput.</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                Optimized bridge protocols between game logic and the UI layer. 
                Logging throttled to animation frames, reducing idle overhead.
              </p>
            </div>
            <div className={`p-6 rounded-2xl ${theme === 'light' ? 'bg-slate-50' : 'bg-black/20'}`}>
              <Cpu size={48} className="opacity-20" />
            </div>
          </div>
        </section>

        {/* Optimized Features */}
        <section className="container mx-auto px-6 py-20 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
            {[
              { icon: Globe, title: "Edge Architecture", desc: "Low-latency delivery via Cloudflare's global network." },
              { icon: Zap, title: "High-Tech Execution", desc: "Multithreaded C++ binaries running in an isolated sandbox." },
              { icon: Code, title: "Open Stewardship", desc: "Transparent source code for all published modules." }
            ].map((feat, i) => (
              <div key={i} className="space-y-4 group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform mx-auto md:mx-0 group-hover:scale-110 ${theme === 'light' ? 'bg-slate-100 text-slate-600' : 'bg-white/5 text-void-accent'}`}>
                  <feat.icon size={18} />
                </div>
                <h3 className={`text-[11px] font-black uppercase tracking-[0.2em] ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>{feat.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;