import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Category = { id: string; name: string };

export type Product = {
  id: string;
  category_id: string | null;
  name: string;
  price: number;
  stock: number;
  description: string;
  top_notes: string[];
  heart_notes: string[];
  base_notes: string[];
  bottle_color: string;
  image: string;
  badge: string | null;
  sales_count: number;
  created_at: string;
};

const PRODUCT_FIELDS =
  "id, category_id, name, price, stock, description, top_notes, heart_notes, base_notes, bottle_color, image, badge, sales_count, created_at";

export const categoriesQuery = () =>
  queryOptions({
    queryKey: ["categories"],
    queryFn: async (): Promise<Category[]> => {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name")
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
