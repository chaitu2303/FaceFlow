"use client";

import { Bell, Bus, AlertTriangle, ShieldCheck } from "lucide-react";

export default function GuardianNotifications() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Notifications</h1>
        <p className="text-slate-500 mt-1 text-sm">Automated alerts and campus updates.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/60 p-2 shadow-sm">
        
        <div className="p-4 hover:bg-slate-50 rounded-2xl transition-colors flex gap-4 cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Bus className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold text-sm text-slate-900">Smart Bus Boarding</div>
            <p className="text-sm text-slate-600 mt-0.5">John boarded Route 14 Campus Bus successfully.</p>
            <div className="text-xs text-slate-400 mt-2">Today, 08:15 AM</div>
          </div>
        </div>

        <div className="w-full h-px bg-slate-100 my-1"></div>

        <div className="p-4 hover:bg-slate-50 rounded-2xl transition-colors flex gap-4 cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold text-sm text-slate-900">Hostel Entry Logged</div>
            <p className="text-sm text-slate-600 mt-0.5">John entered the Mens Hostel Block B.</p>
            <div className="text-xs text-slate-400 mt-2">Yesterday, 08:30 PM</div>
          </div>
        </div>

        <div className="w-full h-px bg-slate-100 my-1"></div>

        <div className="p-4 hover:bg-slate-50 rounded-2xl transition-colors flex gap-4 cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold text-sm text-slate-900">Attendance Warning</div>
            <p className="text-sm text-slate-600 mt-0.5">John was marked absent for Artificial Intelligence. Overall attendance dropped to 91%.</p>
            <div className="text-xs text-slate-400 mt-2">Yesterday, 02:30 PM</div>
          </div>
        </div>

      </div>
    </div>
  );
}
