"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, UploadCloud, Sparkles, Terminal, FileSpreadsheet, 
  BellRing, ShieldCheck, Settings, LineChart, Cpu, Layers
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Executive Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Data Ingestion", href: "/upload", icon: UploadCloud },
  { name: "Data Cleaner", href: "/clean", icon: Layers },
  { name: "SQL Studio", href: "/sql", icon: Terminal },
  { name: "AI Insights & Forecast", href: "/ai-insights", icon: Sparkles },
  { name: "Report Builder", href: "/reports", icon: FileSpreadsheet },
  { name: "Alert Center", href: "/alerts", icon: BellRing },
  { name: "Admin Console", href: "/admin", icon: ShieldCheck },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 glass-panel border-r border-white/10 min-h-[calc(100vh-61px)] p-4 hidden md:flex flex-col justify-between bg-slate-950/60 backdrop-blur-md">
      <div className="space-y-6">
        <div>
          <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">
            Analytics Platform
          </p>
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600/30 to-indigo-600/30 text-white border border-blue-500/40 shadow-lg shadow-blue-500/10"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Sidebar Footer Widget */}
      <div className="p-3.5 rounded-xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 border border-blue-500/20 text-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />
        <div className="flex items-center space-x-2 text-cyan-400 font-semibold mb-1">
          <Cpu className="w-4 h-4" />
          <span>ML Model Engine</span>
        </div>
        <p className="text-[11px] text-slate-400 mb-2">
          Random Forest & Linear Reg model retrained 12m ago.
        </p>
        <div className="flex items-center justify-between text-[10px] text-slate-300">
          <span>Accuracy Score</span>
          <span className="font-bold text-emerald-400">96.2%</span>
        </div>
      </div>
    </aside>
  );
}
