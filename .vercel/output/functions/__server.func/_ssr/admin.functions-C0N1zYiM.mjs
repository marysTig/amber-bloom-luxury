import { r as createServerFn } from "./server-B5m_6cZs2.mjs";
import { a as stringType, i as objectType, n as enumType, r as numberType, t as arrayType } from "../_libs/zod.mjs";
import { i as productInputSchema, n as categoryInputSchema, t as adminTokenSchema } from "./shop.schemas-7IntXOuV.mjs";
import { t as createServerRpc } from "./createServerRpc-BAfqYDU6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.functions-C0N1zYiM.js
var adminLogin_createServerFn_handler = createServerRpc({
	id: "89f029f4fc21ed092423cd54f44fb61078423691288a3a89663a6e0973cd86ea",
	name: "adminLogin",
	filename: "src/lib/admin.functions.ts"
}, (opts) => adminLogin.__executeServer(opts));
var adminLogin = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	email: stringType().email(),
	password: stringType().min(1).max(200)
}).parse(data)).handler(adminLogin_createServerFn_handler, async ({ data }) => {
	const { supabase } = await import("./client-jT8hdv3w.mjs").then((n) => n.t).then((n) => n.t);
	const { data: authData, error } = await supabase.auth.signInWithPassword({
		email: data.email,
		password: data.password
	});
	if (error || !authData.session) throw new Error("بيانات الدخول غير صحيحة");
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	const { data: roleData, error: roleError } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", authData.user.id).maybeSingle();
	console.log("DEBUG LOGIN:", {
		user: authData.user.id,
		roleData,
		roleError
	});
	if (roleError || !roleData || roleData.role !== "admin") throw new Error("ليس لديك صلاحية الإدارة");
	return { token: authData.session.access_token };
});
var adminOverview_createServerFn_handler = createServerRpc({
	id: "65dbdd42678d4cf3348f8143806993df600c6d6e2d11eded1594324413609a95",
	name: "adminOverview",
	filename: "src/lib/admin.functions.ts"
}, (opts) => adminOverview.__executeServer(opts));
var adminOverview = createServerFn({ method: "POST" }).inputValidator((data) => adminTokenSchema.parse(data)).handler(adminOverview_createServerFn_handler, async ({ data }) => {
	const { requireAdmin } = await import("./admin.server-0wmoQzho.mjs");
	await requireAdmin(data.token);
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	const [products, categories, orders] = await Promise.all([
		supabaseAdmin.from("products").select("id", {
			count: "exact",
			head: true
		}),
		supabaseAdmin.from("categories").select("id", {
			count: "exact",
			head: true
		}),
		supabaseAdmin.from("orders").select("status, total")
	]);
	const rows = orders.data ?? [];
	return {
		products: products.count ?? 0,
		categories: categories.count ?? 0,
		pendingOrders: rows.filter((o) => o.status === "قيد الانتظار").length,
		confirmedOrders: rows.filter((o) => o.status === "مؤكد").length,
		inDeliveryOrders: rows.filter((o) => o.status === "في التوصيل").length,
		completedOrders: rows.filter((o) => o.status === "مكتمل").length,
		revenue: rows.filter((o) => o.status === "مكتمل").reduce((sum, o) => sum + Number(o.total), 0)
	};
});
var adminListOrders_createServerFn_handler = createServerRpc({
	id: "573be2cdf3c95bfa88f6bb3d2080ff0b0c620db545ac53f2f5a039a50348d737",
	name: "adminListOrders",
	filename: "src/lib/admin.functions.ts"
}, (opts) => adminListOrders.__executeServer(opts));
var adminListOrders = createServerFn({ method: "POST" }).inputValidator((data) => adminTokenSchema.parse(data)).handler(adminListOrders_createServerFn_handler, async ({ data }) => {
	const { requireAdmin } = await import("./admin.server-0wmoQzho.mjs");
	await requireAdmin(data.token);
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	const { data: orders, error } = await supabaseAdmin.from("orders").select("id, reference, customer_name, phone, wilaya, commune, address, total, status, created_at, order_items(id, product_name, quantity, unit_price, subtotal, selected_shade)").order("created_at", { ascending: false });
	if (error) throw new Error(error.message);
	return orders ?? [];
});
var adminSetOrderStatus_createServerFn_handler = createServerRpc({
	id: "889ae61040d9bd29926ab0915e752bccd669e918182aef01d6c23513a117ad85",
	name: "adminSetOrderStatus",
	filename: "src/lib/admin.functions.ts"
}, (opts) => adminSetOrderStatus.__executeServer(opts));
var adminSetOrderStatus = createServerFn({ method: "POST" }).inputValidator((data) => adminTokenSchema.extend({
	id: stringType().uuid(),
	status: enumType([
		"قيد الانتظار",
		"مؤكد",
		"في التوصيل",
		"مكتمل",
		"ملغي"
	])
}).parse(data)).handler(adminSetOrderStatus_createServerFn_handler, async ({ data }) => {
	const { requireAdmin } = await import("./admin.server-0wmoQzho.mjs");
	await requireAdmin(data.token);
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	const { error } = await supabaseAdmin.from("orders").update({ status: data.status }).eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var adminDeleteOrder_createServerFn_handler = createServerRpc({
	id: "077bc5ff90cc1f578c6597290e83048464fd42de4066d3cccf024c8080b55959",
	name: "adminDeleteOrder",
	filename: "src/lib/admin.functions.ts"
}, (opts) => adminDeleteOrder.__executeServer(opts));
var adminDeleteOrder = createServerFn({ method: "POST" }).inputValidator((data) => adminTokenSchema.extend({ id: stringType().uuid() }).parse(data)).handler(adminDeleteOrder_createServerFn_handler, async ({ data }) => {
	const { requireAdmin } = await import("./admin.server-0wmoQzho.mjs");
	await requireAdmin(data.token);
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	const { error } = await supabaseAdmin.from("orders").delete().eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var adminSaveProduct_createServerFn_handler = createServerRpc({
	id: "0aba47d27a6b467234d5b8b494d16bb446b7ca53f463ecbbd00e9a33a19ef0f3",
	name: "adminSaveProduct",
	filename: "src/lib/admin.functions.ts"
}, (opts) => adminSaveProduct.__executeServer(opts));
var adminSaveProduct = createServerFn({ method: "POST" }).inputValidator((data) => adminTokenSchema.extend({ product: productInputSchema }).parse(data)).handler(adminSaveProduct_createServerFn_handler, async ({ data }) => {
	const { requireAdmin } = await import("./admin.server-0wmoQzho.mjs");
	await requireAdmin(data.token);
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	const { id, ...rawFields } = data.product;
	const fields = Object.fromEntries(Object.entries(rawFields).filter(([, v]) => v !== void 0));
	if (id) {
		const { error } = await supabaseAdmin.from("products").update(fields).eq("id", id);
		if (error) throw new Error(error.message);
	} else {
		const { error } = await supabaseAdmin.from("products").insert(fields);
		if (error) throw new Error(error.message);
	}
	return { ok: true };
});
var adminDeleteProduct_createServerFn_handler = createServerRpc({
	id: "0ddf57ac23192120a1e98e48f57343c6fe83e8a1ddcf5df54be83354a1f768ad",
	name: "adminDeleteProduct",
	filename: "src/lib/admin.functions.ts"
}, (opts) => adminDeleteProduct.__executeServer(opts));
var adminDeleteProduct = createServerFn({ method: "POST" }).inputValidator((data) => adminTokenSchema.extend({ id: stringType().uuid() }).parse(data)).handler(adminDeleteProduct_createServerFn_handler, async ({ data }) => {
	const { requireAdmin } = await import("./admin.server-0wmoQzho.mjs");
	await requireAdmin(data.token);
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	const { error } = await supabaseAdmin.from("products").delete().eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var adminSaveCategory_createServerFn_handler = createServerRpc({
	id: "35f84d67dda2de6df81b7a43c7acdb0df007930bc74b903bb0d1784b68ab2349",
	name: "adminSaveCategory",
	filename: "src/lib/admin.functions.ts"
}, (opts) => adminSaveCategory.__executeServer(opts));
var adminSaveCategory = createServerFn({ method: "POST" }).inputValidator((data) => adminTokenSchema.extend({ category: categoryInputSchema }).parse(data)).handler(adminSaveCategory_createServerFn_handler, async ({ data }) => {
	const { requireAdmin } = await import("./admin.server-0wmoQzho.mjs");
	await requireAdmin(data.token);
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	const { id, name, description, photo } = data.category;
	console.log("DEBUG SAVE CATEGORY:", {
		id,
		name,
		description,
		photo
	});
	if (id) {
		const { error } = await supabaseAdmin.from("categories").update({
			name,
			description,
			photo
		}).eq("id", id);
		if (error) {
			console.error("UPDATE ERROR:", error);
			throw new Error(error.message);
		}
	} else {
		const { error } = await supabaseAdmin.from("categories").insert({
			name,
			description,
			photo
		});
		if (error) {
			console.error("INSERT ERROR:", error);
			throw new Error(error.message);
		}
	}
	return { ok: true };
});
var adminDeleteCategory_createServerFn_handler = createServerRpc({
	id: "950328abc056627e7020b8ee4af15de2c8185c6b4f0fa341cec497db75a14951",
	name: "adminDeleteCategory",
	filename: "src/lib/admin.functions.ts"
}, (opts) => adminDeleteCategory.__executeServer(opts));
var adminDeleteCategory = createServerFn({ method: "POST" }).inputValidator((data) => adminTokenSchema.extend({ id: stringType().uuid() }).parse(data)).handler(adminDeleteCategory_createServerFn_handler, async ({ data }) => {
	const { requireAdmin } = await import("./admin.server-0wmoQzho.mjs");
	await requireAdmin(data.token);
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	const { error } = await supabaseAdmin.from("categories").delete().eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var adminGetDeliveryFees_createServerFn_handler = createServerRpc({
	id: "88d4492d68520da23c630e05ebd5be35f349083b918591673b6fac33c742169c",
	name: "adminGetDeliveryFees",
	filename: "src/lib/admin.functions.ts"
}, (opts) => adminGetDeliveryFees.__executeServer(opts));
var adminGetDeliveryFees = createServerFn({ method: "POST" }).inputValidator((data) => adminTokenSchema.parse(data)).handler(adminGetDeliveryFees_createServerFn_handler, async ({ data }) => {
	const { requireAdmin } = await import("./admin.server-0wmoQzho.mjs");
	await requireAdmin(data.token);
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	const { data: fees, error } = await supabaseAdmin.from("delivery_fees").select("wilaya_code, wilaya_name_fr, desk_price, home_price").order("wilaya_code");
	if (error) throw new Error(error.message);
	return fees ?? [];
});
var adminSaveDeliveryFees_createServerFn_handler = createServerRpc({
	id: "4fc9dfb8da00d94592ccc4eb6f79d8c00a509e62b1662efcfa0746d07851d917",
	name: "adminSaveDeliveryFees",
	filename: "src/lib/admin.functions.ts"
}, (opts) => adminSaveDeliveryFees.__executeServer(opts));
var adminSaveDeliveryFees = createServerFn({ method: "POST" }).inputValidator((data) => adminTokenSchema.extend({ fees: arrayType(objectType({
	wilaya_code: numberType().int().positive(),
	wilaya_name_fr: stringType().min(1),
	desk_price: numberType().min(0),
	home_price: numberType().min(0)
})) }).parse(data)).handler(adminSaveDeliveryFees_createServerFn_handler, async ({ data }) => {
	const { requireAdmin } = await import("./admin.server-0wmoQzho.mjs");
	await requireAdmin(data.token);
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	const { error } = await supabaseAdmin.from("delivery_fees").upsert(data.fees, { onConflict: "wilaya_code" });
	if (error) throw new Error(error.message);
	return { ok: true };
});
var adminUpdateProfile_createServerFn_handler = createServerRpc({
	id: "ee3c33bb2bfb3a4224c48a7449cddde2e0585de0dd9a0f041e0cc2aea5871203",
	name: "adminUpdateProfile",
	filename: "src/lib/admin.functions.ts"
}, (opts) => adminUpdateProfile.__executeServer(opts));
var adminUpdateProfile = createServerFn({ method: "POST" }).inputValidator((data) => adminTokenSchema.extend({
	email: stringType().email().optional(),
	password: stringType().min(6).optional()
}).parse(data)).handler(adminUpdateProfile_createServerFn_handler, async ({ data }) => {
	const { requireAdmin } = await import("./admin.server-0wmoQzho.mjs");
	await requireAdmin(data.token);
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(data.token);
	if (userError || !user) throw new Error("Erreur d'authentification");
	const updateData = {};
	if (data.email && data.email.trim() !== "") updateData.email = data.email;
	if (data.password && data.password.trim() !== "") updateData.password = data.password;
	if (Object.keys(updateData).length > 0) {
		const { error } = await supabaseAdmin.auth.admin.updateUserById(user.id, updateData);
		if (error) throw new Error(error.message);
	}
	return { ok: true };
});
//#endregion
export { adminDeleteCategory_createServerFn_handler, adminDeleteOrder_createServerFn_handler, adminDeleteProduct_createServerFn_handler, adminGetDeliveryFees_createServerFn_handler, adminListOrders_createServerFn_handler, adminLogin_createServerFn_handler, adminOverview_createServerFn_handler, adminSaveCategory_createServerFn_handler, adminSaveDeliveryFees_createServerFn_handler, adminSaveProduct_createServerFn_handler, adminSetOrderStatus_createServerFn_handler, adminUpdateProfile_createServerFn_handler };
