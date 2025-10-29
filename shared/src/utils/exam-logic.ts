import { Question, ExamResult, AnswerDetail } from '../types/exam.types';
import { EXAM_CONFIG } from '../constants/exam.config';

/**
 * Randomly selects unique question IDs from the question bank
 * Uses Fisher-Yates shuffle algorithm for true randomization
 *
 * @param totalQuestions Total number of questions available (default: 50)
 * @param selectCount Number of questions to select (default: 20)
 * @returns Array of randomly selected question IDs
 */
export function selectRandomQuestions(
  totalQuestions: number = EXAM_CONFIG.TOTAL_QUESTIONS,
  selectCount: number = EXAM_CONFIG.QUESTIONS_PER_SESSION
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
 * @returns Complete ExamResult object with score and details
 */
export function calculateExamResult(
  answers: Record<number, string>,
  questions: Question[],
  timeTakenSeconds: number
): ExamResult {
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
    hasPassed: scorePercentage >= EXAM_CONFIG.PASSING_THRESHOLD,
    timeTakenSeconds,
    answerDetails,
  };
}

/**
 * Formats seconds into MM:SS display format
 *
 * @param seconds Total seconds to format
 * @returns Formatted time string (e.g., "40:00")
 *
 * @example
 * formatTime(2400) // "40:00"
 * formatTime(125) // "02:05"
 * formatTime(3665) // "61:05"
 */
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
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

/**
 * Calculate score from questions and answers
 *
 * @param questions Array of questions
 * @param answers Map of question ID to selected option ID
 * @returns Object with correctCount and percentage
 */
export function calculateScore(
  questions: Question[],
  answers: Record<number, string>
): { correctCount: number; percentage: number } {
  const correctCount = questions.filter(
    (q) => answers[q.id] === q.correctOptionId
  ).length;

  const percentage = Math.round((correctCount / questions.length) * 100);

  return { correctCount, percentage };
}
