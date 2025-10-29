'use client';

import Link from 'next/link';
import { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { AndroidIcon, AppleIcon, WindowsIcon, LinuxIcon } from '../components/icons';

export default function DownloadPage() {
  const [language, setLanguage] = useState<'uz' | 'ru'>('uz');

  const content = {
    uz: {
      hero: {
        badge: 'Barcha platformalarda mavjud',
        title: 'Yuklab oling',
        titleHighlight: 'istalgan qurilmada',
        subtitle: 'Onless.uz ilovasi Android, iOS, Windows, Mac va Linux uchun mavjud. O\'zingizga qulay platformani tanlang va bugun o\'rganishni boshlang.'
      },
      platforms: {
        title: 'Platformalarni',
        titleHighlight: 'tanlang',
        mobile: {
          title: 'Mobil ilovalar',
          desc: 'Smartfon va planshetlaringiz uchun',
          android: {
            title: 'Android',
            desc: 'Android 8.0 va undan yuqori',
            size: '45 MB'
          },
          ios: {
            title: 'iOS',
            desc: 'iOS 13.0 va undan yuqori',
            size: '52 MB'
          }
        },
        desktop: {
          title: 'Desktop ilovalar',
          desc: 'Kompyuterlaringiz uchun to\'liq versiya',
          windows: {
            title: 'Windows',
            desc: 'Windows 10/11',
            size: '120 MB'
          },
          mac: {
            title: 'macOS',
            desc: 'macOS 11.0 va undan yuqori',
            size: '115 MB'
          },
          linux: {
            title: 'Linux',
            desc: 'Ubuntu, Fedora, Debian',
            size: '110 MB'
          }
        }
      },
      features: {
        title: 'Nima uchun',
        titleHighlight: 'bizning ilovamiz?',
        items: [
          {
            icon: '🚀',
            title: 'Tez va samarali',
            desc: 'Optimal ishlash va tezkor javob berish'
          },
          {
            icon: '🔄',
            title: 'Sinxronizatsiya',
            desc: 'Barcha qurilmalarda ma\'lumotlar sinxronlashadi'
          },
          {
            icon: '🔒',
            title: 'Xavfsizlik',
            desc: 'Ma\'lumotlaringiz shifrlangan va xavfsiz'
          },
          {
            icon: '📴',
            title: 'Offline rejim',
            desc: 'Internet aloqasisiz ham ishlaydi'
          },
          {
            icon: '🎨',
            title: 'Zamonaviy dizayn',
            desc: 'Intuitiv va chiroyli interfeys'
          },
          {
            icon: '🔔',
            title: 'Bildirishnomalar',
            desc: 'Muhim yangiliklardan xabardor bo\'ling'
          }
        ]
      },
      stats: {
        downloads: { label: 'Yuklanishlar', value: '50K+' },
        rating: { label: 'Reyting', value: '4.8' },
        reviews: { label: 'Sharhlar', value: '2K+' },
        users: { label: 'Faol foydalanuvchilar', value: '10K+' }
      },
      download: 'Yuklab olish',
      comingSoon: 'Tez orada'
    },
    ru: {
      hero: {
        badge: 'Доступно на всех платформах',
        title: 'Скачайте',
        titleHighlight: 'на любое устройство',
        subtitle: 'Приложение Onless.uz доступно для Android, iOS, Windows, Mac и Linux. Выберите удобную платформу и начните обучение сегодня.'
      },
      platforms: {
        title: 'Выберите',
        titleHighlight: 'платформу',
        mobile: {
          title: 'Мобильные приложения',
          desc: 'Для ваших смартфонов и планшетов',
          android: {
            title: 'Android',
            desc: 'Android 8.0 и выше',
            size: '45 МБ'
          },
          ios: {
            title: 'iOS',
            desc: 'iOS 13.0 и выше',
            size: '52 МБ'
          }
        },
        desktop: {
          title: 'Desktop приложения',
          desc: 'Полная версия для ваших компьютеров',
          windows: {
            title: 'Windows',
            desc: 'Windows 10/11',
            size: '120 МБ'
          },
          mac: {
            title: 'macOS',
            desc: 'macOS 11.0 и выше',
            size: '115 МБ'
          },
          linux: {
            title: 'Linux',
            desc: 'Ubuntu, Fedora, Debian',
            size: '110 МБ'
          }
        }
      },
      features: {
        title: 'Почему',
        titleHighlight: 'наше приложение?',
        items: [
          {
            icon: '🚀',
            title: 'Быстрое и эффективное',
            desc: 'Оптимальная производительность и быстрый отклик'
          },
          {
            icon: '🔄',
            title: 'Синхронизация',
            desc: 'Данные синхронизируются на всех устройствах'
          },
          {
            icon: '🔒',
            title: 'Безопасность',
            desc: 'Ваши данные зашифрованы и защищены'
          },
          {
            icon: '📴',
            title: 'Offline режим',
            desc: 'Работает даже без интернета'
          },
          {
            icon: '🎨',
            title: 'Современный дизайн',
            desc: 'Интуитивный и красивый интерфейс'
          },
          {
            icon: '🔔',
            title: 'Уведомления',
            desc: 'Будьте в курсе важных новостей'
          }
        ]
      },
      stats: {
        downloads: { label: 'Загрузок', value: '50K+' },
        rating: { label: 'Рейтинг', value: '4.8' },
        reviews: { label: 'Отзывов', value: '2K+' },
        users: { label: 'Активных пользователей', value: '10K+' }
      },
      download: 'Скачать',
      comingSoon: 'Скоро'
    }
  };

  const t = content[language];

  const platforms = {
    mobile: [
      {
        name: 'Android',
        IconComponent: AndroidIcon,
        color: 'from-green-500 to-teal-500',
        hoverColor: 'from-green-600 to-teal-600',
        data: t.platforms.mobile.android,
        available: true,
        store: 'Google Play',
        link: '#'
      },
      {
        name: 'iOS',
        IconComponent: AppleIcon,
        color: 'from-blue-500 to-indigo-500',
        hoverColor: 'from-blue-600 to-indigo-600',
        data: t.platforms.mobile.ios,
        available: true,
        store: 'App Store',
        link: '#'
      }
    ],
    desktop: [
      {
        name: 'Windows',
        IconComponent: WindowsIcon,
        color: 'from-blue-600 to-cyan-600',
        hoverColor: 'from-blue-700 to-cyan-700',
        data: t.platforms.desktop.windows,
        available: true,
        format: '.exe',
        link: '#'
      },
      {
        name: 'macOS',
        IconComponent: AppleIcon,
        color: 'from-gray-600 to-gray-800',
        hoverColor: 'from-gray-700 to-gray-900',
        data: t.platforms.desktop.mac,
        available: true,
        format: '.dmg',
        link: '#'
      },
      {
        name: 'Linux',
        IconComponent: LinuxIcon,
        color: 'from-orange-500 to-yellow-500',
        hoverColor: 'from-orange-600 to-yellow-600',
        data: t.platforms.desktop.linux,
        available: true,
        format: '.AppImage',
        link: '#'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Navigation language={language} setLanguage={setLanguage} />

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl top-20 left-10 animate-float" />
        <div className="absolute w-96 h-96 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl bottom-10 right-10 animate-float-delayed" />
        <div className="absolute w-64 h-64 bg-cyan-400/20 dark:bg-cyan-600/10 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full mb-8 animate-float">
              <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {t.hero.badge}
              </span>
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white mb-8 leading-tight">
              {t.hero.title}{' '}
              <br className="hidden sm:block" />
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 blur-3xl opacity-50 animate-pulse" />
                <span className="relative bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">
                  {t.hero.titleHighlight}
                </span>
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto">
              {t.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(t.stats).map(([key, stat], index) => (
              <div
                key={key}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-gray-200 dark:border-gray-700 shadow-xl text-center transform hover:scale-105 transition-all"
                style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
              >
                <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Apps Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 dark:text-white mb-4">
              {t.platforms.mobile.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t.platforms.mobile.desc}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {platforms.mobile.map((platform, index) => {
              const IconComponent = platform.IconComponent;
              return (
                <div
                  key={platform.name}
                  className="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 border-2 border-gray-200 dark:border-gray-700 shadow-2xl hover:shadow-3xl transition-all hover:scale-105 overflow-hidden"
                  style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

                  <div className="relative z-10">
                    <div className="mb-6 transform group-hover:scale-110 transition-transform flex justify-center">
                      <IconComponent className="h-24 w-24" />
                    </div>

                  <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
                    {platform.data.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {platform.data.desc}
                  </p>

                    <div className="flex items-center gap-2 mb-6 text-sm text-gray-500 dark:text-gray-500">
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full font-semibold">
                        {platform.data.size}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full font-semibold">
                        {platform.store}
                      </span>
                    </div>

                    <a
                      href={platform.link}
                      className={`block w-full px-8 py-4 bg-gradient-to-r ${platform.color} hover:${platform.hoverColor} text-white rounded-xl font-bold text-center transition-all shadow-lg hover:shadow-xl transform hover:scale-105`}
                    >
                      {t.download}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Desktop Apps Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 dark:text-white mb-4">
              {t.platforms.desktop.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t.platforms.desktop.desc}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {platforms.desktop.map((platform, index) => {
              const IconComponent = platform.IconComponent;
              return (
                <div
                  key={platform.name}
                  className="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 border-2 border-gray-200 dark:border-gray-700 shadow-2xl hover:shadow-3xl transition-all hover:scale-105 overflow-hidden"
                  style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

                  <div className="relative z-10">
                    <div className="mb-6 transform group-hover:scale-110 transition-transform flex justify-center">
                      <IconComponent className="h-24 w-24" />
                    </div>

                  <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
                    {platform.data.title}
                  </h3>

                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {platform.data.desc}
                    </p>

                    <div className="flex items-center gap-2 mb-6 text-sm text-gray-500 dark:text-gray-500">
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full font-semibold">
                        {platform.data.size}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full font-semibold">
                        {platform.format}
                      </span>
                    </div>

                    <a
                      href={platform.link}
                      className={`block w-full px-8 py-4 bg-gradient-to-r ${platform.color} hover:${platform.hoverColor} text-white rounded-xl font-bold text-center transition-all shadow-lg hover:shadow-xl transform hover:scale-105`}
                    >
                      {t.download}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 dark:text-white mb-4">
              {t.features.title}{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                {t.features.titleHighlight}
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.features.items.map((feature, index) => (
              <div
                key={index}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
              >
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
              {language === 'uz' ? 'Bugun boshlang!' : 'Начните сегодня!'}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {language === 'uz'
                ? 'O\'zingizga qulay platformani tanlang va imtihonga tayyorlanishni boshlang'
                : 'Выберите удобную платформу и начните подготовку к экзамену'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/exam"
                className="px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              >
                {language === 'uz' ? 'Imtihon topshirish' : 'Пройти экзамен'}
              </Link>
              <Link
                href="/"
                className="px-10 py-5 bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 rounded-2xl font-bold text-lg hover:bg-white/30 transition-all hover:scale-105"
              >
                {language === 'uz' ? 'Bosh sahifa' : 'Главная'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer language={language} />

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
