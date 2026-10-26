import Image from "next/image";
import PhotoStripes from "@/components/reusable/PhotoStripes";
import Link from "next/link";
import Icon from "@/components/reusable/Icon";
import BMWStripe from "@/components/reusable/BMWStripe";

export default function ModelSec15({ data }) {
  const headlineWords = data.headlinePre.split(" ");
  const mobileLine1 = headlineWords.slice(0, -1).join(" ");
  const mobileLine2 = `${headlineWords[headlineWords.length - 1]} ${data.headlineHighlight}`;

  return (
    <section className="relative overflow-hidden bg-[#eef2f7]">
      {/* ===== mobile ===== */}
      <div className="relative md:hidden">
        {/* div 1: split hero */}
        <div className="relative h-[270px]">
          <div className="absolute inset-0">
            <Image src={data.imageMobile} alt="BMW in a bright BMW specialist workshop" fill className="object-cover object-left" sizes="100vw" />
            <PhotoStripes preset="coverage-mobile" />
            <div className="absolute inset-0 bg-linear-to-r from-white/90 via-white/45 to-transparent" />
          </div>

          <div className="relative px-4 py-5">
            <BMWStripe className="h-3 w-6" />
            <h2 className="hp-h2 mt-2 max-w-[58%] uppercase">
              <span className="block text-[#101828]">{mobileLine1}</span>
              <span className="block text-hero-blue">{mobileLine2}</span>
            </h2>

            <p className="mt-3 max-w-[58%] text-sm font-extrabold text-[#101828]">{data.kicker}</p>
            <p className="mt-1.5 max-w-[58%] text-sm text-[#101828]">{data.description}</p>
          </div>
        </div>

        {/* div 2: model years breakdown */}
        <div className="relative px-4 pt-5">
          <div className="divide-y divide-black/10 rounded-2xl border border-black/5 bg-white shadow-[0_20px_50px_-25px_rgba(16,24,40,0.3)]">
            {data.generations.map((g) => (
              <div key={g.years} className="grid grid-cols-[auto_96px_1fr] items-start gap-3 px-4 py-4">
                <Icon name="car" className="mt-0.5 h-9 w-9 shrink-0 text-hero-blue" />
                <p className="border-r border-black/10 pr-3">
                  <span className="block text-sm font-extrabold leading-tight text-hero-blue">{g.years}</span>
                  <span className="block text-xs leading-tight text-[#101828]">({g.code})</span>
                </p>
                <p className="text-xs leading-relaxed text-[#101828]">{g.list}</p>
              </div>
            ))}
          </div>
        </div>

        {/* div 3: specific model coverage checklist */}
        <div className="relative px-4 pt-5">
          <div className="card-glare-light relative rounded-2xl border border-hero-blue/25 bg-white/90 p-5">
            <div className="flex items-center gap-3">
              <Icon name="engine" className="h-8 w-8 shrink-0 text-[#101828]" />
              <div>
                <h3 className="hp-h3 uppercase">
                  <span className="block text-[#101828]">{data.checklistTitlePre}</span>
                  {data.checklistHref ? (
                    <Link href={data.checklistHref} className="block text-hero-blue">
                      {data.checklistTitleHighlight}
                    </Link>
                  ) : (
                    <span className="block text-hero-blue">{data.checklistTitleHighlight}</span>
                  )}
                </h3>
                <span className="relative mt-1.5 block h-0.5 w-full bg-linear-to-r from-bmw-red via-bmw-red/40 to-transparent" />
              </div>
            </div>

            <div className="relative mt-3 grid grid-cols-2 gap-x-4 gap-y-4">
              {[data.checklistLeft, data.checklistRight].map((col, ci) => (
                <div key={ci} className="space-y-4">
                  {col.map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-hero-blue text-white">
                        <Icon name="check" className="h-2.5 w-2.5" />
                      </span>
                      {data.checklistHref ? (
                        <Link href={data.checklistHref} className="text-xs leading-tight text-[#101828]">
                          <span className="font-bold">{item.replace(" Engine Rebuild", "")}</span>
                          <span className="text-[#101828]"> Engine Rebuild</span>
                        </Link>
                      ) : (
                        <p className="text-xs leading-tight text-[#101828]">
                          <span className="font-bold">{item.replace(" Engine Rebuild", "")}</span>
                          <span className="text-[#101828]"> Engine Rebuild</span>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* div 4: registration notice */}
        <div className="relative px-4 pb-10 pt-5">
          <div
            className="flex items-stretch overflow-hidden rounded-2xl border border-hero-blue/40"
            style={{
              background: "linear-gradient(135deg, rgba(230,240,255,0.9) 0%, rgba(210,225,250,0.8) 100%)",
              boxShadow: "0 10px 25px rgba(0,50,150,0.15)",
            }}
          >
            <div className="flex flex-1 items-center gap-3 px-4 py-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-hero-blue text-white">
                <Icon name="info" className="h-4 w-4" />
              </span>
              <p className="text-xs leading-relaxed text-[#101828]">{data.notice}</p>
            </div>
            <div className="relative w-1/3 shrink-0" style={{ clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)" }}>
              <Image src={data.partImage} alt="Precision-machined BMW engine block" fill className="object-cover" sizes="35vw" />
            </div>
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 pb-10 pt-16 sm:px-6 md:block lg:px-8">
      {/* full-bleed background across the whole section */}
      <div className="absolute inset-0">
        <Image src={data.image} alt="BMW in a bright BMW specialist workshop" fill className="object-cover object-right-top" sizes="100vw" />
        <PhotoStripes preset="coverage" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* header */}
        <div className="max-w-md pt-2">
          <div role="heading" aria-level="2" className="hp-h2 uppercase">
            <span className="block text-[#101828]">{data.headlinePre}</span>
            <span className="flex items-center gap-2 text-hero-blue">
              {data.headlineHighlight}
              <BMWStripe className="h-7 w-16 lg:h-8 lg:w-[4.5rem]" />
            </span>
          </div>

          <p className="mt-4 text-base font-extrabold text-[#101828]">{data.kicker}</p>
          <p className="body-text mt-2 text-[#101828]">{data.description}</p>
        </div>

        <div className="mt-6 grid grid-cols-2 items-end gap-6">
          {/* left column */}
          <div>
            <div className="divide-y divide-black/10 rounded-2xl border border-black/5 bg-white shadow-[0_20px_50px_-25px_rgba(16,24,40,0.3)]">
              {data.generations.map((g) => (
                <div key={g.years} className="grid grid-cols-[auto_1fr] items-center gap-4 px-5 py-4">
                  <Icon name="car" className="h-10 w-10 shrink-0 text-hero-blue" />
                  <div className="grid grid-cols-2 items-center gap-3">
                    <p className="border-r border-black/10 pr-3">
                      <span className="block text-base font-extrabold text-hero-blue">{g.years}</span>
                      <span className="block text-sm text-[#101828]">({g.code})</span>
                    </p>
                    <p className="text-sm leading-relaxed text-[#101828]">{g.list}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* support notice */}
            <div
              className="mt-4 flex items-stretch overflow-hidden rounded-2xl border border-hero-blue/40"
              style={{
                background: "linear-gradient(135deg, rgba(230,240,255,0.9) 0%, rgba(210,225,250,0.8) 100%)",
                boxShadow: "0 10px 25px rgba(0,50,150,0.15)",
              }}
            >
              <div className="flex flex-1 items-center gap-5 px-7 py-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-hero-blue text-white">
                  <Icon name="info" className="h-5 w-5" />
                </span>
                <p className="text-base leading-relaxed text-[#101828]">{data.notice}</p>
              </div>
              <div
                className="relative w-2/5 shrink-0"
                style={{ clipPath: "polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
              >
                <Image src={data.partImage} alt="Precision-machined BMW engine block" fill className="object-cover" sizes="30vw" />
              </div>
            </div>
          </div>

          {/* right column */}
          <div>
            <div className="card-glare-light relative flex min-h-85 flex-col overflow-hidden rounded-2xl border border-hero-blue/25 bg-white/90 p-6 shadow-[0_25px_60px_-25px_rgba(0,127,248,0.35)] backdrop-blur-xl">
              <div
                className="pointer-events-none absolute bottom-0 right-0 h-44 w-64 opacity-25"
                style={{ clipPath: "polygon(38% 100%, 100% 100%, 100% 15%)" }}
              >
                <Image src={data.partImage} alt="" fill className="object-cover" sizes="256px" />
              </div>

              <div className="relative flex items-center gap-3">
                <Icon name="engine" className="h-9 w-9 shrink-0 text-hero-blue" />
                <div role="heading" aria-level="3" className="hp-h3 uppercase">
                  <span className="block text-[#101828]">{data.checklistTitlePre}</span>
                  {data.checklistHref ? (
                    <Link href={data.checklistHref} className="block text-hero-blue">
                      {data.checklistTitleHighlight}
                    </Link>
                  ) : (
                    <span className="block text-hero-blue">{data.checklistTitleHighlight}</span>
                  )}
                </div>
              </div>
              <span className="relative mt-3 block h-0.5 w-full bg-linear-to-r from-bmw-red via-bmw-red/40 to-transparent" />

              <div className="relative mt-3 grid grid-cols-2 gap-x-6 gap-y-5">
                {[data.checklistLeft, data.checklistRight].map((col, ci) => (
                  <div key={ci} className="space-y-5">
                    {col.map((item) => (
                      <div key={item} className="flex items-center gap-2.5">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-hero-blue text-white">
                          <Icon name="check" className="h-3 w-3" />
                        </span>
                        {data.checklistHref ? (
                          <Link href={data.checklistHref} className="text-base text-[#101828]">
                            <span className="font-bold">{item.replace(" Engine Rebuild", "")}</span>
                            <span className="text-[#101828]"> Engine Rebuild</span>
                          </Link>
                        ) : (
                          <p className="text-base text-[#101828]">
                            <span className="font-bold">{item.replace(" Engine Rebuild", "")}</span>
                            <span className="text-[#101828]"> Engine Rebuild</span>
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
