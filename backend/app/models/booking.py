"""
Booking and BookingSlot models for scheduling sessions.
"""
import enum
from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import DateTime, Enum, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin

if TYPE_CHECKING:
    from app.models.user import User


class BookingStatus(str, enum.Enum):
    """Booking status enumeration."""

    PENDING = "pending"  # Waiting for instructor confirmation
    CONFIRMED = "confirmed"  # Confirmed by instructor
    COMPLETED = "completed"  # Session completed
    CANCELLED = "cancelled"  # Cancelled by student or instructor
    NO_SHOW = "no_show"  # Student didn't show up


class BookingType(str, enum.Enum):
    """Type of booking session."""

    THEORY = "theory"  # Theoretical lesson
    PRACTICAL = "practical"  # Practical driving lesson
    MOCK_EXAM = "mock_exam"  # Mock exam session


class BookingSlot(Base, TimestampMixin):
    """
    Available time slots for instructors/teachers.

    Instructors define their availability using these slots.
    """

    __tablename__ = "booking_slots"

    # Primary Key
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    # Foreign Key
    instructor_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    # Time Slot
    start_time: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        index=True,
    )
    end_time: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)

    # Availability
    is_available: Mapped[bool] = mapped_column(default=True, nullable=False)

    # Relationships
    instructor: Mapped["User"] = relationship("User")
    booking: Mapped["Booking | None"] = relationship(
        "Booking",
        back_populates="slot",
        uselist=False,
    )

    def __repr__(self) -> str:
        return f"<BookingSlot(id={self.id}, instructor_id={self.instructor_id}, start={self.start_time})>"


class Booking(Base, TimestampMixin):
    """
    Booking for a session between student and instructor/teacher.

    Supports: theory lessons, practical driving lessons, mock exams.
    """

    __tablename__ = "bookings"

    # Primary Key
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    # Foreign Keys
    student_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    instructor_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    slot_id: Mapped[int | None] = mapped_column(
        Integer,
        ForeignKey("booking_slots.id", ondelete="SET NULL"),
        index=True,
    )

    # Booking Details
    booking_type: Mapped[BookingType] = mapped_column(
        Enum(BookingType, native_enum=False),
        nullable=False,
        index=True,
    )
    status: Mapped[BookingStatus] = mapped_column(
        Enum(BookingStatus, native_enum=False),
        default=BookingStatus.PENDING,
        nullable=False,
        index=True,
    )

    # Session Info
    scheduled_start: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        index=True,
    )
    scheduled_end: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    actual_start: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    actual_end: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    # Location (for practical lessons)
    meeting_location: Mapped[str | None] = mapped_column(String(500))
    meeting_notes: Mapped[str | None] = mapped_column(Text)

    # Online Meeting (for theory lessons)
    google_meet_url: Mapped[str | None] = mapped_column(String(500))
    google_calendar_event_id: Mapped[str | None] = mapped_column(String(255))

    # Pricing
    price_amount: Mapped[int] = mapped_column(Integer, nullable=False)  # In som
    platform_fee: Mapped[int] = mapped_column(Integer, default=0)  # Platform commission

    # Notes & Feedback
    student_notes: Mapped[str | None] = mapped_column(Text)
    instructor_notes: Mapped[str | None] = mapped_column(Text)
    student_rating: Mapped[int | None] = mapped_column(Integer)  # 1-5 stars
    instructor_rating: Mapped[int | None] = mapped_column(Integer)  # 1-5 stars

    # Relationships
    student: Mapped["User"] = relationship(
        "User",
        back_populates="bookings_as_student",
        foreign_keys=[student_id],
    )
    instructor: Mapped["User"] = relationship(
        "User",
        back_populates="bookings_as_instructor",
        foreign_keys=[instructor_id],
    )
    slot: Mapped["BookingSlot | None"] = relationship(
        "BookingSlot",
        back_populates="booking",
    )

    def __repr__(self) -> str:
        return f"<Booking(id={self.id}, student_id={self.student_id}, instructor_id={self.instructor_id}, status={self.status})>"
