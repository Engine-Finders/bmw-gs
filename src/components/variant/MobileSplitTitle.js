export default function MobileSplitTitle({ titlePre, titleHighlight, className = "", baseColorClass = "text-[#101828]" }) {
  const words = [
    ...titlePre.trim().split(/\s+/).map((w) => ({ w, highlight: false })),
    ...titleHighlight.trim().split(/\s+/).map((w) => ({ w, highlight: true })),
  ];
  const mid = Math.ceil(words.length / 2);
  const line1 = words.slice(0, mid);
  const line2 = words.slice(mid);

  return (
    <div className="relative overflow-hidden pr-9">
      <h2 className={`hp-h2 uppercase ${className}`}>
        {[line1, line2].map((line, li) => (
          <span key={li} className="block">
            {line.map((t, i) => (
              <span key={i} className={t.highlight ? "text-hero-blue" : baseColorClass}>
                {t.w}
                {i < line.length - 1 ? " " : ""}
              </span>
            ))}
          </span>
        ))}
      </h2>
      <div
        className="pointer-events-none absolute inset-y-0 right-0 flex gap-1"
        style={{ transform: "skewX(-20deg)", transformOrigin: "top right" }}
        aria-hidden="true"
      >
        <span className="h-full w-2.5" style={{ background: "var(--color-bmw-blue)" }} />
        <span className="h-full w-2.5" style={{ background: "var(--color-bmw-violet)" }} />
        <span className="h-full w-2.5" style={{ background: "var(--color-bmw-red)" }} />
      </div>
    </div>
  );
}
