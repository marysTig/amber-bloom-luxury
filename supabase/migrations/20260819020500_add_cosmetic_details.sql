-- Add new optional fields for cosmetics
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS shade TEXT DEFAULT '' NOT NULL,
  ADD COLUMN IF NOT EXISTS origin TEXT DEFAULT '' NOT NULL,
  ADD COLUMN IF NOT EXISTS expiration_date TEXT DEFAULT '' NOT NULL;
