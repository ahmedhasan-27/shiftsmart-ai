# ShiftSmart AI Backend

FastAPI backend for the ShiftSmart AI healthcare workforce optimization platform.

## Setup

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Initialize database
python scripts/init_db.py

# Run server
uvicorn app.main:app --reload
```

## API Documentation

Once the server is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=sqlite:///./shiftsmart.db
SECRET_KEY=your-secret-key
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## Docker

```bash
docker-compose up -d
```

## Database

The application uses SQLite by default for development. For production, use PostgreSQL:

```env
DATABASE_URL=postgresql://user:password@localhost/shiftsmart
```
