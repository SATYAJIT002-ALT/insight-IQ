"use client";

import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { ChartRegionData } from "@/types";

const COLORS = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"];

export default function RegionalPieChart({ data }: { data: ChartRegionData[] }) {
  return (
    <div className="w-full h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={95}
            paddingAngle={4}
            dataKey="revenue"
            nameKey="region"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: "#0f172a", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff", fontSize: "12px" }}
            formatter={(value: any) => [`$${Number(value).toLocaleString()}`, "Revenue"]}
          />
          <Legend wrapperStyle={{ fontSize: "11px", color: "#94a3b8" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
