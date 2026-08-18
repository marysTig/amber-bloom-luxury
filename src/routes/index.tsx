import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { ScentPyramid } from "@/components/site/ScentPyramid";
import { categoriesQuery, productsQuery } from "@/lib/catalog";
import heroBottle from "@/assets/hero-bottle.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "عَنبَر | عِطرك... بصمتك التي لا تُنسى" },
      {
        name: "description",
        content:
          "دار عطور فاخرة: عطور شرقية غامضة بلمسة عنبرية. اكتشف المجموعة واطلب مع الدفع عند الاستلام.",
      },
      { property: "og:title", content: "عَنبَر | عِطرك... بصمتك التي لا تُنسى" },
      {
        property: "og:description",
        content: "عطور شرقية فاخرة صُممت لتترك أثراً. الدفع عند الاستلام في كل الولايات.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const products = useQuery(productsQuery());
  const categories = useQuery(categoriesQuery());

  const list = products.data ?? [];
  const featured = list.slice(0, 3);
  const bestSellers = [...list].sort((a, b) => b.sales_count - a.sales_count).slice(0, 4);
  const showcase = list[0];
  const categoryName = (id: string | null) =>
    categories.data?.find((c) => c.id === id)?.name;

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:gap-16 md:px-8 md:py-28">
          <div className="reveal order-2 md:order-1">
            <p className="text-[11px] tracking-[0.45em] text-primary/80">دار عطور فاخرة</p>
            <h1 className="mt-6 font-display text-4xl leading-[1.35] text-foreground sm:text-5xl md:text-6xl md:leading-[1.3]">
              عِطرك...
              <br />
              <span className="text-gold">بصمتك التي لا تُنسى.</span>
            </h1>
            <p className="mt-7 max-w-md text-base leading-9 text-muted-foreground">
              اكتشف عطوراً صُممت لتترك أثراً — مزيج من العنبر والعود والزهور النادرة،
              يُصنع بصبر ويُلبس بثقة.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/catalog"
                className="rounded-sm bg-primary px-9 py-4 text-sm font-semibold tracking-wider text-primary-foreground transition-all hover:brightness-110 amber-glow"
              >
                اكتشف المجموعة
              </Link>
              <a
                href="#featured"
                className="rounded-sm border border-primary/40 px-9 py-4 text-sm tracking-wider text-primary transition-colors hover:bg-primary/10"
              >
                استكشف العطور
              </a>
            </div>
          </div>

          <div className="relative order-1 md:order-2">
            <div className="glow-orb pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_50%_45%,color-mix(in_oklab,var(--amber-glow)_35%,transparent),transparent_65%)]" />
            <img
              src={heroBottle}
              alt="زجاجة عطر فاخرة بلون العنبر على خلفية داكنة"
              width={1408}
              height={1760}
              className="relative mx-auto max-h-[70vh] w-auto rounded-sm object-contain elegant-shadow"
            />
          </div>
        </div>
      </section>

      {/* العطور المميزة */}
      <section id="featured" className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <SectionHeading kicker="مختارات الدار" title="العطور المميزة" />
        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} categoryName={categoryName(p.category_id)} />
          ))}
          {products.isLoading &&
            [0, 1, 2].map((i) => (
              <div key={i} className="h-[520px] animate-pulse rounded-sm bg-card/50" />
            ))}
        </div>
      </section>

      {/* تصفح حسب الفئة */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
        <SectionHeading kicker="مسارات عطرية" title="تصفح حسب الفئة" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(categories.data ?? []).map((c) => (
            <Link
              key={c.id}
              to="/catalog"
              search={{ category: c.id }}
              className="group relative overflow-hidden rounded-sm border border-border/60 bg-card/40 px-6 py-10 text-center transition-all hover:border-primary/50"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 [background:radial-gradient(circle_at_50%_100%,color-mix(in_oklab,var(--amber-glow)_22%,transparent),transparent_70%)]" />
              <span className="relative font-display text-2xl text-foreground">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* اكتشف الهرم العطري */}
      {showcase && (
        <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <SectionHeading kicker="فنّ التركيب" title="اكتشف الهرم العطري" />
          <div className="mt-12 grid items-center gap-12 md:grid-cols-2">
            <p className="max-w-md text-base leading-9 text-muted-foreground">
              كل عطر يُروى على ثلاث مراحل: مقدمة تخطف الانتباه، قلب يكشف الشخصية، وقاعدة
              تبقى على البشرة كذاكرة. هكذا نصمم كل توقيع في دار عَنبَر.
            </p>
            <ScentPyramid
              top={showcase.top_notes}
              heart={showcase.heart_notes}
              base={showcase.base_notes}
            />
          </div>
        </section>
      )}

      {/* قصة العلامة */}
      <section className="relative overflow-hidden border-y border-border/60 bg-charcoal/50">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center md:px-8 md:py-28">
          <p className="text-[11px] tracking-[0.45em] text-primary/80">قصة العلامة</p>
          <h2 className="mt-6 font-display text-3xl leading-[1.5] text-foreground md:text-4xl">
            وُلدت عَنبَر من ليالٍ دافئة، ورائحة بخور تتسلل من نافذة قديمة.
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-9 text-muted-foreground">
            نصنع عطوراً بروح شرقية وحرفية معاصرة؛ مكوّنات نادرة تُختار بعناية، وتُمزج على
            مهل حتى تصبح أثراً يُعرف به صاحبه.
          </p>
          <Link
            to="/story"
            className="mt-10 inline-block border-b border-primary/50 pb-1 text-sm text-primary transition-colors hover:border-primary"
          >
            اقرأ القصة كاملة
          </Link>
        </div>
      </section>

      {/* الأكثر مبيعاً */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <SectionHeading kicker="اختيار عملائنا" title="الأكثر مبيعاً" />
        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} categoryName={categoryName(p.category_id)} />
          ))}
        </div>
      </section>

      {/* CTA نهائي */}
      <section className="mx-auto max-w-7xl px-4 pb-8 md:px-8">
        <div className="relative overflow-hidden rounded-sm border border-primary/25 bg-card/40 px-6 py-16 text-center md:py-24">
          <div className="glow-orb pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_50%_120%,color-mix(in_oklab,var(--amber-glow)_28%,transparent),transparent_65%)]" />
          <h2 className="relative font-display text-3xl text-foreground md:text-5xl">
            اترك أثرك الليلة.
          </h2>
          <p className="relative mx-auto mt-5 max-w-lg text-sm leading-8 text-muted-foreground">
            توصيل إلى جميع الولايات مع الدفع عند الاستلام.
          </p>
          <Link
            to="/catalog"
            className="relative mt-9 inline-block rounded-sm bg-primary px-10 py-4 text-sm font-semibold tracking-wider text-primary-foreground transition-all hover:brightness-110"
          >
            اكتشف المجموعة
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}

function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="text-center">
      <p className="text-[11px] tracking-[0.45em] text-primary/80">{kicker}</p>
      <h2 className="mt-4 font-display text-3xl text-foreground md:text-4xl">{title}</h2>
      <div className="mx-auto mt-6 w-40 gold-rule" />
    </div>
  );
}
