import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider';

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'RBAC Dashboard',
  description: 'Role-Based Access Control Management System',
  generator: 'v0.app',
  icons: {
    icon: [
      // 1. Ưu tiên SVG cho Light Mode (hoặc mặc định)
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
        media: '(prefers-color-scheme: light)',
      },
      // 2. Ưu tiên SVG cho Dark Mode
      {
        url: '/icon-dark.svg',
        type: 'image/svg+xml',
        media: '(prefers-color-scheme: dark)',
      },
      // 3. Fallback cho các trình duyệt không hỗ trợ media query trong icon (PNG)
      {
        url: '/icon-light-32x32.png',
        sizes: '32x32',
        type: 'image/png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        sizes: '32x32',
        type: 'image/png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    // Icon cho thiết bị iOS
    apple: [
      {
        url: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // 1. Thêm suppressHydrationWarning để tránh lỗi render giữa Server và Client
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        {/* 2. Bao bọc children bằng ThemeProvider với attribute="class" */}
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}