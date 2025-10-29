import { useExam } from '../contexts/ExamContext';
import { useLanguage, type ExamSession } from '@onless/shared';

interface ResultPageProps {
  onBackToHome: () => void;
}

export default function ResultPage({ onBackToHome }: ResultPageProps) {
  const { session } = useExam();
  const { convertText } = useLanguage();

  if (!session) {
    return null;
  }

  const totalQuestions = session.selectedQuestionIds.length;
  const correctAnswers = session.correctAnswers || 0;
  const incorrectAnswers = totalQuestions - correctAnswers;
  const score = session.score || (correctAnswers / totalQuestions) * 100;
  const passed = score >= 70;

  const timeSpent = Math.floor((2400 - session.timeRemainingSeconds) / 60);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-50 dark:bg-gray-900 p-8 overflow-auto">
      {/* Result Banner */}
      <div
        className={`mb-8 px-12 py-8 rounded-2xl text-center ${
          passed
            ? 'bg-gradient-to-r from-green-500 to-green-600'
            : 'bg-gradient-to-r from-red-500 to-red-600'
        }`}
      >
        <div className="text-6xl mb-4">{passed ? '🎉' : '😔'}</div>
        <h1 className="text-5xl font-bold text-white mb-2">
          {convertText(passed ? "O'TDINGIZ!" : "O'TMADINGIZ")}
        </h1>
        <div className="text-3xl font-bold text-white/90">{score.toFixed(1)}%</div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8 w-full max-w-3xl">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-green-200 dark:border-green-800 text-center">
          <div className="text-4xl mb-2">✓</div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
            {correctAnswers}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {convertText("To'g'ri javoblar")}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-red-200 dark:border-red-800 text-center">
          <div className="text-4xl mb-2">✗</div>
          <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-1">
            {incorrectAnswers}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {convertText("Noto'g'ri javoblar")}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-800 text-center">
          <div className="text-4xl mb-2">⏱️</div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
            {timeSpent}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {convertText('Daqiqa sarflandi')}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onBackToHome}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
        >
          {convertText('Bosh sahifaga qaytish')}
        </button>

        <button
          onClick={async () => {
            if (window.electronAPI) {
              const result = await window.electronAPI.exam.exportResults(session);
              if (result.success) {
                alert(convertText('Natijalar muvaffaqiyatli saqlandi!'));
              }
            }
          }}
          className="px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-semibold transition-colors"
        >
          📥 {convertText('Natijalarni saqlash')}
        </button>
      </div>

      {/* Passed Requirements Info */}
      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        {convertText("O'tish uchun kamida 14/20 to'g'ri javob kerak (70%)")}
      </div>
    </div>
  );
}
