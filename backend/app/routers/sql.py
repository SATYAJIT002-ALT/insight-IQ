from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.db.database import get_db
from app.services.sql_runner import convert_nl_to_sql, execute_raw_sql

router = APIRouter(prefix="/sql", tags=["SQL Analysis Studio"])

class SQLQueryRequest(BaseModel):
    query: str

class NLToSQLRequest(BaseModel):
    prompt: str

@router.post("/execute")
def execute_sql(req: SQLQueryRequest, db: Session = Depends(get_db)):
    try:
        res = execute_raw_sql(db, req.query)
        return {"status": "success", "data": res}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/nl-to-sql")
def nl_to_sql(req: NLToSQLRequest):
    try:
        generated_sql = convert_nl_to_sql(req.prompt)
        return {
            "status": "success",
            "prompt": req.prompt,
            "sql": generated_sql
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
