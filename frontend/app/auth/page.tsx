'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [language, setLanguage] = useState<'uz' | 'ru'>('uz');

  const content = {
    uz: {
      login: {
        title: 'Kirish',
        email: 'Email',
        password: 'Parol',
        button: 'Kirish',
        noAccount: 'Akkauntingiz yo\'qmi?',
        register: 'Ro\'yxatdan o\'ting'
      },
      register: {
        title: 'Ro\'yxatdan o\'tish',
        name: 'Ism',
        email: 'Email',
        password: 'Parol',
        confirmPassword: 'Parolni tasdiqlang',
        button: 'Ro\'yxatdan o\'tish',
        hasAccount: 'Akkauntingiz bormi?',
        login: 'Kirish'
      }
    },
    ru: {
      login: {
        title: 'Вход',
        email: 'Email',
        password: 'Пароль',
        button: 'Войти',
        noAccount: 'Нет аккаунта?',
        register: 'Зарегистрироваться'
      },
      register: {
        title: 'Регистрация',
        name: 'Имя',
        email: 'Email',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
        button: 'Зарегистрироваться',
        hasAccount: 'Есть аккаунт?',
        login: 'Войти'
      }
    }
  };

  const t = mode === 'login' ? content[language].login : content[language].register;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-300 dark:bg-cyan-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and back button */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-4">
            <span>←</span>
            <span className="font-semibold">{language === 'uz' ? 'Bosh sahifaga' : 'На главную'}</span>
          </Link>
          <div className="flex justify-center items-center gap-2 mb-2">
            <div className="text-5xl">🚗</div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Onless.uz
            </span>
          </div>
        </div>

        {/* Auth card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
          {/* Language Switcher */}
          <div className="flex justify-end mb-6">
            <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setLanguage('uz')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  language === 'uz'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                UZ
              </button>
              <button
                onClick={() => setLanguage('ru')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  language === 'ru'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                RU
              </button>
            </div>
          </div>

          {/* Mode tabs */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                mode === 'login'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {content[language].login.title}
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                mode === 'register'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {content[language].register.title}
            </button>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.name}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white"
                  placeholder={t.name}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.email}
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white"
                placeholder={t.email}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.password}
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white"
                placeholder={t.password}
              />
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.confirmPassword}
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white"
                  placeholder={t.confirmPassword}
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
            >
              {t.button}
            </button>
          </form>

          {/* Additional links */}
          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            {mode === 'login' ? (
              <p>
                {t.noAccount}{' '}
                <button
                  onClick={() => setMode('register')}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                >
                  {t.register}
                </button>
              </p>
            ) : (
              <p>
                {t.hasAccount}{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                >
                  {t.login}
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Quick demo link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {language === 'uz' ? 'Yoki bepul demo versiyasini sinab ko\'ring' : 'Или попробуйте бесплатную демо-версию'}
          </p>
          <Link
            href="/exam"
            className="inline-block px-6 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700"
          >
            {language === 'uz' ? 'Demo imtihon' : 'Демо экзамен'}
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
