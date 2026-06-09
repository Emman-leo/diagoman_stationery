import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import {
  buildOrderNotificationHtml,
  buildOrderNotificationSubject,
  type OrderEmailPayload,
} from '@/lib/emails/order-notification'
import { createAdminSupabaseClient } from '@/lib/supabase/admin'

export async function POST(request: Request) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL
  const resendKey = process.env.RESEND_API_KEY
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? 'Diagoman <onboarding@resend.dev>'

  if (!adminEmail || !resendKey) {
    console.error('Order notification: missing RESEND_API_KEY or ADMIN_NOTIFICATION_EMAIL')
    return NextResponse.json(
      { error: 'Email notifications are not configured' },
      { status: 503 }
    )
  }

  let body: { orderId?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const orderId = body.orderId
  if (!orderId || typeof orderId !== 'string') {
    return NextResponse.json({ error: 'orderId is required' }, { status: 400 })
  }

  const supabase = createAdminSupabaseClient()
  if (!supabase) {
    console.error('Order notification: missing SUPABASE_SERVICE_ROLE_KEY')
    return NextResponse.json(
      { error: 'Server configuration incomplete' },
      { status: 503 }
    )
  }

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select(
      `
      id,
      order_number,
      customer_name,
      customer_phone,
      customer_email,
      fulfillment_type,
      subtotal,
      delivery_fee,
      total_amount,
      notes,
      order_items ( product_name, quantity, unit_price, subtotal )
    `
    )
    .eq('id', orderId)
    .maybeSingle()

  if (orderError || !order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  }

  let delivery_address: string | null = null
  let delivery_area: string | null = null

  if (order.fulfillment_type === 'delivery') {
    const { data: delivery } = await supabase
      .from('deliveries')
      .select('address, city')
      .eq('order_id', orderId)
      .maybeSingle()
    delivery_address = delivery?.address ?? null
    delivery_area = delivery?.city ?? null
  }

  const items = (order.order_items ?? []) as OrderEmailPayload['items']
  const payload: OrderEmailPayload = {
    order_number: order.order_number,
    customer_name: order.customer_name,
    customer_phone: order.customer_phone,
    customer_email: order.customer_email,
    fulfillment_type: order.fulfillment_type,
    subtotal: Number(order.subtotal),
    delivery_fee: Number(order.delivery_fee),
    total_amount: Number(order.total_amount),
    notes: order.notes,
    items,
    delivery_address,
    delivery_area,
  }

  const resend = new Resend(resendKey)
  const { error: sendError } = await resend.emails.send({
    from: fromEmail,
    to: [adminEmail],
    subject: buildOrderNotificationSubject(order.order_number),
    html: buildOrderNotificationHtml(payload),
  })

  if (sendError) {
    console.error('Resend error:', sendError)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
