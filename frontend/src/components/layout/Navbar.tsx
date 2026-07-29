"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, Bell, Search, User, Shield, ChevronDown, 
  Sparkles, Terminal, Database, Sliders, LogOut, CheckCircle2
} from "lucide-react";
import { useAppStore } from "@/store/useStore";

export default function Navbar() {
  const pathname = usePathname();
  const { user, searchQuery, setSearchQuery, unreadAlertCount, alerts, acknowledgeAlert, logout } = useAppStore();
  const [showAlertsMenu, setShowAlertsMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/10 bg-gray-950/80 backdrop-blur-md px-4 lg:px-8 py-3 flex items-center justify-between">
      {/* Brand & Logo */}
      <div className="flex items-center space-x-3">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <span className="font-bold text-lg text-white tracking-wide flex items-center gap-1.5">
              Insight<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">IQ</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 font-medium">ENT v1.0</span>
            </span>
          </div>
        </Link>
      </div>

      {/* Global Search Bar */}
      <div className="hidden md:flex items-center relative max-w-md w-full mx-4">
        <Search className="w-4 h-4 absolute left-3 text-slate-400" />
        <input
          type="text"
          placeholder="Search metrics, reports, customers, SQL tables..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-900/70 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
        />
        <kbd className="hidden lg:inline-block absolute right-3 px-1.5 py-0.5 text-[10px] text-slate-400 bg-slate-800 rounded border border-slate-700">
          ⌘K
        </kbd>
      </div>

      {/* Right Action Icons */}
      <div className="flex items-center space-x-3">
        {/* Real-time Online Indicator */}
        <div className="hidden sm:flex items-center space-x-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Engine Online</span>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowAlertsMenu(!showAlertsMenu)}
            className="p-2 rounded-lg bg-slate-900/60 border border-white/10 hover:border-blue-500/40 text-slate-300 hover:text-white transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            {unreadAlertCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                {unreadAlertCount}
              </span>
            )}
          </button>

          {showAlertsMenu && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 glass-panel rounded-xl shadow-2xl p-4 z-50 border border-white/10 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                <span className="font-semibold text-white">System Alerts & Notifications</span>
                <span className="text-[10px] text-slate-400">{unreadAlertCount} active</span>
              </div>
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {alerts.map((a) => (
                  <div key={a.id} className={`p-2.5 rounded-lg border transition-all ${a.status === 'ACTIVE' ? 'bg-slate-900/90 border-blue-500/30' : 'bg-slate-950/40 border-white/5 opacity-60'}`}>
                    <div className="flex items-start justify-between">
                      <span className="font-medium text-slate-200">{a.title}</span>
                      {a.status === 'ACTIVE' && (
                        <button
                          onClick={() => acknowledgeAlert(a.id)}
                          className="text-[10px] text-blue-400 hover:text-blue-300 flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3" /> Ack
                        </button>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{a.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 p-1.5 rounded-lg bg-slate-900/60 border border-white/10 hover:border-blue-500/40 transition-colors"
          >
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
              alt={user?.name || "User"}
              className="w-7 h-7 rounded-full object-cover border border-blue-500/40"
            />
            <span className="hidden sm:inline-block font-medium text-xs text-slate-200">{user?.name}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 glass-panel rounded-xl shadow-2xl p-2 z-50 border border-white/10 text-xs">
              <div className="px-3 py-2 border-b border-white/10 mb-1">
                <p className="font-semibold text-white">{user?.name}</p>
                <p className="text-slate-400 text-[11px]">{user?.email}</p>
                <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  ROLE: {user?.role}
                </span>
              </div>
              <Link href="/admin" className="flex items-center gap-2 px-3 py-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                <Shield className="w-3.5 h-3.5" /> Admin Console
              </Link>
              <Link href="/settings" className="flex items-center gap-2 px-3 py-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                <Sliders className="w-3.5 h-3.5" /> Settings
              </Link>
              <button
                onClick={() => logout()}
                className="w-full flex items-center gap-2 px-3 py-2 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors mt-1 border-t border-white/5"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
