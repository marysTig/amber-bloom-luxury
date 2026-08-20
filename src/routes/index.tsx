import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { categoriesQuery, productsQuery } from "@/lib/catalog";
const heroImages = [
  "/images/cosmetic-1.png",
  "/images/cosmetic-2.png",
  "/images/cosmetic-3.png",
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Glow & Care | مستحضرات التجميل والعناية" },
      {
        name: "description",
        content:
          "اكتشفي مجموعة Glow & Care الفاخرة لمستحضرات التجميل والعناية بالبشرة. لجمال يشع تألقاً.",
      },
      { property: "og:title", content: "Glow & Care | مستحضرات التجميل والعناية" },
      {
        property: "og:description",
        content:
          "مجموعة مستحضرات تجميل وعناية فاخرة بأسعار بالدينار الجزائري مع الدفع عند الاستلام في كل الولايات.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
        {/* Background Image with Transparency */}
        <div className="absolute inset-0 z-0 bg-background">
          {heroImages.map((imgSrc, index) => (
            <img
              key={imgSrc}
              src={imgSrc}
              alt="زجاجة عطر فاخرة بلون العنبر على خلفية داكنة"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? "opacity-30" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
          <div className="glow-orb pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_50%_50%,color-mix(in_oklab,var(--amber-glow)_30%,transparent),transparent_70%)]" />
        </div>

        {/* Text Content */}
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center justify-center px-4 py-16 text-center md:px-8 md:py-28">
          <div className="reveal flex w-full flex-col items-center justify-center">
            <div className="glow-orb flex h-64 w-64 items-center justify-center rounded-full [background:radial-gradient(circle,color-mix(in_oklab,var(--amber-glow)_50%,transparent),transparent_70%)]">
              <img src="/Logo.png" alt="Glow & Care" className="h-52 w-auto" />
            </div>
            <h1 className="mt-6 font-display text-4xl leading-[1.35] text-foreground sm:text-5xl md:text-7xl md:leading-[1.3]">
              <span className="text-foreground">
                GLOW <span className="text-gold">&</span> CARE
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-9 text-foreground/90 md:text-lg">
              مستحضرات التجميل والعناية — لجمالٍ يشعّ تألقًا
            </p>
            <div className="mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
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

            <div className="mt-4 flex flex-row flex-wrap items-center justify-center gap-3 w-full sm:w-auto px-2">
              <a
                href="https://www.tiktok.com/@glowcare.dz1?_r=1&_t=ZS-98zI7lXxGRc"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-black px-4 sm:px-9 py-3 sm:py-4 text-sm font-semibold tracking-wider text-white transition-all hover:opacity-80 flex items-center justify-center gap-2 flex-1 sm:flex-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
                TikTok
              </a>
              <a
                href="https://wa.me/213782395611?text=%D8%A3%D8%B1%D9%8A%D8%AF%20%D9%85%D8%B9%D8%B1%D9%81%D8%A9%20%D8%A7%D9%84%D9%85%D8%B2%D9%8A%D8%AF%20%D8%B9%D9%86%20%D9%85%D8%AA%D8%AC%D8%B1%D9%83%D9%85"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#25D366] px-4 sm:px-9 py-3 sm:py-4 text-sm font-semibold tracking-wider text-white transition-all hover:opacity-80 flex items-center justify-center gap-2 flex-1 sm:flex-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* تصفح حسب الفئة */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
        <SectionHeading kicker="" title="تصفح حسب الفئة" />
        <div className="mt-10 flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory">
          {(categories.data ?? []).map((c) => (
            <Link
              key={c.id}
              to="/catalog"
              search={{ category: c.id }}
              className="group flex-none flex flex-col items-center gap-4 text-center snap-center"
            >
              <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-border/40 transition-all duration-500 group-hover:scale-105 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(200,162,74,0.15)] sm:h-40 sm:w-40">
                <img 
                  src={c.photo || "/images/perfume-2.jpg"} 
                  alt={c.name} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <span className="font-display text-lg text-foreground transition-colors group-hover:text-primary sm:text-xl">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* المنتجات المميزة */}
      <section id="featured" className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <SectionHeading kicker="مختارات الدار" title="المنتجات المميزة" />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-7 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} categoryName={categoryName(p.category_id)} />
          ))}
          {products.isLoading &&
            [0, 1, 2].map((i) => (
              <div key={i} className="h-[520px] animate-pulse rounded-sm bg-card/50" />
            ))}
        </div>
      </section>


      {/* CTA نهائي */}
      <section className="mx-auto max-w-7xl px-4 pb-8 md:px-8">
        <div className="relative overflow-hidden rounded-sm border border-primary/25 bg-card/40 px-6 py-16 text-center md:py-24">
          <div className="glow-orb pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_50%_120%,color-mix(in_oklab,var(--amber-glow)_28%,transparent),transparent_65%)]" />
          <h2 className="font-display text-4xl text-foreground md:text-5xl lg:text-6xl">
            اترك أثرك
          </h2>
          <p className="relative mx-auto mt-5 max-w-lg text-sm leading-8 text-muted-foreground">
            توصيل إلى جميع الولايات مع الدفع عند الاستلام
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

function SectionHeading({ kicker, title }: { kicker?: string; title: string }) {
  return (
    <div className="text-center">
      {kicker && <p className="text-[11px] tracking-[0.45em] text-primary/80">{kicker}</p>}
      <h2 className={`${kicker ? "mt-4 " : ""}font-display text-3xl text-foreground md:text-4xl`}>{title}</h2>
      <div className="mx-auto mt-6 w-40 gold-rule" />
    </div>
  );
}
