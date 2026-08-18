import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { orderInputSchema } from "./shop.schemas";

export const submitOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => orderInputSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: result, error } = await (supabaseAdmin.rpc as any)("create_order", {
      p_customer_name: data.customer_name,
      p_phone: data.phone,
      p_wilaya: data.wilaya,
      p_address: data.address,
      p_items: data.items,
    });

    if (error) throw new Error(error.message || "تعذر إنشاء الطلب");
    const row = Array.isArray(result) ? result[0] : result;
    if (!row) throw new Error("تعذر إنشاء الطلب");
    return { reference: row.order_reference as string };
  });

export const getOrderByReference = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ reference: z.string().min(3).max(40) }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .select("id, reference, customer_name, phone, wilaya, address, total, status, created_at")
      .eq("reference", data.reference)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!order) return null;

    const { data: items } = await supabaseAdmin
      .from("order_items")
      .select("id, product_name, quantity, unit_price, subtotal")
      .eq("order_id", order.id);

    return { ...order, items: items ?? [] };
  });
