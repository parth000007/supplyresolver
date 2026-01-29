from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean
from app.database import Base
from datetime import datetime


class Batch(Base):
    __tablename__ = "batches"

    id = Column(Integer, primary_key=True, index=True)
    batch_number = Column(String(100), unique=True, index=True)
    vendor_id = Column(Integer, ForeignKey("vendors.id"))
    product_name = Column(String(255))
    quantity = Column(Integer)
    unit_price = Column(Float)
    total_amount = Column(Float)
    status = Column(String(50), default="pending")
    expiry_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

