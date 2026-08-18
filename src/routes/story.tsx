import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "قصة العلامة | عَنبَر" },
      {
        name: "description",
        content: "حكاية دار عَنبَر: حرفية عطرية شرقية، مكوّنات نادرة، وتوقيع لا يُنسى.",
      },
      { property: "og:title", content: "قصة العلامة | عَنبَر" },
      {
        property: "og:description",
        content: "حكاية دار عَنبَر: حرفية عطرية شرقية ومكوّنات نادرة.",
      },
    ],
  }),
  component: StoryPage,
});

const CHAPTERS = [
  {
    title: "البداية",
    body: "بدأت عَنبَر من شغف بالبخور والزيوت العطرية التي كانت تملأ بيوت الجدّات؛ رائحة تُشبه الذاكرة أكثر مما تُشبه العطر.",
  },
  {
    title: "المكوّنات",
    body: "نختار العود والعنبر والورد الطائفي والزعفران من مصادر موثوقة، ونعمل مع مركّبين يحترمون صبر الحرفة.",
  },
  {
    title: "التوقيع",
    body: "كل عطر يمر بعشرات المحاولات حتى يصل إلى توازنه: مقدمة تجذب، قلب يروي، وقاعدة تبقى.",
  },
];

function StoryPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-4 py-20 md:px-8 md:py-28">
        <p className="text-center text-[11px] tracking-[0.45em] text-primary/80">قصة العلامة</p>
        <h1 className="mt-6 text-center font-display text-4xl leading-[1.4] text-foreground md:text-5xl">
          رائحة تُشبه الذاكرة
        </h1>
        <div className="mx-auto mt-8 w-40 gold-rule" />

        <div className="mt-16 space-y-14">
          {CHAPTERS.map((c, i) => (
            <article key={c.title} className="reveal" style={{ animationDelay: `${i * 120}ms` }}>
              <h2 className="font-display text-2xl text-gold">{c.title}</h2>
              <p className="mt-4 text-base leading-9 text-muted-foreground">{c.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link
            to="/catalog"
            className="rounded-sm bg-primary px-10 py-4 text-sm font-semibold tracking-wider text-primary-foreground transition-all hover:brightness-110"
          >
            اكتشف المجموعة
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
