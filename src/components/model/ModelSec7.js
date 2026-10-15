import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import BMWStripe from "@/components/reusable/BMWStripe";

export default function ModelSec7({ data }) {
  return (
    <section className="relative overflow-hidden bg-[#f3f6fb]">
      {/* ===== mobile ===== */}
      <div className="relative px-4 py-10 md:hidden">
        <div className="flex items-center gap-3">
          <BMWStripe className="h-4 w-8" />
          <h2 className="hp-h2 uppercase">
            <span className="text-[#101828]">Our </span>
            <span className="text-hero-blue">Workshop</span>
          </h2>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {data.cards.map((c) => (
            <div key={c.number} className="overflow-hidden rounded-md bg-white shadow-sm">
              <div className="relative aspect-[4/3]">
                <Image src={c.image} alt={c.title} fill className="object-cover" sizes="50vw" />
                <span className="absolute left-2 top-2 rounded-md bg-hero-blue px-2 py-1 text-[10px] font-extrabold text-white">
                  {c.number}
                </span>
              </div>
              <div className="flex min-h-14 items-center justify-center px-2 py-2" style={{ background: "rgba(5,12,28,0.9)" }}>
                <p className="text-center text-[9px] font-extrabold uppercase leading-tight tracking-wide text-white">{c.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex justify-center">
          <button className="flex items-center gap-2 rounded-lg border-2 border-hero-blue bg-white/70 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-hero-blue backdrop-blur-md transition hover:bg-hero-blue hover:text-white">
            {data.viewMoreLabel} <span aria-hidden>→</span>
          </button>
        </div>

        <div className="relative mt-5 flex items-center gap-3 overflow-hidden rounded-xl border border-black/10 bg-white/60 px-4 py-3.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-hero-blue text-white">
            <Icon name="camera" className="h-4 w-4" />
          </span>
          <p className="relative z-10 text-xs text-[#101828]">{data.footerNote}</p>

          <div
            className="pointer-events-none absolute bottom-0 right-0 z-0 flex gap-1"
            style={{ height: "40px", transform: "skewX(-25deg)", transformOrigin: "bottom right" }}
            aria-hidden="true"
          >
            <span className="h-full w-3" style={{ background: "var(--color-bmw-blue)" }} />
            <span className="h-full w-3" style={{ background: "var(--color-bmw-violet)" }} />
            <span className="h-full w-3" style={{ background: "var(--color-bmw-red)" }} />
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-10 sm:px-6 md:block lg:px-8">
      <div className="relative mx-auto max-w-6xl">
        <div className="flex items-center gap-4">
          <BMWStripe className="h-6 w-11" />
          <h2 className="hp-h2 uppercase">
            <span className="text-[#101828]">Our </span>
            <span className="text-hero-blue">Workshop</span>
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-5 gap-4">
          {data.cards.map((c) => (
            <div key={c.number} className="overflow-hidden rounded-xl bg-white shadow-sm">
              <div className="relative aspect-square">
                <Image src={c.image} alt={c.title} fill className="object-cover" sizes="20vw" />
                <span className="absolute bottom-0 left-0 rounded-tr-md bg-hero-blue px-2.5 py-1 text-xs font-extrabold text-white">
                  {c.number}
                </span>
              </div>
              <div className="bg-[#101828] px-2 py-2">
                <p className="text-center text-[10px] font-extrabold uppercase leading-tight tracking-wide text-white">
                  {c.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button className="flex items-center gap-2 rounded-md border-2 border-hero-blue bg-white/70 px-6 py-2.5 text-xs font-bold uppercase tracking-wide text-hero-blue backdrop-blur-md transition hover:bg-hero-blue hover:text-white">
            {data.viewMoreLabel} <span aria-hidden>→</span>
          </button>
        </div>

        <div className="relative mt-6 flex items-center justify-between overflow-hidden border-t border-black/10 pt-5">
          <div className="flex items-center gap-2">
            <Icon name="camera" className="h-5 w-5 shrink-0 text-[#101828]" />
            <p className="text-xs text-[#101828]">{data.footerNote}</p>
          </div>
          <div
            className="pointer-events-none absolute bottom-0 right-0 z-10 flex gap-1.5"
            style={{ height: "50px", transform: "skewX(-25deg)", transformOrigin: "bottom right" }}
            aria-hidden="true"
          >
            <span className="h-full w-3.5" style={{ background: "var(--color-bmw-blue)" }} />
            <span className="h-full w-3.5" style={{ background: "var(--color-bmw-violet)" }} />
            <span className="h-full w-3.5" style={{ background: "var(--color-bmw-red)" }} />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
