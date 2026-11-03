export type ProjectLink = { label: string; href: string; download?: boolean };
export type Img = { src: string; alt: string; caption?: string };
export type Table = { caption: string; head: string[]; rows: string[][]; note?: string };

export type Category = "Data analyst" | "Full stack" | "Machine learning";
export type IconKey = "chart" | "file" | "scan" | "trend" | "cog";

export type Project = {
  slug: string;
  category: Category;
  icon: IconKey;
  short: string; // satu kalimat untuk kartu di halaman utama
  stat: { value: string; label: string };
  cover: Img[]; // 0 sampai 2 gambar untuk kartu

  title: string;
  summary: string;
  role: string;
  problem: string;
  did: string[];
  result: string[];
  limits?: string;
  recommendations?: string[];
  stack: string[];
  links: ProjectLink[];
  images?: Img[];
  table?: Table;
  featured?: boolean;
};

const raw: Omit<Project, "category" | "icon" | "short" | "stat" | "cover">[] = [
  {
    slug: "analisis-ketenagakerjaan-lampung",
    title: "Analisis Ketenagakerjaan Provinsi Lampung 2022 sampai 2024",
    summary:
      "Dashboard Looker Studio dan laporan 28 pertanyaan dari buku data ketenagakerjaan Disnaker Provinsi Lampung, dikerjakan saat magang di Bidang Perencanaan.",
    role: "Proyek individu saat magang. Hasilnya saya presentasikan kepada pegawai dan Kepala Bidang Perencanaan sebagai penilaian kemampuan analisis.",
    problem:
      "Data ketenagakerjaan tersebar di banyak tabel dan kategori dalam satu buku PDF, sehingga sulit dibandingkan antar tahun dan antar topik.",
    did: [
      "Menyalin data tabel dari buku data Disnaker (posisi 31 Januari 2025) secara manual ke 7 file Excel, dikelompokkan per kategori (TPAK, TPT, AK, PMI, dan lainnya)",
      "Memeriksa duplikat (tidak ditemukan) dan memperbaiki salah ketik, termasuk kesalahan satu digit yang dapat mengubah total hingga 10 kali lipat",
      "Membuat tabel pivot, dashboard di Looker Studio, dan laporan 28 pertanyaan beserta insight",
    ],
    result: [
      "Pengangguran: TPT turun dari 4,52% (2022) menjadi 4,19% (2024), tetapi jumlah penganggur naik tipis dari 207.965 menjadi 209.161 orang dan sekitar 69,1% pekerja berada di sektor informal. Penurunan TPT tidak otomatis berarti penyerapan kerja membaik.",
      "Gender: TPAK perempuan 54,58% dibanding 85,61% laki-laki (2024), dan TPT perempuan lebih tinggi selama tiga tahun. Perempuan mencakup sekitar 73% pekerja keluarga tak dibayar dan 73,7% PMI tercatat.",
      "Pendidikan: sekitar 54,5% penganggur lulusan SLTA. TPT SLTA Kejuruan (8,80%) lebih tinggi daripada SLTA Umum (6,17%), sehingga kesesuaian kompetensi dengan kebutuhan kerja perlu ditelaah.",
    ],
    limits:
      "Proses penyalinan data masih manual. Untuk proyek berikutnya saya berencana memakai Power Query atau Camelot untuk mengekstrak tabel PDF, lalu memeriksa hasilnya.",
    recommendations: [
      "Laporkan jumlah penganggur berdampingan dengan TPT. TPT turun dari 4,52% ke 4,19%, tetapi jumlah penganggur naik tipis (207.965 ke 209.161), sehingga TPT saja bisa memberi kesan perbaikan yang berlebihan.",
      "Perhatikan kualitas pekerjaan, bukan hanya penyerapan kerja. Sekitar 69,1% pekerja berada di sektor informal, jadi program perlu menyentuh perlindungan dan produktivitas pekerja informal.",
      "Telaah hambatan partisipasi kerja perempuan. TPAK perempuan 54,58% dibanding 85,61% laki-laki dan TPT perempuan lebih tinggi; perempuan juga sekitar 73% pekerja keluarga tak dibayar. Diperlukan data tambahan sebelum menyimpulkan penyebabnya.",
      "Sesuaikan pelatihan vokasi dengan kebutuhan pasar kerja. TPT lulusan SLTA Kejuruan (8,80%) lebih tinggi daripada SLTA Umum (6,17%), sehingga kesesuaian kompetensi dan permintaan tenaga kerja perlu ditelaah sebelum menambah program.",
    ],
    stack: ["Excel", "Pivot Table", "Looker Studio"],
    links: [
      { label: "Buka dashboard", href: "https://datastudio.google.com/reporting/c5a1fde9-1f64-47ad-8745-c3f4407b8c48" },
      { label: "Baca laporan (PDF)", href: "/laporan/ringkasan-ketenagakerjaan-lampung.pdf" },
    ],
    images: [
      { src: "/images/dashboard-Ketenagakerjaan.png", alt: "Dashboard ketenagakerjaan, halaman 1", caption: "Dashboard Looker Studio, halaman ringkasan" },
      { src: "/images/dashboard-ketenagakerjaan1.png", alt: "Dashboard ketenagakerjaan, halaman 2", caption: "Dashboard Looker Studio, kondisi ketenagakerjaan makro" },
    ],
    featured: true,
  },
  {
    slug: "deteksi-kerusakan-jalan-efficientdet",
    title: "Deteksi Kerusakan Jalan dengan EfficientDet (D0, D2, D3) pada RDD2022",
    summary:
      "Skripsi yang membandingkan tiga varian EfficientDet untuk mendeteksi lima kelas kerusakan jalan, dengan evaluasi akurasi, kecepatan, dan kompleksitas komputasi.",
    role: "Penelitian individu (skripsi). Kode sudah dipublikasikan di GitHub.",
    problem:
      "Pemeriksaan kerusakan jalan secara manual lambat. Saya ingin tahu varian EfficientDet mana yang paling seimbang antara akurasi dan beban komputasi, dan apakah arsitektur ini masih layak dibandingkan dengan YOLO.",
    did: [
      "Menyiapkan dataset RDD2022 sekunder dari Kaggle (6 negara, sekitar 37 ribu gambar, pembagian 70/15/15) dan menambah satu kelas buatan, D99 (other corruption)",
      "Melatih D0, D2, dan D3 dengan early stopping dan Stochastic Depth, memilih checkpoint terbaik berdasarkan validation loss",
      "Mengevaluasi mAP, F1, mIoU, FP/FN per kelas, latensi, FPS, parameter, dan FLOPs, lalu menganalisis kesalahan lewat confusion matrix",
    ],
    result: [
      "D2 adalah varian paling seimbang: mAP@0,50 naik dari 0,5160 (D0) menjadi 0,5660 dengan latensi 38,99 ms (25,6 FPS).",
      "D3 mengalami diminishing returns: mAP@0,50 sedikit turun ke 0,5583 walau beban komputasi melonjak ke 45,54 GFLOPs. D3 hanya unggul pada F1 global (0,5687).",
      "Kelas tersulit adalah D00 dan D20, karena retak memanjang sering tertukar dengan tepi pola retak buaya.",
    ],
    limits:
      "Data sekunder dari enam negara dengan cara pengambilan gambar berbeda (drone, motor, dashcam), jadi tidak mewakili jalan di Indonesia. Hanya D0 sampai D3 yang diuji dan belum dibandingkan langsung dengan YOLO. Penelitian berhenti di evaluasi model. Rencana berikutnya: dataset Indonesia dengan skripsi ini sebagai baseline, aplikasi web prediksi, serta EfficientDet D5 ke atas atau algoritma lain.",
    stack: ["Python", "EfficientDet", "RDD2022"],
    links: [
      { label: "Kode di GitHub", href: "https://github.com/MuhammadFebriArdiyanSaputra/EffDet-With-RDD2022" },
      { label: "Ringkasan skripsi", href: "/laporan/ringkasan-skripsi.pdf" },
    ],
    table: {
      caption: "Perbandingan tiga varian EfficientDet pada data uji",
      head: ["Metrik", "D0 (epoch 28)", "D2 (epoch 15)", "D3 (epoch 11)"],
      rows: [
        ["mAP@0,50", "0,5160", "0,5660", "0,5583"],
        ["mAP@0,50:0,95", "0,2442", "0,2671", "0,2621"],
        ["mAP@0,75", "0,1969", "0,2131", "0,2082"],
        ["Precision global", "0,5920", "0,5545", "0,5865"],
        ["Recall global", "0,4926", "0,5573", "0,5520"],
        ["F1 global", "0,5378", "0,5559", "0,5687"],
        ["mIoU global", "0,7556", "0,7522", "0,7547"],
        ["Latensi (ms)", "27,04 ± 0,63", "38,99 ± 1,82", "62,36 ± 0,52"],
        ["FPS", "37,0", "25,6", "16,0"],
        ["Parameter (juta)", "3,84", "8,02", "11,93"],
        ["FLOPs (G)", "4,41", "19,74", "45,54"],
      ],
      note: "Epoch menunjukkan checkpoint terbaik berdasarkan validation loss. Spesifikasi perangkat pengukuran latensi belum dicantumkan, jadi angka latensi sebaiknya dibaca sebagai perbandingan relatif antar varian.",
    },
    images: [
      { src: "/images/rdd2022-distribusi.webp", alt: "Distribusi gambar dan kelas per negara pada RDD2022", caption: "Distribusi data RDD2022 per negara dan kelas" },
      { src: "/images/rdd2022-contoh.webp", alt: "Contoh gambar RDD2022 dengan anotasi", caption: "Contoh gambar dan anotasi" },
      { src: "/images/effdet-d2-prediksi.webp", alt: "Ground truth (hijau) dan prediksi (merah) EfficientDet D2", caption: "Ground truth (hijau) dan prediksi D2 (merah)" },
      { src: "/images/effdet-d2-kurva-training.webp", alt: "Kurva training EfficientDet D2", caption: "Kurva training D2 (early stopping pada epoch 15)" },
    ],
    featured: true,
  },
  {
    slug: "sidora",
    title: "SIDORA, Sistem Informasi Surat Menyurat Dinas",
    summary:
      "Aplikasi web pengelolaan surat dinas dengan persetujuan berjenjang untuk Dinas Tenaga Kerja Provinsi Lampung. Proyek tim 3 orang, saya mengerjakan modul pegawai (full stack).",
    role: "Tim 3 orang. Saya mengerjakan role pegawai, teman A role pimpinan, dan teman B role admin.",
    problem:
      "Surat menyurat masih manual, sehingga saat pimpinan tidak di tempat, surat sulit diteruskan dan persetujuannya terhambat.",
    did: [
      "Membangun modul pegawai secara full stack: membuat, menyimpan, mengedit, melihat, dan menghapus surat, lalu mengajukannya ke pimpinan",
      "Dua jenis surat keluar: dengan kop surat manual (logo dan identitas instansi dapat diubah) dan dengan template standar Disnaker",
      "Editor isi surat dengan CKEditor, penerimaan surat masuk lewat unggah berkas, serta pengaturan foto profil dan tanda tangan",
      "Bersama tim: alur persetujuan berjenjang (kepala bidang, sekretariat, kepala dinas, lalu admin) dan desain database",
    ],
    result: [
      "Alur utama sudah berjalan dari awal sampai akhir: pembuatan surat, persetujuan berjenjang oleh pimpinan, nomor surat otomatis oleh admin, hingga disposisi.",
    ],
    limits:
      "Rencana pengembangan: pemisahan data antar admin, agar surat masuk yang ditujukan ke admin tertentu hanya terlihat oleh admin itu. Saat ini data semua admin masih digunakan bersama.",
    stack: ["Laravel 10", "PHP", "CKEditor"],
    links: [{ label: "Kode di GitHub", href: "https://github.com/Aldoptma0704/SIDORA" }],
    images: [
      { src: "/images/sidora-dashboard-pegawai.png", alt: "Dashboard pegawai SIDORA", caption: "Dashboard pegawai (modul yang saya kerjakan)" },
      { src: "/images/sidora-buat-surat.png", alt: "Form pembuatan surat keluar", caption: "Form surat keluar (modul yang saya kerjakan)" },
      { src: "/images/sidora-dashboard-pimpinan.png", alt: "Dashboard pimpinan SIDORA", caption: "Dashboard pimpinan (modul anggota tim)" },
      { src: "/images/sidora-validasi-surat-pada-pimpinan.png", alt: "Disposisi dan validasi surat oleh pimpinan", caption: "Validasi surat oleh pimpinan (modul anggota tim)" },
      { src: "/images/sidora-dashboard-admin.png", alt: "Dashboard admin SIDORA", caption: "Dashboard admin (modul anggota tim)" },
      { src: "/images/sidora-admin-generate-nomor.png", alt: "Penomoran surat oleh admin", caption: "Penomoran surat otomatis oleh admin (modul anggota tim)" },
      { src: "/images/sidora-kelola-pengguna.png", alt: "Kelola pengguna SIDORA", caption: "Kelola pengguna (modul anggota tim)" },
    ],
    featured: true,
  },
  {
    slug: "analisis-churn",
    title: "Analisis Churn Pelanggan Bank",
    summary:
      "Dashboard Looker Studio dan laporan 6 insight dari dataset churn bank di Kaggle, lengkap dengan rekomendasi retensi.",
    role: "Proyek mandiri.",
    problem:
      "Bank ingin tahu pelanggan seperti apa yang paling berisiko berhenti, agar strategi retensi lebih tepat sasaran.",
    did: [
      "Membersihkan data (hapus duplikat, perbaiki salah ketik) dan membuat kolom kelompok saldo, usia, dan skor kredit dengan rumus IFS di Excel",
      "Mengeksplorasi pola churn per negara, usia, keaktifan, gender, saldo, dan jumlah produk",
      "Membangun dashboard di Looker Studio dan menulis laporan dengan rekomendasi bisnis",
    ],
    result: [
      "Dari 10.000 pelanggan, 2.037 churn (20,4%). Churn Germany 32,4%, hampir dua kali France (16,2%) dan Spain (16,7%).",
      "Member tidak aktif churn 26,9% dibanding 14,3% pada member aktif. Segmen paling rawan adalah usia 46 sampai 60 di Germany (67,3%).",
      "Dua produk tampak paling stabil (churn 8%), tetapi data 3 sampai 4 produk terlalu kecil (266 dan 60 pelanggan) untuk disimpulkan.",
    ],
    limits: "Analisis bersifat deskriptif pada data publik, belum ada model prediksi.",
    recommendations: [
      "Prioritaskan Germany untuk investigasi lebih lanjut (survei kepuasan atau wawancara), karena polanya berbeda dari France dan Spain di hampir semua dimensi.",
      "Buat program retensi khusus untuk pelanggan usia 46 sampai 60, terutama di Germany (churn 67,3%).",
      "Jalankan kampanye reaktivasi untuk member tidak aktif, khususnya yang bersaldo tinggi. Keaktifan adalah faktor yang paling membedakan dalam analisis ini dan paling mungkin ditindaklanjuti.",
      "Dorong cross-sell ke produk kedua karena paling stabil, dan hindari menjual produk ketiga tanpa strategi retensi tambahan.",
      "Jadikan perempuan tidak aktif sebagai kelompok prioritas program loyalitas (churn 32% dibanding 11% pada laki-laki aktif).",
    ],
    stack: ["Excel", "Looker Studio", "Kaggle"],
    links: [
      { label: "Buka dashboard", href: "https://datastudio.google.com/reporting/def2c868-9123-4873-9e3b-1a0cf5c56028" },
      { label: "Baca laporan (PDF)", href: "/laporan/ringkasan-churn.pdf" },
    ],
    images: [{ src: "/images/dashboard-churn.png", alt: "Dashboard analisis churn pelanggan bank", caption: "Dashboard Looker Studio" }],
  },
  {
    slug: "convert-app",
    title: "Convert-app",
    summary:
      "Aplikasi konversi dan pemindaian dokumen yang berjalan di komputer sendiri, dibuat agar dokumen pribadi tidak perlu diunggah ke layanan pihak ketiga.",
    role: "Proyek mandiri. Kode ada di GitHub.",
    problem:
      "Saya butuh alat konversi dokumen yang tidak mengirim berkas pribadi ke server lain.",
    did: [
      "Membangun backend FastAPI dengan 14 endpoint: konversi PDF ke Word, Excel, dan PowerPoint (dan sebaliknya), gambar ke PDF, gabung dan pisah PDF, kompres PDF, penghapus watermark, dan scan dokumen",
      "Memakai OCR (Tesseract), Camelot untuk tabel, serta OpenCV untuk scan dan penghapusan watermark",
      "Melatih sendiri model YOLOv8n di Kaggle (dataset docs scanner dari Roboflow) untuk mendeteksi area dokumen pada fitur scan",
      "Menghapus file sementara otomatis setelah respons terkirim, dengan pembersih berkala tiap 10 menit sebagai cadangan",
    ],
    result: ["Sebagian besar fitur berfungsi. Contoh kompresi: 6 MB menjadi 3,02 MB (hemat 49,7%)."],
    limits:
      "Berjalan lokal di Windows dengan Microsoft Office terpasang (konversi Office memakai COM), serta butuh Tesseract, Poppler, dan Ghostscript. Kompresi belum optimal untuk PDF yang sudah ringan, rencana perbaikannya adalah menurunkan kualitas gambar di dalam PDF.",
    stack: ["Python", "FastAPI", "OpenCV", "YOLOv8", "PyMuPDF", "Camelot"],
    links: [{ label: "Kode di GitHub", href: "https://github.com/MuhammadFebriArdiyanSaputra/Converter-App" }],
    images: [
      { src: "/images/converter-app.png", alt: "Tampilan utama Convert-app", caption: "Tampilan utama" },
      { src: "/images/convert-pdf-to-docs-converter-app.png", alt: "Konversi PDF ke Word", caption: "Konversi PDF ke Word dengan Microsoft Word" },
    ],
  },
];

const meta: Record<string, Pick<Project, "category" | "icon" | "short" | "stat" | "cover">> = {
  "analisis-ketenagakerjaan-lampung": {
    category: "Data analyst",
    icon: "chart",
    short: "Dashboard dan laporan 28 pertanyaan dari data ketenagakerjaan Lampung 2022 sampai 2024, dipresentasikan ke Bidang Perencanaan Disnaker.",
    stat: { value: "4,52% → 4,19%", label: "TPT turun, tetapi jumlah penganggur justru naik tipis" },
    cover: [{ src: "/images/dashboard-Ketenagakerjaan.png", alt: "Dashboard ketenagakerjaan Lampung" }],
  },
  sidora: {
    category: "Full stack",
    icon: "file",
    short: "Sistem surat dinas dengan persetujuan berjenjang. Proyek tim 3 orang, saya mengerjakan modul pegawai.",
    stat: { value: "3 role", label: "pegawai, pimpinan, dan admin dengan persetujuan berjenjang" },
    cover: [
      { src: "/images/sidora-dashboard-pegawai.png", alt: "Dashboard pegawai SIDORA" },
      { src: "/images/sidora-dashboard-pimpinan.png", alt: "Dashboard pimpinan SIDORA" },
    ],
  },
  "deteksi-kerusakan-jalan-efficientdet": {
    category: "Machine learning",
    icon: "scan",
    short: "Membandingkan EfficientDet D0, D2, dan D3 untuk mendeteksi kerusakan jalan pada RDD2022.",
    stat: { value: "0,566", label: "mAP@0,50 terbaik (D2)" },
    cover: [
      { src: "/images/rdd2022-distribusi.webp", alt: "Distribusi data RDD2022" },
      { src: "/images/effdet-d2-prediksi.webp", alt: "Prediksi EfficientDet D2" },
    ],
  },
  "analisis-churn": {
    category: "Data analyst",
    icon: "trend",
    short: "Dashboard dan 6 insight untuk memahami pelanggan bank yang berisiko berhenti.",
    stat: { value: "20,4%", label: "churn dari 10.000 pelanggan" },
    cover: [{ src: "/images/dashboard-churn.png", alt: "Dashboard analisis churn" }],
  },
  "convert-app": {
    category: "Full stack",
    icon: "cog",
    short: "Aplikasi konversi dan scan dokumen yang berjalan lokal, agar berkas pribadi tidak diunggah ke pihak ketiga.",
    stat: { value: "14", label: "endpoint API" },
    cover: [{ src: "/images/converter-app.png", alt: "Tampilan Convert-app" }],
  },
};

const order = [
  "analisis-ketenagakerjaan-lampung",
  "sidora",
  "deteksi-kerusakan-jalan-efficientdet",
  "analisis-churn",
  "convert-app",
];

export const projects: Project[] = order.map((slug) => {
  const r = raw.find((x) => x.slug === slug)!;
  return { ...r, ...meta[slug] } as Project;
});

export const skills = [
  { group: "Data", items: ["Excel (pivot, rumus IFS, XLOOKUP, INDEX, FILTER)", "Looker Studio", "Pembersihan data", "SQL (dasar)"] },
  { group: "Machine learning", items: ["Python", "Pandas", "NumPy", "EfficientDet", "YOLOv8", "OpenCV"] },
  { group: "Web", items: ["Laravel", "FastAPI", "Next.js"] },
  { group: "Bahasa pemrograman", items: ["Python", "PHP", "TypeScript", "JavaScript"] },
  { group: "Database", items: ["MySQL", "PostgreSQL"] },
  { group: "Lainnya", items: ["Git", "Docker"] },
];