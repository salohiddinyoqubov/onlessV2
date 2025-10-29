'use client';

import { useCallback, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { mockQuestions } from '@/data/questions';
import { useExamSession } from '@/app/lib/hooks/useExamSession';
import { useTimer } from '@/app/lib/hooks/useTimer';
import { useKeyboardShortcuts } from '@/app/lib/hooks/useKeyboardShortcuts';
import { MobileHeader } from './components/MobileHeader';
import { MobileQuestionCard } from './components/MobileQuestionCard';
import { MobileNavigationGrid } from './components/MobileNavigationGrid';
import { calculateExamResult } from '@/app/lib/exam-logic';
import { EXAM_CONFIG } from '@/config/exam.config';

/**
 * Mobile exam page component optimized for smartphones
 */
export default function MobileExamPage() {
  const router = useRouter();

  // Initialize exam session
  const {
    session,
    currentQuestion,
    testQuestions,
    selectAnswer,
    navigateToQuestion,
    submitTest,
  } = useExamSession(mockQuestions);

  // Handle exam submission
  const handleSubmitExam = useCallback(
    (timeRemaining: number) => {
      const timeTaken = EXAM_CONFIG.EXAM_DURATION_SECONDS - timeRemaining;
      const result = calculateExamResult(session.answers, testQuestions, timeTaken);

      sessionStorage.setItem('testResult', JSON.stringify(result));
      submitTest();
      router.push('/exam/result');
    },
    [session.answers, testQuestions, submitTest, router]
  );

  // Initialize timer
  const { secondsRemaining, formattedTime, start } = useTimer(
    EXAM_CONFIG.EXAM_DURATION_SECONDS,
    () => handleSubmitExam(0)
  );

  // Start timer on mount
  useEffect(() => {
    start();
  }, [start]);

  // Handle answer selection
  const handleSelectOption = useCallback(
    (optionId: string) => {
      if (!currentQuestion) return;
      selectAnswer(currentQuestion.id, optionId);
    },
    [currentQuestion, selectAnswer]
  );

  // Calculate answered questions
  const answeredQuestionIds = useMemo(() => {
    return new Set(
      Object.keys(session.answers)
        .filter((key) => session.answers[Number(key)] !== '')
        .map(Number)
    );
  }, [session.answers]);

  // Handle F7 - Skip to next unanswered question
  const handleSkipToNext = useCallback(() => {
    const currentIndex = session.currentQuestionIndex;
    const totalQuestions = session.selectedQuestionIds.length;

    for (let i = currentIndex + 1; i < totalQuestions; i++) {
      const questionId = session.selectedQuestionIds[i];
      if (!answeredQuestionIds.has(questionId)) {
        navigateToQuestion(i);
        return;
      }
    }

    for (let i = 0; i < currentIndex; i++) {
      const questionId = session.selectedQuestionIds[i];
      if (!answeredQuestionIds.has(questionId)) {
        navigateToQuestion(i);
        return;
      }
    }
  }, [session, answeredQuestionIds, navigateToQuestion]);

  // Set up keyboard shortcuts
  useKeyboardShortcuts(currentQuestion?.options || [], handleSelectOption, handleSkipToNext);

  // Handle close
  const handleClose = useCallback(() => {
    if (confirm('Imtihonni tugatmoqchimisiz? Jarayoningiz saqlanmaydi.')) {
      router.push('/');
    }
  }, [router]);

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-background-dark">
        <p className="text-gray-900 dark:text-white text-lg">Savol yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-background-dark">
      {/* Mobile Header */}
      <MobileHeader
        ticketNumber={1}
        currentQuestionNumber={session.currentQuestionIndex + 1}
        totalQuestions={session.selectedQuestionIds.length}
        timeRemaining={formattedTime}
        studentName="Yakubov Salohiddin"
        onClose={handleClose}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        <MobileQuestionCard
          question={currentQuestion}
          selectedOptionId={session.answers[currentQuestion.id] || null}
          onSelectOption={handleSelectOption}
        />
      </div>

      {/* Bottom Navigation */}
      <MobileNavigationGrid
        questionIds={session.selectedQuestionIds}
        answeredQuestionIds={answeredQuestionIds}
        currentQuestionId={currentQuestion.id}
        onNavigate={navigateToQuestion}
        onNext={() => {
          const nextIndex = session.currentQuestionIndex + 1;
          if (nextIndex < session.selectedQuestionIds.length) {
            navigateToQuestion(nextIndex);
          }
        }}
        onPrevious={() => {
          const prevIndex = session.currentQuestionIndex - 1;
          if (prevIndex >= 0) {
            navigateToQuestion(prevIndex);
          }
        }}
        onSkip={handleSkipToNext}
      />
    </div>
  );
}
