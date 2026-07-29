export type UserRole = "ADMIN" | "MANAGER" | "ANALYST" | "VIEWER";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface KPI {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: number;
  status: "up" | "down";
}

export interface ChartCategoryData {
  category: string;
  revenue: number;
  margin: number;
}

export interface ChartRegionData {
  region: string;
  revenue: number;
}

export interface ChartMonthlyData {
  month: string;
  revenue: number;
  profit: number;
  orders: number;
}

export interface GeoPoint {
  city: string;
  lat: number;
  lng: number;
  sales: number;
  country: string;
}

export interface AlertItem {
  id: string;
  title: string;
  message: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  status: "ACTIVE" | "ACKNOWLEDGED" | "RESOLVED";
  metric: string;
  threshold: number;
  current: number;
  created_at: string;
}

export interface AIInsight {
  id: string;
  type: "POSITIVE" | "GROWTH" | "WARNING" | "INSIGHT";
  title: string;
  description: string;
  impact: string;
  recommendation: string;
}

export interface ForecastPoint {
  month: string;
  predicted_revenue: number;
  predicted_margin: number;
  confidence_upper: number;
  confidence_lower: number;
}

export interface SQLResult {
  query: string;
  columns: string[];
  rows: Record<string, any>[];
  row_count: number;
  execution_time_ms: number;
}

export interface DataCleanReport {
  filename: string;
  original_rows: number;
  cleaned_rows: number;
  duplicates_removed: number;
  nulls_filled: number;
  outliers_detected: number;
  health_score: number;
  actions_summary: string[];
  preview: Record<string, any>[];
}
