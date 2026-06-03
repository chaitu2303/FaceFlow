"use client";

import { UploadCloud, FileText, CheckCircle2 } from "lucide-react";

export default function StudentLeaveHub() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Leave Hub</h1>
        <p className="text-slate-500 mt-1 text-sm">Apply for leave and track approval status.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Application Form */}
        <div className="bg-white rounded-3xl border border-slate-200/60 p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">New Application</h2>
          
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">Leave Type</label>
              <select className="w-full bg-[#F9FAFB] border border-slate-200/80 rounded-xl px-4 py-3 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-slate-400 transition-all appearance-none">
                <option>Medical / Sick Leave</option>
                <option>Emergency</option>
                <option>Internship / Placement</option>
                <option>Sports / Extracurricular</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">From</label>
                <input type="date" className="w-full bg-[#F9FAFB] border border-slate-200/80 rounded-xl px-4 py-3 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-slate-400 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">To</label>
                <input type="date" className="w-full bg-[#F9FAFB] border border-slate-200/80 rounded-xl px-4 py-3 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-slate-400 transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">Reason</label>
              <textarea 
                className="w-full bg-[#F9FAFB] border border-slate-200/80 rounded-xl px-4 py-3 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-slate-400 transition-all h-24 resize-none"
                placeholder="Detailed explanation..."
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">Supporting Documents</label>
              <div className="w-full border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors">
                <UploadCloud className="w-6 h-6 text-slate-400 mb-2" />
                <div className="text-xs font-medium text-slate-700">Upload Medical Certificate or Proof</div>
              </div>
            </div>

            <button className="w-full py-3.5 bg-black hover:bg-slate-800 text-white font-medium rounded-xl transition-all shadow-md">
              Submit Request
            </button>
          </div>
        </div>

        {/* History */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Recent Applications</h2>
          <div className="space-y-4">
            
            <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Internship Leave</div>
                    <div className="text-xs text-slate-500">Oct 14 - Oct 16</div>
                  </div>
                </div>
                <div className="px-2 py-1 bg-amber-50 text-amber-600 rounded text-xs font-bold border border-amber-100">
                  Pending HOD
                </div>
              </div>
              <p className="text-xs text-slate-500">Attending Hackathon at MIT Campus.</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-500 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Medical Leave</div>
                    <div className="text-xs text-slate-500">Sep 01 - Sep 03</div>
                  </div>
                </div>
                <div className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded text-xs font-bold border border-emerald-100 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Approved
                </div>
              </div>
              <p className="text-xs text-slate-500">Viral fever. Medical certificate attached and verified.</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
