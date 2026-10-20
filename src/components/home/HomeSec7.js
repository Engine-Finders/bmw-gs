import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import ExpandGrid from "@/components/reusable/ExpandGrid";
import BMWStripe from "@/components/reusable/BMWStripe";

export default function HomeSec7({ data }) {
  const [w1, brand, w2] = data.h2.split(/\s*(BMW)\s*/i);

  return (
    <section className="relative overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-hero-blue/12 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-bmw-violet/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        {/* ===== mobile ===== */}
        <div className="md:hidden">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-hero-blue/40" />
            <BMWStripe size="lg" />
            <span className="h-px w-12 bg-hero-blue/40" />
          </div>
          <h2 className="hp-h2 mb-5 text-center uppercase text-[#101828]">
            {w1} <span className="text-bmw-blue">B</span>
            <span className="text-bmw-blue">M</span>
            <span className="bg-linear-to-r from-bmw-blue to-bmw-red bg-clip-text text-transparent">W</span> {w2}
          </h2>

          <ExpandGrid
            className="grid grid-cols-2 gap-3"
            limit={6}
            label="View All Models"
            wrapClass="mt-5 flex justify-center"
            buttonClass="flex items-center gap-2 rounded-lg border-2 border-hero-blue bg-white/70 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-hero-blue backdrop-blur-md transition hover:bg-hero-blue hover:text-white"
          >
            {data.models.map((m) => (
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
          </ExpandGrid>

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

        </div>

        {/* ===== desktop ===== */}
        <div className="hidden md:block">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-20 bg-hero-blue/40" />
            <BMWStripe size="lg" className="md:h-6 md:w-14" />
            <span className="h-px w-20 bg-hero-blue/40" />
          </div>
          <h2 className="hp-h2 mb-6 text-center uppercase text-[#101828]">
            {w1} <span className="text-bmw-blue">B</span>
            <span className="text-bmw-blue">M</span>
            <span className="bg-linear-to-r from-bmw-blue to-bmw-red bg-clip-text text-transparent">W</span> {w2}
          </h2>

          <ExpandGrid
            className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6"
            limit={8}
            limitLg={12}
            label="View All Models"
            wrapClass="mt-6 flex justify-center"
            buttonClass="flex items-center gap-2 rounded-md border-2 border-hero-blue bg-white/70 px-6 py-2.5 text-xs font-bold uppercase tracking-wide text-hero-blue backdrop-blur-md transition hover:bg-hero-blue hover:text-white"
          >
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
          </ExpandGrid>

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
