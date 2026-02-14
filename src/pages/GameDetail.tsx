import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { games } from '../data/games';
import WasmPlayer from '../components/WasmPlayer';
import { ArrowLeft, Code, Play, Cpu, Clock, Box } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const GameDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const game = games.find(g => g.id === id);
  const [activeTab, setActiveTab] = useState<'play' | 'code'>('play');
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
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

  const currentFile = game.sourceFiles[selectedFileIndex];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-6 py-10 max-w-7xl"
    >
      <div className="mb-10">
        <Link to="/games" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-current transition-colors mb-6 group">
           <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> Back to Library
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-gray-100 dark:border-white/5">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    {game.series && (
                        <span className={`px-3 py-1 rounded-md text-xs font-black uppercase tracking-widest ${theme === 'light' ? 'bg-indigo-50 text-indigo-600' : 'bg-void-accent/20 text-void-accent'}`}>
                            {game.series}
                        </span>
                    )}
                    <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest ${theme === 'light' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 dark:bg-white/5 text-gray-500'}`}>Native {game.language}</span>
                    <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest bg-gray-100 dark:bg-white/5 text-gray-500">v1.0.2 stable</span>
                </div>
                <h1 className={`text-5xl md:text-6xl font-black tracking-tighter leading-none ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>{game.title}</h1>
            </div>
            
            <div className="flex items-center gap-4">
                <button 
                  onClick={() => setActiveTab('play')}
                  className={`px-8 py-4 rounded-full font-bold text-sm shadow-lg transition-all flex items-center gap-2 ${
                    activeTab === 'play' 
                      ? theme === 'light' ? 'bg-slate-900 text-white shadow-slate-200' : 'bg-white text-black shadow-white/10'
                      : 'bg-transparent border-2 border-gray-200 dark:border-white/10 text-gray-400 hover:border-gray-400 hover:text-gray-600 dark:hover:text-white'
                  }`}
                >
                  <Play size={18} fill={activeTab === 'play' ? "currentColor" : "none"} /> Launch
                </button>
                <button 
                  onClick={() => setActiveTab('code')}
                  className={`px-8 py-4 rounded-full font-bold text-sm border-2 transition-all flex items-center gap-2 ${
                    activeTab === 'code' 
                      ? theme === 'light' ? 'border-blue-500 text-blue-600 bg-blue-50' : 'border-red-500 text-red-400 bg-red-900/10'
                      : 'border-gray-200 dark:border-white/10 text-gray-400 hover:border-gray-400 hover:text-gray-600 dark:hover:text-white'
                  }`}
                >
                  <Code size={18} /> Source
                </button>
            </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Main Stage */}
        <div className="lg:col-span-8">
            <div className={`rounded-3xl overflow-hidden shadow-2xl transition-all ${theme === 'light' ? 'bg-white shadow-slate-200/50 border border-slate-100' : 'bg-black shadow-black/50 border border-white/5'}`}>
                {activeTab === 'play' ? (
                    <div className="relative">
                        <WasmPlayer gameId={game.id} />
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row h-[550px]">
                        <div className={`w-full md:w-48 border-b md:border-b-0 md:border-r transition-colors ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-zinc-900 border-white/5'}`}>
                            <div className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Project Files</div>
                            <div className="px-2 space-y-1">
                                {game.sourceFiles.map((file, idx) => (
                                    <button
                                        key={file.name}
                                        onClick={() => setSelectedFileIndex(idx)}
                                        className={`w-full text-left px-3 py-2 rounded-md text-xs font-mono transition-all ${
                                            selectedFileIndex === idx 
                                                ? theme === 'light' ? 'bg-white text-blue-600 shadow-sm' : 'bg-white/10 text-white'
                                                : 'text-slate-500 hover:text-current'
                                        }`}
                                    >
                                        {file.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 relative overflow-hidden bg-[#1e1e1e]">
                            <div className={`absolute top-0 left-0 right-0 px-6 py-3 flex justify-between items-center text-xs font-mono border-b z-10 ${theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-500' : 'bg-zinc-900 border-white/5 text-gray-400'}`}>
                                <span>{currentFile.name}</span>
                                <span>{currentFile.language.toUpperCase()} • {new Blob([currentFile.content]).size} bytes</span>
                            </div>
                            <div className="h-full overflow-y-auto custom-scrollbar pt-12">
                                <SyntaxHighlighter 
                                    language={currentFile.language === 'h' ? 'cpp' : currentFile.language} 
                                    style={vscDarkPlus} 
                                    showLineNumbers={true}
                                    customStyle={{ margin: 0, padding: '1.5rem', fontSize: '13px', lineHeight: '1.6', background: 'transparent' }}
                                >
                                    {currentFile.content}
                                </SyntaxHighlighter>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            <div className="mt-8 prose dark:prose-invert max-w-none">
                <h3 className={`text-xl font-bold mb-4 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Mission Briefing</h3>
                <p className={`text-lg leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-zinc-400'}`}>
                    {game.description}
                </p>
            </div>
        </div>

        {/* Sidebar Intel */}
        <div className="lg:col-span-4 space-y-8">
            {game.assets && (
                <div className={`p-8 rounded-3xl border ${theme === 'light' ? 'bg-blue-50 border-blue-100' : 'bg-void-accent/5 border-void-accent/10'}`}>
                    <h4 className={`text-xs font-black uppercase tracking-widest mb-6 ${theme === 'light' ? 'text-blue-600' : 'text-void-accent'}`}>Asset Manifest</h4>
                    <div className="space-y-3">
                        {game.assets.map(asset => (
                            <div key={asset} className="flex items-center gap-3 text-xs font-mono">
                                <Box size={14} className="opacity-50" />
                                <span className={theme === 'light' ? 'text-slate-700' : 'text-slate-300'}>{asset}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className={`p-8 rounded-3xl border transition-all ${theme === 'light' ? 'bg-slate-50 border-slate-100' : 'bg-void-primary/40 border-void-border'}`}>
                <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">Telemetry</h4>
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${theme === 'light' ? 'bg-white text-blue-500 shadow-sm' : 'bg-white/10 text-white'}`}>
                            <Cpu size={20} />
                        </div>
                        <div>
                            <span className={`block font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Multi-threaded</span>
                            <span className="text-sm text-gray-500">SharedArrayBuffer enabled</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${theme === 'light' ? 'bg-white text-green-500 shadow-sm' : 'bg-white/10 text-white'}`}>
                            <Clock size={20} />
                        </div>
                        <div>
                            <span className={`block font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>60 FPS Lock</span>
                            <span className="text-sm text-gray-500">Fixed timestep update</span>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-white/10">
                    <button className={`w-full py-4 rounded-xl font-bold text-sm transition-all ${theme === 'light' ? 'bg-white border-2 border-slate-200 hover:border-slate-400 text-slate-700' : 'bg-white/5 hover:bg-white/10 text-white'}`}>
                        Fetch Binary Bundle
                    </button>
                </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GameDetail;