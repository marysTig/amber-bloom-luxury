import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  adminTokenSchema,
  categoryInputSchema,
  productInputSchema,
} from "./shop.schemas";

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z.object({ email: z.string().email(), password: z.string().min(1).max(200) }).parse(data),
  )
  .handler(async ({ data }) => {
    const { supabase } = await import("@/integrations/supabase/client");
    
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    
    if (error || !authData.session) {
      throw new Error("بيانات الدخول غير صحيحة");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: roleData, error: roleError } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", authData.user.id)
      .maybeSingle();

    console.log("DEBUG LOGIN:", { user: authData.user.id, roleData, roleError });

    if (roleError || !roleData || roleData.role !== 'admin') {
      throw new Error("ليس لديك صلاحية الإدارة");
    }

    return { token: authData.session.access_token };
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
      pendingOrders: rows.filter((o) => o.status === "قيد الانتظار").length,
      confirmedOrders: rows.filter((o) => o.status === "مؤكد").length,
      inDeliveryOrders: rows.filter((o) => o.status === "في التوصيل").length,
      completedOrders: rows.filter((o) => o.status === "مكتمل").length,
      revenue: rows.filter((o) => o.status === "مكتمل").reduce((sum, o) => sum + Number(o.total), 0),
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
        "id, reference, customer_name, phone, wilaya, commune, address, total, status, created_at, order_items(id, product_name, quantity, unit_price, subtotal, selected_shade)",
      )
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return orders ?? [];
  });

export const adminSetOrderStatus = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    adminTokenSchema
      .extend({
        id: z.string().uuid(),
        status: z.enum(["قيد الانتظار", "مؤكد", "في التوصيل", "مكتمل", "ملغي"]),
      })
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

export const adminDeleteOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    adminTokenSchema.extend({ id: z.string().uuid() }).parse(data),
  )
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin.server");
    await requireAdmin(data.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("orders").delete().eq("id", data.id);
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
    const { id, ...rawFields } = data.product;
    // Strip undefined values so exactOptionalPropertyTypes is satisfied
    const fields = Object.fromEntries(
      Object.entries(rawFields).filter(([, v]) => v !== undefined),
    ) as typeof rawFields;
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
    const { id, name, description, photo } = data.category;
    console.log("DEBUG SAVE CATEGORY:", { id, name, description, photo });
    if (id) {
      const { error } = await supabaseAdmin.from("categories").update({ name, description, photo }).eq("id", id);
      if (error) { console.error("UPDATE ERROR:", error); throw new Error(error.message); }
    } else {
      const { error } = await supabaseAdmin.from("categories").insert({ name, description, photo });
      if (error) { console.error("INSERT ERROR:", error); throw new Error(error.message); }
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

// ── Delivery Fees ────────────────────────────────────────────────────────────

export const adminGetDeliveryFees = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => adminTokenSchema.parse(data))
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin.server");
    await requireAdmin(data.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: fees, error } = await supabaseAdmin
      .from("delivery_fees")
      .select("wilaya_code, wilaya_name_fr, desk_price, home_price")
      .order("wilaya_code");
    if (error) throw new Error(error.message);
    return fees ?? [];
  });

export const adminSaveDeliveryFees = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    adminTokenSchema
      .extend({
        fees: z.array(
          z.object({
            wilaya_code: z.number().int().positive(),
            wilaya_name_fr: z.string().min(1),
            desk_price: z.number().min(0),
            home_price: z.number().min(0),
          }),
        ),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin.server");
    await requireAdmin(data.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("delivery_fees")
      .upsert(data.fees, { onConflict: "wilaya_code" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ── Profile ──────────────────────────────────────────────────────────────────

export const adminUpdateProfile = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    adminTokenSchema
      .extend({
        email: z.string().email().optional(),
        password: z.string().min(6).optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin.server");
    await requireAdmin(data.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(data.token);
    if (userError || !user) throw new Error("Erreur d'authentification");

    const updateData: { email?: string; password?: string } = {};
    if (data.email && data.email.trim() !== "") updateData.email = data.email;
    if (data.password && data.password.trim() !== "") updateData.password = data.password;

    if (Object.keys(updateData).length > 0) {
      const { error } = await supabaseAdmin.auth.admin.updateUserById(user.id, updateData);
      if (error) throw new Error(error.message);
    }
    
    return { ok: true };
  });
