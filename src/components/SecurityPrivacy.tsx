import React from "react";
import { Shield, Lock, Server, EyeOff, FolderLock, ShieldCheck } from "lucide-react";

export default function SecurityPrivacy() {
  const securityFeatures = [
    {
      title: "Private AI Options",
      description: "Run AI models locally or in your private environment for sensitive workloads. We support localized language model setups so no prompt leaves your physical or cloud parameters.",
      icon: Server,
      accent: "text-brand-orange bg-orange-500/10 border-brand-orange/20",
    },
    {
      title: "Your Data Stays Yours",
      description: "Your project information is never used to train public AI models. Strict organizational data silos guarantee that your competitive intelligence remains isolated to your tenancy.",
      icon: EyeOff,
      accent: "text-brand-green bg-green-500/10 border-brand-green/20",
    },
    {
      title: "Secure by Design",
      description: "Modern end-to-end encryption for data in transit and at rest, role-based access controls (RBAC), and secure infrastructure adhering strictly to cloud-native security best practices.",
      icon: Lock,
      accent: "text-brand-blue bg-blue-500/10 border-brand-blue/20",
    },
    {
      title: "Built for Confidential Projects",
      description: "Ideal for leading developers, contractors, and engineering firms managing sensitive project pricing, private contracts, client catalogs, and internal site cost logs.",
      icon: FolderLock,
      accent: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
  ];

  return (
    <section id="security" className="py-12 md:py-28 relative overflow-hidden bg-white/[0.01] border-y border-white/5">
      {/* Visual background accents */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-green/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-18">
          <span className="font-mono text-[10px] md:text-xs text-brand-green tracking-widest uppercase flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" /> Enterprise-Grade Trust
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black font-display text-white mt-1 leading-tight">
            Enterprise-Grade Security for Construction Businesses
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mt-3 leading-relaxed">
            We understand that drawings, bill of quantities (BOQs), quotations, and contracts contain the core competitive intelligence of your construction business. MHP’s privacy-first architecture guarantees your data remains fully under your ownership and control.
          </p>
        </div>

        {/* Security Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mb-12">
          {securityFeatures.map((feat, idx) => {
            const IconComponent = feat.icon;
            return (
              <div 
                key={idx}
                className="bg-slate-900/40 border border-white/5 hover:border-white/15 rounded-2xl p-6 md:p-8 flex flex-col justify-between transition-all group hover:bg-slate-900/60"
              >
                <div className="space-y-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center border shrink-0 ${feat.accent}`}>
                    <IconComponent className="w-5 h-5 transition-transform group-hover:scale-110" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-white font-display">
                    {feat.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>DEPLOYMENT STATUS: READY</span>
                  <span className="text-brand-green">● ISOLATED ENGINE</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enterprise Highlights / Core Commitments */}
        <div className="bg-gradient-to-r from-slate-950 to-slate-900 border border-white/10 rounded-2xl p-5 md:p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Cloud Compliance</h4>
            <p className="text-xs text-slate-500">SOC2 Type II compliant standards for storage servers.</p>
          </div>
          <div className="space-y-1 sm:border-x sm:border-white/5 sm:px-6">
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Zero Training Data Leak</h4>
            <p className="text-xs text-slate-500">Zero fine-tuning or prompt-logging on global public datasets.</p>
          </div>
          <div className="space-y-1 sm:pl-6">
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">On-Prem Integration</h4>
            <p className="text-xs text-slate-500">Supports direct localized Docker deployment for air-gapped projects.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
