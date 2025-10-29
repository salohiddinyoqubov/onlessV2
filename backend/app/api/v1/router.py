"""
API v1 router - aggregates all v1 endpoints.
"""
from fastapi import APIRouter

from app.api.v1.endpoints import auth

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])

# Placeholder for other routers (to be implemented)
# api_router.include_router(users.router, prefix="/users", tags=["Users"])
# api_router.include_router(exams.router, prefix="/exams", tags=["Exams"])
# api_router.include_router(questions.router, prefix="/questions", tags=["Questions"])
# api_router.include_router(bookings.router, prefix="/bookings", tags=["Bookings"])
# api_router.include_router(payments.router, prefix="/payments", tags=["Payments"])
# api_router.include_router(organizations.router, prefix="/organizations", tags=["Organizations"])
