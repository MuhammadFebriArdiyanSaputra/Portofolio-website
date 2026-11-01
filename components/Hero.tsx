import { ArrowRight, BarChart3, Brain, Code2, Download, MapPin, Sparkles } from "lucide-react";
import CvMenu from "./CvMenu";

const highlights = [
  { icon: BarChart3, title: "Analisis data", text: "Excel, Looker Studio, SQL" },
  { icon: Code2, title: "Full stack", text: "Laravel, FastAPI, Next.js" },
  { icon: Brain, title: "Machine learning", text: "EfficientDet, YOLOv8, OpenCV" },
];

export default function Hero() {
  return (
    <header className="bg-night text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:pt-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm">
            <Sparkles size={16} className="text-line" aria-hidden />
            Terbuka untuk peluang magang dan kolaborasi
          </p>
          <p className="mt-6 text-white/70">Halo, saya M. Febri Ardiyan Saputra</p>
          <h1 className="mt-2 font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
            Mengubah data mentah menjadi temuan, dan ide menjadi{" "}
            <span className="text-line">aplikasi web</span>.
          </h1>
          <p className="mt-6 flex items-center gap-2 text-white/70">
            <MapPin size={18} aria-hidden /> Fresh graduate Ilmu Komputer, Bandar Lampung
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#proyek" className="inline-flex items-center gap-2 rounded-lg bg-line px-5 py-3 font-semibold text-night hover:brightness-95 active:brightness-90 motion-safe:transition motion-safe:active:scale-[0.97]">
              Lihat proyek <ArrowRight size={18} aria-hidden />
            </a>
            <CvMenu />
          </div>
        </div>

        <ul className="grid gap-3">
          {highlights.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-center gap-4 rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-line text-night">
                <Icon size={24} aria-hidden />
              </span>
              <div>
                <p className="font-display text-lg font-semibold">{title}</p>
                <p className="text-sm text-white/70">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="dash-h" aria-hidden />
    </header>
  );
}
