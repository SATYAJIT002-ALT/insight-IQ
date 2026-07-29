from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.services.ingestion import process_file_upload

router = APIRouter(prefix="/upload", tags=["Data Ingestion"])

@router.post("/file")
async def upload_dataset_file(file: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        content = await file.read()
        summary = process_file_upload(content, file.filename, db=db, persist_to_db=True)
        return {
            "status": "success",
            "message": f"Successfully parsed and ingested {file.filename} into platform database ({summary.get('rows_ingested', 0)} rows loaded)",
            "data": summary
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
