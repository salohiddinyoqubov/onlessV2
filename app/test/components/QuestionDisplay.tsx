'use client';

import Image from 'next/image';

interface QuestionDisplayProps {
  /** Question text in Uzbek */
  questionText: string;
  /** Optional image path for visual questions */
  imagePath?: string;
}

/**
 * Component displaying the scenario image
 */
export function QuestionDisplay({ questionText, imagePath }: QuestionDisplayProps) {
  return imagePath ? (
    <Image
      src="/images/scenarios/sample.png"
      alt="Yo'l holati tasviri"
      width={800}
      height={600}
      className="max-w-full max-h-full object-contain"
      priority
    />
  ) : null;
}
