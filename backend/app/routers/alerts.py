from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models import Alert, AlertStatusEnum, SeverityEnum
from pydantic import BaseModel

router = APIRouter(prefix="/alerts", tags=["Alert System"])

class CreateAlertRequest(BaseModel):
    title: str
    message: str
    severity: str = "MEDIUM"
    metric: str
    threshold: float
    current: float

@router.get("/list")
def list_alerts(db: Session = Depends(get_db)):
    alerts = db.query(Alert).order_by(Alert.created_at.desc()).all()
    return [
        {
            "id": a.id,
            "title": a.title,
            "message": a.message,
            "severity": a.severity.value if hasattr(a.severity, 'value') else str(a.severity),
            "status": a.status.value if hasattr(a.status, 'value') else str(a.status),
            "metric": a.metric,
            "threshold": a.threshold,
            "current": a.current,
            "created_at": a.created_at.isoformat()
        }
        for a in alerts
    ]

@router.post("/{alert_id}/acknowledge")
def acknowledge_alert(alert_id: str, db: Session = Depends(get_db)):
    alert = db.query(Alert).filter(Alert.id == alert_id).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found.")
    alert.status = AlertStatusEnum.ACKNOWLEDGED
    db.commit()
    return {"status": "success", "message": "Alert status updated to ACKNOWLEDGED."}

@router.post("/create")
def create_alert(req: CreateAlertRequest, db: Session = Depends(get_db)):
    sev_enum = SeverityEnum.MEDIUM
    try:
        sev_enum = SeverityEnum[req.severity.upper()]
    except Exception:
        pass

    alert = Alert(
        title=req.title,
        message=req.message,
        severity=sev_enum,
        status=AlertStatusEnum.ACTIVE,
        metric=req.metric,
        threshold=req.threshold,
        current=req.current
    )
    db.add(alert)
    db.commit()
    db.refresh(alert)
    return {"status": "success", "alert_id": alert.id}
