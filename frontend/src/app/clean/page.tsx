"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Layers, Sparkles, CheckCircle2, ShieldAlert, ArrowRight, RefreshCw } from "lucide-react";

export default function DataCleanPage() {
  const [cleaning, setCleaning] = useState(false);
  const [report, setReport] = useState<any>({
    filename: "Q3_Enterprise_Sales.csv",
    original_rows: 1500,
    cleaned_rows: 1450,
    duplicates_removed: 50,
    nulls_filled: 38,
    outliers_detected: 12,
    health_score: 94,
    actions_summary: [
      "Removed 50 duplicate row entries.",
      "Imputed 38 missing numeric values with column median.",
      "Flagged 12 numeric outliers using Z-score threshold (> 3 std dev).",
      "Formatted 2 date columns to ISO 8601 YYYY-MM-DD standard."
    ],
    preview: [
      { TX_ID: "TX-101", Product: "InsightIQ Neural Core", Amount: 12500, Margin: 5200, Status: "CLEAN", Health: "100%" },
      { TX_ID: "TX-102", Product: "Quantum Data Warehouse", Amount: 8900, Margin: 3100, Status: "IMPUTED", Health: "96%" },
      { TX_ID: "TX-103", Product: "ZeroTrust Shield", Amount: 6500, Margin: 2100, Status: "CLEAN", Health: "100%" }
    ]
  });

  const handleTriggerClean = () => {
    setCleaning(true);
    setTimeout(() => {
      setCleaning(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-8 overflow-y-auto">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Layers className="w-6 h-6 text-cyan-400" />
              Automated Data Cleaning Engine
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Pandas & NumPy powered pipeline for duplicate removal, missing value imputation, and Z-score outlier detection.
            </p>
          </div>

          {/* Cleaning Controls Card */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="font-bold text-white text-base">Pipeline Transformation Parameters</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <label className="flex items-center space-x-3 p-3 rounded-xl bg-slate-900/80 border border-white/10 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded accent-blue-500 w-4 h-4" />
                <div>
                  <span className="font-semibold text-white block">Remove Duplicates</span>
                  <span className="text-[11px] text-slate-400">Exact row deduplication</span>
                </div>
              </label>

              <label className="flex items-center space-x-3 p-3 rounded-xl bg-slate-900/80 border border-white/10 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded accent-blue-500 w-4 h-4" />
                <div>
                  <span className="font-semibold text-white block">Impute Missing Nulls</span>
                  <span className="text-[11px] text-slate-400">Median / mode fill</span>
                </div>
              </label>

              <label className="flex items-center space-x-3 p-3 rounded-xl bg-slate-900/80 border border-white/10 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded accent-blue-500 w-4 h-4" />
                <div>
                  <span className="font-semibold text-white block">Z-Score Outlier Flag</span>
                  <span className="text-[11px] text-slate-400">&gt; 3.0 std dev threshold</span>
                </div>
              </label>
            </div>

            <button
              onClick={handleTriggerClean}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${cleaning ? "animate-spin" : ""}`} />
              <span>{cleaning ? "Processing Data Cleaning Pipeline..." : "Execute Data Quality Pipeline"}</span>
            </button>
          </div>

          {/* Health Score & Cleaning Summary Report */}
          {report && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Score Meter */}
              <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center space-y-4">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Data Quality Health Index</p>
                
                <div className="relative w-36 h-36 flex items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-emerald-400 p-2 shadow-xl shadow-emerald-500/20">
                  <div className="w-full h-full bg-slate-950 rounded-full flex flex-col items-center justify-center">
                    <span className="text-4xl font-extrabold text-white">{report.health_score}%</span>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase">Optimal Quality</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 w-full pt-2 border-t border-white/10 text-center">
                  <div>
                    <p className="font-bold text-white text-sm">{report.duplicates_removed}</p>
                    <p className="text-[10px] text-slate-400">Dups Removed</p>
                  </div>
                  <div>
                    <p className="font-bold text-cyan-400 text-sm">{report.nulls_filled}</p>
                    <p className="text-[10px] text-slate-400">Nulls Filled</p>
                  </div>
                  <div>
                    <p className="font-bold text-purple-400 text-sm">{report.outliers_detected}</p>
                    <p className="text-[10px] text-slate-400">Outliers</p>
                  </div>
                </div>
              </div>

              {/* Action Log */}
              <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
                <h3 className="font-bold text-white text-base">Pipeline Transformation Audit Log</h3>
                <div className="space-y-2">
                  {report.actions_summary.map((act: string, idx: number) => (
                    <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
