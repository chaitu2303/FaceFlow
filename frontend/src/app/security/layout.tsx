"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Users, FileLock2, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const NAV_ITEMS = [
    { icon: <ShieldAlert />, label: "Threat Radar", href: "/security/threats" },
    { icon: <Users />, label: "Visitor Logs", href: "/security/visitors" },
    { icon: <FileLock2 />, label: "Audit Trail", href: "/security/audit" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans flex flex-col md:flex-row overflow-hidden">
      
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-500 text-white rounded-md flex items-center justify-center font-bold tracking-tighter text-[10px] shadow-[0_0_15px_rgba(59,130,246,0.5)]">FF</div>
            <span className="font-semibold text-sm tracking-tight text-white">Security Center</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto hidden md:block">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Navigation</div>
          {NAV_ITEMS.map(item => (
            <Link key={item.href} href={item.href}>
              <div className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                pathname === item.href 
                  ? "bg-slate-800 text-white shadow-sm border border-slate-700" 
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}>
                <div className={`w-4 h-4 ${pathname === item.href ? "text-blue-400" : ""}`}>{item.icon}</div>
                {item.label}
              </div>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 hidden md:block">
          <div className="flex items-center gap-3 p-2 hover:bg-slate-800/50 rounded-xl transition-colors">
            <div className="w-9 h-9 bg-slate-800 text-slate-300 rounded-full flex items-center justify-center text-xs font-bold border border-slate-700">SO</div>
            <div className="text-sm flex-1">
              <div className="font-medium text-slate-200">Security Officer</div>
              <div className="text-xs text-slate-500">Command Center</div>
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

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
        <header className="h-16 border-b border-slate-800/60 flex items-center justify-between px-8 sticky top-0 z-10 hidden md:flex">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-white capitalize">{pathname.split('/').pop()?.replace("-", " ")}</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <motion.div 
            key={pathname}
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            className="max-w-5xl mx-auto"
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
