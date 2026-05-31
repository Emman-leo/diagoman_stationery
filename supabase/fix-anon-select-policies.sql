-- Fix: allow anon to read back rows after stamp/print request submission
-- (insert + .select() requires SELECT permission for the inserting role)

create policy "Public can read stamp requests"
on stamp_requests for select
to anon, authenticated
using (true);

create policy "Public can read print requests"
on print_requests for select
to anon, authenticated
using (true);
