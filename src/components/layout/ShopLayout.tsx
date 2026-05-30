import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CartProvider } from '@/lib/hooks/useCart'

export function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-tscolors-cloud">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </CartProvider>
  )
}
