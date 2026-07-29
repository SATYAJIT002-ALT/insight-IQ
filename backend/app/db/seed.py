import random
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from app.db.database import Base, engine, SessionLocal
from app.db.models import (
    User, RoleEnum, Product, Customer, Order, OrderItem, Sale,
    Inventory, Region, Employee, Alert, SeverityEnum, AlertStatusEnum,
    AuditLog, Report, KPI
)
from app.core.security import get_password_hash

def seed_database():
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()

    try:
        # Check if already seeded
        if db.query(User).filter_by(email="admin@insightiq.ai").first():
            print("Database already seeded.")
            return

        print("Seeding initial enterprise dataset...")

        # 1. Users
        users = [
            User(
                email="admin@insightiq.ai",
                name="Sarah Connor (Admin)",
                password=get_password_hash("password123"),
                role=RoleEnum.ADMIN,
                avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
            ),
            User(
                email="manager@insightiq.ai",
                name="Marcus Vance (Manager)",
                password=get_password_hash("password123"),
                role=RoleEnum.MANAGER,
                avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
            ),
            User(
                email="analyst@insightiq.ai",
                name="Elena Rostova (Analyst)",
                password=get_password_hash("password123"),
                role=RoleEnum.ANALYST,
                avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
            ),
            User(
                email="viewer@insightiq.ai",
                name="David Chen (Viewer)",
                password=get_password_hash("password123"),
                role=RoleEnum.VIEWER,
                avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
            ),
        ]
        db.add_all(users)
        db.commit()

        # 2. Products
        categories = ["Cloud Infrastructure", "Enterprise AI", "Cybersecurity", "Data Analytics", "SaaS Tools"]
        products_data = [
            ("InsightIQ Neural Core v4", "PRD-101", "Enterprise AI", 12500.0, 4200.0, 150),
            ("Quantum Data Warehouse Pro", "PRD-102", "Data Analytics", 8900.0, 3100.0, 220),
            ("ZeroTrust Shield Enterprise", "PRD-103", "Cybersecurity", 6500.0, 1800.0, 340),
            ("HyperCloud Compute Engine", "PRD-104", "Cloud Infrastructure", 15000.0, 5000.0, 90),
            ("OmniStream Analytics Suite", "PRD-105", "SaaS Tools", 4500.0, 1200.0, 500),
            ("CyberSentinel Threat Detector", "PRD-106", "Cybersecurity", 7800.0, 2500.0, 180),
            ("AutoML Predictive Pipeline", "PRD-107", "Enterprise AI", 9800.0, 3200.0, 110),
            ("Elastic Edge Gateway", "PRD-108", "Cloud Infrastructure", 3200.0, 950.0, 600)
        ]
        
        db_products = []
        for name, sku, cat, price, cost, stock in products_data:
            p = Product(name=name, sku=sku, category=cat, price=price, cost=cost, stock=stock)
            db_products.append(p)
        db.add_all(db_products)
        db.commit()

        # 3. Regions & Employees
        regions_data = [
            ("North America", "USA", 5000000.0, 4820000.0),
            ("Europe", "UK", 3500000.0, 3650000.0),
            ("Asia Pacific", "Japan", 4000000.0, 4120000.0),
            ("Latin America", "Brazil", 1800000.0, 1620000.0),
            ("Middle East & Africa", "UAE", 2200000.0, 2350000.0)
        ]
        db_regions = []
        for r_name, c_name, tgt, ach in regions_data:
            r = Region(name=r_name, country=c_name, target=tgt, achieved=ach)
            db_regions.append(r)
        db.add_all(db_regions)

        employees_data = [
            ("Alex Mercer", "VP Sales", "Commercial", 1500000.0, 1680000.0),
            ("Sophia Tanaka", "Senior Enterprise AE", "Enterprise", 1200000.0, 1340000.0),
            ("Liam O'Connor", "Account Executive", "Mid-Market", 800000.0, 790000.0),
            ("Aarav Sharma", "Global Solutions Director", "Enterprise", 2000000.0, 2150000.0),
            ("Chloe Dubois", "Customer Success Lead", "Retention", 600000.0, 650000.0)
        ]
        for name, role, dept, q, s in employees_data:
            db.add(Employee(name=name, role=role, department=dept, quota=q, sales_total=s))
        db.commit()

        # 4. Customers
        customer_locs = [
            ("Apex Global Corp", "New York", "USA", "North America", "Enterprise"),
            ("Aether Technologies", "London", "UK", "Europe", "Mid-Market"),
            ("NeoTokyo Cybernetics", "Tokyo", "Japan", "Asia Pacific", "Enterprise"),
            ("Bavaria Dynamics", "Berlin", "Germany", "Europe", "Enterprise"),
            ("Sydney Innovation Hub", "Sydney", "Australia", "Asia Pacific", "SMB"),
            ("Silicon Gateway Inc", "San Francisco", "USA", "North America", "Enterprise"),
            ("Marina Bay Ventures", "Singapore", "Singapore", "Asia Pacific", "Mid-Market"),
            ("Paris AeroTech", "Paris", "France", "Europe", "Enterprise"),
            ("Bangalore AI Works", "Bangalore", "India", "Asia Pacific", "Enterprise"),
            ("Toronto Data Labs", "Toronto", "Canada", "North America", "Mid-Market"),
            ("Dubai Horizon Trading", "Dubai", "UAE", "Middle East & Africa", "Enterprise"),
            ("Sao Paulo Tech Solutions", "Sao Paulo", "Brazil", "Latin America", "SMB")
        ]

        db_customers = []
        for idx, (c_name, city, country, region, segment) in enumerate(customer_locs):
            cust = Customer(
                name=c_name,
                email=f"contact@{c_name.lower().replace(' ', '')}.com",
                city=city,
                country=country,
                region=region,
                segment=segment
            )
            db_customers.append(cust)
        db.add_all(db_customers)
        db.commit()

        # 5. Historical Orders & Sales (365 days of data)
        start_date = datetime.utcnow() - timedelta(days=365)
        sales_records = []
        
        statuses = ["COMPLETED", "COMPLETED", "COMPLETED", "COMPLETED", "PROCESSING", "PENDING"]
        
        for i in range(450):
            days_offset = random.randint(0, 365)
            order_dt = start_date + timedelta(days=days_offset, hours=random.randint(0, 23))
            
            cust = random.choice(db_customers)
            prod = random.choice(db_products)
            qty = random.randint(1, 10)
            status = random.choice(statuses)
            
            item_price = prod.price
            total_amt = item_price * qty
            margin_pct = (prod.price - prod.cost) / prod.price
            margin_amt = total_amt * margin_pct

            ord_obj = Order(
                customer_id=cust.id,
                status=status,
                total=total_amt,
                region=cust.region,
                order_date=order_dt
            )
            db.add(ord_obj)
            db.flush()

            ord_item = OrderItem(
                order_id=ord_obj.id,
                product_id=prod.id,
                quantity=qty,
                price=item_price
            )
            db.add(ord_item)

            sale_obj = Sale(
                order_id=ord_obj.id,
                amount=total_amt,
                margin=margin_amt,
                region=cust.region,
                category=prod.category,
                sale_date=order_dt
            )
            db.add(sale_obj)

        db.commit()

        # 6. Inventory & Warehouses
        warehouses = ["US-East-1 (Virginia)", "EU-Central-1 (Frankfurt)", "AP-Northeast-1 (Tokyo)", "US-West-2 (Oregon)"]
        for prod in db_products:
            for wh in warehouses:
                db.add(Inventory(
                    product_id=prod.id,
                    warehouse=wh,
                    stock_on_hand=random.randint(50, 800),
                    reorder_point=100
                ))
        db.commit()

        # 7. Alerts
        alerts_data = [
            ("Revenue Surge Detected", "North America Enterprise sales exceeded quarterly forecast by 28%", SeverityEnum.LOW, AlertStatusEnum.ACTIVE, "Revenue", 4000000.0, 4820000.0),
            ("Inventory Shortage Risk", "InsightIQ Neural Core stock below safety buffer in EU-Central warehouse", SeverityEnum.HIGH, AlertStatusEnum.ACTIVE, "Inventory", 50.0, 18.0),
            ("Unusual Customer Churn Risk", "3 Enterprise accounts in APAC flagged with negative usage sentiment", SeverityEnum.CRITICAL, AlertStatusEnum.ACTIVE, "Churn Risk", 0.05, 0.12),
            ("High Margin Variance", "Cybersecurity category profit margin spiked to 72% in Q3", SeverityEnum.MEDIUM, AlertStatusEnum.ACKNOWLEDGED, "Margin", 0.60, 0.72)
        ]
        for title, msg, sev, st, met, thresh, curr in alerts_data:
            db.add(Alert(
                title=title,
                message=msg,
                severity=sev,
                status=st,
                metric=met,
                threshold=thresh,
                current=curr
            ))
        db.commit()

        # 8. Audit Logs
        logs_data = [
            ("System Admin", "USER_LOGIN", "Admin authenticated via secure JWT token", "192.168.1.10"),
            ("Marcus Vance", "REPORT_GENERATED", "Exported Q3 Executive Summary PDF", "10.0.4.12"),
            ("Elena Rostova", "DATA_CLEANED", "Applied automated deduplication & null imputation on Q3_Sales.csv", "172.16.0.45"),
            ("System Automated Engine", "ML_FORECAST_UPDATED", "Re-trained Random Forest revenue model with 450 new sales records", "127.0.0.1")
        ]
        for user_name, action, details, ip in logs_data:
            db.add(AuditLog(
                action=action,
                details=f"[{user_name}] {details}",
                ip_address=ip
            ))

        # 9. KPIs
        kpis_data = [
            ("Total Revenue", 24850900.0, 22000000.0, "$", 18.4),
            ("Net Profit Margin", 42.6, 38.0, "%", 4.6),
            ("Total Orders", 18450.0, 15000.0, "units", 23.0),
            ("Average Order Value (AOV)", 13460.0, 12000.0, "$", 12.2),
            ("Active Customers", 4280.0, 4000.0, "accounts", 7.0),
            ("Conversion Rate", 4.85, 4.20, "%", 15.4),
            ("Inventory Asset Value", 8450000.0, 9000000.0, "$", -6.1),
            ("Net Sales Growth", 28.4, 25.0, "%", 3.4)
        ]
        for name, val, tgt, unit, trend in kpis_data:
            db.add(KPI(
                name=name,
                value=val,
                target=tgt,
                unit=unit,
                trend=trend
            ))

        db.commit()
        print("Database seeded successfully!")

    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
