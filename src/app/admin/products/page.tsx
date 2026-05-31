'use client'

import { useCallback, useEffect, useState } from 'react'
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
import { ImageUpload } from '@/components/admin/ImageUpload'
import { createClient } from '@/lib/supabase/client'
import { deleteProductImage } from '@/lib/supabase/storage'
import { mapCategory, mapProduct } from '@/lib/supabase/mappers'
import { formatCurrency, getCategoryName } from '@/lib/utils'
import { Category, Product } from '@/types'

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [newName, setNewName] = useState('')
  const [newCategoryId, setNewCategoryId] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [newStock, setNewStock] = useState('')
  const [newActive, setNewActive] = useState(true)
  const [newImageUrl, setNewImageUrl] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const resetForm = () => {
    setNewName('')
    setNewCategoryId('')
    setNewPrice('')
    setNewStock('')
    setNewActive(true)
    setNewImageUrl(null)
    setEditingProduct(null)
  }

  const openAdd = () => {
    resetForm()
    setAddOpen(true)
  }

  const openEdit = (product: Product) => {
    setEditingProduct(product)
    setNewName(product.name)
    setNewCategoryId(product.category_id)
    setNewPrice(product.price.toString())
    setNewStock(product.stock_quantity.toString())
    setNewActive(product.is_active)
    setNewImageUrl(product.image_url)
    setEditOpen(true)
  }

  const load = useCallback(async () => {
    const supabase = createClient()
    const [{ data: prods }, { data: cats }] = await Promise.all([
      supabase
        .from('products')
        .select('*, category:categories(id, name, slug)')
        .order('name'),
      supabase.from('categories').select('*').order('name'),
    ])
    setProducts((prods ?? []).map(row => mapProduct(row as Record<string, unknown>)))
    setCategories((cats ?? []).map(row => mapCategory(row as Record<string, unknown>)))
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const handleAddProduct = async () => {
    if (!newName.trim() || !newCategoryId) return
    setSaving(true)
    const supabase = createClient()
    const { error } = await supabase.from('products').insert({
      name: newName.trim(),
      category_id: newCategoryId,
      price: Number(newPrice) || 0,
      stock_quantity: Number(newStock) || 0,
      low_stock_threshold: 10,
      has_fixed_price: true,
      is_active: true,
      image_url: newImageUrl,
    })
    setSaving(false)
    if (!error) {
      setAddOpen(false)
      resetForm()
      load()
    }
  }

  const handleUpdateProduct = async () => {
    if (!editingProduct || !newName.trim() || !newCategoryId) return
    setSaving(true)
    const supabase = createClient()

    if (!newImageUrl && editingProduct.image_url) {
      await deleteProductImage(editingProduct.image_url)
    }

    const { error } = await supabase
      .from('products')
      .update({
        name: newName.trim(),
        category_id: newCategoryId,
        price: Number(newPrice) || 0,
        stock_quantity: Number(newStock) || 0,
        is_active: newActive,
        image_url: newImageUrl,
      })
      .eq('id', editingProduct.id)
    setSaving(false)
    if (!error) {
      setEditOpen(false)
      resetForm()
      load()
    }
  }

  const handleDelete = async (id: string) => {
    const supabase = createClient()
    await supabase.from('products').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-tscolors-navy sm:text-3xl">Products</h1>
          <p className="mt-1 text-muted-foreground">Manage your product catalogue</p>
        </div>
        <Button
          className="bg-tscolors-gold text-tscolors-navy hover:bg-tscolors-gold-light"
          onClick={openAdd}
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
            {products.map(product => (
              <tr key={product.id} className="border-t">
                <td className="px-4 py-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-tscolors-cloud overflow-hidden">
                    {product.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Package className="h-5 w-5 text-tscolors-navy/30" />
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 font-medium">{product.name}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {product.category?.name ?? getCategoryName(product.category_id, categories)}
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
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      aria-label="Edit"
                      onClick={() => openEdit(product)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      className="text-destructive"
                      aria-label="Delete"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={addOpen} onOpenChange={open => { setAddOpen(open); if (!open) resetForm() }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-tscolors-navy">Add Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Product image</Label>
              <div className="mt-1">
                <ImageUpload
                  currentUrl={newImageUrl}
                  onUpload={url => setNewImageUrl(url)}
                  onRemove={() => setNewImageUrl(null)}
                />
              </div>
            </div>
            <div>
              <Label>Product name</Label>
              <Input
                className="mt-1"
                placeholder="Product name"
                value={newName}
                onChange={e => setNewName(e.target.value)}
              />
            </div>
            <div>
              <Label>Category</Label>
              <Select value={newCategoryId} onValueChange={v => setNewCategoryId(v ?? '')}>
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Price (GH₵)</Label>
                <Input
                  className="mt-1"
                  type="number"
                  placeholder="0.00"
                  value={newPrice}
                  onChange={e => setNewPrice(e.target.value)}
                />
              </div>
              <div>
                <Label>Stock quantity</Label>
                <Input
                  className="mt-1"
                  type="number"
                  placeholder="0"
                  value={newStock}
                  onChange={e => setNewStock(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button
              className="bg-tscolors-navy hover:bg-tscolors-navy-light"
              onClick={handleAddProduct}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Product'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={editOpen} onOpenChange={open => { setEditOpen(open); if (!open) resetForm() }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-tscolors-navy">Edit Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Product image</Label>
              <div className="mt-1">
                <ImageUpload
                  currentUrl={newImageUrl}
                  onUpload={url => setNewImageUrl(url)}
                  onRemove={() => setNewImageUrl(null)}
                />
              </div>
            </div>
            <div>
              <Label>Product name</Label>
              <Input
                className="mt-1"
                placeholder="Product name"
                value={newName}
                onChange={e => setNewName(e.target.value)}
              />
            </div>
            <div>
              <Label>Category</Label>
              <Select value={newCategoryId} onValueChange={v => setNewCategoryId(v ?? '')}>
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Price (GH₵)</Label>
                <Input
                  className="mt-1"
                  type="number"
                  placeholder="0.00"
                  value={newPrice}
                  onChange={e => setNewPrice(e.target.value)}
                />
              </div>
              <div>
                <Label>Stock quantity</Label>
                <Input
                  className="mt-1"
                  type="number"
                  placeholder="0"
                  value={newStock}
                  onChange={e => setNewStock(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label>Status</Label>
              <Select
                value={newActive ? 'active' : 'inactive'}
                onValueChange={v => setNewActive(v === 'active')}
              >
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button
              className="bg-tscolors-navy hover:bg-tscolors-navy-light"
              onClick={handleUpdateProduct}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
