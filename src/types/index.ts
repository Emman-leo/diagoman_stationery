export type Category = {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
}

export type Product = {
  id: string
  category_id: string
  category?: Category
  name: string
  description: string | null
  price: number
  stock_quantity: number
  low_stock_threshold?: number
  image_url: string | null
  has_fixed_price: boolean
  is_active: boolean
}

export type CartItem = {
  product: Product
  quantity: number
}

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'printing'
  | 'ready'
  | 'out_for_delivery'
  | 'completed'
  | 'cancelled'

export type FulfillmentType = 'pickup' | 'delivery'

export type Order = {
  id: string
  order_number: string
  customer_name: string
  customer_phone: string
  customer_email: string | null
  fulfillment_type: FulfillmentType
  status: OrderStatus
  subtotal: number
  delivery_fee: number
  total_amount: number
  notes: string | null
  items: OrderItem[]
  created_at: string
}

export type OrderItem = {
  id: string
  order_id: string
  product_name: string
  unit_price: number
  quantity: number
  subtotal: number
}

export type StampRequestStatus = 'pending' | 'quoted' | 'confirmed' | 'in_progress' | 'completed'

export type StampRequest = {
  id: string
  order_number: string
  customer_name: string
  customer_phone: string
  stamp_type: string
  stamp_text: string | null
  size: string | null
  ink_color: string | null
  logo_url: string | null
  quoted_price: number | null
  status: StampRequestStatus
  admin_notes: string | null
  created_at: string
}

export type PrintRequestStatus = 'pending' | 'quoted' | 'confirmed' | 'in_progress' | 'completed'

export type PrintRequest = {
  id: string
  order_number: string
  customer_name: string
  customer_phone: string
  service_type: string
  quantity: number
  size: string | null
  finish: string | null
  artwork_url: string | null
  quoted_price: number | null
  status: PrintRequestStatus
  admin_notes: string | null
  created_at: string
}
