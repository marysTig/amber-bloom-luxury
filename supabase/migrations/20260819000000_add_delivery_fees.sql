-- Create delivery_fees table
CREATE TABLE IF NOT EXISTS public.delivery_fees (
  commune_id INTEGER PRIMARY KEY,
  wilaya_code INTEGER NOT NULL,
  desk_price NUMERIC(10,2) NOT NULL DEFAULT 0,
  home_price NUMERIC(10,2) NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.delivery_fees ENABLE ROW LEVEL SECURITY;

-- Public can read fees (needed at checkout)
CREATE POLICY "public_read_delivery_fees"
  ON public.delivery_fees FOR SELECT
  USING (true);

-- Authenticated users (admins) can do everything
CREATE POLICY "auth_all_delivery_fees"
  ON public.delivery_fees FOR ALL
  USING (auth.role() = 'authenticated');
