import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../components/theme-provider';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | クッキングアプリ',
    default: 'クッキングアプリ',
  },
  description:
    'AIでレシピを提案するクッキングアプリです。お手軽にレシピを提案します。',
  openGraph: {
    images: {
      url: 'https://cooking-app-coral.vercel.app/api/og',
      width: 1200,
      height: 630,
      alt: 'クッキングアプリ',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={cn(inter.className, 'min-h-dvh')}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
