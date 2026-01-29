from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class BatchBase(BaseModel):
    batch_number: str
    vendor_id: int
    product_name: str
    quantity: int
    unit_price: float
    total_amount: float
    status: str = "pending"
    expiry_date: Optional[datetime] = None


class BatchCreate(BatchBase):
    pass


class BatchUpdate(BaseModel):
    product_name: Optional[str] = None
    quantity: Optional[int] = None
    unit_price: Optional[float] = None
    total_amount: Optional[float] = None
    status: Optional[str] = None
    expiry_date: Optional[datetime] = None


class BatchInDB(BatchBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

