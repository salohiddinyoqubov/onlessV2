import { useEffect, useRef } from 'react';

export function useTimer(
  timeRemainingSeconds: number,
  onTick: (seconds: number) => void,
  onComplete: () => void,
  isActive: boolean = true
) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isActive) return;

    intervalRef.current = setInterval(() => {
      onTick(timeRemainingSeconds - 1);

      if (timeRemainingSeconds - 1 <= 0) {
        onComplete();
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timeRemainingSeconds, onTick, onComplete, isActive]);
}
