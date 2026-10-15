import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/reusable/Icon";
import BMWStripe from "@/components/reusable/BMWStripe";
import MobileSplitTitle from "@/components/variant/MobileSplitTitle";

export default function Sec3({ data }) {
  return (
    <section className="relative overflow-hidden bg-hero-dark">
      {/* ===== mobile ===== */}
      <div className="relative md:hidden">
        <div className="relative px-4 py-7">
          <MobileSplitTitle titlePre={data.titlePre} titleHighlight={data.titleHighlight} baseColorClass="text-white" />

          <div className="no-scrollbar -mx-4 mt-5 overflow-x-auto px-4">
            <div
              className="relative min-w-130 overflow-hidden rounded-xl"
              style={{ background: "rgba(5,12,28,0.96)", border: "1px solid rgba(90,170,255,0.35)" }}
            >
              <span className="pointer-events-none absolute bottom-0 top-0 w-px bg-white/10" style={{ left: "25%" }} aria-hidden="true" />
              <span className="pointer-events-none absolute bottom-0 top-0 w-px bg-white/10" style={{ left: "50%" }} aria-hidden="true" />
              <span className="pointer-events-none absolute bottom-0 top-0 w-px bg-white/10" style={{ left: "75%" }} aria-hidden="true" />

              <div className="flex border-b border-white/10">
                {data.columns.map((c) => (
                  <div key={c.label} className="flex min-w-0 flex-1 items-center justify-center px-3 py-2.5">
                    <p className="whitespace-nowrap text-[10px] font-extrabold uppercase tracking-wide text-white">{c.label}</p>
                  </div>
                ))}
              </div>

              <div className="thin-scrollbar max-h-72 divide-y divide-white/10 overflow-y-auto">
                {data.rows.map((r, i) => (
                  <div key={`${r.model}-${r.variant}-${i}`} className="group relative flex transition-colors hover:bg-hero-blue/10">
                    <span
                      className="pointer-events-none absolute bottom-0 left-0 top-0 w-1 origin-left scale-y-0 bg-hero-blue transition-transform group-hover:scale-y-100"
                      aria-hidden="true"
                    />
                    <p className="flex min-w-0 flex-1 items-center gap-1.5 px-3 py-2.5 text-xs font-extrabold text-white">
                      <Icon name="car" className="h-3 w-3 shrink-0 text-hero-blue" />
                      <span className="min-w-0 whitespace-nowrap">
                        {r.modelHref ? <Link href={r.modelHref} >{r.model}</Link> : r.model}
                      </span>
                    </p>
                    <p className="min-w-0 flex-1 px-3 py-2.5 text-center text-xs text-white">
                      {r.variantHref ? <Link href={r.variantHref} >{r.variant}</Link> : r.variant}
                    </p>
                    <p className="min-w-0 flex-1 px-3 py-2.5 text-center text-xs text-white">{r.generation}</p>
                    <p className="min-w-0 flex-1 px-3 py-2.5 text-center text-xs text-white">{r.years}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-card-dark mt-4 rounded-xl px-4 py-3.5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-hero-blue">
                <Icon name={data.prompt.icon} className="h-4 w-4 text-white" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white">{data.prompt.titlePre}</p>
                <p className="text-[11px] text-white">{data.prompt.subtext}</p>
              </div>
            </div>
            <a
              href={data.prompt.href}
              className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-linear-to-br from-hero-blue to-hero-blue-dark px-4 py-2.5 text-xs font-bold uppercase text-white shadow-lg transition-transform hover:scale-[1.02]"
            >
              {data.prompt.buttonLabel}
            </a>
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden overflow-hidden md:block">
        <div className="absolute inset-0">
          <Image src={data.image} alt="BMW B58 engine and sedan" fill className="object-cover" sizes="100vw" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <BMWStripe className="h-7 w-14 shrink-0" />
              <h2 className="hp-h2 whitespace-nowrap uppercase text-white">{data.titlePre}</h2>
            </div>
            <p className="hp-h2 uppercase text-hero-blue">{data.titleHighlight}</p>
          </div>

          <div
            className="mt-6 max-w-3xl overflow-hidden rounded-2xl"
            style={{
              background: "rgba(5,12,28,0.96)",
              border: "1px solid rgba(90,170,255,0.35)",
              boxShadow: "0 25px 60px -30px rgba(0,127,248,0.5)",
            }}
          >
            <div className="relative">
              <span className="pointer-events-none absolute bottom-0 top-0 w-px bg-white/10" style={{ left: "25%" }} aria-hidden="true" />
              <span className="pointer-events-none absolute bottom-0 top-0 w-px bg-white/10" style={{ left: "50%" }} aria-hidden="true" />
              <span className="pointer-events-none absolute bottom-0 top-0 w-px bg-white/10" style={{ left: "75%" }} aria-hidden="true" />

              <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] border-b border-white/10">
                {data.columns.map((c) => (
                  <div key={c.label} className="flex items-center px-5 py-3.5">
                    <p className="text-xs font-extrabold uppercase tracking-wide text-white">{c.label}</p>
                  </div>
                ))}
              </div>

              <div>
                {data.rows.map((r, i) => (
                  <div
                    key={`${r.model}-${r.variant}-${i}`}
                    className={`group relative grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] items-center transition-colors hover:bg-hero-blue/10 ${i > 0 ? "border-t border-white/10" : ""}`}
                  >
                    <span
                      className="pointer-events-none absolute bottom-0 left-0 top-0 w-1 origin-left scale-y-0 bg-hero-blue transition-transform group-hover:scale-y-100"
                      aria-hidden="true"
                    />
                    <p className="flex min-w-0 items-center gap-2 px-5 py-3 text-sm font-extrabold text-white">
                      <Icon name="car" className="h-3.5 w-3.5 shrink-0 text-hero-blue" />
                      <span className="min-w-0 truncate">
                        {r.modelHref ? <Link href={r.modelHref} >{r.model}</Link> : r.model}
                      </span>
                    </p>
                    <p className="min-w-0 truncate px-5 py-3 text-sm text-white">
                      {r.variantHref ? <Link href={r.variantHref} >{r.variant}</Link> : r.variant}
                    </p>
                    <p className="min-w-0 truncate px-5 py-3 text-sm text-white">{r.generation}</p>
                    <p className="min-w-0 truncate px-5 py-3 text-sm text-white">{r.years}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-card-dark mt-4 flex items-center justify-between gap-4 rounded-2xl px-6 py-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-hero-blue">
                <Icon name={data.prompt.icon} className="h-4.5 w-4.5 text-white" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-white">{data.prompt.titlePre}</p>
                <p className="text-xs text-white">{data.prompt.subtext}</p>
              </div>
            </div>
            <a
              href={data.prompt.href}
              className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-linear-to-br from-hero-blue to-hero-blue-dark px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
            >
              {data.prompt.buttonLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
