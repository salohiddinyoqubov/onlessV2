"""
Pydantic schemas for authentication.
"""
from pydantic import BaseModel, EmailStr, Field

from app.models.user import UserRole
from app.schemas.user import UserResponse


class RegisterRequest(BaseModel):
    """Schema for user registration request."""

    email: EmailStr
    password: str = Field(..., min_length=8)
    full_name: str = Field(..., min_length=1, max_length=255)
    phone: str | None = Field(None, max_length=20)
    role: UserRole = UserRole.STUDENT


class LoginRequest(BaseModel):
    """Schema for login request."""

    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    """Schema for token response."""

    access_token: str
    token_type: str = "bearer"


class LoginResponse(TokenResponse):
    """Schema for login response with user info."""

    refresh_token: str
    user: UserResponse
