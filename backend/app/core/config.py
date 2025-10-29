"""
Application configuration using Pydantic Settings.
Loads configuration from environment variables.
"""
from typing import Any, Literal
from pydantic import AnyHttpUrl, EmailStr, PostgresDsn, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings with validation."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_ignore_empty=True,
        extra="ignore",
        case_sensitive=True,
    )

    # Application
    PROJECT_NAME: str = "Onless.uz"
    VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: Literal["development", "staging", "production"] = "development"

    # CORS
    BACKEND_CORS_ORIGINS: list[AnyHttpUrl] = []

    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: str | list[str]) -> list[str] | str:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, list | str):
            return v
        raise ValueError(v)

    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # Database
    POSTGRES_SERVER: str
    POSTGRES_PORT: int = 5432
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    SQLALCHEMY_DATABASE_URI: PostgresDsn | None = None

    @field_validator("SQLALCHEMY_DATABASE_URI", mode="before")
    @classmethod
    def assemble_db_connection(cls, v: str | None, info: Any) -> str:
        if isinstance(v, str):
            return v

        data = info.data
        return PostgresDsn.build(
            scheme="postgresql+asyncpg",
            username=data.get("POSTGRES_USER"),
            password=data.get("POSTGRES_PASSWORD"),
            host=data.get("POSTGRES_SERVER"),
            port=data.get("POSTGRES_PORT"),
            path=f"{data.get('POSTGRES_DB') or ''}",
        ).unicode_string()

    # Redis
    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379
    REDIS_DB: int = 0

    # First Superuser
    FIRST_SUPERUSER_EMAIL: EmailStr
    FIRST_SUPERUSER_PASSWORD: str

    # Email
    SMTP_TLS: bool = True
    SMTP_PORT: int = 587
    SMTP_HOST: str | None = None
    SMTP_USER: str | None = None
    SMTP_PASSWORD: str | None = None
    EMAILS_FROM_EMAIL: EmailStr | None = None
    EMAILS_FROM_NAME: str | None = None

    # External Services
    GOOGLE_CALENDAR_SERVICE_ACCOUNT_FILE: str | None = None
    GOOGLE_CALENDAR_ID: str | None = None

    SMS_PROVIDER_API_KEY: str | None = None
    SMS_PROVIDER_URL: str | None = None

    WHATSAPP_API_URL: str | None = None
    WHATSAPP_API_TOKEN: str | None = None

    # Payment Gateways
    PAYMENT_PAYME_MERCHANT_ID: str | None = None
    PAYMENT_PAYME_SECRET_KEY: str | None = None
    PAYMENT_CLICK_MERCHANT_ID: str | None = None
    PAYMENT_CLICK_SECRET_KEY: str | None = None

    # File Storage
    UPLOAD_DIR: str = "uploads"
    MAX_UPLOAD_SIZE: int = 10485760  # 10MB
    ALLOWED_IMAGE_EXTENSIONS: list[str] = [".jpg", ".jpeg", ".png", ".webp"]

    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = 60


settings = Settings()  # type: ignore
