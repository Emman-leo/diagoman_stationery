import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/lib/hooks/useCart'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://diagoman-stationery.vercel.app'),
  title: {
    default: 'Diagoman — Stationery & Stamp Specialists, Accra',
    template: '%s | Diagoman',
  },
  description: 'Quality stationery, custom stamps and printing services in Accra, Ghana. Order online with delivery or pickup.',
  keywords: ['stationery Accra', 'custom stamps Ghana', 'printing services Accra', 'office supplies Ghana', 'Diagoman'],
  openGraph: {
    title: 'Diagoman — Stationery & Stamp Specialists',
    description: 'Quality stationery, custom stamps and printing in Accra, Ghana.',
    url: 'https://diagoman-stationery.vercel.app',
    siteName: 'Diagoman',
    locale: 'en_GH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diagoman — Stationery & Stamp Specialists',
    description: 'Quality stationery, custom stamps and printing in Accra, Ghana.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
