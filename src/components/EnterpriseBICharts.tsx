import React, { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  Legend,
  LineChart,
  Line
} from "recharts";
import { 
  TrendingUp, 
  Clock, 
  Coins, 
  HelpCircle, 
  Check, 
  MessageSquare,
  Sparkles,
  ArrowDownRight,
  ShieldCheck
} from "lucide-react";

export default function EnterpriseBICharts() {
  const [activeChart, setActiveChart] = useState<"volume" | "leakage" | "time">("volume");

  // Chart 1: Site Communication Channels (Voice vs. Text) over 6 months
  const volumeData = [
    { month: "Jan", voice: 25000, text: 15000, total: 40000 },
    { month: "Feb", voice: 38000, text: 17000, total: 55000 },
    { month: "Mar", voice: 52000, text: 20000, total: 72000 },
    { month: "Apr", voice: 68000, text: 24000, total: 92000 },
    { month: "May", voice: 84000, text: 26000, total: 110000 },
    { month: "Jun", voice: 98000, text: 30000, total: 128000 }
  ];

  // Chart 2: ₹70 Lakh Cost Leakage per Project (Before vs After MHP)
  const leakageData = [
    { name: "Verbal Site Changes", Traditional: 25.0, MHP: 1.2 },
    { name: "Material Discrepancies", Traditional: 18.0, MHP: 1.5 },
    { name: "GST & Billing Errors", Traditional: 15.0, MHP: 0.8 },
    { name: "Labor Idle Time (Delays)", Traditional: 12.0, MHP: 0.5 }
  ];

  // Chart 3: Approval Delays & Monthly Hours Saved
  const timelineData = [
    { projectCount: "1 Project", TraditionalHoursSpent: 45, MHP_HoursSpent: 5, Savings: 40 },
    { projectCount: "3 Projects", TraditionalHoursSpent: 135, MHP_HoursSpent: 15, Savings: 120 },
    { projectCount: "5 Projects", TraditionalHoursSpent: 225, MHP_HoursSpent: 25, Savings: 200 },
    { projectCount: "10 Projects", TraditionalHoursSpent: 450, MHP_HoursSpent: 50, Savings: 400 }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0F172A] border border-white/5 p-3 rounded-xl shadow-xl font-mono text-xs text-slate-300">
          <p className="font-bold text-white mb-1.5">{label}</p>
          {payload.map((entry: any, i: number) => (
            <p key={i} className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
              <span className="text-slate-400 capitalize">{entry.name}:</span>
              <strong className="text-slate-100">{entry.value.toLocaleString()}</strong>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Selection Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Tab 1: Volumetric */}
        <button
          onClick={() => setActiveChart("volume")}
          className={`text-left p-4 rounded-2xl border transition-all duration-300 ${
            activeChart === "volume"
              ? "bg-white/5 border-orange-500/40 shadow-lg glow-orange"
              : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10px] text-slate-500 uppercase">01 • Site Streams</span>
            <span className={`w-2 h-2 rounded-full ${activeChart === "volume" ? "bg-brand-orange animate-ping" : "bg-slate-700"}`} />
          </div>
          <h4 className="text-sm font-bold text-slate-200">50,000+ Voice Notes</h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Scaling from 50k to 100k voice messages. Highlighting 60-70% total voice volume.
          </p>
        </button>

        {/* Tab 2: Cost Leaks */}
        <button
          onClick={() => setActiveChart("leakage")}
          className={`text-left p-4 rounded-2xl border transition-all duration-300 ${
            activeChart === "leakage"
              ? "bg-white/5 border-blue-500/40 shadow-lg glow-blue"
              : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10px] text-slate-500 uppercase">02 • Margin Guard</span>
            <span className={`w-2 h-2 rounded-full ${activeChart === "leakage" ? "bg-brand-blue animate-ping" : "bg-slate-700"}`} />
          </div>
          <h4 className="text-sm font-bold text-slate-200">₹70 Lakh Leakage Saved</h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Plugging leaks from verbal updates, billing errors, and idle labor budgets.
          </p>
        </button>

        {/* Tab 3: Timeline Velocity */}
        <button
          onClick={() => setActiveChart("time")}
          className={`text-left p-4 rounded-2xl border transition-all duration-300 ${
            activeChart === "time"
              ? "bg-white/5 border-green-500/40 shadow-lg glow-green"
              : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10px] text-slate-500 uppercase">03 • Velocity Index</span>
            <span className={`w-2 h-2 rounded-full ${activeChart === "time" ? "bg-brand-green animate-ping" : "bg-slate-700"}`} />
          </div>
          <h4 className="text-sm font-bold text-slate-200">120+ Hours Recovered</h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Slashing approval delays from 3 days to under 10 minutes.
          </p>
        </button>
      </div>

      {/* Main Chart Card */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-25 pointer-events-none"></div>

        {activeChart === "volume" && (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-4 border-b border-white/5 gap-3">
              <div>
                <h4 className="text-base font-bold text-slate-200 flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-brand-orange" />
                  <span>Unstructured WhatsApp Voice Ingestion (Monthly)</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Over 60% of all site operations communication occurs verbally via WhatsApp.
                </p>
              </div>
              <div className="flex items-center space-x-4 font-mono text-xs">
                <span className="flex items-center space-x-1.5 text-brand-orange bg-brand-orange/10 border border-brand-orange/20 px-2 py-0.5 rounded">
                  <span>Voice: 68% Avg</span>
                </span>
                <span className="flex items-center space-x-1.5 text-brand-blue bg-brand-blue/10 border border-brand-blue/20 px-2 py-0.5 rounded">
                  <span>Text/Photos: 32% Avg</span>
                </span>
              </div>
            </div>

            {/* Recharts Area Chart */}
            <div className="h-80 w-full relative z-10 pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={volumeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVoice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F97316" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#F97316" stopOpacity={0.01}/>
                    </linearGradient>
                    <linearGradient id="colorText" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.01}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#475569" fontSize={11} tickLine={false} />
                  <YAxis stroke="#475569" fontSize={11} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                  <Area type="monotone" name="WhatsApp Voice Notes (Qty)" dataKey="voice" stroke="#F97316" strokeWidth={2} fillOpacity={1} fill="url(#colorVoice)" />
                  <Area type="monotone" name="WhatsApp Text & Photos (Qty)" dataKey="text" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorText)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="pt-4 border-t border-white/5 text-xs text-slate-400 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <span className="flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-brand-orange" />
                <span>MHP scales voice processing seamlessly, converting over <strong>2-3 Crore structured data points</strong> per year.</span>
              </span>
              <span className="font-mono text-[10px] text-slate-500">Source: MHP Indian Mid-Market Construction Survey 2025</span>
            </div>
          </div>
        )}

        {activeChart === "leakage" && (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-4 border-b border-white/5 gap-3">
              <div>
                <h4 className="text-base font-bold text-slate-200 flex items-center space-x-2">
                  <Coins className="w-5 h-5 text-brand-blue" />
                  <span>Profit Leakage Breakdown per Active Project (₹ Lakhs)</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  How unrecorded commitments and delays deplete structural development margins.
                </p>
              </div>
              <div className="flex items-center space-x-2 font-mono text-xs">
                <span className="px-2.5 py-1 rounded bg-red-950/40 text-red-400 border border-red-900/30">
                  Before MHP: ₹70L Loss
                </span>
                <span className="px-2.5 py-1 rounded bg-emerald-950/40 text-brand-green border border-brand-green/30">
                  With MHP: &lt; ₹4L Loss
                </span>
              </div>
            </div>

            {/* Recharts Bar Chart */}
            <div className="h-80 w-full relative z-10 pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={leakageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#475569" fontSize={11} tickLine={false} />
                  <YAxis stroke="#475569" fontSize={11} tickLine={false} label={{ value: '₹ Lakhs', angle: -90, position: 'insideLeft', offset: 10, fill: '#475569' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="top" height={36} iconType="square" />
                  <Bar name="Traditional ERP / Paper Records" dataKey="Traditional" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  <Bar name="MHP AI Operating System" dataKey="MHP" fill="#25D366" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="pt-4 border-t border-white/5 text-xs text-slate-400 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <span className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-green" />
                <span>Saves up to <strong>94% of leakages</strong> by binding voice promises directly to vendor ledgers.</span>
              </span>
              <span className="font-mono text-brand-green font-semibold">Margin Recovery Index: Outstanding</span>
            </div>
          </div>
        )}

        {activeChart === "time" && (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-4 border-b border-white/5 gap-3">
              <div>
                <h4 className="text-base font-bold text-slate-200 flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-brand-green" />
                  <span>Administrative Time Recovery Index (Hours/Month)</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Eliminating manual report compilation and material tracking delays.
                </p>
              </div>
              <div className="flex items-center space-x-2 font-mono text-xs">
                <span className="px-2 py-0.5 rounded bg-emerald-950/30 text-brand-green border border-brand-green/20">
                  Target: 120+ Hours Saved
                </span>
              </div>
            </div>

            {/* Recharts Line/Area Chart */}
            <div className="h-80 w-full relative z-10 pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="projectCount" stroke="#475569" fontSize={11} tickLine={false} />
                  <YAxis stroke="#475569" fontSize={11} tickLine={false} label={{ value: 'Hours / Month', angle: -90, position: 'insideLeft', offset: 10, fill: '#475569' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                  <Line type="monotone" name="Traditional Admin Hours" dataKey="TraditionalHoursSpent" stroke="#ef4444" strokeWidth={3} activeDot={{ r: 6 }} />
                  <Line type="monotone" name="MHP Powered Hours" dataKey="MHP_HoursSpent" stroke="#3b82f6" strokeWidth={3} />
                  <Line type="monotone" name="Recovered Core Engineering Time" dataKey="Savings" stroke="#25D366" strokeWidth={3} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="pt-4 border-t border-white/5 text-xs text-slate-400 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <span className="flex items-center space-x-1.5">
                <Clock className="w-4 h-4 text-brand-orange animate-pulse" />
                <span>Approval pipelines slashed from <strong>3 Days to 10 Minutes</strong> via immediate WhatsApp push alerts.</span>
              </span>
              <span className="font-mono text-slate-500">Efficiency Index: +900%</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
