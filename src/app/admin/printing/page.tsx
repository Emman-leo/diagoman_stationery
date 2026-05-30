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
import { mockPrintRequests } from '@/data/mock'
import { PRINT_REQUEST_STATUSES } from '@/constants'
import {
  formatCurrency,
  formatDateTime,
  getPrintStatusConfig,
  cn,
} from '@/lib/utils'
import { PrintRequest } from '@/types'

export default function AdminPrintingPage() {
  const [statusFilter, setStatusFilter] = useState('all')
  const [selected, setSelected] = useState<PrintRequest | null>(null)
  const [quotePrice, setQuotePrice] = useState('')
  const [quoteNotes, setQuoteNotes] = useState('')

  const filtered = useMemo(() => {
    if (statusFilter === 'all') return mockPrintRequests
    return mockPrintRequests.filter(r => r.status === statusFilter)
  }, [statusFilter])

  const openRequest = (req: PrintRequest) => {
    setSelected(req)
    setQuotePrice(req.quoted_price?.toString() ?? '')
    setQuoteNotes(req.admin_notes ?? '')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-tscolors-navy sm:text-3xl">Print Requests</h1>
      <p className="mt-1 text-muted-foreground">Review and quote printing jobs</p>

      <div className="mt-6">
        <Select value={statusFilter} onValueChange={v => setStatusFilter(v ?? 'all')}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {PRINT_REQUEST_STATUSES.map(s => (
              <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border bg-white">
        <table className="w-full min-w-[600px] text-sm">
          <thead className="bg-tscolors-cloud text-left">
            <tr>
              <th className="px-4 py-3 font-medium text-tscolors-navy">Reference</th>
              <th className="px-4 py-3 font-medium text-tscolors-navy">Customer</th>
              <th className="px-4 py-3 font-medium text-tscolors-navy">Service</th>
              <th className="px-4 py-3 font-medium text-tscolors-navy">Qty</th>
              <th className="px-4 py-3 font-medium text-tscolors-navy">Quote</th>
              <th className="px-4 py-3 font-medium text-tscolors-navy">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(req => {
              const status = getPrintStatusConfig(req.status)
              return (
                <tr
                  key={req.id}
                  className="cursor-pointer border-t hover:bg-tscolors-cloud/50"
                  onClick={() => openRequest(req)}
                >
                  <td className="px-4 py-3 font-medium">{req.order_number}</td>
                  <td className="px-4 py-3">{req.customer_name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{req.service_type}</td>
                  <td className="px-4 py-3">{req.quantity}</td>
                  <td className="px-4 py-3">
                    {req.quoted_price != null ? formatCurrency(req.quoted_price) : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={cn('font-normal', status.color)}>{status.label}</Badge>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
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
                  <p className="text-muted-foreground">{formatDateTime(selected.created_at)}</p>
                </div>
                <Badge className={getPrintStatusConfig(selected.status).color}>
                  {getPrintStatusConfig(selected.status).label}
                </Badge>

                <Separator />

                <div className="space-y-2">
                  <p><span className="text-muted-foreground">Service:</span> {selected.service_type}</p>
                  <p><span className="text-muted-foreground">Quantity:</span> {selected.quantity}</p>
                  <p><span className="text-muted-foreground">Size:</span> {selected.size}</p>
                  <p><span className="text-muted-foreground">Finish:</span> {selected.finish}</p>
                </div>

                {selected.admin_notes && (
                  <p className="rounded-md bg-amber-50 p-3 text-amber-900">{selected.admin_notes}</p>
                )}

                <Separator />

                <div className="space-y-3">
                  <p className="font-medium text-tscolors-navy">Add Quote</p>
                  <div>
                    <Label htmlFor="quotePrice">Price (GH₵)</Label>
                    <Input
                      id="quotePrice"
                      type="number"
                      value={quotePrice}
                      onChange={e => setQuotePrice(e.target.value)}
                      className="mt-1"
                      placeholder="120.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quoteNotes">Admin notes</Label>
                    <Input
                      id="quoteNotes"
                      value={quoteNotes}
                      onChange={e => setQuoteNotes(e.target.value)}
                      className="mt-1"
                      placeholder="Artwork notes, turnaround..."
                    />
                  </div>
                  <Button className="w-full bg-tscolors-gold text-tscolors-navy hover:bg-tscolors-gold-light">
                    Save Quote
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
