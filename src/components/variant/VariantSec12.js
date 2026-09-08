import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/reusable/Icon";
import BMWStripe from "@/components/reusable/BMWStripe";

export default function VariantSec12({ data }) {
  const { yearBanner, costs, related } = data;

  return (
    <section className="relative overflow-hidden bg-[#f3f6fb]">
      {/* ===== mobile ===== */}
      <div className="relative px-4 py-10 md:hidden">
        <div className="glass-card rounded-2xl p-4">
          <p className="font-title max-w-[85%] text-base font-bold uppercase leading-snug text-[#101828]">
            {yearBanner.titlePre}
            <span className="text-hero-blue">{yearBanner.titleHighlight}</span>
            {yearBanner.titlePost}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
            {yearBanner.years.map((y) => (
              <div key={y} className="flex items-center gap-1.5">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-hero-blue">
                  <Icon name="check" className="h-2.5 w-2.5 text-white" />
                </span>
                <p className="text-xs leading-tight text-[#101828]">
                  {yearBanner.vehicleLabel || "BMW 320d"} <br /> {y} Engine Rebuild
                </p>
              </div>
            ))}
          </div>
          <p className="mt-3 border-t border-black/10 pt-3 text-xs leading-snug text-[#101828]">{yearBanner.footer}</p>
        </div>

        <div
          className="relative mt-4 overflow-hidden rounded-2xl p-4"
          style={{ background: "rgba(5,12,28,0.9)", border: "1px solid rgba(90,170,255,0.35)" }}
        >
          <div className="flex items-center gap-2">
            <BMWStripe className="h-4 w-8 shrink-0" />
            <h2 className="whitespace-nowrap text-lg font-bold uppercase leading-none tracking-tighter">
              <span className="text-white">{costs.titlePre}</span>
              <span className="text-hero-blue">{costs.titleHighlight}</span>
            </h2>
          </div>

          <p className="mt-2 text-xs text-white">{costs.intro}</p>
          <p className="text-3xl font-extrabold text-hero-blue">{costs.price}</p>
          <p className="mt-2 text-xs leading-snug text-white">{costs.body}</p>

          <div className="relative mt-3 flex items-center justify-center gap-4">
            <div className="relative h-44 w-60">
              <Image src={costs.image} alt="BMW 320d engine" fill className="object-contain" sizes="240px" />
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <Icon
                name="shield-check"
                className="h-11 w-11 shrink-0 text-hero-blue"
                style={{ filter: "drop-shadow(0 0 10px rgba(0,127,248,0.9))" }}
              />
              <p className="text-xs font-extrabold leading-snug text-white">{costs.warranty.line1}</p>
              <p className="text-[11px] leading-snug text-white">{costs.warranty.line2}</p>
              <p className="text-[11px] leading-snug text-white">{costs.warranty.line3}</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {costs.subCards.map((c) => (
              <div key={c.title} className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                <Icon name={c.icon} className="mx-auto block h-9 w-9 shrink-0 text-hero-blue" />
                <p className="mt-1.5 text-[11px] font-extrabold uppercase leading-tight text-white">{c.title}</p>
                <p className="mt-1 text-[11px] text-white">• {c.item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card mt-4 rounded-2xl p-4">
          <div className="flex items-center gap-2">
            <Icon name="link" className="h-4 w-4 shrink-0 text-hero-blue" />
            <p className="text-xs font-extrabold uppercase tracking-wide text-[#101828]">{related.title}</p>
          </div>
          <div className="mt-3 divide-y divide-black/10">
            {related.links.map((l) => (
              <Link key={l.label || l} href={l.href || "#"} className="flex items-center justify-between py-2.5 text-xs font-semibold text-hero-blue">
                {l.label || l} <span aria-hidden>→</span>
              </Link>
            ))}
          </div>
          <a
            href={related.viewAllHref}
            className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-black/10 bg-white px-4 py-2.5 text-xs font-bold text-hero-blue transition-colors hover:bg-[#f3f6fb]"
          >
            <span aria-hidden>←</span> {related.viewAll}
          </a>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-10 sm:px-6 md:block lg:px-8">
        <div className="relative mx-auto max-w-6xl">
          <div className="glass-card rounded-2xl p-6">
            <p className="font-title whitespace-nowrap text-2xl font-bold uppercase leading-snug text-[#101828]">
              {yearBanner.titlePre}
              <span className="text-hero-blue">{yearBanner.titleHighlight}</span>
              {yearBanner.titlePost}
            </p>
            <div className="mt-4 flex items-start justify-between gap-4">
              {yearBanner.years.map((y) => (
                <div key={y} className="flex items-center gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-hero-blue">
                    <Icon name="check" className="h-3 w-3 text-white" />
                  </span>
                  <p className="text-sm leading-tight text-[#101828]">
                    BMW 320d <br /> {y} Engine Rebuild
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 border-t border-black/10 pt-4 text-sm leading-snug text-[#101828]">{yearBanner.footer}</p>
          </div>

          <div className="mt-6 grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] items-stretch gap-6">
            <div
              className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-8"
              style={{
                background: "rgba(5,12,28,0.9)",
                border: "1px solid rgba(90,170,255,0.35)",
                boxShadow: "0 25px 60px -30px rgba(0,127,248,0.5)",
              }}
            >
              <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center gap-6">
                <div>
                  <div className="flex items-center gap-3">
                    <BMWStripe className="h-6 w-11 shrink-0" />
                    <h2 className="whitespace-nowrap text-2xl font-bold uppercase leading-none tracking-tighter">
                      <span className="text-white">{costs.titlePre}</span>
                      <span className="text-hero-blue">{costs.titleHighlight}</span>
                    </h2>
                  </div>
                  <p className="mt-3 text-sm text-white">{costs.intro}</p>
                  <p className="text-5xl font-extrabold text-hero-blue">{costs.price}</p>
                  <p className="mt-3 text-sm leading-relaxed text-white">{costs.body}</p>
                </div>

                <div className="relative flex items-center justify-center gap-4">
                  <div className="relative h-56 w-64 shrink-0">
                    <Image src={costs.image} alt="BMW 320d engine" fill className="object-contain" sizes="256px" />
                  </div>
                  <div className="flex min-w-0 flex-col items-center gap-2 text-center">
                    <Icon
                      name="shield-check"
                      className="h-16 w-16 shrink-0 text-hero-blue"
                      style={{ filter: "drop-shadow(0 0 14px rgba(0,127,248,0.9))" }}
                    />
                    <p className="text-sm font-extrabold leading-snug text-white">{costs.warranty.line1}</p>
                    <p className="text-xs leading-snug text-white">{costs.warranty.line2}</p>
                    <p className="text-xs leading-snug text-white">{costs.warranty.line3}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                {costs.subCards.map((c) => (
                  <div key={c.title} className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/5 p-4">
                    <Icon name={c.icon} className="h-8 w-8 shrink-0 text-hero-blue" />
                    <div className="min-w-0">
                      <p className="text-sm font-extrabold uppercase text-white">{c.title}</p>
                      <p className="mt-1.5 text-xs text-white">• {c.item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2">
                <Icon name="link" className="h-7 w-7 shrink-0 text-hero-blue" />
                <p className="max-w-[16ch] text-lg font-extrabold uppercase leading-snug tracking-wide text-[#101828]">{related.title}</p>
              </div>
              <div className="mt-4 divide-y divide-black/10">
                {related.links.map((l) => (
                  <Link key={l.label || l} href={l.href || "#"} className="flex items-center gap-1.5 py-3 text-sm font-semibold text-hero-blue transition-colors hover:text-hero-blue-dark">
                    {l.label || l} <span aria-hidden>→</span>
                  </Link>
                ))}
              </div>
              <a
                href={related.viewAllHref}
                className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-black/10 bg-white px-4 py-3 text-sm font-bold text-hero-blue transition-colors hover:bg-[#f3f6fb]"
              >
                <span aria-hidden>←</span> {related.viewAll}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
