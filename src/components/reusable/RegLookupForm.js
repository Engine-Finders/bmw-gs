"use client";

import { useState } from "react";

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
}) {
  const [reg, setReg] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // Live DVLA/VIN API integration — dev to wire up, per locked decision.
  }

  const buttonHeight = row ? "h-14" : stacked ? "h-9" : "h-12";
  const fieldHeight = row ? "h-14" : stacked ? "h-16" : "h-18";

  return (
    <form
      onSubmit={handleSubmit}
      className={
        row
          ? "flex w-full items-center gap-2 text-left"
          : stacked
            ? "flex w-full flex-col items-start gap-3 text-left"
            : "flex w-full flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left"
      }
    >
      {left}

      <div
        className={`flex ${fieldHeight} w-full ${row ? "flex-1" : "shrink-0"} overflow-hidden rounded-sm border-2 border-[#101828] shadow-sm ${
          row || stacked ? "" : "sm:flex-1 sm:w-auto"
        }`}
      >
        <span className="flex w-11 shrink-0 flex-col items-center justify-center gap-1.5 bg-[#003399] text-white">
          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#ffcc00] text-[8px] leading-none text-[#ffcc00]">
            ★
          </span>
          <span className="text-[10px] font-extrabold tracking-wide">GB</span>
        </span>
        <input
          type="text"
          value={reg}
          onChange={(e) => setReg(e.target.value.toUpperCase())}
          placeholder="AB12 CDE"
          maxLength={8}
          className={`min-w-0 flex-1 bg-[#e4e8ec] px-2 text-center font-black tracking-widest text-[#101828] outline-none placeholder:text-[#101828]/40 ${
            row
              ? "text-lg sm:text-xl"
              : stacked
                ? compact
                  ? "text-lg"
                  : "text-2xl"
                : large
                  ? "text-2xl sm:text-3xl"
                  : compact
                    ? "text-lg sm:text-xl"
                    : "text-xl sm:text-2xl"
          }`}
        />
      </div>

      {!hideButton && (
        <button
          type="submit"
          className={`${buttonHeight} flex shrink-0 items-center justify-center rounded-sm border-2 border-hero-blue bg-hero-blue font-bold text-white transition-colors hover:bg-white hover:text-hero-blue ${
            compactButton ? "px-2.5 text-[11px]" : "px-6 text-sm"
          } ${stacked ? "w-full" : row ? "" : "w-full sm:w-auto"}`}
        >
          {buttonLabel} {!hideArrow && "→"}
        </button>
      )}
    </form>
  );
}
