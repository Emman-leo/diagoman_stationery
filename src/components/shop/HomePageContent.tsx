import Link from 'next/link'
import { ArrowRight, Stamp, Package, ShoppingCart, Truck, CheckCircle } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { ProductCard } from '@/components/shop/ProductCard'
import { Category, Product } from '@/types'

type Props = {
  featuredProducts: Product[]
  categories: Category[]
}

const services = [
  {
    icon: Stamp,
    title: 'Custom Stamps',
    description: 'Self-inking, date, company and signature stamps made to your specifications.',
    href: '/stamp-request',
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

export function HomePageContent({ featuredProducts, categories }: Props) {
  return (
    <>
      {/* Hero */}
      <section
        className="relative min-h-[580px] flex items-center bg-tscolors-navy"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay so text is always readable */}
        <div className="absolute inset-0 bg-tscolors-navy/80" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl">
            <span className="inline-block text-tscolors-gold text-sm font-medium mb-4 tracking-widest uppercase">
              Accra's Stationery & Stamp Specialist
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Quality you can{' '}
              <span className="text-tscolors-gold">stamp on</span>
            </h1>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Diagoman is Accra's trusted stationery and custom stamp specialist.
              From everyday office supplies to bespoke stamps — we deliver quality you can count on.
We have a variety of stamps available in different designs. You can purchase them in bulk at wholesale prices.
Bulk orders welcome
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-tscolors-gold text-tscolors-navy font-semibold px-6 py-3 rounded-lg hover:bg-tscolors-gold-light transition-colors"
              >
                Browse Products
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/stamp-request"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                Order Custom Stamp
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-8 text-center text-2xl font-bold text-tscolors-navy">Our Services</h2>
        <div className="grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
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
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} categories={categories} />
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
