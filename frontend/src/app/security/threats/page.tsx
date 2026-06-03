"use client";

import { AlertTriangle, ShieldCheck, Fingerprint } from "lucide-react";

export default function SecurityThreats() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Threat Radar</h1>
          <p className="text-slate-400 mt-1 text-sm">Real-time biometric spoof and intrusion detection.</p>
        </div>
        <div className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-xs font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          2 Active Threats
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Fingerprint className="w-4 h-4" /> Spoof Attempts (24h)
          </div>
          <div className="text-4xl font-bold text-white mb-2">14</div>
          <p className="text-xs text-slate-400">Blocked by liveness engine.</p>
        </div>
        
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Suspicious Logins
          </div>
          <div className="text-4xl font-bold text-white mb-2">3</div>
          <p className="text-xs text-slate-400">Failed OTP or unusual IP.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> System Health
          </div>
          <div className="text-4xl font-bold text-emerald-400 mb-2">99.9%</div>
          <p className="text-xs text-slate-400">All edge cameras secure.</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-950/50 text-slate-400 border-b border-slate-800">
            <tr>
              <th className="px-6 py-4 font-medium uppercase text-[10px] tracking-wider">Timestamp</th>
              <th className="px-6 py-4 font-medium uppercase text-[10px] tracking-wider">Threat Type</th>
              <th className="px-6 py-4 font-medium uppercase text-[10px] tracking-wider">Source</th>
              <th className="px-6 py-4 font-medium uppercase text-[10px] tracking-wider">Resolution</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            <tr className="hover:bg-slate-800/50 transition-colors">
              <td className="px-6 py-4 font-mono text-xs">Today, 10:14 AM</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span> 2D Photo Spoof
                </div>
              </td>
              <td className="px-6 py-4">Cam A204 (DB Room)</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[10px] font-bold">Auto-Blocked</span>
              </td>
            </tr>
            <tr className="hover:bg-slate-800/50 transition-colors">
              <td className="px-6 py-4 font-mono text-xs">Today, 08:30 AM</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span> Unknown Face Match
                </div>
              </td>
              <td className="px-6 py-4">Hostel Entry B</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-slate-800 text-slate-400 border border-slate-700 rounded text-[10px] font-bold">Flagged for Review</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
