"""
Authentication endpoints: login, register, refresh token.
"""
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api import deps
from app.core.security import create_access_token, create_refresh_token, get_password_hash, verify_password
from app.db.session import get_db
from app.models.user import User
from app.schemas.auth import LoginRequest, LoginResponse, RegisterRequest, TokenResponse
from app.schemas.user import UserResponse

router = APIRouter()


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(
    data: RegisterRequest,
    db: Annotated[AsyncSession, Depends(get_db)],
) -> User:
    """
    Register a new user.

    Creates a new student account by default.
    """
    # Check if user already exists
    result = await db.execute(select(User).where(User.email == data.email))
    existing_user = result.scalar_one_or_none()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    # Create new user
    user = User(
        email=data.email,
        password_hash=get_password_hash(data.password),
        full_name=data.full_name,
        phone=data.phone,
        role=data.role,
    )

    db.add(user)
    await db.commit()
    await db.refresh(user)

    return user


@router.post("/login", response_model=LoginResponse)
async def login(
    data: LoginRequest,
    db: Annotated[AsyncSession, Depends(get_db)],
) -> LoginResponse:
    """
    Login with email and password.

    Returns access token and refresh token.
    """
    # Find user by email
    result = await db.execute(select(User).where(User.email == data.email))
    user = result.scalar_one_or_none()

    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Inactive user",
        )

    # Create tokens
    access_token = create_access_token(subject=user.id)
    refresh_token = create_refresh_token(subject=user.id)

    return LoginResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer",
        user=user,
    )


@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(
    refresh_token: str,
    db: Annotated[AsyncSession, Depends(get_db)],
) -> TokenResponse:
    """
    Refresh access token using refresh token.
    """
    from app.core.security import decode_token

    payload = decode_token(refresh_token)

    if payload is None or payload.get("type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token",
        )

    user_id = int(payload.get("sub"))  # type: ignore

    # Verify user still exists and is active
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()

    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid user",
        )

    # Create new access token
    access_token = create_access_token(subject=user.id)

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
    )


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(
    current_user: Annotated[User, Depends(deps.get_current_active_user)],
) -> User:
    """
    Get current user information.
    """
    return current_user
