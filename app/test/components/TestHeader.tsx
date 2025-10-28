'use client';

import { useTheme } from '@/app/lib/contexts/ThemeContext';

interface TestHeaderProps {
  /** Current question number (1-20) */
  currentQuestionNumber: number;
  /** Total questions in the test */
  totalQuestions: number;
  /** Formatted time remaining (e.g., "0:40:00") */
  timeRemaining: string;
  /** Callback when close button is clicked */
  onClose: () => void;
}

/**
 * Test header component displaying logo, language tabs, progress, timer, and close button
 */
export function TestHeader({
  currentQuestionNumber,
  totalQuestions,
  timeRemaining,
  onClose,
}: TestHeaderProps) {
  const { theme, toggleTheme } = useTheme();

  const languages = [
    { code: 'uz-latn', label: 'Uzb (lotin.)' },
    { code: 'uz-cyrl', label: 'Uzb (кирил.)' },
    { code: 'qr-latn', label: 'Qrq (lotin.)' },
    { code: 'qr-cyrl', label: 'Qrq (кирил.)' },
    { code: 'ru-cyrl', label: 'Rus (кирил.)' },
  ];

  return (
    <header className="bg-white dark:bg-background-secondary px-5 py-3 flex items-center justify-between border-b-2 border-blue-200 dark:border-primary-border shadow-lg">
      {/* Left: School Info */}
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

      {/* Center: Language Tabs */}
      <div className="flex gap-1 bg-gray-100 dark:bg-background-dark p-1 rounded-lg">
        {languages.map((lang, idx) => (
          <button
            key={lang.code}
            className={`px-4 py-2 text-xs font-medium rounded-md transition-all ${
              idx === 4
                ? 'bg-blue-600 dark:bg-primary text-white shadow-md'
                : 'bg-transparent text-gray-600 dark:text-neutral-light hover:bg-gray-200 dark:hover:bg-background-secondary hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>

      {/* Right: Question Count, Timer, Theme Switcher and Close */}
      <div className="flex items-center gap-4">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-primary dark:to-primary-light px-6 py-2 rounded-lg shadow-md">
          <span className="text-3xl font-bold text-white">#{currentQuestionNumber}</span>
        </div>
        <div className="bg-gray-100 dark:bg-background-dark px-5 py-2 border-2 border-blue-300 dark:border-accent/30 rounded-lg text-2xl font-mono font-bold text-blue-600 dark:text-accent shadow-md">
          {timeRemaining}
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
