"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings2, X, ShieldAlert, GraduationCap, Users, User, LayoutDashboard, KeyRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DemoSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Don't show on the login or enroll page if we want, but it's handy everywhere for demo
  const DEMO_ACCOUNTS = [
    { label: "Admin Console", role: "Super Admin", href: "/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: "Student App", role: "John Doe", href: "/student/home", icon: <GraduationCap className="w-4 h-4" /> },
    { label: "Faculty Portal", role: "Dr. Sarah", href: "/faculty/live", icon: <Users className="w-4 h-4" /> },
    { label: "Guardian App", role: "Mary Doe", href: "/guardian/dashboard", icon: <User className="w-4 h-4" /> },
    { label: "Security Center", role: "Security Chief", href: "/security/threats", icon: <ShieldAlert className="w-4 h-4" /> },
    { label: "Sign Out", role: "Back to Login", href: "/login", icon: <KeyRound className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-72 bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-4 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] mb-4"
          >
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">Demo Navigator</h3>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-700 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1.5">
              {DEMO_ACCOUNTS.map((acc, idx) => (
                <Link key={idx} href={acc.href} onClick={() => setIsOpen(false)}>
                  <div className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${
                    pathname.startsWith(acc.href) && acc.href !== '/login'
                      ? "bg-slate-900 text-white shadow-md"
                      : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-100 hover:border-slate-200"
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      pathname.startsWith(acc.href) && acc.href !== '/login' ? "bg-white/20" : "bg-slate-100"
                    }`}>
                      {acc.icon}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{acc.label}</div>
                      <div className={`text-[10px] font-medium uppercase tracking-wider ${
                        pathname.startsWith(acc.href) && acc.href !== '/login' ? "text-white/60" : "text-slate-400"
                      }`}>{acc.role}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-black hover:bg-slate-800 text-white rounded-full shadow-xl shadow-black/20 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Settings2 className="w-6 h-6" />}
      </button>
    </div>
  );
}
