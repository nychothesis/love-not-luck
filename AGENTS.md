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
  versi umum LNL. Setelah submit sukses, pembaca masuk ke halaman OTO
  `one-time-offer/` (sejak 2026-11-04; `cewe-labirin/` sekarang cuma redirect ke sana). Dari OTO: beli lewat checkout OrderHero,
  atau link skip "Nanti dulu, aku ambil guide gratisnya dulu" ke
  `cewe-mokondo/thanks.html`, lalu ke grup WhatsApp. Link ebook hanya ada di
  deskripsi grup.
- Checkout (2026-11-02): OrderHero toko `nychothesis.orderhero.id`, produk
  "Love, Not Luck (Pre-order)" Rp397rb, Form Order
  lama `https://nychothesis.orderhero.id/form/form-order-love-not-luck`, kupon
  `LNLPO` −Rp100rb berlaku sampai 10 Des 2026 (= akhir pre-order = rilis
  materi). Biaya transaksi dibayar pembeli (termasuk platform fee 5% Free
  Plan). Konten digital = link grup WA pembeli + link grup LM di instruksi.
  Halaman OTO untuk traffic setelah opt-in; pre-order tanpa banner untuk CTA konten; grup LM dikasih kode
  yang sama lewat pesan.
- Form mini ebook memakai satu pilihan masalah utama: "Jarang ketemu kenalan
  baru yang potensial", "Suka sama seseorang, tapi dia ga tertarik balik", atau
  "Suka dapet orang yang salah". Pilihan di form, validasi Worker, dan field
  EmailOctopus `MasalahDatingUtama` harus tetap sama.

- CTA OTO (2026-11-03): setiap enam lokasi tombol penawaran disertai tombol
  guide gratis berbingkai dan teks terbaca, menuju `cewe-mokondo/thanks.html`.
  Mengikuti masukan Mike yang dikirim Nicho. Sinkron master Notion masih tertunda
  karena koneksi Notion belum tersedia di sesi ini.

- Checkout LMS (2026-11-03): kelas MemberHero `CLS-26683ZPE` aktif, harga
  Rp397rb sekali bayar. Checkout aktif baru:
  `https://nychothesis.orderhero.id/form/love-not-luck-kelas`. Tombol beli
  `pre-order/index.html` dan `one-time-offer/index.html` mengarah ke sini. Enrollment otomatis + email
  kredensial aktif; WA otomatis nonaktif. Modul sambutan memuat tanggal rilis
  10 Des 2026 dan link grup pembeli. Kupon LNLPO mencakup produk lama DAN
  kelas, diuji di checkout kelas: total QRIS Rp313.929 setelah diskon.
  Tes checkout gratis Rp0 3 Nov 2026 berhasil: email akses diterima, login
  siswa dan halaman sambutan lolos. QRIS berbayar belum diuji. Produk dan
  form lama tidak dihapus. Detail kelanjutan: `HANDOFF.md`.

## Halaman
| File | Fungsi |
|---|---|
| `index.html` | Opt-in: form nama, email, username IG (opsional), gender, dan **forced choice** satu rasa sakit (susah dapet vs sering dapet yang salah). Satu halaman netral gender. |
| `thanks.html` | "Cek email lu" setelah submit. |
| `cewe-mokondo/index.html` | LP khusus mini ebook cewe. Copy dan visual mengikuti tema maroon LP utama. |
| `cewe-mokondo/thanks.html` | Setelah daftar, arahkan ke grup WhatsApp. Link mini ebook hanya ada di deskripsi grup, bukan di LP atau halaman ini. |
| `one-time-offer/index.html` | **Halaman OTO/jualan aktif** (dulu `cewe-labirin/`, yang sekarang tinggal redirect) (banner "PENAWARAN EXCLUSIVE"), `noindex`. Harga Rp297rb via kode LNLPO, coret Rp397rb, value stack sementara total Rp3jt (nunggu konsul mentor), rilis 10 Des 2026. Tombol "Ambil" ke checkout OrderHero, tombol "Amankan" scroll ke `#harga`. Platform materi: LMS OrderHero (MemberHero), video bisa upload Loom. File `_*.html` = sampel review desain. |
| `cewe/index.html` | Draft lama (sebelum versi labirin) sales page pre-order Love, Not Luck khusus cewe (Rp297rb, normal Rp397rb), `noindex`. Master copy di Notion "🤍 LP Love, Not Luck"; HTML ngikut copy di sana. Placeholder `.ph` (tanggal, value stack, platform) belum diisi, tombol CTA masih loncat ke `#harga` sampai link checkout ada. Stickman `img/pain-*.svg` digambar dari rig S56 (`herk-edit-kit/tools/nychothesis-editor/stick-rig.mjs`). Blur panel sengaja dimatiin di sini karena bikin halaman kepotong pas scroll. |
| `webinar/index.html` | LP lead magnet **webinar gratis** (pengganti LM cewe-mokondo mulai Nov 2026). Struktur ngikut `paradoxical-man-lp/webinar.html`, desain LNL maroon. Field form sama kayak cewe-mokondo; kirim `lm: 'webinar'` ke Worker (tag `lm-webinar`), lalu ke `one-time-offer/?source=webinar`. Copy sementara = LNL versi lite (keputusan Nicho 2026-11-09); jadwal webinar #1 Kamis 19 Nov 2026 19.00 WIB (Nicho 2026-11-12, sebelumnya 10 Des). Rencana 4 webinar mingguan sebelum launch (saran Rama Satya, detail di vault 🤍 Love, Not Luck). Hero sengaja BEDA dari poster labirin program berbayar biar ga ketuker pas masuk OTO. Versi aktif (Nicho 2026-11-12) = poster "speaker live": foto Nicho lagi ngomong (`webinar/img/speaker.webp` dari `cewe/img/nicho-speaker.jpg`) duotone marun, pill "LIVE ONLINE" kiri atas, badge emas kecil "WEBINAR GRATIS" di atas judul (opsi C, Nicho 2026-11-12). Sampel lain di `webinar/_poster-samples.html` dan `_label-samples.html`. Ditolak: foto studio gede, cutout + glow merah, hero tipografi + avatar. Baris "Versi perkenalan…" di hero dihapus; heading pakai lockup core offer (lockup-sub + tail "Biar kamu ga ketemu sama cowo toxic mulu."), tanpa nama LOVE, NOT LUCK (Nicho 2026-11-12). og:image = `webinar/img/og-webinar.jpg`. OTO `?source=webinar` nambah kotak "Webinar gratis yang kamu daftarin itu versi perkenalannya. Kurikulum lengkap Love, Not Luck ada di halaman ini." di atas tombol beli. Paragraf intro dipecah jadi 3 poin rasa sakit + kalimat highlight (Nicho 2026-11-12, sinkron Notion tertunda). Class `.ph` siap dipakai lagi kalau ada placeholder. |
| `webinar/thanks.html` | "Kamu udah terdaftar" + grup WA. Grup khusus "Love, Not Luck WEBINAR" (`IJR4YkFLl0MCwxywNJn21w`, Nicho 2026-11-11), bukan lagi grup LM. |
| `signup-worker/` | Backend form custom mini ebook cewe. Validasi data lalu simpan ke list EmailOctopus. Tag dari field `lm`: kosong/`cewe-mokondo` = `lm-cewe-mokondo`, `webinar` = `lm-webinar`. API key disimpan sebagai Cloudflare Worker secret. |
| `funnel.css` | Style bersama, hasil salinan funnel Paradoxical Man. Hero mengikuti pola poster `webinar.html` (judul + subtitle jadi satu heading besar di kartu poster), tapi tanpa foto: visualnya radar chart SVG. |
| `theme-maroon.css` | Tema maroon (dasar maroon gelap, bukan hitam). **Aktif sekarang.** Mau balik ke hitam: hapus baris `<link ... theme-maroon.css>` di `index.html` dan `thanks.html`. Dasar sengaja maroon gelap karena emas di atas maroon terang (#B0413C) kontrasnya jelek. |

## Yang masih kosong (TODO)
- `ENDPOINT` di `index.html` kosong. Harus diisi form EmailOctopus buat list
  baru Love, Not Luck. **Jangan pakai endpoint Paradoxical Man.** Nama kolom
  form (`nama`, `email`, `gender`, `rasa_sakit`) harus dipetakan ke field list.
- Lead magnet (2026-10-06): **ebook pendek Peta Zaman**, judul kerja "Bukan
  Salah Hoki: Kenapa Dapet Pasangan yang Tepat Berasa Makin Susah Zaman
  Sekarang". Self-test dibuang. Ebook belum dibuat, jadi link jangan disebar.
- `WA_LINK` di `thanks.html` dan `cewe-mokondo/thanks.html` memakai link grup
  yang sama. Per Nicho 2026-11-01 itu grup khusus Love, Not Luck (±170 orang),
  bukan lagi grup webinar Paradoxical Man (keputusan sementara 2026-10-06).
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
  `1 - Projects/Nychothesis/🤍 Love, Not Luck.md`.

## Kata ganti hero (2026-11-09)
- Hero pre-order dan OTO: "cowo impian lu" dan "Biar lu ga ketemu" diganti "kamu", biar satu halaman ga campur lu/kamu (aturan voice LNL cewe = gw/kamu). Sinkron ke master Notion "🤍 LP Love, Not Luck" masih tertunda.

## Sistem harga (2026-11-12, saran Rama Satya)
- Harga normal kelas MemberHero `CLS-26683ZPE` = Rp297.000 (sebelumnya Rp397rb), ditampilkan dicoret.
- `LNLPO` = diskon 20% (Rp237.600) buat OTO abis daftar webinar (`one-time-offer/`). `LNLWEBINAR` = diskon 10% (Rp267.300) buat jualan di dalam webinar (`pre-order/`). Dua-duanya berlaku sampai 10 Des 2026, khusus produk lama + kelas.
- Tes checkout 12 Nov (tanpa bayar): LNLPO total Rp251.144, LNLWEBINAR Rp282.537 (termasuk biaya transaksi). Bullet checkout ga nyebut kode biar kode OTO ga bocor.
- Pembeli pertama (bayar Rp297rb) dapet cashback Rp60rb, ditransfer Nicho sendiri.

## OTO mode webinar (2026-11-09)
- `one-time-offer/?source=webinar` ganti teks topbar dan keenam tombol skip jadi versi webinar (ke `webinar/thanks.html`). Tanpa param, OTO tetap versi guide.

## Pemisahan jalur (2026-11-04)
- `/one-time-offer/`: halaman OTO semula, banner eksklusif tetap ada. Signup guide dan redirect lama `/cewe-labirin/` menuju ke sini.
- `/pre-order/`: landing page untuk link DM dari CTA konten. Banner eksklusif atas dan keenam tombol guide gratis dihapus; harga, checkout, dan copy lain tetap sama. Tombol guide gratis tetap ada di OTO. Aset/CSS bersama berada di `pre-order/`.
- Sinkron master Notion "🤍 LP Love, Not Luck" tertunda karena koneksi Notion tidak tersedia.
