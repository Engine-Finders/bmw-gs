"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import BMWStripe from "@/components/reusable/BMWStripe";
import RegLookupForm from "@/components/reusable/RegLookupForm";
import { GoogleG, TrustpilotMark } from "@/components/reusable/BrandLogos";
import Link from "next/link";

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="star" className="h-3.5 w-3.5 fill-[#f5c518] text-[#f5c518]" />
      ))}
    </div>
  );
}

export default function Sec6({ data }) {
  const { reviews, coverage, whyChoose } = data;
  const whyChooseWords = [
    ...whyChoose.titlePre.trim().split(/\s+/).map((w) => ({ w, highlight: false })),
    ...whyChoose.titleHighlight.trim().split(/\s+/).map((w) => ({ w, highlight: true })),
  ];
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;
    const ratio = el.scrollLeft / maxScroll;
    setActiveIndex(Math.round(ratio * (reviews.items.length - 1)));
  }

  return (
    <>
      {/* ============ reviews ============ */}
      <section className="relative overflow-hidden bg-white">
        {/* ===== mobile ===== */}
        <div className="relative md:hidden">
          <div className="relative px-4 pb-8 pt-8">
          <div className="overflow-hidden">
            <BMWStripe className="float-left mr-2 h-6 w-12 shrink-0" />
            <h2 className="hp-h2 uppercase">
              <span className="text-[#101828]">{reviews.titlePre}</span>
              <span className="text-hero-blue">{reviews.titleHighlight}</span>
            </h2>
          </div>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="no-scrollbar -mx-4 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2"
          >
            {reviews.items.map((r) => (
              <div
                key={r.name}
                className="glow-card--sm relative flex min-h-56 w-[82%] shrink-0 snap-center flex-col overflow-hidden rounded-2xl p-5"
                style={{ background: "rgba(5,12,28,0.95)", border: "1px solid rgba(0,127,248,0.35)", boxShadow: "0 15px 35px -20px rgba(0,0,0,0.5)" }}
              >
                <div className="relative flex items-center justify-between">
                  <Stars />
                  {r.platform === "google" ? <GoogleG className="h-5 w-5" /> : <TrustpilotMark className="h-5 w-5" />}
                </div>
                <p className="mt-3 text-base font-bold text-white">{r.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-white">&ldquo;{r.text}&rdquo;</p>
                <p className="mt-auto pt-3 text-xs font-bold uppercase tracking-wide text-hero-blue">{r.tag}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-center gap-1.5">
            {reviews.items.map((r, i) => (
              <span
                key={r.name}
                className={`rounded-full transition-all ${i === activeIndex ? "h-2 w-6 bg-hero-blue" : "h-2 w-2 bg-[#101828]/15"}`}
              />
            ))}
          </div>

          <div className="mt-6 space-y-3">
            <Link href="/our-reviews" className="relative flex w-full items-center justify-center gap-2 rounded-lg border border-black/10 bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-wide text-[#101828] shadow-sm transition hover:-translate-y-0.5">
              Check All Our Reviews <span aria-hidden>→</span>
            </Link>
          </div>
          </div>
        </div>

        {/* ===== desktop ===== */}
        <div className="relative hidden px-4 py-10 sm:px-6 md:block lg:px-8">
          <div className="relative mx-auto max-w-6xl">
            <div className="flex items-center gap-3">
              <BMWStripe className="h-7 w-14 shrink-0" />
              <h2 className="hp-h2 uppercase">
                <span className="text-[#101828]">{reviews.titlePre}</span>
                <span className="text-hero-blue">{reviews.titleHighlight}</span>
              </h2>
            </div>

            <div className="relative mt-6 px-11">
            <button
              type="button"
              aria-label="Previous reviews"
              className="absolute left-0 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-[#101828] shadow-lg transition hover:bg-hero-blue hover:text-white"
            >
              <Icon name="chevron-left" className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next reviews"
              className="absolute right-0 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-[#101828] shadow-lg transition hover:bg-hero-blue hover:text-white"
            >
              <Icon name="chevron-right" className="h-4 w-4" />
            </button>
            <div className="grid grid-cols-6 gap-3">
              {reviews.items.map((r) => (
                <div
                  key={r.name}
                  className="glow-card--sm relative flex min-h-64 flex-col overflow-hidden rounded-xl p-4"
                  style={{ background: "rgba(5,12,28,0.95)", border: "1px solid rgba(0,127,248,0.35)", boxShadow: "0 15px 35px -20px rgba(0,0,0,0.5)" }}
                >
                  <div className="relative flex items-center justify-between">
                    <Stars />
                    {r.platform === "google" ? <GoogleG className="h-4 w-4" /> : <TrustpilotMark className="h-4 w-4" />}
                  </div>
                  <p className="mt-3 text-sm font-bold text-white">{r.name}</p>
                  <p className="mt-2 text-xs leading-relaxed text-white">&ldquo;{r.text}&rdquo;</p>
                  <p className="mt-auto pt-3 text-[11px] font-bold uppercase tracking-wide text-hero-blue">{r.tag}</p>
                </div>
              ))}
            </div>
            </div>

            <div className="mt-5 flex justify-center gap-4">
              <Link href="/our-reviews" className="relative flex items-center justify-center gap-2 rounded-md border border-black/10 bg-white px-6 py-3 text-sm font-bold text-[#101828] shadow-sm transition hover:-translate-y-0.5">
                Check All Our Reviews <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ coverage banner ============ */}
      <section
        className="relative z-10 border-y border-black/10 bg-white"
        style={{ boxShadow: "0 25px 45px -15px rgba(16,24,40,0.55), 0 -25px 45px -15px rgba(16,24,40,0.55)" }}
      >
        {/* ===== mobile ===== */}
        <div className="relative px-4 py-6 md:hidden">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-black/10 bg-white shadow-sm">
              <Icon name={coverage.icon} className="h-6 w-6 text-hero-blue" />
            </span>
            <h2 className="hp-h2 uppercase">
              <span className="block text-[#101828]">{coverage.titlePre}</span>
              <span className="block text-hero-blue">{coverage.titleHighlight}</span>
            </h2>
          </div>

          <p className="mt-3 text-xs text-[#101828]">{coverage.body}</p>

          <div className="mt-4">
            <RegLookupForm buttonLabel={coverage.buttonLabel} stacked hideButton />
            <button
              type="button"
              className="mt-3 flex h-11 w-full items-center justify-center rounded-sm border-2 border-hero-blue bg-hero-blue text-sm font-bold text-white transition-colors hover:bg-white hover:text-hero-blue"
            >
              {coverage.buttonLabel} →
            </button>
          </div>

          <div className="mt-3 flex items-center justify-center gap-3">
            {coverage.ticks.map((t) => (
              <span key={t} className="flex items-center gap-1.5 whitespace-nowrap text-xs font-medium text-[#101828]">
                <Icon name="check" className="h-4 w-4 shrink-0 rounded-full border border-hero-blue text-hero-blue" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ===== desktop ===== */}
        <div className="relative hidden overflow-hidden md:block">
          <div className="absolute inset-0">
            <Image src={coverage.image} alt="BMW front grille" fill className="object-cover object-right" sizes="100vw" />
            <div className="absolute inset-0 bg-linear-to-r from-white via-white/95 to-transparent" />
          </div>

          <div className="relative mx-auto flex max-w-6xl items-center gap-8 px-4 py-10 sm:px-6 lg:px-8">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-white shadow-sm">
              <Icon name={coverage.icon} className="h-8 w-8 text-hero-blue" />
            </span>

            <div className="shrink-0 border-r border-black/10 pr-8">
              <h2 className="hp-h2 uppercase">
                <span className="block text-[#101828]">{coverage.titlePre}</span>
                <span className="block text-hero-blue">{coverage.titleHighlight}</span>
              </h2>
              <p className="mt-2 max-w-xs text-sm text-[#101828]">{coverage.body}</p>
            </div>

            <div className="max-w-md flex-1">
              <RegLookupForm buttonLabel={coverage.buttonLabel} row />
              <div className="mt-3 flex items-center gap-4">
                {coverage.ticks.map((t, i) => (
                  <span key={t} className="flex items-center gap-3 text-sm font-medium text-[#101828]">
                    {i > 0 && <span className="h-1 w-1 rounded-full bg-[#101828]/30" aria-hidden="true" />}
                    <span className="flex items-center gap-1.5">
                      <Icon name="check" className="h-4 w-4 shrink-0 rounded-full border border-hero-blue text-hero-blue" />
                      {t}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ why choose us ============ */}
      <section className="relative overflow-hidden bg-white">
        {/* ===== mobile ===== */}
        <div className="relative px-4 py-7 md:hidden">
          <div className="relative overflow-hidden pr-9">
            <h2 className="hp-h2 uppercase">
              <span className="block text-[#101828]">
                {whyChooseWords.slice(0, 3).map((t, i) => (
                  <span key={i} className={t.highlight ? "text-hero-blue" : undefined}>
                    {t.w}
                    {i < 2 ? " " : ""}
                  </span>
                ))}
              </span>
              <span className="block">
                {whyChooseWords.slice(3).map((t, i, arr) => (
                  <span key={i} className={t.highlight ? "text-hero-blue" : "text-[#101828]"}>
                    {t.w}
                    {i < arr.length - 1 ? " " : ""}
                  </span>
                ))}
              </span>
            </h2>
            <div
              className="pointer-events-none absolute inset-y-0 right-0 flex gap-1"
              style={{ transform: "skewX(-20deg)", transformOrigin: "top right" }}
              aria-hidden="true"
            >
              <span className="h-full w-2.5" style={{ background: "var(--color-bmw-blue)" }} />
              <span className="h-full w-2.5" style={{ background: "var(--color-bmw-violet)" }} />
              <span className="h-full w-2.5" style={{ background: "var(--color-bmw-red)" }} />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-3.5">
            {whyChoose.items.map((item) => (
              <div key={item} className="flex items-start gap-2">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-hero-blue text-hero-blue" />
                <p className="text-xs leading-snug text-[#101828]">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== desktop ===== */}
        <div className="relative hidden px-4 py-10 sm:px-6 md:block lg:px-8">
          <div className="relative mx-auto max-w-6xl">
            <div className="flex items-center gap-3">
              <BMWStripe className="h-7 w-14 shrink-0" />
              <h2 className="hp-h2 uppercase">
                <span className="text-[#101828]">{whyChoose.titlePre}</span>
                <span className="text-hero-blue">{whyChoose.titleHighlight}</span>
              </h2>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-x-10 gap-y-6">
              {whyChoose.items.map((item) => (
                <div key={item} className="flex min-w-0 items-start gap-3">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 rounded-full border border-hero-blue text-hero-blue" />
                  <p className="min-w-0 text-sm leading-snug text-[#101828]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
