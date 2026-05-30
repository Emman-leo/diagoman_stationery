import Link from 'next/link'
import { ArrowRight, Stamp, Printer, Package, ShoppingCart, Truck, CheckCircle } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { ProductCard } from '@/components/shop/ProductCard'
import { mockProducts, mockCategories } from '@/data/mock'

const featured = mockProducts.filter(p => p.has_fixed_price && p.is_active).slice(0, 4)

const services = [
  {
    icon: Stamp,
    title: 'Custom Stamps',
    description: 'Self-inking, date, company and signature stamps made to your specifications.',
    href: '/stamp-request',
  },
  {
    icon: Printer,
    title: 'Printing Services',
    description: 'Business cards, flyers, banners, letterheads and more — professional quality.',
    href: '/print-request',
  },
  {
    icon: Package,
    title: 'Stationery Supply',
    description: 'Pens, notebooks, paper, envelopes and everything your office needs.',
    href: '/products',
  },
]

const steps = [
  { icon: ShoppingCart, title: 'Browse & add to cart', description: 'Find stationery products and add them to your cart.' },
  { icon: CheckCircle, title: 'Fill your details', description: 'Enter your contact info and choose pickup or delivery.' },
  { icon: Truck, title: 'Pickup or delivery', description: 'Collect from our Accra shop or get it delivered to you.' },
]

export function HomePageContent() {
  return (
    <>
      <section className="bg-tscolors-navy px-4 py-16 text-white sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Quality you can{' '}
              <span className="text-tscolors-gold">stamp on</span>
            </h1>
            <p className="mt-6 text-lg text-white/80">
              Diagoman is Accra&apos;s trusted stationery, custom stamp and printing specialists.
              From everyday office supplies to bespoke stamps — we deliver quality you can count on.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'bg-tscolors-gold font-semibold text-tscolors-navy hover:bg-tscolors-gold-light'
                )}
              >
                Browse Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/stamp-request"
                className={cn(
                  buttonVariants({ size: 'lg', variant: 'outline' }),
                  'border-white/30 bg-transparent text-white hover:bg-white/10'
                )}
              >
                Order Custom Stamp
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-8 text-center text-2xl font-bold text-tscolors-navy">Our Services</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {services.map(s => {
            const Icon = s.icon
            return (
              <Card key={s.title} className="border-tscolors-navy/10 transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-tscolors-gold/20">
                    <Icon className="h-6 w-6 text-tscolors-gold-dark" />
                  </div>
                  <h3 className="font-semibold text-tscolors-navy">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                  <Link
                    href={s.href}
                    className="mt-4 inline-flex items-center text-sm font-medium text-tscolors-gold-dark hover:underline"
                  >
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      <section className="bg-white px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-tscolors-navy">Featured Products</h2>
            <Link href="/products" className="text-sm font-medium text-tscolors-gold-dark hover:underline">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} categories={mockCategories} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-8 text-center text-2xl font-bold text-tscolors-navy">How It Works</h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-tscolors-navy text-tscolors-gold">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-tscolors-gold">
                  Step {i + 1}
                </span>
                <h3 className="mt-2 font-semibold text-tscolors-navy">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="bg-tscolors-navy-dark px-4 py-12 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="text-2xl font-bold">Already placed an order?</h2>
            <p className="mt-2 text-white/70">Track your order status with your order number and phone.</p>
          </div>
          <Link
            href="/track"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'bg-tscolors-gold font-semibold text-tscolors-navy hover:bg-tscolors-gold-light'
            )}
          >
            Track Order
          </Link>
        </div>
      </section>
    </>
  )
}
