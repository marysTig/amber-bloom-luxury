import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { categoriesQuery, productsQuery } from "@/lib/catalog";

type CatalogSearch = { category?: string };

export const Route = createFileRoute("/catalog")({
  validateSearch: (search: Record<string, unknown>): CatalogSearch =>
    typeof search["category"] === "string" ? { category: search["category"] } : {},
  head: () => ({
    meta: [
      { title: "الكتالوج | عَنبَر" },
      {
        name: "description",
        content: "تصفح مجموعة عطور عَنبَر الفاخرة: رجالي، نسائي، للجنسين وإصدارات محدودة.",
      },
      { property: "og:title", content: "الكتالوج | عَنبَر" },
      {
        property: "og:description",
        content: "مجموعة عطور فاخرة بأسعار بالدينار الجزائري مع الدفع عند الاستلام.",
      },
    ],
  }),
  component: CatalogPage,
});

const SORTS = [
  { value: "newest", label: "الأحدث" },
  { value: "best", label: "الأكثر مبيعاً" },
  { value: "price-asc", label: "السعر: من الأقل إلى الأعلى" },
  { value: "price-desc", label: "السعر: من الأعلى إلى الأقل" },
] as const;

function CatalogPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const products = useQuery(productsQuery());
  const categories = useQuery(categoriesQuery());

  const [term, setTerm] = useState("");
  const [sort, setSort] = useState<(typeof SORTS)[number]["value"]>("newest");
  const activeCategory = search.category ?? "all";

  const list = useMemo(() => {
    let items = [...(products.data ?? [])];
    if (activeCategory !== "all") {
      items = items.filter((p) => p.category_id === activeCategory);
    }
    if (term.trim()) {
      const q = term.trim();
      items = items.filter(
        (p) => p.name.includes(q) || p.description.includes(q),
      );
    }
    switch (sort) {
      case "price-asc":
        items.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        items.sort((a, b) => b.price - a.price);
        break;
      case "best":
        items.sort((a, b) => b.sales_count - a.sales_count);
        break;
      default:
        items.sort((a, b) => b.created_at.localeCompare(a.created_at));
    }
    return items;
  }, [products.data, activeCategory, term, sort]);

  const setCategory = (id: string) =>
    navigate({ search: id === "all" ? {} : { category: id } });

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <div className="text-center">
          <p className="text-[11px] tracking-[0.45em] text-primary/80">المجموعة الكاملة</p>
          <h1 className="mt-5 font-display text-4xl text-foreground md:text-5xl">الكتالوج</h1>
          <div className="mx-auto mt-6 w-40 gold-rule" />
        </div>

        <div className="mt-12 space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-sm">
              <Search className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={term}
                onChange={(e) => setTerm(e.target.value.slice(0, 80))}
                placeholder="البحث عن عطر..."
                aria-label="البحث عن عطر"
                className="h-13 w-full rounded-sm border border-border/70 bg-card/40 py-4 pr-11 pl-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60"
              />
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="sort" className="text-sm text-muted-foreground">
                ترتيب حسب
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="h-13 rounded-sm border border-border/70 bg-card/40 px-4 py-3 text-sm text-foreground outline-none focus:border-primary/60"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value} className="bg-card">
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <CategoryChip
              active={activeCategory === "all"}
              onClick={() => setCategory("all")}
              label="كل الفئات"
            />
            {(categories.data ?? []).map((c) => (
              <CategoryChip
                key={c.id}
                active={activeCategory === c.id}
                onClick={() => setCategory(c.id)}
                label={c.name}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.isLoading &&
            [0, 1, 2, 3].map((i) => (
              <div key={i} className="h-[520px] animate-pulse rounded-sm bg-card/50" />
            ))}
          {list.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              categoryName={categories.data?.find((c) => c.id === p.category_id)?.name}
            />
          ))}
        </div>

        {!products.isLoading && list.length === 0 && (
          <p className="py-24 text-center text-muted-foreground">
            لا توجد عطور مطابقة لبحثك.
          </p>
        )}

        {products.isError && (
          <p className="py-24 text-center text-destructive">
            تعذّر تحميل المنتجات، يرجى المحاولة لاحقاً.
          </p>
        )}
      </section>
    </SiteLayout>
  );
}

function CategoryChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-5 py-2.5 text-sm transition-all ${
        active
          ? "border-primary bg-primary/15 text-primary"
          : "border-border/70 text-muted-foreground hover:border-primary/50 hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}
