import uuid
from datetime import datetime
from sqlalchemy import Column, String, Float, Integer, DateTime, ForeignKey, Enum as SQLEnum, Text, Boolean
from sqlalchemy.orm import relationship
import enum
from app.db.database import Base

class RoleEnum(str, enum.Enum):
    ADMIN = "ADMIN"
    MANAGER = "MANAGER"
    ANALYST = "ANALYST"
    VIEWER = "VIEWER"

class SeverityEnum(str, enum.Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"

class AlertStatusEnum(str, enum.Enum):
    ACTIVE = "ACTIVE"
    ACKNOWLEDGED = "ACKNOWLEDGED"
    RESOLVED = "RESOLVED"

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=generate_uuid)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    password = Column(String, nullable=False)
    role = Column(SQLEnum(RoleEnum), default=RoleEnum.ANALYST, nullable=False)
    avatar = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    reports = relationship("Report", back_populates="created_by_user")
    audit_logs = relationship("AuditLog", back_populates="user")

class Product(Base):
    __tablename__ = "products"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, nullable=False)
    sku = Column(String, unique=True, nullable=False)
    category = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    cost = Column(Float, nullable=False)
    stock = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

    order_items = relationship("OrderItem", back_populates="product")
    inventories = relationship("Inventory", back_populates="product")

class Customer(Base):
    __tablename__ = "customers"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    city = Column(String, nullable=False)
    country = Column(String, nullable=False)
    region = Column(String, nullable=False)
    segment = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    orders = relationship("Order", back_populates="customer")

class Order(Base):
    __tablename__ = "orders"

    id = Column(String, primary_key=True, default=generate_uuid)
    customer_id = Column(String, ForeignKey("customers.id"), nullable=False)
    status = Column(String, nullable=False)
    total = Column(Float, nullable=False)
    region = Column(String, nullable=False)
    order_date = Column(DateTime, default=datetime.utcnow)

    customer = relationship("Customer", back_populates="orders")
    items = relationship("OrderItem", back_populates="order")
    sales = relationship("Sale", back_populates="order")

class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(String, primary_key=True, default=generate_uuid)
    order_id = Column(String, ForeignKey("orders.id"), nullable=False)
    product_id = Column(String, ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)

    order = relationship("Order", back_populates="items")
    product = relationship("Product", back_populates="order_items")

class Sale(Base):
    __tablename__ = "sales"

    id = Column(String, primary_key=True, default=generate_uuid)
    order_id = Column(String, ForeignKey("orders.id"), nullable=False)
    amount = Column(Float, nullable=False)
    margin = Column(Float, nullable=False)
    region = Column(String, nullable=False)
    category = Column(String, nullable=False)
    sale_date = Column(DateTime, default=datetime.utcnow)

    order = relationship("Order", back_populates="sales")

class Inventory(Base):
    __tablename__ = "inventories"

    id = Column(String, primary_key=True, default=generate_uuid)
    product_id = Column(String, ForeignKey("products.id"), nullable=False)
    warehouse = Column(String, nullable=False)
    stock_on_hand = Column(Integer, nullable=False)
    reorder_point = Column(Integer, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    product = relationship("Product", back_populates="inventories")

class Region(Base):
    __tablename__ = "regions"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, unique=True, nullable=False)
    country = Column(String, nullable=False)
    target = Column(Float, nullable=False)
    achieved = Column(Float, nullable=False)

class Employee(Base):
    __tablename__ = "employees"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, nullable=False)
    role = Column(String, nullable=False)
    department = Column(String, nullable=False)
    quota = Column(Float, nullable=False)
    sales_total = Column(Float, nullable=False)

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(String, primary_key=True, default=generate_uuid)
    title = Column(String, nullable=False)
    message = Column(String, nullable=False)
    severity = Column(SQLEnum(SeverityEnum), default=SeverityEnum.MEDIUM)
    status = Column(SQLEnum(AlertStatusEnum), default=AlertStatusEnum.ACTIVE)
    metric = Column(String, nullable=False)
    threshold = Column(Float, nullable=False)
    current = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=True)
    action = Column(String, nullable=False)
    details = Column(Text, nullable=False)
    ip_address = Column(String, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="audit_logs")

class Report(Base):
    __tablename__ = "reports"

    id = Column(String, primary_key=True, default=generate_uuid)
    title = Column(String, nullable=False)
    type = Column(String, nullable=False)
    format = Column(String, nullable=False)
    config = Column(Text, nullable=False)
    created_by_id = Column(String, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    created_by_user = relationship("User", back_populates="reports")

class KPI(Base):
    __tablename__ = "kpis"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, unique=True, nullable=False)
    value = Column(Float, nullable=False)
    target = Column(Float, nullable=False)
    unit = Column(String, nullable=False)
    trend = Column(Float, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
