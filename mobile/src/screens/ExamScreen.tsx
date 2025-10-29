import React, { useMemo, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { mockQuestions } from '@onless/shared';
import { useExamSession } from '../hooks/useExamSession';
import { useTimer } from '../hooks/useTimer';
import { ExamHeader } from '../components/ExamHeader';
import { QuestionCard } from '../components/QuestionCard';
import { NavigationGrid } from '../components/NavigationGrid';

type RootStackParamList = {
  Home: undefined;
  Exam: undefined;
};

type ExamScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Exam'>;

interface Props {
  navigation: ExamScreenNavigationProp;
}

export function ExamScreen({ navigation }: Props) {
  const {
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
  } = useExamSession(mockQuestions);

  const handleClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleTimeComplete = useCallback(() => {
    completeExam();
    // TODO: Navigate to results screen
    alert('Vaqt tugadi! Test yakunlandi.');
    handleClose();
  }, [completeExam, handleClose]);

  useTimer(
    session.timeRemainingSeconds,
    updateTime,
    handleTimeComplete,
    !session.isCompleted
  );

  const handleSelectOption = useCallback(
    (optionId: string) => {
      if (!currentQuestion) return;
      selectOption(currentQuestion.id, optionId);
    },
    [currentQuestion, selectOption]
  );

  const answeredQuestionIds = useMemo(
    () => new Set(Object.keys(session.answers).map(Number)),
    [session.answers]
  );

  const selectedOptionId = currentQuestion ? session.answers[currentQuestion.id] : undefined;

  if (!currentQuestion) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <ExamHeader
          ticketNumber={1}
          currentQuestionNumber={session.currentQuestionIndex + 1}
          totalQuestions={session.selectedQuestionIds.length}
          timeRemaining={session.timeRemainingSeconds}
          studentName="Yakubov Salohiddin"
          onClose={handleClose}
        />

        {/* Question Card */}
        <View style={styles.questionContainer}>
          <QuestionCard
            question={currentQuestion}
            selectedOptionId={selectedOptionId}
            onSelectOption={handleSelectOption}
            showFeedback={false}
          />
        </View>

        {/* Navigation Grid */}
        <NavigationGrid
          questionIds={session.selectedQuestionIds}
          answeredQuestionIds={answeredQuestionIds}
          currentQuestionId={currentQuestion.id}
          onNavigate={navigateToQuestion}
          onNext={nextQuestion}
          onPrevious={previousQuestion}
          onSkip={skipToNextUnanswered}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
  },
  questionContainer: {
    flex: 1,
  },
});
