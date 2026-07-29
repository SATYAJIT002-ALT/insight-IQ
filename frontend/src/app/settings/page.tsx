"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Settings, Sliders, Moon, Globe, Key, Bell } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Settings className="w-6 h-6 text-cyan-400" />
              Platform Settings & System Preferences
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Configure dark theme preferences, export defaults, notification alerts, and API keys.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6 max-w-3xl">
            <div className="space-y-4 text-xs">
              <h3 className="font-bold text-white text-sm border-b border-white/10 pb-2">Appearance & Theme</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-200">Dark Mode Aesthetic</p>
                  <p className="text-[11px] text-slate-400">Glassmorphism and aurora glow elements</p>
                </div>
                <input type="checkbox" defaultChecked className="rounded accent-blue-500 w-4 h-4 cursor-pointer" />
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <h3 className="font-bold text-white text-sm border-b border-white/10 pb-2">API Keys & External Access</h3>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">FastAPI Backend Endpoint Token</label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value="insightiq_secret_enterprise_jwt_token_2026"
                    readOnly
                    className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-4 py-2 text-xs text-slate-300 font-mono"
                  />
                  <button className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-white/10">
                    Regenerate Key
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
