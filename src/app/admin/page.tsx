import { ShoppingBag, Clock, Stamp } from 'lucide-react'
import { StatCard } from '@/components/admin/StatCard'
import { OrderTable } from '@/components/admin/OrderTable'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { mapOrder, mapStampRequest } from '@/lib/supabase/mappers'
import { getStampStatusConfig, cn } from '@/lib/utils'

export default async function AdminDashboardPage() {
  const supabase = await createServerSupabaseClient()

  const [
    { count: totalOrders },
    { count: pendingOrders },
    { count: stampRequests },
    { data: recentOrders },
    { data: recentStampRequests },
  ] = await Promise.all([
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('stamp_requests').select('*', { count: 'exact', head: true }),
    supabase
      .from('orders')
      .select('*, items:order_items(*)')
      .order('created_at', { ascending: false })
      .limit(5),
    supabase
      .from('stamp_requests')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(2),
  ])

  const orders = (recentOrders ?? []).map(row => mapOrder(row as Record<string, unknown>))
  const stampReqs = (recentStampRequests ?? []).map(row =>
    mapStampRequest(row as Record<string, unknown>)
  )

  return (
    <div>
      <h1 className="text-2xl font-bold text-tscolors-navy sm:text-3xl">Dashboard</h1>
      <p className="mt-1 text-muted-foreground">Overview of your store activity</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard icon={ShoppingBag} label="Total Orders" value={totalOrders ?? 0} trend={{ value: '+2 this week', positive: true }} />
        <StatCard icon={Clock} label="Pending Orders" value={pendingOrders ?? 0} />
        <StatCard icon={Stamp} label="Stamp Requests" value={stampRequests ?? 0} />
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-lg font-semibold text-tscolors-navy">Recent Orders</h2>
        <OrderTable orders={orders} compact />
      </div>

      <div className="mt-10">
        <Card>
          <CardHeader>
            <CardTitle className="text-tscolors-navy">Recent Stamp Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stampReqs.map(req => {
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
      </div>
    </div>
  )
}
