"use client";

import { useState } from "react";
import Image from "next/image";
import Icon from "@/components/reusable/Icon";

export default function HomeSec8({ data }) {
  const [line1, line2, line3] = data.h2.split("|");
  const [line3a, line3b] = line3.split(/\s+(?=\S+$)/);
  const [activeStage, setActiveStage] = useState(null);

  return (
    <section className="relative overflow-hidden">
      {/* ===== mobile ===== */}
      <div className="relative overflow-hidden md:hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black" />
        </div>

        <div className="relative px-4 py-8">
          {/* centered title */}
          <h2 className="hp-h2 text-center uppercase text-white">
            <span className="block">{line1}</span>
            <span className="block whitespace-nowrap">
              {line2} {line3a}{" "}
              <span className="bg-linear-to-r from-bmw-red to-bmw-blue bg-clip-text text-transparent">{line3b}</span>
            </span>
          </h2>

          {/* horizontal scroll: each step's numbered badge and photo card scroll together as one
              unit, so the badge row always stays in sync with the cards — no scrollbar/buttons,
              swipe only. ~3 full cards + a sliver of the 4th visible at once. */}
          <div className="no-scrollbar mt-5 -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4">
            {data.stages.map((s) => (
              <div key={s.step} className="flex w-[30%] shrink-0 snap-start flex-col items-center gap-2">
                <TimelineBadge step={s.step} active={s.step === 1} size="sm" />
                <button
                  type="button"
                  onClick={() => setActiveStage(s)}
                  aria-label={`View full image for ${s.label}`}
                  className={`relative aspect-3/4 w-full overflow-hidden rounded-md ${
                    s.step === 1 ? "ring-2 ring-hero-blue" : "ring-1 ring-white/20"
                  } shadow-lg`}
                >
                  <Image src={s.image} alt={s.label} fill className="object-cover" sizes="120px" />
                </button>
                <span className="text-center text-[9px] leading-tight text-white">{s.label}</span>
              </div>
            ))}
          </div>

          {/* trust badges */}
          <div className="mt-6 grid grid-cols-3 gap-2">
            {data.highlights.map((h) => (
              <div key={h.label} className="glow-card overflow-hidden p-2 text-center">
                <Icon name={h.icon} className="mx-auto mb-1.5 h-6 w-6 text-white" />
                <p className="text-[9px] leading-tight text-white">{h.label}</p>
                <span className="mt-2 block h-px w-full bg-hero-blue/60" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden overflow-hidden md:block">
      <div className="absolute inset-0">
        <Image src={data.bgImage} alt="" fill className="object-cover" sizes="100vw" />
      </div>

      <div className="relative flex flex-col gap-8 py-8 lg:flex-row lg:items-start lg:gap-6 lg:py-10">
        {/* left: header + guarantee cards */}
        <div className="shrink-0 px-4 sm:px-6 lg:w-[34%] lg:pl-8">
          <h2 className="hp-h2 uppercase text-[#101828]">
            <span className="block">{line1}</span>
            <span className="block">{line2}</span>
            <span className="block">
              {line3a}{" "}
              <span className="bg-linear-to-r from-bmw-red to-bmw-blue bg-clip-text text-transparent">{line3b}</span>
            </span>
          </h2>

          <div className="mt-7 grid grid-cols-3 gap-3">
            {data.highlights.map((h) => (
              <div key={h.label} className="glow-card overflow-hidden p-3 sm:p-4">
                <Icon name={h.icon} className="mb-4 h-9 w-9 text-white sm:mb-6" />
                <p className="text-xs text-white sm:text-sm">{h.label}</p>
                <span className="mt-3 block h-px w-full bg-hero-blue/60 sm:mt-4" />
              </div>
            ))}
          </div>
        </div>

        {/* right: step timeline + portrait cards, wall-to-wall to the viewport edge */}
        <div className="min-w-0 flex-1 pl-4 sm:pl-6 lg:pl-0">
          <div className="relative">
            <div className="absolute left-5 right-4 top-5 border-t-2 border-dashed border-white/20 lg:right-0" />
            <div className="relative flex">
              {data.stages.map((s) => (
                <div key={s.step} className="flex min-w-0 flex-1 flex-col items-center text-center">
                  <TimelineBadge step={s.step} active={s.step === 1} />
                  <span className="mt-2 px-0.5 text-[10px] leading-tight text-white sm:text-[11px]">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-1 pr-4 lg:pr-0">
              {data.stages.map((s) => (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setActiveStage(s)}
                  aria-label={`View full image for ${s.label}`}
                  className={`relative h-40 min-w-0 flex-1 overflow-hidden rounded-md sm:h-52 lg:h-64 ${
                    s.step === 1 ? "ring-2 ring-hero-blue" : "ring-1 ring-white/15"
                  }`}
                >
                  <Image src={s.image} alt={s.label} fill className="object-cover" sizes="150px" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* lightbox: full view of the clicked stage image, shared by both mobile and desktop cards */}
      {activeStage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setActiveStage(null)}
        >
          <button
            type="button"
            onClick={() => setActiveStage(null)}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/50 text-xl text-white transition-colors hover:bg-black/70"
          >
            ✕
          </button>

          <div
            className="relative h-full max-h-[85vh] w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={activeStage.image} alt={activeStage.label} fill className="object-contain" sizes="90vw" />
          </div>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-sm font-semibold uppercase tracking-wide text-white">
            {activeStage.step}. {activeStage.label}
          </p>
        </div>
      )}
    </section>
  );
}

function TimelineBadge({ step, active, size = "lg" }) {
  const outer = size === "sm" ? "h-10 w-10" : "h-14 w-14";
  const inner = size === "sm" ? "h-6 w-6" : "h-8 w-8";
  return (
    <div className={`relative flex shrink-0 items-center justify-center ${outer}`}>
      {/* soft radial glow */}
      <div className="absolute inset-0 rounded-full bg-cyan-400/25 blur-md" />
      {/* segmented HUD outer ring */}
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-300/40" />
      <div className="absolute inset-[3px] rounded-full border border-cyan-300/60" />
      {/* lens flare accent on the active/first badge */}
      {active && (
        <div className="absolute -right-0.5 top-0 h-3 w-3 rounded-full bg-white blur-[2px]" />
      )}
      {/* solid navy core */}
      <div className={`relative z-10 flex items-center justify-center rounded-full bg-[#050a16] text-xs font-bold text-white ring-1 ring-cyan-300/70 ${inner}`}>
        {step}
      </div>
    </div>
  );
}
