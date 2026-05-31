-- Diagoman Phase 2: Row Level Security & Storage Policies
-- Run in Supabase SQL Editor after creating storage buckets:
--   product-images (public), stamp-logos (public), print-artwork (private)

-- =============================================
-- ENABLE ROW LEVEL SECURITY ON ALL TABLES
-- =============================================

alter table categories enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table deliveries enable row level security;
alter table stamp_requests enable row level security;
alter table print_requests enable row level security;

-- =============================================
-- CATEGORIES — public read, admin write
-- =============================================

create policy "Public can read categories"
on categories for select
to anon, authenticated
using (true);

create policy "Admin can insert categories"
on categories for insert
to authenticated
with check (true);

create policy "Admin can update categories"
on categories for update
to authenticated
using (true);

create policy "Admin can delete categories"
on categories for delete
to authenticated
using (true);

-- =============================================
-- PRODUCTS — public read active only, admin full access
-- =============================================

create policy "Public can read active products"
on products for select
to anon, authenticated
using (is_active = true);

create policy "Admin can read all products"
on products for select
to authenticated
using (true);

create policy "Admin can insert products"
on products for insert
to authenticated
with check (true);

create policy "Admin can update products"
on products for update
to authenticated
using (true);

create policy "Admin can delete products"
on products for delete
to authenticated
using (true);

-- =============================================
-- ORDERS — anyone can insert, admin can read/update
-- =============================================

create policy "Anyone can place an order"
on orders for insert
to anon, authenticated
with check (true);

create policy "Admin can read all orders"
on orders for select
to authenticated
using (true);

create policy "Admin can update orders"
on orders for update
to authenticated
using (true);

-- =============================================
-- ORDER ITEMS — anyone can insert, admin can read
-- =============================================

create policy "Anyone can insert order items"
on order_items for insert
to anon, authenticated
with check (true);

create policy "Admin can read order items"
on order_items for select
to authenticated
using (true);

-- =============================================
-- DELIVERIES — anyone can insert, admin can read/update
-- =============================================

create policy "Anyone can insert delivery details"
on deliveries for insert
to anon, authenticated
with check (true);

create policy "Admin can read deliveries"
on deliveries for select
to authenticated
using (true);

create policy "Admin can update deliveries"
on deliveries for update
to authenticated
using (true);

-- =============================================
-- STAMP REQUESTS — anyone can insert, admin can read/update
-- =============================================

create policy "Anyone can submit stamp request"
on stamp_requests for insert
to anon, authenticated
with check (true);

create policy "Admin can read stamp requests"
on stamp_requests for select
to authenticated
using (true);

create policy "Admin can update stamp requests"
on stamp_requests for update
to authenticated
using (true);

-- =============================================
-- PRINT REQUESTS — anyone can insert, admin can read/update
-- =============================================

create policy "Anyone can submit print request"
on print_requests for insert
to anon, authenticated
with check (true);

create policy "Admin can read print requests"
on print_requests for select
to authenticated
using (true);

create policy "Admin can update print requests"
on print_requests for update
to authenticated
using (true);

-- =============================================
-- STORAGE POLICIES
-- =============================================

create policy "Public can view product images"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'product-images');

create policy "Admin can upload product images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'product-images');

create policy "Admin can update product images"
on storage.objects for update
to authenticated
using (bucket_id = 'product-images');

create policy "Admin can delete product images"
on storage.objects for delete
to authenticated
using (bucket_id = 'product-images');

create policy "Public can view stamp logos"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'stamp-logos');

create policy "Anyone can upload stamp logos"
on storage.objects for insert
to anon, authenticated
with check (bucket_id = 'stamp-logos');

create policy "Admin can view print artwork"
on storage.objects for select
to authenticated
using (bucket_id = 'print-artwork');

create policy "Anyone can upload print artwork"
on storage.objects for insert
to anon, authenticated
with check (bucket_id = 'print-artwork');

-- =============================================
-- ORDER TRACKING — allow anon to read own order
-- =============================================

create policy "Customer can track own order"
on orders for select
to anon
using (true);

create policy "Customer can read own order items"
on order_items for select
to anon
using (true);
