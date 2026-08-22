import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { orderInputSchema } from "./shop.schemas";

export const getDeliveryFees = createServerFn({ method: "GET" })
  .handler(async () => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("delivery_fees")
      .select("wilaya_code, wilaya_name_fr, desk_price, home_price")
      .order("wilaya_code");
    if (error) throw new Error(error.message);
    return (data ?? []).map((row) => ({
      wilaya_code: row.wilaya_code,
      wilaya_name_fr: row.wilaya_name_fr,
      desk_price: Number(row.desk_price),
      home_price: Number(row.home_price),
    }));
  });

export const submitOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => orderInputSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const fullAddress = data.delivery_fee > 0
      ? `${data.address}\n\nنوع التوصيل: ${data.delivery_type === 'desk' ? 'مكتب (Bureau)' : 'منزل (Domicile)'}\nسعر التوصيل: ${data.delivery_fee} دج`
      : data.address;

    const { data: result, error } = await (supabaseAdmin.rpc as any)("create_order", {
      p_customer_name: data.customer_name,
      p_phone: data.phone,
      p_wilaya: data.wilaya,
      p_commune: data.commune,
      p_address: fullAddress,
      p_delivery_fee: data.delivery_fee,
      p_items: data.items,
    });

    if (error) throw new Error(error.message || "تعذر إنشاء الطلب");
    const row = Array.isArray(result) ? result[0] : result;
    if (!row) throw new Error("تعذر إنشاء الطلب");

    if (data.delivery_fee > 0) {
      await supabaseAdmin
        .from("orders")
        .update({ total: Number(row.order_total) + data.delivery_fee })
        .eq("id", row.order_id);
    }

    return { reference: row.order_reference as string };
  });

export const getOrderByReference = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ reference: z.string().min(3).max(40) }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .select("id, reference, customer_name, phone, wilaya, commune, address, total, status, created_at")
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

export const submitReview = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z.object({
      first_name: z.string().min(2).max(100),
      rating: z.number().min(1).max(5),
      description: z.string().min(3).max(1000),
      order_reference: z.string().optional(),
    }).parse(data)
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("reviews").insert({
      first_name: data.first_name,
      rating: data.rating,
      description: data.description,
      order_reference: data.order_reference,
      status: "pending",
    });
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const getApprovedReviews = createServerFn({ method: "GET" })
  .handler(async () => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("reviews")
      .select("id, first_name, rating, description, created_at")
      .eq("status", "approved")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });
