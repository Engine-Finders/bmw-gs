"use client";

import { useRef, useState } from "react";
import Icon from "@/components/reusable/Icon";
import BMWStripe from "@/components/reusable/BMWStripe";

function GoogleG({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.47a5.53 5.53 0 01-2.4 3.63v3h3.88c2.27-2.09 3.55-5.17 3.55-8.82z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.88-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11A12 12 0 0012 24z" />
      <path fill="#FBBC05" d="M5.27 14.28a7.2 7.2 0 010-4.56V6.61H1.27a12 12 0 000 10.78z" />
      <path fill="#EA4335" d="M12 4.75c1.76 0 3.34.6 4.58 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 001.27 6.61l4 3.11C6.22 6.86 8.87 4.75 12 4.75z" />
    </svg>
  );
}

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Icon key={i} name="star" className="h-3.5 w-3.5 fill-[#f5c518] text-[#f5c518]" />
      ))}
    </div>
  );
}

export default function ModelSec8({ data }) {
  const [line1, line2] = data.headline.split("|");
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;
    const ratio = el.scrollLeft / maxScroll;
    setActiveIndex(Math.round(ratio * (data.reviews.length - 1)));
  }

  return (
    <section className="relative overflow-hidden bg-hero-dark">
      {/* ===== mobile ===== */}
      <div className="relative md:hidden">
        <BMWStripe size="lg" className="absolute right-4 top-4 opacity-90" />

        <div className="relative px-4 pb-8 pt-8">
          <h2 className="origin-left scale-y-110 scale-x-90 text-3xl font-extrabold uppercase leading-[1.05] tracking-tighter">
            <span className="block text-white">{line1}</span>
            <span className="block text-hero-blue">{line2}</span>
          </h2>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="no-scrollbar -mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2"
          >
            {data.reviews.map((r) => (
              <div
                key={r.name}
                className="glow-card--sm relative flex min-h-64 w-[82%] shrink-0 snap-center flex-col overflow-hidden rounded-2xl p-5"
                style={{
                  border: "1px solid rgba(0, 127, 248, 0.6)",
                  boxShadow:
                    "0 0 0 1px rgba(0, 127, 248, 0.3), 0 -8px 26px -4px rgba(0, 127, 248, 0.6), 0 8px 20px -10px rgba(0, 127, 248, 0.25)",
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 25%, transparent 48%)",
                  }}
                />

                <div className="relative flex items-center justify-between">
                  <Stars />
                  {r.platform === "google" ? (
                    <GoogleG className="h-5 w-5" />
                  ) : (
                    <Icon name="star" className="h-5 w-5 fill-[#00b67a] text-[#00b67a]" />
                  )}
                </div>
                <p className="mt-4 text-base font-bold text-white">{r.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-white">&ldquo;{r.text}&rdquo;</p>
                <p className="mt-auto pt-4 text-xs font-bold uppercase tracking-wide text-hero-blue">{r.tag}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-center gap-1.5">
            {data.reviews.map((r, i) => (
              <span
                key={r.name}
                className={`rounded-full transition-all ${i === activeIndex ? "h-2 w-6 bg-hero-blue" : "h-2 w-2 bg-white/25"}`}
              />
            ))}
          </div>

          <div className="mt-6 space-y-3">
            <button className="card-glare-light relative flex w-full items-center justify-center gap-2 rounded-lg border border-black/10 bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-wide text-hero-blue">
              <GoogleG className="h-5 w-5" />
              {data.googleCta} <span aria-hidden>→</span>
            </button>
            <button className="card-corner-glare relative flex w-full items-center justify-center gap-2 rounded-lg border border-hero-blue/50 bg-[#0a0f1c] px-6 py-3.5 text-xs font-bold uppercase tracking-wide text-white">
              <Icon name="star" className="h-5 w-5 fill-[#00b67a] text-[#00b67a]" />
              {data.trustpilotCta} <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-10 sm:px-6 md:block lg:px-8">
      <BMWStripe size="wide" className="absolute -right-2 -top-2 rotate-6 opacity-90" />

      <div className="relative mx-auto max-w-6xl">
        <h2 className="origin-left scale-y-110 scale-x-90 pt-8 text-4xl font-extrabold uppercase leading-[1.05] tracking-tighter sm:text-5xl">
          <span className="text-white">{line1} </span>
          <span className="text-hero-blue">{line2}</span>
        </h2>

        <div className="mt-6 grid grid-cols-6 gap-3">
          {data.reviews.map((r) => (
            <div
              key={r.name}
              className="glow-card--sm relative flex min-h-72 flex-col overflow-hidden rounded-xl p-5"
              style={{
                border: "1px solid rgba(0, 127, 248, 0.6)",
                boxShadow:
                  "0 0 0 1px rgba(0, 127, 248, 0.3), 0 -8px 26px -4px rgba(0, 127, 248, 0.6), 0 8px 20px -10px rgba(0, 127, 248, 0.25)",
              }}
            >
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 25%, transparent 48%)",
                }}
              />

              <div className="relative flex items-center justify-between">
                <Stars />
                {r.platform === "google" ? (
                  <GoogleG className="h-5 w-5" />
                ) : (
                  <Icon name="star" className="h-5 w-5 fill-[#00b67a] text-[#00b67a]" />
                )}
              </div>
              <p className="mt-4 text-base font-bold text-white">{r.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-white">&ldquo;{r.text}&rdquo;</p>
              <p className="mt-auto pt-4 text-xs font-bold uppercase tracking-wide text-hero-blue">{r.tag}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex justify-center gap-4">
          <button className="card-glare-light relative flex items-center justify-center gap-2 rounded-md border border-black/10 bg-white px-6 py-3 text-sm font-bold text-[#101828] transition hover:-translate-y-0.5">
            <GoogleG className="h-5 w-5" />
            {data.googleCta} <span aria-hidden>→</span>
          </button>
          <button className="card-corner-glare relative flex items-center justify-center gap-2 rounded-md border border-[#00b67a]/50 bg-[#0a0f1c] px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5">
            <Icon name="star" className="h-5 w-5 fill-[#00b67a] text-[#00b67a]" />
            {data.trustpilotCta} <span aria-hidden>→</span>
          </button>
        </div>
      </div>
      </div>
    </section>
  );
}
