import { formatCurrency } from '@/lib/utils'

export type OrderEmailItem = {
  product_name: string
  quantity: number
  unit_price: number
  subtotal: number
}

export type OrderEmailPayload = {
  order_number: string
  customer_name: string
  customer_phone: string
  customer_email: string | null
  fulfillment_type: string
  subtotal: number
  delivery_fee: number
  total_amount: number
  notes: string | null
  items: OrderEmailItem[]
  delivery_address?: string | null
  delivery_area?: string | null
}

export function buildOrderNotificationSubject(orderNumber: string): string {
  return `New order ${orderNumber} — Diagoman`
}

export function buildOrderNotificationHtml(order: OrderEmailPayload): string {
  const itemsRows = order.items
    .map(
      item => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${escapeHtml(item.product_name)}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${item.quantity}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;">${formatCurrency(item.unit_price)}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;">${formatCurrency(item.subtotal)}</td>
      </tr>`
    )
    .join('')

  const deliveryBlock =
    order.fulfillment_type === 'delivery'
      ? `
      <p style="margin:16px 0 0;"><strong>Delivery address:</strong><br/>
      ${escapeHtml(order.delivery_address ?? '—')}<br/>
      <strong>Area / landmark:</strong> ${escapeHtml(order.delivery_area ?? '—')}</p>`
      : ''

  return `
<!DOCTYPE html>
<html>
<body style="font-family:system-ui,-apple-system,sans-serif;line-height:1.5;color:#0F2744;max-width:600px;margin:0 auto;padding:24px;">
  <h1 style="color:#0F2744;font-size:22px;margin:0 0 8px;">New order received</h1>
  <p style="margin:0 0 24px;color:#6b7280;">A customer just placed an order on the Diagoman shop.</p>

  <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
    <tr><td style="padding:6px 0;color:#6b7280;">Order number</td><td style="padding:6px 0;text-align:right;font-weight:700;color:#E8A020;">${escapeHtml(order.order_number)}</td></tr>
    <tr><td style="padding:6px 0;color:#6b7280;">Customer</td><td style="padding:6px 0;text-align:right;">${escapeHtml(order.customer_name)}</td></tr>
    <tr><td style="padding:6px 0;color:#6b7280;">Phone</td><td style="padding:6px 0;text-align:right;"><a href="tel:${escapeHtml(order.customer_phone)}">${escapeHtml(order.customer_phone)}</a></td></tr>
    ${order.customer_email ? `<tr><td style="padding:6px 0;color:#6b7280;">Email</td><td style="padding:6px 0;text-align:right;">${escapeHtml(order.customer_email)}</td></tr>` : ''}
    <tr><td style="padding:6px 0;color:#6b7280;">Fulfillment</td><td style="padding:6px 0;text-align:right;text-transform:capitalize;">${escapeHtml(order.fulfillment_type)}</td></tr>
  </table>

  <h2 style="font-size:16px;margin:0 0 12px;">Items</h2>
  <table style="width:100%;border-collapse:collapse;font-size:14px;">
    <thead>
      <tr style="background:#F5F6F8;">
        <th style="padding:8px 12px;text-align:left;">Product</th>
        <th style="padding:8px 12px;text-align:center;">Qty</th>
        <th style="padding:8px 12px;text-align:right;">Price</th>
        <th style="padding:8px 12px;text-align:right;">Subtotal</th>
      </tr>
    </thead>
    <tbody>${itemsRows}</tbody>
  </table>

  <table style="width:100%;margin-top:16px;font-size:14px;">
    <tr><td style="padding:4px 0;">Subtotal</td><td style="padding:4px 0;text-align:right;">${formatCurrency(order.subtotal)}</td></tr>
    <tr><td style="padding:4px 0;">Delivery fee</td><td style="padding:4px 0;text-align:right;">${formatCurrency(order.delivery_fee)}</td></tr>
    <tr><td style="padding:8px 0;font-weight:700;font-size:16px;">Total</td><td style="padding:8px 0;text-align:right;font-weight:700;font-size:16px;">${formatCurrency(order.total_amount)}</td></tr>
  </table>

  ${deliveryBlock}

  ${order.notes ? `<p style="margin:16px 0 0;"><strong>Notes:</strong> ${escapeHtml(order.notes)}</p>` : ''}

  <p style="margin:32px 0 0;font-size:13px;color:#9ca3af;">
    View and manage this order in the <a href="${escapeHtml(adminOrdersUrl())}" style="color:#E8A020;">admin panel</a>.
  </p>
</body>
</html>`
}

function adminOrdersUrl(): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://diagoman-stationery.vercel.app'
  return `${base.replace(/\/$/, '')}/admin/orders`
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
