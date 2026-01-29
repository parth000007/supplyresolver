from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class DocumentBase(BaseModel):
    title: str
    document_type: str
    file_path: str


class DocumentCreate(DocumentBase):
    batch_id: Optional[int] = None
    vendor_id: Optional[int] = None
    uploaded_by: int


class DocumentUpdate(BaseModel):
    title: Optional[str] = None
    document_type: Optional[str] = None
    file_path: Optional[str] = None


class DocumentInDB(DocumentBase):
    id: int
    batch_id: Optional[int]
    vendor_id: Optional[int]
    uploaded_by: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

