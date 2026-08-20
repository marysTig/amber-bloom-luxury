import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2, ShieldCheck, Home, Building2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useCart } from "@/lib/cart";
import { formatDZD } from "@/lib/format";
import { orderInputSchema } from "@/lib/shop.schemas";
import { submitOrder, getDeliveryFees } from "@/lib/shop.functions";
import wilayasData from "../../wilayas-with-municipalities.json";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "إتمام الطلب | Glow & Care" },
      {
        name: "description",
        content: "أكمل طلبك في دقيقة واحدة دون إنشاء حساب — الدفع عند الاستلام.",
      },
      { property: "og:title", content: "إتمام الطلب | Glow & Care" },
      {
        property: "og:description",
        content: "معلومات التوصيل والدفع عند الاستلام في جميع الولايات.",
      },
    ],
  }),
  component: CheckoutPage,
});

type DeliveryType = "desk" | "home";

function CheckoutPage() {
  const { lines, total, clear } = useCart();
  const navigate = useNavigate();
  const send = useServerFn(submitOrder);
  const fetchFees = useServerFn(getDeliveryFees);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deliveryType, setDeliveryType] = useState<DeliveryType>("desk");
  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    wilaya: "",
    commune: "",
    address: "",
  });
  const [selectedShades, setSelectedShades] = useState<Record<string, string>>({});

  // Load delivery fees
  const { data: deliveryFees = [] } = useQuery({
    queryKey: ["delivery-fees"],
    queryFn: () => fetchFees({ data: undefined }),
    staleTime: 5 * 60 * 1000,
  });

  const update = (key: keyof typeof form, value: string) => {
    if (key === "wilaya") {
      setForm((f) => ({ ...f, wilaya: value, commune: "" }));
    } else {
      setForm((f) => ({ ...f, [key]: value }));
    }
  };

  const selectedWilayaData = wilayasData.find((w) => w.nameFr === form.wilaya);

  // Find fee for selected wilaya
  const currentFee = deliveryFees.find((f) => f.wilaya_name_fr === form.wilaya);
  const deliveryFeeAmount = currentFee
    ? deliveryType === "desk"
      ? currentFee.desk_price
      : currentFee.home_price
    : null;
  const grandTotal = total + (deliveryFeeAmount ?? 0);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for missing shade selections
    const missingShades = lines.filter((l) => l.shades && l.shades.length > 0 && !selectedShades[l.product_id]);
    if (missingShades.length > 0) {
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
        selected_shade: selectedShades[l.product_id] || undefined
      })),
    });

    if (!parsed.success) {
      const next: Record<string, string> = {};
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
      navigate({ to: "/order/$reference", params: { reference: result.reference } });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "تعذّر إرسال الطلب");
    } finally {
      setPending(false);
    }
  };

  if (lines.length === 0) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-xl px-4 py-32 text-center md:px-8">
          <h1 className="font-display text-3xl text-foreground">سلتك فارغة</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            أضف عطراً واحداً على الأقل لإتمام الطلب.
          </p>
          <Link
            to="/catalog"
            className="mt-8 inline-block rounded-sm bg-primary px-8 py-4 text-sm text-primary-foreground"
          >
            découvre nos produits
          </Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-20">
        <div className="text-center">
          <p className="text-[11px] tracking-[0.45em] text-primary/80">الخطوة الأخيرة</p>
          <h1 className="mt-5 font-display text-4xl text-foreground md:text-5xl">
            معلومات التوصيل
          </h1>
          <div className="mx-auto mt-6 w-40 gold-rule" />
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <form onSubmit={onSubmit} className="space-y-6 rounded-sm border border-border/60 bg-card/40 p-6 md:p-8">
            <Field label="الاسم الكامل" error={errors["customer_name"]}>
              <input
                value={form.customer_name}
                onChange={(e) => update("customer_name", e.target.value)}
                maxLength={120}
                className="input-base"
                placeholder="مثال: أمين بن علي"
              />
            </Field>

            <Field label="رقم الهاتف" error={errors["phone"]}>
              <input
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                maxLength={20}
                inputMode="tel"
                className="input-base"
                placeholder="0X XX XX XX XX"
              />
            </Field>

            <Field label="الولاية" error={errors["wilaya"]}>
              <select
                value={form.wilaya}
                onChange={(e) => update("wilaya", e.target.value)}
                className="input-base"
              >
                <option value="" className="bg-card">
                  اختر الولاية
                </option>
                {wilayasData.map((w) => (
                  <option key={w.wilayaCode} value={w.nameFr} className="bg-card">
                    {String(w.wilayaCode).padStart(2, '0')} - {w.nameAr}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="البلدية" error={errors["commune"]}>
              <select
                value={form.commune}
                onChange={(e) => update("commune", e.target.value)}
                className="input-base"
                disabled={!form.wilaya}
              >
                <option value="" className="bg-card">
                  اختر البلدية
                </option>
                {selectedWilayaData?.communes.map((c) => (
                  <option key={c.id} value={c.nameAr} className="bg-card">
                    {c.nameAr}
                  </option>
                ))}
              </select>
            </Field>

            {/* Delivery type selection */}
            {form.wilaya && (
              <div>
                <p className="mb-3 block text-sm text-foreground/85">نوع التوصيل</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryType("desk")}
                    className={`flex flex-col items-center gap-2 rounded-sm border p-4 text-sm transition-all ${
                      deliveryType === "desk"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border/60 text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    <Building2 className="h-5 w-5" />
                    <span className="font-medium">البيرو (Bureau)</span>
                    <span className="text-xs">
                      {(!currentFee || currentFee.desk_price === 0) ? "مجاني" : formatDZD(currentFee.desk_price)}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryType("home")}
                    className={`flex flex-col items-center gap-2 rounded-sm border p-4 text-sm transition-all ${
                      deliveryType === "home"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border/60 text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    <Home className="h-5 w-5" />
                    <span className="font-medium">للمنزل (Domicile)</span>
                    <span className="text-xs">
                      {(!currentFee || currentFee.home_price === 0) ? "مجاني" : formatDZD(currentFee.home_price)}
                    </span>
                  </button>
                </div>
              </div>
            )}

            <Field label="العنوان بالتفصيل" error={errors["address"]}>
              <textarea
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                maxLength={500}
                rows={4}
                className="input-base resize-none"
                placeholder="البلدية، الحي، الشارع، نقطة دالة..."
              />
            </Field>

            {lines.some(l => l.shades && l.shades.length > 0) && (
              <div className="space-y-5 rounded-sm border border-border/50 bg-background/50 p-5 elegant-shadow">
                <h3 className="font-display text-lg text-primary border-b border-border/50 pb-2">خيارات المنتجات</h3>
                {lines.filter(l => l.shades && l.shades.length > 0).map(l => (
                  <div key={l.product_id} className="space-y-2">
                    <p className="text-sm text-foreground/90">
                      الدرجة / اللون لـ <span className="font-medium text-foreground">{l.name}</span>:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {l.shades!.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSelectedShades((prev) => ({ ...prev, [l.product_id]: s }))}
                          className={`rounded-sm border px-4 py-2 text-sm transition-all duration-200 ${
                            selectedShades[l.product_id] === s
                              ? "border-primary bg-primary/10 text-primary font-medium shadow-sm"
                              : "border-border/60 text-muted-foreground hover:border-primary/60 hover:text-foreground"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="rounded-sm border border-primary/25 bg-primary/5 p-5">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span className="text-sm text-foreground">الدفع عند الاستلام</span>
              </div>
              <p className="mt-2 pr-8 text-sm text-muted-foreground">
                ادفع عند استلام طلبك. لا حاجة لإنشاء حساب أو بطاقة بنكية.
              </p>
            </div>

            <button
              type="submit"
              disabled={pending}
              className="flex w-full items-center justify-center gap-2 rounded-sm bg-primary py-4 text-sm font-semibold tracking-wider text-primary-foreground transition-all hover:brightness-110 disabled:opacity-60"
            >
              {pending && <Loader2 className="h-4 w-4 animate-spin" />}
              {pending ? "جارٍ إرسال الطلب..." : "تأكيد الطلب"}
            </button>
          </form>

          <aside className="h-fit rounded-sm border border-border/60 bg-card/40 p-6 md:p-8">
            <h2 className="font-display text-2xl text-foreground">ملخص الطلب</h2>
            <ul className="mt-6 space-y-4">
              {lines.map((l) => (
                <li key={l.product_id} className="flex items-center gap-4 border-b border-border/50 pb-3 last:border-0 last:pb-0">
                  <img
                    src={l.image || "/images/perfume-1.jpg"}
                    alt={l.name}
                    loading="lazy"
                    className="h-16 w-14 rounded-sm object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{l.name}</p>
                    <p className="text-xs text-muted-foreground">الكمية: {l.quantity}</p>
                  </div>
                  <span className="text-sm text-primary">
                    {formatDZD(l.price * l.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 gold-rule" />
            <div className="mt-5 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>المجموع الفرعي</span>
                <span>{formatDZD(total)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>
                  {deliveryType === "desk" ? "توصيل البيرو" : "توصيل للمنزل"}
                </span>
                <span>
                  {!form.wilaya
                    ? "—"
                    : deliveryFeeAmount === 0
                    ? "مجاني"
                    : deliveryFeeAmount !== null
                    ? formatDZD(deliveryFeeAmount)
                    : "مجاني"}
                </span>
              </div>
            </div>
            <div className="mt-4 gold-rule" />
            <div className="mt-4 flex items-center justify-between text-lg">
              <span className="text-foreground">المجموع النهائي</span>
              <span className="text-primary">{formatDZD(grandTotal)}</span>
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-foreground/85">{label}</span>
      {children}
      {error && <span className="mt-2 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
