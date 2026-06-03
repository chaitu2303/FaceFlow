"use client";

import { motion } from "framer-motion";
import { ShieldCheck, FileText, Database, KeyRound, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BiometricConsent() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-8 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full bg-white p-10 rounded-3xl border border-slate-200 shadow-xl"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100">
            <ShieldCheck className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-medium text-slate-800">Biometric Usage Agreement</h1>
            <p className="text-slate-500">Enterprise Mandatory Consent Form</p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-slate-600 mb-8 max-h-96 overflow-y-auto pr-4 custom-scrollbar">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4 shadow-inner">
            <h3 className="font-medium flex items-center gap-2 text-slate-800"><FileText className="w-4 h-4 text-blue-500"/> 1. Data Collection</h3>
            <p>FaceFlow collects your facial imagery solely for the purpose of generating a 512-dimensional mathematical embedding. The original images are discarded immediately after embedding generation and are never stored on our servers.</p>
            
            <h3 className="font-medium flex items-center gap-2 text-slate-800"><Database className="w-4 h-4 text-emerald-500"/> 2. Data Retention & Deletion</h3>
            <p>Your biometric embedding is retained for the duration of your active enrollment within your specific Institutional Tenant. Upon graduation or account deactivation, your biometric vault is cryptographically destroyed within 180 days.</p>

            <h3 className="font-medium flex items-center gap-2 text-slate-800"><KeyRound className="w-4 h-4 text-amber-500"/> 3. Encryption Standard</h3>
            <p>Your biometric data is secured using AES-256 Fernet encryption, with active hardware-backed key rotation mechanisms securing the primary database. Data is mathematically isolated from other institutions.</p>

            <h3 className="font-medium flex items-center gap-2 text-red-600"><AlertTriangle className="w-4 h-4"/> 4. Audit & Revocation Rights</h3>
            <p>You reserve the right to revoke this consent at any time via the Mobile Companion Portal. Doing so will permanently delete your biometric vault and require manual attendance marking via faculty override.</p>
          </div>
        </div>

        <label className="flex items-start gap-4 cursor-pointer mb-8 bg-blue-50/50 p-4 rounded-xl border border-blue-100 hover:bg-blue-50 transition-colors">
          <input 
            type="checkbox" 
            className="w-5 h-5 mt-0.5 rounded border-slate-300 bg-white text-blue-600 focus:ring-blue-500"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span className="text-sm text-slate-700">
            I acknowledge that I have read the Biometric Usage Agreement and legally consent to the generation, encryption, and storage of my facial embedding for attendance automation purposes under FaceFlow's Privacy Policy.
          </span>
        </label>

        <div className="flex justify-end gap-4">
          <button 
            onClick={() => router.push("/login")}
            className="px-6 py-3 text-slate-500 hover:text-slate-800 font-medium transition-colors"
          >
            Decline
          </button>
          <button 
            onClick={() => router.push("/enroll")}
            disabled={!agreed}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-medium rounded-xl transition-colors shadow-sm"
          >
            Accept & Continue
          </button>
        </div>
      </motion.div>
    </div>
  );
}
