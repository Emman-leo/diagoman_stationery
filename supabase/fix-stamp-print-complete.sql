-- Run this entire file in Supabase SQL Editor
-- Fixes stamp_requests / print_requests 400 errors

-- =============================================
-- Ensure columns exist on stamp_requests
-- =============================================
create table if not exists stamp_requests (
  id uuid primary key default gen_random_uuid(),
  order_number text unique,
  customer_name text not null,
  customer_phone text not null,
  stamp_type text not null,
  stamp_text text,
  size text,
  ink_color text,
  logo_url text,
  quoted_price numeric(10, 2),
  status text not null default 'pending',
  admin_notes text,
  created_at timestamptz not null default now()
);

alter table stamp_requests add column if not exists order_number text unique;
alter table stamp_requests add column if not exists customer_name text;
alter table stamp_requests add column if not exists customer_phone text;
alter table stamp_requests add column if not exists stamp_type text;
alter table stamp_requests add column if not exists stamp_text text;
alter table stamp_requests add column if not exists size text;
alter table stamp_requests add column if not exists ink_color text;
alter table stamp_requests add column if not exists logo_url text;
alter table stamp_requests add column if not exists quoted_price numeric(10, 2);
alter table stamp_requests add column if not exists status text default 'pending';
alter table stamp_requests add column if not exists admin_notes text;
alter table stamp_requests add column if not exists created_at timestamptz default now();

-- =============================================
-- Ensure columns exist on print_requests
-- =============================================
create table if not exists print_requests (
  id uuid primary key default gen_random_uuid(),
  order_number text unique,
  customer_name text not null,
  customer_phone text not null,
  service_type text not null,
  quantity integer not null default 1,
  size text,
  finish text,
  artwork_url text,
  quoted_price numeric(10, 2),
  status text not null default 'pending',
  admin_notes text,
  created_at timestamptz not null default now()
);

alter table print_requests add column if not exists order_number text unique;
alter table print_requests add column if not exists customer_name text;
alter table print_requests add column if not exists customer_phone text;
alter table print_requests add column if not exists service_type text;
alter table print_requests add column if not exists quantity integer default 1;
alter table print_requests add column if not exists size text;
alter table print_requests add column if not exists finish text;
alter table print_requests add column if not exists artwork_url text;
alter table print_requests add column if not exists quoted_price numeric(10, 2);
alter table print_requests add column if not exists status text default 'pending';
alter table print_requests add column if not exists admin_notes text;
alter table print_requests add column if not exists created_at timestamptz default now();

-- =============================================
-- Order number triggers (from order-number-triggers.sql)
-- =============================================
create sequence if not exists stamp_number_seq start 1;

create or replace function generate_stamp_number()
returns trigger as $$
begin
  new.order_number := 'STM-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('stamp_number_seq')::text, 4, '0');
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_stamp_number on stamp_requests;
create trigger set_stamp_number
before insert on stamp_requests
for each row
when (new.order_number is null)
execute function generate_stamp_number();

create sequence if not exists print_number_seq start 1;

create or replace function generate_print_number()
returns trigger as $$
begin
  new.order_number := 'PRT-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('print_number_seq')::text, 4, '0');
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_print_number on print_requests;
create trigger set_print_number
before insert on print_requests
for each row
when (new.order_number is null)
execute function generate_print_number();

-- =============================================
-- RPC functions (bypass RLS issues on insert+return)
-- =============================================
create or replace function public.create_stamp_request(
  p_customer_name text,
  p_customer_phone text,
  p_stamp_type text,
  p_stamp_text text,
  p_size text,
  p_ink_color text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  result stamp_requests;
begin
  insert into stamp_requests (
    customer_name, customer_phone, stamp_type, stamp_text, size, ink_color, status
  ) values (
    p_customer_name, p_customer_phone, p_stamp_type, p_stamp_text, p_size, p_ink_color, 'pending'
  )
  returning * into result;
  return to_jsonb(result);
end;
$$;

create or replace function public.create_print_request(
  p_customer_name text,
  p_customer_phone text,
  p_service_type text,
  p_quantity integer,
  p_size text,
  p_finish text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  result print_requests;
begin
  insert into print_requests (
    customer_name, customer_phone, service_type, quantity, size, finish, status
  ) values (
    p_customer_name, p_customer_phone, p_service_type, p_quantity, p_size, p_finish, 'pending'
  )
  returning * into result;
  return to_jsonb(result);
end;
$$;

grant execute on function public.create_stamp_request to anon, authenticated;
grant execute on function public.create_print_request to anon, authenticated;

-- =============================================
-- RLS: allow public insert + read (for form submit return)
-- =============================================
alter table stamp_requests enable row level security;
alter table print_requests enable row level security;

drop policy if exists "Anyone can submit stamp request" on stamp_requests;
drop policy if exists "Public can read stamp requests" on stamp_requests;
drop policy if exists "Admin can read stamp requests" on stamp_requests;
drop policy if exists "Admin can update stamp requests" on stamp_requests;

create policy "Anyone can submit stamp request"
on stamp_requests for insert to anon, authenticated with check (true);

create policy "Public can read stamp requests"
on stamp_requests for select to anon, authenticated using (true);

create policy "Admin can update stamp requests"
on stamp_requests for update to authenticated using (true);

drop policy if exists "Anyone can submit print request" on print_requests;
drop policy if exists "Public can read print requests" on print_requests;
drop policy if exists "Admin can read print requests" on print_requests;
drop policy if exists "Admin can update print requests" on print_requests;

create policy "Anyone can submit print request"
on print_requests for insert to anon, authenticated with check (true);

create policy "Public can read print requests"
on print_requests for select to anon, authenticated using (true);

create policy "Admin can update print requests"
on print_requests for update to authenticated using (true);

-- Reload PostgREST schema cache
notify pgrst, 'reload schema';
