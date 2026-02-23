# 🛡️ COD Risk Management — Palugada KW

Dokumen ini membahas **risiko transaksi COD** (Cash on Delivery) dan strategi mitigasinya.

---

## 1. 🚫 Pembeli Menolak Barang

**Masalah**: Kurir sudah di lokasi, pembeli bilang "tidak jadi" atau tidak di tempat.

| Antisipasi | Detail |
|------------|--------|
| Fee COD non-refundable | Fee Rp 2.000 tetap dikenakan meski batal → tutupi ongkos kurir pulang |
| Limit COD per user | Pembeli baru max 2 COD/minggu, naik seiring reputasi |
| Blacklist otomatis | 3× pembatalan COD → fitur COD dinonaktifkan |
| Deposit COD | Pembeli harus punya saldo wallet min 10% dari nilai pesanan sebagai jaminan |

---

## 2. 💸 Kurir Kabur Bawa Uang

**Masalah**: Kurir terima uang tunai tapi tidak setor ke platform.

| Antisipasi | Detail |
|------------|--------|
| Batas saldo COD | Kurir wajib setor jika uang COD di tangan > Rp 200.000 |
| Auto-block | Tidak bisa terima tugas baru jika COD belum disetor > 24 jam |
| Verifikasi KTP + KK | Registrasi kurir wajib foto KTP → identitas lengkap |
| Deposit kurir | Saldo jaminan Rp 50.000 di wallet, ditahan selama aktif |

---

## 3. 🔄 Barang Tidak Sesuai / Rusak

**Masalah**: Pembeli bayar COD, tapi barang tidak sesuai deskripsi.

| Antisipasi | Detail |
|------------|--------|
| Foto bukti serah-terima (PoD) | Kurir wajib upload foto saat serah terima |
| Garansi 1×24 jam | Pembeli bisa ajukan komplain + foto bukti dalam 24 jam |
| Escrow COD | Uang COD ditahan platform 24 jam sebelum cair ke penjual |
| Penalti penjual | Jika terbukti tidak sesuai → penjual tanggung ongkir retur + penalti |

---

## 4. 🎭 Pembeli Palsu / Fraud Order

**Masalah**: Akun palsu pesan COD ke alamat salah atau tidak ada.

| Antisipasi | Detail |
|------------|--------|
| Verifikasi nomor HP (OTP) | Wajib verifikasi saat daftar |
| Minimum histori | COD hanya untuk akun yang sudah 1× transaksi online berhasil |
| Konfirmasi ganda | Push notif H-1: "Pesanan masih aktif?" → jika tidak respond, auto-cancel |
| Batas nilai COD | Max Rp 500.000 untuk akun baru, naik seiring reputasi |

---

## 5. 🤝 Kolusi Kurir & Pembeli

**Masalah**: Kurir dan pembeli bersekongkol — lapor "ditolak" padahal sudah diterima.

| Antisipasi | Detail |
|------------|--------|
| PoD wajib + GPS timestamp | Foto bukti + lokasi GPS harus cocok dengan alamat |
| Kode verifikasi unik | Pembeli kasih kode OTP ke kurir sebagai bukti serah terima |
| Pattern detection | Kurir X + pembeli Y sering "gagal kirim" → flagging otomatis |

---

## 6. 💰 Uang Palsu

**Masalah**: Pembeli bayar dengan uang palsu ke kurir.

| Antisipasi | Detail |
|------------|--------|
| Edukasi kurir | Panduan cek keaslian uang di app |
| QRIS di tempat | Tampilkan opsi "Bayar via QRIS" sebagai alternatif tunai |
| Batas nominal tunai | COD tunai max Rp 300.000, di atas itu wajib QRIS |

---

## 📊 Sistem Scoring Reputasi

Semua risiko dimitigasi dengan **skor reputasi bertingkat**:

| Score | Pembeli | Kurir | Penjual |
|:-----:|---------|-------|---------|
| 1-3 | ❌ COD tidak tersedia | ❌ Tidak bisa tugas COD | COD ditahan 72 jam |
| 4-6 | COD max Rp 200.000 | COD max Rp 300.000 | COD ditahan 48 jam |
| 7-9 | COD max Rp 500.000 | COD max Rp 500.000 | COD ditahan 24 jam |
| 10 | COD unlimited | Unlimited | COD cair instan |

### Cara Naikkan Score:
- ✅ Transaksi berhasil tanpa masalah → +1
- ✅ Review positif dari pihak lain → +0.5
- ❌ Pembatalan/masalah → -2
- ❌ Fraud terdeteksi → reset ke 0 + suspend

---

## 🔒 Flow COD yang Aman

```
1. PEMBELI pesan COD
   └─ Cek: Score ≥ 4? Saldo wallet ≥ 10%? Belum blacklist?
      ├─ ❌ Tolak → "COD tidak tersedia, silakan bayar online"
      └─ ✅ Lanjut

2. H-1 PENGIRIMAN
   └─ Push notif: "Pesanan besok diantar, masih aktif?"
      ├─ Tidak respond 6 jam → Auto-cancel
      └─ ✅ Konfirmasi → Lanjut

3. KURIR pickup barang
   └─ Cek: Kurir punya COD belum setor? Saldo > limit?
      ├─ ❌ Block → "Setor dulu COD sebelumnya"
      └─ ✅ Lanjut

4. KURIR tiba di lokasi pembeli
   └─ Minta kode OTP dari pembeli
      ├─ Kode salah 3× → Lapor "pembeli bermasalah"
      └─ ✅ Kode benar → Serah barang, terima uang

5. KURIR selesaikan di app
   └─ Upload foto PoD + GPS auto-record
   └─ Uang COD masuk "saldo COD belum setor"

6. ESCROW 24 JAM
   └─ Pembeli bisa komplain 24 jam
      ├─ Ada komplain → Investigasi
      └─ ✅ Tidak ada → Dana cair ke penjual & kurir (- fee platform)
```
