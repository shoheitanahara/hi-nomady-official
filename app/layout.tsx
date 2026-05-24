import type { Metadata } from 'next';
import '../styles/globals.css';
import { Inter } from 'next/font/google';
import Header from '../components/layouts/header';
import { SpeedInsights } from '@vercel/speed-insights/next';

// RootLayoutPropsの型を定義
interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Hi-NOMADY Official | ハイノマディ公式サイト',
  description:
    'Hi-NOMADY Official site | ハイノマディ公式サイト。ライブ情報などをお届けします！',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body>
        <SpeedInsights />
        <Header />
        {children}
        <footer className="bg-gray-800 text-white p-4">
          <div className="container mx-auto text-center">
            <p>
              &copy; {new Date().getFullYear()} Hi-NOMADY. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
