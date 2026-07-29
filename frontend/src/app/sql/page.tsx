"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Terminal, Sparkles, Play, Clock, Database, Copy, Check } from "lucide-react";
import { executeSQLQuery, translateNLToSQL } from "@/lib/api";
import { SQLResult } from "@/types";

export default function SQLStudioPage() {
  const [nlPrompt, setNlPrompt] = useState("");
  const [sqlQuery, setSqlQuery] = useState("SELECT category, SUM(amount) as total_revenue, AVG(margin) as avg_margin FROM sales GROUP BY category ORDER BY total_revenue DESC;");
  const [loading, setLoading] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [result, setResult] = useState<SQLResult | null>({
    query: "SELECT category, SUM(amount) as total_revenue, AVG(margin) as avg_margin FROM sales GROUP BY category ORDER BY total_revenue DESC;",
    columns: ["category", "total_revenue", "avg_margin"],
    rows: [
      { category: "Enterprise AI", total_revenue: 9800000.0, avg_margin: 4400.0 },
      { category: "Cloud Infrastructure", total_revenue: 6500000.0, avg_margin: 2600.0 },
      { category: "Cybersecurity", total_revenue: 4200000.0, avg_margin: 2100.0 },
      { category: "Data Analytics", total_revenue: 2800000.0, avg_margin: 1100.0 },
      { category: "SaaS Tools", total_revenue: 1550000.0, avg_margin: 380.0 }
    ],
    row_count: 5,
    execution_time_ms: 12.4
  });
  const [error, setError] = useState<string | null>(null);

  const handleTranslateNL = async () => {
    if (!nlPrompt.trim()) return;
    setTranslating(true);
    try {
      const generated = await translateNLToSQL(nlPrompt);
      setSqlQuery(generated);
    } catch (e) {
      console.error(e);
    } finally {
      setTranslating(false);
    }
  };

  const handleRunSQL = async () => {
    if (!sqlQuery.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await executeSQLQuery(sqlQuery);
      setResult(res);
    } catch (e: any) {
      setError(e.message || "Execution error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Terminal className="w-6 h-6 text-cyan-400" />
              SQL Analysis Studio & AI Query Engine
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Write custom SQL queries or convert plain English instructions into optimized SQL commands.
            </p>
          </div>

          {/* Natural Language AI Prompt Box */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/40">
            <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400">
              <Sparkles className="w-4 h-4" />
              <span>Natural Language to SQL Generator</span>
            </div>
            
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="e.g. Show top 5 customers by revenue in North America..."
                value={nlPrompt}
                onChange={(e) => setNlPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleTranslateNL()}
                className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
              />
              <button
                onClick={handleTranslateNL}
                disabled={translating}
                className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5"
              >
                {translating ? "Translating..." : "Generate SQL"}
              </button>
            </div>
          </div>

          {/* SQL Editor */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-400" /> PostgreSQL Query Editor
              </span>
              <button
                onClick={handleRunSQL}
                disabled={loading}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all"
              >
                <Play className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                <span>{loading ? "Executing..." : "Run Query (Ctrl+Enter)"}</span>
              </button>
            </div>

            <textarea
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              rows={4}
              className="w-full bg-slate-950 font-mono text-xs text-cyan-300 p-4 rounded-xl border border-white/10 focus:outline-none focus:border-blue-500/50 leading-relaxed tracking-wide"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
              <strong>Query Execution Error:</strong> {error}
            </div>
          )}

          {/* Results Table */}
          {result && (
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-white/10">
                <div className="flex items-center space-x-4">
                  <span className="font-semibold text-white">Query Results</span>
                  <span>{result.row_count} rows returned</span>
                </div>
                <div className="flex items-center space-x-1 text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Execution time: {result.execution_time_ms} ms</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-300 border-b border-white/10">
                    <tr>
                      {result.columns.map((col, idx) => (
                        <th key={idx} className="p-3 font-semibold uppercase tracking-wider">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-200">
                    {result.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-white/5 transition-colors">
                        {result.columns.map((col, cIdx) => (
                          <td key={cIdx} className="p-3">
                            {typeof row[col] === "number" ? row[col].toLocaleString() : String(row[col] ?? "")}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
