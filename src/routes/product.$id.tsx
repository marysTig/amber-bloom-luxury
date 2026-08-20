import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { categoriesQuery, productQuery } from "@/lib/catalog";
import { formatDZD } from "@/lib/format";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/product/$id")({
  head: () => ({
    meta: [
      { title: "تفاصيل العطر | Glow & Care" },
      {
        name: "description",
        content: "اكتشف الهرم العطري والتفاصيل الكاملة لهذا العطر الفاخر من دار Glow & Care.",
      },
      { property: "og:title", content: "تفاصيل العطر | Glow & Care" },
      {
        property: "og:description",
        content: "الهرم العطري، السعر، وحالة المخزون — مع الدفع عند الاستلام.",
      },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useQuery(productQuery(id));
  const categories = useQuery(categoriesQuery());
  const { add, setOpen } = useCart();
  const [qty, setQty] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (isLoading) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-7xl px-4 py-24 md:px-8">
          <div className="h-[60vh] animate-pulse rounded-sm bg-card/50" />
        </div>
      </SiteLayout>
    );
  }

  if (isError || !product) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-2xl px-4 py-32 text-center md:px-8">
          <h1 className="font-display text-3xl text-foreground">هذا العطر غير متوفر</h1>
          <Link
            to="/catalog"
            className="mt-8 inline-block rounded-sm bg-primary px-8 py-4 text-sm text-primary-foreground"
          >
            العودة إلى الكتالوج
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const soldOut = product.stock <= 0;
  const categoryName = categories.data?.find((c) => c.id === product.category_id)?.name;

  const addToCart = () => {
    if (soldOut) return;
    add(
      {
        product_id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || "",
        stock: product.stock,
        shades: product.shade,
      },
      qty,
    );
    toast.success("تمت إضافة العطر إلى السلة");
  };

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <div
                className="glow-orb pointer-events-none absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 50% 55%, #E8B8B855, transparent 65%)`,
                }}
              />
              <img
                src={product.images?.[activeImageIndex] || "/images/perfume-1.jpg"}
                alt={product.name}
                className="relative aspect-square w-full rounded-sm object-cover elegant-shadow"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm border-2 transition-all ${
                      activeImageIndex === idx ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col items-center text-center">
            {categoryName && (
              <p className="text-[11px] tracking-[0.4em] text-primary/80">{categoryName}</p>
            )}
            <h1 className="mt-5 font-display text-4xl text-foreground md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-5 text-2xl text-primary">{formatDZD(product.price)}</p>


            {/* Other Meta Details */}
            {(product.origin || product.expiration_date || product.volume_ml) && (
              <div className="mt-5 w-full max-w-sm space-y-2 text-sm text-muted-foreground bg-card/50 p-4 rounded-sm border border-border/50 text-center mx-auto">
                {product.volume_ml && (
                  <p><span className="text-foreground">الحجم:</span> {product.volume_ml} مل</p>
                )}
                {product.origin && (
                  <p><span className="text-foreground">بلد الصنع:</span> {product.origin}</p>
                )}
                {product.expiration_date && (
                  <p><span className="text-foreground">تاريخ الصلاحية:</span> {product.expiration_date}</p>
                )}
              </div>
            )}

            <div className="mt-8 flex items-center justify-center gap-3">
              <span
                className={`inline-block h-2.5 w-2.5 rounded-full ${
                  soldOut ? "bg-destructive" : "bg-primary"
                }`}
              />
              <span className="text-sm text-muted-foreground">
                {soldOut ? "نفد المخزون" : `متوفر في المخزون (${product.stock})`}
              </span>
            </div>

            <div className="mt-8 flex flex-col items-center gap-4">
              <span className="text-sm text-muted-foreground">الكمية</span>
              <div className="flex items-center justify-center rounded-sm border border-border/70">
                <button
                  type="button"
                  aria-label="إنقاص"
                  disabled={soldOut}
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-12 w-12 items-center justify-center text-muted-foreground hover:text-primary disabled:opacity-40"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center">{qty}</span>
                <button
                  type="button"
                  aria-label="زيادة"
                  disabled={soldOut}
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  className="flex h-12 w-12 items-center justify-center text-muted-foreground hover:text-primary disabled:opacity-40"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={addToCart}
                disabled={soldOut}
                className="rounded-sm border border-primary/50 px-9 py-4 text-sm tracking-wider text-primary transition-colors hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                أضف إلى السلة
              </button>
              <button
                type="button"
                disabled={soldOut}
                onClick={() => {
                  addToCart();
                  setOpen(false);
                  navigate({ to: "/checkout" });
                }}
                className="rounded-sm bg-primary px-9 py-4 text-sm font-semibold tracking-wider text-primary-foreground transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              >
                اطلب الآن
              </button>
            </div>

            {soldOut && (
              <p className="mt-5 text-sm text-destructive">
                نفد المخزون — لا يمكن طلب هذا العطر حالياً.
              </p>
            )}

            <p className="mt-10 text-base leading-9 text-muted-foreground">
              {product.description}
            </p>
          </div>
        </div>

        {/* Cosmetics Details Section */}
        <div className="mt-20 grid gap-8 md:grid-cols-3 md:gap-12">
          {product.benefits && product.benefits.length > 0 && (
            <div className="rounded-sm border border-border/50 bg-card p-8 elegant-shadow">
              <h3 className="font-display text-xl text-primary mb-4 border-b border-border/50 pb-2">الفوائد</h3>
              <ul className="space-y-2 text-muted-foreground">
                {product.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.ingredients && product.ingredients.length > 0 && (
            <div className="rounded-sm border border-border/50 bg-card p-8 elegant-shadow">
              <h3 className="font-display text-xl text-primary mb-4 border-b border-border/50 pb-2">المكونات الأساسية</h3>
              <ul className="space-y-2 text-muted-foreground">
                {product.ingredients.map((ingredient, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.how_to_use && (
            <div className="rounded-sm border border-border/50 bg-card p-8 elegant-shadow">
              <h3 className="font-display text-xl text-primary mb-4 border-b border-border/50 pb-2">طريقة الاستخدام</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {product.how_to_use}
              </p>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
