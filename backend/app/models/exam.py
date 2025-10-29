"""
Exam, ExamSession, and ExamAnswer models.
"""
import enum
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, DateTime, Enum, Float, ForeignKey, Integer, String, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.question import Question


class ExamStatus(str, enum.Enum):
    """Exam session status."""

    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    EXPIRED = "expired"
    ABANDONED = "abandoned"


class Exam(Base, TimestampMixin):
    """
    Exam template configuration.

    Defines exam parameters (duration, passing score, question count, etc.)
    """

    __tablename__ = "exams"

    # Primary Key
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    # Basic Info
    name_uz: Mapped[str] = mapped_column(String(255), nullable=False)
    name_ru: Mapped[str | None] = mapped_column(String(255))
    description: Mapped[str | None] = mapped_column(String(500))

    # Exam Parameters
    total_questions: Mapped[int] = mapped_column(Integer, default=20, nullable=False)
    duration_minutes: Mapped[int] = mapped_column(Integer, default=40, nullable=False)
    passing_score: Mapped[float] = mapped_column(Float, default=70.0, nullable=False)  # Percentage

    # Status
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    # Relationships
    sessions: Mapped[list["ExamSession"]] = relationship(
        "ExamSession",
        back_populates="exam",
        cascade="all, delete-orphan",
    )

    def __repr__(self) -> str:
        return f"<Exam(id={self.id}, name={self.name_uz})>"


class ExamSession(Base, TimestampMixin):
    """
    Individual exam session taken by a student.

    Tracks: selected questions, answers, time, score, status.
    """

    __tablename__ = "exam_sessions"

    # Primary Key
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    # Foreign Keys
    exam_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("exams.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    student_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    # Session Data
    selected_question_ids: Mapped[list] = mapped_column(JSON, nullable=False)  # List of question IDs
    status: Mapped[ExamStatus] = mapped_column(
        Enum(ExamStatus, native_enum=False),
        default=ExamStatus.IN_PROGRESS,
        nullable=False,
        index=True,
    )

    # Timing
    started_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), nullable=False)
    completed_at: Mapped[DateTime | None] = mapped_column(DateTime(timezone=True))
    time_remaining_seconds: Mapped[int] = mapped_column(Integer, nullable=False)

    # Results
    score: Mapped[float | None] = mapped_column(Float)  # Percentage
    correct_answers: Mapped[int] = mapped_column(Integer, default=0)
    total_answered: Mapped[int] = mapped_column(Integer, default=0)
    passed: Mapped[bool | None] = mapped_column(Boolean)

    # Relationships
    exam: Mapped["Exam"] = relationship("Exam", back_populates="sessions")
    student: Mapped["User"] = relationship("User", back_populates="exam_sessions")
    answers: Mapped[list["ExamAnswer"]] = relationship(
        "ExamAnswer",
        back_populates="session",
        cascade="all, delete-orphan",
    )

    def __repr__(self) -> str:
        return f"<ExamSession(id={self.id}, student_id={self.student_id}, status={self.status})>"


class ExamAnswer(Base, TimestampMixin):
    """
    Individual answer within an exam session.
    """

    __tablename__ = "exam_answers"

    # Primary Key
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    # Foreign Keys
    session_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("exam_sessions.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    question_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("questions.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    # Answer Data
    selected_option_id: Mapped[str] = mapped_column(String(10), nullable=False)
    is_correct: Mapped[bool] = mapped_column(Boolean, nullable=False)

    # Relationships
    session: Mapped["ExamSession"] = relationship("ExamSession", back_populates="answers")
    question: Mapped["Question"] = relationship("Question", back_populates="answers")

    def __repr__(self) -> str:
        return f"<ExamAnswer(id={self.id}, session_id={self.session_id}, is_correct={self.is_correct})>"
