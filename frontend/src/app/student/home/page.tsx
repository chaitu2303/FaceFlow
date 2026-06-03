"use client";

import { CheckCircle2, AlertCircle, Sparkles, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function StudentHome() {
  return (
    <div className="space-y-8">
      
      {/* Greeting Banner */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 drop-shadow-sm">Good Morning, John</h1>
        <p className="text-slate-600 mt-1 text-sm font-medium">Here is your presence summary for today.</p>
      </motion.div>

      {/* Today's Status */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        whileHover={{ scale: 1.01 }}
        className="bg-white/60 backdrop-blur-2xl rounded-3xl border border-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-6 group relative overflow-hidden cursor-default"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all duration-300">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 drop-shadow-md" />
        </div>
        <div className="relative z-10">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Present Today</h2>
          <p className="text-sm text-slate-600 font-medium">Your first class (Database Management) was marked at 09:02 AM.</p>
        </div>
      </motion.div>

      {/* Attendance Wallet */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02, rotateY: 2, rotateX: 2 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-[0_20px_40px_rgba(79,70,229,0.3)] cursor-pointer"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[40px] pointer-events-none mix-blend-overlay" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-400/30 rounded-full blur-[40px] pointer-events-none mix-blend-overlay" />
          
          <div className="flex items-center gap-2 text-blue-200 mb-6 relative z-10" style={{ transform: 'translateZ(20px)' }}>
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Attendance Wallet</span>
          </div>
          
          <div className="text-6xl font-black tracking-tighter mb-2 drop-shadow-lg relative z-10" style={{ transform: 'translateZ(40px)' }}>91%</div>
          <div className="text-sm text-blue-100 font-semibold mb-8 relative z-10" style={{ transform: 'translateZ(20px)' }}>Current Overall Presence</div>

          <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden mb-3 relative z-10 backdrop-blur-sm border border-white/10" style={{ transform: 'translateZ(30px)' }}>
            <motion.div 
              initial={{ width: 0 }} animate={{ width: "91%" }} transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" 
            />
          </div>
          <div className="flex justify-between text-xs font-bold text-blue-200 relative z-10" style={{ transform: 'translateZ(20px)' }}>
            <span>75% Minimum</span>
            <span>100% Target</span>
          </div>
        </motion.div>

        <div className="flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white/60 backdrop-blur-2xl rounded-3xl border border-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex-1 flex flex-col justify-center relative overflow-hidden group"
          >
            <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-[40px] group-hover:bg-emerald-400/20 transition-all duration-500" />
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 relative z-10">Safe Zone Margin</div>
            <div className="text-4xl font-black tracking-tighter text-slate-900 relative z-10">14 <span className="text-lg text-slate-500 font-semibold tracking-normal">Classes</span></div>
            <p className="text-xs text-slate-600 mt-2 font-medium relative z-10">You can miss 14 classes before dropping below 75%.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white/60 backdrop-blur-2xl rounded-3xl border border-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex-1 flex flex-col justify-center relative overflow-hidden group"
          >
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-blue-400/10 rounded-full blur-[40px] group-hover:bg-blue-400/20 transition-all duration-500" />
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 relative z-10">Goal Target (95%)</div>
            <div className="text-4xl font-black tracking-tighter text-slate-900 flex items-baseline gap-2 relative z-10">
              9 <span className="text-lg text-slate-500 font-semibold tracking-normal">Classes</span>
            </div>
            <p className="text-xs text-slate-600 mt-2 font-medium relative z-10">Consecutive presence required to reach 95%.</p>
          </motion.div>
        </div>
      </div>

      {/* Upcoming Classes */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <h3 className="text-xl font-bold text-slate-900 mb-6 drop-shadow-sm tracking-tight">Upcoming Schedule</h3>
        <div className="space-y-4">
          <ClassRow time="02:00 PM" course="Artificial Intelligence Lab" room="Lab 4" status="Upcoming" delay={0.7} />
          <ClassRow time="04:00 PM" course="Seminar" room="Auditorium" status="Upcoming" delay={0.8} />
        </div>
      </motion.div>

    </div>
  );
}

function ClassRow({ time, course, room, status, delay }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay }}
      whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.8)" }}
      className="flex items-center justify-between p-5 bg-white/50 backdrop-blur-md rounded-2xl border border-white shadow-sm hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="flex items-center gap-6">
        <div className="w-20 text-right text-sm font-bold text-slate-900">{time}</div>
        <div className="w-px h-10 bg-slate-200 group-hover:bg-blue-200 transition-colors"></div>
        <div>
          <div className="font-bold text-sm text-slate-900">{course}</div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">{room}</div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="px-3 py-1.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-slate-200 group-hover:bg-white group-hover:border-blue-200 transition-colors">
          {status}
        </div>
        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
      </div>
    </motion.div>
  );
}
