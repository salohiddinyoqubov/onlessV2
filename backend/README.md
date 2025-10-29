# Onless.uz Backend API

FastAPI backend for the Onless.uz online driving school platform.

## Features

- **FastAPI** - Modern, fast web framework for building APIs
- **SQLAlchemy 2.0** - Async ORM with type hints
- **Alembic** - Database migrations
- **Pydantic v2** - Data validation using Python type annotations
- **JWT Authentication** - Secure token-based authentication
- **Role-Based Access Control** - Multi-role authorization (Student, Teacher, Instructor, Business Owner, Mentor, Admin)
- **Multi-tenancy** - Support for multiple driving schools
- **PostgreSQL** - Robust relational database
- **Poetry** - Modern dependency management

## Architecture

```
backend/
├── alembic/              # Database migrations
├── app/
│   ├── api/              # API routes
│   │   ├── deps.py       # Dependencies (auth, permissions)
│   │   └── v1/           # API version 1
│   │       ├── endpoints/
│   │       │   └── auth.py
│   │       └── router.py
│   ├── core/             # Core functionality
│   │   ├── config.py     # Settings
│   │   └── security.py   # JWT, password hashing
│   ├── db/               # Database
│   │   ├── base.py       # Base model, mixins
│   │   └── session.py    # Async session
│   ├── models/           # SQLAlchemy models
│   │   ├── user.py
│   │   ├── organization.py
│   │   ├── question.py
│   │   ├── exam.py
│   │   ├── booking.py
│   │   └── payment.py
│   ├── schemas/          # Pydantic schemas
│   │   ├── user.py
│   │   ├── auth.py
│   │   └── exam.py
│   └── main.py           # FastAPI app
├── tests/                # Test suite
├── .env.example          # Environment variables template
├── pyproject.toml        # Poetry configuration
└── README.md             # This file
```

## Database Models

### User Management
- **User** - Multi-role users (Student, Teacher, Instructor, Business Owner, Mentor, Admin)
- **Organization** - Driving schools (multi-tenancy)

### Exam System
- **Question** - Theory exam questions (multi-language support)
- **QuestionCategory** - Question categorization
- **Exam** - Exam templates
- **ExamSession** - Individual exam sessions
- **ExamAnswer** - Student answers

### Booking System
- **BookingSlot** - Available time slots for instructors
- **Booking** - Session bookings (theory/practical lessons)

### Payment System
- **Tariff** - Subscription plans
- **Subscription** - Organization subscriptions
- **Payment** - Payment transactions

## Setup

### Prerequisites

- Python 3.11+
- PostgreSQL 14+
- Poetry

### Installation

1. **Clone the repository**
```bash
cd backend
```

2. **Install dependencies**
```bash
poetry install
```

3. **Activate virtual environment**
```bash
poetry shell
```

4. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. **Create database**
```bash
createdb onless_db
```

6. **Run migrations**
```bash
alembic upgrade head
```

7. **Start development server**
```bash
poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Development

### Create new migration
```bash
alembic revision --autogenerate -m "Add new table"
```

### Apply migrations
```bash
alembic upgrade head
```

### Rollback migration
```bash
alembic downgrade -1
```

### Run tests
```bash
poetry run pytest
```

### Code formatting
```bash
poetry run black app/
```

### Type checking
```bash
poetry run mypy app/
```

## API Documentation

Once the server is running:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **OpenAPI JSON**: http://localhost:8000/openapi.json

## Authentication

### Register
```bash
POST /api/v1/auth/register
{
  "email": "user@example.com",
  "password": "securepassword",
  "full_name": "John Doe",
  "phone": "+998901234567",
  "role": "student"
}
```

### Login
```bash
POST /api/v1/auth/login
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

Response:
```json
{
  "access_token": "eyJ...",
  "refresh_token": "eyJ...",
  "token_type": "bearer",
  "user": {...}
}
```

### Protected endpoints
```bash
GET /api/v1/auth/me
Authorization: Bearer <access_token>
```

## User Roles

- **Student** - Takes exams, books sessions
- **Teacher** - Provides theoretical lessons
- **Instructor** - Provides practical driving lessons
- **Business Owner** - Manages driving school (organization)
- **Mentor** - Independent expert providing private lessons
- **Admin** - Platform administrator

## Best Practices

### SQLAlchemy Models
- Use type hints with `Mapped[]`
- Include mixins for common patterns (timestamps, soft delete)
- Define relationships clearly
- Use enums for status fields

### Pydantic Schemas
- Separate schemas for Create, Update, Response
- Use `model_config = {"from_attributes": True}` for ORM models
- Validate field constraints (min_length, max_length, regex)

### API Endpoints
- Use async/await consistently
- Implement proper error handling
- Use dependency injection for auth
- Return appropriate HTTP status codes
- Include response models

### Security
- Hash passwords with bcrypt
- Use JWT tokens for authentication
- Implement role-based access control
- Validate all inputs with Pydantic
- Use HTTPS in production

## Environment Variables

See `.env.example` for all available configuration options.

Key variables:
- `POSTGRES_*` - Database connection
- `SECRET_KEY` - JWT signing key (change in production!)
- `BACKEND_CORS_ORIGINS` - Allowed CORS origins
- `FIRST_SUPERUSER_*` - Initial admin user

## Production Deployment

1. Set `ENVIRONMENT=production` in `.env`
2. Use strong `SECRET_KEY`
3. Configure production database
4. Set up reverse proxy (nginx)
5. Use process manager (systemd, supervisor)
6. Enable HTTPS
7. Set up monitoring and logging
8. Configure backups

## Next Steps

1. Implement remaining endpoints:
   - Users CRUD
   - Exams & Questions
   - Bookings
   - Payments
   - Organizations

2. Add features:
   - Email notifications
   - SMS OTP verification
   - File uploads (images)
   - Google Calendar integration
   - WhatsApp Business API
   - Payment gateway integration (Payme, Click, Uzum)

3. Testing:
   - Unit tests
   - Integration tests
   - Load testing

4. DevOps:
   - Docker containerization
   - CI/CD pipeline
   - Monitoring (Prometheus, Grafana)
   - Logging (ELK stack)

## License

Copyright © 2024 Onless.uz

## Contact

Website: onless.uz
