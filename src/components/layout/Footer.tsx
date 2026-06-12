import Link from 'next/link'
import { Stamp, Phone, MapPin, Clock, MessageCircle } from 'lucide-react'
import {
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_PHONE_TEL,
  BUSINESS_PHONE_2_DISPLAY,
  BUSINESS_PHONE_2_TEL,
  WHATSAPP_URL,
  TIKTOK_URL,
} from '@/constants'

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
  >
    <path
      d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.03-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.08 4.43-.12.37-.24.74-.41 1.05-.17.31-.37.6-.57.89-1.01.99-2.57 1.54-4.06 1.15-.68-.18-1.34-.45-1.93-.82-1.37-.85-2.35-2.12-2.86-3.65-.18-.57-.25-1.18-.21-1.78.07-1.25.49-2.42 1.2-3.46.83-1.23 2.05-2.12 3.52-2.43 1.25-.26 2.53-.13 3.78.27.48.15.93.37 1.36.62.01-2.06.01-4.12.01-6.17z"
      fill="#FF0050"
      style={{ transform: 'translate(0.5px, 0.5px)' }}
    />
    <path
      d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.03-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.08 4.43-.12.37-.24.74-.41 1.05-.17.31-.37.6-.57.89-1.01.99-2.57 1.54-4.06 1.15-.68-.18-1.34-.45-1.93-.82-1.37-.85-2.35-2.12-2.86-3.65-.18-.57-.25-1.18-.21-1.78.07-1.25.49-2.42 1.2-3.46.83-1.23 2.05-2.12 3.52-2.43 1.25-.26 2.53-.13 3.78.27.48.15.93.37 1.36.62.01-2.06.01-4.12.01-6.17z"
      fill="#00F2EA"
      style={{ transform: 'translate(-0.5px, -0.5px)' }}
    />
    <path
      d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.03-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.08 4.43-.12.37-.24.74-.41 1.05-.17.31-.37.6-.57.89-1.01.99-2.57 1.54-4.06 1.15-.68-.18-1.34-.45-1.93-.82-1.37-.85-2.35-2.12-2.86-3.65-.18-.57-.25-1.18-.21-1.78.07-1.25.49-2.42 1.2-3.46.83-1.23 2.05-2.12 3.52-2.43 1.25-.26 2.53-.13 3.78.27.48.15.93.37 1.36.62.01-2.06.01-4.12.01-6.17z"
      fill="currentColor"
    />
  </svg>
)

export function Footer() {
  return (
    <footer className="bg-tscolors-navy-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Stamp className="h-7 w-7 text-tscolors-gold" />
              <span className="text-lg font-bold">Diagoman</span>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              Your trusted stationery and custom stamp specialists in Accra, Ghana.
              Quality products and professional service since day one.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-tscolors-gold">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/" className="hover:text-tscolors-gold">Home</Link></li>
              <li><Link href="/products" className="hover:text-tscolors-gold">Products</Link></li>
              <li><Link href="/stamp-request" className="hover:text-tscolors-gold">Custom Stamps</Link></li>
              <li><Link href="/track" className="hover:text-tscolors-gold">Track Order</Link></li>
              <li><Link href="/order" className="hover:text-tscolors-gold">Checkout</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-tscolors-gold">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-tscolors-gold" />
                <div className="flex flex-col gap-1">
                  <a href={BUSINESS_PHONE_TEL} className="hover:text-tscolors-gold">
                    {BUSINESS_PHONE_DISPLAY}
                  </a>
                  <a href={BUSINESS_PHONE_2_TEL} className="hover:text-tscolors-gold">
                    {BUSINESS_PHONE_2_DISPLAY}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-tscolors-gold" />
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-tscolors-gold"
                >
                  Chat on WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-2">
                <TikTokIcon className="mt-0.5 h-4 w-4 shrink-0 text-tscolors-gold" />
                <a
                  href={TIKTOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-tscolors-gold"
                >
                  Follow on TikTok
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-tscolors-gold" />
                <address className="not-italic text-white/70">
                  Korlebu, Accra<br />
                  Greater Accra, Ghana
                </address>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-tscolors-gold" />
                <span>Mon – Sat: 8:00 AM – 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-tscolors-navy py-4 text-center text-xs text-white/50">
        <p>© {new Date().getFullYear()} Diagoman Stationery. All rights reserved.</p>
        <p className="mt-2">
          <Link
            href="/admin/login"
            className="text-white/40 transition-colors hover:text-tscolors-gold"
          >
            Staff login
          </Link>
        </p>
      </div>
    </footer>
  )
}
