"use client";

import { useEffect, useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { Users, GraduationCap, Building2, User, AlertCircle } from "lucide-react";

type Role = "student" | "faculty" | "guardian" | "admin";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isTimeout = searchParams.get("timeout") === "true";
  
  const [activeRole, setActiveRole] = useState<Role>("student");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const ROLES: { id: Role; label: string; icon: React.ReactNode; placeholder: string; dest: string }[] = [
    { id: "student", label: "Student", icon: <GraduationCap className="w-4 h-4" />, placeholder: "e.g., STU-2024", dest: "/student/home" },
    { id: "faculty", label: "Faculty", icon: <Users className="w-4 h-4" />, placeholder: "e.g., FAC-091", dest: "/faculty/live" },
    { id: "guardian", label: "Guardian", icon: <User className="w-4 h-4" />, placeholder: "e.g., PRNT-552", dest: "/guardian/dashboard" },
    { id: "admin", label: "Admin", icon: <Building2 className="w-4 h-4" />, placeholder: "Admin Email", dest: "/dashboard" },
  ];

  const currentRole = ROLES.find(r => r.id === activeRole)!;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      // In a real app, you would set an HttpOnly cookie or secure token here.
      // We will rely on our simulated SessionManager for the frontend timeout demo.
      if (keepSignedIn) {
        localStorage.setItem("faceflow_session", "active");
      } else {
        sessionStorage.setItem("faceflow_session", "active");
      }
      
      router.push(currentRole.dest);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB] text-slate-900 relative overflow-hidden font-sans selection:bg-slate-200 p-4">
      
      {/* Ambient background */}
      <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-slate-100 to-transparent opacity-60 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[100px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[420px] z-10"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-black/10">
            <span className="font-bold text-xl tracking-tighter">F<span className="text-white/60">F</span></span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Sign in to FaceFlow</h1>
          <p className="text-slate-500 mt-2 text-sm font-medium">Select your portal to continue.</p>
        </div>

        {isTimeout && (
          <div className="mb-6 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-medium border border-red-100 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            Your session expired due to inactivity. Please sign in again.
          </div>
        )}

        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.04)]">
          
          {/* Role Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-2xl mb-8">
            {ROLES.map(role => (
              <button
                key={role.id}
                onClick={() => setActiveRole(role.id)}
                className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                  activeRole === role.id 
                    ? "bg-white text-slate-900 shadow-sm" 
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                }`}
              >
                {role.icon}
                {role.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                {currentRole.label} ID
              </label>
              <input 
                type="text" 
                required
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder={currentRole.placeholder}
                className="w-full bg-[#F9FAFB] border border-slate-200/80 rounded-xl px-4 py-3.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-slate-400 transition-all"
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Password
                </label>
                <a href="#" className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">Forgot?</a>
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#F9FAFB] border border-slate-200/80 rounded-xl px-4 py-3.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-slate-400 transition-all"
              />
            </div>

            <div className="flex items-center gap-2 pt-2 pb-4">
              <input 
                type="checkbox" 
                id="keep-signed-in"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-black focus:ring-black"
              />
              <label htmlFor="keep-signed-in" className="text-sm text-slate-600 cursor-pointer select-none">
                Keep me signed in
              </label>
            </div>

            <button 
              type="submit"
              disabled={isAuthenticating}
              className="w-full py-4 bg-black hover:bg-slate-800 disabled:bg-slate-400 text-white font-medium rounded-xl transition-all shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] disabled:shadow-none flex items-center justify-center gap-2"
            >
              {isAuthenticating ? "Authenticating..." : `Sign In as ${currentRole.label}`}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
