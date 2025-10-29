'use client';

import Link from 'next/link';

interface FooterProps {
  language: 'uz' | 'ru';
}

export default function Footer({ language }: FooterProps) {
  const content = {
    uz: {
      tagline: "O'zbekistonda birinchi raqamli haydovchilik maktabi platformasi",
      solutions: 'Yechimlar',
      platform: 'Platforma',
      company: 'Kompaniya',
      legal: 'Huquqiy',
      contact: 'Aloqa',
      rights: '© 2024 Onless.uz. Barcha huquqlar himoyalangan.',
      links: {
        students: 'Talabalar',
        mentors: 'Mentorlar',
        business: 'Biznes',
        investors: 'Investorlar',
        features: 'Imkoniyatlar',
        pricing: 'Narxlar',
        battle: 'Battle rejimi',
        about: 'Biz haqimizda',
        careers: 'Karyera',
        blog: 'Blog',
        privacy: 'Maxfiylik siyosati',
        terms: 'Foydalanish shartlari',
        cookies: 'Cookie siyosati'
      }
    },
    ru: {
      tagline: "Первая платформа цифровой автошколы в Узбекистане",
      solutions: 'Решения',
      platform: 'Платформа',
      company: 'Компания',
      legal: 'Правовая информация',
      contact: 'Контакты',
      rights: '© 2024 Onless.uz. Все права защищены.',
      links: {
        students: 'Студенты',
        mentors: 'Менторы',
        business: 'Бизнес',
        investors: 'Инвесторы',
        features: 'Возможности',
        pricing: 'Цены',
        battle: 'Режим битвы',
        about: 'О нас',
        careers: 'Карьера',
        blog: 'Блог',
        privacy: 'Политика конфиденциальности',
        terms: 'Условия использования',
        cookies: 'Политика cookie'
      }
    }
  };

  const t = content[language];

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-5xl">🚗</div>
              <span className="text-3xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Onless.uz
              </span>
            </div>
            <p className="text-gray-400 mb-8 leading-relaxed text-lg max-w-sm">
              {t.tagline}
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: '📘', label: 'Facebook', href: '#' },
                { icon: '📸', label: 'Instagram', href: '#' },
                { icon: '📱', label: 'Telegram', href: '#' },
                { icon: '▶', label: 'YouTube', href: '#' }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  className="w-12 h-12 bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 rounded-xl flex items-center justify-center text-2xl transition-all hover:scale-110 hover:shadow-lg"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-white font-black mb-6 text-lg">{t.solutions}</h4>
            <ul className="space-y-3">
              {[
                { label: t.links.students, href: '/solutions/students' },
                { label: t.links.mentors, href: '/solutions/mentors' },
                { label: t.links.business, href: '/solutions/business' },
                { label: t.links.investors, href: '/solutions/investors' }
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white font-black mb-6 text-lg">{t.platform}</h4>
            <ul className="space-y-3">
              {[
                { label: t.links.features, href: '/platform' },
                { label: t.links.pricing, href: '/pricing' },
                { label: t.links.battle, href: '/battle' }
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-black mb-6 text-lg">{t.company}</h4>
            <ul className="space-y-3">
              {[
                { label: t.links.about, href: '/about' },
                { label: t.links.careers, href: '/careers' },
                { label: t.links.blog, href: '/blog' }
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h5 className="text-white font-bold mb-4">{t.contact}</h5>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">📧</span>
                  <a href="mailto:info@onless.uz" className="hover:text-blue-400">info@onless.uz</a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">📱</span>
                  <a href="tel:+998991234567" className="hover:text-blue-400">+998 99 123 45 67</a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">📍</span>
                  <span>Toshkent, O'zbekiston</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">{t.rights}</p>
            <div className="flex flex-wrap gap-6 text-sm text-gray-500">
              <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                {t.links.privacy}
              </Link>
              <Link href="/terms" className="hover:text-blue-400 transition-colors">
                {t.links.terms}
              </Link>
              <Link href="/cookies" className="hover:text-blue-400 transition-colors">
                {t.links.cookies}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
