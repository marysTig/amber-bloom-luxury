import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ChevronDown, ChevronRight, Loader2, Lock, LogOut, Pencil, Plus, Trash2, Truck, User, X } from "lucide-react";
import {
  adminDeleteCategory,
  adminDeleteProduct,
  adminGetDeliveryFees,
  adminListOrders,
  adminDeleteOrder,
  adminLogin,
  adminOverview,
  adminSaveCategory,
  adminSaveDeliveryFees,
  adminSaveProduct,
  adminSetOrderStatus,
  adminUpdateProfile
} from "@/lib/admin.functions";
import { categoriesQuery, productsQuery, type Product } from "@/lib/catalog";
import { formatDate, formatDZD } from "@/lib/format";
import { ImageUploader } from "@/components/ui/image-uploader";
import { MultiImageUploader } from "@/components/ui/multi-image-uploader";
import wilayas from "../../wilayas-with-municipalities.json";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "مساحة الإدارة | Glow & Care" },
      { name: "description", content: "لوحة إدارة متجر Glow & Care: المنتجات، الفئات والطلبات." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "مساحة الإدارة | Glow & Care" },
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
  { id: "livraison", label: "الشحن" },
  { id: "profile", label: "Profil" },
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    try {
      const res = await login({ data: { email, password } });
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
          أدخل البريد الإلكتروني وكلمة المرور للمتابعة
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="البريد الإلكتروني"
          aria-label="البريد الإلكتروني"
          className="input-base mt-7"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="كلمة المرور"
          aria-label="كلمة المرور"
          className="input-base mt-4"
        />
        <button
          type="submit"
          disabled={pending || !password || !email}
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
            <p className="mt-1 text-xs tracking-[0.3em] text-muted-foreground">GLOW & CARE</p>
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
        {tab === "livraison" && <LivraisonTab token={token} />}
        {tab === "profile" && <ProfileTab token={token} onSignOut={onSignOut} />}
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
    { label: "قيد الانتظار", value: data?.pendingOrders ?? 0 },
    { label: "مؤكدة", value: data?.confirmedOrders ?? 0 },
    { label: "في التوصيل", value: data?.inDeliveryOrders ?? 0 },
    { label: "مكتملة", value: data?.completedOrders ?? 0 },
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
  images: [] as string[],
  volume_ml: undefined as number | undefined,
  badge: "" as string | null,
  benefits: "",
  ingredients: "",
  how_to_use: "",
  shade: [] as string[],
  origin: "",
  expiration_date: "",
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
      images: p.images ?? [],
      volume_ml: p.volume_ml,
      badge: p.badge ?? "",
      benefits: p.benefits.join("، "),
      ingredients: p.ingredients.join("، "),
      how_to_use: p.how_to_use,
      shade: p.shade ?? [],
      origin: p.origin ?? "",
      expiration_date: p.expiration_date ?? "",
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
            images: editing.images,
            volume_ml: editing.volume_ml ? Number(editing.volume_ml) : undefined,
            badge: editing.badge ? editing.badge : null,
            benefits: splitNotes(editing.benefits),
            ingredients: splitNotes(editing.ingredients),
            how_to_use: editing.how_to_use,
            shade: editing.shade,
            origin: editing.origin,
            expiration_date: editing.expiration_date,
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
              src={p.images?.[0] || "/images/perfume-1.jpg"}
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
            {/* Required fields */}
            <AdminField label="اسم المنتج *">
              <input
                required
                className="input-base"
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              />
            </AdminField>
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField label="السعر (دج) *">
                <input
                  required
                  type="number"
                  min={0}
                  className="input-base"
                  value={editing.price}
                  onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })}
                />
              </AdminField>
              <AdminField label="المخزون *">
                <input
                  required
                  type="number"
                  min={0}
                  className="input-base"
                  value={editing.stock}
                  onChange={(e) => setEditing({ ...editing, stock: Number(e.target.value) })}
                />
              </AdminField>
            </div>
            <AdminField label="الوصف *">
              <textarea
                required
                rows={3}
                className="input-base resize-none"
                value={editing.description}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
              />
            </AdminField>
              <AdminField label="صور المنتج *">
                <MultiImageUploader
                  value={editing.images}
                  onChange={(urls) => setEditing({ ...editing, images: urls })}
                />
              </AdminField>
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField label="الفئة *">
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
              <AdminField label="الشارة *">
                <select
                  className="input-base"
                  value={editing.badge ?? ""}
                  onChange={(e) => setEditing({ ...editing, badge: e.target.value || null })}
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

            {/* Divider for optional fields */}
            <details className="group pt-2 border-t border-border/50">
              <summary className="mb-3 cursor-pointer list-none text-xs tracking-widest text-muted-foreground/60 uppercase flex items-center justify-between hover:text-primary transition-colors">
                معلومات إضافية (اختياري)
                <span className="transition-transform duration-200 group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <div className="space-y-4 pt-2">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <AdminField label="الحجم (مل)">
                    <input
                      type="number"
                      min="1"
                      className="input-base"
                      placeholder="مثال: 50"
                      value={editing.volume_ml ?? ""}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          volume_ml: e.target.value ? Number(e.target.value) : undefined,
                        })
                      }
                    />
                  </AdminField>
                  <AdminField label="الدرجة / اللون - Teinte/Couleur">
                    <TagInput
                      values={editing.shade}
                      onChange={(tags) => setEditing({ ...editing, shade: tags })}
                      placeholder="مثال: Rouge..."
                    />
                  </AdminField>
                  <AdminField label="بلد الصنع (Origine)">
                    <input
                      className="input-base"
                      placeholder="مثال: France"
                      value={editing.origin ?? ""}
                      onChange={(e) => setEditing({ ...editing, origin: e.target.value })}
                    />
                  </AdminField>
                  <AdminField label="تاريخ الصلاحية (Date d'expiration)">
                    <input
                      className="input-base"
                      placeholder="مثال: 12 شهر"
                      value={editing.expiration_date ?? ""}
                      onChange={(e) => setEditing({ ...editing, expiration_date: e.target.value })}
                    />
                  </AdminField>
                </div>
                <AdminField label="الفوائد (افصل بفاصلة)">
                  <input
                    className="input-base"
                    placeholder="ترطيب عميق، تفتيح البشرة..."
                    value={editing.benefits}
                    onChange={(e) => setEditing({ ...editing, benefits: e.target.value })}
                  />
                </AdminField>
                <AdminField label="المكونات الأساسية (افصل بفاصلة)">
                  <input
                    className="input-base"
                    placeholder="فيتامين سي، حمض الهيالورونيك..."
                    value={editing.ingredients}
                    onChange={(e) => setEditing({ ...editing, ingredients: e.target.value })}
                  />
                </AdminField>
                <AdminField label="طريقة الاستخدام">
                  <textarea
                    rows={2}
                    className="input-base resize-none"
                    placeholder="يوضع على بشرة نظيفة..."
                    value={editing.how_to_use}
                    onChange={(e) => setEditing({ ...editing, how_to_use: e.target.value })}
                  />
                </AdminField>
              </div>
            </details>

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
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const refresh = () => {
    qc.invalidateQueries({ queryKey: ["categories"] });
    qc.invalidateQueries({ queryKey: ["admin-overview"] });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("SUBMIT CATEGORY:", { name, description, photo, editingId });
      await save({
        data: { token, category: { ...(editingId ? { id: editingId } : {}), name, description, photo } },
      });
      toast.success(editingId ? "تم تعديل الفئة" : "تمت إضافة الفئة");
      setName("");
      setDescription("");
      setPhoto("");
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

      <form onSubmit={submit} className="mt-6 flex flex-col gap-3">
        <div className="flex gap-3">
          <input
            className="input-base flex-1"
            placeholder="اسم الفئة"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <ImageUploader
          value={photo}
          onChange={(url) => setPhoto(url)}
          className="mt-1"
        />
        <textarea
          className="input-base min-h-[80px]"
          placeholder="وصف الفئة"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={name.trim().length < 2}
            className="rounded-sm bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
          >
            {editingId ? "تعديل" : "إضافة"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setName("");
                setDescription("");
                setPhoto("");
              }}
              className="rounded-sm border border-border/70 px-5 py-2 text-sm text-muted-foreground"
            >
              إلغاء
            </button>
          )}
        </div>
      </form>

      <ul className="mt-8 space-y-3">
        {(categories.data ?? []).map((c) => (
          <li
            key={c.id}
            className="flex items-center justify-between rounded-sm border border-border/60 bg-card/40 px-5 py-4"
          >
            <div className="flex items-center gap-4">
              {c.photo ? (
                <img src={c.photo} alt={c.name} className="h-12 w-12 rounded-sm object-cover" />
              ) : (
                <div className="h-12 w-12 rounded-sm bg-muted flex items-center justify-center text-muted-foreground text-xs">لا صورة</div>
              )}
              <div>
                <span className="block font-medium text-foreground">{c.name}</span>
                {c.description && <span className="block text-sm text-muted-foreground line-clamp-1">{c.description}</span>}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="تعديل"
                onClick={() => {
                  setEditingId(c.id);
                  setName(c.name);
                  setDescription(c.description || "");
                  setPhoto(c.photo || "");
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

type OrderStatus = "قيد الانتظار" | "مؤكد" | "في التوصيل" | "مكتمل" | "ملغي";

const STATUS_CONFIG: Record<OrderStatus, { color: string; label: string; next?: OrderStatus }> = {
  "قيد الانتظار": { color: "bg-yellow-500/15 text-yellow-500", label: "قيد الانتظار", next: "مؤكد" },
  "مؤكد": { color: "bg-blue-500/15 text-blue-400", label: "مؤكد", next: "في التوصيل" },
  "في التوصيل": { color: "bg-purple-500/15 text-purple-400", label: "في التوصيل", next: "مكتمل" },
  "مكتمل": { color: "bg-primary/15 text-primary", label: "مكتمل" },
  "ملغي": { color: "bg-destructive/15 text-destructive", label: "ملغي" },
};

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
  const [changingStatus, setChangingStatus] = useState(false);
  const removeOrder = useServerFn(adminDeleteOrder);

  const onDeleteOrder = async (id: string) => {
    if (!confirm("هل أنت متأكد من أنك تريد حذف هذا الطلب نهائياً؟")) return;
    try {
      await removeOrder({ data: { token, id } });
      toast.success("تم حذف الطلب");
      setSelected(null);
      qc.invalidateQueries({ queryKey: ["admin-orders"] });
      qc.invalidateQueries({ queryKey: ["admin-overview"] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "تعذّر الحذف");
    }
  };

  const updateStatus = async (id: string, status: OrderStatus) => {
    setChangingStatus(true);
    try {
      await setStatus({ data: { token, id, status } });
      toast.success("تم تحديث حالة الطلب");
      qc.invalidateQueries({ queryKey: ["admin-orders"] });
      qc.invalidateQueries({ queryKey: ["admin-overview"] });
      // Update selected locally so modal reflects change immediately
      if (selected?.id === id) {
        setSelected((prev) => prev ? { ...prev, status } : null);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "تعذّر التحديث");
    } finally {
      setChangingStatus(false);
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
                {["رقم الطلب", "العميل", "الهاتف", "الولاية", "البلدية", "المنتجات", "الكمية", "سعر التوصيل", "الإجمالي (التوصيل متضمن)", "التاريخ", "الحالة", ""].map(
                  (h, i) => (
                    <th key={i} className="px-4 py-3 font-normal">
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => {
                const qty = o.order_items.reduce((n, i) => n + i.quantity, 0);
                const itemsTotal = o.order_items.reduce((n, i) => n + Number(i.subtotal), 0);
                const deliveryFee = Number(o.total) - itemsTotal;
                const status = o.status as OrderStatus;
                const cfg = STATUS_CONFIG[status] ?? { color: "bg-muted text-muted-foreground", label: o.status };
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
                    <td className="px-4 py-4">{o.commune || "—"}</td>
                    <td className="px-4 py-4">
                      {o.order_items.map((i) => i.selected_shade ? `${i.product_name} (${i.selected_shade})` : i.product_name).join("، ")}
                    </td>
                    <td className="px-4 py-4">{qty}</td>
                    <td className="px-4 py-4">{deliveryFee > 0 ? formatDZD(deliveryFee) : "مجاني"}</td>
                    <td className="px-4 py-4 text-primary font-medium">{formatDZD(Number(o.total))}</td>
                    <td className="px-4 py-4 text-muted-foreground">
                      {formatDate(o.created_at)}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${cfg.color}`}>
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteOrder(o.id);
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
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
            <DetailRow label="البلدية" value={selected.commune || "—"} />
            <DetailRow label="العنوان" value={selected.address} />
            <DetailRow label="تاريخ الطلب" value={formatDate(selected.created_at)} />
          </div>

          <div className="my-5 gold-rule" />

          <ul className="space-y-3 text-sm">
            {selected.order_items.map((i) => (
              <li key={i.id} className="flex items-center justify-between">
                <span className="text-foreground/90">
                  {i.product_name} {i.selected_shade ? `(${i.selected_shade}) ` : ""}× {i.quantity} ({formatDZD(Number(i.unit_price))})
                </span>
                <span className="text-primary">{formatDZD(Number(i.subtotal))}</span>
              </li>
            ))}
          </ul>

          <div className="my-5 gold-rule" />

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>سعر التوصيل</span>
            <span>
              {Number(selected.total) - selected.order_items.reduce((n, i) => n + Number(i.subtotal), 0) > 0 
                ? formatDZD(Number(selected.total) - selected.order_items.reduce((n, i) => n + Number(i.subtotal), 0)) 
                : "مجاني"}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-lg">
            <span className="text-foreground">الإجمالي (التوصيل متضمن)</span>
            <span className="text-primary font-medium">{formatDZD(Number(selected.total))}</span>
          </div>

          <div className="mt-6">
            <p className="mb-2 text-sm text-muted-foreground">تغيير حالة الطلب</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {(Object.keys(STATUS_CONFIG) as OrderStatus[]).map((s) => {
                const cfg = STATUS_CONFIG[s];
                const isActive = selected.status === s;
                return (
                  <button
                    key={s}
                    type="button"
                    disabled={isActive || changingStatus}
                    onClick={() => updateStatus(selected.id, s)}
                    className={`rounded-sm px-3 py-2 text-xs font-medium transition-all ${
                      isActive
                        ? `${cfg.color} ring-1 ring-current opacity-100 cursor-default`
                        : "bg-card border border-border/60 text-muted-foreground hover:border-primary/50 hover:text-foreground disabled:opacity-40"
                    }`}
                  >
                    {cfg.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              disabled={changingStatus}
              onClick={() => onDeleteOrder(selected.id)}
              className="flex items-center gap-2 rounded-sm bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/20 disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" />
              حذف الطلب
            </button>
          </div>
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

// ── Livraison Tab ─────────────────────────────────────────────────────────────

type DeliveryFeeRow = {
  wilaya_code: number;
  wilaya_name_fr: string;
  desk_price: number;
  home_price: number;
};

function LivraisonTab({ token }: { token: string }) {
  const getFees = useServerFn(adminGetDeliveryFees);
  const saveFees = useServerFn(adminSaveDeliveryFees);

  const wilayaList = (wilayas as { wilayaCode: number; nameFr: string; nameAr: string }[]);

  const [fees, setFees] = useState<Record<number, { desk: number; home: number }>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getFees({ data: { token } }).then((data) => {
      const map: Record<number, { desk: number; home: number }> = {};
      // Pre-fill all wilayas with 0
      wilayaList.forEach((w) => { map[w.wilayaCode] = { desk: 0, home: 0 }; });
      // Override with saved values
      (data as DeliveryFeeRow[]).forEach((row) => {
        map[row.wilaya_code] = { desk: Number(row.desk_price), home: Number(row.home_price) };
      });
      setFees(map);
      setLoading(false);
    });
  }, []);

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const payload = wilayaList.map((w) => ({
        wilaya_code: w.wilayaCode,
        wilaya_name_fr: w.nameFr,
        desk_price: fees[w.wilayaCode]?.desk ?? 0,
        home_price: fees[w.wilayaCode]?.home ?? 0,
      }));
      await saveFees({ data: { token, fees: payload } });
      toast.success("Tarifs de livraison sauvegardés !");
    } catch {
      toast.error("Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  };

  const filtered = wilayaList.filter(
    (w) =>
      !search ||
      w.nameFr.toLowerCase().includes(search.toLowerCase()) ||
      w.nameAr.includes(search) ||
      String(w.wilayaCode).includes(search),
  );

  if (loading)
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-primary" />
            <h2 className="font-display text-2xl text-foreground">Tarifs de Livraison</h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Définissez les frais de livraison par wilaya — Bureau ou À la maison
          </p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Rechercher une wilaya…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-52 rounded-sm border border-border bg-card px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            type="button"
            disabled={saving}
            onClick={handleSaveAll}
            className="flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-95 disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Truck className="h-4 w-4" />}
            Sauvegarder tout
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-sm border border-border bg-card">
        <div className="min-w-[600px]">
          {/* Table header */}
          <div className="grid grid-cols-[60px_1fr_150px_150px] border-b border-border bg-muted/40 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <span>Code</span>
            <span>Wilaya</span>
            <span className="text-center">Bureau (DZD)</span>
            <span className="text-center">À la maison (DZD)</span>
          </div>

          {/* Rows */}
          {filtered.map((w) => (
            <div
              key={w.wilayaCode}
              className="grid grid-cols-[60px_1fr_150px_150px] items-center border-b border-border/50 px-5 py-3 last:border-0 hover:bg-primary/5 transition-colors"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-sm bg-primary/10 text-xs font-bold text-primary">
                {String(w.wilayaCode).padStart(2, "0")}
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">{w.nameFr}</p>
                <p className="text-xs text-muted-foreground">{w.nameAr}</p>
              </div>
              <div className="flex justify-center">
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={fees[w.wilayaCode]?.desk ?? 0}
                  onChange={(e) =>
                    setFees((prev) => ({
                      ...prev,
                      [w.wilayaCode]: { desk: Number(e.target.value), home: prev[w.wilayaCode]?.home ?? 0 },
                    }))
                  }
                  className="w-28 rounded-sm border border-border bg-background px-3 py-1.5 text-center text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="flex justify-center">
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={fees[w.wilayaCode]?.home ?? 0}
                  onChange={(e) =>
                    setFees((prev) => ({
                      ...prev,
                      [w.wilayaCode]: { desk: prev[w.wilayaCode]?.desk ?? 0, home: Number(e.target.value) },
                    }))
                  }
                  className="w-28 rounded-sm border border-border bg-background px-3 py-1.5 text-center text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="py-10 text-center text-sm text-muted-foreground">
              Aucune wilaya trouvée
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
// ── Profile Tab ────────────────────────────────────────────────────────────────

function ProfileTab({ token, onSignOut }: { token: string; onSignOut: () => void }) {
  const updateProfile = useServerFn(adminUpdateProfile);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile({ data: { token, email, password } });
      toast.success("Profil mis à jour avec succès !");
      if (password) {
        toast.info("Veuillez vous reconnecter avec le nouveau mot de passe.");
        onSignOut();
      }
    } catch (err: any) {
      toast.error(err.message || "Erreur lors de la mise à jour");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-8 flex items-center gap-2">
        <User className="h-5 w-5 text-primary" />
        <h2 className="font-display text-2xl text-foreground">Profil</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-sm border border-border bg-card p-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Nouvel Email <span className="text-muted-foreground font-normal">(Optionnel)</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@glow-and-care.com"
            className="w-full rounded-sm border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            dir="ltr"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Nouveau Mot de passe <span className="text-muted-foreground font-normal">(Optionnel)</span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            minLength={6}
            className="w-full rounded-sm border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            dir="ltr"
          />
          <p className="mt-2 text-xs text-muted-foreground">Laissez vide pour conserver le mot de passe actuel.</p>
        </div>

        <button
          type="submit"
          disabled={saving || (!email && !password)}
          className="flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:brightness-95 disabled:opacity-50"
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          Sauvegarder les modifications
        </button>
      </form>
    </div>
  );
}

// ── TagInput Component ──────────────────────────────────────────────────────
function TagInput({
  values,
  onChange,
  placeholder = "أضف قيمة...",
}: {
  values: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (!trimmed || values.includes(trimmed)) {
      setInputValue("");
      return;
    }
    onChange([...values, trimmed]);
    setInputValue("");
    inputRef.current?.focus();
  };

  const removeTag = (index: number) => {
    const next = [...values];
    next.splice(index, 1);
    onChange(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && inputValue === "" && values.length > 0) {
      removeTag(values.length - 1);
    }
  };

  return (
    <div className="space-y-2">
      {values.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {values.map((tag, i) => (
            <span
              key={i}
              className="flex items-center gap-1 rounded-full bg-primary/15 px-3 py-1 text-xs text-primary"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(i)}
                className="ml-1 flex h-4 w-4 items-center justify-center rounded-full hover:bg-primary/30 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <input
          ref={inputRef}
          className="input-base flex-1"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          onClick={addTag}
          disabled={!inputValue.trim()}
          className="flex items-center gap-1 rounded-sm bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:brightness-110 disabled:opacity-40 transition-all"
        >
          <Plus className="h-3.5 w-3.5" />
          إضافة
        </button>
      </div>
    </div>
  );
}
