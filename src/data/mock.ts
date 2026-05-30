import { Category, Product, Order, StampRequest, PrintRequest } from '@/types'

export const mockCategories: Category[] = [
  { id: '1', name: 'Pens & Pencils', slug: 'pens-pencils', description: 'Ballpoints, gel pens, markers', image_url: null },
  { id: '2', name: 'Notebooks & Files', slug: 'notebooks-files', description: 'Exercise books, binders, folders', image_url: null },
  { id: '3', name: 'Envelopes & Paper', slug: 'envelopes-paper', description: 'A4 paper, envelopes, cardstock', image_url: null },
  { id: '4', name: 'Stamps', slug: 'stamps', description: 'Self-inking, date, company stamps', image_url: null },
  { id: '5', name: 'Markers & Highlighters', slug: 'markers', description: 'Permanent markers, highlighters', image_url: null },
]

export const mockProducts: Product[] = [
  { id: '1', category_id: '1', name: 'Bic Ballpoint Pen (Blue)', description: 'Smooth writing ballpoint pen, pack of 10', price: 5.00, stock_quantity: 100, image_url: null, has_fixed_price: true, is_active: true },
  { id: '2', category_id: '1', name: 'Stabilo Marker Set', description: 'Pack of 6 assorted colours', price: 18.00, stock_quantity: 40, image_url: null, has_fixed_price: true, is_active: true },
  { id: '3', category_id: '1', name: 'Faber-Castell Pencils', description: 'HB pencils, pack of 12', price: 12.00, stock_quantity: 60, image_url: null, has_fixed_price: true, is_active: true },
  { id: '4', category_id: '2', name: 'A4 Exercise Book', description: '96 pages, ruled, hard cover', price: 4.50, stock_quantity: 200, image_url: null, has_fixed_price: true, is_active: true },
  { id: '5', category_id: '2', name: 'Plastic File Folder', description: 'A4 clear cover binder', price: 7.00, stock_quantity: 80, image_url: null, has_fixed_price: true, is_active: true },
  { id: '6', category_id: '2', name: 'Spiral Notebook', description: 'A5 size, 200 pages', price: 9.00, stock_quantity: 75, image_url: null, has_fixed_price: true, is_active: true },
  { id: '7', category_id: '3', name: 'A4 Printing Paper', description: '80gsm, ream of 500 sheets', price: 45.00, stock_quantity: 60, image_url: null, has_fixed_price: true, is_active: true },
  { id: '8', category_id: '3', name: 'Brown Envelopes (A4)', description: 'Pack of 25 manila envelopes', price: 8.00, stock_quantity: 120, image_url: null, has_fixed_price: true, is_active: true },
  { id: '9', category_id: '4', name: 'Self-Inking Stamp', description: 'Custom text, up to 3 lines', price: 0, stock_quantity: 50, image_url: null, has_fixed_price: false, is_active: true },
  { id: '10', category_id: '4', name: 'Date Stamp', description: 'Adjustable date, self-inking', price: 35.00, stock_quantity: 30, image_url: null, has_fixed_price: true, is_active: true },
  { id: '11', category_id: '5', name: 'Permanent Marker (Black)', description: 'Waterproof, pack of 5', price: 14.00, stock_quantity: 90, image_url: null, has_fixed_price: true, is_active: true },
  { id: '12', category_id: '5', name: 'Highlighter Set', description: 'Pack of 5 assorted neon colours', price: 11.00, stock_quantity: 65, image_url: null, has_fixed_price: true, is_active: true },
]

export const mockOrders: Order[] = [
  {
    id: '1', order_number: 'ORD-2024-0001', customer_name: 'Kwame Mensah',
    customer_phone: '0244123456', customer_email: 'kwame@example.com',
    fulfillment_type: 'delivery', status: 'processing',
    subtotal: 62.00, delivery_fee: 15.00, total_amount: 77.00,
    notes: 'Please call before delivery', created_at: '2024-11-01T10:30:00Z',
    items: [
      { id: '1', order_id: '1', product_name: 'A4 Printing Paper', unit_price: 45.00, quantity: 1, subtotal: 45.00 },
      { id: '2', order_id: '1', product_name: 'Bic Ballpoint Pen (Blue)', unit_price: 5.00, quantity: 2, subtotal: 10.00 },
      { id: '3', order_id: '1', product_name: 'A4 Exercise Book', unit_price: 4.50, quantity: 1, subtotal: 4.50 },
    ],
  },
  {
    id: '2', order_number: 'ORD-2024-0002', customer_name: 'Abena Asante',
    customer_phone: '0557891234', customer_email: null,
    fulfillment_type: 'pickup', status: 'ready',
    subtotal: 25.00, delivery_fee: 0, total_amount: 25.00,
    notes: null, created_at: '2024-11-02T14:15:00Z',
    items: [
      { id: '4', order_id: '2', product_name: 'Stabilo Marker Set', unit_price: 18.00, quantity: 1, subtotal: 18.00 },
      { id: '5', order_id: '2', product_name: 'Plastic File Folder', unit_price: 7.00, quantity: 1, subtotal: 7.00 },
    ],
  },
  {
    id: '3', order_number: 'ORD-2024-0003', customer_name: 'Kofi Boateng',
    customer_phone: '0201456789', customer_email: 'kofi@example.com',
    fulfillment_type: 'delivery', status: 'pending',
    subtotal: 45.00, delivery_fee: 15.00, total_amount: 60.00,
    notes: null, created_at: '2024-11-03T09:00:00Z',
    items: [
      { id: '6', order_id: '3', product_name: 'A4 Printing Paper', unit_price: 45.00, quantity: 1, subtotal: 45.00 },
    ],
  },
]

export const mockStampRequests: StampRequest[] = [
  {
    id: '1', order_number: 'STM-2024-0001', customer_name: 'Ama Owusu',
    customer_phone: '0244987654', stamp_type: 'Company stamp',
    stamp_text: 'OWUSU & SONS LTD\nAccra, Ghana\nTel: 0244987654',
    size: '40mm x 40mm', ink_color: 'Blue', logo_url: null,
    quoted_price: 85.00, status: 'quoted', admin_notes: 'Standard company stamp, 2-3 days',
    created_at: '2024-11-01T11:00:00Z',
  },
  {
    id: '2', order_number: 'STM-2024-0002', customer_name: 'Yaw Darko',
    customer_phone: '0557112233', stamp_type: 'Self-inking stamp',
    stamp_text: 'RECEIVED\nDate:', size: '30mm x 30mm', ink_color: 'Red',
    logo_url: null, quoted_price: null, status: 'pending', admin_notes: null,
    created_at: '2024-11-03T08:30:00Z',
  },
]

export const mockPrintRequests: PrintRequest[] = [
  {
    id: '1', order_number: 'PRT-2024-0001', customer_name: 'Efua Mensah',
    customer_phone: '0201334455', service_type: 'Business cards',
    quantity: 500, size: '85mm x 55mm (business card)', finish: 'Matte',
    artwork_url: null, quoted_price: 120.00, status: 'confirmed',
    admin_notes: 'Artwork approved, printing starts tomorrow',
    created_at: '2024-11-02T16:00:00Z',
  },
  {
    id: '2', order_number: 'PRT-2024-0002', customer_name: 'Nana Adjei',
    customer_phone: '0244778899', service_type: 'Flyers',
    quantity: 1000, size: 'A5', finish: 'Gloss',
    artwork_url: null, quoted_price: null, status: 'pending',
    admin_notes: null, created_at: '2024-11-03T10:00:00Z',
  },
]
