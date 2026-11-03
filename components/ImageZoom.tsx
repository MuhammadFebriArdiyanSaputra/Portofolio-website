"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { RotateCcw, X, ZoomIn, ZoomOut } from "lucide-react";

const MIN = 1;
const MAX = 5;
const clamp = (v: number) => Math.min(MAX, Math.max(MIN, v));

type Props = {
  src: string; // gambar ukuran penuh yang dibuka di pembesar
  alt: string;
  caption?: string;
  className?: string; // atur posisi tombol (misalnya "relative block w-full")
  badge?: boolean; // ikon kaca pembesar kecil di pojok
  touchBadge?: boolean; // ikon mungil yang hanya muncul di layar sentuh (untuk gambar tanpa badge)
  children: React.ReactNode; // gambar kecil (thumbnail)
};

export default function ImageZoom({ src, alt, caption, className = "relative block", badge = true, touchBadge = false, children }: Props) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => {
    setOpen(false);
    trigger.current?.focus();
  }, []);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen(true)}
        className={`cursor-zoom-in motion-safe:transition active:brightness-90 motion-safe:active:scale-[0.98] ${className}`}
        aria-label={`Perbesar gambar: ${alt}`}
      >
        {children}
        {badge ? (
          <span className="pointer-events-none absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-night/75 text-white shadow">
            <ZoomIn size={16} aria-hidden />
          </span>
        ) : (
          touchBadge && (
            <span className="pointer-events-none absolute right-1 top-1 hidden h-6 w-6 place-items-center rounded-full bg-night/75 text-white shadow pointer-coarse:grid">
              <ZoomIn size={12} aria-hidden />
            </span>
          )
        )}
      </button>
      {open && createPortal(<Viewer src={src} alt={alt} caption={caption} onClose={close} />, document.body)}
    </>
  );
}

function Viewer({ src, alt, caption, onClose }: { src: string; alt: string; caption?: string; onClose: () => void }) {
  const box = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const anchor = useRef<{ x: number; y: number } | null>(null);
  const pinch = useRef<{ d: number; s: number } | null>(null);
  const scaleRef = useRef(1); // skala terbaru, dibaca pendengar sentuhan di bawah
  const pinchedAt = useRef(0); // waktu cubitan terakhir, untuk mencegah tutup tak sengaja
  const lastTap = useRef(0);
  const drag = useRef<{ x: number; y: number; l: number; t: number; moved: boolean } | null>(null);
  const justDragged = useRef(false);
  const [grabbing, setGrabbing] = useState(false);
  const [scale, setScale] = useState(1);
  const [nat, setNat] = useState<{ w: number; h: number } | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  // Ubah skala sambil mengingat titik tengah layar, supaya zoom terasa di tengah.
  const apply = useCallback((next: number) => {
    const el = box.current;
    if (el) {
      anchor.current = {
        x: (el.scrollLeft + el.clientWidth / 2) / Math.max(el.scrollWidth, 1),
        y: (el.scrollTop + el.clientHeight / 2) / Math.max(el.scrollHeight, 1),
      };
    }
    setScale(clamp(Math.round(next * 100) / 100));
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const measure = () => box.current && setSize({ w: box.current.clientWidth, h: box.current.clientHeight });
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "+" || e.key === "=") apply(scale + 0.5);
      else if (e.key === "-") apply(scale - 0.5);
      else if (e.key === "0") apply(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, apply, scale]);

  useEffect(() => {
    scaleRef.current = scale;
  }, [scale]);

  // Cubit dua jari untuk zoom. Pendengar dipasang manual dengan passive:false supaya
  // preventDefault bisa menahan browser menggulir/memperbesar halaman saat mencubit
  // (pendengar sentuhan bawaan React bersifat passive, jadi tidak bisa melakukannya).
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const dist = (t: TouchList) => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
    const onStart = (e: TouchEvent) => {
      if (e.touches.length !== 2) return;
      const d = dist(e.touches);
      if (d > 0) pinch.current = { d, s: scaleRef.current };
    };
    const onMove = (e: TouchEvent) => {
      if (e.touches.length !== 2 || !pinch.current) return;
      e.preventDefault();
      pinchedAt.current = Date.now();
      apply(pinch.current.s * (dist(e.touches) / pinch.current.d));
    };
    const onEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) pinch.current = null;
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onEnd);
    el.addEventListener("touchcancel", onEnd);
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("touchcancel", onEnd);
    };
  }, [apply]);

  // Desktop: tahan klik kiri lalu geser untuk menggeser gambar; Ctrl + scroll (atau cubit trackpad) untuk zoom.
  useEffect(() => {
    const move = (e: MouseEvent) => {
      const d = drag.current;
      const el = box.current;
      if (!d || !el) return;
      const dx = e.clientX - d.x;
      const dy = e.clientY - d.y;
      if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true;
      el.scrollLeft = d.l - dx;
      el.scrollTop = d.t - dy;
    };
    const up = () => {
      if (!drag.current) return;
      justDragged.current = drag.current.moved;
      drag.current = null;
      setGrabbing(false);
    };
    const wheel = (e: WheelEvent) => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      apply(scaleRef.current - e.deltaY * 0.01);
    };
    const el = box.current;
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    el?.addEventListener("wheel", wheel, { passive: false });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      el?.removeEventListener("wheel", wheel);
    };
  }, [apply]);

  // Gambar landscape dipas ke layar; gambar tinggi dipas ke lebar layar lalu digulir.
  let base = size.w;
  if (nat && size.w && size.h) {
    const aspect = nat.w / nat.h;
    base = aspect >= 1 ? Math.min(size.w, size.h * aspect) : size.w;
  }
  const width = Math.round(base * scale);

  useLayoutEffect(() => {
    const el = box.current;
    const a = anchor.current;
    if (!el || !a) return;
    el.scrollLeft = a.x * el.scrollWidth - el.clientWidth / 2;
    el.scrollTop = a.y * el.scrollHeight - el.clientHeight / 2;
    anchor.current = null;
  }, [width]);

  const onImgClick = () => {
    if (justDragged.current) {
      justDragged.current = false; // lepas dari geseran, bukan ketukan
      return;
    }
    const now = Date.now();
    if (now - lastTap.current < 300) apply(scale > 1.2 ? 1 : 2.5); // ketuk dua kali
    lastTap.current = now;
  };

  const btn = "grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/25 disabled:opacity-40";

  return (
    <div role="dialog" aria-modal="true" aria-label={alt} className="fixed inset-0 z-[100] flex flex-col bg-[#0b0d0f]">
      <div className="flex items-center justify-between gap-3 px-4 py-3 text-white">
        <p className="min-w-0 truncate text-sm">{caption ?? alt}</p>
        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden w-12 text-right text-sm tabular-nums text-white/70 sm:block">{Math.round(scale * 100)}%</span>
          <button type="button" className={`${btn} enabled:active:bg-white/30`} onClick={() => apply(scale - 0.5)} disabled={scale <= MIN} aria-label="Perkecil">
            <ZoomOut size={20} aria-hidden />
          </button>
          <button type="button" className={`${btn} enabled:active:bg-white/30`} onClick={() => apply(scale + 0.5)} disabled={scale >= MAX} aria-label="Perbesar">
            <ZoomIn size={20} aria-hidden />
          </button>
          <button type="button" className={`${btn} active:bg-white/30`} onClick={() => apply(1)} aria-label="Ukuran semula">
            <RotateCcw size={18} aria-hidden />
          </button>
          <button ref={closeBtn} type="button" className={`${btn} bg-line text-night hover:bg-line active:brightness-90`} onClick={onClose} aria-label="Tutup">
            <X size={22} aria-hidden />
          </button>
        </div>
      </div>

      <div
        ref={box}
        className="flex-1 overflow-auto"
        style={{ touchAction: "pan-x pan-y", cursor: scale > 1 ? (grabbing ? "grabbing" : "grab") : "zoom-in" }}
        onMouseDown={(e) => {
          if (e.button !== 0 || scale <= 1 || !box.current) return;
          e.preventDefault();
          drag.current = { x: e.clientX, y: e.clientY, l: box.current.scrollLeft, t: box.current.scrollTop, moved: false };
          justDragged.current = false;
          setGrabbing(true);
        }}
      >
        <div
          className="flex min-h-full w-max min-w-full"
          onClick={(e) => {
            if (e.target === e.currentTarget && Date.now() - pinchedAt.current > 400) onClose();
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            draggable={false}
            onLoad={(e) => setNat({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight })}
            onClick={onImgClick}
            className="m-auto max-w-none select-none"
            style={{ width: width || undefined, height: "auto" }}
          />
        </div>
      </div>
      <p className="px-4 py-2 text-center text-xs text-white/60">Ketuk dua kali untuk zoom, lalu geser untuk melihat bagian lain. Di komputer: Ctrl + scroll untuk zoom.</p>
    </div>
  );
}
