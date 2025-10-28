'use client';

import { useEffect } from 'react';
import { QuestionOption } from '@/types/exam.types';

/**
 * Custom hook for handling F1-F4 keyboard shortcuts
 *
 * @param options Array of question options
 * @param onSelectOption Callback when an option is selected via keyboard
 */
export function useKeyboardShortcuts(
  options: QuestionOption[],
  onSelectOption: (optionId: string) => void
) {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Map F keys to option indices
      const keyMap: Record<string, number> = {
        F1: 0,
        F2: 1,
        F3: 2,
        F4: 3,
      };

      const index = keyMap[event.key];

      // Check if key is F1-F4 and option exists
      if (index !== undefined && options[index]) {
        // Prevent browser default behavior for F keys
        event.preventDefault();
        onSelectOption(options[index].id);
      }
    };

    // Attach event listener
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [options, onSelectOption]);
}
