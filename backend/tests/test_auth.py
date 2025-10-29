"""
Test authentication endpoints.
"""
import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_register(client: AsyncClient, test_user_data):
    """Test user registration."""
    response = await client.post(
        "/api/v1/auth/register",
        json=test_user_data,
    )

    assert response.status_code == 201
    data = response.json()
    assert data["email"] == test_user_data["email"]
    assert data["full_name"] == test_user_data["full_name"]
    assert "password" not in data


@pytest.mark.asyncio
async def test_register_duplicate_email(client: AsyncClient, test_user_data):
    """Test registration with duplicate email."""
    # Register first user
    await client.post("/api/v1/auth/register", json=test_user_data)

    # Try to register with same email
    response = await client.post("/api/v1/auth/register", json=test_user_data)

    assert response.status_code == 400
    assert "already registered" in response.json()["detail"]


@pytest.mark.asyncio
async def test_login(client: AsyncClient, test_user_data):
    """Test user login."""
    # Register user first
    await client.post("/api/v1/auth/register", json=test_user_data)

    # Login
    response = await client.post(
        "/api/v1/auth/login",
        json={
            "email": test_user_data["email"],
            "password": test_user_data["password"],
        },
    )

    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert "refresh_token" in data
    assert data["token_type"] == "bearer"
    assert data["user"]["email"] == test_user_data["email"]


@pytest.mark.asyncio
async def test_login_invalid_credentials(client: AsyncClient, test_user_data):
    """Test login with invalid credentials."""
    # Register user
    await client.post("/api/v1/auth/register", json=test_user_data)

    # Try to login with wrong password
    response = await client.post(
        "/api/v1/auth/login",
        json={
            "email": test_user_data["email"],
            "password": "wrongpassword",
        },
    )

    assert response.status_code == 401


@pytest.mark.asyncio
async def test_get_current_user(client: AsyncClient, test_user_data):
    """Test getting current user info."""
    # Register and login
    await client.post("/api/v1/auth/register", json=test_user_data)
    login_response = await client.post(
        "/api/v1/auth/login",
        json={
            "email": test_user_data["email"],
            "password": test_user_data["password"],
        },
    )
    token = login_response.json()["access_token"]

    # Get current user
    response = await client.get(
        "/api/v1/auth/me",
        headers={"Authorization": f"Bearer {token}"},
    )

    assert response.status_code == 200
    data = response.json()
    assert data["email"] == test_user_data["email"]


@pytest.mark.asyncio
async def test_get_current_user_unauthorized(client: AsyncClient):
    """Test getting current user without token."""
    response = await client.get("/api/v1/auth/me")

    assert response.status_code == 403  # No credentials provided
