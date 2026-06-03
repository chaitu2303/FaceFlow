"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ShieldAlert, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate Backend connection for now
    // Example: fetch('http://localhost:8000/api/v1/auth/register', { method: 'POST', body: JSON.stringify({name, email, password}) })
    setTimeout(() => {
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900 relative overflow-hidden p-4">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100 rounded-full blur-[100px] opacity-50 pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-[100px] opacity-60 pointer-events-none -translate-x-1/3 translate-y-1/3" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md p-10 bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] shadow-xl z-10"
      >
        {!isSuccess ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-light tracking-tight text-slate-800">Face<span className="font-bold text-blue-600">Flow</span></h1>
              <p className="text-slate-500 mt-2 text-sm">Student Account Registration</p>
            </div>

            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 mb-6 flex gap-3 text-sm text-amber-800">
              <ShieldAlert className="w-5 h-5 flex-shrink-0 text-amber-600" />
              <p>New accounts require manual approval by an administrator before biometric enrollment.</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                <input 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 shadow-sm"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Institutional Email</label>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 shadow-sm"
                  placeholder="john.doe@enterprise.edu"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 shadow-sm"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </div>

              <button 
                type="submit"
                className="w-full py-4 mt-4 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
              >
                Submit for Approval
              </button>

              <div className="text-center mt-6">
                <button 
                  type="button" 
                  onClick={() => router.push("/login")}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Already have an account? Sign in
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-100 shadow-sm">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Registration Submitted</h2>
            <p className="text-slate-500 mb-8">Your account has been placed in the approval queue. You will be notified via email once an administrator verifies your identity.</p>
            <button 
              onClick={() => router.push("/login")}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors shadow-sm"
            >
              Return to Login
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
