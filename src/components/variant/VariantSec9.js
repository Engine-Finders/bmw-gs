import Image from "next/image";

export default function VariantSec9({ data }) {
  return (
    <section className="relative overflow-hidden bg-hero-dark text-white">
      {/* ===== mobile ===== */}
      <div className="relative md:hidden">
        <div className="absolute inset-x-0 top-0 aspect-[642/253]">
          <Image src={data.imageMobile} alt="BMW engines on workshop pallets" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-hero-dark" />
        </div>

        <div className="relative px-4 pb-6 pt-6">
          <div className="max-w-[88%]">
            <h2 className="hp-h2 uppercase">
              <span className="block text-white">{data.headlinePre}</span>
              <span className="block whitespace-nowrap text-hero-blue">{data.headlineHighlight}</span>
              <span className="block text-white">{data.headlinePost}</span>
            </h2>

            <p className="mt-2.5 text-xs leading-snug text-white">{data.body}</p>
            <p className="mt-1.5 text-xs font-semibold text-white">{data.prompt}</p>
          </div>

          <a
            href={data.cta.href}
            className="mt-3.5 flex w-fit items-center gap-2 rounded-lg bg-linear-to-br from-hero-blue to-hero-blue-dark px-5 py-3 text-xs font-bold uppercase text-white shadow-lg transition-transform hover:scale-[1.02]"
            style={{ border: "1px solid rgba(90,170,255,0.45)" }}
          >
            {data.cta.label} <span aria-hidden>→</span>
          </a>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden overflow-hidden md:block">
        <div className="absolute inset-0">
          <Image
            src={data.image}
            alt="BMW engines on workshop pallets"
            fill
            className="-scale-x-100 object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to left, #070b14 0%, #070b14 48%, rgba(7,11,20,0.9) 60%, transparent 75%)" }}
          />
        </div>

        <div className="relative mx-auto flex max-w-6xl justify-end px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="max-w-2xl">
            <h2 className="hp-h2 uppercase">
              <span className="block whitespace-nowrap text-white">{data.headlinePre}</span>
              <span className="block text-hero-blue">
                {data.headlineHighlight} <span className="text-white">{data.headlinePost}</span>
              </span>
            </h2>

            <p className="mt-4 w-full text-sm text-white lg:text-base">{data.body}</p>
            <p className="mt-2 text-sm font-semibold text-white">{data.prompt}</p>

            <a
              href={data.cta.href}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-linear-to-br from-hero-blue to-hero-blue-dark px-7 py-3.5 text-sm font-bold uppercase text-white shadow-lg transition-transform hover:scale-[1.02]"
              style={{ border: "1px solid rgba(90,170,255,0.45)" }}
            >
              {data.cta.label} <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
