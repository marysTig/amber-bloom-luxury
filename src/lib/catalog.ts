import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Category = { id: string; name: string; description: string | null; photo: string | null };

export type Product = {
  id: string;
  category_id: string | null;
  name: string;
  price: number;
  stock: number;
  description: string;
  benefits: string[];
  ingredients: string[];
  how_to_use: string;
  volume_ml: number;
  shade: string[];
  origin: string;
  expiration_date: string;
  images: string[];
  badge: string | null;
  sales_count: number;
  created_at: string;
};

const PRODUCT_FIELDS =
  "id, category_id, name, price, stock, description, benefits, ingredients, how_to_use, volume_ml, shade, origin, expiration_date, images, badge, sales_count, created_at";

export const categoriesQuery = () =>
  queryOptions({
    queryKey: ["categories"],
    queryFn: async (): Promise<Category[]> => {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name, description, photo")
        .order("created_at", { ascending: true });
      if (error) throw new Error(error.message);
      return data ?? [];
    },
  });

export const productsQuery = () =>
  queryOptions({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from("products")
        .select(PRODUCT_FIELDS)
        .order("created_at", { ascending: false });
      if (error) throw new Error(error.message);
      return (data ?? []).map((p) => ({ ...p, price: Number(p.price) })) as Product[];
    },
  });

export const productQuery = (id: string) =>
  queryOptions({
    queryKey: ["product", id],
    queryFn: async (): Promise<Product | null> => {
      const { data, error } = await supabase
        .from("products")
        .select(PRODUCT_FIELDS)
        .eq("id", id)
        .maybeSingle();
      if (error) throw new Error(error.message);
      return data ? ({ ...data, price: Number(data.price) } as Product) : null;
    },
  });
