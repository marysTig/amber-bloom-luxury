import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-charcoal/60">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-12 text-center md:grid-cols-3">
          <div className="flex flex-col items-center">
            <img src="/Logo.png" alt="Glow & Care" className="h-16 w-auto" />
            <p className="mt-4 max-w-xs text-sm leading-7 text-foreground/90">
              مستحضرات تجميل وعناية بالبشرة، لجمال يُشرق
            </p>
            <div className="mt-5 flex items-center gap-4">
              <a
                href="https://www.tiktok.com/@glowcare.dz1?_r=1&_t=ZS-98zI7lXxGRc"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="TikTok"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
              <a
                href="https://wa.me/213782395611?text=أريد%20معرفة%20المزيد%20عن%20متجركم"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="WhatsApp"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                  <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                </svg>
              </a>
            </div>
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

        <div className="mt-6 flex flex-col items-center justify-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Glow & Care. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
