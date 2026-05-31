-- Run in Supabase SQL Editor (after tables exist)

-- Categories
insert into categories (name, slug, description) values
  ('Pens & Pencils', 'pens-pencils', 'Ballpoints, gel pens, markers and pencils'),
  ('Notebooks & Files', 'notebooks-files', 'Exercise books, binders and folders'),
  ('Envelopes & Paper', 'envelopes-paper', 'A4 paper, envelopes and cardstock'),
  ('Stamps', 'stamps', 'Self-inking, date and company stamps'),
  ('Markers & Highlighters', 'markers', 'Permanent markers and highlighters');

-- Products
insert into products (category_id, name, description, price, stock_quantity, low_stock_threshold, has_fixed_price, is_active) values
  ((select id from categories where slug='pens-pencils'), 'Bic Ballpoint Pen (Blue)', 'Smooth writing ballpoint pen, pack of 10', 5.00, 100, 10, true, true),
  ((select id from categories where slug='pens-pencils'), 'Stabilo Marker Set', 'Pack of 6 assorted colours', 18.00, 40, 5, true, true),
  ((select id from categories where slug='pens-pencils'), 'Faber-Castell Pencils', 'HB pencils, pack of 12', 12.00, 60, 5, true, true),
  ((select id from categories where slug='notebooks-files'), 'A4 Exercise Book', '96 pages, ruled, hard cover', 4.50, 200, 20, true, true),
  ((select id from categories where slug='notebooks-files'), 'Plastic File Folder', 'A4 clear cover binder', 7.00, 80, 10, true, true),
  ((select id from categories where slug='notebooks-files'), 'Spiral Notebook', 'A5 size, 200 pages', 9.00, 75, 10, true, true),
  ((select id from categories where slug='envelopes-paper'), 'A4 Printing Paper', '80gsm, ream of 500 sheets', 45.00, 60, 5, true, true),
  ((select id from categories where slug='envelopes-paper'), 'Brown Envelopes (A4)', 'Pack of 25 manila envelopes', 8.00, 120, 10, true, true),
  ((select id from categories where slug='stamps'), 'Self-Inking Stamp', 'Custom text, up to 3 lines', 0.00, 50, 5, false, true),
  ((select id from categories where slug='stamps'), 'Date Stamp', 'Adjustable date, self-inking', 35.00, 30, 5, true, true),
  ((select id from categories where slug='markers'), 'Permanent Marker (Black)', 'Waterproof, pack of 5', 14.00, 90, 10, true, true),
  ((select id from categories where slug='markers'), 'Highlighter Set', 'Pack of 5 assorted neon colours', 11.00, 65, 10, true, true);
