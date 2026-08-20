-- Add selected_shade to order_items table
ALTER TABLE public.order_items ADD COLUMN IF NOT EXISTS selected_shade text;

-- Update create_order RPC to accept selected_shade in the items json array
DROP FUNCTION IF EXISTS public.create_order(text, text, text, text, text, numeric, jsonb);

CREATE OR REPLACE FUNCTION public.create_order(
  p_customer_name text, p_phone text, p_wilaya text, p_commune text, p_address text, p_delivery_fee numeric, p_items jsonb
) RETURNS TABLE (order_id uuid, order_reference text, order_total numeric)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_item jsonb; v_product public.products%ROWTYPE; v_qty int; v_selected_shade text;
  v_total numeric(12,2) := 0; v_order public.orders%ROWTYPE;
BEGIN
  IF p_items IS NULL OR jsonb_array_length(p_items) = 0 THEN
    RAISE EXCEPTION 'السلة فارغة';
  END IF;

  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items) LOOP
    v_qty := (v_item->>'quantity')::int;
    IF v_qty IS NULL OR v_qty <= 0 THEN RAISE EXCEPTION 'كمية غير صالحة'; END IF;
    SELECT * INTO v_product FROM public.products WHERE id = (v_item->>'product_id')::uuid FOR UPDATE;
    IF NOT FOUND THEN RAISE EXCEPTION 'منتج غير موجود'; END IF;
    IF v_product.stock < v_qty THEN
      RAISE EXCEPTION 'الكمية المطلوبة من % غير متوفرة. المتبقي: %', v_product.name, v_product.stock;
    END IF;
    v_total := v_total + (v_product.price * v_qty);
  END LOOP;

  INSERT INTO public.orders (customer_name, phone, wilaya, commune, address, delivery_fee, total)
  VALUES (p_customer_name, p_phone, p_wilaya, p_commune, p_address, COALESCE(p_delivery_fee, 0), v_total)
  RETURNING * INTO v_order;

  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items) LOOP
    v_qty := (v_item->>'quantity')::int;
    v_selected_shade := (v_item->>'selected_shade');
    SELECT * INTO v_product FROM public.products WHERE id = (v_item->>'product_id')::uuid FOR UPDATE;
    INSERT INTO public.order_items (order_id, product_id, product_name, quantity, unit_price, subtotal, selected_shade)
    VALUES (v_order.id, v_product.id, v_product.name, v_qty, v_product.price, v_product.price * v_qty, v_selected_shade);
    UPDATE public.products
      SET stock = stock - v_qty, sales_count = sales_count + v_qty
      WHERE id = v_product.id;
  END LOOP;

  RETURN QUERY SELECT v_order.id, v_order.reference, v_order.total;
END; $$;

REVOKE ALL ON FUNCTION public.create_order(text,text,text,text,text,numeric,jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.create_order(text,text,text,text,text,numeric,jsonb) TO service_role;
