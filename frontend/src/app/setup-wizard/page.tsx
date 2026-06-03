"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Building2, Users, BookOpen, GraduationCap, Shield, Activity, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

const STEPS = [
  { id: "institution", title: "Institution Details", icon: <Building2 className="w-5 h-5" /> },
  { id: "departments", title: "Departments", icon: <Users className="w-5 h-5" /> },
  { id: "courses", title: "Courses", icon: <BookOpen className="w-5 h-5" /> },
  { id: "faculty", title: "Faculty Roster", icon: <GraduationCap className="w-5 h-5" /> },
  { id: "students", title: "Student Import", icon: <Users className="w-5 h-5" /> },
  { id: "policies", title: "Policies & Geo-fencing", icon: <Shield className="w-5 h-5" /> }
];

export default function SetupWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-900 font-sans selection:bg-slate-200 flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-slate-200/60 bg-white/60 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-bold tracking-tighter text-sm">FF</div>
          <span className="font-medium text-slate-900 text-sm tracking-tight">Workspace Setup</span>
        </div>
        <div className="text-xs font-medium text-slate-400">
          Step {currentStep + 1} of {STEPS.length}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center pt-20 pb-24 px-4">
        <div className="w-full max-w-[800px] flex gap-12">
          
          {/* Sidebar Navigation */}
          <div className="w-64 hidden md:block shrink-0">
            <div className="sticky top-32 space-y-2">
              {STEPS.map((step, idx) => (
                <div 
                  key={step.id}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    idx === currentStep 
                      ? "bg-white shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-slate-200/60 text-slate-900" 
                      : idx < currentStep
                        ? "text-slate-400"
                        : "text-slate-300"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    idx === currentStep ? "bg-slate-100 text-black" : 
                    idx < currentStep ? "text-emerald-500" : ""
                  }`}>
                    {idx < currentStep ? <CheckCircle2 className="w-5 h-5" /> : step.icon}
                  </div>
                  <span className={`text-sm font-medium ${idx === currentStep ? "font-semibold" : ""}`}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Step Content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="bg-white rounded-3xl border border-slate-200/60 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.04)] p-10 min-h-[500px] flex flex-col relative overflow-hidden"
              >
                {/* Step Content Renderers */}
                {currentStep === 0 && <InstitutionSetup />}
                {currentStep === 1 && <DepartmentSetup />}
                {currentStep === 2 && <PlaceholderSetup title="Courses" desc="Define curriculum and assign them to departments." />}
                {currentStep === 3 && <PlaceholderSetup title="Faculty Roster" desc="Invite professors and assign them to courses." />}
                {currentStep === 4 && <PlaceholderSetup title="Student Import" desc="Bulk import student manifest via CSV or API integration." />}
                {currentStep === 5 && <PoliciesSetup />}

                {/* Footer Controls */}
                <div className="mt-auto pt-10 flex items-center justify-between border-t border-slate-100">
                  <button 
                    onClick={handleBack}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      currentStep === 0 ? "opacity-0 pointer-events-none" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button 
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-2.5 bg-black hover:bg-slate-800 text-white rounded-xl text-sm font-medium transition-all shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5"
                  >
                    {currentStep === STEPS.length - 1 ? "Go Live" : "Continue"} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </main>
    </div>
  );
}

// Sub-components for specific steps

function InstitutionSetup() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Institution Details</h2>
        <p className="text-slate-500 mt-1 text-sm">Configure your primary workspace identity.</p>
      </div>
      
      <div className="space-y-5">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">Institution Name</label>
          <input type="text" className="w-full px-4 py-3 bg-[#F9FAFB] border border-slate-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-slate-400 transition-all text-slate-900 text-sm font-medium" placeholder="Stanford University" />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">Total Students</label>
            <input type="number" className="w-full px-4 py-3 bg-[#F9FAFB] border border-slate-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-slate-400 transition-all text-slate-900 text-sm font-medium" placeholder="15000" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">Total Faculty</label>
            <input type="number" className="w-full px-4 py-3 bg-[#F9FAFB] border border-slate-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-slate-400 transition-all text-slate-900 text-sm font-medium" placeholder="1200" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">Primary Domain</label>
          <div className="flex">
            <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-slate-200/80 bg-slate-50 text-slate-500 text-sm">@</span>
            <input type="text" className="flex-1 px-4 py-3 bg-[#F9FAFB] border border-slate-200/80 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-slate-400 transition-all text-slate-900 text-sm font-medium" placeholder="stanford.edu" />
          </div>
        </div>
      </div>
    </div>
  );
}

function DepartmentSetup() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Departments</h2>
        <p className="text-slate-500 mt-1 text-sm">Add the organizational units for your campus.</p>
      </div>
      
      <div className="space-y-3">
        {["Computer Science", "Electrical Engineering", "Business Administration"].map((dept, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-[#F9FAFB] border border-slate-200/80 rounded-xl">
            <span className="text-sm font-medium text-slate-800">{dept}</span>
            <button className="text-xs font-medium text-slate-400 hover:text-red-500 transition-colors">Remove</button>
          </div>
        ))}
        <button className="w-full py-4 border border-dashed border-slate-300 rounded-xl text-sm font-medium text-slate-500 hover:text-slate-800 hover:border-slate-400 transition-colors flex items-center justify-center gap-2">
          + Add Department
        </button>
      </div>
    </div>
  );
}

function PoliciesSetup() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Policies & Geo-fencing</h2>
        <p className="text-slate-500 mt-1 text-sm">Configure automated rules for attendance intelligence.</p>
      </div>
      
      <div className="space-y-6">
        <div className="flex items-start justify-between p-5 bg-[#F9FAFB] border border-slate-200/80 rounded-2xl">
          <div>
            <div className="font-semibold text-sm text-slate-900">Strict Geo-fencing</div>
            <div className="text-xs text-slate-500 mt-1 max-w-xs">Attendance is only valid if the student's mobile GPS is within 50m of the classroom beacon.</div>
          </div>
          <div className="w-12 h-6 bg-black rounded-full relative cursor-pointer shadow-inner">
            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
          </div>
        </div>

        <div className="flex items-start justify-between p-5 bg-[#F9FAFB] border border-slate-200/80 rounded-2xl">
          <div>
            <div className="font-semibold text-sm text-slate-900">Late Arrival Detection</div>
            <div className="text-xs text-slate-500 mt-1 max-w-xs">Mark as "Present (Late)" if recognized after the scheduled session start time.</div>
          </div>
          <div className="flex items-center gap-2">
            <input type="number" defaultValue={10} className="w-16 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-center font-medium focus:outline-none" />
            <span className="text-xs font-medium text-slate-500">mins grace</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaceholderSetup({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 h-full flex flex-col">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
        <p className="text-slate-500 mt-1 text-sm">{desc}</p>
      </div>
      <div className="flex-1 border border-dashed border-slate-200/80 rounded-2xl flex items-center justify-center bg-[#F9FAFB]/50">
        <span className="text-sm font-medium text-slate-400">Configuration Module</span>
      </div>
    </div>
  );
}
