import React, { useState } from "react";
import { 
  AlertTriangle, 
  MessageSquare, 
  Trash2, 
  User, 
  Check, 
  X, 
  Clock, 
  ChevronRight, 
  ArrowRight,
  TrendingDown, 
  FileText, 
  Layers,
  LayoutGrid,
  Sparkles,
  ShoppingBag,
  Bell,
  CheckSquare
} from "lucide-react";

export default function SoftwareChaos() {
  const [activeTab, setActiveTab] = useState<"chaos" | "dashboard">("chaos");

  // Chaos Messages Data
  const chaoticMessages = [
    {
      id: "m-1",
      sender: "Suresh (Sub-contractor)",
      text: "Sir, where is our payment? Materials arrived but workers refusing to unload without Cash. Need ₹1,50,000 immediately.",
      type: "complaint",
      time: "09:12 AM",
      badge: "Urgent Payment Request",
      urgency: "high"
    },
    {
      id: "m-2",
      sender: "Site Supervisor Gate 4",
      text: "🎤 Voice note (0:48) - 'Bags of steel we ordered got delivered to the North Gate instead of South. Delay of 4 hours because forklift driver is absent...'",
      type: "voice",
      time: "10:30 AM",
      badge: "Delay & Resource Block",
      urgency: "medium"
    },
    {
      id: "m-3",
      sender: "Vendor (Balaji Steel)",
      text: "Attached: Invoice_Balaji_7392_GST.pdf. Please approve payment soon otherwise price will hike tomorrow.",
      type: "invoice",
      time: "11:45 AM",
      badge: "Raw Invoice Unchecked",
      urgency: "medium"
    },
    {
      id: "m-4",
      sender: "Nitin (Client / Developer)",
      text: "I visited Tower B yesterday. Why is curing not done? Slab is drying out. If cracks appear we will hold back next milestone payment.",
      type: "complaint",
      time: "02:15 PM",
      badge: "Quality Penalty Risk",
      urgency: "high"
    },
    {
      id: "m-5",
      sender: "Anonymous Foreman",
      text: "[Photo] 3 workers sleeping behind Cement Shed. Concrete batching machine is leaking oil also. Pls check.",
      type: "alert",
      time: "04:30 PM",
      badge: "Labor Leakage",
      urgency: "low"
    }
  ];

  // Dashboard Items (MHP Resolved)
  const procurementTracker = [
    { id: "p-1", item: "53-Grade OPC Cement", qty: "400 Bags", vendor: "JSW Cement", status: "Delivered & Verified", badgeColor: "bg-emerald-950 text-emerald-400 border-emerald-900" },
    { id: "p-2", item: "8mm TMT Reinforcement Steel", qty: "2.5 Tons", vendor: "TATA Tiscon", status: "PO Approved, In Transit", badgeColor: "bg-blue-950 text-blue-400 border-blue-900" },
    { id: "p-3", item: "Coarse Aggregates (20mm)", qty: "4 Brass", vendor: "Balaji Ltd", status: "Awaiting MD Approval", badgeColor: "bg-amber-950 text-amber-400 border-amber-900" }
  ];

  const activeApprovals = [
    { id: "a-1", title: "Subcontractor Labor Payout", desc: "Suresh Cash Advance (Unloading)", amount: "₹1,50,000", requester: "Pune Gate 4" },
    { id: "a-2", title: "JSW Invoice Match Verification", desc: "GST Match 18% Verified against GRN", amount: "₹4,82,000", requester: "Procurement Hub" }
  ];

  const delayAlerts = [
    { id: "d-1", title: "Curing Neglect Detected", location: "Tower B - 3rd Floor Slab", alert: "Smart sensors & image log flags drying. Dispatched curing gang.", severity: "Critical Actioned" },
    { id: "d-2", title: "Forklift Driver Absenteeism", location: "North Gate Hub", alert: "Re-allocated operator from Tower C to avoid unloading penalty.", severity: "Resolved" }
  ];

  return (
    <div className="space-y-6">
      {/* Selector Tabs */}
      <div className="flex p-1.5 bg-black/20 rounded-2xl border border-white/5 max-w-md mx-auto relative z-10">
        <button
          onClick={() => setActiveTab("chaos")}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl font-medium text-xs transition-all ${
            activeTab === "chaos"
              ? "bg-gradient-to-r from-red-950/40 to-orange-950/40 border border-red-500/30 text-red-200"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-brand-orange animate-pulse" />
          <span>The Chaos (Before MHP)</span>
        </button>
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl font-medium text-xs transition-all ${
            activeTab === "dashboard"
              ? "bg-gradient-to-r from-green-950/40 to-blue-950/40 border border-brand-green/30 text-green-200"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Sparkles className="w-4 h-4 text-brand-green" />
          <span>The Command Center (MHP AI)</span>
        </button>
      </div>

      {/* Main Sandbox Box */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 min-h-[500px] flex flex-col justify-between overflow-hidden relative">
        <div className="absolute inset-0 bg-blueprint opacity-10 pointer-events-none"></div>

        {activeTab === "chaos" ? (
          /* CHAOS SCREEN */
          <div className="relative z-10 space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <div>
                <span className="text-[10px] font-mono text-slate-500">GROUP CHAT STREAM (UNSTRUCTURED)</span>
                <h4 className="text-sm font-bold text-slate-300">"Tower B & C Execution Group"</h4>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-red-950/50 text-red-400 border border-red-900/40 animate-pulse">
                ⚠️ 23 Unread Requests • Communication Leaking
              </span>
            </div>

            {/* Chaotic overlapping messaging items */}
            <div className="space-y-3 relative max-h-[380px] overflow-y-auto pr-1">
              {chaoticMessages.map((msg, index) => (
                <div 
                  key={msg.id}
                  className={`p-3.5 rounded-2xl bg-white/5 border transition-all duration-300 relative ${
                    msg.urgency === "high" 
                      ? "border-red-500/30 bg-red-950/20 glow-blue" 
                      : "border-white/5"
                  }`}
                  style={{
                    transform: `translateY(${index * 2}px)`
                  }}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold text-slate-200">{msg.sender}</span>
                    <span className="text-[10px] font-mono text-slate-500">{msg.time}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{msg.text}</p>
                  
                  <div className="flex items-center justify-between mt-3.5 pt-2 border-t border-white/5 text-[10px]">
                    <span className="font-mono text-slate-500 bg-black/25 px-2 py-0.5 rounded border border-white/5">
                      {msg.badge}
                    </span>
                    <span className={`font-bold uppercase ${
                      msg.urgency === "high" ? "text-red-400" : "text-slate-400"
                    }`}>
                      {msg.urgency} urgency
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Conversion CTA banner */}
            <div className="pt-4 border-t border-white/5 flex justify-between items-center text-xs">
              <span className="text-slate-400">Owners waste 4+ hours/day digging through messages like this.</span>
              <button 
                onClick={() => setActiveTab("dashboard")}
                className="text-brand-orange font-bold hover:underline flex items-center space-x-1"
              >
                <span>Automate with MHP</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* MHP UNIFIED COMMAND CENTER */
          <div className="relative z-10 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-4 border-b border-white/5 gap-3">
              <div>
                <span className="text-[10px] font-mono text-brand-orange bg-brand-orange/10 border border-brand-orange/20 px-2 py-0.5 rounded">
                  ★ MHP AI ACTIVE AGENT WORKING
                </span>
                <h4 className="text-base font-bold text-white mt-1.5 flex items-center space-x-2">
                  <span>MHP Operational Control Center</span>
                </h4>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <span className="px-2 py-1 rounded bg-[#0F172A] border border-white/5">
                  Project: <strong className="text-slate-200">Mumbai Heights</strong>
                </span>
                <span className="px-2 py-1 rounded bg-emerald-950/40 text-brand-green border border-brand-green/20 font-bold">
                  ● Systems Synced
                </span>
              </div>
            </div>

            {/* Grid Dashboard layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Box 1: Procurement Tracker */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                    <h5 className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
                      <ShoppingBag className="w-3.5 h-3.5 text-brand-orange" />
                      <span>Procurement Pipeline</span>
                    </h5>
                    <span className="text-[9px] font-mono text-slate-500">Live</span>
                  </div>
                  <div className="space-y-2.5">
                    {procurementTracker.map((p) => (
                      <div key={p.id} className="text-[11px] p-2 bg-black/20 rounded-lg border border-white/5">
                        <div className="flex justify-between font-medium text-slate-200">
                          <span>{p.item}</span>
                          <span>{p.qty}</span>
                        </div>
                        <div className="flex justify-between items-center mt-1.5 text-[9px] text-slate-500">
                          <span>{p.vendor}</span>
                          <span className={`px-1.5 py-0.5 rounded font-mono border ${p.badgeColor}`}>{p.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-3 text-[10px] text-slate-400 italic">
                  Auto-extracted from WhatsApp site supervisor chat orders.
                </div>
              </div>

              {/* Box 2: Automated Approval Workflows */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                    <h5 className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
                      <CheckSquare className="w-3.5 h-3.5 text-brand-green" />
                      <span>Pending Actions (1-Tap Approve)</span>
                    </h5>
                    <span className="text-[9px] font-mono text-brand-green bg-brand-green/15 border border-brand-green/20 px-1.5 py-0.5 rounded animate-pulse">Active</span>
                  </div>
                  <div className="space-y-2.5">
                    {activeApprovals.map((a) => (
                      <div key={a.id} className="text-[11px] p-2.5 bg-black/20 rounded-lg border border-white/5">
                        <div className="flex justify-between font-bold text-slate-200">
                          <span className="truncate max-w-[120px]">{a.title}</span>
                          <span className="text-brand-orange font-bold">{a.amount}</span>
                        </div>
                        <p className="text-[9px] text-slate-400 mt-1">{a.desc}</p>
                        <div className="flex items-center space-x-1 mt-2.5 pt-2 border-t border-white/5">
                          <button className="flex-1 py-1 rounded bg-brand-green/20 text-brand-green text-[9px] font-mono font-bold hover:bg-brand-green/35 border border-brand-green/30 transition-colors">
                            APPROVE (WA)
                          </button>
                          <button className="px-2 py-1 rounded bg-[#0F172A] text-slate-500 text-[9px] hover:text-red-400 hover:bg-red-950/20 border border-white/5 transition-colors">
                            REJECT
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-3 text-[10px] text-slate-400 italic">
                  Matched with GST registry and current project budget ledger.
                </div>
              </div>

              {/* Box 3: Automated Delay Prediction & Resolution */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                    <h5 className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
                      <Bell className="w-3.5 h-3.5 text-red-400 animate-bounce" />
                      <span>Delay Alerts (Predictive)</span>
                    </h5>
                    <span className="text-[9px] font-mono text-slate-500">2 Resolved</span>
                  </div>
                  <div className="space-y-2.5">
                    {delayAlerts.map((d) => (
                      <div key={d.id} className="text-[11px] p-2 bg-black/20 rounded-lg border border-white/5">
                        <div className="flex justify-between font-medium">
                          <span className="text-slate-300">{d.title}</span>
                          <span className={`text-[8px] font-mono font-bold px-1 py-0.5 rounded ${
                            d.severity.includes("Critical") ? "bg-red-950 text-red-400" : "bg-slate-800 text-slate-400"
                          }`}>{d.severity}</span>
                        </div>
                        <p className="text-[9px] text-slate-500 mt-1">{d.location}</p>
                        <p className="text-[9px] text-slate-400 bg-black/20 p-1.5 rounded mt-1.5 border border-white/5">
                          {d.alert}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-3 text-[10px] text-slate-400 italic">
                  Identified by comparing structural logs with local site telemetry.
                </div>
              </div>

            </div>

            {/* Summary strip */}
            <div className="pt-4 border-t border-white/5 flex flex-col md:flex-row md:items-center md:justify-between text-xs text-slate-400 gap-2">
              <span className="flex items-center space-x-1.5">
                <Check className="w-4 h-4 text-brand-green" />
                <span>Zero manual entry: Site supervisors continued messaging on WhatsApp, while MHP fully structured their stream.</span>
              </span>
              <span className="font-mono text-xs text-brand-green bg-brand-green/5 border border-brand-green/20 px-2 py-0.5 rounded">
                ⚡ Estimated Monthly Leakage Prevented: ₹3.4 Lakhs
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
