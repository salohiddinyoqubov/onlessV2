"""
Pydantic schemas for User model.
"""
from datetime import datetime

from pydantic import BaseModel, EmailStr, Field

from app.models.user import UserRole, UserLevel


class UserBase(BaseModel):
    """Base user schema with common fields."""

    email: EmailStr
    full_name: str = Field(..., min_length=1, max_length=255)
    phone: str | None = Field(None, max_length=20)


class UserCreate(UserBase):
    """Schema for creating a user."""

    password: str = Field(..., min_length=8)
    role: UserRole = UserRole.STUDENT


class UserUpdate(BaseModel):
    """Schema for updating a user."""

    full_name: str | None = Field(None, min_length=1, max_length=255)
    phone: str | None = Field(None, max_length=20)
    bio: str | None = None
    avatar_url: str | None = None


class UserResponse(UserBase):
    """Schema for user response."""

    id: int
    role: UserRole
    is_active: bool
    is_verified: bool
    organization_id: int | None
    level: UserLevel | None
    rating: float
    total_sessions: int
    work_privately: bool
    bio: str | None
    avatar_url: str | None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class UserListResponse(BaseModel):
    """Schema for paginated user list."""

    items: list[UserResponse]
    total: int
    page: int
    size: int
    pages: int
