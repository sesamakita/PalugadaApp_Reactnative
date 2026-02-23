# 🏗️ Skenario Transaksi & Revenue Platform — Palugada KW

Dokumen ini memetakan **semua kemungkinan transaksi** yang terjadi di platform dan bagaimana platform bisa mendapatkan profit dari masing-masing skenario.

---

## 🗺️ Peta Revenue Platform

```
┌─────────────────────────────────────────────────────────────┐
│                    💰 REVENUE PLATFORM                      │
├───────────────┬───────────────┬───────────────┬─────────────┤
│  Transaksi    │   Keuangan    │   Promosi &   │  Value-Add  │
│  Jual-Beli    │   (Wallet)    │   Iklan       │  Services   │
├───────────────┼───────────────┼───────────────┼─────────────┤
│ • Komisi 3%   │ • Fee Topup   │ • Push Produk │ • Verifi-   │
│   penjual     │ • Fee Tarik   │ • Banner Ads  │   kasi Toko │
│ • Komisi 2%   │   Saldo       │ • Featured    │ • Asuransi  │
│   kurir       │ • COD Fee     │   Product     │ • Prioritas │
│ • Biaya       │ • Escrow      │ • Promo Slot  │   Kurir     │
│   Layanan 2%  │   Interest    │               │             │
│   pembeli     │               │               │             │
└───────────────┴───────────────┴───────────────┴─────────────┘
```

---

## A. TRANSAKSI JUAL-BELI (Core Revenue)

### A1. Pembelian Produk Standar ✅ (Sudah Diimplementasi)
> Pembeli beli barang → Penjual kirim → Kurir antar

| Pihak | Fee | Contoh (Produk Rp 100.000, Ongkir Rp 15.000) |
|-------|-----|-----------------------------------------------|
| Pembeli | Biaya Layanan 2% dari produk | Rp 2.000 |
| Penjual | Potongan 3% dari harga produk | Rp 3.000 |
| Kurir | Potongan 2% dari ongkir | Rp 300 |
| **Platform** | **Total** | **Rp 5.300** |

---

### A2. Pembelian Produk Kuliner (Perishable)
> Sama seperti A1, tapi produk makanan butuh pengiriman cepat (same-day)

| Pihak | Fee | Contoh (Makanan Rp 35.000, Ongkir Rp 12.000) |
|-------|-----|-----------------------------------------------|
| Pembeli | Biaya Layanan 2% | Rp 700 |
| Penjual | Potongan 3% | Rp 1.050 |
| Kurir | Potongan 2% | Rp 240 |
| **Tambahan** | Biaya Pengemasan Khusus (opsional) | Rp 2.000 |
| **Platform** | **Total** | **Rp 1.990 — Rp 3.990** |

> 💡 **Peluang**: Platform bisa jual kemasan food-grade ke penjual kuliner sebagai revenue tambahan.

---

### A3. Pemesanan Jasa (Service)
> Pembeli pesan jasa (tukang, laundry, dll) → Penyedia datang/kerjakan

| Pihak | Fee | Contoh (Jasa Rp 150.000) |
|-------|-----|--------------------------|
| Pembeli | Biaya Layanan 2% | Rp 3.000 |
| Penyedia Jasa | Potongan 3% | Rp 4.500 |
| Kurir | Tidak ada (jasa langsung) | — |
| **Platform** | **Total** | **Rp 7.500** |

> 💡 Jasa **tanpa kurir** = margin lebih bersih karena tidak ada biaya logistik.

---

### A4. Transaksi COD (Bayar di Tempat)
> Pembeli tidak bayar online, kurir yang menagih saat pengiriman

| Pihak | Fee | Contoh (Produk Rp 80.000, Ongkir Rp 15.000) |
|-------|-----|-----------------------------------------------|
| Pembeli | Biaya Layanan 2% + **Fee COD Rp 2.000** | Rp 3.600 |
| Penjual | Potongan 3% | Rp 2.400 |
| Kurir | Potongan 2% | Rp 300 |
| **Platform** | **Total** | **Rp 6.300** |

> ⚠️ COD punya risiko **pembeli menolak barang**. Fee COD Rp 2.000 menutupi risiko ini.

---

### A5. Pembelian Multi-Toko (1 Checkout, banyak Penjual)
> Pembeli beli dari 3 toko sekaligus dalam 1 checkout

```
Toko A: Batik Rp 200.000   → Fee penjual 3% = Rp 6.000
Toko B: Sambal Rp  35.000  → Fee penjual 3% = Rp 1.050
Toko C: Keripik Rp 25.000  → Fee penjual 3% = Rp   750
                                                ─────────
Subtotal Produk:  Rp 260.000
Biaya Layanan 2%: Rp   5.200   ← dari pembeli
Ongkir 3 pickup:  Rp  30.000   (3 × Rp 10.000)
Fee Kurir 2%:     Rp     600   ← dari kurir

💰 PLATFORM TOTAL: Rp 13.600/transaksi!
```

> 💡 Multi-toko = **revenue berlipat** karena fee dihitung per toko.

---

### A6. Pembatalan & Refund
> Pembeli atau penjual membatalkan pesanan

| Skenario | Fee Platform |
|----------|-------------|
| Pembeli batal sebelum kirim | ❌ Tidak ada fee (gratis) |
| Pembeli batal setelah kirim | ✅ Biaya Layanan 2% **tetap ditahan** |
| Penjual batal | ❌ Tidak ada fee + penalti reputasi penjual |
| Barang rusak/tidak sesuai | ✅ Biaya Layanan 2% **dikembalikan** ke pembeli |

> 💡 Platform **tidak rugi** pada pembatalan setelah kirim karena biaya layanan tetap ditahan.

---

## B. TRANSAKSI KEUANGAN (Wallet Revenue)

### B1. Top-Up Wallet
> User mengisi saldo wallet via transfer bank / e-wallet

| Nominal Topup | Fee | Platform Dapat |
|:-------------:|:---:|:--------------:|
| Rp 10.000 — Rp 49.999 | Rp 1.000 (flat) | Rp 1.000 |
| Rp 50.000 — Rp 199.999 | Rp 1.500 (flat) | Rp 1.500 |
| Rp 200.000+ | Rp 2.500 (flat) | Rp 2.500 |

---

### B2. Tarik Saldo (Withdraw)
> Penjual/kurir menarik saldo ke rekening bank

| Nominal Withdraw | Fee | Platform Dapat |
|:----------------:|:---:|:--------------:|
| Rp 10.000 — Rp 99.999 | Rp 2.500 | Rp 2.500 |
| Rp 100.000 — Rp 499.999 | Rp 3.500 | Rp 3.500 |
| Rp 500.000+ | Rp 5.000 | Rp 5.000 |

> 💡 Ini revenue **pasti** karena penjual & kurir **pasti** tarik saldo.

---

### B3. Pendapatan Bunga Escrow (Float Revenue)
> Dana ditahan platform selama proses pengiriman (1-3 hari)

```
Contoh: 100 transaksi/hari × rata-rata Rp 75.000 = Rp 7.500.000/hari di-hold
Bunga deposito harian ~0.015%/hari
Float Revenue: Rp 7.500.000 × 0.015% × 30 hari = Rp 33.750/bulan

Jika scale ke 1.000 transaksi/hari:
Float Revenue: Rp 337.500/bulan
```

> 💡 Kecil tapi **pasif** — tumbuh seiring volume transaksi naik. Ini model revenue tersembunyi yang digunakan PayPal dan Gojek.

---

## C. PROMOSI & IKLAN (Advertising Revenue)

### C1. Push Produk (Promoted Product)
> Penjual bayar agar produknya muncul di atas hasil pencarian

| Paket | Durasi | Harga | Platform Dapat |
|-------|--------|:-----:|:--------------:|
| Basic | 3 hari | Rp 5.000 | Rp 5.000 |
| Standar | 7 hari | Rp 10.000 | Rp 10.000 |
| Premium | 30 hari | Rp 35.000 | Rp 35.000 |

---

### C2. Featured Store (Toko Unggulan)
> Toko ditampilkan di halaman utama dengan badge khusus

| Durasi | Harga/Bulan | Platform Dapat |
|--------|:-----------:|:--------------:|
| 1 bulan | Rp 50.000 | Rp 50.000 |
| 3 bulan | Rp 120.000 | Rp 120.000 |

---

### C3. Banner Promo di Halaman Explore
> Penjual pasang banner promosi di halaman Explore

| Posisi | Harga/Minggu |
|--------|:------------:|
| Banner Utama (atas) | Rp 25.000 |
| Banner Samping | Rp 10.000 |

---

## D. VALUE-ADDED SERVICES (Layanan Bernilai Tambah)

### D1. Verifikasi Toko ✓ (Lencana Biru)
> Toko bayar untuk proses verifikasi dan dapat badge "Terverifikasi"

| Item | Harga | Keterangan |
|------|:-----:|------------|
| Verifikasi Toko | Rp 25.000 (sekali bayar) | Badge "✓ Terverifikasi" |
| Perpanjang per tahun | Rp 15.000 | Maintain badge |

> 💡 Meningkatkan **kepercayaan pembeli** → konversi naik → revenue naik.

---

### D2. Asuransi Pengiriman
> Pembeli tambah asuransi saat checkout

| Nilai Produk | Premi Asuransi | Platform Dapat (komisi 30%) |
|:------------:|:--------------:|:---------------------------:|
| < Rp 100.000 | Rp 1.500 | Rp 450 |
| Rp 100.000 — Rp 500.000 | Rp 3.000 | Rp 900 |
| > Rp 500.000 | Rp 5.000 | Rp 1.500 |

---

### D3. Kurir Prioritas (Express)
> Pembeli bayar lebih untuk pengiriman lebih cepat

| Tipe | Estimasi | Ongkir | Premium ke Platform |
|------|----------|:------:|:-------------------:|
| Reguler | 3-5 jam | Rp 10.000 | — |
| Express | 1-2 jam | Rp 20.000 | Rp 3.000 (dari selisih) |
| Instan | < 1 jam | Rp 35.000 | Rp 8.000 (dari selisih) |

---

### D4. Langganan Penjual Pro (Subscription)
> Akses fitur analitik, promo tools, dan prioritas listing

| Plan | Harga/Bulan | Fitur Tambahan |
|------|:-----------:|----------------|
| Free | Rp 0 | Listing standar, laporan dasar |
| Pro | Rp 30.000 | Analitik lanjutan, 5 push produk gratis, badge Pro |
| Business | Rp 75.000 | Semua Pro + multi-admin, API akses, prioritas support |

---

## 📊 RANGKUMAN: Total Revenue Per Transaksi

### Skenario Minimum (Hanya Core Fee)
```
Produk Rp 75.000 + Ongkir Rp 15.000
────────────────────────────────────────
  Biaya Layanan (2%)    : Rp  1.500
  Potongan Penjual (3%) : Rp  2.250
  Potongan Kurir (2%)   : Rp    300
────────────────────────────────────────
  TOTAL                 : Rp  4.050
```

### Skenario Maksimum (Semua Revenue Stream)
```
Produk Rp 75.000 + Ongkir Rp 15.000
────────────────────────────────────────
  Biaya Layanan (2%)    : Rp  1.500
  Potongan Penjual (3%) : Rp  2.250
  Potongan Kurir (2%)   : Rp    300
  Fee COD               : Rp  2.000
  Asuransi (komisi 30%) : Rp    450
  Express Premium       : Rp  3.000
────────────────────────────────────────
  TOTAL                 : Rp  9.500
```

### Revenue Bulanan (100 transaksi/hari)

| Revenue Stream | /Bulan (min) | /Bulan (max) |
|----------------|:------------:|:------------:|
| Core Fee (A1) | Rp 12.150.000 | Rp 12.150.000 |
| COD Fee (A4) | — | Rp 2.000.000 |
| Wallet Fees (B1+B2) | Rp 1.500.000 | Rp 5.000.000 |
| Float (B3) | Rp 33.750 | Rp 337.500 |
| Promosi (C1-C3) | — | Rp 3.000.000 |
| Value-Add (D1-D4) | — | Rp 4.500.000 |
| **TOTAL** | **Rp 13.683.750** | **Rp 26.987.500** |

---

## 🎯 Prioritas Implementasi

| Fase | Revenue Stream | Effort | Impact |
|:----:|----------------|:------:|:------:|
| 1️⃣ | Core Fee (A1-A3) — sudah ✅ | Rendah | Tinggi |
| 2️⃣ | Wallet Fee (B1-B2) | Rendah | Sedang |
| 3️⃣ | COD Fee (A4) | Sedang | Sedang |
| 4️⃣ | Kurir Prioritas (D3) | Sedang | Tinggi |
| 5️⃣ | Push Produk (C1) | Sedang | Tinggi |
| 6️⃣ | Asuransi (D2) | Tinggi | Sedang |
| 7️⃣ | Subscription (D4) | Tinggi | Tinggi |
| 8️⃣ | Banner & Featured Store (C2-C3) | Sedang | Sedang |
