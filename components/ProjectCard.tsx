import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { CategoryChip, ProjectIcon } from "./Icons";
import ImageZoom from "./ImageZoom";

export default function ProjectCard({ p, wide = false }: { p: Project; wide?: boolean }) {
  const [main, second] = p.cover;
  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-2xl border border-rule bg-white shadow-sm motion-safe:transition motion-safe:duration-200 motion-safe:hover:-translate-y-1 hover:shadow-lg ${
        wide ? "md:col-span-2 md:flex-row" : ""
      }`}
    >
      <div className={`relative aspect-[4/3] overflow-hidden bg-[#E7E9E3] ${wide ? "md:aspect-auto md:min-h-[22rem] md:w-1/2" : ""}`}>
        {main ? (
          <ImageZoom src={main.src} alt={main.alt} className="absolute inset-0 block">
            <Image
              src={main.src}
              alt={main.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-contain p-3"
            />
          </ImageZoom>
        ) : (
          <div className="grid h-full place-items-center bg-gradient-to-br from-night to-[#3B444B] text-line">
            <ProjectIcon name={p.icon} size={72} />
          </div>
        )}
        {second && (
          <ImageZoom
            src={second.src}
            alt={second.alt}
            badge={false}
            touchBadge
            className="absolute bottom-3 right-3 block w-2/5 overflow-hidden rounded-lg border-2 border-white shadow-lg"
          >
            <Image src={second.src} alt={second.alt} width={600} height={500} className="h-auto w-full" />
          </ImageZoom>
        )}
      </div>

      <div className={`flex flex-1 flex-col gap-4 p-6 ${wide ? "md:w-1/2 md:p-8" : ""}`}>
        <div className="flex items-center justify-between gap-3">
          <CategoryChip category={p.category} />
        </div>
        <h3 className={`font-display font-bold leading-tight tracking-tight ${wide ? "text-2xl sm:text-3xl" : "text-xl"}`}>
          {p.title}
        </h3>
        <p className="text-soft">{p.short}</p>

        <div className="flex items-baseline gap-3 border-l-4 border-line pl-3">
          <span className="font-display text-3xl font-bold">{p.stat.value}</span>
          <span className="text-sm text-soft">{p.stat.label}</span>
        </div>

        <ul className="flex flex-wrap gap-2">
          {p.stack.slice(0, 4).map((s) => (
            <li key={s} className="rounded-md bg-paper px-2.5 py-1 text-sm ring-1 ring-rule">{s}</li>
          ))}
        </ul>

        <Link
          href={`/projects/${p.slug}`}
          className="group/cta mt-auto inline-flex w-fit items-center gap-2 rounded-lg bg-night px-5 py-2.5 font-medium text-white hover:bg-black active:bg-black motion-safe:transition motion-safe:active:scale-[0.97]"
        >
          Lihat detail
          <ArrowRight size={18} aria-hidden className="motion-safe:transition-transform group-hover:translate-x-1 group-active/cta:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
