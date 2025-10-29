interface NavigationGridProps {
  questionIds: number[];
  answeredQuestionIds: Set<number>;
  currentQuestionId: number;
  onNavigate: (questionId: number) => void;
}

export default function NavigationGrid({
  questionIds,
  answeredQuestionIds,
  currentQuestionId,
  onNavigate,
}: NavigationGridProps) {
  // Create array of 20 question numbers (1-20)
  const questionNumbers = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <footer className="bg-gradient-to-r from-blue-50 to-gray-50 dark:from-gray-900 dark:to-gray-800 border-t-2 border-blue-200 dark:border-gray-700 py-4 px-8 flex items-center justify-center shadow-lg">
      {/* Progress Grid - Single Row centered */}
      <div className="grid grid-cols-20 gap-3">
        {questionNumbers.map((questionNumber) => {
          const questionId = questionIds[questionNumber - 1];
          const isAnswered = answeredQuestionIds.has(questionId);
          const isCurrent = currentQuestionId === questionId;

          return (
            <button
              key={questionNumber}
              onClick={() => onNavigate(questionId)}
              className={`
                w-11 h-11 flex justify-center items-center text-sm font-bold rounded-xl border-2 transition-all duration-200 shadow-md hover:shadow-xl
                ${
                  isCurrent
                    ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 dark:from-blue-600 dark:via-blue-700 dark:to-blue-800 border-blue-400 dark:border-blue-500 text-white scale-110 shadow-xl ring-4 ring-blue-400/40 dark:ring-blue-500/40'
                    : isAnswered
                    ? 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-green-400 dark:border-green-600 text-green-700 dark:text-green-400 hover:scale-105 hover:border-green-500'
                    : 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-400 dark:hover:border-blue-600 hover:scale-105 hover:from-blue-50 dark:hover:from-gray-700'
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
