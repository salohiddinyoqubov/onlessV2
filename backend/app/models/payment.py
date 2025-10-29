"""
Payment, Subscription, and Tariff models for billing.
"""
import enum
from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, DateTime, Enum, ForeignKey, Integer, String, Text, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.organization import Organization


class PaymentStatus(str, enum.Enum):
    """Payment status enumeration."""

    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"
    REFUNDED = "refunded"
    CANCELLED = "cancelled"


class PaymentMethod(str, enum.Enum):
    """Payment method enumeration."""

    PAYME = "payme"
    CLICK = "click"
    UZUM = "uzum"
    CASH = "cash"
    BANK_TRANSFER = "bank_transfer"


class SubscriptionStatus(str, enum.Enum):
    """Subscription status enumeration."""

    ACTIVE = "active"
    EXPIRED = "expired"
    CANCELLED = "cancelled"
    TRIAL = "trial"


class Tariff(Base, TimestampMixin):
    """
    Subscription tariff/plan for organizations.

    Examples: Free, Basic, Professional, Premium
    """

    __tablename__ = "tariffs"

    # Primary Key
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    # Basic Info
    name_uz: Mapped[str] = mapped_column(String(100), nullable=False)
    name_ru: Mapped[str | None] = mapped_column(String(100))
    slug: Mapped[str] = mapped_column(String(50), unique=True, nullable=False, index=True)
    description: Mapped[str | None] = mapped_column(Text)

    # Pricing
    price_monthly: Mapped[int] = mapped_column(Integer, default=0)  # In som
    price_yearly: Mapped[int] = mapped_column(Integer, default=0)  # In som

    # Limits (JSON for flexibility)
    # Example: {"max_teachers": 5, "max_students": 100, "max_storage_mb": 1000}
    limits: Mapped[dict] = mapped_column(JSON, nullable=False, default=dict)

    # Features (JSON array)
    # Example: ["white_label", "api_access", "analytics", "custom_domain"]
    features: Mapped[list] = mapped_column(JSON, nullable=False, default=list)

    # Status
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    is_popular: Mapped[bool] = mapped_column(Boolean, default=False)

    # Display Order
    display_order: Mapped[int] = mapped_column(Integer, default=0)

    # Relationships
    subscriptions: Mapped[list["Subscription"]] = relationship(
        "Subscription",
        back_populates="tariff",
    )

    def __repr__(self) -> str:
        return f"<Tariff(id={self.id}, name={self.name_uz}, price={self.price_monthly})>"


class Subscription(Base, TimestampMixin):
    """
    Subscription for an organization to a tariff.
    """

    __tablename__ = "subscriptions"

    # Primary Key
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    # Foreign Keys
    organization_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("organizations.id", ondelete="CASCADE"),
        nullable=False,
        unique=True,  # One subscription per organization
        index=True,
    )
    tariff_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("tariffs.id", ondelete="RESTRICT"),
        nullable=False,
        index=True,
    )

    # Subscription Period
    started_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)

    # Status
    status: Mapped[SubscriptionStatus] = mapped_column(
        Enum(SubscriptionStatus, native_enum=False),
        default=SubscriptionStatus.ACTIVE,
        nullable=False,
        index=True,
    )

    # Auto-renewal
    auto_renew: Mapped[bool] = mapped_column(Boolean, default=True)

    # Relationships
    organization: Mapped["Organization"] = relationship(
        "Organization",
        back_populates="subscription",
    )
    tariff: Mapped["Tariff"] = relationship("Tariff", back_populates="subscriptions")
    payments: Mapped[list["Payment"]] = relationship(
        "Payment",
        back_populates="subscription",
        cascade="all, delete-orphan",
    )

    def __repr__(self) -> str:
        return f"<Subscription(id={self.id}, org_id={self.organization_id}, status={self.status})>"


class Payment(Base, TimestampMixin):
    """
    Payment transaction record.

    Supports: subscription payments, booking payments, one-time payments.
    """

    __tablename__ = "payments"

    # Primary Key
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    # Foreign Keys
    user_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    subscription_id: Mapped[int | None] = mapped_column(
        Integer,
        ForeignKey("subscriptions.id", ondelete="SET NULL"),
        index=True,
    )

    # Payment Details
    amount: Mapped[int] = mapped_column(Integer, nullable=False)  # In som
    currency: Mapped[str] = mapped_column(String(3), default="UZS")
    payment_method: Mapped[PaymentMethod] = mapped_column(
        Enum(PaymentMethod, native_enum=False),
        nullable=False,
    )

    # Status
    status: Mapped[PaymentStatus] = mapped_column(
        Enum(PaymentStatus, native_enum=False),
        default=PaymentStatus.PENDING,
        nullable=False,
        index=True,
    )

    # External Payment Gateway Info
    external_transaction_id: Mapped[str | None] = mapped_column(
        String(255),
        unique=True,
        index=True,
    )
    external_data: Mapped[dict | None] = mapped_column(JSON)  # Store gateway response

    # Description
    description: Mapped[str | None] = mapped_column(Text)

    # Timestamps
    paid_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    # Relationships
    user: Mapped["User"] = relationship("User")
    subscription: Mapped["Subscription | None"] = relationship(
        "Subscription",
        back_populates="payments",
    )

    def __repr__(self) -> str:
        return f"<Payment(id={self.id}, user_id={self.user_id}, amount={self.amount}, status={self.status})>"
