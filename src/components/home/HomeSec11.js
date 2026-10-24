"use client";

import { useState } from "react";
import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import BMWStripe from "@/components/reusable/BMWStripe";
import ImageLightbox from "@/components/shared/ImageLightbox";

export default function HomeSec11({ data }) {
  const [open, setOpen] = useState(null);
  return (
    <section>
      {/* ===== mobile ===== */}
      <div className="md:hidden">
        {/* Division 1: workshop context. The mobile photo already has the white panel and diagonal stripes
            baked in, so it is used as-is as the background; height follows the text. */}
        <div className="relative overflow-hidden bg-white">
          <div className="absolute inset-y-0 left-[10%] right-[-10%]">
            <Image src={data.mobileImage} alt="Inside the BMW Garage workshop" fill className="object-cover object-left" sizes="100vw" />
          </div>

          <div className="relative px-4 pb-2 pt-1">
            <div className="max-w-[46%] text-[#101828]">
              <h2 className="hp-h2 uppercase">
                <span className="block whitespace-nowrap">Meet The</span>{" "}
                <span className="block">
                  Work<span className="text-hero-blue">Shop</span>
                </span>
              </h2>
              <BMWStripe size="wide" className="mt-2" />
            </div>

            <div className="mt-3 max-w-[40%] space-y-1.5 text-[11px] font-medium leading-snug text-[#101828]">
              {data.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p>{data.note}</p>
            </div>

            <a
              href={data.cta.href}
              className="mt-3 inline-flex items-center gap-1.5 rounded-sm border-2 border-hero-blue bg-hero-blue px-4 py-2 text-[11px] font-bold uppercase text-white transition-colors hover:bg-transparent hover:text-hero-blue"
            >
              {data.cta.label} →
            </a>
          </div>
        </div>

        {/* Division 2: capability cards, 3 columns x 2 rows */}
        <div className="bg-white px-4 py-7">
          <div className="grid grid-cols-3 gap-2">
            {data.strip.map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setOpen({ src: data.cardImage, alt: s.label })}
                aria-label={`View larger: ${s.label}`}
                className="gallery-tile glow-card glow-card--sm relative h-32 cursor-pointer overflow-hidden text-left"
              >
                <Image src={data.cardImage} alt={s.label} fill className="object-cover" sizes="140px" />

                <div className="absolute inset-x-0 bottom-0 flex flex-col justify-center gap-1 border-t border-white/15 bg-white/10 px-1.5 py-1.5 backdrop-blur-lg">
                  <div className="flex items-center gap-1">
                    <Icon name={s.icon} className="h-4 w-4 shrink-0 text-white" />
                    <p className="text-[9px] font-bold uppercase leading-tight tracking-wide text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      {s.label}
                    </p>
                  </div>
                  <BMWStripe size="full" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Division 4: footer tagline + brand mark */}
        <div className="px-4 pb-8">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px flex-1 bg-black/15" />
            <p className="whitespace-nowrap text-[10px] uppercase tracking-widest text-[#101828]">
              {data.footerTagline}
            </p>
            <span className="h-px flex-1 bg-black/15" />
          </div>
          <div className="mt-3 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-black/15" />
            <BMWStripe size="lg" />
            <span className="h-px w-8 bg-black/15" />
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="hidden md:block">
        {/* Division 1: workshop context, bg image only on this upper div */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image src={data.bgImage} alt="Inside the BMW Garage workshop" fill className="object-cover object-left" sizes="100vw" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="max-w-[26%] text-[#101828]">
              <div role="heading" aria-level="2" className="hp-h2 uppercase">
                <span className="block">Meet The</span>{" "}
                <span className="block">
                  Work<span className="text-hero-blue">Shop</span>
                </span>
              </div>

              <div className="body-text mt-4 space-y-3 text-[#101828]">
                {data.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <p className="mt-4 text-sm italic text-[#101828]">{data.note}</p>
            </div>
          </div>
        </div>

        {/* Division 2: capability cards, plain white background */}
        <div className="bg-white">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:grid-cols-6 lg:px-8">
            {data.strip.map((s) => (
              <div key={s.label} className="gallery-tile glow-card relative h-72 sm:h-80">
                <Image src={data.cardImage} alt={s.label} fill className="object-cover" sizes="200px" />

                <div className="absolute inset-x-0 bottom-0 flex min-h-20 flex-col justify-center gap-2 border-t border-white/15 bg-white/10 px-3 py-4 backdrop-blur-lg">
                  <div className="flex items-center gap-2">
                    <Icon name={s.icon} className="h-7 w-7 shrink-0 text-white" />
                    <p className="text-[11px] font-bold uppercase leading-tight tracking-wide text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      {s.label}
                    </p>
                  </div>
                  <BMWStripe size="full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {open && <ImageLightbox img={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
