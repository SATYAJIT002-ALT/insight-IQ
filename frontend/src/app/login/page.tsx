"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BarChart3, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { useAppStore } from "@/store/useStore";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAppStore();

  const [email, setEmail] = useState("admin@insightiq.ai");
  const [password, setPassword] = useState("password123");
  const [role, setRole] = useState<"ADMIN" | "MANAGER" | "ANALYST" | "VIEWER">("ADMIN");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      id: "usr-logged-1",
      email,
      name: role === "ADMIN" ? "Sarah Connor (Admin)" : role === "MANAGER" ? "Marcus Vance (Manager)" : role === "ANALYST" ? "Elena Rostova (Analyst)" : "David Chen (Viewer)",
      role,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
    }, "valid-jwt-token");
    
    router.push("/dashboard");
  };

  const handleQuickRole = (selectedRole: "ADMIN" | "MANAGER" | "ANALYST" | "VIEWER", emailVal: string) => {
    setRole(selectedRole);
    setEmail(emailVal);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col justify-center items-center p-6 aurora-bg">
      <div className="w-full max-w-md glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/30 mx-auto">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">InsightIQ Authentication</h1>
          <p className="text-xs text-slate-400">Sign in to access enterprise BI analytics</p>
        </div>

        {/* Demo Quick Role Selection */}
        <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Quick Role Switcher</p>
          <div className="grid grid-cols-2 gap-1.5 text-[11px]">
            <button
              onClick={() => handleQuickRole("ADMIN", "admin@insightiq.ai")}
              className={`p-1.5 rounded-lg border font-semibold transition-all ${role === 'ADMIN' ? 'bg-blue-600 text-white border-blue-400' : 'bg-slate-950 text-slate-300 border-white/5 hover:bg-white/5'}`}
            >
              Admin Tier
            </button>
            <button
              onClick={() => handleQuickRole("MANAGER", "manager@insightiq.ai")}
              className={`p-1.5 rounded-lg border font-semibold transition-all ${role === 'MANAGER' ? 'bg-purple-600 text-white border-purple-400' : 'bg-slate-950 text-slate-300 border-white/5 hover:bg-white/5'}`}
            >
              Manager Tier
            </button>
            <button
              onClick={() => handleQuickRole("ANALYST", "analyst@insightiq.ai")}
              className={`p-1.5 rounded-lg border font-semibold transition-all ${role === 'ANALYST' ? 'bg-cyan-600 text-white border-cyan-400' : 'bg-slate-950 text-slate-300 border-white/5 hover:bg-white/5'}`}
            >
              Analyst Tier
            </button>
            <button
              onClick={() => handleQuickRole("VIEWER", "viewer@insightiq.ai")}
              className={`p-1.5 rounded-lg border font-semibold transition-all ${role === 'VIEWER' ? 'bg-slate-700 text-white border-slate-500' : 'bg-slate-950 text-slate-300 border-white/5 hover:bg-white/5'}`}
            >
              Viewer Tier
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Corporate Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-900 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-900 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/50"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all"
          >
            <span>Sign In to InsightIQ</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-400 pt-2 border-t border-white/10">
          <span>Don't have an account? </span>
          <Link href="/register" className="text-cyan-400 font-semibold hover:underline">
            Register team user
          </Link>
        </div>
      </div>
    </div>
  );
}
