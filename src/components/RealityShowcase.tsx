import React, { useState, useEffect } from "react";
import { REALITY_CARDS } from "../data";
import { 
  Check, 
  MessageSquare, 
  Phone, 
  Mic, 
  Camera, 
  FileText, 
  MapPin, 
  Sparkles,
  ArrowRightLeft,
  ArrowRight,
  Database,
  Cpu
} from "lucide-react";

export default function RealityShowcase() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  // Trigger a scan animation whenever user switches selection
  useEffect(() => {
    setIsScanning(true);
    const timer = setTimeout(() => {
      setIsScanning(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [selectedIndex]);

  // Auto cycle every 8 seconds unless user clicks
  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % REALITY_CARDS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const currentCard = REALITY_CARDS[selectedIndex];

  const getMediaIcon = (iconStr: string) => {
    switch (iconStr) {
      case "🎤": return <Mic className="w-4 h-4 text-orange-400" />;
      case "📸": return <Camera className="w-4 h-4 text-blue-400" />;
      case "🧾": return <FileText className="w-4 h-4 text-emerald-400" />;
      case "📍": return <MapPin className="w-4 h-4 text-red-400" />;
      default: return <MessageSquare className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* LEFT: WhatsApp Feed Selector */}
      <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 px-2 pb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-pulse"></span>
            <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">Live Site Streams (WhatsApp)</span>
          </div>

          {REALITY_CARDS.map((card, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={card.id}
                onClick={() => setSelectedIndex(idx)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
                  isSelected 
                    ? "bg-white/5 border-white/15 glow-green" 
                    : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
                }`}
              >
                {/* Visual Active Highlight line */}
                {isSelected && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-green"></div>
                )}

                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 rounded-lg bg-black/25">
                      {getMediaIcon(card.icon)}
                    </div>
                    <span className="text-xs font-semibold text-slate-300">{card.author}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{card.timestamp}</span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 pl-1 leading-relaxed">
                  {card.message}
                </p>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                  <span className="text-[10px] text-slate-500 font-medium">{card.role}</span>
                  <span className={`text-[10px] font-mono font-bold flex items-center space-x-1 transition-opacity ${
                    isSelected ? "text-brand-green opacity-100" : "text-slate-500 opacity-0 group-hover:opacity-100"
                  }`}>
                    <span>View AI Extraction</span>
                    <ArrowRight className="w-2.5 h-2.5 ml-0.5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* WhatsApp Mobile Mockup Hint */}
        <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-green-950/20 to-slate-950/40 border border-brand-green/10 text-xs text-slate-400">
          <div className="flex items-center space-x-2 mb-1.5">
            <div className="w-5 h-5 rounded-full bg-brand-green/20 flex items-center justify-center">
              <span className="text-[10px] text-brand-green font-bold">WA</span>
            </div>
            <h5 className="font-bold text-slate-300">0% App Adoption Resistance</h5>
          </div>
          Your team already knows how to send WhatsApp messages. MHP runs in the background. No logins, no passwords, no app downloads required for engineers on sites.
        </div>
      </div>

      {/* CENTER: Flow Bridge (Visible on Desktop) */}
      <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-center relative">
        <div className="w-full h-0.5 bg-gradient-to-r from-brand-green to-brand-orange"></div>
        <div className="w-10 h-10 rounded-full bg-[#0F172A] border border-white/5 flex items-center justify-center mt-[-20px] shadow-lg">
          <ArrowRightLeft className="w-4 h-4 text-brand-orange animate-pulse" />
        </div>
      </div>

      {/* RIGHT: Live AI Extraction Panel */}
      <div className="lg:col-span-6 bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden glow-orange">
        
        {/* Animated grid overlay to indicate processing */}
        <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none"></div>

        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 relative z-10">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-brand-orange/10 text-brand-orange border border-brand-orange/20">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-200">MHP AI Parser</h4>
                <p className="text-[10px] font-mono text-slate-500">ENGINE_CORE: V2.4-IND-CONSTRUCT</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 font-mono text-xs">
              <span className="px-2 py-0.5 rounded bg-orange-950/40 text-brand-orange border border-brand-orange/20 animate-pulse flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-brand-orange" />
                <span>PARSE_LIVE</span>
              </span>
            </div>
          </div>

          {/* Raw Message Review box */}
          <div className="bg-black/20 rounded-2xl p-4 border border-white/5 mb-5 relative z-10">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-[10px] font-mono text-slate-500">Incoming Stream Fragment</span>
            </div>
            <blockquote className="text-sm italic text-slate-300 leading-relaxed pl-3 border-l-2 border-brand-green">
              "{currentCard.message}"
            </blockquote>
          </div>

          {/* Extracted DB fields */}
          <div className="space-y-3 relative z-10">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-400 tracking-wide uppercase">{currentCard.extractedData.title}</span>
              <span className="text-[10px] font-mono text-slate-500 flex items-center space-x-1">
                <Database className="w-2.5 h-2.5" />
                <span>Target Table: waitlist_operations</span>
              </span>
            </div>

            {isScanning ? (
              <div className="py-8 flex flex-col items-center justify-center space-y-3">
                <div className="w-8 h-8 rounded-full border-2 border-t-brand-orange border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                <p className="text-xs font-mono text-slate-400 animate-pulse">Analyzing audio dialect & visual structures...</p>
              </div>
            ) : (
              <div className="space-y-2">
                {currentCard.extractedData.items.map((item, i) => (
                  <div 
                    key={i} 
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${
                      item.highlight 
                        ? "bg-white/5 border-orange-500/30 text-white" 
                        : "bg-black/20 border-white/5 text-slate-300"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-orange"></div>
                      <span className="text-xs font-mono text-slate-400">{item.label}</span>
                    </div>
                    <span className={`text-xs font-semibold ${item.highlight ? "text-brand-orange font-bold" : "text-slate-200"}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Database Output Schema summary */}
        <div className="mt-6 pt-4 border-t border-white/5 relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-[10px] font-mono text-slate-500">
            <Check className="w-3.5 h-3.5 text-brand-green" />
            <span>Schema match verified • Auto-trigger ERP dispatch payload</span>
          </div>
          <span className="text-[10px] font-mono text-brand-orange bg-brand-orange/5 border border-brand-orange/10 px-2 py-0.5 rounded">
            Accuracy: 99.8%
          </span>
        </div>
      </div>
    </div>
  );
}
