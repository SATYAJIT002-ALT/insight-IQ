"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import ExecutiveKPICard from "@/components/charts/ExecutiveKPICard";
import RevenueTrendChart from "@/components/charts/RevenueTrendChart";
import CategoryBarChart from "@/components/charts/CategoryBarChart";
import RegionalPieChart from "@/components/charts/RegionalPieChart";
import DataCubeCanvas from "@/components/3d/DataCube";
import { fetchKPIs, fetchCharts } from "@/lib/api";
import { KPI } from "@/types";
import { useAppStore } from "@/store/useStore";
import { 
  Filter, RefreshCw, Download, Layers, Sparkles, Terminal, 
  Globe2, TrendingUp, Cpu, ArrowUpRight
} from "lucide-react";

export default function DashboardPage() {
  const { regionFilter, setRegionFilter, categoryFilter, setCategoryFilter } = useAppStore();
  
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [charts, setCharts] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const kpiRes = await fetchKPIs(regionFilter, categoryFilter);
      const chartRes = await fetchCharts(regionFilter, categoryFilter);
      setKpis(kpiRes);
      setCharts(chartRes);
    } catch (e) {
      console.error("Dashboard data load error", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [regionFilter, categoryFilter]);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-8 overflow-y-auto">
          {/* Dashboard Header & Global Filters */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 glass-panel p-5 rounded-2xl border border-white/10">
            <div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                Executive BI Dashboard
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  Live Engine
                </span>
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Real-time enterprise metrics aggregated across global transactions.
              </p>
            </div>

            {/* Filter Bar Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center space-x-2 bg-slate-900/80 border border-white/10 px-3 py-1.5 rounded-xl text-xs">
                <Filter className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-slate-400">Region:</span>
                <select
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                  className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
                >
                  <option value="ALL" className="bg-slate-900">All Regions</option>
                  <option value="North America" className="bg-slate-900">North America</option>
                  <option value="Europe" className="bg-slate-900">Europe</option>
                  <option value="Asia Pacific" className="bg-slate-900">Asia Pacific</option>
                  <option value="Latin America" className="bg-slate-900">Latin America</option>
                  <option value="Middle East" className="bg-slate-900">Middle East</option>
                </select>
              </div>

              <div className="flex items-center space-x-2 bg-slate-900/80 border border-white/10 px-3 py-1.5 rounded-xl text-xs">
                <span className="text-slate-400">Category:</span>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
                >
                  <option value="ALL" className="bg-slate-900">All Categories</option>
                  <option value="Enterprise AI" className="bg-slate-900">Enterprise AI</option>
                  <option value="Cloud Infrastructure" className="bg-slate-900">Cloud Infrastructure</option>
                  <option value="Cybersecurity" className="bg-slate-900">Cybersecurity</option>
                  <option value="Data Analytics" className="bg-slate-900">Data Analytics</option>
                  <option value="SaaS Tools" className="bg-slate-900">SaaS Tools</option>
                </select>
              </div>

              <button
                onClick={loadDashboardData}
                className="p-2 rounded-xl glass-panel hover:bg-white/10 border border-white/10 text-slate-300 transition-colors"
                title="Refresh Metrics"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-cyan-400" : ""}`} />
              </button>
            </div>
          </div>

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {kpis.map((kpi) => (
              <ExecutiveKPICard key={kpi.id} kpi={kpi} />
            ))}
          </div>

          {/* Main Analytics Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Monthly Revenue & Profit Trend (2 columns) */}
            <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-base">Monthly Revenue & Profit Trajectory</h3>
                  <p className="text-xs text-slate-400">Historical performance aggregated across 12 calendar months</p>
                </div>
                <div className="flex items-center space-x-3 text-xs">
                  <span className="flex items-center gap-1.5 text-blue-400 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Revenue
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Net Profit
                  </span>
                </div>
              </div>
              {charts?.monthly_trend && <RevenueTrendChart data={charts.monthly_trend} />}
            </div>

            {/* 3D Data Cube Widget & Regional Pie */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-white text-base">3D Interactive Data Cube</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">Three.js</span>
                </div>
                <p className="text-xs text-slate-400">Hover or drag to inspect dimensional data points</p>
              </div>

              <div className="h-44 w-full glass-panel rounded-xl overflow-hidden border border-white/5 flex items-center justify-center">
                <DataCubeCanvas />
              </div>

              <div className="pt-2 border-t border-white/5">
                <p className="text-xs font-semibold text-slate-300 mb-2">Sales by Region Distribution</p>
                {charts?.region_chart && <RegionalPieChart data={charts.region_chart} />}
              </div>
            </div>
          </div>

          {/* Secondary Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Revenue & Margin */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
              <h3 className="font-bold text-white text-base">Category Revenue vs Gross Margin</h3>
              <p className="text-xs text-slate-400">Product category breakdown and margin efficiency</p>
              {charts?.category_chart && <CategoryBarChart data={charts.category_chart} />}
            </div>

            {/* Global Geo Map Hub Points */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-cyan-400" />
                  Global Enterprise Tech Hubs
                </h3>
                <span className="text-xs text-slate-400">Active territories</span>
              </div>
              
              <div className="space-y-3">
                {charts?.geo_points?.map((pt: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5 hover:border-blue-500/30 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xs font-bold text-cyan-400">
                        {pt.country.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-xs text-white">{pt.city}</p>
                        <p className="text-[11px] text-slate-400">{pt.country}</p>
                      </div>
                    </div>
                    <span className="font-bold text-xs text-emerald-400">
                      ${(pt.sales / 1000000).toFixed(2)}M
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
