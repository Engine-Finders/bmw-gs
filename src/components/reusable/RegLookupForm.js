"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { lookupVrm, buildQuoteUrl } from "@/lib/vrmLookup";
import UnionJack from "@/components/reusable/UnionJack";

export default function RegLookupForm({
  buttonLabel = "Find My BMW",
  left = null,
  compact = false,
  row = false,
  stacked = false,
  large = false,
  compactButton = false,
  hideArrow = false,
  hideButton = false,
  tight = false,
}) {
  const [reg, setReg] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const details = await lookupVrm(reg);
      router.push(buildQuoteUrl(details));
    } catch (err) {
      setError(err.message || "Please enter a valid UK registration number.");
    } finally {
      setLoading(false);
    }
  }

  const buttonHeight = row ? "h-14" : stacked ? "h-9" : compact ? "h-11" : "h-12";
  const fieldHeight = row ? "h-14" : stacked ? "h-16" : compact ? "h-14 sm:h-18" : "h-20 sm:h-24";

  return (
    <form
      onSubmit={handleSubmit}
      className={
        row
          ? "flex w-full items-center gap-2 text-left"
          : stacked
            ? "flex w-full flex-col items-start gap-3 text-left"
            : `flex w-full flex-col items-center ${tight ? "gap-3 sm:gap-6" : "gap-6"} text-center sm:flex-row sm:text-left`
      }
    >
      {left}

      {error && (
        <p className="w-full text-center text-xs font-semibold text-red-600 sm:text-left">{error}</p>
      )}

      <div
        className={`flex ${fieldHeight} w-full ${row ? "flex-1" : "shrink-0"} overflow-hidden rounded-md border-2 border-[#101828] shadow-sm ${
          row || stacked ? "" : "sm:flex-1 sm:w-auto"
        }`}
      >
        <span
          className={`flex ${row ? "w-8" : stacked ? "w-9" : "w-12 sm:w-14"} shrink-0 items-center justify-center bg-[#003399]`}
        >
          <UnionJack className={row ? "w-5" : stacked ? "w-6" : "w-8 sm:w-9"} />
        </span>
        <input
          type="text"
          value={reg}
          onChange={(e) => setReg(e.target.value.toUpperCase())}
          placeholder="Your Reg"
          maxLength={8}
          style={{ fontFamily: '"Charles Wright", sans-serif' }}
          className={`min-w-0 flex-1 bg-[#e4e8ec] px-2 text-center tracking-wide text-[#101828] outline-none placeholder:text-[#101828]/40 ${
            row
              ? "text-2xl sm:text-3xl"
              : stacked
                ? compact
                  ? "text-2xl"
                  : "text-4xl"
                : large
                  ? "text-5xl sm:text-6xl"
                  : compact
                    ? "text-2xl sm:text-3xl"
                    : "text-4xl sm:text-6xl"
          }`}
        />
      </div>

      {!hideButton && (
        <button
          type="submit"
          disabled={loading}
          className={`${buttonHeight} flex shrink-0 items-center justify-center rounded-sm border-2 border-hero-blue bg-hero-blue font-bold text-white transition-colors hover:bg-white hover:text-hero-blue disabled:cursor-wait disabled:opacity-70 ${
            compactButton ? "px-2.5 text-[11px]" : "px-6 text-sm"
          } ${stacked ? "w-full" : row ? "" : "w-full sm:w-auto"}`}
        >
          {loading ? "Searching…" : buttonLabel} {!loading && !hideArrow && "→"}
        </button>
      )}
    </form>
  );
}
