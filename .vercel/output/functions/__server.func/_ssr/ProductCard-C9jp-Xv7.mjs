import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as formatDZD } from "./format-CVmQyRCQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductCard-C9jp-Xv7.js
var import_jsx_runtime = require_jsx_runtime();
function ProductCard({ product, categoryName }) {
	const soldOut = product.stock <= 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/product/$id",
		params: { id: product.id },
		className: "group flex flex-col overflow-hidden rounded-sm border border-border/60 bg-card/40 transition-all duration-500 hover:border-primary/45 hover:bg-card/70",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-[4/5] overflow-hidden bg-charcoal",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: product.images?.[0] || "/images/perfume-1.jpg",
					alt: product.name,
					loading: "lazy",
					className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(circle_at_50%_80%,color-mix(in_oklab,var(--amber-glow)_28%,transparent),transparent_65%)]" }),
				product.badge && !soldOut && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute right-2 top-2 rounded-full border border-primary/40 bg-background/75 px-2 py-0.5 text-[9px] tracking-wider text-primary backdrop-blur sm:right-3 sm:top-3 sm:px-3 sm:py-1 sm:text-[11px]",
					children: product.badge
				}),
				soldOut && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute right-2 top-2 rounded-full border border-border bg-background/85 px-2 py-0.5 text-[9px] tracking-wider text-muted-foreground backdrop-blur sm:right-3 sm:top-3 sm:px-3 sm:py-1 sm:text-[11px]",
					children: "نفد المخزون"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-1 p-3 sm:gap-2 sm:p-5",
			children: [
				categoryName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[9px] tracking-[0.2em] text-muted-foreground sm:text-[11px] sm:tracking-[0.28em]",
					children: categoryName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-base text-foreground sm:text-2xl",
					children: product.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "line-clamp-2 hidden text-sm leading-6 text-muted-foreground sm:block",
					children: product.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto flex items-center justify-between pt-2 sm:pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-primary sm:text-lg",
						children: formatDZD(product.price)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden text-xs text-muted-foreground sm:block",
						children: soldOut ? "نفد المخزون" : `متوفر: ${product.stock}`
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 inline-flex w-fit border-b border-primary/40 pb-1 text-xs text-primary transition-all group-hover:border-primary sm:mt-3 sm:text-sm",
					children: "اكتشف المنتج"
				})
			]
		})]
	});
}
//#endregion
export { ProductCard as t };
