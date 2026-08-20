-- Drop perfume specific columns
ALTER TABLE public.products
  DROP COLUMN IF EXISTS top_notes,
  DROP COLUMN IF EXISTS heart_notes,
  DROP COLUMN IF EXISTS base_notes,
  DROP COLUMN IF EXISTS bottle_color;

-- Add cosmetic specific columns
ALTER TABLE public.products
  ADD COLUMN benefits TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
  ADD COLUMN ingredients TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
  ADD COLUMN how_to_use TEXT DEFAULT '' NOT NULL,
  ADD COLUMN volume_ml INTEGER DEFAULT 50 NOT NULL;
