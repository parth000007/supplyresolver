# Supply Resolver

A full-stack supply chain management application for tracking vendors, batches, and documents.

## Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: FastAPI + SQLAlchemy + SQLite

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+

### 1. Start the Backend

```bash
# Install Python dependencies
pip install -r requirements.txt

# Run the backend server
cd backend
uvicorn app.main:app --reload --port 8000
```

The API will be available at http://localhost:8000 with docs at http://localhost:8000/docs.

### 2. Start the Frontend

```bash
# Install frontend dependencies
cd frontend
npm install

# Run the development server
npm run dev
```

The frontend will be available at http://localhost:3000.

### 3. Build for Production

```bash
cd frontend
npm run build
npm run preview
```

## Project Structure

```
supplyresolver/
├── backend/           # FastAPI backend
│   └── app/
│       ├── main.py        # Entry point
│       ├── database.py    # Database config
│       ├── models/        # SQLAlchemy models
│       ├── schemas/       # Pydantic schemas
│       └── routes/        # API routes
├── frontend/          # React frontend
│   ├── src/
│   │   ├── api/           # Axios API client
│   │   ├── components/    # Reusable UI components
│   │   └── pages/         # Page components
│   └── vite.config.js
├── requirements.txt   # Python dependencies
└── vercel.json        # Vercel deployment config
```
