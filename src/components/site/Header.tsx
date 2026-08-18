import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";

const NAV = [
  { to: "/", label: "الرئيسية" },
  { to: "/catalog", label: "الكتالوج" },
  { to: "/story", label: "قصة العلامة" },
];

export function Header() {
  const { count, setOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:h-20 md:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="القائمة"
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-sm text-foreground/80 transition-colors hover:text-primary md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link to="/" className="group flex flex-col leading-none">
            <span className="font-display text-2xl tracking-tight text-gold md:text-3xl">
              عَنبَر
            </span>
            <span className="mt-1 text-[10px] tracking-[0.35em] text-muted-foreground">
              MAISON AMBRE
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="relative text-sm text-foreground/75 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="سلة المشتريات"
          className="relative flex h-11 w-11 items-center justify-center rounded-sm border border-border/70 text-foreground/85 transition-colors hover:border-primary/60 hover:text-primary"
        >
          <ShoppingBag className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -left-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground">
              {count}
            </span>
          )}
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-border/60 bg-background/95 px-4 py-3 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className="block rounded-sm px-2 py-3 text-base text-foreground/85 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
