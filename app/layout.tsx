import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { defaultLocale, isLocale } from '@/lib/i18n/config';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Hi-NOMADY Official | ハイノマディ公式サイト',
  description:
    'Hi-NOMADY Official site | ハイノマディ公式サイト。ライブ情報などをお届けします！',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const localeHeader = headerList.get('x-locale');
  const lang =
    localeHeader && isLocale(localeHeader) ? localeHeader : defaultLocale;

  return (
    <html lang={lang} className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body>
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
