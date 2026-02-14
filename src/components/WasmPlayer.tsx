import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface WasmPlayerProps {
  gameId: string;
  assetCount?: number;
}

const WasmPlayer: React.FC<WasmPlayerProps> = ({ gameId, assetCount = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const requestRef = useRef<number | null>(null);
  const { theme } = useTheme();

  const addLog = (msg: string) => {
    setConsoleOutput(prev => [...prev.slice(-6), msg]); // Keep last 7 lines for more context
  };

  useEffect(() => {
    setConsoleOutput([]);
    setIsLoading(true);

    const timeouts: NodeJS.Timeout[] = [];
    
    if (theme === 'light') {
        timeouts.push(setTimeout(() => addLog("> Harmonizing metadata..."), 200));
        if (assetCount > 0) {
            for(let i = 0; i < assetCount; i++) {
                timeouts.push(setTimeout(() => addLog(`> Fetching asset chunk ${i+1}/${assetCount}...`), 400 + (i * 300)));
            }
        }
        timeouts.push(setTimeout(() => addLog(`> Ascending ${gameId}.wasm...`), 600 + (assetCount * 300)));
        timeouts.push(setTimeout(() => addLog("> Spiritually instantiating WASM..."), 1200 + (assetCount * 300)));
        timeouts.push(setTimeout(() => {
            addLog("> Divine runtime ready.");
            addLog("> Let there be motion...");
            setIsLoading(false);
            startGameLoop();
        }, 2000 + (assetCount * 300)));
    } else {
        timeouts.push(setTimeout(() => addLog("> Corrupting metadata..."), 200));
        if (assetCount > 0) {
            for(let i = 0; i < assetCount; i++) {
                timeouts.push(setTimeout(() => addLog(`> Extracting asset fragment ${i+1}/${assetCount}...`), 400 + (i * 300)));
            }
        }
        timeouts.push(setTimeout(() => addLog(`> Summoning ${gameId}.wasm from the abyss...`), 600 + (assetCount * 300)));
        timeouts.push(setTimeout(() => addLog("> Forcing WASM instantiation..."), 1200 + (assetCount * 300)));
        timeouts.push(setTimeout(() => {
            addLog("> The Void has initialized.");
            addLog("> Executing shadow loop...");
            setIsLoading(false);
            startGameLoop();
        }, 2000 + (assetCount * 300)));
    }

    return () => {
        timeouts.forEach(clearTimeout);
        if (requestRef.current !== null) cancelAnimationFrame(requestRef.current);
    };
  }, [gameId, theme]);

  const startGameLoop = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    let x = 50;
    let y = 50;
    let dx = 4;
    let dy = 4;
    let angle = 0;
    let hue = theme === 'light' ? 200 : 0;

    const render = () => {
        if (!canvasRef.current || !ctx) return;
        
        ctx.fillStyle = theme === 'light' ? '#f0f9ff' : '#020617';
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        if (gameId.toLowerCase().includes('3d')) {
            // Simulated 3D Orbital Effect
            angle += 0.02;
            const centerX = canvasRef.current.width / 2;
            const centerY = canvasRef.current.height / 2;
            const radius = 100;
            
            // Draw a wireframe-style grid for 3D feel
            ctx.strokeStyle = theme === 'light' ? '#cbd5e1' : '#1e293b';
            ctx.lineWidth = 1;
            for(let i = 0; i < 10; i++) {
                ctx.beginPath();
                ctx.moveTo(0, centerY + (i-5)*20);
                ctx.lineTo(canvasRef.current.width, centerY + (i-5)*20 + Math.sin(angle)*50);
                ctx.stroke();
            }

            x = centerX + Math.cos(angle) * radius;
            y = centerY + Math.sin(angle) * radius * 0.5;
            const size = 40 + Math.sin(angle) * 20;

            ctx.fillStyle = theme === 'light' ? '#3b82f6' : '#f59e0b';
            if (theme !== 'light') {
                ctx.shadowBlur = 20;
                ctx.shadowColor = '#f59e0b';
            }
            ctx.fillRect(x - size/2, y - size/2, size, size);
            ctx.shadowBlur = 0;
        } else {
            // Standard 2D Bouncing
            if (x + 30 > canvasRef.current.width || x < 0) dx = -dx;
            if (y + 30 > canvasRef.current.height || y < 0) dy = -dy;
            x += dx;
            y += dy;
            
            if (theme === 'light') {
                hue = (hue + 0.5) % 360;
                ctx.fillStyle = `hsl(${hue}, 70%, 60%)`;
            } else {
                ctx.fillStyle = '#f59e0b';
                ctx.shadowBlur = 15;
                ctx.shadowColor = '#f59e0b';
            }
            ctx.fillRect(x, y, 30, 30);
            ctx.shadowBlur = 0;
        }
        
        ctx.font = '10px monospace';
        ctx.fillStyle = theme === 'light' ? '#0369a1' : '#f59e0b';
        ctx.fillText(`${theme === 'light' ? 'ASCENDED' : 'VOID'} ENGINE // ${gameId.toUpperCase()}.WASM`, 20, 30);
        ctx.fillText(`V-SYNC: 60.0 FPS`, 20, 45);
        ctx.fillText(`CONTEXT: ${gameId.toLowerCase().includes('3d') ? 'WEBGL_2.0' : 'CANVAS_2D'}`, 20, 60);
        
        const gradient = ctx.createLinearGradient(0, 0, canvasRef.current.width, canvasRef.current.height);
        if (theme === 'light') {
            gradient.addColorStop(0, "rgba(14, 165, 233, 0.1)");
            gradient.addColorStop(1, "transparent");
        } else {
            gradient.addColorStop(0, "rgba(239, 68, 68, 0.1)");
            gradient.addColorStop(1, "transparent");
        }
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        requestRef.current = requestAnimationFrame(render);
    };

    render();
  };

  return (
    <div className={`relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl transition-colors duration-300 scanlines ${theme === 'light' ? 'bg-white' : 'bg-black border border-white/5'}`}>
        <canvas 
            ref={canvasRef} 
            width={800} 
            height={450} 
            className="w-full h-full object-contain block"
        />

        {isLoading && (
            <div className={`absolute inset-0 flex flex-col items-center justify-center z-10 backdrop-blur-md ${theme === 'light' ? 'bg-white/80' : 'bg-black/90'}`}>
                <div className={`w-12 h-12 border-[3px] rounded-full animate-spin mb-4 ${theme === 'light' ? 'border-slate-100 border-t-blue-600' : 'border-white/5 border-t-void-accent'}`}></div>
                <div className={`font-black text-[10px] uppercase tracking-[0.3em] animate-pulse ${theme === 'light' ? 'text-blue-600' : 'text-void-accent'}`}>
                    {theme === 'light' ? 'Initializing Divine Code' : 'Accessing High-Frequency Memory'}
                </div>
            </div>
        )}

        <div className="absolute bottom-0 left-0 p-4 w-full pointer-events-none z-10">
            <div className={`font-mono text-[10px] p-3 rounded-lg shadow-2xl max-w-[320px] backdrop-blur-xl border transition-all ${theme === 'light' ? 'bg-white/40 text-blue-800 border-white' : 'bg-black/60 text-void-accent border-white/5'}`}>
                {consoleOutput.map((line, i) => (
                    <div key={i} className="leading-relaxed opacity-90">{line}</div>
                ))}
                {!isLoading && <div className="animate-pulse inline-block w-1.5 h-3 bg-current align-middle ml-1"></div>}
            </div>
        </div>
        
        {/* Decorative corner accents */}
        <div className={`absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 opacity-30 ${theme === 'light' ? 'border-blue-600' : 'border-void-accent'}`}></div>
        <div className={`absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 opacity-30 ${theme === 'light' ? 'border-blue-600' : 'border-void-accent'}`}></div>
        <div className={`absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 opacity-30 ${theme === 'light' ? 'border-blue-600' : 'border-void-accent'}`}></div>
        <div className={`absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 opacity-30 ${theme === 'light' ? 'border-blue-600' : 'border-void-accent'}`}></div>
    </div>
  );
};

export default WasmPlayer;
