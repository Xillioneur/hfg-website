import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { Shield, Upload, Server, Database, Plus, Terminal } from 'lucide-react';

const Admin: React.FC = () => {
  const { theme } = useTheme();
  const [activeView, setActiveTab] = useState<'overview' | 'add'>('overview');

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-600 dark:text-void-accent">
            <Shield size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Administrative Terminal</span>
          </div>
          <h1 className={`text-4xl font-black tracking-tighter ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Studio Control</h1>
        </div>

        <div className="flex gap-2">
            <button 
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeView === 'overview' ? (theme === 'light' ? 'bg-slate-900 text-white' : 'bg-white text-black') : 'text-slate-500 hover:text-current'}`}
            >
                Overview
            </button>
            <button 
                onClick={() => setActiveTab('add')}
                className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeView === 'add' ? (theme === 'light' ? 'bg-slate-900 text-white' : 'bg-white text-black') : 'text-slate-500 hover:text-current'}`}
            >
                Forge New Module
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Status */}
        <div className="lg:col-span-4 space-y-6">
            <div className={`p-6 rounded-3xl border ${theme === 'light' ? 'bg-white border-slate-100 shadow-sm' : 'bg-void-primary/40 border-void-border shadow-xl'}`}>
                <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6 flex items-center gap-2">
                    <Server size={12} /> System Integrity
                </h4>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-bold uppercase text-slate-500">Cloudflare Pages</span>
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-bold uppercase text-slate-500">D1 Database</span>
                        <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-bold uppercase text-slate-500">R2 Object Store</span>
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                </div>
            </div>

            <div className={`p-6 rounded-3xl border ${theme === 'light' ? 'bg-slate-900 text-white shadow-xl' : 'bg-void-accent text-white shadow-2xl'}`}>
                <Database size={24} className="mb-4 opacity-50" />
                <h3 className="font-black text-lg leading-tight mb-2 uppercase tracking-tight">Binary <br/>Replication</h3>
                <p className="text-[11px] opacity-70 font-medium leading-relaxed">Automatic synchronization across 310+ global edge locations is active.</p>
            </div>
        </div>

        {/* Main Workspace */}
        <div className="lg:col-span-8">
            {activeView === 'overview' ? (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className={`rounded-3xl border p-8 transition-colors ${theme === 'light' ? 'bg-white border-slate-100' : 'bg-void-primary/20 border-white/5'}`}
                >
                    <div className="flex items-center gap-2 text-slate-500 mb-8">
                        <Terminal size={16} />
                        <span className="text-xs font-mono tracking-tight">Active_Modules.list</span>
                    </div>
                    
                    <div className="space-y-4 mb-12">
                        {[
                            { name: "CR-EPISODE-10", status: "STABLE", size: "245KB", platform: "RAYLIB" },
                            { name: "CR-EPISODE-8", status: "STABLE", size: "182KB", platform: "SDL2" },
                            { name: "SYSTEM-DIAG", status: "ACTIVE", size: "42KB", platform: "RAYLIB" },
                        ].map(module => (
                            <div key={module.name} className={`p-4 rounded-2xl border flex items-center justify-between group transition-all ${theme === 'light' ? 'bg-slate-50 border-slate-100 hover:bg-white hover:shadow-md' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
                                <div className="flex items-center gap-4">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-[10px] ${theme === 'light' ? 'bg-white border border-slate-200 text-slate-400' : 'bg-black text-slate-600'}`}>
                                        W
                                    </div>
                                    <div>
                                        <span className="block text-xs font-black tracking-widest">{module.name}</span>
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{module.platform}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="block text-[10px] font-mono text-green-500 font-bold">{module.status}</span>
                                    <span className="text-[10px] font-mono text-slate-500">{module.size}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 mb-4">
                            <Terminal size={14} /> Real-time Build Stream
                        </h4>
                        <div className={`p-4 rounded-2xl font-mono text-[10px] space-y-1 ${theme === 'light' ? 'bg-slate-900 text-blue-400' : 'bg-black text-void-accent'}`}>
                            <div className="opacity-50">[16:42:01] pipeline_init: holyforge-v1.3.5</div>
                            <div className="opacity-70">[16:42:05] checking_submodules: episode-10 {'->'} up_to_date</div>
                            <div className="opacity-90">[16:42:10] emcc_compile: system-diag.cpp {'->'} success (42ms)</div>
                            <div className="animate-pulse">[16:45:30] idling: waiting for source_bundle...</div>
                        </div>
                    </div>
                </motion.div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className={`rounded-3xl border p-8 transition-colors ${theme === 'light' ? 'bg-white border-slate-100' : 'bg-void-primary/20 border-white/5'}`}
                >
                    <h3 className="text-xl font-black uppercase tracking-widest mb-8">Forge New Module</h3>
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Module Name</label>
                                <input type="text" placeholder="CR-EPISODE-11" className={`w-full px-4 py-3 rounded-xl border text-xs font-mono focus:outline-none focus:ring-2 ${theme === 'light' ? 'bg-slate-50 border-slate-100 focus:ring-blue-500/20' : 'bg-white/5 border-white/5 focus:ring-void-accent/20'}`} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Engine Platform</label>
                                <select className={`w-full px-4 py-3 rounded-xl border text-xs font-mono focus:outline-none ${theme === 'light' ? 'bg-slate-50 border-slate-100' : 'bg-white/5 border-white/10'}`}>
                                    <option>Raylib (C++)</option>
                                    <option>SDL2 (C++)</option>
                                    <option>Vanilla C</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Source Entry Point (.cpp)</label>
                            <div className={`w-full p-12 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center gap-4 transition-colors ${theme === 'light' ? 'bg-slate-50 border-slate-200 hover:border-blue-400' : 'bg-white/5 border-white/10 hover:border-void-accent'}`}>
                                <Upload size={32} className="opacity-20" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Drop source bundle</span>
                            </div>
                        </div>

                        <button className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2 ${theme === 'light' ? 'bg-slate-900 text-white shadow-xl shadow-blue-900/10' : 'bg-white text-black shadow-2xl shadow-white/5 hover:bg-void-accent hover:text-white'}`}>
                            <Plus size={16} strokeWidth={3} /> Initialize Build Pipeline
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
