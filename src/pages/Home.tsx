import React from 'react';
import { Link } from 'react-router-dom';
import { games } from '../data/games';
import GameCard from '../components/GameCard';
import { ArrowRight, Code, Zap, Globe, Cpu, Terminal } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="pb-24">
      {/* Hero Section - GPU Optimized */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden border-b border-slate-100 dark:border-void-border">
        <div className="container mx-auto px-6 relative z-10 text-center max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="flex justify-center">
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border backdrop-blur-md transition-all ${theme === 'light' ? 'bg-white/50 border-blue-100 text-blue-600 shadow-sm' : 'bg-white/5 border-white/10 text-void-accent shadow-lg shadow-void-accent/5'}`}
              >
                Engineered for Performance
              </motion.span>
            </div>
            
            <h1 className={`text-6xl md:text-8xl font-black tracking-tighter leading-[0.95] ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
              Built for <span className={theme === 'light' ? 'text-blue-600' : 'text-void-accent'}>Speed.</span><br/>
              Crafted for Glory.
            </h1>
            
            <p className={`text-lg md:text-xl max-w-xl mx-auto leading-relaxed font-medium transition-colors ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
              Experience native C++ execution directly in your browser. <br className="hidden md:block"/>
              Powered by WebAssembly and Cloudflare Edge.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
              <Link to="/games" className={`group relative px-10 py-4 text-sm font-black uppercase tracking-widest rounded-full shadow-2xl transition-all hover:scale-105 overflow-hidden ${theme === 'light' ? 'bg-slate-900 text-white' : 'bg-void-accent text-white'}`}>
                <span className="relative z-10 flex items-center gap-2 text-glow">Execute Games <ArrowRight size={16} /></span>
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${theme === 'light' ? 'bg-blue-600' : 'bg-red-600'}`}></div>
              </Link>
              <Link to="/about" className={`px-10 py-4 text-sm font-black uppercase tracking-widest rounded-full border-2 transition-all ${theme === 'light' ? 'border-slate-200 text-slate-600 hover:border-slate-900 hover:text-slate-900' : 'border-zinc-800 text-zinc-400 hover:border-white hover:text-white'}`}>
                Our Mission
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Games - Lazy Animation */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <h2 className={`text-4xl font-black tracking-tighter ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Active Forge</h2>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Latest Stable Builds</p>
          </div>
          <Link to="/games" className={`text-sm font-black uppercase tracking-widest flex items-center gap-2 transition-colors ${theme === 'light' ? 'text-blue-600 hover:text-blue-800' : 'text-void-accent hover:text-red-500'}`}>
            Full Library <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {games.slice(0, 3).map((game, idx) => (
            <motion.div 
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
            >
              <GameCard game={game} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Dev Log / Patch Notes - High Contrast */}
      <section className="container mx-auto px-6 py-10">
        <div className={`rounded-3xl p-8 md:p-12 border flex flex-col md:flex-row gap-12 items-center transition-colors ${theme === 'light' ? 'bg-white border-slate-100 shadow-xl' : 'bg-void-primary/40 border-void-border shadow-2xl'}`}>
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-2 text-blue-500 dark:text-void-accent">
              <Terminal size={20} />
              <span className="text-xs font-black uppercase tracking-[0.2em]">Patch Notes // v1.3.5</span>
            </div>
            <h3 className={`text-3xl font-black tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Optimized WASM throughput.</h3>
            <p className="text-slate-500 leading-relaxed font-medium">
              We have optimized the message bridge between the game runner and the main UI. 
              The logging system now uses a high-frequency buffer, reducing main-thread load by up to 80% during heavy execution.
            </p>
            <div className="flex gap-6">
               <div className="text-[10px] font-black uppercase tracking-widest"><span className="text-gray-400">UI Thread:</span> <span className="text-green-500">Smooth</span></div>
               <div className="text-[10px] font-black uppercase tracking-widest"><span className="text-gray-400">Binary Load:</span> <span className="text-green-500">-40% Latency</span></div>
            </div>
          </div>
          <div className="w-full md:w-1/3 flex justify-center">
            <div className={`p-8 rounded-2xl border transition-colors ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-black border-white/5'}`}>
              <Cpu size={64} className={theme === 'light' ? 'text-slate-300' : 'text-zinc-800'} />
            </div>
          </div>
        </div>
      </section>

      {/* Optimized Features Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
          {[
            { icon: Globe, title: "Edge Architecture", desc: "Low-latency delivery via Cloudflare's global network." },
            { icon: Zap, title: "High-Tech Execution", desc: "Multithreaded C++ binaries running in an isolated sandbox." },
            { icon: Code, title: "Open Stewardship", desc: "Transparent source code for all published modules." }
          ].map((feat, i) => (
            <div key={i} className="space-y-4 group">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform mx-auto md:mx-0 group-hover:scale-110 ${theme === 'light' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-white/5 text-void-accent border border-white/5'}`}>
                <feat.icon size={20} />
              </div>
              <h3 className={`text-sm font-black uppercase tracking-[0.2em] ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>{feat.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
