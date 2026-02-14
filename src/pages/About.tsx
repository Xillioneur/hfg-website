import React from 'react';
import { Hammer, Users, Heart } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 space-y-4"
      >
        <h1 className={`text-4xl font-black tracking-tighter transition-colors ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
            {theme === 'light' ? 'The Great Commission' : 'The Dark Forge'}
        </h1>
        <p className={`text-lg max-w-xl mx-auto transition-colors font-medium ${theme === 'light' ? 'text-slate-500' : 'text-zinc-500'}`}>
          {theme === 'light' 
            ? "Glorifying the Creator through digital excellence." 
            : "Harnessing the raw power of native execution."}
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Section 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`p-8 rounded-2xl border transition-colors ${theme === 'light' ? 'bg-white border-slate-100' : 'bg-zinc-900 border-zinc-800'}`}
        >
            <Hammer className={`w-8 h-8 mb-6 ${theme === 'light' ? 'text-heaven-accent' : 'text-void-accent'}`} />
            <h2 className={`text-xl font-bold mb-3 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Craftsmanship</h2>
            <p className={`text-sm leading-relaxed transition-colors ${theme === 'light' ? 'text-slate-500' : 'text-zinc-400'}`}>
                Writing code is stewardship. We choose C++ not because it is easy, but because it offers absolute control. Every cycle saved is a testament to our dedication to the craft.
            </p>
        </motion.div>

        {/* Section 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={`p-8 rounded-2xl border transition-colors ${theme === 'light' ? 'bg-white border-slate-100' : 'bg-zinc-900 border-zinc-800'}`}
        >
            <Users className="text-blue-500 w-8 h-8 mb-6" />
            <h2 className={`text-xl font-bold mb-3 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Community</h2>
            <p className={`text-sm leading-relaxed transition-colors ${theme === 'light' ? 'text-slate-500' : 'text-zinc-400'}`}>
                We build for everyone. Our infrastructure ensures instant loading worldwide. We are committed to open source, sharing our "recipes" so others may learn and build.
            </p>
        </motion.div>

        {/* Section 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={`p-8 rounded-2xl border transition-colors ${theme === 'light' ? 'bg-white border-slate-100' : 'bg-zinc-900 border-zinc-800'}`}
        >
            <Heart className="text-red-500 w-8 h-8 mb-6" />
            <h2 className={`text-xl font-bold mb-3 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Inspiration</h2>
            <p className={`text-sm leading-relaxed transition-colors ${theme === 'light' ? 'text-slate-500' : 'text-zinc-400'}`}>
                {theme === 'light' 
                  ? "We aim to create games that spark wonder and provide joy. Our themes touch upon light, redemption, and perseverance."
                  : "We seek ultimate efficiency. We don't just write code; we bend it to our will. Together we rule the browser."}
            </p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={`mt-16 p-10 rounded-3xl border text-center transition-all ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-zinc-900/50 border-zinc-800'}`}
      >
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
      </motion.div>
    </div>
  );
};

export default About;
