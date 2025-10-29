'use client';

import { useState } from 'react';

interface MobileNavigationGridProps {
  questionIds: number[];
  answeredQuestionIds: Set<number>;
  currentQuestionId: number;
  onNavigate: (index: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
}

/**
 * Mobile bottom navigation with grid and controls
 */
export function MobileNavigationGrid({
  questionIds,
  answeredQuestionIds,
  currentQuestionId,
  onNavigate,
  onNext,
  onPrevious,
  onSkip,
}: MobileNavigationGridProps) {
  const [isGridOpen, setIsGridOpen] = useState(false);

  const currentIndex = questionIds.findIndex((id) => id === currentQuestionId);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-background-secondary border-t-2 border-gray-200 dark:border-background-border shadow-2xl z-40">
      {/* Question Grid (Collapsible) */}
      {isGridOpen && (
        <div className="p-4 border-b border-gray-200 dark:border-background-border max-h-64 overflow-y-auto">
          <div className="grid grid-cols-5 gap-2">
            {questionIds.map((questionId, index) => {
              const questionNumber = index + 1;
              const isAnswered = answeredQuestionIds.has(questionId);
              const isCurrent = currentQuestionId === questionId;

              return (
                <button
                  key={questionNumber}
                  onClick={() => {
                    onNavigate(index);
                    setIsGridOpen(false);
                  }}
                  className={`h-12 flex items-center justify-center text-sm font-bold rounded-lg border-2 transition-all shadow-sm ${
                    isCurrent
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 dark:from-accent dark:to-primary border-blue-400 text-white scale-105'
                      : isAnswered
                      ? 'bg-green-100 dark:bg-success-bg border-green-400 dark:border-success text-green-700 dark:text-success'
                      : 'bg-gray-100 dark:bg-neutral-dark border-gray-300 dark:border-background-border text-gray-700 dark:text-neutral-light'
                  }`}
                >
                  {questionNumber}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation Controls */}
      <div className="p-3 space-y-2">
        {/* Grid Toggle Button */}
        <button
          onClick={() => setIsGridOpen(!isGridOpen)}
          className="w-full bg-gray-100 dark:bg-background-dark py-2 px-4 rounded-lg flex items-center justify-center gap-2 text-sm font-semibold text-gray-700 dark:text-neutral active:scale-95 transition-transform"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span>{isGridOpen ? 'Yopish' : 'Barcha savollar'}</span>
          <span className="text-blue-600 dark:text-accent">
            ({answeredQuestionIds.size}/{questionIds.length})
          </span>
        </button>

        {/* Arrow and Skip Buttons */}
        <div className="flex gap-2">
          {/* Previous Button */}
          <button
            onClick={onPrevious}
            disabled={currentIndex === 0}
            className={`flex-1 bg-gray-200 dark:bg-background-dark py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-semibold transition-all ${
              currentIndex === 0
                ? 'opacity-40 cursor-not-allowed'
                : 'active:scale-95'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm text-gray-700 dark:text-neutral">Orqaga</span>
          </button>

          {/* Skip Button */}
          <button
            onClick={onSkip}
            className="flex-1 bg-blue-100 dark:bg-primary/20 py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-semibold active:scale-95 transition-transform"
          >
            <svg className="w-5 h-5 text-blue-600 dark:text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
            <span className="text-sm text-blue-600 dark:text-accent">O'tkazish</span>
          </button>

          {/* Next Button */}
          <button
            onClick={onNext}
            disabled={currentIndex === questionIds.length - 1}
            className={`flex-1 bg-blue-600 dark:bg-primary py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-white font-semibold transition-all ${
              currentIndex === questionIds.length - 1
                ? 'opacity-40 cursor-not-allowed'
                : 'active:scale-95'
            }`}
          >
            <span className="text-sm">Keyingi</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
