import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/reusable/Icon";
import BMWStripe from "@/components/reusable/BMWStripe";
import MobileSplitTitle from "@/components/variant/MobileSplitTitle";
import QuoteLink from "@/components/shared/QuoteLink";

export default function VariantSec3({ data }) {
  const headlineWords = data.headline.trim().split(/\s+/);
  const headlinePre = headlineWords.slice(0, -1).join(" ");
  const headlineHighlight = headlineWords.slice(-1).join(" ");

  return (
    <section className="relative overflow-hidden bg-[#f3f6fb]">
      {/* ===== mobile ===== */}
      <div className="relative px-4 py-10 md:hidden">
        <MobileSplitTitle titlePre={headlinePre} titleHighlight={headlineHighlight} />

        <p className="mt-2 text-sm text-[#101828]">
          {data.startingFromLabel} <span className="font-extrabold text-hero-blue">{data.startingFromPrice}</span>
        </p>
        <span className="mt-2 block h-0.5 w-32 bg-linear-to-r from-bmw-blue via-white to-bmw-red" />

        <div className={`mt-5 grid gap-3 ${data.cards.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
          {data.cards.map((c, i) => (
            <div
              key={`${c.code}-${i}`}
              className={`glass-card relative flex flex-col items-center rounded-xl p-2.5 text-center ${i === 2 ? "order-1 col-span-2" : "order-2"}`}
            >
              <div className="flex items-center gap-1.5 self-start">
                {c.codeHref ? (
                  <Link href={c.codeHref} className="rounded bg-hero-blue-dark px-1.5 py-0.5 text-xs font-extrabold text-white hover:bg-hero-blue">
                    {c.code}
                  </Link>
                ) : (
                  <span className="rounded bg-hero-blue-dark px-1.5 py-0.5 text-xs font-extrabold text-white">{c.code}</span>
                )}
                <span className="text-[11px] font-semibold text-[#101828]">{c.generation}</span>
              </div>
              <Image
                src={c.image ?? data.engineImage}
                alt={`${c.code} engine`}
                width={220}
                height={230}
                className={`mt-1.5 w-auto object-contain ${i === 2 ? "h-44" : "h-28"}`}
              />
              <p className="mt-1 text-xs font-semibold uppercase text-[#101828]">Rebuild From</p>
              <p className="text-lg font-extrabold text-hero-blue">{c.price}</p>
            </div>
          ))}
        </div>

        <div className="glass-card mt-4 divide-y divide-black/10 rounded-xl px-3">
          {data.notes.map((n) => (
            <div key={n.text} className="flex items-center gap-2.5 py-3">
              <Icon name={n.icon} className="h-5 w-5 shrink-0 text-hero-blue" />
              <p className="text-xs text-[#101828]">{n.text}</p>
            </div>
          ))}
        </div>

        <QuoteLink
          href={data.cta.href}
          className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-linear-to-br from-hero-blue to-hero-blue-dark px-5 py-3 text-sm font-bold uppercase text-white shadow-lg transition-transform hover:scale-[1.02]"
        >
          <Icon name={data.cta.icon} className="h-5 w-5 shrink-0" />
          {data.cta.label} <span aria-hidden>→</span>
        </QuoteLink>

        <div
          className="relative mt-5 overflow-hidden rounded-xl"
          style={{
            background: "linear-gradient(135deg, #0a1330 0%, #050a1c 100%)",
            boxShadow: "0 0 0 1px rgba(90,170,255,0.35), 0 25px 60px -25px rgba(0,127,248,0.4)",
          }}
        >
          <div className="relative p-4">
            <div className="flex items-start gap-2">
              <Icon name="warning" className="mt-0.5 h-6 w-6 shrink-0 text-red-500" />
              <div>
                <h3 className="hp-h3 uppercase text-white">
                  {data.warning.titlePre}
                  <span className="text-hero-blue">{data.warning.titleHighlight}</span>
                </h3>
                <span className="mt-2 block h-0.5 w-20 bg-linear-to-r from-bmw-blue via-bmw-blue to-bmw-red" />
              </div>
            </div>

            <div className="mt-3 space-y-3">
              {data.warning.paragraphs.map((p, i) => (
                <p key={i} className="text-xs leading-snug text-white">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2 border-t border-white/15 pt-3">
              <Icon name="info" className="h-4 w-4 shrink-0 text-hero-blue" />
              <p className="text-[10px] italic text-white">{data.warning.source}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-10 sm:px-6 md:block lg:px-8">
        <div
          className="pointer-events-none absolute -right-10 top-0 flex h-56 gap-3"
          style={{ transform: "skewX(-22deg)", transformOrigin: "top right" }}
          aria-hidden="true"
        >
          <span className="h-full w-10" style={{ background: "linear-gradient(180deg, rgba(0,138,201,0.55), rgba(0,138,201,0.05))" }} />
          <span className="h-full w-10" style={{ background: "linear-gradient(180deg, rgba(10,31,77,0.55), rgba(10,31,77,0.05))" }} />
          <span className="h-full w-10" style={{ background: "linear-gradient(180deg, rgba(212,26,26,0.5), rgba(212,26,26,0.05))" }} />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="flex items-center gap-3">
            <BMWStripe className="h-6 w-11 shrink-0" />
            <h2 className="hp-h2 uppercase text-[#101828]">{data.headline}</h2>
          </div>
          <p className="mt-2 text-lg text-[#101828]">
            {data.startingFromLabel} <span className="font-extrabold text-hero-blue">{data.startingFromPrice}</span>
          </p>
          <span className="mt-3 block h-0.5 w-56 bg-linear-to-r from-bmw-blue via-white to-bmw-red" />

          <div
            className={`mt-8 grid items-stretch gap-6 ${
              data.cards.length === 1 ? "grid-cols-[auto_minmax(0,1fr)]" : "grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]"
            }`}
          >
            <div
              className={`grid gap-4 ${data.cards.length === 1 ? "w-64" : ""}`}
              style={{ gridTemplateColumns: `repeat(${Math.min(data.cards.length, 3)}, minmax(0, 1fr))` }}
            >
              {data.cards.map((c, i) => (
                <div key={`${c.code}-${i}`} className="glass-card flex h-full flex-col items-center rounded-xl p-3 text-center">
                  <div className="flex items-center gap-2 self-start">
                    {c.codeHref ? (
                      <Link href={c.codeHref} className="rounded bg-hero-blue-dark px-2 py-1 text-xs font-extrabold text-white hover:bg-hero-blue">
                        {c.code}
                      </Link>
                    ) : (
                      <span className="rounded bg-hero-blue-dark px-2 py-1 text-xs font-extrabold text-white">{c.code}</span>
                    )}
                    <span className="text-xs font-semibold text-[#101828]">{c.generation}</span>
                  </div>
                  <div className="relative mt-1 w-full flex-1">
                    <Image src={c.image ?? data.engineImage} alt={`${c.code} engine`} fill className="object-contain" sizes="220px" />
                  </div>
                  <p className="text-xs font-semibold uppercase text-[#101828]">Rebuild From</p>
                  <p className="text-2xl font-extrabold text-hero-blue">{c.price}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <div className="glass-card divide-y divide-black/10 rounded-xl px-5">
                {data.notes.map((n) => (
                  <div key={n.text} className="flex items-center gap-3 py-4">
                    <Icon name={n.icon} className="h-6 w-6 shrink-0 text-hero-blue" />
                    <p className="text-sm text-[#101828]">{n.text}</p>
                  </div>
                ))}
              </div>

              <QuoteLink
                href={data.cta.href}
                className="flex items-center justify-center gap-2 rounded-xl bg-linear-to-br from-hero-blue to-hero-blue-dark px-6 py-4 text-sm font-bold uppercase text-white shadow-lg transition-transform hover:scale-[1.02]"
              >
                <Icon name={data.cta.icon} className="h-6 w-6 shrink-0" />
                {data.cta.label} <span aria-hidden>→</span>
              </QuoteLink>
            </div>
          </div>

          <div
            className="relative mt-6 overflow-hidden rounded-2xl"
            style={{ boxShadow: "0 0 0 1px rgba(90,170,255,0.35), 0 25px 60px -25px rgba(0,127,248,0.5)" }}
          >
            <div className="absolute inset-0">
              <Image src={data.warning.bgImage} alt="BMW timing chain mechanism" fill className="object-cover" sizes="1152px" />
            </div>

            <div className="relative max-w-2xl px-8 py-8 lg:px-10">
              <div className="flex items-start gap-3">
                <Icon name="warning" className="mt-1 h-8 w-8 shrink-0 text-red-500" />
                <div>
                  <h3 className="hp-h3 uppercase text-white">
                    {data.warning.titlePre}
                    <span className="text-hero-blue">{data.warning.titleHighlight}</span>
                  </h3>
                  <span className="mt-3 block h-0.5 w-28 bg-linear-to-r from-bmw-blue via-bmw-blue to-bmw-red" />
                </div>
              </div>

              <div className="mt-4 space-y-4">
                {data.warning.paragraphs.map((p, i) => (
                  <p key={i} className="text-base leading-relaxed text-white">
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2.5 border-t border-white/15 pt-4">
                <Icon name="info" className="h-5 w-5 shrink-0 text-hero-blue" />
                <p className="text-xs italic text-white">{data.warning.source}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
