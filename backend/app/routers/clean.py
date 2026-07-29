from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.services.cleaner import clean_dataset

router = APIRouter(prefix="/clean", tags=["Data Cleaning"])

@router.post("/process")
async def process_clean_dataset(
    file: UploadFile = File(...),
    remove_duplicates: bool = Form(True),
    fill_nulls: bool = Form(True),
    normalize_strings: bool = Form(True),
    detect_outliers: bool = Form(True),
    standardize_dates: bool = Form(True)
):
    try:
        content = await file.read()
        cleaned_report = clean_dataset(
            file_content=content,
            filename=file.filename,
            remove_duplicates=remove_duplicates,
            fill_nulls=fill_nulls,
            normalize_strings=normalize_strings,
            detect_outliers=detect_outliers,
            standardize_dates=standardize_dates
        )
        return {
            "status": "success",
            "message": f"Successfully cleaned {file.filename}",
            "data": cleaned_report
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
