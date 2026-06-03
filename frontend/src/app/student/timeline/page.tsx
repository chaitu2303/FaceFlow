"use client";

import { CheckCircle2, XCircle, Clock } from "lucide-react";

export default function StudentTimeline() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Attendance Timeline</h1>
        <p className="text-slate-500 mt-1 text-sm">A chronological view of your presence across all courses.</p>
      </div>

      <div className="relative border-l border-slate-200 ml-4 space-y-12 pb-12">
        
        {/* Today Group */}
        <div className="relative">
          <div className="absolute -left-1.5 top-1 w-3 h-3 bg-black rounded-full ring-4 ring-white" />
          <div className="pl-8">
            <h2 className="text-sm font-bold text-slate-900 mb-4 tracking-wider uppercase">Today</h2>
            <div className="space-y-4">
              <TimelineCard 
                course="Database Management" 
                time="09:00 AM - 10:30 AM" 
                status="Present" 
                icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                border="border-emerald-200"
                bg="bg-emerald-50"
              />
              <TimelineCard 
                course="Operating Systems" 
                time="11:00 AM - 12:30 PM" 
                status="Present" 
                icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                border="border-emerald-200"
                bg="bg-emerald-50"
              />
            </div>
          </div>
        </div>

        {/* Yesterday Group */}
        <div className="relative">
          <div className="absolute -left-1.5 top-1 w-3 h-3 bg-slate-300 rounded-full ring-4 ring-white" />
          <div className="pl-8">
            <h2 className="text-sm font-bold text-slate-500 mb-4 tracking-wider uppercase">Yesterday</h2>
            <div className="space-y-4">
              <TimelineCard 
                course="Computer Networks" 
                time="09:00 AM - 10:30 AM" 
                status="Late (12 mins)" 
                icon={<Clock className="w-5 h-5 text-amber-500" />}
                border="border-amber-200"
                bg="bg-amber-50"
              />
              <TimelineCard 
                course="Artificial Intelligence" 
                time="02:00 PM - 04:00 PM" 
                status="Absent" 
                icon={<XCircle className="w-5 h-5 text-red-500" />}
                border="border-red-200"
                bg="bg-red-50"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function TimelineCard({ course, time, status, icon, border, bg }: any) {
  return (
    <div className={`flex items-center gap-4 p-4 rounded-2xl border ${border} bg-white shadow-sm transition-all hover:shadow-md`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${bg}`}>
        {icon}
      </div>
      <div>
        <div className="font-semibold text-sm text-slate-900">{course}</div>
        <div className="text-xs text-slate-500 mt-0.5">{time}</div>
      </div>
      <div className="ml-auto text-xs font-bold text-slate-700">
        {status}
      </div>
    </div>
  );
}
