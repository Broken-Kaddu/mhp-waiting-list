import React, { useState, useEffect } from "react";
import { MessageSquare, ArrowRight, Check, Speech, Globe, Sparkles, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ConversationExample {
  id: string;
  role: string;
  language: string;
  avatar: string;
  avatarBg: string;
  originalMessage: string;
  translation: string;
  structuredData: {
    label: string;
    value: string;
    isHighlight?: boolean;
  }[];
}

export default function MultilingualShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPlayingWave, setIsPlayingWave] = useState(true);

  const examples: ConversationExample[] = [
    {
      id: "ex-1",
      role: "Site Engineer",
      language: "Kannada",
      avatar: "👷",
      avatarBg: "bg-orange-500/10 border-orange-500/30 text-orange-400",
      originalMessage: "ಇವತ್ತು 25 ಜನ ಬಂದಿದ್ದಾರೆ, ಇನ್ನೂ 50 ಸಿಮೆಂಟ್ ಬ್ಯಾಗ್ ಬೇಕು.",
      translation: '"25 people have come today, need 50 more cement bags."',
      structuredData: [
        { label: "Labor Strength", value: "25 Present", isHighlight: true },
        { label: "Material Request", value: "Cement", isHighlight: true },
        { label: "Required Quantity", value: "50 Bags", isHighlight: true },
        { label: "Priority Level", value: "High", isHighlight: true }
      ]
    },
    {
      id: "ex-2",
      role: "Supervisor",
      language: "Hindi",
      avatar: "👷",
      avatarBg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
      originalMessage: "कल सुबह तक स्टील साइट पर चाहिए.",
      translation: '"Need steel on site by tomorrow morning."',
      structuredData: [
        { label: "Material Type", value: "Steel TMT Bars", isHighlight: true },
        { label: "Required By", value: "Tomorrow Morning", isHighlight: true },
        { label: "Site Location", value: "Main Construction Block" }
      ]
    },
    {
      id: "ex-3",
      role: "Contractor",
      language: "Tamil",
      avatar: "👷",
      avatarBg: "bg-blue-500/10 border-blue-500/30 text-blue-400",
      originalMessage: "Concrete pour will start after approval.",
      translation: '"Concrete pour will start after approval."',
      structuredData: [
        { label: "Activity Type", value: "Concrete Pouring", isHighlight: true },
        { label: "Prerequisite", value: "Structure Approval", isHighlight: true },
        { label: "Current Status", value: "Pending Approval" }
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % examples.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [examples.length]);

  const languages = [
    { name: "English", status: "Active" },
    { name: "Hindi", status: "Active" },
    { name: "Kannada", status: "Active" },
    { name: "Tamil", status: "Active" },
    { name: "Telugu", status: "Active" },
    { name: "Marathi", status: "Active" },
    { name: "Malayalam", status: "Active" },
    { name: "Bengali", status: "Active" },
  ];

  return (
    <section id="multilingual" className="py-12 md:py-28 relative overflow-hidden">
      {/* Decorative backdrop glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-18">
          <span className="font-mono text-[10px] md:text-xs text-brand-orange tracking-widest uppercase flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" /> India-First Intelligence
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black font-display text-white mt-1 leading-tight">
            Built for India’s Multilingual Construction Workforce
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mt-3 leading-relaxed">
            Construction teams across India naturally communicate in multiple regional languages and often mix dialects in the same voice message. MHP is designed to understand this linguistic reality, processing natural voice streams without requiring translation steps.
          </p>
        </div>

        {/* Feature Grid & Conversational Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Core Value & Language Matrix */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Feature Card: Multilingual Voice Intelligence */}
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 md:p-8 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-brand-orange/20 text-brand-orange flex items-center justify-center">
                <Speech className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">
                Multilingual Voice Intelligence
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Understand voice notes, messages, and documents across multiple Indian languages and mixed-language conversations without requiring your team to change how they communicate. AI smoothly captures construction terminology, local weights/measures, and regional accents.
              </p>

              {/* Supported Languages Grid */}
              <div className="pt-4 border-t border-white/5 space-y-3">
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  Supported & Native Processing:
                </p>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang, idx) => (
                    <span 
                      key={idx} 
                      className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono bg-slate-900 border border-white/5 text-slate-300 hover:border-slate-800 transition-all"
                    >
                      <span className="w-1 h-1 rounded-full bg-brand-green"></span>
                      <span>{lang.name}</span>
                      <Check className="w-2.5 h-2.5 text-brand-green ml-0.5" />
                    </span>
                  ))}
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono bg-brand-orange/10 border border-brand-orange/20 text-brand-orange font-bold animate-pulse">
                    + More
                  </span>
                </div>
              </div>
            </div>

            {/* Subtle disclaimer addressing real-world accuracy improvement */}
            <div className="bg-slate-950/40 border border-white/5 rounded-xl p-4 text-[11px] text-slate-500 leading-relaxed">
              💡 <strong className="text-slate-400">Design Note:</strong> We avoid claiming perfect machine-translation accuracy. Instead, MHP is uniquely engineered for Indian site contexts and continuously refines its understanding of construction vocabulary and mixed-language inputs through real-world deployment.
            </div>

          </div>

          {/* Right Column: Interactive Animated WhatsApp to Structured Data */}
          <div className="lg:col-span-7 bg-white/[0.02] border border-white/10 rounded-3xl p-5 md:p-8 flex flex-col justify-between backdrop-blur-xl relative">
            
            {/* Header with Waveform simulation */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></div>
                <span className="font-mono text-xs text-slate-400 tracking-wider">LIVE TRANSLATION STREAM</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-950/60 px-3 py-1 rounded-full border border-white/5">
                <Volume2 className="w-3.5 h-3.5 text-brand-orange animate-bounce" />
                <span className="font-mono text-[9px] text-brand-orange font-bold uppercase tracking-widest">
                  Waveform Active
                </span>
              </div>
            </div>

            {/* Quick-select Tabs for the examples */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {examples.map((ex, index) => (
                <button
                  key={ex.id}
                  onClick={() => setActiveTab(index)}
                  className={`py-2 px-1.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                    activeTab === index 
                      ? "bg-orange-950/20 border-brand-orange text-white" 
                      : "bg-slate-950/40 border-white/5 text-slate-400 hover:border-white/10"
                  }`}
                >
                  <span className="text-xs font-bold font-display flex items-center gap-1.5">
                    <span>{ex.avatar}</span>
                    <span className="hidden sm:inline">{ex.role}</span>
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500 bg-slate-900/50 px-1.5 py-0.5 rounded border border-white/5">
                    {ex.language}
                  </span>
                </button>
              ))}
            </div>

            {/* Main Showcase Panel */}
            <div className="grid grid-cols-1 md:grid-cols-11 gap-4 md:gap-6 items-center min-h-[250px]">
              
              {/* WhatsApp Message Card (Left) */}
              <div className="md:col-span-5 space-y-3">
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">
                  Step 1: Raw Voice Input
                </p>
                <div className="bg-[#0b141a] rounded-2xl p-4 border border-emerald-900/20 relative shadow-xl">
                  {/* WhatsApp header look */}
                  <div className="flex items-center space-x-2.5 mb-2.5">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${examples[activeTab].avatarBg}`}>
                      {examples[activeTab].avatar}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">
                        {examples[activeTab].role} ({examples[activeTab].language})
                      </h4>
                      <p className="text-[8px] text-emerald-400 font-mono tracking-wide">
                        online • voice log
                      </p>
                    </div>
                  </div>

                  {/* Audio Waveform simulation */}
                  <div className="bg-[#152026] rounded-xl p-2.5 border border-white/5 mb-3">
                    <div className="flex items-center space-x-2">
                      <Volume2 className="w-4 h-4 text-emerald-400" />
                      <div className="flex-1 flex items-center space-x-0.5 h-6">
                        {[4, 12, 18, 6, 14, 22, 10, 8, 16, 24, 12, 10, 16, 8, 14, 6, 10, 4].map((h, i) => (
                          <div 
                            key={i} 
                            style={{ height: `${isPlayingWave ? h : 4}px` }}
                            className="flex-1 bg-emerald-500 rounded-full transition-all duration-300"
                          />
                        ))}
                      </div>
                      <span className="text-[9px] font-mono text-slate-400">0:04</span>
                    </div>
                  </div>

                  {/* Text Transcription Box */}
                  <div className="space-y-1 bg-slate-950/40 p-2.5 rounded-lg border border-white/5">
                    <p className="text-xs text-slate-100 italic">
                      "{examples[activeTab].originalMessage}"
                    </p>
                    {examples[activeTab].language !== "English" && (
                      <p className="text-[10px] text-slate-400 border-t border-white/5 pt-1 mt-1 font-mono">
                        📝 MHP Translation: {examples[activeTab].translation}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Central Arrow indicator */}
              <div className="md:col-span-1 flex md:flex-col items-center justify-center py-2 md:py-0">
                <div className="w-8 h-8 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange flex items-center justify-center shadow-lg transform rotate-90 md:rotate-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* AI Structured Data Output (Right) */}
              <div className="md:col-span-5 space-y-3">
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">
                  Step 2: AI Extraction Log
                </p>
                <div className="bg-slate-950 rounded-2xl p-4 border border-brand-orange/20 relative shadow-2xl overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 rounded-full blur-xl pointer-events-none"></div>
                  
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
                    <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-brand-orange" /> MHP-PARSE v2.4
                    </span>
                    <span className="text-[8px] font-mono bg-brand-orange/15 text-brand-orange border border-brand-orange/20 px-1.5 py-0.5 rounded uppercase">
                      Structured Output
                    </span>
                  </div>

                  {/* Schema fields */}
                  <div className="space-y-2.5">
                    {examples[activeTab].structuredData.map((data, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <span className="text-slate-500 font-mono">{data.label}:</span>
                        <span className={`font-semibold px-2 py-0.5 rounded ${
                          data.isHighlight 
                            ? "bg-orange-500/15 text-brand-orange border border-brand-orange/10 font-bold"
                            : "bg-slate-900 text-slate-300"
                        }`}>
                          {data.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Slider Dots */}
            <div className="mt-6 flex justify-center space-x-1.5">
              {examples.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    i === activeTab ? "w-6 bg-brand-orange" : "w-1.5 bg-white/10 hover:bg-white/20"
                  }`}
                />
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
