from fastapi import APIRouter, Depends, Response, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from app.db.database import get_db
from app.db.models import Sale, Product, Customer
from app.services.exporter import generate_csv_report, generate_excel_report, generate_pdf_report

router = APIRouter(prefix="/reports", tags=["Report Generator & Exporter"])

class ExportRequest(BaseModel):
    format: str  # 'pdf', 'excel', 'csv'
    title: Optional[str] = "Executive Analytics Summary"
    dataset: Optional[str] = "sales"  # 'sales', 'products', 'customers'

@router.post("/export")
def export_report(req: ExportRequest, db: Session = Depends(get_db)):
    if req.dataset == "products":
        data = [
            {"id": p.id, "name": p.name, "sku": p.sku, "category": p.category, "price": p.price, "cost": p.cost, "stock": p.stock}
            for p in db.query(Product).all()
        ]
    elif req.dataset == "customers":
        data = [
            {"id": c.id, "name": c.name, "email": c.email, "city": c.city, "country": c.country, "region": c.region, "segment": c.segment}
            for c in db.query(Customer).all()
        ]
    else:
        data = [
            {"id": s.id, "category": s.category, "region": s.region, "amount": s.amount, "margin": s.margin, "date": str(s.sale_date)}
            for s in db.query(Sale).limit(200).all()
        ]

    fmt = req.format.lower()
    if fmt == "csv":
        content = generate_csv_report(data)
        return Response(
            content=content,
            media_type="text/csv",
            headers={"Content-Disposition": f"attachment; filename=insightiq_{req.dataset}.csv"}
        )
    elif fmt in ["excel", "xlsx"]:
        content = generate_excel_report(data, title=req.title or "InsightIQ Report")
        return Response(
            content=content,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers={"Content-Disposition": f"attachment; filename=insightiq_{req.dataset}.xlsx"}
        )
    elif fmt == "pdf":
        content = generate_pdf_report(data, title=req.title or "Executive Summary")
        return Response(
            content=content,
            media_type="application/pdf",
            headers={"Content-Disposition": f"attachment; filename=insightiq_{req.dataset}.pdf"}
        )
    else:
        raise HTTPException(status_code=400, detail="Invalid export format. Choose pdf, excel, or csv.")
