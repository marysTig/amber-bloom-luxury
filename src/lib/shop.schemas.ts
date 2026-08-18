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
  address: z.string().trim().min(5, "العنوان مطلوب").max(500),
  items: z
    .array(
      z.object({
        product_id: z.string().uuid(),
        quantity: z.number().int().min(1).max(50),
      }),
    )
    .min(1, "السلة فارغة")
    .max(30),
});

export type OrderInput = z.infer<typeof orderInputSchema>;

export const noteListSchema = z.array(z.string().trim().max(60)).max(12);

export const productInputSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(2, "اسم العطر مطلوب").max(120),
  price: z.number().min(0).max(10_000_000),
  stock: z.number().int().min(0).max(100_000),
  description: z.string().trim().max(2000).default(""),
  category_id: z.string().uuid().nullable().default(null),
  image: z.string().trim().max(500).default(""),
  bottle_color: z.string().trim().max(30).default("#C8A24A"),
  badge: z.string().trim().max(40).nullable().default(null),
  top_notes: noteListSchema.default([]),
  heart_notes: noteListSchema.default([]),
  base_notes: noteListSchema.default([]),
});

export const categoryInputSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(2, "اسم الفئة مطلوب").max(60),
});

export const adminTokenSchema = z.object({ token: z.string().min(1) });
