"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { ChartCategoryData } from "@/types";

export default function CategoryBarChart({ data }: { data: ChartCategoryData[] }) {
  return (
    <div className="w-full h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="category" stroke="#64748b" tick={{ fontSize: 10 }} />
          <YAxis stroke="#64748b" tick={{ fontSize: 10 }} tickFormatter={(val) => `$${(val / 1000000).toFixed(1)}M`} />
          <Tooltip
            contentStyle={{ backgroundColor: "#0f172a", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff", fontSize: "12px" }}
            formatter={(value: any) => [`$${Number(value).toLocaleString()}`, "Val"]}
          />
          <Legend wrapperStyle={{ fontSize: "11px", color: "#94a3b8" }} />
          <Bar dataKey="revenue" name="Total Sales" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          <Bar dataKey="margin" name="Gross Margin" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
