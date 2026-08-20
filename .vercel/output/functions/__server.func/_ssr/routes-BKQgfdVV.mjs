import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, n as useQuery, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as productsQuery, t as categoriesQuery } from "./catalog-PiW0eF47.mjs";
import { t as SiteLayout } from "./SiteLayout-C4-mZOea.mjs";
import { t as ProductCard } from "./ProductCard-C9jp-Xv7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BKQgfdVV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var heroImages = [
	"/images/cosmetic-1.png",
	"/images/cosmetic-2.png",
	"/images/cosmetic-3.png"
];
function HomePage() {
	const [currentImageIndex, setCurrentImageIndex] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const timer = setInterval(() => {
			setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
		}, 5e3);
		return () => clearInterval(timer);
	}, []);
	const products = useQuery(productsQuery());
	const categories = useQuery(categoriesQuery());
	const list = products.data ?? [];
	const featured = list.slice(0, 3);
	[...list].sort((a, b) => b.sales_count - a.sales_count).slice(0, 4);
	list[0];
	const categoryName = (id) => categories.data?.find((c) => c.id === id)?.name;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative flex min-h-[85vh] items-center justify-center overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 z-0 bg-background",
				children: [
					heroImages.map((imgSrc, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: imgSrc,
						alt: "زجاجة عطر فاخرة بلون العنبر على خلفية داكنة",
						className: `absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? "opacity-30" : "opacity-0"}`
					}, imgSrc)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "glow-orb pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_50%_50%,color-mix(in_oklab,var(--amber-glow)_30%,transparent),transparent_70%)]" })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10 mx-auto flex max-w-4xl flex-col items-center justify-center px-4 py-16 text-center md:px-8 md:py-28",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "reveal flex w-full flex-col items-center justify-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "glow-orb flex h-64 w-64 items-center justify-center rounded-full [background:radial-gradient(circle,color-mix(in_oklab,var(--amber-glow)_50%,transparent),transparent_70%)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/Logo.png",
								alt: "Glow & Care",
								className: "h-52 w-auto"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-6 font-display text-4xl leading-[1.35] text-foreground sm:text-5xl md:text-7xl md:leading-[1.3]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-foreground",
								children: [
									"GLOW ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-gold",
										children: "&"
									}),
									" CARE"
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-7 max-w-2xl text-base leading-9 text-foreground/90 md:text-lg",
							children: "مستحضرات التجميل والعناية — لجمالٍ يشعّ تألقًا"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/catalog",
								className: "rounded-sm bg-primary px-9 py-4 text-sm font-semibold tracking-wider text-primary-foreground transition-all hover:brightness-110 amber-glow",
								children: "اكتشف المجموعة"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#featured",
								className: "rounded-sm border border-primary/40 px-9 py-4 text-sm tracking-wider text-primary transition-colors hover:bg-primary/10",
								children: "استكشف العطور"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-row flex-wrap items-center justify-center gap-3 w-full sm:w-auto px-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "https://www.tiktok.com/@glowcare.dz1?_r=1&_t=ZS-98zI7lXxGRc",
								target: "_blank",
								rel: "noreferrer",
								className: "rounded-full bg-black px-4 sm:px-9 py-3 sm:py-4 text-sm font-semibold tracking-wider text-white transition-all hover:opacity-80 flex items-center justify-center gap-2 flex-1 sm:flex-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									xmlns: "http://www.w3.org/2000/svg",
									width: "18",
									height: "18",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "2",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" })
								}), "TikTok"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "https://wa.me/213782395611?text=%D8%A3%D8%B1%D9%8A%D8%AF%20%D9%85%D8%B9%D8%B1%D9%81%D8%A9%20%D8%A7%D9%84%D9%85%D8%B2%D9%8A%D8%AF%20%D8%B9%D9%86%20%D9%85%D8%AA%D8%AC%D8%B1%D9%83%D9%85",
								target: "_blank",
								rel: "noreferrer",
								className: "rounded-full bg-[#25D366] px-4 sm:px-9 py-3 sm:py-4 text-sm font-semibold tracking-wider text-white transition-all hover:opacity-80 flex items-center justify-center gap-2 flex-1 sm:flex-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									xmlns: "http://www.w3.org/2000/svg",
									width: "18",
									height: "18",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "2",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z" })
								}), "WhatsApp"]
							})]
						})
					]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				kicker: "",
				title: "تصفح حسب الفئة"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory",
				children: (categories.data ?? []).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/catalog",
					search: { category: c.id },
					className: "group flex-none flex flex-col items-center gap-4 text-center snap-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative h-32 w-32 overflow-hidden rounded-full border-2 border-border/40 transition-all duration-500 group-hover:scale-105 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(200,162,74,0.15)] sm:h-40 sm:w-40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: c.photo || "/images/perfume-2.jpg",
							alt: c.name,
							className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg text-foreground transition-colors group-hover:text-primary sm:text-xl",
						children: c.name
					})]
				}, c.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			id: "featured",
			className: "mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				kicker: "مختارات الدار",
				title: "المنتجات المميزة"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 grid grid-cols-2 gap-4 sm:gap-7 lg:grid-cols-3",
				children: [featured.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
					product: p,
					categoryName: categoryName(p.category_id)
				}, p.id)), products.isLoading && [
					0,
					1,
					2
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-[520px] animate-pulse rounded-sm bg-card/50" }, i))]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-7xl px-4 pb-8 md:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded-sm border border-primary/25 bg-card/40 px-6 py-16 text-center md:py-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "glow-orb pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_50%_120%,color-mix(in_oklab,var(--amber-glow)_28%,transparent),transparent_65%)]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-4xl text-foreground md:text-5xl lg:text-6xl",
						children: "اترك أثرك"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "relative mx-auto mt-5 max-w-lg text-sm leading-8 text-muted-foreground",
						children: "توصيل إلى جميع الولايات مع الدفع عند الاستلام"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/catalog",
						className: "relative mt-9 inline-block rounded-sm bg-primary px-10 py-4 text-sm font-semibold tracking-wider text-primary-foreground transition-all hover:brightness-110",
						children: "اكتشف المجموعة"
					})
				]
			})
		})
	] });
}
function SectionHeading({ kicker, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-center",
		children: [
			kicker && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-[0.45em] text-primary/80",
				children: kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: `${kicker ? "mt-4 " : ""}font-display text-3xl text-foreground md:text-4xl`,
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-6 w-40 gold-rule" })
		]
	});
}
//#endregion
export { HomePage as component };
