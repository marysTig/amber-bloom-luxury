import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, n as useQuery, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as productQuery, t as categoriesQuery } from "./catalog-PiW0eF47.mjs";
import { t as formatDZD } from "./format-CVmQyRCQ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { d as Minus, l as Plus } from "../_libs/lucide-react.mjs";
import { a as useCart, n as Route } from "./router-DmPxCQ5i.mjs";
import { t as SiteLayout } from "./SiteLayout-C4-mZOea.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product._id-B0EvdVpt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductPage() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const { data: product, isLoading, isError } = useQuery(productQuery(id));
	const categories = useQuery(categoriesQuery());
	const { add, setOpen } = useCart();
	const [qty, setQty] = (0, import_react.useState)(1);
	const [activeImageIndex, setActiveImageIndex] = (0, import_react.useState)(0);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-7xl px-4 py-24 md:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-[60vh] animate-pulse rounded-sm bg-card/50" })
	}) });
	if (isError || !product) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-4 py-32 text-center md:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl text-foreground",
			children: "هذا العطر غير متوفر"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/catalog",
			className: "mt-8 inline-block rounded-sm bg-primary px-8 py-4 text-sm text-primary-foreground",
			children: "العودة إلى الكتالوج"
		})]
	}) });
	const soldOut = product.stock <= 0;
	const categoryName = categories.data?.find((c) => c.id === product.category_id)?.name;
	const addToCart = () => {
		if (soldOut) return;
		add({
			product_id: product.id,
			name: product.name,
			price: product.price,
			image: product.images?.[0] || "",
			stock: product.stock,
			shades: product.shade
		}, qty);
		toast.success("تمت إضافة العطر إلى السلة");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-12 md:grid-cols-2 md:gap-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "glow-orb pointer-events-none absolute inset-0",
						style: { background: `radial-gradient(circle at 50% 55%, #E8B8B855, transparent 65%)` }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: product.images?.[activeImageIndex] || "/images/perfume-1.jpg",
						alt: product.name,
						className: "relative aspect-square w-full rounded-sm object-cover elegant-shadow"
					})]
				}), product.images && product.images.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-3 overflow-x-auto pb-2 scrollbar-none",
					children: product.images.map((img, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setActiveImageIndex(idx),
						className: `relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm border-2 transition-all ${activeImageIndex === idx ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: img,
							alt: `${product.name} ${idx + 1}`,
							className: "h-full w-full object-cover"
						})
					}, idx))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center text-center",
				children: [
					categoryName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] tracking-[0.4em] text-primary/80",
						children: categoryName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-5 font-display text-4xl text-foreground md:text-5xl",
						children: product.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-2xl text-primary",
						children: formatDZD(product.price)
					}),
					(product.origin || product.expiration_date || product.volume_ml) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 w-full max-w-sm space-y-2 text-sm text-muted-foreground bg-card/50 p-4 rounded-sm border border-border/50 text-center mx-auto",
						children: [
							product.volume_ml && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground",
									children: "الحجم:"
								}),
								" ",
								product.volume_ml,
								" مل"
							] }),
							product.origin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground",
									children: "بلد الصنع:"
								}),
								" ",
								product.origin
							] }),
							product.expiration_date && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground",
									children: "تاريخ الصلاحية:"
								}),
								" ",
								product.expiration_date
							] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex items-center justify-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `inline-block h-2.5 w-2.5 rounded-full ${soldOut ? "bg-destructive" : "bg-primary"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted-foreground",
							children: soldOut ? "نفد المخزون" : `متوفر في المخزون (${product.stock})`
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-col items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted-foreground",
							children: "الكمية"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-center rounded-sm border border-border/70",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": "إنقاص",
									disabled: soldOut,
									onClick: () => setQty((q) => Math.max(1, q - 1)),
									className: "flex h-12 w-12 items-center justify-center text-muted-foreground hover:text-primary disabled:opacity-40",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-12 text-center",
									children: qty
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": "زيادة",
									disabled: soldOut,
									onClick: () => setQty((q) => Math.min(product.stock, q + 1)),
									className: "flex h-12 w-12 items-center justify-center text-muted-foreground hover:text-primary disabled:opacity-40",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-9 flex flex-wrap justify-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: addToCart,
							disabled: soldOut,
							className: "rounded-sm border border-primary/50 px-9 py-4 text-sm tracking-wider text-primary transition-colors hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-40",
							children: "أضف إلى السلة"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: soldOut,
							onClick: () => {
								addToCart();
								setOpen(false);
								navigate({ to: "/checkout" });
							},
							className: "rounded-sm bg-primary px-9 py-4 text-sm font-semibold tracking-wider text-primary-foreground transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40",
							children: "اطلب الآن"
						})]
					}),
					soldOut && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-sm text-destructive",
						children: "نفد المخزون — لا يمكن طلب هذا العطر حالياً."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-10 text-base leading-9 text-muted-foreground",
						children: product.description
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-20 grid gap-8 md:grid-cols-3 md:gap-12",
			children: [
				product.benefits && product.benefits.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-sm border border-border/50 bg-card p-8 elegant-shadow",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl text-primary mb-4 border-b border-border/50 pb-2",
						children: "الفوائد"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2 text-muted-foreground",
						children: product.benefits.map((benefit, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-primary/60" }), benefit]
						}, i))
					})]
				}),
				product.ingredients && product.ingredients.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-sm border border-border/50 bg-card p-8 elegant-shadow",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl text-primary mb-4 border-b border-border/50 pb-2",
						children: "المكونات الأساسية"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2 text-muted-foreground",
						children: product.ingredients.map((ingredient, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-primary/60" }), ingredient]
						}, i))
					})]
				}),
				product.how_to_use && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-sm border border-border/50 bg-card p-8 elegant-shadow",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl text-primary mb-4 border-b border-border/50 pb-2",
						children: "طريقة الاستخدام"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground leading-relaxed whitespace-pre-wrap",
						children: product.how_to_use
					})]
				})
			]
		})]
	}) });
}
//#endregion
export { ProductPage as component };
