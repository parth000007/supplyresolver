import os
import hashlib
import uuid
from pathlib import Path
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.document import Document
from app.models.batch import Batch
from app.schemas.document import DocumentInDB
from typing import Optional

router = APIRouter()

# Configure upload directory - relative to project root
UPLOAD_DIR = Path(__file__).resolve().parent.parent.parent / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


def calculate_file_hash(file_path: Path) -> str:
    """
    Calculate SHA-256 hash of a file.
    
    Args:
        file_path: Path to the file
        
    Returns:
        Hexadecimal string of the SHA-256 hash
    """
    sha256_hash = hashlib.sha256()
    with open(file_path, "rb") as f:
        # Read in chunks to handle large files efficiently
        for chunk in iter(lambda: f.read(8192), b""):
            sha256_hash.update(chunk)
    return sha256_hash.hexdigest()


def validate_file_type(content_type: str) -> bool:
    """
    Validate that the uploaded file is a PDF.
    
    Args:
        content_type: The MIME type of the file
        
    Returns:
        True if valid, False otherwise
    """
    allowed_types = ["application/pdf"]
    return content_type in allowed_types


@router.get("/", response_model=list[DocumentInDB])
def get_documents(db: Session = Depends(get_db)):
    """Get all documents."""
    documents = db.query(Document).all()
    return documents


@router.get("/{document_id}", response_model=DocumentInDB)
def get_document(document_id: int, db: Session = Depends(get_db)):
    """Get a document by ID."""
    document = db.query(Document).filter(Document.id == document_id).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    return document


@router.post("/upload", response_model=DocumentInDB)
async def upload_document(
    file: UploadFile = File(...),
    batch_id: int = Form(...),
    title: str = Form(...),
    document_type: str = Form("certificate"),
    uploaded_by: int = Form(1),  # Default to 1 for now (no auth)
    db: Session = Depends(get_db)
):
    """
    Upload a supply chain certificate PDF.
    
    Flow:
    1. Validate that the batch exists
    2. Validate that the file is a PDF
    3. Save the file to /uploads directory with a unique name
    4. Calculate SHA-256 hash of the saved file
    5. Save document metadata to the database
    6. Return the stored metadata
    """
    # Step 1: Validate batch exists
    batch = db.query(Batch).filter(Batch.id == batch_id).first()
    if not batch:
        raise HTTPException(
            status_code=404,
            detail=f"Batch with ID {batch_id} not found"
        )
    
    # Step 2: Validate file type
    if not validate_file_type(file.content_type):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed"
        )
    
    # Step 3: Generate unique filename and save file
    file_extension = ".pdf"
    unique_filename = f"{batch_id}_{uuid.uuid4().hex[:8]}{file_extension}"
    file_path = UPLOAD_DIR / unique_filename
    
    try:
        content = await file.read()
        with open(file_path, "wb") as f:
            f.write(content)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to save file: {str(e)}"
        )
    
    # Step 4: Calculate SHA-256 hash
    file_hash = calculate_file_hash(file_path)
    
    # Step 5: Save metadata to database
    document = Document(
        title=title,
        document_type=document_type,
        file_path=str(file_path),
        file_hash=file_hash,
        batch_id=batch_id,
        uploaded_by=uploaded_by
    )
    db.add(document)
    db.commit()
    db.refresh(document)
    
    # Step 6: Return stored metadata
    return document


@router.post("/", response_model=DocumentInDB)
def create_document(
    title: str = Form(...),
    document_type: str = Form(...),
    file_path: str = Form(...),
    batch_id: Optional[int] = Form(None),
    vendor_id: Optional[int] = Form(None),
    uploaded_by: int = Form(...),
    db: Session = Depends(get_db)
):
    """Create a document with metadata only (no file upload)."""
    document = Document(
        title=title,
        document_type=document_type,
        file_path=file_path,
        batch_id=batch_id,
        vendor_id=vendor_id,
        uploaded_by=uploaded_by
    )
    db.add(document)
    db.commit()
    db.refresh(document)
    return document


@router.put("/{document_id}", response_model=DocumentInDB)
def update_document(
    document_id: int,
    title: Optional[str] = Form(None),
    document_type: Optional[str] = Form(None),
    db: Session = Depends(get_db)
):
    """Update document metadata."""
    document = db.query(Document).filter(Document.id == document_id).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    
    if title is not None:
        document.title = title
    if document_type is not None:
        document.document_type = document_type
    
    db.commit()
    db.refresh(document)
    return document


@router.delete("/{document_id}")
def delete_document(document_id: int, db: Session = Depends(get_db)):
    """Delete a document and its associated file."""
    document = db.query(Document).filter(Document.id == document_id).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    
    # Delete the file if it exists
    file_path = Path(document.file_path)
    if file_path.exists():
        file_path.unlink()
    
    # Delete the database record
    db.delete(document)
    db.commit()
    
    return {"message": "Document deleted successfully"}
