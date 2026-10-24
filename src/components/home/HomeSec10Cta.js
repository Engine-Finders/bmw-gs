import Image from "next/image";
import RegLookupForm from "@/components/reusable/RegLookupForm";

export default function HomeSec10Cta({ data }) {
  return (
    <section className="text-white">
      {/* ===== mobile ===== */}
      <div className="relative w-full overflow-hidden md:hidden" style={{ aspectRatio: "2510 / 1850" }}>
        <Image src="/home/sec10_mobile2.jpg" alt="Black BMW at dusk" fill className="object-cover" sizes="100vw" />

        <div className="absolute inset-0 flex flex-col items-center px-5 pt-5 text-center">
          <h3 className="text-lg font-extrabold text-white">{data.ctaHeading}</h3>
          <p className="mt-1 max-w-[85%] text-[10px] leading-snug text-white">{data.ctaBody}</p>

          <div className="mt-3 w-full">
            <RegLookupForm buttonLabel={data.ctaButton} row compact compactButton />
            <p className="mt-2 flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-wide text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {data.apiNote}
            </p>
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden overflow-hidden md:block" style={{ backgroundColor: "#000f18" }}>
        <div className="absolute inset-0">
          <Image src={data.bgImage2} alt="" fill className="object-cover object-left" sizes="100vw" />
        </div>

        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-5 px-4 py-8 text-center sm:px-6 lg:flex-row lg:items-center lg:justify-start lg:gap-12 lg:px-8 lg:py-8 lg:text-left">
          <div className="lg:max-w-[28%]">
            <h3 className="text-xl font-extrabold sm:text-2xl">{data.ctaHeading}</h3>
            <p className="mt-1 text-xs text-white sm:text-sm">{data.ctaBody}</p>
          </div>

          <div>
            <RegLookupForm buttonLabel={data.ctaButton} compact whiteBorder matchHeight />
            <p className="mt-3 flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {data.apiNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
