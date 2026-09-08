import Image from "next/image";
import Icon from "@/components/reusable/Icon";

export default function ModelSec2({ data }) {
  const [line1, line2] = data.h2.split("|");

  const allCards = [
    { icon: data.callout.icon, title: data.callout.title, body: data.callout.body },
    ...data.features,
  ];

  return (
    <section className="relative overflow-hidden bg-[#f3f6fb]">
      {/* ===== mobile ===== */}
      <div className="relative md:hidden">
        <div className="relative px-4 pb-0 pt-8">
          <div className="flex items-center gap-2">
            <Icon name="warning" className="h-4 w-4 shrink-0 text-red-500" />
            <p className="text-xs font-bold uppercase tracking-widest text-[#101828]">{data.kicker}</p>
          </div>

          <h2 className="origin-left scale-y-110 scale-x-90 mt-2 text-[1.6rem] font-extrabold uppercase leading-[1.05] tracking-tighter">
            <span className="block text-[#101828]">{line1}</span>
            <span className="block text-hero-blue">{line2}</span>
          </h2>

          <p className="mt-3 text-sm text-[#101828]">{data.description}</p>
          <p className="mt-1 text-sm font-bold text-[#101828]">{data.descriptionEmphasis}</p>
        </div>

        {/* full-bleed diagonal-cut workshop photo */}
        <div className="relative mt-2 h-56 w-full overflow-hidden">
          <div className="absolute inset-0" style={{ clipPath: "polygon(0 10%, 100% -14%, 100% 100%, 0% 100%)" }}>
            <Image src={data.image} alt="BMW N47/B47 timing chain assembly" fill className="object-cover object-right" sizes="100vw" />
          </div>
          <div
            className="pointer-events-none absolute inset-0"
            style={{ boxShadow: "inset 0 0 32px 18px #f3f6fb, inset 0 -20px 24px -4px #f3f6fb" }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute left-0 right-0"
            style={{
              top: "5%",
              height: "3px",
              background: "linear-gradient(90deg, var(--color-bmw-blue), var(--color-bmw-violet) 55%, var(--color-bmw-red))",
              transform: "rotate(-8deg) scaleX(1.02)",
              transformOrigin: "left center",
              boxShadow: "0 0 8px rgba(0,138,201,0.55)",
            }}
            aria-hidden="true"
          />
        </div>

        <div className="relative z-10 -mt-28 px-4 pb-10">
          {/* stacked feature cards */}
          <div className="relative space-y-3">
            {allCards.map((c, i) => (
              <div
                key={c.title}
                className="card-glare-light relative flex items-center gap-3 rounded-2xl border border-white/70 bg-white/75 p-4 backdrop-blur-xl"
              >
                <Icon name={c.icon} className={`shrink-0 text-hero-blue ${i === 0 ? "h-9 w-9" : "h-8 w-8"}`} />
                <div className="min-w-0">
                  <p className={`whitespace-nowrap font-extrabold uppercase text-[#101828] ${i === 0 ? "text-sm" : "text-xs"}`}>{c.title}</p>
                  <p className={`mt-0.5 leading-snug text-[#101828] ${i === 0 ? "text-xs" : "text-[11px]"}`}>{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="hidden px-4 py-10 sm:px-6 md:block lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="relative">
          <div className="relative h-76 w-full overflow-hidden rounded-2xl lg:h-84">
            <Image src={data.image} alt="BMW N47/B47 timing chain assembly" fill className="object-cover" sizes="1152px" />

            <div className="absolute inset-0 flex flex-col justify-start px-8 pt-6 lg:px-10 lg:pt-8">
              <div className="max-w-[44%]">
                <div className="flex items-center gap-2">
                  <Icon name="warning" className="h-4 w-4 shrink-0 text-red-500" />
                  <p className="text-xs font-bold uppercase tracking-widest text-[#101828]">{data.kicker}</p>
                </div>

                <h2 className="origin-left scale-y-110 scale-x-90 mt-3 text-4xl font-extrabold uppercase leading-[1.05] tracking-tighter lg:text-5xl">
                  <span className="block text-[#101828]">{line1}</span>
                  <span className="block text-hero-blue">{line2}</span>
                </h2>

                <p className="mt-4 text-sm text-[#101828] lg:text-base">
                  {data.description} <span className="font-bold text-[#101828]">{data.descriptionEmphasis}</span>
                </p>
              </div>
            </div>

            {/* floating callout card */}
            <div className="card-glare-light absolute bottom-5 right-6 max-w-xs rounded-xl border border-white/60 bg-white/90 p-5 backdrop-blur-md lg:bottom-6 lg:right-10 lg:max-w-sm lg:p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-hero-blue/10">
                  <Icon name={data.callout.icon} className="h-8 w-8 text-hero-blue" />
                </span>
                <div className="min-w-0">
                  <p className="text-base font-extrabold uppercase tracking-wide text-[#101828]">{data.callout.title}</p>
                  <p className="mt-2 text-base leading-relaxed text-[#101828]">{data.callout.body}</p>
                </div>
              </div>
            </div>
          </div>

          {/* feature bar — same card, same bg as the image panel above */}
          <div className="card-glare-light relative z-10 mt-0 flex items-stretch justify-between rounded-2xl border-t border-black/5 bg-white px-6 py-5">
            {data.features.map((f, i) => (
              <div key={f.title} className="relative flex flex-1 items-center gap-3 px-4">
                {i > 0 && <span className="absolute left-0 top-1/2 h-3/4 w-px -translate-y-1/2 bg-black/10" />}
                <Icon name={f.icon} className="h-9 w-9 shrink-0 text-hero-blue" />
                <div className="min-w-0">
                  <p className="text-sm font-extrabold uppercase tracking-wide text-[#101828]">{f.title}</p>
                  <p className="mt-0.5 text-xs leading-snug text-[#101828]">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
