import type { LucideIcon } from "lucide-react";

export default function SectionHeading({
  icon: Icon,
  title,
  sub,
}: {
  icon: LucideIcon;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-10 flex items-center gap-4">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-line text-night">
        <Icon size={26} aria-hidden />
      </span>
      <div>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        {sub && <p className="text-soft">{sub}</p>}
      </div>
    </div>
  );
}
