import Image from "next/image";
import BMWStripe from "@/components/reusable/BMWStripe";
import RegLookupForm from "@/components/reusable/RegLookupForm";
import GlassPanel from "@/components/reusable/GlassPanel";

export default function HomeSec1({ hero, lookup }) {
  const [line1, line2, line3] = hero.h1.split("|");

  return (
    <section id="find-my-bmw" className="relative z-10 bg-hero-dark text-white">
      {/* ===== mobile ===== */}
      <div className="md:hidden">
        {/* content flows normally so the hero's real height tracks whatever the text/box actually
            need on this device — no reserved overlap padding, no scroll past fold. */}
        <div className="relative w-full">
          <div className="absolute inset-0 overflow-hidden">
            <Image src={hero.mobileImage} alt="BMW engine rebuild workshop" fill priority className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-linear-to-b from-hero-dark/75 via-hero-dark/15 to-hero-dark" />
            <div className="absolute inset-0 bg-linear-to-r from-hero-dark/60 via-transparent to-transparent" />
            {/* extra dark patch directly behind the text block for legibility */}
            <div className="absolute inset-x-0 top-0 h-2/3 bg-linear-to-b from-black/70 via-black/35 to-transparent" />
          </div>

          <div className="relative flex flex-col px-4 pt-6 pb-40">
            <div className="max-w-[62%]">
              <h1 className="hp-h1 uppercase">
                <span className="block text-white">{line1}</span>
                <span className="block text-hero-blue">{line2}</span>
                <span className="block text-white">{line3}</span>
              </h1>
              <p className="mt-3 text-sm text-gray-300">{hero.subhead}</p>
            </div>

            <div className="absolute inset-x-4 bottom-0 z-10 translate-y-1/2">
              <GlassPanel className="w-full">
                <RegLookupForm
                  buttonLabel={lookup.buttonLabel}
                  compact
                  tight
                  left={
                    <div className="shrink-0">
                      <h2 className="hp-h3 italic flex items-start justify-center gap-2 uppercase text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                        <span className="flex h-[1.1em] shrink-0 items-center">
                          <BMWStripe size="em" />
                        </span>
                        {lookup.h2}
                      </h2>
                      <p className="mx-auto mt-1.5 max-w-xs text-sm text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">{lookup.description}</p>
                    </div>
                  }
                />
              </GlassPanel>
            </div>
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="hidden md:block">
        {/* hero visual: sized by the h1/subhead/CTA content; deliberately NOT overflow-hidden so the
            card below can bleed past its bottom edge */}
        <div className="relative">
          <div className="absolute inset-0 overflow-hidden">
            <Image src={hero.image} alt="BMW engine rebuild workshop" fill priority className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-linear-to-r from-hero-dark via-hero-dark/55 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-hero-dark via-transparent to-transparent" />
          </div>

          {/* ambient blue glow */}
          <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-hero-blue/25 blur-[110px]" />

          <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6 lg:px-8 lg:pt-10">
            <h1 className="hp-h1 uppercase">
              <span className="block text-white">{line1}</span>
              <span className="block text-hero-blue">{line2}</span>
              <span className="block text-white">{line3}</span>
            </h1>
            <p className="mt-5 max-w-lg text-base text-gray-300 sm:text-lg">{hero.subhead}</p>

            <div className="absolute inset-x-0 bottom-0 z-10 mx-auto w-full max-w-275 translate-y-1/2">
              <GlassPanel className="w-full">
                <RegLookupForm
                  buttonLabel={lookup.buttonLabel}
                  large
                  tight
                  left={
                    <div className="shrink-0 sm:max-w-xs">
                      <h2 className="hp-h3 italic flex items-start justify-center gap-2 uppercase text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] sm:justify-start">
                        <span className="flex h-[1.1em] shrink-0 items-center">
                          <BMWStripe size="em" />
                        </span>
                        {lookup.h2}
                      </h2>
                      <p className="mx-auto mt-2 max-w-xs text-sm text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] sm:mx-0">{lookup.description}</p>
                    </div>
                  }
                />
              </GlassPanel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
