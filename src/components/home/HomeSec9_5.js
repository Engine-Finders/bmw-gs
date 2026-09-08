import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import BMWStripe from "@/components/reusable/BMWStripe";

const FLOATERS = [
  { top: "8%", left: "10%", size: 76, rotate: -10, opacity: 0.9, delay: "0s" },
  { top: "0%", left: "30%", size: 88, rotate: -18, opacity: 0.95, delay: "0.4s" },
  { top: "0%", right: "30%", size: 74, rotate: 8, opacity: 0.85, delay: "0.8s" },
  { top: "8%", right: "10%", size: 82, rotate: 20, opacity: 0.9, delay: "1.2s" },
  { top: "30%", left: "2%", size: 78, rotate: 15, opacity: 0.85, delay: "1.6s" },
  { top: "48%", left: "0%", size: 82, rotate: 10, opacity: 0.85, delay: "0.2s" },
  { top: "30%", right: "2%", size: 80, rotate: -8, opacity: 0.9, delay: "0.6s" },
  { top: "48%", right: "0%", size: 88, rotate: -12, opacity: 0.95, delay: "1.0s" },
  { bottom: "6%", left: "12%", size: 84, rotate: 30, opacity: 0.9, delay: "1.4s" },
  { bottom: "0%", left: "40%", size: 68, rotate: -22, opacity: 0.85, delay: "1.8s" },
  { bottom: "6%", right: "14%", size: 78, rotate: -25, opacity: 0.85, delay: "0.5s" },
];

export default function HomeSec9_5({ data }) {
  return (
    <section className="relative overflow-hidden bg-[#f3f6fb] px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-hero-blue/12 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-10 h-64 w-64 rounded-full bg-bmw-red/8 blur-3xl" />
      <div
        className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-6 [grid-template-areas:'title'_'image'_'text'] lg:grid-cols-2 lg:gap-8 lg:[grid-template-areas:'title_image'_'text_image']"
      >
        <div className="[grid-area:title]">
          <p className="text-xs font-semibold uppercase tracking-widest text-hero-blue">{data.eyebrow}</p>
          <h2 className="-skew-x-6 origin-left scale-y-115 scale-x-92 mt-2 text-4xl font-extrabold uppercase leading-[1.05] tracking-tighter text-[#101828] sm:text-5xl">
            <span className="block">Built With</span>
            <span className="block">Better Parts</span>
          </h2>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-lg [grid-area:image]">
          {/* ambient cyan glow behind the core */}
          <div className="absolute inset-8 rounded-full bg-hero-blue/15 blur-3xl" />

          {FLOATERS.map((f, i) => (
            <div
              key={i}
              className="animate-float absolute drop-shadow-[0_8px_16px_rgba(16,24,40,0.18)]"
              style={{
                top: f.top,
                left: f.left,
                right: f.right,
                bottom: f.bottom,
                width: f.size,
                height: f.size,
                opacity: f.opacity,
                animationDelay: f.delay,
              }}
            >
              <div className="relative h-full w-full" style={{ transform: `rotate(${f.rotate}deg)` }}>
                <Image src={data.partImage} alt="Engine component" fill className="object-contain" sizes="150px" />
              </div>
            </div>
          ))}

          <div className="animate-float-core absolute inset-[14%] z-10">
            <Image src={data.engineImage} alt="BMW engine core" fill className="object-contain" sizes="600px" priority={false} />
          </div>
        </div>

        <div className="[grid-area:text]">
          <p className="max-w-md text-sm text-[#101828]">{data.description}</p>

          <ul className="mt-5 divide-y divide-black/5">
            {data.parts.map((p) => (
              <li key={p.name} className="flex items-center gap-4 py-3">
                <Icon name={p.icon} className="h-12 w-12 shrink-0 text-hero-blue" />
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-hero-blue">{p.name}</p>
                  <p className="mt-1 text-sm text-[#101828]">{p.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="glass-card mx-auto mt-8 grid max-w-6xl grid-cols-2 gap-x-2 gap-y-5 rounded-xl px-4 py-5 sm:grid-cols-4 sm:divide-x sm:divide-black/20 sm:px-6">
        {data.highlights.map((h, i) => (
          <div key={h.suffix} className="relative flex items-center justify-center gap-3 px-2">
            {i % 2 === 1 && (
              <span className="absolute -left-2 top-1/2 h-3/4 w-px -translate-y-1/2 bg-black/20 sm:hidden" />
            )}
            <Icon name={h.icon} className="h-9 w-9 shrink-0 text-hero-blue" />
            <p className="text-sm leading-snug">
              <span className="block font-extrabold text-[#101828]">{h.prefix}</span>
              <span className="block text-[#101828]">{h.suffix}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <span className="h-px w-16 bg-black/15" />
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-[#101828]">{data.footer}</p>
        <span className="h-px w-16 bg-black/15" />
      </div>
      <div className="mt-4 flex items-center justify-center gap-3">
        <span className="h-px w-8 bg-black/15" />
        <BMWStripe size="lg" />
        <span className="h-px w-8 bg-black/15" />
      </div>
    </section>
  );
}
