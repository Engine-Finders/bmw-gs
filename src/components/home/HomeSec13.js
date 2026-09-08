import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import BMWStripe from "@/components/reusable/BMWStripe";

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

        <div className="mt-3 space-y-1.5">
          {data.fields.map((f) => (
            <div key={f.label} className="flex items-center gap-2.5 rounded-xl border border-black/10 bg-white px-3 py-1.5 shadow-sm">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-hero-blue/10">
                <Icon name={f.icon} className="h-4 w-4 text-hero-blue" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wide text-[#101828]">{f.label}</p>
                <p className="truncate text-sm text-[#101828]">{f.placeholder}</p>
              </div>
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 shrink-0 text-hero-blue"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="mt-5 w-full rounded-md border-2 border-hero-blue bg-hero-blue py-3 text-sm font-bold uppercase text-white shadow-[0_0_20px_rgba(0,127,248,0.4)] transition-colors hover:bg-transparent hover:text-hero-blue"
        >
          {data.ctaButton} →
        </button>

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

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {data.fields.map((f) => (
                <div key={f.label}>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#101828]">
                    <Icon name={f.icon} className="h-4 w-4" />
                    {f.label.toUpperCase()}
                  </label>
                  <div className="relative">
                    <select className="w-full appearance-none rounded-md border border-black/10 bg-white px-3 py-2.5 pr-9 text-sm text-[#101828]">
                      <option>{f.placeholder}</option>
                    </select>
                    <svg
                      viewBox="0 0 24 24"
                      className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#101828]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="mt-4 w-full rounded-md border-2 border-hero-blue bg-hero-blue py-3 text-sm font-bold uppercase text-white shadow-[0_0_20px_rgba(0,127,248,0.4)] transition-colors hover:bg-transparent hover:text-hero-blue sm:w-auto sm:px-8"
            >
              {data.ctaButton} →
            </button>
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
