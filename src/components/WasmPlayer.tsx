import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface WasmPlayerProps {
  gameId: string;
  assetCount?: number;
}

const WasmPlayer: React.FC<WasmPlayerProps> = ({ gameId }) => {
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const addLog = (msg: string) => {
    setConsoleOutput(prev => [...prev.slice(-6), msg]);
  };

  useEffect(() => {
    setConsoleOutput([]);
    setIsLoading(true);
    setError(null);

    addLog(`> Booting ${gameId} runtime...`);

    const handleMessage = (event: MessageEvent) => {
      const { type, text } = event.data;
      if (type === 'log') addLog(text);
      if (type === 'error') {
        // Only show actual load errors, ignore noisy C++ logs
        if (text.includes('Failed to load')) {
            setError(text);
            setIsLoading(false);
        } else {
            console.warn("WASM Error:", text);
        }
      }
      if (type === 'ready') {
        addLog("> Binary handshake successful.");
        setIsLoading(false);
      }
    };

    window.addEventListener('message', handleMessage);

    // Safety timeout: If no message is received within 10 seconds, something is blocked
    const safetyTimeout = setTimeout(() => {
        if (isLoading && !error) {
            setError("SYSTEM_TIMEOUT: The game runner failed to respond. This is likely due to browser security policies (COEP/COOP) blocking the execution. Check the browser console for details.");
            setIsLoading(false);
        }
    }, 10000);

    return () => {
        window.removeEventListener('message', handleMessage);
        clearTimeout(safetyTimeout);
    };
  }, [gameId]);

  return (
    <div className={`relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl transition-colors duration-300 scanlines ${theme === 'light' ? 'bg-white' : 'bg-black border border-white/5'}`}>
        
        {/* The Game Runner Iframe */}
        {!error && (
            <iframe 
                ref={iframeRef}
                src={`/runner.html?game=${gameId}`}
                className="w-full h-full border-none"
                allow="cross-origin-isolated"
                title="HolyForge Game Player"
            />
        )}

        {/* Loading Overlay */}
        {isLoading && !error && (
            <div className={`absolute inset-0 flex flex-col items-center justify-center z-10 backdrop-blur-md ${theme === 'light' ? 'bg-white/80' : 'bg-black/90'}`}>
                <div className={`w-12 h-12 border-[3px] rounded-full animate-spin mb-4 ${theme === 'light' ? 'border-slate-100 border-t-blue-600' : 'border-white/5 border-t-void-accent'}`}></div>
                <div className={`font-black text-[10px] uppercase tracking-[0.3em] animate-pulse ${theme === 'light' ? 'text-blue-600' : 'text-void-accent'}`}>
                    {theme === 'light' ? 'Initializing Divine Code' : 'Accessing High-Frequency Memory'}
                </div>
            </div>
        )}

        {/* Error State */}
        {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/90 p-6 text-center">
                <div className="text-red-500 font-bold mb-4 uppercase tracking-widest text-sm">Engine Load Failure</div>
                <div className="text-gray-400 text-xs font-mono max-w-md leading-relaxed">{error}</div>
                <button 
                    onClick={() => window.location.reload()}
                    className="mt-8 px-8 py-3 bg-white/10 hover:bg-white text-white hover:text-black rounded-full text-[10px] uppercase font-black tracking-[0.2em] transition-all"
                >
                    Re-initialize System
                </button>
            </div>
        )}

        {/* Terminal Console */}
        <div className="absolute bottom-0 left-0 p-4 w-full pointer-events-none z-10">
            <div className={`font-mono text-[10px] p-3 rounded-lg shadow-2xl max-w-[320px] backdrop-blur-xl border transition-all ${theme === 'light' ? 'bg-white/40 text-blue-800 border-white' : 'bg-black/60 text-void-accent border-white/5'}`}>
                {consoleOutput.map((line, i) => (
                    <div key={i} className="leading-relaxed opacity-90">{line}</div>
                ))}
                {!isLoading && !error && <div className="animate-pulse inline-block w-1.5 h-3 bg-current align-middle ml-1"></div>}
            </div>
        </div>
        
        {/* Decorative corner accents */}
        <div className={`absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 opacity-20 ${theme === 'light' ? 'border-blue-600' : 'border-void-accent'}`}></div>
        <div className={`absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 opacity-20 ${theme === 'light' ? 'border-blue-600' : 'border-void-accent'}`}></div>
        <div className={`absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 opacity-20 ${theme === 'light' ? 'border-blue-600' : 'border-void-accent'}`}></div>
        <div className={`absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 opacity-20 ${theme === 'light' ? 'border-blue-600' : 'border-void-accent'}`}></div>
    </div>
  );
};

export default WasmPlayer;
