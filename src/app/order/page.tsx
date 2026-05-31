'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Minus, Plus, Trash2, Package, CheckCircle } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/lib/hooks/useCart'
import { createClient } from '@/lib/supabase/client'
import { formatCurrency, isValidGhanaPhone, normalizePhone } from '@/lib/utils'
import { DELIVERY_FEE } from '@/constants'
import { FulfillmentType } from '@/types'

export default function OrderPage() {
  const { items, updateQuantity, removeItem, subtotal, clearCart } = useCart()
  const [fulfillment, setFulfillment] = useState<FulfillmentType>('pickup')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [area, setArea] = useState('')
  const [notes, setNotes] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const deliveryFee = fulfillment === 'delivery' ? DELIVERY_FEE : 0
  const total = subtotal + deliveryFee

  const validate = () => {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = 'Full name is required'
    if (!phone.trim()) e.phone = 'Phone number is required'
    else if (!isValidGhanaPhone(phone)) e.phone = 'Enter a valid Ghana phone (e.g. 0244123456)'
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email'
    if (fulfillment === 'delivery') {
      if (!address.trim()) e.address = 'Delivery address is required'
      if (!area.trim()) e.area = 'Area / landmark is required'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    setErrors({})

    const supabase = createClient()
    const normalizedPhone = normalizePhone(phone)
    const deliveryFeeAmount = fulfillment === 'delivery' ? DELIVERY_FEE : 0
    const totalAmount = subtotal + deliveryFeeAmount

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_name: name.trim(),
        customer_phone: normalizedPhone,
        customer_email: email.trim() || null,
        fulfillment_type: fulfillment,
        status: 'pending',
        subtotal,
        delivery_fee: deliveryFeeAmount,
        total_amount: totalAmount,
        notes: notes.trim() || null,
      })
      .select('id, order_number')
      .maybeSingle()

    if (orderError || !order) {
      setErrors({ submit: 'Failed to place order. Please try again.' })
      setSubmitting(false)
      return
    }

    const orderItems = items.map(i => ({
      order_id: order.id,
      product_id: i.product.id,
      product_name: i.product.name,
      unit_price: i.product.price,
      quantity: i.quantity,
      subtotal: i.product.price * i.quantity,
    }))

    const { error: itemsError } = await supabase.from('order_items').insert(orderItems)

    if (itemsError) {
      setErrors({ submit: 'Failed to place order. Please try again.' })
      setSubmitting(false)
      return
    }

    if (fulfillment === 'delivery') {
      await supabase.from('deliveries').insert({
        order_id: order.id,
        address: address.trim(),
        city: area.trim(),
        delivery_fee: DELIVERY_FEE,
      })
    }

    clearCart()
    setOrderNumber(order.order_number)
    setSubmitted(true)
    setSubmitting(false)
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-600" />
        <h1 className="mt-6 text-2xl font-bold text-tscolors-navy">Order Placed!</h1>
        <p className="mt-2 text-muted-foreground">Your order has been received.</p>
        <p className="mt-4 text-lg">
          Order number:{' '}
          <span className="font-bold text-tscolors-gold-dark">{orderNumber}</span>
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          We will contact you on {phone} to confirm your order. You can track status anytime.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/track"
            className={cn(buttonVariants(), 'bg-tscolors-navy text-white hover:bg-tscolors-navy-light')}
          >
            Track Order
          </Link>
          <Link href="/products" className={buttonVariants({ variant: 'outline' })}>
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <Package className="mx-auto h-16 w-16 text-muted-foreground" />
        <h1 className="mt-6 text-2xl font-bold text-tscolors-navy">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Add some products before checking out.</p>
        <Link
          href="/products"
          className={cn(
            buttonVariants(),
            'mt-6 inline-flex bg-tscolors-gold text-tscolors-navy hover:bg-tscolors-gold-light'
          )}
        >
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-tscolors-navy">Checkout</h1>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-tscolors-navy">Cart Items</h2>
          {items.map(item => (
            <Card key={item.product.id}>
              <CardContent className="flex gap-4 p-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md bg-tscolors-cloud">
                  <Package className="h-8 w-8 text-tscolors-navy/30" />
                </div>
                <div className="flex flex-1 flex-col">
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-tscolors-gold-dark font-semibold">
                    {formatCurrency(item.product.price)}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon-xs"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-6 text-center text-sm">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon-xs"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      className="ml-auto text-destructive"
                      onClick={() => removeItem(item.product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="font-semibold">
                  {formatCurrency(item.product.price * item.quantity)}
                </p>
              </CardContent>
            </Card>
          ))}
          <Card>
            <CardContent className="space-y-2 p-4 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery fee</span>
                <span>{formatCurrency(deliveryFee)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-base">
                <span>Total</span>
                <span className="text-tscolors-navy">{formatCurrency(total)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle className="text-tscolors-navy">Customer Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Full name *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="mt-1"
                  aria-invalid={!!errors.name}
                />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <Label htmlFor="phone">Phone number *</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="0244123456"
                  className="mt-1"
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email (optional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="mt-1"
                  aria-invalid={!!errors.email}
                />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
              </div>

              <div>
                <Label>Fulfillment type *</Label>
                <div className="mt-2 flex gap-2">
                  {(['pickup', 'delivery'] as FulfillmentType[]).map(type => (
                    <Button
                      key={type}
                      type="button"
                      variant={fulfillment === type ? 'default' : 'outline'}
                      className={fulfillment === type ? 'bg-tscolors-navy hover:bg-tscolors-navy-light' : ''}
                      onClick={() => setFulfillment(type)}
                    >
                      {type === 'pickup' ? 'Pickup' : 'Delivery'}
                    </Button>
                  ))}
                </div>
              </div>

              {fulfillment === 'delivery' && (
                <>
                  <div>
                    <Label htmlFor="address">Delivery address *</Label>
                    <Input
                      id="address"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      className="mt-1"
                      aria-invalid={!!errors.address}
                    />
                    {errors.address && <p className="mt-1 text-xs text-destructive">{errors.address}</p>}
                  </div>
                  <div>
                    <Label htmlFor="area">Area / landmark *</Label>
                    <Input
                      id="area"
                      value={area}
                      onChange={e => setArea(e.target.value)}
                      className="mt-1"
                      aria-invalid={!!errors.area}
                    />
                    {errors.area && <p className="mt-1 text-xs text-destructive">{errors.area}</p>}
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              </div>

              {errors.submit && (
                <p className="text-sm text-destructive">{errors.submit}</p>
              )}

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-tscolors-gold text-tscolors-navy hover:bg-tscolors-gold-light"
                size="lg"
              >
                {submitting ? 'Placing order...' : 'Place Order'}
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}
