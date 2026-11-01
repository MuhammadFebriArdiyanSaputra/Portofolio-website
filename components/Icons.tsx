import { BarChart3, Brain, Code2, FileCog, FileText, ScanSearch, TrendingDown } from "lucide-react";
import type { Category, IconKey } from "@/data/projects";

const projectIcons = {
  chart: BarChart3,
  file: FileText,
  scan: ScanSearch,
  trend: TrendingDown,
  cog: FileCog,
};

export function ProjectIcon({ name, size = 24 }: { name: IconKey; size?: number }) {
  const I = projectIcons[name];
  return <I size={size} aria-hidden />;
}

const categoryIcons = { "Data analyst": BarChart3, "Full stack": Code2, "Machine learning": Brain };

export function CategoryChip({ category, dark = false }: { category: Category; dark?: boolean }) {
  const I = categoryIcons[category];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${
        dark ? "bg-white/10 text-white" : "bg-line/25 text-ink"
      }`}
    >
      <I size={15} aria-hidden />
      {category}
    </span>
  );
}
