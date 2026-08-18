import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, Lock, LogOut, Pencil, Plus, Trash2, X } from "lucide-react";
import {
  adminDeleteCategory,
  adminDeleteProduct,
  adminListOrders,
  adminLogin,
  adminOverview,
  adminSaveCategory,
  adminSaveProduct,
  adminSetOrderStatus,
} from "@/lib/admin.functions";
import { categoriesQuery, productsQuery, type Product } from "@/lib/catalog";
import { formatDate, formatDZD } from "@/lib/format";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "مساحة الإدارة | عَنبَر" },
      { name: "description", content: "لوحة إدارة متجر عَنبَر: المنتجات، الفئات والطلبات." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "مساحة الإدارة | عَنبَر" },
      { property: "og:description", content: "لوحة تحكم داخلية." },
    ],
  }),
  component: AdminPage,
});

const TOKEN_KEY = "ambre-admin-token";
const TABS = [
  { id: "overview", label: "نظرة عامة" },
  { id: "products", label: "المنتجات" },
  { id: "categories", label: "الفئات" },
  { id: "orders", label: "الطلبات" },
] as const;

function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setToken(sessionStorage.getItem(TOKEN_KEY));
    setReady(true);
  }, []);

  const signOut = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  if (!ready) return <div className="min-h-screen bg-background" />;

  if (!token) {
    return (
      <LoginScreen
        onSuccess={(t) => {
          sessionStorage.setItem(TOKEN_KEY, t);
          setToken(t);
        }}
      />
    );
  }

  return <Dashboard token={token} onSignOut={signOut} />;
}

function LoginScreen({ onSuccess }: { onSuccess: (token: string) => void }) {
  const login = useServerFn(adminLogin);
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    try {
      const res = await login({ data: { password } });
      onSuccess(res.token);
      toast.success("مرحباً بك في مساحة الإدارة");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "تعذّر تسجيل الدخول");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-sm border border-border/60 bg-card/50 p-8"
      >
        <div className="flex items-center justify-center">
          <Lock className="h-6 w-6 text-primary" />
        </div>
        <h1 className="mt-5 text-center font-display text-2xl text-foreground">
          مساحة الإدارة
        </h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          أدخل كلمة المرور للمتابعة
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="كلمة المرور"
          aria-label="كلمة المرور"
          className="input-base mt-7"
        />
        <button
          type="submit"
          disabled={pending || !password}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-sm bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 disabled:opacity-50"
        >
          {pending && <Loader2 className="h-4 w-4 animate-spin" />}
          دخول
        </button>
        <Link
          to="/"
          className="mt-6 block text-center text-xs text-muted-foreground hover:text-primary"
        >
          العودة إلى المتجر
        </Link>
      </form>
    </div>
  );
}

function Dashboard({ token, onSignOut }: { token: string; onSignOut: () => void }) {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("overview");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-card/40">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-5 md:px-8">
          <div>
            <p className="font-display text-2xl text-gold">لوحة التحكم</p>
            <p className="mt-1 text-xs tracking-[0.3em] text-muted-foreground">MAISON AMBRE</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="rounded-sm border border-border/70 px-4 py-2.5 text-sm text-muted-foreground hover:text-primary"
            >
              عرض المتجر
            </Link>
            <button
              type="button"
              onClick={onSignOut}
              className="flex items-center gap-2 rounded-sm border border-border/70 px-4 py-2.5 text-sm text-muted-foreground hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
              خروج
            </button>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-3 md:px-8">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`whitespace-nowrap rounded-sm px-5 py-2.5 text-sm transition-colors ${
                tab === t.id
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        {tab === "overview" && <OverviewTab token={token} />}
        {tab === "products" && <ProductsTab token={token} />}
        {tab === "categories" && <CategoriesTab token={token} />}
        {tab === "orders" && <OrdersTab token={token} />}
      </main>
    </div>
  );
}

function OverviewTab({ token }: { token: string }) {
  const fetchOverview = useServerFn(adminOverview);
  const { data, isLoading } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: () => fetchOverview({ data: { token } }),
  });

  const cards = [
    { label: "إجمالي المنتجات", value: data?.products ?? 0 },
    { label: "إجمالي الفئات", value: data?.categories ?? 0 },
    { label: "الطلبات الجديدة", value: data?.newOrders ?? 0 },
    { label: "الطلبات المعالجة", value: data?.processedOrders ?? 0 },
    { label: "إجمالي المبيعات", value: formatDZD(data?.revenue ?? 0) },
  ];

  if (isLoading) return <div className="h-40 animate-pulse rounded-sm bg-card/50" />;

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((c) => (
        <div key={c.label} className="rounded-sm border border-border/60 bg-card/40 p-6">
          <p className="text-sm text-muted-foreground">{c.label}</p>
          <p className="mt-3 font-display text-3xl text-primary">{c.value}</p>
        </div>
      ))}
    </div>
  );
}

const EMPTY_PRODUCT = {
  name: "",
  price: 0,
  stock: 0,
  description: "",
  category_id: null as string | null,
  image: "",
  bottle_color: "#C8A24A",
  badge: "",
  top_notes: "",
  heart_notes: "",
  base_notes: "",
};

function ProductsTab({ token }: { token: string }) {
  const qc = useQueryClient();
  const products = useQuery(productsQuery());
  const categories = useQuery(categoriesQuery());
  const save = useServerFn(adminSaveProduct);
  const remove = useServerFn(adminDeleteProduct);

  const [editing, setEditing] = useState<(typeof EMPTY_PRODUCT & { id?: string }) | null>(null);
  const [pending, setPending] = useState(false);

  const refresh = () => {
    qc.invalidateQueries({ queryKey: ["products"] });
    qc.invalidateQueries({ queryKey: ["admin-overview"] });
  };

  const openEdit = (p: Product) =>
    setEditing({
      id: p.id,
      name: p.name,
      price: p.price,
      stock: p.stock,
      description: p.description,
      category_id: p.category_id,
      image: p.image,
      bottle_color: p.bottle_color,
      badge: p.badge ?? "",
      top_notes: p.top_notes.join("، "),
      heart_notes: p.heart_notes.join("، "),
      base_notes: p.base_notes.join("، "),
    });

  const splitNotes = (value: string) =>
    value
      .split(/[،,]/)
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 12);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setPending(true);
    try {
      await save({
        data: {
          token,
          product: {
            ...(editing.id ? { id: editing.id } : {}),
            name: editing.name,
            price: Number(editing.price),
            stock: Number(editing.stock),
            description: editing.description,
            category_id: editing.category_id,
            image: editing.image,
            bottle_color: editing.bottle_color,
            badge: editing.badge ? editing.badge : null,
            top_notes: splitNotes(editing.top_notes),
            heart_notes: splitNotes(editing.heart_notes),
            base_notes: splitNotes(editing.base_notes),
          },
        },
      });
      toast.success("تم حفظ المنتج");
      setEditing(null);
      refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "تعذّر الحفظ");
    } finally {
      setPending(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("هل تريد حذف هذا المنتج نهائياً؟")) return;
    try {
      await remove({ data: { token, id } });
      toast.success("تم حذف المنتج");
      refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "تعذّر الحذف");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl text-foreground">إدارة المنتجات</h2>
        <button
          type="button"
          onClick={() => setEditing({ ...EMPTY_PRODUCT })}
          className="flex items-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
        >
          <Plus className="h-4 w-4" />
          إضافة منتج
        </button>
      </div>

      <div className="mt-8 grid gap-4">
        {(products.data ?? []).map((p) => (
          <div
            key={p.id}
            className="flex flex-wrap items-center gap-4 rounded-sm border border-border/60 bg-card/40 p-4"
          >
            <img
              src={p.image || "/images/perfume-1.jpg"}
              alt={p.name}
              loading="lazy"
              className="h-20 w-16 rounded-sm object-cover"
            />
            <div className="min-w-40 flex-1">
              <p className="font-display text-xl text-foreground">{p.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {categories.data?.find((c) => c.id === p.category_id)?.name ?? "بدون فئة"}
              </p>
            </div>
            <div className="text-sm text-primary">{formatDZD(p.price)}</div>
            <div className="text-sm text-muted-foreground">
              المخزون: {p.stock > 0 ? p.stock : "نفد المخزون"}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => openEdit(p)}
                aria-label="تعديل"
                className="flex h-10 w-10 items-center justify-center rounded-sm border border-border/70 text-muted-foreground hover:text-primary"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onDelete(p.id)}
                aria-label="حذف"
                className="flex h-10 w-10 items-center justify-center rounded-sm border border-border/70 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <Modal title={editing.id ? "تعديل منتج" : "إضافة منتج"} onClose={() => setEditing(null)}>
          <form onSubmit={submit} className="space-y-4">
            <AdminField label="اسم العطر">
              <input
                className="input-base"
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              />
            </AdminField>
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField label="السعر (دج)">
                <input
                  type="number"
                  min={0}
                  className="input-base"
                  value={editing.price}
                  onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })}
                />
              </AdminField>
              <AdminField label="المخزون">
                <input
                  type="number"
                  min={0}
                  className="input-base"
                  value={editing.stock}
                  onChange={(e) => setEditing({ ...editing, stock: Number(e.target.value) })}
                />
              </AdminField>
            </div>
            <AdminField label="الوصف">
              <textarea
                rows={3}
                className="input-base resize-none"
                value={editing.description}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
              />
            </AdminField>
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField label="الفئة">
                <select
                  className="input-base"
                  value={editing.category_id ?? ""}
                  onChange={(e) =>
                    setEditing({ ...editing, category_id: e.target.value || null })
                  }
                >
                  <option value="" className="bg-card">
                    بدون فئة
                  </option>
                  {(categories.data ?? []).map((c) => (
                    <option key={c.id} value={c.id} className="bg-card">
                      {c.name}
                    </option>
                  ))}
                </select>
              </AdminField>
              <AdminField label="الشارة">
                <select
                  className="input-base"
                  value={editing.badge}
                  onChange={(e) => setEditing({ ...editing, badge: e.target.value })}
                >
                  <option value="" className="bg-card">
                    بدون
                  </option>
                  {["جديد", "الأكثر مبيعاً", "إصدار محدود"].map((b) => (
                    <option key={b} value={b} className="bg-card">
                      {b}
                    </option>
                  ))}
                </select>
              </AdminField>
            </div>
            <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
              <AdminField label="صورة العطر (رابط)">
                <input
                  className="input-base"
                  placeholder="/images/perfume-1.jpg"
                  value={editing.image}
                  onChange={(e) => setEditing({ ...editing, image: e.target.value })}
                />
              </AdminField>
              <AdminField label="لون الزجاجة">
                <input
                  type="color"
                  className="h-13 w-20 cursor-pointer rounded-sm border border-border/70 bg-card/40 p-1"
                  value={editing.bottle_color}
                  onChange={(e) => setEditing({ ...editing, bottle_color: e.target.value })}
                />
              </AdminField>
            </div>
            <AdminField label="مقدمة العطر (افصل بفاصلة)">
              <input
                className="input-base"
                value={editing.top_notes}
                onChange={(e) => setEditing({ ...editing, top_notes: e.target.value })}
              />
            </AdminField>
            <AdminField label="قلب العطر (افصل بفاصلة)">
              <input
                className="input-base"
                value={editing.heart_notes}
                onChange={(e) => setEditing({ ...editing, heart_notes: e.target.value })}
              />
            </AdminField>
            <AdminField label="قاعدة العطر (افصل بفاصلة)">
              <input
                className="input-base"
                value={editing.base_notes}
                onChange={(e) => setEditing({ ...editing, base_notes: e.target.value })}
              />
            </AdminField>

            <button
              type="submit"
              disabled={pending}
              className="flex w-full items-center justify-center gap-2 rounded-sm bg-primary py-3.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
            >
              {pending && <Loader2 className="h-4 w-4 animate-spin" />}
              حفظ
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}

function CategoriesTab({ token }: { token: string }) {
  const qc = useQueryClient();
  const categories = useQuery(categoriesQuery());
  const save = useServerFn(adminSaveCategory);
  const remove = useServerFn(adminDeleteCategory);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const refresh = () => {
    qc.invalidateQueries({ queryKey: ["categories"] });
    qc.invalidateQueries({ queryKey: ["admin-overview"] });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await save({
        data: { token, category: { ...(editingId ? { id: editingId } : {}), name } },
      });
      toast.success(editingId ? "تم تعديل الفئة" : "تمت إضافة الفئة");
      setName("");
      setEditingId(null);
      refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "تعذّر الحفظ");
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("هل تريد حذف هذه الفئة؟")) return;
    try {
      await remove({ data: { token, id } });
      toast.success("تم حذف الفئة");
      refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "تعذّر الحذف");
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="font-display text-2xl text-foreground">إدارة الفئات</h2>

      <form onSubmit={submit} className="mt-6 flex gap-3">
        <input
          className="input-base"
          placeholder="اسم الفئة"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type="submit"
          disabled={name.trim().length < 2}
          className="shrink-0 rounded-sm bg-primary px-6 text-sm font-semibold text-primary-foreground disabled:opacity-50"
        >
          {editingId ? "تعديل" : "إضافة"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setName("");
            }}
            className="shrink-0 rounded-sm border border-border/70 px-5 text-sm text-muted-foreground"
          >
            إلغاء
          </button>
        )}
      </form>

      <ul className="mt-8 space-y-3">
        {(categories.data ?? []).map((c) => (
          <li
            key={c.id}
            className="flex items-center justify-between rounded-sm border border-border/60 bg-card/40 px-5 py-4"
          >
            <span className="text-foreground">{c.name}</span>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="تعديل"
                onClick={() => {
                  setEditingId(c.id);
                  setName(c.name);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-sm border border-border/70 text-muted-foreground hover:text-primary"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="حذف"
                onClick={() => onDelete(c.id)}
                className="flex h-10 w-10 items-center justify-center rounded-sm border border-border/70 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

type AdminOrder = Awaited<ReturnType<typeof adminListOrders>>[number];

function OrdersTab({ token }: { token: string }) {
  const qc = useQueryClient();
  const fetchOrders = useServerFn(adminListOrders);
  const setStatus = useServerFn(adminSetOrderStatus);
  const { data, isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: () => fetchOrders({ data: { token } }),
  });
  const [selected, setSelected] = useState<AdminOrder | null>(null);

  const markProcessed = async (id: string) => {
    try {
      await setStatus({ data: { token, id, status: "تمت المعالجة" } });
      toast.success("تم تحديث حالة الطلب");
      qc.invalidateQueries({ queryKey: ["admin-orders"] });
      qc.invalidateQueries({ queryKey: ["admin-overview"] });
      setSelected(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "تعذّر التحديث");
    }
  };

  if (isLoading) return <div className="h-40 animate-pulse rounded-sm bg-card/50" />;

  const orders = data ?? [];

  return (
    <div>
      <h2 className="font-display text-2xl text-foreground">إدارة الطلبات</h2>

      {orders.length === 0 ? (
        <p className="mt-10 text-muted-foreground">لا توجد طلبات بعد.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-sm border border-border/60">
          <table className="w-full min-w-[900px] text-right text-sm">
            <thead className="bg-card/60 text-muted-foreground">
              <tr>
                {["رقم الطلب", "العميل", "الهاتف", "الولاية", "المنتجات", "الكمية", "الإجمالي", "التاريخ", "الحالة"].map(
                  (h) => (
                    <th key={h} className="px-4 py-3 font-normal">
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => {
                const qty = o.order_items.reduce((n, i) => n + i.quantity, 0);
                return (
                  <tr
                    key={o.id}
                    onClick={() => setSelected(o)}
                    className="cursor-pointer border-t border-border/50 transition-colors hover:bg-card/50"
                  >
                    <td className="px-4 py-4 text-primary">{o.reference}</td>
                    <td className="px-4 py-4">{o.customer_name}</td>
                    <td className="px-4 py-4">{o.phone}</td>
                    <td className="px-4 py-4">{o.wilaya}</td>
                    <td className="px-4 py-4">
                      {o.order_items.map((i) => i.product_name).join("، ")}
                    </td>
                    <td className="px-4 py-4">{qty}</td>
                    <td className="px-4 py-4">{formatDZD(Number(o.total))}</td>
                    <td className="px-4 py-4 text-muted-foreground">
                      {formatDate(o.created_at)}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          o.status === "جديد"
                            ? "bg-primary/15 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <Modal title={`الطلب ${selected.reference}`} onClose={() => setSelected(null)}>
          <div className="space-y-2 text-sm">
            <DetailRow label="اسم العميل" value={selected.customer_name} />
            <DetailRow label="رقم الهاتف" value={selected.phone} />
            <DetailRow label="الولاية" value={selected.wilaya} />
            <DetailRow label="العنوان" value={selected.address} />
            <DetailRow label="تاريخ الطلب" value={formatDate(selected.created_at)} />
            <DetailRow label="حالة الطلب" value={selected.status} />
          </div>

          <div className="my-5 gold-rule" />

          <ul className="space-y-3 text-sm">
            {selected.order_items.map((i) => (
              <li key={i.id} className="flex items-center justify-between">
                <span className="text-foreground/90">
                  {i.product_name} × {i.quantity} ({formatDZD(Number(i.unit_price))})
                </span>
                <span className="text-primary">{formatDZD(Number(i.subtotal))}</span>
              </li>
            ))}
          </ul>

          <div className="my-5 gold-rule" />

          <div className="flex items-center justify-between text-lg">
            <span className="text-foreground">الإجمالي</span>
            <span className="text-primary">{formatDZD(Number(selected.total))}</span>
          </div>

          {selected.status === "جديد" && (
            <button
              type="button"
              onClick={() => markProcessed(selected.id)}
              className="mt-6 w-full rounded-sm bg-primary py-3.5 text-sm font-semibold text-primary-foreground"
            >
              تحديد كـ «تمت المعالجة»
            </button>
          )}
        </Modal>
      )}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}

function AdminField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-foreground/85">{label}</span>
      {children}
    </label>
  );
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-background/80 p-4 backdrop-blur-sm">
      <div className="my-8 w-full max-w-2xl rounded-sm border border-border/70 bg-card p-6 md:p-8">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-2xl text-foreground">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="flex h-10 w-10 items-center justify-center rounded-sm text-muted-foreground hover:text-primary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
