from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.services.ml_engine import run_sales_forecast, generate_ai_insights

router = APIRouter(prefix="/ml", tags=["AI Insights & Machine Learning"])

@router.get("/forecast")
def get_sales_forecast(months: int = 6, db: Session = Depends(get_db)):
    forecast_data = run_sales_forecast(db, months_ahead=months)
    return {
        "status": "success",
        "data": forecast_data
    }

@router.get("/insights")
def get_insights(db: Session = Depends(get_db)):
    insights = generate_ai_insights(db)
    return {
        "status": "success",
        "data": insights
    }
