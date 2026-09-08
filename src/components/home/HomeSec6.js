import Image from "next/image";
import BMWStripe from "@/components/reusable/BMWStripe";

const TILE_FADE =
  "radial-gradient(60% 90% at 0% 0%, white 0%, transparent 55%), radial-gradient(60% 90% at 100% 0%, white 0%, transparent 55%), radial-gradient(60% 90% at 0% 100%, white 0%, transparent 55%), radial-gradient(60% 90% at 100% 100%, white 0%, transparent 55%)";

export default function HomeSec6({ data }) {
  const portraitTrack = [...data.portrait, ...data.portrait];
  const landscapeTrack = [...data.landscape, ...data.landscape];

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div
        className="relative mx-auto max-w-6xl rounded-2xl border border-white bg-white px-4 py-6 sm:px-6 sm:py-8"
        style={{ boxShadow: "0 0 60px -8px rgba(255,255,255,0.9), 0 0 20px rgba(0,0,0,0.06)" }}
      >
        <div className="text-center">
          <BMWStripe size="wide" className="mx-auto mb-4" />
          <h2 className="origin-left scale-y-115 scale-x-92 text-3xl font-extrabold tracking-tighter text-[#101828] sm:text-4xl">{data.h2}</h2>
        </div>

        {/* portrait row — infinite scroll right */}
        <div className="mt-6 overflow-hidden">
          <div className="animate-marquee-right flex w-max gap-1.5">
            {portraitTrack.map((img, i) => (
              <div key={i} className="relative h-56 w-40 shrink-0 overflow-hidden rounded-xl sm:h-64 sm:w-44">
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="200px" />
                <div className="pointer-events-none absolute inset-0" style={{ background: TILE_FADE }} />
              </div>
            ))}
          </div>
        </div>

        {/* landscape row — infinite scroll left */}
        <div className="mt-2 overflow-hidden">
          <div className="animate-marquee-left flex w-max gap-1.5">
            {landscapeTrack.map((img, i) => (
              <div key={i} className="relative h-40 w-64 shrink-0 overflow-hidden rounded-xl sm:h-48 sm:w-80">
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="360px" />
                <div className="pointer-events-none absolute inset-0" style={{ background: TILE_FADE }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
