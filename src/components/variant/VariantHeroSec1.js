import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import BMWStripe from "@/components/reusable/BMWStripe";
import RegLookupForm from "@/components/reusable/RegLookupForm";
import QuoteLink from "@/components/shared/QuoteLink";

export default function VariantHeroSec1({ data }) {
  const [line1, line2, line3] = data.h1.split("|");
  const line2Mobile = line2.replace(/\s*-\s*$/, "");
  const line3Mobile = `- ${line3}`;

  return (
    <section className="relative overflow-hidden bg-hero-dark text-white">
      {/* ===== mobile ===== */}
      <div className="relative md:hidden">
        <div className="absolute inset-0">
          <Image src={data.imageMobile} alt="BMW technician rebuilding a 320d engine block" fill priority className="object-cover object-[65%_18%]" sizes="100vw" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-hero-dark/10 to-hero-dark" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, #070b14 0%, rgba(7,11,20,0.92) 65%, rgba(7,11,20,0.55) 82%, transparent 100%)" }}
          />
        </div>

        <div className="relative px-4 pb-4 pt-4">
          <div className="max-w-[72%]">
            <div className="flex items-center gap-2">
              <BMWStripe className="h-3.5 w-7" />
              <p className="text-[11px] font-semibold uppercase leading-none tracking-widest text-white">{data.kicker}</p>
            </div>

            <h1 className="hp-h1 mt-1.5 uppercase">
              <span className="block text-white">{line1}</span>
              <span className="block text-hero-blue">{line2Mobile}</span>
              <span className="block text-white">{line3Mobile}</span>
            </h1>

            <p className="mt-1.5 text-sm leading-snug text-white">{data.subhead}</p>

            <div className="glass-card-dark mt-2 flex items-center gap-2 rounded-lg px-3 py-2">
              <div className="flex shrink-0 gap-0.5 text-[#ffcc00]">
                {Array.from({ length: data.rating.stars }).map((_, i) => (
                  <Icon key={i} name="star" className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="text-[10px] font-semibold uppercase leading-tight text-white">
                {data.rating.label.split("-")[0]}-{" "}
                <span className="text-hero-blue">{data.rating.label.split("-")[1]}</span>
              </p>
            </div>
          </div>

          {/* five-column feature breakdown */}
          <div
            className="card-glare relative mt-2.5 grid grid-cols-5 divide-x divide-white/15 rounded-xl px-1 py-3"
            style={{ background: "linear-gradient(135deg, rgba(8,16,34,0.92) 0%, rgba(4,8,18,0.96) 100%)", backdropFilter: "blur(16px)" }}
          >
            {data.trustBar.map((t) => (
              <div key={t.label} className="flex flex-col items-center gap-1 px-1 text-center">
                <Icon name={t.icon} className="h-6 w-6 shrink-0 text-hero-blue" />
                <p className="text-[8px] font-medium leading-tight text-white">{t.label}</p>
              </div>
            ))}
          </div>

          {/* pricing callout banner */}
          <QuoteLink
            href={data.priceCta.href}
            className="glass-luminous card-glare relative mt-2.5 flex items-center justify-between rounded-xl px-4 py-3.5 transition-transform hover:scale-[1.02]"
            style={{ border: "1px solid rgba(90,170,255,0.45)" }}
          >
            <p className="text-xs font-medium text-white">{data.priceCta.kicker}</p>
            <p className="whitespace-nowrap text-sm font-extrabold text-hero-blue">{data.priceCta.label}</p>
          </QuoteLink>

          {/* registration lookup */}
          <div className="glass-card-dark mt-2.5 rounded-xl p-3">
            <div className="flex items-center gap-2">
              <Icon name="car" className="h-5 w-5 shrink-0 text-hero-blue" />
              <p className="text-sm font-extrabold uppercase tracking-wide text-white">Check Your Exact Engine</p>
            </div>
            <p className="mt-1 text-xs text-white">Enter your reg and we&apos;ll confirm your exact 320d spec.</p>
            <div className="mt-2">
              <RegLookupForm buttonLabel="Check Match" row compactButton hideArrow />
            </div>
          </div>

          {/* direct contact CTA */}
          <QuoteLink
            href={data.phoneCta.href}
            className="glass-luminous card-glare relative mt-2.5 flex items-center gap-3 rounded-xl p-3.5 transition-transform hover:scale-[1.02]"
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
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-hero-blue">
              <Icon name={data.phoneCta.icon} className="h-5 w-5 text-white" />
            </span>
            <div className="relative min-w-0">
              <p className="truncate text-[11px] font-medium text-white">{data.phoneCta.label}</p>
              <p className="truncate text-lg font-extrabold text-white">{data.phoneCta.phone}</p>
            </div>
          </QuoteLink>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden overflow-hidden md:block">
        <div className="absolute inset-0">
          <Image src={data.image} alt="BMW technician rebuilding a 320d engine block" fill priority className="object-cover" sizes="100vw" />
        </div>

        <div
          className="pointer-events-none absolute inset-y-0"
          style={{
            left: "52%",
            width: "6px",
            background: "linear-gradient(180deg, var(--color-bmw-blue), var(--color-bmw-red))",
            transform: "skewX(-12deg)",
            boxShadow: "0 0 24px 4px rgba(0,138,201,0.55)",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="max-w-2xl">
            <BMWStripe className="h-4 w-8" />

            <h1 className="hp-h1 mt-3 uppercase">
              <span className="block whitespace-nowrap text-white">{line1}</span>
              <span className="block whitespace-nowrap text-hero-blue">{line2}</span>
              <span className="block text-white">{line3}</span>
            </h1>

            <p className="mt-3 max-w-md text-sm text-white lg:text-base">{data.subhead}</p>

            <div className="glass-luminous card-glare relative mt-3 inline-flex items-center gap-3 rounded-lg px-5 py-3" style={{ border: "1px solid rgba(90,170,255,0.45)" }}>
              <div className="flex shrink-0 gap-1 text-[#ffcc00]">
                {Array.from({ length: data.rating.stars }).map((_, i) => (
                  <Icon key={i} name="star" className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="whitespace-nowrap text-sm font-medium text-white">
                {data.rating.label.split("-")[0]}-{" "}
                <span className="text-hero-blue">{data.rating.label.split("-")[1]}</span>
              </p>
            </div>

            {/* reg lookup */}
            <div className="mt-3 max-w-md">
              <RegLookupForm buttonLabel="Check Match" row />
            </div>

            <div className="mt-3 flex flex-wrap items-stretch gap-4">
              <QuoteLink
                href={data.priceCta.href}
                className="flex w-60 shrink-0 flex-col justify-center whitespace-nowrap rounded-lg bg-linear-to-br from-hero-blue to-hero-blue-dark px-5 py-4 shadow-lg transition-transform hover:scale-[1.02]"
              >
                <p className="text-[11px] font-medium text-white">{data.priceCta.kicker}</p>
                <p className="text-sm font-extrabold text-white">{data.priceCta.label}</p>
              </QuoteLink>

              <QuoteLink
                href={data.phoneCta.href}
                className="glass-luminous card-glare relative flex w-60 shrink-0 items-center gap-3 rounded-lg px-5 py-4 transition-transform hover:scale-[1.02]"
                style={{ border: "1px solid rgba(90,170,255,0.45)" }}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-hero-blue">
                  <Icon name={data.phoneCta.icon} className="h-5 w-5 text-white" />
                </span>
                <div className="min-w-0">
                  <p className="whitespace-nowrap text-[11px] font-medium text-white">{data.phoneCta.label}</p>
                  <p className="whitespace-nowrap text-base font-extrabold text-white">{data.phoneCta.phone}</p>
                </div>
              </QuoteLink>
            </div>
          </div>

          {/* bottom feature bar */}
          <div
            className="glass-luminous card-glare relative z-10 mt-6 flex items-stretch justify-between divide-x divide-white/15 rounded-xl px-4 py-5"
            style={{ border: "1px solid rgba(90,170,255,0.45)", background: "rgba(5,12,28,0.6)" }}
          >
            {data.trustBar.map((t) => (
              <div key={t.label} className="flex min-w-0 flex-1 items-center gap-3 px-3">
                <Icon name={t.icon} className="h-11 w-11 shrink-0 text-hero-blue" />
                <p className="min-w-0 text-sm leading-tight font-medium text-white">{t.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
