# SRT Event Management Dashboard (SRT-PRD-04B): satu event, sekali pakai

React + TypeScript + Vite + Tailwind. Tanpa login, tanpa database. Data hanya di sessionStorage browser pengunjung.

## Jalankan lokal
    npm install
    npm run dev        # http://localhost:5173
    npm run build      # output ke dist/ (termasuk pengecekan TypeScript)

## Deploy ke Netlify
1. Unggah folder ini ke repo Git, lalu Netlify > Add new site > Import from Git.
2. Build command `npm run build`, publish directory `dist` (sudah diatur di `netlify.toml`).
3. SPA fallback `/* /index.html 200` sudah ada di `netlify.toml` dan `public/_redirects`. Header keamanan dan CSP juga sudah diatur di `netlify.toml`.
4. Domain: Site settings > Domain management > tambahkan `demo-event-dashboard.sumberrejekitech.web.id`, lalu buat record CNAME di DNS ke alamat `*.netlify.app` situs Anda. HTTPS diaktifkan otomatis oleh Netlify.
   Alternatif tanpa Git: jalankan `npm run build`, lalu seret folder `dist` ke Netlify Drop.

## Tombol "Lihat Demo" di website utama
    <a href="https://demo-event-dashboard.sumberrejekitech.web.id" target="_blank" rel="noopener noreferrer">Lihat Demo</a>

Jika domain di atas belum aktif, ganti dengan alamat `*.netlify.app` sementara. Tombol konsultasi di dalam demo mengarah ke https://sumberrejekitech.web.id (konstanta `SITE` di `src/config.ts`).

## Halaman
Dashboard, Event Overview (termasuk edit detail dan Selesaikan event), Planning dan Milestones, Timeline, Rundown, Live Monitoring, Operational Checklist, Participants Overview, Reports, About Demo.

## Catatan
- Semua input divalidasi dan tidak ada HTML mentah yang dirender.
- Export laporan dan upload dokumen sengaja dinonaktifkan pada demo.
- Jika data sesi rusak, aplikasi otomatis kembali ke data awal. Jika terjadi error tak terduga, tampil halaman pemulihan dengan tombol "Reset dan muat ulang" (hanya untuk pemulihan dari error, bukan fitur pemakaian ulang).

## Branding
Logo: `public/logo.png` (transparan). Warna merek dari logo: navy `#01205c` dan oranye `#ff7f01` (diatur di `tailwind.config.js`). Teks pada tombol oranye memakai navy karena putih di atas oranye hanya berkontras 2,5:1. Watermark memakai logo plus teks DEMO — SUMBER REJEKI TECH.

## Tampilan dan alur demo
- Tema mengikuti referensi demo Sumber Rejeki Tech lainnya: sidebar navy dengan penanda oranye, watermark logo berulang (`public/wm-tile.png`), font Plus Jakarta Sans (dimuat lokal, tanpa CDN).
- Alur demo terpandu 5 langkah (`src/flow.tsx`): stepper di atas setiap halaman, petunjuk "Coba sekarang", tombol "Lanjut ke langkah berikutnya", dan notifikasi saat langkah selesai. Langkah dihitung dari tindakan nyata pengunjung dan ikut direset oleh Reset Demo.
- Animasi: transisi halaman, kartu muncul bertahap, KPI menghitung naik, bar dan grafik tumbuh, penanda LIVE berdenyut, modal dan notifikasi masuk halus. Semuanya otomatis nonaktif jika pengguna mengaktifkan "kurangi gerakan".

## Satu event saja
Aplikasi ini dibuat khusus untuk satu event milik client. Tidak ada fitur tambah event, hapus event, daftar event, atau pemilih event. Detail event (nama, tanggal, lokasi, manager, status) tetap bisa diedit dari halaman Event Overview. Seluruh dashboard, laporan, dan alur demo (5 langkah) berisi data event tersebut saja. Data awal ada di `src/seed.ts`; ganti nama, tanggal, milestone, rundown, dan checklist di sana untuk menyesuaikan dengan event client.

Secara struktur, data disimpan sebagai satu objek event (`State.ev`), bukan daftar, sehingga multi event tidak mungkin terjadi. Format data lama berbentuk daftar otomatis ditolak.

## Sekali pakai
Setelah semua sesi rundown selesai (atau tombol Selesaikan event ditekan), status event menjadi Completed dan dashboard dikunci: semua input dinonaktifkan, aksi ditolak di tingkat state, dan banner kunci tampil. Tidak ada tombol reset. Catatan: karena tidak ada server, penguncian berlaku per sesi browser (sessionStorage). Penguncian satu kali lintas perangkat memerlukan backend/database.
