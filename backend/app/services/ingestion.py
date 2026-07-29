import pandas as pd
import io
import json
from datetime import datetime
from typing import Dict, Any, List
from sqlalchemy.orm import Session
from app.db.models import Sale, Product, Customer, Order, OrderItem

def process_file_upload(file_content: bytes, filename: str, db: Session = None, persist_to_db: bool = True) -> Dict[str, Any]:
    """
    Parses CSV, Excel, or JSON files, inspects column types,
    maps columns intelligently to database models, and persists rows to the database.
    """
    ext = filename.split(".")[-1].lower()
    
    if ext == "csv":
        df = pd.read_csv(io.BytesIO(file_content))
    elif ext in ["xlsx", "xls"]:
        df = pd.read_excel(io.BytesIO(file_content))
    elif ext == "json":
        data = json.loads(file_content.decode("utf-8"))
        if isinstance(data, list):
            df = pd.DataFrame(data)
        elif isinstance(data, dict):
            df = pd.DataFrame([data])
        else:
            raise ValueError("Invalid JSON format")
    else:
        raise ValueError(f"Unsupported file format: .{ext}")

    # Column type detection
    columns_info = []
    for col in df.columns:
        dtype_str = str(df[col].dtype)
        inferred = "string"
        if "int" in dtype_str or "float" in dtype_str:
            inferred = "numeric"
        elif "datetime" in dtype_str:
            inferred = "datetime"
        elif "bool" in dtype_str:
            inferred = "boolean"
        else:
            sample_val = str(df[col].dropna().iloc[0]) if not df[col].dropna().empty else ""
            try:
                pd.to_datetime(sample_val)
                inferred = "datetime_candidate"
            except Exception:
                inferred = "string"

        columns_info.append({
            "column": str(col),
            "dtype": dtype_str,
            "inferred_type": inferred,
            "null_count": int(df[col].isnull().sum()),
            "unique_count": int(df[col].nunique())
        })

    # Auto-mapping logic for user's uploaded columns (e.g. OrderID, OrderDate, CustomerName, State, Category, Product, Quantity, Revenue, Cost, Profit)
    col_map = {}
    for col in df.columns:
        c_lower = str(col).lower().replace(" ", "").replace("_", "")
        if c_lower in ["revenue", "amount", "total", "totalamount", "sales", "unitprice"]:
            col_map["amount"] = col
        elif c_lower in ["profit", "margin", "netprofit", "profitmargin"]:
            col_map["margin"] = col
        elif c_lower in ["category", "productcategory"]:
            col_map["category"] = col
        elif c_lower in ["state", "region", "country", "city"]:
            col_map["region"] = col
        elif c_lower in ["orderdate", "date", "saledate", "timestamp"]:
            col_map["sale_date"] = col
        elif c_lower in ["customername", "customer", "customerid"]:
            col_map["customer"] = col
        elif c_lower in ["product", "productname", "item"]:
            col_map["product"] = col

    rows_ingested = 0
    if persist_to_db and db is not None:
        try:
            # Clear existing sales so dashboard and AI insights reflect ONLY the newly uploaded dataset
            db.query(Sale).delete()
            db.commit()

            # Default fallback values if specific columns are absent in custom CSV
            amount_col = col_map.get("amount")
            margin_col = col_map.get("margin")
            cat_col = col_map.get("category")
            reg_col = col_map.get("region")
            date_col = col_map.get("sale_date")
            cust_col = col_map.get("customer")
            prod_col = col_map.get("product")

            # Create default Dummy Order for relationship integrity
            dummy_cust = db.query(Customer).first()
            if not dummy_cust:
                dummy_cust = Customer(name="Global Enterprise Client", email="client@enterprise.com", city="Delhi", country="India", region="Delhi", segment="Enterprise")
                db.add(dummy_cust)
                db.commit()
                db.refresh(dummy_cust)

            dummy_order = db.query(Order).first()
            if not dummy_order:
                dummy_order = Order(customer_id=dummy_cust.id, status="COMPLETED", total=0.0, region="Global")
                db.add(dummy_order)
                db.commit()
                db.refresh(dummy_order)

            new_sales = []
            for _, row in df.iterrows():
                try:
                    amt = float(row[amount_col]) if amount_col and pd.notnull(row[amount_col]) else 1000.0
                except Exception:
                    amt = 1000.0

                try:
                    mgn = float(row[margin_col]) if margin_col and pd.notnull(row[margin_col]) else (amt * 0.35)
                except Exception:
                    mgn = amt * 0.35

                cat = str(row[cat_col]) if cat_col and pd.notnull(row[cat_col]) else "General Solutions"
                reg = str(row[reg_col]) if reg_col and pd.notnull(row[reg_col]) else "Global Region"

                dt = datetime.utcnow()
                if date_col and pd.notnull(row[date_col]):
                    try:
                        dt = pd.to_datetime(row[date_col]).to_pydatetime()
                    except Exception:
                        pass

                sale_item = Sale(
                    order_id=dummy_order.id,
                    amount=amt,
                    margin=mgn,
                    category=cat,
                    region=reg,
                    sale_date=dt
                )
                new_sales.append(sale_item)

            db.add_all(new_sales)
            db.commit()
            rows_ingested = len(new_sales)
        except Exception as e:
            db.rollback()
            print(f"Error persisting uploaded dataset: {e}")

    preview_rows = df.head(15).fillna("").to_dict(orient="records")

    return {
        "filename": filename,
        "row_count": len(df),
        "rows_ingested": rows_ingested,
        "column_count": len(df.columns),
        "columns": columns_info,
        "mapped_columns": col_map,
        "preview": preview_rows
    }
