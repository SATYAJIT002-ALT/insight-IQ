"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { FileSpreadsheet, Download, FileText, CheckCircle2, RefreshCw } from "lucide-react";

export default function ReportsPage() {
  const [dataset, setDataset] = useState("sales");
  const [reportTitle, setReportTitle] = useState("Q3 Enterprise Sales & Margin Analysis");
  const [exporting, setExporting] = useState<string | null>(null);

  const handleDownloadReport = async (format: "pdf" | "excel" | "csv") => {
    setExporting(format);
    try {
      const response = await fetch("http://localhost:8000/api/v1/reports/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ format, title: reportTitle, dataset })
      });

      if (!response.ok) {
        throw new Error("Export request failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `insightiq_${dataset}_report.${format === "excel" ? "xlsx" : format}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert(`Exporting ${format.toUpperCase()} report demo triggered!`);
    } finally {
      setExporting(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-8 overflow-y-auto">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <FileSpreadsheet className="w-6 h-6 text-emerald-400" />
              Custom Report Builder & Multi-Format Exporter
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Generate styled PDF reports, formatted Excel workbooks, and raw CSV exports from live database records.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Configuration Options */}
            <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
              <h3 className="font-bold text-white text-base">Report Configuration</h3>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Report Document Title</label>
                  <input
                    type="text"
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/50"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Source Dataset</label>
                  <select
                    value={dataset}
                    onChange={(e) => setDataset(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/50 cursor-pointer"
                  >
                    <option value="sales">Sales & Revenue Transactions</option>
                    <option value="products">Product & Inventory Catalog</option>
                    <option value="customers">Customer Demographics & Regions</option>
                  </select>
                </div>
              </div>

              {/* Multi-Format Export Buttons */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <p className="text-xs font-semibold text-slate-300">Generate & Download Instantly</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => handleDownloadReport("pdf")}
                    disabled={exporting !== null}
                    className="p-4 rounded-xl glass-panel border border-rose-500/30 hover:border-rose-500 text-left space-y-2 group transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-xs">PDF Summary</p>
                      <p className="text-[10px] text-slate-400">Print ready report</p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleDownloadReport("excel")}
                    disabled={exporting !== null}
                    className="p-4 rounded-xl glass-panel border border-emerald-500/30 hover:border-emerald-500 text-left space-y-2 group transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <FileSpreadsheet className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-xs">Excel Workbook</p>
                      <p className="text-[10px] text-slate-400">Styled .xlsx format</p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleDownloadReport("csv")}
                    disabled={exporting !== null}
                    className="p-4 rounded-xl glass-panel border border-blue-500/30 hover:border-blue-500 text-left space-y-2 group transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                      <Download className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-xs">Raw CSV Dump</p>
                      <p className="text-[10px] text-slate-400">Comma separated</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Template Specs */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
              <h3 className="font-bold text-white text-base">Export Capabilities</h3>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>ReportLab PDF engine with executive metadata headers.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>OpenPyXL custom Excel styling with header fills & auto column widths.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Streaming response support for large enterprise data sets.</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
