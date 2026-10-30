# Love, Not Luck: funnel

Halaman opt-in buat lead magnet gratis flagship **Love, Not Luck** (program
gabungan narik + milih orang yang tepat, netral gender). Halaman publik buat
konversi, jadi copy-nya sensitif: jangan diubah tanpa diminta.

Setiap revisi copy atau keputusan LP yang disetujui Nicho wajib ikut
disinkronkan ke master Notion "🤍 LP Love, Not Luck". Bedakan keputusan
final dari konsep yang masih dieksplorasi. Kalau akses Notion belum tersedia,
catat patch tertunda di handoff dan jangan klaim master sudah diperbarui.

> Untuk pekerjaan user-facing yang menyentuh brand, baca `../BRAND.md` dulu.
> Aturan universal berlaku dari `../AGENTS.md`.

## Status (2026-10-16)
- Repo publik `nychothesis/love-not-luck` sudah dibuat dan GitHub Pages sudah
  diaktifkan (branch `main`, path `/`) di
  `https://nychothesis.com/love-not-luck/`. Halaman utama `noindex`,
  tetapi form utama belum berfungsi dan lead magnet utama belum ada.
- Deploy: push ke `main`, Pages auto-update. Nggak ada build step.
- Situs statis tanpa build step, gaya dan font disalin dari
  `paradoxical-man-lp/` (Inter, gelap `#121110`, emas).
- LP mini ebook cewe dengan form custom satu halaman sudah live di
  `https://nychothesis.com/love-not-luck/cewe-mokondo/`. Cloudflare Worker
  `nychothesis-lm-signup.nicho-aurelius.workers.dev` aktif, API key
  EmailOctopus terpasang sebagai secret, dan endpoint di `signup.js` terisi.
  Uji signup ke Worker live lolos: semua field dan tag tersimpan di
  EmailOctopus; kontak uji dihapus sesudahnya. Halaman publik dan script
  sudah dicek setelah push GitHub Pages.
- List `Love, Not Luck` memakai tag `lm-cewe-mokondo`. Field wajib: email,
  nama, username IG, gender (Cowo lalu Cewe), dan "Masalah dating utama"
  versi umum LNL. Setelah submit sukses, pembaca masuk ke
  `cewe-mokondo/thanks.html`, lalu ke grup WhatsApp. Link ebook hanya ada di
  deskripsi grup.
- Form mini ebook memakai satu pilihan masalah utama: "Jarang ketemu kenalan
  baru yang potensial", "Suka sama seseorang, tapi dia ga tertarik balik", atau
  "Suka dapet orang yang salah". Pilihan di form, validasi Worker, dan field
  EmailOctopus `MasalahDatingUtama` harus tetap sama.

## Halaman
| File | Fungsi |
|---|---|
| `index.html` | Opt-in: form nama, email, username IG (opsional), gender, dan **forced choice** satu rasa sakit (susah dapet vs sering dapet yang salah). Satu halaman netral gender. |
| `thanks.html` | "Cek email lu" setelah submit. |
| `cewe-mokondo/index.html` | LP khusus mini ebook cewe. Copy dan visual mengikuti tema maroon LP utama. |
| `cewe-mokondo/thanks.html` | Setelah daftar, arahkan ke grup WhatsApp. Link mini ebook hanya ada di deskripsi grup, bukan di LP atau halaman ini. |
| `cewe/index.html` | Draft sales page pre-order Love, Not Luck khusus cewe (Rp287rb), `noindex`. Master copy di Notion "🤍 LP Love, Not Luck"; HTML ngikut copy di sana. Placeholder `.ph` (tanggal, harga normal, platform) belum diisi, tombol CTA masih loncat ke `#harga` sampai link checkout ada. Stickman `img/pain-*.svg` digambar dari rig S56 (`herk-edit-kit/tools/nychothesis-editor/stick-rig.mjs`). Blur panel sengaja dimatiin di sini karena bikin halaman kepotong pas scroll. |
| `signup-worker/` | Backend form custom mini ebook cewe. Validasi data lalu simpan ke list EmailOctopus dengan tag `lm-cewe-mokondo`. API key disimpan sebagai Cloudflare Worker secret. |
| `funnel.css` | Style bersama, hasil salinan funnel Paradoxical Man. Hero mengikuti pola poster `webinar.html` (judul + subtitle jadi satu heading besar di kartu poster), tapi tanpa foto: visualnya radar chart SVG. |
| `theme-maroon.css` | Tema maroon (dasar maroon gelap, bukan hitam). **Aktif sekarang.** Mau balik ke hitam: hapus baris `<link ... theme-maroon.css>` di `index.html` dan `thanks.html`. Dasar sengaja maroon gelap karena emas di atas maroon terang (#B0413C) kontrasnya jelek. |

## Yang masih kosong (TODO)
- `ENDPOINT` di `index.html` kosong. Harus diisi form EmailOctopus buat list
  baru Love, Not Luck. **Jangan pakai endpoint Paradoxical Man.** Nama kolom
  form (`nama`, `email`, `gender`, `rasa_sakit`) harus dipetakan ke field list.
- Lead magnet (2026-10-06): **ebook pendek Peta Zaman**, judul kerja "Bukan
  Salah Hoki: Kenapa Dapet Pasangan yang Tepat Berasa Makin Susah Zaman
  Sekarang". Self-test dibuang. Ebook belum dibuat, jadi link jangan disebar.
- `WA_LINK` di `thanks.html` sementara pakai grup WA webinar Paradoxical Man
  (keputusan Nicho 2026-10-06). Ganti kalau nanti ada grup khusus Love, Not Luck.
- Copy hero diputuskan Nicho (2026-10-06): subtitle "Cara Narik & Dapetin
  Pasangan yang Tepat, Tanpa Ngandalin Hoki", sub-subtitle badge "Bukan ebook
  dating biasa. Psikologi & filosofi yang legit, plus pengalaman nyata gw"
  (opsi 3, lagi dicoba). Klaim "legit" dan "pengalaman nyata" harus bisa
  dibuktikan di isi ebook.
- Radar chart di index.html cuma ilustrasi bentuk (pilar kuat vs bocor), bukan
  skor siapa pun. Urutan pilar ngikut mindmap: Fisik, Emosional, Sosial,
  Kompetensi, Spiritual, Seksual. Jangan diganti jadi data atau testimoni palsu.
- GA4 udah dipasang, property sama dengan homepage (`G-FFND4PK6SC`), dibedain
  lewat path. Belum ada halaman penjualan (sales page) flagship.
- Varian headline cowok/cewek sengaja belum ada (sign-up masih sedikit).
  Bisa ditambah lewat `?v=cowok` / `?v=cewek` kalau ada alasan.

## Keputusan yang melatarbelakangi
- Satu flagship netral gender. Gender dipisah cuma di hook dan headline, bukan
  di nama atau isi program.
- Jangan taruh data pribadi (gender, pilihan rasa sakit) di parameter URL.
- Jangan janjiin hal yang bergantung ke orang lain ("pasti dapet pasangan").
  Janji cuma yang bisa dikendaliin pembaca.
- Detail diskusi dan keputusan ada di vault
  `2 - Projects/Nychothesis/🤍 Love, Not Luck.md`.
