'use client'

import { Order } from '@/types'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate, getStatusConfig } from '@/lib/utils'
import { cn } from '@/lib/utils'

type Props = {
  orders: Order[]
  onRowClick?: (order: Order) => void
  compact?: boolean
}

export function OrderTable({ orders, onRowClick, compact }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full min-w-[600px] text-sm">
        <thead className="bg-tscolors-cloud text-left">
          <tr>
            <th className="px-4 py-3 font-medium text-tscolors-navy">Order #</th>
            <th className="px-4 py-3 font-medium text-tscolors-navy">Customer</th>
            {!compact && <th className="px-4 py-3 font-medium text-tscolors-navy">Phone</th>}
            <th className="px-4 py-3 font-medium text-tscolors-navy">Total</th>
            <th className="px-4 py-3 font-medium text-tscolors-navy">Status</th>
            <th className="px-4 py-3 font-medium text-tscolors-navy">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => {
            const status = getStatusConfig(order.status)
            return (
              <tr
                key={order.id}
                className={cn(
                  'border-t transition-colors',
                  onRowClick && 'cursor-pointer hover:bg-tscolors-cloud/50'
                )}
                onClick={() => onRowClick?.(order)}
              >
                <td className="px-4 py-3 font-medium text-tscolors-navy">
                  {order.order_number}
                </td>
                <td className="px-4 py-3">{order.customer_name}</td>
                {!compact && <td className="px-4 py-3 text-muted-foreground">{order.customer_phone}</td>}
                <td className="px-4 py-3 font-medium">{formatCurrency(order.total_amount)}</td>
                <td className="px-4 py-3">
                  <Badge className={cn('font-normal', status.color)}>
                    {status.label}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{formatDate(order.created_at)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {orders.length === 0 && (
        <p className="py-8 text-center text-muted-foreground">No orders found</p>
      )}
    </div>
  )
}
