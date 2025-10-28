/**
 * Type definitions for the driving exam module
 */

/**
 * Represents a single answer option
 */
export interface QuestionOption {
  /** Keyboard shortcut identifier (e.g., "F1", "F2") */
  id: string;
  /** Display text in Uzbek */
  text: string;
}

/**
 * Category for grouping questions
 */
export type QuestionCategory =
  | 'traffic-signs'
  | 'traffic-rules'
  | 'parking'
  | 'speed-limits'
  | 'safety';

/**
 * Represents an exam question
 */
export interface Question {
  /** Unique identifier (1-50) */
  id: number;
  /** Question text in Uzbek */
  text: string;
  /** Optional image path for visual questions */
  imagePath?: string;
  /** Array of answer options (3-4 items) */
  options: QuestionOption[];
  /** ID of the correct answer option */
  correctOptionId: string;
  /** Category for analytics (optional) */
  category?: QuestionCategory;
}

/**
 * Exam session state
 */
export interface ExamSession {
  /** IDs of 20 randomly selected questions */
  selectedQuestionIds: number[];
  /** Current question index (0-19) */
  currentQuestionIndex: number;
  /** Map of question ID to selected option ID */
  answers: Record<number, string>;
  /** Remaining time in seconds */
  timeRemainingSeconds: number;
  /** Session start timestamp */
  startedAt: Date;
  /** Whether exam is completed */
  isCompleted: boolean;
}

/**
 * Detailed answer information
 */
export interface AnswerDetail {
  questionId: number;
  questionText: string;
  selectedOptionId: string | null;
  correctOptionId: string;
  isCorrect: boolean;
}

/**
 * Exam results after completion
 */
export interface ExamResult {
  /** Total questions in exam (always 20) */
  totalQuestions: number;
  /** Number of correct answers */
  correctCount: number;
  /** Number of incorrect answers */
  incorrectCount: number;
  /** Percentage score (0-100) */
  scorePercentage: number;
  /** Whether user passed (≥70%) */
  hasPassed: boolean;
  /** Time taken to complete exam */
  timeTakenSeconds: number;
  /** Detailed answer breakdown */
  answerDetails: AnswerDetail[];
}
