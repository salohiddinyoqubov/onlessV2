# Getting Started with Onless.uz Backend

This guide will help you get the backend up and running quickly.

## Quick Start (Docker - Recommended)

The easiest way to get started is using Docker Compose:

```bash
# 1. Copy environment file
cp .env.example .env

# 2. Edit .env with your settings (at minimum, change SECRET_KEY)
nano .env

# 3. Start all services (PostgreSQL, Redis, Backend)
docker-compose up -d

# 4. Check logs
docker-compose logs -f backend

# 5. Access API
# - API: http://localhost:8000
# - Docs: http://localhost:8000/docs
```

That's it! The database migrations and initialization will run automatically.

## Manual Setup (Local Development)

If you prefer to run the backend locally:

### 1. Prerequisites

- Python 3.11+
- PostgreSQL 14+
- Redis (optional, for caching)
- Poetry

### 2. Install Poetry

```bash
curl -sSL https://install.python-poetry.org | python3 -
```

### 3. Install Dependencies

```bash
cd backend
poetry install
poetry shell
```

### 4. Setup Database

```bash
# Create PostgreSQL database
createdb onless_db

# Or using psql
psql -U postgres -c "CREATE DATABASE onless_db;"
```

### 5. Configure Environment

```bash
cp .env.example .env
# Edit .env file with your settings
```

Minimum required settings:
```env
SECRET_KEY=your-super-secret-key-minimum-32-characters-long
POSTGRES_SERVER=localhost
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
POSTGRES_DB=onless_db
FIRST_SUPERUSER_EMAIL=admin@onless.uz
FIRST_SUPERUSER_PASSWORD=changethis
```

### 6. Run Migrations

```bash
# Run database migrations
alembic upgrade head

# Initialize database with default data
python -m app.db.init_db
```

### 7. Start Development Server

```bash
# Using Poetry
poetry run uvicorn app.main:app --reload

# Or using Makefile
make dev

# Or directly
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 8. Access the API

- **API**: http://localhost:8000
- **Interactive Docs (Swagger)**: http://localhost:8000/docs
- **Alternative Docs (ReDoc)**: http://localhost:8000/redoc

## Testing the API

### 1. Register a User

```bash
curl -X POST "http://localhost:8000/api/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@example.com",
    "password": "securepass123",
    "full_name": "John Doe",
    "phone": "+998901234567",
    "role": "student"
  }'
```

### 2. Login

```bash
curl -X POST "http://localhost:8000/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@example.com",
    "password": "securepass123"
  }'
```

Save the `access_token` from the response.

### 3. Get Current User

```bash
curl -X GET "http://localhost:8000/api/v1/auth/me" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Using Makefile Commands

The `Makefile` provides convenient shortcuts:

```bash
make help          # Show all available commands
make install       # Install dependencies
make dev          # Run development server
make migrate      # Run migrations
make migrate-create MESSAGE="Add users" # Create new migration
make test         # Run tests
make format       # Format code
make lint         # Run linter
make clean        # Clean cache files
```

## Database Management

### Create Migration

After modifying models:
```bash
alembic revision --autogenerate -m "Description of changes"
```

### Apply Migrations

```bash
alembic upgrade head
```

### Rollback Migration

```bash
alembic downgrade -1
```

### Reset Database

```bash
make db-reset  # Drop, create, and migrate
```

## Running Tests

```bash
# Run all tests
poetry run pytest

# Run with coverage
poetry run pytest --cov=app

# Run specific test file
poetry run pytest tests/test_auth.py

# Run with output
poetry run pytest -v -s
```

## Project Structure Overview

```
backend/
├── app/
│   ├── api/              # API routes
│   │   ├── deps.py       # Auth dependencies
│   │   └── v1/
│   │       ├── endpoints/
│   │       │   └── auth.py   # Auth endpoints
│   │       └── router.py      # API router
│   ├── core/             # Core config
│   │   ├── config.py     # Settings
│   │   └── security.py   # JWT & passwords
│   ├── db/               # Database
│   │   ├── base.py       # Base models
│   │   ├── session.py    # DB session
│   │   └── init_db.py    # DB initialization
│   ├── models/           # SQLAlchemy models
│   ├── schemas/          # Pydantic schemas
│   └── main.py           # FastAPI app
├── alembic/              # Migrations
├── tests/                # Test suite
├── .env.example          # Environment template
├── pyproject.toml        # Dependencies
└── README.md
```

## Common Issues

### Issue: Port 8000 already in use
```bash
# Find process using port 8000
lsof -i :8000

# Kill the process
kill -9 <PID>
```

### Issue: Database connection error
- Check PostgreSQL is running: `pg_isadmin`
- Verify database exists: `psql -l`
- Check .env database credentials

### Issue: Import errors
- Make sure you're in poetry shell: `poetry shell`
- Reinstall dependencies: `poetry install`

### Issue: Migration conflicts
```bash
# Check current revision
alembic current

# Check migration history
alembic history

# Stamp current version (if needed)
alembic stamp head
```

## Next Steps

1. **Explore the API**: Open http://localhost:8000/docs and try the endpoints
2. **Read the README**: Full documentation in `README.md`
3. **Implement Features**: Add more endpoints (users, exams, bookings, etc.)
4. **Run Tests**: `make test`
5. **Deploy**: See `README.md` for production deployment guide

## Getting Help

- Check the main `README.md` for detailed documentation
- Review the API docs at `/docs`
- Examine the example code in `app/api/v1/endpoints/auth.py`
- Look at the models in `app/models/`

## Development Workflow

1. Create feature branch: `git checkout -b feature/new-endpoint`
2. Modify models if needed
3. Create migration: `make migrate-create MESSAGE="Add field"`
4. Implement endpoint in `app/api/v1/endpoints/`
5. Add Pydantic schemas in `app/schemas/`
6. Write tests in `tests/`
7. Run tests: `make test`
8. Format code: `make format`
9. Commit and push

Happy coding! 🚀
