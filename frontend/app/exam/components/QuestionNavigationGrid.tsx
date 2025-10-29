'use client';

interface QuestionNavigationGridProps {
  /** Array of all question IDs in the test (20 questions) */
  questionIds: number[];
  /** Set of question IDs that have been answered */
  answeredQuestionIds: Set<number>;
  /** Currently displayed question ID */
  currentQuestionId: number;
  /** Callback when navigating to a question */
  onNavigate: (index: number) => void;
}

/**
 * Grid component showing 20 test questions in a single row
 * Displays which questions have been answered correctly/incorrectly
 */
export function QuestionNavigationGrid({
  questionIds,
  answeredQuestionIds,
  currentQuestionId,
  onNavigate,
}: QuestionNavigationGridProps) {
  // Create array of 20 question numbers (1-20)
  const questionNumbers = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <footer className="bg-gradient-to-r from-blue-50 to-gray-50 dark:from-background-dark dark:to-background-secondary border-t-2 border-blue-200 dark:border-primary-border py-4 px-8 flex items-center justify-center shadow-lg">
      {/* Progress Grid - Single Row centered */}
      <div className="grid grid-cols-20 gap-3">
        {questionNumbers.map((questionNumber) => {
          const questionId = questionIds[questionNumber - 1];
          const isAnswered = answeredQuestionIds.has(questionId);
          const isCurrent = currentQuestionId === questionId;

          return (
            <button
              key={questionNumber}
              onClick={() => onNavigate(questionNumber - 1)}
              className={`
                w-11 h-11 flex justify-center items-center text-sm font-bold rounded-xl border-2 transition-all duration-200 shadow-md hover:shadow-xl
                ${
                  isCurrent
                    ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 dark:from-accent dark:via-primary-light dark:to-primary border-blue-400 dark:border-accent text-white scale-110 shadow-xl ring-4 ring-blue-400/40 dark:ring-accent/40'
                    : isAnswered
                    ? 'bg-gradient-to-br from-green-50 to-green-100 dark:from-success-bg dark:to-success-bg/50 border-green-400 dark:border-success text-green-700 dark:text-success hover:scale-105 hover:border-green-500'
                    : 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-dark dark:to-background-dark border-gray-300 dark:border-background-border text-gray-700 dark:text-neutral-light hover:border-blue-400 dark:hover:border-accent/60 hover:scale-105 hover:from-blue-50 dark:hover:from-background'
                }
              `}
            >
              {questionNumber}
            </button>
          );
        })}
      </div>
    </footer>
  );
}
