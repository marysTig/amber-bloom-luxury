import { r as createServerFn } from "./server-B5m_6cZs2.mjs";
import { a as stringType, i as objectType } from "../_libs/zod.mjs";
import { r as orderInputSchema } from "./shop.schemas-7IntXOuV.mjs";
import { t as createServerRpc } from "./createServerRpc-BAfqYDU6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop.functions-BzhFi6CQ.js
var getDeliveryFees_createServerFn_handler = createServerRpc({
	id: "69a8504d74a18043e2ac882ac4ad35f0dcb299dd1afb2741f43c4c093ef738d0",
	name: "getDeliveryFees",
	filename: "src/lib/shop.functions.ts"
}, (opts) => getDeliveryFees.__executeServer(opts));
var getDeliveryFees = createServerFn({ method: "GET" }).handler(getDeliveryFees_createServerFn_handler, async () => {
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	const { data, error } = await supabaseAdmin.from("delivery_fees").select("wilaya_code, wilaya_name_fr, desk_price, home_price").order("wilaya_code");
	if (error) throw new Error(error.message);
	return (data ?? []).map((row) => ({
		wilaya_code: row.wilaya_code,
		wilaya_name_fr: row.wilaya_name_fr,
		desk_price: Number(row.desk_price),
		home_price: Number(row.home_price)
	}));
});
var submitOrder_createServerFn_handler = createServerRpc({
	id: "a588f9e544729348735fe5bdfd638ab14f15e87d805702dc709b2dbb2474f92e",
	name: "submitOrder",
	filename: "src/lib/shop.functions.ts"
}, (opts) => submitOrder.__executeServer(opts));
var submitOrder = createServerFn({ method: "POST" }).inputValidator((data) => orderInputSchema.parse(data)).handler(submitOrder_createServerFn_handler, async ({ data }) => {
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	const fullAddress = data.delivery_fee > 0 ? `${data.address}\n\nنوع التوصيل: ${data.delivery_type === "desk" ? "مكتب (Bureau)" : "منزل (Domicile)"}\nسعر التوصيل: ${data.delivery_fee} دج` : data.address;
	const { data: result, error } = await supabaseAdmin.rpc("create_order", {
		p_customer_name: data.customer_name,
		p_phone: data.phone,
		p_wilaya: data.wilaya,
		p_commune: data.commune,
		p_address: fullAddress,
		p_delivery_fee: data.delivery_fee,
		p_items: data.items
	});
	if (error) throw new Error(error.message || "تعذر إنشاء الطلب");
	const row = Array.isArray(result) ? result[0] : result;
	if (!row) throw new Error("تعذر إنشاء الطلب");
	if (data.delivery_fee > 0) await supabaseAdmin.from("orders").update({ total: Number(row.order_total) + data.delivery_fee }).eq("id", row.order_id);
	return { reference: row.order_reference };
});
var getOrderByReference_createServerFn_handler = createServerRpc({
	id: "3c5ece365351dbd5cbb3f09730a1f03ea9785b5c10f82478b139e03ecf33002a",
	name: "getOrderByReference",
	filename: "src/lib/shop.functions.ts"
}, (opts) => getOrderByReference.__executeServer(opts));
var getOrderByReference = createServerFn({ method: "GET" }).inputValidator((data) => objectType({ reference: stringType().min(3).max(40) }).parse(data)).handler(getOrderByReference_createServerFn_handler, async ({ data }) => {
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	const { data: order, error } = await supabaseAdmin.from("orders").select("id, reference, customer_name, phone, wilaya, commune, address, total, status, created_at").eq("reference", data.reference).maybeSingle();
	if (error) throw new Error(error.message);
	if (!order) return null;
	const { data: items } = await supabaseAdmin.from("order_items").select("id, product_name, quantity, unit_price, subtotal").eq("order_id", order.id);
	return {
		...order,
		items: items ?? []
	};
});
//#endregion
export { getDeliveryFees_createServerFn_handler, getOrderByReference_createServerFn_handler, submitOrder_createServerFn_handler };
