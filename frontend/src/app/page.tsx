"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  BarChart3, Sparkles, Shield, Cpu, Terminal, ArrowRight, CheckCircle, 
  Layers, UploadCloud, FileSpreadsheet, Activity, ChevronRight, Zap, Globe
} from "lucide-react";
import EarthGlobeCanvas from "@/components/3d/EarthGlobe";

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does InsightIQ handle large-scale enterprise datasets?",
      a: "InsightIQ combines PostgreSQL database indexing with Pandas/NumPy parallel execution engines and Next.js 15 streaming rendering to handle millions of row records with millisecond latency."
    },
    {
      q: "Can I connect custom data sources or upload local CSV/Excel files?",
      a: "Yes. InsightIQ includes an automated Data Ingestion engine supporting CSV, Excel (.xlsx), and JSON file uploads with automated column detection, schema validation, and instant database ingestion."
    },
    {
      q: "What Machine Learning models power the AI Forecasting module?",
      a: "Our ML engine utilizes Scikit-Learn ensemble models combining Linear Regression and Random Forest Regressors to predict multi-quarter sales, revenue, demand, and profit margins with confidence interval bounds."
    },
    {
      q: "Is role-based access control (RBAC) included?",
      a: "Yes. InsightIQ enforces granular enterprise RBAC across four predefined user tiers: Admin, Manager, Analyst, and Viewer."
    }
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-blue-500 selection:text-white">
      {/* Top Floating Glass Navigation Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-white/10 px-6 lg:px-12 py-4 flex items-center justify-between backdrop-blur-xl bg-slate-950/70">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/30">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <span className="font-bold text-xl text-white tracking-wide">
            Insight<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">IQ</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-xs font-medium text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#demo" className="hover:text-white transition-colors">Live Preview</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </nav>

        <div className="flex items-center space-x-4">
          <Link
            href="/login"
            className="text-xs font-semibold px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/dashboard"
            className="text-xs font-semibold px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25 flex items-center gap-1.5 transition-all hover:scale-105"
          >
            <span>Launch Platform</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero Section with 3D Globe */}
      <section className="relative pt-16 pb-24 px-6 lg:px-12 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Next-Gen Enterprise BI Engine v1.0</span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Predictive Business Intelligence <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              Powered by AI & 3D Analytics
            </span>
          </h1>

          <p className="text-sm lg:text-base text-slate-400 max-w-xl leading-relaxed">
            Transform raw corporate datasets into real-time interactive 3D visualizations, automated data quality reports, natural language SQL queries, and ML-backed revenue projections.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <Link
              href="/dashboard"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold text-sm shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2 hover:scale-105 transition-all"
            >
              <span>Explore Live Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/sql"
              className="px-6 py-3.5 rounded-xl glass-panel text-slate-200 font-semibold text-sm hover:bg-white/10 flex items-center justify-center gap-2 transition-all border border-white/10"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Try Natural Language SQL</span>
            </Link>
          </div>

          {/* Quick Specs */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-center sm:text-left">
            <div>
              <p className="text-xl font-extrabold text-white">99.99%</p>
              <p className="text-[11px] text-slate-400">Data Uptime</p>
            </div>
            <div>
              <p className="text-xl font-extrabold text-cyan-400">&lt; 15ms</p>
              <p className="text-[11px] text-slate-400">Query Latency</p>
            </div>
            <div>
              <p className="text-xl font-extrabold text-purple-400">96.2%</p>
              <p className="text-[11px] text-slate-400">Forecast Accuracy</p>
            </div>
          </div>
        </div>

        {/* 3D Globe Visual */}
        <div className="relative w-full h-[400px] lg:h-[500px] glass-panel rounded-3xl p-4 overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center">
          <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900/80 border border-white/10 text-xs text-slate-300">
            <Globe className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
            <span>Interactive 3D Data Sphere</span>
          </div>
          <EarthGlobeCanvas />
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section id="features" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl font-bold text-white">Built for Fortune 500 Analytics Workflows</h2>
          <p className="text-xs text-slate-400">Everything enterprise data teams need in one unified intelligence platform.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: UploadCloud,
              title: "Automated Data Ingestion",
              desc: "Upload CSV, Excel, or JSON datasets with instant column detection, schema preview, and database loading.",
              color: "text-blue-400"
            },
            {
              icon: Layers,
              title: "Pandas Data Quality Engine",
              desc: "Automatically remove duplicate rows, impute missing values, detect Z-score outliers, and generate health scores.",
              color: "text-cyan-400"
            },
            {
              icon: Terminal,
              title: "Natural Language SQL Studio",
              desc: "Convert plain English prompts into optimized SQL queries, run against PostgreSQL, and inspect raw results.",
              color: "text-indigo-400"
            },
            {
              icon: Cpu,
              title: "Scikit-Learn ML Forecasting",
              desc: "Predict multi-quarter sales, revenue, demand, and profit margins using trained Linear Regression & Random Forest models.",
              color: "text-purple-400"
            },
            {
              icon: FileSpreadsheet,
              title: "Multi-Format Export Builder",
              desc: "Generate professional PDF executive summaries, formatted Excel workbooks, and raw CSV files instantly.",
              color: "text-emerald-400"
            },
            {
              icon: Shield,
              title: "Enterprise Role-Based Access",
              desc: "Enforce security controls with Admin, Manager, Analyst, and Viewer permissions with full audit log tracking.",
              color: "text-rose-400"
            }
          ].map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="glass-panel glass-panel-hover p-6 rounded-2xl space-y-3 border border-white/10">
                <div className={`w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center ${feat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base">{feat.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing Tiers */}
      <section id="pricing" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto w-full border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl font-bold text-white">Transparent Enterprise Pricing</h2>
          <p className="text-xs text-slate-400">Scale seamlessly from emerging startups to global corporate operations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Analyst Starter",
              price: "$299",
              period: "/ month",
              features: ["Up to 5 Users", "CSV & JSON Data Ingestion", "Automated Data Cleaning Engine", "Standard Recharts Visualizations", "Export to CSV & PDF"],
              popular: false
            },
            {
              name: "Enterprise Pro",
              price: "$999",
              period: "/ month",
              features: ["Unlimited Team Users", "3D Three.js Interactive Canvas", "Natural Language SQL Studio", "Scikit-Learn ML Forecasting", "Realtime WebSockets Alerts", "Role-Based RBAC Permissions"],
              popular: true
            },
            {
              name: "Custom Scale",
              price: "Custom",
              period: "quote",
              features: ["Dedicated PostgreSQL Instance", "Custom ML Model Training", "24/7 SLA Support Engine", "On-Premises Docker Deployment", "Dedicated Solutions Architect"],
              popular: false
            }
          ].map((tier, idx) => (
            <div
              key={idx}
              className={`glass-panel p-8 rounded-3xl space-y-6 relative border ${
                tier.popular ? "border-blue-500/50 bg-slate-900/80 shadow-2xl shadow-blue-500/20" : "border-white/10"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
                  Most Popular
                </span>
              )}
              <div>
                <h3 className="font-bold text-white text-lg">{tier.name}</h3>
                <div className="mt-2 flex items-baseline space-x-1">
                  <span className="text-3xl lg:text-4xl font-extrabold text-white">{tier.price}</span>
                  <span className="text-xs text-slate-400">{tier.period}</span>
                </div>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                {tier.features.map((f, fIdx) => (
                  <li key={fIdx} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/dashboard"
                className={`w-full py-3 rounded-xl font-semibold text-xs text-center block transition-all ${
                  tier.popular
                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                    : "glass-panel hover:bg-white/10 text-slate-200"
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section id="faq" className="py-20 px-6 lg:px-12 max-w-4xl mx-auto w-full border-t border-white/10">
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-400">Everything you need to know about InsightIQ integration.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              className="glass-panel p-5 rounded-2xl cursor-pointer border border-white/10 transition-all hover:border-blue-500/30"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-white">{faq.q}</span>
                <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === idx ? "rotate-90 text-cyan-400" : ""}`} />
              </div>
              {activeFaq === idx && (
                <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-white/5 leading-relaxed">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/10 glass-panel py-8 px-6 lg:px-12 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-4 h-4 text-cyan-400" />
          <span className="text-slate-300 font-semibold">InsightIQ Intelligence Platform</span>
          <span>© 2026 Enterprise Inc. All rights reserved.</span>
        </div>
        <div className="flex space-x-6">
          <Link href="/dashboard" className="hover:text-slate-300">Dashboard</Link>
          <Link href="/sql" className="hover:text-slate-300">SQL Studio</Link>
          <Link href="/reports" className="hover:text-slate-300">Reports</Link>
          <Link href="/admin" className="hover:text-slate-300">Admin</Link>
        </div>
      </footer>
    </div>
  );
}
