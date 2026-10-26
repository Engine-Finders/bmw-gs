"use client";

import { useState } from "react";
import Image from "next/image";
import ImageLightbox from "@/components/shared/ImageLightbox";
import Link from "next/link";
import Icon from "@/components/reusable/Icon";
import BMWStripe from "@/components/reusable/BMWStripe";

const mobileCardIndices = [0, 1, 2, 3, 4, 5, 6, 9];

export default function ModelSec12({ data }) {
  const [open, setOpen] = useState(null);
  const mobileCards = mobileCardIndices.map((i) => data.cards[i]);

  return (
    <section className="relative overflow-hidden bg-[#eef2f7]">
      {open && <ImageLightbox img={open} onClose={() => setOpen(null)} />}
      {/* ===== mobile ===== */}
      <div className="relative md:hidden">
        <div
          className="pointer-events-none absolute right-0 top-0 h-72 w-72"
          style={{ background: "radial-gradient(ellipse at top right, rgba(66,104,159,0.45) 0%, transparent 70%)" }}
          aria-hidden="true"
        />

        <div className="relative px-4 py-10">
          <h2 className="hp-h2 uppercase">
            <span className="block text-[#101828]">{data.headlinePre}</span>
            <span className="block text-hero-blue">{data.headlineHighlight}</span>
          </h2>
          <BMWStripe className="mt-3 h-3 w-6" />
          <p className="mt-3 text-sm text-[#101828]">{data.description}</p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {mobileCards.map((c, i) => (
              <div key={`${c.model}-${i}`} className="neon-card group relative flex flex-col rounded-xl">
                <div className="relative aspect-[4/3] shrink-0 cursor-pointer overflow-hidden" onClick={() => setOpen({ src: data.image, alt: c.model })}>
                  <Image src={data.image} alt={c.model} fill className="object-cover" sizes="50vw" />
                </div>
                <div className="flex-1 px-3 py-2" style={{ background: "rgba(5,12,28,0.9)" }}>
                  <div className="flex items-center gap-1.5">
                    <Icon name={c.icon} className="h-4 w-4 shrink-0 text-hero-blue" />
                    <p className="text-xs font-extrabold uppercase text-white">
                      {c.href ? <Link href={c.href}>{c.model}</Link> : c.model}
                    </p>
                  </div>
                  <p className="mt-0.5 text-xs leading-tight uppercase tracking-wide text-white">{c.tag}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex justify-center">
            <button className="flex items-center gap-2 rounded-lg border-2 border-hero-blue bg-white/70 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-hero-blue backdrop-blur-md transition hover:bg-hero-blue hover:text-white">
              {data.viewMoreLabel} <span aria-hidden>→</span>
            </button>
          </div>

          <div className="relative mt-5 flex items-center gap-3 overflow-hidden rounded-xl border border-black/10 bg-white/60 px-4 py-3.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-hero-blue text-white">
              <Icon name="camera" className="h-4 w-4" />
            </span>
            <p className="relative z-10 text-xs text-[#101828]">{data.footerNote}</p>

            <div
              className="pointer-events-none absolute bottom-0 right-0 z-0 flex gap-1"
              style={{ height: "40px", transform: "skewX(-25deg)", transformOrigin: "bottom right" }}
              aria-hidden="true"
            >
              <span className="h-full w-3" style={{ background: "var(--color-bmw-blue)" }} />
              <span className="h-full w-3" style={{ background: "var(--color-bmw-violet)" }} />
              <span className="h-full w-3" style={{ background: "var(--color-bmw-red)" }} />
            </div>
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-10 sm:px-6 md:block lg:px-8">
      <div
        className="pointer-events-none absolute right-0 top-0 h-96 w-xl"
        style={{ background: "radial-gradient(ellipse at top right, rgba(66,104,159,0.55) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/4 top-0 h-72 w-72 rounded-full bg-hero-blue/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* header */}
        <div className="max-w-xl">
          <div role="heading" aria-level="2" className="hp-h2 uppercase">
            <span className="block whitespace-nowrap text-[#101828]">{data.headlinePre}</span>
            <span className="block whitespace-nowrap text-hero-blue">{data.headlineHighlight}</span>
          </div>
          <p className="body-text mt-3 text-[#101828]">{data.description}</p>
        </div>

        {/* 6x2 card grid */}
        <div className="mt-5 grid grid-cols-6 gap-4">
          {data.cards.map((c, i) => (
            <div key={`${c.model}-${i}`} className="neon-card group relative flex flex-col rounded-xl transition-transform duration-300 hover:-translate-y-1">
              <div className="relative aspect-square shrink-0 overflow-hidden">
                <Image src={data.image} alt={c.model} fill className="object-cover transition-transform duration-500 ease-out group-hover:scale-110" sizes="16vw" />
              </div>
              <div className="flex-1 px-3 py-2.5 backdrop-blur-md" style={{ background: "rgba(5,12,28,0.9)" }}>
                <p className="truncate text-sm font-extrabold uppercase text-white">
                  {c.href ? <Link href={c.href}>{c.model}</Link> : c.model}
                </p>
                <div className="mt-1 flex items-center gap-1.5">
                  <Icon name={c.icon} className="h-3.5 w-3.5 shrink-0 text-white" />
                  <p className="text-xs uppercase tracking-wide text-white">{c.tag}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
