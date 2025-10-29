'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

export default function HomePage() {
  const [language, setLanguage] = useState<'uz' | 'ru'>('uz');
  const [counters, setCounters] = useState({ students: 0, tests: 0, success: 0, mentors: 0 });
  const [isCounterVisible, setIsCounterVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isCounterVisible) {
          setIsCounterVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isCounterVisible]);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      setCounters({
        students: Math.floor(10000 * progress),
        tests: Math.floor(500 * progress),
        success: Math.floor(95 * progress),
        mentors: Math.floor(50 * progress),
      });

      if (step >= steps) clearInterval(timer);
    }, interval);
  };

  const content = {
    uz: {
      hero: {
        badge: 'O\'zbekistonda birinchi raqamli platforma',
        title: 'Haydovchilik ta\'limi',
        titleHighlight: 'ekotizimi',
        subtitle: 'Talabalar, mentorlar, avtomaktablar va investorlar uchun to\'liq yechim. Nazariya, amaliyot va biznes bir joyda.',
        cta: 'Bepul boshlash',
        demo: 'Demo ko\'rish'
      },
      solutions: {
        title: 'Har bir ishtirokchi uchun',
        titleHighlight: 'maxsus yechim',
        students: {
          title: 'Talabalar',
          desc: 'Imtihonga tayyorgarlik, interaktiv testlar va professional mentorlar',
          features: ['500+ test savoli', 'Battle rejimi', 'Video darslar', 'Mobil ilovalar']
        },
        mentors: {
          title: 'Mentorlar',
          desc: 'O\'qiting, daromad qiling. 10-25% komissiya va referral bonuslar',
          features: ['3 daraja tizimi', 'Session boshqarish', 'Reyting tizimi', 'Bonuslar']
        },
        business: {
          title: 'Avtomaktablar',
          desc: 'B2B marketplace, white-label brending va to\'liq boshqaruv tizimi',
          features: ['White-label', 'Xodimlar boshqaruvi', 'Escrow to\'lovlar', 'Analytics']
        },
        investors: {
          title: 'Investorlar',
          desc: 'Moliyaviy dashboard, daromad va xarajatlar tahlili',
          features: ['Real-time hisobotlar', 'ROI tahlili', 'Prognozlar', 'Xarajat boshqaruvi']
        }
      },
      platform: {
        title: 'Kuchli',
        titleHighlight: 'platforma imkoniyatlari',
        features: [
          {
            icon: '🎯',
            title: 'Test tizimi',
            desc: 'Practice, Exam va Battle rejimlari',
            color: 'from-blue-500 to-cyan-500'
          },
          {
            icon: '📱',
            title: 'Multi-platform',
            desc: 'Web, iOS, Android, Desktop',
            color: 'from-purple-500 to-pink-500'
          },
          {
            icon: '🎨',
            title: 'White-label',
            desc: 'O\'z brendingiz ostida ishga tushiring',
            color: 'from-green-500 to-teal-500'
          },
          {
            icon: '⚔️',
            title: 'Battle rejimi',
            desc: 'Jonli duellar va turnirlar',
            color: 'from-orange-500 to-red-500'
          },
          {
            icon: '📊',
            title: 'Analytics',
            desc: 'Real-time tahlil va hisobotlar',
            color: 'from-indigo-500 to-blue-500'
          },
          {
            icon: '💰',
            title: 'Escrow tizimi',
            desc: 'Xavfsiz to\'lovlar va komissiyalar',
            color: 'from-yellow-500 to-orange-500'
          }
        ]
      },
      stats: {
        students: { label: 'Faol talabalar' },
        tests: { label: 'Test savollari' },
        success: { label: 'Muvaffaqiyat' },
        mentors: { label: 'Professional mentorlar' }
      },
      battle: {
        title: 'Battle rejimi',
        titleHighlight: '- o\'yinlashtirish',
        desc: 'Jonli 1v1 duellar, leaderboardlar va haftalik turnirlar. Bilimingizni sinab ko\'ring!',
        features: ['Real-time duellar', 'Mos raqiblar', 'Haftalik reytinglar', 'Sovrinlar'],
        cta: 'Battle haqida'
      },
      cta: {
        title: 'Bugun boshlang!',
        subtitle: 'O\'zingiz uchun mos yechimni toping',
        options: [
          { title: 'Talaba sifatida', desc: 'Imtihonga tayyorlan', link: '/solutions/students', icon: '🎓' },
          { title: 'Mentor sifatida', desc: 'Daromad qiling', link: '/solutions/mentors', icon: '👨‍🏫' },
          { title: 'Biznes sifatida', desc: 'Platformani ishga tushiring', link: '/solutions/business', icon: '🏢' },
          { title: 'Investor sifatida', desc: 'Moliya boshqaring', link: '/solutions/investors', icon: '💼' }
        ]
      }
    },
    ru: {
      hero: {
        badge: 'Первая цифровая платформа в Узбекистане',
        title: 'Экосистема',
        titleHighlight: 'обучения вождению',
        subtitle: 'Полное решение для студентов, менторов, автошкол и инвесторов. Теория, практика и бизнес в одном месте.',
        cta: 'Начать бесплатно',
        demo: 'Смотреть демо'
      },
      solutions: {
        title: 'Специальное решение',
        titleHighlight: 'для каждого участника',
        students: {
          title: 'Студенты',
          desc: 'Подготовка к экзамену, интерактивные тесты и профессиональные менторы',
          features: ['500+ тестовых вопросов', 'Battle режим', 'Видео уроки', 'Мобильные приложения']
        },
        mentors: {
          title: 'Менторы',
          desc: 'Учите и зарабатывайте. 10-25% комиссия и реферальные бонусы',
          features: ['3-уровневая система', 'Управление сессиями', 'Система рейтинга', 'Бонусы']
        },
        business: {
          title: 'Автошколы',
          desc: 'B2B маркетплейс, white-label брендинг и полная система управления',
          features: ['White-label', 'Управление персоналом', 'Escrow платежи', 'Аналитика']
        },
        investors: {
          title: 'Инвесторы',
          desc: 'Финансовая панель, анализ доходов и расходов',
          features: ['Отчеты в реальном времени', 'ROI анализ', 'Прогнозы', 'Управление расходами']
        }
      },
      platform: {
        title: 'Мощные возможности',
        titleHighlight: 'платформы',
        features: [
          {
            icon: '🎯',
            title: 'Система тестов',
            desc: 'Режимы Practice, Exam и Battle',
            color: 'from-blue-500 to-cyan-500'
          },
          {
            icon: '📱',
            title: 'Multi-platform',
            desc: 'Web, iOS, Android, Desktop',
            color: 'from-purple-500 to-pink-500'
          },
          {
            icon: '🎨',
            title: 'White-label',
            desc: 'Запустите под своим брендом',
            color: 'from-green-500 to-teal-500'
          },
          {
            icon: '⚔️',
            title: 'Battle режим',
            desc: 'Живые дуэли и турниры',
            color: 'from-orange-500 to-red-500'
          },
          {
            icon: '📊',
            title: 'Аналитика',
            desc: 'Анализ и отчеты в реальном времени',
            color: 'from-indigo-500 to-blue-500'
          },
          {
            icon: '💰',
            title: 'Escrow система',
            desc: 'Безопасные платежи и комиссии',
            color: 'from-yellow-500 to-orange-500'
          }
        ]
      },
      stats: {
        students: { label: 'Активных студентов' },
        tests: { label: 'Тестовых вопросов' },
        success: { label: 'Успешность' },
        mentors: { label: 'Профессиональных менторов' }
      },
      battle: {
        title: 'Battle режим',
        titleHighlight: '- геймификация',
        desc: 'Живые 1v1 дуэли, лидерборды и еженедельные турниры. Проверьте свои знания!',
        features: ['Дуэли в реальном времени', 'Подбор противников', 'Еженедельные рейтинги', 'Призы'],
        cta: 'О Battle режиме'
      },
      cta: {
        title: 'Начните сегодня!',
        subtitle: 'Найдите подходящее решение для себя',
        options: [
          { title: 'Как студент', desc: 'Готовьтесь к экзамену', link: '/solutions/students', icon: '🎓' },
          { title: 'Как ментор', desc: 'Зарабатывайте', link: '/solutions/mentors', icon: '👨‍🏫' },
          { title: 'Как бизнес', desc: 'Запустите платформу', link: '/solutions/business', icon: '🏢' },
          { title: 'Как инвестор', desc: 'Управляйте финансами', link: '/solutions/investors', icon: '💼' }
        ]
      }
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Navigation */}
      <Navigation language={language} setLanguage={setLanguage} />

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl"
          style={{
            top: `${20 + scrollY * 0.05}%`,
            left: `${10 + mousePosition.x * 0.01}%`,
            transition: 'all 0.3s ease-out'
          }}
        />
        <div
          className="absolute w-96 h-96 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl"
          style={{
            bottom: `${10 + scrollY * 0.03}%`,
            right: `${15 + mousePosition.y * 0.01}%`,
            transition: 'all 0.3s ease-out'
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full mb-8 animate-float">
              <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {t.hero.badge}
              </span>
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white mb-8 leading-tight">
              {t.hero.title}
              <br />
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

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/exam"
                className="px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-105"
              >
                {t.hero.cta}
              </Link>
              <Link
                href="/platform"
                className="px-10 py-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl border-2 border-gray-200 dark:border-gray-700 hover:scale-105 transition-all"
              >
                {t.hero.demo}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 dark:text-white mb-4">
              {t.solutions.title}{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                {t.solutions.titleHighlight}
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { key: 'students', color: 'from-blue-500 to-cyan-500', icon: '🎓', link: '/solutions/students' },
              { key: 'mentors', color: 'from-purple-500 to-pink-500', icon: '👨‍🏫', link: '/solutions/mentors' },
              { key: 'business', color: 'from-green-500 to-teal-500', icon: '🏢', link: '/solutions/business' },
              { key: 'investors', color: 'from-orange-500 to-red-500', icon: '💼', link: '/solutions/investors' }
            ].map((solution, index) => (
              <Link
                key={solution.key}
                href={solution.link}
                className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-gray-200 dark:border-gray-700 hover:border-transparent shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity`} />

                <div className="relative">
                  <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform">
                    {solution.icon}
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
                    {t.solutions[solution.key as keyof typeof t.solutions].title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {t.solutions[solution.key as keyof typeof t.solutions].desc}
                  </p>
                  <ul className="space-y-2">
                    {t.solutions[solution.key as keyof typeof t.solutions].features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="text-green-500">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={counterRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { key: 'students', color: 'from-blue-500 to-cyan-500', icon: '👨‍🎓' },
              { key: 'tests', color: 'from-green-500 to-teal-500', icon: '📝' },
              { key: 'success', color: 'from-purple-500 to-pink-500', icon: '🎯' },
              { key: 'mentors', color: 'from-orange-500 to-red-500', icon: '👨‍🏫' }
            ].map((stat) => (
              <div key={stat.key} className="text-center">
                <div className="text-5xl mb-4">{stat.icon}</div>
                <div className={`text-5xl font-black mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.key === 'students' && `${counters.students.toLocaleString()}+`}
                  {stat.key === 'tests' && `${counters.tests}+`}
                  {stat.key === 'success' && `${counters.success}%`}
                  {stat.key === 'mentors' && `${counters.mentors}+`}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-semibold">
                  {t.stats[stat.key as keyof typeof t.stats].label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 dark:text-white mb-4">
              {t.platform.title}{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                {t.platform.titleHighlight}
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.platform.features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all hover:scale-105"
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

          <div className="text-center mt-12">
            <Link
              href="/platform"
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold transition-all hover:scale-105 shadow-lg"
            >
              {language === 'uz' ? 'Barcha imkoniyatlar' : 'Все возможности'}
            </Link>
          </div>
        </div>
      </section>

      {/* Battle Mode Highlight */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-black text-gray-900 dark:text-white mb-4">
                {t.battle.title}{' '}
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  {t.battle.titleHighlight}
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {t.battle.desc}
              </p>
              <ul className="grid grid-cols-2 gap-4 mb-8">
                {t.battle.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-orange-500 text-xl">⚔️</span>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/battle"
                className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold transition-all hover:scale-105 shadow-lg"
              >
                {t.battle.cta}
              </Link>
            </div>
            <div className="text-9xl text-center">⚔️</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 dark:text-white mb-4">
              {t.cta.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t.cta.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.cta.options.map((option, index) => (
              <Link
                key={index}
                href={option.link}
                className="group bg-white dark:bg-gray-800 rounded-3xl p-8 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              >
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform">
                  {option.icon}
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">
                  {option.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {option.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer language={language} />

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
