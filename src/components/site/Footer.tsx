import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-charcoal/60">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-display text-3xl text-gold">عَنبَر</p>
            <p className="mt-4 max-w-xs text-sm leading-7 text-muted-foreground">
              دار عطور جزائرية تصنع توقيعات عطرية نادرة، تُمزج بعناية لتترك أثراً لا يُنسى.
            </p>
          </div>

          <div>
            <h3 className="text-sm tracking-[0.25em] text-foreground/90">التصفح</h3>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li>
                <Link to="/catalog" className="transition-colors hover:text-primary">
                  الكتالوج
                </Link>
              </li>
              <li>
                <Link to="/story" className="transition-colors hover:text-primary">
                  قصة العلامة
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="transition-colors hover:text-primary">
                  إتمام الطلب
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm tracking-[0.25em] text-foreground/90">الخدمة</h3>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li>الدفع عند الاستلام في جميع الولايات</li>
              <li>تغليف فاخر مع كل طلب</li>
              <li>الرد على الاستفسارات خلال 24 ساعة</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 gold-rule" />

        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} عَنبَر. جميع الحقوق محفوظة.</p>
          <Link
            to="/admin"
            className="text-muted-foreground/40 transition-colors hover:text-muted-foreground"
          >
            مساحة الإدارة
          </Link>
        </div>
      </div>
    </footer>
  );
}
