"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, MessageSquare, Send, ChevronRight, Settings2, LogOut, User, Building2, GraduationCap, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CopilotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "demo">("chat");
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm FaceFlow AI. Ask me about your attendance, forecasts, or anomalies.", sender: "ai" }
  ]);
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, sender: "user" };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Mock AI Response
    setTimeout(() => {
      let aiResponse = "I'm analyzing your request...";
      const query = userMsg.text.toLowerCase();
      
      if (query.includes("miss tomorrow")) {
        aiResponse = "Yes, you can miss tomorrow. Your current attendance is 88%. Missing tomorrow's 2 sessions will drop it to 86.5%, which is still well above the 75% safe margin.";
      } else if (query.includes("spoof") || query.includes("threat")) {
        aiResponse = "Today, the system blocked 14 spoofing attempts across campus. 3 of these were high-confidence presentation attacks at the Main Gate.";
      } else if (query.includes("absent")) {
        aiResponse = "You were marked absent in 'Data Structures' today at 10:00 AM. The camera did not detect your face. You can raise a dispute in the Correction Center.";
      } else if (query.includes("below 80")) {
        aiResponse = "There are currently 124 students below 80% attendance in your department. 12 of them are critically at risk of falling below 75%.";
      } else {
        aiResponse = "I've logged your query. As an AI Copilot, I am continuously learning campus patterns to assist you better.";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, text: aiResponse, sender: "ai" }]);
    }, 1000);
  };

  const DEMO_LINKS = [
    { label: "Sign In Page", path: "/login", icon: <LogOut className="w-4 h-4" /> },
    { label: "Admin Dashboard", path: "/dashboard", icon: <Building2 className="w-4 h-4" /> },
    { label: "Student App", path: "/student/home", icon: <GraduationCap className="w-4 h-4" /> },
    { label: "Faculty Portal", path: "/faculty/live", icon: <Users className="w-4 h-4" /> },
    { label: "Guardian App", path: "/guardian/dashboard", icon: <User className="w-4 h-4" /> },
    { label: "Security Center", path: "/security/threats", icon: <ShieldAlert className="w-4 h-4" /> },
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-96 bg-white rounded-3xl shadow-2xl border border-slate-200/60 overflow-hidden z-[100] flex flex-col"
            style={{ maxHeight: 'calc(100vh - 120px)', height: '600px' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">FaceFlow AI</h3>
                  <p className="text-[10px] text-blue-100 font-medium opacity-80">Campus Intelligence Copilot</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-100 bg-slate-50 shrink-0 p-1">
              <button 
                onClick={() => setActiveTab("chat")}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${activeTab === "chat" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                AI Assistant
              </button>
              <button 
                onClick={() => setActiveTab("demo")}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${activeTab === "demo" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                Demo Controls
              </button>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-hidden relative bg-[#F9FAFB]">
              
              {activeTab === "chat" && (
                <div className="absolute inset-0 flex flex-col">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map(msg => (
                      <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                          msg.sender === 'user' 
                            ? 'bg-blue-600 text-white rounded-br-none' 
                            : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Suggestions */}
                  <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar shrink-0">
                    <button onClick={() => setInput("Can I miss tomorrow?")} className="shrink-0 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors whitespace-nowrap">Can I miss tomorrow?</button>
                    <button onClick={() => setInput("Show spoof attempts")} className="shrink-0 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors whitespace-nowrap">Show spoof attempts</button>
                  </div>

                  <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 shrink-0">
                    <div className="relative flex items-center">
                      <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask FaceFlow AI..." 
                        className="w-full bg-slate-50 border border-slate-200 rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                      />
                      <button type="submit" disabled={!input.trim()} className="absolute right-2 w-8 h-8 bg-blue-600 disabled:bg-slate-300 text-white rounded-full flex items-center justify-center transition-colors">
                        <Send className="w-4 h-4" style={{ transform: 'translateX(-1px) translateY(1px)' }} />
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === "demo" && (
                <div className="absolute inset-0 overflow-y-auto p-4">
                  <div className="mb-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Quick Navigation</h4>
                    <p className="text-xs text-slate-500 mb-4">Jump between different portals to explore the ecosystem.</p>
                    <div className="space-y-2">
                      {DEMO_LINKS.map(link => (
                        <button
                          key={link.path}
                          onClick={() => {
                            setIsOpen(false);
                            router.push(link.path);
                          }}
                          className="w-full flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all group"
                        >
                          <div className="flex items-center gap-3 text-slate-700 group-hover:text-black">
                            {link.icon}
                            <span className="text-sm font-medium">{link.label}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-1 transition-all" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_-4px_rgba(0,0,0,0.3)] z-50 overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Sparkles className="w-6 h-6 relative z-10" />
      </motion.button>
    </>
  );
}

// Ensure lucide icon for Users is available for Faculty Demo Link
function Users(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
