import { useState } from 'react';
import { ExamProvider } from './contexts/ExamContext';
import { ThemeProvider, LanguageProvider, createStorageAdapter } from '@onless/shared';
import HomePage from './pages/HomePage';
import ExamPage from './pages/ExamPage';
import ResultPage from './pages/ResultPage';

type Page = 'home' | 'exam' | 'result';

// Create storage adapter (auto-detects Electron environment)
const storageAdapter = createStorageAdapter();

// Platform-specific theme applier for Electron/Web
const applyTheme = (theme: 'dark' | 'light') => {
  document.documentElement.classList.remove('dark', 'light');
  document.documentElement.classList.add(theme);
};

// Get system theme preference
const getSystemTheme = (): 'dark' | 'light' => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  return (
    <ThemeProvider
      storageAdapter={storageAdapter}
      applyTheme={applyTheme}
      getSystemTheme={getSystemTheme}
    >
      <LanguageProvider storageAdapter={storageAdapter}>
        <ExamProvider>
          <div className="w-full h-screen overflow-hidden">
            {currentPage === 'home' && (
              <HomePage onStartExam={() => setCurrentPage('exam')} />
            )}
            {currentPage === 'exam' && (
              <ExamPage
                onComplete={() => setCurrentPage('result')}
                onClose={() => setCurrentPage('home')}
              />
            )}
            {currentPage === 'result' && (
              <ResultPage onBackToHome={() => setCurrentPage('home')} />
            )}
          </div>
        </ExamProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
