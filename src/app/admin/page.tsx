import { ShoppingBag, Clock, Stamp, Printer } from 'lucide-react'
import { StatCard } from '@/components/admin/StatCard'
import { OrderTable } from '@/components/admin/OrderTable'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  mockOrders,
  mockStampRequests,
  mockPrintRequests,
} from '@/data/mock'
import { getStampStatusConfig, getPrintStatusConfig, cn } from '@/lib/utils'

export default function AdminDashboardPage() {
  const pendingOrders = mockOrders.filter(o => o.status === 'pending').length

  return (
    <div>
      <h1 className="text-2xl font-bold text-tscolors-navy sm:text-3xl">Dashboard</h1>
      <p className="mt-1 text-muted-foreground">Overview of your store activity</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={ShoppingBag} label="Total Orders" value={mockOrders.length} trend={{ value: '+2 this week', positive: true }} />
        <StatCard icon={Clock} label="Pending Orders" value={pendingOrders} />
        <StatCard icon={Stamp} label="Stamp Requests" value={mockStampRequests.length} />
        <StatCard icon={Printer} label="Print Requests" value={mockPrintRequests.length} />
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-lg font-semibold text-tscolors-navy">Recent Orders</h2>
        <OrderTable orders={mockOrders} compact />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-tscolors-navy">Recent Stamp Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockStampRequests.map(req => {
                const status = getStampStatusConfig(req.status)
                return (
                  <div key={req.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div>
                      <p className="text-sm font-medium">{req.order_number}</p>
                      <p className="text-xs text-muted-foreground">{req.customer_name} · {req.stamp_type}</p>
                    </div>
                    <Badge className={cn('text-xs', status.color)}>{status.label}</Badge>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-tscolors-navy">Recent Print Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockPrintRequests.map(req => {
                const status = getPrintStatusConfig(req.status)
                return (
                  <div key={req.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div>
                      <p className="text-sm font-medium">{req.order_number}</p>
                      <p className="text-xs text-muted-foreground">{req.customer_name} · {req.service_type}</p>
                    </div>
                    <Badge className={cn('text-xs', status.color)}>{status.label}</Badge>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
