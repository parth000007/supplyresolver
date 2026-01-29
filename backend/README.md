# Supply Resolver API

A FastAPI-based backend for managing vendors, batches, and documents.

## Features

- Vendor Management
- Batch Tracking
- Document Management
- RESTful API

## Installation

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the application:
```bash
uvicorn app.main:app --reload
```

4. Access the API documentation:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Project Structure

```
backend/
├── app/
│   ├── main.py           # FastAPI application entry point
│   ├── database.py       # Database configuration
│   ├── core/
│   │   └── config.py     # Application settings
│   ├── models/
│   │   ├── vendor.py     # Vendor model
│   │   ├── batch.py      # Batch model
│   │   └── document.py   # Document model
│   ├── schemas/
│   │   ├── vendor.py     # Vendor Pydantic schemas
│   │   ├── batch.py      # Batch Pydantic schemas
│   │   └── document.py   # Document Pydantic schemas
│   ├── routes/
│   │   ├── vendor.py     # Vendor API routes
│   │   ├── batch.py      # Batch API routes
│   │   └── document.py   # Document API routes
│   └── db/
│       └── base.py       # Database base class
├── requirements.txt
└── README.md
```

## API Endpoints

### Vendors
- `GET /api/v1/vendors/` - List all vendors
- `GET /api/v1/vendors/{id}` - Get a vendor by ID
- `POST /api/v1/vendors/` - Create a new vendor
- `PUT /api/v1/vendors/{id}` - Update a vendor
- `DELETE /api/v1/vendors/{id}` - Delete a vendor

### Batches
- `GET /api/v1/batches/` - List all batches
- `GET /api/v1/batches/{id}` - Get a batch by ID
- `POST /api/v1/batches/` - Create a new batch
- `PUT /api/v1/batches/{id}` - Update a batch
- `DELETE /api/v1/batches/{id}` - Delete a batch

### Documents
- `GET /api/v1/documents/` - List all documents
- `GET /api/v1/documents/{id}` - Get a document by ID
- `POST /api/v1/documents/` - Create a new document
- `PUT /api/v1/documents/{id}` - Update a document
- `DELETE /api/v1/documents/{id}` - Delete a document

