"use client";

import { useRef } from "react";
import Image from "next/image";

export default function HomeSec9({ data }) {
  const trackRef = useRef(null);

  function scrollBy(dir) {
    trackRef.current?.scrollBy({ left: dir * 260, behavior: "smooth" });
  }

  const mobileImages = data.images.slice(0, 9);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image src={data.bgImage} alt="" fill className="object-cover" sizes="100vw" />
      </div>

      {/* ===== mobile ===== */}
      <div className="relative px-4 py-8 md:hidden">
        <h2 className="-skew-x-6 origin-left scale-y-115 scale-x-92 text-center text-3xl font-extrabold uppercase leading-[1.1] tracking-tighter text-white">
          <span className="block">Recently Completed</span>
          <span className="block">
            <span className="text-hero-blue">BMW</span>{" "}
            <span className="bg-linear-to-r from-bmw-red to-bmw-violet bg-clip-text text-transparent">Rebuilds</span>
          </span>
        </h2>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {mobileImages.map((img, i) => (
            <div key={i} className="hud-card">
              <div className="hud-card-inner aspect-square">
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="140px" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative mx-auto hidden max-w-6xl px-4 py-8 sm:px-6 md:block lg:px-8 lg:py-10">
        <h2 className="-skew-x-6 origin-left scale-y-115 scale-x-92 text-center text-3xl font-extrabold uppercase tracking-tighter text-white sm:text-4xl">
          Recently Completed{" "}
          <span className="bg-linear-to-r from-bmw-blue via-bmw-violet to-bmw-red bg-clip-text text-transparent">
            BMW
          </span>{" "}
          Rebuilds
        </h2>

        <div className="relative mt-6">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Scroll left"
            className="absolute -left-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:flex lg:hidden"
          >
            ❮
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Scroll right"
            className="absolute -right-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:flex lg:hidden"
          >
            ❯
          </button>

          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-1 pb-2 lg:grid lg:grid-cols-5 lg:grid-rows-2 lg:overflow-visible"
          >
            {data.images.map((img, i) => (
              <div key={i} className="hud-card w-40 shrink-0 snap-start sm:w-48 lg:w-auto">
                <div className="hud-card-inner aspect-square">
                  <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="220px" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
