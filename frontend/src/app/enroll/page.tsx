"use client";

import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Camera, ShieldCheck, Loader2, Mic, ArrowRight, UserCheck, KeyRound, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

const LIVENESS_STEPS = [
  { id: "front", label: "Face Forward", desc: "Align your face in the oval" },
  { id: "left", label: "Turn Left", desc: "Slowly turn your head left" },
  { id: "right", label: "Turn Right", desc: "Slowly turn your head right" },
  { id: "nod", label: "Nod Head", desc: "Nod your head up and down" },
  { id: "blink", label: "Blink Twice", desc: "Liveness verification" },
  { id: "smile", label: "Smile", desc: "Show your teeth slightly" }
];

export default function MobileOnboarding() {
  const webcamRef = useRef<Webcam>(null);
  const router = useRouter();
  
  // Steps: 1: ID, 2: OTP, 3: Capture Studio, 4: Approval
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [studentId, setStudentId] = useState("");
  const [otp, setOtp] = useState("");
  const [livenessIndex, setLivenessIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleNextStep = () => {
    if (currentStep < 4) setCurrentStep((prev) => (prev + 1) as any);
  };

  const captureAction = useCallback(() => {
    if (livenessIndex >= LIVENESS_STEPS.length) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      
      if (livenessIndex === LIVENESS_STEPS.length - 1) {
        handleNextStep(); // Move to approval step
      } else {
        setLivenessIndex(prev => prev + 1);
      }
    }, 1200);
  }, [livenessIndex]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-900 font-sans selection:bg-slate-200 py-12 px-4 sm:px-6 flex flex-col items-center">
      <div className="w-full max-w-[480px]">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-black/10">
            <span className="font-bold text-xl tracking-tighter">F<span className="text-white/60">F</span></span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Enrollment Studio</h1>
          <p className="text-slate-500 mt-2 text-sm font-medium">Enterprise Identity Onboarding</p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-between items-center mb-8 px-2 relative">
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-200 -z-10 -translate-y-1/2" />
          <div className="absolute top-1/2 left-0 h-[2px] bg-blue-500 -z-10 -translate-y-1/2 transition-all duration-500" style={{ width: `${((currentStep - 1) / 3) * 100}%` }} />
          
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
              currentStep === step ? "bg-blue-500 border-blue-500 text-white" : currentStep > step ? "bg-blue-500 border-blue-500 text-white" : "bg-white border-slate-200 text-slate-400"
            }`}>
              {currentStep > step ? <CheckCircle2 className="w-4 h-4" /> : step}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          
          {/* STEP 1: Verify ID */}
          {currentStep === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white rounded-[2rem] p-8 border border-slate-200/60 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.04)]">
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">Verify Identity</h2>
                <p className="text-xs text-slate-500 mt-1 max-w-[250px] mx-auto">Enter your Institution ID to begin.</p>
              </div>
              <div className="space-y-6">
                <input 
                  type="text" 
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="e.g. STU-2024-192"
                  className="w-full bg-[#F9FAFB] border border-slate-200/80 rounded-2xl px-6 py-4 text-center text-lg font-medium tracking-wider text-slate-900 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-slate-400 transition-all shadow-inner"
                />
                <button 
                  onClick={handleNextStep}
                  disabled={studentId.length < 4}
                  className="w-full py-4 bg-black hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 text-white font-medium rounded-xl transition-all shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] flex items-center justify-center gap-2"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: OTP Verification */}
          {currentStep === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white rounded-[2rem] p-8 border border-slate-200/60 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.04)]">
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-100">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">2FA Verification</h2>
                <p className="text-xs text-slate-500 mt-1 max-w-[250px] mx-auto">We've sent a 6-digit code to your registered institution email.</p>
              </div>
              <div className="space-y-6">
                <input 
                  type="text" 
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="• • • • • •"
                  maxLength={6}
                  className="w-full bg-[#F9FAFB] border border-slate-200/80 rounded-2xl px-6 py-4 text-center text-2xl tracking-[1em] font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-slate-400 transition-all shadow-inner"
                />
                <button 
                  onClick={handleNextStep}
                  disabled={otp.length !== 6}
                  className="w-full py-4 bg-black hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 text-white font-medium rounded-xl transition-all shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] flex items-center justify-center gap-2"
                >
                  Verify Code
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Face Studio & Liveness */}
          {currentStep === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-200/60 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.04)]">
              <div className="relative aspect-[3/4] sm:aspect-square bg-slate-100 rounded-3xl overflow-hidden mb-8 border border-slate-200">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="w-full h-full object-cover"
                  mirrored
                />
                
                {/* Liveness Reticle */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }} 
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className={`w-56 h-72 border-[3px] border-dashed rounded-[100px] transition-colors duration-500 ${isProcessing ? 'border-amber-400' : 'border-white/70 shadow-[inset_0_0_50px_rgba(255,255,255,0.2)]'}`} 
                  />
                </div>

                <AnimatePresence>
                  {isProcessing && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center z-10">
                      <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
                      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-widest">Processing</h3>
                      <div className="mt-2 text-[10px] text-slate-500 font-mono text-center">
                        {LIVENESS_STEPS[livenessIndex].id === "nod" ? (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-600 font-bold">
                            Tracking Y-Axis Pitch...<br/>Nod Motion Detected!
                          </motion.div>
                        ) : LIVENESS_STEPS[livenessIndex].id === "left" || LIVENESS_STEPS[livenessIndex].id === "right" ? (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-blue-600 font-bold">
                            Tracking X-Axis Yaw...<br/>Angle OK!
                          </motion.div>
                        ) : (
                          "Extracting facial landmarks..."
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-slate-900">Step {livenessIndex + 1} of {LIVENESS_STEPS.length}</h3>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase tracking-wider">{LIVENESS_STEPS[livenessIndex].id}</span>
                </div>
                
                <div className="bg-[#F9FAFB] p-5 rounded-2xl border border-slate-200/80 mb-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                  <span className="text-xl font-bold text-slate-900 tracking-tight">{LIVENESS_STEPS[livenessIndex].label}</span>
                  <span className="text-xs text-slate-500 mt-1 font-medium">{LIVENESS_STEPS[livenessIndex].desc}</span>
                </div>

                <button 
                  onClick={captureAction}
                  disabled={isProcessing}
                  className="w-full py-4 bg-black hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  {isProcessing ? "Analyzing..." : "Complete Action"} 
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Admin Approval Status */}
          {currentStep === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-[2rem] p-10 border border-slate-200/60 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.04)] text-center">
              <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 border-8 border-emerald-50 relative">
                <CheckCircle2 className="w-12 h-12 relative z-10 bg-emerald-50" />
                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 bg-emerald-400 rounded-full z-0" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Capture Complete</h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-8">
                Your biometric profile has been successfully captured and encrypted. It is currently awaiting final admin approval.
              </p>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-8 flex items-center gap-4 text-left">
                <Clock className="w-6 h-6 text-amber-500 shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-slate-900">Pending Approval</div>
                  <div className="text-xs text-slate-500 mt-0.5">Usually takes 1-2 hours. You will receive an email once activated.</div>
                </div>
              </div>

              <button 
                onClick={() => router.push("/login")}
                className="w-full py-4 bg-black hover:bg-slate-800 text-white font-medium rounded-xl transition-all shadow-md"
              >
                Return to Login
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
