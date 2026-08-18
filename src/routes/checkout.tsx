import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2, ShieldCheck } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useCart } from "@/lib/cart";
import { formatDZD, WILAYAS } from "@/lib/format";
import { orderInputSchema } from "@/lib/shop.schemas";
import { submitOrder } from "@/lib/shop.functions";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "إتمام الطلب | عَنبَر" },
      {
        name: "description",
        content: "أكمل طلبك في دقيقة واحدة دون إنشاء حساب — الدفع عند الاستلام.",
      },
      { property: "og:title", content: "إتمام الطلب | عَنبَر" },
      {
        property: "og:description",
        content: "معلومات التوصيل والدفع عند الاستلام في جميع الولايات.",
      },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { lines, total, clear } = useCart();
  const navigate = useNavigate();
  const send = useServerFn(submitOrder);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    wilaya: "",
    address: "",
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = orderInputSchema.safeParse({
      ...form,
      items: lines.map((l) => ({ product_id: l.product_id, quantity: l.quantity })),
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
            اكتشف العطور
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
                {WILAYAS.map((w) => (
                  <option key={w} value={w} className="bg-card">
                    {w}
                  </option>
                ))}
              </select>
            </Field>

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
                <li key={l.product_id} className="flex items-center gap-4">
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
            <div className="mt-5 flex items-center justify-between text-sm text-muted-foreground">
              <span>المجموع الفرعي</span>
              <span>{formatDZD(total)}</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-lg">
              <span className="text-foreground">المجموع النهائي</span>
              <span className="text-primary">{formatDZD(total)}</span>
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
