import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ExternalLink, Flag, Hammer, Lightbulb, Images, Table2, Target, Trophy, UserRound } from "lucide-react";
import { projects } from "@/data/projects";
import { CategoryChip } from "@/components/Icons";
import Nav from "@/components/Nav";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ImageZoom from "@/components/ImageZoom";

type Props = { params: Promise<{ slug: string }> | { slug: string } };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: `${p.title} | Nama Anda`, description: p.short } : {};
}

function Block({ icon: Icon, title, children }: { icon: typeof Target; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-rule bg-white p-6 sm:p-8">
      <h2 className="flex items-center gap-3 font-display text-xl font-bold sm:text-2xl">
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-line text-night">
          <Icon size={20} aria-hidden />
        </span>
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];
  const t = p.table;

  return (
    <>
      <Nav />
      <header className="bg-night text-white">
        <div className="mx-auto max-w-4xl px-5 pb-12 pt-10 sm:px-8">
          <Link href="/#proyek" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-line active:text-line">
            <ArrowLeft size={16} aria-hidden /> Kembali ke proyek
          </Link>
          <div className="mt-6"><CategoryChip category={p.category} dark /></div>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">{p.title}</h1>
          <p className="mt-4 max-w-2xl text-white/75">{p.summary}</p>
          <p className="mt-4 flex max-w-2xl items-start gap-2 text-sm text-white/70">
            <UserRound size={18} className="mt-0.5 shrink-0 text-line" aria-hidden />
            <span><strong className="font-semibold text-white">Peran:</strong> {p.role}</span>
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <li key={s} className="rounded-md bg-white/10 px-3 py-1 text-sm">{s}</li>
            ))}
          </ul>
          <p className="mt-6 flex flex-wrap gap-3">
            {p.links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 rounded-lg bg-line px-4 py-2.5 font-semibold text-night hover:brightness-95 active:brightness-90 motion-safe:transition motion-safe:active:scale-[0.97]">
                {l.label} <ExternalLink size={16} aria-hidden />
              </a>
            ))}
          </p>
        </div>
        <div className="dash-h" aria-hidden />
      </header>

      <main className="mx-auto grid max-w-4xl grid-cols-[minmax(0,1fr)] gap-6 px-5 py-12 sm:px-8">
        <Block icon={Target} title="Masalah">
          <p className="text-soft">{p.problem}</p>
        </Block>
        <Block icon={Hammer} title="Yang saya kerjakan">
          <ul className="list-disc space-y-2 pl-5 text-soft">{p.did.map((d) => <li key={d}>{d}</li>)}</ul>
        </Block>
        <Block icon={Trophy} title="Hasil">
          <ul className="list-disc space-y-2 pl-5 text-soft">{p.result.map((r) => <li key={r}>{r}</li>)}</ul>
        </Block>

        {p.recommendations && p.recommendations.length > 0 && (
          <Block icon={Lightbulb} title="Rekomendasi">
            <ol className="list-decimal space-y-2 pl-5 text-soft">{p.recommendations.map((r) => <li key={r}>{r}</li>)}</ol>
          </Block>
        )}

        {t && (
          <Block icon={Table2} title={t.caption}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b-2 border-ink">{t.head.map((c) => <th key={c} className="py-2 pr-4 font-semibold">{c}</th>)}</tr>
                </thead>
                <tbody>
                  {t.rows.map((r) => (
                    <tr key={r[0]} className="border-b border-rule">
                      {r.map((c, k) => <td key={k} className={`py-2 pr-4 ${k === 0 ? "font-medium" : "tabular-nums text-soft"}`}>{c}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {t.note && <p className="mt-3 text-sm text-soft">{t.note}</p>}
          </Block>
        )}

        {p.images && p.images.length > 0 && (
          <Block icon={Images} title="Galeri">
            <div className="grid gap-6 sm:grid-cols-2">
              {p.images.map((im) => (
                <figure key={im.src} className={p.images!.length === 1 ? "sm:col-span-2" : ""}>
                  <ImageZoom src={im.src} alt={im.alt} caption={im.caption} className="relative block w-full">
                    <Image src={im.src} alt={im.alt} width={1400} height={1000} className="h-auto w-full rounded-lg border border-rule bg-white" />
                  </ImageZoom>
                  {im.caption && <figcaption className="mt-2 text-sm text-soft">{im.caption}</figcaption>}
                </figure>
              ))}
            </div>
          </Block>
        )}

        {p.limits && (
          <section className="rounded-2xl border-l-8 border-line bg-white p-6 sm:p-8">
            <h2 className="flex items-center gap-3 font-display text-xl font-bold sm:text-2xl">
              <Flag size={22} className="text-ink" aria-hidden /> Keterbatasan dan rencana
            </h2>
            <p className="mt-3 text-soft">{p.limits}</p>
          </section>
        )}

        <Link href={`/projects/${next.slug}`}
              className="group flex items-center justify-between gap-4 rounded-2xl bg-night p-6 text-white hover:bg-black active:bg-black motion-safe:transition motion-safe:active:scale-[0.99]">
          <span>
            <span className="block text-sm text-white/60">Proyek berikutnya</span>
            <span className="font-display text-lg font-semibold sm:text-xl">{next.title}</span>
          </span>
          <ArrowRight size={24} className="shrink-0 text-line motion-safe:transition-transform group-hover:translate-x-1 group-active:translate-x-1" aria-hidden />
        </Link>
      </main>
      <Contact />
      <Footer />
    </>
  );
}
