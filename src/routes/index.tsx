import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { categoriesQuery, productsQuery } from "@/lib/catalog";
import { getApprovedReviews } from "@/lib/shop.functions";
import { useServerFn } from "@tanstack/react-start";
import { Star, ShieldCheck, Truck, Banknote, Headset } from "lucide-react";
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
  const fetchReviews = useServerFn(getApprovedReviews);
  const reviews = useQuery({
    queryKey: ["approved-reviews"],
    queryFn: () => fetchReviews(),
  });

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
                découvre les produit
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
      <section className="mx-auto max-w-7xl px-4 pt-10 pb-4 md:px-8 md:pt-16 md:pb-6">
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

      <section className="mx-auto max-w-4xl px-4 py-4 text-center md:py-6">
        <div className="mx-auto w-24 gold-rule mb-6" />
        <p className="font-display text-2xl text-primary md:text-3xl leading-relaxed">
          "لكل روح إشراقة خاصة، اجعل إشراقتك لا تُنسى"
        </p>
        <div className="mx-auto w-24 gold-rule mt-6" />
      </section>

      {/* المنتجات المميزة */}
      <section id="featured" className="mx-auto max-w-7xl px-4 pt-8 pb-16 md:px-8 md:pt-12 md:pb-24">
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

      {/* لماذا تسوقين من Glow & Care؟ */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24 bg-card/20 border-y border-border/50">
        <SectionHeading kicker="مزايا المتجر" title={<>لماذا تتسوقين من <span dir="ltr">Glow & Care</span>؟</>} />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h3 className="font-display text-xl text-foreground">منتجات أصلية 100%</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              مختارة بعناية من أشهر العلامات العالمية.
            </p>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
              <Truck className="h-8 w-8" />
            </div>
            <h3 className="font-display text-xl text-foreground">توصيل سريع</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              إلى جميع أنحاء الوطن خلال 24–48 ساعة.
            </p>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
              <Banknote className="h-8 w-8" />
            </div>
            <h3 className="font-display text-xl text-foreground">الدفع عند الاستلام</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              ادفعي عند استلام طلبك بكل أمان.
            </p>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
              <Headset className="h-8 w-8" />
            </div>
            <h3 className="font-display text-xl text-foreground">خدمة عملاء مميزة</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              نحن هنا لمساعدتك عبر WhatsApp متى شئتِ.
            </p>
          </div>
        </div>
      </section>

      {/* آراء العملاء */}
      {(reviews.data && reviews.data.length > 0) && (
        <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <SectionHeading kicker="ماذا يقولون عنا" title="آراء العملاء" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.data.map((review: any) => (
              <div key={review.id} className="rounded-sm border border-border/60 bg-card/40 p-6 flex flex-col gap-4 text-center items-center">
                <div className="flex gap-1 justify-center" dir="ltr">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= review.rating ? "fill-[#C8A24A] text-[#C8A24A]" : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-foreground/90 italic flex-1 w-full">
                  "{review.description}"
                </p>
                <div className="flex items-center justify-center gap-3 border-t border-border/50 pt-4 mt-2 w-full">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium text-xs">
                    {review.first_name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-foreground">{review.first_name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

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

function SectionHeading({ kicker, title }: { kicker?: string; title: React.ReactNode }) {
  return (
    <div className="text-center">
      {kicker && <p className="text-[11px] tracking-[0.45em] text-primary/80">{kicker}</p>}
      <h2 className={`${kicker ? "mt-4 " : ""}font-display text-3xl text-foreground md:text-4xl`}>{title}</h2>
      <div className="mx-auto mt-6 w-40 gold-rule" />
    </div>
  );
}
