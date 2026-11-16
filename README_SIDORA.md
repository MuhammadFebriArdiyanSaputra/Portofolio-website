# SIDORA (Sistem Informasi Dokumen Resmi Aplikasi)
**Dokumentasi Teknis & Panduan Internal Proyek**

Dokumen ini merupakan panduan teknis lengkap dan catatan operasional internal untuk sistem informasi pengelolaan surat dinas elektronik **SIDORA**.

---

## Daftar Isi
1. [Ringkasan Sistem](#ringkasan-sistem)
2. [Peran Pengguna & Hak Akses (RBAC)](#peran-pengguna--hak-akses-rbac)
3. [Alur & Logika Bisnis Persuratan](#alur--logika-bisnis-persuratan)
4. [Teknologi & Dependensi Library](#teknologi--dependensi-library)
5. [Skema Basis Data & Relasi](#skema-basis-data--relasi)
6. [Daftar Rute & Endpoint API](#daftar-rute--endpoint-api)
7. [Penomoran Surat Resmi](#penomoran-surat-resmi)
8. [Panduan Instalasi & Konfigurasi Lokal](#panduan-instalasi--konfigurasi-lokal)
9. [Akun Bawaan (Seeder)](#akun-bawaan-seeder)
10. [Pengujian Otomatis](#pengujian-otomatis)
11. [Catatan Penting, Temuan Teknis & Checklist Deployment](#catatan-penting-temuan-teknis--checklist-deployment)

---

## 1. Ringkasan Sistem

SIDORA adalah aplikasi web persuratan dinas (*e-office / tata naskah dinas elektronik*) berbasis Laravel 10 yang dirancang untuk mendigitalkan seluruh siklus hidup persuratan instansi pemerintah daerah (mengacu pada Pergub Lampung No. 14 & 16 Tahun 2023).

Fitur inti mencakup:
- Pembuatan naskah dinas dengan rich text editor terintegrasi.
- Rantai persetujuan berjenjang sekuensial (*multi-tier hierarchical signature workflow*).
- Penomoran surat resmi otomatis berbasis klasifikasi arsip daerah.
- Pencatatan dan disposisi surat masuk dari instansi eksternal.
- Ekspor PDF standar naskah dinas A4 dengan tanda tangan digital dan validasi barcode QR Code.

---

## 2. Peran Pengguna & Hak Akses (RBAC)

Akses sistem diatur menggunakan middleware `RoleMiddleware` (`app/Http/Middleware/RoleMiddleware.php`) dengan 3 peran utama:

### A. Admin
- **Dashboard Ringkasan:** Statistik pengguna, total surat masuk, total surat keluar, surat masuk yang belum didisposisikan, dan daftar surat masuk terbaru.
- **Manajemen Pengguna:** Operasi CRUD akun pengguna (Nama, Email, Role, Bagian/Bidang, Jabatan/Position, NIP, Password) dan fitur hapus massal (*bulk delete*). Admin tidak dapat menghapus akunnya sendiri.
- **Surat Masuk Eksternal:** Mengunggah berkas PDF/dokumen dari instansi luar, mengisi metadata surat, dan mendisposisikan/meneruskan ke Pegawai atau Pimpinan tujuan.
- **Laporan & Penomoran Resmi:** Melihat seluruh surat keluar yang telah berstatus `disetujui`, men-generate nomor surat resmi, dan mengunduh berkas PDF resmi.

### B. Pegawai
- **Pembuatan Surat Keluar:** Menyusun naskah dinas menggunakan rich text editor Quill 2 dalam 2 jenis format kop:
  - `keluar`: Kop standar bawaan instansi.
  - `keluar_full`: Kop dinamis lengkap (logo, nama instansi, alamat, nomor kontak, email, dan website).
- **Rantai Penandatangan Fleksibel:** Menentukan satu atau lebih penandatangan:
  - Penandatangan sendiri (`peran = pembuat`): Otomatis ditandatangani saat pembuatan draft dengan tanda tangan profil.
  - Penandatangan pimpinan (`peran = pimpinan`): Berurutan sesuai hierarki verifikasi.
- **Manajemen Draft:** Mengubah draft, menghapus (tunggal/massal), dan mengajukan surat ke pimpinan.
- **Unggah Dokumen PDF:** Mengunggah berkas PDF mandiri untuk dicatat ke sistem.
- **Monitoring Status:** Memantau status surat secara real-time pada tab `Semua`, `Menunggu`, `Disetujui`, dan `Ditolak` (lengkap dengan catatan alasan penolakan).
- **Surat Masuk Pegawai:** Menerima dan mengunduh berkas surat masuk yang didisposisikan oleh Admin.

### C. Pimpinan
- **Antrean Verifikasi & Persetujuan:** Menyetujui atau menolak naskah dinas yang sedang tertuju padanya. Penolakan wajib menyertakan alasan/catatan koreksi.
- **Persetujuan Berantai Otomatis:** Setelah pimpinan urutan ke-1 menyetujui, surat otomatis beralih ke pimpinan urutan ke-2, hingga pimpinan urutan terakhir. Setelah pimpinan terakhir selesai menandatangani, status surat otomatis menjadi `disetujui` dan diteruskan ke meja Admin untuk penomoran.
- **Surat Masuk & Surat Balasan:** Menerima surat masuk, mengunggah PDF surat masuk, dan menyusun **Surat Balasan** (jenis `balasan` / `keluar_full`).
- **Pembatasan Kepala Dinas:** Akun yang teridentifikasi sebagai Kepala Dinas (melalui method `User::isKepalaDinas()`) **tidak dapat membuat surat balasan**, melainkan bertindak khusus sebagai penyetuju tingkat akhir.
- **Riwayat Disposisi:** Memantau rekapan surat yang pernah disetujui atau ditolak oleh pimpinan yang bersangkutan.

---

## 3. Alur & Logika Bisnis Persuratan

### Diagram Alur Surat Keluar:
```
[ Pegawai / Pimpinan ]
        |
        v
Menyusun Draft Naskah (Quill 2, Multi-Penandatangan)
        |
        v  (Klik "Ajukan")
Status: DRAFT -> MENUNGGU
(Sistem mencari Pimpinan urutan pertama via jabatan/bagian)
        |
        +----------------------------+
        |                            |
        v                            v
[ Pimpinan Menolak ]         [ Pimpinan Menyetujui ]
Status: DITOLAK             Tanda tangan profil disematkan
Catatan alasan tersimpan             |
Surat kembali ke pembuat             v
                       Ada pimpinan berikutnya?
                       - YA  -> Diteruskan ke Pimpinan berikutnya (Status: MENUNGGU)
                       - TDK -> Status: DISETUJUI (Diteruskan ke Admin)
                                     |
                                     v
                        Admin Generate Nomor Surat Resmi
                        (Berdasarkan klasifikasi arsip Pergub)
                                     |
                                     v
                        Unduh PDF (Kop, Tanda Tangan, QR Code)
```

### Diagram Alur Surat Masuk:
```
Instansi Luar mengirim berkas
        |
        v
Admin mencatat & unggah PDF surat masuk
        |
        +---> Langsung pilih penerima (Pegawai/Pimpinan) -> Status: DIKIRIM
        |
        +---> Simpan tanpa penerima                     -> Status: DRAFT
                    |
                    v
              Admin klik "Kirim" ke pegawai/pimpinan tujuan -> Status: DIKIRIM
```

---

## 4. Teknologi & Dependensi Library

| Komponen | Pustaka / Versi | Kegunaan |
| :--- | :--- | :--- |
| **Backend Framework** | Laravel 10.x | Arsitektur inti MVC, Eloquent ORM, Routing |
| **Bahasa Pemrograman** | PHP ^8.1 / ^8.2 | Runtime server |
| **Basis Data** | MySQL 5.7+ / 8.0+ / MariaDB | Penyimpanan relasional |
| **PDF Renderer** | `barryvdh/laravel-dompdf` (^3.1) | Konversi view Blade ke dokumen PDF A4 naskah dinas |
| **Generator QR Code** | `simplesoftwareio/simple-qrcode` (^4.2) | Membuat QR Code verifikasi dokumen pada berkas PDF |
| **Sanitasi HTML** | `mews/purifier` (^3.4) | Pembersihan tag berbahaya pada teks Quill (XSS Prevention) |
| **Autentikasi API** | `laravel/sanctum` (^3.2) | Manajemen token API |
| **Database Schema DBAL** | `doctrine/dbal` (^3.10) | Manajemen alter kolom database pada migrasi |
| **CSS Framework** | Tailwind CSS (CDN) | Antarmuka responsif dengan konfigurasi warna `primary` kustom |
| **UI Reaktivitas** | Alpine.js 3.x (CDN) | Interaksi modal potong gambar, dropdown, tabs, dan alert |
| **Ikonografi** | Font Awesome 6.4.0 (CDN) | Ikon antarmuka web |
| **Editor Teks Kaya** | Quill 2.0.2 (CDN) | Formatting naskah surat, tabel, alignment, indent |
| **Pemotong Gambar** | Cropper.js 1.5.13 (CDN) | Pemotongan foto profil 1:1, rotasi, dan zoom |
| **Asset Bundler** | Vite 4.x (`laravel-vite-plugin`) | Kompilasi aset JS/CSS aplikasi |

---

## 5. Skema Basis Data & Relasi

### A. Tabel `users`
Menyimpan akun seluruh aparatur/pengguna sistem.
- `id`: Primary key
- `name`, `email`, `password`: Kredensial akun
- `role`: Enum (`admin`, `pegawai`, `pimpinan`)
- `position`: Jabatan resmi pengguna (misal: "Kepala Bidang Pelatihan", "Staff Umum")
- `bagian`: Satuan kerja / seksi (misal: "Sekretariat", "Bidang Bina Pemagangan")
- `nip`: Nomor Induk Pegawai
- `signature`: Nama file tanda tangan digital transparan (tersimpan di `storage/app/public/signatures/`)
- `profile_photo`: Nama file foto profil (tersimpan di `storage/app/public/profile_photos/`)

### B. Tabel `surats`
Menyimpan seluruh data surat keluar, surat masuk, dan surat balasan.
- `id`: Primary key
- `user_id`: Foreign key ke tabel `users` (pembuat / pengunggah pertama)
- `pengirim_id`: Foreign key ke tabel `users` (pimpinan terakhir yang memproses disposisi)
- `judul`, `nomor_surat`: Judul/perihal dan nomor registrasi naskah
- `sifat`: Biasa / Rahasia / Penting / Segera
- `lampiran`: Keterangan lampiran berkas
- `tujuan`: Alamat atau nama pejabat/instansi penerima surat
- `jenis`: Kategori surat (`masuk`, `keluar`, `keluar_full`, `balasan`)
- `isi`: Konten naskah dinas (HTML tersanitasi)
- `file_path`: Path berkas jika surat merupakan unggahan dokumen PDF/gambar
- Data Kop Instansi: `logo_instansi`, `nama_instansi`, `alamat_instansi`, `kontak_instansi`, `email_instansi`, `website_instansi`
- Data Status & Disposisi:
  - `status`: Enum (`draft_pimpinan`, `draft`, `menunggu`, `disetujui`, `ditolak`, `dikirim`)
  - `alasan_penolakan`: Catatan pimpinan ketika surat ditolak
  - `disposisi_user_id`: ID user pimpinan/pegawai yang saat ini aktif dituju untuk aksi
  - `perlu_disposisi_admin`: Penanda boolean jika surat sudah disetujui penuh dan butuh penomoran admin
  - `signed_at`: Waktu persetujuan final surat

### C. Tabel `surat_penandatangan`
Menangani relasi rantai multi-penandatangan berjenjang:
- `id`: Primary key
- `surat_id`: Foreign key ke `surats` (on delete cascade)
- `user_id`: Foreign key ke `users` (nullable, on delete set null)
- `peran`: Enum (`pembuat`, `pimpinan`)
- `urutan`: Angka penanda urutan verifikasi (1, 2, 3, dst.)
- `jabatan`, `nama`, `nip`: Snapshot data penandatangan saat surat dibuat
- `status`: Enum (`menunggu`, `ditandatangani`, `ditolak`)
- `tanda_tangan`: Path berkas tanda tangan yang digunakan saat penandatanganan
- `signed_at`: Waktu eksekusi tanda tangan

### D. Tabel `disposis`
Mencatat riwayat lembar disposisi internal (`surat_id`, `pimpinan_id`, `catatan`).

---

## 6. Daftar Rute & Endpoint API

| Metode | URI | Middleware / Controller | Keterangan |
| :--- | :--- | :--- | :--- |
| `GET` | `/` & `/home` | Redirect | Menuju halaman login atau dashboard sesuai peran |
| `GET/POST` | `/login` | `guest` / `AuthController` | Form & autentikasi masuk |
| `POST` | `/logout` | `auth` / `AuthController` | Mengakhiri sesi masuk |
| `GET/POST` | `/reset-password` | Publik / `AuthController` | Mengganti kata sandi dengan konfirmasi password lama |
| `GET` | `/storage/{path}` | Publik / Route Closure | Melayani file storage publik secara langsung |
| **ADMIN** | `/admin/*` | `auth`, `role:admin` | |
| `GET` | `/admin/dashboard` | `UserController@dashboard` | Panel statistik admin |
| `RESOURCE`| `/admin/users` | `UserController` | CRUD pengelolaan akun pengguna |
| `POST` | `/admin/users/bulk-destroy` | `UserController@bulkDestroy` | Hapus massal akun pengguna |
| `GET` | `/admin/laporan-surat` | `UserController@laporan` | Daftar surat keluar untuk penomoran |
| `GET/POST` | `/admin/surat/masuk` | `AdminSuratController` | Input & daftar surat masuk eksternal |
| `POST` | `/admin/surat/masuk/{id}/kirim` | `AdminSuratController@kirimSuratMasuk` | Distribusikan surat masuk ke pegawai |
| `POST` | `/admin/surat/{id}/generate-nomor` | `AdminSuratController@generateNomor` | Buat nomor surat resmi otomatis |
| `GET` | `/admin/surat/{surat}/download` | `AdminSuratController@download` | Unduh naskah dinas PDF resmi |
| **PEGAWAI** | `/pegawai/*` | `auth`, `role:pegawai` | |
| `GET` | `/pegawai/dashboard` | `PegawaiDashboardController@index` | Dashboard pegawai |
| `GET/POST` | `/pegawai/surat` | `PegawaiSuratController` | Daftar & proses pembuatan draft surat |
| `POST` | `/pegawai/surat/ajukan` | `PegawaiSuratController@ajukan` | Mengajukan surat ke meja pimpinan |
| `POST` | `/pegawai/surat/upload-pdf`| `PegawaiSuratController@uploadPdf` | Unggah berkas naskah PDF mandiri |
| `GET` | `/pegawai/status-surat` | `PegawaiSuratController@statusSurat` | Halaman tab status verifikasi surat |
| `GET` | `/pegawai/surat/{id}/preview` | `PegawaiSuratController@preview` | Pratinjau surat format HTML |
| `GET` | `/pegawai/surat/{id}/download`| `PegawaiSuratController@download` | Unduh berkas PDF surat |
| **PIMPINAN** | `/pimpinan/*` | `auth`, `role:pimpinan` | |
| `GET` | `/pimpinan/dashboard` | `PimpinanSuratController@index` | Antrean surat yang butuh persetujuan |
| `POST` | `/pimpinan/surat/{id}/setujui` | `PimpinanSuratController@setujui` | Menyetujui naskah & teruskan rantai |
| `POST` | `/pimpinan/surat/{id}/tolak` | `PimpinanSuratController@tolak` | Menolak naskah dinas (+ catatan) |
| `GET` | `/pimpinan/disposisi` | `PimpinanSuratController@disposisi` | Riwayat naskah yang pernah diproses |
| `GET/POST` | `/pimpinan/balasansurat` | `PimpinanSuratController` | Penyusunan naskah surat balasan |
| `GET` | `/pimpinan/surat-masuk` | `PimpinanSuratController@suratMasuk` | Daftar surat masuk untuk pimpinan |
| **PROFIL** | `/profile` | `auth` / `ProfileController` | Edit nama, foto profil (crop), & TTD digital |
| **API** | `/api/user` | `auth:sanctum` | Endpoint data pengguna aktif |
| **API** | `/api/pegawai/surat/{id}`| `PegawaiSuratController@updateApi` | Update data surat keluar via API |

---

## 7. Penomoran Surat Resmi

Penomoran surat diatur berdasarkan tata naskah dinas Pemerintah Provinsi Lampung:
$$\text{\{kode\_klasifikasi\}} / \text{\{nomor\_urut\}} / \text{\{kode\_unit\}} / \text{\{bulan\}} / \text{\{tahun\}}$$

- **Nomor Urut (`nomor_urut`):** Sistem otomatis mendeteksi nomor urut tertinggi pada tahun berjalan dan menyarankan angka berikutnya yang di-*padding* menjadi 4 digit (misal: `0001`, `0002`).
- **Bulan (`bulan`):** Terdiri dari 2 digit angka romawi/desimal (misal: `10`, `11`).
- **Kode Klasifikasi Arsip Bawaan:**
  - `500.15.6.1`: Pemagangan Dalam Negeri (Bina Pemagangan)
  - `500.15.6.2`: Pemagangan Luar Negeri (Bina Pemagangan)
  - `500.15.6.3`: Perizinan dan Advokasi Pemagangan
  - `500.15.6.4`: Promosi dan Jenjang Pemagangan
  - `500.15.6`: Bina Pemagangan (Umum)
  - `500.15.1`: Perencanaan Tenaga Kerja
  - `500.15.2`: Penempatan Tenaga Kerja dan Perluasan Kesempatan Kerja
  - `500.15.3`: Pelatihan Kerja dan Sertifikasi
  - `500.15.4`: Standardisasi Kompetensi Kerja
  - `500.15.5`: Produktivitas Tenaga Kerja
  - `500.15.7`: Hubungan Industrial dan Syarat Kerja
  - `500.15.8`: Pengupahan dan Jaminan Sosial Tenaga Kerja
  - `500.15.9`: Pengawasan Ketenagakerjaan dan K3
  - `500.15`: Ketenagakerjaan (Umum)
  - `800`: Kepegawaian (Surat Tugas / Cuti / Disiplin / Mutasi)
  - `000`: Umum / Tata Usaha / Fasilitatif

---

## 8. Panduan Instalasi & Konfigurasi Lokal

### Kebutuhan Lingkungan:
- PHP >= 8.1 dengan ekstensi `pdo_mysql`, `mbstring`, `openssl`, `gd`, `fileinfo`, `xml`, `ctype`, `json`.
- Composer 2.x
- Node.js >= 16.x & npm
- MySQL / MariaDB (disarankan via Laragon / XAMPP)

### Langkah Pemasangan:
```bash
# 1. Masuk ke direktori web server (misal: d:/laragon/www/SIDORA)
cd d:/laragon/www/SIDORA

# 2. Pasang dependensi PHP dan Node
composer install
npm install

# 3. Konfigurasi file lingkungan
copy .env.example .env
php artisan key:generate
```

Sesuaikan berkas `.env`:
```env
APP_NAME=SIDORA
APP_ENV=local
APP_KEY=base64:...
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=sidora
DB_USERNAME=root
DB_PASSWORD=
```

Lanjutkan migrasi dan build aset:
```bash
# 4. Buat database `sidora` di MySQL, lalu jalankan migrasi & seeder
php artisan migrate --seed

# 5. Link storage publik
php artisan storage:link

# 6. Kompilasi aset Vite
npm run build

# 7. Jalankan server lokal
php artisan serve
```

Akses aplikasi pada peramban web di `http://localhost:8000`.

---

## 9. Akun Bawaan (Seeder)

Database seeder (`UserSeeder.php`) menyediakan tiga akun pengujian:

| Peran | Email | Password | Catatan Awal |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@example.com` | `admin123` | Administrator sistem |
| **Pegawai** | `pegawai@example.com` | `pegawai123` | Konseptor naskah dinas |
| **Pimpinan** | `pimpinan@example.com` | `pimpinan123` | Verifikator/Penyetuju |

> **PENTING UNTUK ADMIN:** Setelah seeding pertama, login ke akun Admin dan lengkapi data **Jabatan (Position)**, **Bagian**, serta **NIP** untuk seluruh akun Pimpinan agar logika pencocokan penandatangan otomatis berjalan lancar.

---

## 10. Pengujian Otomatis

Eksekusi suite pengujian:
```bash
php artisan test
```
Saat ini mencakup pengujian fitur autentikasi (`tests/Feature/loginTest.php`):
- Uji coba login dengan kredensial valid (berhasil dialihkan ke dashboard sesuai peran).
- Uji coba login dengan kredensial salah (ditolak dengan pesan error).

---

## 11. Catatan Penting, Temuan Teknis & Checklist Deployment

### Temuan Teknis yang Perlu Diperhatikan:
1. **Rute Verifikasi QR Code (`/verify-surat/{id}`):**
   - Berkas template PDF (`pdf_surat.blade.php`) men-generate tautan QR code ke `url('/verify-surat/' . $surat->id)`.
   - **Catatan:** Rute publik `/verify-surat/{id}` saat ini belum terdaftar di `routes/web.php`. Sangat disarankan untuk menambahkan rute publik dan halaman sederhana yang menampilkan rincian validitas nomor surat, tanggal disahkan, dan nama penandatangan agar pemindaian QR code tidak menghasilkan 404.
2. **Pembersihan Dependensi `package.json`:**
   - Masih terdapat dependensi lama `@ckeditor/ckeditor5-font` dan plugin Quill table di `package.json` yang tidak digunakan karena Quill 2 dimuat secara langsung via CDN pada file Blade.
3. **Penyajian File Publik di Windows (Laragon):**
   - Sistem sudah dilengkapi rute darurat `Route::get('/storage/{path}')` di `routes/web.php` untuk memastikan foto profil, logo instansi, dan tanda tangan digital tetap muncul normal meskipun fitur symlink Windows terkendala izin administrator.

### Checklist Sebelum Deployment ke Server Produksi:
- [ ] Ubah konfigurasi `.env`: `APP_ENV=production` dan `APP_DEBUG=false`.
- [ ] Ganti kata sandi bawaan `admin123`, `pegawai123`, dan `pimpinan123`.
- [ ] Buat rute verifikasi QR Code `/verify-surat/{id}` untuk pembuktian keaslian dokumen.
- [ ] Optimalkan cache Laravel: `php artisan config:cache && php artisan route:cache && php artisan view:cache`.
- [ ] Pastikan folder `storage/` dan `bootstrap/cache/` memiliki hak akses tulis (*write permissions*) web server.
- [ ] Pasang sertifikat SSL (HTTPS) untuk melindungi kerahasiaan dokumen resmi.
