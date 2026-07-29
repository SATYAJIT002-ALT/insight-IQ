"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { ShieldCheck, Users, Activity, Lock, Database } from "lucide-react";

export default function AdminPage() {
  const users = [
    { id: "usr-1", name: "Sarah Connor", email: "admin@insightiq.ai", role: "ADMIN", status: "Active" },
    { id: "usr-2", name: "Marcus Vance", email: "manager@insightiq.ai", role: "MANAGER", status: "Active" },
    { id: "usr-3", name: "Elena Rostova", email: "analyst@insightiq.ai", role: "ANALYST", status: "Active" },
    { id: "usr-4", name: "David Chen", email: "viewer@insightiq.ai", role: "VIEWER", status: "Active" }
  ];

  const auditLogs = [
    { id: "log-1", user: "Sarah Connor (Admin)", action: "USER_ROLE_UPDATE", details: "Granted Manager role to Marcus Vance", ip: "192.168.1.10", time: "10 mins ago" },
    { id: "log-2", user: "Marcus Vance", action: "REPORT_EXPORT_PDF", details: "Exported Q3 Executive Summary PDF", ip: "10.0.4.12", time: "1 hour ago" },
    { id: "log-3", user: "Elena Rostova", action: "DATA_CLEANED", details: "Ran data quality pipeline on Q3_Sales.csv", ip: "172.16.0.45", time: "3 hours ago" }
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-8 overflow-y-auto">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-rose-400" />
              Enterprise Admin Console & Security Audit
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Manage user team accounts, RBAC security permissions, and system audit logs.
            </p>
          </div>

          {/* User Team Management Table */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" /> Team Access & Role Management
              </h3>
              <span className="text-xs text-slate-400">4 Active Users</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-400 border-b border-white/10">
                  <tr>
                    <th className="p-3 font-semibold">User</th>
                    <th className="p-3 font-semibold">Email</th>
                    <th className="p-3 font-semibold">Role Tier</th>
                    <th className="p-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-3 font-semibold text-white">{u.name}</td>
                      <td className="p-3 text-slate-400">{u.email}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase border ${
                          u.role === 'ADMIN' ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' :
                          u.role === 'MANAGER' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-3 text-emerald-400 font-medium">{u.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Audit Logs Table */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-400" /> System Security Audit Trail
            </h3>

            <div className="space-y-3 text-xs">
              {auditLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
                  <div>
                    <span className="font-bold text-white">{log.user}</span>
                    <span className="mx-2 text-slate-500">•</span>
                    <span className="font-mono text-cyan-400 text-[11px]">{log.action}</span>
                    <p className="text-slate-400 text-[11px] mt-0.5">{log.details}</p>
                  </div>
                  <div className="text-right text-[10px] text-slate-500">
                    <p>{log.ip}</p>
                    <p>{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
