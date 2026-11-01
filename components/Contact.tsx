import React from "react";
import { cvs } from "@/data/cv";
import { Download, GitBranch, Mail, Send, type LucideProps } from "lucide-react";

interface ContactLink {
  label: string;
  href: string;
  text: string;
  icon: React.ComponentType<any>; 
}

const LinkedinIcon = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const links: ContactLink[] = [
  { 
    label: "Email", 
    href: "mailto:mfebriardiyansaputra@gmail.com", 
    text: "mfebriardiyansaputra@gmail.com", 
    icon: Mail 
  },
  { 
    label: "LinkedIn", 
    href: "https://www.linkedin.com/in/m-febri-ardiyan-saputra-923ba1434", 
    text: "https://www.linkedin.com/in/m-febri-ardiyan-saputra-923ba1434", 
    icon: LinkedinIcon // Menggunakan SVG Kustom
  },
  { 
    label: "GitHub", 
    href: "https://github.com/MuhammadFebriArdiyanSaputra", 
    text: "https://github.com/MuhammadFebriArdiyanSaputra",
    icon: GitBranch 
  },
];

export default function Contact() {
  return (
    <section id="kontak" className="bg-night text-white">
      <div className="dash-h" aria-hidden />
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="mb-10 flex items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-line text-night">
            <Send size={26} aria-hidden />
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Mari terhubung</h2>
        </div>
        <p className="max-w-xl text-white/75">
          Saya terbuka untuk kesempatan magang sebagai Data Analyst atau Full Stack Engineer. Kirim pesan kapan saja.
        </p>
        <ul className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-3">
          {links.map(({ icon: Icon, label, text, href }) => (
            <li key={label} className="min-w-0">
              <a href={href} target="_blank" rel="noopener noreferrer" className="flex min-w-0 items-center gap-4 rounded-2xl bg-white/[0.06] p-5 ring-1 ring-white/10 hover:bg-white/10 active:bg-white/10 motion-safe:transition motion-safe:active:scale-[0.98]">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-line text-night">
                  {Icon && <Icon size={24} aria-hidden />}
                </span>
                <span className="min-w-0">
                  <span className="block font-display font-semibold">{label}</span>
                  <span className="block truncate text-sm text-white/70">{text}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
            {cvs.map((cv) => (
              <a
                key={cv.href}
                href={cv.href}
                download={cv.filename}
                className="inline-flex items-center gap-2 rounded-lg bg-line px-5 py-3 font-semibold text-night hover:brightness-95"
              >
                <Download size={18} aria-hidden /> {cv.label}
              </a>
            ))}
        </div>
      </div>
    </section>
  );
}
