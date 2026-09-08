import Image from "next/image";
import BMWStripe from "@/components/reusable/BMWStripe";
import RegLookupForm from "@/components/reusable/RegLookupForm";

export default function HomeSec12({ data }) {
  const [kicker, headline] = data.h2.split("|");
  const headlineWords = headline.split(" ");
  const hl1 = headlineWords.slice(0, 2).join(" ");
  const hl2 = headlineWords.slice(2).join(" ");

  return (
    <section className="relative overflow-hidden bg-hero-dark text-white">
      {/* ===== mobile ===== */}
      <div className="relative flex md:hidden">
        {/* left: all text content, on the solid dark background */}
        <div className="min-w-0 flex-1 px-4 py-5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white">{kicker}</p>

          <h2 className="-skew-x-6 origin-left scale-y-115 scale-x-92 mt-1 text-3xl font-extrabold uppercase leading-[1.05] tracking-tighter">
            <span className="block text-white">{hl1}</span>
            <span className="block text-hero-blue">{hl2}</span>
          </h2>

          <p className="mt-2 text-[11px] leading-snug text-gray-300">
            {data.descriptionPre}
            <span className="font-bold text-hero-blue">{data.descriptionEmphasis}</span>
            {data.descriptionPost}
          </p>

          <div className="mt-3">
            <RegLookupForm buttonLabel={data.ctaButton} stacked compact />
          </div>

          <p className="mt-2.5 flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {data.note}
          </p>
        </div>

        {/* right: the car, cropped to a dedicated car-only asset so it's never squeezed or mispositioned by text length */}
        <div className="relative w-[42%] shrink-0 overflow-hidden">
          <Image src="/home/sec12_mobile_car.webp" alt="BMW M4 driving through London at night" fill className="object-cover" sizes="48vw" />
          {/* soft dark tint so the photo's brighter tones sit closer to the panel's dark palette */}
          <div className="absolute inset-0 bg-hero-dark/25" />
          {/* wide graduated fade into the left text panel — no hard seam */}
          <div className="absolute inset-y-0 left-0 w-2/5 bg-linear-to-r from-hero-dark via-hero-dark/70 to-transparent" />
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden overflow-hidden md:block">
        <div className="absolute inset-0">
          <Image src={data.bgImage} alt="BMW driving through London at night" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-linear-to-r from-hero-dark via-hero-dark/70 to-transparent" />
        </div>

        <BMWStripe size="lg" className="absolute bottom-6 right-6 z-10" />

        <div className="relative mx-auto max-w-6xl px-4 py-9 sm:px-6 lg:px-8">
          <h2 className="-skew-x-6 origin-left scale-y-115 scale-x-92 max-w-lg text-4xl font-extrabold uppercase leading-tight tracking-tighter sm:text-5xl">
            <span className="block text-white">{kicker}</span>
            <span className="block text-hero-blue">{headline}</span>
          </h2>

          <p className="mt-3 max-w-md text-sm text-gray-300">
            {data.descriptionPre}
            <span className="font-bold text-white">{data.descriptionEmphasis}</span>
            {data.descriptionPost}
          </p>

          <div className="mt-6 max-w-md">
            <RegLookupForm buttonLabel={data.ctaButton} compact />
          </div>

          <p className="mt-4 flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {data.note}
          </p>
        </div>
      </div>
    </section>
  );
}
