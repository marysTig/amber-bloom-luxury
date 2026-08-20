-- Add images array
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}' NOT NULL;

-- Migrate existing single image to the images array
UPDATE public.products
SET images = ARRAY[image]
WHERE image IS NOT NULL AND image != '';

-- Drop old image column
ALTER TABLE public.products
  DROP COLUMN IF EXISTS image;
