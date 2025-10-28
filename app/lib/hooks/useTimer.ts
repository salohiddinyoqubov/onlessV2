'use client';

import { useState, useEffect, useCallback } from 'react';
import { formatTime } from '../test-logic';

/**
 * Custom hook for managing countdown timer
 *
 * @param initialSeconds Starting time in seconds
 * @param onTimeUp Callback function when timer reaches zero
 * @returns Timer state and control functions
 */
export function useTimer(initialSeconds: number, onTimeUp: () => void) {
  const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    if (secondsRemaining <= 0) {
      onTimeUp();
      setIsRunning(false);
      return;
    }

    const intervalId = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning, secondsRemaining, onTimeUp]);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback((seconds: number) => {
    setSecondsRemaining(seconds);
    setIsRunning(false);
  }, []);

  return {
    secondsRemaining,
    formattedTime: formatTime(secondsRemaining),
    isRunning,
    start,
    pause,
    reset,
  };
}
