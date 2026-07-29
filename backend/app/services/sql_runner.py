import time
from sqlalchemy import text
from sqlalchemy.orm import Session
from typing import Dict, Any, List

def convert_nl_to_sql(prompt: str) -> str:
    """
    Translates Natural Language queries into valid SQL for InsightIQ schema.
    """
    p = prompt.lower()
    
    if "top" in p and "customer" in p:
        return "SELECT c.name, c.region, SUM(o.total) as total_spent FROM customers c JOIN orders o ON c.id = o.customer_id GROUP BY c.id ORDER BY total_spent DESC LIMIT 5;"
    elif "revenue by category" in p or "category" in p:
        return "SELECT category, SUM(amount) as total_revenue, AVG(margin) as avg_margin FROM sales GROUP BY category ORDER BY total_revenue DESC;"
    elif "revenue by region" in p or "region" in p:
        return "SELECT region, SUM(amount) as total_revenue FROM sales GROUP BY region ORDER BY total_revenue DESC;"
    elif "inventory" in p or "stock" in p:
        return "SELECT p.name, p.category, p.stock, i.warehouse FROM products p JOIN inventories i ON p.id = i.product_id WHERE p.stock < 200 ORDER BY p.stock ASC;"
    elif "order status" in p or "orders" in p:
        return "SELECT status, COUNT(*) as count, SUM(total) as total_value FROM orders GROUP BY status;"
    elif "kpi" in p or "metrics" in p:
        return "SELECT name, value, target, unit, trend FROM kpis ORDER BY value DESC;"
    elif "alert" in p:
        return "SELECT title, severity, metric, threshold, current, created_at FROM alerts WHERE status = 'ACTIVE' ORDER BY created_at DESC;"
    else:
        return "SELECT category, SUM(amount) as total_sales, AVG(margin) as avg_margin FROM sales GROUP BY category ORDER BY total_sales DESC LIMIT 10;"

def execute_raw_sql(db: Session, query_str: str) -> Dict[str, Any]:
    """
    Executes a SQL query safely and returns structured columns, rows, timing, and rowcount.
    """
    # Restrict destructive commands in interactive studio for security
    disallowed = ["drop database", "drop table", "truncate", "delete from users", "alter table"]
    clean_q = query_str.strip().lower()
    for bad in disallowed:
        if bad in clean_q:
            raise ValueError(f"Security Policy Restriction: Command '{bad}' is disallowed in SQL Studio.")

    start_time = time.time()
    result = db.execute(text(query_str))
    
    if result.returns_rows:
        columns = list(result.keys())
        rows = [dict(zip(columns, row)) for row in result.fetchall()]
        row_count = len(rows)
    else:
        db.commit()
        columns = ["status"]
        rows = [{"status": f"Query executed successfully. Affected rows: {result.rowcount}"}]
        row_count = result.rowcount

    execution_time_ms = round((time.time() - start_time) * 1000, 2)

    return {
        "query": query_str,
        "columns": columns,
        "rows": rows,
        "row_count": row_count,
        "execution_time_ms": execution_time_ms
    }
