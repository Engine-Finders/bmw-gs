"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/reusable/Icon";
import BMWStripe from "@/components/reusable/BMWStripe";

export default function ModelSec17({ data }) {
  const headlineWords = data.headline.split(" ");
  const mobileLine1 = headlineWords.slice(0, 3).join(" ");
  const mobileLine2 = headlineWords.slice(3).join(" ");
  const [activeTab, setActiveTab] = useState(data.activeTab ?? 0);
  const activeVariants = data.tabVariants[activeTab];
  const label = (v) => (typeof v === "string" ? v : v.label);
  const href = (v) => (typeof v === "string" ? null : v.href);

  return (
    <section className="relative overflow-hidden bg-[#eef2f7]">
      {/* ===== mobile ===== */}
      <div className="relative px-4 py-10 md:hidden">
        <div className="flex items-center gap-1.5">
          <BMWStripe className="h-3 w-6 shrink-0" />
          <p className="whitespace-nowrap text-[9px] font-semibold uppercase leading-none tracking-wide text-[#101828]">{data.kicker}</p>
        </div>

        <h2 className="origin-left scale-y-110 scale-x-90 mt-2 text-2xl font-extrabold uppercase leading-[1.05] tracking-tighter">
          <span className="block whitespace-nowrap text-[#101828]">{mobileLine1}</span>
          <span className="block whitespace-nowrap text-hero-blue">{mobileLine2}</span>
        </h2>

        {/* body style tabs — single row of 4 on mobile */}
        <div className="mt-6 grid grid-cols-4">
          {data.tabs.map((tab, i) =>
            i === activeTab ? (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(i)}
                className="relative flex flex-col items-center gap-1 rounded-md px-1 py-2.5 text-center"
                style={{
                  background: "linear-gradient(135deg, rgba(12,28,65,0.95) 0%, rgba(3,10,25,1) 100%)",
                  border: "1.5px solid rgba(150,210,255,0.8)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9), 0 0 20px rgba(0,130,255,0.5)",
                }}
              >
                <Icon name="car" className="h-5 w-5 shrink-0 text-hero-blue" />
                <span className="text-[9px] font-bold leading-tight text-white">{tab}</span>
              </button>
            ) : (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(i)}
                className="flex flex-col items-center gap-1 rounded-md border border-black/10 bg-white/70 px-1 py-2.5 text-center transition hover:bg-white"
              >
                <Icon name="car" className="h-5 w-5 shrink-0 text-[#101828]" />
                <span className="text-[9px] font-semibold leading-tight text-[#101828]">{tab}</span>
              </button>
            )
          )}
        </div>

        {/* variant grid */}
        <div
          className="relative mt-0 rounded-lg p-4"
          style={{
            background: "linear-gradient(135deg, #0a1330 0%, #050a1c 100%)",
            boxShadow: "0 0 0 1px rgba(90,170,255,0.35), 0 25px 60px -25px rgba(0,127,248,0.4)",
          }}
        >
          <div className="grid grid-cols-4 gap-2">
            {activeVariants.map((v) =>
              href(v) ? (
                <Link
                  key={label(v)}
                  href={href(v)}
                  className="flex items-center justify-center rounded-md border border-white/15 bg-white/5 px-1 py-3 text-center text-[10px] font-bold leading-tight text-white transition-colors hover:border-hero-blue/60 hover:bg-hero-blue/15"
                >
                  {label(v)}
                </Link>
              ) : (
                <span
                  key={label(v)}
                  className="flex items-center justify-center rounded-md border border-white/15 bg-white/5 px-1 py-3 text-center text-[10px] font-bold leading-tight text-white"
                >
                  {label(v)}
                </span>
              )
            )}
          </div>
        </div>

        {/* bottom action cards */}
        <div className="mt-5 space-y-4">
          <div className="flex items-start gap-3 rounded-lg border border-black/10 bg-white/70 p-5">
            <Icon name="info" className="h-9 w-9 shrink-0 text-hero-blue" />
            <p className="text-sm text-[#101828]">
              <span className="block text-base font-extrabold text-[#101828]">{data.notice.title}</span>
              <span className="mt-1 block">
                <a href="#quote" className="inline-flex items-center gap-1 font-semibold text-hero-blue">
                  {data.notice.linkText}
                  <Icon name="link" className="h-3.5 w-3.5" />
                </a>
                <span className="text-[#101828]">{data.notice.rest}</span>
              </span>
            </p>
          </div>

          <a
            href={data.priceCta.href}
            className="relative flex items-center gap-4 rounded-lg p-5"
            style={{
              background: "linear-gradient(135deg, #0a1330 0%, #050a1c 100%)",
              border: "1px solid rgba(90,170,255,0.4)",
              boxShadow: "0 0 30px -8px rgba(0,127,248,0.6)",
            }}
          >
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 overflow-hidden rounded-r-lg">
              <Image src={data.priceCta.image} alt="" fill className="object-cover" sizes="25vw" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, #0a1330 0%, transparent 70%)" }} />
            </div>

            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-white text-base text-white">
              →
            </span>
            <p className="relative max-w-[46%] border-l border-white/20 pl-3 text-sm">
              <span className="block text-sm font-extrabold uppercase text-white">{data.priceCta.title}</span>
              <span className="mt-1 block text-xs text-white">{data.priceCta.body}</span>
            </p>
          </a>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-10 sm:px-6 md:block lg:px-8">
      <div className="relative mx-auto max-w-6xl">
        <div className="flex items-center gap-2">
          <BMWStripe className="h-3.5 w-7" />
          <p className="text-xs font-semibold uppercase leading-none tracking-widest text-[#101828]">{data.kicker}</p>
        </div>

        <h2 className="origin-left scale-y-110 scale-x-90 mt-2 text-2xl font-extrabold uppercase leading-[1.05] tracking-tighter text-[#101828] lg:text-3xl">
          {data.headline}
        </h2>

        {/* body style tabs */}
        <div className="relative mt-6 flex">
          {data.tabs.map((tab, i) =>
            i === activeTab ? (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(i)}
                className="relative z-10 flex h-14 w-82.5 items-center gap-3 pl-6 pr-4 text-sm font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, rgba(12,28,65,0.95) 0%, rgba(3,10,25,1) 100%)",
                  clipPath:
                    "path('M16,0 H284 Q300,0 300,16 V32 C300,46 310,56 326,56 H0 V16 Q0,0 16,0 Z')",
                  border: "1.5px solid rgba(150,210,255,0.8)",
                  borderBottom: "none",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9), 0 0 20px rgba(0,130,255,0.5)",
                }}
              >
                <Icon name="car" className="h-6 w-6 shrink-0 text-hero-blue" />
                {tab}
              </button>
            ) : (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2 rounded-t-xl border border-black/10 bg-white/70 px-5 py-4 text-sm font-semibold text-[#101828] transition hover:bg-white ${
                  i === activeTab + 1 ? "-ml-2" : "ml-2"
                }`}
              >
                <Icon name="car" className="h-6 w-6 shrink-0 text-[#101828]" />
                {tab}
              </button>
            )
          )}
        </div>

        {/* variant grid */}
        <div
          className="relative rounded-2xl rounded-tl-none p-6"
          style={{
            background: "linear-gradient(135deg, #0a1330 0%, #050a1c 100%)",
            boxShadow: "0 0 0 1px rgba(90,170,255,0.35), 0 25px 60px -25px rgba(0,127,248,0.4)",
          }}
        >
          <div className="flex flex-wrap gap-3">
            {activeVariants.map((v) =>
              href(v) ? (
                <Link
                  key={label(v)}
                  href={href(v)}
                  className="rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition-colors hover:border-hero-blue/60 hover:bg-hero-blue/15"
                >
                  {label(v)}
                </Link>
              ) : (
                <span
                  key={label(v)}
                  className="rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white"
                >
                  {label(v)}
                </span>
              )
            )}
          </div>
        </div>

        {/* bottom action cards */}
        <div className="mt-5 grid grid-cols-2 gap-5">
          <div className="flex items-center gap-4 rounded-2xl border border-black/10 bg-white/70 p-6">
            <Icon name="info" className="h-10 w-10 shrink-0 text-hero-blue" />
            <p className="text-sm text-[#101828]">
              <span className="block text-base font-extrabold text-[#101828]">{data.notice.title}</span>
              <span className="mt-1 block">
                <a href="#quote" className="inline-flex items-center gap-1 font-semibold text-hero-blue">
                  {data.notice.linkText}
                  <Icon name="link" className="h-3.5 w-3.5" />
                </a>
                <span className="text-[#101828]">{data.notice.rest}</span>
              </span>
            </p>
          </div>

          <a
            href={data.priceCta.href}
            className="relative flex items-center gap-4 rounded-2xl p-6"
            style={{
              background: "linear-gradient(135deg, #0a1330 0%, #050a1c 100%)",
              border: "1px solid rgba(90,170,255,0.4)",
              boxShadow: "0 0 30px -8px rgba(0,127,248,0.6)",
            }}
          >
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 overflow-hidden rounded-2xl opacity-40">
              <Image src={data.priceCta.image} alt="" fill className="object-cover" sizes="33vw" />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(90deg, #0a1330 0%, transparent 60%)" }}
              />
            </div>

            <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-white text-xl text-white">
              →
            </span>
            <p className="relative max-w-[62%] border-l border-white/20 pl-4 text-sm">
              <span className="block text-base font-extrabold uppercase text-white">{data.priceCta.title}</span>
              <span className="mt-1 block text-white">{data.priceCta.body}</span>
            </p>
          </a>
        </div>
      </div>
      </div>
    </section>
  );
}
