import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { SiteLayout } from "@/components/site/SiteLayout";
import { getOrderByReference } from "@/lib/shop.functions";
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
