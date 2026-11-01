"use client";

import { useState } from "react";
import { FolderKanban } from "lucide-react";
import { projects, type Category } from "@/data/projects";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";

type Filter = "Semua" | Category;

const filters: Filter[] = ["Semua", "Data analyst", "Full stack", "Machine learning"];

export default function Projects() {
  const [active, setActive] = useState<Filter>("Semua");

  const visible = active === "Semua" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="proyek" className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
      <SectionHeading icon={FolderKanban} title="Proyek" sub="Klik detail untuk membaca prosesnya." />

      <div role="group" aria-label="Filter kategori proyek" className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => {
          const count = f === "Semua" ? projects.length : projects.filter((p) => p.category === f).length;
          const isActive = active === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              aria-pressed={isActive}
              className={`rounded-full px-4 py-2 text-sm font-medium ring-1 motion-safe:transition ${
                isActive
                  ? "bg-night text-white ring-night"
                  : "bg-white text-ink ring-rule hover:bg-paper"
              }`}
            >
              {f} <span className={isActive ? "text-white/70" : "text-soft"}>({count})</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {visible.map((p, i) => (
          <ProjectCard key={p.slug} p={p} wide={i === 0 && visible.length > 1} />
        ))}
      </div>
    </section>
  );
}