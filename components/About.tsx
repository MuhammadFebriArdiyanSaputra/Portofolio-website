import Image from "next/image";
import { GraduationCap, MapPin, Target, User } from "lucide-react";
import SectionHeading from "./SectionHeading";

const facts = [
  { icon: GraduationCap, text: "S1 Ilmu Komputer, Universitas Lampung (2022 sampai 2026)" },
  { icon: MapPin, text: "Bandar Lampung, Lampung" },
  { icon: Target, text: "Tertarik pada bidang Data Analyst dan Full Stack Developer" },
];

export default function About() {
  return (
    <section id="tentang" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <SectionHeading icon={User} title="Tentang saya" />
      <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:items-center">
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -bottom-3 -right-3 h-full w-full rounded-2xl bg-line" aria-hidden />
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-night">
            <Image
              src="/images/Foto.png"
              alt="Foto M. Febri Ardiyan Saputra"
              fill
              sizes="(min-width: 768px) 384px, 100vw"
              className="object-cover object-top"
              priority
            />
          </div>
        </div>
        <div>
          <p className="md:text-justify md:hyphens-auto">
            Lulusan S1 Ilmu Komputer Universitas Lampung yang berfokus pada analisis data dan
            pengembangan web. Saya mengubah data publik menjadi temuan yang bisa ditindaklanjuti, dan
            membangun aplikasi yang dipakai pengguna sungguhan.
          </p>
          <p className="mt-4 md:text-justify md:hyphens-auto text-soft">
            Saat magang di Dinas Tenaga Kerja Provinsi Lampung, saya menganalisis data ketenagakerjaan
            2022 sampai 2024 dan mempresentasikannya kepada Bidang Perencanaan. Saya terbiasa
            membedakan korelasi dari sebab-akibat dan menyebutkan keterbatasan data. Saat ini saya
            sedang memperdalam SQL.
          </p>
          <ul className="mt-6 grid gap-3">
            {facts.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-line/25 text-ink">
                  <Icon size={18} aria-hidden />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}