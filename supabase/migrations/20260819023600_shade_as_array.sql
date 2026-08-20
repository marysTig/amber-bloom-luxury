-- Drop the existing default before changing type
ALTER TABLE public.products ALTER COLUMN shade DROP DEFAULT;

-- Change shade from TEXT to TEXT[]
ALTER TABLE public.products
  ALTER COLUMN shade TYPE TEXT[] USING
    CASE
      WHEN shade IS NULL OR shade = '' THEN ARRAY[]::TEXT[]
      ELSE ARRAY[shade]::TEXT[]
    END;

-- Set a proper array default
ALTER TABLE public.products ALTER COLUMN shade SET DEFAULT '{}';

-- Clean up any leftover empty string entries
UPDATE public.products
SET shade = '{}'::TEXT[]
WHERE shade = ARRAY['']::TEXT[];
