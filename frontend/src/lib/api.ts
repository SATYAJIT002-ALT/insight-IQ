import { KPI, AlertItem, AIInsight, SQLResult, DataCleanReport } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export async function fetchKPIs(region = "ALL", category = "ALL"): Promise<KPI[]> {
  try {
    const res = await fetch(`${API_BASE}/analytics/kpis?region=${region}&category=${category}`);
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (e) {
    // Fallback data for standalone frontend execution
    return [
      { id: "kpi-1", name: "Total Revenue", value: 24850900, target: 22000000, unit: "$", trend: 18.4, status: "up" },
      { id: "kpi-2", name: "Net Profit Margin", value: 42.6, target: 38.0, unit: "%", trend: 4.6, status: "up" },
      { id: "kpi-3", name: "Total Orders", value: 18450, target: 15000, unit: "units", trend: 23.0, status: "up" },
      { id: "kpi-4", name: "Average Order Value", value: 13460, target: 12000, unit: "$", trend: 12.2, status: "up" },
      { id: "kpi-5", name: "Active Customers", value: 4280, target: 4000, unit: "accounts", trend: 7.0, status: "up" },
      { id: "kpi-6", name: "Conversion Rate", value: 4.85, target: 4.20, unit: "%", trend: 15.4, status: "up" },
      { id: "kpi-7", name: "Inventory Asset Value", value: 8450000, target: 9000000, unit: "$", trend: -6.1, status: "down" },
      { id: "kpi-8", name: "Net Sales Growth", value: 28.4, target: 25.0, unit: "%", trend: 3.4, status: "up" }
    ];
  }
}

export async function fetchCharts(region = "ALL", category = "ALL") {
  try {
    const res = await fetch(`${API_BASE}/analytics/charts?region=${region}&category=${category}`);
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (e) {
    return {
      category_chart: [
        { category: "Enterprise AI", revenue: 9800000, margin: 4400000 },
        { category: "Cloud Infrastructure", revenue: 6500000, margin: 2600000 },
        { category: "Cybersecurity", revenue: 4200000, margin: 2100000 },
        { category: "Data Analytics", revenue: 2800000, margin: 1100000 },
        { category: "SaaS Tools", revenue: 1550000, margin: 380000 }
      ],
      region_chart: [
        { region: "North America", revenue: 9850000 },
        { region: "Europe", revenue: 6420000 },
        { region: "Asia Pacific", revenue: 5120000 },
        { region: "Latin America", revenue: 1820000 },
        { region: "Middle East", revenue: 1640000 }
      ],
      monthly_trend: [
        { month: "Jan", revenue: 1650000, profit: 680000, orders: 1120 },
        { month: "Feb", revenue: 1820000, profit: 750000, orders: 1240 },
        { month: "Mar", revenue: 2100000, profit: 890000, orders: 1410 },
        { month: "Apr", revenue: 1980000, profit: 810000, orders: 1350 },
        { month: "May", revenue: 2350000, profit: 990000, orders: 1580 },
        { month: "Jun", revenue: 2680000, profit: 1150000, orders: 1790 },
        { month: "Jul", revenue: 2540000, profit: 1080000, orders: 1680 },
        { month: "Aug", revenue: 2890000, profit: 1240000, orders: 1920 },
        { month: "Sep", revenue: 3120000, profit: 1350000, orders: 2050 },
        { month: "Oct", revenue: 2950000, profit: 1280000, orders: 1980 },
        { month: "Nov", revenue: 3450000, profit: 1520000, orders: 2280 },
        { month: "Dec", revenue: 3890000, profit: 1750000, orders: 2540 }
      ],
      funnel_chart: [
        { stage: "Website Visitors", value: 145000 },
        { stage: "Product Inquiries", value: 48200 },
        { stage: "Demo Requested", value: 18400 },
        { stage: "Contract Proposed", value: 7800 },
        { stage: "Closed Deals", value: 4280 }
      ],
      geo_points: [
        { city: "New York", lat: 40.7128, lng: -74.0060, sales: 4850000, country: "USA" },
        { city: "London", lat: 51.5074, lng: -0.1278, sales: 3650000, country: "UK" },
        { city: "Tokyo", lat: 35.6762, lng: 139.6503, sales: 4120000, country: "Japan" },
        { city: "Berlin", lat: 52.5200, lng: 13.4050, sales: 2890000, country: "Germany" },
        { city: "Sydney", lat: -33.8688, lng: 151.2093, sales: 1950000, country: "Australia" }
      ]
    };
  }
}

export async function fetchForecast() {
  try {
    const res = await fetch(`${API_BASE}/ml/forecast`);
    if (!res.ok) throw new Error("API error");
    const json = await res.json();
    return json.data;
  } catch (e) {
    return {
      historical: [
        { month: "Jul", actual_revenue: 2540000, actual_margin: 1080000 },
        { month: "Aug", actual_revenue: 2890000, actual_margin: 1240000 },
        { month: "Sep", actual_revenue: 3120000, actual_margin: 1350000 },
        { month: "Oct", actual_revenue: 2950000, actual_margin: 1280000 },
        { month: "Nov", actual_revenue: 3450000, actual_margin: 1520000 },
        { month: "Dec", actual_revenue: 3890000, actual_margin: 1750000 }
      ],
      forecast: [
        { month: "2026-08", predicted_revenue: 4120000, predicted_margin: 1820000, confidence_upper: 4450000, confidence_lower: 3790000 },
        { month: "2026-09", predicted_revenue: 4380000, predicted_margin: 1940000, confidence_upper: 4750000, confidence_lower: 4010000 },
        { month: "2026-10", predicted_revenue: 4650000, predicted_margin: 2060000, confidence_upper: 5080000, confidence_lower: 4220000 },
        { month: "2026-11", predicted_revenue: 4980000, predicted_margin: 2210000, confidence_upper: 5450000, confidence_lower: 4510000 },
        { month: "2026-12", predicted_revenue: 5350000, predicted_margin: 2380000, confidence_upper: 5890000, confidence_lower: 4810000 }
      ],
      model_metrics: { r2_score: 0.962, mae: 4120.50, model_type: "Ensemble (Linear Regression + Random Forest)" }
    };
  }
}

export async function fetchInsights(): Promise<AIInsight[]> {
  try {
    const res = await fetch(`${API_BASE}/ml/insights`);
    if (!res.ok) throw new Error("API error");
    const json = await res.json();
    return json.data;
  } catch (e) {
    return [
      {
        id: "ins-1",
        type: "POSITIVE",
        title: "Strong Margin Performance in Cybersecurity",
        description: "The Cybersecurity product suite yielded the highest gross profit margin at 50.0%, exceeding enterprise target by 14.2%.",
        impact: "+$480,000 Expected Profit",
        recommendation: "Increase marketing capital allocation for ZeroTrust Shield and CyberSentinel."
      },
      {
        id: "ins-2",
        type: "GROWTH",
        title: "North America Dominates Revenue Pipeline",
        description: "North America accounts for $9.85M (39.6%) of total global sales.",
        impact: "High Growth Momentum",
        recommendation: "Expand enterprise solution engineering team in NY and SF."
      },
      {
        id: "ins-3",
        type: "WARNING",
        title: "Inventory Stock Buffer Alert",
        description: "InsightIQ Neural Core stock levels in EU-Central warehouse have dropped below safety buffer threshold.",
        impact: "Potential $120,000 Out-of-Stock Loss",
        recommendation: "Re-route 50 hardware units from US-East warehouse to Frankfurt."
      }
    ];
  }
}

export async function executeSQLQuery(query: string): Promise<SQLResult> {
  try {
    const res = await fetch(`${API_BASE}/sql/execute`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || "SQL Execution Error");
    }
    const json = await res.json();
    return json.data;
  } catch (e: any) {
    throw new Error(e.message || "Execution failed");
  }
}

export async function translateNLToSQL(prompt: string): Promise<string> {
  try {
    const res = await fetch(`${API_BASE}/sql/nl-to-sql`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    const json = await res.json();
    return json.sql;
  } catch (e) {
    return "SELECT category, SUM(amount) as total_revenue, AVG(margin) as avg_margin FROM sales GROUP BY category ORDER BY total_revenue DESC;";
  }
}
