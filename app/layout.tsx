import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from './lib/contexts/ThemeContext';
import { LanguageProvider } from './lib/contexts/LanguageContext';

export const metadata: Metadata = {
  title: 'Onless.uz - Haydovchilik Imtihoni',
  description: 'O\'zbekiston Respublikasi haydovchilik nazariy imtihoni platformasi',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
