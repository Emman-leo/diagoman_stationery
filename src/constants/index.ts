export const ORDER_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'bg-amber-50 text-amber-800' },
  { value: 'processing', label: 'Processing', color: 'bg-blue-50 text-blue-800' },
  { value: 'printing', label: 'Printing', color: 'bg-violet-50 text-violet-800' },
  { value: 'ready', label: 'Ready for pickup', color: 'bg-gray-100 text-gray-700' },
  { value: 'out_for_delivery', label: 'Out for delivery', color: 'bg-teal-50 text-teal-800' },
  { value: 'completed', label: 'Completed', color: 'bg-green-50 text-green-800' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-50 text-red-800' },
]

export const STAMP_TYPES = [
  'Self-inking stamp',
  'Date stamp',
  'Company stamp',
  'Signature stamp',
  'Address stamp',
  'Custom design stamp',
]

export const STAMP_SIZES = [
  '20mm x 20mm',
  '30mm x 30mm',
  '40mm x 40mm',
  '50mm x 30mm',
  '60mm x 40mm',
  'Custom size',
]

export const STAMP_COLORS = [
  'Black',
  'Blue',
  'Red',
  'Green',
  'Violet',
]

export const PRINT_SERVICES = [
  'Business cards',
  'Flyers',
  'Banners',
  'Letterheads',
  'Posters',
  'Brochures',
  'Envelopes',
]

export const PRINT_SIZES = [
  'A3',
  'A4',
  'A5',
  'A6',
  '85mm x 55mm (business card)',
  'Custom size',
]

export const PRINT_FINISHES = [
  'Matte',
  'Gloss',
  'Satin',
  'Uncoated',
]

export const DELIVERY_FEE = 15.00

/** Local Ghana format (10 digits, leading 0) */
export const BUSINESS_PHONE = '0549232088'
export const BUSINESS_PHONE_DISPLAY = '054 923 2088'
export const BUSINESS_PHONE_TEL = 'tel:+233549232088'

export const BUSINESS_PHONE_2 = '0536669582'
export const BUSINESS_PHONE_2_DISPLAY = '0536669582'
export const BUSINESS_PHONE_2_TEL = 'tel:+233536669582'

/** Opens WhatsApp chat (international format without +) */
export const WHATSAPP_URL = 'https://wa.me/233549232088'
export const WHATSAPP_MESSAGE =
  'https://wa.me/233549232088?text=Hello%20Diagoman%2C%20I%20would%20like%20to%20enquire%20about...'

/** TikTok profile URL */
export const TIKTOK_URL = 'https://www.tiktok.com/@diagomanstationar6'

export const STAMP_REQUEST_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'bg-amber-50 text-amber-800' },
  { value: 'quoted', label: 'Quoted', color: 'bg-blue-50 text-blue-800' },
  { value: 'confirmed', label: 'Confirmed', color: 'bg-violet-50 text-violet-800' },
  { value: 'in_progress', label: 'In Progress', color: 'bg-teal-50 text-teal-800' },
  { value: 'completed', label: 'Completed', color: 'bg-green-50 text-green-800' },
]

export const PRINT_REQUEST_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'bg-amber-50 text-amber-800' },
  { value: 'quoted', label: 'Quoted', color: 'bg-blue-50 text-blue-800' },
  { value: 'confirmed', label: 'Confirmed', color: 'bg-violet-50 text-violet-800' },
  { value: 'in_progress', label: 'In Progress', color: 'bg-teal-50 text-teal-800' },
  { value: 'completed', label: 'Completed', color: 'bg-green-50 text-green-800' },
]
