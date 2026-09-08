import Icon from "@/components/reusable/Icon";
import BMWStripe from "@/components/reusable/BMWStripe";

const HEX_POINTS = "50,2 96,25 96,75 50,98 4,75 4,25";

function HexIcon({ icon, boxClass, iconClass }) {
  return (
    <div className={`relative mx-auto ${boxClass}`}>
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        style={{ filter: "drop-shadow(0 0 10px rgba(59,173,255,0.9)) drop-shadow(0 0 4px rgba(59,173,255,0.9))" }}
      >
        <polygon points={HEX_POINTS} fill="#050a17" stroke="#3badff" strokeWidth="4" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon name={icon} className={`${iconClass} text-white`} />
      </div>
    </div>
  );
}

function ColumnAccent({ className = "" }) {
  return (
    <span className={`mx-auto mt-1.5 flex items-center justify-center gap-1 ${className}`} aria-hidden="true">
      <span className="h-0.5 w-6 bg-hero-blue" />
      <span
        className="h-0.5 w-6"
        style={{ backgroundImage: "repeating-linear-gradient(90deg, var(--color-bmw-red) 0px, var(--color-bmw-red) 3px, transparent 3px, transparent 6px)" }}
      />
    </span>
  );
}

export default function Sec10({ data }) {
  return (
    <section className="relative overflow-hidden bg-hero-dark text-white">
      {/* ===== mobile ===== */}
      <div className="relative px-4 py-7 md:hidden">
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center">
          <div className="flex items-center gap-2">
            <BMWStripe className="h-4 w-8 shrink-0" />
            <span className="text-base font-bold uppercase leading-none tracking-tighter text-white">{data.titlePre}</span>
          </div>
          <span className="text-2xl font-bold uppercase leading-none tracking-tighter">
            <span className="text-white">{data.titleBigPre}</span>
            <span className="text-hero-blue">{data.titleBigHighlight}</span>
            <span className="text-white">{data.titleBigPost}</span>
          </span>
        </div>

        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="h-px w-10 bg-hero-blue/70" />
          <BMWStripe className="h-2.5 w-5 shrink-0" />
          <span className="h-px w-10 bg-hero-blue/70" />
        </div>

        <div className="mt-3 space-y-1 text-center">
          {data.subtext.map((l) => (
            <p key={l} className="text-xs leading-snug text-white">
              {l}
            </p>
          ))}
        </div>

        <div className="no-scrollbar relative -mx-4 mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1">
          {data.columns.map((c) => (
            <div
              key={c.title}
              className="glass-card-dark w-[78%] shrink-0 snap-center rounded-2xl p-5 text-center"
              style={{ boxShadow: "0 20px 45px -20px rgba(0,127,248,0.35)" }}
            >
              <HexIcon icon={c.icon} boxClass="h-20 w-20" iconClass="h-11 w-11" />
              <p className="mt-3 text-sm font-extrabold uppercase tracking-wide text-hero-blue">{c.title}</p>
              <ColumnAccent />
              <p className="mx-auto mt-2 max-w-xs text-xs leading-relaxed text-white">{c.body}</p>
            </div>
          ))}
        </div>

        <div className="glass-card-dark relative mt-6 flex items-start gap-3 overflow-hidden rounded-xl px-4 py-3.5">
          <span className="absolute bottom-0 left-0 top-0 w-1 bg-hero-blue" aria-hidden="true" />
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-hero-blue text-xs font-bold text-hero-blue">
            i
          </span>
          <p className="text-xs italic leading-snug text-white">
            <span className="font-bold not-italic text-white">{data.notice.highlight}</span>
            {data.notice.rest}
          </p>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-14 sm:px-6 md:block lg:px-8">
        <div className="relative mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-center gap-x-4 text-center">
            <div className="flex items-center gap-3">
              <BMWStripe className="h-7 w-14 shrink-0" />
              <span className="text-2xl font-bold uppercase leading-none tracking-tighter text-white lg:text-3xl">{data.titlePre}</span>
            </div>
            <span className="text-4xl font-bold uppercase leading-none tracking-tighter lg:text-5xl">
              <span className="text-white">{data.titleBigPre}</span>
              <span className="text-hero-blue">{data.titleBigHighlight}</span>
              <span className="text-white">{data.titleBigPost}</span>
            </span>
          </div>

          <div className="mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-28 bg-hero-blue/70" />
            <BMWStripe className="h-3.5 w-8 shrink-0" />
            <span className="h-px w-28 bg-hero-blue/70" />
          </div>

          <div className="mx-auto mt-4 max-w-2xl space-y-1 text-center">
            {data.subtext.map((l) => (
              <p key={l} className="text-base text-white">
                {l}
              </p>
            ))}
          </div>

          <div className="relative mt-12 grid grid-cols-3 gap-8">
            {data.columns.map((c, i) => (
              <div key={c.title} className="relative text-center">
                {i > 0 && (
                  <span className="pointer-events-none absolute -left-4 top-0 h-full w-px" aria-hidden="true">
                    <span
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(90,170,255,0.6) 12%, rgba(90,170,255,0.6) 88%, transparent 100%)" }}
                    />
                    <span className="absolute -left-[3px] -top-1 h-2 w-2 rounded-full bg-hero-blue" style={{ boxShadow: "0 0 8px rgba(0,138,201,0.9)" }} />
                    <span className="absolute -bottom-1 -left-[3px] h-2 w-2 rounded-full bg-hero-blue" style={{ boxShadow: "0 0 8px rgba(0,138,201,0.9)" }} />
                  </span>
                )}
                <HexIcon icon={c.icon} boxClass="h-32 w-32" iconClass="h-16 w-16" />
                <p className="mt-4 text-lg font-extrabold uppercase tracking-wide text-hero-blue">{c.title}</p>
                <ColumnAccent className="mt-2" />
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-white">{c.body}</p>
              </div>
            ))}
          </div>

          <div className="glass-card-dark relative mt-10 flex items-center gap-4 overflow-hidden rounded-2xl px-6 py-5">
            <span className="absolute bottom-0 left-0 top-0 w-1 bg-hero-blue" aria-hidden="true" />
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-hero-blue text-sm font-bold text-hero-blue">
              i
            </span>
            <p className="text-sm italic leading-relaxed text-white">
              <span className="font-bold not-italic text-white">{data.notice.highlight}</span>
              {data.notice.rest}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
