'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Stamp,
  LogOut,
  Menu,
  X,
  Store,
} from 'lucide-react'
import { useState } from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/stamps', label: 'Stamp Requests', icon: Stamp },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    setLoggingOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className="border-b border-tscolors-navy-light px-6 py-5">
        <Link href="/admin" className="flex items-center gap-2">
          <Stamp className="h-7 w-7 text-tscolors-gold" />
          <div>
            <p className="font-bold text-white">Diagoman</p>
            <p className="text-xs text-white/60">Admin Panel</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {links.map(link => {
          const Icon = link.icon
          const active = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href))
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-tscolors-gold text-tscolors-navy'
                  : 'text-white/80 hover:bg-tscolors-navy-light hover:text-white'
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="space-y-1 border-t border-tscolors-navy-light p-4">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'w-full justify-start gap-2 text-white/70 hover:bg-tscolors-navy-light hover:text-white'
          )}
        >
          <Store className="h-4 w-4" />
          Back to Shop
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-white/70 hover:bg-tscolors-navy-light hover:text-white"
          onClick={handleLogout}
          disabled={loggingOut}
        >
          <LogOut className="h-4 w-4" />
          {loggingOut ? 'Signing out...' : 'Sign out'}
        </Button>
      </div>
    </div>
  )

  return (
    <>
      <div className="flex h-14 items-center gap-3 border-b bg-tscolors-navy px-4 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </Button>
        <span className="font-semibold text-white">Diagoman Admin</span>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-tscolors-navy transition-transform lg:static lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {sidebarContent}
      </aside>
    </>
  )
}
