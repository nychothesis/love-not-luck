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
| `webinar/index.html` | LP lead magnet **webinar gratis** (pengganti LM cewe-mokondo mulai Nov 2026). Struktur ngikut `paradoxical-man-lp/webinar.html`, desain LNL maroon. Field form sama kayak cewe-mokondo; kirim `lm: 'webinar'` ke Worker (tag `lm-webinar`), lalu ke `one-time-offer/?source=webinar`. Copy sementara = LNL versi lite (keputusan Nicho 2026-11-09); jadwal batch berikutnya Kamis 26 Nov 2026 19.00 WIB (Nicho 2026-11-20; batch #1 = 19 Nov, sebelumnya 10 Des). Rencana 4 webinar mingguan sebelum launch (saran Rama Satya, detail di vault 🤍 Love, Not Luck). Hero sengaja BEDA dari poster labirin program berbayar biar ga ketuker pas masuk OTO. Versi aktif (Nicho 2026-11-12) = poster "speaker live": foto Nicho lagi ngomong (`webinar/img/speaker.webp` dari `cewe/img/nicho-speaker.jpg`) duotone marun, pill "LIVE ONLINE" kiri atas, badge emas kecil "WEBINAR GRATIS" di atas judul (opsi C, Nicho 2026-11-12). Sampel lain di `webinar/_poster-samples.html` dan `_label-samples.html`. Ditolak: foto studio gede, cutout + glow merah, hero tipografi + avatar. Baris "Versi perkenalan…" di hero dihapus; heading sejak 2026-11-20 (Nicho, coba dulu): "Paham Rahasia Terhindar dari Cowo *Red Flag*, *Mokondo*, dan NPD (yang Keliatannya dari Luar Baik-Baik) Cuma dalam 1 Jam", kapital judul ngikut PUEBI (kata tugas huruf kecil), kata asing dan daerah miring, ejaan santai (cowo, keliatannya) dipertahankan; tail lama dihapus. Heading lama: lockup core offer "Cara narik & dapetin cowo impian kamu, tanpa ngandalin hoki" + tail "Biar kamu ga ketemu sama cowo toxic mulu.", tanpa nama LOVE, NOT LUCK (Nicho 2026-11-12). Heading terbaru (Nicho 2026-11-20 malam): "Paham Rahasia Terhindar dari Cowo Patriarki, Munafik, dan NPD" + sub "Padahal dari luar keliatannya kayak *cowo idaman* banget" (cowo idaman emas), tanpa "Cuma dalam 1 Jam"; NPD = hook, disclaimer di materi; cover = `img/cover-topeng.webp` (hasil ChatGPT, tint lama dimatiin); pain list = 5 pasangan "keliatannya X, ternyata Y" (agama, provider, pemimpin, percaya diri charming = NPD, alim); sisi kanan cover difade biar topeng ga keliatan kepotong; 6 Pillars dibuang dari LP. Fokus produk LNL = satu pain, menghindari cowo yang salah. Duplikat LP ditunda. Turunan yang masih belum diubah: og:image, OTO `?source=webinar`, thanks page. Dropdown form (Nicho 2026-11-21): diganti jadi checkbox "Cowo kayak gimana yang paling kamu takutin buat ketemu? (pilih maksimal 2)" dengan 5 pilihan = 5 pasangan pain list. `signup-worker/worker.mjs` udah nerima itu (superset, 3 pilihan lama tetap valid, multi disimpen satu teks dipisah ` | ` di `MasalahDatingUtama`) dan SUDAH di-deploy via `npx wrangler deploy` (21 Nov 2026, version 30c33e28). Form webinar + `webinar/signup.js` (maks 2, kirim `datingPains` array, script versi `?v=20261121a`) udah dipasang. Tiap ngubah `signup.js`, bump `?v=` di tag script, kalo ga browser yang nge-cache bisa pake JS lama. Signup lewat form baru otomatis dapet tag EmailOctopus `pertanyaan-tipe-cowo` selain `lm-webinar` (Worker version terbaru 21 Nov), buat misahin dari jawaban 3 pilihan lama. Tag batch webinar: Worker nambahin tag dari `WEBINAR_BATCH` di `signup-worker/wrangler.toml` (sekarang `webinar-b2`, buat webinar 26 Nov) ke tiap signup webinar. **Abis tiap webinar, ganti ke batch berikutnya (webinar-b3, dst.) lalu `npx wrangler deploy`.** Tag topik batch: `WEBINAR_TOPIC` (sekarang `topik-hindari-cowo`, produk 1; ganti bareng `WEBINAR_BATCH` kalo batch berikutnya bahas produk lain, mis. `topik-cowo-betah`). Signup batch 1 (sebelum 19 Nov) ga ada tag batch, kalo perlu ditempel manual by tanggal masuk. Penamaan tag: `lm-` sumber, `webinar-bN` batch, `topik-` topik, `hadir-bN` kehadiran (manual), `pertanyaan-` versi form. Test signup beneran (nerima 2 pilihan + tag baru) belum dites live krn bikin kontak asli. Rough LP produk 2 (cowo betah) = `webinar/_produk2-sample.html`, lokal, jangan di-commit. Cover gambar: area foto lebih tinggi (410px HP, 480px desktop), fade bawah mulai 84%. og:image = `webinar/img/og-webinar.jpg`. OTO `?source=webinar` nambah kotak "Webinar gratis yang kamu daftarin itu versi perkenalannya. Kurikulum lengkap Love, Not Luck ada di halaman ini." di atas tombol beli. Paragraf intro dipecah jadi 3 poin rasa sakit + kalimat highlight (Nicho 2026-11-12, sinkron Notion tertunda). Class `.ph` siap dipakai lagi kalau ada placeholder. |
| `webinar/thanks.html` | "Kamu udah terdaftar" + grup WA. Link grup sejak 2026-11-23 = grup webinar batch 2 (`BxXNssG9LQk9CzfzypsOzA`, Nicho); grup batch 1 sebelumnya `IJR4YkFLl0MCwxywNJn21w` (2026-11-11). Aturan: grup WA baru per batch, nama pakai tanggal; ganti link ini tiap batch. Bukan lagi grup LM. |
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

## Update webinar 23 Nov 2026 (Nicho)
- Heading webinar dan LP produk 1 (`hindari-cowo-toxic/`): "Paham Rahasia Terhindar dari **Cowo Red Flag yang Terlihat Green Flag**" + baris pendukung bergaya sub-subheading offer 2 (tegak, chip emas di "bersembunyi di baliknya"): "Kenali karakteristik patriarki, munafik, manipulatif, love bombing, dan pola narsistik yang bisa bersembunyi di baliknya". Batasan offer 1 = sebelum jadian (masa PDKT); masalah di hubungan yang udah lama jalan (stonewalling, silent treatment) = kandidat produk lain, jangan masuk heading.
- Pain list dan checkbox form webinar jadi 6 pasangan: ditambah "Keliatannya perhatian dan serius banget dari awal, ternyata love bombing: intens di awal, lalu tiba-tiba menghilang" (urutan pertama). `signup.js` (`?v=20261123a`), Worker `PAINS`, dan tes ikut ditambah; Worker di-deploy (version fe2c4171). "(karakteristik NPD)" diganti "(pola narsistik)".
- Bullet "Yang kamu dapet" dibikin what/why, tanpa kata "cara" (webinar tidak ngajarin how). Aturan isi webinar: semua tipe dibahas (apa dan kenapa), cuma satu yang didalemin (usul: love bombing); cara menyikapi, cara ngetes, dan daftar tanda lengkap per tipe tidak dibagi.
- `<title>`, meta description, dan og:title/description webinar diganti ke heading baru. `og-webinar.jpg` foto polos, tidak ada teks heading.
- `webinar/thanks.html`: kalimat "Udah di grup webinar 26 Nov?". Link WA masih grup lama sampai Nicho kasih link grup batch 2.
- Belum dilakukan: tes signup live (butuh email tes, bikin kontak asli), sinkron Notion master v2.1 (bagian heading lama), link grup WA batch 2.
- **Form webinar berubah lagi (23 Nov 2026, Nicho):** pertanyaan "tipe cowo yang paling ditakutin" (checkbox maks 2) DIBUANG, diganti **status hubungan** (radio: Single, Lagi PDKT, Pacaran, Menikah; wajib) + checkbox **"Kabarin gw kalau nanti ada program buat cowo"** yang tampil buat semua gender (cewe bisa mau beliin buat cowonya; Nicho 23 Nov). Status ditambah **Bercerai** (5 opsi). Worker (version 4d137f51): bentuk baru `relationshipStatus` + `maleInterest` jadi tag `pertanyaan-status-hubungan`, `status-single|pdkt|pacaran|menikah`, `status-bercerai`, `minat-produk-cowo` (semua gender; bedain lewat field Gender). Field `MasalahDatingUtama` ga dikirim lagi dari webinar. Bentuk lama (`datingPain`/`datingPains`) tetap diterima Worker buat form cewe-mokondo. `signup.js` `?v=20261123c`. Pain list di LP tetap 6 pasangan (copy), tapi tidak lagi jadi pertanyaan form.
