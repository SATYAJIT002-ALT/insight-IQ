"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BarChart3, Lock, Mail, User, ArrowRight } from "lucide-react";
import { useAppStore } from "@/store/useStore";

export default function RegisterPage() {
  const router = useRouter();
  const { setUser } = useAppStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"ADMIN" | "MANAGER" | "ANALYST" | "VIEWER">("ANALYST");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      id: "usr-new-1",
      email,
      name,
      role,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
    }, "valid-jwt-token");
    router.push("/dashboard");
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
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Create InsightIQ Account</h1>
          <p className="text-xs text-slate-400">Register new enterprise analytics team member</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="text"
                placeholder="Sarah Connor"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-slate-900 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Corporate Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="email"
                placeholder="s.connor@insightiq.ai"
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

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Select Access Role</label>
            <select
              value={role}
              onChange={(e: any) => setRole(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/50 cursor-pointer"
            >
              <option value="ADMIN">Admin (Full Control)</option>
              <option value="MANAGER">Manager (Reports & Alerts)</option>
              <option value="ANALYST">Analyst (Data Cleaning & SQL)</option>
              <option value="VIEWER">Viewer (Read-Only Dashboard)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all"
          >
            <span>Complete Registration</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-400 pt-2 border-t border-white/10">
          <span>Already registered? </span>
          <Link href="/login" className="text-cyan-400 font-semibold hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
