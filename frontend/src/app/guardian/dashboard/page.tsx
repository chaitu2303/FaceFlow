"use client";

import { CheckCircle2, AlertTriangle, FileText } from "lucide-react";

export default function GuardianDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">John's Status</h1>
        <p className="text-slate-500 mt-1 text-sm">Real-time overview of your child's presence.</p>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 flex items-center gap-6">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-emerald-900 tracking-tight">Present Today</h2>
          <p className="text-emerald-700 mt-1 font-medium">Last seen at 09:02 AM in Room A204 (Database Management).</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200/60 p-6 shadow-sm flex flex-col">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Overall Attendance</div>
          <div className="text-4xl font-bold tracking-tight text-slate-900 mb-4">91%</div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-auto">
            <div className="h-full bg-emerald-500 rounded-full w-[91%]" />
          </div>
        </div>

        <div className="col-span-2 bg-white rounded-3xl border border-slate-200/60 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-slate-900">Recent Leave Requests</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <FileText className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <div className="font-medium text-sm text-slate-900">Internship Leave</div>
                  <div className="text-xs text-slate-500 mt-0.5">Oct 14 - Oct 16</div>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-wider rounded-md border border-amber-100">Pending</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <FileText className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <div className="font-medium text-sm text-slate-900">Medical Leave</div>
                  <div className="text-xs text-slate-500 mt-0.5">Sep 01 - Sep 03</div>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider rounded-md border border-emerald-100">Approved</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
