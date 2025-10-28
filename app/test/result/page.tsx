'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TestResult } from '@/types/test.types';
import { ResultDisplay } from '../components/ResultDisplay';

/**
 * Result page displaying test completion results
 */
export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<TestResult | null>(null);

  useEffect(() => {
    // Retrieve result from sessionStorage
    const storedResult = sessionStorage.getItem('testResult');

    if (!storedResult) {
      // No result found, redirect to home
      router.push('/');
      return;
    }

    try {
      const parsedResult: TestResult = JSON.parse(storedResult);
      setResult(parsedResult);
    } catch (error) {
      console.error('Error parsing test result:', error);
      router.push('/');
    }
  }, [router]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-xl">Natijalar yuklanmoqda...</p>
      </div>
    );
  }

  return <ResultDisplay result={result} />;
}
