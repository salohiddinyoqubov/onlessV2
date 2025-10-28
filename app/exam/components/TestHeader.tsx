'use client';

import { useTheme } from '@/app/lib/contexts/ThemeContext';
import { useLanguage, Language, LANGUAGE_LABELS } from '@/app/lib/contexts/LanguageContext';

interface TestHeaderProps {
  /** Ticket/variant number */
  ticketNumber: number;
  /** Current question number (1-20) */
  currentQuestionNumber: number;
  /** Total questions in the test */
  totalQuestions: number;
  /** Formatted time remaining (e.g., "0:40:00") */
  timeRemaining: string;
  /** Student's full name (F.I.O.) */
  studentName?: string;
  /** Callback when close button is clicked */
  onClose: () => void;
}

/**
 * Test header component displaying logo, language tabs, progress, timer, and close button
 */
export function TestHeader({
  ticketNumber,
  currentQuestionNumber,
  totalQuestions,
  timeRemaining,
  studentName,
  onClose,
}: TestHeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, convertText } = useLanguage();

  const languages: { code: Language; label: string }[] = [
    { code: 'uz-latn', label: 'Uzb (lotin.)' },
    { code: 'uz-cyrl', label: 'Uzb (кирил.)' },
    { code: 'qr-latn', label: 'Qrq (lotin.)' },
    { code: 'qr-cyrl', label: 'Qrq (кирил.)' },
    { code: 'ru-cyrl', label: 'Rus (кирил.)' },
  ];

  return (
    <header className="bg-white dark:bg-background-secondary px-5 py-3 flex items-center justify-between border-b-2 border-blue-200 dark:border-primary-border shadow-lg">
      {/* Left: School Info and Student Name */}
      <div className="flex items-center gap-6">
        {/* Logo and Branding */}
        <div className="flex items-center">
          {/* Logo with gradient */}
          <div className="w-12 h-12 mr-4 bg-gradient-to-br from-blue-500 to-blue-700 dark:from-accent dark:to-primary rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">O</span>
          </div>
          <div className="text-xs text-gray-600 dark:text-neutral">
            <div className="font-bold text-gray-900 dark:text-white text-base">ONLESS</div>
            <div className="font-semibold text-blue-600 dark:text-accent text-xs">Haydovchilik Testi</div>
            <div className="text-gray-500 dark:text-neutral-light">onless.uz</div>
          </div>
        </div>

        {/* Student Name */}
        {studentName && (
          <div className="flex items-center gap-2 bg-white dark:bg-background-secondary px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-background-border shadow-sm">
            <svg className="w-5 h-5 text-blue-600 dark:text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <div>
              <div className="text-[10px] text-gray-500 dark:text-neutral-light uppercase font-semibold">
                {convertText('O\'quvchi')}
              </div>
              <div className="text-sm font-bold text-gray-900 dark:text-white">
                {studentName}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Center: Language Tabs */}
      <div className="flex gap-1 bg-gray-100 dark:bg-background-dark p-1 rounded-lg">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`px-4 py-2 text-xs font-medium rounded-md transition-all ${
              language === lang.code
                ? 'bg-blue-600 dark:bg-primary text-white shadow-md'
                : 'bg-transparent text-gray-600 dark:text-neutral-light hover:bg-gray-200 dark:hover:bg-background-secondary hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>

      {/* Right: Ticket Number, Question Count, Timer, Theme Switcher and Close */}
      <div className="flex items-center gap-4">
        {/* Combined Ticket and Question Info */}
        <div className="bg-white dark:bg-background-secondary px-6 py-3 rounded-xl shadow-lg border-2 border-gray-200 dark:border-background-border">
          <div className="flex items-center gap-4">
            {/* Ticket Badge */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 dark:from-accent dark:to-primary flex items-center justify-center shadow-md">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-neutral-light">
                  {convertText('Bilet')}
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  #{ticketNumber}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-12 bg-gray-300 dark:bg-background-border"></div>

            {/* Question Progress */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 dark:from-accent dark:to-primary flex items-center justify-center shadow-md">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-neutral-light">
                  {convertText('Savol')}
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {currentQuestionNumber}<span className="text-gray-500 dark:text-neutral-light">/{totalQuestions}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-background-dark px-5 py-3 border-2 border-blue-300 dark:border-accent/30 rounded-lg shadow-md flex items-center gap-3">
          <svg className="w-6 h-6 text-blue-600 dark:text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-2xl font-mono font-bold text-blue-600 dark:text-accent">
            {timeRemaining}
          </span>
        </div>
        <button
          onClick={toggleTheme}
          className="w-10 h-10 flex items-center justify-center bg-amber-100 dark:bg-warning/20 hover:bg-amber-400 dark:hover:bg-warning text-amber-600 dark:text-warning hover:text-white transition-all rounded-lg text-xl"
          aria-label="Toggle theme"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center bg-red-100 dark:bg-danger/20 hover:bg-red-500 dark:hover:bg-danger text-red-600 dark:text-danger hover:text-white transition-all rounded-lg font-bold text-xl"
          aria-label="Imtihonni yopish"
        >
          ✕
        </button>
      </div>
    </header>
  );
}
