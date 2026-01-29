from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.batch import Batch
from app.schemas.batch import BatchCreate, BatchUpdate, BatchInDB
from typing import List

router = APIRouter()


@router.get("/", response_model=List[BatchInDB])
def get_batches(db: Session = Depends(get_db)):
    batches = db.query(Batch).all()
    return batches


@router.get("/{batch_id}", response_model=BatchInDB)
def get_batch(batch_id: int, db: Session = Depends(get_db)):
    batch = db.query(Batch).filter(Batch.id == batch_id).first()
    if not batch:
        raise HTTPException(status_code=404, detail="Batch not found")
    return batch


@router.post("/", response_model=BatchInDB)
def create_batch(batch: BatchCreate, db: Session = Depends(get_db)):
    db_batch = Batch(**batch.model_dump())
    db.add(db_batch)
    db.commit()
    db.refresh(db_batch)
    return db_batch


@router.put("/{batch_id}", response_model=BatchInDB)
def update_batch(batch_id: int, batch_update: BatchUpdate, db: Session = Depends(get_db)):
    batch = db.query(Batch).filter(Batch.id == batch_id).first()
    if not batch:
        raise HTTPException(status_code=404, detail="Batch not found")
    
    for key, value in batch_update.model_dump(exclude_unset=True).items():
        setattr(batch, key, value)
    
    db.commit()
    db.refresh(batch)
    return batch


@router.delete("/{batch_id}")
def delete_batch(batch_id: int, db: Session = Depends(get_db)):
    batch = db.query(Batch).filter(Batch.id == batch_id).first()
    if not batch:
        raise HTTPException(status_code=404, detail="Batch not found")
    
    db.delete(batch)
    db.commit()
    return {"message": "Batch deleted successfully"}

