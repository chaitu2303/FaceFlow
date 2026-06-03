"use client";

import { CheckCircle2, XCircle, FileText, Download } from "lucide-react";

export default function FacultyLeaves() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Leave Approvals</h1>
          <p className="text-slate-500 mt-1 text-sm">Review and action student leave requests.</p>
        </div>
        <div className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold">
          3 Pending
        </div>
      </div>

      <div className="space-y-4">
        {/* Request 1 */}
        <div className="bg-white rounded-3xl border border-slate-200/60 p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-lg font-bold text-slate-700 shrink-0">JD</div>
          
          <div className="flex-1">
            <h3 className="text-base font-semibold text-slate-900">John Doe <span className="text-xs text-slate-400 font-normal ml-2">CS 3rd Year</span></h3>
            <div className="flex gap-2 mt-2">
              <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider rounded-md">Internship</span>
              <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-md">Oct 14 - Oct 16</span>
            </div>
            <p className="text-sm text-slate-600 mt-3 max-w-xl">
              "Attending the National Hackathon at MIT Campus. Selected for the final round representing our college."
            </p>
          </div>

          <div className="flex flex-col gap-2 shrink-0 w-full md:w-auto">
            <button className="flex items-center justify-center gap-2 w-full md:w-32 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium rounded-xl transition-colors text-sm">
              <CheckCircle2 className="w-4 h-4" /> Approve
            </button>
            <button className="flex items-center justify-center gap-2 w-full md:w-32 py-2 bg-red-50 hover:bg-red-100 text-red-700 font-medium rounded-xl transition-colors text-sm">
              <XCircle className="w-4 h-4" /> Reject
            </button>
          </div>
        </div>

        {/* Request 2 */}
        <div className="bg-white rounded-3xl border border-slate-200/60 p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-lg font-bold text-slate-700 shrink-0">AS</div>
          
          <div className="flex-1">
            <h3 className="text-base font-semibold text-slate-900">Alice Smith <span className="text-xs text-slate-400 font-normal ml-2">EE 2nd Year</span></h3>
            <div className="flex gap-2 mt-2">
              <span className="px-2.5 py-1 bg-rose-50 text-rose-600 text-[10px] font-bold uppercase tracking-wider rounded-md">Medical</span>
              <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-md">Oct 12 - Oct 13</span>
            </div>
            <p className="text-sm text-slate-600 mt-3 max-w-xl">
              "Viral fever. Doctor advised 2 days of rest."
            </p>
            <button className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 mt-3 hover:underline">
              <Download className="w-3 h-3" /> View Medical Certificate.pdf
            </button>
          </div>

          <div className="flex flex-col gap-2 shrink-0 w-full md:w-auto">
            <button className="flex items-center justify-center gap-2 w-full md:w-32 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium rounded-xl transition-colors text-sm">
              <CheckCircle2 className="w-4 h-4" /> Approve
            </button>
            <button className="flex items-center justify-center gap-2 w-full md:w-32 py-2 bg-red-50 hover:bg-red-100 text-red-700 font-medium rounded-xl transition-colors text-sm">
              <XCircle className="w-4 h-4" /> Reject
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
