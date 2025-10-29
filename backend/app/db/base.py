"""
SQLAlchemy Base class and common mixins.
"""
from datetime import datetime, timezone
from typing import Any

from sqlalchemy import DateTime, func
from sqlalchemy.orm import DeclarativeBase, Mapped, declared_attr, mapped_column


class Base(DeclarativeBase):
    """Base class for all database models."""

    # Generate __tablename__ automatically from class name
    @declared_attr.directive
    def __tablename__(cls) -> str:
        """Generate table name from class name (e.g., UserModel -> user_model)."""
        return cls.__name__.lower()


class TimestampMixin:
    """Mixin for created_at and updated_at timestamps."""

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        server_default=func.now(),
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        server_default=func.now(),
        server_onupdate=func.now(),
        nullable=False,
    )


class SoftDeleteMixin:
    """Mixin for soft delete functionality."""

    deleted_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
        default=None,
    )

    @property
    def is_deleted(self) -> bool:
        """Check if record is soft deleted."""
        return self.deleted_at is not None

    def soft_delete(self) -> None:
        """Soft delete the record."""
        self.deleted_at = datetime.now(timezone.utc)

    def restore(self) -> None:
        """Restore soft deleted record."""
        self.deleted_at = None
