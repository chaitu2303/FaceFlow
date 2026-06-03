"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Clock, CalendarDays, Calculator, Bell, User, LogOut, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const NAV_ITEMS = [
    { icon: <Activity />, label: "Home", href: "/student/home" },
    { icon: <Clock />, label: "Timeline", href: "/student/timeline" },
    { icon: <User />, label: "My Identity", href: "/student/identity" },
    { icon: <CalendarDays />, label: "Leave Hub", href: "/student/leave" },
    { icon: <Calculator />, label: "Simulator", href: "/student/simulator" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans flex flex-col md:flex-row overflow-hidden relative selection:bg-blue-200">
      
      {/* Vibrant Ambient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-blue-400/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/2 -left-20 w-[600px] h-[600px] bg-emerald-400/15 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-[100px]" />
      </div>

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white/40 backdrop-blur-3xl border-r border-white/60 flex flex-col relative z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="h-16 flex items-center px-6 border-b border-white/60">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-tr from-blue-600 to-indigo-500 text-white rounded-xl flex items-center justify-center font-bold tracking-tighter text-[11px] shadow-lg shadow-blue-500/20">FF</div>
            <span className="font-semibold text-sm tracking-tight text-slate-900">Student Space</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto hidden md:block">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Navigation</div>
          {NAV_ITEMS.map(item => (
            <Link key={item.href} href={item.href}>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer relative overflow-hidden group ${
                pathname === item.href 
                  ? "bg-white text-blue-600 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-white font-semibold" 
                  : "text-slate-500 hover:text-slate-900 hover:bg-white/50 font-medium"
              }`}>
                {pathname === item.href && (
                  <motion.div layoutId="studentNavGlow" className="absolute left-0 w-1 h-full bg-blue-500 rounded-r-full" />
                )}
                <div className={`w-4 h-4 transition-colors ${pathname === item.href ? "text-blue-500" : "group-hover:text-slate-700"}`}>{item.icon}</div>
                <span className="relative z-10">{item.label}</span>
              </motion.div>
            </Link>
          ))}
        </nav>

        {/* Mobile Nav */}
        <nav className="md:hidden flex overflow-x-auto p-4 gap-2 border-b border-white/60 bg-white/40 backdrop-blur-xl relative z-20">
          {NAV_ITEMS.map(item => (
            <Link key={item.href} href={item.href}>
              <div className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                pathname === item.href 
                  ? "bg-white text-blue-600 shadow-sm border border-white" 
                  : "text-slate-500 hover:text-slate-900"
              }`}>
                {item.label}
              </div>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/60 hidden md:block">
          <div className="flex items-center gap-3 p-2 hover:bg-white/50 rounded-xl transition-colors bg-white/20 border border-white/40 shadow-sm">
            <div className="w-9 h-9 bg-gradient-to-tr from-blue-100 to-indigo-50 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold border border-white">JD</div>
            <div className="text-sm flex-1">
              <div className="font-semibold text-slate-900">John Doe</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">CS 3rd Year</div>
            </div>
            <button 
              onClick={() => {
                sessionStorage.clear();
                localStorage.clear();
                window.location.href = "/login";
              }}
              className="p-2 -mr-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        {/* Topbar */}
        <header className="h-16 bg-white/40 backdrop-blur-2xl border-b border-white/60 flex items-center justify-between px-8 sticky top-0 z-20 hidden md:flex shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900 capitalize tracking-tight">{pathname.split('/').pop()?.replace("-", " ")}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-xs font-bold tracking-wide flex items-center gap-1.5 shadow-[0_4px_12px_rgba(79,70,229,0.2)]">
              <Sparkles className="w-3.5 h-3.5" /> Premium AI
            </motion.button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/80 text-slate-600 transition-colors relative bg-white/40 border border-white">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white shadow-sm"></span>
            </button>
            <div className="w-px h-5 bg-slate-300/50 mx-2"></div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Safe Margin: <span className="text-emerald-600">14 classes</span></span>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 no-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div 
              key={pathname}
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="max-w-4xl mx-auto"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
