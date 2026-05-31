import {
  Category,
  Order,
  OrderItem,
  OrderStatus,
  PrintRequest,
  PrintRequestStatus,
  Product,
  StampRequest,
  StampRequestStatus,
  FulfillmentType,
} from '@/types'

export function mapCategory(row: Record<string, unknown>): Category {
  return {
    id: row.id as string,
    name: row.name as string,
    slug: row.slug as string,
    description: (row.description as string | null) ?? null,
    image_url: (row.image_url as string | null) ?? null,
  }
}

export function mapProduct(row: Record<string, unknown>): Product {
  const category = row.category as Record<string, unknown> | null | undefined
  return {
    id: row.id as string,
    category_id: row.category_id as string,
    category: category ? mapCategory(category) : undefined,
    name: row.name as string,
    description: (row.description as string | null) ?? null,
    price: Number(row.price),
    stock_quantity: Number(row.stock_quantity),
    low_stock_threshold:
      row.low_stock_threshold != null ? Number(row.low_stock_threshold) : undefined,
    image_url: (row.image_url as string | null) ?? null,
    has_fixed_price: Boolean(row.has_fixed_price),
    is_active: Boolean(row.is_active),
  }
}

export function mapOrderItem(row: Record<string, unknown>): OrderItem {
  return {
    id: row.id as string,
    order_id: row.order_id as string,
    product_name: row.product_name as string,
    unit_price: Number(row.unit_price),
    quantity: Number(row.quantity),
    subtotal: Number(row.subtotal),
  }
}

export function mapOrder(row: Record<string, unknown>): Order {
  const itemsRaw = (row.items as Record<string, unknown>[] | null) ?? []
  return {
    id: row.id as string,
    order_number: row.order_number as string,
    customer_name: row.customer_name as string,
    customer_phone: row.customer_phone as string,
    customer_email: (row.customer_email as string | null) ?? null,
    fulfillment_type: row.fulfillment_type as FulfillmentType,
    status: row.status as OrderStatus,
    subtotal: Number(row.subtotal),
    delivery_fee: Number(row.delivery_fee),
    total_amount: Number(row.total_amount),
    notes: (row.notes as string | null) ?? null,
    items: itemsRaw.map(mapOrderItem),
    created_at: row.created_at as string,
  }
}

export function mapStampRequest(row: Record<string, unknown>): StampRequest {
  return {
    id: row.id as string,
    order_number: row.order_number as string,
    customer_name: row.customer_name as string,
    customer_phone: row.customer_phone as string,
    stamp_type: row.stamp_type as string,
    stamp_text: (row.stamp_text as string | null) ?? null,
    size: (row.size as string | null) ?? null,
    ink_color: (row.ink_color as string | null) ?? null,
    logo_url: (row.logo_url as string | null) ?? null,
    quoted_price: row.quoted_price != null ? Number(row.quoted_price) : null,
    status: row.status as StampRequestStatus,
    admin_notes: (row.admin_notes as string | null) ?? null,
    created_at: row.created_at as string,
  }
}

export function mapPrintRequest(row: Record<string, unknown>): PrintRequest {
  return {
    id: row.id as string,
    order_number: row.order_number as string,
    customer_name: row.customer_name as string,
    customer_phone: row.customer_phone as string,
    service_type: row.service_type as string,
    quantity: Number(row.quantity),
    size: (row.size as string | null) ?? null,
    finish: (row.finish as string | null) ?? null,
    artwork_url: (row.artwork_url as string | null) ?? null,
    quoted_price: row.quoted_price != null ? Number(row.quoted_price) : null,
    status: row.status as PrintRequestStatus,
    admin_notes: (row.admin_notes as string | null) ?? null,
    created_at: row.created_at as string,
  }
}
