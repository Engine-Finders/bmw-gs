import Image from "next/image";
import BMWStripe from "@/components/reusable/BMWStripe";

function LightTitle({ titlePre, titleHighlight, titlePost, size = "text-3xl lg:text-4xl" }) {
  return (
    <>
      <BMWStripe className="h-6 w-11 shrink-0" />
      <h2 className={`mt-2 ${size} font-extrabold uppercase leading-[1.05] tracking-tighter`}>
        <span className="block text-[#101828]">{titlePre}</span>
        <span className="block">
          <span className="text-hero-blue">{titleHighlight}</span>
          <span className="text-[#101828]">{titlePost}</span>
        </span>
      </h2>
    </>
  );
}

export default function Sec9({ data }) {
  const { about, byModel, compatibility } = data;

  return (
    <>
      {/* ============ about ============ */}
      <section className="relative overflow-hidden bg-white">
        {/* ===== mobile ===== */}
        <div className="relative bg-white md:hidden">
          <div className="relative px-4 pt-7">
            <LightTitle {...about} size="text-2xl" />
            <span className="mt-2 block h-0.5 w-24 bg-linear-to-r from-bmw-blue via-white to-bmw-red" />
          </div>
          <div className="relative mt-4 w-full" style={{ aspectRatio: "544 / 467" }}>
            <Image src="/engine_family/sec9_top_mobile.webp" alt="BMW B58 engine on workshop stand" fill className="object-cover" sizes="100vw" />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-10"
              style={{ background: "linear-gradient(to bottom, #fff 0%, transparent 100%)" }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-10"
              style={{ background: "linear-gradient(to top, #fff 0%, transparent 100%)" }}
              aria-hidden="true"
            />
          </div>
          <div className="relative px-4 pb-7 pt-4">
            <p className="text-xs leading-relaxed text-[#101828]">{about.body}</p>
          </div>
        </div>

        {/* ===== desktop ===== */}
        <div className="relative hidden overflow-hidden md:block">
          <div className="absolute inset-0">
            <Image src={about.image} alt="BMW B58 engine on workshop stand" fill className="object-cover" sizes="100vw" />
          </div>
          <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="max-w-md">
              <LightTitle {...about} />
              <span className="mt-4 block h-0.5 w-40 bg-linear-to-r from-bmw-blue via-white to-bmw-red" />
              <p className="mt-4 text-sm leading-relaxed text-[#101828] lg:text-[15px]">{about.body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ applications by model ============ */}
      <section className="relative overflow-hidden text-white" style={{ background: "#050810" }}>
        {/* ===== mobile ===== */}
        <div className="relative md:hidden">
          <div className="relative px-4 pt-6">
            <BMWStripe className="h-6 w-11 shrink-0" />
            <h2 className="mt-2 text-2xl font-bold uppercase leading-[1.05] tracking-tighter">
              <span className="block text-white">{byModel.titlePre}</span>
              <span className="block">
                <span className="text-hero-blue">{byModel.titleHighlight}</span>
                <span className="text-white">{byModel.titlePost}</span>
              </span>
            </h2>
            <span className="mt-2 block h-0.5 w-24 bg-linear-to-r from-bmw-blue via-white to-bmw-red" />
          </div>
          <div className="relative mt-4 w-full" style={{ aspectRatio: "501 / 354" }}>
            <Image src="/engine_family/sec9_middle_mobile.webp" alt="BMW lineup in showroom" fill className="object-cover" sizes="100vw" />
          </div>
          <div className="relative px-4 pb-6 pt-4">
            <p className="text-xs leading-relaxed text-white">{byModel.body}</p>
          </div>
        </div>

        {/* ===== desktop ===== */}
        <div className="relative hidden overflow-hidden md:block">
          <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center gap-10 px-4 py-14 sm:px-6 lg:px-8">
            <div className="relative aspect-[1024/700] w-full overflow-hidden rounded-xl">
              <Image src={byModel.image} alt="BMW lineup in showroom" fill className="object-cover object-left" sizes="50vw" />
            </div>
            <div>
              <BMWStripe className="h-6 w-11 shrink-0" />
              <h2 className="mt-2 text-3xl font-bold uppercase leading-[1.05] tracking-tighter lg:text-4xl">
                <span className="block text-white">{byModel.titlePre}</span>
                <span className="block">
                  <span className="text-hero-blue">{byModel.titleHighlight}</span>
                  <span className="text-white">{byModel.titlePost}</span>
                </span>
              </h2>
              <span className="mt-4 block h-0.5 w-40 bg-linear-to-r from-bmw-blue via-white to-bmw-red" />
              <p className="mt-4 text-sm leading-relaxed text-white lg:text-[15px]">{byModel.body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ compatibility ============ */}
      <section className="relative overflow-hidden bg-white">
        {/* ===== mobile ===== */}
        <div className="relative bg-white md:hidden">
          <div className="relative px-4 pt-7">
            <LightTitle {...compatibility} size="text-2xl" />
            <span className="mt-2 block h-0.5 w-24 bg-linear-to-r from-bmw-blue via-white to-bmw-red" />
          </div>
          <div className="relative mt-4 w-full" style={{ aspectRatio: "457 / 434" }}>
            <Image src="/engine_family/sec9_bottom_mobile.webp" alt="BMW B58 engine compatibility scan" fill className="object-cover" sizes="100vw" />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-10"
              style={{ background: "linear-gradient(to bottom, #fff 0%, transparent 100%)" }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-10"
              style={{ background: "linear-gradient(to top, #fff 0%, transparent 100%)" }}
              aria-hidden="true"
            />
          </div>
          <div className="relative px-4 pb-7 pt-4">
            <p className="text-xs leading-relaxed text-[#101828]">{compatibility.body}</p>
          </div>
        </div>

        {/* ===== desktop ===== */}
        <div className="relative hidden overflow-hidden md:block">
          <div className="absolute inset-0">
            <Image src={compatibility.image} alt="BMW B58 engine compatibility scan" fill className="object-cover" sizes="100vw" />
          </div>
          <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="max-w-md">
              <LightTitle {...compatibility} />
              <span className="mt-4 block h-0.5 w-40 bg-linear-to-r from-bmw-blue via-white to-bmw-red" />
              <p className="mt-4 text-sm leading-relaxed text-[#101828] lg:text-[15px]">{compatibility.body}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
