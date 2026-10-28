import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import BMWStripe from "@/components/reusable/BMWStripe";

// The photo's baked-in diagonal stripes are covered and redrawn here; coordinates are in photo pixels (1365x768)
// and "slice" crops like object-cover, so it can be layered on the photo at any size or zoom.
function ChooseUsStripes({ id }) {
  return (
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1365 768" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-cover`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#0a1a34" />
            <stop offset="0.55" stopColor="#050d1c" />
            <stop offset="1" stopColor="#02060f" />
          </linearGradient>
        </defs>
        <polygon points="700,0 884,0 584,768 440,768" fill={`url(#${id}-cover)`} />
        <polygon points="756,0 776,0 524,768 504,768" fill="#1f56e6" />
        <polygon points="765,0 768,0 515,768 512,768" fill="#9fd0ff" />
        <polygon points="820,0 848,0 574,768 546,768" fill="#ee1c2e" />
      </svg>
  );
}

export default function ModelSec11({ data }) {
  const [line1, line2] = data.h2.split("|");

  return (
    <section className="relative overflow-hidden bg-hero-dark text-white">
      {/* ===== mobile ===== */}
      <div className="relative bg-hero-dark md:hidden">
        <div className="relative px-4 pb-4 pt-10">
          <BMWStripe className="h-3 w-6" />
          <h2 className="hp-h2 mt-2 uppercase">
            <span className="block text-white">{line1}</span>
            <span className="block text-hero-blue">{line2}</span>
          </h2>
          <span className="mt-3 block h-px w-16 bg-hero-blue/50" />
        </div>

        {/* 16:9: the desktop photo is already 16:9, so it is shown whole instead of a tall portrait crop; the stripe
            overlay shares the zoom so it stays on the picture, and the edges fade into the dark panel */}
        <div className="relative aspect-video w-full overflow-hidden">
          <div className="absolute inset-0" style={{ transform: "scale(1.2)", transformOrigin: "85% 20%" }}>
            <Image src={data.image} alt="BMW technician rebuilding an engine block" fill className="object-cover" sizes="100vw" />
            <ChooseUsStripes id="s11m" />
          </div>
          <div className="absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-hero-dark to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-hero-dark to-transparent" />
        </div>

        <div className="border-t border-white/10 pb-8">
          {data.checklist.map((item, i) => (
            <div key={item} className={`flex items-center gap-3 px-4 py-4 ${i % 2 ? "bg-white/[0.09]" : "bg-white/[0.03]"}`}>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-hero-blue/70 shadow-[0_0_12px_-1px_rgba(0,127,248,0.8)]">
                <Icon name="check" className="h-4 w-4 text-white" />
              </span>
              <p className="text-sm text-white">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-6 sm:px-6 md:block lg:px-8">
      <div className="absolute inset-0">
        <Image src={data.image} alt="BMW technician rebuilding an engine block" fill className="object-cover" sizes="100vw" />
        <ChooseUsStripes id="s11d" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-[46%]">
          <div className="flex items-center gap-4">
            <BMWStripe className="h-6 w-11 shrink-0" />
            <div role="heading" aria-level="2" className="hp-h2 uppercase">
              <span className="block text-white">{line1}</span>
            </div>
          </div>
          <div role="heading" aria-level="2" className="hp-h2 uppercase">
            <span className="block text-hero-blue">{line2}</span>
          </div>

          <div className="mt-3 w-fit divide-y divide-white/10">
            {data.checklist.map((item) => (
              <div key={item} className="flex items-center gap-3 py-2.5 pr-8">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-hero-blue/60 bg-hero-blue/10 shadow-[0_0_10px_-2px_rgba(0,127,248,0.7)]">
                  <Icon name="check" className="h-4 w-4 text-hero-blue" />
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
