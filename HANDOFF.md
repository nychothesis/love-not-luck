# OrderHero hosting setup

Checkpoint: 3 November 2026, Asia/Jakarta.

## Otorisasi dan tujuan
Nicho meminta seluruh setup pre-order sampai akses LMS dibereskan, lewat Chrome.
Tetap Rp397rb, LNLPO diskon Rp100rb hingga 10 Desember 2026. Jangan upgrade
plan berbayar atau melakukan pembayaran tanpa otorisasi transaksi.

## Keadaan terverifikasi
- Chrome akun dashboard terakhir nicho.aurelius.
- Produk digital lama 6ae84a61500c56efd1b43f30 berisi link WA; tidak dihapus.
- Form lama 6ae84a62500c56efd1b43f31 /form/form-order-love-not-luck tidak dihapus.
- Kelas baru CLS-26683ZPE: Love, Not Luck, aktif, Rp397.000 sekali bayar.
- Cover poster-approved-exact.png berhasil diupload setelah izin file URL
  extension Chrome diaktifkan sendiri oleh Nicho.
- Enrollment otomatis dan email kredensial aktif, WA sambutan dimatikan dan
  tersimpan. Tab Automation berhasil menampilkan Settings saved.
- Modul Mulai di sini, satu pelajaran Custom HTML Selamat datang di Love, Not Luck,
  berisi rilis 10 Desember 2026 dan tombol WA pembeli. Tersimpan dan dibuka
  ulang setelah reload; preview iframe menampilkan isi dan hyperlink benar. Materi utama
  belum tersedia dan tidak dibuatkan materi palsu.
- Form kelas 6ae9b4125a79a48b4bfdcef4, URL
  https://nychothesis.orderhero.id/form/love-not-luck-kelas dapat diakses publik.
  Field hanya nama, WhatsApp, email. Daftar manfaat + voucher + rilis ada.
- Editor rich text checkout bermasalah: fill/paste merotasi teks; deskripsi
  singkat dimatikan, informasi penting ditempatkan pada bullet teks biasa.
  Jangan aktifkan deskripsi singkat sebelum isinya diperbaiki.
- LNLPO cakupan produk lama + kelas, jadwal dan nominal dipertahankan.
  Checkout kelas diverifikasi diskon Rp100.000, biaya Rp16.929, total Rp313.929.
- Bukti screenshot /tmp/lnl-checkout-kelas.png (sementara).

## Sisa verifikasi
- Tes checkout gratis Rp0 berhasil 3 Nov 2026 pukul 18:03 WIB, order
  FO2639CQR5JA. Voucher privat 100% khusus kelas, total limit 1.
  Email pesanan dan Selamat! Akses Kelas Aktif diterima di email tes pilihan
  Nicho. Login memakai kredensial yang diberikan di halaman akses berhasil,
  dashboard menunjukkan 1 kelas dan sambutan + hyperlink WA tampil.
  Bukti /tmp/lnl-tes-pembeli.png. Jangan simpan password/link akses bearer.
  Voucher tes tidak muncul lagi di daftar kupon setelah dipakai dan reload.
  Pembayaran QRIS berbayar (callback/payment gateway) dan pemutaran video
  belum diuji; materi utama belum ada.
- Preview dan login siswa sebenarnya sudah diuji dengan pembelian gratis.
- Halaman terima kasih checkout belum dikustomisasi.
- Sinkron master Notion tertunda: connector Notion tidak tersedia.
- Link LP diubah ke checkout kelas; cek commit/deploy terbaru sebelum lanjut.
- Keputusan akses lifetime belum dibahas khusus: UI one-time payment menyebut
  lifetime access. Jangan menambah janji durasi di copy publik.

## Update funnel 4 November 2026
- Permintaan Nicho: OTO pindah ke `/love-not-luck/one-time-offer/`; `/love-not-luck/pre-order/` dipakai untuk link DM dari CTA konten, hanya tanpa banner eksklusif atas.
- Signup guide dan redirect `/cewe-labirin/` sekarang ke OTO. Harga, checkout, dan semua copy/tombol lain dipertahankan. CSS/gambar OTO memakai aset bersama di `pre-order/`.
- Patch master Notion tertunda (koneksi tidak tersedia): catat dua URL dan perbedaan banner ini di "🤍 LP Love, Not Luck".

- Revisi lanjutan 4 November: keenam tombol "Nanti dulu, aku ambil guide gratisnya dulu" di `/pre-order/` dihapus sesuai permintaan Nicho. Tombol di `/one-time-offer/` tetap ada. Sertakan perubahan ini dalam patch Notion tertunda.

- Patch Notion tertunda: ganti label “Materi” jadi “Modul video” di kelima item daftar penawaran, untuk kedua versi halaman.

- Koreksi patch Notion: di kedua halaman, tampilkan “Kelas video + workbook” sekali sebagai badge emas di atas daftar harga. Pakai judul topik saja di kelima baris, tanpa awalan “Modul video”.
