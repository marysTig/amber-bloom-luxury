import { a as stringType, i as objectType, n as enumType, r as numberType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop.schemas-7IntXOuV.js
var orderInputSchema = objectType({
	customer_name: stringType().trim().min(2, "الاسم مطلوب").max(120),
	phone: stringType().trim().min(9, "رقم هاتف غير صالح").max(20).regex(/^[0-9+\s-]+$/, "رقم هاتف غير صالح"),
	wilaya: stringType().trim().min(2, "الولاية مطلوبة").max(60),
	commune: stringType().trim().min(2, "البلدية مطلوبة").max(60),
	address: stringType().trim().min(5, "العنوان مطلوب").max(500),
	items: arrayType(objectType({
		product_id: stringType().uuid(),
		quantity: numberType().int().min(1).max(50),
		selected_shade: stringType().optional()
	})).min(1, "السلة فارغة").max(30),
	delivery_fee: numberType().min(0).default(0),
	delivery_type: enumType(["desk", "home"]).optional()
});
var noteListSchema = arrayType(stringType().trim().max(60)).max(12);
var productInputSchema = objectType({
	id: stringType().uuid().optional(),
	name: stringType().trim().min(2, "اسم المنتج مطلوب").max(120),
	price: numberType({ required_error: "السعر مطلوب" }).min(0).max(1e8),
	stock: numberType({ required_error: "المخزون مطلوب" }).int().min(0).max(1e6),
	description: stringType().trim().min(1, "الوصف مطلوب").max(2e3),
	images: arrayType(stringType()).min(1, "صورة واحدة على الأقل مطلوبة"),
	category_id: stringType().uuid().nullable().default(null),
	badge: stringType().trim().max(40).nullable().default(null),
	volume_ml: numberType().int().min(1).max(5e3).optional(),
	shade: noteListSchema.default([]),
	origin: stringType().trim().max(100).optional().default(""),
	expiration_date: stringType().trim().max(100).optional().default(""),
	benefits: noteListSchema.default([]),
	ingredients: noteListSchema.default([]),
	how_to_use: stringType().trim().max(2e3).optional().default("")
});
var categoryInputSchema = objectType({
	id: stringType().uuid().optional(),
	name: stringType().trim().min(2, "اسم الفئة مطلوب").max(60),
	description: stringType().trim().max(1e3).optional().default(""),
	photo: stringType().trim().max(2e3).optional().default("")
});
var adminTokenSchema = objectType({ token: stringType().min(1) });
//#endregion
export { productInputSchema as i, categoryInputSchema as n, orderInputSchema as r, adminTokenSchema as t };
