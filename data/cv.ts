export type Cv = {
  label: string;
  note: string;
  href: string;
  filename: string; // nama file saat diunduh recruiter
};

// Taruh file PDF di folder public/. Nama file di href harus sama persis dengan nama file di sana.
export const cvs: Cv[] = [
  {
    label: "CV Bahasa Indonesia",
    note: "Untuk perusahaan dan instansi di Indonesia",
    href: "/cv-id.pdf",
    filename: "CV-M-Febri-Ardiyan-Saputra-ID.pdf",
  },
  {
    label: "CV English",
    note: "For international or English-language applications",
    href: "/cv-en.pdf",
    filename: "CV-M-Febri-Ardiyan-Saputra-EN.pdf",
  },
];
