"use client";

import { useState } from "react";
import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import BMWStripe from "@/components/reusable/BMWStripe";
import RegLookupForm from "@/components/reusable/RegLookupForm";

function OptionAccent({ className = "" }) {
  return (
    <span className={`mt-1.5 flex items-center gap-1 ${className}`} aria-hidden="true">
      <span className="h-0.5 w-6 bg-hero-blue" />
      <span
        className="h-0.5 w-6"
        style={{ backgroundImage: "repeating-linear-gradient(90deg, var(--color-bmw-red) 0px, var(--color-bmw-red) 3px, transparent 3px, transparent 6px)" }}
      />
    </span>
  );
}

function FaqCard({ item, isOpen, onToggle }) {
  return (
    <div className="rounded-xl border border-black/5 bg-white/80 p-5 shadow-[0_15px_40px_-25px_rgba(16,24,40,0.4)] backdrop-blur-md">
      <button type="button" onClick={onToggle} className="flex w-full items-center gap-3 text-left">
        <span className="flex-1 text-sm font-medium text-[#101828]">{item.q}</span>
        <span
          className={`relative flex h-5 w-5 shrink-0 items-center justify-center transition-transform ${isOpen ? "rotate-45" : ""}`}
          aria-hidden="true"
        >
          <span className="absolute h-4 w-0.5 rounded-full bg-hero-blue" />
          <span className="absolute h-0.5 w-4 rounded-full bg-hero-blue" />
        </span>
      </button>
      {isOpen && <p className="mt-2 text-sm leading-relaxed text-[#101828]">{item.a}</p>}
    </div>
  );
}

export default function Sec11({ data }) {
  const { options, faq, cta } = data;
  const [openIndex, setOpenIndex] = useState(new Set());

  function toggle(i) {
    setOpenIndex((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  return (
    <>
      {/* ============ reconditioned / refurbished / remanufactured ============ */}
      <section className="relative overflow-hidden bg-hero-dark text-white">
        {/* ===== mobile ===== */}
        <div className="px-4 py-7 md:hidden">
          <div className="space-y-3">
            {options.map((o) => (
              <div key={o.titleHighlight} className="glass-card-dark rounded-2xl p-4">
                <div className="flex items-start gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-hero-blue/40 bg-hero-blue/10">
                    <Icon name={o.icon} className="h-7 w-7 text-hero-blue" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-extrabold uppercase leading-tight text-white">{o.titlePre}</p>
                    <p className="text-sm font-extrabold uppercase leading-tight">
                      <span className="text-hero-blue">{o.titleHighlight}</span>
                      <span className="text-white">{o.titlePost}</span>
                    </p>
                    <OptionAccent />
                  </div>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-white">{o.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== desktop ===== */}
        <div className="relative hidden px-4 py-12 sm:px-6 md:block lg:px-8">
          <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-white/10">
            {options.map((o, i) => (
              <div key={o.titleHighlight} className={i === 0 ? "pr-8" : i === options.length - 1 ? "pl-8" : "px-8"}>
                <Icon name={o.icon} className="mx-auto block h-20 w-20 text-hero-blue" />
                <div className="mt-4 flex items-center gap-2">
                  <BMWStripe className="h-5 w-10 shrink-0" />
                  <span className="text-base font-extrabold uppercase leading-tight text-white">{o.titlePre}</span>
                </div>
                <p className="text-base font-extrabold uppercase leading-tight">
                  <span className="text-hero-blue">{o.titleHighlight}</span>
                  <span className="text-white">{o.titlePost}</span>
                </p>
                <OptionAccent />
                <p className="mt-3 text-sm leading-relaxed text-white">{o.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center gap-3 border-t border-white/10 py-3">
          <span className="h-px flex-1 bg-hero-blue/70" />
          <BMWStripe className="h-3 w-7 shrink-0" />
          <span className="h-px flex-1 bg-hero-blue/70" />
        </div>
      </section>

      {/* ============ faq ============ */}
      <section className="relative overflow-hidden bg-[#eef2f7]">
        {/* ===== mobile ===== */}
        <div className="relative px-4 py-7 md:hidden">
          <div className="overflow-hidden">
            <BMWStripe className="float-left mr-2 h-5 w-10 shrink-0" />
            <h2 className="text-lg font-bold uppercase leading-none tracking-tight">
              <span className="text-[#101828]">{faq.kicker} </span>
              <span className="text-hero-blue">{faq.kickerHighlight}</span>
            </h2>
          </div>

          <div className="mt-5 space-y-4">
            {[...faq.faqLeft, ...faq.faqRight].map((item, i) => (
              <FaqCard key={item.q} item={item} isOpen={openIndex.has(i)} onToggle={() => toggle(i)} />
            ))}
          </div>
        </div>

        {/* ===== desktop ===== */}
        <div className="relative hidden px-4 py-10 sm:px-6 md:block lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center gap-2">
              <BMWStripe className="h-6 w-12 shrink-0" />
              <h2 className="text-xl font-bold uppercase leading-none tracking-tight lg:text-2xl">
                <span className="text-[#101828]">{faq.kicker} </span>
                <span className="text-hero-blue">{faq.kickerHighlight}</span>
              </h2>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                {faq.faqLeft.map((item, i) => (
                  <FaqCard key={item.q} item={item} isOpen={openIndex.has(i)} onToggle={() => toggle(i)} />
                ))}
              </div>
              <div className="space-y-4">
                {faq.faqRight.map((item, i) => {
                  const idx = faq.faqLeft.length + i;
                  return <FaqCard key={item.q} item={item} isOpen={openIndex.has(idx)} onToggle={() => toggle(idx)} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ quote cta ============ */}
      <section className="relative overflow-hidden bg-hero-dark text-white">
        {/* ===== mobile ===== */}
        <div className="relative md:hidden">
          <div className="relative h-44 w-full overflow-hidden">
            <Image src={cta.image} alt="BMW parked in dark workshop" fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-linear-to-t from-hero-dark via-hero-dark/10 to-transparent" />
          </div>

          <div className="relative -mt-10 px-4 pb-10">
            <h2 className="text-2xl font-bold uppercase leading-tight tracking-tighter">
              <span className="block text-white">{cta.headlinePre}</span>
              <span className="block text-4xl text-hero-blue">{cta.headlineHighlight}</span>
              <span className="block text-white">{cta.headlinePost}</span>
            </h2>
            <span className="mt-2 block h-0.5 w-20 bg-linear-to-r from-bmw-blue via-white to-bmw-red" />

            <div className="mt-4 space-y-3">
              {cta.features.map((f) => (
                <div key={f.title} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-hero-blue/50">
                    <Icon name={f.icon} className="h-4.5 w-4.5 text-hero-blue" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-extrabold uppercase tracking-wide text-hero-blue">{f.title}</p>
                    <p className="text-[11px] text-white">{f.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-card-dark relative mt-6 overflow-hidden rounded-2xl p-5">
              <p className="text-xs leading-snug text-white">{cta.formIntro}</p>
              <div className="mt-4">
                <RegLookupForm buttonLabel={cta.buttonLabel} stacked />
              </div>
              <div className="mt-4 space-y-2">
                {cta.ticks.map((t) => (
                  <p key={t} className="flex items-center gap-2 text-xs text-white">
                    <Icon name="check" className="h-4 w-4 shrink-0 rounded-full border border-hero-blue text-hero-blue" />
                    {t}
                  </p>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
                <div className="flex min-w-0 flex-1 items-center gap-2.5">
                  <Icon name="phone" className="h-5 w-5 shrink-0 text-hero-blue" />
                  <div className="min-w-0">
                    <p className="truncate text-[11px] font-bold uppercase text-hero-blue">{cta.phone.label}</p>
                    <p className="truncate text-[10px] text-white">{cta.phone.sub}</p>
                  </div>
                </div>
                <span className="h-8 w-px shrink-0 bg-white/15" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-bold text-white">Trustpilot</p>
                  <div className="flex gap-0.5 text-[#00b67a]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon key={i} name="star" className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                  <p className="mt-0.5 text-[9px] text-white">{cta.trustpilot.score}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== desktop ===== */}
        <div className="relative hidden overflow-hidden md:block">
          <div className="absolute inset-0">
            <Image src={cta.image} alt="BMW parked in dark workshop" fill className="object-cover" sizes="100vw" />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to right, rgba(3,6,14,0.75) 0%, rgba(3,6,14,0.55) 45%, transparent 75%)" }}
            />
          </div>

          <div className="relative mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-10 px-4 py-14 sm:px-6 lg:px-8">
            <div>
              <h2 className="text-3xl font-bold uppercase leading-tight tracking-tighter lg:text-4xl">
                <span className="block text-white">{cta.headlinePre}</span>
                <span className="block text-5xl text-hero-blue lg:text-6xl">{cta.headlineHighlight}</span>
                <span className="block text-white">{cta.headlinePost}</span>
              </h2>
              <span className="mt-4 block h-0.5 w-32 bg-linear-to-r from-bmw-blue via-white to-bmw-red" />

              <div className="mt-8 space-y-6">
                {cta.features.map((f) => (
                  <div key={f.title} className="flex items-center gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-hero-blue/50">
                      <Icon name={f.icon} className="h-7 w-7 text-hero-blue" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-lg font-extrabold uppercase tracking-wide text-hero-blue">{f.title}</p>
                      <p className="text-sm text-white">{f.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="relative overflow-hidden rounded-2xl p-8"
              style={{
                background: "rgba(5,12,28,0.96)",
                border: "1px solid rgba(90,170,255,0.35)",
                boxShadow: "0 25px 60px -30px rgba(0,127,248,0.5)",
              }}
            >
              <p className="text-sm leading-relaxed text-white">{cta.formIntro}</p>
              <div className="mt-5">
                <RegLookupForm buttonLabel={cta.buttonLabel} stacked large />
              </div>
              <div className="mt-5 space-y-2">
                {cta.ticks.map((t) => (
                  <p key={t} className="flex items-center gap-2 text-sm text-white">
                    <Icon name="check" className="h-4 w-4 shrink-0 rounded-full border border-hero-blue text-hero-blue" />
                    {t}
                  </p>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-4 border-t border-white/10 pt-5">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <Icon name="phone" className="h-6 w-6 shrink-0 text-hero-blue" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold uppercase text-hero-blue">{cta.phone.label}</p>
                    <p className="truncate text-xs text-white">{cta.phone.sub}</p>
                  </div>
                </div>
                <span className="h-9 w-px shrink-0 bg-white/15" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-white">Trustpilot</p>
                  <div className="flex gap-0.5 text-[#00b67a]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon key={i} name="star" className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="mt-0.5 text-xs text-white">{cta.trustpilot.score}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
