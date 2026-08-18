import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  adminTokenSchema,
  categoryInputSchema,
  productInputSchema,
} from "./shop.schemas";

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z.object({ password: z.string().min(1).max(200) }).parse(data),
  )
  .handler(async ({ data }) => {
    const { verifyAdminPassword, issueAdminToken } = await import("./admin.server");
    const ok = await verifyAdminPassword(data.password);
    if (!ok) throw new Error("كلمة المرور غير صحيحة");
    return { token: await issueAdminToken() };
  });

export const adminOverview = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => adminTokenSchema.parse(data))
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin.server");
    await requireAdmin(data.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const [products, categories, orders] = await Promise.all([
      supabaseAdmin.from("products").select("id", { count: "exact", head: true }),
      supabaseAdmin.from("categories").select("id", { count: "exact", head: true }),
      supabaseAdmin.from("orders").select("status, total"),
    ]);

    const rows = orders.data ?? [];
    return {
      products: products.count ?? 0,
      categories: categories.count ?? 0,
      newOrders: rows.filter((o) => o.status === "جديد").length,
      processedOrders: rows.filter((o) => o.status === "تمت المعالجة").length,
      revenue: rows.reduce((sum, o) => sum + Number(o.total), 0),
    };
  });

export const adminListOrders = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => adminTokenSchema.parse(data))
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin.server");
    await requireAdmin(data.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: orders, error } = await supabaseAdmin
      .from("orders")
      .select(
        "id, reference, customer_name, phone, wilaya, address, total, status, created_at, order_items(id, product_name, quantity, unit_price, subtotal)",
      )
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return orders ?? [];
  });

export const adminSetOrderStatus = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    adminTokenSchema
      .extend({ id: z.string().uuid(), status: z.enum(["جديد", "تمت المعالجة"]) })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin.server");
    await requireAdmin(data.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("orders")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminSaveProduct = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    adminTokenSchema.extend({ product: productInputSchema }).parse(data),
  )
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin.server");
    await requireAdmin(data.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { id, ...fields } = data.product;
    if (id) {
      const { error } = await supabaseAdmin.from("products").update(fields).eq("id", id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabaseAdmin.from("products").insert(fields);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

export const adminDeleteProduct = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    adminTokenSchema.extend({ id: z.string().uuid() }).parse(data),
  )
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin.server");
    await requireAdmin(data.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("products").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminSaveCategory = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    adminTokenSchema.extend({ category: categoryInputSchema }).parse(data),
  )
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin.server");
    await requireAdmin(data.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { id, name } = data.category;
    if (id) {
      const { error } = await supabaseAdmin.from("categories").update({ name }).eq("id", id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabaseAdmin.from("categories").insert({ name });
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

export const adminDeleteCategory = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    adminTokenSchema.extend({ id: z.string().uuid() }).parse(data),
  )
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin.server");
    await requireAdmin(data.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("categories").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
