'use client';

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
  const languages = [
    { code: 'uz-latn', label: 'Uzb (lotin.)' },
    { code: 'uz-cyrl', label: 'Uzb (кирил.)' },
    { code: 'qr-latn', label: 'Qrq (lotin.)' },
    { code: 'qr-cyrl', label: 'Qrq (кирил.)' },
    { code: 'ru-cyrl', label: 'Rus (кирил.)' },
  ];

  return (
    <header className="bg-background-secondary px-5 py-2 flex items-center justify-between border-b border-background-border">
      {/* Left: School Info */}
      <div className="flex items-center">
        {/* Logo placeholder */}
        <div className="w-10 h-10 mr-4 bg-accent rounded-full opacity-50" />
        <div className="text-xs text-neutral">
          <div className="font-bold text-white text-sm">AVTOBEST SCHOOL</div>
          <div className="font-bold">INNOVATSION AVTOMAKTAB</div>
          <div>+99 899 818 90 84</div>
        </div>
      </div>

      {/* Center: Language Tabs */}
      <div className="flex gap-0.5">
        {languages.map((lang, idx) => (
          <button
            key={lang.code}
            className={`px-4 py-1.5 text-sm border border-background-border transition-colors ${
              idx === 4
                ? 'bg-primary border-primary-border text-white'
                : 'bg-transparent text-neutral hover:bg-primary hover:border-primary-border hover:text-white'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>

      {/* Right: Question Count, Timer and Close */}
      <div className="flex items-center gap-5">
        <span className="text-4xl font-bold text-accent">- {currentQuestionNumber} -</span>
        <div className="bg-background px-4 py-1 border border-background-border text-2xl font-bold text-neutral tracking-widest">
          {timeRemaining}
        </div>
        <button
          onClick={onClose}
          className="text-neutral hover:text-white transition-colors text-2xl font-bold"
          aria-label="Imtihonni yopish"
        >
          X
        </button>
      </div>
    </header>
  );
}
