"""
Question and QuestionCategory models for exam system.
"""
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, ForeignKey, Integer, String, Text, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, SoftDeleteMixin, TimestampMixin

if TYPE_CHECKING:
    from app.models.exam import ExamAnswer


class QuestionCategory(Base, TimestampMixin):
    """
    Question category for organizing questions.

    Examples: traffic-rules, road-signs, first-aid, vehicle-maintenance
    """

    __tablename__ = "question_categories"

    # Primary Key
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    # Basic Info
    name_uz: Mapped[str] = mapped_column(String(100), nullable=False)
    name_ru: Mapped[str | None] = mapped_column(String(100))
    name_kaa: Mapped[str | None] = mapped_column(String(100))  # Karakalpak
    slug: Mapped[str] = mapped_column(String(100), unique=True, nullable=False, index=True)
    description: Mapped[str | None] = mapped_column(Text)

    # Relationships
    questions: Mapped[list["Question"]] = relationship(
        "Question",
        back_populates="category",
        cascade="all, delete-orphan",
    )

    def __repr__(self) -> str:
        return f"<QuestionCategory(id={self.id}, name={self.name_uz})>"


class Question(Base, TimestampMixin, SoftDeleteMixin):
    """
    Question model for driving theory exams.

    Supports multi-language (Uzbek Latin, Cyrillic, Russian, Karakalpak).
    Text stored in Latin, Cyrillic converted on-the-fly.
    """

    __tablename__ = "questions"

    # Primary Key
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    # Question Text (multi-language)
    text_uz: Mapped[str] = mapped_column(Text, nullable=False)  # Uzbek (Latin)
    text_ru: Mapped[str | None] = mapped_column(Text)  # Russian
    text_kaa: Mapped[str | None] = mapped_column(Text)  # Karakalpak

    # Image (optional)
    image_url: Mapped[str | None] = mapped_column(String(500))

    # Options (stored as JSON array)
    # Format: [{"id": "F1", "text_uz": "...", "text_ru": "...", "text_kaa": "..."}, ...]
    options: Mapped[dict] = mapped_column(JSON, nullable=False)

    # Correct Answer
    correct_option_id: Mapped[str] = mapped_column(String(10), nullable=False)

    # Explanation (optional, multi-language)
    explanation_uz: Mapped[str | None] = mapped_column(Text)
    explanation_ru: Mapped[str | None] = mapped_column(Text)
    explanation_kaa: Mapped[str | None] = mapped_column(Text)

    # Category
    category_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("question_categories.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )

    # Status
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    difficulty: Mapped[int] = mapped_column(Integer, default=1)  # 1-5 scale

    # Relationships
    category: Mapped["QuestionCategory | None"] = relationship(
        "QuestionCategory",
        back_populates="questions",
    )
    answers: Mapped[list["ExamAnswer"]] = relationship(
        "ExamAnswer",
        back_populates="question",
    )

    def __repr__(self) -> str:
        return f"<Question(id={self.id}, text={self.text_uz[:50]}...)>"
