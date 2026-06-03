"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Smartphone, Monitor, ShieldAlert, Fingerprint, RefreshCcw } from "lucide-react";

export default function IdentityCenter() {
  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Face Identity Center</h1>
        <p className="text-slate-500 mt-1 text-sm">Manage your biometric profile and trusted devices.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Core Identity Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 bg-gradient-to-br from-slate-900 to-black rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 flex flex-col sm:flex-row gap-8 items-center sm:items-start">
            <div className="w-32 h-32 bg-slate-800 rounded-2xl border-4 border-slate-700/50 p-2 shrink-0 relative">
              {/* Dummy Image Placeholder */}
              <div className="w-full h-full bg-slate-700 rounded-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-80" />
                <div className="absolute inset-0 border-[2px] border-emerald-400/50 rounded-xl" />
                {/* Scanning line animation */}
                <motion.div 
                  animate={{ y: [0, 100, 0] }} 
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  className="absolute top-0 left-0 w-full h-1 bg-emerald-400/80 shadow-[0_0_10px_rgba(52,211,153,1)]"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-emerald-500 text-white p-1.5 rounded-full border-[3px] border-black">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                Status: Verified
              </div>
              <h2 className="text-2xl font-bold tracking-tight">John Doe</h2>
              <p className="text-slate-400 text-sm font-mono mt-1">ID: STU-2024-001</p>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Confidence Score</div>
                  <div className="text-xl font-bold text-emerald-400">98.9%</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Last Verified</div>
                  <div className="text-sm font-medium text-slate-200">Today, 09:01 AM</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => window.location.href = "/enroll"}
              className="flex-1 py-3 px-4 bg-white text-black font-semibold rounded-xl text-sm transition-colors hover:bg-slate-200 flex items-center justify-center gap-2"
            >
              <RefreshCcw className="w-4 h-4" /> Re-enroll Face
            </button>
            <button className="flex-1 py-3 px-4 bg-white/10 text-white border border-white/20 font-medium rounded-xl text-sm transition-colors hover:bg-white/20 flex items-center justify-center gap-2">
              Download ID Card
            </button>
          </div>
        </motion.div>

        {/* Registered Devices */}
        <div className="bg-white rounded-[2rem] p-6 border border-slate-200/60 shadow-sm flex flex-col">
          <h3 className="font-semibold text-slate-900 mb-1 flex items-center gap-2">
            <Fingerprint className="w-5 h-5 text-blue-500" /> Trusted Devices
          </h3>
          <p className="text-xs text-slate-500 mb-6">Devices authorized for mobile attendance and Liveness checks.</p>
          
          <div className="space-y-3 flex-1">
            <div className="p-3 bg-[#F9FAFB] border border-slate-200/80 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-900">Samsung S24 Ultra</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Primary Device</div>
                </div>
              </div>
              <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">ACTIVE</div>
            </div>

            <div className="p-3 bg-[#F9FAFB] border border-slate-200/80 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-900">iPhone 13</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Backup Device</div>
                </div>
              </div>
              <div className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">OFFLINE</div>
            </div>
            
            <div className="p-3 bg-[#F9FAFB] border border-slate-200/80 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                  <Monitor className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-900">Web Portal</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Current Session</div>
                </div>
              </div>
              <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">ACTIVE</div>
            </div>
          </div>
          
          <button className="w-full mt-4 py-2.5 bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2">
            <ShieldAlert className="w-3.5 h-3.5" /> Manage Access
          </button>
        </div>
      </div>
    </div>
  );
}
