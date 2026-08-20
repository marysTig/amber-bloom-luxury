import { t as queryOptions } from "../_libs/react+tanstack__react-query.mjs";
import { n as supabase } from "./client-jT8hdv3w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog-PiW0eF47.js
var PRODUCT_FIELDS = "id, category_id, name, price, stock, description, benefits, ingredients, how_to_use, volume_ml, shade, origin, expiration_date, images, badge, sales_count, created_at";
var categoriesQuery = () => queryOptions({
	queryKey: ["categories"],
	queryFn: async () => {
		const { data, error } = await supabase.from("categories").select("id, name, description, photo").order("created_at", { ascending: true });
		if (error) throw new Error(error.message);
		return data ?? [];
	}
});
var productsQuery = () => queryOptions({
	queryKey: ["products"],
	queryFn: async () => {
		const { data, error } = await supabase.from("products").select(PRODUCT_FIELDS).order("created_at", { ascending: false });
		if (error) throw new Error(error.message);
		return (data ?? []).map((p) => ({
			...p,
			price: Number(p.price)
		}));
	}
});
var productQuery = (id) => queryOptions({
	queryKey: ["product", id],
	queryFn: async () => {
		const { data, error } = await supabase.from("products").select(PRODUCT_FIELDS).eq("id", id).maybeSingle();
		if (error) throw new Error(error.message);
		return data ? {
			...data,
			price: Number(data.price)
		} : null;
	}
});
//#endregion
export { productQuery as n, productsQuery as r, categoriesQuery as t };
