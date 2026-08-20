import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, n as useQuery, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { r as productsQuery, t as categoriesQuery } from "./catalog-PiW0eF47.mjs";
import { c as Search } from "../_libs/lucide-react.mjs";
import { i as Route$4 } from "./router-DmPxCQ5i.mjs";
import { t as SiteLayout } from "./SiteLayout-C4-mZOea.mjs";
import { t as ProductCard } from "./ProductCard-C9jp-Xv7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog-B2F3A6B_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SORTS = [
	{
		value: "newest",
		label: "الأحدث"
	},
	{
		value: "best",
		label: "الأكثر مبيعاً"
	},
	{
		value: "price-asc",
		label: "السعر: من الأقل إلى الأعلى"
	},
	{
		value: "price-desc",
		label: "السعر: من الأعلى إلى الأقل"
	}
];
function CatalogPage() {
	const search = Route$4.useSearch();
	const navigate = Route$4.useNavigate();
	const products = useQuery(productsQuery());
	const categories = useQuery(categoriesQuery());
	const [term, setTerm] = (0, import_react.useState)("");
	const [sort, setSort] = (0, import_react.useState)("newest");
	const activeCategory = search.category ?? "all";
	const list = (0, import_react.useMemo)(() => {
		let items = [...products.data ?? []];
		if (activeCategory !== "all") items = items.filter((p) => p.category_id === activeCategory);
		if (term.trim()) {
			const q = term.trim();
			items = items.filter((p) => p.name.includes(q) || p.description.includes(q));
		}
		switch (sort) {
			case "price-asc":
				items.sort((a, b) => a.price - b.price);
				break;
			case "price-desc":
				items.sort((a, b) => b.price - a.price);
				break;
			case "best":
				items.sort((a, b) => b.sales_count - a.sales_count);
				break;
			default: items.sort((a, b) => b.created_at.localeCompare(a.created_at));
		}
		return items;
	}, [
		products.data,
		activeCategory,
		term,
		sort
	]);
	const setCategory = (id) => navigate({ search: id === "all" ? {} : { category: id } });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] tracking-[0.45em] text-primary/80",
						children: "المجموعة الكاملة"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-5 font-display text-4xl text-foreground md:text-5xl",
						children: "الكتالوج"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-6 w-40 gold-rule" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-full md:max-w-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: term,
							onChange: (e) => setTerm(e.target.value.slice(0, 80)),
							placeholder: "البحث عن منتج...",
							"aria-label": "البحث عن منتج",
							className: "h-13 w-full rounded-sm border border-border/70 bg-card/40 py-4 pr-11 pl-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "sort",
							className: "text-sm text-muted-foreground",
							children: "ترتيب حسب"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "sort",
							value: sort,
							onChange: (e) => setSort(e.target.value),
							className: "h-13 rounded-sm border border-border/70 bg-card/40 px-4 py-3 text-sm text-foreground outline-none focus:border-primary/60",
							children: SORTS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s.value,
								className: "bg-card",
								children: s.label
							}, s.value))
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryChip, {
						active: activeCategory === "all",
						onClick: () => setCategory("all"),
						label: "كل الفئات"
					}), (categories.data ?? []).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryChip, {
						active: activeCategory === c.id,
						onClick: () => setCategory(c.id),
						label: c.name
					}, c.id))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 grid grid-cols-2 gap-4 sm:gap-7 lg:grid-cols-3 xl:grid-cols-4",
				children: [products.isLoading && [
					0,
					1,
					2,
					3
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-[520px] animate-pulse rounded-sm bg-card/50" }, i)), list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
					product: p,
					categoryName: categories.data?.find((c) => c.id === p.category_id)?.name
				}, p.id))]
			}),
			!products.isLoading && list.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-24 text-center text-muted-foreground",
				children: "لا توجد عطور مطابقة لبحثك."
			}),
			products.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-24 text-center text-destructive",
				children: "تعذّر تحميل المنتجات، يرجى المحاولة لاحقاً."
			})
		]
	}) });
}
function CategoryChip({ active, onClick, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: `rounded-full border px-5 py-2.5 text-sm transition-all ${active ? "border-primary bg-primary/15 text-primary" : "border-border/70 text-muted-foreground hover:border-primary/50 hover:text-foreground"}`,
		children: label
	});
}
//#endregion
export { CatalogPage as component };
