'use client';

import { QuestionOption } from '@/types/test.types';

interface OptionsPanelProps {
  /** Question text */
  questionText: string;
  /** Array of answer options (3-4 items) */
  options: QuestionOption[];
  /** Currently selected option ID */
  selectedOptionId: string | null;
  /** Correct option ID (optional, for showing feedback) */
  correctOptionId?: string;
  /** Whether to show answer feedback */
  showFeedback?: boolean;
  /** Callback when an option is selected */
  onSelectOption: (optionId: string) => void;
}

/**
 * Panel displaying question and answer options with F-key shortcuts
 * Supports both click and keyboard (F1-F4) selection
 */
export function OptionsPanel({
  questionText,
  options,
  selectedOptionId,
  correctOptionId,
  showFeedback = false,
  onSelectOption,
}: OptionsPanelProps) {
  return (
    <div className="flex flex-col">
      {/* Question Box */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-primary dark:to-primary-light p-5 mb-5 border-2 border-blue-300 dark:border-primary-border rounded-xl text-lg font-semibold text-white text-center shadow-lg">
        {questionText}
      </div>

      {/* Options List */}
      <ul className="list-none p-0 m-0 flex flex-col gap-3 mb-3">
        {options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const isCorrect = correctOptionId === option.id;
          const isIncorrect = showFeedback && isSelected && !isCorrect;
          const shouldShowCorrect = showFeedback && isCorrect;

          // Determine styling based on state
          let styleClasses = 'border-gray-200 dark:border-background-border hover:border-blue-300 dark:hover:border-primary-border';
          if (shouldShowCorrect) {
            styleClasses = 'bg-green-50 dark:bg-success-bg border-green-500 dark:border-success ring-2 ring-green-500/50 dark:ring-success/50';
          } else if (isIncorrect) {
            styleClasses = 'bg-red-50 dark:bg-danger-bg border-red-500 dark:border-danger ring-2 ring-red-500/50 dark:ring-danger/50';
          } else if (isSelected && !showFeedback) {
            styleClasses = 'bg-blue-50 dark:bg-primary-light border-blue-500 dark:border-accent ring-2 ring-blue-500/50 dark:ring-accent/50';
          }

          return (
            <li
              key={option.id}
              onClick={() => !showFeedback && onSelectOption(option.id)}
              className={`flex bg-white dark:bg-background-secondary border-2 transition-all rounded-lg overflow-hidden shadow-md hover:shadow-lg min-h-[60px] ${
                showFeedback ? 'cursor-default' : 'cursor-pointer'
              } ${styleClasses}`}
            >
              {/* F-key Badge */}
              <span className={`bg-gradient-to-b from-gray-100 to-gray-50 dark:from-background-dark dark:to-background px-5 py-4 font-bold border-r-2 border-gray-200 dark:border-background-border text-sm flex items-center justify-center min-w-[65px] ${
                shouldShowCorrect ? 'text-green-600 dark:text-success' : isIncorrect ? 'text-red-600 dark:text-danger' : 'text-blue-600 dark:text-accent'
              }`}>
                {option.id}
              </span>

              {/* Option Text */}
              <span className={`p-4 flex-1 font-medium flex items-center leading-relaxed ${
                shouldShowCorrect ? 'text-green-700 dark:text-success' : isIncorrect ? 'text-red-700 dark:text-danger' : 'text-gray-800 dark:text-neutral'
              }`}>
                {option.text}
                {/* Show checkmark or X for feedback */}
                {showFeedback && isCorrect && (
                  <span className="ml-auto text-green-600 dark:text-success text-xl">✓</span>
                )}
                {showFeedback && isIncorrect && (
                  <span className="ml-auto text-red-600 dark:text-danger text-xl">✗</span>
                )}
              </span>
            </li>
          );
        })}
      </ul>

      {/* Explanation Box */}
      <div className="bg-amber-50 dark:bg-background-secondary border-2 border-amber-300 dark:border-warning/30 rounded-lg p-4 text-gray-600 dark:text-neutral-light text-sm shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-amber-600 dark:text-warning font-bold">💡</span>
          <span className="font-semibold text-amber-700 dark:text-warning">Izoh</span>
        </div>
      </div>
    </div>
  );
}
