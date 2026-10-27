import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import BMWStripe from "@/components/reusable/BMWStripe";
import QuoteLink from "@/components/shared/QuoteLink";

export default function Sec2({ data }) {
  const { specs, price } = data;

  return (
    <section className="relative overflow-hidden bg-[#eef2f8] pt-3">
      {/* ===== mobile ===== */}
      <div className="relative space-y-2 md:hidden">
        {/* specifications */}
        <div className="relative overflow-hidden">
          <div className="relative px-4 py-7">
            <div className="overflow-hidden">
              <BMWStripe className="float-left mr-2 h-6 w-12 shrink-0" />
              <h2 className="hp-h2 uppercase">
                <span className="text-[#101828]">BMW B58 </span>
                <span className="text-hero-blue">{specs.titleHighlight}</span>
              </h2>
            </div>

            <div className="relative mt-3 grid grid-cols-2 gap-2.5">
              {specs.rows.map((r) => (
                <div
                  key={r.label}
                  className={`glass-card flex items-center gap-2.5 rounded-xl p-3 ${r.value.length > 28 ? "col-span-2" : ""}`}
                >
                  <Icon name={r.icon} className="h-8 w-8 shrink-0 text-hero-blue" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wide text-[#101828]">{r.label}</p>
                    <p className="mt-0.5 text-xs leading-snug text-[#101828]">{r.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-card mt-3 flex items-center gap-3 rounded-xl p-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-hero-blue">
                <Icon name={specs.prompt.icon} className="h-4 w-4 text-white" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-[#101828]">{specs.prompt.titlePre}</p>
                <p className="text-[11px] text-[#101828]">{specs.prompt.subtext}</p>
              </div>
            </div>
            <QuoteLink
              href={specs.prompt.href}
              className="mt-2.5 flex items-center justify-center gap-2 rounded-lg bg-linear-to-br from-hero-blue to-hero-blue-dark px-4 py-3 text-xs font-bold uppercase text-white shadow-lg transition-transform hover:scale-[1.02]"
            >
              {specs.prompt.buttonLabel}
            </QuoteLink>
          </div>
        </div>

        {/* rebuild price */}
        <div className="relative overflow-hidden">
          <div className="relative px-4 py-7">
            <div className="overflow-hidden">
              <BMWStripe className="float-left mr-2 h-6 w-12 shrink-0" />
              <h2 className="hp-h2 uppercase">
                <span className="text-[#101828]">BMW B58 </span>
                <span className="text-hero-blue">{price.titleHighlight}</span>
              </h2>
            </div>

            <p className="mt-3 text-xs font-bold uppercase tracking-wide text-[#101828]">{price.startingFromLabel}</p>
            <span className="mt-1 block h-0.5 w-24 bg-linear-to-r from-bmw-blue via-white to-bmw-red" />
            <p className="mt-1 text-4xl font-extrabold text-hero-blue">{price.startingFromPrice}</p>
            <p className="mt-2 text-xs leading-snug text-[#101828]">{price.body}</p>

            <QuoteLink
              href={price.cta.href}
              className="mx-auto mt-3 flex w-fit items-center justify-center gap-2 rounded-lg bg-linear-to-br from-hero-blue to-hero-blue-dark px-3 py-3 text-xs font-bold uppercase text-white shadow-lg transition-transform hover:scale-[1.02]"
            >
              {price.cta.label}
            </QuoteLink>
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden space-y-3 md:block">
        {/* specifications */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image src={specs.image} alt="BMW B58 engine" fill className="object-cover object-right" sizes="100vw" />
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "linear-gradient(90deg, #fff 0%, #fff 68%, rgba(255,255,255,0.9) 76%, rgba(255,255,255,0.35) 86%, transparent 96%)" }}
              aria-hidden="true"
            />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 py-9 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <BMWStripe className="h-7 w-14 shrink-0" />
              <h2 className="hp-h2 whitespace-nowrap uppercase">
                <span className="text-[#101828]">BMW B58 </span>
                <span className="text-hero-blue">{specs.titleHighlight}</span>
              </h2>
            </div>

            <div className="max-w-[55%]">
              <div className="glass-card relative mt-6 divide-y divide-black/8 rounded-2xl px-6">
                <span className="pointer-events-none absolute bottom-0 top-0 w-px bg-black/10" style={{ left: "236px" }} aria-hidden="true" />
                {specs.rows.map((r) => (
                  <div key={r.label} className="flex items-center gap-4 py-3.5">
                    <Icon name={r.icon} className="h-5 w-5 shrink-0 text-hero-blue" />
                    <p className="w-40 shrink-0 text-sm font-bold text-[#101828]">{r.label}</p>
                    <p className="min-w-0 flex-1 pl-4 text-sm leading-snug text-[#101828]">{r.value}</p>
                  </div>
                ))}
              </div>

              <div className="glass-card mt-4 flex items-center gap-4 rounded-2xl p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-hero-blue">
                  <Icon name={specs.prompt.icon} className="h-5 w-5 text-white" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-[#101828]">{specs.prompt.titlePre}</p>
                  <p className="text-xs text-[#101828]">{specs.prompt.subtext}</p>
                </div>
                <QuoteLink
                  href={specs.prompt.href}
                  className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-linear-to-br from-hero-blue to-hero-blue-dark px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
                >
                  {specs.prompt.buttonLabel}
                </QuoteLink>
              </div>
            </div>
          </div>
        </div>

        {/* rebuild price */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image src={price.image} alt="BMW B58 engine components" fill className="object-cover object-right" sizes="100vw" />
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "linear-gradient(90deg, #fff 0%, #fff 60%, rgba(255,255,255,0.9) 70%, rgba(255,255,255,0.35) 82%, transparent 94%)" }}
              aria-hidden="true"
            />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 py-9 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <BMWStripe className="h-7 w-14 shrink-0" />
              <h2 className="hp-h2 whitespace-nowrap uppercase">
                <span className="text-[#101828]">BMW B58 </span>
                <span className="text-hero-blue">{price.titleHighlight}</span>
              </h2>
            </div>

            <div className="max-w-[45%]">
              <div className="mt-6 flex items-center gap-3">
                <p className="text-sm font-bold uppercase tracking-wide text-[#101828]">{price.startingFromLabel}</p>
                <span className="h-0.5 w-10 bg-[#101828]/30" />
              </div>
              <p className="text-6xl font-extrabold text-hero-blue">{price.startingFromPrice}</p>
              <p className="mt-4 text-sm leading-relaxed text-[#101828]">{price.body}</p>

              <QuoteLink
                href={price.cta.href}
                className="mt-6 flex w-fit items-center justify-center gap-2 rounded-lg bg-linear-to-br from-hero-blue to-hero-blue-dark px-4 py-4 text-sm font-bold uppercase text-white shadow-lg transition-transform hover:scale-[1.02]"
              >
                {price.cta.label}
              </QuoteLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
