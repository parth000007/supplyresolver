from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine
from app.db.base import Base
from app.routes import vendor, batch, document

# Create database tables (checkfirst=True to avoid errors if tables exist)
Base.metadata.create_all(bind=engine, checkfirst=True)

app = FastAPI(
    title="Supply Resolver API",
    description="API for managing vendors, batches, and documents",
    version="1.0.0"
)

# Configure CORS to allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Include routers
app.include_router(vendor.router, prefix="/api/v1/vendors", tags=["Vendors"])
app.include_router(batch.router, prefix="/api/v1/batches", tags=["Batches"])
app.include_router(document.router, prefix="/api/v1/documents", tags=["Documents"])


@app.get("/")
async def root():
    return {"message": "Welcome to Supply Resolver API"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
