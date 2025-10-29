/**
 * Unified useTimer hook for all platforms
 * Works with: Frontend (Next.js), Mobile (React Native), Desktop (Electron)
 */
import { useEffect, useRef } from 'react';

/**
 * Custom hook for managing countdown timer
 * Platform-agnostic implementation that works in browser, Electron, and React Native
 *
 * @param timeRemainingSeconds - Current time remaining in seconds
 * @param onTick - Callback when timer ticks (every second)
 * @param onComplete - Callback when timer reaches zero
 * @param isActive - Whether the timer should be running
 */
export function useTimer(
  timeRemainingSeconds: number,
  onTick: (seconds: number) => void,
  onComplete: () => void,
  isActive: boolean = true
) {
  // Use any type for intervalRef to avoid platform-specific timer type conflicts
  // (NodeJS.Timeout in React Native vs number in browser/Electron)
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    // Clear existing interval if timer becomes inactive
    if (!isActive) {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Start countdown timer
    intervalRef.current = setInterval(() => {
      const newTime = timeRemainingSeconds - 1;
      onTick(newTime);

      // Complete when timer reaches zero
      if (newTime <= 0) {
        onComplete();
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    }, 1000);

    // Cleanup on unmount or when dependencies change
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [timeRemainingSeconds, onTick, onComplete, isActive]);
}
