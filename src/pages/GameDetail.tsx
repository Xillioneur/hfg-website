import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { games } from '../data/games';
import WasmPlayer from '../components/WasmPlayer';
import { ArrowLeft, Code, Play } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const GameDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const game = games.find(g => g.id === id);
  const [activeTab, setActiveTab] = useState<'play' | 'code'>('play');
  const { theme } = useTheme();

  if (!game) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-black mb-4">Game Not Found</h1>
        <Link to="/games" className={`font-bold flex items-center justify-center gap-2 ${theme === 'light' ? 'text-heaven-accent' : 'text-void-accent'}`}>
          <ArrowLeft size={20} /> Return to Library
        </Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-6 py-10 max-w-6xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column - Main Player */}
        <div className="lg:col-span-8 space-y-6">
          <div className={`rounded-lg overflow-hidden border shadow-sm relative transition-colors ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-void-primary border-void-border'}`}>
            <div className={`flex items-center justify-between px-4 h-12 border-b transition-colors ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-void-border'}`}>
              <div className="flex space-x-2 h-full">
                <button 
                  onClick={() => setActiveTab('play')}
                  className={`px-4 text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all border-b-2 ${
                    activeTab === 'play' 
                      ? theme === 'light' ? 'text-heaven-accent border-heaven-accent' : 'text-void-accent border-void-accent'
                      : 'text-slate-400 border-transparent hover:text-slate-600'
                  }`}
                >
                  <Play size={14} fill={activeTab === 'play' ? "currentColor" : "none"} /> Play
                </button>
                <button 
                  onClick={() => setActiveTab('code')}
                  className={`px-4 text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all border-b-2 ${
                    activeTab === 'code' 
                      ? 'text-blue-500 border-blue-500' 
                      : 'text-slate-400 border-transparent hover:text-slate-600'
                  }`}
                >
                  <Code size={14} /> Source
                </button>
              </div>
              <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">
                 {game.id}.wasm
              </div>
            </div>

            <div className={theme === 'light' ? 'bg-slate-100' : 'bg-black'}>
              {activeTab === 'play' ? (
                <WasmPlayer gameId={game.id} />
              ) : (
                <div className={`h-[450px] overflow-y-auto custom-scrollbar ${theme === 'light' ? 'bg-white' : 'bg-[#1e1e1e]'}`}>
                  <SyntaxHighlighter 
                    language="cpp" 
                    style={theme === 'light' ? prism : vscDarkPlus} 
                    showLineNumbers={true}
                    customStyle={{ margin: 0, padding: '1.5rem', fontSize: '13px', lineHeight: '1.5', background: 'transparent' }}
                  >
                    {game.sourceCode}
                  </SyntaxHighlighter>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
             <div className={`px-5 py-4 rounded-lg border flex-1 ${theme === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-void-primary border-void-border'}`}>
                <span className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Target Platform</span>
                <span className="font-bold text-sm">WASM / WebGL 2.0</span>
             </div>
             <div className={`px-5 py-4 rounded-lg border flex-1 ${theme === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-void-primary border-void-border'}`}>
                <span className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Optimization</span>
                <span className="font-bold text-sm">-O3 High Speed</span>
             </div>
          </div>
        </div>

        {/* Right Column - Info */}
        <div className="lg:col-span-4 space-y-6 sticky top-24">
          <div className="space-y-4">
            <Link to="/games" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-current transition-colors flex items-center gap-1">
               <ArrowLeft size={10} strokeWidth={3} /> Return to Library
            </Link>
            <h1 className={`text-5xl font-black tracking-tighter leading-none ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>{game.title}</h1>
            <div className="flex gap-2">
               <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded border ${theme === 'light' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-void-accent/10 text-void-accent border-void-accent/20'}`}>{game.language} Native</span>
               <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded bg-green-500/10 text-green-500 border border-green-500/20">Production Build</span>
            </div>
            <p className={`text-sm leading-relaxed font-medium ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
              {game.description}
            </p>
          </div>

          <div className={`p-6 rounded-2xl border transition-all ${theme === 'light' ? 'bg-slate-50 border-slate-100' : 'bg-void-primary/40 border-void-border'}`}>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6">Technical Manifest</h4>
            <div className="space-y-4 text-[11px] font-mono">
               <div className="flex justify-between items-center"><span className="text-slate-500 font-bold uppercase tracking-widest text-[9px]">Compiler</span> <span className="font-bold">LLVM/Emscripten 3.1</span></div>
               <div className="flex justify-between items-center"><span className="text-slate-500 font-bold uppercase tracking-widest text-[9px]">Optimization</span> <span className="text-green-500 font-bold">-O3 High Performance</span></div>
               <div className="flex justify-between items-center"><span className="text-slate-500 font-bold uppercase tracking-widest text-[9px]">Asset Size</span> <span className="font-bold">245.4 KB (Brotli)</span></div>
               <div className="flex justify-between items-center"><span className="text-slate-500 font-bold uppercase tracking-widest text-[9px]">Environment</span> <span className="font-bold">Isolated Sandbox</span></div>
            </div>
          </div>

          <button className={`group w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.3em] transition-all border shadow-2xl relative overflow-hidden ${theme === 'light' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-950 border-white hover:bg-void-accent hover:text-white hover:border-void-accent'}`}>
             <span className="relative z-10">Deploy from Source</span>
             <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default GameDetail;
