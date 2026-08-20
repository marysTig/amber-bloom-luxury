import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartLine = {
  product_id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
  shades?: string[];
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  total: number;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  add: (line: Omit<CartLine, "quantity">, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "ambre-cart-v3";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setLines(JSON.parse(raw) as CartLine[]);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  // Force cleanup in case React Fast Refresh preserves invalid state in memory
  useEffect(() => {
    if (lines.length > 0) {
      const isValid = lines.every(item => 'shades' in item);
      if (!isValid) {
        setLines([]);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, [lines]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const add: CartContextValue["add"] = useCallback((line, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.product_id === line.product_id);
      if (existing) {
        return prev.map((l) =>
          l.product_id === line.product_id
            ? { ...l, ...line, quantity: Math.min(l.quantity + quantity, line.stock) }
            : l,
        );
      }
      return [...prev, { ...line, quantity: Math.min(quantity, line.stock) }];
    });
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setLines((prev) =>
      prev.map((l) =>
        l.product_id === productId
          ? { ...l, quantity: Math.max(1, Math.min(quantity, l.stock)) }
          : l,
      ),
    );
  }, []);

  const remove = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.product_id !== productId));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.quantity, 0),
      total: lines.reduce((n, l) => n + l.quantity * l.price, 0),
      isOpen,
      setOpen,
      add,
      setQuantity,
      remove,
      clear,
    }),
    [lines, isOpen, add, setQuantity, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
