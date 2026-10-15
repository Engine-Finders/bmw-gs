import Image from "next/image";
import Icon from "@/components/reusable/Icon";

export default function HomeSec10({ data }) {
  return (
    <section className="text-white">
      {/* ===== mobile ===== */}
      <div className="md:hidden">
        {/* Division 1: value proposition */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/home/sec10_mobile1.jpg"
              alt="BMW specialist assembling an engine"
              fill
              className="object-cover object-top"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-hero-dark/70 to-hero-dark" />
          </div>

          <div className="relative px-4 py-7">
            <h2 className="hp-h2 uppercase">
              <span className="block">
                Why <span className="text-bmw-blue">BM</span>
                <span className="text-bmw-red">W</span> Owners
              </span>
              <span className="block">Travel Across</span>
              <span className="block">
                The UK To <span className="text-bmw-red">Us</span>
              </span>
            </h2>
            <p className="mt-3 max-w-[85%] text-sm text-white">{data.description}</p>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {data.reasons.map((r) => (
                <div
                  key={r.label}
                  className="glow-card flex flex-col items-center gap-2 p-3 text-center"
                >
                  <Icon name={r.icon} className="h-8 w-8 shrink-0 text-hero-blue" />
                  <p className="text-[10px] leading-tight text-white">{r.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="hidden md:block">
        {/* Division 1: value proposition */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image src={data.bgImage1} alt="" fill className="object-cover object-left" sizes="100vw" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
            <div className="max-w-[44%]">
              <h2 className="hp-h2 uppercase">
                Why <span className="text-bmw-blue">BM</span>
                <span className="text-bmw-red">W</span> Owners Travel Across The UK To Us
              </h2>
              <p className="mt-2 text-sm text-white">{data.description}</p>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-6 lg:max-w-[70%]">
              {data.reasons.map((r) => (
                <div key={r.label} className="glow-card flex flex-col items-center gap-2 p-3 text-center">
                  <Icon name={r.icon} className="h-10 w-10 shrink-0 text-hero-blue" />
                  <p className="text-xs leading-tight text-white">{r.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
