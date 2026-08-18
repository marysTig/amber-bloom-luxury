import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ScentPyramid } from "@/components/site/ScentPyramid";
import { categoriesQuery, productQuery } from "@/lib/catalog";
import { formatDZD } from "@/lib/format";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/product/$id")({
  head: () => ({
    meta: [
      { title: "تفاصيل العطر | عَنبَر" },
      {
        name: "description",
        content: "اكتشف الهرم العطري والتفاصيل الكاملة لهذا العطر الفاخر من دار عَنبَر.",
      },
      { property: "og:title", content: "تفاصيل العطر | عَنبَر" },
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
        image: product.image,
        stock: product.stock,
      },
      qty,
    );
    toast.success("تمت إضافة العطر إلى السلة");
  };

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="relative">
            <div
              className="glow-orb pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(circle at 50% 55%, ${product.bottle_color}55, transparent 65%)`,
              }}
            />
            <img
              src={product.image || "/images/perfume-1.jpg"}
              alt={product.name}
              className="relative w-full rounded-sm object-cover elegant-shadow"
            />
          </div>

          <div>
            {categoryName && (
              <p className="text-[11px] tracking-[0.4em] text-primary/80">{categoryName}</p>
            )}
            <h1 className="mt-5 font-display text-4xl text-foreground md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-5 text-2xl text-primary">{formatDZD(product.price)}</p>
            <p className="mt-6 text-base leading-9 text-muted-foreground">
              {product.description}
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span
                className={`inline-block h-2.5 w-2.5 rounded-full ${
                  soldOut ? "bg-destructive" : "bg-primary"
                }`}
              />
              <span className="text-sm text-muted-foreground">
                {soldOut ? "نفد المخزون" : `متوفر في المخزون (${product.stock})`}
              </span>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <span className="text-sm text-muted-foreground">الكمية</span>
              <div className="flex items-center rounded-sm border border-border/70">
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

            <div className="mt-9 flex flex-wrap gap-4">
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
          </div>
        </div>

        <div className="mt-24">
          <div className="text-center">
            <p className="text-[11px] tracking-[0.45em] text-primary/80">فنّ التركيب</p>
            <h2 className="mt-4 font-display text-3xl text-foreground md:text-4xl">
              الهرم العطري
            </h2>
            <div className="mx-auto mt-6 w-40 gold-rule" />
          </div>
          <div className="mx-auto mt-12 max-w-2xl">
            <ScentPyramid
              top={product.top_notes}
              heart={product.heart_notes}
              base={product.base_notes}
            />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
