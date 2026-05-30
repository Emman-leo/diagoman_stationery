'use client'

import { useMemo, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { OrderTable } from '@/components/admin/OrderTable'
import { mockOrders } from '@/data/mock'
import { ORDER_STATUSES } from '@/constants'
import {
  formatCurrency,
  formatDateTime,
  getStatusConfig,
} from '@/lib/utils'
import { Order, OrderStatus } from '@/types'

export default function AdminOrdersPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selected, setSelected] = useState<Order | null>(null)
  const [statusUpdate, setStatusUpdate] = useState<OrderStatus | ''>('')

  const filtered = useMemo(() => {
    return mockOrders.filter(o => {
      if (statusFilter !== 'all' && o.status !== statusFilter) return false
      if (search.trim()) {
        const q = search.toLowerCase()
        return (
          o.order_number.toLowerCase().includes(q) ||
          o.customer_name.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [search, statusFilter])

  const openOrder = (order: Order) => {
    setSelected(order)
    setStatusUpdate(order.status)
  }

  const displayStatus = selected
    ? (statusUpdate || selected.status) as OrderStatus
    : 'pending'

  return (
    <div>
      <h1 className="text-2xl font-bold text-tscolors-navy sm:text-3xl">Orders</h1>
      <p className="mt-1 text-muted-foreground">Manage customer orders</p>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row">
        <Input
          placeholder="Search by order # or customer..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select value={statusFilter} onValueChange={v => setStatusFilter(v ?? 'all')}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {ORDER_STATUSES.map(s => (
              <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-6">
        <OrderTable orders={filtered} onRowClick={openOrder} />
      </div>

      <Sheet open={!!selected} onOpenChange={open => !open && setSelected(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle className="text-tscolors-navy">{selected.order_number}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4 text-sm">
                <div>
                  <p className="font-medium">{selected.customer_name}</p>
                  <p className="text-muted-foreground">{selected.customer_phone}</p>
                  {selected.customer_email && (
                    <p className="text-muted-foreground">{selected.customer_email}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary">
                    {selected.fulfillment_type === 'pickup' ? 'Pickup' : 'Delivery'}
                  </Badge>
                  <Badge className={getStatusConfig(displayStatus).color}>
                    {getStatusConfig(displayStatus).label}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{formatDateTime(selected.created_at)}</p>

                <Separator />

                <div className="space-y-2">
                  <p className="font-medium">Items</p>
                  {selected.items.map(item => (
                    <div key={item.id} className="flex justify-between">
                      <span>{item.product_name} × {item.quantity}</span>
                      <span>{formatCurrency(item.subtotal)}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatCurrency(selected.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>{formatCurrency(selected.delivery_fee)}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{formatCurrency(selected.total_amount)}</span>
                  </div>
                </div>

                {selected.notes && (
                  <p className="rounded-md bg-tscolors-cloud p-3 text-muted-foreground">
                    {selected.notes}
                  </p>
                )}

                <div>
                  <Label>Update status</Label>
                  <Select
                    value={statusUpdate}
                    onValueChange={v => setStatusUpdate((v ?? '') as OrderStatus)}
                  >
                    <SelectTrigger className="mt-1 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ORDER_STATUSES.map(s => (
                        <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-tscolors-navy hover:bg-tscolors-navy-light">
                  Save Changes
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
