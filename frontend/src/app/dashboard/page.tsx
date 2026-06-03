"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, AlertTriangle, Activity, MapPin, Search, Plus, Bell, ChevronDown, CheckCircle2, Clock, CalendarDays, Sparkles, AlertCircle, XCircle, Brain, TrendingUp, ShieldAlert, Cpu, Database, Terminal, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EnterpriseDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  
  // New States for Search and Export
  const [isExporting, setIsExporting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans flex overflow-hidden relative selection:bg-indigo-500/30">
      
      {/* Dynamic Ambient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900/40 backdrop-blur-2xl border-r border-slate-800/60 hidden lg:flex flex-col relative z-20">
        <div className="h-16 flex items-center px-6 border-b border-slate-800/60">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-tr from-indigo-500 to-blue-500 text-white rounded-md flex items-center justify-center font-bold tracking-tighter text-[10px] shadow-[0_0_15px_rgba(99,102,241,0.4)]">FF</div>
            <span className="font-semibold text-sm tracking-tight text-white">Command Center</span>
          </div>
          <ChevronDown className="w-4 h-4 ml-auto text-slate-500" />
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">Intelligence</div>
          <NavItem icon={<Activity />} label="Overview" active={activeTab === "overview"} onClick={() => setActiveTab("overview")} />
          <NavItem icon={<Sparkles />} label="AI Engine" active={activeTab === "ai"} onClick={() => setActiveTab("ai")} />
          <NavItem icon={<Users />} label="Live Occupancy" active={activeTab === "occupancy"} onClick={() => setActiveTab("occupancy")} />
          <NavItem icon={<TrendingUp />} label="AI Forecasts" active={activeTab === "forecast"} onClick={() => setActiveTab("forecast")} />
          
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 mt-8 px-2">Operations</div>
          <NavItem icon={<CheckCircle2 />} label="Approvals" badge="12" active={activeTab === "approvals"} onClick={() => setActiveTab("approvals")} />
          <NavItem icon={<AlertCircle />} label="Disputes" badge="3" active={activeTab === "disputes"} onClick={() => setActiveTab("disputes")} />
          <NavItem icon={<MapPin />} label="Campus Map" active={activeTab === "map"} onClick={() => setActiveTab("map")} />
        </nav>

        <div className="p-4 border-t border-slate-800/60 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-xs font-bold text-slate-300">A</div>
            <div className="text-sm">
              <div className="font-medium text-slate-200">Admin User</div>
              <div className="text-xs text-slate-500">System Admin</div>
            </div>
          </div>
          <button 
            onClick={() => {
              sessionStorage.clear();
              localStorage.clear();
              router.push("/login");
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm font-medium transition-colors border border-red-500/20"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        {/* Topbar */}
        <header className="h-16 bg-slate-950/40 backdrop-blur-md border-b border-slate-800/60 flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-white capitalize">{activeTab.replace("-", " ")}</span>
            <span className="text-slate-700">/</span>
            <span className="text-sm text-slate-400">Live Telemetry Active</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSearch(true)}
                onBlur={() => setTimeout(() => setShowSearch(false), 200)}
                placeholder="Search students, faculty..." 
                className="w-64 pl-9 pr-4 py-1.5 bg-slate-900/50 border border-slate-700/50 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 focus:bg-slate-900 transition-colors placeholder:text-slate-500" 
              />
              <AnimatePresence>
                {showSearch && searchQuery.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="absolute top-full left-0 w-full mt-2 bg-slate-900 border border-slate-700/50 rounded-xl shadow-2xl overflow-hidden z-50 p-2">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 py-1">Quick Results</div>
                    <div className="px-3 py-2 hover:bg-slate-800 rounded-lg text-sm text-slate-300 cursor-pointer flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-[10px]">JD</div>
                      {searchQuery} (Student)
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-800 text-slate-400 transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-indigo-500 rounded-full" />
            </button>
            <button 
              onClick={handleExport}
              disabled={isExporting}
              className="h-8 px-3 flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)]"
            >
              {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} 
              {isExporting ? "Generating..." : "Export Report"}
            </button>
          </div>
        </header>

        {/* Dynamic Canvas */}
        <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
          <div className="max-w-6xl mx-auto space-y-8">
            
            {activeTab === "overview" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                
                {/* AI Assistant Banner */}
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="bg-slate-900/50 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-6 text-white shadow-xl shadow-black/20 relative overflow-hidden flex items-center justify-between group cursor-pointer"
                >
                  <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/20 blur-[60px] rounded-full pointer-events-none transition-transform duration-700 group-hover:scale-150" />
                  <div className="absolute left-0 bottom-0 w-64 h-64 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none" />
                  <div className="relative z-10 max-w-2xl">
                    <div className="flex items-center gap-2 text-indigo-400 mb-2">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Smart Insights</span>
                    </div>
                    <h3 className="text-xl font-medium tracking-tight text-white group-hover:text-indigo-100 transition-colors">Attendance dropping in CSE 3rd Year.</h3>
                    <p className="text-slate-400 mt-1 text-sm">Our AI detected a 14% drop in average presence. Primary correlation: "Advanced Algorithms" scheduled on Monday First Hour.</p>
                  </div>
                  <button className="relative z-10 bg-indigo-500/20 hover:bg-indigo-500/40 border border-indigo-500/50 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-medium transition-all text-indigo-100 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                    Ask AI Copilot
                  </button>
                </motion.div>

                {/* Metrics */}
                <div className="grid grid-cols-4 gap-4">
                  <MetricCard title="Campus Presence" value="12,402" sub="88% expected" trend="+2%" />
                  <MetricCard title="Late Arrivals" value="482" sub="Across all sessions" trend="-5%" negative />
                  <MetricCard title="Active Cameras" value="104/104" sub="100% operational" glow="emerald" />
                  <MetricCard title="Spoof Attempts" value="3" sub="Automatically blocked" glow="red" />
                </div>

                <div className="grid grid-cols-3 gap-8">
                  {/* Automated Sessions */}
                  <div className="col-span-2 bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-800/60 p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="font-semibold text-white">Live Automated Sessions</h3>
                        <p className="text-xs text-slate-400 mt-0.5">Scheduled classes currently capturing telemetry.</p>
                      </div>
                      <span className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-md text-xs font-medium border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> 4 Active
                      </span>
                    </div>

                    <div className="space-y-3">
                      <SessionRow course="Database Management" room="A204" expected={120} present={108} late={4} />
                      <SessionRow course="Quantum Computing" room="B105" expected={45} present={42} late={1} />
                      <SessionRow course="Linear Algebra" room="C301" expected={200} present={150} late={12} />
                    </div>
                  </div>

                  {/* AI Forecast */}
                  <motion.div whileHover={{ scale: 1.02 }} className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-800/60 p-6 shadow-xl flex flex-col group cursor-pointer relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <h3 className="font-semibold text-white relative z-10">Detention Forecast</h3>
                    <p className="text-xs text-slate-400 mt-0.5 mb-6 relative z-10">Students likely to fall below 75% mandate.</p>
                    
                    <div className="flex-1 flex flex-col justify-center items-center text-center relative z-10">
                      <div className="w-16 h-16 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mb-3 border border-red-500/20 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all">
                        <AlertTriangle className="w-8 h-8" />
                      </div>
                      <div className="text-4xl font-bold tracking-tight text-white">12</div>
                      <div className="text-sm font-medium text-slate-400 mt-1">Students at Risk</div>
                      <button 
                        onClick={() => setActiveTab("forecast")}
                        className="mt-6 px-4 py-2 bg-slate-800/50 hover:bg-slate-700 border border-slate-700/50 rounded-lg text-xs font-medium text-slate-300 transition-colors w-full"
                      >
                        View Intervention List
                      </button>
                    </div>
                  </motion.div>
                </div>

              </motion.div>
            )}

            {/* AI Engine Tab */}
            {activeTab === "ai" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <header className="mb-6 flex justify-between items-end">
                  <div>
                    <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                      <Brain className="w-7 h-7 text-indigo-500" />
                      Face Recognition Engine
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">Deep learning metrics and biometric processing analytics.</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    ENGINE ONLINE (v9.8)
                  </div>
                </header>

                <div className="grid grid-cols-4 gap-4">
                  <MetricCard title="Recognition Accuracy" value="99.1%" sub="Top-1 accuracy" trend="+0.2%" glow="indigo" icon={<CheckCircle2 />} />
                  <MetricCard title="Avg Match Confidence" value="98.3%" sub="Across all cameras" glow="blue" icon={<TrendingUp />} />
                  <MetricCard title="Faces Processed" value="125K" sub="Today's total scans" glow="slate" icon={<Cpu />} />
                  <MetricCard title="Spoof Attempts" value="14" sub="Blocked by liveness" glow="red" icon={<ShieldAlert />} />
                </div>

                <div className="bg-slate-900/50 backdrop-blur-2xl rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden border border-slate-800">
                  <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
                  <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-indigo-400" />
                    Live System Telemetry
                  </h3>
                  
                  <div className="grid grid-cols-3 gap-8">
                    <div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Avg Inference Time</div>
                      <div className="text-3xl font-mono text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">220ms</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Liveness Verification</div>
                      <div className="text-3xl font-mono text-white">99.8%</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Active Neural Nodes</div>
                      <div className="text-3xl font-mono text-white">4 / 4</div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-slate-800">
                    <div className="flex flex-col gap-2 text-[11px] font-mono text-slate-400">
                      <span className="text-emerald-400/80">[SYS] 09:14:22 - Core models loaded successfully into GPU memory.</span>
                      <span>[LOG] 09:14:45 - Detected 12 distinct bounding boxes in stream [CAM-A204].</span>
                      <span className="text-amber-400/80">[WARN] 09:15:01 - Presentation attack detected. Confidence: 99.4%. Origin: Gate 3.</span>
                      <span className="text-slate-500">[LOG] 09:15:02 - Action: Blocked entry for unidentified user at Gate 3.</span>
                    </div>
                  </div>
                </div>

                {/* Neural Network Retraining Hub */}
                <ModelTrainingHub />
              </motion.div>
            )}

            {activeTab === "approvals" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-800/60 p-6 shadow-xl min-h-[500px]">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-lg font-medium text-white">Pending Approvals</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Students awaiting manual identity verification from mobile onboarding.</p>
                  </div>
                  <span className="bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/20">12 Required</span>
                </div>
                
                <div className="space-y-3">
                  <ApprovalRow name="Alice Smith" email="alice.smith@enterprise.edu" time="10 mins ago" />
                  <ApprovalRow name="Bob Johnson" email="bjohnson@enterprise.edu" time="1 hour ago" />
                  <ApprovalRow name="Charlie Davis" email="cdavis@enterprise.edu" time="2 hours ago" />
                </div>
              </motion.div>
            )}

            {activeTab === "disputes" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-800/60 p-6 shadow-xl min-h-[500px]">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-lg font-medium text-white">Active Disputes</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Students challenging automated attendance logs with evidence.</p>
                  </div>
                  <span className="bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-xs font-bold border border-red-500/20">3 Pending</span>
                </div>
                
                <div className="space-y-3">
                  <DisputeRow name="John Doe" id="STU-2024-001" course="Database Management" reason="Location Proof Attached" time="2 hours ago" />
                  <DisputeRow name="Jane Smith" id="STU-2024-089" course="Quantum Computing" reason="Camera Glitch / Selfie Attached" time="4 hours ago" />
                  <DisputeRow name="Mike Johnson" id="STU-2024-112" course="Linear Algebra" reason="Faculty Approval Attached" time="1 day ago" />
                </div>
              </motion.div>
            )}

            {activeTab === "map" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <header className="mb-6">
                  <h2 className="text-xl font-semibold text-white">Live Campus Map</h2>
                  <p className="text-sm text-slate-400">Geospatial telemetry of AI camera nodes and active tracking.</p>
                </header>
                
                <div className="bg-slate-950 rounded-3xl border border-slate-800/60 shadow-xl overflow-hidden relative aspect-video flex items-center justify-center group">
                  {/* Map Grid Background */}
                  <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/30 to-emerald-900/10" />
                  
                  {/* Glowing Radar Sweep */}
                  <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] border border-indigo-500/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] border border-indigo-500/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] border border-indigo-500/20 rounded-full -translate-x-1/2 -translate-y-1/2 animate-[spin_10s_linear_infinite] border-t-indigo-500/80" />
                  
                  {/* Camera Nodes */}
                  <CampusMapNode x="30%" y="40%" label="Main Gate (Cam 1)" status="active" />
                  <CampusMapNode x="60%" y="20%" label="Library Entrance" status="warning" />
                  <CampusMapNode x="70%" y="60%" label="Block A Corridor" status="active" />
                  <CampusMapNode x="45%" y="70%" label="Cafeteria" status="active" />
                  <CampusMapNode x="80%" y="45%" label="Sports Complex" status="offline" />

                  {/* HUD Elements */}
                  <div className="absolute bottom-6 left-6 flex gap-4">
                    <div className="bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-800 flex items-center gap-3 shadow-lg">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                      <span className="text-xs font-mono text-slate-300">102 Active Nodes</span>
                    </div>
                    <div className="bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-800 flex items-center gap-3 shadow-lg">
                      <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                      <span className="text-xs font-mono text-slate-300">2 Warnings</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            {activeTab === "forecast" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <header className="mb-6">
                  <h2 className="text-xl font-semibold text-white">AI Detention Forecast</h2>
                  <p className="text-sm text-slate-400">Predictive analytics identifying students at risk.</p>
                </header>
                
                <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-800/60 shadow-xl overflow-hidden">
                  <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
                    <h3 className="font-semibold text-white">Intervention List (12 Students)</h3>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg transition-colors shadow-[0_0_15px_rgba(79,70,229,0.3)]">Notify Mentors</motion.button>
                  </div>
                  <div className="divide-y divide-slate-800/60">
                    <InterventionRow name="John Doe" id="STU-2024-001" current="76%" projected="73%" trend="-3%" />
                    <InterventionRow name="Michael Smith" id="STU-2024-089" current="75.5%" projected="71%" trend="-4.5%" />
                    <InterventionRow name="Emma Wilson" id="STU-2024-102" current="78%" projected="74%" trend="-4%" />
                    <InterventionRow name="David Clark" id="STU-2024-114" current="77%" projected="74.5%" trend="-2.5%" />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "occupancy" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <header className="mb-6">
                  <h2 className="text-xl font-semibold text-white">Live Occupancy Feed</h2>
                  <p className="text-sm text-slate-400">Real-time telemetry from campus cameras.</p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <CameraFeed room="A204" course="Database Management" current={108} capacity={120} status="Live" />
                  <CameraFeed room="B105" course="Quantum Computing" current={42} capacity={45} status="Live" />
                  <CameraFeed room="C301" course="Linear Algebra" current={150} capacity={200} status="Live" />
                  <CameraFeed room="Auditorium" course="Guest Lecture" current={312} capacity={500} status="Live" />
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}

// Subcomponents Overhaul

function NavItem({ icon, label, badge, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
        active 
          ? "text-white bg-white/10 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.2)]" 
          : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
      }`}
    >
      {active && <motion.div layoutId="navGlow" className="absolute left-0 w-1 h-full bg-indigo-500 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.8)]" />}
      <div className={`w-4 h-4 transition-colors ${active ? "text-indigo-400" : "group-hover:text-slate-300"}`}>{icon}</div>
      <span className="relative z-10">{label}</span>
      {badge && (
        <span className={`ml-auto px-1.5 py-0.5 rounded text-[10px] font-bold ${active ? "bg-indigo-500/20 text-indigo-300" : "bg-slate-800 text-slate-500"}`}>
          {badge}
        </span>
      )}
    </button>
  );
}

function MetricCard({ title, value, sub, trend, negative, glow, icon }: any) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className={`bg-slate-900/40 backdrop-blur-xl p-5 rounded-2xl border border-slate-800/60 shadow-xl relative overflow-hidden group cursor-default`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{title}</div>
        {icon && <div className={`text-${glow}-400 opacity-60`}>{icon}</div>}
      </div>
      <div className="flex items-end justify-between relative z-10">
        <div className="text-3xl font-bold tracking-tight text-white drop-shadow-sm">{value}</div>
        {trend && (
          <div className={`text-xs font-bold ${negative ? 'text-red-400' : 'text-emerald-400'}`}>
            {trend}
          </div>
        )}
      </div>
      <div className="text-xs text-slate-500 mt-1.5 font-medium relative z-10">{sub}</div>
    </motion.div>
  );
}

function SessionRow({ course, room, expected, present, late }: any) {
  const percentage = Math.round(((present + late) / expected) * 100);
  
  return (
    <motion.div 
      whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.05)" }}
      className="flex items-center justify-between p-4 bg-slate-950/50 border border-slate-800/80 rounded-xl transition-all cursor-pointer"
    >
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-slate-200">{course}</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-800 text-slate-400 border border-slate-700 rounded">{room}</span>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <div className="text-xs font-medium text-slate-500"><span className="text-emerald-400 font-semibold">{present}</span> Present</div>
          <div className="text-xs font-medium text-slate-500"><span className="text-amber-400 font-semibold">{late}</span> Late</div>
          <div className="text-xs font-medium text-slate-500"><span className="text-slate-600">{expected - present - late}</span> Absent</div>
        </div>
      </div>
      
      <div className="w-32 flex flex-col items-end gap-1.5">
        <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">{percentage}% Occupancy</div>
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)]" style={{ width: `${percentage}%` }} />
        </div>
      </div>
    </motion.div>
  );
}

function InterventionRow({ name, id, current, projected, trend }: any) {
  return (
    <motion.div whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }} className="p-5 flex items-center justify-between transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border border-red-500/20">
          {name.charAt(0)}
        </div>
        <div>
          <div className="font-semibold text-white text-sm">{name}</div>
          <div className="text-[10px] text-slate-500 font-mono mt-0.5">{id}</div>
        </div>
      </div>
      <div className="flex items-center gap-8 hidden sm:flex">
        <div className="text-right">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Current</div>
          <div className="text-sm font-semibold text-slate-300">{current}</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Projected</div>
          <div className="text-sm font-bold text-red-400">{projected}</div>
        </div>
        <div className="text-right w-16">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Trend</div>
          <div className="text-sm font-semibold text-red-500">{trend}</div>
        </div>
        <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded-lg transition-colors border border-slate-700">
          Review
        </button>
      </div>
    </motion.div>
  );
}

function ApprovalRow({ name, email, time }: any) {
  return (
    <motion.div whileHover={{ scale: 1.01 }} className="flex items-center justify-between p-4 bg-slate-950/50 border border-slate-800/80 rounded-xl transition-all">
      <div>
        <div className="font-medium text-sm text-slate-200">{name}</div>
        <div className="text-xs text-slate-500">{email}</div>
        <div className="text-[10px] font-medium text-slate-600 mt-1 uppercase tracking-wider flex items-center gap-1">
          <Clock className="w-3 h-3" /> {time}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 rounded-lg transition-colors border border-slate-700 bg-slate-900 shadow-sm">
          View Photos
        </button>
        <button className="p-2 text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors">
          <CheckCircle2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

function CameraFeed({ room, course, current, capacity, status }: any) {
  const perc = Math.round((current / capacity) * 100);
  return (
    <motion.div whileHover={{ y: -4 }} className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-2xl overflow-hidden shadow-xl flex flex-col group cursor-pointer transition-all">
      <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-luminosity group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur text-slate-300 text-[10px] font-mono rounded border border-white/10">{room}</div>
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold rounded shadow-[0_0_10px_rgba(16,185,129,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> {status}
        </div>
        <div className="absolute bottom-3 left-3 text-white text-sm font-semibold drop-shadow-md">{course}</div>
      </div>
      <div className="p-4 bg-slate-950/50">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Occupancy</span>
          <span className="text-sm font-bold text-white">{perc}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)]" style={{ width: `${perc}%` }} />
        </div>
        <div className="mt-2 text-[10px] font-mono text-slate-500 text-right">{current} / {capacity}</div>
      </div>
    </motion.div>
  );
}

function ModelTrainingHub() {
  const [isTraining, setIsTraining] = useState(false);
  const [epoch, setEpoch] = useState(0);
  const maxEpochs = 50;
  const [loss, setLoss] = useState(1.2450);
  const [accuracy, setAccuracy] = useState(78.5);
  const [logs, setLogs] = useState<string[]>([]);

  const startTraining = () => {
    setIsTraining(true);
    setEpoch(0);
    setLoss(1.2450);
    setAccuracy(78.5);
    setLogs(["[SYSTEM] Initializing GPU clusters...", "[SYSTEM] Loading 12,504 enrolled face embeddings..."]);
  };

  useEffect(() => {
    if (!isTraining || epoch >= maxEpochs) {
      if (epoch >= maxEpochs) {
        setIsTraining(false);
        setLogs(prev => [...prev, "[SUCCESS] Training complete. Global weights updated."]);
      }
      return;
    }

    const timer = setTimeout(() => {
      setEpoch(prev => prev + 1);
      setLoss(prev => Math.max(0.0120, prev - (Math.random() * 0.05)));
      setAccuracy(prev => Math.min(99.8, prev + (Math.random() * 0.8)));
      
      const newLogs = [
        `Epoch ${epoch + 1}/${maxEpochs} - loss: ${loss.toFixed(4)} - val_accuracy: ${accuracy.toFixed(2)}%`,
        `[TRAIN] Backpropagating gradients... Batch ${(epoch * 14) % 120}/120`
      ];
      setLogs(prev => [...prev.slice(-6), ...newLogs]); // Keep last 8 logs
    }, 600); // Speed of each epoch

    return () => clearTimeout(timer);
  }, [isTraining, epoch, loss, accuracy]);

  return (
    <div className="bg-slate-900/50 backdrop-blur-2xl rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden border border-slate-800 mt-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
            <Database className="w-5 h-5 text-indigo-400" />
            Neural Network Retraining Hub
          </h3>
          <p className="text-sm text-slate-400">Trigger manual fine-tuning of the deep learning model on the latest student enrollment dataset.</p>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Dataset Size</div>
          <div className="text-2xl font-mono text-white">12,504 <span className="text-sm text-slate-500">Faces</span></div>
        </div>
      </div>

      {!isTraining && epoch === 0 && (
        <div className="flex justify-center py-8">
          <button 
            onClick={startTraining}
            className="group relative px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold tracking-wide transition-all shadow-[0_0_25px_rgba(79,70,229,0.4)] hover:shadow-[0_0_40px_rgba(79,70,229,0.6)] flex items-center gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <Cpu className="w-5 h-5" /> Initiate Deep Learning Retraining
          </button>
        </div>
      )}

      {(isTraining || epoch > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Progress Section */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm font-bold text-slate-300 mb-2">
                <span>Epoch Progress</span>
                <span className="text-indigo-400">{epoch} / {maxEpochs}</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <motion.div 
                  className="h-full bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.8)] relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${(epoch / maxEpochs) * 100}%` }}
                  transition={{ ease: "linear", duration: 0.5 }}
                >
                  <div className="absolute top-0 right-0 bottom-0 w-10 bg-white/20 blur-[2px]" />
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Model Loss</div>
                <div className="text-2xl font-mono text-emerald-400">{loss.toFixed(4)}</div>
              </div>
              <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Val Accuracy</div>
                <div className="text-2xl font-mono text-blue-400">{accuracy.toFixed(2)}%</div>
              </div>
            </div>
            
            {isTraining && (
              <div className="flex items-center gap-3 text-indigo-400 text-sm font-bold animate-pulse">
                <Loader2 className="w-4 h-4 animate-spin" /> Training in progress. Do not close window.
              </div>
            )}
            {!isTraining && epoch === maxEpochs && (
              <div className="flex items-center gap-3 text-emerald-400 text-sm font-bold">
                <CheckCircle2 className="w-4 h-4" /> Model deployed successfully!
              </div>
            )}
          </div>

          {/* Terminal Section */}
          <div className="bg-black/80 rounded-xl p-4 border border-slate-800/80 font-mono text-xs overflow-hidden h-48 relative shadow-[inset_0_0_20px_rgba(0,0,0,1)]">
            <div className="absolute top-0 left-0 w-full p-2 bg-slate-900/80 border-b border-slate-800 flex items-center gap-2 text-slate-500 z-10">
              <Terminal className="w-3 h-3" /> Training Log Console
            </div>
            <div className="mt-8 flex flex-col gap-1.5 text-slate-400 h-full overflow-hidden">
              <AnimatePresence>
                {logs.map((log, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }}
                    className={log.includes("[SUCCESS]") ? "text-emerald-400 font-bold" : log.includes("val_accuracy") ? "text-blue-300" : ""}
                  >
                    {log}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

function DisputeRow({ name, id, course, reason, time }: any) {
  return (
    <motion.div whileHover={{ scale: 1.01 }} className="flex items-center justify-between p-4 bg-slate-950/50 border border-slate-800/80 rounded-xl transition-all">
      <div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm text-slate-200">{name}</span>
          <span className="text-[10px] font-mono text-slate-500 px-1.5 py-0.5 bg-slate-800 rounded">{id}</span>
        </div>
        <div className="text-xs text-slate-400 mt-1">{course}</div>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">{reason}</span>
          <span className="text-[10px] font-medium text-slate-600 flex items-center gap-1"><Clock className="w-3 h-3" /> {time}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800 rounded-lg transition-colors border border-slate-700 bg-slate-900 shadow-sm flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-indigo-400" /> Verify Telemetry
        </button>
        <button className="p-2 text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors">
          <CheckCircle2 className="w-4 h-4" />
        </button>
        <button className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
          <XCircle className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

function CampusMapNode({ x, y, label, status }: any) {
  const getStatusColor = () => {
    if (status === "active") return "bg-emerald-500";
    if (status === "warning") return "bg-amber-500";
    return "bg-slate-500";
  };
  
  const getStatusShadow = () => {
    if (status === "active") return "shadow-[0_0_15px_rgba(16,185,129,0.8)]";
    if (status === "warning") return "shadow-[0_0_15px_rgba(245,158,11,0.8)]";
    return "";
  };

  return (
    <div className="absolute group cursor-pointer" style={{ top: y, left: x, transform: "translate(-50%, -50%)" }}>
      <div className="relative">
        <div className={`w-3 h-3 rounded-full ${getStatusColor()} ${getStatusShadow()} relative z-10`} />
        {status === "active" && (
          <div className="absolute inset-0 w-3 h-3 rounded-full bg-emerald-500 animate-ping opacity-75" />
        )}
        
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
          <div className="bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-700 shadow-xl">
            <div className="text-xs font-bold text-white mb-1">{label}</div>
            <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${getStatusColor()}`} /> {status.toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
