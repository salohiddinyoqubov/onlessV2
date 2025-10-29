'use client';

import Link from 'next/link';
import { useState } from 'react';

interface NavigationProps {
  language: 'uz' | 'ru';
  setLanguage: (lang: 'uz' | 'ru') => void;
}

export default function Navigation({ language, setLanguage }: NavigationProps) {
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const content = {
    uz: {
      solutions: 'Yechimlar',
      platform: 'Platforma',
      pricing: 'Narxlar',
      battle: 'Battle',
      download: 'Yuklab olish',
      about: 'Biz haqimizda',
      login: 'Kirish',
      menu: {
        students: {
          title: 'Talabalar uchun',
          desc: 'Haydovchilik imtihoniga tayyorgarlik',
          icon: '🎓'
        },
        mentors: {
          title: 'Mentorlar uchun',
          desc: 'O\'qiting va daromad qiling',
          icon: '👨‍🏫'
        },
        business: {
          title: 'Biznes uchun',
          desc: 'Avtomaktab va kurslar',
          icon: '🏢'
        },
        investors: {
          title: 'Investorlar uchun',
          desc: 'Moliyaviy dashboard',
          icon: '💼'
        }
      }
    },
    ru: {
      solutions: 'Решения',
      platform: 'Платформа',
      pricing: 'Цены',
      battle: 'Битва',
      download: 'Скачать',
      about: 'О нас',
      login: 'Войти',
      menu: {
        students: {
          title: 'Для студентов',
          desc: 'Подготовка к экзамену',
          icon: '🎓'
        },
        mentors: {
          title: 'Для менторов',
          desc: 'Учите и зарабатывайте',
          icon: '👨‍🏫'
        },
        business: {
          title: 'Для бизнеса',
          desc: 'Автошколы и курсы',
          icon: '🏢'
        },
        investors: {
          title: 'Для инвесторов',
          desc: 'Финансовая панель',
          icon: '💼'
        }
      }
    }
  };

  const t = content[language];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border-b border-gray-200/50 dark:border-gray-800/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative text-4xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                🚗
              </div>
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 dark:from-blue-400 dark:via-cyan-400 dark:to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Onless.uz
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Solutions Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setIsSolutionsOpen(true)}
              onMouseLeave={() => setIsSolutionsOpen(false)}
            >
              <button className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors flex items-center gap-1">
                {t.solutions}
                <span className={`transform transition-transform ${isSolutionsOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {/* Mega Menu Dropdown */}
              {isSolutionsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="grid grid-cols-2 gap-4 p-6">
                    <Link
                      href="/solutions/students"
                      className="group p-4 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-5xl transform group-hover:scale-110 transition-transform">
                          {t.menu.students.icon}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {t.menu.students.title}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {t.menu.students.desc}
                          </div>
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/solutions/mentors"
                      className="group p-4 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-5xl transform group-hover:scale-110 transition-transform">
                          {t.menu.mentors.icon}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            {t.menu.mentors.title}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {t.menu.mentors.desc}
                          </div>
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/solutions/business"
                      className="group p-4 rounded-xl hover:bg-green-50 dark:hover:bg-green-900/20 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-5xl transform group-hover:scale-110 transition-transform">
                          {t.menu.business.icon}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                            {t.menu.business.title}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {t.menu.business.desc}
                          </div>
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/solutions/investors"
                      className="group p-4 rounded-xl hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-5xl transform group-hover:scale-110 transition-transform">
                          {t.menu.investors.icon}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                            {t.menu.investors.title}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {t.menu.investors.desc}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/platform" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">
              {t.platform}
            </Link>
            <Link href="/pricing" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">
              {t.pricing}
            </Link>
            <Link href="/battle" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">
              {t.battle}
            </Link>
            <Link href="/download" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">
              {t.download}
            </Link>
            <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">
              {t.about}
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex gap-1 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-1 border border-gray-200/50 dark:border-gray-700/50">
              <button
                onClick={() => setLanguage('uz')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  language === 'uz'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg scale-105'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                UZ
              </button>
              <button
                onClick={() => setLanguage('ru')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  language === 'ru'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg scale-105'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                RU
              </button>
            </div>

            <Link
              href="/auth"
              className="hidden lg:block group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10">{t.login}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 dark:text-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col gap-4">
              <div className="font-bold text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wide px-4">
                {t.solutions}
              </div>
              <Link href="/solutions/students" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                {t.menu.students.icon} {t.menu.students.title}
              </Link>
              <Link href="/solutions/mentors" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                {t.menu.mentors.icon} {t.menu.mentors.title}
              </Link>
              <Link href="/solutions/business" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                {t.menu.business.icon} {t.menu.business.title}
              </Link>
              <Link href="/solutions/investors" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                {t.menu.investors.icon} {t.menu.investors.title}
              </Link>

              <div className="border-t border-gray-200 dark:border-gray-800 my-2" />

              <Link href="/platform" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                {t.platform}
              </Link>
              <Link href="/pricing" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                {t.pricing}
              </Link>
              <Link href="/battle" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                {t.battle}
              </Link>
              <Link href="/download" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                {t.download}
              </Link>
              <Link href="/about" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                {t.about}
              </Link>

              <Link href="/auth" className="mx-4 mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl text-center">
                {t.login}
              </Link>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          animation: gradient 3s linear infinite;
        }
      `}</style>
    </nav>
  );
}
