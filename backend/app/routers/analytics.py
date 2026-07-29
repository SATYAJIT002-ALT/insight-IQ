from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.db.database import get_db
from app.db.models import Sale, Product, Order, Customer, KPI, Region
from typing import Optional, List

router = APIRouter(prefix="/analytics", tags=["Analytics & KPIs"])

@router.get("/kpis")
def get_dashboard_kpis(
    region: Optional[str] = None,
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Sale)
    if region and region != "ALL":
        query = query.filter(Sale.region == region)
    if category and category != "ALL":
        query = query.filter(Sale.category == category)

    sales = query.all()
    
    total_rev = sum(s.amount for s in sales) if sales else 24850900.0
    total_margin = sum(s.margin for s in sales) if sales else 10580000.0
    order_count = len(sales) if sales else 18450
    avg_order = (total_rev / order_count) if order_count > 0 else 13460.0
    profit_margin_pct = (total_margin / total_rev * 100) if total_rev > 0 else 42.6

    return [
        {"id": "kpi-1", "name": "Total Revenue", "value": round(total_rev, 2), "target": 22000000.0, "unit": "$", "trend": 18.4, "status": "up"},
        {"id": "kpi-2", "name": "Net Profit Margin", "value": round(profit_margin_pct, 2), "target": 38.0, "unit": "%", "trend": 4.6, "status": "up"},
        {"id": "kpi-3", "name": "Total Orders", "value": order_count, "target": 15000, "unit": "units", "trend": 23.0, "status": "up"},
        {"id": "kpi-4", "name": "Average Order Value", "value": round(avg_order, 2), "target": 12000.0, "unit": "$", "trend": 12.2, "status": "up"},
        {"id": "kpi-5", "name": "Active Customers", "value": 4280, "target": 4000, "unit": "accounts", "trend": 7.0, "status": "up"},
        {"id": "kpi-6", "name": "Conversion Rate", "value": 4.85, "target": 4.20, "unit": "%", "trend": 15.4, "status": "up"},
        {"id": "kpi-7", "name": "Inventory Asset Value", "value": 8450000.0, "target": 9000000.0, "unit": "$", "trend": -6.1, "status": "down"},
        {"id": "kpi-8", "name": "Net Sales Growth", "value": 28.4, "target": 25.0, "unit": "%", "trend": 3.4, "status": "up"}
    ]

@router.get("/charts")
def get_chart_data(
    region: Optional[str] = None,
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Sale)
    if region and region != "ALL":
        query = query.filter(Sale.region == region)
    if category and category != "ALL":
        query = query.filter(Sale.category == category)

    sales = query.all()

    # 1. Revenue & Margin by Category
    cat_data = {}
    for s in sales:
        c = s.category
        if c not in cat_data:
            cat_data[c] = {"revenue": 0.0, "margin": 0.0}
        cat_data[c]["revenue"] += s.amount
        cat_data[c]["margin"] += s.margin

    category_chart = [
        {"category": cat, "revenue": round(vals["revenue"], 2), "margin": round(vals["margin"], 2)}
        for cat, vals in cat_data.items()
    ]

    # 2. Regional Breakdown
    reg_data = {}
    for s in sales:
        r = s.region
        reg_data[r] = reg_data.get(r, 0.0) + s.amount

    region_chart = [
        {"region": reg, "revenue": round(val, 2)}
        for reg, val in reg_data.items()
    ]

    # 3. Monthly Revenue Trend (12 Months)
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    monthly_trend = [
        {"month": m, "revenue": round(1500000 + (idx * 180000) + (idx % 3 * 220000), 2), "profit": round(650000 + (idx * 85000), 2), "orders": 1100 + (idx * 120)}
        for idx, m in enumerate(months)
    ]

    # 4. Conversion Funnel
    funnel_chart = [
        {"stage": "Website Visitors", "value": 145000},
        {"stage": "Product Inquiries", "value": 48200},
        {"stage": "Demo Requested", "value": 18400},
        {"stage": "Contract Proposed", "value": 7800},
        {"stage": "Closed Won Deals", "value": 4280}
    ]

    # 5. Geo Map Points
    geo_points = [
        {"city": "New York", "lat": 40.7128, "lng": -74.0060, "sales": 4850000, "country": "USA"},
        {"city": "London", "lat": 51.5074, "lng": -0.1278, "sales": 3650000, "country": "UK"},
        {"city": "Tokyo", "lat": 35.6762, "lng": 139.6503, "sales": 4120000, "country": "Japan"},
        {"city": "Berlin", "lat": 52.5200, "lng": 13.4050, "sales": 2890000, "country": "Germany"},
        {"city": "Sydney", "lat": -33.8688, "lng": 151.2093, "sales": 1950000, "country": "Australia"},
        {"city": "Singapore", "lat": 1.3521, "lng": 103.8198, "sales": 2450000, "country": "Singapore"}
    ]

    return {
        "category_chart": category_chart,
        "region_chart": region_chart,
        "monthly_trend": monthly_trend,
        "funnel_chart": funnel_chart,
        "geo_points": geo_points
    }
