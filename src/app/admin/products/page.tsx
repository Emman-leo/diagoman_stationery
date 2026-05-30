'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { mockProducts, mockCategories } from '@/data/mock'
import { formatCurrency, getCategoryName } from '@/lib/utils'

export default function AdminProductsPage() {
  const [addOpen, setAddOpen] = useState(false)

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-tscolors-navy sm:text-3xl">Products</h1>
          <p className="mt-1 text-muted-foreground">Manage your product catalogue</p>
        </div>
        <Button
          className="bg-tscolors-gold text-tscolors-navy hover:bg-tscolors-gold-light"
          onClick={() => setAddOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border bg-white">
        <table className="w-full min-w-[700px] text-sm">
          <thead className="bg-tscolors-cloud text-left">
            <tr>
              <th className="px-4 py-3 font-medium text-tscolors-navy">Image</th>
              <th className="px-4 py-3 font-medium text-tscolors-navy">Name</th>
              <th className="px-4 py-3 font-medium text-tscolors-navy">Category</th>
              <th className="px-4 py-3 font-medium text-tscolors-navy">Price</th>
              <th className="px-4 py-3 font-medium text-tscolors-navy">Stock</th>
              <th className="px-4 py-3 font-medium text-tscolors-navy">Status</th>
              <th className="px-4 py-3 font-medium text-tscolors-navy">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockProducts.map(product => (
              <tr key={product.id} className="border-t">
                <td className="px-4 py-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-tscolors-cloud">
                    <Package className="h-5 w-5 text-tscolors-navy/30" />
                  </div>
                </td>
                <td className="px-4 py-3 font-medium">{product.name}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {getCategoryName(product.category_id, mockCategories)}
                </td>
                <td className="px-4 py-3">
                  {product.has_fixed_price
                    ? formatCurrency(product.price)
                    : 'On request'}
                </td>
                <td className="px-4 py-3">{product.stock_quantity}</td>
                <td className="px-4 py-3">
                  <Badge variant={product.is_active ? 'default' : 'secondary'}>
                    {product.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon-xs" aria-label="Edit">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon-xs" className="text-destructive" aria-label="Delete">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-tscolors-navy">Add Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Product name</Label>
              <Input className="mt-1" placeholder="Product name" />
            </div>
            <div>
              <Label>Category</Label>
              <Select>
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {mockCategories.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Price (GH₵)</Label>
                <Input className="mt-1" type="number" placeholder="0.00" />
              </div>
              <div>
                <Label>Stock quantity</Label>
                <Input className="mt-1" type="number" placeholder="0" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button className="bg-tscolors-navy hover:bg-tscolors-navy-light">Save Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
