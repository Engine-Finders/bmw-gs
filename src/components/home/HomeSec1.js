import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import BMWStripe from "@/components/reusable/BMWStripe";
import RegLookupForm from "@/components/reusable/RegLookupForm";
import GlassPanel from "@/components/reusable/GlassPanel";

export default function HomeSec1({ hero, lookup }) {
  const [line1, line2, line3] = hero.h1.split("|");

  return (
    <section id="find-my-bmw" className="relative bg-hero-dark text-white">
      {/* ===== mobile ===== */}
      <div className="md:hidden">
        {/* image box: relative + sized by aspect-ratio, so the card below can anchor to ITS bottom
            edge specifically. overflow-hidden moves to an inner layer so it only clips the photo. */}
        <div className="relative aspect-[900/1224] w-full">
          <div className="absolute inset-0 overflow-hidden">
            <Image src={hero.mobileImage} alt="BMW engine rebuild workshop" fill priority className="object-contain" sizes="100vw" />
            <div className="absolute inset-0 bg-linear-to-b from-hero-dark/75 via-hero-dark/15 to-hero-dark" />
            <div className="absolute inset-0 bg-linear-to-r from-hero-dark/60 via-transparent to-transparent" />
            {/* extra dark patch directly behind the text block for legibility */}
            <div className="absolute inset-x-0 top-0 h-2/3 bg-linear-to-b from-black/70 via-black/35 to-transparent" />
          </div>

          <div className="absolute inset-0 flex flex-col px-4 pt-6">
            <div className="max-w-[62%]">
              <h1 className="-skew-x-6 origin-left scale-y-115 scale-x-92 text-3xl font-extrabold uppercase leading-[1.05] tracking-tighter">
                <span className="block text-white">{line1}</span>
                <span className="block text-hero-blue">{line2}</span>
                <span className="block text-white">{line3}</span>
              </h1>
              <p className="mt-4 text-sm text-gray-300">{hero.subhead}</p>

              <div className="mt-5 flex flex-col gap-3">
                <a
                  href={hero.ctaPrimary.href}
                  className="whitespace-nowrap rounded-sm border-2 border-hero-blue bg-hero-blue px-3 py-3 text-center text-xs font-bold text-white transition-colors hover:border-white/25 hover:bg-black/40"
                >
                  {hero.ctaPrimary.label} →
                </a>
                <a
                  href={hero.ctaSecondary.href}
                  className="whitespace-nowrap rounded-sm border-2 border-white/25 bg-black/40 px-3 py-3 text-center text-xs font-bold text-white transition-colors hover:border-hero-blue hover:bg-hero-blue"
                >
                  {hero.ctaSecondary.label} →
                </a>
              </div>
            </div>
          </div>

          {/* glass registration lookup panel — half-in / half-out: anchored to THIS image box's own
              bottom edge (not the outer wrapper), so the top half overlaps the photo and the bottom
              half hangs below it. */}
          <div className="absolute inset-x-0 bottom-0 z-10 translate-y-1/2 px-4">
            <GlassPanel className="mx-auto w-full max-w-275">
              <RegLookupForm
                buttonLabel={lookup.h2}
                left={
                  <div className="shrink-0">
                    <h2 className="origin-left scale-y-115 scale-x-92 flex items-center justify-center gap-2 text-2xl font-extrabold uppercase tracking-tighter text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                      <BMWStripe />
                      {lookup.h2}
                    </h2>
                    <p className="mx-auto mt-2 max-w-xs text-sm text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">{lookup.description}</p>
                  </div>
                }
              />

              <div className="mx-auto mt-6 max-w-md border-t border-[#101828]/10 pt-3">
                <p className="flex items-start justify-center gap-1.5 text-center text-xs text-[#101828]">
                  <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0" />
                  {lookup.note} — dev to wire up, per locked decision
                </p>
              </div>
            </GlassPanel>
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

          <div className="relative mx-auto max-w-6xl px-4 pb-32 pt-8 sm:px-6 lg:px-8 lg:pt-10">
            <h1 className="-skew-x-6 origin-left scale-y-115 scale-x-92 text-4xl font-extrabold uppercase leading-[1.05] tracking-tighter sm:text-5xl lg:text-6xl">
              <span className="block text-white">{line1}</span>
              <span className="block text-hero-blue">{line2}</span>
              <span className="block text-white">{line3}</span>
            </h1>
            <p className="mt-5 max-w-lg text-base text-gray-300 sm:text-lg">{hero.subhead}</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={hero.ctaPrimary.href}
                className="rounded-sm border-2 border-hero-blue bg-hero-blue px-6 py-3 text-center text-sm font-bold text-white transition-colors hover:border-white/25 hover:bg-black/40"
              >
                {hero.ctaPrimary.label} →
              </a>
              <a
                href={hero.ctaSecondary.href}
                className="rounded-sm border-2 border-white/25 bg-black/40 px-6 py-3 text-center text-sm font-bold text-white transition-colors hover:border-hero-blue hover:bg-hero-blue"
              >
                {hero.ctaSecondary.label} →
              </a>
            </div>
          </div>

          {/* glass registration lookup panel — half-in / half-out: anchored to the hero visual's own
              bottom edge, so the top half overlaps the photo and the bottom half hangs below it */}
          <div className="absolute inset-x-0 bottom-0 z-10 mx-auto max-w-6xl translate-y-1/2 px-4 sm:px-6 lg:px-8">
            <GlassPanel className="mx-auto w-full max-w-275">
              <RegLookupForm
                buttonLabel={lookup.h2}
                large
                left={
                  <div className="shrink-0 sm:max-w-xs">
                    <h2 className="origin-left scale-y-115 scale-x-92 flex items-center justify-center gap-2 text-2xl font-extrabold uppercase tracking-tighter text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] sm:text-3xl sm:justify-start">
                      <BMWStripe />
                      {lookup.h2}
                    </h2>
                    <p className="mx-auto mt-2 max-w-xs text-sm text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] sm:mx-0">{lookup.description}</p>
                  </div>
                }
              />

              <div className="mx-auto mt-6 max-w-md border-t border-[#101828]/10 pt-3 sm:max-w-none">
                <p className="flex items-center justify-center gap-1.5 text-xs text-[#101828]">
                  <Icon name="shield" className="h-4 w-4" />
                  {lookup.note} — dev to wire up, per locked decision
                </p>
              </div>
            </GlassPanel>
          </div>
        </div>
      </div>
    </section>
  );
}
