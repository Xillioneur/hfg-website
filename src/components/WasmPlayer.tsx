import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import CrossSpinner from './CrossSpinner';
import { Play } from 'lucide-react';

interface WasmPlayerProps {
  gameId: string;
}

const WasmPlayer: React.FC<WasmPlayerProps> = ({ gameId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    // Defer loading the iframe until after the first paint
    const mountTimer = setTimeout(() => setIsMounted(true), 50);

    const handleMessage = (event: MessageEvent) => {
      const { type } = event.data;
      if (type === 'ready') {
        setIsLoading(false);
      }
      if (type === 'error') {
        setError(event.data.text || "Failed to initialize engine.");
        setIsLoading(false);
      }
    };

    window.addEventListener('message', handleMessage);

    const safetyTimer = setTimeout(() => setIsLoading(false), 8000);

    return () => {
        window.removeEventListener('message', handleMessage);
        clearTimeout(safetyTimer);
        clearTimeout(mountTimer);
    };
  }, [gameId]);

  return (
    <div className={`relative w-full h-full bg-black rounded-xl overflow-hidden`}>
        
        {/* Defer Iframe loading until component is stable */}
        {isMounted && !error && (
            <iframe 
                src={`/runner.html?game=${gameId}`}
                className="w-full h-full border-none bg-black"
                allow="cross-origin-isolated; autoplay; fullscreen"
                title="HolyForge Game Player"
                scrolling="no"
                // Re-adding allow-same-origin for localStorage and proper origin handling
                sandbox="allow-scripts allow-forms allow-popups allow-modals allow-pointer-lock allow-same-origin"
            />
        )}

        {/* Cinematic Loading Overlay */}
        {isLoading && !error && (
            <div className={`absolute inset-0 flex flex-col items-center justify-center z-20 backdrop-blur-sm ${theme === 'light' ? 'bg-white/80' : 'bg-black/90'}`}>
                <CrossSpinner color={theme === 'light' ? '#2563eb' : '#ef4444'} />
                <div className="text-center space-y-4 mt-8">
                    <div className={`font-black text-[9px] uppercase tracking-[0.3em] ${theme === 'light' ? 'text-blue-600' : 'text-void-accent'}`}>
                        Binary_Init
                    </div>
                    <button 
                        onClick={() => setIsLoading(false)}
                        className={`px-6 py-2 rounded-full border text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 mx-auto ${theme === 'light' ? 'border-slate-200 text-slate-400 hover:bg-slate-50' : 'border-white/10 text-white/30 hover:text-white hover:bg-white/5'}`}
                    >
                        <Play size={12} fill="currentColor" /> Force_Sync
                    </button>
                </div>
            </div>
        )}

        {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-black/95 p-6 text-center">
                <div className="text-red-500 font-bold mb-4 uppercase tracking-widest text-[10px] font-mono">LINK_ERROR</div>
                <button 
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-full text-[10px] uppercase font-bold tracking-widest transition-all"
                >
                    Retry
                </button>
            </div>
        )}
    </div>
  );
};

export default WasmPlayer;
