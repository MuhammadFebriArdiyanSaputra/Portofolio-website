"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Download } from "lucide-react";
import { cvs } from "@/data/cv";

export default function CvMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-5 py-3 font-medium hover:bg-white/10"
      >
        <Download size={18} aria-hidden /> Unduh CV
        <ChevronDown
          size={16}
          aria-hidden
          className={`motion-safe:transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul className="absolute left-0 z-20 mt-2 w-72 overflow-hidden rounded-xl bg-white text-ink shadow-lg ring-1 ring-rule">
          {cvs.map((cv) => (
            <li key={cv.href}>
              <a
                href={cv.href}
                download={cv.filename}
                onClick={() => setOpen(false)}
                className="flex flex-col px-4 py-3 hover:bg-line/25"
              >
                <span className="font-semibold">{cv.label}</span>
                <span className="text-sm text-soft">{cv.note}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}