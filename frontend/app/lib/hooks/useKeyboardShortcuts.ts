'use client';

import { useEffect } from 'react';
import { QuestionOption } from '@/types/exam.types';
import { isFKeyForIndex } from '@onless/shared';

/**
 * Custom hook for handling dynamic F-key keyboard shortcuts
 * Supports any number of options (F1-Fn)
 *
 * @param options Array of question options
 * @param onSelectOption Callback when an option is selected via keyboard
 * @param onSkipToNext Optional callback when F7 is pressed to skip to next unanswered question
 */
export function useKeyboardShortcuts(
  options: QuestionOption[],
  onSelectOption: (optionId: string) => void,
  onSkipToNext?: () => void
) {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Check each option dynamically
      options.forEach((option, index) => {
        if (isFKeyForIndex(event, index)) {
          // Prevent browser default behavior for F keys
          event.preventDefault();
          onSelectOption(option.id);
        }
      });

      // Check if key is F7 (skip to next unanswered)
      if (event.key === 'F7' && onSkipToNext) {
        event.preventDefault();
        onSkipToNext();
      }
    };

    // Attach event listener
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [options, onSelectOption, onSkipToNext]);
}
