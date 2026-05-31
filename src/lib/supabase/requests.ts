import { createClient } from '@/lib/supabase/client'

type StampPayload = {
  customer_name: string
  customer_phone: string
  stamp_type: string
  stamp_text: string
  size: string
  ink_color: string
}

type PrintPayload = {
  customer_name: string
  customer_phone: string
  service_type: string
  quantity: number
  size: string
  finish: string
}

export async function submitStampRequest(payload: StampPayload) {
  const supabase = createClient()

  const { data: rpcData, error: rpcError } = await supabase.rpc('create_stamp_request', {
    p_customer_name: payload.customer_name,
    p_customer_phone: payload.customer_phone,
    p_stamp_type: payload.stamp_type,
    p_stamp_text: payload.stamp_text,
    p_size: payload.size,
    p_ink_color: payload.ink_color,
  })

  if (!rpcError && rpcData) {
    const row = rpcData as { order_number?: string }
    return { orderNumber: row.order_number ?? null, error: null }
  }

  const { data, error } = await supabase
    .from('stamp_requests')
    .insert({
      customer_name: payload.customer_name,
      customer_phone: payload.customer_phone,
      stamp_type: payload.stamp_type,
      stamp_text: payload.stamp_text,
      size: payload.size,
      ink_color: payload.ink_color,
      status: 'pending',
    })
    .select('*')
    .maybeSingle()

  if (error || !data) {
    return {
      orderNumber: null,
      error: error?.message ?? rpcError?.message ?? 'Failed to submit request',
    }
  }

  return { orderNumber: data.order_number as string | null, error: null }
}

export async function submitPrintRequest(payload: PrintPayload) {
  const supabase = createClient()

  const { data: rpcData, error: rpcError } = await supabase.rpc('create_print_request', {
    p_customer_name: payload.customer_name,
    p_customer_phone: payload.customer_phone,
    p_service_type: payload.service_type,
    p_quantity: payload.quantity,
    p_size: payload.size,
    p_finish: payload.finish,
  })

  if (!rpcError && rpcData) {
    const row = rpcData as { order_number?: string }
    return { orderNumber: row.order_number ?? null, error: null }
  }

  const { data, error } = await supabase
    .from('print_requests')
    .insert({
      customer_name: payload.customer_name,
      customer_phone: payload.customer_phone,
      service_type: payload.service_type,
      quantity: payload.quantity,
      size: payload.size,
      finish: payload.finish,
      status: 'pending',
    })
    .select('*')
    .maybeSingle()

  if (error || !data) {
    return {
      orderNumber: null,
      error: error?.message ?? rpcError?.message ?? 'Failed to submit request',
    }
  }

  return { orderNumber: data.order_number as string | null, error: null }
}
