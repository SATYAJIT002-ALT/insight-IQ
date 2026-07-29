from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models import User, AuditLog

router = APIRouter(prefix="/admin", tags=["Admin Console"])

@router.get("/users")
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return [
        {
            "id": u.id,
            "email": u.email,
            "name": u.name,
            "role": u.role.value if hasattr(u.role, 'value') else str(u.role),
            "avatar": u.avatar,
            "created_at": u.created_at.isoformat()
        }
        for u in users
    ]

@router.get("/audit-logs")
def get_audit_logs(db: Session = Depends(get_db)):
    logs = db.query(AuditLog).order_by(AuditLog.timestamp.desc()).limit(100).all()
    return [
        {
            "id": log.id,
            "action": log.action,
            "details": log.details,
            "ip_address": log.ip_address,
            "timestamp": log.timestamp.isoformat()
        }
        for log in logs
    ]
