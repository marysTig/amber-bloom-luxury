import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Star, X } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { getOrderByReference, submitReview } from "@/lib/shop.functions";
import { formatDZD } from "@/lib/format";

export const Route = createFileRoute("/order/$reference")({
  head: () => ({
    meta: [
      { title: "تأكيد الطلب | Glow & Care" },
      { name: "description", content: "تفاصيل طلبك في دار Glow & Care مع الدفع عند الاستلام." },
      { property: "og:title", content: "تأكيد الطلب | Glow & Care" },
      { property: "og:description", content: "تم استلام طلبك بنجاح." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderPage,
});

function OrderPage() {
  const { reference } = Route.useParams();
  const fetchOrder = useServerFn(getOrderByReference);
  const { data, isLoading } = useQuery({
    queryKey: ["order", reference],
    queryFn: () => fetchOrder({ data: { reference } }),
  });

  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-4 py-20 md:px-8 md:py-28">
        {isLoading ? (
          <div className="h-80 animate-pulse rounded-sm bg-card/50" />
        ) : !data ? (
          <div className="text-center">
            <h1 className="font-display text-3xl text-foreground">لم يُعثر على هذا الطلب</h1>
            <Link
              to="/catalog"
              className="mt-8 inline-block rounded-sm bg-primary px-8 py-4 text-sm text-primary-foreground"
            >
              العودة إلى المتجر
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center">
              <div className="glow-orb mx-auto h-32 w-32 rounded-full [background:radial-gradient(circle,color-mix(in_oklab,var(--amber-glow)_50%,transparent),transparent_70%)] flex items-center justify-center">
                <img src="/Logo.png" alt="Glow & Care" className="h-28 w-auto opacity-95" />
              </div>
              <h1 className="mt-6 font-display text-3xl text-foreground md:text-4xl">
                تم استلام طلبك بنجاح ✦
              </h1>
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                شكراً لثقتك بنا. سيتم التواصل معك لتأكيد طلبك.
              </p>
            </div>

            <div className="mt-12 rounded-sm border border-border/60 bg-card/40 p-6 md:p-8">
              <Row label="رقم الطلب" value={data.reference} />
              <Row label="اسم العميل" value={data.customer_name} />
              <Row label="الهاتف" value={data.phone} />
              <Row label="الولاية" value={data.wilaya} />
              <Row label="العنوان" value={data.address} />

              <div className="my-6 gold-rule" />

              <h2 className="font-display text-xl text-foreground">المنتجات</h2>
              <ul className="mt-4 space-y-3">
                {data.items.map((item) => (
                  <li key={item.id} className="flex items-center justify-between text-sm">
                    <span className="text-foreground/90">
                      {item.product_name} × {item.quantity}
                    </span>
                    <span className="text-primary">{formatDZD(Number(item.subtotal))}</span>
                  </li>
                ))}
              </ul>

              <div className="my-6 gold-rule" />

              <div className="flex items-center justify-between text-lg">
                <span className="text-foreground">المجموع</span>
                <span className="text-primary">{formatDZD(Number(data.total))}</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                طريقة الدفع: الدفع عند الاستلام
              </p>
            </div>

            <ReviewSection orderReference={data.reference} />

            <div className="mt-10 text-center">
              <Link
                to="/"
                className="inline-block rounded-sm bg-primary px-10 py-4 text-sm font-semibold tracking-wider text-primary-foreground transition-all hover:brightness-110"
              >
                العودة إلى المتجر
              </Link>
            </div>
          </>
        )}
      </section>
    </SiteLayout>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 py-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}

function ReviewSection({ orderReference }: { orderReference: string }) {
  const [open, setOpen] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [rating, setRating] = useState(5);
  const [firstName, setFirstName] = useState("");
  const [description, setDescription] = useState("");
  const sendReview = useServerFn(submitReview);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !description.trim()) {
      toast.error("يرجى ملء جميع الحقول");
      return;
    }
    
    setPending(true);
    try {
      await sendReview({
        data: {
          first_name: firstName,
          rating,
          description,
          order_reference: orderReference,
        },
      });
      setSubmitted(true);
      toast.success("تم إرسال تقييمك بنجاح. شكراً لك!");
      setTimeout(() => setOpen(false), 3000);
    } catch (err) {
      toast.error("تعذر إرسال التقييم، يرجى المحاولة لاحقاً");
    } finally {
      setPending(false);
    }
  };

  if (!open) return null;

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-300">
        <div className="relative w-full max-w-md rounded-sm border border-primary/20 bg-card p-6 md:p-8 text-center elegant-shadow animate-in zoom-in-95">
          <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
          <Star className="mx-auto h-12 w-12 text-[#C8A24A] mb-4 fill-[#C8A24A]" />
          <h3 className="font-display text-2xl text-foreground">شكراً لتقييمك!</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            تم استلام تقييمك بنجاح، سيتم مراجعته وعرضه في الموقع.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-md rounded-sm border border-border/60 bg-card p-6 md:p-8 elegant-shadow animate-in zoom-in-95">
        <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="h-5 w-5" />
        </button>
        
        <h3 className="font-display text-2xl text-foreground text-center mt-2">ما رأيك في تجربتك معنا؟</h3>
        <p className="mt-2 text-center text-sm text-muted-foreground mb-8">
          يسعدنا سماع رأيك لمساعدتنا على تحسين خدماتنا
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm text-foreground/85">التقييم</label>
            <div className="flex gap-2 justify-center py-2" dir="ltr">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star
                    className={`h-9 w-9 ${
                      star <= rating ? "fill-[#C8A24A] text-[#C8A24A]" : "text-muted-foreground/30"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-foreground/85">الاسم</label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              maxLength={100}
              className="input-base"
              placeholder="الاسم الأول"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-foreground/85">رأيك</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={1000}
              rows={4}
              className="input-base resize-none"
              placeholder="اكتب تقييمك هنا..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="flex w-full items-center justify-center gap-2 rounded-sm bg-primary py-3.5 text-sm font-semibold tracking-wider text-primary-foreground transition-all hover:brightness-110 disabled:opacity-60"
          >
            {pending && <Loader2 className="h-4 w-4 animate-spin" />}
            {pending ? "جارٍ الإرسال..." : "إرسال التقييم"}
          </button>
        </form>
      </div>
    </div>
  );
}
