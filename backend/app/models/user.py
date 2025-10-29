"""
User model with role-based access control.
Supports: Student, Teacher, Instructor, Business Owner, Mentor, Admin.
"""
import enum
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, Enum, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, SoftDeleteMixin, TimestampMixin

if TYPE_CHECKING:
    from app.models.organization import Organization
    from app.models.exam import ExamSession
    from app.models.booking import Booking


class UserRole(str, enum.Enum):
    """User role enumeration."""

    STUDENT = "student"
    TEACHER = "teacher"
    INSTRUCTOR = "instructor"
    BUSINESS_OWNER = "business_owner"
    MENTOR = "mentor"
    ADMIN = "admin"


class UserLevel(str, enum.Enum):
    """User level for instructors/mentors (based on performance)."""

    BASIC = "basic"
    PRO = "pro"
    ELITE = "elite"


class User(Base, TimestampMixin, SoftDeleteMixin):
    """
    User model supporting multiple roles and multi-tenancy.

    Attributes:
        id: Primary key
        email: Unique email address
        phone: Phone number (for SMS OTP)
        password_hash: Hashed password
        full_name: User's full name
        role: User role (student, teacher, instructor, etc.)
        is_active: Whether user account is active
        is_verified: Whether user has verified their email/phone
        organization_id: Foreign key to organization (for teachers/instructors)
        level: Performance level (for instructors/mentors)
        rating: Average rating (0-5 stars)
        total_sessions: Total number of sessions completed
        bio: User biography/description
        avatar_url: Profile picture URL
        work_privately: Whether teacher/instructor also works privately
    """

    __tablename__ = "users"

    # Primary Key
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    # Authentication
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    phone: Mapped[str | None] = mapped_column(String(20), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)

    # Profile
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    bio: Mapped[str | None] = mapped_column(Text)
    avatar_url: Mapped[str | None] = mapped_column(String(500))

    # Role & Status
    role: Mapped[UserRole] = mapped_column(
        Enum(UserRole, native_enum=False),
        nullable=False,
        default=UserRole.STUDENT,
        index=True,
    )
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    # Multi-tenancy (organization membership)
    organization_id: Mapped[int | None] = mapped_column(
        Integer,
        ForeignKey("organizations.id", ondelete="SET NULL"),
        index=True,
    )

    # Performance Metrics (for instructors/mentors)
    level: Mapped[UserLevel | None] = mapped_column(Enum(UserLevel, native_enum=False))
    rating: Mapped[float] = mapped_column(default=0.0, nullable=False)
    total_sessions: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    # Work Mode (teachers/instructors can work privately + in organization)
    work_privately: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    # Relationships
    organization: Mapped["Organization | None"] = relationship(
        "Organization",
        back_populates="members",
        foreign_keys=[organization_id],
    )
    owned_organization: Mapped["Organization | None"] = relationship(
        "Organization",
        back_populates="owner",
        foreign_keys="Organization.owner_id",
    )
    exam_sessions: Mapped[list["ExamSession"]] = relationship(
        "ExamSession",
        back_populates="student",
        cascade="all, delete-orphan",
    )
    bookings_as_student: Mapped[list["Booking"]] = relationship(
        "Booking",
        back_populates="student",
        foreign_keys="Booking.student_id",
        cascade="all, delete-orphan",
    )
    bookings_as_instructor: Mapped[list["Booking"]] = relationship(
        "Booking",
        back_populates="instructor",
        foreign_keys="Booking.instructor_id",
    )

    def __repr__(self) -> str:
        return f"<User(id={self.id}, email={self.email}, role={self.role})>"
