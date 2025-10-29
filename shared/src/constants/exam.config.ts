/**
 * Configuration constants for the driving exam
 */

export const EXAM_CONFIG = {
  /** Total questions in question bank */
  TOTAL_QUESTIONS: 50,

  /** Questions per exam session */
  QUESTIONS_PER_SESSION: 20,

  /** Exam duration in seconds (40 minutes) */
  EXAM_DURATION_SECONDS: 2400,

  /** Minimum passing percentage */
  PASSING_THRESHOLD: 70,

  /** Timer display format */
  TIMER_FORMAT: 'MM:SS' as const,

  /** Question grid dimensions */
  GRID: {
    COLUMNS: 10,
    ROWS: 5,
  },
} as const;
