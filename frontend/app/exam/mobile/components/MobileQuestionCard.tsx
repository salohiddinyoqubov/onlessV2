'use client';

import { useState } from 'react';
import { Question } from '@/types/exam.types';
import { useLanguage } from '@/app/lib/contexts/LanguageContext';
import Image from 'next/image';

interface MobileQuestionCardProps {
  question: Question;
  selectedOptionId: string | null;
  onSelectOption: (optionId: string) => void;
}

/**
 * Mobile-optimized question and options card
 */
export function MobileQuestionCard({
  question,
  selectedOptionId,
  onSelectOption,
}: MobileQuestionCardProps) {
  const { convertText } = useLanguage();
  const [isExplanationOpen, setIsExplanationOpen] = useState(false);
  const showFeedback = !!selectedOptionId;

  return (
    <div className="p-4 space-y-4">
      {/* Question Text */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-primary dark:to-primary-light p-4 rounded-xl shadow-lg">
        <h2 className="text-white font-semibold text-base leading-relaxed text-center">
          {convertText(question.text)}
        </h2>
      </div>

      {/* Question Image (if exists) */}
      {question.imagePath && (
        <div className="bg-white dark:bg-background-secondary rounded-xl shadow-md overflow-hidden">
          <div className="relative w-full aspect-video">
            <Image
              src={question.imagePath}
              alt="Question illustration"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const isCorrect = question.correctOptionId === option.id;
          const isIncorrect = showFeedback && isSelected && !isCorrect;
          const shouldShowCorrect = showFeedback && isCorrect;

          let styleClasses = 'border-gray-300 dark:border-background-border';
          if (shouldShowCorrect) {
            styleClasses = 'bg-green-50 dark:bg-success-bg border-green-500 dark:border-success';
          } else if (isIncorrect) {
            styleClasses = 'bg-red-50 dark:bg-danger-bg border-red-500 dark:border-danger';
          } else if (isSelected && !showFeedback) {
            styleClasses = 'bg-blue-50 dark:bg-primary-light/20 border-blue-500 dark:border-accent';
          }

          return (
            <button
              key={option.id}
              onClick={() => !showFeedback && onSelectOption(option.id)}
              disabled={showFeedback}
              className={`w-full flex items-center gap-3 bg-white dark:bg-background-secondary border-2 rounded-xl p-4 transition-all shadow-md ${
                showFeedback ? 'cursor-default' : 'active:scale-95'
              } ${styleClasses}`}
            >
              {/* F-key Badge */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm border-2 ${
                shouldShowCorrect
                  ? 'bg-green-100 dark:bg-success-bg border-green-500 dark:border-success text-green-700 dark:text-success'
                  : isIncorrect
                  ? 'bg-red-100 dark:bg-danger-bg border-red-500 dark:border-danger text-red-700 dark:text-danger'
                  : 'bg-gray-100 dark:bg-background-dark border-gray-300 dark:border-background-border text-blue-600 dark:text-accent'
              }`}>
                {option.id}
              </div>

              {/* Option Text */}
              <span className={`flex-1 text-left text-sm font-medium ${
                shouldShowCorrect
                  ? 'text-green-700 dark:text-success'
                  : isIncorrect
                  ? 'text-red-700 dark:text-danger'
                  : 'text-gray-800 dark:text-neutral'
              }`}>
                {convertText(option.text)}
              </span>

              {/* Feedback Icon */}
              {showFeedback && isCorrect && (
                <span className="text-green-600 dark:text-success text-xl">✓</span>
              )}
              {showFeedback && isIncorrect && (
                <span className="text-red-600 dark:text-danger text-xl">✗</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {question.explanation && (
        <div className="bg-amber-50 dark:bg-background-secondary border-2 border-amber-300 dark:border-warning/30 rounded-xl overflow-hidden shadow-md">
          <button
            onClick={() => setIsExplanationOpen(!isExplanationOpen)}
            className="w-full flex items-center gap-2 p-4 active:bg-amber-100 dark:active:bg-background-dark transition-colors"
          >
            <span className="text-amber-600 dark:text-warning text-lg">💡</span>
            <span className="font-semibold text-amber-700 dark:text-warning text-sm">
              {convertText('Izoh')}
            </span>
            <span className="ml-auto text-amber-700 dark:text-warning">
              {isExplanationOpen ? '▲' : '▼'}
            </span>
          </button>
          {isExplanationOpen && (
            <div className="px-4 pb-4 pt-2">
              <p className="text-gray-700 dark:text-neutral-light text-sm leading-relaxed">
                {convertText(question.explanation)}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
