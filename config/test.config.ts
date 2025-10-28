/**
 * Configuration constants for the driving theory test
 */

export const TEST_CONFIG = {
  /** Total questions in question bank */
  TOTAL_QUESTIONS: 50,

  /** Questions per test session */
  QUESTIONS_PER_SESSION: 20,

  /** Test duration in seconds (40 minutes) */
  TEST_DURATION_SECONDS: 2400,

  /** Minimum passing percentage */
  PASSING_THRESHOLD: 70,

  /** Timer display format */
  TIMER_FORMAT: 'H:MM:SS' as const,

  /** Question grid dimensions */
  GRID: {
    COLUMNS: 10,
    ROWS: 5,
  },
} as const;
