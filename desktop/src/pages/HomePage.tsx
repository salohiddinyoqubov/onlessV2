import { useTheme, useLanguage, LANGUAGE_LABELS, type Language } from '@onless/shared';

interface HomePageProps {
  onStartExam: () => void;
}

export default function HomePage({ onStartExam }: HomePageProps) {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, convertText } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-50 dark:bg-gray-900 p-8">
      {/* Settings Bar */}
      <div className="absolute top-4 right-4 flex gap-3">
        {/* Language Selector */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.entries(LANGUAGE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title={theme === 'dark' ? 'Yorug\' rejim' : 'Qorong\'u rejim'}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Logo and Title */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 text-white rounded-2xl mb-6 text-4xl font-bold">
          O
        </div>
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-3">
          {convertText('ONLESS')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
          {convertText('Haydovchilik Nazariy Imtihoni')}
        </p>
        <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
          onless.uz
        </p>
      </div>

      {/* Welcome Section */}
      <div className="max-w-md text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          {convertText('Xush kelibsiz!')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {convertText(
            "Haydovchilik guvohnomasini olish uchun nazariy imtihonni boshlang"
          )}
        </p>
      </div>

      {/* Start Button */}
      <button
        onClick={onStartExam}
        className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
      >
        <span className="block">{convertText('Testni Boshlash')}</span>
        <span className="block text-sm text-blue-200 mt-1">
          20 {convertText('savol')} • 40 {convertText('daqiqa')}
        </span>
      </button>

      {/* Info Cards */}
      <div className="grid grid-cols-3 gap-6 mt-12 max-w-2xl">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-center">
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            20
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {convertText('Savollar soni')}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-center">
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            40
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {convertText('Daqiqa')}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-center">
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            70%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {convertText("O'tish bali")}
          </div>
        </div>
      </div>

      {/* Version Info */}
      <div className="absolute bottom-4 text-xs text-gray-400 dark:text-gray-600">
        Desktop Edition
      </div>
    </div>
  );
}
