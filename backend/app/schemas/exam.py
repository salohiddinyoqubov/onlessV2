"""
Pydantic schemas for Exam models.
"""
from datetime import datetime

from pydantic import BaseModel, Field

from app.models.exam import ExamStatus


class ExamBase(BaseModel):
    """Base exam schema."""

    name_uz: str = Field(..., min_length=1, max_length=255)
    name_ru: str | None = Field(None, max_length=255)
    description: str | None = None


class ExamCreate(ExamBase):
    """Schema for creating an exam."""

    total_questions: int = Field(20, ge=1, le=100)
    duration_minutes: int = Field(40, ge=1, le=240)
    passing_score: float = Field(70.0, ge=0.0, le=100.0)


class ExamUpdate(BaseModel):
    """Schema for updating an exam."""

    name_uz: str | None = Field(None, min_length=1, max_length=255)
    name_ru: str | None = Field(None, max_length=255)
    description: str | None = None
    total_questions: int | None = Field(None, ge=1, le=100)
    duration_minutes: int | None = Field(None, ge=1, le=240)
    passing_score: float | None = Field(None, ge=0.0, le=100.0)
    is_active: bool | None = None


class ExamResponse(ExamBase):
    """Schema for exam response."""

    id: int
    total_questions: int
    duration_minutes: int
    passing_score: float
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class ExamSessionCreate(BaseModel):
    """Schema for starting an exam session."""

    exam_id: int


class ExamAnswerSubmit(BaseModel):
    """Schema for submitting an answer."""

    question_id: int
    selected_option_id: str


class ExamSessionResponse(BaseModel):
    """Schema for exam session response."""

    id: int
    exam_id: int
    student_id: int
    selected_question_ids: list[int]
    status: ExamStatus
    started_at: datetime
    completed_at: datetime | None
    time_remaining_seconds: int
    score: float | None
    correct_answers: int
    total_answered: int
    passed: bool | None
    created_at: datetime

    model_config = {"from_attributes": True}
