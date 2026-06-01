'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ShoppingCart, Stamp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/lib/hooks/useCart'
import { CartDrawer } from '@/components/shop/CartDrawer'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/stamp-request', label: 'Custom Stamps' },
  { href: '/track', label: 'Track Order' },
]

export function Navbar() {
  const { count } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 bg-tscolors-navy text-white shadow-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Stamp className="h-8 w-8 text-tscolors-gold" />
            <span className="text-xl font-bold tracking-tight">
              Diagoman
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/90 transition-colors hover:text-tscolors-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-white hover:bg-tscolors-navy-light hover:text-tscolors-gold"
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {count > 0 && (
                <Badge className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-tscolors-gold px-1 text-xs font-bold text-tscolors-navy">
                  {count}
                </Badge>
              )}
            </Button>
            <Link href="/order" className="hidden sm:block">
              <Button
                size="sm"
                className="bg-tscolors-gold font-semibold text-tscolors-navy hover:bg-tscolors-gold-light"
              >
                Checkout
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="text-white md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        <div
          className={cn(
            'border-t border-tscolors-navy-light md:hidden',
            mobileOpen ? 'block' : 'hidden'
          )}
        >
          <nav className="flex flex-col gap-1 px-4 py-3">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-tscolors-navy-light hover:text-tscolors-gold"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/order" onClick={() => setMobileOpen(false)}>
              <Button className="mt-2 w-full bg-tscolors-gold text-tscolors-navy hover:bg-tscolors-gold-light">
                Checkout
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  )
}
