'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ORDER_STATUSES } from '@/constants'
import { createClient } from '@/lib/supabase/client'
import { mapOrder } from '@/lib/supabase/mappers'
import {
  formatCurrency,
  formatDateTime,
  getStatusConfig,
  isValidGhanaPhone,
  normalizePhone,
  cn,
} from '@/lib/utils'
import { Order } from '@/types'

export default function TrackPage() {
  const [orderNumber, setOrderNumber] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [order, setOrder] = useState<Order | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [tracking, setTracking] = useState(false)

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs: Record<string, string> = {}
    if (!orderNumber.trim()) errs.orderNumber = 'Order number is required'
    if (!phone.trim()) errs.phone = 'Phone number is required'
    else if (!isValidGhanaPhone(phone)) errs.phone = 'Enter a valid Ghana phone number'
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setTracking(true)
    const supabase = createClient()

    const { data } = await supabase
      .from('orders')
      .select('*, items:order_items(*)')
      .eq('order_number', orderNumber.trim().toUpperCase())
      .eq('customer_phone', normalizePhone(phone))
      .single()

    setTracking(false)

    if (!data) {
      setOrder(null)
      setNotFound(true)
      return
    }

    setOrder(mapOrder(data as Record<string, unknown>))
    setNotFound(false)
  }

  const statusIndex = order
    ? ORDER_STATUSES.findIndex(s => s.value === order.status)
    : -1

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-tscolors-navy">Track Your Order</h1>
        <p className="mt-2 text-muted-foreground">
          Enter your order number and phone to see status
        </p>
      </div>

      <Card className="mt-8">
        <CardContent className="p-6">
          <form onSubmit={handleTrack} className="space-y-4">
            <div>
              <Label htmlFor="orderNumber">Order number</Label>
              <Input
                id="orderNumber"
                placeholder="ORD-2024-0001"
                value={orderNumber}
                onChange={e => setOrderNumber(e.target.value)}
                className="mt-1"
              />
              {errors.orderNumber && (
                <p className="mt-1 text-xs text-destructive">{errors.orderNumber}</p>
              )}
            </div>
            <div>
              <Label htmlFor="phone">Phone number</Label>
              <Input
                id="phone"
                placeholder="0244123456"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="mt-1"
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-destructive">{errors.phone}</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={tracking}
              className="w-full bg-tscolors-navy hover:bg-tscolors-navy-light"
            >
              <Search className="mr-2 h-4 w-4" />
              {tracking ? 'Tracking...' : 'Track Order'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {notFound && (
        <Card className="mt-6 border-amber-200 bg-amber-50">
          <CardContent className="p-6 text-center">
            <p className="font-medium text-amber-900">Order not found</p>
            <p className="mt-2 text-sm text-amber-800">
              Please check your order number and phone number and try again.
            </p>
          </CardContent>
        </Card>
      )}

      {order && (
        <div className="mt-8 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <CardTitle className="text-tscolors-navy">{order.order_number}</CardTitle>
                <Badge className={getStatusConfig(order.status).color}>
                  {getStatusConfig(order.status).label}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Placed {formatDateTime(order.created_at)}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ORDER_STATUSES.map((step, i) => {
                  const isActive = i <= statusIndex
                  const isCurrent = step.value === order.status
                  return (
                    <div key={step.value} className="flex items-start gap-3">
                      <div
                        className={cn(
                          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                          isActive
                            ? isCurrent
                              ? 'bg-tscolors-gold text-tscolors-navy ring-2 ring-tscolors-gold ring-offset-2'
                              : 'bg-tscolors-navy text-white'
                            : 'bg-gray-200 text-gray-500'
                        )}
                      >
                        {i + 1}
                      </div>
                      <div className="pt-1">
                        <p
                          className={cn(
                            'text-sm font-medium',
                            isActive ? 'text-tscolors-navy' : 'text-muted-foreground'
                          )}
                        >
                          {step.label}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-tscolors-navy">Order Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {order.items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.product_name} × {item.quantity}
                  </span>
                  <span className="font-medium">{formatCurrency(item.subtotal)}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{formatCurrency(order.total_amount)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-tscolors-navy">Customer Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><span className="text-muted-foreground">Name:</span> {order.customer_name}</p>
              <p><span className="text-muted-foreground">Phone:</span> {order.customer_phone}</p>
              {order.customer_email && (
                <p><span className="text-muted-foreground">Email:</span> {order.customer_email}</p>
              )}
              <p>
                <span className="text-muted-foreground">Fulfillment:</span>{' '}
                {order.fulfillment_type === 'pickup' ? 'Pickup' : 'Delivery'}
              </p>
              {order.notes && (
                <p><span className="text-muted-foreground">Notes:</span> {order.notes}</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
