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
    <footer className="bg-background-secondary border-t border-background-border p-2.5 px-5 flex justify-between items-center">
      {/* Progress Grid - Single Row */}
      <div className="grid grid-cols-20 gap-1">
        {questionNumbers.map((questionNumber) => {
          const questionId = questionIds[questionNumber - 1];
          const isAnswered = answeredQuestionIds.has(questionId);
          const isCurrent = currentQuestionId === questionId;

          return (
            <button
              key={questionNumber}
              onClick={() => onNavigate(questionNumber - 1)}
              className={`
                w-7 h-7 flex justify-center items-center text-xs border transition-colors
                ${
                  isCurrent
                    ? 'bg-primary border-primary-border text-white'
                    : isAnswered
                    ? 'bg-success-bg border-success-border text-success'
                    : 'bg-neutral-dark border-background-border text-neutral'
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
