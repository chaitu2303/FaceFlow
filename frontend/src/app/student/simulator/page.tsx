"use client";

import { useState } from "react";
import { Calculator, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function StudentSimulator() {
  const [classesToMiss, setClassesToMiss] = useState(0);
  
  // Base stats
  const currentTotal = 156;
  const currentPresent = 142;
  const currentPercentage = 91;

  // Calculation
  const projectedTotal = currentTotal + classesToMiss;
  const projectedPercentage = Math.round((currentPresent / projectedTotal) * 100);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Attendance Simulator</h1>
        <p className="text-slate-500 mt-1 text-sm">Predict your future attendance percentage before taking leave.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/60 p-8 shadow-sm flex flex-col md:flex-row gap-12">
        
        {/* Input Side */}
        <div className="flex-1 space-y-8">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900 mb-1">Current Standing</h3>
            <div className="text-xs text-slate-500 mb-4">Your actual recorded attendance to date.</div>
            
            <div className="flex justify-between items-end">
              <div>
                <div className="text-3xl font-bold text-slate-900">{currentPercentage}%</div>
                <div className="text-xs font-medium text-slate-500 mt-1">{currentPresent} / {currentTotal} Classes</div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-1">If I miss...</label>
            <div className="text-xs text-slate-500 mb-4">Select the number of upcoming consecutive classes you plan to miss.</div>
            
            <input 
              type="range" 
              min="0" 
              max="20" 
              value={classesToMiss} 
              onChange={(e) => setClassesToMiss(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
            />
            
            <div className="flex justify-between mt-3 text-xs font-bold text-slate-400">
              <span>0</span>
              <span>10</span>
              <span>20</span>
            </div>
          </div>
        </div>

        {/* Output Side */}
        <div className="flex-1 flex flex-col justify-center items-center p-8 bg-gradient-to-b from-[#F9FAFB] to-white rounded-2xl border border-slate-100 text-center relative overflow-hidden">
          
          <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Projected Attendance</div>
          
          <div className={`text-6xl font-black tracking-tight mb-4 ${
            projectedPercentage >= 75 ? 'text-emerald-500' : 'text-red-500'
          }`}>
            {projectedPercentage}%
          </div>
          
          <div className="text-sm font-medium text-slate-500 mb-8">
            {currentPresent} / {projectedTotal} Classes
          </div>

          {projectedPercentage >= 75 ? (
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200 text-sm font-semibold">
              <CheckCircle2 className="w-5 h-5" /> Safe Zone
            </div>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-xl border border-red-200 text-sm font-semibold">
              <AlertTriangle className="w-5 h-5" /> Detention Risk
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
