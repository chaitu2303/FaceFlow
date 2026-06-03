"use client";

import { motion } from "framer-motion";
import { FileLock2, ShieldAlert, Key, Zap, CheckCircle2 } from "lucide-react";

export default function AuditTrail() {
  const events = [
    { id: "EVT-9920", type: "Security Alert", icon: <ShieldAlert className="w-4 h-4" />, msg: "Multiple face spoofing attempts detected on mobile device.", user: "STU-001 (Attempt)", time: "Just now", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
    { id: "EVT-9919", type: "Access Control", icon: <Key className="w-4 h-4" />, msg: "Server room electronic lock overridden by Admin.", user: "Admin (A-102)", time: "12 mins ago", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
    { id: "EVT-9918", type: "System Event", icon: <Zap className="w-4 h-4" />, msg: "Camera grid reboot initiated in Block B.", user: "System", time: "1 hour ago", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
    { id: "EVT-9917", type: "Compliance", icon: <CheckCircle2 className="w-4 h-4" />, msg: "Daily attendance payload encrypted and sent to central ERP.", user: "System", time: "2 hours ago", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  ];

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-2">
          <FileLock2 className="w-6 h-6 text-purple-400" />
          Audit Trail
        </h1>
        <p className="text-slate-400 mt-1 text-sm">Immutable log of system events, access controls, and security alerts.</p>
      </header>

      <div className="relative pl-6">
        {/* Timeline Line */}
        <div className="absolute top-0 bottom-0 left-[35px] w-[2px] bg-slate-800" />

        <div className="space-y-8">
          {events.map((evt, i) => (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              key={evt.id} 
              className="relative flex gap-6"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border z-10 ${evt.bg} ${evt.color}`}>
                {evt.icon}
              </div>
              
              <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg hover:border-slate-700 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold uppercase tracking-wider ${evt.color}`}>{evt.type}</span>
                    <span className="text-xs text-slate-500 font-mono">{evt.id}</span>
                  </div>
                  <span className="text-xs font-medium text-slate-500">{evt.time}</span>
                </div>
                <p className="text-slate-300 text-sm mb-3">{evt.msg}</p>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-950/50 w-fit px-3 py-1.5 rounded-lg border border-slate-800/80">
                  <span className="text-slate-400">Initiator:</span> {evt.user}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
