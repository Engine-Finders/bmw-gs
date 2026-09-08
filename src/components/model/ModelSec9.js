"use client";

import { useState } from "react";
import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import BMWStripe from "@/components/reusable/BMWStripe";

export default function ModelSec9({ data }) {
  const [line1, line2] = data.h2.split("|");
  const [reg, setReg] = useState("");

  return (
    <section className="relative mt-10 overflow-hidden bg-[#eef2f7]">
      {/* ===== mobile ===== */}
      <div className="relative md:hidden">
        <div className="relative h-64">
          <Image src={data.imageMobile} alt="BMW registration lookup diagnostics" fill className="object-cover object-left-top" sizes="100vw" />
          <div className="absolute inset-0 bg-linear-to-r from-white/95 via-white/70 to-transparent" />

          <div className="relative max-w-[55%] px-4 pt-6">
            <BMWStripe className="h-3 w-6" />
            <h2 className="origin-left scale-y-110 scale-x-90 mt-2 text-2xl font-extrabold uppercase leading-[1.05] tracking-tighter">
              <span className="block text-[#101828]">{line1}</span>
              <span className="block text-hero-blue">{line2}</span>
            </h2>
            <span className="mt-3 block h-px w-16 bg-hero-blue/50" />
            <p className="mt-3 text-sm text-[#101828]">{data.subhead}</p>
          </div>
        </div>

        <div className="relative px-4 pb-8">
          {/* reg lookup card */}
          <div
            className="relative mt-6 rounded-2xl bg-white/80 p-5 backdrop-blur-2xl"
            style={{
              boxShadow:
                "0 0 0 1px rgba(16,24,40,0.12), inset 0 1px 0 rgba(255,255,255,0.95), 0 12px 30px -10px rgba(16,24,40,0.2), 0 0 20px -6px rgba(255,255,255,0.9)",
            }}
          >
            <div className="flex h-16 overflow-hidden rounded-lg border-2 border-[#101828]/80 bg-white shadow-sm">
              <span className="flex w-14 shrink-0 flex-col items-center justify-center gap-1 bg-[#003399] text-white">
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#ffcc00] text-[8px] leading-none text-[#ffcc00]">★</span>
                <span className="text-[10px] font-extrabold tracking-wide">GB</span>
              </span>
              <input
                type="text"
                value={reg}
                onChange={(e) => setReg(e.target.value.toUpperCase())}
                placeholder="ENTER REG"
                maxLength={8}
                className="min-w-0 flex-1 bg-[#eef1f5] px-3 text-center text-xl font-black tracking-widest text-[#101828] outline-none placeholder:text-[#101828]/40"
              />
            </div>

            <button className="mt-3 flex h-13 w-full items-center justify-center gap-2 rounded-lg bg-linear-to-br from-hero-blue to-hero-blue-dark text-sm font-bold uppercase tracking-wide text-white shadow-[0_10px_25px_-8px_rgba(0,127,248,0.7)]">
              <Icon name="search" className="h-5 w-5" />
              {data.lookupButton}
            </button>

            <div className="mt-3 flex items-start gap-2 border-t border-black/10 pt-3">
              <Icon name="info" className="h-4 w-4 shrink-0 text-hero-blue" />
              <p className="text-xs leading-snug text-[#101828]">{data.apiNote}</p>
            </div>
          </div>

          {/* divider */}
          <div className="relative mt-6 flex items-center">
            <span className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, rgba(0,102,255,0.4))" }} />
            <p className="relative px-4 text-[11px] font-extrabold uppercase tracking-widest text-[#101828]">
              {data.dividerLabel}
              <span
                className="pointer-events-none absolute left-1/2 top-full h-1.5 w-14 -translate-x-1/2 translate-y-2"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(255,255,255,1) 0%, rgba(0,149,255,0.9) 40%, rgba(0,119,255,0.4) 65%, transparent 85%)",
                  boxShadow: "0 0 15px rgba(0,149,255,0.8), 0 0 4px rgba(255,255,255,0.9)",
                }}
              />
            </p>
            <span className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(0,102,255,0.4), transparent)" }} />
          </div>

          {/* browse grid */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            {data.browseCards.map((c, i) => (
              <button
                key={c.label}
                className={`relative flex items-center justify-between gap-2 rounded-xl bg-white/70 px-4 py-4 text-left backdrop-blur-2xl ${i === 4 ? "col-span-2" : ""}`}
                style={{
                  boxShadow: "0 0 0 1px rgba(16,24,40,0.1), inset 0 1px 0 rgba(255,255,255,0.9), 0 6px 18px -8px rgba(16,24,40,0.18)",
                }}
              >
                <span className="flex items-center gap-2">
                  <Icon name={c.icon} className="h-7 w-7 shrink-0 text-hero-blue" />
                  <span className="text-[11px] font-extrabold uppercase tracking-wide text-[#101828]">{c.label}</span>
                </span>
                <span className="text-hero-blue" aria-hidden>
                  ›
                </span>
              </button>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 text-center">
            <Icon name="info" className="h-4 w-4 shrink-0 text-hero-blue" />
            <p className="text-xs text-[#101828]">{data.footerNote}</p>
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 pb-10 pt-16 sm:px-6 md:block lg:px-8">
      <div className="absolute inset-0">
        <Image src={data.image} alt="BMW registration lookup diagnostics" fill className="object-cover object-[80%_10%]" sizes="100vw" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-lg pt-8">
          <BMWStripe className="h-3.5 w-7" />
          <h2 className="origin-left scale-y-110 scale-x-90 mt-3 text-4xl font-extrabold uppercase leading-[1.05] tracking-tighter sm:text-5xl">
            <span className="block text-[#101828]">{line1}</span>
            <span className="block text-hero-blue">{line2}</span>
          </h2>
          <span className="mt-3 block h-px w-16 bg-hero-blue/50" />
          <p className="mt-4 max-w-md text-sm text-[#101828]">{data.subhead}</p>
        </div>

        {/* faint blurred blue blobs so the glass cards below have a whisper of color to refract */}
        <div className="pointer-events-none absolute left-[20%] top-[38%] h-56 w-56 rounded-full bg-hero-blue/12 blur-3xl" />
        <div className="pointer-events-none absolute right-[8%] top-[55%] h-48 w-48 rounded-full bg-hero-blue/10 blur-3xl" />

        {/* reg lookup card */}
        <div
          className="relative mt-10 flex items-center gap-6 overflow-hidden rounded-2xl bg-white/60 px-6 py-6 backdrop-blur-2xl"
          style={{
            boxShadow:
              "0 0 0 1px rgba(16,24,40,0.12), inset 0 1px 0 rgba(255,255,255,0.95), 0 12px 30px -10px rgba(16,24,40,0.2), 0 0 20px -6px rgba(255,255,255,0.9)",
          }}
        >
          <div className="flex h-16 flex-1 overflow-hidden rounded-lg border-2 border-[#101828]/80 bg-white shadow-sm">
            <span className="flex w-14 shrink-0 flex-col items-center justify-center gap-1.5 bg-[#003399] text-white">
              <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#ffcc00] text-[9px] leading-none text-[#ffcc00]">★</span>
              <span className="text-xs font-extrabold tracking-wide">GB</span>
            </span>
            <input
              type="text"
              value={reg}
              onChange={(e) => setReg(e.target.value.toUpperCase())}
              placeholder="ENTER REG"
              maxLength={8}
              className="min-w-0 flex-1 bg-[#eef1f5] px-3 text-center text-2xl font-black tracking-widest text-[#101828] outline-none placeholder:text-[#101828]/40"
            />
          </div>

          <button className="flex h-13 shrink-0 items-center gap-2 rounded-lg bg-linear-to-br from-hero-blue to-hero-blue-dark px-8 text-sm font-bold uppercase tracking-wide text-white shadow-[0_10px_25px_-8px_rgba(0,127,248,0.7)] transition hover:-translate-y-0.5 hover:from-hero-blue-dark hover:to-hero-blue hover:shadow-[0_14px_32px_-8px_rgba(0,127,248,0.85)]">
            <Icon name="search" className="h-5 w-5" />
            {data.lookupButton}
          </button>

          <div className="flex max-w-56 items-start gap-2 border-l border-black/10 pl-6">
            <Icon name="info" className="h-4 w-4 shrink-0 text-hero-blue" />
            <p className="text-xs leading-snug text-[#101828]">{data.apiNote}</p>
          </div>
        </div>

        {/* divider */}
        <div className="relative mt-8 flex items-center">
          <span
            className="h-px flex-1"
            style={{ background: "linear-gradient(90deg, transparent, rgba(0,102,255,0.4))" }}
          />
          <p className="relative px-5 text-xs font-extrabold uppercase tracking-widest text-[#101828]">
            {data.dividerLabel}
            <span
              className="pointer-events-none absolute left-1/2 top-full h-1.5 w-16 -translate-x-1/2 translate-y-2"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(255,255,255,1) 0%, rgba(0,149,255,0.9) 40%, rgba(0,119,255,0.4) 65%, transparent 85%)",
                boxShadow: "0 0 15px rgba(0,149,255,0.8), 0 0 4px rgba(255,255,255,0.9)",
              }}
            />
          </p>
          <span
            className="h-px flex-1"
            style={{ background: "linear-gradient(90deg, rgba(0,102,255,0.4), transparent)" }}
          />
        </div>

        {/* browse grid */}
        <div className="mt-5 grid grid-cols-5 gap-4">
          {data.browseCards.map((c) => (
            <button
              key={c.label}
              className="relative flex items-center justify-between gap-2 rounded-xl bg-white/55 px-4 py-6 text-left backdrop-blur-2xl transition hover:-translate-y-0.5"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(16,24,40,0.1), inset 0 1px 0 rgba(255,255,255,0.9), 0 6px 18px -8px rgba(16,24,40,0.18)",
              }}
            >
              <span className="flex items-center gap-2">
                <Icon name={c.icon} className="h-5 w-5 shrink-0 text-hero-blue" />
                <span className="text-xs font-extrabold uppercase tracking-wide text-[#101828]">{c.label}</span>
              </span>
              <span className="text-hero-blue" aria-hidden>›</span>
            </button>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-center gap-2">
          <Icon name="info" className="h-4 w-4 shrink-0 text-hero-blue" />
          <p className="text-xs text-[#101828]">{data.footerNote}</p>
        </div>
      </div>
      </div>
    </section>
  );
}
