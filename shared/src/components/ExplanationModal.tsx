interface ExplanationModalProps {
  explanation: string;
  isOpen: boolean;
  onClose: () => void;
  /** Function to convert text based on language/script */
  convertText?: (text: string) => string;
}

/**
 * Modal component for displaying question explanations
 * Prevents layout stretching by showing content in an overlay
 */
export function ExplanationModal({
  explanation,
  isOpen,
  onClose,
  convertText = (text) => text, // Default to identity function
}: ExplanationModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-xl w-full max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-amber-100 dark:bg-amber-900/30 px-6 py-4 border-b-2 border-amber-300 dark:border-amber-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-amber-600 dark:text-amber-500 font-bold text-2xl">💡</span>
              <h3 className="text-xl font-bold text-amber-800 dark:text-amber-400">
                {convertText('Izoh')}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center bg-amber-200 dark:bg-amber-800 hover:bg-amber-300 dark:hover:bg-amber-700 text-amber-800 dark:text-amber-300 rounded-lg transition-colors font-bold text-lg"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(80vh-88px)]">
            <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-base">
              {convertText(explanation)}
            </p>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              {convertText('Yopish')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
