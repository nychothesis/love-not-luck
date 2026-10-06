# Love, Not Luck: funnel

Halaman opt-in buat lead magnet gratis flagship **Love, Not Luck** (program
gabungan narik + milih orang yang tepat, netral gender). Halaman publik buat
konversi, jadi copy-nya sensitif: jangan diubah tanpa diminta.

> Untuk pekerjaan user-facing yang menyentuh brand, baca `../BRAND.md` dulu.
> Aturan universal berlaku dari `../AGENTS.md`.

## Status (2026-10-06)
- Repo publik `nychothesis/love-not-luck` sudah dibuat dan GitHub Pages sudah
  diaktifkan (branch `main`, path `/`), URL yang dituju
  `https://nychothesis.com/love-not-luck/`. **Status build Pages belum
  diverifikasi** (pengecekan URL live diblokir sesi ini). Halaman `noindex`,
  tapi form belum berfungsi dan ebook belum ada.
- Deploy: push ke `main`, Pages auto-update. Nggak ada build step.
- Situs statis tanpa build step, gaya dan font disalin dari
  `paradoxical-man-lp/` (Inter, gelap `#121110`, emas).

## Halaman
| File | Fungsi |
|---|---|
| `index.html` | Opt-in: form nama, email, gender, dan **forced choice** satu rasa sakit (susah dapet vs sering dapet yang salah). Satu halaman netral gender. |
| `thanks.html` | "Cek email lu" setelah submit. |
| `funnel.css` | Style bersama, hasil salinan funnel Paradoxical Man. Hero mengikuti pola poster `webinar.html` (judul + subtitle jadi satu heading besar di kartu poster), tapi tanpa foto: visualnya radar chart SVG. |
| `theme-maroon.css` | Tema maroon (dasar maroon gelap, bukan hitam). **Aktif sekarang.** Mau balik ke hitam: hapus baris `<link ... theme-maroon.css>` di `index.html` dan `thanks.html`. Dasar sengaja maroon gelap karena emas di atas maroon terang (#B0413C) kontrasnya jelek. |

## Yang masih kosong (TODO)
- `ENDPOINT` di `index.html` kosong. Harus diisi form EmailOctopus buat list
  baru Love, Not Luck. **Jangan pakai endpoint Paradoxical Man.** Nama kolom
  form (`nama`, `email`, `gender`, `rasa_sakit`) harus dipetakan ke field list.
- Lead magnet diputuskan: **ebook pendek + self-test skor 6 pilar** (5 Okt
  2026). Ebook-nya sendiri belum dibuat, jadi halaman ini jangan live dulu.
  Copy "Ambil ebook + self-test gratisnya" harus disesuaikan kalau isinya berubah.
- Copy hero diputuskan Nicho (2026-10-06): subtitle "Cara Narik & Dapetin
  Pasangan yang Tepat, Tanpa Ngandalin Hoki", sub-subtitle badge "Bukan ebook
  dating biasa. Psikologi & filosofi yang legit, plus pengalaman nyata gw"
  (opsi 3, lagi dicoba). Klaim "legit" dan "pengalaman nyata" harus bisa
  dibuktikan di isi ebook.
- Radar chart di index.html cuma ilustrasi (skor contoh, dilabelin "bukan
  data asli"). Jangan diganti jadi data atau testimoni palsu.
- Belum ada Google Analytics, belum ada halaman penjualan (sales page) flagship.
- Varian headline cowok/cewek sengaja belum ada (sign-up masih sedikit).
  Bisa ditambah lewat `?v=cowok` / `?v=cewek` kalau ada alasan.

## Keputusan yang melatarbelakangi
- Satu flagship netral gender. Gender dipisah cuma di hook dan headline, bukan
  di nama atau isi program.
- Jangan taruh data pribadi (gender, pilihan rasa sakit) di parameter URL.
- Jangan janjiin hal yang bergantung ke orang lain ("pasti dapet pasangan").
  Janji cuma yang bisa dikendaliin pembaca.
- Detail diskusi dan keputusan ada di vault
  `2 - Projects/Nychothesis/🔬 Riset Audience & New Offer.md`.
