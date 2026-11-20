import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import './portal.css'
import { SITE_DESCRIPTION, SITE_TITLE, organizationJsonLd, websiteJsonLd } from '@/lib/seo'

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
  title: 'Surgical Tech Portal（サージカルテック）',
  description: SITE_DESCRIPTION,
  generator: 'v0.app',
  keywords: ['外科手術', 'ロボット手術', 'ダヴィンチ', 'hinotori', '医療DX', '内視鏡', '腹腔鏡', 'AI医療', '遠隔医療'],
  icons: {
    icon: [
      {
        url: '/favicon.ico',
      },
      {
        url: '/favicon.png',
        sizes: '64x64',
        type: 'image/png',
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
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }} />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
