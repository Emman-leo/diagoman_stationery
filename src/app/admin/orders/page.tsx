'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
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
import { ORDER_STATUSES } from '@/constants'
import { createClient } from '@/lib/supabase/client'
import { mapOrder } from '@/lib/supabase/mappers'
import {
  formatCurrency,
  formatDateTime,
  getStatusConfig,
} from '@/lib/utils'
import { Order, OrderStatus } from '@/types'

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selected, setSelected] = useState<Order | null>(null)
  const [statusUpdate, setStatusUpdate] = useState<OrderStatus | ''>('')
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('orders')
      .select('*, items:order_items(*)')
      .order('created_at', { ascending: false })
    setOrders((data ?? []).map(row => mapOrder(row as Record<string, unknown>)))
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const filtered = useMemo(() => {
    return orders.filter(o => {
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
  }, [search, statusFilter, orders])

  const openOrder = (order: Order) => {
    setSelected(order)
    setStatusUpdate(order.status)
  }

  const handleStatusUpdate = async (orderId: string, status: OrderStatus) => {
    const supabase = createClient()
    await supabase.from('orders').update({ status }).eq('id', orderId)
  }

  const handleSave = async () => {
    if (!selected || !statusUpdate) return
    setSaving(true)
    await handleStatusUpdate(selected.id, statusUpdate as OrderStatus)
    await load()
    setSelected(prev =>
      prev ? { ...prev, status: statusUpdate as OrderStatus } : null
    )
    setSaving(false)
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

                <Button
                  className="w-full bg-tscolors-navy hover:bg-tscolors-navy-light"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
