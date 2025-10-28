import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="uz">
      <body className="antialiased">{children}</body>
    </html>
  );
}
