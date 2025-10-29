'use client';

import { useState, useCallback, useMemo } from 'react';
import { Question, ExamSession } from '@/types/exam.types';
import { selectRandomQuestions } from '../exam-logic';
import { EXAM_CONFIG } from '@/config/exam.config';

/**
 * Custom hook for managing test session state
 *
 * @param allQuestions Complete array of all available questions
 * @returns Test session state and control functions
 */
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

  /**
   * Get the currently displayed question
   */
  const currentQuestion = useMemo(() => {
    const questionId = session.selectedQuestionIds[session.currentQuestionIndex];
    return allQuestions.find((q) => q.id === questionId);
  }, [allQuestions, session.selectedQuestionIds, session.currentQuestionIndex]);

  /**
   * Get all questions for the current test session
   */
  const testQuestions = useMemo(() => {
    return session.selectedQuestionIds
      .map((id) => allQuestions.find((q) => q.id === id))
      .filter((q): q is Question => q !== undefined);
  }, [allQuestions, session.selectedQuestionIds]);

  /**
   * Select an answer for a specific question
   */
  const selectAnswer = useCallback((questionId: number, optionId: string) => {
    setSession((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: optionId },
    }));
  }, []);

  /**
   * Navigate to a specific question by index
   */
  const navigateToQuestion = useCallback((index: number) => {
    setSession((prev) => ({
      ...prev,
      currentQuestionIndex: Math.max(0, Math.min(index, prev.selectedQuestionIds.length - 1)),
    }));
  }, []);

  /**
   * Navigate to next question
   */
  const nextQuestion = useCallback(() => {
    setSession((prev) => {
      const nextIndex = prev.currentQuestionIndex + 1;
      if (nextIndex < prev.selectedQuestionIds.length) {
        return { ...prev, currentQuestionIndex: nextIndex };
      }
      return prev;
    });
  }, []);

  /**
   * Navigate to previous question
   */
  const previousQuestion = useCallback(() => {
    setSession((prev) => {
      const prevIndex = prev.currentQuestionIndex - 1;
      if (prevIndex >= 0) {
        return { ...prev, currentQuestionIndex: prevIndex };
      }
      return prev;
    });
  }, []);

  /**
   * Mark test as completed
   */
  const submitTest = useCallback(() => {
    setSession((prev) => ({ ...prev, isCompleted: true }));
  }, []);

  /**
   * Update remaining time
   */
  const updateTimeRemaining = useCallback((seconds: number) => {
    setSession((prev) => ({ ...prev, timeRemainingSeconds: seconds }));
  }, []);

  return {
    session,
    currentQuestion,
    testQuestions,
    selectAnswer,
    navigateToQuestion,
    nextQuestion,
    previousQuestion,
    submitTest,
    updateTimeRemaining,
  };
}
