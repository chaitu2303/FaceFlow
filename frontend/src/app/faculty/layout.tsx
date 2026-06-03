"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Users, FileCheck2, AlertTriangle, LogOut, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FacultyLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const NAV_ITEMS = [
    { icon: <Users />, label: "Live Class", href: "/faculty/live" },
    { icon: <FileCheck2 />, label: "Leave Approvals", href: "/faculty/leaves" },
    { icon: <AlertTriangle />, label: "Risk Radar", href: "/faculty/risk" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans flex flex-col md:flex-row overflow-hidden relative selection:bg-emerald-500/30">
      
      {/* Sophisticated Ambient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute -bottom-32 left-0 w-[800px] h-[800px] bg-teal-500/10 rounded-full blur-[150px]" />
      </div>

      <aside className="w-full md:w-64 bg-slate-950/50 backdrop-blur-3xl border-r border-slate-800/60 flex flex-col relative z-20 shadow-[4px_0_24px_rgba(0,0,0,0.2)]">
        <div className="h-16 flex items-center px-6 border-b border-slate-800/60">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-tr from-emerald-500 to-teal-400 text-white rounded-xl flex items-center justify-center font-bold tracking-tighter text-[11px] shadow-[0_0_15px_rgba(16,185,129,0.3)]">FF</div>
            <span className="font-semibold text-sm tracking-tight text-white">Faculty Portal</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto hidden md:block">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">Navigation</div>
          {NAV_ITEMS.map(item => (
            <Link key={item.href} href={item.href}>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer relative overflow-hidden group ${
                pathname === item.href 
                  ? "bg-emerald-500/10 text-emerald-400 shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-emerald-500/20 font-semibold" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 font-medium"
              }`}>
                {pathname === item.href && (
                  <motion.div layoutId="facultyNavGlow" className="absolute left-0 w-1 h-full bg-emerald-500 rounded-r-full shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                )}
                <div className={`w-4 h-4 transition-colors ${pathname === item.href ? "text-emerald-400" : "group-hover:text-slate-300"}`}>{item.icon}</div>
                <span className="relative z-10">{item.label}</span>
              </motion.div>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800/60 hidden md:block">
          <div className="flex items-center gap-3 p-2 hover:bg-slate-800/50 rounded-xl transition-colors bg-slate-900/50 border border-slate-800 shadow-sm">
            <div className="w-9 h-9 bg-gradient-to-tr from-emerald-500/20 to-teal-500/10 text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold border border-emerald-500/30">SM</div>
            <div className="text-sm flex-1">
              <div className="font-semibold text-slate-200">Dr. Sarah Miller</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Comp. Science</div>
            </div>
            <button 
              onClick={() => {
                sessionStorage.clear();
                localStorage.clear();
                window.location.href = "/login";
              }}
              className="p-2 -mr-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        <header className="h-16 bg-slate-950/40 backdrop-blur-2xl border-b border-slate-800/60 flex items-center justify-between px-8 sticky top-0 z-20 hidden md:flex shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white capitalize tracking-tight">{pathname.split('/').pop()?.replace("-", " ")}</span>
          </div>
          <div className="flex items-center gap-4">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-lg text-xs font-bold tracking-wide flex items-center gap-1.5 transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> AI Assisting
            </motion.button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8 no-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div 
              key={pathname}
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="max-w-5xl mx-auto"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
