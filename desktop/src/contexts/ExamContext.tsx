import { createContext, useContext, useState, ReactNode } from 'react';
import { ExamSession } from '@shared/types/exam.types';

interface ExamContextType {
  session: ExamSession | null;
  setSession: (session: ExamSession | null) => void;
  saveResult: (session: ExamSession) => Promise<void>;
}

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export function ExamProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<ExamSession | null>(null);

  const saveResult = async (examSession: ExamSession) => {
    if (window.electronAPI) {
      await window.electronAPI.exam.saveResult({
        ...examSession,
        completedAt: new Date().toISOString(),
      });
    }
  };

  return (
    <ExamContext.Provider value={{ session, setSession, saveResult }}>
      {children}
    </ExamContext.Provider>
  );
}

export function useExam() {
  const context = useContext(ExamContext);
  if (context === undefined) {
    throw new Error('useExam must be used within an ExamProvider');
  }
  return context;
}
