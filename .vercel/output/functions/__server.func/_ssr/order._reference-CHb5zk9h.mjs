import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useServerFn } from "./createSsrRpc-DbFQTLa_.mjs";
import { t as formatDZD } from "./format-CVmQyRCQ.mjs";
import { r as Route$1 } from "./router-DmPxCQ5i.mjs";
import { t as SiteLayout } from "./SiteLayout-C4-mZOea.mjs";
import { n as getOrderByReference } from "./shop.functions-CWEZeEyC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order._reference-CHb5zk9h.js
var import_jsx_runtime = require_jsx_runtime();
function OrderPage() {
	const { reference } = Route$1.useParams();
	const fetchOrder = useServerFn(getOrderByReference);
	const { data, isLoading } = useQuery({
		queryKey: ["order", reference],
		queryFn: () => fetchOrder({ data: { reference } })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-3xl px-4 py-20 md:px-8 md:py-28",
		children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-80 animate-pulse rounded-sm bg-card/50" }) : !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl text-foreground",
				children: "لم يُعثر على هذا الطلب"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/catalog",
				className: "mt-8 inline-block rounded-sm bg-primary px-8 py-4 text-sm text-primary-foreground",
				children: "العودة إلى المتجر"
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "glow-orb mx-auto h-32 w-32 rounded-full [background:radial-gradient(circle,color-mix(in_oklab,var(--amber-glow)_50%,transparent),transparent_70%)] flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/Logo.png",
							alt: "Glow & Care",
							className: "h-28 w-auto opacity-95"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-6 font-display text-3xl text-foreground md:text-4xl",
						children: "تم استلام طلبك بنجاح ✦"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-base leading-8 text-muted-foreground",
						children: "شكراً لثقتك بنا. سيتم التواصل معك لتأكيد طلبك."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 rounded-sm border border-border/60 bg-card/40 p-6 md:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "رقم الطلب",
						value: data.reference
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "اسم العميل",
						value: data.customer_name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "الهاتف",
						value: data.phone
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "الولاية",
						value: data.wilaya
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "العنوان",
						value: data.address
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-6 gold-rule" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl text-foreground",
						children: "المنتجات"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-3",
						children: data.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-foreground/90",
								children: [
									item.product_name,
									" × ",
									item.quantity
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary",
								children: formatDZD(Number(item.subtotal))
							})]
						}, item.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-6 gold-rule" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground",
							children: "المجموع"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							children: formatDZD(Number(data.total))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted-foreground",
						children: "طريقة الدفع: الدفع عند الاستلام"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "inline-block rounded-sm bg-primary px-10 py-4 text-sm font-semibold tracking-wider text-primary-foreground transition-all hover:brightness-110",
					children: "العودة إلى المتجر"
				})
			})
		] })
	}) });
}
function Row({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center justify-between gap-2 py-2 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-foreground",
			children: value
		})]
	});
}
//#endregion
export { OrderPage as component };
