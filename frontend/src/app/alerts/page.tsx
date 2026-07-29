"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { BellRing, AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";
import { useAppStore } from "@/store/useStore";

export default function AlertsPage() {
  const { alerts, acknowledgeAlert } = useAppStore();

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <BellRing className="w-6 h-6 text-rose-400" />
              Smart Alert Center & Notification Engine
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Configurable threshold triggers for revenue drops, inventory shortages, and customer churn.
            </p>
          </div>

          <div className="space-y-4">
            {alerts.map((a) => (
              <div
                key={a.id}
                className={`glass-panel p-5 rounded-2xl border transition-all ${
                  a.severity === 'CRITICAL'
                    ? 'border-rose-500/40 bg-rose-950/20'
                    : a.severity === 'HIGH'
                    ? 'border-amber-500/40 bg-amber-950/20'
                    : 'border-white/10 bg-slate-900/60'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-xl flex-shrink-0 ${
                      a.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-bold text-white text-sm">{a.title}</h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                          a.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                        }`}>
                          {a.severity} SEVERITY
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{a.message}</p>
                      <p className="text-[11px] text-slate-500 mt-2">
                        Metric: <strong className="text-slate-300">{a.metric}</strong> | Threshold: {a.threshold} | Current: <span className="text-cyan-400 font-bold">{a.current}</span>
                      </p>
                    </div>
                  </div>

                  {a.status === 'ACTIVE' ? (
                    <button
                      onClick={() => acknowledgeAlert(a.id)}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/20 flex items-center justify-center gap-1.5 self-start sm:self-center transition-all"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Acknowledge</span>
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1 self-start sm:self-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Acknowledged
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
