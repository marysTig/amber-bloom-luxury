import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, n as useQuery, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useServerFn } from "./createSsrRpc-DbFQTLa_.mjs";
import { r as orderInputSchema } from "./shop.schemas-7IntXOuV.mjs";
import { t as formatDZD } from "./format-CVmQyRCQ.mjs";
import { t as wilayas_with_municipalities_default } from "./wilayas-with-municipalities-f6l3UAcX.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { g as House, h as LoaderCircle, s as ShieldCheck, x as Building2 } from "../_libs/lucide-react.mjs";
import { a as useCart } from "./router-DmPxCQ5i.mjs";
import { t as SiteLayout } from "./SiteLayout-C4-mZOea.mjs";
import { r as submitOrder, t as getDeliveryFees } from "./shop.functions-CWEZeEyC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-xHJZfW0m.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CheckoutPage() {
	const { lines, total, clear } = useCart();
	const navigate = useNavigate();
	const send = useServerFn(submitOrder);
	const fetchFees = useServerFn(getDeliveryFees);
	const [pending, setPending] = (0, import_react.useState)(false);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [deliveryType, setDeliveryType] = (0, import_react.useState)("desk");
	const [form, setForm] = (0, import_react.useState)({
		customer_name: "",
		phone: "",
		wilaya: "",
		commune: "",
		address: ""
	});
	const [selectedShades, setSelectedShades] = (0, import_react.useState)({});
	const { data: deliveryFees = [] } = useQuery({
		queryKey: ["delivery-fees"],
		queryFn: () => fetchFees({ data: void 0 }),
		staleTime: 3e5
	});
	const update = (key, value) => {
		if (key === "wilaya") setForm((f) => ({
			...f,
			wilaya: value,
			commune: ""
		}));
		else setForm((f) => ({
			...f,
			[key]: value
		}));
	};
	const selectedWilayaData = wilayas_with_municipalities_default.find((w) => w.nameFr === form.wilaya);
	const currentFee = deliveryFees.find((f) => f.wilaya_name_fr === form.wilaya);
	const deliveryFeeAmount = currentFee ? deliveryType === "desk" ? currentFee.desk_price : currentFee.home_price : null;
	const grandTotal = total + (deliveryFeeAmount ?? 0);
	const onSubmit = async (e) => {
		e.preventDefault();
		if (lines.filter((l) => l.shades && l.shades.length > 0 && !selectedShades[l.product_id]).length > 0) {
			toast.error("يرجى اختيار الدرجة/اللون لجميع المنتجات المطلوبة");
			return;
		}
		const parsed = orderInputSchema.safeParse({
			...form,
			delivery_fee: deliveryFeeAmount || 0,
			delivery_type: deliveryType,
			items: lines.map((l) => ({
				product_id: l.product_id,
				quantity: l.quantity,
				selected_shade: selectedShades[l.product_id] || void 0
			}))
		});
		if (!parsed.success) {
			const next = {};
			for (const issue of parsed.error.issues) {
				const key = String(issue.path[0] ?? "form");
				if (!next[key]) next[key] = issue.message;
			}
			setErrors(next);
			toast.error("يرجى مراجعة معلومات التوصيل");
			return;
		}
		setErrors({});
		setPending(true);
		try {
			const result = await send({ data: parsed.data });
			clear();
			toast.success("تم استلام طلبك بنجاح");
			navigate({
				to: "/order/$reference",
				params: { reference: result.reference }
			});
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "تعذّر إرسال الطلب");
		} finally {
			setPending(false);
		}
	};
	if (lines.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl px-4 py-32 text-center md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl text-foreground",
				children: "سلتك فارغة"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted-foreground",
				children: "أضف عطراً واحداً على الأقل لإتمام الطلب."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/catalog",
				className: "mt-8 inline-block rounded-sm bg-primary px-8 py-4 text-sm text-primary-foreground",
				children: "découvre nos produits"
			})
		]
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-[0.45em] text-primary/80",
					children: "الخطوة الأخيرة"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-5 font-display text-4xl text-foreground md:text-5xl",
					children: "معلومات التوصيل"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-6 w-40 gold-rule" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-14 grid gap-10 lg:grid-cols-[1.3fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "space-y-6 rounded-sm border border-border/60 bg-card/40 p-6 md:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "الاسم الكامل",
						error: errors["customer_name"],
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.customer_name,
							onChange: (e) => update("customer_name", e.target.value),
							maxLength: 120,
							className: "input-base",
							placeholder: "مثال: أمين بن علي"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "رقم الهاتف",
						error: errors["phone"],
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.phone,
							onChange: (e) => update("phone", e.target.value),
							maxLength: 20,
							inputMode: "tel",
							className: "input-base",
							placeholder: "0X XX XX XX XX"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "الولاية",
						error: errors["wilaya"],
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: form.wilaya,
							onChange: (e) => update("wilaya", e.target.value),
							className: "input-base",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								className: "bg-card",
								children: "اختر الولاية"
							}), wilayas_with_municipalities_default.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: w.nameFr,
								className: "bg-card",
								children: [
									String(w.wilayaCode).padStart(2, "0"),
									" - ",
									w.nameAr
								]
							}, w.wilayaCode))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "البلدية",
						error: errors["commune"],
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: form.commune,
							onChange: (e) => update("commune", e.target.value),
							className: "input-base",
							disabled: !form.wilaya,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								className: "bg-card",
								children: "اختر البلدية"
							}), selectedWilayaData?.communes.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c.nameAr,
								className: "bg-card",
								children: c.nameAr
							}, c.id))]
						})
					}),
					form.wilaya && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 block text-sm text-foreground/85",
						children: "نوع التوصيل"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setDeliveryType("desk"),
							className: `flex flex-col items-center gap-2 rounded-sm border p-4 text-sm transition-all ${deliveryType === "desk" ? "border-primary bg-primary/10 text-primary" : "border-border/60 text-muted-foreground hover:border-primary/50"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-5 w-5" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: "البيرو (Bureau)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs",
									children: !currentFee || currentFee.desk_price === 0 ? "مجاني" : formatDZD(currentFee.desk_price)
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setDeliveryType("home"),
							className: `flex flex-col items-center gap-2 rounded-sm border p-4 text-sm transition-all ${deliveryType === "home" ? "border-primary bg-primary/10 text-primary" : "border-border/60 text-muted-foreground hover:border-primary/50"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "h-5 w-5" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: "للمنزل (Domicile)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs",
									children: !currentFee || currentFee.home_price === 0 ? "مجاني" : formatDZD(currentFee.home_price)
								})
							]
						})]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "العنوان بالتفصيل",
						error: errors["address"],
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: form.address,
							onChange: (e) => update("address", e.target.value),
							maxLength: 500,
							rows: 4,
							className: "input-base resize-none",
							placeholder: "البلدية، الحي، الشارع، نقطة دالة..."
						})
					}),
					lines.some((l) => l.shades && l.shades.length > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5 rounded-sm border border-border/50 bg-background/50 p-5 elegant-shadow",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg text-primary border-b border-border/50 pb-2",
							children: "خيارات المنتجات"
						}), lines.filter((l) => l.shades && l.shades.length > 0).map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-foreground/90",
								children: [
									"الدرجة / اللون لـ ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-foreground",
										children: l.name
									}),
									":"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: l.shades.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setSelectedShades((prev) => ({
										...prev,
										[l.product_id]: s
									})),
									className: `rounded-sm border px-4 py-2 text-sm transition-all duration-200 ${selectedShades[l.product_id] === s ? "border-primary bg-primary/10 text-primary font-medium shadow-sm" : "border-border/60 text-muted-foreground hover:border-primary/60 hover:text-foreground"}`,
									children: s
								}, s))
							})]
						}, l.product_id))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-sm border border-primary/25 bg-primary/5 p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-foreground",
								children: "الدفع عند الاستلام"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 pr-8 text-sm text-muted-foreground",
							children: "ادفع عند استلام طلبك. لا حاجة لإنشاء حساب أو بطاقة بنكية."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "submit",
						disabled: pending,
						className: "flex w-full items-center justify-center gap-2 rounded-sm bg-primary py-4 text-sm font-semibold tracking-wider text-primary-foreground transition-all hover:brightness-110 disabled:opacity-60",
						children: [pending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), pending ? "جارٍ إرسال الطلب..." : "تأكيد الطلب"]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "h-fit rounded-sm border border-border/60 bg-card/40 p-6 md:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-foreground",
						children: "ملخص الطلب"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-6 space-y-4",
						children: lines.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-4 border-b border-border/50 pb-3 last:border-0 last:pb-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: l.image || "/images/perfume-1.jpg",
									alt: l.name,
									loading: "lazy",
									className: "h-16 w-14 rounded-sm object-cover"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-foreground",
										children: l.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: ["الكمية: ", l.quantity]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-primary",
									children: formatDZD(l.price * l.quantity)
								})
							]
						}, l.product_id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-6 gold-rule" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 space-y-3 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "المجموع الفرعي" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatDZD(total) })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: deliveryType === "desk" ? "توصيل البيرو" : "توصيل للمنزل" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: !form.wilaya ? "—" : deliveryFeeAmount === 0 ? "مجاني" : deliveryFeeAmount !== null ? formatDZD(deliveryFeeAmount) : "مجاني" })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4 gold-rule" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center justify-between text-lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground",
							children: "المجموع النهائي"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							children: formatDZD(grandTotal)
						})]
					})
				]
			})]
		})]
	}) });
}
function Field({ label, error, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mb-2 block text-sm text-foreground/85",
				children: label
			}),
			children,
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-2 block text-xs text-destructive",
				children: error
			})
		]
	});
}
//#endregion
export { CheckoutPage as component };
