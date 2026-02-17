import React, { useState, memo, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { games } from '../data/games';
import WasmPlayer from '../components/WasmPlayer';
import { ArrowLeft, Code, Play, Cpu, Clock, Loader2, Zap, Quote, Monitor, Maximize, Heart } from 'lucide-react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import cpp from 'react-syntax-highlighter/dist/esm/languages/prism/cpp';
import c from 'react-syntax-highlighter/dist/esm/languages/prism/c';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../context/ThemeContext';
import { useProgress } from '../hooks/useProgress';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

SyntaxHighlighter.registerLanguage('cpp', cpp);
SyntaxHighlighter.registerLanguage('c', c);

// Memoized sidebar components for performance
const TechnicalManifest = memo(({ theme }: { theme: 'light' | 'dark' }) => (
  <div className={`p-6 rounded-2xl border transition-all ${theme === 'light' ? 'bg-slate-50 border-slate-100' : 'bg-void-primary/40 border-void-border'}`}>
    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6">Technical Manifest</h4>
    <div className="space-y-4 text-[11px] font-mono">
       <div className="flex justify-between items-center"><span className="text-slate-500 font-bold uppercase tracking-widest text-[9px]">Compiler</span> <span className="font-bold">LLVM/Emscripten 3.1</span></div>
       <div className="flex justify-between items-center"><span className="text-slate-500 font-bold uppercase tracking-widest text-[9px]">Optimization</span> <span className="text-green-500 font-bold">-O3 High Performance</span></div>
       <div className="flex justify-between items-center"><span className="text-slate-500 font-bold uppercase tracking-widest text-[9px]">Asset Size</span> <span className="font-bold">245.4 KB (Brotli)</span></div>
       <div className="flex justify-between items-center"><span className="text-slate-500 font-bold uppercase tracking-widest text-[9px]">Environment</span> <span className="font-bold">Isolated Sandbox</span></div>
    </div>
  </div>
));

const EngineeringHighlights = memo(({ theme, gameId }: { theme: 'light' | 'dark', gameId: string }) => {
  const highlights: Record<string, string[]> = {
    'cr-episode-8': ["Spatial Partitioning (64 Sectors)", "Bitmask Sweep Detection", "SIMD-ready Math Helpers"],
    'cr-episode-10': ["Decoupled Logic/Render", "Fixed Timestep Integration", "Particle Pool Recycler"],
    'sample': ["WASM Handshake Protocol", "Raylib WebGL 2.0 Bridge", "Low-CPU Static Rendering"]
  };

  const current = highlights[gameId] || ["Performance Optimized", "Memory Safe C++", "Clean Architecture"];

  return (
    <div className={`p-6 rounded-2xl border transition-all ${theme === 'light' ? 'bg-white border-slate-100 shadow-sm' : 'bg-void-primary/40 border-void-border'}`}>
      <h4 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2 ${theme === 'light' ? 'text-blue-600' : 'text-void-accent'}`}>
          <Zap size={14} /> Engineering Highlights
      </h4>
      <div className="space-y-3">
          {current.map((text) => (
              <div key={text} className="flex items-start gap-3 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1 ${theme === 'light' ? 'bg-blue-400' : 'bg-void-accent'}`} />
                  <span>{text}</span>
              </div>
          ))}
      </div>
      <div className={`mt-6 pt-6 border-t ${theme === 'light' ? 'border-slate-50' : 'border-white/5'} text-[10px] italic text-slate-500`}>
          "Precision in every cycle."
      </div>
    </div>
  );
});

const TelemetryStats = memo(({ theme }: { theme: 'light' | 'dark' }) => (
  <div className={`p-8 rounded-3xl border transition-all ${theme === 'light' ? 'bg-slate-50 border-slate-100' : 'bg-void-primary/40 border-void-border'}`}>
    <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">Live Telemetry</h4>
    <div className="space-y-6">
        <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl ${theme === 'light' ? 'bg-white text-blue-500 shadow-sm' : 'bg-white/10 text-white'}`}>
                <Cpu size={20} />
            </div>
            <div>
                <span className={`block font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Multi-threaded</span>
                <span className="text-sm text-gray-500 font-medium tracking-tight leading-none">SharedArrayBuffer active</span>
            </div>
        </div>
        <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl ${theme === 'light' ? 'bg-white text-green-500 shadow-sm' : 'bg-white/10 text-white'}`}>
                <Clock size={20} />
            </div>
            <div>
                <span className={`block font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>60 FPS Lock</span>
                <span className="text-sm text-gray-500 font-medium tracking-tight leading-none">Fixed timestep update</span>
            </div>
        </div>
    </div>
  </div>
));

const GlobalHeartbeat = memo(({ theme, gameId }: { theme: 'light' | 'dark', gameId: string }) => {
  const [hearts, setHearts] = useState(0);
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    fetch(`/api/hearts?gameId=${gameId}`)
      .then(res => res.json())
      .then(data => setHearts(data.hearts || 0));
  }, [gameId]);

  const addHeart = async () => {
    setIsLiking(true);
    setHearts(prev => prev + 1);
    await fetch('/api/hearts', { 
      method: 'POST', 
      body: JSON.stringify({ gameId }),
      headers: { 'Content-Type': 'application/json' }
    });
    setTimeout(() => setIsLiking(false), 500);
  };

  return (
    <div className={`p-6 rounded-3xl border transition-all flex items-center justify-between ${theme === 'light' ? 'bg-white border-slate-100 shadow-sm' : 'bg-void-primary/40 border-void-border'}`}>
        <div className="space-y-1">
            <span className="block text-[9px] font-black uppercase tracking-widest text-slate-500">Community_Pulse</span>
            <span className={`text-xl font-black ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>{hearts.toLocaleString()}</span>
        </div>
        <button 
            onClick={addHeart}
            disabled={isLiking}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isLiking ? 'scale-90 bg-red-500 text-white' : (theme === 'light' ? 'bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50' : 'bg-white/5 text-slate-500 hover:text-red-500 hover:bg-red-500/10')}`}
        >
            <Heart size={20} fill={isLiking ? "currentColor" : "none"} />
        </button>
    </div>
  );
});

const GameDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const game = useMemo(() => games.find(g => g.id === id), [id]);
  const [activeTab, setActiveTab] = useState<'play' | 'code'>('play');
  const [isTheatreMode, setIsTheatreMode] = useState(false);
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [fileContents, setFileContents] = useState<Record<string, string>>({});
  const [isFetching, setIsFetching] = useState(false);
  const { theme } = useTheme();
  const { recordPlay } = useProgress();

  useEffect(() => {
    if (id) recordPlay(id);
  }, [id]);

  // Structured Data for Google (SEO)
  const jsonLd = useMemo(() => {
    if (!game) return null;
    return {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": game.title,
      "operatingSystem": "Web Browser",
      "applicationCategory": "GameApplication",
      "genre": game.category,
      "description": game.metaDescription,
      "keywords": game.keywords.join(", "),
      "author": {
        "@type": "Organization",
        "name": "HolyForge Games"
      }
    };
  }, [game]);

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

  const toggleFullscreen = () => {
    const playerElement = document.getElementById('wasm-player-container');
    if (playerElement) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        playerElement.requestFullscreen();
      }
    }
  };

  return (
    <>
      <SEO 
        title={`${game.title} | HolyForge Games`} 
        description={game.metaDescription} 
        image={game.thumbnail}
        type="article"
      />
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`container mx-auto px-6 py-10 transition-all duration-500 ${isTheatreMode ? 'max-w-full' : 'max-w-7xl'}`}
      >
        <div className={`mb-10 ${isTheatreMode ? 'max-w-7xl mx-auto' : ''}`}>
          <Link to="/games" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-current transition-colors mb-6 group">
             <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> Back to Library
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-gray-100 dark:border-white/5">
              <div>
                  <div className="flex items-center gap-3 mb-2">
                      {game.series && (
                          <span className={`px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest ${theme === 'light' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-void-accent/20 text-void-accent border border-void-accent/20'}`}>
                              {game.series}
                          </span>
                      )}
                      <span className={`px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest ${theme === 'light' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-gray-100 dark:bg-white/5 text-gray-500 border border-transparent'}`}>Native {game.language}</span>
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

        <div className={`grid lg:grid-cols-12 gap-12 ${isTheatreMode ? 'flex flex-col' : ''}`}>
          <div className={`transition-all duration-500 ${isTheatreMode ? 'lg:col-span-12' : 'lg:col-span-8'} space-y-10`}>
              <div 
                id="wasm-player-container"
                className={`rounded-3xl overflow-hidden shadow-2xl transition-all relative ${theme === 'light' ? 'bg-white shadow-slate-200/50 border border-slate-100' : 'bg-black shadow-black/50 border border-white/5'}`}
              >
                  {/* Player Controls Overlay */}
                  {activeTab === 'play' && (
                    <div className="absolute top-4 right-4 z-30 flex gap-2 opacity-0 hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => setIsTheatreMode(!isTheatreMode)}
                          className={`p-2 rounded-lg bg-black/50 backdrop-blur-md text-white hover:bg-black/80 transition-colors`}
                          title="Theatre Mode"
                        >
                          <Monitor size={18} className={isTheatreMode ? 'text-amber-500' : ''} />
                        </button>
                        <button 
                          onClick={toggleFullscreen}
                          className={`p-2 rounded-lg bg-black/50 backdrop-blur-md text-white hover:bg-black/80 transition-colors`}
                          title="Fullscreen"
                        >
                          <Maximize size={18} />
                        </button>
                    </div>
                  )}

                  {activeTab === 'play' ? (
                      <div className={`relative ${isTheatreMode ? 'aspect-[21/9]' : 'aspect-video'} transition-all duration-500`}>
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
                                                  ? theme === 'light' ? 'bg-white text-blue-600 shadow-sm border border-slate-100' : 'bg-white/10 text-white border border-white/5'
                                                  : 'text-slate-500 hover:text-current border border-transparent'
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
                                      <div className="flex items-center justify-center h-full text-gray-500 gap-2 font-mono text-[10px] uppercase tracking-widest">
                                          <Loader2 className="animate-spin" size={12} /> Syncing Data...
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
              
              <div className={`space-y-6 ${isTheatreMode ? 'max-w-7xl mx-auto' : ''}`}>
                  <div className="prose dark:prose-invert max-w-none">
                      <h3 className={`text-xl font-bold flex items-center gap-2 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                          Mission Briefing
                      </h3>
                      <p className={`text-lg leading-relaxed font-medium ${theme === 'light' ? 'text-slate-600' : 'text-zinc-400'}`}>
                          {game.description}
                      </p>
                  </div>

                  {/* Subtle Faith-Inspired Element */}
                  <div className={`p-6 rounded-2xl border italic text-center transition-colors ${theme === 'light' ? 'bg-slate-50 border-slate-100 text-slate-500' : 'bg-void-primary/20 border-white/5 text-slate-500'}`}>
                      <Quote size={16} className="mx-auto mb-3 opacity-20" />
                      <p className="text-sm font-medium tracking-tight">"Whatever you do, work at it with all your heart, as working for the Lord." — Colossians 3:23</p>
                  </div>
              </div>
          </div>

          <div className={`transition-all duration-500 ${isTheatreMode ? 'lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto w-full' : 'lg:col-span-4 space-y-8'}`}>
              <GlobalHeartbeat theme={theme} gameId={game.id} />
              <div className={isTheatreMode ? 'space-y-8' : 'space-y-8'}>
                <EngineeringHighlights theme={theme} gameId={game.id} />
              </div>
              <TechnicalManifest theme={theme} />
              <TelemetryStats theme={theme} />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default GameDetail;