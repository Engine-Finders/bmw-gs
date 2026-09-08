import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import BMWStripe from "@/components/reusable/BMWStripe";
import RegLookupForm from "@/components/reusable/RegLookupForm";

export default function HeroSec1({ data }) {
  return (
    <section className="relative overflow-hidden bg-hero-dark text-white">
      {/* ===== mobile ===== */}
      <div className="relative md:hidden">
        <div className="absolute inset-0">
          <Image src={data.image} alt="BMW technician rebuilding a B58 engine block" fill priority className="object-cover object-[70%_30%]" sizes="100vw" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, #070b14 0%, rgba(7,11,20,0.92) 65%, rgba(7,11,20,0.55) 82%, transparent 100%)" }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-hero-dark/10 to-hero-dark" />
        </div>

        <div className="relative px-4 pb-4 pt-4">
          <div className="max-w-[80%]">
            <div className="flex items-center gap-2">
              <BMWStripe className="h-6 w-11 shrink-0" />
              <p className="text-[1.55rem] font-title font-extrabold italic uppercase leading-[1.05] tracking-tighter">
                <span className="text-white">{data.titlePre} </span>
                <span className="text-hero-blue">{data.titleHighlight}</span>
              </p>
            </div>
            <p className="text-[1.55rem] font-title font-extrabold italic uppercase leading-[1.05] tracking-tighter text-white">{data.titleLine2}</p>

            <p className="mt-1.5 text-sm leading-snug text-white">{data.subhead}</p>

            <div className="mt-2 flex items-center gap-2">
              <div className="flex shrink-0 gap-0.5 text-[#ffcc00]">
                {Array.from({ length: data.rating.stars }).map((_, i) => (
                  <Icon key={i} name="star" className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="text-[10px] font-semibold uppercase leading-tight text-white">{data.rating.label}</p>
            </div>
          </div>

          {/* five-column feature breakdown */}
          <div
            className="card-glare relative mt-2.5 grid grid-cols-5 divide-x divide-white/15 rounded-xl px-1 py-3"
            style={{ background: "linear-gradient(135deg, rgba(8,16,34,0.92) 0%, rgba(4,8,18,0.96) 100%)", backdropFilter: "blur(16px)" }}
          >
            {data.trustBar.map((t) => (
              <div key={t.label} className="flex flex-col items-center gap-1 px-1 text-center">
                <Icon name={t.icon} className="h-7 w-7 shrink-0 text-hero-blue" />
                <p className="text-[8px] font-medium leading-tight text-white">{t.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-2.5 flex flex-col items-center text-center">
            <p className="text-[10px] uppercase tracking-wide text-white">{data.priceCta.kicker}</p>
            <p className="text-2xl font-extrabold italic text-hero-blue">{data.priceCta.label}</p>
          </div>

          <a
            href={data.priceCta.href}
            className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-linear-to-br from-hero-blue to-hero-blue-dark px-5 py-3.5 text-sm font-bold uppercase text-white shadow-lg transition-transform hover:scale-[1.02]"
          >
            {data.priceCta.buttonLabel}
          </a>

          {/* registration lookup */}
          <div className="glass-card-dark mt-2.5 rounded-xl p-3">
            <div className="flex items-center gap-2">
              <Icon name="car" className="h-5 w-5 shrink-0 text-hero-blue" />
              <p className="text-sm font-extrabold uppercase tracking-wide text-white">Check Your Exact Engine</p>
            </div>
            <p className="mt-1 text-xs text-white">Enter your reg and we&apos;ll confirm your exact B58 spec.</p>
            <div className="mt-2">
              <RegLookupForm buttonLabel="Check Match" row compactButton hideArrow />
            </div>
          </div>

          <a
            href={data.phoneCta.href}
            className="glass-luminous card-glare relative mt-2.5 flex items-center gap-3 rounded-xl p-3.5 transition-transform hover:scale-[1.02]"
            style={{ border: "1px solid rgba(90,170,255,0.45)" }}
          >
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-hero-blue">
              <Icon name={data.phoneCta.icon} className="h-5 w-5 text-white" />
            </span>
            <div className="relative min-w-0">
              <p className="truncate text-[11px] font-medium text-white">{data.phoneCta.label}</p>
              <p className="truncate text-lg font-extrabold text-white">{data.phoneCta.phone}</p>
            </div>
          </a>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden overflow-hidden md:block">
        <div className="absolute inset-0">
          <Image src={data.image} alt="BMW technician rebuilding a B58 engine block" fill priority className="object-cover" sizes="100vw" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(3,6,14,0.85) 0%, rgba(3,6,14,0.55) 42%, rgba(3,6,14,0.15) 60%, transparent 75%)" }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <BMWStripe className="h-7 w-14 shrink-0" />
              <p className="whitespace-nowrap text-4xl font-title font-extrabold italic uppercase leading-[1.05] tracking-tighter lg:text-5xl">
                <span className="text-white">{data.titlePre} </span>
                <span className="text-hero-blue">{data.titleHighlight}</span>
              </p>
            </div>
            <p className="text-4xl font-title font-extrabold italic uppercase leading-[1.05] tracking-tighter text-white lg:text-5xl">{data.titleLine2}</p>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-white lg:text-[15px]">{data.subhead}</p>

            <span className="mt-3 block h-0.5 w-56 bg-linear-to-r from-bmw-blue via-white to-bmw-red" />

            <div className="mt-3 flex items-center gap-2.5">
              <div className="flex shrink-0 gap-1 text-[#ffcc00]">
                {Array.from({ length: data.rating.stars }).map((_, i) => (
                  <Icon key={i} name="star" className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="whitespace-nowrap text-sm font-medium text-white">{data.rating.label}</p>
            </div>

            {/* reg lookup */}
            <div className="mt-3 max-w-md">
              <RegLookupForm buttonLabel="Check Match" row />
            </div>

            {/* five-column feature breakdown */}
            <div className="mt-3">
              <div className="grid grid-cols-5 divide-x divide-white/15">
                {data.trustBar.map((t) => (
                  <div key={t.label} className="flex min-w-0 flex-col items-center gap-2 px-3 text-center">
                    <Icon name={t.icon} className="h-10 w-10 shrink-0 text-hero-blue" />
                    <p className="min-w-0 text-[11px] leading-snug text-white">{t.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 flex items-stretch gap-5">
              <div className="flex shrink-0 flex-col justify-center">
                <p className="text-xs uppercase tracking-wide text-white">{data.priceCta.kicker}</p>
                <p className="text-5xl font-extrabold italic text-hero-blue">{data.priceCta.label}</p>
              </div>
              <span className="w-px shrink-0 bg-white/15" aria-hidden="true" />
              <div className="flex flex-col justify-center gap-2.5">
                <a
                  href={data.priceCta.href}
                  className="flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-linear-to-br from-hero-blue to-hero-blue-dark px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
                  style={{ boxShadow: "0 15px 35px -15px rgba(0,127,248,0.6)" }}
                >
                  {data.priceCta.buttonLabel}
                </a>
                <a
                  href={data.phoneCta.href}
                  className="glass-luminous flex items-center gap-2.5 whitespace-nowrap rounded-lg px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
                  style={{ border: "1px solid rgba(90,170,255,0.45)" }}
                >
                  <Icon name={data.phoneCta.icon} className="h-4 w-4 shrink-0 text-white" />
                  {data.phoneCta.label} {data.phoneCta.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
