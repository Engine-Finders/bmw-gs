import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import BMWStripe from "@/components/reusable/BMWStripe";

export default function ModelSec11({ data }) {
  const [line1, line2] = data.h2.split("|");

  return (
    <section className="relative overflow-hidden bg-hero-dark text-white">
      {/* ===== mobile ===== */}
      <div className="relative md:hidden">
        <div className="absolute inset-0">
          <Image src={data.imageMobile} alt="BMW technician rebuilding an engine block" fill className="object-cover object-top" sizes="100vw" />
          <div className="absolute inset-0 bg-linear-to-b from-hero-dark/70 via-transparent to-hero-dark/60" />
        </div>

        <div className="relative px-4 pb-8 pt-12">
          <BMWStripe className="h-3 w-6" />
          <h2 className="origin-left scale-y-110 scale-x-90 mt-2 text-3xl font-extrabold uppercase leading-[1.05] tracking-tighter">
            <span className="block text-white">{line1}</span>
            <span className="block text-hero-blue">{line2}</span>
          </h2>
          <span className="mt-3 block h-px w-16 bg-hero-blue/50" />

          <div className="h-95" aria-hidden="true" />

          <div className="divide-y divide-white/10 border-t border-white/10">
            {data.checklist.map((item) => (
              <div key={item} className="flex items-center gap-3 py-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-hero-blue/70 shadow-[0_0_12px_-1px_rgba(0,127,248,0.8)]">
                  <Icon name="check" className="h-4 w-4 text-white" />
                </span>
                <p className="text-sm text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-6 sm:px-6 md:block lg:px-8">
      <div className="absolute inset-0">
        <Image src={data.image} alt="BMW technician rebuilding an engine block" fill className="object-cover" sizes="100vw" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-[44%]">
          <div className="flex items-center gap-3">
            <BMWStripe className="h-6 w-11 shrink-0" />
            <h2 className="origin-left scale-y-110 scale-x-90 text-3xl font-extrabold uppercase leading-[1.05] tracking-tighter lg:text-4xl">
              <span className="block text-white">{line1}</span>
            </h2>
          </div>
          <h2 className="origin-left scale-y-110 scale-x-90 text-3xl font-extrabold uppercase leading-[1.05] tracking-tighter lg:text-4xl">
            <span className="block text-hero-blue">{line2}</span>
          </h2>

          <div className="mt-3 divide-y divide-white/10 border-t border-white/10">
            {data.checklist.map((item) => (
              <div key={item} className="flex items-center gap-2.5 py-2">
                <span className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full border border-hero-blue/60 bg-hero-blue/10 shadow-[0_0_10px_-2px_rgba(0,127,248,0.7)]">
                  <Icon name="check" className="h-3 w-3 text-hero-blue" />
                </span>
                <p className="text-sm text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
