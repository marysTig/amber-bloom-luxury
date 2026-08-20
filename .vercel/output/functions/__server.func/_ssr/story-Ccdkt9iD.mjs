import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as SiteLayout } from "./SiteLayout-C4-mZOea.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/story-Ccdkt9iD.js
var import_jsx_runtime = require_jsx_runtime();
var CHAPTERS = [
	{
		title: "البداية",
		body: "بدأت Glow & Care من شغف بالبخور والزيوت العطرية التي كانت تملأ بيوت الجدّات؛ رائحة تُشبه الذاكرة أكثر مما تُشبه العطر."
	},
	{
		title: "المكوّنات",
		body: "نختار العود والعنبر والورد الطائفي والزعفران من مصادر موثوقة، ونعمل مع مركّبين يحترمون صبر الحرفة."
	},
	{
		title: "التوقيع",
		body: "كل عطر يمر بعشرات المحاولات حتى يصل إلى توازنه: مقدمة تجذب، قلب يروي، وقاعدة تبقى."
	}
];
function StoryPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-3xl px-4 py-20 md:px-8 md:py-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-[11px] tracking-[0.45em] text-primary/80",
				children: "قصة العلامة"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-6 text-center font-display text-4xl leading-[1.4] text-foreground md:text-5xl",
				children: "رائحة تُشبه الذاكرة"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-8 w-40 gold-rule" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-16 space-y-14",
				children: CHAPTERS.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "reveal",
					style: { animationDelay: `${i * 120}ms` },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-gold",
						children: c.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-base leading-9 text-muted-foreground",
						children: c.body
					})]
				}, c.title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-20 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/catalog",
					className: "rounded-sm bg-primary px-10 py-4 text-sm font-semibold tracking-wider text-primary-foreground transition-all hover:brightness-110",
					children: "اكتشف المجموعة"
				})
			})
		]
	}) });
}
//#endregion
export { StoryPage as component };
