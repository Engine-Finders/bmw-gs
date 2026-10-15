import Icon from "@/components/reusable/Icon";
import BMWStripe from "@/components/reusable/BMWStripe";

export default function Sec7({ data }) {
  return (
    <section className="relative overflow-hidden bg-hero-dark">
      {/* ===== mobile ===== */}
      <div className="relative px-4 py-7 md:hidden">
        <div className="overflow-hidden">
          <BMWStripe className="float-left mr-2 h-6 w-12 shrink-0" />
          <h2 className="hp-h2 uppercase">
            <span className="text-white">{data.titlePre}</span>
            <span className="text-hero-blue">{data.titleHighlight}</span>
          </h2>
        </div>

        <div className="no-scrollbar -mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-1">
          {data.steps.map((s, i) => (
            <div key={s.title} className="relative flex w-[38vw] shrink-0 snap-start flex-col items-center text-center">
              <span
                className={`pointer-events-none absolute top-5 border-t-2 border-dashed border-hero-blue/30 ${
                  i === 0 ? "left-1/2 right-0" : i === data.steps.length - 1 ? "left-0 right-1/2" : "left-0 right-0"
                }`}
                aria-hidden="true"
              />
              <span
                className="relative z-10 flex h-10 w-10 shrink-0 rounded-full p-[1.5px]"
                style={{
                  background:
                    "conic-gradient(from 0deg, var(--color-bmw-blue) 0deg, rgba(0,138,201,0.15) 60deg, transparent 100deg, transparent 260deg, rgba(212,26,26,0.15) 300deg, var(--color-bmw-red) 360deg), rgba(5,12,28,0.9)",
                  boxShadow: "0 8px 18px -6px rgba(0,0,0,0.5)",
                }}
              >
                <span className="flex h-full w-full items-center justify-center rounded-full bg-linear-to-br from-[#0d1730] to-[#050a1c]">
                  <Icon name={s.icon} className="h-5 w-5 text-hero-blue" />
                </span>
              </span>
              <p className="mt-2 flex items-center gap-1.5">
                <span className="text-xs font-bold text-hero-blue">{i + 1}</span>
                <span className="text-xs font-bold text-white">{s.title}</span>
              </p>
              <p className="mt-1 line-clamp-3 text-[10px] leading-snug text-white">{s.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-12 sm:px-6 md:block lg:px-8">
        <div className="relative mx-auto max-w-6xl">
          <div className="flex items-center gap-3">
            <BMWStripe className="h-7 w-14 shrink-0" />
            <h2 className="hp-h2 uppercase">
              <span className="text-white">{data.titlePre}</span>
              <span className="text-hero-blue">{data.titleHighlight}</span>
            </h2>
          </div>

          <div className="relative mt-10 grid grid-cols-10 gap-2">
            <span className="pointer-events-none absolute left-[5%] right-[5%] top-9 border-t-2 border-dashed border-hero-blue/30" aria-hidden="true" />
            {data.steps.map((s, i) => (
              <div key={s.title} className="relative flex flex-col items-center text-center">
                <span
                  className="relative z-10 flex h-[72px] w-[72px] shrink-0 rounded-full p-0.5"
                  style={{
                    background:
                      "conic-gradient(from 0deg, var(--color-bmw-blue) 0deg, rgba(0,138,201,0.15) 60deg, transparent 100deg, transparent 260deg, rgba(212,26,26,0.15) 300deg, var(--color-bmw-red) 360deg), rgba(5,12,28,0.9)",
                    boxShadow: "0 12px 26px -8px rgba(0,0,0,0.5)",
                  }}
                >
                  <span className="flex h-full w-full items-center justify-center rounded-full bg-linear-to-br from-[#0d1730] to-[#050a1c]">
                    <Icon name={s.icon} className="h-8 w-8 text-hero-blue" />
                  </span>
                </span>
                <p className="mt-2 text-lg font-extrabold text-hero-blue">{i + 1}</p>
                <p className="mt-1 text-sm font-bold leading-tight text-white">{s.title}</p>
                <p className="mt-1.5 px-1 text-xs leading-snug text-white">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
