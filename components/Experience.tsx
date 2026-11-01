import Link from "next/link";
import { ArrowRight, Briefcase, Building2, CalendarDays } from "lucide-react";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section id="magang" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading icon={Briefcase} title="Pengalaman magang" />
        <div className="rounded-2xl border border-rule bg-paper p-6 sm:p-8">
          <div className="flex flex-wrap items-start gap-4">
            <span className="grid h-14 w-14 place-items-center rounded-xl bg-night text-line">
              <Building2 size={28} aria-hidden />
            </span>
            <div>
              <h3 className="font-display text-xl font-bold sm:text-2xl">Dinas Tenaga Kerja Provinsi Lampung</h3>
              <p className="text-soft">Bidang Perencanaan</p>
              <p className="mt-1 inline-flex items-center gap-2 text-sm text-soft">
                <CalendarDays size={16} aria-hidden /> Juli 2025, satu bulan
              </p>
            </div>
          </div>
          <ul className="mt-6 max-w-3xl list-disc space-y-2 pl-5">
            <li>Mengerjakan modul pegawai SIDORA (Laravel 10) bersama tim 3 orang.</li>
            <li>Menyusun analisis dan dashboard ketenagakerjaan Lampung 2022 sampai 2024, lalu mempresentasikannya kepada Bidang Perencanaan.</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/projects/sidora" className="inline-flex items-center gap-2 font-medium text-link underline underline-offset-4 hover:text-ink active:text-ink">
              Lihat SIDORA <ArrowRight size={16} aria-hidden />
            </Link>
            <Link href="/projects/analisis-ketenagakerjaan-lampung" className="inline-flex items-center gap-2 font-medium text-link underline underline-offset-4 hover:text-ink active:text-ink">
              Lihat analisis ketenagakerjaan <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
