
import type {Metadata, Viewport} from 'next';
import './globals.css';
import { Navigation } from '@/components/Navigation';
import { QuickAdd } from '@/components/QuickAdd';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'BuildKhata | Luxury Fintech for Architects',
  description: 'Premium financial transaction manager for project-based businesses.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'BuildKhata',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="font-body antialiased bg-background min-h-screen pb-32 overflow-x-hidden">
        <main className="max-w-md mx-auto min-h-screen relative shadow-[0_0_100px_rgba(0,0,0,0.5)] bg-background">
          {children}
        </main>
        <QuickAdd />
        <Navigation />
        <Toaster />
      </body>
    </html>
  );
}
