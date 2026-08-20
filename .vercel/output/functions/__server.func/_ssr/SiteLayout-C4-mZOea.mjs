import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as formatDZD } from "./format-CVmQyRCQ.mjs";
import { d as Minus, f as Menu, i as Trash2, l as Plus, o as ShoppingBag, t as X } from "../_libs/lucide-react.mjs";
import { a as useCart } from "./router-DmPxCQ5i.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SiteLayout-C4-mZOea.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV = [{
	to: "/",
	label: "الرئيسية"
}, {
	to: "/catalog",
	label: "الكتالوج"
}];
function Header() {
	const { count, setOpen } = useCart();
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:h-20 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setMenuOpen((v) => !v),
						"aria-label": "القائمة",
						className: "-mr-2 flex h-11 w-11 items-center justify-center rounded-sm text-foreground/80 transition-colors hover:text-primary md:hidden",
						children: menuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "group flex items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/Logo.png",
							alt: "Glow & Care",
							className: "h-12 w-auto transition-transform duration-300 group-hover:scale-105 md:h-14"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-10 md:flex",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						className: "relative text-sm text-foreground/75 transition-colors hover:text-primary",
						activeProps: { className: "text-primary" },
						activeOptions: { exact: item.to === "/" },
						children: item.label
					}, item.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setOpen(true),
					"aria-label": "سلة المشتريات",
					className: "relative flex h-11 w-11 items-center justify-center rounded-sm border border-border/70 text-foreground/85 transition-colors hover:border-primary/60 hover:text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-5 w-5" }), count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute -left-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground",
						children: count
					})]
				})
			]
		}), menuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "border-t border-border/60 bg-background/95 px-4 py-3 md:hidden",
			children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: item.to,
				onClick: () => setMenuOpen(false),
				className: "block rounded-sm px-2 py-3 text-base text-foreground/85 transition-colors hover:text-primary",
				activeProps: { className: "text-primary" },
				activeOptions: { exact: item.to === "/" },
				children: item.label
			}, item.to))
		})]
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "mt-24 border-t border-border/60 bg-charcoal/60",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-16 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-12 text-center md:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/Logo.png",
									alt: "Glow & Care",
									className: "h-16 w-auto"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 max-w-xs text-sm leading-7 text-foreground/90",
									children: "مستحضرات تجميل وعناية بالبشرة، لجمال يُشرق"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5 flex items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "https://www.tiktok.com/@glowcare.dz1?_r=1&_t=ZS-98zI7lXxGRc",
										target: "_blank",
										rel: "noreferrer",
										className: "text-muted-foreground transition-colors hover:text-primary",
										"aria-label": "TikTok",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											xmlns: "http://www.w3.org/2000/svg",
											width: "20",
											height: "20",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2",
											strokeLinecap: "round",
											strokeLinejoin: "round",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" })
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "https://wa.me/213782395611?text=أريد%20معرفة%20المزيد%20عن%20متجركم",
										target: "_blank",
										rel: "noreferrer",
										className: "text-muted-foreground transition-colors hover:text-primary",
										"aria-label": "WhatsApp",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
											xmlns: "http://www.w3.org/2000/svg",
											width: "20",
											height: "20",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2",
											strokeLinecap: "round",
											strokeLinejoin: "round",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" })]
										})
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm tracking-[0.25em] text-foreground/90",
							children: "التصفح"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-5 space-y-3 text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/catalog",
								className: "transition-colors hover:text-primary",
								children: "الكتالوج"
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/checkout",
								className: "transition-colors hover:text-primary",
								children: "إتمام الطلب"
							}) })]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm tracking-[0.25em] text-foreground/90",
							children: "الخدمة"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-5 space-y-3 text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "الدفع عند الاستلام في جميع الولايات" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "تغليف فاخر مع كل طلب" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "الرد على الاستفسارات خلال 24 ساعة" })
							]
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-14 gold-rule" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex flex-col items-center justify-center gap-4 text-xs text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Glow & Care. جميع الحقوق محفوظة."
					] })
				})
			]
		})
	});
}
function CartDrawer() {
	const { lines, isOpen, setOpen, total, setQuantity, remove } = useCart();
	const navigate = useNavigate();
	if (!isOpen) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": "إغلاق السلة",
			onClick: () => setOpen(false),
			className: "flex-1 bg-background/75 backdrop-blur-sm"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "flex h-full w-full max-w-md flex-col border-l border-border/70 bg-card shadow-2xl duration-300 animate-in slide-in-from-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-border/60 px-6 py-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-foreground",
					children: "سلة المشتريات"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setOpen(false),
					"aria-label": "إغلاق",
					className: "flex h-10 w-10 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				})]
			}), lines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "glow-orb h-24 w-24 rounded-full [background:radial-gradient(circle,color-mix(in_oklab,var(--amber-glow)_45%,transparent),transparent_70%)]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl text-foreground",
						children: "سلتك فارغة"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "tu n'as pas ajouté de produit"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/catalog",
						onClick: () => setOpen(false),
						className: "mt-2 rounded-sm border border-primary/50 px-7 py-3 text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground",
						children: "découvre nos produits"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-y-auto px-6 py-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-5",
					children: lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: line.image || "/images/perfume-1.jpg",
							alt: line.name,
							loading: "lazy",
							className: "h-24 w-20 rounded-sm object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-1 flex-col",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-lg text-foreground",
										children: line.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => remove(line.product_id),
										"aria-label": "حذف المنتج",
										className: "text-muted-foreground transition-colors hover:text-destructive",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-primary",
									children: formatDZD(line.price)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-auto flex items-center gap-3 pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center rounded-sm border border-border/70",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												"aria-label": "إنقاص",
												onClick: () => setQuantity(line.product_id, line.quantity - 1),
												className: "flex h-9 w-9 items-center justify-center text-muted-foreground hover:text-primary",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-4 w-4" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "w-9 text-center text-sm",
												children: line.quantity
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												"aria-label": "زيادة",
												onClick: () => setQuantity(line.product_id, line.quantity + 1),
												className: "flex h-9 w-9 items-center justify-center text-muted-foreground hover:text-primary",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-muted-foreground",
										children: formatDZD(line.price * line.quantity)
									})]
								})
							]
						})]
					}, line.product_id))
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border/60 px-6 py-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "المجموع الفرعي" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatDZD(total) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-center justify-between text-lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground",
							children: "المجموع النهائي"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							children: formatDZD(total)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setOpen(false);
							navigate({ to: "/checkout" });
						},
						className: "mt-5 w-full rounded-sm bg-primary py-4 text-sm font-semibold tracking-wider text-primary-foreground transition-all hover:brightness-110",
						children: "إتمام الطلب"
					})
				]
			})] })]
		})]
	});
}
function SiteLayout({ children }) {
	const { count, total, setOpen } = useCart();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartDrawer, {}),
			count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setOpen(true),
				className: "fixed inset-x-4 bottom-4 z-30 flex items-center justify-between rounded-sm bg-primary px-5 py-4 text-primary-foreground elegant-shadow md:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-2 text-sm font-semibold",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4 w-4" }),
						"عرض السلة (",
						count,
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-semibold",
					children: formatDZD(total)
				})]
			})
		]
	});
}
//#endregion
export { SiteLayout as t };
