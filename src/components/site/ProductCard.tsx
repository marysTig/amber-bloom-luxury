import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/catalog";
import { formatDZD } from "@/lib/format";

export function ProductCard({
  product,
  categoryName,
}: {
  product: Product;
  categoryName?: string | undefined;
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
          src={product.images?.[0] || "/images/perfume-1.jpg"}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(circle_at_50%_80%,color-mix(in_oklab,var(--amber-glow)_28%,transparent),transparent_65%)]" />
        {product.badge && !soldOut && (
          <span className="absolute right-2 top-2 rounded-full border border-primary/40 bg-background/75 px-2 py-0.5 text-[9px] tracking-wider text-primary backdrop-blur sm:right-3 sm:top-3 sm:px-3 sm:py-1 sm:text-[11px]">
            {product.badge}
          </span>
        )}
        {soldOut && (
          <span className="absolute right-2 top-2 rounded-full border border-border bg-background/85 px-2 py-0.5 text-[9px] tracking-wider text-muted-foreground backdrop-blur sm:right-3 sm:top-3 sm:px-3 sm:py-1 sm:text-[11px]">
            نفد المخزون
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3 sm:gap-2 sm:p-5">
        {categoryName && (
          <span className="text-[9px] tracking-[0.2em] text-muted-foreground sm:text-[11px] sm:tracking-[0.28em]">
            {categoryName}
          </span>
        )}
        <h3 className="font-display text-base text-foreground sm:text-2xl">{product.name}</h3>
        <p className="line-clamp-2 hidden text-sm leading-6 text-muted-foreground sm:block">
          {product.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2 sm:pt-4">
          <span className="text-sm text-primary sm:text-lg">{formatDZD(product.price)}</span>
          <span className="hidden text-xs text-muted-foreground sm:block">
            {soldOut ? "نفد المخزون" : `متوفر: ${product.stock}`}
          </span>
        </div>
        <span className="mt-1 inline-flex w-fit border-b border-primary/40 pb-1 text-xs text-primary transition-all group-hover:border-primary sm:mt-3 sm:text-sm">
          اكتشف المنتج
        </span>
      </div>
    </Link>
  );
}
