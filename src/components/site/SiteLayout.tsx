import type { ReactNode } from "react";
import { ShoppingBag } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CartDrawer } from "./CartDrawer";
import { useCart } from "@/lib/cart";
import { formatDZD } from "@/lib/format";

export function SiteLayout({ children }: { children: ReactNode }) {
  const { count, total, setOpen } = useCart();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />

      {count > 0 && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed inset-x-4 bottom-4 z-30 flex items-center justify-between rounded-sm bg-primary px-5 py-4 text-primary-foreground elegant-shadow md:hidden"
        >
          <span className="flex items-center gap-2 text-sm font-semibold">
            <ShoppingBag className="h-4 w-4" />
            عرض السلة ({count})
          </span>
          <span className="text-sm font-semibold">{formatDZD(total)}</span>
        </button>
      )}
    </div>
  );
}
