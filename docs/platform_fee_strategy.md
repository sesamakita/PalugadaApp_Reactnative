# 💰 Strategi Platform Fee — Palugada KW

Dokumen ini berisi **opsi-opsi** bagaimana pengembang (platform) bisa mengambil **Rp 1.000 dari penjual** dan **Rp 500 dari kurir** pada setiap transaksi yang berhasil.

---

## Konteks Saat Ini

Berdasarkan codebase yang ada:
- **Checkout**: Pembeli membayar `Subtotal Produk + Ongkir (Rp 15.000)`
- **Wallet**: Semua user (pembeli/penjual/kurir) punya wallet dengan fitur topup, withdraw, dan history
- **Seller Dashboard**: Penjual menerima pesanan dan mengelola produk
- **Courier Earnings**: Kurir punya dashboard pendapatan harian/mingguan/bulanan

---

## Opsi 1: 🏅 Auto-Deduct saat Settlement (DIREKOMENDASIKAN)

**Konsep**: Platform menahan pembayaran, lalu mendistribusikan ke penjual dan kurir setelah dipotong fee.

### Flow Transaksi

```
Pembeli bayar: Rp 50.000 (produk) + Rp 15.000 (ongkir) = Rp 65.000
         ↓
   [Platform Escrow: Rp 65.000]
         ↓
   Pesanan selesai diterima pembeli
         ↓
   ┌─────────────────────────────────────┐
   │ Penjual terima: Rp 49.000           │
   │   (Rp 50.000 - Rp 1.000 fee)       │
   │                                     │
   │ Kurir terima: Rp 14.500             │
   │   (Rp 15.000 - Rp 500 fee)         │
   │                                     │
   │ 🏦 Platform Revenue: Rp 1.500      │
   └─────────────────────────────────────┘
```

### Implementasi di UI

| Komponen | Perubahan |
|----------|-----------|
| `Checkout.jsx` | Tambah baris "Biaya Layanan" di rincian (transparan ke pembeli) |
| `Wallet.jsx` | History transaksi menampilkan potongan fee |
| `SellerDashboard.jsx` | Order detail menampilkan "Pendapatan Bersih" setelah potong fee |
| `CourierEarnings.jsx` | Earnings menampilkan pendapatan bersih per pengantaran |

### Kelebihan
- ✅ **Paling umum** — dipakai Tokopedia, Shopee, Grab, Gojek
- ✅ **Tidak ada biaya tambahan ke pembeli** — fee diserap penjual & kurir
- ✅ **Otomatis** — tidak perlu tagihan manual
- ✅ **Cash flow aman** — uang sudah di-hold platform sebelum dibagi

### Kekurangan
- ⚠️ Butuh sistem **escrow** (penahanan dana)
- ⚠️ Penjual & kurir perlu tahu bahwa ada potongan sejak awal

---

## Opsi 2: 💳 Biaya Layanan Ditambahkan ke Pembeli

**Konsep**: Fee platform ditambahkan sebagai "Biaya Layanan" di halaman checkout, sehingga pembeli yang menanggung.

```
Subtotal Produk     : Rp 50.000
Ongkos Kirim        : Rp 15.000
Biaya Layanan       : Rp  1.500  ← (1.000 + 500)
─────────────────────────────────
Total Tagihan       : Rp 66.500
```

### Implementasi di UI

| Komponen | Perubahan |
|----------|-----------|
| `Checkout.jsx` | Tambah baris "Biaya Layanan: Rp 1.500" di rincian biaya |

### Kelebihan
- ✅ **Paling sederhana** — hanya ubah 1 file
- ✅ Penjual & kurir terima **full amount** — tidak ada potongan
- ✅ Tidak butuh escrow rumit

### Kekurangan
- ⚠️ **Pembeli menanggung semua** — bisa kurangi minat beli
- ⚠️ Kurang umum di marketplace Indonesia

---

## Opsi 3: 🔄 Model Hybrid — Fee Split antara Penjual + Pembeli

**Konsep**: Biaya platform dibagi — sebagian ditanggung pembeli, sebagian dipotong dari penjual & kurir.

```
SISI PEMBELI (Checkout):
  Subtotal Produk     : Rp 50.000
  Ongkos Kirim        : Rp 15.000
  Biaya Layanan       : Rp    500  ← sebagian kecil
  Total               : Rp 65.500

SISI PENJUAL (Settlement):
  Pendapatan Kotor    : Rp 50.000
  Potongan Platform   : Rp  1.000
  Pendapatan Bersih   : Rp 49.000

SISI KURIR (Settlement):
  Ongkir Diterima     : Rp 15.000
  Potongan Platform   : Rp    500  → ditanggung pembeli
  Pendapatan Bersih   : Rp 15.000  ← full, karena sudah dicover pembeli
```

### Kelebihan
- ✅ Beban **terdistribusi** — tidak berat di satu pihak
- ✅ Kurir terima full — insentif kurir tetap menarik

### Kekurangan
- ⚠️ Lebih kompleks secara logika
- ⚠️ Sulit menjelaskan ke user "fee ini untuk apa"

---

## Opsi 4: 📊 Persentase dari Nilai Transaksi (Scalable)

**Konsep**: Alih-alih flat fee, ambil persentase dari nilai transaksi. Contoh: **2% dari penjual** dan **3.3% dari ongkir kurir**.

```
Transaksi Rp 50.000:
  Fee Penjual  : 2%  × Rp 50.000 = Rp 1.000
  Fee Kurir    : 3.3% × Rp 15.000 = Rp  500

Transaksi Rp 200.000:
  Fee Penjual  : 2%  × Rp 200.000 = Rp 4.000  ← revenue naik!
  Fee Kurir    : 3.3% × Rp 15.000  = Rp  500
```

### Kelebihan
- ✅ **Revenue scale** seiring nilai transaksi naik
- ✅ Lebih adil — penjual besar bayar lebih, penjual kecil bayar sedikit
- ✅ Model standar marketplace global (Amazon, eBay)

### Kekurangan
- ⚠️ Lebih kompleks implementasinya
- ⚠️ Penjual kecil merasa "dipotong terus"

---

## 📊 Perbandingan Semua Opsi

| Aspek | Opsi 1 (Auto-Deduct) | Opsi 2 (Pembeli) | Opsi 3 (Hybrid) | Opsi 4 (Persentase) |
|-------|:-----:|:-----:|:-----:|:-----:|
| **Kompleksitas** | Sedang | Rendah | Tinggi | Tinggi |
| **Transparansi** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Revenue Potential** | Tetap | Tetap | Tetap | Scalable |
| **Beban Pembeli** | Tidak ada | Rp 1.500 | Rp 500 | Tidak ada |
| **Beban Penjual** | Rp 1.000 | Tidak ada | Rp 1.000 | 2% |
| **Beban Kurir** | Rp 500 | Tidak ada | Tidak ada | 3.3% |
| **Mirip Platform** | Tokopedia, Shopee | Gojek Food | Grab | Amazon, eBay |

---

## 🎯 Rekomendasi

**Opsi 1 (Auto-Deduct saat Settlement)** adalah yang paling direkomendasikan karena:

1. Sudah jadi **standar industri** marketplace Indonesia
2. **Tidak membebani pembeli** — harga yang dilihat = yang dibayar
3. **Otomatis** — tanpa perlu tagihan atau reminder
4. Bisa **dikombinasikan dengan Opsi 4** di masa depan (fee persentase)

### Estimasi Revenue dengan Opsi 1

| Transaksi/Hari | Fee/Transaksi | Revenue/Hari | Revenue/Bulan |
|:-:|:-:|:-:|:-:|
| 10 | Rp 1.500 | Rp 15.000 | Rp 450.000 |
| 50 | Rp 1.500 | Rp 75.000 | Rp 2.250.000 |
| 100 | Rp 1.500 | Rp 150.000 | Rp 4.500.000 |
| 500 | Rp 1.500 | Rp 750.000 | Rp 22.500.000 |

---

## Langkah Implementasi

Jika sudah memilih opsi, berikut file yang perlu dimodifikasi:

1. **`Checkout.jsx`** — tampilkan breakdown fee (jika diperlukan)
2. **`Wallet.jsx`** — tambah tipe transaksi "Platform Fee"
3. **`SellerDashboard.jsx`** — tampilkan pendapatan bersih
4. **`CourierEarnings.jsx`** — tampilkan potongan per pengantaran
5. **Komponen baru `PlatformFeeBreakdown.jsx`** — detail fee transparan
