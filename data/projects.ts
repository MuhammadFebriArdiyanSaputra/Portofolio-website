export type ProjectLink = { label: string; href: string; download?: boolean };
export type Img = { src: string; alt: string; caption?: string; wide?: boolean };
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
    title: "SIDORA, Sistem Informasi Dokumen Resmi Aplikasi",
    summary:
      "Aplikasi web tata naskah dinas elektronik (e-office) berbasis Laravel 10 dengan alur persetujuan berjenjang dan penomoran resmi berbasis regulasi Pergub Lampung. Proyek tim 3 orang, saya mengerjakan modul pegawai secara full stack.",
    role: "Proyek tim 3 orang. Saya mengembangkan Modul Pegawai (Full Stack) dan fitur tanda tangan digital/profil; anggota tim mengembangkan Modul Pimpinan dan Modul Admin. Skema database relasional dan alur verifikasi dirancang bersama.",
    problem:
      "Pengelolaan surat dinas manual rentan terselip, lambat dalam rantai verifikasi, dan kerap terhenti saat pejabat terkait sedang berdinas luar, sehingga dibutuhkan sistem tata naskah dinas elektronik yang aman, terstruktur, dan dapat diakses dari mana saja.",
    did: [
      "Mengembangkan Modul Pegawai secara full stack: perancangan CRUD naskah dinas, integrasi rich text editor Quill 2.0.2 untuk formatting surat resmi, serta pengamanan input dengan mews/purifier (XSS prevention)",
      "Membangun fleksibilitas kop naskah dinas dalam 2 format: kop standar instansi bawaan (keluar) dan kop dinamis lengkap (keluar_full) yang mencakup logo instansi kustom, alamat, kontak, email, dan situs resmi",
      "Mengimplementasikan alur rantai multi-penandatangan berjenjang: otomatis menyematkan tanda tangan digital pegawai pembuat serta menentukan daftar pimpinan verifikator sesuai hierarki seksi dan bidang",
      "Merancang sistem manajemen draft dan pemantauan status naskah dinas secara real-time yang terbagi dalam 4 tab: Semua, Menunggu, Disetujui, dan Ditolak (lengkap dengan catatan alasan penolakan dari pimpinan)",
      "Mengembangkan fitur registrasi surat masuk mandiri berbasis unggah berkas PDF serta menghubungkan alur penerimaan surat masuk eksternal yang didisposisikan oleh admin",
      "Membangun manajemen profil aparatur dengan fitur tanda tangan digital transparan (PNG) untuk e-signing dan integrasi pemotong foto profil 1:1 berbasis Cropper.js (rotasi dan zoom)",
      "Berkolaborasi merancang skema basis data relasional (users, surats, surat_penandatangan, disposis), hak akses peran (RoleMiddleware), dan alur persetujuan terintegrasi",
    ],
    result: [
      "Alur siklus persuratan dinas berjalan penuh dari hulu ke hilir: penyusunan draft oleh pegawai, verifikasi sekuensial oleh pimpinan, penomoran resmi otomatis berbasis klasifikasi arsip oleh admin, hingga ekspor PDF A4 ber-QR Code.",
      "Menghilangkan hambatan birokrasi dan keterlambatan tanda tangan fisik saat pimpinan bertugas di luar kantor berkat validasi digital berbasis web.",
    ],
    limits:
      "Pengembangan ke depan: penyediaan rute publik verifikasi naskah (/verify-surat/{id}) untuk validasi pemindaian QR Code pada dokumen fisik cetak, serta penambahan isolasi hak akses data antar-admin untuk surat masuk eksternal.",
    stack: [
      "Laravel 10",
      "PHP",
      "MySQL",
      "Quill 2",
      "Tailwind CSS",
      "Alpine.js",
      "DomPDF",
      "Cropper.js",
    ],
    links: [{ label: "Kode di GitHub", href: "https://github.com/Aldoptma0704/SIDORA" }],
    images: [
      {
        src: "/images/sidora-dashboard-pegawai.png",
        alt: "Dashboard pegawai SIDORA",
        caption: "Modul Pegawai: Dashboard pemantauan surat masuk disposisi dan status verifikasi naskah (Draft, Menunggu, Disetujui, Ditolak)",
      },
      {
        src: "/images/sidora-buat-surat.png",
        alt: "Form penyusunan naskah dinas",
        caption: "Modul Pegawai: Penyusunan naskah dinas dengan editor Quill 2, pemilihan kop dinamis, dan konfigurasi rantai multi-penandatangan",
      },
      {
        src: "/images/sidora-dashboard-pimpinan.png",
        alt: "Dashboard pimpinan SIDORA",
        caption: "Modul Pimpinan: Antrean naskah dinas yang memerlukan persetujuan dan monitoring surat masuk",
      },
      {
        src: "/images/sidora-validasi-surat-pada-pimpinan.png",
        alt: "Lembar verifikasi dan validasi surat oleh pimpinan",
        caption: "Modul Pimpinan: Aksi persetujuan berantai, penolakan naskah disertai catatan koreksi, serta penyematan tanda tangan digital profil",
      },
      {
        src: "/images/sidora-dashboard-admin.png",
        alt: "Dashboard admin SIDORA",
        caption: "Modul Admin: Rekapitulasi statistik persuratan, monitoring naskah disetujui, dan pencatatan surat masuk eksternal",
      },
      {
        src: "/images/sidora-admin-generate-nomor.png",
        alt: "Penomoran surat otomatis oleh admin",
        caption: "Modul Admin: Penomoran surat resmi otomatis berdasarkan klasifikasi kode arsip daerah Pergub Lampung No. 14 & 16 Tahun 2023",
      },
      {
        src: "/images/sidora-kelola-pengguna.png",
        alt: "Kelola pengguna dan hak akses SIDORA",
        caption: "Modul Admin: Manajemen pengguna dan kontrol akses berbasis peran (RBAC) untuk Admin, Pegawai, dan Pimpinan serta atribusi jabatan dan NIP",
      },
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
    slug: "documorph-studio",
    title: "DocuMorph-Studio",
    summary:
      "Aplikasi web serbaguna untuk konversi multi-format, manipulasi dokumen, dan intelligent document scanning dengan integrasi model deep learning YOLOv11-seg serta arsitektur zero data retention untuk privasi berkas.",
    role: "Pengembang mandiri (full stack & deep learning researcher). Kode tersedia di GitHub.",
    problem:
      "Kebutuhan alat pengolahan dokumen menyeluruh yang praktis, cepat, dan sepenuhnya aman dari risiko kebocoran privasi (tanpa penyimpanan permanen di server pihak ketiga), sekaligus mampu memindai dokumen miring atau bergelombang secara otomatis menggunakan computer vision berbasis kecerdasan buatan.",
    did: [
      "Mengembangkan backend performa tinggi dengan FastAPI yang mencakup 3 kelompok fitur utama: Convert (PDF ↔ Word, Excel, PowerPoint, Gambar, dan konversi ke Markdown terstruktur untuk AI/LLM), Edit & Organize (Merge dengan thumbnail interaktif, Split custom/ZIP, Compress 4 tingkat), serta Clean & AI Scan",
      "Melatih dan mengintegrasikan model custom YOLOv11 segmentation (YOLOv11-seg) untuk deteksi kontur kuadrilateral dokumen sub-pixel dan dewarping perspektif otomatis",
      "Membangun sistem fallback multi-strategi berbasis OpenCV (Canny Edge + Otsu, Morphological Gradient, HSV Saturation, Adaptive Thresholding) untuk menjamin deteksi sudut dokumen tetap presisi dalam berbagai kondisi pencahayaan",
      "Mengimplementasikan fitur smart watermark removal: pembersihan watermark CamScanner dan header/footer pada level vektor PDF asli tanpa merusak font/mengaburkan halaman, serta OpenCV inpainting untuk watermark gambar",
      "Menerapkan arsitektur Zero Data Retention: file masukan dan hasil diproses secara ephemeral dan langsung dihancurkan seketika setelah diunduh (via FastAPI BackgroundTask) serta dibersihkan rutin oleh worker otomatis",
      "Merancang antarmuka web modern yang responsif (Plus Jakarta Sans) dengan drag-and-drop urutan halaman PDF dan kanvas penyesuaian poligon sudut dokumen yang ramah layar sentuh",
    ],
    result: [
      "Mendukung konversi dua arah dokumen kantor (Word, Excel, PowerPoint) serta ekspor ke format Markdown ramah AI ingestion/LLM",
      "Engine kompresi 4-tier (Low, Medium, High, Extreme) dengan ekstraksi dan resampling grafis raster internal",
      "Pembersihan watermark vektor secara lossless dan pemindaian dokumen cerdas berkat model YOLOv11-seg",
      "Arsitektur cloud-ready yang siap dideploy secara efisien (Frontend Vercel dan Backend Hugging Face Spaces Docker 16 GB RAM)",
    ],
    limits:
      "Inferensi model deep learning YOLOv11-seg membutuhkan alokasi memori yang memadai (disarankan 16 GB RAM di lingkungan cloud/Hugging Face Spaces). Fitur konversi berbasis format Microsoft Office tertentu membutuhkan headless engine atau dependensi pendukung lokal (Ghostscript dan Poppler) untuk ekstraksi tabel Camelot.",
    stack: [
      "Python",
      "FastAPI",
      "YOLOv11-seg",
      "OpenCV",
      "PyMuPDF",
      "Camelot",
      "pdf2docx",
      "ReportLab",
      "JavaScript",
      "Docker",
    ],
    links: [
      { label: "Kode di GitHub", href: "https://github.com/MuhammadFebriArdiyanSaputra/converter-app" },
      { label: "Riset Model YOLOv11-seg", href: "https://github.com/MuhammadFebriArdiyanSaputra/document-dewarping-yolo11seg" },
    ],
    images: [
      {
        src: "/images/menu-convert-documorph.png",
        alt: "Menu Convert DocuMorph Studio",
        caption: "Menu Convert: Konversi multi-format PDF, Word, Excel, PPT, Markdown AI, dan Gambar",
      },
      {
        src: "/images/menu-edit&orgnize-documorph.png",
        alt: "Menu Edit & Organize DocuMorph Studio",
        caption: "Menu Edit & Organize: Penggabungan (Merge), pemisahan (Split), dan kompresi PDF 4-tier",
      },
      {
        src: "/images/menu-bersihkan&scan-documorph.png",
        alt: "Menu Bersihkan & AI Scan DocuMorph Studio",
        caption: "Menu Bersihkan & Scan: AI document scanner berbasis YOLOv11-seg dan pembersihan watermark",
      },
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
    short: "Sistem tata naskah dinas elektronik (e-office) berbasis regulasi Pergub Lampung dengan persetujuan berjenjang.",
    stat: { value: "3 role", label: "pegawai, pimpinan, dan admin dengan verifikasi berjenjang" },
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
  "documorph-studio": {
    category: "Full stack",
    icon: "cog",
    short: "Aplikasi web konversi, manipulasi dokumen, dan AI document scanner (YOLOv11-seg) berarsitektur zero data retention.",
    stat: { value: "Zero Data", label: "retention & AI scan (YOLOv11)" },
    cover: [
      { src: "/images/menu-convert-documorph.png", alt: "Tampilan Menu Convert DocuMorph Studio" },
      { src: "/images/menu-bersihkan&scan-documorph.png", alt: "Tampilan AI Document Scanner DocuMorph Studio" },
    ],
  },
};

const order = [
  "analisis-ketenagakerjaan-lampung",
  "sidora",
  "deteksi-kerusakan-jalan-efficientdet",
  "analisis-churn",
  "documorph-studio",
];

export const projects: Project[] = order.map((slug) => {
  const r = raw.find((x) => x.slug === slug)!;
  return { ...r, ...meta[slug] } as Project;
});

export const skills = [
  { group: "Data", items: ["Excel (pivot, rumus IFS, XLOOKUP, INDEX, FILTER)", "Looker Studio", "Pembersihan data", "SQL (dasar)"] },
  { group: "Machine learning", items: ["Python", "Pandas", "NumPy", "EfficientDet", "YOLOv8 / YOLOv11", "OpenCV"] },
  { group: "Web", items: ["Laravel", "FastAPI", "Next.js"] },
  { group: "Bahasa pemrograman", items: ["Python", "PHP", "TypeScript", "JavaScript"] },
  { group: "Database", items: ["MySQL", "PostgreSQL"] },
  { group: "Lainnya", items: ["Git", "Docker"] },
];