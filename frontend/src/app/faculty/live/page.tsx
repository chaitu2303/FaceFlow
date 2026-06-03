"use client";

import { useState, useEffect } from "react";
import { Users, Clock, Maximize2, ScanFace, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LiveClass() {
  const [expected] = useState(120);
  const [present, setPresent] = useState(108);
  const [absent, setAbsent] = useState(12);
  const [toasts, setToasts] = useState<any[]>([]);

  const percentage = Math.round((present / expected) * 100);

  // Simulate incoming face recognitions
  useEffect(() => {
    const names = ["Chaitanya Kumar Sahu", "Sarah Connor", "John Doe", "Alice Smith", "James Bond"];
    let count = 0;
    
    const interval = setInterval(() => {
      if (count >= names.length) {
        clearInterval(interval);
        return;
      }
      
      const newId = Date.now();
      const newName = names[count];
      
      setToasts(prev => [...prev, { id: newId, name: newName, confidence: (98 + Math.random() * 1.9).toFixed(1) }]);
      setPresent(p => p + 1);
      setAbsent(a => a - 1);
      
      // Auto dismiss toast
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== newId));
      }, 4000);
      
      count++;
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-sm">Database Management</h1>
          <p className="text-slate-400 mt-1 text-sm font-medium">Room A204 • Live AI Automated Session</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20 text-sm font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(16,185,129,0.15)]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Session Active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3 bg-slate-950 rounded-3xl overflow-hidden shadow-2xl relative aspect-video flex items-center justify-center border border-slate-800">
          
          {/* Simulated Camera Feed */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-luminosity transform hover:scale-105 transition-transform duration-1000"></div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50"></div>
          
          {/* HUD Overlay */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-2 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono rounded border border-white/10">CAM-FRONT</span>
            <span className="px-2 py-1 bg-emerald-500/10 backdrop-blur-md text-[10px] font-mono rounded text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)] flex items-center gap-1">
              <ScanFace className="w-3 h-3" /> 99.8% SENSOR ACTIVE
            </span>
          </div>

          <div className="absolute bottom-4 right-4">
            <button className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-lg transition-colors border border-white/20">
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
          
          {/* Scanning Box */}
          <div className="relative z-10 w-64 h-64 border border-emerald-500/40 rounded-xl flex items-center justify-center">
            <div className="absolute inset-0 bg-emerald-500/5 rounded-xl"></div>
            
            {/* Live Recognition Toasts Overlay */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-[300px] flex flex-col items-center gap-2 pointer-events-none">
              <AnimatePresence>
                {toasts.map(toast => (
                  <motion.div 
                    key={toast.id}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    className="bg-slate-900/80 backdrop-blur-xl border border-emerald-500/40 px-4 py-3 rounded-2xl flex items-center gap-3 shadow-[0_0_20px_rgba(16,185,129,0.3)] w-full"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-white truncate">{toast.name}</div>
                      <div className="text-[10px] font-mono text-emerald-400 mt-0.5">{toast.confidence}% Match</div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            <motion.div 
              animate={{ y: [0, 250, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-0.5 bg-emerald-500 shadow-[0_0_15px_#10b981]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <motion.div whileHover={{ scale: 1.02 }} className="bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-slate-800/60 p-6 shadow-xl flex-1 flex flex-col justify-center items-center text-center group">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 relative z-10">Occupancy</div>
            <div className="text-6xl font-black tracking-tighter text-white drop-shadow-md relative z-10">{percentage}%</div>
            
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-6 mb-2 relative z-10">
              <div className="h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)] transition-all duration-1000" style={{ width: `${percentage}%` }} />
            </div>
            <div className="text-[10px] font-mono text-slate-400 font-medium relative z-10">{present} of {expected} Present</div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-slate-800/60 p-6 shadow-xl flex-1 flex flex-col justify-center group">
            <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
            <div className="flex items-center justify-between mb-4 relative z-10">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Absent</span>
              <span className="text-xl font-black text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">{absent}</span>
            </div>
            <div className="space-y-2.5 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400">JS</div>
                <div className="text-sm text-slate-300 font-medium">Jane Smith</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400">MW</div>
                <div className="text-sm text-slate-300 font-medium">Mark Wilson</div>
              </div>
              <div className="text-xs text-slate-500 font-medium italic mt-2">and {Math.max(0, absent - 2)} others...</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
