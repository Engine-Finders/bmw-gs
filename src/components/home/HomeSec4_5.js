import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import BMWStripe from "@/components/reusable/BMWStripe";
import WheelSpinFrames from "@/components/home/WheelSpinFrames";

export default function HomeSec4_5({ data }) {
  const [line1, line2] = data.h2.split("|");

  return (
    <section
      className="relative overflow-hidden bg-hero-dark text-white"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 84%, 52% 100%, 0 84%)" }}
    >
      {/* ===== mobile ===== */}
      <div className="relative w-full aspect-900/1613 md:hidden">
        {/* full uncropped photo — aspect matches the source exactly, so object-cover crops nothing */}
        <Image src={data.mobileImage} alt="BMW M3 driving past Big Ben at night" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-hero-dark to-transparent" />

        {/* content overlaid on the image: text lands in its dark upper zone, footer at the bottom */}
        <div className="absolute inset-0 flex flex-col px-4 pt-4 pb-4">
          <div className="flex items-center gap-2">
            <BMWStripe />
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white">{data.eyebrow}</p>
          </div>
          <p className="mt-1.5 text-center text-[10px] italic uppercase tracking-wide text-white">{data.kicker}</p>

          <h2 className="hp-h2 mt-2 text-center uppercase">
            <span className="block text-white">{line1}</span>
            <span className="block text-hero-blue">{line2}</span>
          </h2>
          <p className="-skew-x-6 mt-1 text-center text-lg font-bold uppercase text-white">{data.subhead1}</p>
          <p className="-skew-x-6 text-center text-[10px] italic font-semibold uppercase tracking-wide text-white">
            {data.subhead2}
          </p>

          <div className="mt-2 space-y-0.5 text-xs text-gray-300">
            {data.body.map((line, i) => (
              <p key={i} className={i === 2 ? "font-bold text-white" : ""}>
                {line}
              </p>
            ))}
          </div>

          <div className="mt-2.5 flex items-stretch justify-center gap-4">
            {data.features.map((f, i) => (
              <div key={f.label} className="flex items-center gap-2">
                {i > 0 && <span className="mr-2 h-7 w-px shrink-0 bg-white/20" />}
                <div className="flex w-16 flex-col items-center gap-1 text-center">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-hero-blue">
                    <Icon name={f.icon} className="h-5 w-5 text-hero-blue" />
                  </span>
                  <span className="text-[10px] font-semibold uppercase leading-tight">{f.label}</span>
                </div>
              </div>
            ))}
          </div>

          <a
            href={data.cta.href}
            className="mx-auto mt-3 block w-1/2 rounded-sm border-2 border-hero-blue bg-hero-blue py-2.5 text-center text-sm font-bold uppercase text-white shadow-[0_0_20px_rgba(0,127,248,0.4)] transition-colors hover:bg-transparent hover:text-hero-blue"
          >
            {data.cta.label} →
          </a>

          {/* spacer pushes the footer down to sit over the bottom of the car photo */}
          <div className="flex-1" />

          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-white/25" />
              <p className="text-[10px] uppercase tracking-widest text-white">{data.footer}</p>
              <span className="h-px w-10 bg-white/25" />
            </div>
            <BMWStripe size="lg" className="mt-3" />
          </div>
          <div className="h-6 shrink-0" />
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden md:block">
        <div className="absolute inset-0">
          <Image src={data.bgImage} alt="London street at dusk" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-hero-dark/55" />
          <div className="absolute inset-0 bg-linear-to-t from-hero-dark via-transparent to-hero-dark/30" />
        </div>

        {/* top row */}
        <div className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 pt-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <BMWStripe />
            <p className="text-xs font-semibold uppercase tracking-widest text-white">{data.eyebrow}</p>
          </div>
          <p className="text-[11px] uppercase tracking-wide text-white">{data.kicker}</p>
        </div>

        {/* car (left, grounded) + headline stack (right) */}
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-end gap-3 px-4 pt-6 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-6 lg:px-8">
          <div className="relative -mb-4 h-56 sm:h-72 lg:mb-0 lg:h-105">
            {/* looping drift footage as a ping-pong WebP frame sequence — background removed,
                replacing the static cutout so the wheels spin and smoke billows continuously.
                WebP alpha (not video-codec alpha) is used since WebM/VP9 transparency proved
                unreliable across browsers; per-pixel PNG/WebP alpha is universally supported. */}
            <WheelSpinFrames className="absolute inset-0 h-full w-full object-contain object-bottom" />
          </div>

          <div className="relative pb-8 lg:pb-12">
            <h2 className="hp-h2 uppercase">
              <span className="block text-white">{line1}</span>
              <span className="block text-hero-blue">{line2}</span>
            </h2>
            <p className="mt-3 text-xl font-bold uppercase text-white sm:text-2xl">{data.subhead1}</p>
            <p className="text-xs font-semibold uppercase tracking-wide text-white">{data.subhead2}</p>

            <div className="mt-4 max-w-xs space-y-1 text-sm text-white">
              {data.body.map((line, i) => (
                <p key={i} className={i === 2 ? "font-semibold text-white" : ""}>
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-5">
              {data.features.map((f, i) => (
                <div
                  key={f.label}
                  className={`flex items-center gap-2 ${i > 0 ? "border-l border-white/20 pl-5" : ""}`}
                >
                  <Icon name={f.icon} className="h-8 w-8 shrink-0 text-hero-blue" />
                  <span className={`${i === 0 ? "w-14" : "w-20"} text-xs font-semibold leading-snug sm:text-sm`}>{f.label}</span>
                </div>
              ))}
            </div>

            <a
              href={data.cta.href}
              className="mt-6 inline-block rounded-sm border-2 border-hero-blue bg-hero-blue px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-transparent hover:text-hero-blue"
            >
              {data.cta.label} →
            </a>
          </div>
        </div>

        {/* footer tagline */}
        <div className="relative mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-white/25" />
            <p className="text-xs uppercase tracking-widest text-white">{data.footer}</p>
            <span className="h-px w-16 bg-white/25" />
          </div>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-white/25" />
            <BMWStripe size="lg" />
            <span className="h-px w-8 bg-white/25" />
          </div>
        </div>
      </div>
    </section>
  );
}
