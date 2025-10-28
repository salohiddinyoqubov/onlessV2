'use client';

import { TestResult } from '@/types/test.types';
import { formatTime } from '@/app/lib/test-logic';

interface ResultDisplayProps {
  result: TestResult;
}

/**
 * Component displaying test results with detailed breakdown
 */
export function ResultDisplay({ result }: ResultDisplayProps) {
  const {
    totalQuestions,
    correctCount,
    incorrectCount,
    scorePercentage,
    hasPassed,
    timeTakenSeconds,
    answerDetails,
  } = result;

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-6">
      <div className="bg-primary-dark rounded-lg shadow-2xl max-w-4xl w-full p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Imtihon natijalari
          </h1>
          <div
            className={`text-6xl font-bold mt-4 ${
              hasPassed ? 'text-success' : 'text-danger'
            }`}
          >
            {hasPassed ? 'O\'TDINGIZ!' : 'O\'TMADINGIZ'}
          </div>
        </div>

        {/* Score Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-primary p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-white mb-2">
              {scorePercentage}%
            </div>
            <div className="text-neutral-light text-sm">Ball</div>
          </div>

          <div className="bg-primary p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-success mb-2">
              {correctCount}
            </div>
            <div className="text-neutral-light text-sm">To'g'ri javoblar</div>
          </div>

          <div className="bg-primary p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-danger mb-2">
              {incorrectCount}
            </div>
            <div className="text-neutral-light text-sm">Noto'g'ri javoblar</div>
          </div>

          <div className="bg-primary p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-white mb-2">
              {formatTime(timeTakenSeconds)}
            </div>
            <div className="text-neutral-light text-sm">Sarflangan vaqt</div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="bg-primary rounded-lg p-6 mb-6 max-h-96 overflow-y-auto">
          <h2 className="text-xl font-semibold text-white mb-4">
            Batafsil natijalar
          </h2>

          <div className="space-y-3">
            {answerDetails.map((detail, index) => (
              <div
                key={detail.questionId}
                className={`p-4 rounded-lg ${
                  detail.isCorrect ? 'bg-success/20' : 'bg-danger/20'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      detail.isCorrect
                        ? 'bg-success text-white'
                        : 'bg-danger text-white'
                    }`}
                  >
                    {index + 1}
                  </div>

                  <div className="flex-1">
                    <p className="text-white font-medium mb-2">
                      {detail.questionText}
                    </p>

                    <div className="text-sm space-y-1">
                      {detail.selectedOptionId ? (
                        <p
                          className={
                            detail.isCorrect ? 'text-success' : 'text-danger'
                          }
                        >
                          Sizning javobingiz: {detail.selectedOptionId}
                          {detail.isCorrect ? ' ✓' : ' ✗'}
                        </p>
                      ) : (
                        <p className="text-neutral-light">Javob berilmagan</p>
                      )}

                      {!detail.isCorrect && (
                        <p className="text-success">
                          To'g'ri javob: {detail.correctOptionId}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <a
            href="/test"
            className="px-8 py-3 bg-success hover:bg-success/80 text-white rounded-lg font-semibold transition-colors"
          >
            Qayta urinib ko'rish
          </a>
          <a
            href="/"
            className="px-8 py-3 bg-primary-light hover:bg-primary text-white rounded-lg font-semibold transition-colors"
          >
            Bosh sahifaga qaytish
          </a>
        </div>
      </div>
    </div>
  );
}
