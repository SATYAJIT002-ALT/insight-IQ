"use client";

import React from "react";
import { TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
import { KPI } from "@/types";

export default function ExecutiveKPICard({ kpi }: { kpi: KPI }) {
  const isUp = kpi.trend >= 0;
  const progressPct = Math.min(100, Math.max(10, (kpi.value / kpi.target) * 100));

  const formatVal = (val: number, unit: string) => {
    if (unit === "$") {
      return `$${val >= 1000000 ? (val / 1000000).toFixed(2) + "M" : val.toLocaleString()}`;
    }
    if (unit === "%") {
      return `${val.toFixed(1)}%`;
    }
    return val.toLocaleString();
  };

  return (
    <div className="glass-panel glass-panel-hover p-5 rounded-2xl relative overflow-hidden group">
      {/* Aurora Ambient Glow on hover */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {kpi.name}
        </span>
        <div className={`flex items-center space-x-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
          isUp ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
        }`}>
          {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          <span>{isUp ? `+${kpi.trend}%` : `${kpi.trend}%`}</span>
        </div>
      </div>

      <div className="flex items-baseline space-x-2 my-2">
        <span className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
          {formatVal(kpi.value, kpi.unit)}
        </span>
        <span className="text-xs text-slate-500">vs target {formatVal(kpi.target, kpi.unit)}</span>
      </div>

      {/* Target Progress Bar */}
      <div className="mt-3">
        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 transition-all duration-1000"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
