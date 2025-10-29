import { useState, useCallback, useMemo } from 'react';
import { ExamSession, Question } from '@onless/shared';
import { selectRandomQuestions, EXAM_CONFIG } from '@onless/shared';

export function useExamSession(allQuestions: Question[]) {
  const [session, setSession] = useState<ExamSession>(() => {
    const selectedIds = selectRandomQuestions();
    return {
      selectedQuestionIds: selectedIds,
      currentQuestionIndex: 0,
      answers: {},
      timeRemainingSeconds: EXAM_CONFIG.EXAM_DURATION_SECONDS,
      startedAt: new Date(),
      isCompleted: false,
    };
  });

  const currentQuestionId = session.selectedQuestionIds[session.currentQuestionIndex];

  const currentQuestion = useMemo(
    () => allQuestions.find((q) => q.id === currentQuestionId),
    [allQuestions, currentQuestionId]
  );

  const selectedQuestions = useMemo(
    () => allQuestions.filter((q) => session.selectedQuestionIds.includes(q.id)),
    [allQuestions, session.selectedQuestionIds]
  );

  const selectOption = useCallback((questionId: number, optionId: string) => {
    setSession((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: optionId,
      },
    }));
  }, []);

  const navigateToQuestion = useCallback((index: number) => {
    setSession((prev) => ({
      ...prev,
      currentQuestionIndex: index,
    }));
  }, []);

  const nextQuestion = useCallback(() => {
    setSession((prev) => {
      const nextIndex = prev.currentQuestionIndex + 1;
      if (nextIndex >= prev.selectedQuestionIds.length) {
        return prev;
      }
      return {
        ...prev,
        currentQuestionIndex: nextIndex,
      };
    });
  }, []);

  const previousQuestion = useCallback(() => {
    setSession((prev) => {
      const prevIndex = prev.currentQuestionIndex - 1;
      if (prevIndex < 0) {
        return prev;
      }
      return {
        ...prev,
        currentQuestionIndex: prevIndex,
      };
    });
  }, []);

  const skipToNextUnanswered = useCallback(() => {
    const currentIndex = session.currentQuestionIndex;
    const totalQuestions = session.selectedQuestionIds.length;

    // Search from next question to end
    for (let i = currentIndex + 1; i < totalQuestions; i++) {
      const questionId = session.selectedQuestionIds[i];
      if (!session.answers[questionId]) {
        navigateToQuestion(i);
        return;
      }
    }

    // Wrap around and search from start to current
    for (let i = 0; i < currentIndex; i++) {
      const questionId = session.selectedQuestionIds[i];
      if (!session.answers[questionId]) {
        navigateToQuestion(i);
        return;
      }
    }
  }, [session, navigateToQuestion]);

  const updateTime = useCallback((seconds: number) => {
    setSession((prev) => ({
      ...prev,
      timeRemainingSeconds: seconds,
    }));
  }, []);

  const completeExam = useCallback(() => {
    setSession((prev) => ({
      ...prev,
      isCompleted: true,
    }));
  }, []);

  return {
    session,
    currentQuestion,
    selectedQuestions,
    selectOption,
    navigateToQuestion,
    nextQuestion,
    previousQuestion,
    skipToNextUnanswered,
    updateTime,
    completeExam,
  };
}
