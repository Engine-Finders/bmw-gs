"use client";

import { useState } from "react";
import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import BMWStripe from "@/components/reusable/BMWStripe";

export default function HomeSec5({ data }) {
  const [line1, line2a, line2b] = data.h2.split("|");
  const [activeIndex, setActiveIndex] = useState(data.engines.length - 1);
  const n = data.engines.length;
  const step = 18;
  const maxShift = (n - 1) * step;

  return (
    <section className="relative overflow-hidden bg-[#f3f6fb] px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-hero-blue/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-bmw-red/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <BMWStripe size="wide" className="mx-auto mb-4" />
          <h2 className="origin-left scale-y-115 scale-x-92 text-3xl font-extrabold tracking-tighter text-[#101828] sm:text-4xl">
            <span className="block">{line1}</span>
            <span className="block">
              {line2a} <span className="text-hero-blue">{line2b}</span>
            </span>
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-[#101828]">{data.description}</p>
        </div>

        {/* ===== mobile: cascading stacked card deck, click any card to expand it ===== */}
        <div className="mt-6 overflow-x-hidden md:hidden">
          {data.engines.map((e, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={e.code}
                role="button"
                tabIndex={0}
                onClick={() => setActiveIndex(i)}
                onKeyDown={(ev) => {
                  if (ev.key === "Enter" || ev.key === " ") {
                    ev.preventDefault();
                    setActiveIndex(i);
                  }
                }}
                className="glass-card relative w-full cursor-pointer overflow-hidden rounded-2xl text-left"
                style={{
                  marginTop: i === 0 ? 0 : -16,
                  marginLeft: isActive ? 0 : i * step,
                  width: isActive ? "100%" : `calc(100% - ${maxShift}px)`,
                  zIndex: isActive ? n + 10 : i + 1,
                }}
              >
                {isActive ? (
                  <div className="p-4">
                    <BMWStripe size="default" className="absolute right-4 top-4" />

                    <div className="flex gap-4">
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-[#eef1f5]">
                        <Image src={e.image} alt={`${e.code} engine`} fill className="object-contain p-1.5" sizes="110px" />
                      </div>
                      <div className="min-w-0 pr-8">
                        <h3 className="text-2xl font-extrabold text-[#101828]">{e.code}</h3>
                        <p className="text-xs font-semibold text-[#101828]">{e.spec}</p>
                        <p className="text-xs text-[#101828]">
                          {e.models} | {e.years}
                        </p>
                      </div>
                    </div>

                    <p className="mt-3 text-sm text-[#101828]">
                      <span className="font-semibold">Common symptom:</span> {e.symptom}
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-3 border-t border-black/5 pt-4">
                      <div>
                        <p className="text-xs text-[#101828]">Typical rebuild cost</p>
                        <p className="text-lg font-extrabold text-emerald-600">{e.cost}</p>
                        <a
                          href={e.href}
                          onClick={(ev) => ev.stopPropagation()}
                          className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-hero-blue"
                        >
                          View Engine →
                        </a>
                      </div>
                      <div>
                        <p className="text-xs text-[#101828]">Turnaround</p>
                        <p className="flex items-center gap-1 text-sm font-semibold text-[#101828]">
                          <Icon name="clock" className="h-4 w-4 text-[#101828]" />
                          {e.turnaround}
                        </p>
                        <a
                          href={e.href}
                          onClick={(ev) => ev.stopPropagation()}
                          className="mt-2 block whitespace-nowrap rounded-sm border-2 border-hero-blue bg-hero-blue px-2 py-2.5 text-center text-[10px] font-bold text-white transition-colors hover:bg-transparent hover:text-hero-blue"
                        >
                          Get a Fixed Price Quote →
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-3">
                    <BMWStripe size="default" className="absolute right-3 top-3" />
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#eef1f5]">
                      <Image src={e.image} alt={`${e.code} engine`} fill className="object-contain p-1" sizes="80px" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-extrabold text-[#101828]">{e.code}</h3>
                      <p className="truncate text-xs font-semibold text-[#101828]">{e.spec}</p>
                      <p className="truncate text-xs text-[#101828]">{e.models}</p>
                      <p className="truncate text-xs text-[#101828]">{e.years}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <a
            href={data.cta.href}
            className="mt-5 block rounded-sm border-2 border-hero-blue px-6 py-3 text-center text-sm font-bold text-hero-blue transition-colors hover:bg-hero-blue hover:text-white"
          >
            {data.cta.label} →
          </a>
        </div>

        {/* ===== desktop: grid of full cards ===== */}
        <div className="mt-6 hidden md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {data.engines.map((e) => (
            <div key={e.code} className="glass-card overflow-hidden rounded-xl">
              <BMWStripe size="full" className="block rounded-t-xl" />

              <div className="relative h-56 w-full overflow-hidden bg-[#eef1f5]">
                <Image src={e.image} alt={`${e.code} engine`} fill className="object-contain p-1" sizes="360px" />
                <div className="absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-white to-transparent" />
              </div>

              <div className="p-4">
                <h3 className="text-xl font-extrabold text-[#101828]">{e.code}</h3>
                <p className="text-xs font-semibold text-[#101828]">{e.spec}</p>
                <p className="mt-0.5 text-xs text-[#101828]">
                  {e.models} | {e.years}
                </p>

                <p className="mt-3 text-sm text-[#101828]">
                  <span className="font-semibold">Common symptom:</span> {e.symptom}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-3">
                  <div>
                    <p className="text-[11px] uppercase text-[#101828]">Typical rebuild cost</p>
                    <p className="text-sm font-extrabold text-hero-blue">{e.cost}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] uppercase text-[#101828]">Turnaround</p>
                    <p className="flex items-center justify-end gap-1 text-xs font-semibold text-[#101828]">
                      <Icon name="clock" className="h-4 w-4" />
                      {e.turnaround}
                    </p>
                  </div>
                </div>

                <a href={e.href} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-hero-blue">
                  View Engine →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 hidden text-center md:block">
          <a
            href={data.cta.href}
            className="inline-block rounded-sm border-2 border-hero-blue px-6 py-3 text-sm font-bold text-hero-blue transition-colors hover:bg-hero-blue hover:text-white"
          >
            {data.cta.label} →
          </a>
        </div>
      </div>
    </section>
  );
}
