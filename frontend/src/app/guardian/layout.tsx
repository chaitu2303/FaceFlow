"use client";

import { motion } from "framer-motion";
import { Activity, Bell, MapPin, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GuardianLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const NAV_ITEMS = [
    { icon: <Activity />, label: "Dashboard", href: "/guardian/dashboard" },
    { icon: <Bell />, label: "Notifications", href: "/guardian/notifications" },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-900 font-sans flex flex-col md:flex-row overflow-hidden">
      
      <aside className="w-full md:w-64 bg-white border-r border-slate-200/60 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black text-white rounded-md flex items-center justify-center font-bold tracking-tighter text-[10px]">FF</div>
            <span className="font-semibold text-sm tracking-tight text-slate-900">Guardian App</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto hidden md:block">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">Navigation</div>
          {NAV_ITEMS.map(item => (
            <Link key={item.href} href={item.href}>
              <div className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                pathname === item.href 
                  ? "bg-slate-100 text-slate-900 shadow-sm border border-slate-200/50" 
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              }`}>
                <div className={`w-4 h-4 ${pathname === item.href ? "text-slate-900" : ""}`}>{item.icon}</div>
                {item.label}
              </div>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 hidden md:block">
          <div className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition-colors">
            <div className="w-9 h-9 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-xs font-bold">MD</div>
            <div className="text-sm flex-1">
              <div className="font-medium text-slate-900">Mary Doe</div>
              <div className="text-xs text-slate-500">Parent of John</div>
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

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="h-16 bg-white/60 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-8 sticky top-0 z-10 hidden md:flex">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-900 capitalize">{pathname.split('/').pop()?.replace("-", " ")}</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <motion.div 
            key={pathname}
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            className="max-w-4xl mx-auto"
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
