-- Auto-generate order_number for orders, stamp_requests, print_requests

-- Orders
alter table orders add column if not exists order_number text unique;

create sequence if not exists order_number_seq start 1;

create or replace function generate_order_number()
returns trigger as $$
begin
  new.order_number := 'ORD-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('order_number_seq')::text, 4, '0');
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_order_number on orders;
create trigger set_order_number
before insert on orders
for each row
when (new.order_number is null)
execute function generate_order_number();

-- Stamp requests
alter table stamp_requests add column if not exists order_number text unique;

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

-- Print requests
alter table print_requests add column if not exists order_number text unique;

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
