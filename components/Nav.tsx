import Link from "next/link";

const items = [
  ["Tentang", "/#tentang"],
  ["Proyek", "/#proyek"],
  ["Magang", "/#magang"],
  ["Keahlian", "/#keahlian"],
  ["Kontak", "/#kontak"],
];

export default function Nav() {
  return (
    <nav className="sticky top-0 z-20 border-b border-white/10 bg-night/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <Link href="/" className="font-display text-lg font-bold text-white active:text-line">
          M. Febri Ardiyan Saputra
        </Link>
        <ul className="hidden gap-6 text-sm text-white/80 sm:flex">
          {items.map(([label, href]) => (
            <li key={href}>
              <Link href={href} className="hover:text-line active:text-line">{label}</Link>
            </li>
          ))}
        </ul>
        <Link href="/#kontak" className="rounded-lg bg-line px-4 py-2 text-sm font-semibold text-night hover:brightness-95 active:brightness-90 motion-safe:transition motion-safe:active:scale-[0.97] sm:hidden">
          Kontak
        </Link>
      </div>
    </nav>
  );
}
