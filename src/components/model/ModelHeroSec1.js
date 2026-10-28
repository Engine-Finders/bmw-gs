import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import BMWStripe from "@/components/reusable/BMWStripe";
import RegLookupForm from "@/components/reusable/RegLookupForm";
import QuoteLink from "@/components/shared/QuoteLink";

export default function ModelHeroSec1({ data }) {
  const [line1, line2, line3] = data.h1.split("|");

  return (
    <section className="relative overflow-hidden bg-hero-dark text-white">
      {/* ===== mobile ===== */}
      <div className="relative md:hidden">
        <div className="absolute inset-0">
          <Image src={data.imageMobile} alt="BMW technician rebuilding an engine block" fill priority className="object-cover object-top" sizes="100vw" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-hero-dark/15 to-hero-dark" />
          <div className="absolute inset-0 bg-linear-to-r from-hero-dark/75 via-hero-dark/20 to-transparent" />
        </div>

        <div className="relative px-4 pb-4 pt-4">
          <div className="max-w-[72%]">
            <div className="flex items-center gap-2">
              <BMWStripe className="h-3 w-6" />
              <p className="text-xs font-semibold uppercase leading-none tracking-widest text-white">{data.kicker}</p>
            </div>

            <h1 className="hp-h1 mt-2 uppercase">
              <span className="block text-white">{line1}</span>
              <span className="block text-hero-blue">{line2}</span>
              <span className="block text-white">{line3}</span>
            </h1>

            <p className="body-text mt-2 text-white">{data.subhead}</p>

            <div className="glass-card-dark mt-2 flex items-center gap-2 rounded-lg px-3 py-1.5">
              <div className="flex shrink-0 gap-0.5 text-[#ffcc00]">
                {Array.from({ length: data.rating.stars }).map((_, i) => (
                  <Icon key={i} name="star" className="h-3 w-3 fill-current" />
                ))}
              </div>
              <p className="text-xs font-semibold uppercase leading-tight text-white">{data.rating.label}</p>
            </div>
          </div>

          {/* five-column feature breakdown */}
          <div
            className="card-glare relative mt-2.5 grid grid-cols-5 divide-x divide-white/15 rounded-xl px-1 py-2.5"
            style={{ background: "linear-gradient(135deg, rgba(8,16,34,0.92) 0%, rgba(4,8,18,0.96) 100%)", backdropFilter: "blur(16px)" }}
          >
            {data.trustBar.map((t) => (
              <div key={t.label} className="flex flex-col items-center gap-1.5 px-0.5 text-center">
                <Icon name={t.icon} className="h-5 w-5 shrink-0 text-hero-blue" />
                <p className="min-w-0 text-[11px] font-medium leading-tight text-white [overflow-wrap:break-word]">{t.label}</p>
              </div>
            ))}
          </div>

          {/* pricing callout banner */}
          <QuoteLink
            href={data.priceCta.href}
            className="glass-luminous card-glare relative mt-2.5 flex items-center divide-x divide-white/15 rounded-xl px-3 py-3 transition duration-200 hover:-translate-y-0.5 hover:brightness-110"
            style={{ border: "1px solid rgba(90,170,255,0.45)" }}
          >
            <div className="flex items-center gap-2 pr-3">
              <Icon name={data.priceCta.icon} className="h-6 w-6 shrink-0 text-hero-blue" />
              <div>
                <p className="whitespace-nowrap text-xs font-semibold uppercase tracking-wide text-white">{data.priceCta.kicker}</p>
                <p className="whitespace-nowrap text-lg font-extrabold text-white">{data.priceCta.price}</p>
              </div>
            </div>
            <p className="whitespace-nowrap pl-3 text-xs font-bold uppercase leading-tight text-hero-blue">{data.priceCta.label}</p>
          </QuoteLink>

          {/* registration lookup */}
          <div className="glass-card-dark mt-2.5 rounded-xl p-3">
            <div className="flex items-center gap-2">
              <Icon name="car" className="h-5 w-5 shrink-0 text-hero-blue" />
              <p className="text-sm font-extrabold uppercase tracking-wide text-white">{data.quickQuote.title}</p>
            </div>
            <p className="mt-1 text-xs text-white">{data.quickQuote.subhead}</p>

            <div className="mt-2">
              <RegLookupForm buttonLabel="Check Match" row compactButton hideArrow />
            </div>

            <div className="mt-2 flex items-center gap-1.5">
              <Icon name="lock" className="h-3.5 w-3.5 shrink-0 text-white" />
              <p className="text-xs text-white">{data.quickQuote.securityNote}</p>
            </div>
          </div>

          {/* direct contact CTA */}
          <QuoteLink
            href={data.phoneCta.href}
            className="glass-luminous card-glare relative mt-2.5 flex items-center gap-3 rounded-xl p-3 transition duration-200 hover:-translate-y-0.5 hover:brightness-110"
            style={{ border: "1px solid rgba(90,170,255,0.45)" }}
          >
            <div
              className="pointer-events-none absolute bottom-0 right-0 h-full"
              style={{
                width: "90px",
                background:
                  "linear-gradient(135deg, transparent 0%, transparent 55%, var(--color-bmw-blue) 55%, var(--color-bmw-blue) 68%, var(--color-bmw-violet) 68%, var(--color-bmw-violet) 78%, var(--color-bmw-red) 78%, var(--color-bmw-red) 88%, transparent 88%, transparent 100%)",
              }}
              aria-hidden="true"
            />
            <Icon name={data.phoneCta.icon} className="relative h-7 w-7 shrink-0 text-hero-blue" />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-wide text-white">{data.phoneCta.label}</p>
              <p className="text-lg font-extrabold text-white">{data.phoneCta.phone}</p>
            </div>
          </QuoteLink>

          {/* trust footer */}
          <div
            className="glass-luminous card-glare relative mt-2.5 flex items-center justify-center gap-2 rounded-lg px-3 py-2"
            style={{ border: "1px solid rgba(90,170,255,0.45)" }}
          >
            <Icon name="shield-check" className="h-4 w-4 shrink-0 text-hero-blue" />
            <p className="text-xs font-medium text-white">{data.trustFooter}</p>
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden overflow-hidden px-4 py-8 sm:px-6 md:block lg:px-8">
        <div className="absolute inset-0">
          <Image src={data.image} alt="BMW technician rebuilding an engine block" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-linear-to-r from-hero-dark via-hero-dark/70 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-hero-dark via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2">
              <BMWStripe className="h-3.5 w-7" />
              <p className="text-xs font-semibold uppercase leading-none tracking-widest text-white">{data.kicker}</p>
            </div>

            <div role="heading" aria-level="1" className="hp-h1 mt-3 uppercase">
              <span className="block whitespace-nowrap text-white">{line1}</span>
              <span className="block whitespace-nowrap text-hero-blue">{line2}</span>
              <span className="block text-white">{line3}</span>
            </div>

            <p className="body-text mt-4 max-w-xl text-white">{data.subhead}</p>


            {/* reg lookup */}
            <div className="mt-3 max-w-md">
              <RegLookupForm buttonLabel="Look Up" row />
            </div>

            <div className="glass-luminous card-glare relative mt-3 flex items-stretch justify-between divide-x divide-white/15 rounded-xl px-2 py-3">
              {data.trustBar.map((t) => (
                <div key={t.label} className="flex flex-1 items-center gap-2 px-2">
                  <Icon name={t.icon} className="h-7 w-7 shrink-0 text-hero-blue" />
                  <p className="text-xs leading-tight font-medium text-white">{t.label.replace(/^✔\s*/, "")}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 flex flex-wrap items-stretch gap-4">
              <QuoteLink
                href={data.priceCta.href}
                className="card-glare relative flex w-72 shrink-0 flex-col justify-between rounded-xl border-hero-blue/60 bg-linear-to-br from-hero-blue to-hero-blue-dark px-5 py-4 transition-transform hover:scale-[1.02]"
              >
                <div className="flex items-center gap-3">
                  <Icon name={data.priceCta.icon} className="h-10 w-10 shrink-0 text-white" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-white">{data.priceCta.kicker}</p>
                    <p className="text-3xl font-extrabold leading-tight text-white">{data.priceCta.price}</p>
                  </div>
                </div>
                <p className="mt-3 text-xs font-bold uppercase leading-tight tracking-wide text-white">{data.priceCta.label}</p>
              </QuoteLink>

              <QuoteLink
                href={data.phoneCta.href}
                className="glass-luminous card-glare relative flex w-72 shrink-0 flex-col justify-center rounded-xl px-5 py-4 transition-colors hover:bg-white/5"
              >
                <div
                  className="pointer-events-none absolute bottom-0 right-0 h-full"
                  style={{
                    width: "110px",
                    background:
                      "linear-gradient(135deg, transparent 0%, transparent 55%, var(--color-bmw-blue) 55%, var(--color-bmw-blue) 68%, var(--color-bmw-violet) 68%, var(--color-bmw-violet) 78%, var(--color-bmw-red) 78%, var(--color-bmw-red) 88%, transparent 88%, transparent 100%)",
                  }}
                  aria-hidden="true"
                />
                <div className="relative flex items-center gap-3">
                  <Icon name={data.phoneCta.icon} className="h-10 w-10 shrink-0 text-hero-blue" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-white">{data.phoneCta.label}</p>
                    <p className="whitespace-nowrap text-xl font-extrabold leading-tight text-white">{data.phoneCta.phone}</p>
                  </div>
                </div>
              </QuoteLink>
            </div>
            <div className="glass-luminous card-glare relative mt-3 flex w-fit items-center gap-2.5 rounded-lg px-4 py-2.5">
              <div className="flex shrink-0 gap-0.5 text-[#ffcc00]">
                {Array.from({ length: data.rating.stars }).map((_, i) => (
                  <Icon key={i} name="star" className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-xs font-semibold uppercase leading-tight text-white">{data.rating.label}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
