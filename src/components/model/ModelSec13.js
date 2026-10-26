import Icon from "@/components/reusable/Icon";

export default function ModelSec13({ data }) {
  return (
    <section className="relative overflow-hidden bg-[#eef2f7]">
      {/* ===== mobile ===== */}
      <div className="relative px-4 py-6 md:hidden">
        <h2 className="hp-h2 whitespace-nowrap uppercase">
          <span className="text-[#101828]">{data.headlinePre} </span>
          <span className="text-hero-blue">{data.headlineHighlight}</span>
        </h2>

        {/* 4-step vertical flow */}
        <div className="mt-4">
          {data.steps.map((s, i) => (
            <div key={s.lineHighlight}>
              <div className="flex items-center gap-4">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0052cc] text-base font-extrabold text-white"
                  style={{ boxShadow: "0 0 12px rgba(0,82,204,0.5)" }}
                >
                  {i + 1}
                </span>

                <div className="flex flex-1 items-center gap-3 rounded-2xl border border-black/5 bg-white px-4 py-3 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
                  <Icon name={s.icon} className="h-11 w-11 shrink-0 text-hero-blue" />
                  <p className="text-sm font-extrabold uppercase leading-tight">
                    <span className="block text-[#101828]">{s.linePre}</span>
                    <span className="block text-hero-blue">{s.lineHighlight}</span>
                  </p>
                </div>
              </div>

              {i < data.steps.length - 1 && (
                <div className="flex w-11 justify-center py-1">
                  <span className="h-3 w-0 border-l-2 border-dashed border-hero-blue/40" aria-hidden="true" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* bottom summary banner */}
        <div
          className="glass-card relative mt-4 grid grid-cols-1 divide-y divide-black/10 rounded-2xl px-4 py-2"
          style={{ boxShadow: "0 20px 45px -15px rgba(16,24,40,0.35), 0 0 30px -10px rgba(0,127,248,0.3)" }}
        >
          <div className="flex items-center gap-3 py-3">
            <Icon name="clock" className="h-10 w-10 shrink-0 text-hero-blue" />
            <p className="text-sm leading-snug text-[#101828]">{data.turnaround.text}</p>
          </div>
          <div className="flex items-center gap-3 py-3">
            <Icon name="calendar" className="h-10 w-10 shrink-0 text-hero-blue" />
            <p className="text-sm font-semibold leading-snug text-[#101828]">
              {data.urgency.textPre}
              <span className="font-bold text-bmw-red">{data.urgency.textHighlight}</span>
            </p>
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-10 sm:px-6 md:block lg:px-8">
      <div className="relative mx-auto max-w-6xl">
        <div role="heading" aria-level="2" className="hp-h2 uppercase">
          <span className="text-[#101828]">{data.headlinePre} </span>
          <span className="text-hero-blue">{data.headlineHighlight}</span>
        </div>

        {/* 4-step flow */}
        <div className="mt-6 flex items-start gap-3">
          {data.steps.map((s, i) => (
            <div key={s.lineHighlight} className="flex flex-1 items-center gap-3">
              <div className="glass-card relative flex flex-1 items-center gap-3 rounded-xl px-4 py-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center self-start rounded-full bg-[#0a1f4d] text-sm font-extrabold text-white shadow-[0_4px_10px_-2px_rgba(0,0,0,0.4)]">
                  {i + 1}
                </span>
                <Icon name={s.icon} className="h-12 w-12 shrink-0 self-center text-hero-blue" />
                <p className="text-sm font-extrabold uppercase leading-tight">
                  <span className="block text-[#101828]">{s.linePre}</span>
                  <span className="block text-hero-blue">{s.lineHighlight}</span>
                </p>
              </div>

              {i < data.steps.length - 1 && (
                <span className="shrink-0 text-lg text-hero-blue" aria-hidden>
                  →
                </span>
              )}
            </div>
          ))}
        </div>

        {/* bottom summary banner */}
        <div
          className="glass-card relative mt-5 grid grid-cols-2 divide-x divide-black/10 rounded-2xl px-6 py-5 backdrop-blur-2xl"
          style={{ boxShadow: "0 20px 45px -15px rgba(16,24,40,0.35), 0 0 30px -10px rgba(0,127,248,0.3)" }}
        >
          <div className="flex items-center gap-3 pr-6">
            <Icon name="clock" className="h-11 w-11 shrink-0 text-hero-blue" />
            <p className="text-base text-[#101828]">{data.turnaround.text}</p>
          </div>
          <div className="flex items-center gap-3 pl-6">
            <Icon name="calendar" className="h-11 w-11 shrink-0 text-hero-blue" />
            <p className="text-base font-semibold text-[#101828]">
              {data.urgency.textPre}
              <span className="font-bold text-bmw-red">{data.urgency.textHighlight}</span>
            </p>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
