import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TipButton from '@/components/TipButton'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'LocalPress - Your Neighborhood News Hub',
  description: 'Get hyper-local news for your zip code. Stay informed about what matters in your community with LocalPress.',
  keywords: 'local news, neighborhood news, zip code news, community updates, hyper-local journalism',
  authors: [{ name: 'LocalPress Team' }],
  creator: 'LocalPress',
  publisher: 'LocalPress',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://localpress.news',
    title: 'LocalPress - Your Neighborhood News Hub',
    description: 'Get hyper-local news for your zip code. Stay informed about what matters in your community.',
    siteName: 'LocalPress',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LocalPress - Your Neighborhood News Hub',
    description: 'Get hyper-local news for your zip code. Stay informed about what matters in your community.',
    creator: '@localpress',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#3B82F6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <TipButton />
      </body>
    </html>
  )
}