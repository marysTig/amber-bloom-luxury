import { Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatDZD } from "@/lib/format";

export function CartDrawer() {
  const { lines, isOpen, setOpen, total, setQuantity, remove } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <button
        type="button"
        aria-label="إغلاق السلة"
        onClick={() => setOpen(false)}
        className="flex-1 bg-background/75 backdrop-blur-sm"
      />
      <aside className="flex h-full w-full max-w-md flex-col border-l border-border/70 bg-card shadow-2xl duration-300 animate-in slide-in-from-left">
        <div className="flex items-center justify-between border-b border-border/60 px-6 py-5">
          <h2 className="font-display text-2xl text-foreground">سلة المشتريات</h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="إغلاق"
            className="flex h-10 w-10 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <div className="glow-orb h-24 w-24 rounded-full [background:radial-gradient(circle,color-mix(in_oklab,var(--amber-glow)_45%,transparent),transparent_70%)]" />
            <p className="font-display text-2xl text-foreground">سلتك فارغة</p>
            <p className="text-sm text-muted-foreground">
              tu n'as pas ajouté de produit
            </p>
            <Link
              to="/catalog"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-sm border border-primary/50 px-7 py-3 text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              découvre nos produits
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <ul className="space-y-5">
                {lines.map((line) => (
                  <li key={line.product_id} className="flex gap-4">
                    <img
                      src={line.image || "/images/perfume-1.jpg"}
                      alt={line.name}
                      loading="lazy"
                      className="h-24 w-20 rounded-sm object-cover"
                    />
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display text-lg text-foreground">{line.name}</h3>
                        <button
                          type="button"
                          onClick={() => remove(line.product_id)}
                          aria-label="حذف المنتج"
                          className="text-muted-foreground transition-colors hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-1 text-sm text-primary">{formatDZD(line.price)}</p>
                      <div className="mt-auto flex items-center gap-3 pt-3">
                        <div className="flex items-center rounded-sm border border-border/70">
                          <button
                            type="button"
                            aria-label="إنقاص"
                            onClick={() => setQuantity(line.product_id, line.quantity - 1)}
                            className="flex h-9 w-9 items-center justify-center text-muted-foreground hover:text-primary"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-9 text-center text-sm">{line.quantity}</span>
                          <button
                            type="button"
                            aria-label="زيادة"
                            onClick={() => setQuantity(line.product_id, line.quantity + 1)}
                            className="flex h-9 w-9 items-center justify-center text-muted-foreground hover:text-primary"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {formatDZD(line.price * line.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border/60 px-6 py-5">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>المجموع الفرعي</span>
                <span>{formatDZD(total)}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-lg">
                <span className="text-foreground">المجموع النهائي</span>
                <span className="text-primary">{formatDZD(total)}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  navigate({ to: "/checkout" });
                }}
                className="mt-5 w-full rounded-sm bg-primary py-4 text-sm font-semibold tracking-wider text-primary-foreground transition-all hover:brightness-110"
              >
                إتمام الطلب
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
