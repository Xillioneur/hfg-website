import React, { useState, memo, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { games } from '../data/games';
import WasmPlayer from '../components/WasmPlayer';
import { ArrowLeft, Code, Play, Cpu, Clock, Box, Loader2 } from 'lucide-react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import cpp from 'react-syntax-highlighter/dist/esm/languages/prism/cpp';
import c from 'react-syntax-highlighter/dist/esm/languages/prism/c';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

SyntaxHighlighter.registerLanguage('cpp', cpp);
SyntaxHighlighter.registerLanguage('c', c);

// Memoized sidebar for performance
const TechnicalManifest = memo(({ theme }: { theme: 'light' | 'dark' }) => (
  <div className={`p-6 rounded-2xl border transition-all ${theme === 'light' ? 'bg-slate-50 border-slate-100' : 'bg-void-primary/40 border-void-border'}`}>
    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6">Technical Manifest</h4>
    <div className="space-y-4 text-[11px] font-mono">
       <div className="flex justify-between items-center"><span className="text-slate-500 font-bold uppercase tracking-widest text-[9px]">Compiler</span> <span className="font-bold">LLVM/Emscripten 3.1</span></div>
       <div className="flex justify-between items-center"><span className="text-slate-500 font-bold uppercase tracking-widest text-[9px]">Optimization</span> <span className="text-green-500 font-bold">-O3 High Performance</span></div>
       <div className="flex justify-between items-center"><span className="text-slate-500 font-bold uppercase tracking-widest text-[9px]">Environment</span> <span className="font-bold">Isolated Sandbox</span></div>
    </div>
  </div>
));

const TelemetryStats = memo(({ theme }: { theme: 'light' | 'dark' }) => (
  <div className={`p-8 rounded-3xl border transition-all ${theme === 'light' ? 'bg-slate-50 border-slate-100' : 'bg-void-primary/40 border-void-border'}`}>
    <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">Telemetry</h4>
    <div className="space-y-6">
        <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl ${theme === 'light' ? 'bg-white text-blue-500 shadow-sm' : 'bg-white/10 text-white'}`}>
                <Cpu size={20} />
            </div>
            <div>
                <span className={`block font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Multi-threaded</span>
                <span className="text-sm text-gray-500 font-medium">SharedArrayBuffer enabled</span>
            </div>
        </div>
        <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl ${theme === 'light' ? 'bg-white text-green-500 shadow-sm' : 'bg-white/10 text-white'}`}>
                <Clock size={20} />
            </div>
            <div>
                <span className={`block font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>60 FPS Lock</span>
                <span className="text-sm text-gray-500 font-medium">Fixed timestep update</span>
            </div>
        </div>
    </div>
  </div>
));

const GameDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const game = useMemo(() => games.find(g => g.id === id), [id]);
  const [activeTab, setActiveTab] = useState<'play' | 'code'>('play');
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [fileContents, setFileContents] = useState<Record<string, string>>({});
  const [isFetching, setIsFetching] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    if (!game || activeTab !== 'code') return;

    const currentFile = game.sourceFiles[selectedFileIndex];
    if (fileContents[currentFile.path]) return;

    setIsFetching(true);
    fetch(currentFile.path)
      .then(res => res.text())
      .then(text => {
        setFileContents(prev => ({ ...prev, [currentFile.path]: text }));
        setIsFetching(false);
      })
      .catch(() => setIsFetching(false));
  }, [game, selectedFileIndex, activeTab]);

  if (!game) return null;

  const currentFile = game.sourceFiles[selectedFileIndex];
  const currentContent = fileContents[currentFile.path] || "";

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
                        <span className={`px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest ${theme === 'light' ? 'bg-indigo-50 text-indigo-600' : 'bg-void-accent/20 text-void-accent'}`}>
                            {game.series}
                        </span>
                    )}
                    <span className={`px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest ${theme === 'light' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 dark:bg-white/5 text-gray-500'}`}>Native {game.language}</span>
                </div>
                <h1 className={`text-5xl md:text-6xl font-black tracking-tighter leading-none ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>{game.title}</h1>
            </div>
            
            <div className="flex items-center gap-4">
                <button 
                  onClick={() => setActiveTab('play')}
                  className={`px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest shadow-lg transition-all flex items-center gap-2 ${
                    activeTab === 'play' 
                      ? theme === 'light' ? 'bg-slate-900 text-white shadow-slate-200' : 'bg-white text-black shadow-white/10'
                      : 'bg-transparent border-2 border-gray-200 dark:border-white/10 text-gray-400 hover:border-gray-400 hover:text-gray-600 dark:hover:text-white'
                  }`}
                >
                  <Play size={14} fill={activeTab === 'play' ? "currentColor" : "none"} /> Launch
                </button>
                <button 
                  onClick={() => setActiveTab('code')}
                  className={`px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest border-2 transition-all flex items-center gap-2 ${
                    activeTab === 'code' 
                      ? theme === 'light' ? 'border-blue-500 text-blue-600 bg-blue-50' : 'border-red-500 text-red-400 bg-red-900/10'
                      : 'border-gray-200 dark:border-white/10 text-gray-400 hover:border-gray-400 hover:text-gray-600 dark:hover:text-white'
                  }`}
                >
                  <Code size={14} /> Source
                </button>
            </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
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
                            <div className={`absolute top-0 left-0 right-0 px-6 py-2.5 flex justify-between items-center text-[10px] font-black uppercase tracking-widest border-b z-10 ${theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-500' : 'bg-zinc-900 border-white/5 text-gray-400'}`}>
                                <span>{currentFile.name}</span>
                                <span>{currentFile.language.toUpperCase()} • {currentContent ? new Blob([currentContent]).size : 0} B</span>
                            </div>
                            <div className="h-full overflow-y-auto custom-scrollbar pt-10">
                                {isFetching ? (
                                    <div className="flex items-center justify-center h-full text-gray-500 gap-2 font-mono text-xs">
                                        <Loader2 className="animate-spin" size={14} /> Fetching manifest...
                                    </div>
                                ) : (
                                    <SyntaxHighlighter 
                                        language={currentFile.language === 'h' ? 'cpp' : currentFile.language} 
                                        style={vscDarkPlus} 
                                        showLineNumbers={true}
                                        customStyle={{ margin: 0, padding: '1.5rem', fontSize: '13px', lineHeight: '1.6', background: 'transparent' }}
                                    >
                                        {currentContent}
                                    </SyntaxHighlighter>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            <div className="mt-8 prose dark:prose-invert max-w-none">
                <h3 className={`text-xl font-bold mb-4 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Mission Briefing</h3>
                <p className={`text-lg leading-relaxed font-medium ${theme === 'light' ? 'text-slate-600' : 'text-zinc-400'}`}>
                    {game.description}
                </p>
            </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
            {game.assets && (
                <div className={`p-8 rounded-3xl border ${theme === 'light' ? 'bg-blue-50 border-blue-100' : 'bg-void-accent/5 border-void-accent/10'}`}>
                    <h4 className={`text-xs font-black uppercase tracking-widest mb-6 ${theme === 'light' ? 'text-blue-600' : 'text-void-accent'}`}>Asset Manifest</h4>
                    <div className="space-y-3">
                        {game.assets.map(asset => (
                            <div key={asset} className="flex items-center gap-3 text-[11px] font-mono font-bold">
                                <Box size={14} className="opacity-50" />
                                <span className={theme === 'light' ? 'text-slate-700' : 'text-slate-300'}>{asset}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <TechnicalManifest theme={theme} />
            <TelemetryStats theme={theme} />
        </div>
      </div>
    </motion.div>
  );
};

export default GameDetail;