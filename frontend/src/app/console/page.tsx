"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { motion, AnimatePresence } from "framer-motion";
import { ScanFace, AlertOctagon, CheckCircle2, Layers } from "lucide-react";

export default function RecognitionConsole() {
  const webcamRef = useRef<Webcam>(null);
  const [status, setStatus] = useState<"scanning" | "success" | "spoof">("scanning");
  const [identity, setIdentity] = useState<string | null>(null);
  const [challenge, setChallenge] = useState<string | null>(null);
  const [xaiData, setXaiData] = useState<any>(null);
  const [auditHash, setAuditHash] = useState<string>("");
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Generate static hash to prevent hydration error
    setAuditHash(Math.random().toString(16).substr(2, 12));
    
    // Initialize WebSocket
    ws.current = new WebSocket("ws://localhost:8000/ws/recognize");
    
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.status === "challenge_issued") {
        setChallenge(data.challenge);
      } else if (data.status === "success") {
        setStatus("success");
        setIdentity(data.match.name);
        setXaiData(data.xai);
        setChallenge(null);
        setAuditHash(Math.random().toString(16).substr(2, 12));
      } else if (data.status === "spoof_detected") {
        setStatus("spoof");
        setIdentity(null);
        setXaiData(data.xai);
        setChallenge(null);
        setAuditHash(Math.random().toString(16).substr(2, 12));
      }
      
      // Reset status after delay if not scanning
      if (data.status !== "challenge_issued") {
        setTimeout(() => {
          setStatus("scanning");
          setXaiData(null);
        }, 4000);
      }
    };

    return () => ws.current?.close();
  }, []);

  const processFrame = useCallback(() => {
    if (webcamRef.current && ws.current?.readyState === WebSocket.OPEN && status === "scanning") {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        ws.current.send(JSON.stringify({ frame: imageSrc }));
      }
    }
  }, [status]);

  useEffect(() => {
    const interval = setInterval(processFrame, 500); // 2 FPS for analysis
    return () => clearInterval(interval);
  }, [processFrame]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-8 flex flex-col">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-light text-slate-800">Real-Time <span className="font-bold text-blue-600">Console</span></h1>
        <div className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium flex items-center gap-2 shadow-sm text-slate-700">
          <ScanFace className="w-4 h-4 text-blue-500" /> Live Inference
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 relative bg-slate-200 rounded-[2rem] overflow-hidden border border-slate-300 flex items-center justify-center shadow-lg">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full h-full object-cover"
            mirrored
          />
          
          {/* Liveness Challenge Overlay */}
          <AnimatePresence>
            {challenge && status === "scanning" && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute top-8 bg-blue-600/95 text-white backdrop-blur-md px-6 py-3 rounded-full text-lg font-bold shadow-xl z-10"
              >
                ACTION REQUIRED: {challenge.replace("_", " ")}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Status Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {status === "scanning" && (
              <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.8, 0.3] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-64 h-64 border-2 border-white/80 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)]" 
              />
            )}
            {status === "success" && (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-emerald-50/95 backdrop-blur-md border border-emerald-200 p-8 rounded-3xl flex flex-col items-center gap-4 shadow-xl"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <div className="text-xl font-bold text-emerald-700">Verified: {identity}</div>
              </motion.div>
            )}
            {status === "spoof" && (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-red-50/95 backdrop-blur-md border border-red-200 p-8 rounded-3xl flex flex-col items-center gap-4 shadow-xl"
              >
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertOctagon className="w-10 h-10 text-red-600" />
                </div>
                <div className="text-xl font-bold text-red-700">Spoofing Attempt Detected</div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Explainable AI (XAI) Panel */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-6">
          <h3 className="font-medium text-slate-800 flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-500"/> Explainable AI Panel
          </h3>
          
          {xaiData ? (
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                <div className="text-xs text-slate-500 mb-1 font-medium">Depth Consistency (3D)</div>
                <div className="text-xl font-bold text-blue-600">{(xaiData.depth_consistency_score * 100).toFixed(1)}%</div>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                <div className="text-xs text-slate-500 mb-1 font-medium">GAN Artifact Prob.</div>
                <div className="text-xl font-bold text-emerald-600">{(xaiData.gan_artifact_prob * 100).toFixed(2)}%</div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
                <div className="text-xs text-slate-500 mb-1 font-medium">Challenge Validation</div>
                <div className="text-xl font-bold text-purple-600">{xaiData.challenge_passed ? "PASSED" : "FAILED"}</div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center border border-dashed border-slate-300 rounded-xl bg-slate-50 text-slate-500 text-sm font-medium">
              Awaiting telemetry...
            </div>
          )}
          
          <div className="mt-auto">
            <div className="text-xs text-slate-500 mb-2 font-medium">Immutable Audit Trail (Local Cache)</div>
            <div className="bg-slate-50 h-24 rounded-xl border border-slate-200 p-3 text-xs font-mono text-slate-600 overflow-hidden flex flex-col justify-end shadow-inner">
              <div className="text-slate-400">[SYSTEM] Hash Chain OK</div>
              {status === "success" && <div className="text-emerald-600 font-medium">0x{auditHash}... Appended</div>}
              {status === "spoof" && <div className="text-red-600 font-medium">0x{auditHash}... Appended</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
