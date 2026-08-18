import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/catalog";
import { formatDZD } from "@/lib/format";

export function ProductCard({
  product,
  categoryName,
}: {
  product: Product;
  categoryName?: string;
}) {
  const soldOut = product.stock <= 0;

  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="group flex flex-col overflow-hidden rounded-sm border border-border/60 bg-card/40 transition-all duration-500 hover:border-primary/45 hover:bg-card/70"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
        <img
          src={product.image || "/images/perfume-1.jpg"}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(circle_at_50%_80%,color-mix(in_oklab,var(--amber-glow)_28%,transparent),transparent_65%)]" />
        {product.badge && !soldOut && (
          <span className="absolute right-3 top-3 rounded-full border border-primary/40 bg-background/75 px-3 py-1 text-[11px] tracking-wider text-primary backdrop-blur">
            {product.badge}
          </span>
        )}
        {soldOut && (
          <span className="absolute right-3 top-3 rounded-full border border-border bg-background/85 px-3 py-1 text-[11px] tracking-wider text-muted-foreground backdrop-blur">
            نفد المخزون
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        {categoryName && (
          <span className="text-[11px] tracking-[0.28em] text-muted-foreground">
            {categoryName}
          </span>
        )}
        <h3 className="font-display text-2xl text-foreground">{product.name}</h3>
        <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
          {product.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-lg text-primary">{formatDZD(product.price)}</span>
          <span className="text-xs text-muted-foreground">
            {soldOut ? "نفد المخزون" : `متوفر: ${product.stock}`}
          </span>
        </div>
        <span className="mt-3 inline-flex w-fit border-b border-primary/40 pb-1 text-sm text-primary transition-all group-hover:border-primary">
          اكتشف العطر
        </span>
      </div>
    </Link>
  );
}
