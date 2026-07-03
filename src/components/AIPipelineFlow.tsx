import React, { useState, useEffect } from "react";
import { 
  MessageSquare, 
  Speech, 
  Brain, 
  Workflow, 
  UserCheck, 
  ShoppingCart, 
  IndianRupee, 
  LayoutDashboard, 
  TrendingUp, 
  ArrowRight,
  ChevronDown
} from "lucide-react";

export default function AIPipelineFlow() {
  const [activeNode, setActiveNode] = useState(0);

  const pipelineNodes = [
    { id: 0, label: "WhatsApp", sub: "Ingress site streams", icon: MessageSquare, color: "text-brand-green bg-brand-green/10 border-brand-green/30" },
    { id: 1, label: "Transcription", sub: "Hindi/English mixed voice", icon: Speech, color: "text-blue-400 bg-blue-500/10 border-blue-500/30" },
    { id: 2, label: "AI Extraction", sub: "Isolate materials & dates", icon: Brain, color: "text-orange-400 bg-orange-500/10 border-orange-500/30" },
    { id: 3, label: "Workflow Engine", sub: "Trigger rule matching", icon: Workflow, color: "text-purple-400 bg-purple-500/10 border-purple-500/30" },
    { id: 4, label: "Project Manager", sub: "Notify for verification", icon: UserCheck, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30" },
    { id: 5, label: "Procurement", sub: "Draft RFQ & price match", icon: ShoppingCart, color: "text-amber-400 bg-amber-500/10 border-amber-500/30" },
    { id: 6, label: "Finance Audit", sub: "Verify GST & cost-code", icon: IndianRupee, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
    { id: 7, label: "Live Dashboard", sub: "Update ledger metrics", icon: LayoutDashboard, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30" },
    { id: 8, label: "Predictive AI", sub: "Forecast delays & costs", icon: TrendingUp, color: "text-rose-400 bg-rose-500/10 border-rose-500/30" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % pipelineNodes.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [pipelineNodes.length]);

  return (
    <div className="space-y-8 relative">
      {/* Grid Flow Layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-4 relative z-10">
        {pipelineNodes.map((node, index) => {
          const NodeIcon = node.icon;
          const isActive = index === activeNode;
          const isPassed = index < activeNode;

          return (
            <div key={node.id} className="relative flex flex-col items-center">
              {/* Connector dots/arrows on desktop between nodes */}
              {index < pipelineNodes.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-[60%] right-[-40%] h-0.5 bg-white/5 z-0">
                  <div 
                    className={`h-full bg-gradient-to-r from-brand-orange to-brand-green transition-transform duration-1000 origin-left ${
                      isPassed ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                  {isActive && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping" />
                  )}
                </div>
              )}

              {/* Node Button / Display */}
              <button
                onClick={() => setActiveNode(index)}
                className={`w-full flex flex-col items-center text-center p-4 rounded-2xl border transition-all duration-500 relative group ${
                  isActive
                    ? `bg-[#0F172A] border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.3)] scale-[1.05] z-10`
                    : isPassed
                      ? "bg-white/5 border-white/5 opacity-80"
                      : "bg-white/5 border-white/5 opacity-40 hover:opacity-60"
                }`}
              >
                {/* Visual indicator bar */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-orange to-brand-green rounded-t-2xl"></div>
                )}

                {/* Node Icon */}
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-2.5 transition-all duration-500 ${
                  isActive ? node.color : "text-slate-500 border-white/5 bg-black/25"
                }`}>
                  <NodeIcon className="w-4.5 h-4.5" />
                </div>

                {/* Node Text */}
                <h5 className={`text-xs font-bold transition-colors ${isActive ? "text-white" : "text-slate-300"}`}>
                  {node.label}
                </h5>
                <p className="text-[9px] text-slate-500 mt-1 leading-normal line-clamp-2">
                  {node.sub}
                </p>

                {/* Flow indicator icon on mobile */}
                <div className="lg:hidden absolute bottom-[-14px] left-1/2 -translate-x-1/2 bg-[#0F172A] p-0.5 rounded-full border border-white/5 text-slate-600 z-10 group-last:hidden">
                  <ChevronDown className="w-3 h-3" />
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Connection pipeline stats strip */}
      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-3">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping"></span>
          <span>Current active pipeline latency: <strong>840ms</strong></span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="font-mono text-[10px] text-slate-500">Auto-routed tasks today: <strong>1,842 requests</strong></span>
          <span className="font-mono text-brand-green font-bold">Accuracy rating: 99.85%</span>
        </div>
      </div>
    </div>
  );
}
