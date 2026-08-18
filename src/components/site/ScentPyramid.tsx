const LEVELS = [
  {
    key: "top",
    title: "مقدمة العطر",
    caption: "الانطباع الأول",
    width: "w-[52%]",
  },
  {
    key: "heart",
    title: "قلب العطر",
    caption: "شخصية العطر",
    width: "w-[74%]",
  },
  {
    key: "base",
    title: "قاعدة العطر",
    caption: "الأثر الذي يبقى",
    width: "w-[96%]",
  },
] as const;

export function ScentPyramid({
  top,
  heart,
  base,
}: {
  top: string[];
  heart: string[];
  base: string[];
}) {
  const notes: Record<string, string[]> = { top, heart, base };

  return (
    <div className="flex flex-col items-center gap-4">
      {LEVELS.map((level, i) => (
        <div
          key={level.key}
          className={`reveal ${level.width} rounded-sm border border-primary/25 bg-card/50 px-5 py-6 text-center backdrop-blur transition-colors duration-500 hover:border-primary/55`}
          style={{
            animationDelay: `${i * 140}ms`,
            background: `linear-gradient(180deg, color-mix(in oklab, var(--amber-glow) ${6 + i * 5}%, transparent), color-mix(in oklab, var(--card) 70%, transparent))`,
          }}
        >
          <p className="text-[11px] tracking-[0.3em] text-primary/80">{level.caption}</p>
          <h4 className="mt-2 font-display text-2xl text-foreground">{level.title}</h4>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {(notes[level.key] ?? []).length > 0
              ? (notes[level.key] ?? []).join(" · ")
              : "—"}
          </p>
        </div>
      ))}
    </div>
  );
}
