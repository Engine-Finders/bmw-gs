import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import BMWStripe from "@/components/reusable/BMWStripe";

export default function HomeSec7({ data }) {
  const [w1, brand, w2] = data.h2.split(/\s*(BMW)\s*/i);
  const mobileModels = data.models.slice(0, 10);

  return (
    <section className="relative overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-hero-blue/12 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-bmw-violet/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        {/* ===== mobile ===== */}
        <div className="md:hidden">
          <div className="mb-4 flex justify-center">
            <BMWStripe size="lg" />
          </div>
          <div className="relative mb-5 flex items-center justify-center gap-2">
            <h2 className="hp-h2 text-center uppercase text-[#101828]">
              {w1} <span className="text-bmw-blue">B</span>
              <span className="text-bmw-blue">M</span>
              <span className="bg-linear-to-r from-bmw-blue to-bmw-red bg-clip-text text-transparent">W</span> {w2}
            </h2>
            <BMWStripe className="h-6 w-10 shrink-0 -skew-x-12" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {mobileModels.map((m) => (
              <a
                key={m.slug}
                href={m.href}
                className="glass-card rounded-2xl p-3 text-center"
              >
                <div className="relative mb-2 h-20 w-full overflow-hidden rounded-md">
                  <Image src={m.image} alt={m.name} fill className="object-contain" sizes="200px" />
                </div>
                <p className="text-xs font-extrabold uppercase text-[#101828]">{m.name}</p>
              </a>
            ))}
          </div>

          <div
            className="mt-5 flex items-stretch rounded-2xl border border-hero-blue/30 bg-[#f3f6fb] px-2 py-4"
            style={{ boxShadow: "0 0 40px -8px rgba(0,138,201,0.35)" }}
          >
            {data.trustBadges.map((b, i) => (
              <div key={b.label} className="flex min-w-0 flex-1 items-stretch justify-center">
                {i > 0 && (
                  <span className="mr-1 w-px shrink-0 self-center bg-hero-blue/20" style={{ height: "60%" }} />
                )}
                <div className="flex min-w-0 flex-col items-center gap-1.5 px-0.5 text-center">
                  <Icon name={b.icon} className="h-9 w-9 shrink-0 text-hero-blue" />
                  <p className="text-[10px] font-semibold leading-tight text-[#101828]">{b.label}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            href={data.cta.href}
            className="mt-4 block rounded-sm border-2 border-hero-blue px-6 py-3 text-center text-sm font-bold uppercase text-hero-blue"
          >
            {data.cta.label} →
          </a>
        </div>

        {/* ===== desktop ===== */}
        <div className="hidden md:block">
          <div className="relative mb-6 flex items-center justify-center">
            <h2 className="hp-h2 uppercase text-[#101828]">
              {w1} <span className="text-bmw-blue">B</span>
              <span className="text-bmw-blue">M</span>
              <span className="bg-linear-to-r from-bmw-blue to-bmw-red bg-clip-text text-transparent">W</span> {w2}
            </h2>
            <BMWStripe className="absolute right-0 top-1/2 h-10 w-20 -translate-y-1/2" />
          </div>

          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            {data.models.map((m) => (
              <a
                key={m.slug}
                href={m.href}
                className="glass-card group rounded-xl p-3 text-center transition-shadow hover:shadow-md"
              >
                <div className="relative mb-2 h-16 w-full overflow-hidden rounded-md">
                  <Image src={m.image} alt={m.name} fill className="object-contain" sizes="120px" />
                </div>
                <p className="text-xs font-bold text-hero-blue">{m.name}</p>
              </a>
            ))}
          </div>

          <div
            className="mt-6 flex items-stretch rounded-2xl border border-hero-blue/30 bg-[#f3f6fb] px-6 py-6"
            style={{ boxShadow: "0 0 40px -8px rgba(0,138,201,0.35)" }}
          >
            {data.trustBadges.map((b, i) => (
              <div key={b.label} className="flex min-w-0 flex-1 items-stretch justify-center">
                {i > 0 && (
                  <span className="mr-6 w-px shrink-0 self-center bg-hero-blue/20" style={{ height: "60%" }} />
                )}
                <div className="flex min-w-0 flex-col items-center gap-2 px-1 text-center">
                  <Icon name={b.icon} className="h-9 w-9 shrink-0 text-hero-blue" />
                  <p className="text-sm font-semibold text-[#101828]">{b.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
