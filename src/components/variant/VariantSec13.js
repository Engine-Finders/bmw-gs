"use client";

import { useState } from "react";
import Icon from "@/components/reusable/Icon";
import useLeadForm, { LeadStatus } from "@/components/reusable/useLeadForm";
import BMWStripe from "@/components/reusable/BMWStripe";

function FaqCard({ item, isOpen, onToggle, compact = false }) {
  return (
    <div className={`glass-card rounded-xl ${compact ? "p-3.5" : "p-5"}`}>
      <button type="button" onClick={onToggle} className="flex w-full items-start gap-3 text-left">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-hero-blue text-sm font-extrabold text-white">
          ?
        </span>
        <span className="origin-left scale-y-115 flex-1 text-sm font-extrabold text-[#101828]">{item.q}</span>
        <Icon
          name="chevron-down"
          className={`h-4 w-4 shrink-0 text-[#101828] transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && <p className="ml-10 mt-2 text-sm leading-relaxed text-[#101828]">{item.a}</p>}
    </div>
  );
}

function Field({ name, label, placeholder, type = "text", compact = false }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-white">
        {label} <span className="text-bmw-red">*</span>
      </span>
      <input name={name} required
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-lg border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/40 outline-none focus:border-hero-blue ${
          compact ? "mt-1.5 h-11" : "mt-2 h-13"
        }`}
      />
    </label>
  );
}

export default function VariantSec13({ data }) {
  const [openIndex, setOpenIndex] = useState(new Set());

  function toggle(i) {
    setOpenIndex((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  const lead = useLeadForm();
  const handleSubmit = lead.handleSubmit;

  const [formHighlightWord1, ...formHighlightRestWords] = data.form.headlineHighlight.split(" ");
  const formMobileLine2 = formHighlightRestWords.join(" ");

  return (
    <section id="quote-form" className="relative scroll-mt-6 overflow-hidden bg-[#eef2f7]">
      {/* ===== mobile ===== */}
      <div className="relative px-4 py-7 md:hidden">
        <div className="flex items-center gap-2">
          <BMWStripe className="h-4 w-8 shrink-0" />
          <h2 className="hp-h2 uppercase">
            <span className="text-[#101828]">{data.kicker} </span>
            <span className="text-hero-blue">{data.kickerHighlight}</span>
          </h2>
        </div>

        <div className="mt-4 space-y-3">
          {[...data.faqLeft, ...data.faqRight].map((item, i) => (
            <FaqCard key={item.q} item={item} isOpen={openIndex.has(i)} onToggle={() => toggle(i)} compact />
          ))}
        </div>

        {/* quote form */}
        <form
          onSubmit={handleSubmit}
          className="relative mt-6 overflow-hidden rounded-2xl p-4"
          style={{
            background: "linear-gradient(135deg, #070d1f 0%, #030611 100%)",
            boxShadow: "0 0 0 1px rgba(90,170,255,0.3), 0 25px 60px -20px rgba(0,127,248,0.4)",
          }}
        >
          <BMWStripe className="absolute right-4 top-4 h-11 w-22" />

          <h3 className="hp-h3 max-w-[82%] uppercase">
            <span className="block">
              <span className="text-white">{data.form.headlinePre} </span>
              <span className="text-hero-blue">{formHighlightWord1}</span>
            </span>
            <span className="block">
              <span className="text-hero-blue">{formMobileLine2}</span> <span className="text-white">{data.form.headlinePost}</span>
            </span>
          </h3>

          <div className="mt-3 space-y-2.5">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wide text-white">
                {data.form.fields.reg.label} <span className="text-bmw-red">*</span>
              </span>
              <div className="mt-1.5 flex h-11 overflow-hidden rounded-lg border border-white/15 bg-white/5">
                <span className="flex w-14 shrink-0 items-center justify-center bg-hero-blue text-sm font-extrabold text-white">
                  GB
                </span>
                <input
                  name="vehicle_vrm" required maxLength={8} type="text"
                  placeholder={data.form.fields.reg.placeholder}
                  className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white placeholder:text-white/40 outline-none"
                />
              </div>
            </label>

            <Field name="postcode" label={data.form.fields.postcode.label} placeholder={data.form.fields.postcode.placeholder} compact />
            <Field name="name" label={data.form.fields.name.label} placeholder={data.form.fields.name.placeholder} compact />
            <Field name="number" label={data.form.fields.phone.label} placeholder={data.form.fields.phone.placeholder} type="tel" compact />
            <Field name="email" label={data.form.fields.email.label} placeholder={data.form.fields.email.placeholder} type="email" compact />

            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wide text-white">
                {data.form.fields.enquiry.label} <span className="text-bmw-red">*</span>
              </span>
              <div className="relative mt-1.5">
                <select name="description" required className="h-11 w-full appearance-none rounded-lg border border-white/15 bg-white/5 px-4 pr-10 text-sm text-white outline-none">
                  <option value="">{data.form.fields.enquiry.placeholder}</option>
                  {["Engine Failure", "Replacement Needed", "General Enquiry"].map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
                <Icon
                  name="chevron-down"
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white"
                />
              </div>
            </label>
          </div>

          <button
            type="submit" disabled={lead.status === "loading"}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-extrabold uppercase tracking-wide text-white transition hover:brightness-110"
            style={{
              background: "linear-gradient(135deg, #0052cc 0%, #0037a5 100%)",
              boxShadow: "0 8px 20px rgba(0,82,204,0.4)",
            }}
          >
            {data.form.submitLabel} <span aria-hidden>→</span>
          </button>
<LeadStatus lead={lead} />

          <p className="mt-3 flex items-center justify-center gap-2 text-center text-xs text-white">
            <Icon name="shield-check" className="h-4 w-4 shrink-0 text-hero-blue" />
            {data.form.guarantee}
          </p>
        </form>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-10 sm:px-6 md:block lg:px-8">
      <div className="relative mx-auto max-w-6xl">
        <div className="flex items-center gap-2">
          <BMWStripe className="h-6 w-11 shrink-0" />
          <h2 className="hp-h2 uppercase">
            <span className="text-[#101828]">{data.kicker} </span>
            <span className="text-hero-blue">{data.kickerHighlight}</span>
          </h2>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4">
          <div className="space-y-4">
            {data.faqLeft.map((item, i) => (
              <FaqCard key={item.q} item={item} isOpen={openIndex.has(i)} onToggle={() => toggle(i)} />
            ))}
          </div>
          <div className="space-y-4">
            {data.faqRight.map((item, i) => {
              const idx = data.faqLeft.length + i;
              return <FaqCard key={item.q} item={item} isOpen={openIndex.has(idx)} onToggle={() => toggle(idx)} />;
            })}
          </div>
        </div>

        {/* quote form */}
        <form
          onSubmit={handleSubmit}
          className="relative mt-8 overflow-hidden rounded-2xl p-8"
          style={{
            background: "linear-gradient(135deg, #070d1f 0%, #030611 100%)",
            boxShadow: "0 0 0 1px rgba(90,170,255,0.3), 0 25px 60px -20px rgba(0,127,248,0.4)",
          }}
        >
          <BMWStripe className="absolute right-6 top-6 h-8 w-16" />

          <h3 className="hp-h3 whitespace-nowrap uppercase text-white">
            {data.form.headlinePre} <span className="text-hero-blue">{data.form.headlineHighlight}</span>{" "}
            {data.form.headlinePost}
          </h3>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wide text-white">
                {data.form.fields.reg.label} <span className="text-bmw-red">*</span>
              </span>
              <div className="mt-2 flex h-13 overflow-hidden rounded-lg border border-white/15 bg-white/5">
                <span className="flex w-14 shrink-0 items-center justify-center bg-hero-blue text-sm font-extrabold text-white">
                  GB
                </span>
                <input
                  name="vehicle_vrm" required maxLength={8} type="text"
                  placeholder={data.form.fields.reg.placeholder}
                  className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white placeholder:text-white/40 outline-none"
                />
              </div>
            </label>

            <Field name="postcode" label={data.form.fields.postcode.label} placeholder={data.form.fields.postcode.placeholder} />
            <Field name="name" label={data.form.fields.name.label} placeholder={data.form.fields.name.placeholder} />
            <Field name="number" label={data.form.fields.phone.label} placeholder={data.form.fields.phone.placeholder} type="tel" />
            <Field name="email" label={data.form.fields.email.label} placeholder={data.form.fields.email.placeholder} type="email" />

            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wide text-white">
                {data.form.fields.enquiry.label} <span className="text-bmw-red">*</span>
              </span>
              <div className="relative mt-2">
                <select name="description" required className="h-13 w-full appearance-none rounded-lg border border-white/15 bg-white/5 px-4 pr-10 text-sm text-white outline-none">
                  <option value="">{data.form.fields.enquiry.placeholder}</option>
                  {["Engine Failure", "Replacement Needed", "General Enquiry"].map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
                <Icon
                  name="chevron-down"
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white"
                />
              </div>
            </label>
          </div>

          <button
            type="submit" disabled={lead.status === "loading"}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg py-4 text-sm font-extrabold uppercase tracking-wide text-white transition hover:brightness-110"
            style={{
              background: "linear-gradient(135deg, #0052cc 0%, #0037a5 100%)",
              boxShadow: "0 8px 20px rgba(0,82,204,0.4)",
            }}
          >
            {data.form.submitLabel} <span aria-hidden>→</span>
          </button>
<LeadStatus lead={lead} />

          <p className="mt-4 flex items-center justify-center gap-2 text-xs text-white">
            <Icon name="shield-check" className="h-4 w-4 shrink-0 text-hero-blue" />
            {data.form.guarantee}
          </p>
        </form>
      </div>
      </div>
    </section>
  );
}
