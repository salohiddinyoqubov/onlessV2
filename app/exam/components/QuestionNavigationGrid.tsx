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
    <footer className="bg-white dark:bg-background-secondary border-t-2 border-blue-200 dark:border-primary-border p-3 px-5 flex justify-between items-center shadow-lg">
      {/* Progress Grid - Single Row */}
      <div className="grid grid-cols-20 gap-2">
        {questionNumbers.map((questionNumber) => {
          const questionId = questionIds[questionNumber - 1];
          const isAnswered = answeredQuestionIds.has(questionId);
          const isCurrent = currentQuestionId === questionId;

          return (
            <button
              key={questionNumber}
              onClick={() => onNavigate(questionNumber - 1)}
              className={`
                w-8 h-8 flex justify-center items-center text-xs font-bold rounded-lg border-2 transition-all shadow-sm hover:shadow-md
                ${
                  isCurrent
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 dark:from-accent dark:to-primary border-blue-500 dark:border-accent text-white scale-110 shadow-lg ring-2 ring-blue-500/30 dark:ring-accent/30'
                    : isAnswered
                    ? 'bg-green-100 dark:bg-success-bg border-green-500 dark:border-success text-green-700 dark:text-success hover:scale-105'
                    : 'bg-gray-100 dark:bg-neutral-dark border-gray-300 dark:border-background-border text-gray-600 dark:text-neutral-light hover:border-blue-400 dark:hover:border-accent/50 hover:scale-105'
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
