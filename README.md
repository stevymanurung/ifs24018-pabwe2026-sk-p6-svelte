# Delcom Link Tree — Svelte 5

Proyek praktikum PABWE 2026 untuk akun `ifs24018`, menggunakan Svelte 5, Vite, JavaScript, router kustom, dan API Delcom.

## Menjalankan aplikasi

1. Pastikan Node.js 20+ dan Bun atau npm tersedia.
2. Dari folder proyek jalankan `bun install` (atau `npm install`).
3. Jalankan `bun run dev` (atau `npm run dev`). Aplikasi berjalan di `http://localhost:3004`.
4. Untuk produksi jalankan `bun run build`, lalu `bun run preview`.

Base URL API disetel pada `.env` sebagai `VITE_DELCOM_BASEURL=https://open-api.delcom.org/api/v1`.

## Fitur

- Login dan registrasi dengan selector login yang diwajibkan praktikum.
- Daftar Link Tree, pencarian, filter milik saya, statistik, pembuatan dan penghapusan.
- Detail koleksi, perubahan metadata dan sampul, tambah/ubah/hapus item tautan.
- Halaman profil, unggah foto, perubahan kata sandi, dan daftar pengguna.
- Layout responsif, label formulir, status error, metadata SEO dasar, serta logo tautan.

## Catatan API

Semua operasi API berada di `src/features/*/api/`. Format respons diasumsikan mengikuti dokumentasi Delcom (`data.link_trees`, `data.link_tree`, `data.user`). Jika versi API mengembalikan bentuk token atau nama field berbeda, sesuaikan mapping di `authApi.js`/`LoginPage.svelte`.

## Pengujian

`bun run test` menjalankan Vitest. `bun run test:coverage` menjalankan coverage dengan ambang 100% yang dikonfigurasi pada helper, API, store, dan router. Jalankan dan verifikasi pengujian pada lingkungan lokal setelah dependensi terpasang.
