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
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15.65 3.46c.25.35.51.69.78 1.02a9.18 9.18 0 0 1-2.43 4.2 9.17 9.17 0 0 1-4.2 2.43c-.33.27-.67.53-1.02.78" />
    <path d="M9.14 17.66c1.36 1.36 3.57 1.36 4.93 0s1.36-3.57 0-4.93" />
    <path d="M14.07 11.14v6.43a2.36 2.36 0 0 1-2.36 2.36H6.58A2.36 2.36 0 0 1 4.22 17.6V6.58A2.36 2.36 0 0 1 6.58 4.22h6.43" />
    <path d="M15.03 3.16v6.43a2.36 2.36 0 0 0 2.36 2.36h4.42" />
    <path d="M18.45 13.54v4.27a2.36 2.36 0 0 1-2.36 2.36H11.82" />
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
