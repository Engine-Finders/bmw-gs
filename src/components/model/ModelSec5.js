import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import BMWStripe from "@/components/reusable/BMWStripe";

const compBoldPhrases = ["original", "inspected & rebuilt", "updated OEM parts", "12-month unlimited mileage"];

function withCompEmphasis(text) {
  const regex = new RegExp(`(${compBoldPhrases.join("|")})`, "g");
  return text.split(regex).map((part, i) =>
    compBoldPhrases.includes(part) ? (
      <span key={i} className="font-semibold text-hero-blue">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function ModelSec5({ data }) {
  const [line1, line2] = data.h2.split("|");
  const [warrantyPre, warrantyPost] = data.paragraphs[1].split("{{warranty}}");
  const pointIcons = ["tech", "wrench", "shield-check"];

  return (
    <section className="relative overflow-hidden bg-hero-dark text-white">
      {/* ===== mobile ===== */}
      <div className="relative md:hidden">
        <div className="absolute inset-0">
          <Image src={data.imageMobile} alt="Precision-machined BMW engine block" fill className="object-cover object-top" sizes="100vw" />
          <div className="absolute inset-0 bg-linear-to-r from-hero-dark/85 via-hero-dark/35 to-transparent" />
          {/* solid patch to fully hide the bright neon streak baked into the source photo */}
          <div
            className="pointer-events-none absolute inset-y-0 left-[22%] w-[32%]"
            style={{
              background: "radial-gradient(ellipse at center, #050a16 0%, #050a16 55%, rgba(5,10,22,0.85) 75%, transparent 100%)",
            }}
            aria-hidden="true"
          />
        </div>

        <div className="relative px-4 pb-8 pt-10">
          <BMWStripe className="h-3 w-6" />

          <h2 className="hp-h2 mt-3 max-w-[70%] uppercase">
            <span className="block text-white">{line1}</span>
            <span className="block text-hero-blue">{line2}</span>
          </h2>
          <span className="mt-3 block h-px w-16 bg-hero-blue/50" />

          <div className="mt-5 max-w-[78%] space-y-4">
            <div className="flex items-start gap-3">
              <Icon name={pointIcons[0]} className="mt-0.5 h-5 w-5 shrink-0 text-hero-blue" />
              <p className="text-sm leading-relaxed text-white">{data.paragraphs[0]}</p>
            </div>
            <div className="flex items-start gap-3">
              <Icon name={pointIcons[1]} className="mt-0.5 h-5 w-5 shrink-0 text-hero-blue" />
              <p className="text-sm leading-relaxed text-white">
                {warrantyPre}
                <span className="font-semibold text-hero-blue">{data.warrantyHighlight}</span>
                {warrantyPost}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Icon name={pointIcons[2]} className="mt-0.5 h-5 w-5 shrink-0 text-hero-blue" />
              <p className="text-sm leading-relaxed text-white">{data.paragraphs[2]}</p>
            </div>
          </div>

          {/* rebuild vs. used engine swap header */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <p className="text-base font-extrabold uppercase text-white">Rebuild</p>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-hero-blue text-base font-black text-white shadow-[0_0_20px_rgba(0,127,248,0.7)]">
              VS
            </span>
            <p className="text-base font-extrabold uppercase leading-tight text-white">Used Engine Swap</p>
          </div>

          {/* comparison matrix (scrolls sideways on narrow phones instead of shrinking the text) */}
          <div className="glass-luminous card-glare relative mt-5 overflow-hidden rounded-2xl">
            <div className="overflow-x-auto">
              <div className="min-w-[540px]">
                <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1.1fr)] divide-x divide-white/10 border-b border-white/10">
                  <div />
                  <div className="flex items-center gap-2 px-3 py-3">
                    <Icon name="shield-check" className="h-6 w-6 shrink-0 text-hero-blue" />
                    <p className="text-xs font-extrabold uppercase leading-tight tracking-wide text-hero-blue">{data.comparison.ourLabel}</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-3">
                    <Icon name="shield" className="h-6 w-6 shrink-0 text-white" />
                    <p className="text-xs font-extrabold uppercase leading-tight tracking-wide text-white">{data.comparison.usedLabel}</p>
                  </div>
                </div>

                {data.comparison.rows.map((r, i) => (
                  <div
                    key={r.feature}
                    className={`grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1.1fr)] divide-x divide-white/10 ${i > 0 ? "border-t border-white/10" : ""}`}
                  >
                    <div className="flex min-w-0 items-start gap-2 px-3 py-3">
                      <Icon name={r.icon} className="h-5 w-5 shrink-0 text-white" />
                      <p className="min-w-0 text-xs font-bold uppercase leading-snug text-white">{r.feature}</p>
                    </div>
                    <p className="min-w-0 break-words px-3 py-3 text-sm leading-snug text-white">{withCompEmphasis(r.ours)}</p>
                    <p className="min-w-0 break-words px-3 py-3 text-sm leading-snug text-white">{r.used}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* bottom action bar */}
          <div className="glass-card-dark card-corner-glare relative mt-5 rounded-xl border border-hero-blue/50 p-4">
            <div className="flex items-center gap-3">
              <Icon name="clock" className="h-8 w-8 shrink-0 text-hero-blue" />
              <p className="text-sm font-extrabold uppercase leading-tight text-white">{data.cta.text}</p>
            </div>

            <a
              href={data.cta.href}
              className="mt-4 flex items-center justify-center rounded-lg px-4 py-3 text-sm font-bold uppercase tracking-wide text-white transition duration-200 hover:-translate-y-0.5 hover:brightness-110"
              style={{ background: "linear-gradient(135deg, #0052cc 0%, #0037a5 100%)" }}
            >
              {data.cta.buttonLabel} →
            </a>
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden overflow-hidden px-4 pb-8 pt-10 sm:px-6 md:block lg:px-8">
      <div className="absolute inset-0">
        <Image src={data.image} alt="Precision-machined BMW engine block" fill className="object-cover" sizes="100vw" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-lg">
          <div className="flex items-center gap-2">
            <BMWStripe className="h-3.5 w-7" />
            <p className="text-xs font-semibold uppercase leading-none tracking-widest text-white">{data.kicker}</p>
          </div>

          <div role="heading" aria-level="2" className="hp-h2 mt-3 uppercase">
            <span className="block text-white">{line1}</span>
            <span className="block text-hero-blue">{line2}</span>
          </div>
          <span className="mt-3 block h-px w-16 bg-hero-blue/50" />

          <div className="body-text mt-5 space-y-4 text-white">
            <p>{data.paragraphs[0]}</p>
            <p>
              {warrantyPre}
              <span className="font-semibold text-hero-blue">{data.warrantyHighlight}</span>
              {warrantyPost}
            </p>
            <p>{data.paragraphs[2]}</p>
          </div>
        </div>

        {/* comparison matrix */}
        <div className="relative mt-10 rounded-2xl border border-hero-blue/30 bg-white shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6),0_0_30px_-10px_rgba(0,127,248,0.45)]">
          <div className="overflow-hidden rounded-2xl">
            {/* header row — no vertical separators here */}
            <div className="grid grid-cols-[1fr_1.4fr_1.4fr]">
              <div className="col-span-2 flex items-center gap-2 px-6 py-4">
                <Icon name="shield-check" className="h-7 w-7 shrink-0 text-hero-blue" />
                <p className="text-base font-extrabold uppercase tracking-wide text-hero-blue">{data.comparison.ourLabel}</p>
              </div>
              <div className="flex items-center gap-2 px-6 py-4">
                <Icon name="warning" className="h-7 w-7 shrink-0 text-[#101828]" />
                <p className="text-base font-extrabold uppercase tracking-wide text-[#101828]">{data.comparison.usedLabel}</p>
              </div>
            </div>

            {data.comparison.rows.map((r, i) => (
              <div
                key={r.feature}
                className={`grid grid-cols-[1fr_1.4fr_1.4fr] items-center divide-x divide-black/10 border-t border-black/5 ${i % 2 === 1 ? "bg-[#f3f6fb]/60" : ""}`}
              >
                <div className="flex items-center gap-2 px-6 py-4">
                  <Icon name={r.icon} className="h-6 w-6 shrink-0 text-hero-blue" />
                  <p className="text-base font-bold text-[#101828]">{r.feature}</p>
                </div>
                <p className="px-6 py-4 text-base text-[#101828]">{r.ours}</p>
                <p className="px-6 py-4 text-base text-[#101828]">{r.used}</p>
              </div>
            ))}
          </div>

          {/* VS badge, centered over the middle ("Our Rebuild") column */}
          <div className="absolute top-0 left-[45%] z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-hero-blue bg-[#050a16] text-lg font-black text-white shadow-[0_0_40px_rgba(0,127,248,0.95)]">
            VS
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
