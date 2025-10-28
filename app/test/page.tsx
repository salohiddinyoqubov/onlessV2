'use client';

import { useCallback, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { mockQuestions } from '@/data/questions';
import { useTestSession } from '@/app/lib/hooks/useTestSession';
import { useTimer } from '@/app/lib/hooks/useTimer';
import { useKeyboardShortcuts } from '@/app/lib/hooks/useKeyboardShortcuts';
import { TestHeader } from './components/TestHeader';
import { QuestionDisplay } from './components/QuestionDisplay';
import { OptionsPanel } from './components/OptionsPanel';
import { QuestionNavigationGrid } from './components/QuestionNavigationGrid';
import { calculateTestResult } from '@/app/lib/test-logic';
import { TEST_CONFIG } from '@/config/test.config';

/**
 * Main test page component
 * Integrates all test components and manages state
 */
export default function TestPage() {
  const router = useRouter();

  // Initialize test session
  const {
    session,
    currentQuestion,
    testQuestions,
    selectAnswer,
    navigateToQuestion,
    submitTest,
  } = useTestSession(mockQuestions);

  // Handle test submission - define first without using secondsRemaining
  const handleSubmitTest = useCallback(
    (timeRemaining: number) => {
      const timeTaken = TEST_CONFIG.TEST_DURATION_SECONDS - timeRemaining;
      const result = calculateTestResult(session.answers, testQuestions, timeTaken);

      // Store result in sessionStorage for result page
      sessionStorage.setItem('testResult', JSON.stringify(result));

      // Mark test as completed
      submitTest();

      // Navigate to result page
      router.push('/test/result');
    },
    [session.answers, testQuestions, submitTest, router]
  );

  // Initialize timer
  const { secondsRemaining, formattedTime, start } = useTimer(
    TEST_CONFIG.TEST_DURATION_SECONDS,
    () => handleSubmitTest(0)
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

  // Set up keyboard shortcuts
  useKeyboardShortcuts(currentQuestion?.options || [], handleSelectOption);

  // Calculate answered questions
  const answeredQuestionIds = useMemo(() => {
    return new Set(
      Object.keys(session.answers)
        .filter((key) => session.answers[Number(key)] !== '')
        .map(Number)
    );
  }, [session.answers]);

  // Handle close
  const handleClose = useCallback(() => {
    if (confirm('Imtihonni tugatmoqchimisiz? Jarayoningiz saqlanmaydi.')) {
      router.push('/');
    }
  }, [router]);

  // Show loading state
  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-xl">Savol yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-dark to-[#172a45] border-2 border-background-border">
      {/* Header */}
      <TestHeader
        currentQuestionNumber={session.currentQuestionIndex + 1}
        totalQuestions={session.selectedQuestionIds.length}
        timeRemaining={formattedTime}
        onClose={handleClose}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex flex-1 p-5 gap-5 overflow-y-auto min-h-0">
          {/* Left Panel: Question and Options */}
          <div className="flex-[0_0_300px] flex flex-col">
            <OptionsPanel
              questionText={currentQuestion.text}
              options={currentQuestion.options}
              selectedOptionId={session.answers[currentQuestion.id] || null}
              onSelectOption={handleSelectOption}
            />
          </div>

          {/* Right Panel: Image */}
          <div className="flex-1 flex justify-center items-center bg-background-dark relative min-h-[300px]">
            <QuestionDisplay
              questionText={currentQuestion.text}
              imagePath={currentQuestion.imagePath}
            />
          </div>
        </div>

        {/* Footer: Navigation Grid */}
        <QuestionNavigationGrid
          questionIds={session.selectedQuestionIds}
          answeredQuestionIds={answeredQuestionIds}
          currentQuestionId={currentQuestion.id}
          onNavigate={navigateToQuestion}
        />
      </div>
    </div>
  );
}
