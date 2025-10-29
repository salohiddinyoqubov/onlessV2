"""
Organization model for multi-tenancy (driving schools).
"""
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, SoftDeleteMixin, TimestampMixin

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.payment import Subscription


class Organization(Base, TimestampMixin, SoftDeleteMixin):
    """
    Organization model for driving schools (multi-tenancy).

    Attributes:
        id: Primary key
        name: Organization name
        slug: URL-friendly slug
        description: Organization description
        logo_url: Organization logo
        owner_id: Foreign key to owner (business owner user)
        is_active: Whether organization is active
        settings: JSON field for organization-specific settings
    """

    __tablename__ = "organizations"

    # Primary Key
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    # Basic Info
    name: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    slug: Mapped[str] = mapped_column(String(100), unique=True, nullable=False, index=True)
    description: Mapped[str | None] = mapped_column(Text)
    logo_url: Mapped[str | None] = mapped_column(String(500))

    # Owner
    owner_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    # Status
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    # Contact Info
    email: Mapped[str | None] = mapped_column(String(255))
    phone: Mapped[str | None] = mapped_column(String(20))
    address: Mapped[str | None] = mapped_column(Text)

    # White-label Branding
    custom_domain: Mapped[str | None] = mapped_column(String(255))
    theme_color: Mapped[str | None] = mapped_column(String(7))  # Hex color code

    # Relationships
    owner: Mapped["User"] = relationship(
        "User",
        back_populates="owned_organization",
        foreign_keys=[owner_id],
    )
    members: Mapped[list["User"]] = relationship(
        "User",
        back_populates="organization",
        foreign_keys="User.organization_id",
    )
    subscription: Mapped["Subscription | None"] = relationship(
        "Subscription",
        back_populates="organization",
        uselist=False,
    )

    def __repr__(self) -> str:
        return f"<Organization(id={self.id}, name={self.name})>"
