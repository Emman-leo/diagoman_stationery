import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { OrderStatus, StampRequestStatus, PrintRequestStatus } from '@/types'
import { ORDER_STATUSES, STAMP_REQUEST_STATUSES, PRINT_REQUEST_STATUSES } from '@/constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-GH', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString('en-GH', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export function getStatusConfig(status: OrderStatus) {
  return ORDER_STATUSES.find(s => s.value === status) ?? ORDER_STATUSES[0]
}

export function getStampStatusConfig(status: StampRequestStatus) {
  return STAMP_REQUEST_STATUSES.find(s => s.value === status) ?? STAMP_REQUEST_STATUSES[0]
}

export function getPrintStatusConfig(status: PrintRequestStatus) {
  return PRINT_REQUEST_STATUSES.find(s => s.value === status) ?? PRINT_REQUEST_STATUSES[0]
}

export function generateOrderNumber(prefix: string = 'ORD'): string {
  const year = new Date().getFullYear()
  const random = Math.floor(1000 + Math.random() * 9000)
  return `${prefix}-${year}-${random}`
}

export function isValidGhanaPhone(phone: string): boolean {
  const cleaned = normalizePhone(phone)
  return /^0\d{9}$/.test(cleaned)
}

export function normalizePhone(phone: string): string {
  let cleaned = phone.replace(/\s/g, '')
  if (cleaned.startsWith('+233')) {
    cleaned = '0' + cleaned.slice(4)
  } else if (cleaned.startsWith('233') && cleaned.length === 12) {
    cleaned = '0' + cleaned.slice(3)
  } else if (/^\d{9}$/.test(cleaned)) {
    cleaned = '0' + cleaned
  }
  return cleaned
}

export function getCategoryName(categoryId: string, categories: { id: string; name: string }[]): string {
  return categories.find(c => c.id === categoryId)?.name ?? 'Uncategorized'
}
