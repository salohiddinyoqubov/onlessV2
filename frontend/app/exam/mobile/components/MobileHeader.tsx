'use client';

import { useLanguage } from '@/app/lib/contexts/LanguageContext';

interface MobileHeaderProps {
  ticketNumber: number;
  currentQuestionNumber: number;
  totalQuestions: number;
  timeRemaining: string;
  studentName?: string;
  onClose: () => void;
}

/**
 * Compact mobile header with essential information
 */
export function MobileHeader({
  ticketNumber,
  currentQuestionNumber,
  totalQuestions,
  timeRemaining,
  studentName,
  onClose,
}: MobileHeaderProps) {
  const { convertText } = useLanguage();

  return (
    <header className="bg-white dark:bg-background-secondary shadow-lg sticky top-0 z-50">
      {/* Top Row: Branding and Close */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-background-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 dark:from-accent dark:to-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">O</span>
          </div>
          <div>
            <div className="text-sm font-bold text-gray-900 dark:text-white">ONLESS</div>
            <div className="text-[10px] text-gray-500 dark:text-neutral-light">onless.uz</div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center bg-red-100 dark:bg-danger/20 hover:bg-red-500 dark:hover:bg-danger text-red-600 dark:text-danger hover:text-white transition-all rounded-lg font-bold"
          aria-label="Close exam"
        >
          ✕
        </button>
      </div>

      {/* Bottom Row: Stats */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-50 to-gray-50 dark:from-background-dark dark:to-background">
        {/* Ticket */}
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-600 dark:text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <div>
            <div className="text-[10px] text-gray-500 dark:text-neutral-light">{convertText('Bilet')}</div>
            <div className="text-sm font-bold text-gray-900 dark:text-white">#{ticketNumber}</div>
          </div>
        </div>

        {/* Question Progress */}
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-600 dark:text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <div className="text-[10px] text-gray-500 dark:text-neutral-light">{convertText('Savol')}</div>
            <div className="text-sm font-bold text-gray-900 dark:text-white">
              {currentQuestionNumber}<span className="text-gray-500 dark:text-neutral-light">/{totalQuestions}</span>
            </div>
          </div>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-600 dark:text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-lg font-mono font-bold text-blue-600 dark:text-accent">
            {timeRemaining}
          </div>
        </div>
      </div>

      {/* Student Name (if provided) */}
      {studentName && (
        <div className="px-4 py-2 bg-blue-50 dark:bg-background border-t border-gray-200 dark:border-background-border">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-600 dark:text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs text-gray-600 dark:text-neutral-light">{convertText("O'quvchi")}:</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">{studentName}</span>
          </div>
        </div>
      )}
    </header>
  );
}
