"use client";

import { useState } from "react";
import Link from "next/link";
import BMWStripe from "@/components/reusable/BMWStripe";

export default function Navbar({ data }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50 bg-black text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <BMWStripe className="h-8 w-4 shrink-0" />
          <span>
            <span className="block text-lg font-extrabold tracking-tight leading-none">
              {data.brand}
            </span>
            <span className="block text-[10px] font-medium tracking-wide text-white leading-none mt-0.5">
              {data.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold">
          {data.links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-blue-400 transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 -mr-2"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="block w-6 h-0.5 bg-white mb-1.5" />
          <span className="block w-6 h-0.5 bg-white mb-1.5" />
          <span className="block w-6 h-0.5 bg-white" />
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-white/10 px-4 pb-4 flex flex-col gap-1 text-sm font-semibold">
          {data.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2.5 border-b border-white/5"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
