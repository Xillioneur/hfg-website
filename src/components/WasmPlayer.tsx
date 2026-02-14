import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface WasmPlayerProps {
  gameId: string;
}

const WasmPlayer: React.FC<WasmPlayerProps> = ({ gameId }) => {
  const [consoleOutput, setConsoleOutput] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [iframeSrc, setIframeSrc] = useState<string>('');
  const { theme } = useTheme();
  
  const logBuffer = useRef<string[]>([]);
  const updateTimer = useRef<number | null>(null);

  const addLog = (msg: string) => {
    if (!msg) return;
    logBuffer.current.push(msg);
    if (logBuffer.current.length > 5) logBuffer.current.shift();

    // MOBILE OPTIMIZATION: If we see logs, the game is running. 
    // Force clear loading if stuck on "Syncing" but logs are moving.
    if (isLoading && logBuffer.current.length > 2) {
        setIsLoading(false);
    }

    if (updateTimer.current === null) {
      updateTimer.current = window.setTimeout(() => {
        setConsoleOutput(logBuffer.current.join('\n'));
        updateTimer.current = null;
      }, 250);
    }
  };

  useEffect(() => {
    logBuffer.current = [];
    setConsoleOutput('');
    setIsLoading(true);
    setError(null);
    setIframeSrc('');

    const handleMessage = (event: MessageEvent) => {
      const { type, text } = event.data;
      if (!type) return;

      if (type === 'log') addLog(text);
      if (type === 'error') {
        if (text && text.includes('Failed to load')) {
            setError(text);
            setIsLoading(false);
        } else {
            addLog(text);
        }
      }
      if (type === 'ready') {
        setIsLoading(false);
      }
    };

    window.addEventListener('message', handleMessage);

    // Initial load delay
    const timer = setTimeout(() => {
        setIframeSrc(`/runner.html?game=${gameId}&t=${Date.now()}`);
    }, 200);

    return () => {
        setIframeSrc('');
        window.removeEventListener('message', handleMessage);
        clearTimeout(timer);
        if (updateTimer.current) clearTimeout(updateTimer.current);
    };
  }, [gameId]);

  return (
    <div className={`relative w-full aspect-video rounded-xl overflow-hidden bg-black transition-colors duration-300 ${theme === 'light' ? 'border border-slate-200 shadow-lg' : 'border border-white/5 shadow-2xl'}`}>
        
        {iframeSrc && !error && (
            <iframe 
                src={iframeSrc}
                className="w-full h-full border-none bg-black"
                allow="cross-origin-isolated"
                title="HolyForge Game Player"
                scrolling="no"
            />
        )}

        {/* Loading Overlay */}
        {isLoading && !error && (
            <div className={`absolute inset-0 flex flex-col items-center justify-center z-10 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
                <div className={`w-6 h-6 border-2 rounded-full animate-spin mb-4 ${theme === 'light' ? 'border-slate-100 border-t-blue-600' : 'border-white/5 border-t-void-accent'}`}></div>
                <div className={`font-black text-[9px] uppercase tracking-[0.3em] ${theme === 'light' ? 'text-blue-600' : 'text-void-accent'}`}>
                    {gameId === 'sample' ? 'Calibrating' : 'Syncing'}
                </div>
            </div>
        )}

        {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/95 p-6 text-center">
                <div className="text-red-500 font-bold mb-4 uppercase tracking-widest text-[10px] font-mono">LINK_ERROR</div>
                <button 
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-full text-[10px] uppercase font-bold tracking-widest transition-all"
                >
                    Retry
                </button>
            </div>
        )}

        {/* Console */}
        <div className="absolute bottom-0 left-0 p-4 w-full pointer-events-none z-10 hidden sm:block">
            <div className={`font-mono text-[9px] p-2 rounded max-w-[240px] border ${theme === 'light' ? 'bg-white/60 text-blue-800 border-white' : 'bg-black/60 text-void-accent border-white/5'}`}>
                <pre className="whitespace-pre-wrap m-0 opacity-70 leading-tight font-mono">{consoleOutput}</pre>
            </div>
        </div>
    </div>
  );
};

export default WasmPlayer;