import Image from "next/image";
import PhotoStripes from "@/components/reusable/PhotoStripes";
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
          <PhotoStripes preset="choose-us-mobile" />
          <div className="absolute inset-0 bg-linear-to-b from-hero-dark/70 via-transparent to-hero-dark/60" />
        </div>

        <div className="relative px-4 pb-8 pt-12">
          <BMWStripe className="h-3 w-6" />
          <h2 className="hp-h2 mt-2 uppercase">
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
        {/* the photo's baked-in diagonal stripes are covered and redrawn here; coordinates are in photo pixels (1365x768) and "slice" crops like object-cover */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1365 768" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="s11-cover" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#0a1a34" />
              <stop offset="0.55" stopColor="#050d1c" />
              <stop offset="1" stopColor="#02060f" />
            </linearGradient>
            <filter id="s11-glow" x="-50%" y="-5%" width="200%" height="110%">
              <feGaussianBlur stdDeviation="9" />
            </filter>
          </defs>
          <polygon points="700,0 884,0 584,768 440,768" fill="url(#s11-cover)" />
          <polygon points="744,0 778,0 508,768 472,768" fill="#1d4ed8" opacity="0.8" filter="url(#s11-glow)" />
          <polygon points="808,0 852,0 548,768 518,768" fill="#e11d2e" opacity="0.8" filter="url(#s11-glow)" />
          <polygon points="744,0 778,0 508,768 472,768" fill="#1f56e6" />
          <polygon points="765,0 771,0 499,768 493,768" fill="#9fd0ff" />
          <polygon points="808,0 852,0 548,768 518,768" fill="#ee1c2e" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-[50%]">
          <div className="flex items-center gap-4">
            <BMWStripe className="h-6 w-11 shrink-0" />
            <div role="heading" aria-level="2" className="hp-h2 uppercase">
              <span className="block text-white">{line1}</span>
            </div>
          </div>
          <div role="heading" aria-level="2" className="hp-h2 uppercase">
            <span className="block text-hero-blue">{line2}</span>
          </div>

          <div className="mt-3 divide-y divide-white/10 border-t border-white/10">
            {data.checklist.map((item) => (
              <div key={item} className="flex items-center gap-3 py-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-hero-blue/60 bg-hero-blue/10 shadow-[0_0_10px_-2px_rgba(0,127,248,0.7)]">
                  <Icon name="check" className="h-4 w-4 text-hero-blue" />
                </span>
                <p className="body-text text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
