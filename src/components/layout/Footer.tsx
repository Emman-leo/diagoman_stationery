import Link from 'next/link'
import { Stamp, Phone, MapPin, Clock } from 'lucide-react'

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
                <span>+233 24 000 0000</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-tscolors-gold" />
                <span>Osu, Accra, Ghana</span>
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
