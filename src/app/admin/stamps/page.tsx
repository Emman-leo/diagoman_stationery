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
import { STAMP_REQUEST_STATUSES } from '@/constants'
import { createClient } from '@/lib/supabase/client'
import { mapStampRequest } from '@/lib/supabase/mappers'
import {
  formatCurrency,
  formatDateTime,
  getStampStatusConfig,
  cn,
} from '@/lib/utils'
import { StampRequest } from '@/types'

export default function AdminStampsPage() {
  const [requests, setRequests] = useState<StampRequest[]>([])
  const [statusFilter, setStatusFilter] = useState('all')
  const [selected, setSelected] = useState<StampRequest | null>(null)
  const [quotePrice, setQuotePrice] = useState('')
  const [quoteNotes, setQuoteNotes] = useState('')
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('stamp_requests')
      .select('*')
      .order('created_at', { ascending: false })
    setRequests((data ?? []).map(row => mapStampRequest(row as Record<string, unknown>)))
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const filtered = useMemo(() => {
    if (statusFilter === 'all') return requests
    return requests.filter(r => r.status === statusFilter)
  }, [statusFilter, requests])

  const openRequest = (req: StampRequest) => {
    setSelected(req)
    setQuotePrice(req.quoted_price?.toString() ?? '')
    setQuoteNotes(req.admin_notes ?? '')
  }

  const handleSaveQuote = async (id: string, price: number, notes: string) => {
    const supabase = createClient()
    await supabase
      .from('stamp_requests')
      .update({ quoted_price: price, admin_notes: notes, status: 'quoted' })
      .eq('id', id)
  }

  const handleSave = async () => {
    if (!selected) return
    setSaving(true)
    await handleSaveQuote(selected.id, Number(quotePrice), quoteNotes)
    await load()
    setSelected(null)
    setSaving(false)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-tscolors-navy sm:text-3xl">Stamp Requests</h1>
      <p className="mt-1 text-muted-foreground">Review and quote custom stamp orders</p>

      <div className="mt-6">
        <Select value={statusFilter} onValueChange={v => setStatusFilter(v ?? 'all')}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {STAMP_REQUEST_STATUSES.map(s => (
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
              <th className="px-4 py-3 font-medium text-tscolors-navy">Type</th>
              <th className="px-4 py-3 font-medium text-tscolors-navy">Quote</th>
              <th className="px-4 py-3 font-medium text-tscolors-navy">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(req => {
              const status = getStampStatusConfig(req.status)
              return (
                <tr
                  key={req.id}
                  className="cursor-pointer border-t hover:bg-tscolors-cloud/50"
                  onClick={() => openRequest(req)}
                >
                  <td className="px-4 py-3 font-medium">{req.order_number}</td>
                  <td className="px-4 py-3">{req.customer_name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{req.stamp_type}</td>
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
                <Badge className={getStampStatusConfig(selected.status).color}>
                  {getStampStatusConfig(selected.status).label}
                </Badge>

                <Separator />

                <div className="space-y-2">
                  <p><span className="text-muted-foreground">Type:</span> {selected.stamp_type}</p>
                  <p><span className="text-muted-foreground">Size:</span> {selected.size}</p>
                  <p><span className="text-muted-foreground">Ink:</span> {selected.ink_color}</p>
                  {selected.stamp_text && (
                    <div className="rounded-md bg-tscolors-cloud p-3">
                      <p className="text-xs text-muted-foreground mb-1">Stamp text</p>
                      <pre className="whitespace-pre-wrap font-sans text-sm">{selected.stamp_text}</pre>
                    </div>
                  )}
                </div>

                {selected.admin_notes && (
                  <p className="rounded-md bg-amber-50 p-3 text-amber-900">{selected.admin_notes}</p>
                )}

                <Separator />

                <div className="space-y-3">
                  <p className="font-medium text-tscolors-navy">Add Quote</p>
                  <div>
                    <Label htmlFor="quotePrice">Price ($)</Label>
                    <Input
                      id="quotePrice"
                      type="number"
                      value={quotePrice}
                      onChange={e => setQuotePrice(e.target.value)}
                      className="mt-1"
                      placeholder="85.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quoteNotes">Admin notes</Label>
                    <Input
                      id="quoteNotes"
                      value={quoteNotes}
                      onChange={e => setQuoteNotes(e.target.value)}
                      className="mt-1"
                      placeholder="Turnaround time, special instructions..."
                    />
                  </div>
                  <Button
                    className="w-full bg-tscolors-gold text-tscolors-navy hover:bg-tscolors-gold-light"
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Quote'}
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
