'use client'

import { useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ProductCard } from '@/components/shop/ProductCard'
import { CategoryFilter } from '@/components/shop/CategoryFilter'
import { createClient } from '@/lib/supabase/client'
import { mapCategory, mapProduct } from '@/lib/supabase/mappers'
import { Product, Category } from '@/types'

export default function ProductsPage() {
  const [search, setSearch] = useState('')
  const [categoryId, setCategoryId] = useState<string | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    async function load() {
      const [{ data: cats }, { data: prods }] = await Promise.all([
        supabase.from('categories').select('*').order('name'),
        supabase
          .from('products')
          .select('*, category:categories(id, name, slug)')
          .eq('is_active', true)
          .order('name'),
      ])
      setCategories((cats ?? []).map(row => mapCategory(row as Record<string, unknown>)))
      setProducts((prods ?? []).map(row => mapProduct(row as Record<string, unknown>)))
      setLoading(false)
    }

    load()
  }, [])

  const filtered = useMemo(() => {
    return products.filter(p => {
      if (categoryId && p.category_id !== categoryId) return false
      if (search.trim()) {
        const q = search.toLowerCase()
        const cat = categories.find(c => c.id === p.category_id)
        return (
          p.name.toLowerCase().includes(q) ||
          (p.description?.toLowerCase().includes(q) ?? false) ||
          (cat?.name.toLowerCase().includes(q) ?? false)
        )
      }
      return true
    })
  }, [search, categoryId, products, categories])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-tscolors-navy">Products</h1>
        <p className="mt-2 text-muted-foreground">
          Browse our full range of stationery supplies
        </p>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="mb-6">
        <CategoryFilter
          categories={categories}
          selectedId={categoryId}
          onSelect={setCategoryId}
        />
      </div>

      {!loading && filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed bg-white py-16 text-center">
          <p className="text-lg font-medium text-tscolors-navy">No products found</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try adjusting your search or category filter
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} categories={categories} />
          ))}
        </div>
      )}
    </div>
  )
}
