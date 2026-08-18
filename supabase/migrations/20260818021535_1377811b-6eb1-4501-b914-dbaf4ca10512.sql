CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.categories TO anon;
GRANT SELECT ON public.categories TO authenticated;
GRANT ALL ON public.categories TO service_role;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "categories_public_read" ON public.categories FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
  name text NOT NULL,
  price numeric(12,2) NOT NULL DEFAULT 0 CHECK (price >= 0),
  stock integer NOT NULL DEFAULT 0 CHECK (stock >= 0),
  description text NOT NULL DEFAULT '',
  top_notes text[] NOT NULL DEFAULT '{}',
  heart_notes text[] NOT NULL DEFAULT '{}',
  base_notes text[] NOT NULL DEFAULT '{}',
  bottle_color text NOT NULL DEFAULT '#C8A24A',
  image text NOT NULL DEFAULT '',
  badge text,
  sales_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon;
GRANT SELECT ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "products_public_read" ON public.products FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text NOT NULL UNIQUE DEFAULT ('AMB-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,8))),
  customer_name text NOT NULL,
  phone text NOT NULL,
  wilaya text NOT NULL,
  address text NOT NULL,
  total numeric(12,2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'جديد',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
  product_name text NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price numeric(12,2) NOT NULL,
  subtotal numeric(12,2) NOT NULL
);
GRANT ALL ON public.order_items TO service_role;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS trigger
LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER products_updated_at BEFORE UPDATE ON public.products
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.create_order(
  p_customer_name text, p_phone text, p_wilaya text, p_address text, p_items jsonb
) RETURNS TABLE (order_id uuid, order_reference text, order_total numeric)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_item jsonb; v_product public.products%ROWTYPE; v_qty int;
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

  INSERT INTO public.orders (customer_name, phone, wilaya, address, total)
  VALUES (p_customer_name, p_phone, p_wilaya, p_address, v_total)
  RETURNING * INTO v_order;

  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items) LOOP
    v_qty := (v_item->>'quantity')::int;
    SELECT * INTO v_product FROM public.products WHERE id = (v_item->>'product_id')::uuid FOR UPDATE;
    INSERT INTO public.order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
    VALUES (v_order.id, v_product.id, v_product.name, v_qty, v_product.price, v_product.price * v_qty);
    UPDATE public.products
      SET stock = stock - v_qty, sales_count = sales_count + v_qty
      WHERE id = v_product.id;
  END LOOP;

  RETURN QUERY SELECT v_order.id, v_order.reference, v_order.total;
END; $$;
REVOKE ALL ON FUNCTION public.create_order(text,text,text,text,jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.create_order(text,text,text,text,jsonb) TO service_role;

INSERT INTO public.categories (name) VALUES ('رجالي'), ('نسائي'), ('للجنسين'), ('وصل حديثاً');

INSERT INTO public.products (category_id, name, price, stock, description, top_notes, heart_notes, base_notes, bottle_color, image, badge, sales_count)
SELECT c.id, v.name, v.price, v.stock, v.description, v.tn, v.hn, v.bn, v.color, v.img, v.badge, v.sales
FROM (VALUES
  ('رجالي','ليل العنبر', 12500.00, 14, 'عطر شرقي دافئ يفتح بلمسة حارة ثم يستقر على قاعدة عنبرية عميقة تدوم طويلاً على البشرة.', ARRAY['البرغموت','الفلفل الوردي','الحمضيات'], ARRAY['السوسن','خشب الأرز','التوابل'], ARRAY['العنبر','المسك','خشب الصندل'], '#C8862A', '/images/perfume-1.jpg', 'الأكثر مبيعاً', 128),
  ('نسائي','ياسمين الشام', 14800.00, 9, 'باقة زهرية ساحرة يتصدرها الياسمين الليلي، مع أثر مخملي من الفانيليا والمسك الأبيض.', ARRAY['البرغموت','الليتشي','الحمضيات'], ARRAY['الياسمين','الورد','السوسن'], ARRAY['الفانيليا','المسك','العنبر'], '#D9A7B0', '/images/perfume-2.jpg', 'جديد', 74),
  ('للجنسين','رماد الذهب', 19900.00, 5, 'توقيع غامض يجمع البخور والجلد مع بريق ذهبي من التوابل النادرة. للمناسبات التي لا تُنسى.', ARRAY['الزعفران','الفلفل الوردي','الهيل'], ARRAY['الورد الطائفي','العود','الجلد'], ARRAY['العنبر','خشب الصندل','المسك'], '#B8912F', '/images/perfume-3.jpg', 'إصدار محدود', 52),
  ('وصل حديثاً','نسمة عاجية', 9900.00, 22, 'انتعاش حريري خفيف من الحمضيات والزهور البيضاء، مثالي للنهار وللأجواء الدافئة.', ARRAY['الليمون','البرغموت','النعناع'], ARRAY['زهر البرتقال','الياسمين','الفريزيا'], ARRAY['المسك الأبيض','خشب الأرز','الفانيليا'], '#E8DFCB', '/images/perfume-4.jpg', 'جديد', 31)
) AS v(cat,name,price,stock,description,tn,hn,bn,color,img,badge,sales)
JOIN public.categories c ON c.name = v.cat;