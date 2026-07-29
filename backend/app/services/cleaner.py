import pandas as pd
import numpy as np
import io
import json
from typing import Dict, Any

def clean_dataset(
    file_content: bytes,
    filename: str,
    remove_duplicates: bool = True,
    fill_nulls: bool = True,
    normalize_strings: bool = True,
    detect_outliers: bool = True,
    standardize_dates: bool = True
) -> Dict[str, Any]:
    """
    Automated data cleaning module using Pandas and NumPy.
    Performs duplicate removal, missing value imputation, outlier detection via Z-score,
    string normalization, and date formatting. Returns health score and report.
    """
    ext = filename.split(".")[-1].lower()
    if ext == "csv":
        df = pd.read_csv(io.BytesIO(file_content))
    elif ext in ["xlsx", "xls"]:
        df = pd.read_excel(io.BytesIO(file_content))
    elif ext == "json":
        df = pd.DataFrame(json.loads(file_content.decode("utf-8")))
    else:
        raise ValueError("Unsupported file format for cleaning.")

    original_rows = len(df)
    original_nulls = int(df.isnull().sum().sum())
    
    report_actions = []

    # 1. Remove Duplicates
    duplicates_removed = 0
    if remove_duplicates:
        initial_count = len(df)
        df = df.drop_duplicates()
        duplicates_removed = initial_count - len(df)
        if duplicates_removed > 0:
            report_actions.append(f"Removed {duplicates_removed} duplicate rows.")

    # 2. String Normalization
    strings_normalized = 0
    if normalize_strings:
        for col in df.select_dtypes(include=["object"]):
            df[col] = df[col].astype(str).str.strip()
            strings_normalized += 1
        if strings_normalized > 0:
            report_actions.append(f"Trimmed whitespace and normalized text across {strings_normalized} text columns.")

    # 3. Standardize Dates
    dates_converted = 0
    if standardize_dates:
        for col in df.columns:
            if "date" in str(col).lower() or "time" in str(col).lower():
                try:
                    df[col] = pd.to_datetime(df[col], errors="coerce")
                    df[col] = df[col].dt.strftime("%Y-%m-%d %H:%M:%S").fillna("")
                    dates_converted += 1
                except Exception:
                    pass
        if dates_converted > 0:
            report_actions.append(f"Formatted {dates_converted} date/time columns to ISO 8601 standard.")

    # 4. Outlier Detection
    outliers_detected = 0
    if detect_outliers:
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        for col in numeric_cols:
            mean = df[col].mean()
            std = df[col].std()
            if std > 0:
                z_scores = (df[col] - mean) / std
                outlier_mask = np.abs(z_scores) > 3.0
                col_outliers = int(outlier_mask.sum())
                outliers_detected += col_outliers
        if outliers_detected > 0:
            report_actions.append(f"Flagged {outliers_detected} numerical outliers using Z-score threshold (> 3 std dev).")

    # 5. Handle Null Values
    nulls_filled = 0
    if fill_nulls:
        for col in df.columns:
            null_count = df[col].isnull().sum()
            if null_count > 0:
                if np.issubdtype(df[col].dtype, np.number):
                    median_val = df[col].median()
                    df[col] = df[col].fillna(median_val)
                else:
                    mode_val = df[col].mode()[0] if not df[col].mode().empty else "N/A"
                    df[col] = df[col].fillna(mode_val)
                nulls_filled += int(null_count)
        if nulls_filled > 0:
            report_actions.append(f"Imputed {nulls_filled} null values using median for numeric and mode for categorical columns.")

    # Calculate Data Health Score
    health_score = 100
    if original_rows > 0:
        dup_penalty = (duplicates_removed / original_rows) * 30
        null_penalty = (original_nulls / (original_rows * max(1, len(df.columns)))) * 40
        outlier_penalty = min(20, outliers_detected * 2)
        health_score = max(10, int(100 - dup_penalty - null_penalty - outlier_penalty))

    cleaned_preview = df.head(15).fillna("").to_dict(orient="records")

    return {
        "filename": filename,
        "original_rows": original_rows,
        "cleaned_rows": len(df),
        "duplicates_removed": duplicates_removed,
        "nulls_filled": nulls_filled,
        "outliers_detected": outliers_detected,
        "health_score": health_score,
        "actions_summary": report_actions,
        "preview": cleaned_preview
    }
