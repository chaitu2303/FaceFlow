"use client";

import { motion } from "framer-motion";
import { Users, Search, Clock, CheckCircle, XCircle } from "lucide-react";

export default function VisitorLogs() {
  const visitors = [
    { id: "V-10492", name: "Dr. Robert Ford", company: "Delos Inc", host: "Prof. Arnold", status: "Checked In", time: "09:15 AM", type: "Guest Lecture" },
    { id: "V-10493", name: "Jane Smith", company: "TechCorp", host: "Admin Dept", status: "Checked Out", time: "10:30 AM", type: "Vendor" },
    { id: "V-10494", name: "Parents of STU-114", company: "N/A", host: "Dean's Office", status: "Pending", time: "11:45 AM", type: "Meeting" },
  ];

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-400" />
            Visitor Logs
          </h1>
          <p className="text-slate-400 mt-1 text-sm">Real-time tracking of non-institutional personnel on campus.</p>
        </div>
        
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search visitors..." 
            className="w-full md:w-64 pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-500"
          />
        </div>
      </header>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/50">
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Visitor</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Purpose / Type</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Host</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Time</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {visitors.map((v, i) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={v.id} 
                  className="hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-200 text-sm">{v.name}</div>
                    <div className="text-xs text-slate-500 font-mono mt-0.5">{v.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-300">{v.type}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{v.company}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{v.host}</td>
                  <td className="px-6 py-4 text-sm text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {v.time}
                  </td>
                  <td className="px-6 py-4">
                    {v.status === "Checked In" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" /> {v.status}
                      </span>
                    )}
                    {v.status === "Checked Out" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700 text-xs font-medium">
                        <CheckCircle className="w-3.5 h-3.5" /> {v.status}
                      </span>
                    )}
                    {v.status === "Pending" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-medium">
                        <Clock className="w-3.5 h-3.5" /> {v.status}
                      </span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
