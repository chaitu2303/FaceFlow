"use client";

import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown, Mail, AlertCircle } from "lucide-react";

export default function FacultyRiskRadar() {
  const atRiskStudents = [
    {
      id: "STU-001",
      name: "John Doe",
      course: "Database Management",
      currentAttendance: 72,
      predictedAttendance: 68,
      missedConsecutive: 3,
    },
    {
      id: "STU-089",
      name: "Michael Smith",
      course: "Database Management",
      currentAttendance: 74,
      predictedAttendance: 71,
      missedConsecutive: 2,
    },
    {
      id: "STU-114",
      name: "David Clark",
      course: "Operating Systems",
      currentAttendance: 65,
      predictedAttendance: 60,
      missedConsecutive: 4,
    },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Risk Radar</h1>
        <p className="text-slate-500 mt-2 text-sm">Monitor students who are falling below the 75% attendance mandate in your courses.</p>
      </header>

      {/* Summary Banner */}
      <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex items-start gap-4 shadow-sm">
        <div className="bg-white p-3 rounded-xl shadow-sm text-red-500 shrink-0">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-semibold text-red-900 text-lg">Action Required</h3>
          <p className="text-red-700/80 text-sm mt-1">
            You have {atRiskStudents.length} students currently in the critical zone. Early intervention is recommended to prevent academic detention.
          </p>
        </div>
      </div>

      {/* Student List */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Current %</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">AI Forecast</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {atRiskStudents.map((student, idx) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={student.id} 
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-sm shrink-0">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 text-sm">{student.name}</div>
                        <div className="text-xs text-slate-500 font-mono mt-0.5">{student.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                    {student.course}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-sm ${student.currentAttendance < 75 ? 'text-red-600' : 'text-amber-600'}`}>
                        {student.currentAttendance}%
                      </span>
                      {student.missedConsecutive >= 3 && (
                        <div className="flex items-center gap-1 text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold uppercase tracking-wider" title={`${student.missedConsecutive} consecutive absences`}>
                          <AlertCircle className="w-3 h-3" /> AWOL
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <TrendingDown className="w-4 h-4 text-red-400" />
                      <span className="font-medium">{student.predictedAttendance}% predicted</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-black hover:bg-slate-800 text-white text-xs font-medium rounded-lg transition-colors shadow-sm">
                      <Mail className="w-3.5 h-3.5" />
                      Send Warning
                    </button>
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
