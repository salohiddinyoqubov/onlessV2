/**
 * Unified useExamSession hook for all platforms
 * Works with: Frontend (Next.js), Mobile (React Native), Desktop (Electron)
 */
import { useState, useCallback, useMemo } from 'react';
import type { Question, ExamSession } from '../types/exam.types';
import { selectRandomQuestions, calculateScore } from '../utils/exam-logic';
import { EXAM_CONFIG } from '../constants/exam.config';

/**
 * Custom hook for managing exam session state across all platforms
 *
 * @param allQuestions - Complete array of available questions
 * @returns Exam session state and control functions
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
      correctAnswers: 0,
      score: 0,
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
   * Get all selected questions for this session
   */
  const selectedQuestions = useMemo(() => {
    return session.selectedQuestionIds
      .map((id) => allQuestions.find((q) => q.id === id))
      .filter((q): q is Question => q !== undefined);
  }, [allQuestions, session.selectedQuestionIds]);

  /**
   * Select an answer for a specific question
   * Unified API: uses 'optionId' parameter name
   */
  const selectOption = useCallback((questionId: number, optionId: string) => {
    setSession((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: optionId },
    }));
  }, []);

  /**
   * Navigate to a specific question by question ID
   * Unified API: uses questionId (not index)
   */
  const navigateToQuestion = useCallback((questionId: number) => {
    setSession((prev) => {
      const index = prev.selectedQuestionIds.indexOf(questionId);
      if (index === -1) return prev;
      return { ...prev, currentQuestionIndex: index };
    });
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
   * Skip to next unanswered question
   */
  const skipToNextUnanswered = useCallback(() => {
    setSession((prev) => {
      const startIndex = prev.currentQuestionIndex + 1;
      for (let i = 0; i < prev.selectedQuestionIds.length; i++) {
        const index = (startIndex + i) % prev.selectedQuestionIds.length;
        const questionId = prev.selectedQuestionIds[index];
        if (!prev.answers[questionId]) {
          return { ...prev, currentQuestionIndex: index };
        }
      }
      return prev;
    });
  }, []);

  /**
   * Update remaining time
   */
  const updateTime = useCallback((seconds: number) => {
    setSession((prev) => ({
      ...prev,
      timeRemainingSeconds: seconds,
    }));
  }, []);

  /**
   * Complete the exam and calculate final score
   * Returns the final session for persistence
   */
  const completeExam = useCallback((): ExamSession => {
    const { correctCount, percentage } = calculateScore(selectedQuestions, session.answers);

    const finalSession: ExamSession = {
      ...session,
      isCompleted: true,
      correctAnswers: correctCount,
      score: percentage,
      completedAt: new Date(),
    };

    setSession(finalSession);
    return finalSession;
  }, [session, selectedQuestions]);

  return {
    session,
    currentQuestion,
    selectedQuestions,
    selectOption, // Unified name
    navigateToQuestion, // Unified signature
    nextQuestion,
    previousQuestion,
    skipToNextUnanswered,
    updateTime,
    completeExam,
  };
}
