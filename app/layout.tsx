import type { Metadata } from 'next';
import '../styles/globals.css';
import { Inter } from 'next/font/google';
import Header from '../components/layouts/header';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from "@/components/theme-provider";

// RootLayoutPropsの型を定義
interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Hi-NOMADY Officail',
  description: 'テスト入力',
};

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="jp">
      <body>
        <SpeedInsights />
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
