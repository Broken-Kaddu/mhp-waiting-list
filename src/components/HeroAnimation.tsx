import React, { useState, useEffect } from "react";
import { 
  User, 
  Mic, 
  Brain, 
  ShoppingBag, 
  CheckCircle, 
  LayoutDashboard, 
  FileText, 
  ArrowRight,
  TrendingUp,
  Sparkles
} from "lucide-react";

export default function HeroAnimation() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: "engineer",
      label: "Site Engineer",
      desc: "Ramesh on site sends a quick WhatsApp voice message",
      icon: User,
      color: "border-orange-500 text-orange-500 bg-orange-950/30",
      glow: "shadow-[0_0_20px_rgba(249,115,22,0.4)]",
    },
    {
      id: "voice",
      label: "Voice Note",
      desc: '"Need 40 bags of cement urgently at Gate 2"',
      icon: Mic,
      color: "border-blue-500 text-blue-500 bg-blue-950/30",
      glow: "shadow-[0_0_20px_rgba(59,130,246,0.4)]",
    },
    {
      id: "ai",
      label: "MHP AI Engine",
      desc: "Transcribes, understands Hindi/English, parses context",
      icon: Brain,
      color: "border-green-500 text-green-500 bg-green-950/30",
      glow: "shadow-[0_0_25px_rgba(37,211,102,0.5)]",
    },
    {
      id: "order",
      label: "Material Order",
      desc: "Creates draft Purchase Request with vendor selection",
      icon: ShoppingBag,
      color: "border-orange-500 text-orange-500 bg-orange-950/30",
      glow: "shadow-[0_0_20px_rgba(249,115,22,0.4)]",
    },
    {
      id: "approval",
      label: "Approval Workflow",
      desc: "Pings Managing Director on WhatsApp for 1-tap signoff",
      icon: CheckCircle,
      color: "border-purple-500 text-purple-500 bg-purple-950/30",
      glow: "shadow-[0_0_20px_rgba(168,85,247,0.4)]",
    },
    {
      id: "dashboard",
      label: "Live Dashboard",
      desc: "Updates procurement timeline and cost tracking in real time",
      icon: LayoutDashboard,
      color: "border-blue-400 text-blue-400 bg-blue-950/20",
      glow: "shadow-[0_0_20px_rgba(96,165,250,0.4)]",
    },
    {
      id: "report",
      label: "Weekly Report",
      desc: "Aggregates and formats into an automated executive summary",
      icon: FileText,
      color: "border-emerald-500 text-emerald-500 bg-emerald-950/30",
      glow: "shadow-[0_0_20px_rgba(16,185,129,0.4)]",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="relative w-full max-w-lg mx-auto bg-white/5 border border-white/10 rounded-3xl p-6 glow-orange backdrop-blur-xl">
      {/* Decorative Blueprint Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse"></div>
          <span className="font-mono text-xs text-slate-400 tracking-wider uppercase">MHP Real-Time Site Pipeline</span>
        </div>
        <div className="flex space-x-1.5">
          <div className="w-2 h-2 rounded-full bg-slate-700"></div>
          <div className="w-2 h-2 rounded-full bg-slate-700"></div>
          <div className="w-2 h-2 rounded-full bg-slate-700"></div>
        </div>
      </div>

      {/* Connection Lines & Flow container */}
      <div className="relative space-y-4">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const isActive = index === activeStep;
          const isPassed = index < activeStep;

          return (
            <div key={step.id} className="relative">
              {/* Vertical connector line */}
              {index < steps.length - 1 && (
                <div className="absolute left-[26px] top-12 bottom-[-16px] w-0.5 bg-white/5 z-0 overflow-hidden">
                  <div 
                    className={`w-full h-full bg-gradient-to-b from-orange-500 via-green-400 to-blue-500 origin-top transition-transform duration-1000 ${
                      isPassed ? "scale-y-100" : "scale-y-0"
                    }`}
                  />
                  {isActive && (
                    <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-orange-500 to-transparent animate-bounce" />
                  )}
                </div>
              )}

              {/* Node Card */}
              <div 
                onClick={() => setActiveStep(index)}
                className={`flex items-start space-x-4 p-3 rounded-2xl border transition-all duration-500 cursor-pointer z-10 relative ${
                  isActive 
                    ? `border-white/15 bg-white/5 ${step.glow} scale-[1.02]` 
                    : isPassed
                      ? "border-white/5 bg-black/20 opacity-80"
                      : "border-white/5 bg-black/10 opacity-40 hover:opacity-60"
                }`}
              >
                {/* Node Icon Circle */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all duration-500 shrink-0 ${
                  isActive ? step.color : "border-white/5 text-slate-500 bg-black/25"
                }`}>
                  <StepIcon className="w-5 h-5" />
                </div>

                {/* Node Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-sm font-semibold tracking-wide transition-colors ${
                      isActive ? "text-slate-100" : "text-slate-400"
                    }`}>
                      {step.label}
                    </h4>
                    {isActive && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-orange/10 text-brand-orange border border-brand-orange/20 animate-pulse">
                        <Sparkles className="w-2.5 h-2.5 mr-1 text-orange-400" /> ACTIVE PROCESSING
                      </span>
                    )}
                  </div>
                  <p className={`text-xs mt-1 leading-relaxed transition-colors duration-500 ${
                    isActive ? "text-slate-300 font-medium" : "text-slate-500"
                  }`}>
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Playback Progress Indicator */}
      <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
        <div className="flex space-x-1">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-500 ${
                i === activeStep 
                  ? "w-6 bg-brand-orange" 
                  : i < activeStep 
                    ? "w-2 bg-brand-green/70" 
                    : "w-2 bg-white/5"
              }`}
            />
          ))}
        </div>
        <button 
          onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
          className="text-xs font-mono font-bold text-slate-400 hover:text-brand-orange transition-colors flex items-center space-x-1"
        >
          <span>Next Step</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
