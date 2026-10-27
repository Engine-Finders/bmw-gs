"use client";

import { useRef, useState } from "react";
import Icon from "@/components/reusable/Icon";
import BMWStripe from "@/components/reusable/BMWStripe";
import { GoogleG, TrustpilotMark } from "@/components/reusable/BrandLogos";
import Link from "next/link";

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Icon key={i} name="star" className="h-4 w-4 fill-[#f5c518] text-[#f5c518]" />
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
          <h2 className="hp-h2 uppercase">
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
                    <TrustpilotMark className="h-5 w-5" />
                  )}
                </div>
                <p className="mt-4 text-base font-bold text-white">{r.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-white">&ldquo;{r.text}&rdquo;</p>
                <p className="mt-auto pt-4 text-sm font-semibold text-hero-blue">{r.tag}</p>
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
            <Link href="/our-reviews" className="card-glare-light relative flex w-full items-center justify-center gap-2 rounded-lg border border-black/10 bg-white px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-hero-blue transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg">
              Check All Our Reviews <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-10 sm:px-6 md:block lg:px-8">
      <BMWStripe size="wide" className="absolute -right-2 -top-2 rotate-6 opacity-90" />

      <div className="relative mx-auto max-w-6xl">
        <div role="heading" aria-level="2" className="hp-h2 pt-8 uppercase">
          <span className="text-white">{line1} </span>
          <span className="text-hero-blue">{line2}</span>
        </div>

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
                  <TrustpilotMark className="h-5 w-5" />
                )}
              </div>
              <p className="mt-4 text-base font-bold text-white">{r.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-white">&ldquo;{r.text}&rdquo;</p>
              <p className="mt-auto pt-4 text-sm font-semibold text-hero-blue">{r.tag}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex justify-center gap-4">
          <Link href="/our-reviews" className="card-glare-light relative flex items-center justify-center gap-2 rounded-md border border-black/10 bg-white px-6 py-3 text-sm font-bold text-[#101828] transition hover:-translate-y-0.5">
            Check All Our Reviews <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
      </div>
    </section>
  );
}
