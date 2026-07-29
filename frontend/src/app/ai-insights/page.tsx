"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Sparkles, Cpu, TrendingUp, AlertTriangle, Send, Bot, User, CheckCircle2 } from "lucide-react";
import { ResponsiveContainer, ComposedChart, Area, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { fetchForecast, fetchInsights } from "@/lib/api";
import { AIInsight } from "@/types";

export default function AIInsightsPage() {
  const [forecastData, setForecastData] = useState<any>(null);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", text: "Hello! I am your InsightIQ AI Business Co-Pilot. Ask me anything about revenue trends, margin optimization, or demand forecasts." }
  ]);
  const [inputMsg, setInputMsg] = useState("");

  useEffect(() => {
    async function loadData() {
      const f = await fetchForecast();
      const i = await fetchInsights();
      setForecastData(f);
      setInsights(i);
    }
    loadData();
  }, []);

  const handleSendMessage = () => {
    if (!inputMsg.trim()) return;
    const userText = inputMsg;
    setChatMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInputMsg("");

    setTimeout(() => {
      let reply = "Based on our Scikit-Learn Random Forest sales model, North America accounts for 39.6% of overall revenue with strong 18.4% YoY momentum. I recommend reallocating inventory buffer to support Q3 demand spikes.";
      if (userText.toLowerCase().includes("margin") || userText.toLowerCase().includes("profit")) {
        reply = "The Cybersecurity product category yields our highest gross profit margin at 50.0% ($2.1M profit on $4.2M sales), outperforming the corporate target by 14.2%.";
      } else if (userText.toLowerCase().includes("forecast") || userText.toLowerCase().includes("next month")) {
        reply = "Our ensemble model projects next month's total revenue to reach $4,120,000 with a 95% confidence band between $3.79M and $4.45M.";
      }
      setChatMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    }, 600);
  };

  const chartPoints = [
    ...(forecastData?.historical?.map((h: any) => ({
      month: h.month,
      actual: h.actual_revenue,
      forecast: null,
      upper: null,
      lower: null
    })) || []),
    ...(forecastData?.forecast?.map((f: any) => ({
      month: f.month,
      actual: null,
      forecast: f.predicted_revenue,
      upper: f.confidence_upper,
      lower: f.confidence_lower
    })) || [])
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-8 overflow-y-auto">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-400" />
              AI Business Intelligence & ML Forecasting
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Scikit-Learn ensemble model predictions and automated natural language corporate insights.
            </p>
          </div>

          {/* ML Forecasting Chart Section */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" /> Multi-Quarter Revenue Prediction
                </h3>
                <p className="text-xs text-slate-400">Trained on historical daily transactions with 95% confidence intervals</p>
              </div>
              <div className="flex items-center space-x-3 text-xs">
                <span className="flex items-center gap-1.5 text-blue-400 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Historical Actuals
                </span>
                <span className="flex items-center gap-1.5 text-purple-400 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> ML Forecast
                </span>
              </div>
            </div>

            <div className="w-full h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartPoints} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 11 }} tickFormatter={(val) => `$${(val / 1000000).toFixed(1)}M`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0f172a", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff", fontSize: "12px" }}
                    formatter={(value: any) => value ? [`$${Number(value).toLocaleString()}`, "Value"] : ["-", "-"]}
                  />
                  <Area type="monotone" dataKey="upper" stroke="none" fill="#8b5cf6" fillOpacity={0.15} />
                  <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="forecast" stroke="#a855f7" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 4 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Insights & AI Chat Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Insights Cards */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
              <h3 className="font-bold text-white text-base">Automated Business Recommendations</h3>
              <div className="space-y-4">
                {insights.map((ins) => (
                  <div key={ins.id} className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-2 hover:border-purple-500/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white">{ins.title}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">
                        {ins.impact}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{ins.description}</p>
                    <div className="pt-2 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-cyan-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span><strong>Recommendation:</strong> {ins.recommendation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Analytics Assistant Chat */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between h-[450px]">
              <div>
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <Bot className="w-4 h-4 text-cyan-400" /> AI Analytics Assistant
                </h3>
                <p className="text-xs text-slate-400">Ask natural language questions about your enterprise dataset</p>
              </div>

              {/* Chat Message List */}
              <div className="flex-1 overflow-y-auto space-y-3 py-4 pr-1 my-2">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex gap-2.5 text-xs ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}
                    <div className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-slate-900 text-slate-200 border border-white/10 rounded-bl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Box */}
              <div className="flex gap-2 pt-2 border-t border-white/10">
                <input
                  type="text"
                  placeholder="Ask a question (e.g. Which region has highest growth?)..."
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-purple-500/50"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/20 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
