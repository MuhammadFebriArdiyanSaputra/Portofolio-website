export type Cv = {
  label: string;
  note: string;
  href: string;
  filename: string; // nama file saat diunduh recruiter
};

export const cvs: Cv[] = [
  {
    label: "CV Data Analyst",
    note: "Analisis data, dashboard, SQL, Excel",
    href: "/cv-data-analisis.pdf",
    filename: "cv-data-analisis.pdf",
  },
  {
    label: "CV Web Developer",
    note: "Full stack, Laravel, FastAPI, Next.js",
    href: "/cv-web-developer.pdf",
    filename: "cv-web-developer.pdf",
  },
];