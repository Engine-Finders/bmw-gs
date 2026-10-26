import Image from "next/image";
import PhotoStripes from "@/components/reusable/PhotoStripes";

export default function ModelSec14({ data }) {
  const line1Words = data.line1.split(" ");
  const mobileLine1a = line1Words.slice(0, 3).join(" ");
  const mobileLine1b = line1Words.slice(3).join(" ");
  const [line2Word1, ...line2WordsRest] = data.line2Highlight.split(" ");
  const mobileLine2Rest = `${line2WordsRest.join(" ")}${data.line2Rest}`;

  return (
    <section className="relative overflow-hidden bg-hero-dark text-white">
      {/* ===== mobile ===== */}
      <div className="relative md:hidden">
        <div className="relative h-44">
          <div className="absolute inset-0">
            <Image src={data.imageMobile} alt="Racked BMW replacement engines in storage" fill className="object-cover object-[100%_70%]" sizes="100vw" />
            <div className="absolute inset-0 bg-linear-to-r from-hero-dark/90 via-hero-dark/40 to-transparent" />
          </div>

          <div className="relative max-w-[68%] px-4 py-5">
            <h2 className="hp-h2 uppercase">
              <span className="block text-white">{mobileLine1a}</span>
              <span className="block text-white">{mobileLine1b}</span>
              <span className="block text-hero-blue">{line2Word1}</span>
              <span className="block text-white">{mobileLine2Rest}</span>
            </h2>
          </div>
        </div>

        <div className="relative max-w-[85%] px-4 pb-10">
          <p className="text-sm leading-relaxed text-white">{data.paragraph}</p>

          <p className="mt-4 text-sm text-white">
            <span className="font-bold">{data.calloutBold}</span>
            <span className="text-white">{data.calloutRest}</span>
          </p>

          <a
            href={data.cta.href}
            className="mt-5 inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-white/30 px-5 py-3.5 text-xs font-bold uppercase tracking-wide text-white transition duration-200 hover:-translate-y-0.5 hover:brightness-110"
            style={{
              background: "linear-gradient(135deg, #0052cc 0%, #0037a5 100%)",
              boxShadow: "0 8px 20px rgba(0,82,204,0.4)",
            }}
          >
            {data.cta.label} <span aria-hidden>→</span>
          </a>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-12 sm:px-6 md:block lg:px-8">
      <div className="absolute inset-0">
        <Image src={data.image} alt="Racked BMW replacement engines in storage" fill className="object-cover" sizes="100vw" />
        <PhotoStripes preset="used-engines" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-[46%]">
          <div role="heading" aria-level="2" className="hp-h2 uppercase">
            <span className="block text-white">{data.line1}</span>
            <span className="block">
              <span className="text-hero-blue">{data.line2Highlight}</span>
              <span className="text-white">{data.line2Rest}</span>
            </span>
          </div>

          <p className="body-text mt-4 text-white">{data.paragraph}</p>

          <p className="body-text mt-4 text-white">
            <span className="font-bold">{data.calloutBold}</span>
            <span className="text-white">{data.calloutRest}</span>
          </p>

          <a
            href={data.cta.href}
            className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/30 px-8 py-4 text-base font-bold uppercase tracking-wide text-white transition duration-200 hover:-translate-y-0.5 hover:brightness-110"
            style={{
              background: "linear-gradient(135deg, #0052cc 0%, #0037a5 100%)",
              boxShadow: "0 8px 20px rgba(0,82,204,0.4)",
            }}
          >
            {data.cta.label} <span aria-hidden>→</span>
          </a>
        </div>
      </div>
      </div>
    </section>
  );
}
