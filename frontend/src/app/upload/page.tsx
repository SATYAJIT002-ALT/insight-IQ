"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { 
  UploadCloud, FileSpreadsheet, CheckCircle2, ArrowRight, Table, 
  Sparkles, BarChart3, XCircle, Trash2, RefreshCw 
} from "lucide-react";
import { useAppStore } from "@/store/useStore";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://insight-iq-eiaz.onrender.com/api/v1";

export default function UploadPage() {
  const { uploadedDatasetResult, setUploadedDatasetResult, clearUploadedDataset } = useAppStore();

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_BASE}/upload/file`, {
        method: "POST",
        body: formData
      });
      
      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.detail || "Upload failed. Make sure backend is running.");
      }
      
      const json = await res.json();
      setUploadedDatasetResult(json.data, file.name);
    } catch (e: any) {
      console.error(e);
      setError(e.message || "Failed to upload and ingest file.");
    } finally {
      setUploading(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setError(null);
    clearUploadedDataset();
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-8 overflow-y-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <UploadCloud className="w-6 h-6 text-cyan-400" />
                Automated Data Ingestion Engine
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Upload CSV, Excel, or JSON files to replace demo dataset and power real-time AI Insights, KPIs, and ML Forecasts.
              </p>
            </div>

            {uploadedDatasetResult && (
              <button
                onClick={handleClear}
                className="px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Cancel / Clear Uploaded Dataset</span>
              </button>
            )}
          </div>

          {/* Upload Dropzone */}
          <div className="glass-panel p-8 rounded-3xl border-2 border-dashed border-white/10 text-center space-y-4 hover:border-blue-500/40 transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 mx-auto flex items-center justify-center text-cyan-400">
              <FileSpreadsheet className="w-7 h-7" />
            </div>

            <div>
              <p className="font-bold text-white text-base">Select or Drop Your Enterprise Dataset</p>
              <p className="text-xs text-slate-400 mt-1">Supports .csv, .xlsx, .xls, and .json up to 100MB</p>
            </div>

            <input
              type="file"
              accept=".csv,.xlsx,.xls,.json"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload-input"
            />

            <div className="flex items-center justify-center gap-4">
              <label
                htmlFor="file-upload-input"
                className="px-5 py-2.5 rounded-xl bg-slate-900 border border-white/10 hover:border-blue-500/40 text-xs font-semibold text-slate-200 cursor-pointer transition-colors"
              >
                Choose File
              </label>

              {file && (
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all"
                >
                  {uploading ? "Ingesting & Analyzing Dataset..." : "Ingest & Save to Database"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {file && (
                <button
                  onClick={() => setFile(null)}
                  className="p-2.5 rounded-xl bg-slate-900 border border-white/10 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs transition-colors"
                  title="Clear file selection"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              )}
            </div>

            {file && (
              <p className="text-xs text-cyan-400 font-medium pt-2">Selected File: {file.name} ({Math.round(file.size / 1024)} KB)</p>
            )}
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium">
              ⚠️ {error}
            </div>
          )}

          {/* Persistent Ingestion Result Summary */}
          {uploadedDatasetResult && (
            <div className="glass-panel p-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-500/20 pb-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base flex items-center gap-2">
                      Active Ingested Dataset: <span className="text-cyan-400">{uploadedDatasetResult.filename}</span>
                    </h3>
                    <p className="text-xs text-emerald-300 mt-0.5">
                      <strong>{uploadedDatasetResult.rows_ingested || uploadedDatasetResult.row_count}</strong> records persisted into platform database.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/dashboard"
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/20 flex items-center gap-1.5 transition-all"
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>View Executive Dashboard</span>
                  </Link>

                  <Link
                    href="/ai-insights"
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-500/20 flex items-center gap-1.5 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>View AI Insights</span>
                  </Link>

                  <button
                    onClick={handleClear}
                    className="px-4 py-2 rounded-xl bg-slate-900 border border-white/10 hover:bg-rose-500/20 hover:border-rose-500/30 text-rose-400 text-xs font-bold flex items-center gap-1.5 transition-all"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Cancel / Reset File</span>
                  </button>
                </div>
              </div>

              {/* Column Schema Details */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/80 text-slate-400 border-b border-white/10">
                    <tr>
                      <th className="p-3 font-semibold">Source Column Name</th>
                      <th className="p-3 font-semibold">Detected Type</th>
                      <th className="p-3 font-semibold">Null Count</th>
                      <th className="p-3 font-semibold">Unique Values</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {uploadedDatasetResult.columns?.map((col: any, idx: number) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors">
                        <td className="p-3 font-medium text-white">{col.column}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-500/10 text-cyan-400 border border-blue-500/20">
                            {col.inferred_type}
                          </span>
                        </td>
                        <td className="p-3 text-amber-400">{col.null_count}</td>
                        <td className="p-3 text-slate-300">{col.unique_count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Data Preview */}
              {uploadedDatasetResult.preview && (
                <div>
                  <h4 className="font-semibold text-xs text-slate-300 mb-3 flex items-center gap-1.5">
                    <Table className="w-4 h-4 text-cyan-400" /> Preview Top Rows of Ingested Dataset
                  </h4>
                  <div className="overflow-x-auto glass-panel rounded-xl p-2">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-900 text-slate-400 border-b border-white/10">
                        <tr>
                          {uploadedDatasetResult.columns.map((c: any, i: number) => (
                            <th key={i} className="p-2.5 font-semibold">{c.column}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-slate-300">
                        {uploadedDatasetResult.preview.map((row: any, rIdx: number) => (
                          <tr key={rIdx}>
                            {uploadedDatasetResult.columns.map((c: any, cIdx: number) => (
                              <td key={cIdx} className="p-2.5">{String(row[c.column] ?? "")}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
