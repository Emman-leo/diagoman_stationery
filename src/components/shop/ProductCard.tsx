'use client'

import { Package } from 'lucide-react'
import { Product, Category } from '@/types'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, getCategoryName } from '@/lib/utils'
import { useCart } from '@/lib/hooks/useCart'

const LOW_STOCK_THRESHOLD = 20

type Props = {
  product: Product
  categories: Category[]
}

export function ProductCard({ product, categories }: Props) {
  const { addItem } = useCart()
  const categoryName = getCategoryName(product.category_id, categories)
  const isLowStock = product.stock_quantity < LOW_STOCK_THRESHOLD
  const isOutOfStock = product.stock_quantity === 0

  return (
    <Card className="flex h-full flex-col overflow-hidden border-tscolors-navy/10 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex aspect-square items-center justify-center bg-tscolors-cloud">
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <Package className="h-16 w-16 text-tscolors-navy/30" />
        )}
      </div>
      <CardContent className="flex flex-1 flex-col gap-2 p-4">
        <Badge variant="secondary" className="w-fit text-xs">
          {categoryName}
        </Badge>
        <h3 className="font-semibold text-tscolors-navy">{product.name}</h3>
        {product.description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
        )}
        <div className="mt-auto flex flex-wrap items-center gap-2">
          {product.has_fixed_price ? (
            <span className="text-lg font-bold text-tscolors-navy">
              {formatCurrency(product.price)}
            </span>
          ) : (
            <Badge className="bg-tscolors-gold/20 text-tscolors-gold-dark hover:bg-tscolors-gold/20">
              Price on request
            </Badge>
          )}
          {isLowStock && !isOutOfStock && (
            <Badge variant="destructive" className="text-xs">
              Low stock
            </Badge>
          )}
          {isOutOfStock && (
            <Badge variant="destructive">Out of stock</Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full bg-tscolors-navy hover:bg-tscolors-navy-light"
          disabled={isOutOfStock || !product.has_fixed_price}
          onClick={() => addItem(product)}
        >
          {product.has_fixed_price ? 'Add to Cart' : 'Request Quote'}
        </Button>
      </CardFooter>
    </Card>
  )
}
