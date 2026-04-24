import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({ 
  subsets: ["latin"],
  variable: "--font-geist-sans",
})
const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.surgical-tech-portal.jp'),
  title: '外科DX・最新テクノロジー導入医局データベース',
  description: '日本全国の外科系医局におけるロボット手術、AI、VR、内視鏡、遠隔医療などの最新テクノロジー導入状況を可視化するデータベースです。',
  generator: 'v0.app',
  keywords: ['外科手術', 'ロボット手術', 'ダヴィンチ', 'hinotori', '医療DX', '内視鏡', '腹腔鏡', 'AI医療', '遠隔医療'],
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: '32x32',
      },
      {
        url: '/icon-dark-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: [
      {
        url: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: '外科DX・最新テクノロジー導入医局データベース',
    description: '日本全国の外科系医局におけるロボット手術、AI、VR、内視鏡、遠隔医療などの最新テクノロジー導入状況を可視化するデータベースです。',
    url: 'https://www.surgical-tech-portal.jp/',
    siteName: 'Surgical Tech Portal',
    images: [
      {
        url: '/ogp.png',
        width: 1200,
        height: 630,
        alt: '外科DX・最新テクノロジー導入医局データベース',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '外科DX・最新テクノロジー導入医局データベース',
    description: '日本全国の外科系医局におけるロボット手術、AI、VR、内視鏡、遠隔医療などの最新テクノロジー導入状況を可視化するデータベースです。',
    images: ['/ogp.png'],
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0f1a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className={`${geist.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
