import { Question, TestResult, AnswerDetail } from '@/types/test.types';
import { TEST_CONFIG } from '@/config/test.config';

/**
 * Randomly selects unique question IDs from the question bank
 * Uses Fisher-Yates shuffle algorithm for true randomization
 *
 * @param totalQuestions Total number of questions available (default: 50)
 * @param selectCount Number of questions to select (default: 20)
 * @returns Array of randomly selected question IDs
 */
export function selectRandomQuestions(
  totalQuestions: number = TEST_CONFIG.TOTAL_QUESTIONS,
  selectCount: number = TEST_CONFIG.QUESTIONS_PER_SESSION
): number[] {
  // Create array of all question IDs [1, 2, 3, ..., 50]
  const allIds = Array.from({ length: totalQuestions }, (_, i) => i + 1);

  // Fisher-Yates shuffle
  for (let i = allIds.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allIds[i], allIds[j]] = [allIds[j], allIds[i]];
  }

  // Return first N elements
  return allIds.slice(0, selectCount);
}

/**
 * Calculates comprehensive test results from user answers
 *
 * @param answers Map of question ID to selected option ID
 * @param questions Array of Question objects for the test
 * @param timeTakenSeconds Total time taken to complete the test
 * @returns Complete TestResult object with score and details
 */
export function calculateTestResult(
  answers: Record<number, string>,
  questions: Question[],
  timeTakenSeconds: number
): TestResult {
  // Build detailed answer breakdown
  const answerDetails: AnswerDetail[] = questions.map((question) => {
    const selectedOptionId = answers[question.id] || null;
    const isCorrect = selectedOptionId === question.correctOptionId;

    return {
      questionId: question.id,
      questionText: question.text,
      selectedOptionId,
      correctOptionId: question.correctOptionId,
      isCorrect,
    };
  });

  // Calculate scores
  const correctCount = answerDetails.filter((d) => d.isCorrect).length;
  const totalQuestions = questions.length;
  const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

  return {
    totalQuestions,
    correctCount,
    incorrectCount: totalQuestions - correctCount,
    scorePercentage,
    hasPassed: scorePercentage >= TEST_CONFIG.PASSING_THRESHOLD,
    timeTakenSeconds,
    answerDetails,
  };
}

/**
 * Formats seconds into H:MM:SS display format
 *
 * @param seconds Total seconds to format
 * @returns Formatted time string (e.g., "0:40:00")
 *
 * @example
 * formatTime(2400) // "0:40:00"
 * formatTime(125) // "0:02:05"
 * formatTime(3665) // "1:01:05"
 */
export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

/**
 * Validates if all questions have been answered
 *
 * @param answers Map of question ID to selected option ID
 * @param questionIds Array of question IDs in the test
 * @returns True if all questions have answers
 */
export function areAllQuestionsAnswered(
  answers: Record<number, string>,
  questionIds: number[]
): boolean {
  return questionIds.every((id) => id in answers && answers[id] !== '');
}

/**
 * Gets the count of answered questions
 *
 * @param answers Map of question ID to selected option ID
 * @returns Number of questions that have been answered
 */
export function getAnsweredCount(answers: Record<number, string>): number {
  return Object.keys(answers).filter((key) => answers[Number(key)] !== '').length;
}
