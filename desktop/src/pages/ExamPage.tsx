import { mockQuestions, useExamSession, useTimer } from '@onless/shared';
import { useExam } from '../contexts/ExamContext';
import ExamHeader from '../components/ExamHeader';
import OptionsPanel from '../components/OptionsPanel';
import QuestionDisplay from '../components/QuestionDisplay';
import NavigationGrid from '../components/NavigationGrid';

interface ExamPageProps {
  onComplete: () => void;
  onClose: () => void;
}

export default function ExamPage({ onComplete, onClose }: ExamPageProps) {
  const { setSession, saveResult } = useExam();
  const {
    session,
    currentQuestion,
    selectedQuestions,
    selectOption,
    navigateToQuestion,
    skipToNextUnanswered,
    updateTime,
    completeExam,
  } = useExamSession(mockQuestions);

  const handleTimeComplete = () => {
    const finalSession = completeExam();
    saveResult(finalSession);
    setSession(finalSession);
    onComplete();
  };

  const handleFinishEarly = () => {
    const finalSession = completeExam();
    saveResult(finalSession);
    setSession(finalSession);
    onComplete();
  };

  useTimer(
    session.timeRemainingSeconds,
    updateTime,
    handleTimeComplete,
    !session.isCompleted
  );

  const answeredQuestionIds = new Set(Object.keys(session.answers).map(Number));
  const selectedOptionId = currentQuestion ? session.answers[currentQuestion.id] : undefined;

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 via-blue-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <ExamHeader
        ticketNumber={1}
        currentQuestionNumber={session.currentQuestionIndex + 1}
        totalQuestions={session.selectedQuestionIds.length}
        timeRemaining={session.timeRemainingSeconds}
        studentName="Desktop User"
        onClose={onClose}
        onFinish={handleFinishEarly}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex flex-1 p-5 gap-5 overflow-y-auto min-h-0">
          {/* Left Panel: Question and Options */}
          <div className="flex-[0_0_420px] flex flex-col">
            <OptionsPanel
              questionText={currentQuestion.text}
              options={currentQuestion.options}
              selectedOptionId={selectedOptionId || null}
              correctOptionId={currentQuestion.correctOptionId}
              showFeedback={false}
              explanation={currentQuestion.explanation}
              onSelectOption={(optionId) => selectOption(currentQuestion.id, optionId)}
            />
          </div>

          {/* Right Panel: Image */}
          <div className="flex-1 flex justify-center items-center bg-white dark:bg-gray-800 relative min-h-[300px] rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden">
            <QuestionDisplay imagePath={currentQuestion.imagePath} />
          </div>
        </div>

        {/* Footer: Navigation Grid */}
        <NavigationGrid
          questionIds={session.selectedQuestionIds}
          answeredQuestionIds={answeredQuestionIds}
          currentQuestionId={currentQuestion.id}
          onNavigate={(questionId) => navigateToQuestion(questionId)}
        />
      </div>
    </div>
  );
}
