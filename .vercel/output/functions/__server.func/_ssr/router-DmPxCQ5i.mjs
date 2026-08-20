import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react, r as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as __exportAll } from "./server-B5m_6cZs.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DmPxCQ5i.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var styles_default = "/assets/styles-BSu0O31F.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var CartContext = (0, import_react.createContext)(null);
var STORAGE_KEY = "ambre-cart-v3";
function CartProvider({ children }) {
	const [lines, setLines] = (0, import_react.useState)([]);
	const [isOpen, setOpen] = (0, import_react.useState)(false);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) setLines(JSON.parse(raw));
		} catch {}
		setHydrated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (lines.length > 0) {
			if (!lines.every((item) => "shades" in item)) {
				setLines([]);
				localStorage.removeItem(STORAGE_KEY);
			}
		}
	}, [lines]);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
	}, [lines, hydrated]);
	const add = (0, import_react.useCallback)((line, quantity = 1) => {
		setLines((prev) => {
			if (prev.find((l) => l.product_id === line.product_id)) return prev.map((l) => l.product_id === line.product_id ? {
				...l,
				...line,
				quantity: Math.min(l.quantity + quantity, line.stock)
			} : l);
			return [...prev, {
				...line,
				quantity: Math.min(quantity, line.stock)
			}];
		});
	}, []);
	const setQuantity = (0, import_react.useCallback)((productId, quantity) => {
		setLines((prev) => prev.map((l) => l.product_id === productId ? {
			...l,
			quantity: Math.max(1, Math.min(quantity, l.stock))
		} : l));
	}, []);
	const remove = (0, import_react.useCallback)((productId) => {
		setLines((prev) => prev.filter((l) => l.product_id !== productId));
	}, []);
	const clear = (0, import_react.useCallback)(() => setLines([]), []);
	const value = (0, import_react.useMemo)(() => ({
		lines,
		count: lines.reduce((n, l) => n + l.quantity, 0),
		total: lines.reduce((n, l) => n + l.quantity * l.price, 0),
		isOpen,
		setOpen,
		add,
		setQuantity,
		remove,
		clear
	}), [
		lines,
		isOpen,
		add,
		setQuantity,
		remove,
		clear
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartContext.Provider, {
		value,
		children
	});
}
function useCart() {
	const ctx = (0, import_react.useContext)(CartContext);
	if (!ctx) throw new Error("useCart must be used within CartProvider");
	return ctx;
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-7xl text-gold",
					children: "٤٠٤"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 font-display text-2xl text-foreground",
					children: "الصفحة غير موجودة"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "يبدو أن هذا الأثر العطري قد تلاشى."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:brightness-110",
						children: "العودة إلى المتجر"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl text-foreground",
					children: "تعذّر تحميل الصفحة"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "حدث خطأ غير متوقع. يمكنك المحاولة مرة أخرى أو العودة إلى المتجر."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:brightness-110",
						children: "المحاولة مجدداً"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "rounded-sm border border-border px-6 py-3 text-sm text-foreground transition-colors hover:border-primary/60",
						children: "العودة إلى المتجر"
					})]
				})
			]
		})
	});
}
var Route$7 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Glow & Care | دار عطور فاخرة" },
			{
				name: "description",
				content: "عطور شرقية فاخرة بتوقيع جزائري. اكتشف مجموعتنا وادفع عند الاستلام."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "fr",
		dir: "ltr",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$7.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CartProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			position: "top-center",
			dir: "ltr",
			richColors: true
		})] })
	});
}
var $$splitComponentImporter$6 = () => import("./routes-BKQgfdVV.mjs");
var Route$6 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Glow & Care | مستحضرات التجميل والعناية" },
		{
			name: "description",
			content: "اكتشفي مجموعة Glow & Care الفاخرة لمستحضرات التجميل والعناية بالبشرة. لجمال يشع تألقاً."
		},
		{
			property: "og:title",
			content: "Glow & Care | مستحضرات التجميل والعناية"
		},
		{
			property: "og:description",
			content: "مجموعة مستحضرات تجميل وعناية فاخرة بأسعار بالدينار الجزائري مع الدفع عند الاستلام في كل الولايات."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./admin-CBeYOx_4.mjs");
var Route$5 = createFileRoute("/admin")({
	head: () => ({ meta: [
		{ title: "مساحة الإدارة | Glow & Care" },
		{
			name: "description",
			content: "لوحة إدارة متجر Glow & Care: المنتجات، الفئات والطلبات."
		},
		{
			name: "robots",
			content: "noindex"
		},
		{
			property: "og:title",
			content: "مساحة الإدارة | Glow & Care"
		},
		{
			property: "og:description",
			content: "لوحة تحكم داخلية."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./catalog-B2F3A6B_.mjs");
var Route$4 = createFileRoute("/catalog")({
	validateSearch: (search) => typeof search["category"] === "string" ? { category: search["category"] } : {},
	head: () => ({ meta: [
		{ title: "الكتالوج | Glow & Care" },
		{
			name: "description",
			content: "تصفح مجموعة منتجات Glow & Care الفاخرة للعناية بالبشرة والجمال."
		},
		{
			property: "og:title",
			content: "الكتالوج | Glow & Care"
		},
		{
			property: "og:description",
			content: "مجموعة منتجات فاخرة بأسعار بالدينار الجزائري مع الدفع عند الاستلام."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./checkout-xHJZfW0m.mjs");
var Route$3 = createFileRoute("/checkout")({
	head: () => ({ meta: [
		{ title: "إتمام الطلب | Glow & Care" },
		{
			name: "description",
			content: "أكمل طلبك في دقيقة واحدة دون إنشاء حساب — الدفع عند الاستلام."
		},
		{
			property: "og:title",
			content: "إتمام الطلب | Glow & Care"
		},
		{
			property: "og:description",
			content: "معلومات التوصيل والدفع عند الاستلام في جميع الولايات."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./story-Ccdkt9iD.mjs");
var Route$2 = createFileRoute("/story")({
	head: () => ({ meta: [
		{ title: "قصة العلامة | Glow & Care" },
		{
			name: "description",
			content: "حكاية دار Glow & Care: حرفية عطرية شرقية، مكوّنات نادرة، وتوقيع لا يُنسى."
		},
		{
			property: "og:title",
			content: "قصة العلامة | Glow & Care"
		},
		{
			property: "og:description",
			content: "حكاية دار Glow & Care: حرفية عطرية شرقية ومكوّنات نادرة."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./order._reference-CHb5zk9h.mjs");
var Route$1 = createFileRoute("/order/$reference")({
	head: () => ({ meta: [
		{ title: "تأكيد الطلب | Glow & Care" },
		{
			name: "description",
			content: "تفاصيل طلبك في دار Glow & Care مع الدفع عند الاستلام."
		},
		{
			property: "og:title",
			content: "تأكيد الطلب | Glow & Care"
		},
		{
			property: "og:description",
			content: "تم استلام طلبك بنجاح."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./product._id-B0EvdVpt.mjs");
var Route = createFileRoute("/product/$id")({
	head: () => ({ meta: [
		{ title: "تفاصيل العطر | Glow & Care" },
		{
			name: "description",
			content: "اكتشف الهرم العطري والتفاصيل الكاملة لهذا العطر الفاخر من دار Glow & Care."
		},
		{
			property: "og:title",
			content: "تفاصيل العطر | Glow & Care"
		},
		{
			property: "og:description",
			content: "الهرم العطري، السعر، وحالة المخزون — مع الدفع عند الاستلام."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$6.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$7
	}),
	AdminRoute: Route$5.update({
		id: "/admin",
		path: "/admin",
		getParentRoute: () => Route$7
	}),
	CatalogRoute: Route$4.update({
		id: "/catalog",
		path: "/catalog",
		getParentRoute: () => Route$7
	}),
	CheckoutRoute: Route$3.update({
		id: "/checkout",
		path: "/checkout",
		getParentRoute: () => Route$7
	}),
	StoryRoute: Route$2.update({
		id: "/story",
		path: "/story",
		getParentRoute: () => Route$7
	}),
	OrderReferenceRoute: Route$1.update({
		id: "/order/$reference",
		path: "/order/$reference",
		getParentRoute: () => Route$7
	}),
	ProductIdRoute: Route.update({
		id: "/product/$id",
		path: "/product/$id",
		getParentRoute: () => Route$7
	})
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { useCart as a, Route$4 as i, Route as n, Route$1 as r, router_exports as t };
