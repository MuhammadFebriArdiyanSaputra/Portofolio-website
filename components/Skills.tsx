import { BarChart3, Brain, Code2, Database, Terminal, Wrench, type LucideIcon } from "lucide-react";
import { skills } from "@/data/projects";
import SectionHeading from "./SectionHeading";

// Ikon per kelompok. Kelompok baru yang belum terdaftar di sini otomatis memakai ikon Wrench,
// jadi menambah kelompok di data/projects.ts tidak akan membuat halaman error.
const icons: Record<string, LucideIcon> = {
  Data: BarChart3,
  "Machine learning": Brain,
  Web: Code2,
  "Bahasa pemrograman": Terminal,
  Database: Database,
  Lainnya: Wrench,
};

export default function Skills() {
  return (
    <section id="keahlian" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <SectionHeading icon={Wrench} title="Keahlian" />
      <div className="grid gap-6 md:grid-cols-3">
        {skills.map((s) => {
          const Icon = icons[s.group] ?? Wrench;
          return (
            <div key={s.group} className="rounded-2xl border border-rule bg-white p-6">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-night text-line">
                <Icon size={24} aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-xl font-bold">{s.group}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {s.items.map((i) => (
                  <li key={i} className="rounded-md bg-paper px-3 py-1 text-sm ring-1 ring-rule">{i}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
