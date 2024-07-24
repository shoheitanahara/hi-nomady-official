import type { Metadata } from 'next';
import '../styles/globals.css';
import { Inter } from 'next/font/google';
import Header from '../components/layouts/header';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from '@/components/theme-provider';

// RootLayoutPropsの型を定義
interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Hi-NOMADY Official',
  description: 'Hi-NOMADY Official site | ライブ情報などをお届けします！',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="jp">
      <body className="mt-5">
        <SpeedInsights  />
        {/*
        DarkModeの実装の影響
        Warning: Extra attributes from the server: class,style が
        発生するがきしなくてOK
        */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header className="fixed top-0 left-0 w-full z-50" /> {/* 固定ヘッダー */}
          {children}
          {/* フッターを追加 */}
          <footer className="bg-gray-800 text-white p-4">
            <div className="container mx-auto text-center">
              <p>&copy; {new Date().getFullYear()} Hi-NOMADY. All rights reserved.</p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
