'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function HomePage() {
  const [language, setLanguage] = useState<'uz' | 'ru'>('uz');

  const content = {
    uz: {
      hero: {
        title: 'Haydovchilik guvohnomangizni',
        titleHighlight: 'Onlayn',
        titleEnd: 'oling!',
        subtitle: 'Zamonaviy, interaktiv va samarali ta\'lim platformasi. Yangi qonunlar talablariga to\'liq mos.',
        ctaPrimary: 'Bepul sinab ko\'ring',
        ctaSecondary: 'Platformani o\'rganing',
      },
      features: {
        title: 'Nega aynan Onless.uz?',
        subtitle: 'Zamonaviy texnologiyalar va o\'yinlashtirish usullari bilan nazariy imtihonga tayyorlanish',
        items: [
          {
            icon: '🎯',
            title: 'Rasmiy test savollari',
            description: 'Yo\'l harakati qoidalariga asoslangan barcha kategoriyalar va savollar'
          },
          {
            icon: '📱',
            title: 'Istalgan joyda',
            description: 'Mobil, desktop yoki brauzerda - o\'zingizga qulay vaqt va joyda o\'rganing'
          },
          {
            icon: '💡',
            title: 'Batafsil izohlar',
            description: 'Har bir savol uchun to\'liq izoh va qoidalar bilan tanishing'
          },
          {
            icon: '📊',
            title: 'Taraqqiyotni kuzatish',
            description: 'Real vaqtda o\'z natijalaringizni ko\'ring va tahlil qiling'
          },
          {
            icon: '🎮',
            title: 'Gamifikatsiya',
            description: 'O\'yinlashtirish elementlari bilan qiziqarli va samarali o\'qish'
          },
          {
            icon: '👨‍🏫',
            title: 'Professional mentorlar',
            description: 'Malakali o\'qituvchilardan maslahat va yordam oling'
          }
        ]
      },
      pricing: {
        title: 'O\'zingizga mos tarifni tanlang',
        free: {
          name: 'Bepul',
          price: '0',
          features: [
            '20 ta bepul test',
            'Asosiy statistika',
            'Mobil ilova'
          ]
        },
        pro: {
          name: 'Pro',
          price: '49,000',
          features: [
            'Barcha testlar',
            'To\'liq statistika',
            'Video darslar',
            'Mentor yordami',
            'Oflayn rejim'
          ],
          popular: true
        },
        business: {
          name: 'Biznes',
          price: 'Kelishuv asosida',
          features: [
            'White-label brending',
            'O\'z o\'quvchilaringiz',
            'To\'liq moliyaviy hisobot',
            'Shaxsiy menejer'
          ]
        }
      },
      stats: {
        students: '10,000+',
        studentsLabel: 'Faol o\'quvchilar',
        tests: '500+',
        testsLabel: 'Test savollari',
        success: '95%',
        successLabel: 'Muvaffaqiyat darajasi',
        mentors: '50+',
        mentorsLabel: 'Professional mentorlar'
      },
      cta: {
        title: 'Bugun boshlang!',
        subtitle: 'Bepul sinov muddati bilan barcha imkoniyatlardan foydalaning',
        button: 'Ro\'yxatdan o\'tish'
      },
      footer: {
        about: 'Onless.uz — O\'zbekistonda birinchi raqamli haydovchilik maktabi platformasi',
        links: 'Foydali havolalar',
        contact: 'Aloqa',
        rights: '© 2024 Onless.uz. Barcha huquqlar himoyalangan.'
      }
    },
    ru: {
      hero: {
        title: 'Получите водительские права',
        titleHighlight: 'Онлайн',
        titleEnd: '!',
        subtitle: 'Современная, интерактивная и эффективная образовательная платформа. Полностью соответствует новым законам.',
        ctaPrimary: 'Попробуват бесплатно',
        ctaSecondary: 'Изучить платформу',
      },
      features: {
        title: 'Почему Onless.uz?',
        subtitle: 'Подготовка к теоретическому экзамену с использованием современных технологий и геймификации',
        items: [
          {
            icon: '🎯',
            title: 'Официальные тесты',
            description: 'Все категории и вопросы основаны на правилах дорожного движения'
          },
          {
            icon: '📱',
            title: 'Где угодно',
            description: 'Мобильное приложение, десктоп или браузер - учитесь когда и где удобно'
          },
          {
            icon: '💡',
            title: 'Подробные объяснения',
            description: 'Полное объяснение и правила для каждого вопроса'
          },
          {
            icon: '📊',
            title: 'Отслеживание прогресса',
            description: 'Смотрите и анализируйте свои результаты в реальном времени'
          },
          {
            icon: '🎮',
            title: 'Геймификация',
            description: 'Увлекательное и эффективное обучение с игровыми элементами'
          },
          {
            icon: '👨‍🏫',
            title: 'Профессиональные менторы',
            description: 'Получайте советы и помощь от квалифицированных преподавателей'
          }
        ]
      },
      pricing: {
        title: 'Выберите подходящий тариф',
        free: {
          name: 'Бесплатно',
          price: '0',
          features: [
            '20 бесплатных тестов',
            'Базовая статистика',
            'Мобильное приложение'
          ]
        },
        pro: {
          name: 'Pro',
          price: '49,000',
          features: [
            'Все тесты',
            'Полная статистика',
            'Видео уроки',
            'Помощь ментора',
            'Оффлайн режим'
          ],
          popular: true
        },
        business: {
          name: 'Бизнес',
          price: 'По договоренности',
          features: [
            'White-label брендинг',
            'Ваши ученики',
            'Полный финансовый отчет',
            'Личный менеджер'
          ]
        }
      },
      stats: {
        students: '10,000+',
        studentsLabel: 'Активных учеников',
        tests: '500+',
        testsLabel: 'Тестовых вопросов',
        success: '95%',
        successLabel: 'Успешность',
        mentors: '50+',
        mentorsLabel: 'Профессиональных менторов'
      },
      cta: {
        title: 'Начните сегодня!',
        subtitle: 'Воспользуйтесь всеми возможностями с бесплатным пробным периодом',
        button: 'Регистрация'
      },
      footer: {
        about: 'Onless.uz — первая платформа цифровой автошколы в Узбекистане',
        links: 'Полезные ссылки',
        contact: 'Контакты',
        rights: '© 2024 Onless.uz. Все права защищены.'
      }
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="text-3xl">🚗</div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                Onless.uz
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
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

              <Link
                href="/auth"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
              >
                {language === 'uz' ? 'Kirish' : 'Войти'}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              {t.hero.title}{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                {t.hero.titleHighlight}
              </span>
              {t.hero.titleEnd}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/exam"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                {t.hero.ctaPrimary}
              </Link>
              <button className="px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold text-lg transition-all shadow-md hover:shadow-lg border-2 border-gray-200 dark:border-gray-700">
                {t.hero.ctaSecondary}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{t.stats.students}</div>
              <div className="text-gray-600 dark:text-gray-400">{t.stats.studentsLabel}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">{t.stats.tests}</div>
              <div className="text-gray-600 dark:text-gray-400">{t.stats.testsLabel}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">{t.stats.success}</div>
              <div className="text-gray-600 dark:text-gray-400">{t.stats.successLabel}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">{t.stats.mentors}</div>
              <div className="text-gray-600 dark:text-gray-400">{t.stats.mentorsLabel}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t.features.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t.features.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.features.items.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-gray-200 dark:border-gray-700"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t.pricing.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Free */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t.pricing.free.name}
              </h3>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {t.pricing.free.price} <span className="text-xl text-gray-600 dark:text-gray-400">so'm</span>
              </div>
              <ul className="space-y-3 mb-8">
                {t.pricing.free.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/exam"
                className="block w-full py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-semibold text-center transition-colors"
              >
                {language === 'uz' ? 'Boshlash' : 'Начать'}
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-2xl p-8 relative transform scale-105 shadow-2xl">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                {language === 'uz' ? 'Ommabop' : 'Популярный'}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {t.pricing.pro.name}
              </h3>
              <div className="text-4xl font-bold text-white mb-6">
                {t.pricing.pro.price} <span className="text-xl">so'm</span>
              </div>
              <ul className="space-y-3 mb-8">
                {t.pricing.pro.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-yellow-300 mt-1">✓</span>
                    <span className="text-white">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/auth"
                className="block w-full py-3 bg-white hover:bg-gray-100 text-blue-600 rounded-lg font-semibold text-center transition-colors"
              >
                {language === 'uz' ? 'Xarid qilish' : 'Купить'}
              </Link>
            </div>

            {/* Business */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t.pricing.business.name}
              </h3>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t.pricing.business.price}
              </div>
              <ul className="space-y-3 mb-8">
                {t.pricing.business.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-semibold transition-colors">
                {language === 'uz' ? 'Bog\'lanish' : 'Связаться'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-700 dark:to-cyan-700 rounded-3xl p-12 shadow-2xl">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t.cta.title}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {t.cta.subtitle}
          </p>
          <Link
            href="/auth"
            className="inline-block px-10 py-4 bg-white hover:bg-gray-100 text-blue-600 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            {t.cta.button}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-3xl">🚗</div>
                <span className="text-2xl font-bold text-white">Onless.uz</span>
              </div>
              <p className="text-gray-400 mb-4">
                {t.footer.about}
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">{t.footer.links}</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400 transition-colors">{language === 'uz' ? 'Biz haqimizda' : 'О нас'}</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">{language === 'uz' ? 'Xizmatlar' : 'Услуги'}</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">{language === 'uz' ? 'Narxlar' : 'Цены'}</a></li>
                <li><Link href="/exam" className="hover:text-blue-400 transition-colors">{language === 'uz' ? 'Imtihon' : 'Экзамен'}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">{t.footer.contact}</h4>
              <ul className="space-y-2">
                <li>📧 info@onless.uz</li>
                <li>📱 +998 99 123 45 67</li>
                <li>📍 Toshkent, O'zbekiston</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500">{t.footer.rights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
