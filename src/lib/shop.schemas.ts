import { z } from "zod";

export const orderInputSchema = z.object({
  customer_name: z.string().trim().min(2, "الاسم مطلوب").max(120),
  phone: z
    .string()
    .trim()
    .min(9, "رقم هاتف غير صالح")
    .max(20)
    .regex(/^[0-9+\s-]+$/, "رقم هاتف غير صالح"),
  wilaya: z.string().trim().min(2, "الولاية مطلوبة").max(60),
  commune: z.string().trim().min(2, "البلدية مطلوبة").max(60),
  address: z.string().trim().min(5, "العنوان مطلوب").max(500),
  items: z
    .array(
      z.object({
        product_id: z.string().uuid(),
        quantity: z.number().int().min(1).max(50),
        selected_shade: z.string().optional(),
      }),
    )
    .min(1, "السلة فارغة")
    .max(30),
  delivery_fee: z.number().min(0).default(0),
  delivery_type: z.enum(["desk", "home"]).optional(),
});

export type OrderInput = z.infer<typeof orderInputSchema>;

export const noteListSchema = z.array(z.string().trim().max(60)).max(12);

export const productInputSchema = z.object({
  id: z.string().uuid().optional(),
  // ── Champs obligatoires ─────────────────────────────────────────────────────
  name: z.string().trim().min(2, "اسم المنتج مطلوب").max(120),
  price: z.number({ required_error: "السعر مطلوب" }).min(0).max(100_000_000),
  stock: z.number({ required_error: "المخزون مطلوب" }).int().min(0).max(1_000_000),
  description: z.string().trim().min(1, "الوصف مطلوب").max(2000),
  images: z.array(z.string()).min(1, "صورة واحدة على الأقل مطلوبة"),
  category_id: z.string().uuid().nullable().default(null),
  badge: z.string().trim().max(40).nullable().default(null),
  // ── Champs optionnels ────────────────────────────────────────────────────────
  volume_ml: z.number().int().min(1).max(5000).optional(),
  shade: noteListSchema.default([]),
  origin: z.string().trim().max(100).optional().default(""),
  expiration_date: z.string().trim().max(100).optional().default(""),
  benefits: noteListSchema.default([]),
  ingredients: noteListSchema.default([]),
  how_to_use: z.string().trim().max(2000).optional().default(""),
});

export const categoryInputSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(2, "اسم الفئة مطلوب").max(60),
  description: z.string().trim().max(1000).optional().default(""),
  photo: z.string().trim().max(2000).optional().default(""),
});

export const adminTokenSchema = z.object({ token: z.string().min(1) });
