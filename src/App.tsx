import React, { useState, useEffect } from "react";
import { 
  Hammer, 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  ShieldAlert, 
  Brain, 
  CheckCircle, 
  Layers, 
  Cpu, 
  MessageSquare,
  HelpCircle,
  Database,
  ArrowUpRight,
  PhoneCall,
  Lock,
  ChevronDown,
  Play,
  Activity,
  Award,
  Globe,
  Users,
  Speech,
  MapPin
} from "lucide-react";

import HeroAnimation from "./components/HeroAnimation";
import RealityShowcase from "./components/RealityShowcase";
import SoftwareChaos from "./components/SoftwareChaos";
import EnterpriseBICharts from "./components/EnterpriseBICharts";
import AIPipelineFlow from "./components/AIPipelineFlow";
import WaitlistForm from "./components/WaitlistForm";
import MultilingualShowcase from "./components/MultilingualShowcase";
import SecurityPrivacy from "./components/SecurityPrivacy";
import FAQ from "./components/FAQ";
import { INDUSTRY_REFERENCES } from "./data";
import { trackEvent, initScrollDepthTracking } from "../lib/firebase/analytics";

export default function App() {
  const [selectedFAQQuery, setSelectedFAQQuery] = useState<string | null>(null);
  const [showFloatingCta, setShowFloatingCta] = useState(false);

  // Initialize tracking and scroll listeners for floating CTA
  useEffect(() => {
    const cleanup = initScrollDepthTracking();

    const handleScroll = () => {
      if (typeof window === "undefined") return;
      // Show floating CTA after scrolling past the hero (approx 550px)
      if (window.scrollY > 550) {
        setShowFloatingCta(true);
      } else {
        setShowFloatingCta(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cleanup();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const marketMetrics = [
    { label: "Indian Construction Market", value: "US$1 Trillion", desc: "By 2030, fueling massive nationwide developer activity", icon: Globe },
    { label: "Active Construction Workers", value: "5.8 Crore+", desc: "The largest segment of physical labor globally", icon: Users },
    { label: "Core Developer Segment", value: "5 to 50 Projects", desc: "Medium builders facing maximum operational margins squeeze", icon: Layers },
    { label: "WhatsApp Adoption at Sites", value: "90%+", desc: "Site engineers and vendors already use it daily", icon: MessageSquare },
    { label: "AI Translation/Voice Cost", value: "-90%", desc: "Dramatically lower processing costs making voice logs cheap", icon: Cpu }
  ];

  // Construction Knowledge Assistant preset answers
  const faqQueries = [
    {
      q: "Show all cement purchases this month.",
      a: "📅 Cement Purchase Register (June 2026)\n\n• Bangalore South: 400 Bags (JSW Cement) @ ₹410/Bag — Total ₹1,64,000 (PO #1042, Delivered)\n• Pune Vista: 850 Bags (Ultratech) @ ₹425/Bag — Total ₹3,61,250 (PO #1059, Delivered)\n• Hyderabad Hub: 1,200 Bags (Ambuja Cement) @ ₹395/Bag — Total ₹4,74,000 (PO #1080, Approved)\n\n📊 Monthly Total: 2,450 Bags | Aggregate Value: ₹9,99,250 | Avg Rate: ₹407.85/Bag"
    },
    {
      q: "Which site is behind schedule?",
      a: "⚠️ Schedule Delay Flags (Active Project Scan)\n\n1. Project Meadows, Block B (Bengaluru South)\n   • Delay Level: Moderate (4 days behind milestone #3)\n   • Core Cause: 10 AM plastering was halted due to sand delivery discrepancy yesterday.\n   • MHP AI Auto-Remedy: Sourced alternative vendor 'Hindustan Sand' (within 3km), drafted quote approval pings for Project Director on WhatsApp."
    },
    {
      q: "What approvals are pending?",
      a: "📋 Pending Executive Sign-Offs (MHP Action Queue)\n\n• Pune Vista: Concrete casting approval for Tower C Slab (Structural check validated, awaits MD confirmation on WhatsApp) — ₹3,20,000 value\n• Mumbai Heights: Emergency PO for 2 Tons of TMT Steel (Balaji Steel, GST check verified) — ₹1,12,000 value"
    },
    {
      q: "How many workers were on Tower B yesterday?",
      a: "👷 Labor Log Summary — Tower B (Yesterday)\n\n• Main Contractor (Rishabh Infra): 19 present, 2 absent\n• Sub-Contractor Plastering Gang: 12 present, 0 absent\n• Electrical Gang: 4 present, 2 absent\n\n📊 Total Strength: 35 active workers. Daily Progress Rate: 100% target met."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 font-sans selection:bg-brand-orange selection:text-white relative overflow-hidden">
      
      {/* GLOWING AMBIENCE BACKDROPS - Sophisticated Dark style with subtle radial overlays */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.08)_0%,transparent_50%),radial-gradient(circle_at_20%_80%,rgba(249,115,22,0.05)_0%,transparent_50%)]"></div>
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[1200px] right-10 w-[600px] h-[600px] bg-brand-green/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute top-[2800px] left-10 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[150px] pointer-events-none"></div>

      {/* STICKY LIGHTWEIGHT HEADER */}
      <header className="sticky top-0 z-50 bg-[#0F172A]/90 backdrop-blur-md border-b border-white/5 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <a href="#" className="flex items-center space-x-2 group shrink-0">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-tr from-brand-orange to-orange-500 flex items-center justify-center border border-orange-400/20 shadow-md transition-transform group-hover:scale-105">
              <Hammer className="w-4.5 h-4.5 md:w-5 md:h-5 text-white animate-pulse" />
            </div>
            <div>
              <span className="text-base md:text-xl font-bold font-display tracking-tight text-white flex items-center">
                MHP <span className="text-brand-orange ml-1 text-[9px] md:text-xs px-1.5 py-0.5 rounded bg-brand-orange/10 border border-brand-orange/20 font-mono">CONSTRUCT AI</span>
              </span>
              <p className="text-[8px] md:text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-0.5">WhatsApp OS for Construction</p>
            </div>
          </a>

          {/* Minimal Navigation Links - Progressive enhancement for large screen */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-mono">
            <a 
              href="#reality" 
              onClick={() => trackEvent("feature_interaction", { element: "nav_link", target: "how_it_works" })}
              className="text-slate-400 hover:text-slate-100 transition-colors"
            >
              How it Works
            </a>
            <a 
              href="#problem" 
              onClick={() => trackEvent("feature_interaction", { element: "nav_link", target: "the_solution" })}
              className="text-slate-400 hover:text-slate-100 transition-colors"
            >
              The Solution
            </a>
            <a 
              href="#charts" 
              onClick={() => trackEvent("feature_interaction", { element: "nav_link", target: "bi_analytics" })}
              className="text-slate-400 hover:text-slate-100 transition-colors"
            >
              BI Analytics
            </a>
            <a 
              href="#pipeline" 
              onClick={() => trackEvent("feature_interaction", { element: "nav_link", target: "ai_pipeline" })}
              className="text-slate-400 hover:text-slate-100 transition-colors"
            >
              AI Pipeline
            </a>
            <a 
              href="#market" 
              onClick={() => trackEvent("feature_interaction", { element: "nav_link", target: "market_potential" })}
              className="text-slate-400 hover:text-slate-100 transition-colors"
            >
              Market Potential
            </a>
          </nav>

          {/* CTA Header Button (Highly Prominent on desktop, smaller but high-contrast on mobile) */}
          <div className="flex items-center space-x-3">
            <a 
              href="#waitlist" 
              onClick={() => trackEvent("hero_cta_click", { target: "header_invite" })}
              className="px-3 md:px-5 py-2 rounded-xl bg-gradient-to-r from-brand-orange to-orange-600 hover:from-orange-500 hover:to-orange-500 text-[10px] md:text-xs font-mono font-bold text-white transition-all shadow-md flex items-center space-x-1.5"
            >
              <span>Join Waitlist</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white" />
            </a>
          </div>

        </div>
      </header>

      {/* FLOATING BOTTOM CTA BAR (Visible on Mobile only after scroll) */}
      <div 
        className={`fixed bottom-4 left-4 right-4 z-50 md:hidden transition-all duration-300 transform ${
          showFloatingCta ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
        }`}
      >
        <a 
          href="#waitlist"
          onClick={() => trackEvent("floating_cta_click", { target: "mobile_bottom_bar" })}
          className="w-full h-12 flex items-center justify-between px-5 bg-gradient-to-r from-brand-orange to-orange-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all border border-orange-500/30"
        >
          <span>Reserve My Spot on MHP</span>
          <ArrowRight className="w-4 h-4 animate-pulse" />
        </a>
      </div>

      {/* HERO SECTION */}
      <section className="relative min-h-[calc(100vh-4rem)] lg:min-h-[85vh] flex items-center pt-8 pb-12 lg:py-24 overflow-hidden">
        {/* Animated grid overlay */}
        <div className="absolute inset-0 bg-blueprint opacity-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* HERO TEXT (Renders first everywhere, occupies top on mobile) */}
            <div className="lg:col-span-7 space-y-5 md:space-y-8 flex flex-col justify-center text-center lg:text-left">
              
              {/* Premium micro badge */}
              <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-full px-3.5 py-1.5 text-[10px] md:text-xs text-slate-300 mx-auto lg:mx-0 w-fit">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
                <span className="font-mono uppercase tracking-wider text-slate-400">Zero Site Staff Training Required</span>
              </div>

              <div className="space-y-3 md:space-y-4">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight">
                  Your Construction Company Already Runs on <span className="text-brand-green relative inline-block">WhatsApp.<span className="absolute left-0 bottom-1 w-full h-1.5 bg-brand-green/20"></span></span>
                  <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-orange-400 to-amber-500 block mt-1.5">
                    Let AI Run the Operations Behind It.
                  </span>
                </h1>
                
                {/* Supporting Multilingual Line */}
                <div className="py-1.5">
                  <p className="text-sm md:text-lg font-bold text-orange-400 tracking-wide uppercase font-display bg-orange-500/5 border border-brand-orange/10 px-4 py-2 rounded-xl inline-block">
                    Speak in your language. Work in your language. Let AI handle the rest.
                  </p>
                </div>

                <p className="text-xs md:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Site foremen and vendors log everything inside WhatsApp groups. MHP's deep intelligence automatically structures those messages into <strong>real-time dashboards, automated procurement RFQs, and predictive cost logs</strong>—without complex app training.
                </p>
              </div>

              {/* HIGH PROMINENCE CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start space-y-3.5 sm:space-y-0 sm:space-x-4 max-w-md mx-auto lg:mx-0">
                <a 
                  href="#waitlist" 
                  onClick={() => trackEvent("hero_cta_click", { target: "hero_join_early_access" })}
                  className="px-6 py-4 rounded-xl bg-gradient-to-r from-brand-orange to-orange-600 hover:from-orange-500 hover:to-orange-500 text-white font-black text-xs uppercase tracking-wider text-center shadow-xl shadow-orange-500/10 active:scale-95 transition-all flex items-center justify-center space-x-2 group border border-orange-500/20"
                >
                  <span>Get Early Access</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="#waitlist" 
                  onClick={() => trackEvent("demo_button_click", { target: "hero_book_demo" })}
                  className="px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-xs text-center border border-slate-800 hover:border-slate-700 active:scale-95 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Book Pilot Demo</span>
                </a>
              </div>

              {/* Focus stats / credentials */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/5 max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <h3 className="text-sm md:text-xl font-bold font-mono text-white">0 Hours</h3>
                  <p className="text-[8px] md:text-[10px] text-slate-500 tracking-wide uppercase mt-0.5">Site training</p>
                </div>
                <div>
                  <h3 className="text-sm md:text-xl font-bold font-mono text-brand-green">10 Mins</h3>
                  <p className="text-[8px] md:text-[10px] text-slate-500 tracking-wide uppercase mt-0.5">Approval delay</p>
                </div>
                <div>
                  <h3 className="text-sm md:text-xl font-bold font-mono text-brand-orange">₹70 L</h3>
                  <p className="text-[8px] md:text-[10px] text-slate-500 tracking-wide uppercase mt-0.5">Margin saved</p>
                </div>
              </div>

            </div>

            {/* HERO GRAPHIC PIPELINE (Placed strictly below text/CTAs on mobile) */}
            <div className="lg:col-span-5 w-full mt-6 lg:mt-0">
              <HeroAnimation />
            </div>

          </div>
        </div>
      </section>

      {/* CONSTRUCTION REALITY SECTION */}
      <section id="reality" className="py-12 md:py-28 bg-white/5 backdrop-blur-md border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-8 md:mb-16">
            <span className="font-mono text-[10px] md:text-xs text-brand-orange tracking-widest uppercase">THE REALITY OF INDIA'S SITE STREAMS</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black font-display text-white mt-1 leading-tight">
              How Construction Actually Works.
            </h2>
            <p className="text-slate-400 text-xs md:text-sm mt-2 leading-relaxed">
              Site supervisors already use WhatsApp daily. MHP sits in the background, structuring that stream into audit logs. Select any message below to watch MHP transcribe, process, and map to budget parameters.
            </p>
          </div>

          {/* Interactive Showcase component (Responsive Layout) */}
          <RealityShowcase />

        </div>
      </section>

      {/* MULTILINGUAL SHOWCASE */}
      <MultilingualShowcase />

      {/* PROBLEM SECTION */}
      <section id="problem" className="py-12 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-8 md:mb-16">
            <span className="font-mono text-[10px] md:text-xs text-red-400 tracking-widest uppercase">THE SYSTEMIC BOTTLENECK</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black font-display text-white mt-1 leading-tight">
              Construction Doesn't Have a Software Problem. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-brand-orange block mt-1">
                It Has a Communication Problem.
              </span>
            </h2>
            <p className="text-slate-400 text-xs md:text-sm mt-3 leading-relaxed">
              Site engineers don't sit behind desks typing rows into rigid ERP platforms. They log updates over verbal chats. Without automation, requests get buried—causing severe operational delay and leakage.
            </p>
          </div>

          {/* Interactive Before/After Chaos Panel */}
          <SoftwareChaos />

        </div>
      </section>

      {/* CHARTS / ENTERPRISE BI ANALYTICS SECTION */}
      <section id="charts" className="py-12 md:py-28 bg-white/5 backdrop-blur-md border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-8 md:mb-16">
            <span className="font-mono text-[10px] md:text-xs text-brand-blue tracking-widest uppercase">MHP ENTERPRISE BI ANALYTICS</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black font-display text-white mt-1 leading-tight">
              Quantifiable Impact for Managing Directors.
            </h2>
            <p className="text-slate-400 text-xs md:text-sm mt-2 leading-relaxed">
              Real metrics from pilot trials across major metropolitan regions show high margin savings and instant approval turnarounds.
            </p>
          </div>

          {/* Charts Container */}
          <EnterpriseBICharts />

        </div>
      </section>

      {/* AI PIPELINE WORKFLOW SECTION */}
      <section id="pipeline" className="py-12 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="max-w-3xl text-center mx-auto mb-10 md:mb-16">
            <span className="font-mono text-[10px] md:text-xs text-brand-orange tracking-widest uppercase">MHP NEURAL DATAPATH</span>
            <h2 className="text-2xl md:text-3xl font-black font-display text-white mt-1 leading-tight">
              The Real-Time AI Operating Pipeline
            </h2>
            <p className="text-slate-400 text-xs md:text-sm mt-2 max-w-xl mx-auto leading-relaxed">
              Watch how a single WhatsApp voice note registers, validates, quotes, and forecasts project timelines seamlessly.
            </p>
          </div>

          {/* Pipeline flow component */}
          <AIPipelineFlow />

        </div>
      </section>

      {/* FEATURES SECTION (Construction Workflows) */}
      <section className="py-12 md:py-28 bg-white/5 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-10 md:mb-16">
            <span className="font-mono text-[10px] md:text-xs text-brand-orange tracking-widest uppercase">BUILT FOR ACTUAL WORKFLOWS</span>
            <h2 className="text-2xl md:text-4xl font-black font-display text-white mt-1 leading-tight">
              Designed Around Site Realities, Not Office Desks
            </h2>
            <p className="text-slate-400 text-xs md:text-sm mt-2 leading-relaxed">
              MHP is constructed to streamline actual communication habits of real-world physical crews.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch mb-12">
            
            {/* Feature 1: Multilingual Voice Intelligence */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-white/20 transition-all">
              <div>
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-brand-orange/20 text-brand-orange flex items-center justify-center mb-4">
                  <Speech className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white font-display">Multilingual Voice Intelligence</h4>
                <p className="text-xs text-slate-400 leading-relaxed mt-1.5">
                  Understand voice notes, messages, and documents across multiple Indian languages and mixed-language conversations without requiring your team to change how they communicate.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5">
                <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1.5">Native Dialect Chips:</p>
                <div className="flex flex-wrap gap-1">
                  {["English", "Hindi", "Kannada", "Tamil", "Telugu", "Marathi", "Malayalam", "Bengali"].map((lang) => (
                    <span key={lang} className="text-[9px] font-mono bg-slate-900 border border-white/5 text-slate-400 px-1.5 py-0.5 rounded">
                      {lang}
                    </span>
                  ))}
                  <span className="text-[9px] font-mono bg-brand-orange/15 text-brand-orange border border-brand-orange/10 px-1.5 py-0.5 rounded font-bold">
                    + More
                  </span>
                </div>
              </div>
            </div>

            {/* Feature 2: Procurement Automation */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-white/20 transition-all">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-brand-blue/20 text-brand-blue flex items-center justify-center mb-4">
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white font-display">Procurement Automation</h4>
                <p className="text-xs text-slate-400 leading-relaxed mt-1.5">
                  Isolate raw material purchase requests. Auto-draft RFQs, scan local hardware vendors, check budget cost codes, and queue PO drafts.
                </p>
              </div>
              <ul className="text-[9px] font-mono text-slate-500 mt-4 space-y-1 border-t border-white/5 pt-3">
                <li>• Vendor cost-code tracking auto-match</li>
                <li>• Real-time delivery verification logs</li>
              </ul>
            </div>

            {/* Feature 3: Daily Site Reports */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-white/20 transition-all">
              <div>
                <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-brand-green/20 text-brand-green flex items-center justify-center mb-4">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white font-display">Daily Site Reports (DPR)</h4>
                <p className="text-xs text-slate-400 leading-relaxed mt-1.5">
                  Auto-compile site diaries by matching messages, photos, and progress. Removes hours of evening form typing for supervisors.
                </p>
              </div>
              <ul className="text-[9px] font-mono text-slate-500 mt-4 space-y-1 border-t border-white/5 pt-3">
                <li>• Eliminates manual DPR entry entirely</li>
                <li>• Auto-formatted PDF reports exported</li>
              </ul>
            </div>

            {/* Feature 4: AI Delay Prediction */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-white/20 transition-all">
              <div>
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white font-display">AI Delay & Cost Prediction</h4>
                <p className="text-xs text-slate-400 leading-relaxed mt-1.5">
                  Catch delays before casting stops. Flag missing contractors, model labor productivity rates, and warn on steel shortages.
                </p>
              </div>
              <ul className="text-[9px] font-mono text-slate-500 mt-4 space-y-1 border-t border-white/5 pt-3">
                <li>• Predicts supply lags 48 hours early</li>
                <li>• Alerts MD on margin risks</li>
              </ul>
            </div>

            {/* Feature 5: Construction Knowledge Assistant */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-white/20 transition-all md:col-span-2">
              <div className="space-y-3">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
                    <Brain className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white font-display">Interactive Knowledge Assistant</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1.5">
                    Query your active construction project database by typing natural questions. Try the assistant preset questions below:
                  </p>
                </div>

                {/* Preset FAQs selection buttons */}
                <div className="grid grid-cols-2 gap-2">
                  {faqQueries.map((item) => (
                    <button
                      key={item.q}
                      onClick={() => {
                        setSelectedFAQQuery(item.q);
                        trackEvent("feature_interaction", { element: "faq_selection", query: item.q });
                      }}
                      className={`text-[10px] md:text-xs font-mono p-2.5 rounded-xl border text-left transition-all ${
                        selectedFAQQuery === item.q
                          ? "bg-purple-950/50 border-purple-500 text-white font-bold"
                          : "bg-[#0F172A] border-white/5 text-slate-400 hover:border-white/20 hover:text-slate-300"
                      }`}
                    >
                      "{item.q}"
                    </button>
                  ))}
                </div>

                {/* Answer Display */}
                <div className="bg-[#0F172A] rounded-2xl p-4 border border-white/5 min-h-[110px] flex flex-col justify-between">
                  {selectedFAQQuery ? (
                    <div className="space-y-1.5">
                      <p className="text-[9px] font-mono text-purple-400 uppercase tracking-widest">Query Result:</p>
                      <pre className="text-xs font-mono text-slate-200 leading-relaxed whitespace-pre-wrap">
                        {faqQueries.find((f) => f.q === selectedFAQQuery)?.a}
                      </pre>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full py-4 text-slate-500">
                      <HelpCircle className="w-7 h-7 mb-1.5 opacity-30 text-purple-400" />
                      <span className="text-xs font-mono text-center">Select a question to test instant database retrieval</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* MARKET OPPORTUNITY & COUNTERS SECTION */}
      <section id="market" className="py-12 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-10 md:mb-16">
            <span className="font-mono text-[10px] md:text-xs text-brand-orange tracking-widest uppercase">THE INDIA OPPORTUNITY</span>
            <h2 className="text-2xl md:text-4xl font-black font-display text-white mt-1 leading-tight">
              An Untapped US$1 Trillion Construction Market
            </h2>
            <p className="text-slate-400 text-xs md:text-sm mt-2 leading-relaxed">
              India's real estate and infrastructure sector is undergoing unprecedented expansion. MHP unlocks efficiency where traditional desk-bound systems failed.
            </p>
          </div>

          {/* Metric Bento Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {marketMetrics.map((metric, i) => {
              const MetricIcon = metric.icon;
              return (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 flex flex-col justify-between hover:border-white/20 transition-all glow-blue">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] font-mono text-slate-500">METRIC 0{i + 1}</span>
                    <MetricIcon className="w-4 h-4 text-brand-orange opacity-60" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-3xl font-bold font-display text-white tracking-tight">{metric.value}</h3>
                    <h4 className="text-xs font-semibold text-slate-300 mt-1">{metric.label}</h4>
                    <p className="text-[10px] text-slate-500 mt-1.5 leading-relaxed">{metric.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* INDUSTRY RESEARCH & CASE FOR MESSAGING-FIRST TECH */}
      <section className="py-12 md:py-28 bg-white/5 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="max-w-3xl text-center mx-auto mb-10 md:mb-16">
            <span className="font-mono text-[10px] md:text-xs text-brand-orange tracking-widest uppercase">INDUSTRY INSIGHTS & EXPERT CONSENSUS</span>
            <h2 className="text-2xl md:text-4xl font-black font-display text-white mt-1 leading-tight">
              The Reality of Construction Site Operations
            </h2>
            <p className="text-slate-400 text-xs md:text-sm mt-2 max-w-xl mx-auto leading-relaxed">
              Global research and industry studies highlight why traditional, heavy ERPs fail to gain traction on-site and why simple, messaging-first solutions are essential.
            </p>
          </div>

          {/* Reference Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INDUSTRY_REFERENCES.map((ref, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between relative hover:border-white/20 transition-all duration-300 group">
                <div>
                  {/* Top Header Row with Stat */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-white/5">
                    <div>
                      <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase">{ref.metric}</span>
                      <h4 className="text-sm font-bold text-slate-200 mt-0.5">{ref.source}</h4>
                    </div>
                    <div className="shrink-0 text-left sm:text-right">
                      <div className="text-3xl md:text-4xl font-black font-display text-brand-orange leading-none">{ref.stat}</div>
                      <div className="text-[9px] text-slate-400 font-mono mt-1">{ref.statLabel}</div>
                    </div>
                  </div>

                  {/* Quote Body */}
                  <blockquote className="text-xs md:text-sm italic text-slate-300 leading-relaxed font-sans mb-6 relative pl-4">
                    <span className="text-3xl font-serif text-brand-orange/20 absolute -top-4 left-0 select-none">“</span>
                    <span className="relative z-10">{ref.quote}</span>
                  </blockquote>
                </div>

                {/* Footer Section with Publication */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4 mt-auto">
                  <div className="text-[10px] text-slate-400">
                    <span className="font-semibold text-slate-300">Publication:</span> {ref.report}
                  </div>
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${ref.badgeColor} shrink-0`}>
                    Verified Insight
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECURITY & PRIVACY SECTION */}
      <SecurityPrivacy />

      {/* FAQ SECTION */}
      <FAQ />

      {/* TRUST BANNER */}
      <section className="py-10 md:py-14 bg-gradient-to-r from-orange-950/20 via-slate-950 to-orange-950/20 border-y border-brand-orange/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.06),transparent_60%)]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-3">
          <p className="font-mono text-[10px] md:text-xs text-brand-orange uppercase tracking-widest font-black">
            Core Data Commitment
          </p>
          <h3 className="text-lg md:text-2xl lg:text-3xl font-black font-display text-white">
            Your project data belongs to you—not to us.
          </h3>
          <p className="text-xs md:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            MHP is built so your construction intelligence remains under your control. We never use or monetize your private documents, site recordings, or operational registers to train public AI models.
          </p>
        </div>
      </section>

      {/* WAITLIST GLASSMORPHIC SECTION */}
      <section id="waitlist" className="py-12 md:py-32 relative scroll-mt-20">
        <div className="absolute inset-0 bg-blueprint opacity-10 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center space-y-3 mb-8">
            <span className="font-mono text-[10px] md:text-xs text-brand-orange tracking-widest uppercase">MHP PILOT COHORT Q3 2026</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black font-display text-white leading-tight">
              Secure Your Priority Early Access Invitation
            </h2>
            <p className="text-slate-400 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
              We process voice transcription securely. Spot allocation is limited to <strong>15 builders</strong> per city to ensure high onboarding touch.
            </p>
          </div>

          {/* Waitlist Form container (Simplified Lead Capture) */}
          <WaitlistForm />

          {/* Informative Pilot hubs */}
          <div className="mt-8 flex flex-wrap justify-center gap-3 md:gap-4 text-[9px] md:text-[10px] font-mono text-slate-500">
            <span>ACTIVE PILOT HUBS:</span>
            <span className="text-slate-300 flex items-center"><MapPin className="w-3 h-3 text-red-500 mr-1" /> BENGALURU</span>
            <span className="text-slate-300 flex items-center"><MapPin className="w-3 h-3 text-red-500 mr-1" /> HYDERABAD</span>
            <span className="text-slate-300 flex items-center"><MapPin className="w-3 h-3 text-red-500 mr-1" /> PUNE</span>
            <span className="text-slate-300 flex items-center"><MapPin className="w-3 h-3 text-red-500 mr-1" /> CHENNAI</span>
            <span className="text-slate-300 flex items-center"><MapPin className="w-3 h-3 text-red-500 mr-1" /> MUMBAI</span>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0b101d] border-t border-white/5 py-8 md:py-12 text-xs text-slate-500 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-white/5 pb-6 mb-6">
            <div className="space-y-2 max-w-sm text-center md:text-left">
              <span className="text-sm font-bold text-white flex items-center justify-center md:justify-start">
                MHP <span className="text-brand-orange ml-1 text-[10px] px-1.5 py-0.5 rounded bg-brand-orange/10 border border-brand-orange/20 font-mono">CONSTRUCT AI</span>
              </span>
              <p className="leading-relaxed text-[11px]">
                The world's first AI Operating System built around the natural communication habits of Indian construction teams. Running entirely inside WhatsApp.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 font-mono text-[9px] md:text-[10px] uppercase">
              <a href="#reality" className="hover:text-slate-300">How it Works</a>
              <a href="#problem" className="hover:text-slate-300">The Solution</a>
              <a href="#charts" className="hover:text-slate-300">BI Metrics</a>
              <a href="#waitlist" className="hover:text-slate-300">Apply Now</a>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-[11px] gap-4 text-center sm:text-left">
            <p>© 2026 MHP Construct AI Technologies Private Limited. All rights reserved.</p>
            <p className="flex items-center justify-center sm:justify-start space-x-1 font-mono text-[10px]">
              <Lock className="w-3 h-3 text-brand-orange" />
              <span>Secured by Enterprise RLS & local-hosted language models</span>
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
