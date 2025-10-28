'use client';

import { QuestionOption } from '@/types/test.types';

interface OptionsPanelProps {
  /** Question text */
  questionText: string;
  /** Array of answer options (3-4 items) */
  options: QuestionOption[];
  /** Currently selected option ID */
  selectedOptionId: string | null;
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
  onSelectOption,
}: OptionsPanelProps) {
  return (
    <div className="flex flex-col">
      {/* Question Box */}
      <div className="bg-primary p-4 mb-5 border border-primary-border text-lg font-medium text-white text-center">
        {questionText}
      </div>

      {/* Options List */}
      <ul className="list-none p-0 m-0 flex flex-col gap-2.5 mb-2.5">
        {options.map((option) => {
          const isSelected = selectedOptionId === option.id;

          return (
            <li
              key={option.id}
              onClick={() => onSelectOption(option.id)}
              className={`flex bg-background-secondary border cursor-pointer transition-colors ${
                isSelected
                  ? 'bg-primary-light border-accent'
                  : 'border-background-border hover:border-accent'
              }`}
            >
              {/* F-key Badge */}
              <span className="bg-background p-4 font-bold border-r border-background-border text-neutral-light">
                {option.id}
              </span>

              {/* Option Text */}
              <span className="p-4 flex-1 text-neutral">{option.text}</span>
            </li>
          );
        })}
      </ul>

      {/* Explanation Box */}
      <div className="bg-background-secondary border border-background-border p-4 text-neutral-light">
        Izoh
      </div>
    </div>
  );
}
