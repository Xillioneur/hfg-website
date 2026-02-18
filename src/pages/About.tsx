import React from 'react';
import { Hammer, Users, Heart } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const About: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl">
      <div className="text-center mb-16 space-y-4">
        <h1 className={`text-4xl font-black tracking-tighter transition-colors ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
            {theme === 'light' ? 'The Great Commission' : 'The Dark Forge'}
        </h1>
        <p className={`text-lg max-w-xl mx-auto transition-colors font-medium ${theme === 'light' ? 'text-slate-500' : 'text-zinc-500'}`}>
          {theme === 'light' 
            ? "Glorifying the Creator through digital excellence." 
            : "Harnessing the raw power of native execution."}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Section 1 */}
        <div className={`p-8 rounded-2xl transition-colors solid-card`}>
            <Hammer className={`w-8 h-8 mb-6 ${theme === 'light' ? 'text-heaven-accent' : 'text-void-accent'}`} />
            <h2 className={`text-xl font-bold mb-3 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Craftsmanship</h2>
            <p className={`text-sm leading-relaxed transition-colors ${theme === 'light' ? 'text-slate-500' : 'text-zinc-400'}`}>
                Writing code is stewardship. We choose C++ not because it is easy, but because it offers absolute control. Every cycle saved is a testament to our dedication to the craft.
            </p>
        </div>

        {/* Section 2 */}
        <div className={`p-8 rounded-2xl transition-colors solid-card`}>
            <Users className="text-blue-500 w-8 h-8 mb-6" />
            <h2 className={`text-xl font-bold mb-3 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Community</h2>
            <p className={`text-sm leading-relaxed transition-colors ${theme === 'light' ? 'text-slate-500' : 'text-zinc-400'}`}>
                We build for everyone. Our infrastructure ensures instant loading worldwide. We are committed to open source, sharing our "recipes" so others may learn and build.
            </p>
        </div>

        {/* Section 3 */}
        <div className={`p-8 rounded-2xl transition-colors solid-card`}>
            <Heart className="text-red-500 w-8 h-8 mb-6" />
            <h2 className={`text-xl font-bold mb-3 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Inspiration</h2>
            <p className={`text-sm leading-relaxed transition-colors ${theme === 'light' ? 'text-slate-500' : 'text-zinc-400'}`}>
                {theme === 'light' 
                  ? "We aim to create games that spark wonder and provide joy. Our themes touch upon light, redemption, and perseverance."
                  : "We seek ultimate efficiency. We don't just write code; we bend it to our will. Together we rule the browser."}
            </p>
        </div>
      </div>

      {/* Forge Roadmap Section */}
      <div className="mt-24 space-y-12">
        <div className="text-center">
            <h2 className={`text-2xl font-black uppercase tracking-widest mb-4 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>The Forge Roadmap</h2>
            <p className="text-sm text-slate-500 font-medium tracking-tight">Evolving the craft of native execution.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
                { phase: "Q1 2026", goal: "WASM Handshake v1.0", status: "COMPLETE" },
                { phase: "Q2 2026", goal: "Real-time Telemetry", status: "IN PROGRESS" },
                { phase: "Q3 2026", goal: "Multiplayer Alpha", status: "PLANNING" },
                { phase: "Q4 2026", goal: "VR Integration", status: "RESEARCH" }
            ].map((milestone) => (
                <div key={milestone.phase} className={`p-6 rounded-2xl transition-all solid-card`}>
                    <span className={`block text-[9px] font-black tracking-widest uppercase mb-2 ${theme === 'light' ? 'text-blue-600' : 'text-void-accent'}`}>{milestone.phase}</span>
                    <h4 className={`text-sm font-bold mb-4 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>{milestone.goal}</h4>
                    <span className={`inline-block px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${milestone.status === 'COMPLETE' ? 'bg-green-500/10 text-green-500' : 'bg-slate-500/10 text-slate-500'}`}>{milestone.status}</span>
                </div>
            ))}
        </div>
      </div>

      <div className={`mt-24 p-10 rounded-3xl text-center transition-all ${theme === 'light' ? 'bg-slate-50' : 'bg-zinc-900/50'}`}>
        <h3 className={`text-xl font-bold mb-4 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
            {theme === 'light' ? 'Join the Ascension' : 'Submit to the Void'}
        </h3>
        <p className={`text-sm mb-8 max-w-md mx-auto ${theme === 'light' ? 'text-slate-500' : 'text-zinc-400'}`}>
            Interested in C++ game development or WebAssembly? Our forge is always open for new contributors.
        </p>
        <div className="flex justify-center gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className={`px-8 py-3 text-xs font-black uppercase tracking-widest rounded-full transition-all ${theme === 'light' ? 'bg-slate-900 text-white hover:bg-heaven-accent' : 'bg-white text-black hover:bg-void-accent hover:text-white'}`}>
                GitHub Repository
            </a>
            <button className={`px-8 py-3 text-xs font-black uppercase tracking-widest rounded-full border transition-all ${theme === 'light' ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50' : 'bg-transparent border-zinc-800 text-zinc-400 hover:border-zinc-700'}`}>
                Contact Forge
            </button>
        </div>
      </div>
    </div>
  );
};

export default About;
