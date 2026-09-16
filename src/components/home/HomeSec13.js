import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import BMWStripe from "@/components/reusable/BMWStripe";
import EngineExplorerForm from "./EngineExplorerForm";
import explorer from "@/data/shared/engineExplorer.json";

export default function HomeSec13({ data }) {
  const [line1, line2] = data.h2.split("|");

  return (
    <section className="relative overflow-hidden">
      {/* ===== mobile ===== */}
      <div className="relative px-4 py-7 md:hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h2 className="-skew-x-6 origin-left scale-y-115 scale-x-92 text-[28px] font-extrabold uppercase leading-[1.05] tracking-tighter">
              <span className="block text-[#101828]">{line1}</span>
              <span className="block text-hero-blue">{line2}</span>
            </h2>

            <p className="mt-2 max-w-[85%] text-xs text-[#101828]">
              Interactive tool to find your engine, explore known issues and get a{" "}
              <span className="font-bold text-[#101828]">fixed-price</span> quote.
            </p>
          </div>

          <div className="relative h-30 w-30 shrink-0">
            <BMWStripe size="lg" className="absolute -right-1 -top-1 -rotate-12" />
            <Image src="/home/sec9_5_engine.webp" alt="BMW engine" fill className="object-contain" sizes="100px" />
          </div>
        </div>

        <EngineExplorerForm fields={data.fields} explorer={explorer} ctaButton={data.ctaButton} mobile />

        <div className="glass-card mt-5 grid grid-cols-2 gap-x-4 gap-y-4 rounded-2xl p-4">
          {data.trustBadges.map((b, i) => (
            <div key={b.label} className="relative flex items-center gap-2.5">
              {i % 2 === 1 && <span className="absolute -left-2 top-0 h-full w-px bg-black/15" />}
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-hero-blue/15 shadow-[0_0_12px_rgba(0,127,248,0.25)]">
                <Icon name={b.icon} className="h-6 w-6 text-hero-blue" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[11px] font-extrabold uppercase text-[#101828]">{b.value}</p>
                <p className="truncate text-[10px] uppercase text-[#101828]">{b.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden overflow-hidden px-4 py-6 sm:px-6 md:block lg:px-8">
      <BMWStripe size="lg" className="absolute right-6 top-6" />
      <BMWStripe size="lg" className="absolute bottom-6 right-6" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8">
          <div>
            <h2 className="-skew-x-6 origin-left scale-y-115 scale-x-92 text-4xl font-extrabold uppercase leading-tight tracking-tighter sm:text-5xl">
              <span className="block text-[#101828]">{line1}</span>
              <span className="block text-hero-blue">{line2}</span>
            </h2>
            <p className="mt-2 max-w-lg text-sm text-[#101828]">{data.description}</p>

            <EngineExplorerForm fields={data.fields} explorer={explorer} ctaButton={data.ctaButton} />
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-md">
            <Image src={data.image} alt="BMW engine block" fill className="object-contain" sizes="480px" />
          </div>
        </div>

        <div className="glass-card mt-5 flex items-center justify-between gap-6 rounded-xl px-6 py-4">
          {data.trustBadges.map((b, i) => (
            <div key={b.label} className="flex flex-1 items-center gap-3">
              {i > 0 && <span className="mr-2 h-10 w-px shrink-0 bg-black/10" />}
              <Icon name={b.icon} className="h-9 w-9 shrink-0 text-hero-blue" />
              <div className="min-w-0">
                <p className="whitespace-nowrap text-sm font-bold uppercase text-[#101828]">{b.value}</p>
                <p className="whitespace-nowrap text-xs uppercase text-[#101828]">{b.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
