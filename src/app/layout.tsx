import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { CartProvider } from '@/lib/hooks/useCart'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://diagoman.org'),
  title: {
    default: 'Diagoman — Custom Stamps & Stationery, Accra Ghana',
    template: '%s | Diagoman Accra',
  },
  description: 'Diagoman is Accra\'s trusted custom stamp maker and stationery supplier. Self-inking stamps, company stamps, date stamps and office stationery. Order online with delivery across Accra, Ghana.',
  keywords: [
    'custom stamps Accra',
    'rubber stamp maker Ghana',
    'self inking stamps Accra',
    'company stamp Ghana',
    'date stamp Ghana',
    'stationery shop Accra',
    'office supplies Ghana',
    'stamp maker Korlebu',
    'Diagoman',
    'stamps Ghana',
  ],
  openGraph: {
    title: 'Diagoman — Custom Stamps & Stationery, Accra',
    description: 'Accra\'s trusted custom stamp maker and stationery supplier. Self-inking stamps, company stamps, date stamps and office supplies delivered across Ghana.',
    url: 'https://diagoman.org',
    siteName: 'Diagoman',
    locale: 'en_GH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diagoman — Custom Stamps & Stationery, Accra',
    description: 'Accra\'s trusted custom stamp maker. Self-inking stamps, company stamps and office stationery delivered across Ghana.',
  },
  alternates: {
    canonical: 'https://diagoman.org',
  },
  other: {
    'sameAs': 'https://www.tiktok.com/@diagomanstationar6',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>{children}</CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
